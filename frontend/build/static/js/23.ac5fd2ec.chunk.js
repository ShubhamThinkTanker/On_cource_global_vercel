(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[23],{366:function(e,a,s){"use strict";var t=s(20),c=s(21),r=s(1),l=s.n(r),n=s(8),o=s.n(n),i=s(48),j=s.n(i),d=s(63),b=o.a.oneOfType([o.a.number,o.a.string]),u=o.a.oneOfType([o.a.bool,o.a.number,o.a.string,o.a.shape({size:o.a.oneOfType([o.a.bool,o.a.number,o.a.string]),order:b,offset:b})]),f={tag:d.q,xs:u,sm:u,md:u,lg:u,xl:u,className:o.a.string,cssModule:o.a.object,widths:o.a.array},h={tag:"div",widths:["xs","sm","md","lg","xl"]},m=function(e,a,s){return!0===s||""===s?e?"col":"col-"+a:"auto"===s?e?"col-auto":"col-"+a+"-auto":e?"col-"+s:"col-"+a+"-"+s},O=function(e){var a=e.className,s=e.cssModule,r=e.widths,n=e.tag,o=Object(c.a)(e,["className","cssModule","widths","tag"]),i=[];r.forEach((function(a,t){var c=e[a];if(delete o[a],c||""===c){var r=!t;if(Object(d.k)(c)){var l,n=r?"-":"-"+a+"-",b=m(r,a,c.size);i.push(Object(d.m)(j()(((l={})[b]=c.size||""===c.size,l["order"+n+c.order]=c.order||0===c.order,l["offset"+n+c.offset]=c.offset||0===c.offset,l)),s))}else{var u=m(r,a,c);i.push(u)}}})),i.length||i.push("col");var b=Object(d.m)(j()(a,i),s);return l.a.createElement(n,Object(t.a)({},o,{className:b}))};O.propTypes=f,O.defaultProps=h,a.a=O},367:function(e,a,s){"use strict";var t=s(20),c=s(21),r=s(1),l=s.n(r),n=s(8),o=s.n(n),i=s(48),j=s.n(i),d=s(63),b=o.a.oneOfType([o.a.number,o.a.string]),u={tag:d.q,noGutters:o.a.bool,className:o.a.string,cssModule:o.a.object,form:o.a.bool,xs:b,sm:b,md:b,lg:b,xl:b},f={tag:"div",widths:["xs","sm","md","lg","xl"]},h=function(e){var a=e.className,s=e.cssModule,r=e.noGutters,n=e.tag,o=e.form,i=e.widths,b=Object(c.a)(e,["className","cssModule","noGutters","tag","form","widths"]),u=[];i.forEach((function(a,s){var t=e[a];if(delete b[a],t){var c=!s;u.push(c?"row-cols-"+t:"row-cols-"+a+"-"+t)}}));var f=Object(d.m)(j()(a,r?"no-gutters":null,o?"form-row":"row",u),s);return l.a.createElement(n,Object(t.a)({},b,{className:f}))};h.propTypes=u,h.defaultProps=f,a.a=h},379:function(e,a,s){"use strict";var t=s(20),c=s(21),r=s(1),l=s.n(r),n=s(8),o=s.n(n),i=s(48),j=s.n(i),d=s(63),b={tag:d.q,inverse:o.a.bool,color:o.a.string,body:o.a.bool,outline:o.a.bool,className:o.a.string,cssModule:o.a.object,innerRef:o.a.oneOfType([o.a.object,o.a.string,o.a.func])},u=function(e){var a=e.className,s=e.cssModule,r=e.color,n=e.body,o=e.inverse,i=e.outline,b=e.tag,u=e.innerRef,f=Object(c.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),h=Object(d.m)(j()(a,"card",!!o&&"text-white",!!n&&"card-body",!!r&&(i?"border":"bg")+"-"+r),s);return l.a.createElement(b,Object(t.a)({},f,{className:h,ref:u}))};u.propTypes=b,u.defaultProps={tag:"div"},a.a=u},380:function(e,a,s){"use strict";var t=s(20),c=s(21),r=s(1),l=s.n(r),n=s(8),o=s.n(n),i=s(48),j=s.n(i),d=s(63),b={tag:d.q,className:o.a.string,cssModule:o.a.object,innerRef:o.a.oneOfType([o.a.object,o.a.string,o.a.func])},u=function(e){var a=e.className,s=e.cssModule,r=e.innerRef,n=e.tag,o=Object(c.a)(e,["className","cssModule","innerRef","tag"]),i=Object(d.m)(j()(a,"card-body"),s);return l.a.createElement(n,Object(t.a)({},o,{className:i,ref:r}))};u.propTypes=b,u.defaultProps={tag:"div"},a.a=u},399:function(e,a,s){"use strict";var t=s(26),c=s(1),r=s(912),l=s(431),n=s(908),o=s(909),i=s(361),j=s(96),d=s(505),b=s(504),u=s(506),f=s(94),h=s(383),m=s(370),O=s(904),g=s(957),x=s(905),p=s(907),v=s(563),N=s(497),C=s(410),w=s(98),y=s(12),M=function(){var e=Object(f.b)(),a=Object(c.useState)(null),s=Object(t.a)(a,2),r=s[0],l=s[1];Object(c.useEffect)((function(){null!==Object(m.e)()&&l(JSON.parse(localStorage.getItem("userData")))}),[]);var n=r&&r.profile_image||C.a;return Object(y.jsxs)(O.a,{tag:"li",className:"dropdown-user nav-item",children:[Object(y.jsxs)(g.a,{href:"/",tag:"a",className:"nav-link dropdown-user-link d-flex ",style:{gap:"1rem"},onClick:function(e){return e.preventDefault()},children:[Object(y.jsxs)("div",{className:"user-nav d-sm-flex flex-column justify-content-end d-none text-right",children:[Object(y.jsx)("span",{className:"user-name font-weight-bold",children:r&&r.username||"John Doe"}),Object(y.jsx)("small",{className:"user-status",children:null===r||void 0===r?void 0:r.role})]}),Object(y.jsx)(h.a,{img:n,imgHeight:"40",imgWidth:"40",status:"online"})]}),Object(y.jsxs)(x.a,{right:!0,children:[Object(y.jsxs)(p.a,{tag:i.b,to:"/student/profile",children:[Object(y.jsx)(v.a,{size:14,className:"mr-75"}),Object(y.jsx)("span",{className:"align-middle",children:"Profile"})]}),Object(y.jsxs)(p.a,{tag:i.b,to:"/login",onClick:function(a){a.preventDefault(),e(Object(w.h)())},children:[Object(y.jsx)(N.a,{size:14,className:"mr-75"}),Object(y.jsx)("span",{className:"align-middle",children:"Logout"})]})]})]})};a.a=function(){return Object(y.jsxs)(r.a,{className:"student-nav ",children:[Object(y.jsx)(i.b,{className:"brand-logo",to:"/",children:Object(y.jsx)("img",{src:j.default,alt:"logo"})}),Object(y.jsxs)(l.a,{className:"ml-auto nav navbar-nav align-items-center",children:[Object(y.jsx)(n.a,{children:Object(y.jsxs)(o.a,{href:"",children:[Object(y.jsx)(d.a,{className:"mr-1"}),"Tests & Prep"]})}),Object(y.jsx)(n.a,{children:Object(y.jsxs)(o.a,{as:i.b,to:"/student/results",children:[Object(y.jsx)(b.a,{className:"mr-1"}),"Scores"]})}),Object(y.jsx)(n.a,{children:Object(y.jsxs)(o.a,{href:"",children:[Object(y.jsx)(u.a,{className:"mr-1"}),"Plans"]})}),Object(y.jsx)(M,{})]})]})}},400:function(e,a,s){"use strict";s(1);var t=s(416),c=s(417),r=s(12);a.a=function(){return Object(r.jsx)("div",{className:"main-footer",children:Object(r.jsx)("div",{className:"container",children:Object(r.jsxs)(t.a,{horizontal:!0,children:[Object(r.jsxs)(t.a,{vertical:!0,children:[Object(r.jsx)(c.a,{tag:"h4",children:"Contact Infromation"}),Object(r.jsx)(c.a,{href:"mailto:info@oncourseglobal.com",tag:"a",children:"info@oncourseglobal.com"}),Object(r.jsxs)(t.a,{horizontal:!0,className:"footer-social-icons",children:[Object(r.jsx)(c.a,{href:"https://www.facebook.com/OnCourseVantage/",tag:"a",children:Object(r.jsxs)("svg",{fill:"#ffffff",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24px",height:"24px",children:[" ",Object(r.jsx)("path",{d:"M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2 C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z"})]})}),Object(r.jsx)(c.a,{href:"https://www.facebook.com/OnCourseVantage/",tag:"a",children:Object(r.jsx)("svg",{fill:"#ffffff",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24px",height:"24px",children:Object(r.jsx)("path",{d:"M 24 4.300781 C 23.101563 4.699219 22.199219 5 21.199219 5.101563 C 22.199219 4.5 23 3.5 23.398438 2.398438 C 22.398438 3 21.398438 3.398438 20.300781 3.601563 C 19.300781 2.601563 18 2 16.601563 2 C 13.898438 2 11.699219 4.199219 11.699219 6.898438 C 11.699219 7.300781 11.699219 7.699219 11.800781 8 C 7.699219 7.800781 4.101563 5.898438 1.699219 2.898438 C 1.199219 3.601563 1 4.5 1 5.398438 C 1 7.101563 1.898438 8.601563 3.199219 9.5 C 2.398438 9.398438 1.601563 9.199219 1 8.898438 C 1 8.898438 1 8.898438 1 9 C 1 11.398438 2.699219 13.398438 4.898438 13.800781 C 4.5 13.898438 4.101563 14 3.601563 14 C 3.300781 14 3 14 2.699219 13.898438 C 3.300781 15.898438 5.101563 17.300781 7.300781 17.300781 C 5.601563 18.601563 3.5 19.398438 1.199219 19.398438 C 0.800781 19.398438 0.398438 19.398438 0 19.300781 C 2.199219 20.699219 4.800781 21.5 7.5 21.5 C 16.601563 21.5 21.5 14 21.5 7.5 C 21.5 7.300781 21.5 7.101563 21.5 6.898438 C 22.5 6.199219 23.300781 5.300781 24 4.300781"})})}),Object(r.jsx)(c.a,{href:"https://www.facebook.com/OnCourseVantage/",tag:"a",children:Object(r.jsxs)("svg",{fill:"#ffffff",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 50 50",width:"50px",height:"50px",children:[" ",Object(r.jsx)("path",{d:"M 8 3.0097656 C 4.53 3.0097656 2.0097656 5.0892187 2.0097656 7.9492188 C 2.0097656 10.819219 4.59 12.990234 8 12.990234 C 11.47 12.990234 13.990234 10.870625 13.990234 7.890625 C 13.830234 5.020625 11.36 3.0097656 8 3.0097656 z M 3 15 C 2.45 15 2 15.45 2 16 L 2 45 C 2 45.55 2.45 46 3 46 L 13 46 C 13.55 46 14 45.55 14 45 L 14 16 C 14 15.45 13.55 15 13 15 L 3 15 z M 18 15 C 17.45 15 17 15.45 17 16 L 17 45 C 17 45.55 17.45 46 18 46 L 27 46 C 27.552 46 28 45.552 28 45 L 28 30 L 28 29.75 L 28 29.5 C 28 27.13 29.820625 25.199531 32.140625 25.019531 C 32.260625 24.999531 32.38 25 32.5 25 C 32.62 25 32.739375 24.999531 32.859375 25.019531 C 35.179375 25.199531 37 27.13 37 29.5 L 37 45 C 37 45.552 37.448 46 38 46 L 47 46 C 47.55 46 48 45.55 48 45 L 48 28 C 48 21.53 44.529063 15 36.789062 15 C 33.269062 15 30.61 16.360234 29 17.490234 L 29 16 C 29 15.45 28.55 15 28 15 L 18 15 z"})]})}),Object(r.jsx)(c.a,{href:"https://www.facebook.com/OnCourseVantage/",tag:"a",children:Object(r.jsxs)("svg",{fill:"#ffffff",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 50 50",width:"24px",height:"24px",children:[Object(r.jsx)("path",{d:"M34,3H16C8.83,3,3,8.83,3,16v18c0,7.17,5.83,13,13,13h18c7.17,0,13-5.83,13-13V16C47,8.83,41.17,3,34,3z M25,36c-6.07,0-11-4.93-11-11s4.93-11,11-11s11,4.93,11,11S31.07,36,25,36z M37,15c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S38.1,15,37,15z"}),Object(r.jsx)("path",{d:"M34,25c0,4.96-4.04,9-9,9s-9-4.04-9-9s4.04-9,9-9S34,20.04,34,25z"})]})})]})]}),Object(r.jsxs)(t.a,{vertical:!0,className:"footer-links-col",children:[Object(r.jsx)(c.a,{tag:"h4",children:"Links"}),Object(r.jsx)(c.a,{href:"",tag:"a",children:"Undergraduate"}),Object(r.jsx)(c.a,{href:"",tag:"a",children:"Postgraduate"}),Object(r.jsx)(c.a,{href:"",tag:"a",children:"OnCourse Life Courses"}),Object(r.jsx)(c.a,{href:"",tag:"a",children:"K-12 Courses"}),Object(r.jsx)(c.a,{href:"",tag:"a",children:"Test Prep"})]}),Object(r.jsxs)(t.a,{vertical:!0,children:[Object(r.jsx)(c.a,{tag:"h4",children:"Our Offices"}),Object(r.jsxs)(c.a,{className:"address-col",children:[Object(r.jsx)("p",{children:"Mumbai Office (Worli)"}),"No. 403C, \u2018B\u2019 Wing, Poonam Chambers, 4th Floor Dr. Annie Besant Road, Worli, Mumbai 400018",Object(r.jsxs)("p",{className:"tel_p",children:["Phone:\xa0",Object(r.jsx)("a",{href:"tel:91 22 6145 3737",children:"+91 22 6145 3737"})]})]}),Object(r.jsxs)(c.a,{className:"address-col",children:[Object(r.jsx)("p",{children:"Ahmedabad Office"}),"'Anand' Bungalow, Next to 426 Apartments, Vastapur-Thaltej Rd, Ahmedabad 380054",Object(r.jsxs)("p",{className:"tel_p",children:["Phone:\xa0",Object(r.jsx)("a",{href:"tel:91 99 7989 3737",children:"+91 99 7989 3737"})]})]})]}),Object(r.jsxs)(t.a,{vertical:!0,children:[Object(r.jsx)(c.a,{tag:"h4",className:"second-col-address"}),Object(r.jsxs)(c.a,{className:"address-col",children:[Object(r.jsx)("p",{children:"Delhi Office"}),"E-92 Anand Niketan, New Delhi-110021",Object(r.jsxs)("p",{className:"tel_p",children:["Phone:\xa0\xa0",Object(r.jsx)("a",{href:"tel:91 11 49452525",children:"+91 11 49452525"})]})]}),Object(r.jsxs)(c.a,{className:"address-col",children:[Object(r.jsx)("p",{children:"Gurgaon Office"}),"Batra House 52, Institutional Area, Sector 32, Gurgaon, Haryana-122009",Object(r.jsxs)("p",{className:"tel_p",children:["Phone:\xa0",Object(r.jsx)("a",{href:"tel:+9101244171200",children:"0124-4171200"})]})]})]})]})})})}},416:function(e,a,s){"use strict";var t=s(20),c=s(21),r=s(1),l=s.n(r),n=s(8),o=s.n(n),i=s(48),j=s.n(i),d=s(63),b={tag:d.q,flush:o.a.bool,className:o.a.string,cssModule:o.a.object,horizontal:o.a.oneOfType([o.a.bool,o.a.string])},u=function(e){var a=e.className,s=e.cssModule,r=e.tag,n=e.flush,o=e.horizontal,i=Object(c.a)(e,["className","cssModule","tag","flush","horizontal"]),b=Object(d.m)(j()(a,"list-group",n?"list-group-flush":function(e){return!1!==e&&(!0===e||"xs"===e?"list-group-horizontal":"list-group-horizontal-"+e)}(o)),s);return l.a.createElement(r,Object(t.a)({},i,{className:b}))};u.propTypes=b,u.defaultProps={tag:"ul",horizontal:!1},a.a=u},417:function(e,a,s){"use strict";var t=s(20),c=s(21),r=s(1),l=s.n(r),n=s(8),o=s.n(n),i=s(48),j=s.n(i),d=s(63),b={tag:d.q,active:o.a.bool,disabled:o.a.bool,color:o.a.string,action:o.a.bool,className:o.a.any,cssModule:o.a.object},u=function(e){e.preventDefault()},f=function(e){var a=e.className,s=e.cssModule,r=e.tag,n=e.active,o=e.disabled,i=e.action,b=e.color,f=Object(c.a)(e,["className","cssModule","tag","active","disabled","action","color"]),h=Object(d.m)(j()(a,!!n&&"active",!!o&&"disabled",!!i&&"list-group-item-action",!!b&&"list-group-item-"+b,"list-group-item"),s);return o&&(f.onClick=u),l.a.createElement(r,Object(t.a)({},f,{className:h}))};f.propTypes=b,f.defaultProps={tag:"li"},a.a=f},431:function(e,a,s){"use strict";var t=s(20),c=s(21),r=s(1),l=s.n(r),n=s(8),o=s.n(n),i=s(48),j=s.n(i),d=s(63),b={tabs:o.a.bool,pills:o.a.bool,vertical:o.a.oneOfType([o.a.bool,o.a.string]),horizontal:o.a.string,justified:o.a.bool,fill:o.a.bool,navbar:o.a.bool,card:o.a.bool,tag:d.q,className:o.a.string,cssModule:o.a.object},u=function(e){var a=e.className,s=e.cssModule,r=e.tabs,n=e.pills,o=e.vertical,i=e.horizontal,b=e.justified,u=e.fill,f=e.navbar,h=e.card,m=e.tag,O=Object(c.a)(e,["className","cssModule","tabs","pills","vertical","horizontal","justified","fill","navbar","card","tag"]),g=Object(d.m)(j()(a,f?"navbar-nav":"nav",!!i&&"justify-content-"+i,function(e){return!1!==e&&(!0===e||"xs"===e?"flex-column":"flex-"+e+"-column")}(o),{"nav-tabs":r,"card-header-tabs":h&&r,"nav-pills":n,"card-header-pills":h&&n,"nav-justified":b,"nav-fill":u}),s);return l.a.createElement(m,Object(t.a)({},O,{className:g}))};u.propTypes=b,u.defaultProps={tag:"ul",vertical:!1},a.a=u},454:function(e,a,s){"use strict";var t=s(20),c=s(21),r=s(1),l=s.n(r),n=s(8),o=s.n(n),i=s(48),j=s.n(i),d=s(63),b={tag:d.q,className:o.a.string,cssModule:o.a.object},u=function(e){var a=e.className,s=e.cssModule,r=e.tag,n=Object(c.a)(e,["className","cssModule","tag"]),o=Object(d.m)(j()(a,"card-header"),s);return l.a.createElement(r,Object(t.a)({},n,{className:o}))};u.propTypes=b,u.defaultProps={tag:"div"},a.a=u},475:function(e,a,s){"use strict";var t=s(95),c=(s(1),s(366)),r=s(379),l=s(454),n=s(359),o=s(380),i=s.p+"static/media/favicon.71045d40.ico",j=s(94),d=s(99),b=s(12),u=["testProgress","stats","statTitle","buttonReport","className","args","isRowVisible"];a.a=function(e){var a=e.testProgress,s=e.stats,f=e.statTitle,h=(e.buttonReport,e.className),m=(e.args,e.isRowVisible,Object(t.a)(e,u),Object(j.b)());return Object(b.jsx)(c.a,{md:"3",children:Object(b.jsxs)(r.a,{className:"text-center subject-card mytest-card-main",children:[Object(b.jsxs)(l.a,{children:[Object(b.jsx)("div",{className:"test-overlay"}),Object(b.jsxs)("div",{className:"mytest-card-header",children:[Object(b.jsx)("span",{className:"my-test-progress",children:a}),Object(b.jsx)(n.a.Ripple,{color:"primary",className:"my-test-button",outline:!0,onClick:function(){return m(Object(d.k)(!0))},children:"Go to Test"})]})]}),Object(b.jsxs)(o.a,{className:h,children:[Object(b.jsx)("h4",{className:"my-test-heading",children:s}),Object(b.jsxs)("p",{className:"card-text line-ellipsis",children:[f,Object(b.jsx)("img",{src:i})]})]})]})})}},958:function(e,a,s){"use strict";s.r(a);var t=s(1),c=s.n(t),r=s(20),l=s(21),n=s(8),o=s.n(n),i=s(48),j=s.n(i),d=s(63),b={tag:d.q,fluid:o.a.oneOfType([o.a.bool,o.a.string]),className:o.a.string,cssModule:o.a.object},u=function(e){var a=e.className,s=e.cssModule,t=e.fluid,n=e.tag,o=Object(l.a)(e,["className","cssModule","fluid","tag"]),i="container";!0===t?i="container-fluid":t&&(i="container-"+t);var b=Object(d.m)(j()(a,i),s);return c.a.createElement(n,Object(r.a)({},o,{className:b}))};u.propTypes=b,u.defaultProps={tag:"div"};var f=u,h=s(367),m=s(400),O=s(399),g=s(475),x=s(12);a.default=function(){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(O.a,{}),Object(x.jsxs)(f,{children:[Object(x.jsx)("h2",{className:"my-test-title",children:"My Tests"}),Object(x.jsxs)(h.a,{children:[Object(x.jsx)(g.a,{testProgress:"Progress 0%",stats:"Act Test 19",statTitle:"by oncourse global"}),Object(x.jsx)(g.a,{testProgress:"Progress 0%",stats:"Gmat Test 2",statTitle:"by oncourse global"})]})]}),Object(x.jsx)(m.a,{})]})}}}]);
//# sourceMappingURL=23.ac5fd2ec.chunk.js.map