/*! For license information please see main.4f2635d9.js.LICENSE.txt */
  margin-bottom: 20px;
  .gray {
    color: #aaa;
  }
  .green {
    color: green;
  }
  .now-space-box {
    width: 100%;
    padding: 20px 0;
    display: block;
    overflow: hidden;
    span {
      padding-left: 20px;
      font-size: 20px;
    }
  }
  .top-price-btn {
    position: absolute;
    top: 0px;
    right: 0px;
    display: flex;
    width: 420px;
    padding: 5px 30px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 1px 1px 20px 0px #e9e9e9;
    .top-price-btn-left {
      width: 70%;
      span {
        font-size: 13px;
      }
      label {
        font-size: 12px;
        color: #aaa;
      }
    }
    .top-price-btn-right {
      width: 30%;
      span {
        width: 100%;
        border-radius: 4px;
        background-color: #3187fa;
        color: #fff;
        margin: 5px 0;
        display: block;
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
      }
      span:hover {
        background-color: #73abf7;
      }
    }
  }
  @media screen and (max-width: 900px) {
    .top-price-btn {
      position: relative !important;
      width: 100% !important;
      margin: 20px auto 0;
      padding: 5px 10px;
    }
  }
  .search-box {
    max-width: 700px;
  }
  .big-title {
    font-family: "Microsoft YaHei", 微软雅黑;
    .big-title-txt {
      font-size: 20px;
      color: #000;
      font-weight: bold;
    }
    .big-title-txt-2 {
      font-size: 14px;
      color: #aaa;
      margin-bottom: 16px;
    }
  }
  .ant-input-group-addon button {
    border: none !important;
    color: rgb(69 148 255) !important;
  }
