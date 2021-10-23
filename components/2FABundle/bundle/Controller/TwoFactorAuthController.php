<?php

/**
 * NovaeZ2FABundle.
 *
 * @package   NovaeZ2FABundle
 *
 * @author    Maxim Strukov <maxim.strukov@almaviacx.com>
 * @copyright 2021 AlmaviaCX
 * @license   https://github.com/Novactive/NovaeZ2FA/blob/main/LICENSE
 */

namespace Novactive\Bundle\eZ2FABundle\Controller;

use eZ\Publish\API\Repository\PermissionResolver;
use eZ\Publish\API\Repository\UserService;
use eZ\Publish\Core\MVC\Symfony\Security\User;
use EzSystems\EzPlatformAdminUiBundle\Controller\Controller;
use Novactive\Bundle\eZ2FABundle\Core\QRCodeGenerator;
use Novactive\Bundle\eZ2FABundle\Core\SiteAccessAwareAuthenticatorResolver;
use Novactive\Bundle\eZ2FABundle\Form\Type\TwoFactorAuthType;
use Novactive\Bundle\eZ2FABundle\Form\Type\TwoFactorMethodType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class TwoFactorAuthController extends Controller
{
    /**
     * @SuppressWarnings("PMD.NPathComplexity")
     */
    public function setupAction(
        Request $request,
        QRCodeGenerator $QRCodeGenerator,
        SiteAccessAwareAuthenticatorResolver $saAuthenticatorResolver
    ): Response {
        /* @var User $user */
        $user = $this->getUser();

        if ($saAuthenticatorResolver->checkIfUserSecretExists($user)) {
            return $this->render(
                '@ezdesign/2fa/setup.html.twig',
                [
                    'reset' => true,
                    'method' => $saAuthenticatorResolver->getMethod(),
                ]
            );
        }

        // The Method Selection (email or mobile app) form IF email method is enabled
        if ($saAuthenticatorResolver->isEmailMethodEnabled()) {
            $methodForm = $this->createForm(TwoFactorMethodType::class);

            if (null === $saAuthenticatorResolver->getMethod()) {
                $options = $methodForm->get('method')->getConfig()->getOptions();
                $options['choices'] = ['Email' => 'email'];
                $options['data'] = 'email';
                $methodForm->add('method', ChoiceType::class, $options);
            }

            $methodForm->handleRequest($request);
        }

        if (null === $saAuthenticatorResolver->getMethod()) {
            return $this->render(
                '@ezdesign/2fa/setup.html.twig',
                [
                    'form' => null,
                ]
            );
        }

        // The Mobile App QR Code form
        $qrCodeForm = $this->createForm(TwoFactorAuthType::class);
        $qrCodeForm->handleRequest($request);

        // If none of the forms is submitted show the first one with method selection
        if (
            isset($methodForm) && !$qrCodeForm->isSubmitted() &&
            !($methodForm->isSubmitted() && $methodForm->isValid())
        ) {
            return $this->render(
                '@ezdesign/2fa/setup.html.twig',
                [
                    'form' => $methodForm->createView(),
                ]
            );
        }

        // When the method is submitted and it's email - then save it in DB and show SetUp Success
        if (isset($methodForm, $methodForm->getData()['method']) && 'email' === $methodForm->getData()['method']) {
            $saAuthenticatorResolver->setEmailAuthentication($user);

            return $this->render(
                '@ezdesign/2fa/setup.html.twig',
                [
                    'success' => true,
                    'method' => 'email',
                ]
            );
        }

        // Otherwise, if method is submitted and it's NOT email - show the second form with mobile app QR code
        $user = $saAuthenticatorResolver->getUserAuthenticatorEntity($user);

        if ($qrCodeForm->isSubmitted() && $qrCodeForm->isValid()) {
            $result = $saAuthenticatorResolver->validateCodeAndUpdateUser($user, $qrCodeForm->getData());
            if ($result['valid']) {
                return $this->render(
                    '@ezdesign/2fa/setup.html.twig',
                    [
                        'success' => true,
                        'method' => $saAuthenticatorResolver->getMethod(),
                        'backupCodes' => $result['backupCodes'],
                    ]
                );
            }

            $qrCodeForm->get('code')->addError(new FormError('Wrong code provided!'));
        }

        if (!$qrCodeForm->isSubmitted()) {
            $secretKey = $saAuthenticatorResolver->getAuthenticator()->generateSecret();
            $user->setAuthenticatorSecret($secretKey);
            $qrCodeForm->get('secretKey')->setData($secretKey);
        }

        return $this->render(
            '@ezdesign/2fa/setup.html.twig',
            [
                'qrCode' => $QRCodeGenerator->createFromUser($user),
                'form' => $qrCodeForm->createView(),
                'method' => $saAuthenticatorResolver->getMethod(),
            ]
        );
    }

    public function resetAction(
        SiteAccessAwareAuthenticatorResolver $saAuthenticatorResolver,
        UserService $userService,
        RouterInterface $router,
        PermissionResolver $permissionResolver,
        ?int $userId = null
    ): RedirectResponse {
        if (null === $userId) {
            /* @var User $user */
            $user = $this->getUser();
        } else {
            if (!$permissionResolver->hasAccess('2fa_management', 'all_functions')) {
                throw new AccessDeniedException('Limited access !!!');
            }

            $apiUser = $userService->loadUser($userId);
            $user = new User($apiUser);
            $contentId = $apiUser->contentInfo->id;
            $locationId = $apiUser->contentInfo->mainLocationId;
        }

        $saAuthenticatorResolver->deleteUserAuthSecretAndEmail($user);

        if (isset($contentId, $locationId)) {
            return new RedirectResponse(
                $router->generate('_ez_content_view', ['contentId' => $contentId, 'locationId' => $locationId]).
                '#ez-tab-location-view-reset-for-user#tab'
            );
        }

        return $this->redirectToRoute('2fa_setup');
    }
}
