(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[40],{362:function(e,t,n){"use strict";var a=n(361),r=n(374),s=n(375),c=n(12);t.a=function(e){var t=e.breadCrumbTitle,n=e.breadCrumbParent,i=e.breadCrumbParent2,o=e.breadCrumbParent3,l=e.breadCrumbActive;return Object(c.jsx)("div",{className:"content-header row",children:Object(c.jsx)("div",{className:"content-header-left col-md-9 col-12 mb-2",children:Object(c.jsx)("div",{className:"row breadcrumbs-top",children:Object(c.jsxs)("div",{className:"col-12",children:[t?Object(c.jsx)("h2",{className:"content-header-title float-left mb-0",children:t}):"",Object(c.jsx)("div",{className:"breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12",children:Object(c.jsxs)(r.a,{children:[Object(c.jsx)(s.a,{tag:"li",children:Object(c.jsx)(a.b,{to:"/",children:"Home"})}),Object(c.jsx)(s.a,{tag:"li",className:"text-primary",children:n}),i?Object(c.jsx)(s.a,{tag:"li",className:"text-primary",children:i}):"",o?Object(c.jsx)(s.a,{tag:"li",className:"text-primary",children:o}):"",Object(c.jsx)(s.a,{tag:"li",active:!0,children:l})]})})]})})})})}},371:function(e,t,n){"use strict";var a=n(20),r=n(21),s=n(49),c=n(93),i=n(1),o=n.n(i),l=n(8),u=n.n(l),d=n(48),h=n.n(d),b=n(63),j={children:u.a.node,inline:u.a.bool,tag:b.q,innerRef:u.a.oneOfType([u.a.object,u.a.func,u.a.string]),className:u.a.string,cssModule:u.a.object},f=function(e){function t(t){var n;return(n=e.call(this,t)||this).getRef=n.getRef.bind(Object(s.a)(n)),n.submit=n.submit.bind(Object(s.a)(n)),n}Object(c.a)(t,e);var n=t.prototype;return n.getRef=function(e){this.props.innerRef&&this.props.innerRef(e),this.ref=e},n.submit=function(){this.ref&&this.ref.submit()},n.render=function(){var e=this.props,t=e.className,n=e.cssModule,s=e.inline,c=e.tag,i=e.innerRef,l=Object(r.a)(e,["className","cssModule","inline","tag","innerRef"]),u=Object(b.m)(h()(t,!!s&&"form-inline"),n);return o.a.createElement(c,Object(a.a)({},l,{ref:i,className:u}))},t}(i.Component);f.propTypes=j,f.defaultProps={tag:"form"},t.a=f},404:function(e,t,n){"use strict";var a=n(15),r=n(95),s=n(12),c=["count","tag","component","children"],i=function(e){for(var t=e.count,n=e.tag,i=(e.component,e.children),o=Object(r.a)(e,c),l=n,u=[],d=0;d<t;d++)u.push(i(d));return Object(s.jsx)(l,Object(a.a)(Object(a.a)({},o),{},{children:u}))};i.defaultProps={tag:"div"},t.a=i},413:function(e,t,n){},420:function(e,t,n){e.exports=function(){"use strict";function e(e,t){if(e)for(var n in e)({}).hasOwnProperty.call(e,n)&&t(n,e[n])}function t(e){return void 0===e||null===e||0===e.length||0===e.trim().length}var n={unstyled:"p","header-one":"h1","header-two":"h2","header-three":"h3","header-four":"h4","header-five":"h5","header-six":"h6","unordered-list-item":"ul","ordered-list-item":"ol",blockquote:"blockquote",code:"pre"};function a(e){return e&&n[e]}function r(t){var n="";return e(t,(function(e,t){t&&(n+="".concat(e,":").concat(t,";"))})),n}function s(e,t){var n=[];if(t)for(var a=0,r=0,s=e,c=t.trigger||"#",i=t.separator||" ";s.length>0&&r>=0;)if(s[0]===c?(r=0,a=0,s=s.substr(c.length)):(r=s.indexOf(i+c))>=0&&(s=s.substr(r+(i+c).length),a+=r+i.length),r>=0){var o=s.indexOf(i)>=0?s.indexOf(i):s.length,l=s.substr(0,o);l&&l.length>0&&n.push({offset:a,length:l.length+c.length,type:"HASHTAG"}),a+=c.length}return n}function c(e,t){var n=[],a=0,r=e.entityRanges.map((function(e){return{offset:e.offset,length:e.length,key:e.key,type:"ENTITY"}}));return(r=(r=r.concat(s(e.text,t))).sort((function(e,t){return e.offset-t.offset}))).forEach((function(e){e.offset>a&&n.push({start:a,end:e.offset}),n.push({start:e.offset,end:e.offset+e.length,entityKey:e.key,type:e.type}),a=e.offset+e.length})),a<e.text.length&&n.push({start:a,end:e.text.length}),n}function i(e){return!(!(e.entityRanges.length>0)||!t(e.text)&&"atomic"!==e.type)}function o(e){var t=e.text,n=e.inlineStyleRanges,a={BOLD:new Array(t.length),ITALIC:new Array(t.length),UNDERLINE:new Array(t.length),STRIKETHROUGH:new Array(t.length),CODE:new Array(t.length),SUPERSCRIPT:new Array(t.length),SUBSCRIPT:new Array(t.length),COLOR:new Array(t.length),BGCOLOR:new Array(t.length),FONTSIZE:new Array(t.length),FONTFAMILY:new Array(t.length),length:t.length};return n&&n.length>0&&n.forEach((function(e){for(var t=e.offset,n=t+e.length,r=t;r<n;r+=1)0===e.style.indexOf("color-")?a.COLOR[r]=e.style.substring(6):0===e.style.indexOf("bgcolor-")?a.BGCOLOR[r]=e.style.substring(8):0===e.style.indexOf("fontsize-")?a.FONTSIZE[r]=e.style.substring(9):0===e.style.indexOf("fontfamily-")?a.FONTFAMILY[r]=e.style.substring(11):a[e.style]&&(a[e.style][r]=!0)})),a}function l(e,t){var n={};return e.COLOR[t]&&(n.COLOR=e.COLOR[t]),e.BGCOLOR[t]&&(n.BGCOLOR=e.BGCOLOR[t]),e.FONTSIZE[t]&&(n.FONTSIZE=e.FONTSIZE[t]),e.FONTFAMILY[t]&&(n.FONTFAMILY=e.FONTFAMILY[t]),e.UNDERLINE[t]&&(n.UNDERLINE=!0),e.ITALIC[t]&&(n.ITALIC=!0),e.BOLD[t]&&(n.BOLD=!0),e.STRIKETHROUGH[t]&&(n.STRIKETHROUGH=!0),e.CODE[t]&&(n.CODE=!0),e.SUBSCRIPT[t]&&(n.SUBSCRIPT=!0),e.SUPERSCRIPT[t]&&(n.SUPERSCRIPT=!0),n}function u(e,t,n){var a=!0;return n>0&&n<e.length?t.forEach((function(t){a=a&&e[t][n]===e[t][n-1]})):a=!1,a}function d(e,t){return"BOLD"===e?"<strong>".concat(t,"</strong>"):"ITALIC"===e?"<em>".concat(t,"</em>"):"UNDERLINE"===e?"<ins>".concat(t,"</ins>"):"STRIKETHROUGH"===e?"<del>".concat(t,"</del>"):"CODE"===e?"<code>".concat(t,"</code>"):"SUPERSCRIPT"===e?"<sup>".concat(t,"</sup>"):"SUBSCRIPT"===e?"<sub>".concat(t,"</sub>"):t}function h(e){return e&&e.length>0?e.map((function(e){switch(e){case"\n":return"<br>";case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";default:return e}})).join(""):""}function b(e,t){if(e&&(e.COLOR||e.BGCOLOR||e.FONTSIZE||e.FONTFAMILY)){var n='style="';return e.COLOR&&(n+="color: ".concat(e.COLOR,";")),e.BGCOLOR&&(n+="background-color: ".concat(e.BGCOLOR,";")),e.FONTSIZE&&(n+="font-size: ".concat(e.FONTSIZE).concat(/^\d+$/.test(e.FONTSIZE)?"px":"",";")),e.FONTFAMILY&&(n+="font-family: ".concat(e.FONTFAMILY,";")),"<span ".concat(n+='"',">").concat(t,"</span>")}return t}function j(e,t,n,a){var r=e[t];if("function"===typeof a){var s=a(r,n);if(s)return s}if("MENTION"===r.type)return'<a href="'.concat(r.data.url,'" class="wysiwyg-mention" data-mention data-value="').concat(r.data.value,'">').concat(n,"</a>");if("LINK"===r.type){var c=r.data.targetOption||"_self";return'<a href="'.concat(r.data.url,'" target="').concat(c,'">').concat(n,"</a>")}if("IMAGE"===r.type){var i=r.data.alignment;return i&&i.length?'<div style="text-align:'.concat(i,';"><img src="').concat(r.data.src,'" alt="').concat(r.data.alt,'" style="height: ').concat(r.data.height,";width: ").concat(r.data.width,'"/></div>'):'<img src="'.concat(r.data.src,'" alt="').concat(r.data.alt,'" style="height: ').concat(r.data.height,";width: ").concat(r.data.width,'"/>')}return"EMBEDDED_LINK"===r.type?'<iframe width="'.concat(r.data.width,'" height="').concat(r.data.height,'" src="').concat(r.data.src,'" frameBorder="0"></iframe>'):n}function f(e,t,n,a){var r=[],s=Array.from(e.text);if(s.length>0)for(var c,i=o(e),d=n;d<a;d+=1)d!==n&&u(i,t,d)?(c.text.push(s[d]),c.end=d+1):(c={styles:l(i,d),text:[s[d]],start:d,end:d+1},r.push(c));return r}function O(e){if(e){for(var t=e,n=0;n<t.length&&" "===e[n];n+=1)t=t.replace(" ","&nbsp;");return t}return e}function m(e){if(e){for(var t=e,n=t.length-1;n>=0&&" "===t[n];n-=1)t="".concat(t.substring(0,n),"&nbsp;").concat(t.substring(n+1));return t}return e}function p(t){var n=t.styles,a=h(t.text);return e(n,(function(e,t){a=d(e,a)})),a}function g(e,t){var n=f(e,["BOLD","ITALIC","UNDERLINE","STRIKETHROUGH","CODE","SUPERSCRIPT","SUBSCRIPT"],t.start,t.end),a="";return n.forEach((function(e){a+=p(e)})),a=b(t.styles,a)}function v(e,t,n,a){var r=[];f(e,["COLOR","BGCOLOR","FONTSIZE","FONTFAMILY"],n.start,n.end).forEach((function(t){r.push(g(e,t))}));var s=r.join("");return"ENTITY"===n.type?void 0!==n.entityKey&&null!==n.entityKey&&(s=j(t,n.entityKey,s,a)):"HASHTAG"===n.type&&(s='<a href="'.concat(s,'" class="wysiwyg-hashtag">').concat(s,"</a>")),s}function x(e,t,n,a){var r=[],s=c(e,n);return s.forEach((function(n,c){var i=v(e,t,n,a);0===c&&(i=O(i)),c===s.length-1&&(i=m(i)),r.push(i)})),r.join("")}function y(e,t,n,s,c){var o=[];if(i(e))o.push(j(t,e.entityRanges[0].key,void 0,c));else{var l=a(e.type);if(l){o.push("<".concat(l));var u=r(e.data);u&&o.push(' style="'.concat(u,'"')),s&&o.push(' dir = "auto"'),o.push(">"),o.push(x(e,t,n,c)),o.push("</".concat(l,">"))}}return o.push("\n"),o.join("")}function N(e){return"unordered-list-item"===e||"ordered-list-item"===e}function C(e,t,n,s,c){var i,o=[],l=[];return e.forEach((function(e){var u=!1;if(i?i.type!==e.type?(o.push("</".concat(a(i.type),">\n")),o.push("<".concat(a(e.type),">\n"))):i.depth===e.depth?l&&l.length>0&&(o.push(C(l,t,n,s,c)),l=[]):(u=!0,l.push(e)):o.push("<".concat(a(e.type),">\n")),!u){o.push("<li");var d=r(e.data);d&&o.push(' style="'.concat(d,'"')),s&&o.push(' dir = "auto"'),o.push(">"),o.push(x(e,t,n,c)),o.push("</li>\n"),i=e}})),l&&l.length>0&&o.push(C(l,t,n,s,c)),o.push("</".concat(a(i.type),">\n")),o.join("")}function R(e,t,n,a){var r=[];if(e){var s=e.blocks,c=e.entityMap;if(s&&s.length>0){var i=[];if(s.forEach((function(e){if(N(e.type))i.push(e);else{if(i.length>0){var s=C(i,c,t,a);r.push(s),i=[]}var o=y(e,c,t,n,a);r.push(o)}})),i.length>0){var o=C(i,c,t,n,a);r.push(o),i=[]}}}return r.join("")}return R}()},926:function(e,t,n){"use strict";n.r(t);var a=n(33),r=n(0),s=n(2),c=n(15),i=n(26),o=n(372),l=n(361),u=n(1),d=n(362),h=n(94),b=n(518),j=n(549),f=n(404),O=n(420),m=n.n(O),p=n(97),g=n(390),v=n(379),x=n(371),y=n(380),N=n(367),C=n(366),R=n(898),E=n(369),T=n(373),I=n(368),S=n(359),w=n(431),q=n(469),L=(n(470),n(413),n(12));t.default=function(){var e=Object(o.i)().id,t=Object(h.b)(),n=Object(o.g)(),O=Object(h.c)((function(e){return e.questionnaire})),A=O.subjectData,_=O.editedQuesData,k=O.getByIdQuesData,F=O.error,D=Object(u.useState)(1),B=Object(i.a)(D,2),P=B[0],U=B[1],M=Object(u.useState)(""),G=Object(i.a)(M,2),H=G[0],K=G[1],Y=Object(u.useState)({}),Z=Object(i.a)(Y,2),Q=Z[0],z=Z[1],V=Object(u.useState)(""),J=Object(i.a)(V,2),W=J[0],$=J[1],X=Object(u.useState)({subject_name:null===k||void 0===k?void 0:k.subject_name,is_type:null===k||void 0===k?void 0:k.is_type,question:null===k||void 0===k?void 0:k.question,question_description:null===k||void 0===k?void 0:k.question_description,answer:null===k||void 0===k?void 0:k.answer,question_marks:null===k||void 0===k?void 0:k.question_marks}),ee=Object(i.a)(X,2),te=ee[0],ne=ee[1];Object(u.useEffect)((function(){t(Object(p.h)(e))}),[t]),Object(u.useEffect)((function(){t(Object(p.g)())}),[]),Object(u.useEffect)((function(){null!==_&&n.push("/admin/questionnaire/Sat/list")}),[_]),Object(u.useEffect)((function(){ne(Object(c.a)(Object(c.a)({},te),{},{subject_name:null===k||void 0===k?void 0:k.subject_name,question:null===k||void 0===k?void 0:k.question,is_type:null===k||void 0===k?void 0:k.is_type,question_description:null===k||void 0===k?void 0:k.question_description,answer:null===k||void 0===k?void 0:k.answer,question_marks:null===k||void 0===k?void 0:k.question_marks})),k&&K(k.subject_name),k&&k.options&&U(Object.keys(k.options[0]).length),k&&k.options&&z(k.options[0])}),[k]);var ae=function(){var n=Object(s.a)(Object(r.a)().mark((function n(a){var s,o,l,u,d,h;return Object(r.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:for(a.preventDefault(),s=[],o=0,l=Object.entries(Q);o<l.length;o++)u=Object(i.a)(l[o],2),u[0],d=u[1],s.push(d);return h=m()(Object(w.convertToRaw)(W.getCurrentContent())),n.next=6,t(Object(p.c)({id:e,updatedData:Object(c.a)(Object(c.a)({},te),{},{question_description:h,options:s})}));case 6:t(p.f);case 7:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return Object(L.jsxs)(u.Fragment,{children:[Object(L.jsx)(d.a,{breadCrumbTitle:"SAT",breadCrumbParent:Object(L.jsx)(l.b,{to:"/admin/questionnaire/Sat/list",children:"SAT List"}),breadCrumbActive:"Edit SAT Details"}),Object(L.jsx)(v.a,{children:Object(L.jsx)(x.a,{children:Object(L.jsxs)(y.a,{children:[Object(L.jsxs)(N.a,{children:[Object(L.jsx)(C.a,{md:"6",sm:"12",children:Object(L.jsxs)(R.a,{className:"mb-2",children:[Object(L.jsx)(E.a,{className:"required",for:"subject-select",children:"Subject"}),Object(L.jsx)(T.a,{className:F&&F.subject_name?"is-invalid input-group-merge":"input-group-merge mb-1"}),Object(L.jsx)(g.a,{id:"subject-select",name:"subject",options:A&&A,value:k&&A?A.filter((function(e){return e.value===H})):[],isClearable:!1,className:F&&F.subject_name?"is-invalid":"",classNamePrefix:"select",onChange:function(e){K(e.value),ne(Object(c.a)(Object(c.a)({},te),{},{subject_name:e.value}))},style:{borderLeft:"none"}}),F&&F.subject_name?Object(L.jsx)("small",{className:"error",children:F.subject_name}):null]})}),Object(L.jsx)(C.a,{md:"12",sm:"12",children:Object(L.jsxs)(R.a,{className:"mb-2",children:[Object(L.jsx)(E.a,{for:"question",className:"required",children:"Question"}),Object(L.jsx)(T.a,{className:F&&F.question?"is-invalid input-group-merge":"input-group-merge mb-1",children:Object(L.jsx)(I.a,{className:F&&F.question?"is-invalid":"",type:"text",id:"question",name:"question",placeholder:"Question",defaultValue:null===k||void 0===k?void 0:k.question,onChange:function(e){return ne(Object(c.a)(Object(c.a)({},te),{},{question:e.target.value}))}})}),F&&F.question?Object(L.jsx)("div",{className:"error",children:Object(L.jsx)("small",{children:F.question})}):null]})}),k&&k.question_description&&Object(L.jsx)(C.a,{md:"12",sm:"12",children:Object(L.jsxs)(R.a,{children:[Object(L.jsx)(E.a,{for:"question_description",className:"required",children:"Question Description"}),Object(L.jsx)(q.Editor,{wrapperClassName:"demo-wrapper",editorClassName:"demo-editor",onEditorStateChange:function(e){$(e)},defaultEditorState:w.EditorState.createWithContent(w.ContentState.createFromBlockArray(Object(w.convertFromHTML)(k.question_description)))}),Object(L.jsx)(T.a,{className:F&&F.question_description?"is-invalid input-group-merge":"input-group-merge mb-1"}),F&&F.question_description?Object(L.jsx)("div",{className:"error",children:Object(L.jsx)("small",{children:F.question_description})}):null]})}),Object(L.jsx)(C.a,{md:"6",sm:"12",children:Object(L.jsxs)(R.a,{className:"mb-2",children:[Object(L.jsx)(E.a,{for:"answer",className:"required",children:"Answer"}),Object(L.jsx)(T.a,{className:F&&F.answer?"is-invalid input-group-merge":"input-group-merge mb-1",children:Object(L.jsx)(I.a,{className:F&&F.answer?"is-invalid":"",type:"text",id:"answer",name:"answer",placeholder:"Answer",defaultValue:null===k||void 0===k?void 0:k.answer,onChange:function(e){return ne(Object(c.a)(Object(c.a)({},te),{},{answer:e.target.value}))}})}),F&&F.answer?Object(L.jsx)("div",{className:"error",children:Object(L.jsx)("small",{children:F.answer})}):null]})}),Object(L.jsx)(C.a,{md:"6",sm:"12",children:Object(L.jsxs)(R.a,{className:"mb-2",children:[Object(L.jsx)(E.a,{for:"question_marks",className:"required",children:"Question Marks"}),Object(L.jsx)(T.a,{className:F&&F.question_marks?"is-invalid input-group-merge":"input-group-merge mb-1",children:Object(L.jsx)(I.a,{className:F&&F.question_marks?"is-invalid":"",type:"number",id:"question_marks",name:"question_marks",placeholder:"Question Marks",defaultValue:null===k||void 0===k?void 0:k.question_marks,onChange:function(e){return ne(Object(c.a)(Object(c.a)({},te),{},{question_marks:e.target.value}))}})}),F&&F.question_marks?Object(L.jsx)("div",{className:"error",children:Object(L.jsx)("small",{children:F.question_marks})}):null]})})]}),Object(L.jsx)(N.a,{children:Object(L.jsxs)(C.a,{md:"8",sm:"8",children:[Object(L.jsx)(f.a,{count:P,children:function(e){return Object(L.jsx)(x.a,{children:Object(L.jsxs)(N.a,{className:"justify-content-between align-items-center",children:[Object(L.jsxs)(C.a,{md:9,className:"mb-md-0 ",children:[Object(L.jsx)(E.a,{className:"form-label required",for:"item-name-".concat(e),children:"Options"}),Object(L.jsx)(T.a,{className:F&&F.options?"is-invalid input-group-merge":"input-group-merge mb-1",children:Object(L.jsx)(I.a,{type:"text",id:"item-name-".concat(e+1),name:"".concat(e+1),defaultValue:k&&(null===k||void 0===k?void 0:k.options)&&(null===k||void 0===k?void 0:k.options[0][e+1]),onChange:function(e){return z(Object(c.a)(Object(c.a)({},Q),{},Object(a.a)({},e.target.name,e.target.value)))},placeholder:"Options"})}),F&&F.options?Object(L.jsx)("small",{className:"error",children:F.options}):null]}),Object(L.jsx)(C.a,{children:Object(L.jsx)(S.a,{color:"danger",className:"text-nowrap px-1 mt-2",onClick:function(t){!function(e,t){z((function(e){var n=Object(c.a)({},e);return delete n[t],n})),e.preventDefault(),e.target.closest("form").remove()}(t,e+1)},outline:!0,children:Object(L.jsx)(b.a,{size:14})})})]})},e)}}),Object(L.jsxs)(S.a,{className:"btn-icon mt-2 white-color-btn",color:"",onClick:function(){U((function(e){return e+1}))},children:[Object(L.jsx)(j.a,{size:14})," Add Options"]})]})}),Object(L.jsxs)(C.a,{className:"d-flex flex-sm-row flex-column mt-2",md:"12",sm:"12",children:[Object(L.jsx)(S.a.Ripple,{className:"mb-1 mb-sm-0 mr-0 mr-sm-1",color:"primary",onClick:ae,children:"Submit"}),Object(L.jsx)(S.a.Ripple,{color:"danger",tag:l.b,to:"/admin/questionnaire/Sat/list",outline:!0,children:"Cancel"})]})]})})})]})}}}]);
//# sourceMappingURL=40.2cfbd3bf.chunk.js.map