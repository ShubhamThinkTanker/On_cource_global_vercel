(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[51],{362:function(e,t,a){"use strict";var c=a(361),n=a(374),r=a(375),s=a(12);t.a=function(e){var t=e.breadCrumbTitle,a=e.breadCrumbParent,i=e.breadCrumbParent2,l=e.breadCrumbParent3,o=e.breadCrumbActive;return Object(s.jsx)("div",{className:"content-header row",children:Object(s.jsx)("div",{className:"content-header-left col-md-9 col-12 mb-2",children:Object(s.jsx)("div",{className:"row breadcrumbs-top",children:Object(s.jsxs)("div",{className:"col-12",children:[t?Object(s.jsx)("h2",{className:"content-header-title float-left mb-0",children:t}):"",Object(s.jsx)("div",{className:"breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12",children:Object(s.jsxs)(n.a,{children:[Object(s.jsx)(r.a,{tag:"li",children:Object(s.jsx)(c.b,{to:"/",children:"Home"})}),Object(s.jsx)(r.a,{tag:"li",className:"text-primary",children:a}),i?Object(s.jsx)(r.a,{tag:"li",className:"text-primary",children:i}):"",l?Object(s.jsx)(r.a,{tag:"li",className:"text-primary",children:l}):"",Object(s.jsx)(r.a,{tag:"li",active:!0,children:o})]})})]})})})})}},389:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return c}));var c=[10,50,100,500],n=100},955:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a(2),r=a(1),s=a(362),i=a(95),l=a(15),o=a(26),b=a(94),d=a(413),u=a(379),j=a(389),m=a(512),p=a(381),x=a.n(p),O=a(382),h=a.n(O),f=a(559),v=a(552),g=a(361),w=a(367),C=a(366),N=a(359),y=a(369),_=a(368),k=a(12),D=function(e){var t=e.setTableData,a=e.tableData,c=e.checkedData,n=e.handleAllDeleteButton;return Object(k.jsx)("div",{className:"invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75",children:Object(k.jsxs)(w.a,{children:[Object(k.jsx)(C.a,{xl:"6",className:"d-flex align-items-center p-0",children:Object(k.jsx)("div",{className:"ml-1",children:0!==c.length&&Object(k.jsxs)(N.a.Ripple,{color:"danger",onClick:n,children:[Object(k.jsx)(f.a,{size:16}),Object(k.jsx)("span",{className:"align-middle ml-1",children:"Delete"})]})})}),Object(k.jsxs)(C.a,{xl:"6",className:"d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1",children:[Object(k.jsxs)("div",{className:"d-flex align-items-center mb-sm-0 mb-1 mr-1",children:[Object(k.jsx)(y.a,{className:"mb-0",for:"search-invoice",children:"Search:"}),Object(k.jsx)(_.a,{id:"search-invoice",className:"ml-50 w-100",type:"text",value:a.filter_value,onChange:function(e){t(Object(l.a)(Object(l.a)({},a),{},{filter_value:e.target.value}))},placeholder:"Search"})]}),Object(k.jsx)("div",{children:Object(k.jsxs)(N.a.Ripple,{color:"primary",className:"main-color-btn",tag:g.b,to:"/admin/papermaster/add",children:[Object(k.jsx)(v.a,{size:16}),Object(k.jsx)("span",{className:"align-middle ml-1",children:"Create"})]})})]})]})})},P=a(392),R=a.n(P),B=a(108),S=["onClick"],A=h()(x.a),T=function(e){var t=e.columns,a=Object(b.b)(),s=Object(b.c)((function(e){return e.papermaster})),p=s.isLoading,x=s.papermasterData,O=Object(r.useState)([]),h=Object(o.a)(O,2),f=h[0],v=h[1],g=Object(r.useState)({page:1,limit:j.a,filter_value:"",sort_order:"desc",order_column:""}),w=Object(o.a)(g,2),C=w[0],N=w[1],y=Object(r.useState)("page=".concat(C.page,"&limit=").concat(C.per_page,"&filter_value=").concat(C.filter_value,"&sort_order=").concat(C.sort_order,"&order_column=").concat(C.order_column)),_=Object(o.a)(y,2),P=_[0],T=_[1],z=Object(r.forwardRef)((function(e,t){var a=e.onClick,c=Object(i.a)(e,S);return Object(k.jsxs)("div",{className:"custom-control custom-checkbox",children:[Object(k.jsx)("input",Object(l.a)({type:"checkbox",className:"custom-control-input",ref:t},c)),Object(k.jsx)("label",{className:"custom-control-label",onClick:a})]})}));Object(r.useEffect)((function(){!function(e){var t=Object.keys(e).map((function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])})).join("&");T(t)}(C)}),[C]),Object(r.useEffect)((function(){a(Object(B.d)(P))}),[a,P]);var Y=function(e){var t=e.data;return Object(k.jsx)("div",{className:"expandable-content p-2 shadow-lg  m-2 bg-body rounded",children:Object(k.jsxs)(d.a,{responsive:!0,children:[Object(k.jsx)("thead",{children:Object(k.jsx)("tr",{children:Object(k.jsx)("th",{children:" Paper Description"})})}),Object(k.jsx)("tbody",{children:Object(k.jsx)("td",{children:t.paper_description})})]})})};return Object(k.jsx)(r.Fragment,{children:Object(k.jsx)(u.a,{children:Object(k.jsx)("div",{className:"app-user-list list",children:Object(k.jsx)(R.a,{className:"react-dataTable",noHeader:!0,pagination:!0,selectableRows:!0,onSelectedRowsChange:function(e){v(e.selectedRows)},data:null===x||void 0===x?void 0:x.findAllPaperMaster,columns:t,paginationServer:!0,paginationRowsPerPageOptions:j.b,paginationPerPage:C.limit,paginationTotalRows:null===x||void 0===x?void 0:x.TotalCount,sortIcon:Object(k.jsx)(m.a,{size:5}),selectableRowsComponent:z,onChangeRowsPerPage:function(e,t){N(Object(l.a)(Object(l.a)({},C),{},{page:t,limit:e}))},onChangePage:function(e){N(Object(l.a)(Object(l.a)({},C),{},{page:e}))},onSort:function(e,t){N(Object(l.a)(Object(l.a)({},C),{},{sort_order:t,order_column:e.selector}))},fixedHeader:!0,sortServer:!0,striped:!0,subHeaderComponent:Object(k.jsx)(D,{tableData:C,setTableData:N,checkedData:f,handleAllDeleteButton:function(e){return e.preventDefault(),A.fire({title:"Are you sure?",text:"You would not be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-outline-danger ml-1"},buttonsStyling:!1}).then(function(){var e=Object(n.a)(Object(c.a)().mark((function e(t){return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.value){e.next=7;break}return A.fire({icon:"success",title:"Deleted!",text:"Your Record has been deleted.",customClass:{confirmButton:"btn btn-success"}}),e.next=4,a(Object(B.f)(f));case 4:a(Object(B.h)()),a(Object(B.d)(P)),v([]);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}),loading:p,subHeader:!0,expandableRows:!0,expandOnRowClicked:!0,expandableRowsComponent:Object(k.jsx)(Y,{})})})})})},z=a(527),Y=a(525),H=a(558),q=a(551),M=a(903),W=a(898),I=h()(x.a);t.default=function(){var e=Object(b.c)((function(e){return e.questionnaire})),t=(e.paperData,e.subjectData,e.createdQuesData,e.error,Object(b.b)()),a=[{name:"Paper Name ",selector:"paper_name",sortable:!0,minWidth:"15%",cell:function(e){return Object(k.jsx)("p",{children:e.paper_name})}},{name:"Year",selector:"year",sortable:!0,minWidth:"15%",cell:function(e){return Object(k.jsx)("p",{children:e.year})}},{name:"Status ",minWidth:"15%",selector:"status",sortable:!1,cell:function(e){return Object(k.jsx)(M.a,{color:"active"===e.status?"light-success":"light-danger",pill:!0,children:e.status.toUpperCase()})}},{name:"Actions",minWidth:"35%",cell:function(e){return Object(k.jsxs)("div",{className:"d-inline ",children:[Object(k.jsx)(g.b,{to:"/admin/papermaster/view/".concat(e._id),className:"text-primary",children:Object(k.jsx)(z.a,{size:18})}),Object(k.jsx)(g.b,{to:"/admin/papermaster/edit/".concat(e._id),className:"text-warning mx-1",children:Object(k.jsx)(Y.a,{size:18})}),Object(k.jsx)(H.a,{className:"text-danger",size:18,s:!0,onClick:function(){return a=e._id,I.fire({title:"Are you sure?",text:"You would not be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-outline-danger ml-1"},buttonsStyling:!1}).then(function(){var e=Object(n.a)(Object(c.a)().mark((function e(n){return Object(c.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.value){e.next=6;break}return I.fire({icon:"success",title:"Deleted!",text:"Your Record has been deleted.",customClass:{confirmButton:"btn btn-success"}}),e.next=4,t(Object(B.b)(a));case 4:t(Object(B.h)()),t(Object(B.d)());case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var a},style:{cursor:"pointer"}}),Object(k.jsxs)(g.b,{to:"/admin/questionnaire/Act/add/".concat(e._id),id:"create-questions",className:"text-warning mx-1",children:[Object(k.jsx)(q.a,{size:18}),Object(k.jsx)(W.a,{placement:"bottom",target:"create-questions",children:"Create Questions"})]})]})}}];return Object(k.jsxs)("div",{className:"app-user-list",children:[Object(k.jsx)(s.a,{breadCrumbTitle:"Paper Master",breadCrumbParent:"Paper Master",breadCrumbActive:" Paper Master List"}),Object(k.jsx)(T,{columns:a})]})}}}]);
//# sourceMappingURL=51.0ba3ec50.chunk.js.map