`);const t0=__webpack_require__.p+"static/media/logo.7c4b2a1765a3541cdbf8.png";function n0(e,t,n,r,a){return{key:t,icon:n,children:r,label:e,type:a}}const r0=[n0("Home","/",(0,IJ.jsx)(Gr,{})),n0("Explore","sub",(0,IJ.jsx)(Jr,{}),function(){let e=V_.cats.map((e=>({key:"/cat/"+e.value,label:e.label})));return e}())];let a0=null,i0=0;const o0=tt((function(e){let{className:t}=e,n=Qt();const[r,a]=(0,k.useState)(!1),[i,o]=(0,k.useState)(!1),[s,c]=(0,k.useState)(),[l,u]=(0,k.useState)(!1),[d,f]=(0,k.useState)(!1),[p,h]=(0,k.useState)(!1),[m,g]=(0,k.useState)(!1),[b,y]=(0,k.useState)(),[v,x]=(0,k.useState)(),[w,S]=(0,k.useState)(),[P,C]=(0,k.useState)(!1),[E,T]=(0,k.useState)(),[O,N]=(0,k.useState)(0),[M,I]=(0,k.useState)({});(0,k.useEffect)((()=>{B_().then((e=>{localStorage.getItem("addr")}),console.log),I({videoApiUrl:V_.videoApiUrl,apiUrl:V_.apiUrl,contractAddress:V_.contractAddress,nodeURL:V_.wsnode.nodeURL})}),[]);const V=()=>{o(!i)},R=async e=>{if(y(e),M_.set("account",e),console.log("saveAccount",e),e){let n=(t=e.address,H_.getPublicKeyFromAccountId(t));localStorage.setItem("publicKey",n),localStorage.setItem("addr",e.address)}else localStorage.removeItem("publicKey"),localStorage.removeItem("addr");var t},z=e=>{f(e)};window.showSpaceModel=z;const H=e=>{S(e.target.value)},A=e=>{T(e.target.value)};return(0,IJ.jsxs)("div",{className:t,children:[(0,IJ.jsx)("div",{className:"abs-header",children:(0,IJ.jsxs)("div",{className:"header-content",children:[(0,IJ.jsxs)("span",{className:"h-col h-col-1 menu-btn",children:[(0,IJ.jsx)("label",{onClick:V,children:(0,IJ.jsx)(ea,{style:{color:"#013088",fontSize:30,position:"absolute",top:"13px",left:"0px"}})}),(0,IJ.jsx)(wn,{to:"/",children:(0,IJ.jsx)("img",{src:t0,style:{width:"160px",position:"absolute",top:"14px",left:"45px"}})})]}),(0,IJ.jsxs)("span",{className:"h-col h-col-3 search-box",children:[(0,IJ.jsx)("input",{type:"text",onKeyUp:e=>{c(e.target.value)},placeholder:"Search",className:"search-txt"}),(0,IJ.jsx)(ra,{className:"search-btn",onClick:()=>{n("/search/"+s)}})]}),b?(0,IJ.jsxs)("span",{className:"h-col h-col-4 upload-btn",children:[(0,IJ.jsxs)("span",{className:"h-account",onClick:e=>{if(e||(e=v),!e||0==e.length)return P$("account not found");h(!0)},children:[(0,IJ.jsx)(CQ,{value:b.address,size:36,theme:"polkadot",style:{marginTop:0}}),(0,IJ.jsx)("span",{className:"addr-text",children:q_(b.address)}),(0,IJ.jsx)("span",{className:"balance-text",children:b.balance_str||"**"})]}),(0,IJ.jsxs)("span",{className:"h-btn",onClick:()=>z(!0),style:{backgroundColor:"#b8e6ff"},children:[(0,IJ.jsx)(oa,{})," My Space"]}),(0,IJ.jsxs)("span",{className:"h-btn",onClick:()=>n("/create"),children:[(0,IJ.jsx)(la,{})," Upload Video"]})]}):(0,IJ.jsx)("span",{className:"h-col h-col-4 upload-btn",children:(0,IJ.jsxs)("span",{className:"h-btn",onClick:()=>{u(!0)},children:[(0,IJ.jsx)(fa,{})," Connect Wallet"]})})]})}),i?(0,IJ.jsxs)("div",{className:"menu-box",children:[(0,IJ.jsx)(Yg,{defaultSelectedKeys:["1"],defaultOpenKeys:["sub"],mode:"inline",theme:"dark",items:r0,className:"nav-menu",onClick:e=>{let{item:t,key:r,keyPath:a,domEvent:i}=e;"sub"!=r&&(n(r),V())}}),(0,IJ.jsxs)("div",{className:"h-bottom-btn",onClick:()=>{g(!0),V()},children:[(0,IJ.jsx)(ma,{})," Config API URL"]})]}):"",(0,IJ.jsx)(wv,{width:800,title:"Config API URL",open:m,onOk:()=>g(!1),onCancel:()=>g(!1),footer:null,children:(0,IJ.jsx)("div",{children:(0,IJ.jsxs)(Hx,{name:"basic",labelCol:{span:4},wrapperCol:{span:20},initialValues:M,onFinish:e=>{console.log("Success:",e),M_.set("webconfig",e),P$("Save Success!",(()=>{window.location.reload()}))},onFinishFailed:e=>{console.log("Failed:",e)},autoComplete:"off",children:[(0,IJ.jsx)(Hx.Item,{label:"Video API",name:"videoApiUrl",rules:[{required:!0,message:"Please input video API!"}],children:(0,IJ.jsx)(Kw,{})}),(0,IJ.jsx)(Hx.Item,{label:"NFT API",name:"apiUrl",rules:[{required:!0,message:"Please input NFT API!"}],children:(0,IJ.jsx)(Kw,{})}),(0,IJ.jsx)(Hx.Item,{label:"Contract Address",name:"contractAddress",rules:[{required:!0,message:"Contract Address!"}],children:(0,IJ.jsx)(Kw,{})}),(0,IJ.jsx)(Hx.Item,{label:"Node RPC",name:"nodeURL",rules:[{required:!0,message:"Please input Node RPC!"}],children:(0,IJ.jsx)(Kw,{})}),(0,IJ.jsx)(Hx.Item,{wrapperCol:{offset:4,span:20},children:(0,IJ.jsx)(ey,{className:"btn-bg",type:"primary",htmlType:"submit",children:"Submit"})})]})})}),(0,IJ.jsx)(wv,{width:800,title:"Connect Your Wallet",open:l,onOk:()=>u(!1),onCancel:()=>u(!1),footer:null,loading:r,children:(0,IJ.jsxs)(aS,{spinning:r,children:[(0,IJ.jsx)("p",{children:"If you don't have a wallet yet, you can select a provider and create one now"}),(0,IJ.jsx)("p",{}),(0,IJ.jsxs)("div",{className:"login-line",onClick:async()=>{try{a(!0);const r=await(0,j$.$y)("my cool dapp");if(console.log("allInjected",r),!r||0==r.length)return YQ("Please install the Polkadot{.js} extension(https://polkadot.js.org/extension/)."),void window.setTimeout((function(){window.open("https://polkadot.js.org/extension/")}),3e3);let i=await(0,j$.vK)();if(console.log("accounts",i),i&&i.length>0){var e,t,n;od.success("Login success!");try{let e=await B_();for(let t of i){t.address=IR(t.address,11330);const{nonce:n,data:r}=await e.query.system.account(t.address);console.log("balance",r),console.log(`balance of ${r.free} and a nonce of ${n}`),t.nonce=n,t.balance=X_(r),t.balance_str=t.balance+" TCESS"}}catch(Av){console.log("query balance error"),console.error(Av);let t=M_.get("accounts");i.forEach((e=>{let n=t.find((t=>t.address==e.address));n&&(e.nonce=n.nonce,e.balance=n.balance,e.balance_str=n.balance_str)}))}let r=localStorage.getItem("addr");i=i.sort(((e,t)=>t.balance-e.balance));let a=0;r&&(a=i.findIndex((e=>e.address==r)),-1==a&&(a=0));let o=i[a];x(i),M_.set("accounts",i),R(o);let s=o.address,c=parseInt((new Date).valueOf()/1e3);const l=await(0,j$.R0)(null===(e=o.meta)||void 0===e?void 0:e.source),d=null===l||void 0===l||null===(t=l.signer)||void 0===t?void 0:t.signRaw;let f=WU("<Bytes>"+s+c+"</Bytes>");const{signature:p}=await d({address:s,data:f,type:"bytes"});let h={address:s,timestamp:c,sign:p.replace("0x","")},m=await function(e){return S$.put("/auth/login-by-wallet",{data:e})}(h);console.log("loginByWallet",m),m.ok?(GQ("Login success"),M_.set("accountType","wallet"),M_.set("token",m.ok.token),u(!1)):null!==(n=m.error)&&void 0!==n&&n.msg?YQ(m.error.msg):YQ("Login fail")}}catch(Av){!function(e){WQ.error({message:e})}(Av.message)}finally{a(!1)}},children:[(0,IJ.jsx)("img",{src:_P}),(0,IJ.jsxs)("span",{children:["polkadot","{.js}"," extension"]}),(0,IJ.jsx)("label",{children:"Polkadot"})]}),(0,IJ.jsx)("div",{className:"txt-line",children:"Or"}),(0,IJ.jsxs)("div",{className:"input-line",children:[(0,IJ.jsx)("input",{type:"text",onInput:H,onChange:H,onKeyUp:H,placeholder:"Enter your email"}),O>0?(0,IJ.jsx)("span",{className:"btn-send diabled",children:O}):(0,IJ.jsx)("span",{className:"btn-send enabled",onClick:async e=>{try{var t;if(!w)return YQ("email error");a(!0);let e=await function(e){let t={email:e};return S$.put("/auth/apply-code",{data:t})}(w);a(!1),console.log({ret:e}),1==e.ok?(GQ("email vcode has been sent"),i0=60,N(60),a0=setInterval((function(){i0--,i0<0?clearInterval(a0):N(i0)}),1e3),C(!0)):null!==(t=e.error)&&void 0!==t&&t.msg?YQ(e.error.msg):YQ("email vcode send fail")}catch(e){console.log(e)}},children:"Send"})]}),P&&(0,IJ.jsx)("div",{className:"input-line",children:(0,IJ.jsx)("input",{type:"text",onInput:A,onChange:A,onKeyUp:A,placeholder:"Enter auth code"})}),(0,IJ.jsx)("div",{className:"btn-line",children:(0,IJ.jsx)("span",{className:"btn-login",onClick:async e=>{try{var t;if(!w)return YQ("email error");if(!E)return YQ("AuthCode error");a(!0);let e=await function(e,t){let n={email:e,authCode:t};return S$.put("/auth/login-by-email",{data:n})}(w,E);if(a(!1),console.log({ret:e}),e.ok){GQ("Login success"),M_.set("accountType","email"),M_.set("token",e.ok.token),u(!1);let t={address:e.ok.walletAddress};x([t]),M_.set("accounts",[t]),R(t),localStorage.setItem("addr",t.address)}else null!==(t=e.error)&&void 0!==t&&t.msg?YQ(e.error.msg):YQ("Login fail")}catch(e){console.log(e)}},children:"Sign up / Login"})})]})}),(0,IJ.jsx)(wv,{width:800,title:"Switch Account",open:p,onCancel:()=>h(!1),footer:null,loading:r,children:v&&v.length>0?(0,IJ.jsxs)("div",{className:"block",children:[(0,IJ.jsx)(YP,{className:"demo-loadmore-list",itemLayout:"horizontal",dataSource:v,pagination:{position:"bottom",pageSize:5},renderItem:e=>{var t;return(0,IJ.jsxs)(YP.Item,{actions:[b.address==e.address?(0,IJ.jsx)(ey,{disabled:!0,icon:(0,IJ.jsx)(ya,{}),children:"Current"}):(0,IJ.jsx)(ey,{icon:(0,IJ.jsx)(wa,{}),disabled:b.address==e.address,onClick:()=>(e=>{R(e),window.location.reload()})(e),children:"Switch"})],children:[(0,IJ.jsx)(YP.Item.Meta,{avatar:(0,IJ.jsx)(CQ,{value:e.address,size:36,theme:"polkadot",style:{marginTop:0},onCopy:()=>KQ()(e.address)}),title:(null===(t=e.meta)||void 0===t?void 0:t.name)||q_(e.address),description:W_(e.address)}),(0,IJ.jsx)("div",{children:e.balance_str})]})}}),(0,IJ.jsxs)("div",{className:"block",children:[(0,IJ.jsx)(ey,{onClick:()=>{M_.remove("accounts"),M_.remove("account"),R(null),x(null),h(!1)},style:{width:"32%",marginTop:"20px"},size:"large",danger:!0,icon:(0,IJ.jsx)(Pa,{}),children:"Logout"}),(0,IJ.jsx)(ey,{onClick:()=>{n("/my"),h(!1)},style:{width:"32%",marginLeft:"10px",marginTop:"20px"},type:"default",size:"large",icon:(0,IJ.jsx)(Ta,{}),children:"Profile cllected"}),(0,IJ.jsx)(ey,{onClick:()=>h(!1),style:{width:"32%",marginLeft:"10px",marginTop:"20px",backgroundColor:"#a4cb29"},type:"primary",size:"large",icon:(0,IJ.jsx)(Ma,{}),children:"Close"})]})]}):(0,IJ.jsx)(pS,{})}),d?(0,IJ.jsx)(wv,{width:700,title:"My Space",open:!0,onCancel:()=>f(!1),footer:null,children:(0,IJ.jsx)(e0,{})}):""]})}))`
  display: block;
  overflow: hidden;
  position: relative;
  top: 0;
  .block {
    display: block;
    overflow: hidden;
    clear: both;
    width: 100%;
  }
  .abs-header .header-content .search-box .search-btn {
    padding-left: 10px;
  }
  .abs-header {
    overflow: hidden;
    width: 100%;
    padding: 0 3%;
    height: 56px;
    line-height: 56px;
    background-color: #000;
    position: fixed;
    color: #fff;
    clear: both;
    }