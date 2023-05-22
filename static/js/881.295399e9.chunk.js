"use strict";(self.webpackChunkproject_mania=self.webpackChunkproject_mania||[]).push([[881],{1427:function(n,e,i){i(2791);var t=i(7692),s=i(7689),r=i(184);e.Z=function(){var n=(0,s.s0)();return(0,r.jsxs)("button",{type:"button",className:"back-button link",onClick:function(){return n(-1)},children:[(0,r.jsx)(t.gbs,{className:"icon"}),"Back"]})}},9881:function(n,e,i){i.r(e),i.d(e,{default:function(){return L}});var t=i(1413),s=i(3433),r=i(9439),o=i(2791),l=i(9434),c=i(1427),a=i(34),u=i(3763),d=i(7470),f=i(2741),m=i(2048),h=i(9143),j=i(9126),x=i(995),v=i(184),_=function(n){var e=n.user,i=n.onClick,t=n.additionalContent;return(0,v.jsxs)("div",{className:"user-tab",onClick:i,children:[e.base64_img_data||e.img_url?(0,v.jsx)(m.Z,{src:function(n){return n.base64_img_data?Buffer.from(n.base64_img_data):n.img_url.toString()}(e)}):(0,v.jsx)(h.Z,{}),(0,v.jsx)(x.Z,{title:e.online?"Online":"Offline",icon:function(n){return(0,v.jsx)(j.KC7,{className:n.online?"icon online-status green":"icon online-status grey"})}(e)}),(0,v.jsxs)("div",{className:"user-tab-content",children:[(0,v.jsxs)("h4",{children:[e.first_name," ",e.last_name]}),e.header?(0,v.jsx)("p",{children:e.header}):null]}),(0,v.jsx)("div",{id:"userTabAdditionalContent",children:t||null})]})},b=i(6747),Z=i(6419),C=i(71),p=i(6974),g=i(8820),N=i(5233),w=i(6594),k=i(7480),L=function(){var n=(0,N.Z)().members,e=(0,f.Z)(),i=e.user,m=e.userInfo,h=(0,l.I0)(),L=(0,o.useState)(""),I=(0,r.Z)(L,2),A=I[0],F=I[1],R=(0,o.useState)([]),S=(0,r.Z)(R,2),y=S[0],V=S[1],q=(0,Z.Z)(),B=q.currentProject,E=q.handleAddMember,H=q.handleRemoveMemberFromProject,M=q.isAdmin,O=(0,p.Z)().fetchUserChats,P=function(n){h((0,k.zJ)(n)),h((0,k.rC)(!0))};(0,o.useEffect)((function(){A.length&&A||V([]),function(e){if(n.some((function(n){return n.first_name.toLowerCase().includes(e.toLowerCase())||n.last_name.toLowerCase().includes(e.toLowerCase())}))){var i=(0,s.Z)(null===n||void 0===n?void 0:n.filter((function(n){return n.first_name.toLowerCase().includes(e.toLowerCase())||n.last_name.toLowerCase().includes(e.toLowerCase())})));V((0,s.Z)(i))}}(A)}),[A]),(0,o.useEffect)((function(){h((0,u.Dq)()),O()}),[]);(0,w.Z)({events:{online:function(n){y.length&&y.some((function(e){return e._id===n.userId}))&&V((0,s.Z)(y.map((function(e){return e._id===n.userId?(0,t.Z)((0,t.Z)({},e),{},{online:!0}):e}))))},offline:function(n){y.length&&y.some((function(e){return e._id===n.userId}))&&V((0,s.Z)(y.map((function(e){return e._id===n.userId?(0,t.Z)((0,t.Z)({},e),{},{online:!1}):e}))))}}});var T=function(n){var e,i;return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)("div",{className:"buttons-container",children:[(0,v.jsxs)("button",{className:"btn white",onClick:function(){return P(n)},title:"View ".concat(n.first_name,"'s profile"),children:[(0,v.jsx)(x.Z,{icon:(0,v.jsx)(C.bq1,{className:"icon xl"})}),(0,v.jsx)("span",{className:"btn-text",children:"View profile"})]}),(null===B||void 0===B||null===(e=B.members)||void 0===e?void 0:e.some((function(e){return e._id===n._id})))&&M&&(0,v.jsxs)("button",{className:"btn white",title:"Remove ".concat(n.first_name," from project"),onClick:function(){return H(n._id)},children:[(0,v.jsx)(x.Z,{icon:(0,v.jsx)(g.ywL,{className:"icon"})}),(0,v.jsx)("span",{className:"btn-text",children:"Remove from project"})]}),!(null!==B&&void 0!==B&&null!==(i=B.members)&&void 0!==i&&i.some((function(e){return e._id===n._id})))&&M&&(0,v.jsxs)("button",{className:"btn white",title:"Add ".concat(n.first_name," to project"),onClick:function(){return E(n)},children:[(0,v.jsx)(x.Z,{icon:(0,v.jsx)(j.L3d,{className:"icon xl"})}),(0,v.jsx)("span",{className:"btn-text",children:"Add to project"})]})]})})};return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)("div",{className:"users-container",children:[(0,v.jsx)(c.Z,{}),(0,v.jsxs)("div",{className:"title",children:[(0,v.jsx)("h1",{children:"Users"}),(0,v.jsx)(a.Z,{value:A,fn:function(n){F(n.target.value)},placeholderText:"Search users",icon:(0,v.jsx)(x.Z,{icon:(0,v.jsx)(j.dVI,{className:"icon"})})})]}),(0,v.jsxs)("div",{className:"results-container",children:[(0,v.jsxs)("p",{children:[null===n||void 0===n?void 0:n.filter((function(n){return n._id!==(null===i||void 0===i?void 0:i._id)})).length," ",1===(null===n||void 0===n?void 0:n.filter((function(n){return n._id!==(null===i||void 0===i?void 0:i._id)})).length)?"user found":"users found"]}),(0,v.jsx)(d.Z,{}),(0,v.jsxs)("h3",{children:["Results ",(0,v.jsxs)("span",{children:["(",y.filter((function(n){return n._id!==(null===m||void 0===m?void 0:m._id)})).length,")"]})]}),(0,v.jsx)("div",{className:"grid-container",children:y.length?(0,v.jsx)(v.Fragment,{children:null===y||void 0===y?void 0:y.filter((function(n){return n._id!==(null===i||void 0===i?void 0:i._id)})).map((function(n){return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("div",{className:"search-result",children:(0,v.jsx)(_,{user:n,onClick:function(){return P(n)},additionalContent:T(n)})},(0,b.H)())})}))}):null===n||void 0===n?void 0:n.filter((function(n){return n._id!==(null===i||void 0===i?void 0:i._id)})).map((function(n){return(0,v.jsx)("div",{className:"search-result",children:(0,v.jsx)(_,{user:n,additionalContent:T(n)})},(0,b.H)())}))})]})]})})}}}]);
//# sourceMappingURL=881.295399e9.chunk.js.map