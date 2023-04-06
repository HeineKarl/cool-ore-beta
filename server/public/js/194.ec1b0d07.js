"use strict";(self["webpackChunkcool_ore"]=self["webpackChunkcool_ore"]||[]).push([[194],{3194:function(e,t,l){l.r(t),l.d(t,{default:function(){return K}});var n=l(3396),a=l(870),o=l(4357),u=l(3185),r=l(4870),s=l(320),i=l(9888);const c=(0,s.aZ)({name:"VForm",props:{...(0,o.vC)()},emits:{"update:modelValue":e=>!0,submit:e=>!0},setup(e,t){let{slots:l,emit:a}=t;const s=(0,o.Np)(e),c=(0,r.iH)();function d(e){e.preventDefault(),s.reset()}function f(e){const t=e,l=s.validate();t.then=l.then.bind(l),t.catch=l.catch.bind(l),t.finally=l.finally.bind(l),a("submit",t),t.defaultPrevented||l.then((e=>{let{valid:t}=e;var l;t&&(null==(l=c.value)||l.submit())})),t.preventDefault()}return(0,i.L)((()=>{var e;return(0,n.Wm)("form",{ref:c,class:"v-form",novalidate:!0,onReset:d,onSubmit:f},[null==(e=l.default)?void 0:e.call(l,s)])})),(0,u.F)(s,c)}});var d=l(1138);const f=(0,s.aZ)({name:"VContainer",props:{fluid:{type:Boolean,default:!1},...(0,d.Q)()},setup(e,t){let{slots:l}=t;return(0,i.L)((()=>(0,n.Wm)(e.tag,{class:["v-container",{"v-container--fluid":e.fluid}]},l))),{}}});l(7658);var m=l(7139);const p=["sm","md","lg","xl","xxl"],v=["start","end","center"],g=["space-between","space-around","space-evenly"];function y(e,t){return p.reduce(((l,n)=>(l[e+(0,m.kC)(n)]=t(),l)),{})}const b=[...v,"baseline","stretch"],h=e=>b.includes(e),_=y("align",(()=>({type:String,default:null,validator:h}))),w=[...v,...g],C=e=>w.includes(e),S=y("justify",(()=>({type:String,default:null,validator:C}))),V=[...v,...g,"stretch"],j=e=>V.includes(e),k=y("alignContent",(()=>({type:String,default:null,validator:j}))),W={align:Object.keys(_),justify:Object.keys(S),alignContent:Object.keys(k)},$={align:"align",justify:"justify",alignContent:"align-content"};function x(e,t,l){let n=$[e];if(null!=l){if(t){const l=t.replace(e,"");n+=`-${l}`}return n+=`-${l}`,n.toLowerCase()}}const N=(0,s.aZ)({name:"VRow",props:{dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:h},..._,justify:{type:String,default:null,validator:C},...S,alignContent:{type:String,default:null,validator:j},...k,...(0,d.Q)()},setup(e,t){let{slots:l}=t;const a=(0,n.Fl)((()=>{const t=[];let l;for(l in W)W[l].forEach((n=>{const a=e[n],o=x(l,n,a);o&&t.push(o)}));return t.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),t}));return()=>{var t;return(0,n.h)(e.tag,{class:["v-row",a.value]},null==(t=l.default)?void 0:t.call(l))}}}),L=["sm","md","lg","xl","xxl"],O=(()=>L.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}))(),U=(()=>L.reduce(((e,t)=>(e["offset"+(0,m.kC)(t)]={type:[String,Number],default:null},e)),{}))(),B=(()=>L.reduce(((e,t)=>(e["order"+(0,m.kC)(t)]={type:[String,Number],default:null},e)),{}))(),F={col:Object.keys(O),offset:Object.keys(U),order:Object.keys(B)};function Z(e,t,l){let n=e;if(null!=l&&!1!==l){if(t){const l=t.replace(e,"");n+=`-${l}`}return"col"===e&&(n="v-"+n),"col"!==e||""!==l&&!0!==l?(n+=`-${l}`,n.toLowerCase()):n.toLowerCase()}}const D=["auto","start","end","center","baseline","stretch"],q=(0,s.aZ)({name:"VCol",props:{cols:{type:[Boolean,String,Number],default:!1},...O,offset:{type:[String,Number],default:null},...U,order:{type:[String,Number],default:null},...B,alignSelf:{type:String,default:null,validator:e=>D.includes(e)},...(0,d.Q)()},setup(e,t){let{slots:l}=t;const a=(0,n.Fl)((()=>{const t=[];let l;for(l in F)F[l].forEach((n=>{const a=e[n],o=Z(l,n,a);o&&t.push(o)}));const n=t.some((e=>e.startsWith("v-col-")));return t.push({"v-col":!n||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),t}));return()=>{var t;return(0,n.h)(e.tag,{class:a.value},null==(t=l.default)?void 0:t.call(l))}}});var E=l(165);const Q=e=>((0,n.dD)("data-v-4780ca03"),e=e(),(0,n.Cn)(),e),G={class:"contact"},R={class:"contact__img"},H=["src"],I={class:"contact__container"},P=Q((()=>(0,n._)("h2",null,"Contact Us",-1)));function T(e,t,o,u,r,s){return(0,n.wg)(),(0,n.iD)("div",G,[(0,n._)("div",R,[(0,n._)("img",{src:l(4281),alt:""},null,8,H)]),(0,n._)("div",I,[P,(0,n.Wm)(c,{class:"contact__form",modelValue:e.valid,"onUpdate:modelValue":t[3]||(t[3]=t=>e.valid=t)},{default:(0,n.w5)((()=>[(0,n.Wm)(f,null,{default:(0,n.w5)((()=>[(0,n.Wm)(N,null,{default:(0,n.w5)((()=>[(0,n.Wm)(q,{cols:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(E.hw,{modelValue:e.firstname,"onUpdate:modelValue":t[0]||(t[0]=t=>e.firstname=t),label:"First name",required:""},null,8,["modelValue"])])),_:1}),(0,n.Wm)(q,{cols:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(E.hw,{modelValue:e.lastname,"onUpdate:modelValue":t[1]||(t[1]=t=>e.lastname=t),label:"Last name",required:""},null,8,["modelValue"])])),_:1}),(0,n.Wm)(q,{cols:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(E.hw,{modelValue:e.email,"onUpdate:modelValue":t[2]||(t[2]=t=>e.email=t),label:"E-mail",required:""},null,8,["modelValue"])])),_:1})])),_:1}),(0,n.Wm)(a.T,{type:"submit",class:"mt-5",variant:"outlined",elevation:"0",block:""},{default:(0,n.w5)((()=>[(0,n.Uk)("Submit")])),_:1})])),_:1})])),_:1},8,["modelValue"])])])}var z={setup(){return{}}},A=l(89);const J=(0,A.Z)(z,[["render",T],["__scopeId","data-v-4780ca03"]]);var K=J},4281:function(e,t,l){e.exports=l.p+"img/contact__img.8fb2851c.jpg"}}]);
//# sourceMappingURL=194.ec1b0d07.js.map