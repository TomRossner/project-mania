"use strict";(self.webpackChunkproject_mania=self.webpackChunkproject_mania||[]).push([[881],{1427:function(n,e,i){i(2791);var t=i(7692),r=i(7689),s=i(184);e.Z=function(){var n=(0,r.s0)();return(0,s.jsxs)("button",{type:"button",className:"back-button link",onClick:function(){return n(-1)},children:[(0,s.jsx)(t.gbs,{className:"icon"}),"Back"]})}},9881:function(n,e,i){i.r(e),i.d(e,{default:function(){return F}});var t=i(1413),r=i(3433),s=i(9439),o=i(2791),c=i(9434),l=i(1427),u=i(34),a=i(3763),d=i(7470),f=i(2741),m=i(2048),v=i(9143),h=i(9126),j=i(995),x=i(184),_=function(n){var e=n.user,i=n.onClick,t=n.additionalContent;return(0,x.jsxs)("div",{className:"user-tab",onClick:i,children:[e.base64_img_data||e.img_url?(0,x.jsx)(m.Z,{src:function(n){return n.base64_img_data?Buffer.from(n.base64_img_data):n.img_url.toString()}(e)}):(0,x.jsx)(v.Z,{}),(0,x.jsx)(j.Z,{title:e.online?"Online":"Offline",icon:function(n){return(0,x.jsx)(h.KC7,{className:n.online?"icon online-status green":"icon online-status grey"})}(e)}),(0,x.jsxs)("div",{className:"user-tab-content",children:[(0,x.jsxs)("h4",{children:[e.first_name," ",e.last_name]}),e.header?(0,x.jsx)("p",{children:e.header}):null]}),(0,x.jsx)("div",{id:"userTabAdditionalContent",children:t||null})]})},b=i(6747),w=i(6419),Z=i(71),C=i(4888),g=i(5680),N=i(7689),p=i(5224),k=i(6974),L=i(8820),E=i(5233),I=i(6594),A=i(7480),F=function(){var n=(0,E.Z)().members,e=(0,f.Z)(),i=e.user,m=e.userInfo,v=(0,c.I0)(),F=(0,o.useState)(""),M=(0,s.Z)(F,2),R=M[0],S=M[1],O=(0,o.useState)([]),y=(0,s.Z)(O,2),z=y[0],B=y[1],V=(0,w.Z)(),q=V.currentProject,D=V.handleAddMember,H=V.handleRemoveMemberFromProject,K=V.isAdmin,P=(0,C.Z)().isMobile,T=(0,N.s0)(),U=(0,c.v9)(p.Rt),J=(0,k.Z)(),W=J.createNewChat,G=J.fetchUserChats,Q=function(n){v((0,A.zJ)(n)),v((0,A.rC)(!0))};(0,o.useEffect)((function(){R.length||B([]),function(e){if(n.some((function(n){return n.first_name.toLowerCase().includes(e.toLowerCase())||n.last_name.toLowerCase().includes(e.toLowerCase())}))){var i=(0,r.Z)(null===n||void 0===n?void 0:n.filter((function(n){return n.first_name.toLowerCase().includes(e.toLowerCase())||n.last_name.toLowerCase().includes(e.toLowerCase())})));B((0,r.Z)(i))}}(R)}),[R]),(0,o.useEffect)((function(){v((0,a.Dq)()),G()}),[]);(0,I.Z)({events:{online:function(n){z.length&&z.some((function(e){return e._id===n.userId}))&&B((0,r.Z)(z.map((function(e){return e._id===n.userId?(0,t.Z)((0,t.Z)({},e),{},{online:!0}):e}))))},offline:function(n){z.length&&z.some((function(e){return e._id===n.userId}))&&B((0,r.Z)(z.map((function(e){return e._id===n.userId?(0,t.Z)((0,t.Z)({},e),{},{online:!1}):e}))))}}});var X=function(e){var i,t;return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{className:"buttons-container",children:[(0,x.jsxs)("button",{className:"btn white",onClick:function(){return function(e){var i=n.find((function(n){return n._id===e}));if(v((0,g.Ku)(i)),!(null===U||void 0===U?void 0:U.some((function(n){return n.users.some((function(n){return n===e}))}))))return W(null===m||void 0===m?void 0:m._id,i);v((0,g.OB)(null===m||void 0===m?void 0:m._id,e)),T("/chat/".concat(null===m||void 0===m?void 0:m._id))}(e._id)},title:"Chat with ".concat(e.first_name),children:[(0,x.jsx)(j.Z,{icon:(0,x.jsx)(h.SO6,{className:"icon"})}),P?"":" Message"]}),(0,x.jsxs)("button",{className:"btn white",onClick:function(){return Q(e)},title:"View ".concat(e.first_name,"'s profile"),children:[(0,x.jsx)(j.Z,{icon:(0,x.jsx)(Z.bq1,{className:"icon xl"})}),P?"":" View profile"]}),(null===q||void 0===q||null===(i=q.members)||void 0===i?void 0:i.some((function(n){return n._id===e._id})))&&K&&(0,x.jsxs)("button",{className:"btn white",title:"Remove ".concat(e.first_name," from project"),onClick:function(){return H(e._id)},children:[(0,x.jsx)(j.Z,{icon:(0,x.jsx)(L.ywL,{className:"icon"})}),P?"":" Remove from project"]}),!(null!==q&&void 0!==q&&null!==(t=q.members)&&void 0!==t&&t.some((function(n){return n._id===e._id})))&&K&&(0,x.jsxs)("button",{className:"btn white",title:"Add ".concat(e.first_name," to project"),onClick:function(){return D(e)},children:[(0,x.jsx)(j.Z,{icon:(0,x.jsx)(h.L3d,{className:"icon xl"})}),P?"":" Add to project"]})]})})};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{className:"users-container",children:[(0,x.jsx)(l.Z,{}),(0,x.jsxs)("div",{className:"title",children:[(0,x.jsx)("h1",{children:"Users"}),(0,x.jsx)(u.Z,{value:R,fn:function(n){S(n.target.value)},placeholderText:"Search users",icon:(0,x.jsx)(j.Z,{icon:(0,x.jsx)(h.dVI,{className:"icon"})})})]}),(0,x.jsxs)("div",{className:"results-container",children:[(0,x.jsxs)("p",{children:[null===n||void 0===n?void 0:n.filter((function(n){return n._id!==(null===i||void 0===i?void 0:i._id)})).length," ",1===(null===n||void 0===n?void 0:n.filter((function(n){return n._id!==(null===i||void 0===i?void 0:i._id)})).length)?"user found":"users found"]}),(0,x.jsx)(d.Z,{}),(0,x.jsx)("h3",{children:"Results"}),(0,x.jsx)("div",{className:"grid-container",children:z.length?(0,x.jsx)(x.Fragment,{children:null===z||void 0===z?void 0:z.filter((function(n){return n._id!==(null===i||void 0===i?void 0:i._id)})).map((function(n){return(0,x.jsx)(x.Fragment,{children:(0,x.jsx)("div",{className:"search-result",children:(0,x.jsx)(_,{user:n,onClick:function(){return Q(n)},additionalContent:X(n)})},(0,b.H)())})}))}):null===n||void 0===n?void 0:n.filter((function(n){return n._id!==(null===i||void 0===i?void 0:i._id)})).map((function(n){return(0,x.jsx)("div",{className:"search-result",children:(0,x.jsx)(_,{user:n,additionalContent:X(n)})},(0,b.H)())}))})]})]})})}},4888:function(n,e,i){var t=i(2791),r=i(9434),s=i(7480),o=i(4083);e.Z=function(){var n=(0,r.v9)(o.eD),e=(0,r.I0)(),i=function(){window.innerWidth<=1280?e((0,s.Ep)(!0)):e((0,s.Ep)(!1))};return(0,t.useEffect)((function(){return window.addEventListener("load",i),window.addEventListener("resize",i),function(){window.removeEventListener("load",i),window.removeEventListener("resize",i)}}),[]),{isMobile:n}}}}]);
//# sourceMappingURL=881.6102b65d.chunk.js.map