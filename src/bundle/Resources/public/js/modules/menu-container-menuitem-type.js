!function(e){function t(t){for(var a,s,o=t[0],l=t[1],u=t[2],m=0,h=[];m<o.length;m++)s=o[m],r[s]&&h.push(r[s][0]),r[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(c&&c(t);h.length;)h.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,o=1;o<n.length;o++){var l=n[o];0!==r[l]&&(a=!1)}a&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},r={"menu-container-menuitem-type":0,"menu-default-menuitem-type":0},i=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/bundles/ezmenumanager/js/modules/";var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var c=l;i.push(["xIXF",0]),n()}({"A+co":function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return o});var a=n("q1tI"),r=n.n(a),i=n("KKQ2"),s=n("zCKm");class o extends s.a{getContextualMenu(e,t,n){let a={};return a.editItem={label:Translator.trans("menu_item.action.edit"),action:e.handleEditTreeNode,separator_after:!0},Object.assign(a,super.getContextualMenu(e,t,n)||{})}getContextualMenuCreateBtn(e,t){const n=this.getNewItem.bind(this);return{label:Translator.trans("menu_item.action.create.".concat(this.identifier)),action:()=>{const a=n({parentId:t.id});e.handleCreateTreeNode(a)}}}getEditForm(e,t,n){return r.a.createElement(i.a,{item:e,onSubmit:t,onCancel:n})}}},F1df:function(e,t,n){"use strict";n.d(t,"a",function(){return a});class a{constructor(e){this.id=String(e.id||"_"+Math.random().toString(36).substr(2,9)),this.parentId=e.parentId||"#",this.name=e.name,this.position=e.position||0,this.url=e.url||"",this.target=e.target||"",this.state=e.state,this.type=e.type,this.options=e.options||{}}getOption(e,t=null){const n=this.options[e];return void 0!==n?n:t}setOption(e,t){this.options[e]=t}toTreeNode(e){let t="";return!1===this.getOption("active",!0)&&(t+="jstree-desactivated"),{id:this.id,parent:this.parentId,text:this.translateProperty(this.name,e),data:{position:this.position,url:this.url,target:this.target,options:this.options},state:this.state,type:this.type,a_attr:{class:t}}}translateProperty(e,t){try{return JSON.parse(e)[t]}catch(t){return e}}isEnabled(){return void 0===this.state||!this.state.disabled}static fromTreeNode(e,t=null){return new a({id:e.id,parentId:e.parent,name:e.text,position:t||e.data.position,url:e.data.url,target:e.data.target,options:e.data.options,state:e.state,type:e.type})}}},KKQ2:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var a=n("q1tI"),r=n.n(a),i=n("17x9"),s=n.n(i),o=n("xkgm");class l extends a.Component{constructor(e){super(e),this.defaultLanguage=eZ.adminUiConfig.languages.priority[0],this.state={name:this.props.item.name,url:this.props.item.url,blank:"_blank"===this.props.item.target,language:this.defaultLanguage},this.handleLanguageChange=this.handleLanguageChange.bind(this),this.handleInputChange=this.handleInputChange.bind(this),this.handleLocalizedInputChange=this.handleLocalizedInputChange.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.handleCancel=this.handleCancel.bind(this)}componentDidUpdate(e,t){e.item!==this.props.item&&this.setState(e=>({name:this.props.item.name,url:this.props.item.url,blank:"_blank"===this.props.item.target}))}handleLanguageChange(e){const t=e.target.value;this.setState({language:t})}handleInputChange(e){const t=e.target,n="checkbox"===t.type?t.checked:t.value,a=t.name;this.setState({[a]:n})}handleLocalizedInputChange(e){const t=e.target,n="checkbox"===t.type?t.checked:t.value,a=t.name;let r={};try{r=JSON.parse(this.state[a])}catch(e){r[this.defaultLanguage]=this.state[a]}r[this.state.language]=n;const i=JSON.stringify(r);this.setState({[a]:i})}handleSubmit(e){e.preventDefault();const t=this.props.item;t.name=this.state.name,t.url=this.state.url,t.target=this.state.blank?"_blank":"",this.props.onSubmit(t)}handleCancel(e){this.props.onCancel()}getInputValue(e){try{return JSON.parse(e)[this.state.language]||""}catch(t){return e}}render(){this.props.item.target;let e=[];for(const t in eZ.adminUiConfig.languages.mappings)e.push(eZ.adminUiConfig.languages.mappings[t]);return r.a.createElement("div",null,r.a.createElement(o.b,{onSubmit:this.handleSubmit},r.a.createElement(o.c,null,r.a.createElement(o.e,{for:"language"},Translator.trans("menu_item.property.language")),r.a.createElement(o.d,{type:"select",onChange:this.handleLanguageChange},[...e].map(e=>r.a.createElement("option",{key:e.id,value:e.languageCode},e.name)))),r.a.createElement(o.c,null,r.a.createElement(o.e,{for:"item_name"},Translator.trans("menu_item.property.name")," (",this.state.language,")"),r.a.createElement(o.d,{type:"text",name:"name",value:this.getInputValue(this.state.name),id:"item_name",onChange:this.handleLocalizedInputChange})),r.a.createElement(o.c,null,r.a.createElement(o.e,{for:"item_url"},Translator.trans("menu_item.property.url")," (",this.state.language,")"),r.a.createElement(o.d,{type:"text",name:"url",value:this.getInputValue(this.state.url),id:"item_url",onChange:this.handleLocalizedInputChange})),r.a.createElement(o.c,{check:!0},r.a.createElement(o.e,{check:!0,for:"item_target"},r.a.createElement(o.d,{type:"checkbox",name:"blank",checked:this.state.blank,id:"item_target",onChange:this.handleInputChange}),Translator.trans("menu_item.property.new_window"))),r.a.createElement(o.a,{type:"submit",className:"pull-right",color:"primary"},Translator.trans("menu_item.edit_form.save")),r.a.createElement(o.a,{type:"button",onClick:this.handleCancel},Translator.trans("menu_item.edit_form.cancel"))))}}l.propTypes={item:s.a.object,onSubmit:s.a.func,onCancel:s.a.func}},xIXF:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),r=n.n(a),i=n("17x9"),s=n.n(i),o=n("KKQ2"),l=n("xkgm");class u extends o.a{constructor(e){super(e),this.defaultLanguage=eZ.adminUiConfig.languages.priority[0],this.state={name:this.props.item.name,language:this.defaultLanguage},this.handleSubmit=this.handleSubmit.bind(this)}componentDidUpdate(e,t){e.item!==this.props.item&&this.setState(e=>({name:this.props.item.name}))}handleSubmit(e){e.preventDefault();const t=this.props.item;t.name=this.state.name,this.props.onSubmit(t)}render(){let e=[];for(const t in eZ.adminUiConfig.languages.mappings)e.push(eZ.adminUiConfig.languages.mappings[t]);return React.createElement("div",null,React.createElement(l.b,{onSubmit:this.handleSubmit},React.createElement(l.c,null,React.createElement(l.e,{for:"language"},Translator.trans("menu_item.property.language")),React.createElement(l.d,{type:"select",onChange:this.handleLanguageChange},[...e].map(e=>React.createElement("option",{key:e.id,value:e.languageCode},e.name)))),React.createElement(l.c,null,React.createElement(l.e,{for:"item_name"},Translator.trans("menu_item.property.name")," (",this.state.language,")"),React.createElement(l.d,{type:"text",name:"name",value:this.getInputValue(this.state.name),id:"item_name",onChange:this.handleLocalizedInputChange})),React.createElement(l.a,{type:"submit",className:"pull-right",color:"primary"},Translator.trans("menu_item.edit_form.save")),React.createElement(l.a,{type:"button",onClick:this.handleCancel},Translator.trans("menu_item.edit_form.cancel"))))}}u.propTypes={item:s.a.object,onSubmit:s.a.func,onCancel:s.a.func};var c=n("A+co");n.d(t,"default",function(){return m});class m extends c.default{getTreeType(){return{icon:"oi oi-folder",max_children:-1,max_depth:-1,valid_children:-1}}getEditForm(e,t,n){return r.a.createElement(u,{item:e,onSubmit:t,onCancel:n})}}},zCKm:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=n("F1df");class r{getTreeType(){return{icon:"oi oi-link-intact",max_children:-1,max_depth:-1,valid_children:-1}}constructor(e,t){this._identifier=e,this._type=t}get identifier(){return this._identifier}get type(){return this._type}getContextualMenu(e,t,n){const a=e.getNode(t.parent);let r={};return n.getOption("active",!0)?r.desactivateItem={label:Translator.trans("menu_item.action.desactivate"),action:t=>{e.getNode(t.reference).data.options.active=!1,e.onTreeChange()}}:r.activateItem={label:Translator.trans("menu_item.action.activate"),action:t=>{e.getNode(t.reference).data.options.active=!0,e.onTreeChange()}},t.state.disabled&&!a.state.disabled?r.restoreItem={label:Translator.trans("menu_item.action.restore"),action:t=>{e.enableTree(t.reference),e.onTreeChange()}}:r.removeItem={label:Translator.trans("menu_item.action.remove"),action:t=>{e.disableTree(t.reference),e.onTreeChange()}},r}getContextualMenuCreateBtn(e,t){return null}getNewItem(e){const t={id:null,name:Translator.trans("menu_item.default_title"),type:this._type};return e=Object.assign(t,e||{}),new a.a(e)}}}});