(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[52],{362:function(e,t,a){"use strict";var c=a(361),n=a(374),s=a(375),r=a(12);t.a=function(e){var t=e.breadCrumbTitle,a=e.breadCrumbParent,l=e.breadCrumbParent2,i=e.breadCrumbParent3,o=e.breadCrumbActive;return Object(r.jsx)("div",{className:"content-header row",children:Object(r.jsx)("div",{className:"content-header-left col-md-9 col-12 mb-2",children:Object(r.jsx)("div",{className:"row breadcrumbs-top",children:Object(r.jsxs)("div",{className:"col-12",children:[t?Object(r.jsx)("h2",{className:"content-header-title float-left mb-0",children:t}):"",Object(r.jsx)("div",{className:"breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12",children:Object(r.jsxs)(n.a,{children:[Object(r.jsx)(s.a,{tag:"li",children:Object(r.jsx)(c.b,{to:"/",children:"Home"})}),Object(r.jsx)(s.a,{tag:"li",className:"text-primary",children:a}),l?Object(r.jsx)(s.a,{tag:"li",className:"text-primary",children:l}):"",i?Object(r.jsx)(s.a,{tag:"li",className:"text-primary",children:i}):"",Object(r.jsx)(s.a,{tag:"li",active:!0,children:o})]})})]})})})})}},389:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return c}));var c=[10,50,100,500],n=100},946:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a(2),s=a(1),r=a(362),l=a(95),i=a(15),o=a(26),u=a(94),j=a(379),b=a(392),d=a.n(b),m=a(389),O=a(512),h=a(381),x=a.n(h),p=a(382),f=a.n(p),g=a(559),v=a(552),N=a(367),_=a(366),w=a(359),C=a(369),y=a(368),S=a(99),k=a(33),R=a(474),D=a(458),A=a(459),T=a(371),E=a(570),I=a(902),B=a(373),P=a(956),V=a(12);var U=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return null===e||void 0===e?void 0:e.subject})),a=t.error,r=t.isAddModalShow,l=t.createdSubject,j=Object(s.useState)({subject_name:"",subject_image:null,status:"active"}),b=Object(o.a)(j,2),d=b[0],m=b[1],O=Object(s.useState)("https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png"),h=Object(o.a)(O,2),x=h[0],p=h[1],f=function(e){m(Object(i.a)(Object(i.a)({},d),{},Object(k.a)({},e.target.name,e.target.value)))},g=function(){m({subject_image:null,subject_name:"",status:"active"}),p("https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png")},v=function(){var t=Object(n.a)(Object(c.a)().mark((function t(a){var n,s,r,l;return Object(c.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),n=d.subject_image,s=d.subject_name,r=d.status,(l=new FormData).append("subject_image",n),l.append("subject_name",s),l.append("status",r),t.next=8,e(Object(S.a)(l));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),U=function(){e(Object(S.i)(!r)),g(),e(Object(S.h)())};return Object(s.useEffect)((function(){null!==l&&(g(),e(Object(S.h)()))}),[l,e]),Object(V.jsxs)(R.a,{isOpen:r,toggle:U,className:"modal-dialog-centered",children:[Object(V.jsx)(D.a,{className:"modal-header",toggle:U,children:"Add Subject"}),Object(V.jsxs)(A.a,{className:"px-sm-5 mx-50 pb-5",children:[Object(V.jsx)("h1",{className:"text-center mb-1"}),Object(V.jsx)(T.a,{onSubmit:v,children:Object(V.jsxs)(N.a,{children:[Object(V.jsxs)(_.a,{children:[Object(V.jsx)(C.a,{for:"subject_image",children:"Subject Icone"}),Object(V.jsxs)(E.a,{className:"mb-2",children:[Object(V.jsx)("img",{className:"user-avatar rounded mr-2 my-25 cursor-pointer",src:x,height:"90",width:"90"}),Object(V.jsx)(E.a,{className:"mt-50",body:!0,children:Object(V.jsxs)("div",{className:"d-flex flex-wrap mt-1 px-0",children:[Object(V.jsxs)(w.a.Ripple,{id:"change-img",tag:C.a,className:"mr-75 mb-0",color:"primary",children:["Upload",Object(V.jsx)(y.a,{type:"file",hidden:!0,id:"change-img",name:"subject_image",onChange:function(e){if(e.target.files&&e.target.files.length>0){var t=new FileReader;t.addEventListener("load",(function(){p(t.result),m(Object(i.a)(Object(i.a)({},d),{},{subject_image:t.result}))})),t.readAsDataURL(e.target.files[0])}},accept:"image/*"})]}),Object(V.jsx)(w.a.Ripple,{color:"danger",outline:!0,onClick:function(){return p("https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png")},children:"Remove"})]})})]})]}),Object(V.jsx)(_.a,{sm:"12",children:Object(V.jsxs)(I.a,{className:"mb-2",children:[Object(V.jsx)(C.a,{className:"form-label required",for:"subject_name",children:"Subject Name"}),Object(V.jsx)(B.a,{className:a&&a.subject_name?"is-invalid input-group-merge":"input-group-merge",children:Object(V.jsx)(y.a,{className:a&&a.subject_name?"is-invalid":"",type:"text",name:"subject_name",placeholder:"Subject Name",value:d.subject_name,onChange:f})}),a&&a.subject_name?Object(V.jsx)("small",{className:"error",children:a.subject_name}):null]})}),Object(V.jsxs)(_.a,{md:"6",sm:"12",children:[Object(V.jsx)(C.a,{for:"status",className:"required",children:"Status"}),Object(V.jsxs)(I.a,{className:"d-flex",children:[Object(V.jsx)(P.a,{type:"radio",id:"status_yes",name:"status",inline:!0,defaultChecked:!0,label:"ACTIVE",checked:"active"===d.status,defaultValue:"active",onChange:f}),Object(V.jsx)(P.a,{type:"radio",id:"status_no",name:"status",inline:!0,label:"INACTIVE",checked:"inactive"===d.status,defaultValue:"inactive",onChange:f})]})]}),Object(V.jsxs)(_.a,{className:"text-center mt-1",xs:12,children:[Object(V.jsx)(w.a.Ripple,{className:"mb-1 mb-sm-0 mr-0 mr-sm-1",color:"primary",onClick:v,children:"Save & New"}),Object(V.jsx)(w.a.Ripple,{type:"submit",className:"mb-1 mb-sm-0 mr-0 mr-sm-1",color:"primary",children:"Save & Exit"}),Object(V.jsx)(w.a.Ripple,{type:"reset",color:"danger",outline:!0,onClick:U,children:"Cancel"})]})]})})]})]})},Y=function(e){var t=e.setTableData,a=e.tableData,c=e.checkedData,n=e.handleAllDeleteButton,s=Object(u.b)();return Object(V.jsxs)("div",{className:"invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75",children:[Object(V.jsxs)(N.a,{children:[Object(V.jsx)(_.a,{xl:"6",className:"d-flex align-items-center p-0",children:Object(V.jsx)("div",{className:"ml-1",children:c&&c.length>0&&Object(V.jsxs)(w.a.Ripple,{color:"danger",onClick:n,children:[Object(V.jsx)(g.a,{size:16}),Object(V.jsx)("span",{className:"align-middle ml-1",children:"Delete"})]})})}),Object(V.jsxs)(_.a,{xl:"6",className:"d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1",children:[Object(V.jsxs)("div",{className:"d-flex align-items-center mb-sm-0 mb-1 mr-1",children:[Object(V.jsx)(C.a,{className:"mb-0",for:"search-invoice",children:"Search:"}),Object(V.jsx)(y.a,{id:"search-invoice",className:"ml-50 w-100",type:"text",value:a&&a.filter_value,onChange:function(e){t(Object(i.a)(Object(i.a)({},a),{},{filter_value:e.target.value}))},placeholder:"Search"})]}),Object(V.jsx)("div",{children:Object(V.jsxs)(w.a.Ripple,{color:"primary",onClick:function(){return s(Object(S.i)(!0))},children:[Object(V.jsx)(v.a,{size:16}),Object(V.jsx)("span",{className:"align-middle ml-1",children:"Create"})]})})]})]}),Object(V.jsx)(U,{})]})},z=["onClick"],H=f()(x.a),L=function(e){var t=e.columns,a=Object(u.b)(),r=Object(s.useState)([]),b=Object(o.a)(r,2),h=b[0],x=b[1],p=Object(s.useState)({page:1,limit:m.a,filter_value:"",sort_order:"desc",order_column:""}),f=Object(o.a)(p,2),g=f[0],v=f[1],N=Object(s.useState)("page=".concat(g.page,"&limit=").concat(g.per_page,"&filter_value=").concat(g.filter_value,"&sort_order=").concat(g.sort_order,"&order_column=").concat(g.order_column)),_=Object(o.a)(N,2),w=_[0],C=_[1],y=Object(u.c)((function(e){return null===e||void 0===e?void 0:e.subject})),k=y.subjectData,R=y.isLoading,D=y.createdSubject,A=y.editSubject,T=y.deletedAllSubject,E=y.deletedSubject;console.log("subjectData",k);var I=Object(s.forwardRef)((function(e,t){var a=e.onClick,c=Object(l.a)(e,z);return Object(V.jsxs)("div",{className:"custom-control custom-checkbox",children:[Object(V.jsx)("input",Object(i.a)({type:"checkbox",className:"custom-control-input",ref:t},c)),Object(V.jsx)("label",{className:"custom-control-label",onClick:a})]})}));return Object(s.useEffect)((function(){!function(e){var t=Object.keys(e).map((function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])})).join("&");C(t)}(g)}),[g]),Object(s.useEffect)((function(){return a(Object(S.d)(w)),function(){a(Object(S.h)())}}),[a,w,D,A,T,E]),Object(V.jsx)(s.Fragment,{children:Object(V.jsx)(j.a,{className:"overflow-hidden",children:Object(V.jsx)("div",{className:"react-dataTable",children:Object(V.jsx)(d.a,{className:"react-dataTable",noHeader:!0,pagination:!0,selectableRows:!0,onSelectedRowsChange:function(e){x(e.selectedRows)},columns:t,data:null===k||void 0===k?void 0:k.Subject_Details,paginationServer:!0,paginationRowsPerPageOptions:m.b,paginationPerPage:g.limit,paginationTotalRows:null===k||void 0===k?void 0:k.TotalCount,sortIcon:Object(V.jsx)(O.a,{size:5}),selectableRowsComponent:I,onChangeRowsPerPage:function(e,t){v(Object(i.a)(Object(i.a)({},g),{},{page:t,limit:e}))},onChangePage:function(e){v(Object(i.a)(Object(i.a)({},g),{},{page:e}))},onSort:function(e,t){v(Object(i.a)(Object(i.a)({},g),{},{sort_order:t,order_column:e.selector}))},fixedHeader:!0,sortServer:!0,striped:!0,subHeaderComponent:Object(V.jsx)(Y,{tableData:g,setTableData:v,checkedData:h,handleAllDeleteButton:function(e){return e.preventDefault(),H.fire({title:"Are you sure?",text:"You would not able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-outline-danger ml-1"},buttonsStyling:!1}).then(function(){var e=Object(n.a)(Object(c.a)().mark((function e(t){return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.value){e.next=5;break}return H.fire({icon:"success",title:"Deleted!",text:"Your Record has been deleted.",customClass:{confirmButton:"btn btn-success"}}),e.next=4,a(Object(S.b)(h));case 4:x([]);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}),loading:R,subHeader:!0})})})})},q=a(525),F=a(558),M=a(383);var J=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.subject})),a=t.isEditModalShow,r=t.getSubject,l=t.error,j=t.editSubject,b=Object(s.useState)({subject_name:"",subject_image:null,status:"active"}),d=Object(o.a)(b,2),m=d[0],O=d[1],h=Object(s.useState)(null),x=Object(o.a)(h,2),p=x[0],f=x[1];Object(s.useEffect)((function(){O({subject_name:null===r||void 0===r?void 0:r.subject_name,subject_image:null===r||void 0===r?void 0:r.subject_image,status:null===r||void 0===r?void 0:r.status})}),[r]);var g=function(e){O(Object(i.a)(Object(i.a)({},m),{},Object(k.a)({},e.target.name,e.target.value)))},v=function(){var t=Object(n.a)(Object(c.a)().mark((function t(a){return Object(c.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),m.subject_name,m.status,m.subject_image,t.next=4,e(Object(S.f)({id:r._id,editedData:m}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),U=function(){O({subject_name:"",subject_image:null,status:"active"})},Y=function(){e(Object(S.j)(!a)),U(),e(Object(S.h)())};return Object(s.useEffect)((function(){null!==j&&(U(),e(Object(S.h)()))}),[j,e]),Object(V.jsxs)(R.a,{isOpen:a,toggle:Y,className:"modal-dialog-centered",children:[Object(V.jsx)(D.a,{className:"modal-header",toggle:Y,children:"Edit Subject"}),Object(V.jsxs)(A.a,{className:"px-sm-5 mx-50 pb-5",children:[Object(V.jsx)("h1",{className:"text-center mb-1"}),Object(V.jsx)(T.a,{onSubmit:v,children:Object(V.jsxs)(N.a,{className:"gy-1 gx-2 mt-75",children:[Object(V.jsxs)(_.a,{sm:"12",children:[Object(V.jsx)(C.a,{for:"image",children:"Subject Icone"}),Object(V.jsxs)(E.a,{className:"mb-2",children:[Object(V.jsx)("img",{className:"user-avatar rounded mr-2 my-25 cursor-pointer",src:null!==p?"".concat(p):"http://localhost:5000/admin/upload/subjectImage/".concat(m.subject_image),height:"90",width:"90"}),Object(V.jsx)(E.a,{className:"mt-50",body:!0,children:Object(V.jsxs)("div",{className:"d-flex flex-wrap mt-1 px-0",children:[Object(V.jsxs)(w.a.Ripple,{id:"change-img",tag:C.a,className:"mr-75 mb-0",color:"primary",children:["Upload",Object(V.jsx)(y.a,{type:"file",hidden:!0,id:"change-img",accept:"image/*",onChange:function(e){return function(e){var t=new FileReader,a=e.target.files;t.onload=function(){f(t.result),O(Object(i.a)(Object(i.a)({},m),{},{subject_image:t.result}))},t.readAsDataURL(a[0])}(e)}})]}),Object(V.jsx)(w.a.Ripple,{color:"danger",outline:!0,onClick:function(){f("https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png"),O(Object(i.a)(Object(i.a)({},m),{},{subject_image:"https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png"}))},children:"Remove"})]})})]})]}),Object(V.jsx)(_.a,{sm:"12",children:Object(V.jsxs)(I.a,{className:"mb-2",children:[Object(V.jsx)(C.a,{className:"form-label required",for:"subject_name",children:"Subject Name"}),Object(V.jsx)(B.a,{className:l&&l.subject_name?"is-invalid input-group-merge":"input-group-merge",children:Object(V.jsx)(y.a,{className:l&&l.subject_name?"is-invalid":"",type:"text",name:"subject_name",placeholder:"Subject Name",defaultValue:null===r||void 0===r?void 0:r.subject_name,onChange:g})}),l&&l.subject_name?Object(V.jsx)("small",{className:"error",children:l.subject_name}):null]})}),Object(V.jsxs)(_.a,{md:"6",sm:"12",children:[Object(V.jsx)(C.a,{for:"status",className:"required",children:"Status"}),Object(V.jsxs)(I.a,{className:"d-flex",children:[Object(V.jsx)(P.a,{type:"radio",id:"status_yes",name:"status",inline:!0,label:"ACTIVE",defaultValue:"active",checked:"active"===(null===m||void 0===m?void 0:m.status),onChange:g}),Object(V.jsx)(P.a,{type:"radio",id:"status_no",name:"status",inline:!0,label:"INACTIVE",defaultValue:"inactive",checked:"inactive"===(null===m||void 0===m?void 0:m.status),onChange:g})]})]}),Object(V.jsxs)(_.a,{className:"text-center mt-1",xs:12,children:[Object(V.jsx)(w.a.Ripple,{type:"submit",className:"mb-1 mb-sm-0 mr-0 mr-sm-1",color:"primary",children:"Submit"}),Object(V.jsx)(w.a.Ripple,{type:"reset",color:"danger",outline:!0,onClick:Y,children:"Cancel"})]})]})})]})]})},G=a(903),K=f()(x.a);t.default=function(){var e=Object(u.b)(),t=function(e){var t,a=["light-success","light-danger","light-warning","light-info","light-primary","light-secondary"][Math.floor(6*Math.random())];return null!==e&&void 0!==e&&null!==(t=e.subject_image)&&void 0!==t&&t.length?Object(V.jsx)(M.a,{className:"mr-1",width:"32",height:"32",img:"http://localhost:5000/admin/upload/subjectImage/".concat(e.subject_image)}):Object(V.jsx)(M.a,{width:"32",height:"32",color:a||"primary",className:"mr-1",content:(null===e||void 0===e?void 0:e.subject_name)||"",initials:!0})},a=[{name:"Subject Name",selector:"subject_name",sortable:!0,cell:function(e){return Object(V.jsxs)("div",{className:"d-flex justify-content-left align-items-center",children:[t(e),Object(V.jsx)("div",{className:"d-flex flex-column",children:e.subject_name})]})}},{name:"Status ",selector:"status",sortable:!1,cell:function(e){return Object(V.jsx)(G.a,{color:"active"===e.status?"light-success":"light-danger",pill:!0,children:e.status.toUpperCase()})}},{name:"Actions",cell:function(t){return Object(V.jsxs)("div",{className:"d-flex  ",children:[Object(V.jsx)(q.a,{className:"text-warning mx-1",size:18,onClick:function(){e(Object(S.j)(!0)),e(Object(S.e)(t._id))}}),Object(V.jsx)(F.a,{className:"text-danger",size:18,onClick:function(){return a=t._id,K.fire({title:"Are you sure?",text:"You would not be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-outline-danger ml-1"},buttonsStyling:!1}).then(function(){var t=Object(n.a)(Object(c.a)().mark((function t(n){return Object(c.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n.value){t.next=4;break}return K.fire({icon:"success",title:"Deleted!",text:"Your Record has been deleted.",customClass:{confirmButton:"btn btn-success"}}),t.next=4,e(Object(S.c)(a));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());var a},style:{cursor:"pointer"}})]})}}];return Object(V.jsxs)("div",{className:"app-user-list",children:[Object(V.jsx)(r.a,{breadCrumbTitle:"Subjects",breadCrumbParent:"Subjects",breadCrumbActive:"Subjects List"}),Object(V.jsx)(L,{columns:a}),Object(V.jsx)(J,{})]})}}}]);
//# sourceMappingURL=52.5e427538.chunk.js.map