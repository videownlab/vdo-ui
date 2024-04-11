/*! For license information please see 396.44b7acf3.chunk.js.LICENSE.txt */
"use strict";(globalThis.webpackChunkui=globalThis.webpackChunkui||[]).push([[396],{4396:(t,e,n)=>{n.r(e),n.d(e,{encodeToCurve:()=>ne,hashToCurve:()=>ee,schnorr:()=>Xt,secp256k1:()=>kt});var r={};n.r(r),n.d(r,{bitGet:()=>N,bitLen:()=>U,bitMask:()=>H,bitSet:()=>L,bytesToHex:()=>m,bytesToNumberBE:()=>v,bytesToNumberLE:()=>x,concatBytes:()=>R,createHmacDrbg:()=>P,ensureBytes:()=>O,equalBytes:()=>q,hexToBytes:()=>B,hexToNumber:()=>E,numberToBytesBE:()=>I,numberToBytesLE:()=>A,numberToHexUnpadded:()=>b,numberToVarBytesBE:()=>S,utf8ToBytes:()=>T,validateObject:()=>Z});var i=n(4612),o=n(4084);class s extends o.kb{constructor(t,e,n,r){super(),this.blockLen=t,this.outputLen=e,this.padOffset=n,this.isLE=r,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=(0,o.GL)(this.buffer)}update(t){(0,i.Gg)(this);const{view:e,buffer:n,blockLen:r}=this,s=(t=(0,o.O0)(t)).length;for(let i=0;i<s;){const f=Math.min(r-this.pos,s-i);if(f!==r)n.set(t.subarray(i,i+f),this.pos),this.pos+=f,i+=f,this.pos===r&&(this.process(e,0),this.pos=0);else{const e=(0,o.GL)(t);for(;r<=s-i;i+=r)this.process(e,i)}}return this.length+=t.length,this.roundClean(),this}digestInto(t){(0,i.Gg)(this),(0,i.J8)(t,this),this.finished=!0;const{buffer:e,view:n,blockLen:r,isLE:s}=this;let{pos:f}=this;e[f++]=128,this.buffer.subarray(f).fill(0),this.padOffset>r-f&&(this.process(n,0),f=0);for(let i=f;i<r;i++)e[i]=0;!function(t,e,n,r){if("function"===typeof t.setBigUint64)return t.setBigUint64(e,n,r);const i=BigInt(32),o=BigInt(4294967295),s=Number(n>>i&o),f=Number(n&o),a=r?4:0,u=r?0:4;t.setUint32(e+a,s,r),t.setUint32(e+u,f,r)}(n,r-8,BigInt(8*this.length),s),this.process(n,0);const a=(0,o.GL)(t),u=this.outputLen;if(u%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const c=u/4,l=this.get();if(c>l.length)throw new Error("_sha2: outputLen bigger than state");for(let i=0;i<c;i++)a.setUint32(4*i,l[i],s)}digest(){const{buffer:t,outputLen:e}=this;this.digestInto(t);const n=t.slice(0,e);return this.destroy(),n}_cloneInto(t){t||(t=new this.constructor),t.set(...this.get());const{blockLen:e,buffer:n,length:r,finished:i,destroyed:o,pos:s}=this;return t.length=r,t.pos=s,t.finished=i,t.destroyed=o,r%e&&t.buffer.set(n),t}}const f=(t,e,n)=>t&e^t&n^e&n,a=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),u=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),c=new Uint32Array(64);class l extends s{constructor(){super(64,32,8,!1),this.A=0|u[0],this.B=0|u[1],this.C=0|u[2],this.D=0|u[3],this.E=0|u[4],this.F=0|u[5],this.G=0|u[6],this.H=0|u[7]}get(){const{A:t,B:e,C:n,D:r,E:i,F:o,G:s,H:f}=this;return[t,e,n,r,i,o,s,f]}set(t,e,n,r,i,o,s,f){this.A=0|t,this.B=0|e,this.C=0|n,this.D=0|r,this.E=0|i,this.F=0|o,this.G=0|s,this.H=0|f}process(t,e){for(let o=0;o<16;o++,e+=4)c[o]=t.getUint32(e,!1);for(let f=16;f<64;f++){const t=c[f-15],e=c[f-2],n=(0,o.np)(t,7)^(0,o.np)(t,18)^t>>>3,r=(0,o.np)(e,17)^(0,o.np)(e,19)^e>>>10;c[f]=r+c[f-7]+n+c[f-16]|0}let{A:n,B:r,C:i,D:s,E:u,F:l,G:d,H:h}=this;for(let p=0;p<64;p++){const t=h+((0,o.np)(u,6)^(0,o.np)(u,11)^(0,o.np)(u,25))+((g=u)&l^~g&d)+a[p]+c[p]|0,e=((0,o.np)(n,2)^(0,o.np)(n,13)^(0,o.np)(n,22))+f(n,r,i)|0;h=d,d=l,l=u,u=s+t|0,s=i,i=r,r=n,n=t+e|0}var g;n=n+this.A|0,r=r+this.B|0,i=i+this.C|0,s=s+this.D|0,u=u+this.E|0,l=l+this.F|0,d=d+this.G|0,h=h+this.H|0,this.set(n,r,i,s,u,l,d,h)}roundClean(){c.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}const d=(0,o.hE)((()=>new l)),h=BigInt(0),g=BigInt(1),p=BigInt(2),w=t=>t instanceof Uint8Array,y=Array.from({length:256},((t,e)=>e.toString(16).padStart(2,"0")));function m(t){if(!w(t))throw new Error("Uint8Array expected");let e="";for(let n=0;n<t.length;n++)e+=y[t[n]];return e}function b(t){const e=t.toString(16);return 1&e.length?`0${e}`:e}function E(t){if("string"!==typeof t)throw new Error("hex string expected, got "+typeof t);return BigInt(""===t?"0":`0x${t}`)}function B(t){if("string"!==typeof t)throw new Error("hex string expected, got "+typeof t);const e=t.length;if(e%2)throw new Error("padded hex string expected, got unpadded hex of length "+e);const n=new Uint8Array(e/2);for(let r=0;r<n.length;r++){const e=2*r,i=t.slice(e,e+2),o=Number.parseInt(i,16);if(Number.isNaN(o)||o<0)throw new Error("Invalid byte sequence");n[r]=o}return n}function v(t){return E(m(t))}function x(t){if(!w(t))throw new Error("Uint8Array expected");return E(m(Uint8Array.from(t).reverse()))}function I(t,e){return B(t.toString(16).padStart(2*e,"0"))}function A(t,e){return I(t,e).reverse()}function S(t){return B(b(t))}function O(t,e,n){let r;if("string"===typeof e)try{r=B(e)}catch(o){throw new Error(`${t} must be valid hex string, got "${e}". Cause: ${o}`)}else{if(!w(e))throw new Error(`${t} must be hex string or Uint8Array`);r=Uint8Array.from(e)}const i=r.length;if("number"===typeof n&&i!==n)throw new Error(`${t} expected ${n} bytes, got ${i}`);return r}function R(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];const r=new Uint8Array(e.reduce(((t,e)=>t+e.length),0));let i=0;return e.forEach((t=>{if(!w(t))throw new Error("Uint8Array expected");r.set(t,i),i+=t.length})),r}function q(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}function T(t){if("string"!==typeof t)throw new Error("utf8ToBytes expected string, got "+typeof t);return new Uint8Array((new TextEncoder).encode(t))}function U(t){let e;for(e=0;t>h;t>>=g,e+=1);return e}function N(t,e){return t>>BigInt(e)&g}const L=(t,e,n)=>t|(n?g:h)<<BigInt(e),H=t=>(p<<BigInt(t-1))-g,k=t=>new Uint8Array(t),C=t=>Uint8Array.from(t);function P(t,e,n){if("number"!==typeof t||t<2)throw new Error("hashLen must be a number");if("number"!==typeof e||e<2)throw new Error("qByteLen must be a number");if("function"!==typeof n)throw new Error("hmacFn must be a function");let r=k(t),i=k(t),o=0;const s=()=>{r.fill(1),i.fill(0),o=0},f=function(){for(var t=arguments.length,e=new Array(t),o=0;o<t;o++)e[o]=arguments[o];return n(i,r,...e)},a=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k();i=f(C([0]),t),r=f(),0!==t.length&&(i=f(C([1]),t),r=f())},u=()=>{if(o++>=1e3)throw new Error("drbg: tried 1000 values");let t=0;const n=[];for(;t<e;){r=f();const e=r.slice();n.push(e),t+=r.length}return R(...n)};return(t,e)=>{let n;for(s(),a(t);!(n=e(u()));)a();return s(),n}}const D={bigint:t=>"bigint"===typeof t,function:t=>"function"===typeof t,boolean:t=>"boolean"===typeof t,string:t=>"string"===typeof t,stringOrUint8Array:t=>"string"===typeof t||t instanceof Uint8Array,isSafeInteger:t=>Number.isSafeInteger(t),array:t=>Array.isArray(t),field:(t,e)=>e.Fp.isValid(t),hash:t=>"function"===typeof t&&Number.isSafeInteger(t.outputLen)};function Z(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const r=(e,n,r)=>{const i=D[n];if("function"!==typeof i)throw new Error(`Invalid validator "${n}", expected function`);const o=t[e];if((!r||void 0!==o)&&!i(o,t))throw new Error(`Invalid param ${String(e)}=${o} (${typeof o}), expected ${n}`)};for(const[i,o]of Object.entries(e))r(i,o,!1);for(const[i,o]of Object.entries(n))r(i,o,!0);return t}const $=BigInt(0),F=BigInt(1),V=BigInt(2),z=BigInt(3),_=BigInt(4),K=BigInt(5),G=BigInt(8);BigInt(9),BigInt(16);function j(t,e){const n=t%e;return n>=$?n:e+n}function M(t,e,n){if(n<=$||e<$)throw new Error("Expected power/modulo > 0");if(n===F)return $;let r=F;for(;e>$;)e&F&&(r=r*t%n),t=t*t%n,e>>=F;return r}function Y(t,e,n){let r=t;for(;e-- >$;)r*=r,r%=n;return r}function W(t,e){if(t===$||e<=$)throw new Error(`invert: expected positive integers, got n=${t} mod=${e}`);let n=j(t,e),r=e,i=$,o=F,s=F,f=$;for(;n!==$;){const t=r/n,e=r%n,a=i-s*t,u=o-f*t;r=n,n=e,i=s,o=f,s=a,f=u}if(r!==F)throw new Error("invert: does not exist");return j(i,e)}function X(t){if(t%_===z){const e=(t+F)/_;return function(t,n){const r=t.pow(n,e);if(!t.eql(t.sqr(r),n))throw new Error("Cannot find square root");return r}}if(t%G===K){const e=(t-K)/G;return function(t,n){const r=t.mul(n,V),i=t.pow(r,e),o=t.mul(n,i),s=t.mul(t.mul(o,V),i),f=t.mul(o,t.sub(s,t.ONE));if(!t.eql(t.sqr(f),n))throw new Error("Cannot find square root");return f}}return function(t){const e=(t-F)/V;let n,r,i;for(n=t-F,r=0;n%V===$;n/=V,r++);for(i=V;i<t&&M(i,e,t)!==t-F;i++);if(1===r){const e=(t+F)/_;return function(t,n){const r=t.pow(n,e);if(!t.eql(t.sqr(r),n))throw new Error("Cannot find square root");return r}}const o=(n+F)/V;return function(t,s){if(t.pow(s,e)===t.neg(t.ONE))throw new Error("Cannot find square root");let f=r,a=t.pow(t.mul(t.ONE,i),n),u=t.pow(s,o),c=t.pow(s,n);for(;!t.eql(c,t.ONE);){if(t.eql(c,t.ZERO))return t.ZERO;let e=1;for(let r=t.sqr(c);e<f&&!t.eql(r,t.ONE);e++)r=t.sqr(r);const n=t.pow(a,F<<BigInt(f-e-1));a=t.sqr(n),u=t.mul(u,n),c=t.mul(c,a),f=e}return u}}(t)}const J=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function Q(t){return Z(t,J.reduce(((t,e)=>(t[e]="function",t)),{ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"}))}function tt(t,e,n){if(n<$)throw new Error("Expected power > 0");if(n===$)return t.ONE;if(n===F)return e;let r=t.ONE,i=e;for(;n>$;)n&F&&(r=t.mul(r,i)),i=t.sqr(i),n>>=F;return r}function et(t,e){const n=new Array(e.length),r=e.reduce(((e,r,i)=>t.is0(r)?e:(n[i]=e,t.mul(e,r))),t.ONE),i=t.inv(r);return e.reduceRight(((e,r,i)=>t.is0(r)?e:(n[i]=t.mul(e,n[i]),t.mul(e,r))),i),n}function nt(t,e){const n=void 0!==e?e:t.toString(2).length;return{nBitLength:n,nByteLength:Math.ceil(n/8)}}function rt(t){if("bigint"!==typeof t)throw new Error("field order must be bigint");const e=t.toString(2).length;return Math.ceil(e/8)}function it(t){const e=rt(t);return e+Math.ceil(e/2)}const ot=BigInt(0),st=BigInt(1);function ft(t){return Q(t.Fp),Z(t,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...nt(t.n,t.nBitLength),...t,p:t.Fp.ORDER})}const{bytesToNumberBE:at,hexToBytes:ut}=r,ct={Err:class extends Error{constructor(){super(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")}},_parseInt(t){const{Err:e}=ct;if(t.length<2||2!==t[0])throw new e("Invalid signature integer tag");const n=t[1],r=t.subarray(2,n+2);if(!n||r.length!==n)throw new e("Invalid signature integer: wrong length");if(128&r[0])throw new e("Invalid signature integer: negative");if(0===r[0]&&!(128&r[1]))throw new e("Invalid signature integer: unnecessary leading zero");return{d:at(r),l:t.subarray(n+2)}},toSig(t){const{Err:e}=ct,n="string"===typeof t?ut(t):t;if(!(n instanceof Uint8Array))throw new Error("ui8a expected");let r=n.length;if(r<2||48!=n[0])throw new e("Invalid signature tag");if(n[1]!==r-2)throw new e("Invalid signature: incorrect length");const{d:i,l:o}=ct._parseInt(n.subarray(2)),{d:s,l:f}=ct._parseInt(o);if(f.length)throw new e("Invalid signature: left bytes after parsing");return{r:i,s:s}},hexFromSig(t){const e=t=>8&Number.parseInt(t[0],16)?"00"+t:t,n=t=>{const e=t.toString(16);return 1&e.length?`0${e}`:e},r=e(n(t.s)),i=e(n(t.r)),o=r.length/2,s=i.length/2,f=n(o),a=n(s);return`30${n(s+o+4)}02${a}${i}02${f}${r}`}},lt=BigInt(0),dt=BigInt(1),ht=BigInt(2),gt=BigInt(3),pt=BigInt(4);function wt(t){const e=function(t){const e=ft(t);Z(e,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});const{endo:n,Fp:r,a:i}=e;if(n){if(!r.eql(i,r.ZERO))throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");if("object"!==typeof n||"bigint"!==typeof n.beta||"function"!==typeof n.splitScalar)throw new Error("Expected endomorphism with beta: bigint and splitScalar: function")}return Object.freeze({...e})}(t),{Fp:n}=e,r=e.toBytes||((t,e,r)=>{const i=e.toAffine();return R(Uint8Array.from([4]),n.toBytes(i.x),n.toBytes(i.y))}),i=e.fromBytes||(t=>{const e=t.subarray(1);return{x:n.fromBytes(e.subarray(0,n.BYTES)),y:n.fromBytes(e.subarray(n.BYTES,2*n.BYTES))}});function o(t){const{a:r,b:i}=e,o=n.sqr(t),s=n.mul(o,t);return n.add(n.add(s,n.mul(t,r)),i)}if(!n.eql(n.sqr(e.Gy),o(e.Gx)))throw new Error("bad generator point: equation left != right");function s(t){return"bigint"===typeof t&&lt<t&&t<e.n}function f(t){if(!s(t))throw new Error("Expected valid bigint: 0 < bigint < curve.n")}function a(t){const{allowedPrivateKeyLengths:n,nByteLength:r,wrapPrivateKey:i,n:o}=e;if(n&&"bigint"!==typeof t){if(t instanceof Uint8Array&&(t=m(t)),"string"!==typeof t||!n.includes(t.length))throw new Error("Invalid key");t=t.padStart(2*r,"0")}let s;try{s="bigint"===typeof t?t:v(O("private key",t,r))}catch(a){throw new Error(`private key must be ${r} bytes, hex or bigint, not ${typeof t}`)}return i&&(s=j(s,o)),f(s),s}const u=new Map;function c(t){if(!(t instanceof l))throw new Error("ProjectivePoint expected")}class l{constructor(t,e,r){if(this.px=t,this.py=e,this.pz=r,null==t||!n.isValid(t))throw new Error("x required");if(null==e||!n.isValid(e))throw new Error("y required");if(null==r||!n.isValid(r))throw new Error("z required")}static fromAffine(t){const{x:e,y:r}=t||{};if(!t||!n.isValid(e)||!n.isValid(r))throw new Error("invalid affine point");if(t instanceof l)throw new Error("projective point not allowed");const i=t=>n.eql(t,n.ZERO);return i(e)&&i(r)?l.ZERO:new l(e,r,n.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(t){const e=n.invertBatch(t.map((t=>t.pz)));return t.map(((t,n)=>t.toAffine(e[n]))).map(l.fromAffine)}static fromHex(t){const e=l.fromAffine(i(O("pointHex",t)));return e.assertValidity(),e}static fromPrivateKey(t){return l.BASE.multiply(a(t))}_setWindowSize(t){this._WINDOW_SIZE=t,u.delete(this)}assertValidity(){if(this.is0()){if(e.allowInfinityPoint&&!n.is0(this.py))return;throw new Error("bad point: ZERO")}const{x:t,y:r}=this.toAffine();if(!n.isValid(t)||!n.isValid(r))throw new Error("bad point: x or y not FE");const i=n.sqr(r),s=o(t);if(!n.eql(i,s))throw new Error("bad point: equation left != right");if(!this.isTorsionFree())throw new Error("bad point: not in prime-order subgroup")}hasEvenY(){const{y:t}=this.toAffine();if(n.isOdd)return!n.isOdd(t);throw new Error("Field doesn't support isOdd")}equals(t){c(t);const{px:e,py:r,pz:i}=this,{px:o,py:s,pz:f}=t,a=n.eql(n.mul(e,f),n.mul(o,i)),u=n.eql(n.mul(r,f),n.mul(s,i));return a&&u}negate(){return new l(this.px,n.neg(this.py),this.pz)}double(){const{a:t,b:r}=e,i=n.mul(r,gt),{px:o,py:s,pz:f}=this;let a=n.ZERO,u=n.ZERO,c=n.ZERO,d=n.mul(o,o),h=n.mul(s,s),g=n.mul(f,f),p=n.mul(o,s);return p=n.add(p,p),c=n.mul(o,f),c=n.add(c,c),a=n.mul(t,c),u=n.mul(i,g),u=n.add(a,u),a=n.sub(h,u),u=n.add(h,u),u=n.mul(a,u),a=n.mul(p,a),c=n.mul(i,c),g=n.mul(t,g),p=n.sub(d,g),p=n.mul(t,p),p=n.add(p,c),c=n.add(d,d),d=n.add(c,d),d=n.add(d,g),d=n.mul(d,p),u=n.add(u,d),g=n.mul(s,f),g=n.add(g,g),d=n.mul(g,p),a=n.sub(a,d),c=n.mul(g,h),c=n.add(c,c),c=n.add(c,c),new l(a,u,c)}add(t){c(t);const{px:r,py:i,pz:o}=this,{px:s,py:f,pz:a}=t;let u=n.ZERO,d=n.ZERO,h=n.ZERO;const g=e.a,p=n.mul(e.b,gt);let w=n.mul(r,s),y=n.mul(i,f),m=n.mul(o,a),b=n.add(r,i),E=n.add(s,f);b=n.mul(b,E),E=n.add(w,y),b=n.sub(b,E),E=n.add(r,o);let B=n.add(s,a);return E=n.mul(E,B),B=n.add(w,m),E=n.sub(E,B),B=n.add(i,o),u=n.add(f,a),B=n.mul(B,u),u=n.add(y,m),B=n.sub(B,u),h=n.mul(g,E),u=n.mul(p,m),h=n.add(u,h),u=n.sub(y,h),h=n.add(y,h),d=n.mul(u,h),y=n.add(w,w),y=n.add(y,w),m=n.mul(g,m),E=n.mul(p,E),y=n.add(y,m),m=n.sub(w,m),m=n.mul(g,m),E=n.add(E,m),w=n.mul(y,E),d=n.add(d,w),w=n.mul(B,E),u=n.mul(b,u),u=n.sub(u,w),w=n.mul(b,y),h=n.mul(B,h),h=n.add(h,w),new l(u,d,h)}subtract(t){return this.add(t.negate())}is0(){return this.equals(l.ZERO)}wNAF(t){return h.wNAFCached(this,u,t,(t=>{const e=n.invertBatch(t.map((t=>t.pz)));return t.map(((t,n)=>t.toAffine(e[n]))).map(l.fromAffine)}))}multiplyUnsafe(t){const r=l.ZERO;if(t===lt)return r;if(f(t),t===dt)return this;const{endo:i}=e;if(!i)return h.unsafeLadder(this,t);let{k1neg:o,k1:s,k2neg:a,k2:u}=i.splitScalar(t),c=r,d=r,g=this;for(;s>lt||u>lt;)s&dt&&(c=c.add(g)),u&dt&&(d=d.add(g)),g=g.double(),s>>=dt,u>>=dt;return o&&(c=c.negate()),a&&(d=d.negate()),d=new l(n.mul(d.px,i.beta),d.py,d.pz),c.add(d)}multiply(t){f(t);let r,i,o=t;const{endo:s}=e;if(s){const{k1neg:t,k1:e,k2neg:f,k2:a}=s.splitScalar(o);let{p:u,f:c}=this.wNAF(e),{p:d,f:g}=this.wNAF(a);u=h.constTimeNegate(t,u),d=h.constTimeNegate(f,d),d=new l(n.mul(d.px,s.beta),d.py,d.pz),r=u.add(d),i=c.add(g)}else{const{p:t,f:e}=this.wNAF(o);r=t,i=e}return l.normalizeZ([r,i])[0]}multiplyAndAddUnsafe(t,e,n){const r=l.BASE,i=(t,e)=>e!==lt&&e!==dt&&t.equals(r)?t.multiply(e):t.multiplyUnsafe(e),o=i(this,e).add(i(t,n));return o.is0()?void 0:o}toAffine(t){const{px:e,py:r,pz:i}=this,o=this.is0();null==t&&(t=o?n.ONE:n.inv(i));const s=n.mul(e,t),f=n.mul(r,t),a=n.mul(i,t);if(o)return{x:n.ZERO,y:n.ZERO};if(!n.eql(a,n.ONE))throw new Error("invZ was invalid");return{x:s,y:f}}isTorsionFree(){const{h:t,isTorsionFree:n}=e;if(t===dt)return!0;if(n)return n(l,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:t,clearCofactor:n}=e;return t===dt?this:n?n(l,this):this.multiplyUnsafe(e.h)}toRawBytes(){let t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this.assertValidity(),r(l,this,t)}toHex(){let t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return m(this.toRawBytes(t))}}l.BASE=new l(e.Gx,e.Gy,n.ONE),l.ZERO=new l(n.ZERO,n.ONE,n.ZERO);const d=e.nBitLength,h=function(t,e){const n=(t,e)=>{const n=e.negate();return t?n:e},r=t=>({windows:Math.ceil(e/t)+1,windowSize:2**(t-1)});return{constTimeNegate:n,unsafeLadder(e,n){let r=t.ZERO,i=e;for(;n>ot;)n&st&&(r=r.add(i)),i=i.double(),n>>=st;return r},precomputeWindow(t,e){const{windows:n,windowSize:i}=r(e),o=[];let s=t,f=s;for(let r=0;r<n;r++){f=s,o.push(f);for(let t=1;t<i;t++)f=f.add(s),o.push(f);s=f.double()}return o},wNAF(e,i,o){const{windows:s,windowSize:f}=r(e);let a=t.ZERO,u=t.BASE;const c=BigInt(2**e-1),l=2**e,d=BigInt(e);for(let t=0;t<s;t++){const e=t*f;let r=Number(o&c);o>>=d,r>f&&(r-=l,o+=st);const s=e,h=e+Math.abs(r)-1,g=t%2!==0,p=r<0;0===r?u=u.add(n(g,i[s])):a=a.add(n(p,i[h]))}return{p:a,f:u}},wNAFCached(t,e,n,r){const i=t._WINDOW_SIZE||1;let o=e.get(t);return o||(o=this.precomputeWindow(t,i),1!==i&&e.set(t,r(o))),this.wNAF(i,o,n)}}}(l,e.endo?Math.ceil(d/2):d);return{CURVE:e,ProjectivePoint:l,normPrivateKeyToScalar:a,weierstrassEquation:o,isWithinCurveOrder:s}}function yt(t){const e=function(t){const e=ft(t);return Z(e,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...e})}(t),{Fp:n,n:r}=e,i=n.BYTES+1,o=2*n.BYTES+1;function s(t){return j(t,r)}function f(t){return W(t,r)}const{ProjectivePoint:a,normPrivateKeyToScalar:u,weierstrassEquation:c,isWithinCurveOrder:l}=wt({...e,toBytes(t,e,r){const i=e.toAffine(),o=n.toBytes(i.x),s=R;return r?s(Uint8Array.from([e.hasEvenY()?2:3]),o):s(Uint8Array.from([4]),o,n.toBytes(i.y))},fromBytes(t){const e=t.length,r=t[0],s=t.subarray(1);if(e!==i||2!==r&&3!==r){if(e===o&&4===r){return{x:n.fromBytes(s.subarray(0,n.BYTES)),y:n.fromBytes(s.subarray(n.BYTES,2*n.BYTES))}}throw new Error(`Point of length ${e} was invalid. Expected ${i} compressed bytes or ${o} uncompressed bytes`)}{const t=v(s);if(!(lt<(f=t)&&f<n.ORDER))throw new Error("Point is not on curve");const e=c(t);let i=n.sqrt(e);return 1===(1&r)!==((i&dt)===dt)&&(i=n.neg(i)),{x:t,y:i}}var f}}),d=t=>m(I(t,e.nByteLength));function h(t){return t>r>>dt}function g(t){return h(t)?s(-t):t}const p=(t,e,n)=>v(t.slice(e,n));class w{constructor(t,e,n){this.r=t,this.s=e,this.recovery=n,this.assertValidity()}static fromCompact(t){const n=e.nByteLength;return t=O("compactSignature",t,2*n),new w(p(t,0,n),p(t,n,2*n))}static fromDER(t){const{r:e,s:n}=ct.toSig(O("DER",t));return new w(e,n)}assertValidity(){if(!l(this.r))throw new Error("r must be 0 < r < CURVE.n");if(!l(this.s))throw new Error("s must be 0 < s < CURVE.n")}addRecoveryBit(t){return new w(this.r,this.s,t)}recoverPublicKey(t){const{r:r,s:i,recovery:o}=this,u=S(O("msgHash",t));if(null==o||![0,1,2,3].includes(o))throw new Error("recovery id invalid");const c=2===o||3===o?r+e.n:r;if(c>=n.ORDER)throw new Error("recovery id 2 or 3 invalid");const l=0===(1&o)?"02":"03",h=a.fromHex(l+d(c)),g=f(c),p=s(-u*g),w=s(i*g),y=a.BASE.multiplyAndAddUnsafe(h,p,w);if(!y)throw new Error("point at infinify");return y.assertValidity(),y}hasHighS(){return h(this.s)}normalizeS(){return this.hasHighS()?new w(this.r,s(-this.s),this.recovery):this}toDERRawBytes(){return B(this.toDERHex())}toDERHex(){return ct.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return B(this.toCompactHex())}toCompactHex(){return d(this.r)+d(this.s)}}const y={isValidPrivateKey(t){try{return u(t),!0}catch(e){return!1}},normPrivateKeyToScalar:u,randomPrivateKey:()=>{const t=it(e.n);return function(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const r=t.length,i=rt(e),o=it(e);if(r<16||r<o||r>1024)throw new Error(`expected ${o}-1024 bytes of input, got ${r}`);const s=j(n?v(t):x(t),e-F)+F;return n?A(s,i):I(s,i)}(e.randomBytes(t),e.n)},precompute(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:8,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.BASE;return e._setWindowSize(t),e.multiply(BigInt(3)),e}};function b(t){const e=t instanceof Uint8Array,n="string"===typeof t,r=(e||n)&&t.length;return e?r===i||r===o:n?r===2*i||r===2*o:t instanceof a}const E=e.bits2int||function(t){const n=v(t),r=8*t.length-e.nBitLength;return r>0?n>>BigInt(r):n},S=e.bits2int_modN||function(t){return s(E(t))},q=H(e.nBitLength);function T(t){if("bigint"!==typeof t)throw new Error("bigint expected");if(!(lt<=t&&t<q))throw new Error(`bigint expected < 2^${e.nBitLength}`);return I(t,e.nByteLength)}function U(t,r){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:N;if(["recovered","canonical"].some((t=>t in i)))throw new Error("sign() legacy options not supported");const{hash:o,randomBytes:c}=e;let{lowS:d,prehash:p,extraEntropy:y}=i;null==d&&(d=!0),t=O("msgHash",t),p&&(t=O("prehashed msgHash",o(t)));const m=S(t),b=u(r),B=[T(b),T(m)];if(null!=y){const t=!0===y?c(n.BYTES):y;B.push(O("extraEntropy",t))}const v=R(...B),x=m;function I(t){const e=E(t);if(!l(e))return;const n=f(e),r=a.BASE.multiply(e).toAffine(),i=s(r.x);if(i===lt)return;const o=s(n*s(x+i*b));if(o===lt)return;let u=(r.x===i?0:2)|Number(r.y&dt),c=o;return d&&h(o)&&(c=g(o),u^=1),new w(i,c,u)}return{seed:v,k2sig:I}}const N={lowS:e.lowS,prehash:!1},L={lowS:e.lowS,prehash:!1};return a.BASE._setWindowSize(8),{CURVE:e,getPublicKey:function(t){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return a.fromPrivateKey(t).toRawBytes(e)},getSharedSecret:function(t,e){let n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(b(t))throw new Error("first arg must be private key");if(!b(e))throw new Error("second arg must be public key");const r=a.fromHex(e);return r.multiply(u(t)).toRawBytes(n)},sign:function(t,n){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:N;const{seed:i,k2sig:o}=U(t,n,r),s=e,f=P(s.hash.outputLen,s.nByteLength,s.hmac);return f(i,o)},verify:function(t,n,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:L;const o=t;if(n=O("msgHash",n),r=O("publicKey",r),"strict"in i)throw new Error("options.strict was renamed to lowS");const{lowS:u,prehash:c}=i;let l,d;try{if("string"===typeof o||o instanceof Uint8Array)try{l=w.fromDER(o)}catch(v){if(!(v instanceof ct.Err))throw v;l=w.fromCompact(o)}else{if("object"!==typeof o||"bigint"!==typeof o.r||"bigint"!==typeof o.s)throw new Error("PARSE");{const{r:t,s:e}=o;l=new w(t,e)}}d=a.fromHex(r)}catch(x){if("PARSE"===x.message)throw new Error("signature must be Signature instance, Uint8Array or hex string");return!1}if(u&&l.hasHighS())return!1;c&&(n=e.hash(n));const{r:h,s:g}=l,p=S(n),y=f(g),m=s(p*y),b=s(h*y),E=a.BASE.multiplyAndAddUnsafe(d,m,b)?.toAffine();if(!E)return!1;const B=s(E.x);return B===h},ProjectivePoint:a,Signature:w,utils:y}}function mt(t,e){if(Q(t),!t.isValid(e.A)||!t.isValid(e.B)||!t.isValid(e.Z))throw new Error("mapToCurveSimpleSWU: invalid opts");const n=function(t,e){const n=t.ORDER;let r=lt;for(let g=n-dt;g%ht===lt;g/=ht)r+=dt;const i=r,o=ht<<i-dt-dt,s=o*ht,f=(n-dt)/s,a=(f-dt)/ht,u=s-dt,c=o,l=t.pow(e,f),d=t.pow(e,(f+dt)/ht);let h=(e,n)=>{let r=l,o=t.pow(n,u),s=t.sqr(o);s=t.mul(s,n);let f=t.mul(e,s);f=t.pow(f,a),f=t.mul(f,o),o=t.mul(f,n),s=t.mul(f,e);let h=t.mul(s,o);f=t.pow(h,c);let g=t.eql(f,t.ONE);o=t.mul(s,d),f=t.mul(h,r),s=t.cmov(o,s,g),h=t.cmov(f,h,g);for(let a=i;a>dt;a--){let e=a-ht;e=ht<<e-dt;let n=t.pow(h,e);const i=t.eql(n,t.ONE);o=t.mul(s,r),r=t.mul(r,r),n=t.mul(h,r),s=t.cmov(o,s,i),h=t.cmov(n,h,i)}return{isValid:g,value:s}};if(t.ORDER%pt===gt){const n=(t.ORDER-gt)/pt,r=t.sqrt(t.neg(e));h=(e,i)=>{let o=t.sqr(i);const s=t.mul(e,i);o=t.mul(o,s);let f=t.pow(o,n);f=t.mul(f,s);const a=t.mul(f,r),u=t.mul(t.sqr(f),i),c=t.eql(u,e);return{isValid:c,value:t.cmov(a,f,c)}}}return h}(t,e.Z);if(!t.isOdd)throw new Error("Fp.isOdd is not implemented!");return r=>{let i,o,s,f,a,u,c,l;i=t.sqr(r),i=t.mul(i,e.Z),o=t.sqr(i),o=t.add(o,i),s=t.add(o,t.ONE),s=t.mul(s,e.B),f=t.cmov(e.Z,t.neg(o),!t.eql(o,t.ZERO)),f=t.mul(f,e.A),o=t.sqr(s),u=t.sqr(f),a=t.mul(u,e.A),o=t.add(o,a),o=t.mul(o,s),u=t.mul(u,f),a=t.mul(u,e.B),o=t.add(o,a),c=t.mul(i,s);const{isValid:d,value:h}=n(o,u);l=t.mul(i,r),l=t.mul(l,h),c=t.cmov(c,s,d),l=t.cmov(l,h,d);const g=t.isOdd(r)===t.isOdd(l);return l=t.cmov(t.neg(l),l,g),c=t.div(c,f),{x:c,y:l}}}const bt=v;function Et(t,e){if(t<0||t>=1<<8*e)throw new Error(`bad I2OSP call: value=${t} length=${e}`);const n=Array.from({length:e}).fill(0);for(let r=e-1;r>=0;r--)n[r]=255&t,t>>>=8;return new Uint8Array(n)}function Bt(t,e){const n=new Uint8Array(t.length);for(let r=0;r<t.length;r++)n[r]=t[r]^e[r];return n}function vt(t){if(!(t instanceof Uint8Array))throw new Error("Uint8Array expected")}function xt(t){if(!Number.isSafeInteger(t))throw new Error("number expected")}function It(t,e,n){Z(n,{DST:"stringOrUint8Array",p:"bigint",m:"isSafeInteger",k:"isSafeInteger",hash:"hash"});const{p:r,k:i,m:o,hash:s,expand:f,DST:a}=n;vt(t),xt(e);const u=function(t){if(t instanceof Uint8Array)return t;if("string"===typeof t)return T(t);throw new Error("DST must be Uint8Array or string")}(a),c=r.toString(2).length,l=Math.ceil((c+i)/8),d=e*o*l;let h;if("xmd"===f)h=function(t,e,n,r){vt(t),vt(e),xt(n),e.length>255&&(e=r(R(T("H2C-OVERSIZE-DST-"),e)));const{outputLen:i,blockLen:o}=r,s=Math.ceil(n/i);if(s>255)throw new Error("Invalid xmd length");const f=R(e,Et(e.length,1)),a=Et(0,o),u=Et(n,2),c=new Array(s),l=r(R(a,t,u,Et(0,1),f));c[0]=r(R(l,Et(1,1),f));for(let d=1;d<=s;d++){const t=[Bt(l,c[d-1]),Et(d+1,1),f];c[d]=r(R(...t))}return R(...c).slice(0,n)}(t,u,d,s);else if("xof"===f)h=function(t,e,n,r,i){if(vt(t),vt(e),xt(n),e.length>255){const t=Math.ceil(2*r/8);e=i.create({dkLen:t}).update(T("H2C-OVERSIZE-DST-")).update(e).digest()}if(n>65535||e.length>255)throw new Error("expand_message_xof: invalid lenInBytes");return i.create({dkLen:n}).update(t).update(Et(n,2)).update(e).update(Et(e.length,1)).digest()}(t,u,d,i,s);else{if("_internal_pass"!==f)throw new Error('expand must be "xmd" or "xof"');h=t}const g=new Array(e);for(let p=0;p<e;p++){const t=new Array(o);for(let e=0;e<o;e++){const n=l*(e+p*o),i=h.subarray(n,n+l);t[e]=j(bt(i),r)}g[p]=t}return g}class At extends o.kb{constructor(t,e){super(),this.finished=!1,this.destroyed=!1,(0,i.vp)(t);const n=(0,o.O0)(e);if(this.iHash=t.create(),"function"!==typeof this.iHash.update)throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const r=this.blockLen,s=new Uint8Array(r);s.set(n.length>r?t.create().update(n).digest():n);for(let i=0;i<s.length;i++)s[i]^=54;this.iHash.update(s),this.oHash=t.create();for(let i=0;i<s.length;i++)s[i]^=106;this.oHash.update(s),s.fill(0)}update(t){return(0,i.Gg)(this),this.iHash.update(t),this}digestInto(t){(0,i.Gg)(this),(0,i.aI)(t,this.outputLen),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){const t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||(t=Object.create(Object.getPrototypeOf(this),{}));const{oHash:e,iHash:n,finished:r,destroyed:i,blockLen:o,outputLen:s}=this;return t.finished=r,t.destroyed=i,t.blockLen=o,t.outputLen=s,t.oHash=e._cloneInto(t.oHash),t.iHash=n._cloneInto(t.iHash),t}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const St=(t,e,n)=>new At(t,e).update(n).digest();function Ot(t){return{hash:t,hmac:function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return St(t,e,(0,o.eV)(...r))},randomBytes:o.O6}}St.create=(t,e)=>new At(t,e);const Rt=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),qt=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),Tt=BigInt(1),Ut=BigInt(2),Nt=(t,e)=>(t+e/Ut)/e;function Lt(t){const e=Rt,n=BigInt(3),r=BigInt(6),i=BigInt(11),o=BigInt(22),s=BigInt(23),f=BigInt(44),a=BigInt(88),u=t*t*t%e,c=u*u*t%e,l=Y(c,n,e)*c%e,d=Y(l,n,e)*c%e,h=Y(d,Ut,e)*u%e,g=Y(h,i,e)*h%e,p=Y(g,o,e)*g%e,w=Y(p,f,e)*p%e,y=Y(w,a,e)*w%e,m=Y(y,f,e)*p%e,b=Y(m,n,e)*c%e,E=Y(b,s,e)*g%e,B=Y(E,r,e)*u%e,v=Y(B,Ut,e);if(!Ht.eql(Ht.sqr(v),t))throw new Error("Cannot find square root");return v}const Ht=function(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(t<=$)throw new Error(`Expected Field ORDER > 0, got ${t}`);const{nBitLength:i,nByteLength:o}=nt(t,e);if(o>2048)throw new Error("Field lengths over 2048 bytes are not supported");const s=X(t),f=Object.freeze({ORDER:t,BITS:i,BYTES:o,MASK:H(i),ZERO:$,ONE:F,create:e=>j(e,t),isValid:e=>{if("bigint"!==typeof e)throw new Error("Invalid field element: expected bigint, got "+typeof e);return $<=e&&e<t},is0:t=>t===$,isOdd:t=>(t&F)===F,neg:e=>j(-e,t),eql:(t,e)=>t===e,sqr:e=>j(e*e,t),add:(e,n)=>j(e+n,t),sub:(e,n)=>j(e-n,t),mul:(e,n)=>j(e*n,t),pow:(t,e)=>tt(f,t,e),div:(e,n)=>j(e*W(n,t),t),sqrN:t=>t*t,addN:(t,e)=>t+e,subN:(t,e)=>t-e,mulN:(t,e)=>t*e,inv:e=>W(e,t),sqrt:r.sqrt||(t=>s(f,t)),invertBatch:t=>et(f,t),cmov:(t,e,n)=>n?e:t,toBytes:t=>n?A(t,o):I(t,o),fromBytes:t=>{if(t.length!==o)throw new Error(`Fp.fromBytes: expected ${o}, got ${t.length}`);return n?x(t):v(t)}});return Object.freeze(f)}(Rt,void 0,void 0,{sqrt:Lt}),kt=function(t,e){const n=e=>yt({...t,...Ot(e)});return Object.freeze({...n(e),create:n})}({a:BigInt(0),b:BigInt(7),Fp:Ht,n:qt,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:t=>{const e=qt,n=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),r=-Tt*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),i=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),o=n,s=BigInt("0x100000000000000000000000000000000"),f=Nt(o*t,e),a=Nt(-r*t,e);let u=j(t-f*n-a*i,e),c=j(-f*r-a*o,e);const l=u>s,d=c>s;if(l&&(u=e-u),d&&(c=e-c),u>s||c>s)throw new Error("splitScalar: Endomorphism failed, k="+t);return{k1neg:l,k1:u,k2neg:d,k2:c}}}},d),Ct=BigInt(0),Pt=t=>"bigint"===typeof t&&Ct<t&&t<Rt,Dt={};function Zt(t){let e=Dt[t];if(void 0===e){const n=d(Uint8Array.from(t,(t=>t.charCodeAt(0))));e=R(n,n),Dt[t]=e}for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return d(R(e,...r))}const $t=t=>t.toRawBytes(!0).slice(1),Ft=t=>I(t,32),Vt=t=>j(t,Rt),zt=t=>j(t,qt),_t=kt.ProjectivePoint;function Kt(t){let e=kt.utils.normPrivateKeyToScalar(t),n=_t.fromPrivateKey(e);return{scalar:n.hasEvenY()?e:zt(-e),bytes:$t(n)}}function Gt(t){if(!Pt(t))throw new Error("bad x: need 0 < x < p");const e=Vt(t*t);let n=Lt(Vt(e*t+BigInt(7)));n%Ut!==Ct&&(n=Vt(-n));const r=new _t(t,n,Tt);return r.assertValidity(),r}function jt(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return zt(v(Zt("BIP0340/challenge",...e)))}function Mt(t){return Kt(t).bytes}function Yt(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:(0,o.O6)(32);const r=O("message",t),{bytes:i,scalar:s}=Kt(e),f=O("auxRand",n,32),a=Ft(s^v(Zt("BIP0340/aux",f))),u=Zt("BIP0340/nonce",a,i,r),c=zt(v(u));if(c===Ct)throw new Error("sign failed: k is zero");const{bytes:l,scalar:d}=Kt(c),h=jt(l,i,r),g=new Uint8Array(64);if(g.set(l,0),g.set(Ft(zt(d+h*s)),32),!Wt(g,r,i))throw new Error("sign: Invalid signature produced");return g}function Wt(t,e,n){const r=O("signature",t,64),i=O("message",e),o=O("publicKey",n,32);try{const t=Gt(v(o)),e=v(r.subarray(0,32));if(!Pt(e))return!1;const n=v(r.subarray(32,64));if(!("bigint"===typeof(u=n)&&Ct<u&&u<qt))return!1;const c=jt(Ft(e),$t(t),i),l=(s=t,f=n,a=zt(-c),_t.BASE.multiplyAndAddUnsafe(s,f,a));return!(!l||!l.hasEvenY()||l.toAffine().x!==e)}catch(c){return!1}var s,f,a,u}const Xt=(()=>({getPublicKey:Mt,sign:Yt,verify:Wt,utils:{randomPrivateKey:kt.utils.randomPrivateKey,lift_x:Gt,pointToBytes:$t,numberToBytesBE:I,bytesToNumberBE:v,taggedHash:Zt,mod:j}}))(),Jt=(()=>function(t,e){const n=e.map((t=>Array.from(t).reverse()));return(e,r)=>{const[i,o,s,f]=n.map((n=>n.reduce(((n,r)=>t.add(t.mul(n,e),r)))));return e=t.div(i,o),r=t.mul(r,t.div(s,f)),{x:e,y:r}}}(Ht,[["0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7","0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581","0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262","0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"],["0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b","0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14","0x0000000000000000000000000000000000000000000000000000000000000001"],["0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c","0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3","0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931","0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"],["0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b","0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573","0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f","0x0000000000000000000000000000000000000000000000000000000000000001"]].map((t=>t.map((t=>BigInt(t)))))))(),Qt=(()=>mt(Ht,{A:BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),B:BigInt("1771"),Z:Ht.create(BigInt("-11"))}))(),te=(()=>function(t,e,n){if("function"!==typeof e)throw new Error("mapToCurve() must be defined");return{hashToCurve(r,i){const o=It(r,2,{...n,DST:n.DST,...i}),s=t.fromAffine(e(o[0])),f=t.fromAffine(e(o[1])),a=s.add(f).clearCofactor();return a.assertValidity(),a},encodeToCurve(r,i){const o=It(r,1,{...n,DST:n.encodeDST,...i}),s=t.fromAffine(e(o[0])).clearCofactor();return s.assertValidity(),s}}}(kt.ProjectivePoint,(t=>{const{x:e,y:n}=Qt(Ht.create(t[0]));return Jt(e,n)}),{DST:"secp256k1_XMD:SHA-256_SSWU_RO_",encodeDST:"secp256k1_XMD:SHA-256_SSWU_NU_",p:Ht.ORDER,m:1,k:128,expand:"xmd",hash:d}))(),ee=(()=>te.hashToCurve)(),ne=(()=>te.encodeToCurve)()}}]);
//# sourceMappingURL=396.44b7acf3.chunk.js.map