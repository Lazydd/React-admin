(self.webpackChunkreact_admin=self.webpackChunkreact_admin||[]).push([[755],{8077:function(e,t,n){"use strict";n.d(t,{Rd:function(){return y},h8:function(){return v},B9:function(){return T},RT:function(){return C},UV:function(){return S},Q4:function(){return h},dA:function(){return L},JV:function(){return g},Vd:function(){return m},bG:function(){return f},lE:function(){return j},p:function(){return p},gG:function(){return b},OC:function(){return Z},$r:function(){return D},zb:function(){return I},x$:function(){return x},JR:function(){return k},ul:function(){return w},n$:function(){return d}});var r=n(1413),i=n(4569),o=n.n(i),a=n(2808),s=n.n(a),u=n(7607),c=n(3695),l=o().create({});l.interceptors.request.use((function(e){return e.url.includes("/v3/")||(e.url="/v1_0"+e.url),u.Z.getStorage("tokenName")&&u.Z.getStorage("tokenValue")&&(e.headers.Authorization=u.Z.getStorage("tokenName")+" "+"".concat(u.Z.getStorage("tokenValue"))),!e.data||"multiple/form-data"===e.headers["Content-Type"]||"application/json"===e.headers["Content-Type"]||"application/x-www-form-urlencoded"!==e.headers["Content-Type"]&&"post"!==e.method||(e.data=s().stringify(e.data,{allowDots:!0})),"get"===e.method&&(e.params=(0,r.Z)((0,r.Z)({},e.params),{},{time:(new Date).getTime()})),e})),l.interceptors.response.use((function(e){if(e.status>=200&&e.status<300)return 401===e.data.code?c.ZP.error(e.data.error):e.data.code>=-1&&e.data.code<=-1&&(window.location.href="/login"),e.data}),(function(e){throw c.ZP.error(e.message),new Error("\u7f51\u7edc\u9519\u8bef")}));var d=function(e){return l({url:"/login/doLogin",method:"POST",data:e})},f=function(){return l.get("/system/user/current/user")},p=function(e){return l.get("/v3/weather/weatherInfo?key=6d78e0a70cbe6fc669f1a0705a85a5b5&city="+e)},h=function(){return l.get("/v3/ip?key=6d78e0a70cbe6fc669f1a0705a85a5b5")},m=function(e){return l.get("/system/role/page",{params:e})},g=function(e){return l.get("/system/role/list",{params:e})},x=function(e){return l.post("/system/role/save",e)},w=function(e){return l.post("/system/role/update",e)},y=function(e){return l.delete("/system/role/remove",{params:{ids:e}})},Z=function(e){return l.post("/system/role/relation/api",e)},j=function(e){return l.get("/system/user/page",{params:e})},k=function(e){return l.post("/system/user/save",e)},I=function(e){return l.post("/system/user/reset/password",{id:e})},v=function(e){return l.delete("/system/user/remove",{params:{ids:e}})},T=function(e){return l.post("/system/user/disable",e)},S=function(e){return l.get("/system/api/page",{params:e})},C=function(e){return l.get("/system/api/list",{params:e})},b=function(){return l.get("/system/api/refresh")},D=function(e){return l.post("/system/user/relation/role",e)},L=function(e){return l.get("/system/logs/page",{params:e})}},2119:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return T}});var r=n(5861),i=n(1413),o=n(9439),a=n(7757),s=n.n(a),u=n(2791),c=n(7031),l=n(9220),d=n(7309),f=n(3695),p=n(8164),h=n(9004),m=n(8006),g=n(4997),x=n(9421),w=n(2426),y=n.n(w),Z=n(1939),j=n.n(Z),k=n(8077),I=n(184),v=c.Z.Search;function T(){var e=(0,u.useState)(!0),t=(0,o.Z)(e,2),n=t[0],a=t[1],c=(0,u.useState)({}),w=(0,o.Z)(c,2),Z=w[0],T=w[1],S=(0,u.useState)(""),C=(0,o.Z)(S,2),b=C[0],D=C[1],L=(0,u.useState)(!1),Y=(0,o.Z)(L,2),z=Y[0],O=Y[1],P=(0,u.useState)({list:[],count:0}),B=(0,o.Z)(P,2),K=B[0],M=B[1],R=(0,u.useState)({current:1,size:10,likeKey:""}),V=(0,o.Z)(R,2),A=V[0],H=V[1],N=[{title:"\u5e8f\u53f7",dataIndex:"index",fixed:"left",width:80,align:"center",render:function(e,t,n){return"".concat((A.current-1)*A.size+n+1)}},{title:"\u63a5\u53e3\u540d\u79f0",dataIndex:"name",fixed:"left",width:150,align:"center",ellipsis:{showTitle:!1},render:function(e){return(0,I.jsx)(l.Z,{placement:"topLeft",title:e,children:e})}},{title:"\u8bf7\u6c42\u65b9\u5f0f",dataIndex:"requestMethod",width:120,align:"center"},{title:"\u8bf7\u6c42\u53c2\u6570",dataIndex:"requestParameter",width:180,align:"center",ellipsis:{showTitle:!1},render:function(e){return(0,I.jsx)(d.Z,{onClick:function(){return U(e,"\u8bf7\u6c42\u53c2\u6570")},children:"\u53c2\u6570"})}},{title:"\u63a5\u53e3\u5730\u5740",dataIndex:"url",width:180,align:"center"},{title:"\u8017\u65f6(\u6beb\u79d2)",dataIndex:"timeConsuming",width:150,align:"center"},{title:"\u5f02\u5e38\u4e0e\u54cd\u5e94\u5185\u5bb9",dataIndex:"content",width:150,render:function(e){return(0,I.jsx)(d.Z,{onClick:function(){return U(e,"\u5f02\u5e38\u4e0e\u54cd\u5e94\u5185\u5bb9")},children:"\u54cd\u5e94"})}},{title:"\u64cd\u4f5c\u4eba",dataIndex:"operator",width:150,align:"center",ellipsis:{showTitle:!1},render:function(e){return(0,I.jsx)(l.Z,{placement:"topLeft",title:e,children:e})}},{title:"\u5e73\u53f0",dataIndex:"platform",width:150,align:"center",ellipsis:{showTitle:!1},render:function(e){return(0,I.jsx)(l.Z,{placement:"topLeft",title:e,children:e})}},{title:"\u6d4f\u89c8\u5668",dataIndex:"browser",width:150,align:"center",ellipsis:{showTitle:!1},render:function(e){return(0,I.jsx)(l.Z,{placement:"topLeft",title:e,children:e})}},{title:"IP",dataIndex:"ip",width:150,align:"center"},{title:"IP\u6765\u6e90",dataIndex:"ipAddress",width:150,align:"center",ellipsis:{showTitle:!1},render:function(e){return(0,I.jsx)(l.Z,{placement:"topLeft",title:e,children:e})}},{title:"\u63a5\u53e3\u6743\u9650\u6807\u8bc6",dataIndex:"apiFlag",width:150,align:"center"},{title:"\u521b\u5efa\u4eba",width:150,dataIndex:"createdBy",align:"center",ellipsis:{showTitle:!1},render:function(e){return(0,I.jsx)(l.Z,{placement:"topLeft",title:e,children:e})}},{title:"\u66f4\u65b0\u4eba",width:150,dataIndex:"updatedBy",align:"center",ellipsis:{showTitle:!1},render:function(e){return(0,I.jsx)(l.Z,{placement:"topLeft",title:e,children:e})}},{title:"\u66f4\u65b0\u65f6\u95f4",width:200,dataIndex:"updatedTime",align:"center",render:function(e){return(0,I.jsx)("span",{children:e?y()(e).format("YYYY-MM-DD HH:mm:ss"):""})}},{title:"\u521b\u5efa\u65f6\u95f4",width:200,dataIndex:"createdTime",align:"center",render:function(e){return(0,I.jsx)("span",{children:e?y()(e).format("YYYY-MM-DD HH:mm:ss"):""})}}],U=function(e,t){T(JSON.parse(e)),D(t),O(!0)},q=function(){var e=(0,r.Z)(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(0,k.dA)((0,i.Z)((0,i.Z)({},A),{},{likeKey:A.likeKey?A.likeKey:void 0})).then((function(e){200==e.code?M({list:e.records,count:e.total}):f.ZP.error(e.error)})).finally((function(){a(!1)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,u.useEffect)((function(){a(!0),q()}),[A]),(0,I.jsxs)(I.Fragment,{children:[(0,I.jsxs)(p.Z,{children:[(0,I.jsx)(p.Z.Item,{children:(0,I.jsx)("a",{href:"",children:"\u9996\u9875"})}),(0,I.jsx)(p.Z.Item,{children:(0,I.jsx)("a",{href:"",children:"\u65e5\u5fd7\u7ba1\u7406"})})]}),(0,I.jsx)(h.Z,{style:{width:"100%",marginTop:20,overflow:"hidden"},children:(0,I.jsx)(v,{placeholder:"\u8bf7\u8f93\u5165\u63a5\u53e3\u540d\u79f0\u3001\u8bf7\u6c42\u65b9\u5f0f\u3001\u63a5\u53e3\u5730\u5740\u7b49...",loading:n,enterButton:!0,onSearch:function(e){H((0,i.Z)((0,i.Z)({},A),{},{likeKey:e,current:1}))}})}),(0,I.jsxs)(h.Z,{style:{width:"100%",marginTop:20,overflow:"hidden"},loading:n,children:[(0,I.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:25},children:(0,I.jsxs)("p",{style:{marginBottom:0},children:["\u6839\u636e\u7b5b\u9009\u6761\u4ef6\u5171\u67e5\u8be2\u5230",K.count,"\u6761\u7ed3\u679c"]})}),(0,I.jsx)(m.Z,{className:"menuMainTainTable",columns:N,dataSource:K.list||[],scroll:{x:1300},pagination:{pageSize:A.size,current:A.current,onChange:function(e){H((0,i.Z)((0,i.Z)({},A),{},{current:e}))},total:K.count,showSizeChanger:!1},rowKey:function(e){return e.id}})]}),(0,I.jsx)(g.Z,{width:800,title:b,visible:z,onOk:function(){return O(!1)},afterClose:function(){return T({})},onCancel:function(){return O(!1)},forceRender:!0,okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",children:0!=Object.keys(Z).length?(0,I.jsx)(j(),{style:{height:"500px",overflow:"auto"},src:Z,enableClipboard:!1,iconStyle:"circle",name:!1,collapsed:!1,displayDataTypes:!1}):(0,I.jsx)(x.Z,{})})]})}},7607:function(e,t){"use strict";var n={getCookie:function(e){var t=document.cookie,n=t.indexOf(e+"=");if(n>-1){n=n+e.length+1;var r=t.indexOf(";",n);return r=r<0?t.length:r,decodeURIComponent(t.substring(n,r))}return""},setCookie:function(e,t,n){var r=n,i=new Date;i.setTime(i.getTime()+24*r*3600*1e3),document.cookie=e+"="+encodeURIComponent(t)+";expires="+(void 0===r?"":i.toUTCString())},delCookie:function(e){var t=this.getCookie(e);!1!==t&&this.setCookie(e,t,-1)},getStorage:function(e){return localStorage.getItem(e)},setStorage:function(e,t){return localStorage.setItem(e,t)},delStorage:function(e){localStorage.removeItem(e)}};t.Z=n},4654:function(){}}]);
//# sourceMappingURL=755.4bd4f670.chunk.js.map