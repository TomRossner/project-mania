"use strict";(self.webpackChunkproject_mania=self.webpackChunkproject_mania||[]).push([[995],{9179:function(s,n,i){i.r(n),i.d(n,{default:function(){return E}});var e=i(9439),c=i(2791),l=i(7689),a=i(1087),o=i(8820),t=i(995),r=i(184),x=function(){var s=(0,l.s0)();return(0,r.jsxs)("div",{className:"logo-container",onClick:function(){return s("/")},children:[(0,r.jsx)(t.Z,{icon:(0,r.jsx)(o.SgI,{className:"icon logo"})}),(0,r.jsx)("p",{children:"Project Mania"})]})},d=i(9434),j=i(9126),m=i(71),u=i(2696),h=i(7800),f=i(6856),p=i(828),N=i(8617),g=i(4934),v=i(3884),k=i(9143),Z=i(1213),C=function(s){var n=s.icon,i=s.path,e=s.text,c=s.onClick;return(0,r.jsxs)("li",{onClick:c,children:[(0,r.jsx)(t.Z,{icon:n}),(0,r.jsx)(a.rU,{className:"link",to:i,children:e})]})},w=i(4083),b=(i(7480),i(4888)),E=function(){var s=(0,d.I0)(),n=(0,l.s0)(),i=(0,g.Z)(),E=i.boards,S=i.closeMenu,U=(0,h.Z)(),F=U.user,I=U.isAuthenticated,_=U.userInfo,L=U.profileImage,M=U.loadProfileImage,y=(0,c.useState)(!1),A=(0,e.Z)(y,2),B=A[0],H=A[1],O=(0,c.useState)(""),P=(0,e.Z)(O,2),R=P[0],z=P[1],D=(0,b.Z)().isMobile,K=(0,d.v9)(w.fS),T=function(){return H(!B)},V=function(i){S(),s((0,u.Ce)(i)),n("/projects/".concat(i._id))};return(0,c.useEffect)((function(){z(_?"".concat(_.first_name," ").concat(_.last_name)||_.name:"")}),[_]),(0,c.useEffect)((function(){_&&M()}),[_]),(0,r.jsx)(r.Fragment,{children:D?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("nav",{className:K?"mobile open":"mobile",children:[(0,r.jsx)(x,{}),(0,r.jsx)(t.Z,{additionalClass:"cross",icon:(0,r.jsx)(Z.ySC,{className:"icon xl"}),onClick:S}),(0,r.jsxs)("ul",{className:"flex1",children:[(0,r.jsx)(C,{path:"/",icon:(0,r.jsx)(Z.Dm6,{className:"icon"}),text:"Home",onClick:S}),(0,r.jsxs)("div",{className:"li-expand",children:[(0,r.jsxs)("li",{onClick:T,children:[(0,r.jsx)(t.Z,{icon:(0,r.jsx)(o.Tk2,{className:"icon"})}),(0,r.jsx)(a.rU,{className:"link flex1",children:"Projects"}),(0,r.jsx)(t.Z,{icon:(0,r.jsx)(j.IAR,{className:"icon ".concat(B?"":"reversed")}),onClick:S})]}),F&&I&&E.length?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"".concat(B?"dropdown open":"dropdown"),children:null===E||void 0===E?void 0:E.map((function(s){return(0,r.jsx)("p",{onClick:function(){return V(s)},children:s.title},s._id)}))})}):null]}),(0,r.jsx)(C,{path:"/users",icon:(0,r.jsx)(N.IKj,{className:"icon"}),text:"Browse users",onClick:S}),(0,r.jsx)(C,{path:"/chat/".concat(null===F||void 0===F?void 0:F._id),icon:(0,r.jsx)(j.SO6,{className:"icon"}),text:"Chat",onClick:S}),(0,r.jsx)(C,{path:"/about",icon:(0,r.jsx)(o.ocf,{className:"icon"}),text:"About",onClick:S}),(0,r.jsx)(C,{path:"/settings",icon:(0,r.jsx)(m.Fuo,{className:"icon"}),text:"Settings",onClick:S})]}),(0,r.jsxs)("ul",{id:"left-nav-bottom-ul",children:[(0,r.jsx)("div",{className:"li-expand",children:(0,r.jsxs)("div",{className:"dropdown open",children:[F&&I?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a.rU,{className:"link flex-align",to:"/profile",onClick:S,children:[(0,r.jsx)(t.Z,{icon:(0,r.jsx)(f.Vyx,{className:"icon large"})}),"My profile"]}),(0,r.jsxs)(a.rU,{className:"link flex-align",to:"/logout",onClick:S,children:[(0,r.jsx)(t.Z,{icon:(0,r.jsx)(f.lE7,{className:"icon"})}),"Logout"]})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a.rU,{className:"link flex-align",to:"/sign-in",onClick:S,children:[(0,r.jsx)(t.Z,{icon:(0,r.jsx)(f.HOZ,{className:"icon"})}),"Login"]}),(0,r.jsxs)(a.rU,{className:"link flex-align",to:"/sign-up",onClick:S,children:[(0,r.jsx)(t.Z,{icon:(0,r.jsx)(p.BR5,{className:"icon"})}),"Sign up"]})]}),(0,r.jsx)(v.Z,{})]})}),F&&I&&(0,r.jsxs)("div",{className:"profile",children:[L?(0,r.jsx)("div",{className:"profile-img-container",children:(0,r.jsx)("img",{src:L,alt:"profile"})}):(0,r.jsx)(k.Z,{}),(0,r.jsx)("span",{children:R})]})]})]})}):(0,r.jsxs)("nav",{children:[(0,r.jsx)(x,{}),(0,r.jsxs)("ul",{className:"flex1",children:[(0,r.jsx)(C,{path:"/",icon:(0,r.jsx)(Z.Dm6,{className:"icon"}),text:"Home"}),(0,r.jsxs)("div",{className:"li-expand",children:[(0,r.jsxs)("li",{onClick:T,children:[(0,r.jsx)(t.Z,{icon:(0,r.jsx)(o.Tk2,{className:"icon"})}),(0,r.jsx)(a.rU,{className:"link flex1",children:"Projects"}),(0,r.jsx)(t.Z,{icon:(0,r.jsx)(j.IAR,{className:"icon ".concat(B?"":"reversed")})})]}),F&&I&&E.length?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"".concat(B?"dropdown open":"dropdown"),children:null===E||void 0===E?void 0:E.map((function(s){return(0,r.jsx)("p",{onClick:function(){return V(s)},children:s.title},s._id)}))})}):null]}),(0,r.jsx)(C,{path:"/users",icon:(0,r.jsx)(N.IKj,{className:"icon"}),text:"Browse users"}),(0,r.jsx)(C,{path:"/chat/".concat(null===F||void 0===F?void 0:F._id),icon:(0,r.jsx)(j.SO6,{className:"icon"}),text:"Chat"}),(0,r.jsx)(C,{path:"/about",icon:(0,r.jsx)(o.ocf,{className:"icon"}),text:"About"}),(0,r.jsx)(C,{path:"/settings",icon:(0,r.jsx)(m.Fuo,{className:"icon"}),text:"Settings"})]}),(0,r.jsxs)("ul",{id:"left-nav-bottom-ul",children:[(0,r.jsx)("div",{className:"li-expand",children:(0,r.jsxs)("div",{className:"dropdown open",children:[F&&I?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a.rU,{className:"link flex-align",to:"/profile",children:[(0,r.jsx)(t.Z,{icon:(0,r.jsx)(f.Vyx,{className:"icon large"})}),"My profile"]}),(0,r.jsxs)(a.rU,{className:"link flex-align",to:"/logout",children:[(0,r.jsx)(t.Z,{icon:(0,r.jsx)(f.lE7,{className:"icon"})}),"Logout"]})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a.rU,{className:"link flex-align",to:"/sign-in",children:[(0,r.jsx)(t.Z,{icon:(0,r.jsx)(f.HOZ,{className:"icon"})}),"Login"]}),(0,r.jsxs)(a.rU,{className:"link flex-align",to:"/sign-up",children:[(0,r.jsx)(t.Z,{icon:(0,r.jsx)(p.BR5,{className:"icon"})}),"Sign up"]})]}),(0,r.jsx)(v.Z,{})]})}),F&&I&&(0,r.jsxs)("div",{className:"profile",children:[L?(0,r.jsx)("div",{className:"profile-img-container",children:(0,r.jsx)("img",{src:L,alt:"profile"})}):(0,r.jsx)(k.Z,{}),(0,r.jsx)("span",{children:R})]})]})]})})}},9143:function(s,n,i){i.d(n,{Z:function(){return l}});i(2791);var e=i.p+"static/media/blank-profile-picture.48af6c0bf2932eced28a.png",c=i(184),l=function(s){var n=s.size;return(0,c.jsx)("div",{className:"profile-img-container blank",children:(0,c.jsx)("img",{id:"blank-profile",src:e,alt:"blank profile",width:n||null,height:n||null})})}},4888:function(s,n,i){var e=i(2791),c=i(9434),l=i(7480),a=i(4083);n.Z=function(){var s=(0,c.v9)(a.eD),n=(0,c.I0)();return(0,e.useEffect)((function(){var s=function(){window.innerWidth<1441?n((0,l.Ep)(!0)):n((0,l.Ep)(!1))};return window.addEventListener("resize",s),window.addEventListener("load",s),function(){window.removeEventListener("resize",s),window.removeEventListener("load",s)}}),[]),{isMobile:s}}}}]);
//# sourceMappingURL=995.177e38f2.chunk.js.map