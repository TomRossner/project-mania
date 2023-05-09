"use strict";(self.webpackChunkproject_mania=self.webpackChunkproject_mania||[]).push([[17],{6017:function(e,n,i){i.r(n),i.d(n,{default:function(){return E}});var t=i(3433),s=i(9439),r=i(2791),o=i(9434),c=i(4101),a=i(1427),l=i(34),u=i(3763),d=i(7470),f=i(7800),m=i(2048),v=i(9143),h=i(9126),j=i(995),x=i(184),_=function(e){var n=e.user;return(0,x.jsxs)("div",{className:"user-tab",children:[n.base64_img_data||n.img_url?(0,x.jsx)(m.Z,{src:function(e){return e.base64_img_data?Buffer.from(e.base64_img_data):e.img_url.toString()}(n)}):(0,x.jsx)(v.Z,{}),(0,x.jsx)(j.Z,{title:n.online?"Online":"Offline",icon:function(e){return(0,x.jsx)(h.KC7,{className:e.online?"icon online-status green":"icon online-status grey"})}(n)}),(0,x.jsxs)("div",{className:"user-tab-content",children:[(0,x.jsxs)("h4",{children:[n.first_name," ",n.last_name]}),n.header?(0,x.jsx)("p",{children:n.header}):null]})]})},w=i(6747),b=i(4934),Z=i(71),N=i(4888),C=i(5680),g=i(7689),p=i(5224),L=i(6974),k=i(8820),E=function(){var e=(0,o.v9)(c.a),n=(0,f.Z)(),i=n.user,m=n.userInfo,v=(0,o.I0)(),E=(0,r.useState)(""),M=(0,s.Z)(E,2),S=M[0],I=M[1],O=(0,r.useState)([]),R=(0,s.Z)(O,2),A=R[0],B=R[1],F=(0,b.Z)(),V=F.currentProject,q=F.handleAddMember,y=F.handleRemoveMemberFromProject,z=(0,N.Z)().isMobile,D=(0,g.s0)(),K=(0,o.v9)(p.Rt),P=(0,L.Z)(),U=P.createNewChat,H=P.fetchUserChats;return(0,r.useEffect)((function(){S.length||B([]),function(n){if(e.some((function(e){return e.first_name.toLowerCase().includes(n.toLowerCase())||e.last_name.toLowerCase().includes(n.toLowerCase())}))){var i=(0,t.Z)(null===e||void 0===e?void 0:e.filter((function(e){return e.first_name.toLowerCase().includes(n.toLowerCase())||e.last_name.toLowerCase().includes(n.toLowerCase())})));B((0,t.Z)(i))}}(S)}),[S]),(0,r.useEffect)((function(){v((0,u.Dq)()),H()}),[]),(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{className:"users-container",children:[(0,x.jsx)(a.Z,{}),(0,x.jsxs)("div",{className:"title",children:[(0,x.jsx)("h1",{children:"Users"}),(0,x.jsx)(l.Z,{value:S,fn:function(e){I(e.target.value)},placeholderText:"Search users",icon:(0,x.jsx)(j.Z,{icon:(0,x.jsx)(h.dVI,{className:"icon"})})})]}),(0,x.jsxs)("div",{className:"results-container",children:[(0,x.jsxs)("p",{children:[e.filter((function(e){return e._id!==(null===i||void 0===i?void 0:i._id)})).length," ",1===e.filter((function(e){return e._id!==(null===i||void 0===i?void 0:i._id)})).length?"user found":"users found"]}),(0,x.jsx)(d.Z,{}),A.length?(0,x.jsx)(x.Fragment,{children:null===A||void 0===A?void 0:A.filter((function(e){return e._id!==(null===i||void 0===i?void 0:i._id)})).map((function(n){var i,t;return(0,x.jsxs)("div",{className:"search-result",children:[(0,x.jsx)(_,{user:n}),(0,x.jsxs)("div",{className:"buttons-container",children:[(0,x.jsxs)("button",{className:"btn white",onClick:function(){return function(n){var i=e.find((function(e){return e._id===n}));if(v((0,C.Ku)(i)),!(null===K||void 0===K?void 0:K.some((function(e){return e.users.some((function(e){return e===n}))}))))return U(null===m||void 0===m?void 0:m._id,i);v((0,C.OB)(null===m||void 0===m?void 0:m._id,n)),D("/chat/".concat(null===m||void 0===m?void 0:m._id))}(n._id)},title:"Chat with ".concat(n.first_name),children:[(0,x.jsx)(j.Z,{icon:(0,x.jsx)(h.SO6,{className:"icon"})}),z?"":" Message"]}),(0,x.jsxs)("button",{className:"btn white",onClick:function(){n._id},title:"View ".concat(n.first_name,"'s profile"),children:[(0,x.jsx)(j.Z,{icon:(0,x.jsx)(Z.bq1,{className:"icon xl"})}),z?"":" View profile"]}),(null===V||void 0===V||null===(i=V.members)||void 0===i?void 0:i.some((function(e){return e._id===n._id})))&&(null===m||void 0===m?void 0:m.admin)&&(0,x.jsxs)("button",{className:"btn white",title:"Remove ".concat(n.first_name," from project"),onClick:function(){return y(n._id)},children:[(0,x.jsx)(j.Z,{icon:(0,x.jsx)(k.ywL,{className:"icon"})}),z?"":" Remove from project"]}),!(null!==V&&void 0!==V&&null!==(t=V.members)&&void 0!==t&&t.some((function(e){return e._id===n._id})))&&(null===m||void 0===m?void 0:m.admin)&&(0,x.jsxs)("button",{className:"btn white",title:"Add ".concat(n.first_name," to project"),onClick:function(){return q(n)},children:[(0,x.jsx)(j.Z,{icon:(0,x.jsx)(h.L3d,{className:"icon xl"})}),z?"":" Add to project"]})]})]},(0,w.H)())}))}):null]})]})})}},1427:function(e,n,i){i(2791);var t=i(7692),s=i(7689),r=i(184);n.Z=function(){var e=(0,s.s0)();return(0,r.jsxs)("button",{className:"back-button link",onClick:function(){return e(-1)},children:[(0,r.jsx)(t.gbs,{className:"icon"}),"Back"]})}},4888:function(e,n,i){var t=i(2791),s=i(9434),r=i(7480),o=i(4083);n.Z=function(){var e=(0,s.v9)(o.eD),n=(0,s.I0)();return(0,t.useEffect)((function(){var e=function(){window.innerWidth<1441?n((0,r.Ep)(!0)):n((0,r.Ep)(!1))};return window.addEventListener("resize",e),window.addEventListener("load",e),function(){window.removeEventListener("resize",e),window.removeEventListener("load",e)}}),[]),{isMobile:e}}}}]);
//# sourceMappingURL=17.be72e50b.chunk.js.map