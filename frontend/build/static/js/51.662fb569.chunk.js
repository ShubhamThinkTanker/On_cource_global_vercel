(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[51],{387:function(e,t,a){"use strict";var r=a(15),s=a(33),n=a(26),c=a(95),i=a(1),o=a(48),l=a.n(o),j=a(525),u=a(524),d=a(369),b=a(373),h=a(368),m=a(418),g=a(388),f=a(12),O=["label","hideIcon","showIcon","visible","className","htmlFor","placeholder","iconSize","inputClassName"],p=function(e){var t=e.label,a=e.hideIcon,o=e.showIcon,p=e.visible,x=e.className,v=e.htmlFor,k=e.placeholder,y=e.iconSize,N=e.inputClassName,w=Object(c.a)(e,O),T=Object(i.useState)(p),C=Object(n.a)(T,2),S=C[0],R=C[1];return Object(f.jsxs)(i.Fragment,{children:[t?Object(f.jsx)(d.a,{for:v,children:t}):null,Object(f.jsxs)(b.a,{className:l()(Object(s.a)({},x,x)),children:[Object(f.jsx)(h.a,Object(r.a)(Object(r.a)({type:!1===S?"password":"text",placeholder:k||"\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7\xb7",className:l()(Object(s.a)({},N,N))},t&&v?{id:v}:{}),w)),Object(f.jsx)(m.a,{addonType:"append",onClick:function(){return R(!S)},children:Object(f.jsx)(g.a,{className:"cursor-pointer",children:function(){var e=y||14;return!1===S?a||Object(f.jsx)(j.a,{size:e}):o||Object(f.jsx)(u.a,{size:e})}()})})]})]})};t.a=p,p.defaultProps={visible:!1}},942:function(e,t,a){"use strict";a.r(t);var r=a(33),s=a(15),n=a(26),c=a(1),i=a(370),o=a(48),l=a.n(o),j=a(386),u=a(103),d=a(104),b=a(4),h=a.n(b),m={loginEndpoint:"/jwt/login",registerEndpoint:"/jwt/register",refreshEndpoint:"/jwt/refresh-token",logoutEndpoint:"/jwt/logout",tokenType:"Bearer",storageTokenKeyName:"accessToken",storageRefreshTokenKeyName:"refreshToken"},g=function(){function e(t){var a=this;Object(u.a)(this,e),this.jwtConfig=Object(s.a)({},m),this.isAlreadyFetchingAccessToken=!1,this.subscribers=[],this.jwtConfig=Object(s.a)(Object(s.a)({},this.jwtConfig),t),h.a.interceptors.request.use((function(e){var t=a.getToken();return t&&(e.headers.Authorization="".concat(a.jwtConfig.tokenType," ").concat(t)),e}),(function(e){return Promise.reject(e)})),h.a.interceptors.response.use((function(e){return e}),(function(e){var t=e.config,r=e.response,s=t;return r&&401===r.status?(a.isAlreadyFetchingAccessToken||(a.isAlreadyFetchingAccessToken=!0,a.refreshToken().then((function(e){a.isAlreadyFetchingAccessToken=!1,a.setToken(e.data.accessToken),a.setRefreshToken(e.data.refreshToken),a.onAccessTokenFetched(e.data.accessToken)}))),new Promise((function(e){a.addSubscriber((function(t){s.headers.Authorization="".concat(a.jwtConfig.tokenType," ").concat(t),e(a.axios(s))}))}))):Promise.reject(e)}))}return Object(d.a)(e,[{key:"onAccessTokenFetched",value:function(e){this.subscribers=this.subscribers.filter((function(t){return t(e)}))}},{key:"addSubscriber",value:function(e){this.subscribers.push(e)}},{key:"getToken",value:function(){return localStorage.getItem(this.jwtConfig.storageTokenKeyName)}},{key:"getRefreshToken",value:function(){return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)}},{key:"setToken",value:function(e){localStorage.setItem(this.jwtConfig.storageTokenKeyName,e)}},{key:"setRefreshToken",value:function(e){localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName,e)}},{key:"login",value:function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return h.a.post.apply(h.a,[this.jwtConfig.loginEndpoint].concat(t))}},{key:"register",value:function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return h.a.post.apply(h.a,[this.jwtConfig.registerEndpoint].concat(t))}},{key:"refreshToken",value:function(){return h.a.post(this.jwtConfig.refreshEndpoint,{refreshToken:this.getRefreshToken()})}}]),e}();var f={jwt:new g({})}.jwt,O=a(94),p=a(896),x=a(372),v=a(361),k=a(102),y=a(387),N=a(526),w=a(557),T=a(540),C=a(531),S=a(367),R=a(366),A=a(391),F=a(395),z=a(371),I=a(898),E=a(369),P=a(368),K=a(952),q=a(359),D=a(96),J=(a(393),a(98),a(12));t.default=function(){var e,t=Object(c.useContext)(k.a),o=Object(j.a)(),u=Object(n.a)(o,2),d=u[0],b=(u[1],Object(x.g)()),h=(Object(O.b)(),Object(p.a)()),m=h.register,g=h.errors,U=h.handleSubmit,B=(h.trigger,Object(c.useState)("")),L=Object(n.a)(B,2),V=L[0],W=L[1],G=Object(c.useState)({}),H=Object(n.a)(G,2),M=H[0],Q=H[1],X=Object(c.useState)(""),Y=Object(n.a)(X,2),Z=Y[0],$=Y[1],_=Object(c.useState)(""),ee=Object(n.a)(_,2),te=ee[0],ae=ee[1],re=Object(c.useState)(!1),se=Object(n.a)(re,2),ne=(se[0],se[1]),ce="dark"===d?"register-v2-dark.svg":"register-v2.svg",ie=a(401)("./".concat(ce)).default,oe=function(){return Object(J.jsxs)(c.Fragment,{children:["I agree to",Object(J.jsx)("a",{className:"ml-25",href:"/",onClick:function(e){return e.preventDefault()},children:"privacy policy & terms"})]})};return Object(J.jsx)("div",{className:"auth-wrapper auth-v2",children:Object(J.jsxs)(S.a,{className:"auth-inner m-0",children:[Object(J.jsx)(v.b,{className:"brand-logo",to:"/",onClick:function(e){return e.preventDefault()},children:Object(J.jsx)("img",{src:D.default,alt:"logo"})}),Object(J.jsx)(R.a,{className:"d-none d-lg-flex align-items-center p-5",lg:"8",sm:"12",children:Object(J.jsx)("div",{className:"w-100 d-lg-flex align-items-center justify-content-center px-5",children:Object(J.jsx)("img",{className:"img-fluid",src:ie,alt:"Login V2"})})}),Object(J.jsx)(R.a,{className:"d-flex align-items-center auth-bg px-2 p-lg-5",lg:"4",sm:"12",children:Object(J.jsxs)(R.a,{className:"px-xl-2 mx-auto",sm:"8",md:"6",lg:"12",children:[Object(J.jsx)(A.a,{tag:"h2",className:"font-weight-bold mb-1",children:"Welcome to Uprep! \ud83d\udc4b"}),Object(J.jsx)(F.a,{className:"mb-2",children:"Please register your account and start !!"}),Object(J.jsxs)(z.a,{action:"/",className:"auth-register-form mt-2",onSubmit:U((function(){Object(i.c)(g)&&f.register({username:Z,email:V,password:te}).then((function(e){if(e.data.error){var a={};for(var r in e.data.error)null!==e.data.error[r]&&(a[r]=e.data.error[r]);Q(a),null!==e.data.error.email&&console.error(e.data.error.email),null!==e.data.error.username&&console.error(e.data.error.username)}else{Q({});Object(s.a)(Object(s.a)({},e.data.user),{},{accessToken:e.data.accessToken});t.update(e.data.user.ability),b.push("/")}})).catch((function(e){return console.log(e)}))})),children:[Object(J.jsxs)(I.a,{children:[Object(J.jsx)(E.a,{className:"form-label",for:"register-username",children:"Username"}),Object(J.jsx)(P.a,{autoFocus:!0,type:"text",value:Z,placeholder:"johndoe",id:"register-username",name:"register-username",onChange:function(e){var t=M;t.username&&delete t.username,$(e.target.value),Q(t)},className:l()({"is-invalid":g["register-username"]}),innerRef:m({required:!0,validate:function(e){return""!==e}})}),Object.keys(M).length&&M.username?Object(J.jsx)("small",{className:"text-danger",children:M.username}):null]}),Object(J.jsxs)(I.a,{children:[Object(J.jsx)(E.a,{className:"form-label",for:"register-email",children:"Email"}),Object(J.jsx)(P.a,{type:"email",value:V,id:"register-email",name:"register-email",onChange:function(e){var t=M;t.email&&delete t.email,W(e.target.value),Q(t)},placeholder:"john@example.com",className:l()({"is-invalid":g["register-email"]}),innerRef:m({required:!0,validate:function(e){return""!==e}})}),Object.keys(M).length&&M.email?Object(J.jsx)("small",{className:"text-danger",children:M.email}):null]}),Object(J.jsxs)(I.a,{children:[Object(J.jsx)(E.a,{className:"form-label",for:"register-password",children:"Password"}),Object(J.jsx)(y.a,(e={value:te,id:"register-password",name:"register-password",className:"input-group-merge",onChange:function(e){return ae(e.target.value)}},Object(r.a)(e,"className",l()({"is-invalid":g["register-password"]})),Object(r.a)(e,"innerRef",m({required:!0,validate:function(e){return""!==e}})),e))]}),Object(J.jsx)(I.a,{children:Object(J.jsx)(K.a,{type:"checkbox",id:"terms",name:"terms",value:"terms",label:Object(J.jsx)(oe,{}),className:"custom-control-Primary",innerRef:m({required:!0}),onChange:function(e){return ne(e.target.checked)},invalid:g.terms&&!0})}),Object(J.jsx)(q.a.Ripple,{type:"submit",block:!0,color:"primary",children:"Sign up"})]}),Object(J.jsxs)("p",{className:"text-center mt-2",children:[Object(J.jsx)("span",{className:"mr-25",children:"Already have an account?"}),Object(J.jsx)(v.b,{to:"/login",children:Object(J.jsx)("span",{className:"link-text",children:"Sign in instead"})})]}),Object(J.jsx)("div",{className:"divider my-2",children:Object(J.jsx)("div",{className:"divider-text",children:"or"})}),Object(J.jsxs)("div",{className:"auth-footer-btn d-flex justify-content-center",children:[Object(J.jsx)(q.a.Ripple,{color:"facebook",children:Object(J.jsx)(N.a,{size:14})}),Object(J.jsx)(q.a.Ripple,{color:"twitter",children:Object(J.jsx)(w.a,{size:14})}),Object(J.jsx)(q.a.Ripple,{color:"google",children:Object(J.jsx)(T.a,{size:14})}),Object(J.jsx)(q.a.Ripple,{className:"mr-0",color:"github",children:Object(J.jsx)(C.a,{size:14})})]})]})})]})})}}}]);
//# sourceMappingURL=51.662fb569.chunk.js.map