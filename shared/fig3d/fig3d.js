/* Grow With Grounded 3D figure (BLD 897). three.js (MIT); figure from MakeHuman (CC0). */
(()=>{var ao="160";var Fc=0,Co=1,Bc=2;var nc=1,zc=2,Wn=3,ai=0,Ke=1,En=2;var si=0,ji=1,ys=2,Po=3,Lo=4,kc=5,yi=100,Vc=101,Hc=102,Io=103,Uo=104,Gc=200,Wc=201,Xc=202,qc=203,wa=204,Aa=205,Yc=206,Zc=207,Jc=208,$c=209,Kc=210,jc=211,Qc=212,th=213,eh=214,nh=0,ih=1,sh=2,lr=3,rh=4,ah=5,oh=6,lh=7,ic=0,ch=1,hh=2,ri=0,uh=1,dh=2,fh=3,ph=4,mh=5,gh=6,Do="attached",_h="detached",sc=300,es=301,ns=302,Ea=303,Ta=304,Nr=306,Ra=1e3,Tn=1001,Ca=1002,$e=1003,No=1004;var Xr=1005;var on=1006,xh=1007;var Ms=1008;var Dn=1009,vh=1010,yh=1011,oo=1012,rc=1013,ii=1014,Yn=1015,bs=1016,ac=1017,oc=1018,bi=1020,Mh=1021,_n=1023,bh=1024,Sh=1025,Si=1026,is=1027,wh=1028,lc=1029,Ah=1030,cc=1031,hc=1033,qr=33776,Yr=33777,Zr=33778,Jr=33779,Oo=35840,Fo=35841,Bo=35842,zo=35843,uc=36196,ko=37492,Vo=37496,Ho=37808,Go=37809,Wo=37810,Xo=37811,qo=37812,Yo=37813,Zo=37814,Jo=37815,$o=37816,Ko=37817,jo=37818,Qo=37819,tl=37820,el=37821,$r=36492,nl=36494,il=36495,Eh=36283,sl=36284,rl=36285,al=36286;var cr=2300,hr=2301,Kr=2302,ol=2400,ll=2401,cl=2402;var dc=3e3,wi=3001,Th=3200,Rh=3201,Ch=0,Ph=1,xn="",ze="srgb",$n="srgb-linear",lo="display-p3",Or="display-p3-linear",ur="linear",we="srgb",dr="rec709",fr="p3";var Ui=7680;var hl=519,Lh=512,Ih=513,Uh=514,fc=515,Dh=516,Nh=517,Oh=518,Fh=519,Pa=35044;var ul="300 es",La=1035,Zn=2e3,pr=2001,oi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,l=s.length;r<l;r++)s[r].call(this,t);t.target=null}}},en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var jr=Math.PI/180,Ia=180/Math.PI;function Jn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[t&255]+en[t>>8&255]+"-"+en[t>>16&15|64]+en[t>>24&255]+"-"+en[e&63|128]+en[e>>8&255]+"-"+en[e>>16&255]+en[e>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function cn(i,t,e){return Math.max(t,Math.min(e,i))}function Bh(i,t){return(i%t+t)%t}function Qr(i,t,e){return(1-e)*i+e*t}function dl(i){return(i&i-1)===0&&i!==0}function Ua(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function qn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Me(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var ge=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(cn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,l=this.y-t.y;return this.x=r*n-l*s+t.x,this.y=r*s+l*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ae=class i{constructor(t,e,n,s,r,l,a,o,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,l,a,o,c)}set(t,e,n,s,r,l,a,o,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=o,h[6]=n,h[7]=l,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,l=n[0],a=n[3],o=n[6],c=n[1],h=n[4],f=n[7],m=n[2],d=n[5],g=n[8],_=s[0],p=s[3],u=s[6],v=s[1],x=s[4],A=s[7],P=s[2],T=s[5],L=s[8];return r[0]=l*_+a*v+o*P,r[3]=l*p+a*x+o*T,r[6]=l*u+a*A+o*L,r[1]=c*_+h*v+f*P,r[4]=c*p+h*x+f*T,r[7]=c*u+h*A+f*L,r[2]=m*_+d*v+g*P,r[5]=m*p+d*x+g*T,r[8]=m*u+d*A+g*L,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],l=t[4],a=t[5],o=t[6],c=t[7],h=t[8];return e*l*h-e*a*c-n*r*h+n*a*o+s*r*c-s*l*o}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],l=t[4],a=t[5],o=t[6],c=t[7],h=t[8],f=h*l-a*c,m=a*o-h*r,d=c*r-l*o,g=e*f+n*m+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=f*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*l)*_,t[3]=m*_,t[4]=(h*e-s*o)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*o-c*e)*_,t[8]=(l*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,l,a){let o=Math.cos(r),c=Math.sin(r);return this.set(n*o,n*c,-n*(o*l+c*a)+l+t,-s*c,s*o,-s*(-c*l+o*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ta.makeScale(t,e)),this}rotate(t){return this.premultiply(ta.makeRotation(-t)),this}translate(t,e){return this.premultiply(ta.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ta=new ae;function pc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function mr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zh(){let i=mr("canvas");return i.style.display="block",i}var fl={};function xs(i){i in fl||(fl[i]=!0,console.warn(i))}var pl=new ae().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ml=new ae().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Bs={[$n]:{transfer:ur,primaries:dr,toReference:i=>i,fromReference:i=>i},[ze]:{transfer:we,primaries:dr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Or]:{transfer:ur,primaries:fr,toReference:i=>i.applyMatrix3(ml),fromReference:i=>i.applyMatrix3(pl)},[lo]:{transfer:we,primaries:fr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ml),fromReference:i=>i.applyMatrix3(pl).convertLinearToSRGB()}},kh=new Set([$n,Or]),ve={enabled:!0,_workingColorSpace:$n,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!kh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=Bs[t].toReference,s=Bs[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Bs[i].primaries},getTransfer:function(i){return i===xn?ur:Bs[i].transfer}};function Qi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ea(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Di,gr=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Di===void 0&&(Di=mr("canvas")),Di.width=t.width,Di.height=t.height;let n=Di.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Di}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=mr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let l=0;l<r.length;l++)r[l]=Qi(r[l]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Qi(e[n]/255)*255):e[n]=Qi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Vh=0,_r=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vh++}),this.uuid=Jn(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let l=0,a=s.length;l<a;l++)s[l].isDataTexture?r.push(na(s[l].image)):r.push(na(s[l]))}else r=na(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function na(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?gr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Hh=0,pn=class i extends oi{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Tn,s=Tn,r=on,l=Ms,a=_n,o=Dn,c=i.DEFAULT_ANISOTROPY,h=xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=Jn(),this.name="",this.source=new _r(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=l,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=o,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ae,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(xs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===wi?ze:xn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ra:t.x=t.x-Math.floor(t.x);break;case Tn:t.x=t.x<0?0:1;break;case Ca:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ra:t.y=t.y-Math.floor(t.y);break;case Tn:t.y=t.y<0?0:1;break;case Ca:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return xs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ze?wi:dc}set encoding(t){xs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===wi?ze:xn}};pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=sc;pn.DEFAULT_ANISOTROPY=1;var ke=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,l=t.elements;return this.x=l[0]*e+l[4]*n+l[8]*s+l[12]*r,this.y=l[1]*e+l[5]*n+l[9]*s+l[13]*r,this.z=l[2]*e+l[6]*n+l[10]*s+l[14]*r,this.w=l[3]*e+l[7]*n+l[11]*s+l[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,o=t.elements,c=o[0],h=o[4],f=o[8],m=o[1],d=o[5],g=o[9],_=o[2],p=o[6],u=o[10];if(Math.abs(h-m)<.01&&Math.abs(f-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+m)<.1&&Math.abs(f+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,A=(d+1)/2,P=(u+1)/2,T=(h+m)/4,L=(f+_)/4,J=(g+p)/4;return x>A&&x>P?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=T/n,r=L/n):A>P?A<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),n=T/s,r=J/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=L/r,s=J/r),this.set(n,s,r,e),this}let v=Math.sqrt((p-g)*(p-g)+(f-_)*(f-_)+(m-h)*(m-h));return Math.abs(v)<.001&&(v=1),this.x=(p-g)/v,this.y=(f-_)/v,this.z=(m-h)/v,this.w=Math.acos((c+d+u-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Da=class extends oi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ke(0,0,t,e),this.scissorTest=!1,this.viewport=new ke(0,0,t,e);let s={width:t,height:e,depth:1};n.encoding!==void 0&&(xs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===wi?ze:xn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new pn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new _r(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},vn=class extends Da{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},xr=class extends pn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Na=class extends pn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ne=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,l,a){let o=n[s+0],c=n[s+1],h=n[s+2],f=n[s+3],m=r[l+0],d=r[l+1],g=r[l+2],_=r[l+3];if(a===0){t[e+0]=o,t[e+1]=c,t[e+2]=h,t[e+3]=f;return}if(a===1){t[e+0]=m,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(f!==_||o!==m||c!==d||h!==g){let p=1-a,u=o*m+c*d+h*g+f*_,v=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){let P=Math.sqrt(x),T=Math.atan2(P,u*v);p=Math.sin(p*T)/P,a=Math.sin(a*T)/P}let A=a*v;if(o=o*p+m*A,c=c*p+d*A,h=h*p+g*A,f=f*p+_*A,p===1-a){let P=1/Math.sqrt(o*o+c*c+h*h+f*f);o*=P,c*=P,h*=P,f*=P}}t[e]=o,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,l){let a=n[s],o=n[s+1],c=n[s+2],h=n[s+3],f=r[l],m=r[l+1],d=r[l+2],g=r[l+3];return t[e]=a*g+h*f+o*d-c*m,t[e+1]=o*g+h*m+c*f-a*d,t[e+2]=c*g+h*d+a*m-o*f,t[e+3]=h*g-a*f-o*m-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,l=t._order,a=Math.cos,o=Math.sin,c=a(n/2),h=a(s/2),f=a(r/2),m=o(n/2),d=o(s/2),g=o(r/2);switch(l){case"XYZ":this._x=m*h*f+c*d*g,this._y=c*d*f-m*h*g,this._z=c*h*g+m*d*f,this._w=c*h*f-m*d*g;break;case"YXZ":this._x=m*h*f+c*d*g,this._y=c*d*f-m*h*g,this._z=c*h*g-m*d*f,this._w=c*h*f+m*d*g;break;case"ZXY":this._x=m*h*f-c*d*g,this._y=c*d*f+m*h*g,this._z=c*h*g+m*d*f,this._w=c*h*f-m*d*g;break;case"ZYX":this._x=m*h*f-c*d*g,this._y=c*d*f+m*h*g,this._z=c*h*g-m*d*f,this._w=c*h*f+m*d*g;break;case"YZX":this._x=m*h*f+c*d*g,this._y=c*d*f+m*h*g,this._z=c*h*g-m*d*f,this._w=c*h*f-m*d*g;break;case"XZY":this._x=m*h*f-c*d*g,this._y=c*d*f-m*h*g,this._z=c*h*g+m*d*f,this._w=c*h*f+m*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],l=e[1],a=e[5],o=e[9],c=e[2],h=e[6],f=e[10],m=n+a+f;if(m>0){let d=.5/Math.sqrt(m+1);this._w=.25/d,this._x=(h-o)*d,this._y=(r-c)*d,this._z=(l-s)*d}else if(n>a&&n>f){let d=2*Math.sqrt(1+n-a-f);this._w=(h-o)/d,this._x=.25*d,this._y=(s+l)/d,this._z=(r+c)/d}else if(a>f){let d=2*Math.sqrt(1+a-n-f);this._w=(r-c)/d,this._x=(s+l)/d,this._y=.25*d,this._z=(o+h)/d}else{let d=2*Math.sqrt(1+f-n-a);this._w=(l-s)/d,this._x=(r+c)/d,this._y=(o+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(cn(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,l=t._w,a=e._x,o=e._y,c=e._z,h=e._w;return this._x=n*h+l*a+s*c-r*o,this._y=s*h+l*o+r*a-n*c,this._z=r*h+l*c+n*o-s*a,this._w=l*h-n*a-s*o-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,l=this._w,a=l*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=l,this._x=n,this._y=s,this._z=r,this;let o=1-a*a;if(o<=Number.EPSILON){let d=1-e;return this._w=d*l+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let c=Math.sqrt(o),h=Math.atan2(c,a),f=Math.sin((1-e)*h)/c,m=Math.sin(e*h)/c;return this._w=l*f+this._w*m,this._x=n*f+this._x*m,this._y=s*f+this._y*m,this._z=r*f+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,l=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*l,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*l,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*l,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,l=t.y,a=t.z,o=t.w,c=2*(l*s-a*n),h=2*(a*e-r*s),f=2*(r*n-l*e);return this.x=e+o*c+l*f-a*h,this.y=n+o*h+a*c-r*f,this.z=s+o*f+r*h-l*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,l=e.x,a=e.y,o=e.z;return this.x=s*o-r*a,this.y=r*l-n*o,this.z=n*a-s*l,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ia.copy(this).projectOnVector(t),this.sub(ia)}reflect(t){return this.sub(ia.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(cn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ia=new I,gl=new ne,li=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let l=0,a=r.count;l<a;l++)t.isMesh===!0?t.getVertexPosition(l,Sn):Sn.fromBufferAttribute(r,l),Sn.applyMatrix4(t.matrixWorld),this.expandByPoint(Sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zs.copy(n.boundingBox)),zs.applyMatrix4(t.matrixWorld),this.union(zs)}let s=t.children;for(let r=0,l=s.length;r<l;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Sn),Sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ps),ks.subVectors(this.max,ps),Ni.subVectors(t.a,ps),Oi.subVectors(t.b,ps),Fi.subVectors(t.c,ps),jn.subVectors(Oi,Ni),Qn.subVectors(Fi,Oi),mi.subVectors(Ni,Fi);let e=[0,-jn.z,jn.y,0,-Qn.z,Qn.y,0,-mi.z,mi.y,jn.z,0,-jn.x,Qn.z,0,-Qn.x,mi.z,0,-mi.x,-jn.y,jn.x,0,-Qn.y,Qn.x,0,-mi.y,mi.x,0];return!sa(e,Ni,Oi,Fi,ks)||(e=[1,0,0,0,1,0,0,0,1],!sa(e,Ni,Oi,Fi,ks))?!1:(Vs.crossVectors(jn,Qn),e=[Vs.x,Vs.y,Vs.z],sa(e,Ni,Oi,Fi,ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},zn=[new I,new I,new I,new I,new I,new I,new I,new I],Sn=new I,zs=new li,Ni=new I,Oi=new I,Fi=new I,jn=new I,Qn=new I,mi=new I,ps=new I,ks=new I,Vs=new I,gi=new I;function sa(i,t,e,n,s){for(let r=0,l=i.length-3;r<=l;r+=3){gi.fromArray(i,r);let a=s.x*Math.abs(gi.x)+s.y*Math.abs(gi.y)+s.z*Math.abs(gi.z),o=t.dot(gi),c=e.dot(gi),h=n.dot(gi);if(Math.max(-Math.max(o,c,h),Math.min(o,c,h))>a)return!1}return!0}var Gh=new li,ms=new I,ra=new I,Ai=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Gh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,l=t.length;r<l;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ms.subVectors(t,this.center);let e=ms.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ms,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ra.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ms.copy(t.center).add(ra)),this.expandByPoint(ms.copy(t.center).sub(ra))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},kn=new I,aa=new I,Hs=new I,ti=new I,oa=new I,Gs=new I,la=new I,vr=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(kn.copy(this.origin).addScaledVector(this.direction,e),kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){aa.copy(t).add(e).multiplyScalar(.5),Hs.copy(e).sub(t).normalize(),ti.copy(this.origin).sub(aa);let r=t.distanceTo(e)*.5,l=-this.direction.dot(Hs),a=ti.dot(this.direction),o=-ti.dot(Hs),c=ti.lengthSq(),h=Math.abs(1-l*l),f,m,d,g;if(h>0)if(f=l*o-a,m=l*a-o,g=r*h,f>=0)if(m>=-g)if(m<=g){let _=1/h;f*=_,m*=_,d=f*(f+l*m+2*a)+m*(l*f+m+2*o)+c}else m=r,f=Math.max(0,-(l*m+a)),d=-f*f+m*(m+2*o)+c;else m=-r,f=Math.max(0,-(l*m+a)),d=-f*f+m*(m+2*o)+c;else m<=-g?(f=Math.max(0,-(-l*r+a)),m=f>0?-r:Math.min(Math.max(-r,-o),r),d=-f*f+m*(m+2*o)+c):m<=g?(f=0,m=Math.min(Math.max(-r,-o),r),d=m*(m+2*o)+c):(f=Math.max(0,-(l*r+a)),m=f>0?r:Math.min(Math.max(-r,-o),r),d=-f*f+m*(m+2*o)+c);else m=l>0?-r:r,f=Math.max(0,-(l*m+a)),d=-f*f+m*(m+2*o)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(aa).addScaledVector(Hs,m),d}intersectSphere(t,e){kn.subVectors(t.center,this.origin);let n=kn.dot(this.direction),s=kn.dot(kn)-n*n,r=t.radius*t.radius;if(s>r)return null;let l=Math.sqrt(r-s),a=n-l,o=n+l;return o<0?null:a<0?this.at(o,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,l,a,o,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,m=this.origin;return c>=0?(n=(t.min.x-m.x)*c,s=(t.max.x-m.x)*c):(n=(t.max.x-m.x)*c,s=(t.min.x-m.x)*c),h>=0?(r=(t.min.y-m.y)*h,l=(t.max.y-m.y)*h):(r=(t.max.y-m.y)*h,l=(t.min.y-m.y)*h),n>l||r>s||((r>n||isNaN(n))&&(n=r),(l<s||isNaN(s))&&(s=l),f>=0?(a=(t.min.z-m.z)*f,o=(t.max.z-m.z)*f):(a=(t.max.z-m.z)*f,o=(t.min.z-m.z)*f),n>o||a>s)||((a>n||n!==n)&&(n=a),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,kn)!==null}intersectTriangle(t,e,n,s,r){oa.subVectors(e,t),Gs.subVectors(n,t),la.crossVectors(oa,Gs);let l=this.direction.dot(la),a;if(l>0){if(s)return null;a=1}else if(l<0)a=-1,l=-l;else return null;ti.subVectors(this.origin,t);let o=a*this.direction.dot(Gs.crossVectors(ti,Gs));if(o<0)return null;let c=a*this.direction.dot(oa.cross(ti));if(c<0||o+c>l)return null;let h=-a*ti.dot(la);return h<0?null:this.at(h/l,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ye=class i{constructor(t,e,n,s,r,l,a,o,c,h,f,m,d,g,_,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,l,a,o,c,h,f,m,d,g,_,p)}set(t,e,n,s,r,l,a,o,c,h,f,m,d,g,_,p){let u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=s,u[1]=r,u[5]=l,u[9]=a,u[13]=o,u[2]=c,u[6]=h,u[10]=f,u[14]=m,u[3]=d,u[7]=g,u[11]=_,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Bi.setFromMatrixColumn(t,0).length(),r=1/Bi.setFromMatrixColumn(t,1).length(),l=1/Bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*l,e[9]=n[9]*l,e[10]=n[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,l=Math.cos(n),a=Math.sin(n),o=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let m=l*h,d=l*f,g=a*h,_=a*f;e[0]=o*h,e[4]=-o*f,e[8]=c,e[1]=d+g*c,e[5]=m-_*c,e[9]=-a*o,e[2]=_-m*c,e[6]=g+d*c,e[10]=l*o}else if(t.order==="YXZ"){let m=o*h,d=o*f,g=c*h,_=c*f;e[0]=m+_*a,e[4]=g*a-d,e[8]=l*c,e[1]=l*f,e[5]=l*h,e[9]=-a,e[2]=d*a-g,e[6]=_+m*a,e[10]=l*o}else if(t.order==="ZXY"){let m=o*h,d=o*f,g=c*h,_=c*f;e[0]=m-_*a,e[4]=-l*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=l*h,e[9]=_-m*a,e[2]=-l*c,e[6]=a,e[10]=l*o}else if(t.order==="ZYX"){let m=l*h,d=l*f,g=a*h,_=a*f;e[0]=o*h,e[4]=g*c-d,e[8]=m*c+_,e[1]=o*f,e[5]=_*c+m,e[9]=d*c-g,e[2]=-c,e[6]=a*o,e[10]=l*o}else if(t.order==="YZX"){let m=l*o,d=l*c,g=a*o,_=a*c;e[0]=o*h,e[4]=_-m*f,e[8]=g*f+d,e[1]=f,e[5]=l*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*f+g,e[10]=m-_*f}else if(t.order==="XZY"){let m=l*o,d=l*c,g=a*o,_=a*c;e[0]=o*h,e[4]=-f,e[8]=c*h,e[1]=m*f+_,e[5]=l*h,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*h,e[10]=_*f+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Wh,t,Xh)}lookAt(t,e,n){let s=this.elements;return dn.subVectors(t,e),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),ei.crossVectors(n,dn),ei.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),ei.crossVectors(n,dn)),ei.normalize(),Ws.crossVectors(dn,ei),s[0]=ei.x,s[4]=Ws.x,s[8]=dn.x,s[1]=ei.y,s[5]=Ws.y,s[9]=dn.y,s[2]=ei.z,s[6]=Ws.z,s[10]=dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,l=n[0],a=n[4],o=n[8],c=n[12],h=n[1],f=n[5],m=n[9],d=n[13],g=n[2],_=n[6],p=n[10],u=n[14],v=n[3],x=n[7],A=n[11],P=n[15],T=s[0],L=s[4],J=s[8],b=s[12],E=s[1],k=s[5],tt=s[9],pt=s[13],N=s[2],V=s[6],O=s[10],F=s[14],G=s[3],X=s[7],at=s[11],j=s[15];return r[0]=l*T+a*E+o*N+c*G,r[4]=l*L+a*k+o*V+c*X,r[8]=l*J+a*tt+o*O+c*at,r[12]=l*b+a*pt+o*F+c*j,r[1]=h*T+f*E+m*N+d*G,r[5]=h*L+f*k+m*V+d*X,r[9]=h*J+f*tt+m*O+d*at,r[13]=h*b+f*pt+m*F+d*j,r[2]=g*T+_*E+p*N+u*G,r[6]=g*L+_*k+p*V+u*X,r[10]=g*J+_*tt+p*O+u*at,r[14]=g*b+_*pt+p*F+u*j,r[3]=v*T+x*E+A*N+P*G,r[7]=v*L+x*k+A*V+P*X,r[11]=v*J+x*tt+A*O+P*at,r[15]=v*b+x*pt+A*F+P*j,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],l=t[1],a=t[5],o=t[9],c=t[13],h=t[2],f=t[6],m=t[10],d=t[14],g=t[3],_=t[7],p=t[11],u=t[15];return g*(+r*o*f-s*c*f-r*a*m+n*c*m+s*a*d-n*o*d)+_*(+e*o*d-e*c*m+r*l*m-s*l*d+s*c*h-r*o*h)+p*(+e*c*f-e*a*d-r*l*f+n*l*d+r*a*h-n*c*h)+u*(-s*a*h-e*o*f+e*a*m+s*l*f-n*l*m+n*o*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],l=t[4],a=t[5],o=t[6],c=t[7],h=t[8],f=t[9],m=t[10],d=t[11],g=t[12],_=t[13],p=t[14],u=t[15],v=f*p*c-_*m*c+_*o*d-a*p*d-f*o*u+a*m*u,x=g*m*c-h*p*c-g*o*d+l*p*d+h*o*u-l*m*u,A=h*_*c-g*f*c+g*a*d-l*_*d-h*a*u+l*f*u,P=g*f*o-h*_*o-g*a*m+l*_*m+h*a*p-l*f*p,T=e*v+n*x+s*A+r*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/T;return t[0]=v*L,t[1]=(_*m*r-f*p*r-_*s*d+n*p*d+f*s*u-n*m*u)*L,t[2]=(a*p*r-_*o*r+_*s*c-n*p*c-a*s*u+n*o*u)*L,t[3]=(f*o*r-a*m*r-f*s*c+n*m*c+a*s*d-n*o*d)*L,t[4]=x*L,t[5]=(h*p*r-g*m*r+g*s*d-e*p*d-h*s*u+e*m*u)*L,t[6]=(g*o*r-l*p*r-g*s*c+e*p*c+l*s*u-e*o*u)*L,t[7]=(l*m*r-h*o*r+h*s*c-e*m*c-l*s*d+e*o*d)*L,t[8]=A*L,t[9]=(g*f*r-h*_*r-g*n*d+e*_*d+h*n*u-e*f*u)*L,t[10]=(l*_*r-g*a*r+g*n*c-e*_*c-l*n*u+e*a*u)*L,t[11]=(h*a*r-l*f*r-h*n*c+e*f*c+l*n*d-e*a*d)*L,t[12]=P*L,t[13]=(h*_*s-g*f*s+g*n*m-e*_*m-h*n*p+e*f*p)*L,t[14]=(g*a*s-l*_*s-g*n*o+e*_*o+l*n*p-e*a*p)*L,t[15]=(l*f*s-h*a*s+h*n*o-e*f*o-l*n*m+e*a*m)*L,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,l=t.x,a=t.y,o=t.z,c=r*l,h=r*a;return this.set(c*l+n,c*a-s*o,c*o+s*a,0,c*a+s*o,h*a+n,h*o-s*l,0,c*o-s*a,h*o+s*l,r*o*o+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,l){return this.set(1,n,r,0,t,1,l,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,l=e._y,a=e._z,o=e._w,c=r+r,h=l+l,f=a+a,m=r*c,d=r*h,g=r*f,_=l*h,p=l*f,u=a*f,v=o*c,x=o*h,A=o*f,P=n.x,T=n.y,L=n.z;return s[0]=(1-(_+u))*P,s[1]=(d+A)*P,s[2]=(g-x)*P,s[3]=0,s[4]=(d-A)*T,s[5]=(1-(m+u))*T,s[6]=(p+v)*T,s[7]=0,s[8]=(g+x)*L,s[9]=(p-v)*L,s[10]=(1-(m+_))*L,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Bi.set(s[0],s[1],s[2]).length(),l=Bi.set(s[4],s[5],s[6]).length(),a=Bi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],wn.copy(this);let c=1/r,h=1/l,f=1/a;return wn.elements[0]*=c,wn.elements[1]*=c,wn.elements[2]*=c,wn.elements[4]*=h,wn.elements[5]*=h,wn.elements[6]*=h,wn.elements[8]*=f,wn.elements[9]*=f,wn.elements[10]*=f,e.setFromRotationMatrix(wn),n.x=r,n.y=l,n.z=a,this}makePerspective(t,e,n,s,r,l,a=Zn){let o=this.elements,c=2*r/(e-t),h=2*r/(n-s),f=(e+t)/(e-t),m=(n+s)/(n-s),d,g;if(a===Zn)d=-(l+r)/(l-r),g=-2*l*r/(l-r);else if(a===pr)d=-l/(l-r),g=-l*r/(l-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return o[0]=c,o[4]=0,o[8]=f,o[12]=0,o[1]=0,o[5]=h,o[9]=m,o[13]=0,o[2]=0,o[6]=0,o[10]=d,o[14]=g,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,n,s,r,l,a=Zn){let o=this.elements,c=1/(e-t),h=1/(n-s),f=1/(l-r),m=(e+t)*c,d=(n+s)*h,g,_;if(a===Zn)g=(l+r)*f,_=-2*f;else if(a===pr)g=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return o[0]=2*c,o[4]=0,o[8]=0,o[12]=-m,o[1]=0,o[5]=2*h,o[9]=0,o[13]=-d,o[2]=0,o[6]=0,o[10]=_,o[14]=-g,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Bi=new I,wn=new ye,Wh=new I(0,0,0),Xh=new I(1,1,1),ei=new I,Ws=new I,dn=new I,_l=new ye,xl=new ne,yr=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],l=s[4],a=s[8],o=s[1],c=s[5],h=s[9],f=s[2],m=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(cn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-l,r)):(this._x=Math.atan2(m,c),this._z=0);break;case"YXZ":this._x=Math.asin(-cn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(o,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(cn(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-l,c)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-cn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(m,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-l,c));break;case"YZX":this._z=Math.asin(cn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-cn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(m,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return _l.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_l,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return xl.setFromEuler(this),this.setFromQuaternion(xl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};yr.DEFAULT_ORDER="XYZ";var Mr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},qh=0,vl=new I,zi=new ne,Vn=new ye,Xs=new I,gs=new I,Yh=new I,Zh=new ne,yl=new I(1,0,0),Ml=new I(0,1,0),bl=new I(0,0,1),Jh={type:"added"},$h={type:"removed"},yn=class i extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=Jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new I,e=new yr,n=new ne,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function l(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ye},normalMatrix:{value:new ae}}),this.matrix=new ye,this.matrixWorld=new ye,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return zi.setFromAxisAngle(t,e),this.quaternion.multiply(zi),this}rotateOnWorldAxis(t,e){return zi.setFromAxisAngle(t,e),this.quaternion.premultiply(zi),this}rotateX(t){return this.rotateOnAxis(yl,t)}rotateY(t){return this.rotateOnAxis(Ml,t)}rotateZ(t){return this.rotateOnAxis(bl,t)}translateOnAxis(t,e){return vl.copy(t).applyQuaternion(this.quaternion),this.position.add(vl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(yl,t)}translateY(t){return this.translateOnAxis(Ml,t)}translateZ(t){return this.translateOnAxis(bl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Xs.copy(t):Xs.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(gs,Xs,this.up):Vn.lookAt(Xs,gs,this.up),this.quaternion.setFromRotationMatrix(Vn),s&&(Vn.extractRotation(s.matrixWorld),zi.setFromRotationMatrix(Vn),this.quaternion.premultiply(zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Jh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent($h)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Vn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let l=this.children[n].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,l=s.length;r<l;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,t,Yh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,Zh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,l=s.length;r<l;r++){let a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,o){return a[o.uuid]===void 0&&(a[o.uuid]=o.toJSON(t)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let o=a.shapes;if(Array.isArray(o))for(let c=0,h=o.length;c<h;c++){let f=o[c];r(t.shapes,f)}else r(t.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let o=0,c=this.material.length;o<c;o++)a.push(r(t.materials,this.material[o]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let o=this.animations[a];s.animations.push(r(t.animations,o))}}if(e){let a=l(t.geometries),o=l(t.materials),c=l(t.textures),h=l(t.images),f=l(t.shapes),m=l(t.skeletons),d=l(t.animations),g=l(t.nodes);a.length>0&&(n.geometries=a),o.length>0&&(n.materials=o),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),m.length>0&&(n.skeletons=m),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function l(a){let o=[];for(let c in a){let h=a[c];delete h.metadata,o.push(h)}return o}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};yn.DEFAULT_UP=new I(0,1,0);yn.DEFAULT_MATRIX_AUTO_UPDATE=!0;yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var An=new I,Hn=new I,ca=new I,Gn=new I,ki=new I,Vi=new I,Sl=new I,ha=new I,ua=new I,da=new I,qs=!1,Ji=class i{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),An.subVectors(t,e),s.cross(An);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){An.subVectors(s,e),Hn.subVectors(n,e),ca.subVectors(t,e);let l=An.dot(An),a=An.dot(Hn),o=An.dot(ca),c=Hn.dot(Hn),h=Hn.dot(ca),f=l*c-a*a;if(f===0)return r.set(0,0,0),null;let m=1/f,d=(c*o-a*h)*m,g=(l*h-a*o)*m;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getUV(t,e,n,s,r,l,a,o){return qs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),qs=!0),this.getInterpolation(t,e,n,s,r,l,a,o)}static getInterpolation(t,e,n,s,r,l,a,o){return this.getBarycoord(t,e,n,s,Gn)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,Gn.x),o.addScaledVector(l,Gn.y),o.addScaledVector(a,Gn.z),o)}static isFrontFacing(t,e,n,s){return An.subVectors(n,e),Hn.subVectors(t,e),An.cross(Hn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return An.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),An.cross(Hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return qs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),qs=!0),i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,l,a;ki.subVectors(s,n),Vi.subVectors(r,n),ha.subVectors(t,n);let o=ki.dot(ha),c=Vi.dot(ha);if(o<=0&&c<=0)return e.copy(n);ua.subVectors(t,s);let h=ki.dot(ua),f=Vi.dot(ua);if(h>=0&&f<=h)return e.copy(s);let m=o*f-h*c;if(m<=0&&o>=0&&h<=0)return l=o/(o-h),e.copy(n).addScaledVector(ki,l);da.subVectors(t,r);let d=ki.dot(da),g=Vi.dot(da);if(g>=0&&d<=g)return e.copy(r);let _=d*c-o*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Vi,a);let p=h*g-d*f;if(p<=0&&f-h>=0&&d-g>=0)return Sl.subVectors(r,s),a=(f-h)/(f-h+(d-g)),e.copy(s).addScaledVector(Sl,a);let u=1/(p+_+m);return l=_*u,a=m*u,e.copy(n).addScaledVector(ki,l).addScaledVector(Vi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},mc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function fa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var ee=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ve.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ve.workingColorSpace){return this.r=t,this.g=e,this.b=n,ve.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ve.workingColorSpace){if(t=Bh(t,1),e=cn(e,0,1),n=cn(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,l=2*n-r;this.r=fa(l,r,t+1/3),this.g=fa(l,r,t),this.b=fa(l,r,t-1/3)}return ve.toWorkingColorSpace(this,s),this}setStyle(t,e=ze){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,l=s[1],a=s[2];switch(l){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],l=r.length;if(l===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ze){let n=mc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Qi(t.r),this.g=Qi(t.g),this.b=Qi(t.b),this}copyLinearToSRGB(t){return this.r=ea(t.r),this.g=ea(t.g),this.b=ea(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ze){return ve.fromWorkingColorSpace(nn.copy(this),t),Math.round(cn(nn.r*255,0,255))*65536+Math.round(cn(nn.g*255,0,255))*256+Math.round(cn(nn.b*255,0,255))}getHexString(t=ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ve.workingColorSpace){ve.fromWorkingColorSpace(nn.copy(this),e);let n=nn.r,s=nn.g,r=nn.b,l=Math.max(n,s,r),a=Math.min(n,s,r),o,c,h=(a+l)/2;if(a===l)o=0,c=0;else{let f=l-a;switch(c=h<=.5?f/(l+a):f/(2-l-a),l){case n:o=(s-r)/f+(s<r?6:0);break;case s:o=(r-n)/f+2;break;case r:o=(n-s)/f+4;break}o/=6}return t.h=o,t.s=c,t.l=h,t}getRGB(t,e=ve.workingColorSpace){return ve.fromWorkingColorSpace(nn.copy(this),e),t.r=nn.r,t.g=nn.g,t.b=nn.b,t}getStyle(t=ze){ve.fromWorkingColorSpace(nn.copy(this),t);let e=nn.r,n=nn.g,s=nn.b;return t!==ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ni),this.setHSL(ni.h+t,ni.s+e,ni.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ni),t.getHSL(Ys);let n=Qr(ni.h,Ys.h,e),s=Qr(ni.s,Ys.s,e),r=Qr(ni.l,Ys.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},nn=new ee;ee.NAMES=mc;var Kh=0,ss=class extends oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=Jn(),this.name="",this.type="Material",this.blending=ji,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wa,this.blendDst=Aa,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ui,this.stencilZFail=Ui,this.stencilZPass=Ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ji&&(n.blending=this.blending),this.side!==ai&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wa&&(n.blendSrc=this.blendSrc),this.blendDst!==Aa&&(n.blendDst=this.blendDst),this.blendEquation!==yi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==lr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ui&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ui&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ui&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let l=[];for(let a in r){let o=r[a];delete o.metadata,l.push(o)}return l}if(e){let r=s(t.textures),l=s(t.images);r.length>0&&(n.textures=r),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},br=class extends ss{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ic,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Be=new I,Zs=new ge,pe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Pa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Zs.fromBufferAttribute(this,e),Zs.applyMatrix3(t),this.setXY(e,Zs.x,Zs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix3(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=qn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=qn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=qn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=qn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=qn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),s=Me(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),s=Me(s,this.array),r=Me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Pa&&(t.usage=this.usage),t}};var Sr=class extends pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var wr=class extends pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Ze=class extends pe{constructor(t,e,n){super(new Float32Array(t),e,n)}};var jh=0,gn=new ye,pa=new yn,Hi=new I,fn=new li,_s=new li,Ye=new I,mn=class i extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=Jn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(pc(t)?wr:Sr)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ae().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,n){return gn.makeTranslation(t,e,n),this.applyMatrix4(gn),this}scale(t,e,n){return gn.makeScale(t,e,n),this.applyMatrix4(gn),this}lookAt(t){return pa.lookAt(t),pa.updateMatrix(),this.applyMatrix4(pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ze(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ai);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(t){let n=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,l=e.length;r<l;r++){let a=e[r];_s.setFromBufferAttribute(a),this.morphTargetsRelative?(Ye.addVectors(fn.min,_s.min),fn.expandByPoint(Ye),Ye.addVectors(fn.max,_s.max),fn.expandByPoint(Ye)):(fn.expandByPoint(_s.min),fn.expandByPoint(_s.max))}fn.getCenter(n);let s=0;for(let r=0,l=t.count;r<l;r++)Ye.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ye));if(e)for(let r=0,l=e.length;r<l;r++){let a=e[r],o=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ye.fromBufferAttribute(a,c),o&&(Hi.fromBufferAttribute(t,c),Ye.add(Hi)),s=Math.max(s,n.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,s=e.position.array,r=e.normal.array,l=e.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pe(new Float32Array(4*a),4));let o=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<a;E++)c[E]=new I,h[E]=new I;let f=new I,m=new I,d=new I,g=new ge,_=new ge,p=new ge,u=new I,v=new I;function x(E,k,tt){f.fromArray(s,E*3),m.fromArray(s,k*3),d.fromArray(s,tt*3),g.fromArray(l,E*2),_.fromArray(l,k*2),p.fromArray(l,tt*2),m.sub(f),d.sub(f),_.sub(g),p.sub(g);let pt=1/(_.x*p.y-p.x*_.y);isFinite(pt)&&(u.copy(m).multiplyScalar(p.y).addScaledVector(d,-_.y).multiplyScalar(pt),v.copy(d).multiplyScalar(_.x).addScaledVector(m,-p.x).multiplyScalar(pt),c[E].add(u),c[k].add(u),c[tt].add(u),h[E].add(v),h[k].add(v),h[tt].add(v))}let A=this.groups;A.length===0&&(A=[{start:0,count:n.length}]);for(let E=0,k=A.length;E<k;++E){let tt=A[E],pt=tt.start,N=tt.count;for(let V=pt,O=pt+N;V<O;V+=3)x(n[V+0],n[V+1],n[V+2])}let P=new I,T=new I,L=new I,J=new I;function b(E){L.fromArray(r,E*3),J.copy(L);let k=c[E];P.copy(k),P.sub(L.multiplyScalar(L.dot(k))).normalize(),T.crossVectors(J,k);let pt=T.dot(h[E])<0?-1:1;o[E*4]=P.x,o[E*4+1]=P.y,o[E*4+2]=P.z,o[E*4+3]=pt}for(let E=0,k=A.length;E<k;++E){let tt=A[E],pt=tt.start,N=tt.count;for(let V=pt,O=pt+N;V<O;V+=3)b(n[V+0]),b(n[V+1]),b(n[V+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let m=0,d=n.count;m<d;m++)n.setXYZ(m,0,0,0);let s=new I,r=new I,l=new I,a=new I,o=new I,c=new I,h=new I,f=new I;if(t)for(let m=0,d=t.count;m<d;m+=3){let g=t.getX(m+0),_=t.getX(m+1),p=t.getX(m+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),l.fromBufferAttribute(e,p),h.subVectors(l,r),f.subVectors(s,r),h.cross(f),a.fromBufferAttribute(n,g),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(h),o.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let m=0,d=e.count;m<d;m+=3)s.fromBufferAttribute(e,m+0),r.fromBufferAttribute(e,m+1),l.fromBufferAttribute(e,m+2),h.subVectors(l,r),f.subVectors(s,r),h.cross(f),n.setXYZ(m+0,h.x,h.y,h.z),n.setXYZ(m+1,h.x,h.y,h.z),n.setXYZ(m+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(a,o){let c=a.array,h=a.itemSize,f=a.normalized,m=new c.constructor(o.length*h),d=0,g=0;for(let _=0,p=o.length;_<p;_++){a.isInterleavedBufferAttribute?d=o[_]*a.data.stride+a.offset:d=o[_]*h;for(let u=0;u<h;u++)m[g++]=c[d++]}return new pe(m,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let o=s[a],c=t(o,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let o=[],c=r[a];for(let h=0,f=c.length;h<f;h++){let m=c[h],d=t(m,n);o.push(d)}e.morphAttributes[a]=o}e.morphTargetsRelative=this.morphTargetsRelative;let l=this.groups;for(let a=0,o=l.length;a<o;a++){let c=l[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let o=this.parameters;for(let c in o)o[c]!==void 0&&(t[c]=o[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let o in n){let c=n[o];t.data.attributes[o]=c.toJSON(t.data)}let s={},r=!1;for(let o in this.morphAttributes){let c=this.morphAttributes[o],h=[];for(let f=0,m=c.length;f<m;f++){let d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(s[o]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let m=0,d=f.length;m<d;m++)h.push(f[m].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let l=t.groups;for(let c=0,h=l.length;c<h;c++){let f=l[c];this.addGroup(f.start,f.count,f.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let o=t.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},wl=new ye,_i=new vr,Js=new Ai,Al=new I,Gi=new I,Wi=new I,Xi=new I,ma=new I,$s=new I,Ks=new ge,js=new ge,Qs=new ge,El=new I,Tl=new I,Rl=new I,tr=new I,er=new I,He=class extends yn{constructor(t=new mn,e=new br){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,l=s.length;r<l;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,l=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){$s.set(0,0,0);for(let o=0,c=r.length;o<c;o++){let h=a[o],f=r[o];h!==0&&(ma.fromBufferAttribute(f,t),l?$s.addScaledVector(ma,h):$s.addScaledVector(ma.sub(e),h))}e.add($s)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(Js.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Js,Al)===null||_i.origin.distanceToSquared(Al)>(t.far-t.near)**2))&&(wl.copy(r).invert(),_i.copy(t.ray).applyMatrix4(wl),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let s,r=this.geometry,l=this.material,a=r.index,o=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,m=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(l))for(let g=0,_=m.length;g<_;g++){let p=m[g],u=l[p.materialIndex],v=Math.max(p.start,d.start),x=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let A=v,P=x;A<P;A+=3){let T=a.getX(A),L=a.getX(A+1),J=a.getX(A+2);s=nr(this,u,t,n,c,h,f,T,L,J),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let p=g,u=_;p<u;p+=3){let v=a.getX(p),x=a.getX(p+1),A=a.getX(p+2);s=nr(this,l,t,n,c,h,f,v,x,A),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(o!==void 0)if(Array.isArray(l))for(let g=0,_=m.length;g<_;g++){let p=m[g],u=l[p.materialIndex],v=Math.max(p.start,d.start),x=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let A=v,P=x;A<P;A+=3){let T=A,L=A+1,J=A+2;s=nr(this,u,t,n,c,h,f,T,L,J),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let p=g,u=_;p<u;p+=3){let v=p,x=p+1,A=p+2;s=nr(this,l,t,n,c,h,f,v,x,A),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Qh(i,t,e,n,s,r,l,a){let o;if(t.side===Ke?o=n.intersectTriangle(l,r,s,!0,a):o=n.intersectTriangle(s,r,l,t.side===ai,a),o===null)return null;er.copy(a),er.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(er);return c<e.near||c>e.far?null:{distance:c,point:er.clone(),object:i}}function nr(i,t,e,n,s,r,l,a,o,c){i.getVertexPosition(a,Gi),i.getVertexPosition(o,Wi),i.getVertexPosition(c,Xi);let h=Qh(i,t,e,n,Gi,Wi,Xi,tr);if(h){s&&(Ks.fromBufferAttribute(s,a),js.fromBufferAttribute(s,o),Qs.fromBufferAttribute(s,c),h.uv=Ji.getInterpolation(tr,Gi,Wi,Xi,Ks,js,Qs,new ge)),r&&(Ks.fromBufferAttribute(r,a),js.fromBufferAttribute(r,o),Qs.fromBufferAttribute(r,c),h.uv1=Ji.getInterpolation(tr,Gi,Wi,Xi,Ks,js,Qs,new ge),h.uv2=h.uv1),l&&(El.fromBufferAttribute(l,a),Tl.fromBufferAttribute(l,o),Rl.fromBufferAttribute(l,c),h.normal=Ji.getInterpolation(tr,Gi,Wi,Xi,El,Tl,Rl,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:o,c,normal:new I,materialIndex:0};Ji.getNormal(Gi,Wi,Xi,f.normal),h.face=f}return h}var Ei=class i extends mn{constructor(t=1,e=1,n=1,s=1,r=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:l};let a=this;s=Math.floor(s),r=Math.floor(r),l=Math.floor(l);let o=[],c=[],h=[],f=[],m=0,d=0;g("z","y","x",-1,-1,n,e,t,l,r,0),g("z","y","x",1,-1,n,e,-t,l,r,1),g("x","z","y",1,1,t,n,e,s,l,2),g("x","z","y",1,-1,t,n,-e,s,l,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(h,3)),this.setAttribute("uv",new Ze(f,2));function g(_,p,u,v,x,A,P,T,L,J,b){let E=A/L,k=P/J,tt=A/2,pt=P/2,N=T/2,V=L+1,O=J+1,F=0,G=0,X=new I;for(let at=0;at<O;at++){let j=at*k-pt;for(let rt=0;rt<V;rt++){let W=rt*E-tt;X[_]=W*v,X[p]=j*x,X[u]=N,c.push(X.x,X.y,X.z),X[_]=0,X[p]=0,X[u]=T>0?1:-1,h.push(X.x,X.y,X.z),f.push(rt/L),f.push(1-at/J),F+=1}}for(let at=0;at<J;at++)for(let j=0;j<L;j++){let rt=m+j+V*at,W=m+j+V*(at+1),ot=m+(j+1)+V*(at+1),yt=m+(j+1)+V*at;o.push(rt,W,yt),o.push(W,ot,yt),G+=6}a.addGroup(d,G,b),d+=G,m+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function rs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function an(i){let t={};for(let e=0;e<i.length;e++){let n=rs(i[e]);for(let s in n)t[s]=n[s]}return t}function tu(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function gc(i){return i.getRenderTarget()===null?i.outputColorSpace:ve.workingColorSpace}var eu={clone:rs,merge:an},nu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,iu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ce=class extends ss{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nu,this.fragmentShader=iu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=rs(t.uniforms),this.uniformsGroups=tu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let l=this.uniforms[s].value;l&&l.isTexture?e.uniforms[s]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[s]={type:"m4",value:l.toArray()}:e.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Ar=class extends yn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ye,this.projectionMatrix=new ye,this.projectionMatrixInverse=new ye,this.coordinateSystem=Zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ln=class extends Ar{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ia*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ia*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(jr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,l=this.view;if(this.view!==null&&this.view.enabled){let o=l.fullWidth,c=l.fullHeight;r+=l.offsetX*s/o,e-=l.offsetY*n/c,s*=l.width/o,n*=l.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},qi=-90,Yi=1,Oa=class extends yn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ln(qi,Yi,t,e);s.layers=this.layers,this.add(s);let r=new ln(qi,Yi,t,e);r.layers=this.layers,this.add(r);let l=new ln(qi,Yi,t,e);l.layers=this.layers,this.add(l);let a=new ln(qi,Yi,t,e);a.layers=this.layers,this.add(a);let o=new ln(qi,Yi,t,e);o.layers=this.layers,this.add(o);let c=new ln(qi,Yi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,l,a,o]=e;for(let c of e)this.remove(c);if(t===Zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(t===pr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,l,a,o,c,h]=this.children,f=t.getRenderTarget(),m=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,l),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,o),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(f,m,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Er=class extends pn{constructor(t,e,n,s,r,l,a,o,c,h){t=t!==void 0?t:[],e=e!==void 0?e:es,super(t,e,n,s,r,l,a,o,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Fa=class extends vn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(xs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===wi?ze:xn),this.texture=new Er(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:on}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ei(5,5,5),r=new Ce({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ke,blending:si});r.uniforms.tEquirect.value=e;let l=new He(s,r),a=e.minFilter;return e.minFilter===Ms&&(e.minFilter=on),new Oa(1,10,this).update(t,l),e.minFilter=a,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,n,s);t.setRenderTarget(r)}},ga=new I,su=new I,ru=new ae,Xn=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=ga.subVectors(n,e).cross(su.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(ga),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||ru.getNormalMatrix(t),s=this.coplanarPoint(ga).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},xi=new Ai,ir=new I,Tr=class{constructor(t=new Xn,e=new Xn,n=new Xn,s=new Xn,r=new Xn,l=new Xn){this.planes=[t,e,n,s,r,l]}set(t,e,n,s,r,l){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(l),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Zn){let n=this.planes,s=t.elements,r=s[0],l=s[1],a=s[2],o=s[3],c=s[4],h=s[5],f=s[6],m=s[7],d=s[8],g=s[9],_=s[10],p=s[11],u=s[12],v=s[13],x=s[14],A=s[15];if(n[0].setComponents(o-r,m-c,p-d,A-u).normalize(),n[1].setComponents(o+r,m+c,p+d,A+u).normalize(),n[2].setComponents(o+l,m+h,p+g,A+v).normalize(),n[3].setComponents(o-l,m-h,p-g,A-v).normalize(),n[4].setComponents(o-a,m-f,p-_,A-x).normalize(),e===Zn)n[5].setComponents(o+a,m+f,p+_,A+x).normalize();else if(e===pr)n[5].setComponents(a,f,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(t){return xi.center.set(0,0,0),xi.radius=.7071067811865476,xi.applyMatrix4(t.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(ir.x=s.normal.x>0?t.max.x:t.min.x,ir.y=s.normal.y>0?t.max.y:t.min.y,ir.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ir)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function _c(){let i=null,t=!1,e=null,n=null;function s(r,l){e(r,l),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function au(i,t){let e=t.isWebGL2,n=new WeakMap;function s(c,h){let f=c.array,m=c.usage,d=f.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,f,m),c.onUploadCallback();let _;if(f instanceof Float32Array)_=i.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=i.SHORT;else if(f instanceof Uint32Array)_=i.UNSIGNED_INT;else if(f instanceof Int32Array)_=i.INT;else if(f instanceof Int8Array)_=i.BYTE;else if(f instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:g,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:d}}function r(c,h,f){let m=h.array,d=h._updateRange,g=h.updateRanges;if(i.bindBuffer(f,c),d.count===-1&&g.length===0&&i.bufferSubData(f,0,m),g.length!==0){for(let _=0,p=g.length;_<p;_++){let u=g[_];e?i.bufferSubData(f,u.start*m.BYTES_PER_ELEMENT,m,u.start,u.count):i.bufferSubData(f,u.start*m.BYTES_PER_ELEMENT,m.subarray(u.start,u.start+u.count))}h.clearUpdateRanges()}d.count!==-1&&(e?i.bufferSubData(f,d.offset*m.BYTES_PER_ELEMENT,m,d.offset,d.count):i.bufferSubData(f,d.offset*m.BYTES_PER_ELEMENT,m.subarray(d.offset,d.offset+d.count)),d.count=-1),h.onUploadCallback()}function l(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function o(c,h){if(c.isGLBufferAttribute){let m=n.get(c);(!m||m.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let f=n.get(c);if(f===void 0)n.set(c,s(c,h));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(f.buffer,c,h),f.version=c.version}}return{get:l,remove:a,update:o}}var Ti=class i extends mn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,l=e/2,a=Math.floor(n),o=Math.floor(s),c=a+1,h=o+1,f=t/a,m=e/o,d=[],g=[],_=[],p=[];for(let u=0;u<h;u++){let v=u*m-l;for(let x=0;x<c;x++){let A=x*f-r;g.push(A,-v,0),_.push(0,0,1),p.push(x/a),p.push(1-u/o)}}for(let u=0;u<o;u++)for(let v=0;v<a;v++){let x=v+c*u,A=v+c*(u+1),P=v+1+c*(u+1),T=v+1+c*u;d.push(x,A,T),d.push(A,P,T)}this.setIndex(d),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(_,3)),this.setAttribute("uv",new Ze(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},ou=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,cu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,du=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,_u=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,yu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Mu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,bu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Su=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Au=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Eu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ru=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Cu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Pu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Iu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Uu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Du=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ou=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,zu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ku=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ju=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,$u=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ku=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ju=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,td=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ed=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,id=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ad=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,od=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ld=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,cd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ud=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,fd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,pd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,md=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,_d=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Md=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,bd=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Sd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,wd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ad=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ed=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Td=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ld=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Id=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ud=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Od=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Gd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Wd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Zd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$d=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ef=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,af=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,of=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,df=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ff=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,pf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,mf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,gf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,_f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,bf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Af=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ef=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Rf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Cf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,If=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Df=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Of=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ff=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,re={alphahash_fragment:ou,alphahash_pars_fragment:lu,alphamap_fragment:cu,alphamap_pars_fragment:hu,alphatest_fragment:uu,alphatest_pars_fragment:du,aomap_fragment:fu,aomap_pars_fragment:pu,batching_pars_vertex:mu,batching_vertex:gu,begin_vertex:_u,beginnormal_vertex:xu,bsdfs:vu,iridescence_fragment:yu,bumpmap_pars_fragment:Mu,clipping_planes_fragment:bu,clipping_planes_pars_fragment:Su,clipping_planes_pars_vertex:wu,clipping_planes_vertex:Au,color_fragment:Eu,color_pars_fragment:Tu,color_pars_vertex:Ru,color_vertex:Cu,common:Pu,cube_uv_reflection_fragment:Lu,defaultnormal_vertex:Iu,displacementmap_pars_vertex:Uu,displacementmap_vertex:Du,emissivemap_fragment:Nu,emissivemap_pars_fragment:Ou,colorspace_fragment:Fu,colorspace_pars_fragment:Bu,envmap_fragment:zu,envmap_common_pars_fragment:ku,envmap_pars_fragment:Vu,envmap_pars_vertex:Hu,envmap_physical_pars_fragment:td,envmap_vertex:Gu,fog_vertex:Wu,fog_pars_vertex:Xu,fog_fragment:qu,fog_pars_fragment:Yu,gradientmap_pars_fragment:Zu,lightmap_fragment:Ju,lightmap_pars_fragment:$u,lights_lambert_fragment:Ku,lights_lambert_pars_fragment:ju,lights_pars_begin:Qu,lights_toon_fragment:ed,lights_toon_pars_fragment:nd,lights_phong_fragment:id,lights_phong_pars_fragment:sd,lights_physical_fragment:rd,lights_physical_pars_fragment:ad,lights_fragment_begin:od,lights_fragment_maps:ld,lights_fragment_end:cd,logdepthbuf_fragment:hd,logdepthbuf_pars_fragment:ud,logdepthbuf_pars_vertex:dd,logdepthbuf_vertex:fd,map_fragment:pd,map_pars_fragment:md,map_particle_fragment:gd,map_particle_pars_fragment:_d,metalnessmap_fragment:xd,metalnessmap_pars_fragment:vd,morphcolor_vertex:yd,morphnormal_vertex:Md,morphtarget_pars_vertex:bd,morphtarget_vertex:Sd,normal_fragment_begin:wd,normal_fragment_maps:Ad,normal_pars_fragment:Ed,normal_pars_vertex:Td,normal_vertex:Rd,normalmap_pars_fragment:Cd,clearcoat_normal_fragment_begin:Pd,clearcoat_normal_fragment_maps:Ld,clearcoat_pars_fragment:Id,iridescence_pars_fragment:Ud,opaque_fragment:Dd,packing:Nd,premultiplied_alpha_fragment:Od,project_vertex:Fd,dithering_fragment:Bd,dithering_pars_fragment:zd,roughnessmap_fragment:kd,roughnessmap_pars_fragment:Vd,shadowmap_pars_fragment:Hd,shadowmap_pars_vertex:Gd,shadowmap_vertex:Wd,shadowmask_pars_fragment:Xd,skinbase_vertex:qd,skinning_pars_vertex:Yd,skinning_vertex:Zd,skinnormal_vertex:Jd,specularmap_fragment:$d,specularmap_pars_fragment:Kd,tonemapping_fragment:jd,tonemapping_pars_fragment:Qd,transmission_fragment:tf,transmission_pars_fragment:ef,uv_pars_fragment:nf,uv_pars_vertex:sf,uv_vertex:rf,worldpos_vertex:af,background_vert:of,background_frag:lf,backgroundCube_vert:cf,backgroundCube_frag:hf,cube_vert:uf,cube_frag:df,depth_vert:ff,depth_frag:pf,distanceRGBA_vert:mf,distanceRGBA_frag:gf,equirect_vert:_f,equirect_frag:xf,linedashed_vert:vf,linedashed_frag:yf,meshbasic_vert:Mf,meshbasic_frag:bf,meshlambert_vert:Sf,meshlambert_frag:wf,meshmatcap_vert:Af,meshmatcap_frag:Ef,meshnormal_vert:Tf,meshnormal_frag:Rf,meshphong_vert:Cf,meshphong_frag:Pf,meshphysical_vert:Lf,meshphysical_frag:If,meshtoon_vert:Uf,meshtoon_frag:Df,points_vert:Nf,points_frag:Of,shadow_vert:Ff,shadow_frag:Bf,sprite_vert:zf,sprite_frag:kf},bt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ae},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ae}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ae}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ae}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ae},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ae},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ae},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ae}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ae}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ae}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0},uvTransform:{value:new ae}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ae},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0}}},Un={basic:{uniforms:an([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.fog]),vertexShader:re.meshbasic_vert,fragmentShader:re.meshbasic_frag},lambert:{uniforms:an([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new ee(0)}}]),vertexShader:re.meshlambert_vert,fragmentShader:re.meshlambert_frag},phong:{uniforms:an([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:re.meshphong_vert,fragmentShader:re.meshphong_frag},standard:{uniforms:an([bt.common,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.roughnessmap,bt.metalnessmap,bt.fog,bt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag},toon:{uniforms:an([bt.common,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.gradientmap,bt.fog,bt.lights,{emissive:{value:new ee(0)}}]),vertexShader:re.meshtoon_vert,fragmentShader:re.meshtoon_frag},matcap:{uniforms:an([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,{matcap:{value:null}}]),vertexShader:re.meshmatcap_vert,fragmentShader:re.meshmatcap_frag},points:{uniforms:an([bt.points,bt.fog]),vertexShader:re.points_vert,fragmentShader:re.points_frag},dashed:{uniforms:an([bt.common,bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:re.linedashed_vert,fragmentShader:re.linedashed_frag},depth:{uniforms:an([bt.common,bt.displacementmap]),vertexShader:re.depth_vert,fragmentShader:re.depth_frag},normal:{uniforms:an([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,{opacity:{value:1}}]),vertexShader:re.meshnormal_vert,fragmentShader:re.meshnormal_frag},sprite:{uniforms:an([bt.sprite,bt.fog]),vertexShader:re.sprite_vert,fragmentShader:re.sprite_frag},background:{uniforms:{uvTransform:{value:new ae},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:re.background_vert,fragmentShader:re.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:re.backgroundCube_vert,fragmentShader:re.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:re.cube_vert,fragmentShader:re.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:re.equirect_vert,fragmentShader:re.equirect_frag},distanceRGBA:{uniforms:an([bt.common,bt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:re.distanceRGBA_vert,fragmentShader:re.distanceRGBA_frag},shadow:{uniforms:an([bt.lights,bt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:re.shadow_vert,fragmentShader:re.shadow_frag}};Un.physical={uniforms:an([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ae},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ae},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ae},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ae},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ae},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ae},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ae},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ae},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ae},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ae},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ae},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ae}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag};var sr={r:0,b:0,g:0};function Vf(i,t,e,n,s,r,l){let a=new ee(0),o=r===!0?0:1,c,h,f=null,m=0,d=null;function g(p,u){let v=!1,x=u.isScene===!0?u.background:null;x&&x.isTexture&&(x=(u.backgroundBlurriness>0?e:t).get(x)),x===null?_(a,o):x&&x.isColor&&(_(x,1),v=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,l):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(i.autoClear||v)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Nr)?(h===void 0&&(h=new He(new Ei(1,1,1),new Ce({name:"BackgroundCubeMaterial",uniforms:rs(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:Ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,T,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,h.material.toneMapped=ve.getTransfer(x.colorSpace)!==we,(f!==x||m!==x.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,f=x,m=x.version,d=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new He(new Ti(2,2),new Ce({name:"BackgroundMaterial",uniforms:rs(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=ve.getTransfer(x.colorSpace)!==we,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||m!==x.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=x,m=x.version,d=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,u){p.getRGB(sr,gc(i)),n.buffers.color.setClear(sr.r,sr.g,sr.b,u,l)}return{getClearColor:function(){return a},setClearColor:function(p,u=1){a.set(p),o=u,_(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(p){o=p,_(a,o)},render:g}}function Hf(i,t,e,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),l=n.isWebGL2||r!==null,a={},o=p(null),c=o,h=!1;function f(N,V,O,F,G){let X=!1;if(l){let at=_(F,O,V);c!==at&&(c=at,d(c.object)),X=u(N,F,O,G),X&&v(N,F,O,G)}else{let at=V.wireframe===!0;(c.geometry!==F.id||c.program!==O.id||c.wireframe!==at)&&(c.geometry=F.id,c.program=O.id,c.wireframe=at,X=!0)}G!==null&&e.update(G,i.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,J(N,V,O,F),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function m(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function d(N){return n.isWebGL2?i.bindVertexArray(N):r.bindVertexArrayOES(N)}function g(N){return n.isWebGL2?i.deleteVertexArray(N):r.deleteVertexArrayOES(N)}function _(N,V,O){let F=O.wireframe===!0,G=a[N.id];G===void 0&&(G={},a[N.id]=G);let X=G[V.id];X===void 0&&(X={},G[V.id]=X);let at=X[F];return at===void 0&&(at=p(m()),X[F]=at),at}function p(N){let V=[],O=[],F=[];for(let G=0;G<s;G++)V[G]=0,O[G]=0,F[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:O,attributeDivisors:F,object:N,attributes:{},index:null}}function u(N,V,O,F){let G=c.attributes,X=V.attributes,at=0,j=O.getAttributes();for(let rt in j)if(j[rt].location>=0){let ot=G[rt],yt=X[rt];if(yt===void 0&&(rt==="instanceMatrix"&&N.instanceMatrix&&(yt=N.instanceMatrix),rt==="instanceColor"&&N.instanceColor&&(yt=N.instanceColor)),ot===void 0||ot.attribute!==yt||yt&&ot.data!==yt.data)return!0;at++}return c.attributesNum!==at||c.index!==F}function v(N,V,O,F){let G={},X=V.attributes,at=0,j=O.getAttributes();for(let rt in j)if(j[rt].location>=0){let ot=X[rt];ot===void 0&&(rt==="instanceMatrix"&&N.instanceMatrix&&(ot=N.instanceMatrix),rt==="instanceColor"&&N.instanceColor&&(ot=N.instanceColor));let yt={};yt.attribute=ot,ot&&ot.data&&(yt.data=ot.data),G[rt]=yt,at++}c.attributes=G,c.attributesNum=at,c.index=F}function x(){let N=c.newAttributes;for(let V=0,O=N.length;V<O;V++)N[V]=0}function A(N){P(N,0)}function P(N,V){let O=c.newAttributes,F=c.enabledAttributes,G=c.attributeDivisors;O[N]=1,F[N]===0&&(i.enableVertexAttribArray(N),F[N]=1),G[N]!==V&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,V),G[N]=V)}function T(){let N=c.newAttributes,V=c.enabledAttributes;for(let O=0,F=V.length;O<F;O++)V[O]!==N[O]&&(i.disableVertexAttribArray(O),V[O]=0)}function L(N,V,O,F,G,X,at){at===!0?i.vertexAttribIPointer(N,V,O,G,X):i.vertexAttribPointer(N,V,O,F,G,X)}function J(N,V,O,F){if(n.isWebGL2===!1&&(N.isInstancedMesh||F.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();let G=F.attributes,X=O.getAttributes(),at=V.defaultAttributeValues;for(let j in X){let rt=X[j];if(rt.location>=0){let W=G[j];if(W===void 0&&(j==="instanceMatrix"&&N.instanceMatrix&&(W=N.instanceMatrix),j==="instanceColor"&&N.instanceColor&&(W=N.instanceColor)),W!==void 0){let ot=W.normalized,yt=W.itemSize,Ct=e.get(W);if(Ct===void 0)continue;let Tt=Ct.buffer,Ft=Ct.type,Bt=Ct.bytesPerElement,Dt=n.isWebGL2===!0&&(Ft===i.INT||Ft===i.UNSIGNED_INT||W.gpuType===rc);if(W.isInterleavedBufferAttribute){let Gt=W.data,H=Gt.stride,Et=W.offset;if(Gt.isInstancedInterleavedBuffer){for(let ct=0;ct<rt.locationSize;ct++)P(rt.location+ct,Gt.meshPerAttribute);N.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Gt.meshPerAttribute*Gt.count)}else for(let ct=0;ct<rt.locationSize;ct++)A(rt.location+ct);i.bindBuffer(i.ARRAY_BUFFER,Tt);for(let ct=0;ct<rt.locationSize;ct++)L(rt.location+ct,yt/rt.locationSize,Ft,ot,H*Bt,(Et+yt/rt.locationSize*ct)*Bt,Dt)}else{if(W.isInstancedBufferAttribute){for(let Gt=0;Gt<rt.locationSize;Gt++)P(rt.location+Gt,W.meshPerAttribute);N.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Gt=0;Gt<rt.locationSize;Gt++)A(rt.location+Gt);i.bindBuffer(i.ARRAY_BUFFER,Tt);for(let Gt=0;Gt<rt.locationSize;Gt++)L(rt.location+Gt,yt/rt.locationSize,Ft,ot,yt*Bt,yt/rt.locationSize*Gt*Bt,Dt)}}else if(at!==void 0){let ot=at[j];if(ot!==void 0)switch(ot.length){case 2:i.vertexAttrib2fv(rt.location,ot);break;case 3:i.vertexAttrib3fv(rt.location,ot);break;case 4:i.vertexAttrib4fv(rt.location,ot);break;default:i.vertexAttrib1fv(rt.location,ot)}}}}T()}function b(){tt();for(let N in a){let V=a[N];for(let O in V){let F=V[O];for(let G in F)g(F[G].object),delete F[G];delete V[O]}delete a[N]}}function E(N){if(a[N.id]===void 0)return;let V=a[N.id];for(let O in V){let F=V[O];for(let G in F)g(F[G].object),delete F[G];delete V[O]}delete a[N.id]}function k(N){for(let V in a){let O=a[V];if(O[N.id]===void 0)continue;let F=O[N.id];for(let G in F)g(F[G].object),delete F[G];delete O[N.id]}}function tt(){pt(),h=!0,c!==o&&(c=o,d(c.object))}function pt(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:f,reset:tt,resetDefaultState:pt,dispose:b,releaseStatesOfGeometry:E,releaseStatesOfProgram:k,initAttributes:x,enableAttribute:A,disableUnusedAttributes:T}}function Gf(i,t,e,n){let s=n.isWebGL2,r;function l(h){r=h}function a(h,f){i.drawArrays(r,h,f),e.update(f,r,1)}function o(h,f,m){if(m===0)return;let d,g;if(s)d=i,g="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,h,f,m),e.update(f,r,m)}function c(h,f,m){if(m===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<m;g++)this.render(h[g],f[g]);else{d.multiDrawArraysWEBGL(r,h,0,f,0,m);let g=0;for(let _=0;_<m;_++)g+=f[_];e.update(g,r,1)}}this.setMode=l,this.render=a,this.renderInstances=o,this.renderMultiDraw=c}function Wf(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let L=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",a=e.precision!==void 0?e.precision:"highp",o=r(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let c=l||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),u=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=m>0,A=l||t.has("OES_texture_float"),P=x&&A,T=l?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:l,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:u,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:A,floatVertexTextures:P,maxSamples:T}}function Xf(i){let t=this,e=null,n=0,s=!1,r=!1,l=new Xn,a=new ae,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(f,m){let d=f.length!==0||m||n!==0||s;return s=m,n=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,m){e=h(f,m,0)},this.setState=function(f,m,d){let g=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,u=i.get(f);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{let v=r?0:n,x=v*4,A=u.clippingState||null;o.value=A,A=h(g,m,x,d);for(let P=0;P!==x;++P)A[P]=e[P];u.clippingState=A,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){o.value!==e&&(o.value=e,o.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,m,d,g){let _=f!==null?f.length:0,p=null;if(_!==0){if(p=o.value,g!==!0||p===null){let u=d+_*4,v=m.matrixWorldInverse;a.getNormalMatrix(v),(p===null||p.length<u)&&(p=new Float32Array(u));for(let x=0,A=d;x!==_;++x,A+=4)l.copy(f[x]).applyMatrix4(v,a),l.normal.toArray(p,A),p[A+3]=l.constant}o.value=p,o.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function qf(i){let t=new WeakMap;function e(l,a){return a===Ea?l.mapping=es:a===Ta&&(l.mapping=ns),l}function n(l){if(l&&l.isTexture){let a=l.mapping;if(a===Ea||a===Ta)if(t.has(l)){let o=t.get(l).texture;return e(o,l.mapping)}else{let o=l.image;if(o&&o.height>0){let c=new Fa(o.height/2);return c.fromEquirectangularTexture(i,l),t.set(l,c),l.addEventListener("dispose",s),e(c.texture,l.mapping)}else return null}}return l}function s(l){let a=l.target;a.removeEventListener("dispose",s);let o=t.get(a);o!==void 0&&(t.delete(a),o.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Ss=class extends Ar{constructor(t=-1,e=1,n=1,s=-1,r=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,l=n+t,a=s+e,o=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,l=r+c*this.view.width,a-=h*this.view.offsetY,o=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,l,a,o,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},$i=4,Cl=[.125,.215,.35,.446,.526,.582],Mi=20,_a=new Ss,Pl=new ee,xa=null,va=0,ya=0,vi=(1+Math.sqrt(5))/2,Zi=1/vi,Ll=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,vi,Zi),new I(0,vi,-Zi),new I(Zi,0,vi),new I(-Zi,0,vi),new I(vi,Zi,0),new I(-vi,Zi,0)],Rr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(xa,va,ya),t.scissorTest=!1,rr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===es||t.mapping===ns?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:on,minFilter:on,generateMipmaps:!1,type:bs,format:_n,colorSpace:$n,depthBuffer:!1},s=Il(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Il(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yf(r)),this._blurMaterial=Zf(r,t,e)}return s}_compileMaterial(t){let e=new He(this._lodPlanes[0],t);this._renderer.compile(e,_a)}_sceneToCubeUV(t,e,n,s){let a=new ln(90,1,e,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,m=h.toneMapping;h.getClearColor(Pl),h.toneMapping=ri,h.autoClear=!1;let d=new br({name:"PMREM.Background",side:Ke,depthWrite:!1,depthTest:!1}),g=new He(new Ei,d),_=!1,p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,_=!0):(d.color.copy(Pl),_=!0);for(let u=0;u<6;u++){let v=u%3;v===0?(a.up.set(0,o[u],0),a.lookAt(c[u],0,0)):v===1?(a.up.set(0,0,o[u]),a.lookAt(0,c[u],0)):(a.up.set(0,o[u],0),a.lookAt(0,0,c[u]));let x=this._cubeSize;rr(s,v*x,u>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=m,h.autoClear=f,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===es||t.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ul());let r=s?this._cubemapMaterial:this._equirectMaterial,l=new He(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let o=this._cubeSize;rr(e,0,0,3*o,2*o),n.setRenderTarget(e),n.render(l,_a)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=Ll[(s-1)%Ll.length];this._blur(t,s-1,s,r,l)}e.autoClear=n}_blur(t,e,n,s,r){let l=this._pingPongRenderTarget;this._halfBlur(t,l,e,n,s,"latitudinal",r),this._halfBlur(l,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,l,a){let o=this._renderer,c=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,f=new He(this._lodPlanes[s],c),m=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Mi-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Mi;p>Mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Mi}`);let u=[],v=0;for(let L=0;L<Mi;++L){let J=L/_,b=Math.exp(-J*J/2);u.push(b),L===0?v+=b:L<p&&(v+=2*b)}for(let L=0;L<u.length;L++)u[L]=u[L]/v;m.envMap.value=t.texture,m.samples.value=p,m.weights.value=u,m.latitudinal.value=l==="latitudinal",a&&(m.poleAxis.value=a);let{_lodMax:x}=this;m.dTheta.value=g,m.mipInt.value=x-n;let A=this._sizeLods[s],P=3*A*(s>x-$i?s-x+$i:0),T=4*(this._cubeSize-A);rr(e,P,T,3*A,2*A),o.setRenderTarget(e),o.render(f,_a)}};function Yf(i){let t=[],e=[],n=[],s=i,r=i-$i+1+Cl.length;for(let l=0;l<r;l++){let a=Math.pow(2,s);e.push(a);let o=1/a;l>i-$i?o=Cl[l-i+$i-1]:l===0&&(o=0),n.push(o);let c=1/(a-2),h=-c,f=1+c,m=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,g=6,_=3,p=2,u=1,v=new Float32Array(_*g*d),x=new Float32Array(p*g*d),A=new Float32Array(u*g*d);for(let T=0;T<d;T++){let L=T%3*2/3-1,J=T>2?0:-1,b=[L,J,0,L+2/3,J,0,L+2/3,J+1,0,L,J,0,L+2/3,J+1,0,L,J+1,0];v.set(b,_*g*T),x.set(m,p*g*T);let E=[T,T,T,T,T,T];A.set(E,u*g*T)}let P=new mn;P.setAttribute("position",new pe(v,_)),P.setAttribute("uv",new pe(x,p)),P.setAttribute("faceIndex",new pe(A,u)),t.push(P),s>$i&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Il(i,t,e){let n=new vn(i,t,e);return n.texture.mapping=Nr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function rr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Zf(i,t,e){let n=new Float32Array(Mi),s=new I(0,1,0);return new Ce({name:"SphericalGaussianBlur",defines:{n:Mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Ul(){return new Ce({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Dl(){return new Ce({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function co(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Jf(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let o=a.mapping,c=o===Ea||o===Ta,h=o===es||o===ns;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=t.get(a);return e===null&&(e=new Rr(i)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),t.set(a,f),f.texture}else{if(t.has(a))return t.get(a).texture;{let f=a.image;if(c&&f&&f.height>0||h&&f&&s(f)){e===null&&(e=new Rr(i));let m=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,m),a.addEventListener("dispose",r),m.texture}else return null}}}return a}function s(a){let o=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&o++;return o===c}function r(a){let o=a.target;o.removeEventListener("dispose",r);let c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:l}}function $f(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Kf(i,t,e,n){let s={},r=new WeakMap;function l(f){let m=f.target;m.index!==null&&t.remove(m.index);for(let g in m.attributes)t.remove(m.attributes[g]);for(let g in m.morphAttributes){let _=m.morphAttributes[g];for(let p=0,u=_.length;p<u;p++)t.remove(_[p])}m.removeEventListener("dispose",l),delete s[m.id];let d=r.get(m);d&&(t.remove(d),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function a(f,m){return s[m.id]===!0||(m.addEventListener("dispose",l),s[m.id]=!0,e.memory.geometries++),m}function o(f){let m=f.attributes;for(let g in m)t.update(m[g],i.ARRAY_BUFFER);let d=f.morphAttributes;for(let g in d){let _=d[g];for(let p=0,u=_.length;p<u;p++)t.update(_[p],i.ARRAY_BUFFER)}}function c(f){let m=[],d=f.index,g=f.attributes.position,_=0;if(d!==null){let v=d.array;_=d.version;for(let x=0,A=v.length;x<A;x+=3){let P=v[x+0],T=v[x+1],L=v[x+2];m.push(P,T,T,L,L,P)}}else if(g!==void 0){let v=g.array;_=g.version;for(let x=0,A=v.length/3-1;x<A;x+=3){let P=x+0,T=x+1,L=x+2;m.push(P,T,T,L,L,P)}}else return;let p=new(pc(m)?wr:Sr)(m,1);p.version=_;let u=r.get(f);u&&t.remove(u),r.set(f,p)}function h(f){let m=r.get(f);if(m){let d=f.index;d!==null&&m.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:o,getWireframeAttribute:h}}function jf(i,t,e,n){let s=n.isWebGL2,r;function l(d){r=d}let a,o;function c(d){a=d.type,o=d.bytesPerElement}function h(d,g){i.drawElements(r,g,a,d*o),e.update(g,r,1)}function f(d,g,_){if(_===0)return;let p,u;if(s)p=i,u="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[u](r,g,a,d*o,_),e.update(g,r,_)}function m(d,g,_){if(_===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<_;u++)this.render(d[u]/o,g[u]);else{p.multiDrawElementsWEBGL(r,g,0,a,d,0,_);let u=0;for(let v=0;v<_;v++)u+=g[v];e.update(u,r,1)}}this.setMode=l,this.setIndex=c,this.render=h,this.renderInstances=f,this.renderMultiDraw=m}function Qf(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,l,a){switch(e.calls++,l){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function tp(i,t){return i[0]-t[0]}function ep(i,t){return Math.abs(t[1])-Math.abs(i[1])}function np(i,t,e){let n={},s=new Float32Array(8),r=new WeakMap,l=new ke,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function o(c,h,f){let m=c.morphTargetInfluences;if(t.isWebGL2===!0){let d=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=d!==void 0?d.length:0,_=r.get(h);if(_===void 0||_.count!==g){let N=function(){tt.dispose(),r.delete(h),h.removeEventListener("dispose",N)};_!==void 0&&_.texture.dispose();let v=h.morphAttributes.position!==void 0,x=h.morphAttributes.normal!==void 0,A=h.morphAttributes.color!==void 0,P=h.morphAttributes.position||[],T=h.morphAttributes.normal||[],L=h.morphAttributes.color||[],J=0;v===!0&&(J=1),x===!0&&(J=2),A===!0&&(J=3);let b=h.attributes.position.count*J,E=1;b>t.maxTextureSize&&(E=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let k=new Float32Array(b*E*4*g),tt=new xr(k,b,E,g);tt.type=Yn,tt.needsUpdate=!0;let pt=J*4;for(let V=0;V<g;V++){let O=P[V],F=T[V],G=L[V],X=b*E*4*V;for(let at=0;at<O.count;at++){let j=at*pt;v===!0&&(l.fromBufferAttribute(O,at),k[X+j+0]=l.x,k[X+j+1]=l.y,k[X+j+2]=l.z,k[X+j+3]=0),x===!0&&(l.fromBufferAttribute(F,at),k[X+j+4]=l.x,k[X+j+5]=l.y,k[X+j+6]=l.z,k[X+j+7]=0),A===!0&&(l.fromBufferAttribute(G,at),k[X+j+8]=l.x,k[X+j+9]=l.y,k[X+j+10]=l.z,k[X+j+11]=G.itemSize===4?l.w:1)}}_={count:g,texture:tt,size:new ge(b,E)},r.set(h,_),h.addEventListener("dispose",N)}let p=0;for(let v=0;v<m.length;v++)p+=m[v];let u=h.morphTargetsRelative?1:1-p;f.getUniforms().setValue(i,"morphTargetBaseInfluence",u),f.getUniforms().setValue(i,"morphTargetInfluences",m),f.getUniforms().setValue(i,"morphTargetsTexture",_.texture,e),f.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{let d=m===void 0?0:m.length,g=n[h.id];if(g===void 0||g.length!==d){g=[];for(let x=0;x<d;x++)g[x]=[x,0];n[h.id]=g}for(let x=0;x<d;x++){let A=g[x];A[0]=x,A[1]=m[x]}g.sort(ep);for(let x=0;x<8;x++)x<d&&g[x][1]?(a[x][0]=g[x][0],a[x][1]=g[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(tp);let _=h.morphAttributes.position,p=h.morphAttributes.normal,u=0;for(let x=0;x<8;x++){let A=a[x],P=A[0],T=A[1];P!==Number.MAX_SAFE_INTEGER&&T?(_&&h.getAttribute("morphTarget"+x)!==_[P]&&h.setAttribute("morphTarget"+x,_[P]),p&&h.getAttribute("morphNormal"+x)!==p[P]&&h.setAttribute("morphNormal"+x,p[P]),s[x]=T,u+=T):(_&&h.hasAttribute("morphTarget"+x)===!0&&h.deleteAttribute("morphTarget"+x),p&&h.hasAttribute("morphNormal"+x)===!0&&h.deleteAttribute("morphNormal"+x),s[x]=0)}let v=h.morphTargetsRelative?1:1-u;f.getUniforms().setValue(i,"morphTargetBaseInfluence",v),f.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:o}}function ip(i,t,e,n){let s=new WeakMap;function r(o){let c=n.render.frame,h=o.geometry,f=t.get(o,h);if(s.get(f)!==c&&(t.update(f),s.set(f,c)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),s.get(o)!==c&&(e.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&e.update(o.instanceColor,i.ARRAY_BUFFER),s.set(o,c))),o.isSkinnedMesh){let m=o.skeleton;s.get(m)!==c&&(m.update(),s.set(m,c))}return f}function l(){s=new WeakMap}function a(o){let c=o.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:l}}var Cr=class extends pn{constructor(t,e,n,s,r,l,a,o,c,h){if(h=h!==void 0?h:Si,h!==Si&&h!==is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Si&&(n=ii),n===void 0&&h===is&&(n=bi),super(null,s,r,l,a,o,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:$e,this.minFilter=o!==void 0?o:$e,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},xc=new pn,vc=new Cr(1,1);vc.compareFunction=fc;var yc=new xr,Mc=new Na,bc=new Er,Nl=[],Ol=[],Fl=new Float32Array(16),Bl=new Float32Array(9),zl=new Float32Array(4);function os(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Nl[s];if(r===void 0&&(r=new Float32Array(s),Nl[s]=r),t!==0){n.toArray(r,0);for(let l=1,a=0;l!==t;++l)a+=e,i[l].toArray(r,a)}return r}function Ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function We(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Fr(i,t){let e=Ol[t];e===void 0&&(e=new Int32Array(t),Ol[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function sp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function rp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2fv(this.addr,t),We(e,t)}}function ap(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;i.uniform3fv(this.addr,t),We(e,t)}}function op(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4fv(this.addr,t),We(e,t)}}function lp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;zl.set(n),i.uniformMatrix2fv(this.addr,!1,zl),We(e,n)}}function cp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;Bl.set(n),i.uniformMatrix3fv(this.addr,!1,Bl),We(e,n)}}function hp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;Fl.set(n),i.uniformMatrix4fv(this.addr,!1,Fl),We(e,n)}}function up(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function dp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2iv(this.addr,t),We(e,t)}}function fp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;i.uniform3iv(this.addr,t),We(e,t)}}function pp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4iv(this.addr,t),We(e,t)}}function mp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function gp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;i.uniform2uiv(this.addr,t),We(e,t)}}function _p(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;i.uniform3uiv(this.addr,t),We(e,t)}}function xp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;i.uniform4uiv(this.addr,t),We(e,t)}}function vp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?vc:xc;e.setTexture2D(t||r,s)}function yp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Mc,s)}function Mp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||bc,s)}function bp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||yc,s)}function Sp(i){switch(i){case 5126:return sp;case 35664:return rp;case 35665:return ap;case 35666:return op;case 35674:return lp;case 35675:return cp;case 35676:return hp;case 5124:case 35670:return up;case 35667:case 35671:return dp;case 35668:case 35672:return fp;case 35669:case 35673:return pp;case 5125:return mp;case 36294:return gp;case 36295:return _p;case 36296:return xp;case 35678:case 36198:case 36298:case 36306:case 35682:return vp;case 35679:case 36299:case 36307:return yp;case 35680:case 36300:case 36308:case 36293:return Mp;case 36289:case 36303:case 36311:case 36292:return bp}}function wp(i,t){i.uniform1fv(this.addr,t)}function Ap(i,t){let e=os(t,this.size,2);i.uniform2fv(this.addr,e)}function Ep(i,t){let e=os(t,this.size,3);i.uniform3fv(this.addr,e)}function Tp(i,t){let e=os(t,this.size,4);i.uniform4fv(this.addr,e)}function Rp(i,t){let e=os(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Cp(i,t){let e=os(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Pp(i,t){let e=os(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Lp(i,t){i.uniform1iv(this.addr,t)}function Ip(i,t){i.uniform2iv(this.addr,t)}function Up(i,t){i.uniform3iv(this.addr,t)}function Dp(i,t){i.uniform4iv(this.addr,t)}function Np(i,t){i.uniform1uiv(this.addr,t)}function Op(i,t){i.uniform2uiv(this.addr,t)}function Fp(i,t){i.uniform3uiv(this.addr,t)}function Bp(i,t){i.uniform4uiv(this.addr,t)}function zp(i,t,e){let n=this.cache,s=t.length,r=Fr(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let l=0;l!==s;++l)e.setTexture2D(t[l]||xc,r[l])}function kp(i,t,e){let n=this.cache,s=t.length,r=Fr(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let l=0;l!==s;++l)e.setTexture3D(t[l]||Mc,r[l])}function Vp(i,t,e){let n=this.cache,s=t.length,r=Fr(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let l=0;l!==s;++l)e.setTextureCube(t[l]||bc,r[l])}function Hp(i,t,e){let n=this.cache,s=t.length,r=Fr(e,s);Ge(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let l=0;l!==s;++l)e.setTexture2DArray(t[l]||yc,r[l])}function Gp(i){switch(i){case 5126:return wp;case 35664:return Ap;case 35665:return Ep;case 35666:return Tp;case 35674:return Rp;case 35675:return Cp;case 35676:return Pp;case 5124:case 35670:return Lp;case 35667:case 35671:return Ip;case 35668:case 35672:return Up;case 35669:case 35673:return Dp;case 5125:return Np;case 36294:return Op;case 36295:return Fp;case 36296:return Bp;case 35678:case 36198:case 36298:case 36306:case 35682:return zp;case 35679:case 36299:case 36307:return kp;case 35680:case 36300:case 36308:case 36293:return Vp;case 36289:case 36303:case 36311:case 36292:return Hp}}var Ba=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Sp(e.type)}},za=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gp(e.type)}},ka=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,l=s.length;r!==l;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Ma=/(\w+)(\])?(\[|\.)?/g;function kl(i,t){i.seq.push(t),i.map[t.id]=t}function Wp(i,t,e){let n=i.name,s=n.length;for(Ma.lastIndex=0;;){let r=Ma.exec(n),l=Ma.lastIndex,a=r[1],o=r[2]==="]",c=r[3];if(o&&(a=a|0),c===void 0||c==="["&&l+2===s){kl(e,c===void 0?new Ba(a,i,t):new za(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new ka(a),kl(e,f)),e=f}}}var ts=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),l=t.getUniformLocation(e,r.name);Wp(r,l,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,l=e.length;r!==l;++r){let a=e[r],o=n[a.id];o.needsUpdate!==!1&&a.setValue(t,o.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let l=t[s];l.id in e&&n.push(l)}return n}};function Vl(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Xp=37297,qp=0;function Yp(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let l=s;l<r;l++){let a=l+1;n.push(`${a===t?">":" "} ${a}: ${e[l]}`)}return n.join(`
`)}function Zp(i){let t=ve.getPrimaries(ve.workingColorSpace),e=ve.getPrimaries(i),n;switch(t===e?n="":t===fr&&e===dr?n="LinearDisplayP3ToLinearSRGB":t===dr&&e===fr&&(n="LinearSRGBToLinearDisplayP3"),i){case $n:case Or:return[n,"LinearTransferOETF"];case ze:case lo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Hl(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let l=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Yp(i.getShaderSource(t),l)}else return s}function Jp(i,t){let e=Zp(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function $p(i,t){let e;switch(t){case uh:e="Linear";break;case dh:e="Reinhard";break;case fh:e="OptimizedCineon";break;case ph:e="ACESFilmic";break;case gh:e="AgX";break;case mh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Kp(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ki).join(`
`)}function jp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ki).join(`
`)}function Qp(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function tm(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),l=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[l]={type:r.type,location:i.getAttribLocation(t,l),locationSize:a}}return e}function Ki(i){return i!==""}function Gl(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var em=/^[ \t]*#include +<([\w\d./]+)>/gm;function Va(i){return i.replace(em,im)}var nm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function im(i,t){let e=re[t];if(e===void 0){let n=nm.get(t);if(n!==void 0)e=re[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Va(e)}var sm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xl(i){return i.replace(sm,rm)}function rm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ql(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function am(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===nc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===zc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Wn&&(t="SHADOWMAP_TYPE_VSM"),t}function om(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case es:case ns:t="ENVMAP_TYPE_CUBE";break;case Nr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function lm(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ns:t="ENVMAP_MODE_REFRACTION";break}return t}function cm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ic:t="ENVMAP_BLENDING_MULTIPLY";break;case ch:t="ENVMAP_BLENDING_MIX";break;case hh:t="ENVMAP_BLENDING_ADD";break}return t}function hm(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function um(i,t,e,n){let s=i.getContext(),r=e.defines,l=e.vertexShader,a=e.fragmentShader,o=am(e),c=om(e),h=lm(e),f=cm(e),m=hm(e),d=e.isWebGL2?"":Kp(e),g=jp(e),_=Qp(r),p=s.createProgram(),u,v,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ki).join(`
`),u.length>0&&(u+=`
`),v=[d,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ki).join(`
`),v.length>0&&(v+=`
`)):(u=[ql(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+o:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ki).join(`
`),v=[d,ql(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+o:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?re.tonemapping_pars_fragment:"",e.toneMapping!==ri?$p("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",re.colorspace_pars_fragment,Jp("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ki).join(`
`)),l=Va(l),l=Gl(l,e),l=Wl(l,e),a=Va(a),a=Gl(a,e),a=Wl(a,e),l=Xl(l),a=Xl(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,u=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,v=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===ul?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ul?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let A=x+u+l,P=x+v+a,T=Vl(s,s.VERTEX_SHADER,A),L=Vl(s,s.FRAGMENT_SHADER,P);s.attachShader(p,T),s.attachShader(p,L),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function J(tt){if(i.debug.checkShaderErrors){let pt=s.getProgramInfoLog(p).trim(),N=s.getShaderInfoLog(T).trim(),V=s.getShaderInfoLog(L).trim(),O=!0,F=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,T,L);else{let G=Hl(s,T,"vertex"),X=Hl(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+pt+`
`+G+`
`+X)}else pt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",pt):(N===""||V==="")&&(F=!1);F&&(tt.diagnostics={runnable:O,programLog:pt,vertexShader:{log:N,prefix:u},fragmentShader:{log:V,prefix:v}})}s.deleteShader(T),s.deleteShader(L),b=new ts(s,p),E=tm(s,p)}let b;this.getUniforms=function(){return b===void 0&&J(this),b};let E;this.getAttributes=function(){return E===void 0&&J(this),E};let k=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(p,Xp)),k},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=qp++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=T,this.fragmentShader=L,this}var dm=0,Ha=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),l=this._getShaderCacheForMaterial(t);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(r)===!1&&(l.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ga(t),e.set(t,n)),n}},Ga=class{constructor(t){this.id=dm++,this.code=t,this.usedTimes=0}};function fm(i,t,e,n,s,r,l){let a=new Mr,o=new Ha,c=[],h=s.isWebGL2,f=s.logarithmicDepthBuffer,m=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return b===0?"uv":`uv${b}`}function p(b,E,k,tt,pt){let N=tt.fog,V=pt.geometry,O=b.isMeshStandardMaterial?tt.environment:null,F=(b.isMeshStandardMaterial?e:t).get(b.envMap||O),G=F&&F.mapping===Nr?F.image.height:null,X=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let at=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,j=at!==void 0?at.length:0,rt=0;V.morphAttributes.position!==void 0&&(rt=1),V.morphAttributes.normal!==void 0&&(rt=2),V.morphAttributes.color!==void 0&&(rt=3);let W,ot,yt,Ct;if(X){let le=Un[X];W=le.vertexShader,ot=le.fragmentShader}else W=b.vertexShader,ot=b.fragmentShader,o.update(b),yt=o.getVertexShaderID(b),Ct=o.getFragmentShaderID(b);let Tt=i.getRenderTarget(),Ft=pt.isInstancedMesh===!0,Bt=pt.isBatchedMesh===!0,Dt=!!b.map,Gt=!!b.matcap,H=!!F,Et=!!b.aoMap,ct=!!b.lightMap,St=!!b.bumpMap,dt=!!b.normalMap,Ot=!!b.displacementMap,wt=!!b.emissiveMap,S=!!b.metalnessMap,M=!!b.roughnessMap,B=b.anisotropy>0,Q=b.clearcoat>0,et=b.iridescence>0,it=b.sheen>0,_t=b.transmission>0,lt=B&&!!b.anisotropyMap,ft=Q&&!!b.clearcoatMap,At=Q&&!!b.clearcoatNormalMap,It=Q&&!!b.clearcoatRoughnessMap,nt=et&&!!b.iridescenceMap,Yt=et&&!!b.iridescenceThicknessMap,Pt=it&&!!b.sheenColorMap,Lt=it&&!!b.sheenRoughnessMap,Nt=!!b.specularMap,xt=!!b.specularColorMap,Ut=!!b.specularIntensityMap,kt=_t&&!!b.transmissionMap,ce=_t&&!!b.thicknessMap,Wt=!!b.gradientMap,gt=!!b.alphaMap,U=b.alphaTest>0,ht=!!b.alphaHash,Mt=!!b.extensions,Vt=!!V.attributes.uv1,zt=!!V.attributes.uv2,de=!!V.attributes.uv3,me=ri;return b.toneMapped&&(Tt===null||Tt.isXRRenderTarget===!0)&&(me=i.toneMapping),{isWebGL2:h,shaderID:X,shaderType:b.type,shaderName:b.name,vertexShader:W,fragmentShader:ot,defines:b.defines,customVertexShaderID:yt,customFragmentShaderID:Ct,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Bt,instancing:Ft,instancingColor:Ft&&pt.instanceColor!==null,supportsVertexTextures:m,outputColorSpace:Tt===null?i.outputColorSpace:Tt.isXRRenderTarget===!0?Tt.texture.colorSpace:$n,map:Dt,matcap:Gt,envMap:H,envMapMode:H&&F.mapping,envMapCubeUVHeight:G,aoMap:Et,lightMap:ct,bumpMap:St,normalMap:dt,displacementMap:m&&Ot,emissiveMap:wt,normalMapObjectSpace:dt&&b.normalMapType===Ph,normalMapTangentSpace:dt&&b.normalMapType===Ch,metalnessMap:S,roughnessMap:M,anisotropy:B,anisotropyMap:lt,clearcoat:Q,clearcoatMap:ft,clearcoatNormalMap:At,clearcoatRoughnessMap:It,iridescence:et,iridescenceMap:nt,iridescenceThicknessMap:Yt,sheen:it,sheenColorMap:Pt,sheenRoughnessMap:Lt,specularMap:Nt,specularColorMap:xt,specularIntensityMap:Ut,transmission:_t,transmissionMap:kt,thicknessMap:ce,gradientMap:Wt,opaque:b.transparent===!1&&b.blending===ji,alphaMap:gt,alphaTest:U,alphaHash:ht,combine:b.combine,mapUv:Dt&&_(b.map.channel),aoMapUv:Et&&_(b.aoMap.channel),lightMapUv:ct&&_(b.lightMap.channel),bumpMapUv:St&&_(b.bumpMap.channel),normalMapUv:dt&&_(b.normalMap.channel),displacementMapUv:Ot&&_(b.displacementMap.channel),emissiveMapUv:wt&&_(b.emissiveMap.channel),metalnessMapUv:S&&_(b.metalnessMap.channel),roughnessMapUv:M&&_(b.roughnessMap.channel),anisotropyMapUv:lt&&_(b.anisotropyMap.channel),clearcoatMapUv:ft&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:At&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:It&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&_(b.sheenRoughnessMap.channel),specularMapUv:Nt&&_(b.specularMap.channel),specularColorMapUv:xt&&_(b.specularColorMap.channel),specularIntensityMapUv:Ut&&_(b.specularIntensityMap.channel),transmissionMapUv:kt&&_(b.transmissionMap.channel),thicknessMapUv:ce&&_(b.thicknessMap.channel),alphaMapUv:gt&&_(b.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(dt||B),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,vertexUv1s:Vt,vertexUv2s:zt,vertexUv3s:de,pointsUvs:pt.isPoints===!0&&!!V.attributes.uv&&(Dt||gt),fog:!!N,useFog:b.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:pt.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:rt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&k.length>0,shadowMapType:i.shadowMap.type,toneMapping:me,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Dt&&b.map.isVideoTexture===!0&&ve.getTransfer(b.map.colorSpace)===we,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===En,flipSided:b.side===Ke,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:Mt&&b.extensions.derivatives===!0,extensionFragDepth:Mt&&b.extensions.fragDepth===!0,extensionDrawBuffers:Mt&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:Mt&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Mt&&b.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function u(b){let E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(let k in b.defines)E.push(k),E.push(b.defines[k]);return b.isRawShaderMaterial===!1&&(v(E,b),x(E,b),E.push(i.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function v(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function x(b,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),b.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),b.push(a.mask)}function A(b){let E=g[b.type],k;if(E){let tt=Un[E];k=eu.clone(tt.uniforms)}else k=b.uniforms;return k}function P(b,E){let k;for(let tt=0,pt=c.length;tt<pt;tt++){let N=c[tt];if(N.cacheKey===E){k=N,++k.usedTimes;break}}return k===void 0&&(k=new um(i,E,b,r),c.push(k)),k}function T(b){if(--b.usedTimes===0){let E=c.indexOf(b);c[E]=c[c.length-1],c.pop(),b.destroy()}}function L(b){o.remove(b)}function J(){o.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:A,acquireProgram:P,releaseProgram:T,releaseShaderCache:L,programs:c,dispose:J}}function pm(){let i=new WeakMap;function t(r){let l=i.get(r);return l===void 0&&(l={},i.set(r,l)),l}function e(r){i.delete(r)}function n(r,l,a){i.get(r)[l]=a}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function mm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Yl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Zl(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function l(f,m,d,g,_,p){let u=i[t];return u===void 0?(u={id:f.id,object:f,geometry:m,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:p},i[t]=u):(u.id=f.id,u.object=f,u.geometry=m,u.material=d,u.groupOrder=g,u.renderOrder=f.renderOrder,u.z=_,u.group=p),t++,u}function a(f,m,d,g,_,p){let u=l(f,m,d,g,_,p);d.transmission>0?n.push(u):d.transparent===!0?s.push(u):e.push(u)}function o(f,m,d,g,_,p){let u=l(f,m,d,g,_,p);d.transmission>0?n.unshift(u):d.transparent===!0?s.unshift(u):e.unshift(u)}function c(f,m){e.length>1&&e.sort(f||mm),n.length>1&&n.sort(m||Yl),s.length>1&&s.sort(m||Yl)}function h(){for(let f=t,m=i.length;f<m;f++){let d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:o,finish:h,sort:c}}function gm(){let i=new WeakMap;function t(n,s){let r=i.get(n),l;return r===void 0?(l=new Zl,i.set(n,[l])):s>=r.length?(l=new Zl,r.push(l)):l=r[s],l}function e(){i=new WeakMap}return{get:t,dispose:e}}function _m(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new ee};break;case"SpotLight":e={position:new I,direction:new I,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function xm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var vm=0;function ym(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Mm(i,t){let e=new _m,n=xm(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new I);let r=new I,l=new ye,a=new ye;function o(h,f){let m=0,d=0,g=0;for(let tt=0;tt<9;tt++)s.probe[tt].set(0,0,0);let _=0,p=0,u=0,v=0,x=0,A=0,P=0,T=0,L=0,J=0,b=0;h.sort(ym);let E=f===!0?Math.PI:1;for(let tt=0,pt=h.length;tt<pt;tt++){let N=h[tt],V=N.color,O=N.intensity,F=N.distance,G=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)m+=V.r*O*E,d+=V.g*O*E,g+=V.b*O*E;else if(N.isLightProbe){for(let X=0;X<9;X++)s.probe[X].addScaledVector(N.sh.coefficients[X],O);b++}else if(N.isDirectionalLight){let X=e.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity*E),N.castShadow){let at=N.shadow,j=n.get(N);j.shadowBias=at.bias,j.shadowNormalBias=at.normalBias,j.shadowRadius=at.radius,j.shadowMapSize=at.mapSize,s.directionalShadow[_]=j,s.directionalShadowMap[_]=G,s.directionalShadowMatrix[_]=N.shadow.matrix,A++}s.directional[_]=X,_++}else if(N.isSpotLight){let X=e.get(N);X.position.setFromMatrixPosition(N.matrixWorld),X.color.copy(V).multiplyScalar(O*E),X.distance=F,X.coneCos=Math.cos(N.angle),X.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),X.decay=N.decay,s.spot[u]=X;let at=N.shadow;if(N.map&&(s.spotLightMap[L]=N.map,L++,at.updateMatrices(N),N.castShadow&&J++),s.spotLightMatrix[u]=at.matrix,N.castShadow){let j=n.get(N);j.shadowBias=at.bias,j.shadowNormalBias=at.normalBias,j.shadowRadius=at.radius,j.shadowMapSize=at.mapSize,s.spotShadow[u]=j,s.spotShadowMap[u]=G,T++}u++}else if(N.isRectAreaLight){let X=e.get(N);X.color.copy(V).multiplyScalar(O),X.halfWidth.set(N.width*.5,0,0),X.halfHeight.set(0,N.height*.5,0),s.rectArea[v]=X,v++}else if(N.isPointLight){let X=e.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity*E),X.distance=N.distance,X.decay=N.decay,N.castShadow){let at=N.shadow,j=n.get(N);j.shadowBias=at.bias,j.shadowNormalBias=at.normalBias,j.shadowRadius=at.radius,j.shadowMapSize=at.mapSize,j.shadowCameraNear=at.camera.near,j.shadowCameraFar=at.camera.far,s.pointShadow[p]=j,s.pointShadowMap[p]=G,s.pointShadowMatrix[p]=N.shadow.matrix,P++}s.point[p]=X,p++}else if(N.isHemisphereLight){let X=e.get(N);X.skyColor.copy(N.color).multiplyScalar(O*E),X.groundColor.copy(N.groundColor).multiplyScalar(O*E),s.hemi[x]=X,x++}}v>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=bt.LTC_FLOAT_1,s.rectAreaLTC2=bt.LTC_FLOAT_2):(s.rectAreaLTC1=bt.LTC_HALF_1,s.rectAreaLTC2=bt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=bt.LTC_FLOAT_1,s.rectAreaLTC2=bt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=bt.LTC_HALF_1,s.rectAreaLTC2=bt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=m,s.ambient[1]=d,s.ambient[2]=g;let k=s.hash;(k.directionalLength!==_||k.pointLength!==p||k.spotLength!==u||k.rectAreaLength!==v||k.hemiLength!==x||k.numDirectionalShadows!==A||k.numPointShadows!==P||k.numSpotShadows!==T||k.numSpotMaps!==L||k.numLightProbes!==b)&&(s.directional.length=_,s.spot.length=u,s.rectArea.length=v,s.point.length=p,s.hemi.length=x,s.directionalShadow.length=A,s.directionalShadowMap.length=A,s.pointShadow.length=P,s.pointShadowMap.length=P,s.spotShadow.length=T,s.spotShadowMap.length=T,s.directionalShadowMatrix.length=A,s.pointShadowMatrix.length=P,s.spotLightMatrix.length=T+L-J,s.spotLightMap.length=L,s.numSpotLightShadowsWithMaps=J,s.numLightProbes=b,k.directionalLength=_,k.pointLength=p,k.spotLength=u,k.rectAreaLength=v,k.hemiLength=x,k.numDirectionalShadows=A,k.numPointShadows=P,k.numSpotShadows=T,k.numSpotMaps=L,k.numLightProbes=b,s.version=vm++)}function c(h,f){let m=0,d=0,g=0,_=0,p=0,u=f.matrixWorldInverse;for(let v=0,x=h.length;v<x;v++){let A=h[v];if(A.isDirectionalLight){let P=s.directional[m];P.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(u),m++}else if(A.isSpotLight){let P=s.spot[g];P.position.setFromMatrixPosition(A.matrixWorld),P.position.applyMatrix4(u),P.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(u),g++}else if(A.isRectAreaLight){let P=s.rectArea[_];P.position.setFromMatrixPosition(A.matrixWorld),P.position.applyMatrix4(u),a.identity(),l.copy(A.matrixWorld),l.premultiply(u),a.extractRotation(l),P.halfWidth.set(A.width*.5,0,0),P.halfHeight.set(0,A.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),_++}else if(A.isPointLight){let P=s.point[d];P.position.setFromMatrixPosition(A.matrixWorld),P.position.applyMatrix4(u),d++}else if(A.isHemisphereLight){let P=s.hemi[p];P.direction.setFromMatrixPosition(A.matrixWorld),P.direction.transformDirection(u),p++}}}return{setup:o,setupView:c,state:s}}function Jl(i,t){let e=new Mm(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function l(f){n.push(f)}function a(f){s.push(f)}function o(f){e.setup(n,f)}function c(f){e.setupView(n,f)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:o,setupLightsView:c,pushLight:l,pushShadow:a}}function bm(i,t){let e=new WeakMap;function n(r,l=0){let a=e.get(r),o;return a===void 0?(o=new Jl(i,t),e.set(r,[o])):l>=a.length?(o=new Jl(i,t),a.push(o)):o=a[l],o}function s(){e=new WeakMap}return{get:n,dispose:s}}var Wa=class extends ss{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Th,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Xa=class extends ss{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Sm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Am(i,t,e){let n=new Tr,s=new ge,r=new ge,l=new ke,a=new Wa({depthPacking:Rh}),o=new Xa,c={},h=e.maxTextureSize,f={[ai]:Ke,[Ke]:ai,[En]:En},m=new Ce({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:Sm,fragmentShader:wm}),d=m.clone();d.defines.HORIZONTAL_PASS=1;let g=new mn;g.setAttribute("position",new pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new He(g,m),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nc;let u=this.type;this.render=function(T,L,J){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;let b=i.getRenderTarget(),E=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),tt=i.state;tt.setBlending(si),tt.buffers.color.setClear(1,1,1,1),tt.buffers.depth.setTest(!0),tt.setScissorTest(!1);let pt=u!==Wn&&this.type===Wn,N=u===Wn&&this.type!==Wn;for(let V=0,O=T.length;V<O;V++){let F=T[V],G=F.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",F,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let X=G.getFrameExtents();if(s.multiply(X),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/X.x),s.x=r.x*X.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/X.y),s.y=r.y*X.y,G.mapSize.y=r.y)),G.map===null||pt===!0||N===!0){let j=this.type!==Wn?{minFilter:$e,magFilter:$e}:{};G.map!==null&&G.map.dispose(),G.map=new vn(s.x,s.y,j),G.map.texture.name=F.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();let at=G.getViewportCount();for(let j=0;j<at;j++){let rt=G.getViewport(j);l.set(r.x*rt.x,r.y*rt.y,r.x*rt.z,r.y*rt.w),tt.viewport(l),G.updateMatrices(F,j),n=G.getFrustum(),A(L,J,G.camera,F,this.type)}G.isPointLightShadow!==!0&&this.type===Wn&&v(G,J),G.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(b,E,k)};function v(T,L){let J=t.update(_);m.defines.VSM_SAMPLES!==T.blurSamples&&(m.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,m.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new vn(s.x,s.y)),m.uniforms.shadow_pass.value=T.map.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(L,null,J,m,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(L,null,J,d,_,null)}function x(T,L,J,b){let E=null,k=J.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(k!==void 0)E=k;else if(E=J.isPointLight===!0?o:a,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){let tt=E.uuid,pt=L.uuid,N=c[tt];N===void 0&&(N={},c[tt]=N);let V=N[pt];V===void 0&&(V=E.clone(),N[pt]=V,L.addEventListener("dispose",P)),E=V}if(E.visible=L.visible,E.wireframe=L.wireframe,b===Wn?E.side=L.shadowSide!==null?L.shadowSide:L.side:E.side=L.shadowSide!==null?L.shadowSide:f[L.side],E.alphaMap=L.alphaMap,E.alphaTest=L.alphaTest,E.map=L.map,E.clipShadows=L.clipShadows,E.clippingPlanes=L.clippingPlanes,E.clipIntersection=L.clipIntersection,E.displacementMap=L.displacementMap,E.displacementScale=L.displacementScale,E.displacementBias=L.displacementBias,E.wireframeLinewidth=L.wireframeLinewidth,E.linewidth=L.linewidth,J.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let tt=i.properties.get(E);tt.light=J}return E}function A(T,L,J,b,E){if(T.visible===!1)return;if(T.layers.test(L.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===Wn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld);let pt=t.update(T),N=T.material;if(Array.isArray(N)){let V=pt.groups;for(let O=0,F=V.length;O<F;O++){let G=V[O],X=N[G.materialIndex];if(X&&X.visible){let at=x(T,X,b,E);T.onBeforeShadow(i,T,L,J,pt,at,G),i.renderBufferDirect(J,null,pt,at,T,G),T.onAfterShadow(i,T,L,J,pt,at,G)}}}else if(N.visible){let V=x(T,N,b,E);T.onBeforeShadow(i,T,L,J,pt,V,null),i.renderBufferDirect(J,null,pt,V,T,null),T.onAfterShadow(i,T,L,J,pt,V,null)}}let tt=T.children;for(let pt=0,N=tt.length;pt<N;pt++)A(tt[pt],L,J,b,E)}function P(T){T.target.removeEventListener("dispose",P);for(let J in c){let b=c[J],E=T.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}function Em(i,t,e){let n=e.isWebGL2;function s(){let U=!1,ht=new ke,Mt=null,Vt=new ke(0,0,0,0);return{setMask:function(zt){Mt!==zt&&!U&&(i.colorMask(zt,zt,zt,zt),Mt=zt)},setLocked:function(zt){U=zt},setClear:function(zt,de,me,Ue,le){le===!0&&(zt*=Ue,de*=Ue,me*=Ue),ht.set(zt,de,me,Ue),Vt.equals(ht)===!1&&(i.clearColor(zt,de,me,Ue),Vt.copy(ht))},reset:function(){U=!1,Mt=null,Vt.set(-1,0,0,0)}}}function r(){let U=!1,ht=null,Mt=null,Vt=null;return{setTest:function(zt){zt?Bt(i.DEPTH_TEST):Dt(i.DEPTH_TEST)},setMask:function(zt){ht!==zt&&!U&&(i.depthMask(zt),ht=zt)},setFunc:function(zt){if(Mt!==zt){switch(zt){case nh:i.depthFunc(i.NEVER);break;case ih:i.depthFunc(i.ALWAYS);break;case sh:i.depthFunc(i.LESS);break;case lr:i.depthFunc(i.LEQUAL);break;case rh:i.depthFunc(i.EQUAL);break;case ah:i.depthFunc(i.GEQUAL);break;case oh:i.depthFunc(i.GREATER);break;case lh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=zt}},setLocked:function(zt){U=zt},setClear:function(zt){Vt!==zt&&(i.clearDepth(zt),Vt=zt)},reset:function(){U=!1,ht=null,Mt=null,Vt=null}}}function l(){let U=!1,ht=null,Mt=null,Vt=null,zt=null,de=null,me=null,Ue=null,le=null;return{setTest:function(_e){U||(_e?Bt(i.STENCIL_TEST):Dt(i.STENCIL_TEST))},setMask:function(_e){ht!==_e&&!U&&(i.stencilMask(_e),ht=_e)},setFunc:function(_e,Je,hn){(Mt!==_e||Vt!==Je||zt!==hn)&&(i.stencilFunc(_e,Je,hn),Mt=_e,Vt=Je,zt=hn)},setOp:function(_e,Je,hn){(de!==_e||me!==Je||Ue!==hn)&&(i.stencilOp(_e,Je,hn),de=_e,me=Je,Ue=hn)},setLocked:function(_e){U=_e},setClear:function(_e){le!==_e&&(i.clearStencil(_e),le=_e)},reset:function(){U=!1,ht=null,Mt=null,Vt=null,zt=null,de=null,me=null,Ue=null,le=null}}}let a=new s,o=new r,c=new l,h=new WeakMap,f=new WeakMap,m={},d={},g=new WeakMap,_=[],p=null,u=!1,v=null,x=null,A=null,P=null,T=null,L=null,J=null,b=new ee(0,0,0),E=0,k=!1,tt=null,pt=null,N=null,V=null,O=null,F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,X=0,at=i.getParameter(i.VERSION);at.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(at)[1]),G=X>=1):at.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(at)[1]),G=X>=2);let j=null,rt={},W=i.getParameter(i.SCISSOR_BOX),ot=i.getParameter(i.VIEWPORT),yt=new ke().fromArray(W),Ct=new ke().fromArray(ot);function Tt(U,ht,Mt,Vt){let zt=new Uint8Array(4),de=i.createTexture();i.bindTexture(U,de),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let me=0;me<Mt;me++)n&&(U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY)?i.texImage3D(ht,0,i.RGBA,1,1,Vt,0,i.RGBA,i.UNSIGNED_BYTE,zt):i.texImage2D(ht+me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,zt);return de}let Ft={};Ft[i.TEXTURE_2D]=Tt(i.TEXTURE_2D,i.TEXTURE_2D,1),Ft[i.TEXTURE_CUBE_MAP]=Tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ft[i.TEXTURE_2D_ARRAY]=Tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ft[i.TEXTURE_3D]=Tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),o.setClear(1),c.setClear(0),Bt(i.DEPTH_TEST),o.setFunc(lr),wt(!1),S(Co),Bt(i.CULL_FACE),dt(si);function Bt(U){m[U]!==!0&&(i.enable(U),m[U]=!0)}function Dt(U){m[U]!==!1&&(i.disable(U),m[U]=!1)}function Gt(U,ht){return d[U]!==ht?(i.bindFramebuffer(U,ht),d[U]=ht,n&&(U===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ht),U===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ht)),!0):!1}function H(U,ht){let Mt=_,Vt=!1;if(U)if(Mt=g.get(ht),Mt===void 0&&(Mt=[],g.set(ht,Mt)),U.isWebGLMultipleRenderTargets){let zt=U.texture;if(Mt.length!==zt.length||Mt[0]!==i.COLOR_ATTACHMENT0){for(let de=0,me=zt.length;de<me;de++)Mt[de]=i.COLOR_ATTACHMENT0+de;Mt.length=zt.length,Vt=!0}}else Mt[0]!==i.COLOR_ATTACHMENT0&&(Mt[0]=i.COLOR_ATTACHMENT0,Vt=!0);else Mt[0]!==i.BACK&&(Mt[0]=i.BACK,Vt=!0);Vt&&(e.isWebGL2?i.drawBuffers(Mt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(Mt))}function Et(U){return p!==U?(i.useProgram(U),p=U,!0):!1}let ct={[yi]:i.FUNC_ADD,[Vc]:i.FUNC_SUBTRACT,[Hc]:i.FUNC_REVERSE_SUBTRACT};if(n)ct[Io]=i.MIN,ct[Uo]=i.MAX;else{let U=t.get("EXT_blend_minmax");U!==null&&(ct[Io]=U.MIN_EXT,ct[Uo]=U.MAX_EXT)}let St={[Gc]:i.ZERO,[Wc]:i.ONE,[Xc]:i.SRC_COLOR,[wa]:i.SRC_ALPHA,[Kc]:i.SRC_ALPHA_SATURATE,[Jc]:i.DST_COLOR,[Yc]:i.DST_ALPHA,[qc]:i.ONE_MINUS_SRC_COLOR,[Aa]:i.ONE_MINUS_SRC_ALPHA,[$c]:i.ONE_MINUS_DST_COLOR,[Zc]:i.ONE_MINUS_DST_ALPHA,[jc]:i.CONSTANT_COLOR,[Qc]:i.ONE_MINUS_CONSTANT_COLOR,[th]:i.CONSTANT_ALPHA,[eh]:i.ONE_MINUS_CONSTANT_ALPHA};function dt(U,ht,Mt,Vt,zt,de,me,Ue,le,_e){if(U===si){u===!0&&(Dt(i.BLEND),u=!1);return}if(u===!1&&(Bt(i.BLEND),u=!0),U!==kc){if(U!==v||_e!==k){if((x!==yi||T!==yi)&&(i.blendEquation(i.FUNC_ADD),x=yi,T=yi),_e)switch(U){case ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ys:i.blendFunc(i.ONE,i.ONE);break;case Po:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Lo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ys:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Po:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Lo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}A=null,P=null,L=null,J=null,b.set(0,0,0),E=0,v=U,k=_e}return}zt=zt||ht,de=de||Mt,me=me||Vt,(ht!==x||zt!==T)&&(i.blendEquationSeparate(ct[ht],ct[zt]),x=ht,T=zt),(Mt!==A||Vt!==P||de!==L||me!==J)&&(i.blendFuncSeparate(St[Mt],St[Vt],St[de],St[me]),A=Mt,P=Vt,L=de,J=me),(Ue.equals(b)===!1||le!==E)&&(i.blendColor(Ue.r,Ue.g,Ue.b,le),b.copy(Ue),E=le),v=U,k=!1}function Ot(U,ht){U.side===En?Dt(i.CULL_FACE):Bt(i.CULL_FACE);let Mt=U.side===Ke;ht&&(Mt=!Mt),wt(Mt),U.blending===ji&&U.transparent===!1?dt(si):dt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),a.setMask(U.colorWrite);let Vt=U.stencilWrite;c.setTest(Vt),Vt&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),B(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Bt(i.SAMPLE_ALPHA_TO_COVERAGE):Dt(i.SAMPLE_ALPHA_TO_COVERAGE)}function wt(U){tt!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),tt=U)}function S(U){U!==Fc?(Bt(i.CULL_FACE),U!==pt&&(U===Co?i.cullFace(i.BACK):U===Bc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Dt(i.CULL_FACE),pt=U}function M(U){U!==N&&(G&&i.lineWidth(U),N=U)}function B(U,ht,Mt){U?(Bt(i.POLYGON_OFFSET_FILL),(V!==ht||O!==Mt)&&(i.polygonOffset(ht,Mt),V=ht,O=Mt)):Dt(i.POLYGON_OFFSET_FILL)}function Q(U){U?Bt(i.SCISSOR_TEST):Dt(i.SCISSOR_TEST)}function et(U){U===void 0&&(U=i.TEXTURE0+F-1),j!==U&&(i.activeTexture(U),j=U)}function it(U,ht,Mt){Mt===void 0&&(j===null?Mt=i.TEXTURE0+F-1:Mt=j);let Vt=rt[Mt];Vt===void 0&&(Vt={type:void 0,texture:void 0},rt[Mt]=Vt),(Vt.type!==U||Vt.texture!==ht)&&(j!==Mt&&(i.activeTexture(Mt),j=Mt),i.bindTexture(U,ht||Ft[U]),Vt.type=U,Vt.texture=ht)}function _t(){let U=rt[j];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function lt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ft(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function At(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function It(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function nt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Yt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Lt(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Nt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xt(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ut(U){yt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),yt.copy(U))}function kt(U){Ct.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Ct.copy(U))}function ce(U,ht){let Mt=f.get(ht);Mt===void 0&&(Mt=new WeakMap,f.set(ht,Mt));let Vt=Mt.get(U);Vt===void 0&&(Vt=i.getUniformBlockIndex(ht,U.name),Mt.set(U,Vt))}function Wt(U,ht){let Vt=f.get(ht).get(U);h.get(ht)!==Vt&&(i.uniformBlockBinding(ht,Vt,U.__bindingPointIndex),h.set(ht,Vt))}function gt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),m={},j=null,rt={},d={},g=new WeakMap,_=[],p=null,u=!1,v=null,x=null,A=null,P=null,T=null,L=null,J=null,b=new ee(0,0,0),E=0,k=!1,tt=null,pt=null,N=null,V=null,O=null,yt.set(0,0,i.canvas.width,i.canvas.height),Ct.set(0,0,i.canvas.width,i.canvas.height),a.reset(),o.reset(),c.reset()}return{buffers:{color:a,depth:o,stencil:c},enable:Bt,disable:Dt,bindFramebuffer:Gt,drawBuffers:H,useProgram:Et,setBlending:dt,setMaterial:Ot,setFlipSided:wt,setCullFace:S,setLineWidth:M,setPolygonOffset:B,setScissorTest:Q,activeTexture:et,bindTexture:it,unbindTexture:_t,compressedTexImage2D:lt,compressedTexImage3D:ft,texImage2D:Nt,texImage3D:xt,updateUBOMapping:ce,uniformBlockBinding:Wt,texStorage2D:Pt,texStorage3D:Lt,texSubImage2D:At,texSubImage3D:It,compressedTexSubImage2D:nt,compressedTexSubImage3D:Yt,scissor:Ut,viewport:kt,reset:gt}}function Tm(i,t,e,n,s,r,l){let a=s.isWebGL2,o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,f,m=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,M){return d?new OffscreenCanvas(S,M):mr("canvas")}function _(S,M,B,Q){let et=1;if((S.width>Q||S.height>Q)&&(et=Q/Math.max(S.width,S.height)),et<1||M===!0)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap){let it=M?Ua:Math.floor,_t=it(et*S.width),lt=it(et*S.height);f===void 0&&(f=g(_t,lt));let ft=B?g(_t,lt):f;return ft.width=_t,ft.height=lt,ft.getContext("2d").drawImage(S,0,0,_t,lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+_t+"x"+lt+")."),ft}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),S;return S}function p(S){return dl(S.width)&&dl(S.height)}function u(S){return a?!1:S.wrapS!==Tn||S.wrapT!==Tn||S.minFilter!==$e&&S.minFilter!==on}function v(S,M){return S.generateMipmaps&&M&&S.minFilter!==$e&&S.minFilter!==on}function x(S){i.generateMipmap(S)}function A(S,M,B,Q,et=!1){if(a===!1)return M;if(S!==null){if(i[S]!==void 0)return i[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let it=M;if(M===i.RED&&(B===i.FLOAT&&(it=i.R32F),B===i.HALF_FLOAT&&(it=i.R16F),B===i.UNSIGNED_BYTE&&(it=i.R8)),M===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(it=i.R8UI),B===i.UNSIGNED_SHORT&&(it=i.R16UI),B===i.UNSIGNED_INT&&(it=i.R32UI),B===i.BYTE&&(it=i.R8I),B===i.SHORT&&(it=i.R16I),B===i.INT&&(it=i.R32I)),M===i.RG&&(B===i.FLOAT&&(it=i.RG32F),B===i.HALF_FLOAT&&(it=i.RG16F),B===i.UNSIGNED_BYTE&&(it=i.RG8)),M===i.RGBA){let _t=et?ur:ve.getTransfer(Q);B===i.FLOAT&&(it=i.RGBA32F),B===i.HALF_FLOAT&&(it=i.RGBA16F),B===i.UNSIGNED_BYTE&&(it=_t===we?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(it=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(it=i.RGB5_A1)}return(it===i.R16F||it===i.R32F||it===i.RG16F||it===i.RG32F||it===i.RGBA16F||it===i.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function P(S,M,B){return v(S,B)===!0||S.isFramebufferTexture&&S.minFilter!==$e&&S.minFilter!==on?Math.log2(Math.max(M.width,M.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?M.mipmaps.length:1}function T(S){return S===$e||S===No||S===Xr?i.NEAREST:i.LINEAR}function L(S){let M=S.target;M.removeEventListener("dispose",L),b(M),M.isVideoTexture&&h.delete(M)}function J(S){let M=S.target;M.removeEventListener("dispose",J),k(M)}function b(S){let M=n.get(S);if(M.__webglInit===void 0)return;let B=S.source,Q=m.get(B);if(Q){let et=Q[M.__cacheKey];et.usedTimes--,et.usedTimes===0&&E(S),Object.keys(Q).length===0&&m.delete(B)}n.remove(S)}function E(S){let M=n.get(S);i.deleteTexture(M.__webglTexture);let B=S.source,Q=m.get(B);delete Q[M.__cacheKey],l.memory.textures--}function k(S){let M=S.texture,B=n.get(S),Q=n.get(M);if(Q.__webglTexture!==void 0&&(i.deleteTexture(Q.__webglTexture),l.memory.textures--),S.depthTexture&&S.depthTexture.dispose(),S.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(B.__webglFramebuffer[et]))for(let it=0;it<B.__webglFramebuffer[et].length;it++)i.deleteFramebuffer(B.__webglFramebuffer[et][it]);else i.deleteFramebuffer(B.__webglFramebuffer[et]);B.__webglDepthbuffer&&i.deleteRenderbuffer(B.__webglDepthbuffer[et])}else{if(Array.isArray(B.__webglFramebuffer))for(let et=0;et<B.__webglFramebuffer.length;et++)i.deleteFramebuffer(B.__webglFramebuffer[et]);else i.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&i.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&i.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let et=0;et<B.__webglColorRenderbuffer.length;et++)B.__webglColorRenderbuffer[et]&&i.deleteRenderbuffer(B.__webglColorRenderbuffer[et]);B.__webglDepthRenderbuffer&&i.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let et=0,it=M.length;et<it;et++){let _t=n.get(M[et]);_t.__webglTexture&&(i.deleteTexture(_t.__webglTexture),l.memory.textures--),n.remove(M[et])}n.remove(M),n.remove(S)}let tt=0;function pt(){tt=0}function N(){let S=tt;return S>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),tt+=1,S}function V(S){let M=[];return M.push(S.wrapS),M.push(S.wrapT),M.push(S.wrapR||0),M.push(S.magFilter),M.push(S.minFilter),M.push(S.anisotropy),M.push(S.internalFormat),M.push(S.format),M.push(S.type),M.push(S.generateMipmaps),M.push(S.premultiplyAlpha),M.push(S.flipY),M.push(S.unpackAlignment),M.push(S.colorSpace),M.join()}function O(S,M){let B=n.get(S);if(S.isVideoTexture&&Ot(S),S.isRenderTargetTexture===!1&&S.version>0&&B.__version!==S.version){let Q=S.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{yt(B,S,M);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+M)}function F(S,M){let B=n.get(S);if(S.version>0&&B.__version!==S.version){yt(B,S,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+M)}function G(S,M){let B=n.get(S);if(S.version>0&&B.__version!==S.version){yt(B,S,M);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+M)}function X(S,M){let B=n.get(S);if(S.version>0&&B.__version!==S.version){Ct(B,S,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+M)}let at={[Ra]:i.REPEAT,[Tn]:i.CLAMP_TO_EDGE,[Ca]:i.MIRRORED_REPEAT},j={[$e]:i.NEAREST,[No]:i.NEAREST_MIPMAP_NEAREST,[Xr]:i.NEAREST_MIPMAP_LINEAR,[on]:i.LINEAR,[xh]:i.LINEAR_MIPMAP_NEAREST,[Ms]:i.LINEAR_MIPMAP_LINEAR},rt={[Lh]:i.NEVER,[Fh]:i.ALWAYS,[Ih]:i.LESS,[fc]:i.LEQUAL,[Uh]:i.EQUAL,[Oh]:i.GEQUAL,[Dh]:i.GREATER,[Nh]:i.NOTEQUAL};function W(S,M,B){if(B?(i.texParameteri(S,i.TEXTURE_WRAP_S,at[M.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,at[M.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,at[M.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,j[M.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,j[M.minFilter])):(i.texParameteri(S,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(S,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(M.wrapS!==Tn||M.wrapT!==Tn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(S,i.TEXTURE_MAG_FILTER,T(M.magFilter)),i.texParameteri(S,i.TEXTURE_MIN_FILTER,T(M.minFilter)),M.minFilter!==$e&&M.minFilter!==on&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,rt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let Q=t.get("EXT_texture_filter_anisotropic");if(M.magFilter===$e||M.minFilter!==Xr&&M.minFilter!==Ms||M.type===Yn&&t.has("OES_texture_float_linear")===!1||a===!1&&M.type===bs&&t.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(i.texParameterf(S,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function ot(S,M){let B=!1;S.__webglInit===void 0&&(S.__webglInit=!0,M.addEventListener("dispose",L));let Q=M.source,et=m.get(Q);et===void 0&&(et={},m.set(Q,et));let it=V(M);if(it!==S.__cacheKey){et[it]===void 0&&(et[it]={texture:i.createTexture(),usedTimes:0},l.memory.textures++,B=!0),et[it].usedTimes++;let _t=et[S.__cacheKey];_t!==void 0&&(et[S.__cacheKey].usedTimes--,_t.usedTimes===0&&E(M)),S.__cacheKey=it,S.__webglTexture=et[it].texture}return B}function yt(S,M,B){let Q=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Q=i.TEXTURE_3D);let et=ot(S,M),it=M.source;e.bindTexture(Q,S.__webglTexture,i.TEXTURE0+B);let _t=n.get(it);if(it.version!==_t.__version||et===!0){e.activeTexture(i.TEXTURE0+B);let lt=ve.getPrimaries(ve.workingColorSpace),ft=M.colorSpace===xn?null:ve.getPrimaries(M.colorSpace),At=M.colorSpace===xn||lt===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let It=u(M)&&p(M.image)===!1,nt=_(M.image,It,!1,s.maxTextureSize);nt=wt(M,nt);let Yt=p(nt)||a,Pt=r.convert(M.format,M.colorSpace),Lt=r.convert(M.type),Nt=A(M.internalFormat,Pt,Lt,M.colorSpace,M.isVideoTexture);W(Q,M,Yt);let xt,Ut=M.mipmaps,kt=a&&M.isVideoTexture!==!0&&Nt!==uc,ce=_t.__version===void 0||et===!0,Wt=P(M,nt,Yt);if(M.isDepthTexture)Nt=i.DEPTH_COMPONENT,a?M.type===Yn?Nt=i.DEPTH_COMPONENT32F:M.type===ii?Nt=i.DEPTH_COMPONENT24:M.type===bi?Nt=i.DEPTH24_STENCIL8:Nt=i.DEPTH_COMPONENT16:M.type===Yn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===Si&&Nt===i.DEPTH_COMPONENT&&M.type!==oo&&M.type!==ii&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=ii,Lt=r.convert(M.type)),M.format===is&&Nt===i.DEPTH_COMPONENT&&(Nt=i.DEPTH_STENCIL,M.type!==bi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=bi,Lt=r.convert(M.type))),ce&&(kt?e.texStorage2D(i.TEXTURE_2D,1,Nt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,Nt,nt.width,nt.height,0,Pt,Lt,null));else if(M.isDataTexture)if(Ut.length>0&&Yt){kt&&ce&&e.texStorage2D(i.TEXTURE_2D,Wt,Nt,Ut[0].width,Ut[0].height);for(let gt=0,U=Ut.length;gt<U;gt++)xt=Ut[gt],kt?e.texSubImage2D(i.TEXTURE_2D,gt,0,0,xt.width,xt.height,Pt,Lt,xt.data):e.texImage2D(i.TEXTURE_2D,gt,Nt,xt.width,xt.height,0,Pt,Lt,xt.data);M.generateMipmaps=!1}else kt?(ce&&e.texStorage2D(i.TEXTURE_2D,Wt,Nt,nt.width,nt.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,nt.width,nt.height,Pt,Lt,nt.data)):e.texImage2D(i.TEXTURE_2D,0,Nt,nt.width,nt.height,0,Pt,Lt,nt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){kt&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Wt,Nt,Ut[0].width,Ut[0].height,nt.depth);for(let gt=0,U=Ut.length;gt<U;gt++)xt=Ut[gt],M.format!==_n?Pt!==null?kt?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,xt.width,xt.height,nt.depth,Pt,xt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,gt,Nt,xt.width,xt.height,nt.depth,0,xt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?e.texSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,xt.width,xt.height,nt.depth,Pt,Lt,xt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,gt,Nt,xt.width,xt.height,nt.depth,0,Pt,Lt,xt.data)}else{kt&&ce&&e.texStorage2D(i.TEXTURE_2D,Wt,Nt,Ut[0].width,Ut[0].height);for(let gt=0,U=Ut.length;gt<U;gt++)xt=Ut[gt],M.format!==_n?Pt!==null?kt?e.compressedTexSubImage2D(i.TEXTURE_2D,gt,0,0,xt.width,xt.height,Pt,xt.data):e.compressedTexImage2D(i.TEXTURE_2D,gt,Nt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?e.texSubImage2D(i.TEXTURE_2D,gt,0,0,xt.width,xt.height,Pt,Lt,xt.data):e.texImage2D(i.TEXTURE_2D,gt,Nt,xt.width,xt.height,0,Pt,Lt,xt.data)}else if(M.isDataArrayTexture)kt?(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Wt,Nt,nt.width,nt.height,nt.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,Pt,Lt,nt.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,Nt,nt.width,nt.height,nt.depth,0,Pt,Lt,nt.data);else if(M.isData3DTexture)kt?(ce&&e.texStorage3D(i.TEXTURE_3D,Wt,Nt,nt.width,nt.height,nt.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,Pt,Lt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,Nt,nt.width,nt.height,nt.depth,0,Pt,Lt,nt.data);else if(M.isFramebufferTexture){if(ce)if(kt)e.texStorage2D(i.TEXTURE_2D,Wt,Nt,nt.width,nt.height);else{let gt=nt.width,U=nt.height;for(let ht=0;ht<Wt;ht++)e.texImage2D(i.TEXTURE_2D,ht,Nt,gt,U,0,Pt,Lt,null),gt>>=1,U>>=1}}else if(Ut.length>0&&Yt){kt&&ce&&e.texStorage2D(i.TEXTURE_2D,Wt,Nt,Ut[0].width,Ut[0].height);for(let gt=0,U=Ut.length;gt<U;gt++)xt=Ut[gt],kt?e.texSubImage2D(i.TEXTURE_2D,gt,0,0,Pt,Lt,xt):e.texImage2D(i.TEXTURE_2D,gt,Nt,Pt,Lt,xt);M.generateMipmaps=!1}else kt?(ce&&e.texStorage2D(i.TEXTURE_2D,Wt,Nt,nt.width,nt.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Pt,Lt,nt)):e.texImage2D(i.TEXTURE_2D,0,Nt,Pt,Lt,nt);v(M,Yt)&&x(Q),_t.__version=it.version,M.onUpdate&&M.onUpdate(M)}S.__version=M.version}function Ct(S,M,B){if(M.image.length!==6)return;let Q=ot(S,M),et=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+B);let it=n.get(et);if(et.version!==it.__version||Q===!0){e.activeTexture(i.TEXTURE0+B);let _t=ve.getPrimaries(ve.workingColorSpace),lt=M.colorSpace===xn?null:ve.getPrimaries(M.colorSpace),ft=M.colorSpace===xn||_t===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);let At=M.isCompressedTexture||M.image[0].isCompressedTexture,It=M.image[0]&&M.image[0].isDataTexture,nt=[];for(let gt=0;gt<6;gt++)!At&&!It?nt[gt]=_(M.image[gt],!1,!0,s.maxCubemapSize):nt[gt]=It?M.image[gt].image:M.image[gt],nt[gt]=wt(M,nt[gt]);let Yt=nt[0],Pt=p(Yt)||a,Lt=r.convert(M.format,M.colorSpace),Nt=r.convert(M.type),xt=A(M.internalFormat,Lt,Nt,M.colorSpace),Ut=a&&M.isVideoTexture!==!0,kt=it.__version===void 0||Q===!0,ce=P(M,Yt,Pt);W(i.TEXTURE_CUBE_MAP,M,Pt);let Wt;if(At){Ut&&kt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ce,xt,Yt.width,Yt.height);for(let gt=0;gt<6;gt++){Wt=nt[gt].mipmaps;for(let U=0;U<Wt.length;U++){let ht=Wt[U];M.format!==_n?Lt!==null?Ut?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,U,0,0,ht.width,ht.height,Lt,ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,U,xt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ut?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,U,0,0,ht.width,ht.height,Lt,Nt,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,U,xt,ht.width,ht.height,0,Lt,Nt,ht.data)}}}else{Wt=M.mipmaps,Ut&&kt&&(Wt.length>0&&ce++,e.texStorage2D(i.TEXTURE_CUBE_MAP,ce,xt,nt[0].width,nt[0].height));for(let gt=0;gt<6;gt++)if(It){Ut?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,nt[gt].width,nt[gt].height,Lt,Nt,nt[gt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,xt,nt[gt].width,nt[gt].height,0,Lt,Nt,nt[gt].data);for(let U=0;U<Wt.length;U++){let Mt=Wt[U].image[gt].image;Ut?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,U+1,0,0,Mt.width,Mt.height,Lt,Nt,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,U+1,xt,Mt.width,Mt.height,0,Lt,Nt,Mt.data)}}else{Ut?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,Lt,Nt,nt[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,xt,Lt,Nt,nt[gt]);for(let U=0;U<Wt.length;U++){let ht=Wt[U];Ut?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,U+1,0,0,Lt,Nt,ht.image[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,U+1,xt,Lt,Nt,ht.image[gt])}}}v(M,Pt)&&x(i.TEXTURE_CUBE_MAP),it.__version=et.version,M.onUpdate&&M.onUpdate(M)}S.__version=M.version}function Tt(S,M,B,Q,et,it){let _t=r.convert(B.format,B.colorSpace),lt=r.convert(B.type),ft=A(B.internalFormat,_t,lt,B.colorSpace);if(!n.get(M).__hasExternalTextures){let It=Math.max(1,M.width>>it),nt=Math.max(1,M.height>>it);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,it,ft,It,nt,M.depth,0,_t,lt,null):e.texImage2D(et,it,ft,It,nt,0,_t,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,S),dt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,et,n.get(B).__webglTexture,0,St(M)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,et,n.get(B).__webglTexture,it),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(S,M,B){if(i.bindRenderbuffer(i.RENDERBUFFER,S),M.depthBuffer&&!M.stencilBuffer){let Q=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(B||dt(M)){let et=M.depthTexture;et&&et.isDepthTexture&&(et.type===Yn?Q=i.DEPTH_COMPONENT32F:et.type===ii&&(Q=i.DEPTH_COMPONENT24));let it=St(M);dt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,Q,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,it,Q,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,Q,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,S)}else if(M.depthBuffer&&M.stencilBuffer){let Q=St(M);B&&dt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,M.width,M.height):dt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,S)}else{let Q=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let et=0;et<Q.length;et++){let it=Q[et],_t=r.convert(it.format,it.colorSpace),lt=r.convert(it.type),ft=A(it.internalFormat,_t,lt,it.colorSpace),At=St(M);B&&dt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,At,ft,M.width,M.height):dt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,At,ft,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ft,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Bt(S,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,S),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),O(M.depthTexture,0);let Q=n.get(M.depthTexture).__webglTexture,et=St(M);if(M.depthTexture.format===Si)dt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(M.depthTexture.format===is)dt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Dt(S){let M=n.get(S),B=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Bt(M.__webglFramebuffer,S)}else if(B){M.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[Q]),M.__webglDepthbuffer[Q]=i.createRenderbuffer(),Ft(M.__webglDepthbuffer[Q],S,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),Ft(M.__webglDepthbuffer,S,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Gt(S,M,B){let Q=n.get(S);M!==void 0&&Tt(Q.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Dt(S)}function H(S){let M=S.texture,B=n.get(S),Q=n.get(M);S.addEventListener("dispose",J),S.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=M.version,l.memory.textures++);let et=S.isWebGLCubeRenderTarget===!0,it=S.isWebGLMultipleRenderTargets===!0,_t=p(S)||a;if(et){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(a&&M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let ft=0;ft<M.mipmaps.length;ft++)B.__webglFramebuffer[lt][ft]=i.createFramebuffer()}else B.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<M.mipmaps.length;lt++)B.__webglFramebuffer[lt]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(it)if(s.drawBuffers){let lt=S.texture;for(let ft=0,At=lt.length;ft<At;ft++){let It=n.get(lt[ft]);It.__webglTexture===void 0&&(It.__webglTexture=i.createTexture(),l.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&S.samples>0&&dt(S)===!1){let lt=it?M:[M];B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ft=0;ft<lt.length;ft++){let At=lt[ft];B.__webglColorRenderbuffer[ft]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ft]);let It=r.convert(At.format,At.colorSpace),nt=r.convert(At.type),Yt=A(At.internalFormat,It,nt,At.colorSpace,S.isXRRenderTarget===!0),Pt=St(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,Yt,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,B.__webglColorRenderbuffer[ft])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Ft(B.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(et){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),W(i.TEXTURE_CUBE_MAP,M,_t);for(let lt=0;lt<6;lt++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let ft=0;ft<M.mipmaps.length;ft++)Tt(B.__webglFramebuffer[lt][ft],S,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,ft);else Tt(B.__webglFramebuffer[lt],S,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);v(M,_t)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(it){let lt=S.texture;for(let ft=0,At=lt.length;ft<At;ft++){let It=lt[ft],nt=n.get(It);e.bindTexture(i.TEXTURE_2D,nt.__webglTexture),W(i.TEXTURE_2D,It,_t),Tt(B.__webglFramebuffer,S,It,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,0),v(It,_t)&&x(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(a?lt=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(lt,Q.__webglTexture),W(lt,M,_t),a&&M.mipmaps&&M.mipmaps.length>0)for(let ft=0;ft<M.mipmaps.length;ft++)Tt(B.__webglFramebuffer[ft],S,M,i.COLOR_ATTACHMENT0,lt,ft);else Tt(B.__webglFramebuffer,S,M,i.COLOR_ATTACHMENT0,lt,0);v(M,_t)&&x(lt),e.unbindTexture()}S.depthBuffer&&Dt(S)}function Et(S){let M=p(S)||a,B=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let Q=0,et=B.length;Q<et;Q++){let it=B[Q];if(v(it,M)){let _t=S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,lt=n.get(it).__webglTexture;e.bindTexture(_t,lt),x(_t),e.unbindTexture()}}}function ct(S){if(a&&S.samples>0&&dt(S)===!1){let M=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],B=S.width,Q=S.height,et=i.COLOR_BUFFER_BIT,it=[],_t=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(S),ft=S.isWebGLMultipleRenderTargets===!0;if(ft)for(let At=0;At<M.length;At++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let At=0;At<M.length;At++){it.push(i.COLOR_ATTACHMENT0+At),S.depthBuffer&&it.push(_t);let It=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(It===!1&&(S.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),ft&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[At]),It===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[_t]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_t])),ft){let nt=n.get(M[At]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,nt,0)}i.blitFramebuffer(0,0,B,Q,0,0,B,Q,et,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,it)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ft)for(let At=0;At<M.length;At++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,lt.__webglColorRenderbuffer[At]);let It=n.get(M[At]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,It,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function St(S){return Math.min(s.maxSamples,S.samples)}function dt(S){let M=n.get(S);return a&&S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ot(S){let M=l.render.frame;h.get(S)!==M&&(h.set(S,M),S.update())}function wt(S,M){let B=S.colorSpace,Q=S.format,et=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||S.format===La||B!==$n&&B!==xn&&(ve.getTransfer(B)===we?a===!1?t.has("EXT_sRGB")===!0&&Q===_n?(S.format=La,S.minFilter=on,S.generateMipmaps=!1):M=gr.sRGBToLinear(M):(Q!==_n||et!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}this.allocateTextureUnit=N,this.resetTextureUnits=pt,this.setTexture2D=O,this.setTexture2DArray=F,this.setTexture3D=G,this.setTextureCube=X,this.rebindTextures=Gt,this.setupRenderTarget=H,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=ct,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=dt}function Rm(i,t,e){let n=e.isWebGL2;function s(r,l=xn){let a,o=ve.getTransfer(l);if(r===Dn)return i.UNSIGNED_BYTE;if(r===ac)return i.UNSIGNED_SHORT_4_4_4_4;if(r===oc)return i.UNSIGNED_SHORT_5_5_5_1;if(r===vh)return i.BYTE;if(r===yh)return i.SHORT;if(r===oo)return i.UNSIGNED_SHORT;if(r===rc)return i.INT;if(r===ii)return i.UNSIGNED_INT;if(r===Yn)return i.FLOAT;if(r===bs)return n?i.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Mh)return i.ALPHA;if(r===_n)return i.RGBA;if(r===bh)return i.LUMINANCE;if(r===Sh)return i.LUMINANCE_ALPHA;if(r===Si)return i.DEPTH_COMPONENT;if(r===is)return i.DEPTH_STENCIL;if(r===La)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===wh)return i.RED;if(r===lc)return i.RED_INTEGER;if(r===Ah)return i.RG;if(r===cc)return i.RG_INTEGER;if(r===hc)return i.RGBA_INTEGER;if(r===qr||r===Yr||r===Zr||r===Jr)if(o===we)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===qr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Yr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Zr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Jr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===qr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Yr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Zr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Jr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Oo||r===Fo||r===Bo||r===zo)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Oo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Fo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Bo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===zo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===uc)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===ko||r===Vo)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===ko)return o===we?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Vo)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Ho||r===Go||r===Wo||r===Xo||r===qo||r===Yo||r===Zo||r===Jo||r===$o||r===Ko||r===jo||r===Qo||r===tl||r===el)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Ho)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Go)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Wo)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Xo)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===qo)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Yo)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Zo)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Jo)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===$o)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ko)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===jo)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Qo)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===tl)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===el)return o===we?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===$r||r===nl||r===il)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===$r)return o===we?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===nl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===il)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Eh||r===sl||r===rl||r===al)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===$r)return a.COMPRESSED_RED_RGTC1_EXT;if(r===sl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===rl)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===al)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===bi?n?i.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var qa=class extends ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},fe=class extends yn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Cm={type:"move"},vs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,l=null,a=this._targetRay,o=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){l=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,n),u=this._getHandJoint(c,_);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],m=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&m>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&m<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else o!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Cm)))}return a!==null&&(a.visible=s!==null),o!==null&&(o.visible=r!==null),c!==null&&(c.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new fe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Ya=class extends oi{constructor(t,e){super();let n=this,s=null,r=1,l=null,a="local-floor",o=1,c=null,h=null,f=null,m=null,d=null,g=null,_=e.getContextAttributes(),p=null,u=null,v=[],x=[],A=new ge,P=null,T=new ln;T.layers.enable(1),T.viewport=new ke;let L=new ln;L.layers.enable(2),L.viewport=new ke;let J=[T,L],b=new qa;b.layers.enable(1),b.layers.enable(2);let E=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ot=v[W];return ot===void 0&&(ot=new vs,v[W]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(W){let ot=v[W];return ot===void 0&&(ot=new vs,v[W]=ot),ot.getGripSpace()},this.getHand=function(W){let ot=v[W];return ot===void 0&&(ot=new vs,v[W]=ot),ot.getHandSpace()};function tt(W){let ot=x.indexOf(W.inputSource);if(ot===-1)return;let yt=v[ot];yt!==void 0&&(yt.update(W.inputSource,W.frame,c||l),yt.dispatchEvent({type:W.type,data:W.inputSource}))}function pt(){s.removeEventListener("select",tt),s.removeEventListener("selectstart",tt),s.removeEventListener("selectend",tt),s.removeEventListener("squeeze",tt),s.removeEventListener("squeezestart",tt),s.removeEventListener("squeezeend",tt),s.removeEventListener("end",pt),s.removeEventListener("inputsourceschange",N);for(let W=0;W<v.length;W++){let ot=x[W];ot!==null&&(x[W]=null,v[W].disconnect(ot))}E=null,k=null,t.setRenderTarget(p),d=null,m=null,f=null,s=null,u=null,rt.stop(),n.isPresenting=!1,t.setPixelRatio(P),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||l},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return m!==null?m:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",tt),s.addEventListener("selectstart",tt),s.addEventListener("selectend",tt),s.addEventListener("squeeze",tt),s.addEventListener("squeezestart",tt),s.addEventListener("squeezeend",tt),s.addEventListener("end",pt),s.addEventListener("inputsourceschange",N),_.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(A),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let ot={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),u=new vn(d.framebufferWidth,d.framebufferHeight,{format:_n,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let ot=null,yt=null,Ct=null;_.depth&&(Ct=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=_.stencil?is:Si,yt=_.stencil?bi:ii);let Tt={colorFormat:e.RGBA8,depthFormat:Ct,scaleFactor:r};f=new XRWebGLBinding(s,e),m=f.createProjectionLayer(Tt),s.updateRenderState({layers:[m]}),t.setPixelRatio(1),t.setSize(m.textureWidth,m.textureHeight,!1),u=new vn(m.textureWidth,m.textureHeight,{format:_n,type:Dn,depthTexture:new Cr(m.textureWidth,m.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});let Ft=t.properties.get(u);Ft.__ignoreDepthValues=m.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(o),c=null,l=await s.requestReferenceSpace(a),rt.setContext(s),rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function N(W){for(let ot=0;ot<W.removed.length;ot++){let yt=W.removed[ot],Ct=x.indexOf(yt);Ct>=0&&(x[Ct]=null,v[Ct].disconnect(yt))}for(let ot=0;ot<W.added.length;ot++){let yt=W.added[ot],Ct=x.indexOf(yt);if(Ct===-1){for(let Ft=0;Ft<v.length;Ft++)if(Ft>=x.length){x.push(yt),Ct=Ft;break}else if(x[Ft]===null){x[Ft]=yt,Ct=Ft;break}if(Ct===-1)break}let Tt=v[Ct];Tt&&Tt.connect(yt)}}let V=new I,O=new I;function F(W,ot,yt){V.setFromMatrixPosition(ot.matrixWorld),O.setFromMatrixPosition(yt.matrixWorld);let Ct=V.distanceTo(O),Tt=ot.projectionMatrix.elements,Ft=yt.projectionMatrix.elements,Bt=Tt[14]/(Tt[10]-1),Dt=Tt[14]/(Tt[10]+1),Gt=(Tt[9]+1)/Tt[5],H=(Tt[9]-1)/Tt[5],Et=(Tt[8]-1)/Tt[0],ct=(Ft[8]+1)/Ft[0],St=Bt*Et,dt=Bt*ct,Ot=Ct/(-Et+ct),wt=Ot*-Et;ot.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(wt),W.translateZ(Ot),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();let S=Bt+Ot,M=Dt+Ot,B=St-wt,Q=dt+(Ct-wt),et=Gt*Dt/M*S,it=H*Dt/M*S;W.projectionMatrix.makePerspective(B,Q,et,it,S,M),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function G(W,ot){ot===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ot.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;b.near=L.near=T.near=W.near,b.far=L.far=T.far=W.far,(E!==b.near||k!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),E=b.near,k=b.far);let ot=W.parent,yt=b.cameras;G(b,ot);for(let Ct=0;Ct<yt.length;Ct++)G(yt[Ct],ot);yt.length===2?F(b,T,L):b.projectionMatrix.copy(T.projectionMatrix),X(W,b,ot)};function X(W,ot,yt){yt===null?W.matrix.copy(ot.matrixWorld):(W.matrix.copy(yt.matrixWorld),W.matrix.invert(),W.matrix.multiply(ot.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ot.projectionMatrix),W.projectionMatrixInverse.copy(ot.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ia*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(m===null&&d===null))return o},this.setFoveation=function(W){o=W,m!==null&&(m.fixedFoveation=W),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=W)};let at=null;function j(W,ot){if(h=ot.getViewerPose(c||l),g=ot,h!==null){let yt=h.views;d!==null&&(t.setRenderTargetFramebuffer(u,d.framebuffer),t.setRenderTarget(u));let Ct=!1;yt.length!==b.cameras.length&&(b.cameras.length=0,Ct=!0);for(let Tt=0;Tt<yt.length;Tt++){let Ft=yt[Tt],Bt=null;if(d!==null)Bt=d.getViewport(Ft);else{let Gt=f.getViewSubImage(m,Ft);Bt=Gt.viewport,Tt===0&&(t.setRenderTargetTextures(u,Gt.colorTexture,m.ignoreDepthValues?void 0:Gt.depthStencilTexture),t.setRenderTarget(u))}let Dt=J[Tt];Dt===void 0&&(Dt=new ln,Dt.layers.enable(Tt),Dt.viewport=new ke,J[Tt]=Dt),Dt.matrix.fromArray(Ft.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(Ft.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),Tt===0&&(b.matrix.copy(Dt.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),Ct===!0&&b.cameras.push(Dt)}}for(let yt=0;yt<v.length;yt++){let Ct=x[yt],Tt=v[yt];Ct!==null&&Tt!==void 0&&Tt.update(Ct,ot,c||l)}at&&at(W,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),g=null}let rt=new _c;rt.setAnimationLoop(j),this.setAnimationLoop=function(W){at=W},this.dispose=function(){}}};function Pm(i,t){function e(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,gc(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function s(p,u,v,x,A){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(p,u):u.isMeshToonMaterial?(r(p,u),f(p,u)):u.isMeshPhongMaterial?(r(p,u),h(p,u)):u.isMeshStandardMaterial?(r(p,u),m(p,u),u.isMeshPhysicalMaterial&&d(p,u,A)):u.isMeshMatcapMaterial?(r(p,u),g(p,u)):u.isMeshDepthMaterial?r(p,u):u.isMeshDistanceMaterial?(r(p,u),_(p,u)):u.isMeshNormalMaterial?r(p,u):u.isLineBasicMaterial?(l(p,u),u.isLineDashedMaterial&&a(p,u)):u.isPointsMaterial?o(p,u,v,x):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,e(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Ke&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,e(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Ke&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,e(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,e(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);let v=t.get(u).envMap;if(v&&(p.envMap.value=v,p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;let x=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*x,e(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,p.aoMapTransform))}function l(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform))}function a(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function o(p,u,v,x){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*v,p.scale.value=x*.5,u.map&&(p.map.value=u.map,e(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function f(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function m(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,p.roughnessMapTransform)),t.get(u).envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function d(p,u,v){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ke&&p.clearcoatNormalScale.value.negate())),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,u){u.matcap&&(p.matcap.value=u.matcap)}function _(p,u){let v=t.get(u).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Lm(i,t,e,n){let s={},r={},l=[],a=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function o(v,x){let A=x.program;n.uniformBlockBinding(v,A)}function c(v,x){let A=s[v.id];A===void 0&&(g(v),A=h(v),s[v.id]=A,v.addEventListener("dispose",p));let P=x.program;n.updateUBOMapping(v,P);let T=t.render.frame;r[v.id]!==T&&(m(v),r[v.id]=T)}function h(v){let x=f();v.__bindingPointIndex=x;let A=i.createBuffer(),P=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,P,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,A),A}function f(){for(let v=0;v<a;v++)if(l.indexOf(v)===-1)return l.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(v){let x=s[v.id],A=v.uniforms,P=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let T=0,L=A.length;T<L;T++){let J=Array.isArray(A[T])?A[T]:[A[T]];for(let b=0,E=J.length;b<E;b++){let k=J[b];if(d(k,T,b,P)===!0){let tt=k.__offset,pt=Array.isArray(k.value)?k.value:[k.value],N=0;for(let V=0;V<pt.length;V++){let O=pt[V],F=_(O);typeof O=="number"||typeof O=="boolean"?(k.__data[0]=O,i.bufferSubData(i.UNIFORM_BUFFER,tt+N,k.__data)):O.isMatrix3?(k.__data[0]=O.elements[0],k.__data[1]=O.elements[1],k.__data[2]=O.elements[2],k.__data[3]=0,k.__data[4]=O.elements[3],k.__data[5]=O.elements[4],k.__data[6]=O.elements[5],k.__data[7]=0,k.__data[8]=O.elements[6],k.__data[9]=O.elements[7],k.__data[10]=O.elements[8],k.__data[11]=0):(O.toArray(k.__data,N),N+=F.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,tt,k.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,x,A,P){let T=v.value,L=x+"_"+A;if(P[L]===void 0)return typeof T=="number"||typeof T=="boolean"?P[L]=T:P[L]=T.clone(),!0;{let J=P[L];if(typeof T=="number"||typeof T=="boolean"){if(J!==T)return P[L]=T,!0}else if(J.equals(T)===!1)return J.copy(T),!0}return!1}function g(v){let x=v.uniforms,A=0,P=16;for(let L=0,J=x.length;L<J;L++){let b=Array.isArray(x[L])?x[L]:[x[L]];for(let E=0,k=b.length;E<k;E++){let tt=b[E],pt=Array.isArray(tt.value)?tt.value:[tt.value];for(let N=0,V=pt.length;N<V;N++){let O=pt[N],F=_(O),G=A%P;G!==0&&P-G<F.boundary&&(A+=P-G),tt.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),tt.__offset=A,A+=F.storage}}}let T=A%P;return T>0&&(A+=P-T),v.__size=A,v.__cache={},this}function _(v){let x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function p(v){let x=v.target;x.removeEventListener("dispose",p);let A=l.indexOf(x.__bindingPointIndex);l.splice(A,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function u(){for(let v in s)i.deleteBuffer(s[v]);l=[],s={},r={}}return{bind:o,update:c,dispose:u}}var ws=class{constructor(t={}){let{canvas:e=zh(),context:n=null,depth:s=!0,stencil:r=!0,alpha:l=!1,antialias:a=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let m;n!==null?m=n.getContextAttributes().alpha:m=l;let d=new Uint32Array(4),g=new Int32Array(4),_=null,p=null,u=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ze,this._useLegacyLights=!1,this.toneMapping=ri,this.toneMappingExposure=1;let x=this,A=!1,P=0,T=0,L=null,J=-1,b=null,E=new ke,k=new ke,tt=null,pt=new ee(0),N=0,V=e.width,O=e.height,F=1,G=null,X=null,at=new ke(0,0,V,O),j=new ke(0,0,V,O),rt=!1,W=new Tr,ot=!1,yt=!1,Ct=null,Tt=new ye,Ft=new ge,Bt=new I,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Gt(){return L===null?F:1}let H=n;function Et(w,z){for(let Z=0;Z<w.length;Z++){let $=w[Z],q=e.getContext($,z);if(q!==null)return q}return null}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ao}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",U,!1),e.addEventListener("webglcontextcreationerror",ht,!1),H===null){let z=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&z.shift(),H=Et(z,w),H===null)throw Et(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&H instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),H.getShaderPrecisionFormat===void 0&&(H.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let ct,St,dt,Ot,wt,S,M,B,Q,et,it,_t,lt,ft,At,It,nt,Yt,Pt,Lt,Nt,xt,Ut,kt;function ce(){ct=new $f(H),St=new Wf(H,ct,t),ct.init(St),xt=new Rm(H,ct,St),dt=new Em(H,ct,St),Ot=new Qf(H),wt=new pm,S=new Tm(H,ct,dt,wt,St,xt,Ot),M=new qf(x),B=new Jf(x),Q=new au(H,St),Ut=new Hf(H,ct,Q,St),et=new Kf(H,Q,Ot,Ut),it=new ip(H,et,Q,Ot),Pt=new np(H,St,S),It=new Xf(wt),_t=new fm(x,M,B,ct,St,Ut,It),lt=new Pm(x,wt),ft=new gm,At=new bm(ct,St),Yt=new Vf(x,M,B,dt,it,m,o),nt=new Am(x,it,St),kt=new Lm(H,Ot,St,dt),Lt=new Gf(H,ct,Ot,St),Nt=new jf(H,ct,Ot,St),Ot.programs=_t.programs,x.capabilities=St,x.extensions=ct,x.properties=wt,x.renderLists=ft,x.shadowMap=nt,x.state=dt,x.info=Ot}ce();let Wt=new Ya(x,H);this.xr=Wt,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let w=ct.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=ct.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(w){w!==void 0&&(F=w,this.setSize(V,O,!1))},this.getSize=function(w){return w.set(V,O)},this.setSize=function(w,z,Z=!0){if(Wt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=w,O=z,e.width=Math.floor(w*F),e.height=Math.floor(z*F),Z===!0&&(e.style.width=w+"px",e.style.height=z+"px"),this.setViewport(0,0,w,z)},this.getDrawingBufferSize=function(w){return w.set(V*F,O*F).floor()},this.setDrawingBufferSize=function(w,z,Z){V=w,O=z,F=Z,e.width=Math.floor(w*Z),e.height=Math.floor(z*Z),this.setViewport(0,0,w,z)},this.getCurrentViewport=function(w){return w.copy(E)},this.getViewport=function(w){return w.copy(at)},this.setViewport=function(w,z,Z,$){w.isVector4?at.set(w.x,w.y,w.z,w.w):at.set(w,z,Z,$),dt.viewport(E.copy(at).multiplyScalar(F).floor())},this.getScissor=function(w){return w.copy(j)},this.setScissor=function(w,z,Z,$){w.isVector4?j.set(w.x,w.y,w.z,w.w):j.set(w,z,Z,$),dt.scissor(k.copy(j).multiplyScalar(F).floor())},this.getScissorTest=function(){return rt},this.setScissorTest=function(w){dt.setScissorTest(rt=w)},this.setOpaqueSort=function(w){G=w},this.setTransparentSort=function(w){X=w},this.getClearColor=function(w){return w.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor.apply(Yt,arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha.apply(Yt,arguments)},this.clear=function(w=!0,z=!0,Z=!0){let $=0;if(w){let q=!1;if(L!==null){let Rt=L.texture.format;q=Rt===hc||Rt===cc||Rt===lc}if(q){let Rt=L.texture.type,mt=Rt===Dn||Rt===ii||Rt===oo||Rt===bi||Rt===ac||Rt===oc,Ht=Yt.getClearColor(),Xt=Yt.getClearAlpha(),jt=Ht.r,Jt=Ht.g,Kt=Ht.b;mt?(d[0]=jt,d[1]=Jt,d[2]=Kt,d[3]=Xt,H.clearBufferuiv(H.COLOR,0,d)):(g[0]=jt,g[1]=Jt,g[2]=Kt,g[3]=Xt,H.clearBufferiv(H.COLOR,0,g))}else $|=H.COLOR_BUFFER_BIT}z&&($|=H.DEPTH_BUFFER_BIT),Z&&($|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",U,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),ft.dispose(),At.dispose(),wt.dispose(),M.dispose(),B.dispose(),it.dispose(),Ut.dispose(),kt.dispose(),_t.dispose(),Wt.dispose(),Wt.removeEventListener("sessionstart",le),Wt.removeEventListener("sessionend",_e),Ct&&(Ct.dispose(),Ct=null),Je.stop()};function gt(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;let w=Ot.autoReset,z=nt.enabled,Z=nt.autoUpdate,$=nt.needsUpdate,q=nt.type;ce(),Ot.autoReset=w,nt.enabled=z,nt.autoUpdate=Z,nt.needsUpdate=$,nt.type=q}function ht(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Mt(w){let z=w.target;z.removeEventListener("dispose",Mt),Vt(z)}function Vt(w){zt(w),wt.remove(w)}function zt(w){let z=wt.get(w).programs;z!==void 0&&(z.forEach(function(Z){_t.releaseProgram(Z)}),w.isShaderMaterial&&_t.releaseShaderCache(w))}this.renderBufferDirect=function(w,z,Z,$,q,Rt){z===null&&(z=Dt);let mt=q.isMesh&&q.matrixWorld.determinant()<0,Ht=On(w,z,Z,$,q);dt.setMaterial($,mt);let Xt=Z.index,jt=1;if($.wireframe===!0){if(Xt=et.getWireframeAttribute(Z),Xt===void 0)return;jt=2}let Jt=Z.drawRange,Kt=Z.attributes.position,Ee=Jt.start*jt,tn=(Jt.start+Jt.count)*jt;Rt!==null&&(Ee=Math.max(Ee,Rt.start*jt),tn=Math.min(tn,(Rt.start+Rt.count)*jt)),Xt!==null?(Ee=Math.max(Ee,0),tn=Math.min(tn,Xt.count)):Kt!=null&&(Ee=Math.max(Ee,0),tn=Math.min(tn,Kt.count));let Ne=tn-Ee;if(Ne<0||Ne===1/0)return;Ut.setup(q,$,Ht,Z,Xt);let bn,be=Lt;if(Xt!==null&&(bn=Q.get(Xt),be=Nt,be.setIndex(bn)),q.isMesh)$.wireframe===!0?(dt.setLineWidth($.wireframeLinewidth*Gt()),be.setMode(H.LINES)):be.setMode(H.TRIANGLES);else if(q.isLine){let ie=$.linewidth;ie===void 0&&(ie=1),dt.setLineWidth(ie*Gt()),q.isLineSegments?be.setMode(H.LINES):q.isLineLoop?be.setMode(H.LINE_LOOP):be.setMode(H.LINE_STRIP)}else q.isPoints?be.setMode(H.POINTS):q.isSprite&&be.setMode(H.TRIANGLES);if(q.isBatchedMesh)be.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else if(q.isInstancedMesh)be.renderInstances(Ee,Ne,q.count);else if(Z.isInstancedBufferGeometry){let ie=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,di=Math.min(Z.instanceCount,ie);be.renderInstances(Ee,Ne,di)}else be.render(Ee,Ne)};function de(w,z,Z){w.transparent===!0&&w.side===En&&w.forceSinglePass===!1?(w.side=Ke,w.needsUpdate=!0,Pn(w,z,Z),w.side=ai,w.needsUpdate=!0,Pn(w,z,Z),w.side=En):Pn(w,z,Z)}this.compile=function(w,z,Z=null){Z===null&&(Z=w),p=At.get(Z),p.init(),v.push(p),Z.traverseVisible(function(q){q.isLight&&q.layers.test(z.layers)&&(p.pushLight(q),q.castShadow&&p.pushShadow(q))}),w!==Z&&w.traverseVisible(function(q){q.isLight&&q.layers.test(z.layers)&&(p.pushLight(q),q.castShadow&&p.pushShadow(q))}),p.setupLights(x._useLegacyLights);let $=new Set;return w.traverse(function(q){let Rt=q.material;if(Rt)if(Array.isArray(Rt))for(let mt=0;mt<Rt.length;mt++){let Ht=Rt[mt];de(Ht,Z,q),$.add(Ht)}else de(Rt,Z,q),$.add(Rt)}),v.pop(),p=null,$},this.compileAsync=function(w,z,Z=null){let $=this.compile(w,z,Z);return new Promise(q=>{function Rt(){if($.forEach(function(mt){wt.get(mt).currentProgram.isReady()&&$.delete(mt)}),$.size===0){q(w);return}setTimeout(Rt,10)}ct.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let me=null;function Ue(w){me&&me(w)}function le(){Je.stop()}function _e(){Je.start()}let Je=new _c;Je.setAnimationLoop(Ue),typeof self<"u"&&Je.setContext(self),this.setAnimationLoop=function(w){me=w,Wt.setAnimationLoop(w),w===null?Je.stop():Je.start()},Wt.addEventListener("sessionstart",le),Wt.addEventListener("sessionend",_e),this.render=function(w,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Wt.enabled===!0&&Wt.isPresenting===!0&&(Wt.cameraAutoUpdate===!0&&Wt.updateCamera(z),z=Wt.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,z,L),p=At.get(w,v.length),p.init(),v.push(p),Tt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),W.setFromProjectionMatrix(Tt),yt=this.localClippingEnabled,ot=It.init(this.clippingPlanes,yt),_=ft.get(w,u.length),_.init(),u.push(_),hn(w,z,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(G,X),this.info.render.frame++,ot===!0&&It.beginShadows();let Z=p.state.shadowsArray;if(nt.render(Z,w,z),ot===!0&&It.endShadows(),this.info.autoReset===!0&&this.info.reset(),Yt.render(_,w),p.setupLights(x._useLegacyLights),z.isArrayCamera){let $=z.cameras;for(let q=0,Rt=$.length;q<Rt;q++){let mt=$[q];Cn(_,w,mt,mt.viewport)}}else Cn(_,w,z);L!==null&&(S.updateMultisampleRenderTarget(L),S.updateRenderTargetMipmap(L)),w.isScene===!0&&w.onAfterRender(x,w,z),Ut.resetDefaultState(),J=-1,b=null,v.pop(),v.length>0?p=v[v.length-1]:p=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function hn(w,z,Z,$){if(w.visible===!1)return;if(w.layers.test(z.layers)){if(w.isGroup)Z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(z);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||W.intersectsSprite(w)){$&&Bt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Tt);let mt=it.update(w),Ht=w.material;Ht.visible&&_.push(w,mt,Ht,Z,Bt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||W.intersectsObject(w))){let mt=it.update(w),Ht=w.material;if($&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Bt.copy(w.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),Bt.copy(mt.boundingSphere.center)),Bt.applyMatrix4(w.matrixWorld).applyMatrix4(Tt)),Array.isArray(Ht)){let Xt=mt.groups;for(let jt=0,Jt=Xt.length;jt<Jt;jt++){let Kt=Xt[jt],Ee=Ht[Kt.materialIndex];Ee&&Ee.visible&&_.push(w,mt,Ee,Z,Bt.z,Kt)}}else Ht.visible&&_.push(w,mt,Ht,Z,Bt.z,null)}}let Rt=w.children;for(let mt=0,Ht=Rt.length;mt<Ht;mt++)hn(Rt[mt],z,Z,$)}function Cn(w,z,Z,$){let q=w.opaque,Rt=w.transmissive,mt=w.transparent;p.setupLightsView(Z),ot===!0&&It.setGlobalState(x.clippingPlanes,Z),Rt.length>0&&Os(q,Rt,z,Z),$&&dt.viewport(E.copy($)),q.length>0&&un(q,z,Z),Rt.length>0&&un(Rt,z,Z),mt.length>0&&un(mt,z,Z),dt.buffers.depth.setTest(!0),dt.buffers.depth.setMask(!0),dt.buffers.color.setMask(!0),dt.setPolygonOffset(!1)}function Os(w,z,Z,$){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;let Rt=St.isWebGL2;Ct===null&&(Ct=new vn(1,1,{generateMipmaps:!0,type:ct.has("EXT_color_buffer_half_float")?bs:Dn,minFilter:Ms,samples:Rt?4:0})),x.getDrawingBufferSize(Ft),Rt?Ct.setSize(Ft.x,Ft.y):Ct.setSize(Ua(Ft.x),Ua(Ft.y));let mt=x.getRenderTarget();x.setRenderTarget(Ct),x.getClearColor(pt),N=x.getClearAlpha(),N<1&&x.setClearColor(16777215,.5),x.clear();let Ht=x.toneMapping;x.toneMapping=ri,un(w,Z,$),S.updateMultisampleRenderTarget(Ct),S.updateRenderTargetMipmap(Ct);let Xt=!1;for(let jt=0,Jt=z.length;jt<Jt;jt++){let Kt=z[jt],Ee=Kt.object,tn=Kt.geometry,Ne=Kt.material,bn=Kt.group;if(Ne.side===En&&Ee.layers.test($.layers)){let be=Ne.side;Ne.side=Ke,Ne.needsUpdate=!0,Nn(Ee,Z,$,tn,Ne,bn),Ne.side=be,Ne.needsUpdate=!0,Xt=!0}}Xt===!0&&(S.updateMultisampleRenderTarget(Ct),S.updateRenderTargetMipmap(Ct)),x.setRenderTarget(mt),x.setClearColor(pt,N),x.toneMapping=Ht}function un(w,z,Z){let $=z.isScene===!0?z.overrideMaterial:null;for(let q=0,Rt=w.length;q<Rt;q++){let mt=w[q],Ht=mt.object,Xt=mt.geometry,jt=$===null?mt.material:$,Jt=mt.group;Ht.layers.test(Z.layers)&&Nn(Ht,z,Z,Xt,jt,Jt)}}function Nn(w,z,Z,$,q,Rt){w.onBeforeRender(x,z,Z,$,q,Rt),w.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),q.onBeforeRender(x,z,Z,$,w,Rt),q.transparent===!0&&q.side===En&&q.forceSinglePass===!1?(q.side=Ke,q.needsUpdate=!0,x.renderBufferDirect(Z,z,$,q,w,Rt),q.side=ai,q.needsUpdate=!0,x.renderBufferDirect(Z,z,$,q,w,Rt),q.side=En):x.renderBufferDirect(Z,z,$,q,w,Rt),w.onAfterRender(x,z,Z,$,q,Rt)}function Pn(w,z,Z){z.isScene!==!0&&(z=Dt);let $=wt.get(w),q=p.state.lights,Rt=p.state.shadowsArray,mt=q.state.version,Ht=_t.getParameters(w,q.state,Rt,z,Z),Xt=_t.getProgramCacheKey(Ht),jt=$.programs;$.environment=w.isMeshStandardMaterial?z.environment:null,$.fog=z.fog,$.envMap=(w.isMeshStandardMaterial?B:M).get(w.envMap||$.environment),jt===void 0&&(w.addEventListener("dispose",Mt),jt=new Map,$.programs=jt);let Jt=jt.get(Xt);if(Jt!==void 0){if($.currentProgram===Jt&&$.lightsStateVersion===mt)return ui(w,Ht),Jt}else Ht.uniforms=_t.getUniforms(w),w.onBuild(Z,Ht,x),w.onBeforeCompile(Ht,x),Jt=_t.acquireProgram(Ht,Xt),jt.set(Xt,Jt),$.uniforms=Ht.uniforms;let Kt=$.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Kt.clippingPlanes=It.uniform),ui(w,Ht),$.needsLights=Hr(w),$.lightsStateVersion=mt,$.needsLights&&(Kt.ambientLightColor.value=q.state.ambient,Kt.lightProbe.value=q.state.probe,Kt.directionalLights.value=q.state.directional,Kt.directionalLightShadows.value=q.state.directionalShadow,Kt.spotLights.value=q.state.spot,Kt.spotLightShadows.value=q.state.spotShadow,Kt.rectAreaLights.value=q.state.rectArea,Kt.ltc_1.value=q.state.rectAreaLTC1,Kt.ltc_2.value=q.state.rectAreaLTC2,Kt.pointLights.value=q.state.point,Kt.pointLightShadows.value=q.state.pointShadow,Kt.hemisphereLights.value=q.state.hemi,Kt.directionalShadowMap.value=q.state.directionalShadowMap,Kt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Kt.spotShadowMap.value=q.state.spotShadowMap,Kt.spotLightMatrix.value=q.state.spotLightMatrix,Kt.spotLightMap.value=q.state.spotLightMap,Kt.pointShadowMap.value=q.state.pointShadowMap,Kt.pointShadowMatrix.value=q.state.pointShadowMatrix),$.currentProgram=Jt,$.uniformsList=null,Jt}function hs(w){if(w.uniformsList===null){let z=w.currentProgram.getUniforms();w.uniformsList=ts.seqWithValue(z.seq,w.uniforms)}return w.uniformsList}function ui(w,z){let Z=wt.get(w);Z.outputColorSpace=z.outputColorSpace,Z.batching=z.batching,Z.instancing=z.instancing,Z.instancingColor=z.instancingColor,Z.skinning=z.skinning,Z.morphTargets=z.morphTargets,Z.morphNormals=z.morphNormals,Z.morphColors=z.morphColors,Z.morphTargetsCount=z.morphTargetsCount,Z.numClippingPlanes=z.numClippingPlanes,Z.numIntersection=z.numClipIntersection,Z.vertexAlphas=z.vertexAlphas,Z.vertexTangents=z.vertexTangents,Z.toneMapping=z.toneMapping}function On(w,z,Z,$,q){z.isScene!==!0&&(z=Dt),S.resetTextureUnits();let Rt=z.fog,mt=$.isMeshStandardMaterial?z.environment:null,Ht=L===null?x.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:$n,Xt=($.isMeshStandardMaterial?B:M).get($.envMap||mt),jt=$.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Jt=!!Z.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Kt=!!Z.morphAttributes.position,Ee=!!Z.morphAttributes.normal,tn=!!Z.morphAttributes.color,Ne=ri;$.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Ne=x.toneMapping);let bn=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,be=bn!==void 0?bn.length:0,ie=wt.get($),di=p.state.lights;if(ot===!0&&(yt===!0||w!==b)){let Te=w===b&&$.id===J;It.setState($,w,Te)}let xe=!1;$.version===ie.__version?(ie.needsLights&&ie.lightsStateVersion!==di.state.version||ie.outputColorSpace!==Ht||q.isBatchedMesh&&ie.batching===!1||!q.isBatchedMesh&&ie.batching===!0||q.isInstancedMesh&&ie.instancing===!1||!q.isInstancedMesh&&ie.instancing===!0||q.isSkinnedMesh&&ie.skinning===!1||!q.isSkinnedMesh&&ie.skinning===!0||q.isInstancedMesh&&ie.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&ie.instancingColor===!1&&q.instanceColor!==null||ie.envMap!==Xt||$.fog===!0&&ie.fog!==Rt||ie.numClippingPlanes!==void 0&&(ie.numClippingPlanes!==It.numPlanes||ie.numIntersection!==It.numIntersection)||ie.vertexAlphas!==jt||ie.vertexTangents!==Jt||ie.morphTargets!==Kt||ie.morphNormals!==Ee||ie.morphColors!==tn||ie.toneMapping!==Ne||St.isWebGL2===!0&&ie.morphTargetsCount!==be)&&(xe=!0):(xe=!0,ie.__version=$.version);let sn=ie.currentProgram;xe===!0&&(sn=Pn($,z,q));let fi=!1,pi=!1,ds=!1,Xe=sn.getUniforms(),Ln=ie.uniforms;if(dt.useProgram(sn.program)&&(fi=!0,pi=!0,ds=!0),$.id!==J&&(J=$.id,pi=!0),fi||b!==w){Xe.setValue(H,"projectionMatrix",w.projectionMatrix),Xe.setValue(H,"viewMatrix",w.matrixWorldInverse);let Te=Xe.map.cameraPosition;Te!==void 0&&Te.setValue(H,Bt.setFromMatrixPosition(w.matrixWorld)),St.logarithmicDepthBuffer&&Xe.setValue(H,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Xe.setValue(H,"isOrthographic",w.isOrthographicCamera===!0),b!==w&&(b=w,pi=!0,ds=!0)}if(q.isSkinnedMesh){Xe.setOptional(H,q,"bindMatrix"),Xe.setOptional(H,q,"bindMatrixInverse");let Te=q.skeleton;Te&&(St.floatVertexTextures?(Te.boneTexture===null&&Te.computeBoneTexture(),Xe.setValue(H,"boneTexture",Te.boneTexture,S)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}q.isBatchedMesh&&(Xe.setOptional(H,q,"batchingTexture"),Xe.setValue(H,"batchingTexture",q._matricesTexture,S));let Ii=Z.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0&&St.isWebGL2===!0)&&Pt.update(q,Z,sn),(pi||ie.receiveShadow!==q.receiveShadow)&&(ie.receiveShadow=q.receiveShadow,Xe.setValue(H,"receiveShadow",q.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Ln.envMap.value=Xt,Ln.flipEnvMap.value=Xt.isCubeTexture&&Xt.isRenderTargetTexture===!1?-1:1),pi&&(Xe.setValue(H,"toneMappingExposure",x.toneMappingExposure),ie.needsLights&&us(Ln,ds),Rt&&$.fog===!0&&lt.refreshFogUniforms(Ln,Rt),lt.refreshMaterialUniforms(Ln,$,F,O,Ct),ts.upload(H,hs(ie),Ln,S)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(ts.upload(H,hs(ie),Ln,S),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Xe.setValue(H,"center",q.center),Xe.setValue(H,"modelViewMatrix",q.modelViewMatrix),Xe.setValue(H,"normalMatrix",q.normalMatrix),Xe.setValue(H,"modelMatrix",q.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){let Te=$.uniformsGroups;for(let Fn=0,Gr=Te.length;Fn<Gr;Fn++)if(St.isWebGL2){let fs=Te[Fn];kt.update(fs,sn),kt.bind(fs,sn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return sn}function us(w,z){w.ambientLightColor.needsUpdate=z,w.lightProbe.needsUpdate=z,w.directionalLights.needsUpdate=z,w.directionalLightShadows.needsUpdate=z,w.pointLights.needsUpdate=z,w.pointLightShadows.needsUpdate=z,w.spotLights.needsUpdate=z,w.spotLightShadows.needsUpdate=z,w.rectAreaLights.needsUpdate=z,w.hemisphereLights.needsUpdate=z}function Hr(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(w,z,Z){wt.get(w.texture).__webglTexture=z,wt.get(w.depthTexture).__webglTexture=Z;let $=wt.get(w);$.__hasExternalTextures=!0,$.__hasExternalTextures&&($.__autoAllocateDepthBuffer=Z===void 0,$.__autoAllocateDepthBuffer||ct.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,z){let Z=wt.get(w);Z.__webglFramebuffer=z,Z.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(w,z=0,Z=0){L=w,P=z,T=Z;let $=!0,q=null,Rt=!1,mt=!1;if(w){let Xt=wt.get(w);Xt.__useDefaultFramebuffer!==void 0?(dt.bindFramebuffer(H.FRAMEBUFFER,null),$=!1):Xt.__webglFramebuffer===void 0?S.setupRenderTarget(w):Xt.__hasExternalTextures&&S.rebindTextures(w,wt.get(w.texture).__webglTexture,wt.get(w.depthTexture).__webglTexture);let jt=w.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(mt=!0);let Jt=wt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Jt[z])?q=Jt[z][Z]:q=Jt[z],Rt=!0):St.isWebGL2&&w.samples>0&&S.useMultisampledRTT(w)===!1?q=wt.get(w).__webglMultisampledFramebuffer:Array.isArray(Jt)?q=Jt[Z]:q=Jt,E.copy(w.viewport),k.copy(w.scissor),tt=w.scissorTest}else E.copy(at).multiplyScalar(F).floor(),k.copy(j).multiplyScalar(F).floor(),tt=rt;if(dt.bindFramebuffer(H.FRAMEBUFFER,q)&&St.drawBuffers&&$&&dt.drawBuffers(w,q),dt.viewport(E),dt.scissor(k),dt.setScissorTest(tt),Rt){let Xt=wt.get(w.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+z,Xt.__webglTexture,Z)}else if(mt){let Xt=wt.get(w.texture),jt=z||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,Xt.__webglTexture,Z||0,jt)}J=-1},this.readRenderTargetPixels=function(w,z,Z,$,q,Rt,mt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ht=wt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&mt!==void 0&&(Ht=Ht[mt]),Ht){dt.bindFramebuffer(H.FRAMEBUFFER,Ht);try{let Xt=w.texture,jt=Xt.format,Jt=Xt.type;if(jt!==_n&&xt.convert(jt)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Kt=Jt===bs&&(ct.has("EXT_color_buffer_half_float")||St.isWebGL2&&ct.has("EXT_color_buffer_float"));if(Jt!==Dn&&xt.convert(Jt)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Jt===Yn&&(St.isWebGL2||ct.has("OES_texture_float")||ct.has("WEBGL_color_buffer_float")))&&!Kt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=w.width-$&&Z>=0&&Z<=w.height-q&&H.readPixels(z,Z,$,q,xt.convert(jt),xt.convert(Jt),Rt)}finally{let Xt=L!==null?wt.get(L).__webglFramebuffer:null;dt.bindFramebuffer(H.FRAMEBUFFER,Xt)}}},this.copyFramebufferToTexture=function(w,z,Z=0){let $=Math.pow(2,-Z),q=Math.floor(z.image.width*$),Rt=Math.floor(z.image.height*$);S.setTexture2D(z,0),H.copyTexSubImage2D(H.TEXTURE_2D,Z,0,0,w.x,w.y,q,Rt),dt.unbindTexture()},this.copyTextureToTexture=function(w,z,Z,$=0){let q=z.image.width,Rt=z.image.height,mt=xt.convert(Z.format),Ht=xt.convert(Z.type);S.setTexture2D(Z,0),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,Z.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,Z.unpackAlignment),z.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,$,w.x,w.y,q,Rt,mt,Ht,z.image.data):z.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,$,w.x,w.y,z.mipmaps[0].width,z.mipmaps[0].height,mt,z.mipmaps[0].data):H.texSubImage2D(H.TEXTURE_2D,$,w.x,w.y,mt,Ht,z.image),$===0&&Z.generateMipmaps&&H.generateMipmap(H.TEXTURE_2D),dt.unbindTexture()},this.copyTextureToTexture3D=function(w,z,Z,$,q=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Rt=w.max.x-w.min.x+1,mt=w.max.y-w.min.y+1,Ht=w.max.z-w.min.z+1,Xt=xt.convert($.format),jt=xt.convert($.type),Jt;if($.isData3DTexture)S.setTexture3D($,0),Jt=H.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)S.setTexture2DArray($,0),Jt=H.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,$.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,$.unpackAlignment);let Kt=H.getParameter(H.UNPACK_ROW_LENGTH),Ee=H.getParameter(H.UNPACK_IMAGE_HEIGHT),tn=H.getParameter(H.UNPACK_SKIP_PIXELS),Ne=H.getParameter(H.UNPACK_SKIP_ROWS),bn=H.getParameter(H.UNPACK_SKIP_IMAGES),be=Z.isCompressedTexture?Z.mipmaps[q]:Z.image;H.pixelStorei(H.UNPACK_ROW_LENGTH,be.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,be.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,w.min.x),H.pixelStorei(H.UNPACK_SKIP_ROWS,w.min.y),H.pixelStorei(H.UNPACK_SKIP_IMAGES,w.min.z),Z.isDataTexture||Z.isData3DTexture?H.texSubImage3D(Jt,q,z.x,z.y,z.z,Rt,mt,Ht,Xt,jt,be.data):Z.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),H.compressedTexSubImage3D(Jt,q,z.x,z.y,z.z,Rt,mt,Ht,Xt,be.data)):H.texSubImage3D(Jt,q,z.x,z.y,z.z,Rt,mt,Ht,Xt,jt,be),H.pixelStorei(H.UNPACK_ROW_LENGTH,Kt),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ee),H.pixelStorei(H.UNPACK_SKIP_PIXELS,tn),H.pixelStorei(H.UNPACK_SKIP_ROWS,Ne),H.pixelStorei(H.UNPACK_SKIP_IMAGES,bn),q===0&&$.generateMipmaps&&H.generateMipmap(Jt),dt.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?S.setTextureCube(w,0):w.isData3DTexture?S.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?S.setTexture2DArray(w,0):S.setTexture2D(w,0),dt.unbindTexture()},this.resetState=function(){P=0,T=0,L=null,dt.reset(),Ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===lo?"display-p3":"srgb",e.unpackColorSpace=ve.workingColorSpace===Or?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ze?wi:dc}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===wi?ze:$n}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},Za=class extends ws{};Za.prototype.isWebGL1Renderer=!0;var As=class extends yn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}},Pr=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Pa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Jn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},rn=new I,Lr=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyMatrix4(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyNormalMatrix(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.transformDirection(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}setX(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=qn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=qn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=qn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=qn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),s=Me(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),s=Me(s,this.array),r=Me(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new pe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var $l=new I,Kl=new ke,jl=new ke,Im=new I,Ql=new ye,ar=new I,ba=new Ai,tc=new ye,Sa=new vr,ci=class extends He{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Do,this.bindMatrix=new ye,this.bindMatrixInverse=new ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new li),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,ar),this.boundingBox.expandByPoint(ar)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ai),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,ar),this.boundingSphere.expandByPoint(ar)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ba.copy(this.boundingSphere),ba.applyMatrix4(s),t.ray.intersectsSphere(ba)!==!1&&(tc.copy(s).invert(),Sa.copy(t.ray).applyMatrix4(tc),!(this.boundingBox!==null&&Sa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Sa)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new ke,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Do?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===_h?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;Kl.fromBufferAttribute(s.attributes.skinIndex,t),jl.fromBufferAttribute(s.attributes.skinWeight,t),$l.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let l=jl.getComponent(r);if(l!==0){let a=Kl.getComponent(r);Ql.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Im.copy($l).applyMatrix4(Ql),l)}}return e.applyMatrix4(this.bindMatrixInverse)}boneTransform(t,e){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(t,e)}},Es=class extends yn{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ja=class extends pn{constructor(t=null,e=1,n=1,s,r,l,a,o,c=$e,h=$e,f,m){super(null,l,a,o,c,h,s,r,f,m),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ec=new ye,Um=new ye,Ir=class i{constructor(t=[],e=[]){this.uuid=Jn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ye)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new ye;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,l=t.length;r<l;r++){let a=t[r]?t[r].matrixWorld:Um;ec.multiplyMatrices(a,e[r]),ec.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Ja(e,t,t,_n,Yn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],l=e[r];l===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),l=new Es),this.bones.push(l),this.boneInverses.push(new ye().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let l=e[s];t.bones.push(l.uuid);let a=n[s];t.boneInverses.push(a.toArray())}return t}};var Ur=class extends pn{constructor(t,e,n,s,r,l,a,o,c){super(t,e,n,s,r,l,a,o,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ts=class i extends mn{constructor(t=1,e=1,n=1,s=32,r=1,l=!1,a=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:l,thetaStart:a,thetaLength:o};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],m=[],d=[],g=0,_=[],p=n/2,u=0;v(),l===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new Ze(f,3)),this.setAttribute("normal",new Ze(m,3)),this.setAttribute("uv",new Ze(d,2));function v(){let A=new I,P=new I,T=0,L=(e-t)/n;for(let J=0;J<=r;J++){let b=[],E=J/r,k=E*(e-t)+t;for(let tt=0;tt<=s;tt++){let pt=tt/s,N=pt*o+a,V=Math.sin(N),O=Math.cos(N);P.x=k*V,P.y=-E*n+p,P.z=k*O,f.push(P.x,P.y,P.z),A.set(V,L,O).normalize(),m.push(A.x,A.y,A.z),d.push(pt,1-E),b.push(g++)}_.push(b)}for(let J=0;J<s;J++)for(let b=0;b<r;b++){let E=_[b][J],k=_[b+1][J],tt=_[b+1][J+1],pt=_[b][J+1];h.push(E,k,pt),h.push(k,tt,pt),T+=6}c.addGroup(u,T,0),u+=T}function x(A){let P=g,T=new ge,L=new I,J=0,b=A===!0?t:e,E=A===!0?1:-1;for(let tt=1;tt<=s;tt++)f.push(0,p*E,0),m.push(0,E,0),d.push(.5,.5),g++;let k=g;for(let tt=0;tt<=s;tt++){let N=tt/s*o+a,V=Math.cos(N),O=Math.sin(N);L.x=b*O,L.y=p*E,L.z=b*V,f.push(L.x,L.y,L.z),m.push(0,E,0),T.x=V*.5+.5,T.y=O*.5*E+.5,d.push(T.x,T.y),g++}for(let tt=0;tt<s;tt++){let pt=P+tt,N=k+tt;A===!0?h.push(N,N+1,pt):h.push(N+1,N,pt),J+=3}c.addGroup(u,J,A===!0?1:2),u+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Rs=class i extends mn{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,l=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:l,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let o=Math.min(l+a,Math.PI),c=0,h=[],f=new I,m=new I,d=[],g=[],_=[],p=[];for(let u=0;u<=n;u++){let v=[],x=u/n,A=0;u===0&&l===0?A=.5/e:u===n&&o===Math.PI&&(A=-.5/e);for(let P=0;P<=e;P++){let T=P/e;f.x=-t*Math.cos(s+T*r)*Math.sin(l+x*a),f.y=t*Math.cos(l+x*a),f.z=t*Math.sin(s+T*r)*Math.sin(l+x*a),g.push(f.x,f.y,f.z),m.copy(f).normalize(),_.push(m.x,m.y,m.z),p.push(T+A,1-x),v.push(c++)}h.push(v)}for(let u=0;u<n;u++)for(let v=0;v<e;v++){let x=h[u][v+1],A=h[u][v],P=h[u+1][v],T=h[u+1][v+1];(u!==0||l>0)&&d.push(x,A,T),(u!==n-1||o<Math.PI)&&d.push(A,P,T)}this.setIndex(d),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(_,3)),this.setAttribute("uv",new Ze(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Dr=class i extends mn{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let l=[],a=[],o=[],c=[],h=new I,f=new I,m=new I;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){let _=g/s*r,p=d/n*Math.PI*2;f.x=(t+e*Math.cos(p))*Math.cos(_),f.y=(t+e*Math.cos(p))*Math.sin(_),f.z=e*Math.sin(p),a.push(f.x,f.y,f.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),m.subVectors(f,h).normalize(),o.push(m.x,m.y,m.z),c.push(g/s),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){let _=(s+1)*d+g-1,p=(s+1)*(d-1)+g-1,u=(s+1)*(d-1)+g,v=(s+1)*d+g;l.push(_,p,v),l.push(p,u,v)}this.setIndex(l),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(o,3)),this.setAttribute("uv",new Ze(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};function or(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Dm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var as=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let l;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}l=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let o=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===o)break;if(s=r,r=e[--n-1],t>=r)break t}l=n,n=0;break e}break n}for(;n<l;){let a=n+l>>>1;t<e[a]?l=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let l=0;l!==s;++l)e[l]=n[r+l];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},$a=class extends as{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ol,endingEnd:ol}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,l=t+1,a=s[r],o=s[l];if(a===void 0)switch(this.getSettings_().endingStart){case ll:r=t,a=2*e-n;break;case cl:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(o===void 0)switch(this.getSettings_().endingEnd){case ll:l=t,o=2*n-e;break;case cl:l=1,o=n+s[1]-s[0];break;default:l=t-1,o=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(o-n),this._offsetPrev=r*h,this._offsetNext=l*h}interpolate_(t,e,n,s){let r=this.resultBuffer,l=this.sampleValues,a=this.valueSize,o=t*a,c=o-a,h=this._offsetPrev,f=this._offsetNext,m=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),_=g*g,p=_*g,u=-m*p+2*m*_-m*g,v=(1+m)*p+(-1.5-2*m)*_+(-.5+m)*g+1,x=(-1-d)*p+(1.5+d)*_+.5*g,A=d*p-d*_;for(let P=0;P!==a;++P)r[P]=u*l[h+P]+v*l[c+P]+x*l[o+P]+A*l[f+P];return r}},Ka=class extends as{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,l=this.sampleValues,a=this.valueSize,o=t*a,c=o-a,h=(n-e)/(s-e),f=1-h;for(let m=0;m!==a;++m)r[m]=l[c+m]*f+l[o+m]*h;return r}},ja=class extends as{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Rn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=or(e,this.TimeBufferType),this.values=or(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:or(t.times,Array),values:or(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ja(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ka(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new $a(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case cr:e=this.InterpolantFactoryMethodDiscrete;break;case hr:e=this.InterpolantFactoryMethodLinear;break;case Kr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return cr;case this.InterpolantFactoryMethodLinear:return hr;case this.InterpolantFactoryMethodSmooth:return Kr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,l=s-1;for(;r!==s&&n[r]<t;)++r;for(;l!==-1&&n[l]>e;)--l;if(++l,r!==0||l!==s){r>=l&&(l=Math.max(l,1),r=l-1);let a=this.getValueSize();this.times=n.slice(r,l),this.values=this.values.slice(r*a,l*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let l=null;for(let a=0;a!==r;a++){let o=n[a];if(typeof o=="number"&&isNaN(o)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,o),t=!1;break}if(l!==null&&l>o){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,o,l),t=!1;break}l=o}if(s!==void 0&&Dm(s))for(let a=0,o=s.length;a!==o;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Kr,r=t.length-1,l=1;for(let a=1;a<r;++a){let o=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)o=!0;else{let f=a*n,m=f-n,d=f+n;for(let g=0;g!==n;++g){let _=e[f+g];if(_!==e[m+g]||_!==e[d+g]){o=!0;break}}}if(o){if(a!==l){t[l]=t[a];let f=a*n,m=l*n;for(let d=0;d!==n;++d)e[m+d]=e[f+d]}++l}}if(r>0){t[l]=t[r];for(let a=r*n,o=l*n,c=0;c!==n;++c)e[o+c]=e[a+c];++l}return l!==t.length?(this.times=t.slice(0,l),this.values=e.slice(0,l*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Rn.prototype.TimeBufferType=Float32Array;Rn.prototype.ValueBufferType=Float32Array;Rn.prototype.DefaultInterpolation=hr;var Ri=class extends Rn{};Ri.prototype.ValueTypeName="bool";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=cr;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var Qa=class extends Rn{};Qa.prototype.ValueTypeName="color";var to=class extends Rn{};to.prototype.ValueTypeName="number";var eo=class extends as{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,l=this.sampleValues,a=this.valueSize,o=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)ne.slerpFlat(r,0,l,c-a,l,c,o);return r}},Cs=class extends Rn{InterpolantFactoryMethodLinear(t){return new eo(this.times,this.values,this.getValueSize(),t)}};Cs.prototype.ValueTypeName="quaternion";Cs.prototype.DefaultInterpolation=hr;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;var Ci=class extends Rn{};Ci.prototype.ValueTypeName="string";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=cr;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var no=class extends Rn{};no.prototype.ValueTypeName="vector";var io=class{constructor(t,e,n){let s=this,r=!1,l=0,a=0,o,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,l,a),r=!0},this.itemEnd=function(h){l++,s.onProgress!==void 0&&s.onProgress(h,l,a),l===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return o?o(h):h},this.setURLModifier=function(h){return o=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,m=c.length;f<m;f+=2){let d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}},Nm=new io,so=class{constructor(t){this.manager=t!==void 0?t:Nm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};so.DEFAULT_MATERIAL_NAME="__DEFAULT";var ho="\\[\\]\\.:\\/",Om=new RegExp("["+ho+"]","g"),uo="[^"+ho+"]",Fm="[^"+ho.replace("\\.","")+"]",Bm=/((?:WC+[\/:])*)/.source.replace("WC",uo),zm=/(WCOD+)?/.source.replace("WCOD",Fm),km=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uo),Vm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uo),Hm=new RegExp("^"+Bm+zm+km+Vm+"$"),Gm=["material","materials","bones","map"],ro=class{constructor(t,e,n){let s=n||Ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ae=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Om,"")}static parseTrackName(t){let e=Hm.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Gm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let l=0;l<r.length;l++){let a=r[l];if(a.name===e||a.uuid===e)return a;let o=n(a.children);if(o)return o}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let l=t[s];if(l===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}o=this.BindingType.ArrayElement,this.resolvedProperty=l,this.propertyIndex=r}else l.fromArray!==void 0&&l.toArray!==void 0?(o=this.BindingType.HasFromToArray,this.resolvedProperty=l):Array.isArray(l)?(o=this.BindingType.EntireArray,this.resolvedProperty=l):this.propertyName=s;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ae.Composite=ro;Ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ae.prototype.GetterByBindingType=[Ae.prototype._getValue_direct,Ae.prototype._getValue_array,Ae.prototype._getValue_arrayElement,Ae.prototype._getValue_toArray];Ae.prototype.SetterByBindingTypeAndVersioning=[[Ae.prototype._setValue_direct,Ae.prototype._setValue_direct_setNeedsUpdate,Ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_array,Ae.prototype._setValue_array_setNeedsUpdate,Ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_arrayElement,Ae.prototype._setValue_arrayElement_setNeedsUpdate,Ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_fromArray,Ae.prototype._setValue_fromArray_setNeedsUpdate,Ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ug=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ao}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ao);var po={down:[0,-1,0],in:[-1,0,0],wall:[1,0,0],up:[0,1,0],fwd:[0,0,1],back:[0,0,-1],out:[1,0,0]},Sc={side:0,three:30,front:90,back:-90,"side-left":180,"three-left":150},Wm={rl:{x:.12,y:.072,z:0,f:72},ll:{x:.12,y:.072,z:0,f:72}},Ps={stand:Object.assign({p:[.93,-.062],t:[180,180],n:180,ra:[4,8],la:[4,8],hR:"relax",hL:"relax",pnR:"in",pnL:"in",on:"fR fL",lo:4},Wm),seat:{p:[.55,-.16],t:[182,180],n:180,ra:[14,72],la:[14,72],hR:"relax",hL:"relax",pnR:"down",pnL:"down",on:"p fR fL",lo:7,rl:{x:.13,y:.072,z:.3,f:72,pole:[0,0,1]},ll:{x:.13,y:.072,z:.3,f:72,pole:[0,0,1]},props:["chair"]},floor:{p:[.11,-.25],t:[180,182],n:180,ra:[8,10],la:[8,10],hR:"flat",hL:"flat",pnR:"down",pnL:"down",on:"p",lo:5,rl:[90,90,172],ll:[90,90,172],props:["mat"]},cross:{p:[.15,-.28],t:[176,181],n:182,rl:{x:-.12,y:.055,z:.02,f:60,pole:[1,.2,.35]},ll:{x:-.15,y:.07,z:.08,f:60,pole:[1,.2,.35]},ra:{x:.34,y:.2,z:.05,f:70,pole:[1,-.3,-.4]},la:{x:.34,y:.2,z:.05,f:70,pole:[1,-.3,-.4]},hR:"relax",hL:"relax",pnR:"down",pnL:"down",ao:18,lo:0,on:"p",props:["mat"]},kneel:{p:[.6,-.03],t:[180,180],n:180,ra:[4,8],la:[4,8],hR:"relax",hL:"relax",pnR:"in",pnL:"in",on:"kR kL",an:["lowerleg01.*",.055],rl:[0,-90,-96],ll:[0,-90,-96],props:["mat"]},"half-kneel":{p:[.6,-.03],t:[180,180],n:180,ra:[4,8],la:[4,8],hR:"relax",hL:"relax",pnR:"in",pnL:"in",on:"kR fL",an:["lowerleg01.R",.055],rl:[0,-90,-96],ll:{x:.12,y:.072,z:.5,f:72,pole:[0,0,1]},props:["mat"]},fours:{p:[.5,0],t:[100,103],n:98,an:["lowerleg01.*",.055],on:"hR hL kR kL",ra:[-2,-2,82],la:[-2,-2,82],rl:[0,-90,-96],ll:[0,-90,-96],hR:"flat",hL:"flat",pnR:"down",pnL:"down",ao:6,props:["mat"]},plank:{p:[.6,0],t:[108,108],n:104,reach:.95,an:["toe1-1.R",.025,-.82],on:"hR hL tR tL",ra:{dx:.1,y:.055,z:.4,pole:[.5,0,-1],f:82},la:{dx:.1,y:.055,z:.4,pole:[.5,0,-1],f:82},rl:[-72,-72,22,64],ll:[-72,-72,22,64],hR:"flat",hL:"flat",pnR:"down",pnL:"down",lo:3,props:["mat"]},back:{p:[.1,-.02],t:[-90,-90],n:-90,ra:[88,90,90],la:[88,90,90],rl:[90,90,176],ll:[90,90,176],hR:"relax",hL:"relax",pnR:"down",pnL:"down",on:"p b",ao:10,lo:4,props:["mat"]},front:{p:[.12,-.05],t:[90,90],n:92,ra:[-88,-90,-90],la:[-88,-90,-90],rl:[-90,-90,-100],ll:[-90,-90,-100],hR:"flat",hL:"flat",pnR:"up",pnL:"up",on:"p",ao:10,lo:4,props:["mat"]},side:{p:[.21,0],rz:90,t:[180,180],n:180,ra:[172,176,178],la:[6,10],rl:[0,0],ll:[0,0],hR:"relax",hL:"relax",on:"p",ao:0,lo:2,props:["mat"]},hang:{p:[1.06,-.03],t:[180,180],n:180,ra:{x:.24,y:2.2,z:0,pole:[1,0,-.3],f:180},la:{x:.24,y:2.2,z:0,pole:[1,0,-.3],f:180},rl:[2,-6,30],ll:[2,-6,30],hR:"grip",hL:"grip",pnR:"fwd",pnL:"fwd",on:"hR hL",lo:3,props:["bar"]}},Xm=i=>i.replace(/\.L\b|\.R\b|\*L|\*R/g,t=>t.replace("L","").replace("R","L").replace("","R")),qm={ra:"la",la:"ra",rl:"ll",ll:"rl",hR:"hL",hL:"hR",pnR:"pnL",pnL:"pnR",shR:"shL",shL:"shR",rollR:"rollL",rollL:"rollR",raO:"laO",laO:"raO",rlO:"llO",llO:"rlO"},Ym=["px","yaw","tw","lb","rz","hy","ht"];function Zm(i){let t={};for(let[e,n]of Object.entries(i)){let s=qm[e]||e,r=n;Ym.includes(e)&&typeof n=="number"?r=-n:e==="on"&&typeof n=="string"?r=n.split(" ").map(l=>l.length===2?l[0]+(l[1]==="R"?"L":l[1]==="L"?"R":l[1]):l).join(" "):e==="an"&&Array.isArray(n)?r=[Xm(n[0])].concat(n.slice(1)):e==="gl"&&Array.isArray(n)?r=[n[1],n[0]]:e==="hold"&&(n==="R"||n==="L")?r=n==="R"?"L":"R":(e==="fitArm"||e==="fitLeg")&&n&&n.side&&(r=Object.assign({},n,{side:n.side==="R"?"L":n.side==="L"?"R":n.side})),t[s]=r}return t}var Jm=i=>typeof i=="string"?po[i]||po.down:i;function $m(i){if(i==null)return i;if(Array.isArray(i))return i.map(e=>e==="flat"?82:e);let t=Object.assign({},i);return t.f==="flat"&&(t.f=82),t}function Km(i,t){if(!t||!Array.isArray(t.k)||t.k.length<1)throw new Error(i+": k (key poses) is required");let e=Object.assign({},t);e.name=t.name||i,e.tempo=+t.tempo||3;let n=t.k.map(a=>Object.assign({},a));t.mirror&&(n=n.concat(n.map(Zm)),e.alt=!0,t.top&&(e.top=t.top.concat(t.top.map(a=>a+t.k.length))),t.dur&&(e.dur=t.dur.concat(t.dur))),n.length===1&&n.push(Object.assign({},n[0])),e.k=n.map((a,o)=>{let c=a.b||t.base,h=c?Ps[c]:null;if(c&&!h)throw new Error(i+": unknown base "+c);let f=Object.assign({},h?JSON.parse(JSON.stringify(h)):{},a);if(delete f.props,delete f.b,!f.p||!f.t)throw new Error(i+": key "+o+" needs p and t (or a base)");for(let m of["ra","la","rl","ll"])f[m]=$m(f[m]);for(let m of["pnR","pnL"])f[m]!=null&&(f[m]=Jm(f[m]));return f});for(let a of["pnR","pnL"]){if(!e.k.some(c=>c[a]!=null)||e.k.every(c=>c[a]!=null))continue;let o=e.k.slice().reverse().find(c=>c[a]!=null)[a];e.k.forEach(c=>{c[a]!=null?o=c[a]:c[a]=o})}if(e.k.map(a=>a.hold).filter(Boolean).length){let a=e.k.slice().reverse().find(o=>o.hold).hold;e.k.forEach(o=>{o.hold?a=o.hold:o.hold=a})}let r=t.base?Ps[t.base]:null,l=t.props||r&&r.props||[];if(t.gear){l=l.slice();for(let a of String(t.gear).split("+"))l.push(a==="db"?{id:"dumbbell",at:"hip"}:a)}return e.props=l.map(a=>typeof a=="string"?{id:a}:Object.assign({},a)),e.k.some(a=>Math.abs(a.rz||0)>45)&&e.props.forEach(a=>{a.id==="mat"&&a.along==null&&(a.along="x")}),e.cam=Object.assign({yaw:30,el:10,zoom:1},t.cam||{}),e.cam.view!=null&&(e.cam.yaw=Sc[e.cam.view]!=null?Sc[e.cam.view]+(e.cam.turn||0):e.cam.yaw),e.glow=t.glow||{},e.form=(t.form||[]).map(a=>Object.assign({},a)),e}var hi={},mo={},jm=[];function fo(i,t){try{hi[i]=Km(i,t),delete mo[i]}catch(e){mo[i]=String(e.message||e)}return jm.forEach(e=>{try{e(i)}catch{}}),hi[i]}function wc(i){let t=i.GG3D=i.GG3D&&typeof i.GG3D=="object"?i.GG3D:{},e=Array.isArray(t.q)?t.q:[];return t.define=fo,t.patterns=()=>Object.keys(hi),t.errors=()=>Object.assign({},mo),t.get=n=>hi[n],t.BASES=Ps,t.FLAT=82,t.PALM=po,t.q={push:n=>fo(n[0],n[1])},e.forEach(n=>fo(n[0],n[1])),t}var go=new I(0,1,0);function Ac(i,t){let e=(d,g,_,p,u,v)=>i(new Ei(d,g,_),[p,u,v]),n=(d,g,_,p,u,v,x=14)=>{let A=new Ts(d,d,g,x);return _==="x"&&A.rotateZ(Math.PI/2),_==="z"&&A.rotateX(Math.PI/2),i(A,[p,u,v])},s=(d,g,_)=>{let p=new fe;p.add(d);let u=[g.x!=null?g.x:_[0],g.y0!=null?g.y0:_[1],g.z!=null?g.z:_[2]];return{obj:p,update(v){p.scale.setScalar(v.s),p.position.set(u[0]*v.s,u[1]*v.s,u[2]*v.s)}}},r=d=>i(new Ts(d,d,1,8),[0,0,0]),l=(d,g,_)=>{let p=_.clone().sub(g),u=p.length()||1e-4;d.position.copy(g).addScaledVector(p,.5),d.scale.set(1,u,1),d.quaternion.setFromUnitVectors(go,p.normalize())},a=(d,g)=>{let _=d.bones["wrist."+g],p=d.bones["finger3-1."+g],u=_.getWorldPosition(new I),v=p.getWorldPosition(new I);return u.lerp(v,.62)},o=d=>a(d,"R").add(a(d,"L")).multiplyScalar(.5),c=()=>{let d=new fe;return d.add(n(.015,.27,"x",0,0,0)),d.add(n(.06,.045,"x",.115,0,0,6)),d.add(n(.06,.045,"x",-.115,0,0,6)),d},h=(d,g)=>d.bones["wrist."+g].getWorldQuaternion(new ne).multiply(new ne().setFromAxisAngle(new I(0,0,1),Math.PI/2)),f=(d,g)=>({obj:d,update(_){if(d.scale.setScalar(_.s),g==="key"){let p=_.hold||{},u=p.a==="L"?"L":"R",v=p.b==="L"?"L":p.b==="R"?"R":u,x=u===v?0:p.w||0;d.position.copy(a(_,u).lerp(a(_,v),x)),d.quaternion.copy(h(_,u).slerp(h(_,v),x));return}d.position.copy(a(_,g)),d.quaternion.copy(h(_,g))}}),m={mat:d=>{let g=s(e(.62,.012,d.len||1.85,0,.006,0),d,d.along==="x"?[0,0,0]:[0,0,-.1]);return d.along==="x"&&(g.obj.children[0].rotation.y=Math.PI/2),g},bench:d=>{let g=new fe,_=d.len||1.2,p=d.y||.45;return g.add(e(.3,.07,_,0,p-.035,0)),g.add(e(.05,p-.07,.05,0,(p-.07)/2,_/2-.12)),g.add(e(.05,p-.07,.05,0,(p-.07)/2,-_/2+.12)),g.add(e(.42,.03,.06,0,.015,_/2-.12)),g.add(e(.42,.03,.06,0,.015,-_/2+.12)),s(g,d,[0,0,-.15])},incline:d=>{let g=new fe,_=(d.angle!=null?d.angle:45)*Math.PI/180,p=.45;g.add(e(.3,.07,.35,0,p-.035,.175));let u=e(.3,.07,.9,0,0,0),v=new fe;return v.add(u),u.position.set(0,0,-.45),v.position.set(0,p,0),v.rotation.x=_,g.add(v),g.add(e(.05,p,.05,0,p/2,.25)),g.add(e(.05,p+Math.sin(_)*.6,.05,0,(p+Math.sin(_)*.6)/2,-Math.cos(_)*.6)),g.add(e(.42,.03,.7,0,.015,-.1)),s(g,d,[0,0,0])},step:d=>{let g=d.y||.2;return s(e(.7,g,.4,0,g/2,0),d,[0,0,.4])},box:d=>{let g=d.y||.45;return s(e(.5,g,.5,0,g/2,0),d,[0,0,.45])},chair:d=>{let g=new fe;g.add(e(.44,.04,.42,0,.44,0)),g.add(e(.44,.5,.03,0,.69,-.2));for(let[_,p]of[[-.2,-.19],[.2,-.19],[-.2,.19],[.2,.19]])g.add(e(.03,.42,.03,_,.21,p));return s(g,d,[0,0,-.19])},wall:d=>{let g=t(d.at||"left",d.d);return{obj:g.obj,update:g.update}},dumbbell:d=>{if(d.at==="hands"){let g=c();return{obj:g,update(_){g.scale.setScalar(_.s),g.position.copy(o(_)),g.quaternion.copy(_.bones.spine01.getWorldQuaternion(new ne)).multiply(new ne().setFromAxisAngle(new I(0,0,1),Math.PI/2))}}}if(d.at==="hip"){let g=c();return{obj:g,update(_){let p=_.bones.root,u=p.getWorldQuaternion(new ne);g.scale.setScalar(_.s),g.position.copy(p.getWorldPosition(new I)).add(new I(0,-.08*_.s,.245*_.s).applyQuaternion(u)),g.quaternion.copy(u)}}}return f(c(),d.at==="L"?"L":d.at==="key"?"key":"R")},dumbbells:()=>{let d=f(c(),"R"),g=f(c(),"L"),_=new fe;return _.add(d.obj),_.add(g.obj),{obj:_,update(p){d.update(p),g.update(p)}}},kettlebell:d=>{let g=new fe,_=i(new Rs(.09,14,10),[0,-.13,0]);g.add(_);let p=i(new Dr(.055,.012,6,14,Math.PI),[0,-.03,0]);return g.add(p),{obj:g,update(u){g.scale.setScalar(u.s),g.position.copy(d.at==="R"||d.at==="L"?a(u,d.at):o(u)),g.quaternion.copy(u.bones.root.getWorldQuaternion(new ne))}}},band:d=>{let g=new fe,_=d.to||"hands",p=_==="hands"?["R","L"]:[_],u=p.map(()=>r(.006));u.forEach(x=>g.add(x));let v=i(new Rs(.025,8,6),[0,0,0]);return g.add(v),{obj:g,update(x){p.forEach((A,P)=>{let T;if(d.anchor==="feet")T=x.bones["foot."+A].getWorldPosition(new I).setY(.03*x.s);else{let L=d.anchor||[0,1,.9];T=new I(L[0]*x.s,L[1]*x.s,L[2]*x.s)}P===0&&(v.position.copy(T),v.scale.setScalar(x.s)),l(u[P],T,a(x,A))})}}},bar:d=>{let g=new fe,_=d.y||2.2;return g.add(n(.016,1.3,"x",0,_,0)),g.add(e(.05,_+.05,.05,-.62,(_+.05)/2,0)),g.add(e(.05,_+.05,.05,.62,(_+.05)/2,0)),s(g,d,[0,0,d.z||0])},dip:d=>{let g=new fe,_=d.y||1.12;for(let p of[-.27,.27])g.add(n(.02,.7,"z",p,_,0)),g.add(e(.05,_,.05,p,_/2,-.3)),g.add(e(.05,_,.05,p,_/2,.3));if(d.pad){g.add(e(.36,.7,.07,0,1.25,-.2)),g.add(e(.05,1.6,.05,0,.8,-.27));for(let p of[-.27,.27])g.add(e(.1,.05,.38,p,_+.035,-.02))}return s(g,d,[0,0,0])},door:d=>{let g=new fe;for(let _ of[-.33,.33])g.add(e(.06,2.05,.14,_,1.025,0));return g.add(e(.72,.08,.14,0,2.09,0)),s(g,d,[0,0,d.z!=null?d.z:.48])},handles:()=>{let d=new fe,g=["R","L"].map(()=>{let _=new fe;return _.add(n(.016,.13,"x",0,.07,0)),_.add(e(.03,.07,.1,-.06,.035,0)),_.add(e(.03,.07,.1,.06,.035,0)),d.add(_),_});return{obj:d,update(_){["R","L"].forEach((p,u)=>{let v=a(_,p);g[u].scale.setScalar(_.s),g[u].position.set(v.x,0,v.z)})}}},dowel:d=>{let g=new fe;return g.add(n(.013,1.2,"y",0,0,0)),{obj:g,update(_){if(g.scale.setScalar(_.s),d.at==="back"){let p=_.bones.head.getWorldPosition(new I),u=_.bones.root.getWorldPosition(new I),v=new I(0,0,-1).applyQuaternion(_.bones.spine02.getWorldQuaternion(new ne)).multiplyScalar(.13*_.s),x=p.clone().sub(u).normalize();g.position.copy(p.clone().add(u).multiplyScalar(.5).add(v)),g.quaternion.setFromUnitVectors(go,x)}else{let p=a(_,"R"),u=a(_,"L"),v=u.clone().sub(p);g.position.copy(p).addScaledVector(v,.5),g.quaternion.setFromUnitVectors(go,v.lengthSq()>1e-8?v.normalize():new I(1,0,0))}}}},"leg-press":d=>{let g=new fe,_=d.plate||[.62,.5];g.add(e(.5,.06,.5,0,.34,-.2));let p=e(.5,.06,.7,0,0,0),u=new fe;u.add(p),p.position.set(0,0,-.35),u.position.set(0,.37,-.42),u.rotation.x=.95,g.add(u);let v=e(.55,.5,.04,0,0,0),x=new fe;return x.add(v),x.position.set(0,_[0],_[1]+.04),x.rotation.x=-.7,g.add(x),g.add(e(.08,.08,1.5,-.3,.3,.1)),g.add(e(.08,.08,1.5,.3,.3,.1)),g.add(e(.6,.3,.08,0,.15,-.6)),s(g,d,[0,0,0])},cable:d=>{let g=new fe,_=d.from||[0,2.1,.25],p=new fe;p.add(e(.12,_[1]+.1,.12,0,(_[1]+.1)/2,0)),p.add(e(.5,.05,.5,0,.025,0)),p.add(n(.04,.03,"x",0,_[1],0)),g.add(p);let u=[r(.004),r(.004)];return u.forEach(v=>g.add(v)),{obj:g,update(v){p.scale.setScalar(v.s),p.position.set(_[0]*v.s,0,(_[2]+(_[2]>=0?.1:-.1))*v.s);let x=new I(_[0]*v.s,_[1]*v.s,_[2]*v.s),A=d.to||"hands";if(A==="hands"){let P=o(v);l(u[0],x,P),u[1].visible=!1}else l(u[0],x,a(v,A)),u[1].visible=!1}}},bike:d=>{let g=new fe;return g.add(e(.26,.05,.3,0,.755,-.15)),g.add(e(.05,.5,.05,0,.5,-.12)),g.add(e(.05,.06,.9,0,.25,.15)),g.add(n(.17,.03,"x",0,.3,.22,18)),g.add(e(.05,.8,.05,0,.65,.4)),g.add(n(.014,.46,"x",0,1.05,.45)),g.add(e(.5,.04,.08,0,.02,-.3)),g.add(e(.5,.04,.08,0,.02,.55)),s(g,d,[0,0,0])}};return m["dip-bars"]=m.dip,m.db=d=>m.dumbbell(Object.assign({at:"hip"},d)),m.pulldown=m.cable,m["pull-up-bar"]=m.bar,m["push-up-handles"]=m.handles,m["incline-bench"]=m.incline,{known:d=>!!m[d],make(d){let g=m[d.id];if(!g)return null;let _=g(d);return _.id=d.id,_.obj.traverse(p=>{p.frustumCulled=!1}),_}}}var Pe=Math.PI/180,Pi=new I(1,0,0);function _o(i){let t=new DataView(i);if(String.fromCharCode(t.getUint8(0),t.getUint8(1),t.getUint8(2),t.getUint8(3))!=="GGF2")throw new Error("figure data");let e=t.getUint32(4,!0),n=JSON.parse(new TextDecoder().decode(new Uint8Array(i,8,e))),s=8+e,r={uint16:Uint16Array,int16:Int16Array,float32:Float32Array,uint8:Uint8Array,int8:Int8Array};return{H:n,get:a=>{let[o,c,h]=n.buf[a],f=r[h];return new f(i.slice(s+o,s+o+c))}}}var Vr=`
float h31(vec3 p){ p = fract(p * .1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float vn(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(mix(h31(i), h31(i + vec3(1,0,0)), f.x), mix(h31(i + vec3(0,1,0)), h31(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(h31(i + vec3(0,0,1)), h31(i + vec3(1,0,1)), f.x), mix(h31(i + vec3(0,1,1)), h31(i + vec3(1,1,1)), f.x), f.y), f.z); }
float hl(float c, float w){ float fw = max(fwidth(c), 1e-4); float f = fract(c); float d = min(f, 1. - f) / fw; return 1. - smoothstep(w - .7, w + .7, d); }
`,ls=`
#include <common>
#include <skinning_pars_vertex>
#if !defined(GEAR) && !defined(ACC)
attribute vec4 cloth; attribute vec4 mus0; attribute vec4 mus1; attribute vec4 mus2; attribute vec4 mus3; attribute vec4 mus4; attribute float fiber; attribute float relief; attribute vec2 hatch; attribute float calm;
uniform vec4 aL0, aL1, aL2, aL3, aL4, aR0, aR1, aR2, aR3, aR4;
#endif
#ifdef ACC
attribute vec3 accUV;
#endif
varying vec3 vN; varying vec3 vV; varying vec3 vRest; varying vec4 vCloth; varying float vGlow; varying float vFib; varying float vRel; varying vec2 vHatch; varying vec3 vAcc; varying float vMask; varying float vGroove; varying float vCalm;
void main(){
  #include <skinbase_vertex>
  #include <beginnormal_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <begin_vertex>
  #include <skinning_vertex>
  #include <project_vertex>
  vN = normalize(transformedNormal); vV = -mvPosition.xyz; vRest = position;
#if !defined(GEAR) && !defined(ACC)
  vCloth = cloth;
  float sL = smoothstep(-.025, .025, position.x);
  vGlow = dot(mus0, mix(aR0, aL0, sL)) + dot(mus1, mix(aR1, aL1, sL)) + dot(mus2, mix(aR2, aL2, sL)) + dot(mus3, mix(aR3, aL3, sL)) + dot(mus4, mix(aR4, aL4, sL));
  vFib = fiber; vRel = relief * 2. - 1.; vHatch = hatch; vAcc = vec3(0.);
  // The working muscles' shape, the same all through the rep (so its outline holds still), and the partings.
  vMask = dot(mus0, clamp(mix(aR0, aL0, sL) * 4., 0., 1.)) + dot(mus1, clamp(mix(aR1, aL1, sL) * 4., 0., 1.)) + dot(mus2, clamp(mix(aR2, aL2, sL) * 4., 0., 1.))
    + dot(mus3, clamp(mix(aR3, aL3, sL) * 4., 0., 1.)) + dot(mus4.xyz, clamp(mix(aR4, aL4, sL).xyz * 4., 0., 1.));
  vGroove = mus4.w; vCalm = calm;
#else
  vCloth = vec4(0.); vGlow = 0.; vFib = 0.; vRel = 0.; vMask = 0.; vGroove = 0.; vCalm = 0.;
  vHatch = vec2(dot(position, vec3(.35, .85, .4)), dot(position, vec3(.8, .45, -.4)));
  #ifdef ACC
  vAcc = accUV;
  #else
  vAcc = vec3(0.);
  #endif
#endif
}`,xo=`
uniform vec3 uSkin0, uSkin1, uSkin2, uShirt0, uShirt1, uShirt2, uShorts0, uShorts1, uShorts2, uShoe0, uShoe1, uShoe2, uSole0, uSole1, uSole2, uHair;
uniform vec3 uInk, uHi, uGlow, uGlowEdge;
uniform float uDark, uPx, uGlowAmt, uHatch, uPlain; uniform vec3 uHeadC, uLight;
varying vec3 vN; varying vec3 vV; varying vec3 vRest; varying vec4 vCloth; varying float vGlow; varying float vFib; varying float vRel; varying vec2 vHatch; varying vec3 vAcc; varying float vMask; varying float vGroove; varying float vCalm;
${Vr}
vec3 ramp(vec3 c0, vec3 c1, vec3 c2, float t){ return t < .5 ? mix(c0, c1, smoothstep(0., .5, t)) : mix(c1, c2, smoothstep(.5, 1., t)); }
float aaStep(float e, float x){ float fw = max(fwidth(x), 1e-5); return smoothstep(-fw, fw, x - e); }
float aaLine(float x, float w){ float fw = max(fwidth(x), 1e-5); return 1. - smoothstep(w * .5, w * 1.5, abs(x) / fw); }
void main(){
  vec3 N = normalize(vN); vec3 V = normalize(vV);
  if (!gl_FrontFacing) N = -N;
  vec3 L = normalize(uLight);
  float ndl = dot(N, L);
  float rim = 1. - abs(dot(N, V));
  float nz = vn(vRest * 40.) * .5 + vn(vRest * 8.) * .5;
  float shirt = vCloth.x, shorts = vCloth.y, sock = vCloth.z, hair = vCloth.w;
  float fab = max(shirt, shorts);
  // Relief: muscle forms catch the light, the partings between them hold shadow (softer through fabric).
  // (None through the shorts: they stay one plain, modest shape.)
  float rel = vRel * mix(1., .4, shirt) * (1. - smoothstep(.2, .6, shorts));
  float t = clamp(ndl * .6 + .42 + (nz - .5) * .1 + rel * .32, 0., 1.);
  t = clamp(t - pow(rim, 4.) * .3 + clamp(dot(N, normalize(vec3(.8, -.2, -.5))), 0., 1.) * .1, 0., 1.);
  vec3 col = ramp(uSkin0, uSkin1, uSkin2, t);
  col = mix(col, ramp(uShirt0, uShirt1, uShirt2, t), smoothstep(.3, .7, shirt));
  col = mix(col, ramp(uShorts0, uShorts1, uShorts2, t), smoothstep(.3, .7, shorts));
  col = mix(col, mix(ramp(uShirt0, uShirt1, uShirt2, t), uHi, .25), smoothstep(.3, .7, sock));
  col = mix(col, mix(uHair, uSkin1, t * .45), smoothstep(.35, .65, hair));
  float s = uHatch;
  float lines = 0.;
#ifdef ACC
  float bun = step(1.5, vAcc.z);
  if (bun < .5){
    // Shoe: a firm sole (thicker under the heel) with a midsole line, an upper with a toe cap seam, a heel
    // counter, and a laced tongue.
    float tt = vAcc.x, hg = vAcc.y, lat = vAcc.z;
    float soleH = mix(.03, .019, smoothstep(.15, .7, tt));
    float soleM = 1. - aaStep(soleH, hg);
    col = mix(ramp(uShoe0, uShoe1, uShoe2, t), ramp(uSole0, uSole1, uSole2, t), soleM);
    lines = max(lines, aaLine(hg - soleH, uPx * .9) * .9);
    lines = max(lines, aaLine(hg - .007, uPx * .6) * .55);
    float upper = 1. - soleM;
    lines = max(lines, aaLine(tt - .83 - hg * .6, uPx * .7) * .6 * upper * step(.03, hg));
    lines = max(lines, aaLine(tt - .2 + (hg - .03) * 1.8, uPx * .7) * .55 * upper * step(soleH + .004, hg) * step(hg, .07));
    float band = smoothstep(.36, .4, tt) * (1. - smoothstep(.7, .74, tt)) * step(.04, hg);
    float sm = tt * .29;
    float lace = aaLine(fract(sm / .0105 + .5) - .5, uPx * 1.1) * step(abs(lat), .42);
    float eye = aaLine(abs(lat) - .48, uPx * .8);
    lines = max(lines, max(lace * .85, eye * .6) * band);
    col = mix(col, uHi, band * step(abs(lat), .4) * .18);
  } else {
    col = mix(uHair, uSkin1, t * .4);
    lines = max(lines, aaLine(fract(vAcc.x * 22. + vn(vRest * 60.) * .4) - .5, uPx * .5) * .5);
  }
#endif
  // Hatching laid on the form: two families of strokes that ring each limb and the torso at a slant, so they
  // curve around the body the way a pen follows it. Strokes thicken into the shadow.
#ifdef GEAR
  float wob = 0.;
#else
  float wob = (vn(vRest * 18.) - .5) * .5;
#endif
  float cA = vHatch.x * s + wob, cB = vHatch.y * s * 1.08 + wob;
  float groove = smoothstep(-.15, -.7, rel);
  float k1 = max(smoothstep(.72, .3, t), groove * .5), k2 = smoothstep(.42, .12, t);
  float br = .55 + .45 * vn(vRest * 70.);
  // Where a family's strokes would close into rings (the top of a rounded form facing the pen), they fade, so
  // no form ever shows a target of circles.
  // Over the calm chest the strokes come from planes that run along the front of the body, which never close
  // into rings on a forward facing curve, so no stroke ever stops short there.
  float calmC = dot(vRest, vec3(.42, .9, 0.)) * s + wob;
  cA = mix(cA, calmC, step(.02, vCalm)); cB = mix(cB, calmC * 1.1 + .5, step(.02, vCalm));
  float fA = mix(smoothstep(.02, .065, fwidth(cA) / uPx), 1., step(.02, vCalm)), fB = mix(smoothstep(.02, .065, fwidth(cB) / uPx), 1., step(.02, vCalm));
  float hatch = hl(cA, uPx * (.3 + .5 * k1)) * k1 * br * fA;
  hatch = max(hatch, hl(cB, uPx * (.28 + .45 * k2)) * k2 * .85 * br * fB);
  // The chest under the shirt stays plain: light, even strokes only.
  hatch *= 1. - .65 * vCalm;
  hatch *= 1. - uPlain;   // (plain shading, for the test that looks for spots)
  // Hair: fine strokes combed back over the head.
  vec2 hd = vRest.xz - uHeadC.xz;
#ifdef GEAR
  hatch *= .45;
#endif
  float hairS = hl(atan(hd.x, hd.y) * .09 * s * 1.9 + wob * 1.5, uPx * .45) * smoothstep(.3, .7, hair) * .6;
  hatch *= 1. - smoothstep(.3, .7, hair) * .7;
  if (uDark > .5){
    float k3 = smoothstep(.5, .9, t);
    float chalk = hl(cA, uPx * (.25 + .35 * k3)) * k3 * br * fA * (1. - uPlain);
#ifdef GEAR
    chalk *= .3;
#endif
    col = mix(col, uHi, chalk * .28);
    col = mix(col, uSkin0 * .6, hatch * .45 + hairS * .4);
    col = mix(col, uInk, lines * .5);
  } else {
    col = mix(col, uInk, hatch * .62 + hairS);
    col = mix(col, uInk, lines * .8);
  }
  col = mix(col, uInk, smoothstep(.7, .97, rim) * (uDark > .5 ? .3 : .45));
  float hem = 0.;
  for (int i = 0; i < 3; i++){ float m = i == 0 ? shirt : (i == 1 ? shorts : sock); float fw = max(fwidth(m), 1e-3);
    hem = max(hem, 1. - smoothstep(uPx * .5, uPx * 1.3, abs(m - .5) / fw)); }
  col = mix(col, uInk, hem * .75 * (1. - uPlain));
  // The worked muscle, drawn: a crisp lit outline around each muscle, a soft inner light that grows with the
  // effort of the rep (never a flat bright patch), its fibers as fine strokes of light in their real direction,
  // and the partings between its heads in ink.
  float e = smoothstep(.3, 1., uGlowAmt) * (1. - uPlain);   // 0 at rest, 1 at the work of the rep
  float m = clamp(vMask, 0., 1.);
  float inside = aaStep(.3, m) * (1. - uPlain);
  float belly = smoothstep(.3, .95, m);
  vec3 lit = mix(uGlowEdge, uGlow, belly);
  col = mix(col, lit * mix(.85, 1.02, t), inside * (.16 + .3 * belly) * e);
  float fibL = hl(vFib * s * 1.3, uPx * .55) * inside * smoothstep(.28, .7, m);
  col = mix(col, uGlow, fibL * .75 * e);
  float grv = smoothstep(.3, .75, vGroove) * inside;
  col = mix(col, uDark > .5 ? uSkin0 * .45 : uInk, grv * .5 * e);
  float edge = aaLine(m - .3, uPx * 1.1) * (1. - uPlain);
  col = mix(col, uGlow, edge * .95 * e);
  gl_FragColor = linearToOutputTexel(vec4(col, 1.));
}`,Ec=`
#include <common>
#include <skinning_pars_vertex>
uniform float uW, uPx, uSeed; uniform vec2 uRes;
attribute float face;
varying float vK;
${Vr.split("float hl")[0]}
void main(){
  #include <skinbase_vertex>
  #include <beginnormal_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <begin_vertex>
  #include <skinning_vertex>
  #include <project_vertex>
  vec3 n = normalize(normalMatrix * objectNormal);   // (transformedNormal is flipped for back side materials)
  vec4 cn = projectionMatrix * vec4(n, 0.);
  vec2 d = normalize(cn.xy + 1e-6);
  float p = .55 + .9 * vn(position * 14. + uSeed);
  gl_Position.xy += d / uRes * 2. * uW * uPx * p * gl_Position.w * (1. - face);
  gl_Position.z += face * .002 * gl_Position.w;
  vK = p;
}`,Tc="uniform vec3 uInk; uniform float uA; varying float vK; void main(){ gl_FragColor = linearToOutputTexel(vec4(uInk, uA)); }",Qm=`
uniform vec3 uGlowHalo; uniform float uGlowAmt;
varying vec3 vN; varying vec3 vV; varying vec3 vRest; varying vec4 vCloth; varying float vGlow; varying vec3 vW; varying float vMask; varying float vGroove; varying float vCalm;
void main(){ float g = clamp(vGlow * uGlowAmt, 0., 1.); gl_FragColor = linearToOutputTexel(vec4(uGlowHalo * smoothstep(.3, 1., g) * .8, 1.)); }`,vo="varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }",tg=`uniform sampler2D tMap; uniform vec2 uDir; varying vec2 vUv;
void main(){ vec3 c = texture2D(tMap, vUv).rgb * .227;
  c += (texture2D(tMap, vUv + uDir * 1.385).rgb + texture2D(tMap, vUv - uDir * 1.385).rgb) * .316;
  c += (texture2D(tMap, vUv + uDir * 3.23).rgb + texture2D(tMap, vUv - uDir * 3.23).rgb) * .07;
  gl_FragColor = vec4(c, 1.); }`,eg="uniform sampler2D tMap; uniform float uK; varying vec2 vUv; void main(){ vec3 c = texture2D(tMap, vUv).rgb * uK; gl_FragColor = vec4(c, max(c.r, max(c.g, c.b))); }",ng="uniform sampler2D tMap; varying vec2 vUv; void main(){ gl_FragColor = linearToOutputTexel(texture2D(tMap, vUv)); }",ig="varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",sg=`
uniform vec3 uJ[14]; uniform vec3 uShade; uniform float uPx, uDark; varying vec3 vW;
${Vr}
void main(){
  float s = 0.;
  for (int i = 0; i < 14; i++){ vec3 j = uJ[i]; float hgt = max(j.y, 0.); vec2 d = (vW.xz - j.xz) * vec2(1.6, 1.); float r = .07 + hgt * .35;
    s += exp(-dot(d, d) / (r * r)) * (1. - smoothstep(0., 1.1, hgt)) * .55; }
  s = clamp(s, 0., 1.);
  float c = (vW.z * .8 - vW.x * .6) / .011;
  float h = hl(c, uPx * .5) * smoothstep(.08, .5, s);
  float a = s * .18 + h * .4;
  // The shadow always darkens the paper (deep brown on light paper, near black on dark).
  gl_FragColor = linearToOutputTexel(vec4(uShade, a * (uDark > .5 ? 1.3 : 1.)));
}`,Kn=(i,t,e)=>new I(e*Math.sin(t*Pe),-Math.cos(i*Pe)*Math.cos(t*Pe),Math.sin(i*Pe)*Math.cos(t*Pe)),Us=i=>Math.atan2(i.z,-i.y)/Pe,Le=(i,t,e)=>i+(t-i)*e;function kr(i,t,e){return typeof i=="number"&&typeof t=="number"?Le(i,t,e):Array.isArray(i)&&Array.isArray(t)&&i.length===t.length?i.map((n,s)=>kr(n,t[s],e)):e<.5?i:t}function Li(i,t){let e=i.clone().addScaledVector(t,-i.dot(t));return e.lengthSq()<1e-8?new I(0,0,1):e.normalize()}var Rc=new ye,Cc=new ye;function Ls(i,t,e,n){let s=new I().crossVectors(i,t),r=new I().crossVectors(e,n);return Rc.makeBasis(i,t,s),Cc.makeBasis(e,n,r),new ne().setFromRotationMatrix(Cc.multiply(Rc.transpose()))}var Pc=i=>new ne().setFromAxisAngle(Pi,i*Pe),rg=new ne;function yo(i,t,e){let n=new ne().setFromUnitVectors(i.clone().normalize(),t.clone().normalize());return i.clone().normalize().applyQuaternion(rg.clone().slerp(n,e))}var zr=(i,t)=>i+((t-i)%360+540)%360-180,So={hR:"wrist.R",hL:"wrist.L",kR:"lowerleg01.R",kL:"lowerleg01.L",fR:"foot.R",fL:"foot.L",tR:"toe1-1.R",tL:"toe1-1.L",eR:"lowerarm01.R",eL:"lowerarm01.L",p:"root",b:"spine03"},Qe={L:1,R:-1},Lc={relax:{c:[9,14,8],tog:.8,th:[2,8,8],opp:6},flat:{c:[-12,-6,-3],tog:.9,th:[-5,1,2],opp:-8},grip:{c:[70,50,35],tog:1,th:[10,25,30],opp:70},firm:{c:[-10,-5,-2],tog:1,th:[-2,6,4],opp:4},fist:{c:[88,80,50],tog:1,th:[18,30,28],opp:55},open:{c:[-6,-3,-2],tog:.2,th:[-10,-4,0],opp:-22},reach:{c:[-4,-2,0],tog:.95,th:[-2,2,2],opp:0}},Mo=i=>(typeof i=="string"?Lc[i]:i)||Lc.relax;function Ic(i,t,e){let n=Mo(i),s=Mo(t);return{c:n.c.map((r,l)=>Le(r,s.c[l],e)),tog:Le(n.tog,s.tog,e),th:n.th.map((r,l)=>Le(r,s.th[l],e)),opp:Le(n.opp,s.opp,e)}}var bo=class{constructor(t,e){this.names=t.bones,this.parent=t.parent,this.head={},this.dir0={},this.len={};for(let s of t.bones){let r=new I(...e.head[s]),l=new I(...e.tail[s]);this.head[s]=r;let a=l.clone().sub(r);this.len[s]=a.length(),this.dir0[s]=a.normalize()}this.scale=this.head["upperleg01.L"].y/.927;let n=this.head;for(let s of["L","R"])this.len["thigh"+s]=n["lowerleg01."+s].distanceTo(n["upperleg01."+s]),this.len["shin"+s]=n["foot."+s].distanceTo(n["lowerleg01."+s]),this.len["uarm"+s]=n["lowerarm01."+s].distanceTo(n["upperarm01."+s]),this.len["farm"+s]=n["wrist."+s].distanceTo(n["lowerarm01."+s]);this.footRest=Us(this.dir0["foot.L"]),this.hand={};for(let s of["L","R"]){let r=n["wrist."+s],l=n["finger2-1."+s].clone().sub(r).cross(n["finger5-1."+s].clone().sub(r)).normalize(),a=0;for(let d=2;d<=5;d++)a+=this.dir0[`finger${d}-3.${s}`].clone().sub(this.dir0[`finger${d}-1.${s}`]).dot(l);let o=l.clone().multiplyScalar(a<0?-1:1),c=d=>d.clone().addScaledVector(o,-d.dot(o)).normalize(),h=c(this.dir0["finger3-1."+s]),f=n["finger3-1."+s].clone().sub(r).normalize(),m=[];for(let d=1;d<=5;d++){let g=[1,2,3].map(v=>{let x=`finger${d}-${v}.${s}`;return{b:x,ax:this.dir0[x].clone().cross(o).normalize()}}),_=c(this.dir0[`finger${d}-1.${s}`]),p=Math.acos(Math.max(-1,Math.min(1,_.dot(h))));_.clone().cross(h).dot(o)<0&&(p=-p);let u=1;if(d===1){let v=this.dir0[`finger1-1.${s}`],x=new ne().setFromAxisAngle(f,.05);u=v.clone().applyQuaternion(x).dot(o)>v.dot(o)?1:-1}m.push({segs:g,add:p,oppSign:u,f:d})}this.hand[s]={palm:o,axis:f,fing:m}}}};function Is(i,t,e,n,s){let r=i.scale,l=i.head,a={},o={},c=t.t[0],h=t.t[1],f=t.n!=null?t.n:h,m=new ne().setFromAxisAngle(new I(0,1,0),(t.yaw||0)*Pe).multiply(new ne().setFromAxisAngle(new I(0,0,1),(t.rz||0)*Pe)),d=t.tw||0,g=t.lb||0,_=new I(0,1,0),p=new I(0,0,1),u=(O,F,G)=>new ne().setFromAxisAngle(p,-(g*O+(G||0))*Pe).multiply(new ne().setFromAxisAngle(_,(d*O+(F||0))*Pe)),v=(O,F,G,X)=>m.clone().multiply(Pc(180-O)).multiply(u(F,G,X));a.root=v(c,0),a.spine05=v(c,0),a.spine04=v(Le(c,h,.33),.2),a.spine03=v(Le(c,h,.67),.45),a.spine02=v(h,.7),a.spine01=v(h,.85),a.neck01=v(Le(h,f,.5),.95,(t.hy||0)*.4,(t.ht||0)*.4),a.head=v(f,1,t.hy||0,t.ht||0);let x=Pc(180-h),A=m.clone().multiply(x).multiply(u(.85)).multiply(x.clone().invert()),P=m,T={Qw:a,Pw:o,T:{},pa:{}};for(let O of["L","R"]){let F=t["sh"+O]||0;a["clavicle."+O]=a.spine01.clone().multiply(new ne().setFromAxisAngle(new I(0,0,1),-Qe[O]*F*Pe))}o.root=new I((t.px||0)*r,t.p[0]*r,t.p[1]*r),o.db=o.root.clone().add(new I(0,-.08*r,.245*r).applyQuaternion(a.root));let L=O=>{let F=i.parent[i.names.indexOf(O)];o[O]=o[F].clone().add(l[O].clone().sub(l[F]).applyQuaternion(a[F]))};["spine05","spine04","spine03","spine02","spine01","neck01","head","clavicle.L","clavicle.R"].forEach(L),["L","R"].forEach(O=>{L("upperarm01."+O),L("upperleg01."+O)});let J=(O,F)=>{let G=O==="arm"?F==="R"?"ra":"la":F==="R"?"rl":"ll",X=O==="arm"?o["upperarm01."+F]:o["upperleg01."+F],at=Et=>{let ct=Et[G],St=Et[G+"O"],dt=St??(O==="arm"?Et.ao!=null?Et.ao:9:Et.lo!=null?Et.lo:4),Ot=Array.isArray(dt)?[dt[0],dt[1]!=null?dt[1]:dt[0]*.6,dt[2]!=null?dt[2]:dt[0]*.3]:[dt,dt*.6,dt*.3];return ct==null?{ang:O==="arm"?[2,6]:[0,0],out:Ot}:Array.isArray(ct)?{ang:ct,out:Ot}:{ik:ct,out:Ot}},j=at(e),rt=at(n),W=O==="arm"?i.len["uarm"+F]:i.len["thigh"+F],ot=O==="arm"?i.len["farm"+F]:i.len["shin"+F],yt=Et=>Et.rel?b(Et.rel,F):Et.db?o.db.clone().add(new I(Et.db[0]*Qe[F]*r,Et.db[1]*r,Et.db[2]*r)):new I(Et.x!=null?Et.x*r*Qe[F]:X.x+Qe[F]*(Et.dx||0)*r,Et.y*r,Et.z!=null?Et.z*r:X.z+(Et.dz||0)*r),Ct=Et=>{if(Et.ang){let _t=Et.ang,lt=Qe[F],ft=O==="arm"?A:P,At=Kn(_t[0],Et.out[0],lt).applyQuaternion(ft),It=Kn(_t[1],Et.out[1],lt).applyQuaternion(ft),nt=_t[2]!=null?Kn(_t[2],Et.out[2],lt).applyQuaternion(ft):null;return{d1:At,d2:It,d3:nt,end:_t[2],toe:_t[3],ride:ft}}let ct=Et.ik,St=ct.__T?ct.__T.clone():yt(ct);T.T[O+F]=St.clone();let dt=new I(...ct.pole||(O==="arm"?[0,0,-1]:[0,0,1]));if(dt.x*=Qe[F],ct.el){let _t=new I(ct.el[0]*r*Qe[F],ct.el[1]*r,ct.el[2]*r);T.T["elbow"+F]=_t.clone();let lt=_t.sub(X).normalize(),ft=X.clone().addScaledVector(lt,W);return{d1:lt,d2:St.clone().sub(ft).normalize(),d3:ct.f!=null?Kn(ct.f,0,1):null,end:ct.f,toe:ct.toe}}let Ot=St.clone().sub(X),wt=Ot.length(),S=Ot.normalize();wt=Math.min(wt,(W+ot)*.9995),wt=Math.max(wt,Math.abs(W-ot)+.001);let M=(W*W+wt*wt-ot*ot)/(2*W*wt),B=Math.sqrt(Math.max(0,1-M*M)),Q=Li(dt.normalize(),S),et=X.clone().addScaledVector(S,W*M).addScaledVector(Q,W*B),it=X.clone().addScaledVector(S,wt);return{d1:et.clone().sub(X).normalize(),d2:it.sub(et).normalize(),d3:ct.f!=null?Kn(ct.f,0,1):null,end:ct.f,toe:ct.toe}},Tt,Ft,Bt,Dt,Gt;if(j.ang&&rt.ang){let Et=t["v_"+G],ct=t["v_"+G+"O"],St=t.wrap?rt.ang.map((Q,et)=>typeof Q=="number"&&typeof j.ang[et]=="number"?zr(j.ang[et],Q):Q):rt.ang,dt=(Q,et)=>{let it=Math.max(Q.length,et.length),_t=[];for(let lt=0;lt<it;lt++){let ft=Q[lt],At=et[lt];_t.push(ft!=null&&At!=null?kr(ft,At,s):ft??At)}return _t},Ot=(Et&&Et.length===j.ang.length?Et:dt(j.ang,St)).slice(),wt=ct||kr(j.out,rt.out,s),S=(e.on||"").includes("h"+F),M=(n.on||"").includes("h"+F);if(O==="arm"&&S!==M){let Q=S,et=Q?s:1-s,it=Mn(Math.min(1,Math.max(0,(et-.25)/.75))),_t=Math.sin(Math.PI*Math.min(1,et/.8))**2,lt=Mn(Math.min(1,Math.max(0,(et-.1)/.9)));Ot[0]=Le(j.ang[0],rt.ang[0],Q?it:1-it)-25*_t,Ot[1]=Le(j.ang[1],rt.ang[1],Q?lt:1-lt)+30*_t}let B=Ct({ang:Ot,out:wt});(j.ang.length<3||rt.ang.length<3)&&(B.end=j.ang[2]!=null&&rt.ang[2]!=null?Le(j.ang[2],rt.ang[2],s):s<.5?j.ang[2]:rt.ang[2]),{d1:Tt,d2:Ft,d3:Bt,end:Dt,toe:Gt}=B,j.ang[3]!=null&&rt.ang[3]!=null&&(Gt=Le(j.ang[3],rt.ang[3],s)),B.end!=null&&(Bt=Kn(B.end,wt[2],Qe[F]).applyQuaternion(B.ride))}else if(j.ik&&rt.ik){let Et=yt(j.ik),ct=yt(rt.ik),St=t.__via,dt=O==="arm"?["h"+F,"e"+F]:["f"+F,"t"+F],Ot=xt=>{let Ut=" "+(xt.on||"")+" ";return dt.some(kt=>Ut.includes(" "+kt+" "))},wt=Ot(e),S=Ot(n),M=Et.distanceTo(ct)<.002*r,B;if(St&&(St.viaA||St.viaB)&&!(wt&&S)&&!M){let xt=gt=>{let U=gt&&gt[G];return U&&!Array.isArray(U)?yt(U):null},Ut=St.viaA&&!wt?xt(St.kp):null,kt=St.viaB&&!S?xt(St.kn):null,ce=Ut?ct.clone().sub(Ut).multiplyScalar(St.dur/St.spanA):new I,Wt=kt?kt.clone().sub(Et).multiplyScalar(St.dur/St.spanB):new I;B=new I(cs(Et.x,ct.x,ce.x,Wt.x,St.x),cs(Et.y,ct.y,ce.y,Wt.y,St.x),cs(Et.z,ct.z,ce.z,Wt.z,St.x))}else B=Et.clone().lerp(ct,s);let Q=xt=>{let Ut=" "+(xt.on||"")+" ";return Ut.includes(" t"+F+" ")&&!Ut.includes(" f"+F+" ")},et=Q(e)&&Q(n);if(O==="leg"&&!M&&!et&&(wt!==S||wt&&S&&Math.hypot(Et.x-ct.x,Et.z-ct.z)>.03*r)){let xt=kt=>kt.lift==null?null:typeof kt.lift=="object"?kt.lift[F]:kt.lift,Ut=xt(n)!=null?xt(n):xt(e)!=null?xt(e):.1;B.y+=Ut*r*Math.sin(Math.PI*Math.min(1,Math.max(0,St?St.x:s)))**2}let it=O==="arm"?[0,0,-1]:[0,0,1],_t=new I(...j.ik.pole||it).normalize(),lt=new I(...rt.ik.pole||it).normalize(),ft=yo(_t,lt,s),At=j.ik.f,It=rt.ik.f,nt=At!=null&&It!=null?Le(At,It,s):s<.5?At:It,Yt=j.ik.toe,Pt=rt.ik.toe,Lt=Yt!=null&&Pt!=null?Le(Yt,Pt,s):s<.5?Yt:Pt,Nt=j.ik.el&&rt.ik.el?j.ik.el.map((xt,Ut)=>Le(xt,rt.ik.el[Ut],s)):s<.5?j.ik.el:rt.ik.el;({d1:Tt,d2:Ft,d3:Bt,end:Dt,toe:Gt}=Ct({ik:{__T:B,pole:[ft.x,ft.y,ft.z],f:nt,toe:Lt,el:Nt},out:j.out}))}else{let Et=Ct(j),ct=Ct(rt);Tt=yo(Et.d1,ct.d1,s),Ft=yo(Et.d2,ct.d2,s);let St=Et.end!=null?Et.end:null,dt=ct.end!=null?ct.end:null;Dt=St!=null&&dt!=null?Le(St,dt,s):St??dt,Gt=Et.toe!=null&&ct.toe!=null?Le(Et.toe,ct.toe,s):Et.toe!=null?Et.toe:ct.toe,Bt=Dt!=null?Kn(Dt,0,Qe[F]):null}let H=null;if(O==="arm")try{H=[Ct(j).d1,Ct(rt).d1,s]}catch{H=null}return{d1:Tt,d2:Ft,d3:Bt,end:Dt,toe:Gt,kd:H}},b=(O,F)=>o.root.clone().add(new I(O[0]*Qe[F]*r,O[1]*r,O[2]*r).applyQuaternion(a.root)),E=(O,F,G,X)=>{let at=F==="arm"?"upperarm01."+G:"upperleg01."+G,j=F==="arm"?"lowerarm01."+G:"lowerleg01."+G,rt=F==="arm"?"wrist."+G:"foot."+G,W=F==="arm"?null:"toe1-1."+G,ot=(t["roll"+G]||0)*(F==="arm"?1:0),yt=F==="arm"?A:P,Ct=Pi.clone().applyQuaternion(yt),Tt,Ft,Bt,Dt,Gt,H;if(F==="arm"){let dt=A.clone().multiply(x),Ot=new I(Qe[G]*.45,-.45,.77).normalize(),wt=Li(Pi,Ot),S=wt.clone().applyQuaternion(dt),M=Ot.clone().applyQuaternion(dt),B=(ft,At,It)=>Li(At.clone().applyQuaternion(new ne().setFromUnitVectors(It,ft.clone().normalize())),ft),Q=(ft,At,It)=>Li(ft.clone().applyQuaternion(new ne().setFromUnitVectors(At.clone().normalize(),It.clone().normalize())),It),et=i.dir0[at],it=i.dir0[j],_t=ft=>{if(!X.kd)return B(ft,S,M);let[At,It,nt]=X.kd,Yt=B(At,S,M),Pt=B(It,S,M),Lt=ft.clone().normalize(),Nt=Vt=>{let zt=Vt.clone().normalize().dot(Lt);return zt>-.3?1:zt<-.85?0:1-Mn((-.3-zt)/.55)};if(nt<=0)return Q(Yt,At,ft);if(nt>=1)return Q(Pt,It,ft);let xt=Q(Yt,At,It),Ut=It.clone().normalize(),kt=Math.atan2(Ut.dot(new I().crossVectors(xt,Pt)),xt.dot(Pt)),ce=Nt(At),Wt=Nt(It),gt=ce+Wt>1e-6?Wt/(ce+Wt):nt,U=Q(Yt,At,ft),ht=Q(Pt,It,ft).applyQuaternion(new ne().setFromAxisAngle(Lt,-kt)),Mt=Math.atan2(Lt.dot(new I().crossVectors(U,ht)),U.dot(ht));return Li(U.applyQuaternion(new ne().setFromAxisAngle(Lt,Mt*gt+kt*nt)),ft)},lt=i.dir0[rt];Tt=B(et,wt,Ot),Bt=Q(Tt,et,it),Ft=_t(X.d1),Dt=Q(Ft,X.d1,X.d2),Gt=()=>Q(Bt,it,lt),H=ft=>Q(Dt,X.d2,ft)}else{let dt=Ot=>Li(Ct,Ot);Tt=dt(i.dir0[at]),Ft=dt(X.d1),Bt=dt(i.dir0[j]),Dt=dt(X.d2),Gt=dt,H=dt}a[at]=Ls(i.dir0[at],Tt,X.d1,Ft),o[j]=o[at].clone().addScaledVector(X.d1,i.len[F==="arm"?"uarm"+G:"thigh"+G]);let Et=new ne().setFromAxisAngle(X.d2,-Qe[G]*ot*Pe);a[j]=Et.clone().multiply(Ls(i.dir0[j],Bt,X.d2,Dt)),o[rt]=o[j].clone().addScaledVector(X.d2,i.len[F==="arm"?"farm"+G:"shin"+G]);let ct=X.d3;if(!ct)if(F==="arm")ct=X.d2.clone();else{let dt=Us(X.d2);ct=Kn(dt+i.footRest,0,Qe[G])}let St=new ne().setFromAxisAngle(ct,-Qe[G]*ot*Pe);if(F==="arm"&&(a[rt]=St.multiply(Ls(i.dir0[rt],Gt(i.dir0[rt]),ct,H(ct)))),F==="arm"&&t["pn"+G]){let dt=t["pn"+G],Ot=ct.clone().normalize(),wt=new I(dt[0]*Qe[G],dt[1],dt[2]),S=i.hand[G].palm.clone().applyQuaternion(a[rt]);S.addScaledVector(Ot,-S.dot(Ot)),wt.addScaledVector(Ot,-wt.dot(Ot));let M=Math.sqrt(wt.lengthSq()),B=Math.min(1,Math.max(0,(M-.12)/.3)),Q=0,et=0,it=0;if(S.lengthSq()>1e-6&&wt.lengthSq()>1e-6&&B>0){S.normalize(),wt.normalize();let _t=Math.atan2(Ot.dot(new I().crossVectors(S,wt)),S.dot(wt)),lt=Math.abs(_t)/Pe;Q=_t*Math.max(Mn(B),lt<100?0:lt>170?1:Mn((lt-100)/70)),it=_t,et=0}T.pa[G]=Q;{let _t=Q,lt=t.paA&&t.paA[G],ft=t.paB&&t.paB[G],At=t.plA&&t.plA.includes("h"+G)&&t.plB&&t.plB.includes("h"+G);if(lt!=null&&ft!=null&&!At){let Yt=ft-lt;Yt>Math.PI&&(Yt-=2*Math.PI),Yt<-Math.PI&&(Yt+=2*Math.PI);let Pt=lt+Yt*(t.paW||0),Lt=it-Pt;Lt>Math.PI&&(Lt-=2*Math.PI),Lt<-Math.PI&&(Lt+=2*Math.PI),_t=Pt+Lt*et}a[rt]=new ne().setFromAxisAngle(Ot,_t).multiply(a[rt]);let It=Math.abs(_t)/Pe,nt=It<60?1:It>120?0:1-Mn((It-60)/60);a[j]=new ne().setFromAxisAngle(X.d2,_t*.5*nt).multiply(a[j])}}else if(F!=="arm"){let dt=yt.clone().invert(),Ot=ct.clone().applyQuaternion(dt),wt=i.dir0[rt].clone();wt.x=0,wt.normalize(),a[rt]=yt.clone().multiply(Ls(wt,Pi,new I(0,Ot.y,Ot.z).normalize(),Pi)),o[W]=o[rt].clone().add(l[W].clone().sub(l[rt]).applyQuaternion(a[rt]));let S=X.toe!=null?X.toe:Us(Ot)+(Us(i.dir0[W])-i.footRest),M=Kn(S,0,1),B=i.dir0[W].clone();B.x=0,B.normalize(),a[W]=yt.clone().multiply(Ls(B,Pi,new I(0,M.y,M.z).normalize(),Pi))}},k={};for(let O of["L","R"])k["arm"+O]=J("arm",O),k["leg"+O]=J("leg",O);for(let O in k)E(null,O.slice(0,3),O[3],k[O]);let tt=O=>O.endsWith("*")?o[O.replace("*","L")].y<o[O.replace("*","R")].y?O.replace("*","L"):O.replace("*","R"):O,pt=O=>{if(!O)return null;let F=tt(O[0]);return new I(0,O[1]*r-o[F].y,O[2]!=null?O[2]*r-o[F].z:0)},N=pt(t.anA),V=pt(t.anB);if(N||V){let O=N&&V?N.lerp(V,t.anW):N||V;for(let F in o)o[F].add(O);for(let F of["L","R"])k["arm"+F]=J("arm",F),k["leg"+F]=J("leg",F);for(let F in k)E(null,F.slice(0,3),F[3],k[F])}for(let O of["L","R"]){let F=i.hand[O],G=Mo(t["h"+O]),X=a["wrist."+O];for(let at of F.fing){let j=X.clone();if(at.f===1)j.multiply(new ne().setFromAxisAngle(F.axis,at.oppSign*G.opp*Pe)),at.segs.forEach((rt,W)=>{j=j.clone().multiply(new ne().setFromAxisAngle(rt.ax,G.th[W]*Pe)),a[rt.b]=j});else{j.multiply(new ne().setFromAxisAngle(F.palm,at.add*G.tog));let rt=1+.1*(at.f-2);at.segs.forEach((W,ot)=>{j=j.clone().multiply(new ne().setFromAxisAngle(W.ax,G.c[ot]*rt*Pe)),a[W.b]=j})}}}return T}function Uc(i,t,e){let n=i.k.length,s=i.top||[],r=i.rest!=null?i.rest:.04;if(e&&!i.bp){let m=i.reps||(i.alt?2:1),d=_=>i.k[_].br==="out"?"out":"in",g={in:0,out:0};for(let _=0;_<n;_++)g[d(_)]++;if(g.in&&g.out){let _={in:e[0]*m/g.in,out:e[e.length-1]*m/g.out},p=e.length===3&&s.length?e[1]*m/s.length:0,u=[],v=0;for(let x=0;x<n;x++){let A=_[d(x)];u.push({a:x,b:(x+1)%n,t0:v,t1:v+A}),v+=A,p>0&&s.includes((x+1)%n)&&(u.push({a:(x+1)%n,b:(x+1)%n,t0:v,t1:v+p}),v+=p)}return u.forEach(x=>{x.t0/=v,x.t1/=v}),u}}t=i.hold!=null?i.hold:t;let l=i.k.map((m,d)=>i.k[(d+1)%n].via?0:s.includes((d+1)%n)?Math.min(.8,t)/s.length:r),a=Math.max(.1,1-l.reduce((m,d)=>m+d,0)),o=i.dur||i.k.map(()=>1),c=o.reduce((m,d)=>m+d,0),h=[],f=0;for(let m=0;m<n;m++){let d=a*o[m]/c;h.push({a:m,b:(m+1)%n,t0:f,t1:f+d}),f+=d,l[m]>0&&(h.push({a:(m+1)%n,b:(m+1)%n,t0:f,t1:f+l[m]}),f+=l[m])}return h.forEach(m=>{m.t0/=f,m.t1/=f}),h}function ag(i,t,e){e=(e%1+1)%1;let n=i.top||[],s=t.length,r=g=>{let _=t[g];if(_.a!==_.b)return i.k[_.a].br||"in";if(n.includes(_.a))return"hold";let p=(g-1+s)%s;for(;t[p].a===t[p].b&&p!==g;)p=(p-1+s)%s;return i.k[t[p].a].br||"in"},l=Math.max(0,t.findIndex(g=>e>=g.t0&&e<g.t1)),a=r(l),o=l,c=l,h=0;for(;r((o-1+s)%s)===a&&h++<s;)o=(o-1+s)%s;for(h=0;r((c+1)%s)===a&&h++<s;)c=(c+1)%s;let f=t[o].t0,m=t[c].t1;f>e&&(f-=1),m<e&&(m+=1);let d=r((o-1+s)%s);return{phase:a,x:m>f?(e-f)/(m-f):0,u0:f,u1:m,after:d}}function og(i,t){let e=i.length===3?[["in",i[0]],["hold",i[1]],["out",i[2]]]:[["in",i[0]],["out",i[1]]],n=e.reduce((r,l)=>r+l[1],0),s=(t%n+n)%n;for(let[r,l]of e){if(s<l)return{phase:r,x:s/l,secsLeft:l-s,after:"in"};s-=l}return{phase:"in",x:0,secsLeft:e[0][1]}}var Mn=i=>i*i*i*(10+i*(-15+6*i));var cs=(i,t,e,n,s)=>{let r=s*s,l=r*s;return(2*l-3*r+1)*i+(l-2*r+s)*e+(-2*l+3*r)*t+(l-r)*n};function Br(i,t,e){e=(e%1+1)%1;let n=Math.max(0,t.findIndex(v=>e>=v.t0&&e<v.t1)),s=t[n],r=s.t1>s.t0?(e-s.t0)/(s.t1-s.t0):0,l=i.k.length,a=s.a!==s.b,o=a?Mn(r):0,c=i.k[s.a],h=i.k[s.b],f={},m=v=>{let x=t.find(A=>A.a===v&&A.b!==v);return x?x.t1-x.t0:1},d=(v,x,A,P)=>{if(!i.k[v].via)return 0;let T=["tw","lb","rz","hy","ht","px","yaw","shR","shL","rollR","rollL"].includes(x),L=i.k[(v-1+l)%l][x],J=i.k[(v+1)%l][x];if(T&&(L==null&&(L=0),J==null&&(J=0)),typeof L!="number"||typeof J!="number")return 0;let b=m((v-1+l)%l)+m(v);return(J-L)/b*(s.t1-s.t0)},g=a&&(c.via||h.via),_=a?Mn(Math.min(1,r*1.35)):0,p=["tw","lb","rz","hy","ht","px","yaw","shR","shL","rollR","rollL"];for(let v of new Set([...Object.keys(c),...Object.keys(h)])){if(["ra","la","rl","ll","hR","hL","an","via","on","br","fitArm","fitLeg","b","form","hold","lift","__pa","on"].includes(v))continue;let x=p.includes(v)?0:null,A=c[v]!=null?c[v]:x??h[v],P=h[v]!=null?h[v]:x??c[v];if(v==="px"&&!g){f[v]=Le(A,P,_);continue}g&&typeof A=="number"&&typeof P=="number"?f[v]=cs(A,P,d(s.a,v),d(s.b,v),r):g&&Array.isArray(A)&&Array.isArray(P)&&A.length===P.length&&A.every(T=>typeof T=="number")?f[v]=A.map((T,L)=>{let J=(b,E)=>{if(!i.k[b].via)return 0;let k=i.k[(b-1+l)%l][E],tt=i.k[(b+1)%l][E];return Array.isArray(k)&&Array.isArray(tt)?(tt[L]-k[L])/(m((b-1+l)%l)+m(b))*(s.t1-s.t0):0};return cs(T,P[L],J(s.a,v),J(s.b,v),r)}):f[v]=kr(A,P,o)}let u=v=>Array.isArray(v)&&v.every(x=>typeof x=="number");if(g||i.wrap)for(let v of["ra","la","rl","ll"]){let x=v+"O";for(let A of[v,x]){let P=c[A],T=h[A];if(!u(P)||!u(T)||P.length!==T.length)continue;let J=((E,k)=>i.wrap&&A===v?k.map((tt,pt)=>zr(E[pt],tt)):k)(P,T);if(!g){f["v_"+A]=P.map((E,k)=>Le(E,J[k],o));continue}let b=(E,k,tt)=>{if(!i.k[E].via)return 0;let pt=i.k[(E-1+l)%l][A],N=i.k[(E+1)%l][A];if(!u(pt)||!u(N))return 0;let V=i.k[E][A][k],O=i.wrap&&A===v?zr(V,pt[k]):pt[k];return((i.wrap&&A===v?zr(V,N[k]):N[k])-O)/(m((E-1+l)%l)+m(E))*(s.t1-s.t0)};f["v_"+A]=P.map((E,k)=>cs(E,J[k],b(s.a,k),b(s.b,k),r))}}if(f.wrap=!!i.wrap,g){let v=(s.a-1+l)%l;f.__via={kp:i.k[v],kn:i.k[(s.b+1)%l],viaA:!!c.via,viaB:!!h.via,spanA:m(v)+m(s.a),spanB:m(s.a)+m(s.b),dur:s.t1-s.t0,x:r}}return f.hR=Ic(c.hR,h.hR,o),f.hL=Ic(c.hL,h.hL,o),f.anA=c.an,f.anB=h.an,f.anW=o,f.paA=c.__pa,f.paB=h.__pa,f.paW=o,f.plA=String(c.on||"").split(" "),f.plB=String(h.on||"").split(" "),f.holdA=c.hold,f.holdB=h.hold!=null?h.hold:c.hold,f.holdW=o,{P:f,A:c,B:h,w:o}}var je=hi,Ds=["glutes","hams","quads","chest","triceps","delts","abs","obliques","back","lats","flexors","calves","biceps","forearms","upper","adductors","neck","rotator"];function lg(i,t,e,n){let s=document.createElement("canvas");s.width=i,s.height=t;let r=s.getContext("2d"),l=n||7,a=()=>(l=l*16807%2147483647)/2147483647,o=e?["#4d3c2c","#3d2f23","#2b2119"]:["#e6d0a2","#d4b580","#b98f55"],c=r.createRadialGradient(i*.45,t*.4,0,i*.5,t*.5,Math.hypot(i,t)*.62);c.addColorStop(0,o[0]),c.addColorStop(.65,o[1]),c.addColorStop(1,o[2]),r.fillStyle=c,r.fillRect(0,0,i,t);for(let p=0;p<26;p++){let u=a()*i,v=a()*t,x=(.05+a()*.22)*Math.max(i,t),A=r.createRadialGradient(u,v,0,u,v,x),P=e?`rgba(10,6,3,${.03+a()*.06})`:`rgba(150,100,45,${.03+a()*.06})`;A.addColorStop(0,P),A.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=A,r.fillRect(0,0,i,t)}r.lineWidth=1;for(let p=0;p<i*t/900;p++){let u=a()*i,v=a()*t,x=a()*6.28,A=3+a()*14;r.strokeStyle=e?`rgba(255,235,200,${a()*.035})`:`rgba(110,70,30,${a()*.07})`,r.beginPath(),r.moveTo(u,v),r.lineTo(u+Math.cos(x)*A,v+Math.sin(x)*A),r.stroke()}let h=r.getImageData(0,0,i,t),f=h.data;for(let p=0;p<f.length;p+=4){let u=(a()-.5)*(e?10:14);f[p]+=u,f[p+1]+=u,f[p+2]+=u*.8}r.putImageData(h,0,0);let m=e?"rgba(240,220,180,":"rgba(80,50,22,";r.lineCap="round";let d=Math.min(i,t)/400,g=(p,u,v,x)=>{r.strokeStyle=m+".16)",r.lineWidth=.7*d;for(let A=0;A<v;A++){let P=p,T=u+A*9*d,L=p+x*(.6+a()*.4);for(r.beginPath(),r.moveTo(P,T);P<L;){let J=(2+a()*3)*d,b=(2+a()*3.2)*d;r.bezierCurveTo(P+J*.3,T-b,P+J*.7,T-b,P+J,T),P+=J,a()<.14&&(P+=4*d,r.moveTo(P,T))}r.stroke()}},_=r.createRadialGradient(i/2,t/2,Math.min(i,t)*.35,i/2,t/2,Math.hypot(i,t)*.62);return _.addColorStop(0,"rgba(0,0,0,0)"),_.addColorStop(1,e?"rgba(0,0,0,.28)":"rgba(90,55,20,.22)"),r.fillStyle=_,r.fillRect(0,0,i,t),s}var cg={light:{skin:["#5a3a22","#b58a5c","#f6e2bf"],shirt:["#4f5a44","#8d9a78","#d8dcc4"],shorts:["#3a2c22","#5f4a3a","#8e7660"],shoe:["#5a4632","#a58d6c","#f4ead6"],sole:["#33261b","#65503b","#a08667"],hair:"#3e2a18",ink:"#3a2414",hi:"#fff6e2",glow:"#fffaf0",glowEdge:"#f7dca4",halo:"#ffd27a",haloK:.45,gear:[["#5f6b4f","#97a27f","#cfd6b8"]]},dark:{skin:["#24180f","#7e5c3c","#ecd2a6"],shirt:["#262c22","#6c7860","#cdd3bb"],shorts:["#1a130e","#4a3a2d","#7f6a55"],shoe:["#221a12","#6a5640","#e2d2b4"],sole:["#120d09","#33281d","#6a5640"],hair:"#150e08",ink:"#f2dcb4",hi:"#fbeed2",glow:"#fffaf0",glowEdge:"#f2d39c",halo:"#ffcf70",haloK:.5,gear:[["#2a3024","#55604a","#8e9a7c"]]}},hg={light:{skin:["#4f321c","#a07a52","#ecd8b2"],shirt:["#5a4632","#97835f","#d2c09c"],shorts:["#2e1f13","#523c2a","#7f654a"],shoe:["#4e3a29","#9a8061","#ece0c6"],sole:["#2a1c11","#5a4430","#93795a"],hair:"#3a2615",ink:"#2e1a0b",hi:"#fbf4e6",glow:"#fffef8",glowEdge:"#f3dcb0",halo:"#ffd890",haloK:.42,gear:[["#7a5f43","#bba17a","#e6d4b0"]]},dark:{skin:["#1d150f","#6a5139","#e2c9a0"],shirt:["#2a2019","#8e7a61","#f1e6d1"],shorts:["#150f0a","#3f3022","#7d6449"],shoe:["#1b140e","#5a4733","#d8c5a3"],sole:["#0e0a07","#2c2219","#5c4a37"],hair:"#120c07",ink:"#efd9b1",hi:"#f6e7c9",glow:"#fffcf4",glowEdge:"#f0d6a8",halo:"#ffd27a",haloK:.5,gear:[["#1a130d","#4a3a29","#8d7656"]]}};function Dc(i,t,e={}){let n=_o(t),s=n.H,r=new ws({canvas:i,antialias:!0,alpha:e.paper===!1,premultipliedAlpha:!0,powerPreference:"low-power"});r.outputColorSpace=ze,r.autoClear=!1;let l=new As,a=new ln(22,1,.05,30),o={dark:!1,move:"squat",body:"man",t0:performance.now(),still:!1,frames:[],rep:null},c={uInk:{value:new ee},uHi:{value:new ee},uHair:{value:new ee},uGlow:{value:new ee},uGlowEdge:{value:new ee},uGlowHalo:{value:new ee},uDark:{value:0},uPx:{value:1},uGlowAmt:{value:1},uHatch:{value:200},uW:{value:1.5},uRes:{value:new I(1,1)},uAnchor:{value:[0,0]},uHeadC:{value:new I},uPlain:{value:0},uLight:{value:new I(-.5,.78,.5)}};for(let y of["Skin","Shirt","Shorts","Shoe","Sole"])for(let R=0;R<3;R++)c["u"+y+R]={value:new ee};let h=()=>({value:[0,0,0,0]});for(let y of["L","R"])for(let R=0;R<5;R++)c["a"+y+R]=h();let f={uSkin0:{value:new ee},uSkin1:{value:new ee},uSkin2:{value:new ee}},m=new Ce({uniforms:c,vertexShader:ls,fragmentShader:xo,side:En}),d=new Ce({uniforms:c,vertexShader:ls,fragmentShader:xo,defines:{ACC:1}}),g=new Ce({uniforms:c,vertexShader:ls,fragmentShader:Qm,depthTest:!1,depthWrite:!1,blending:ys,transparent:!0}),_=new Ce({uniforms:Object.assign({},c,{uA:{value:1},uSeed:{value:0}}),vertexShader:Ec,fragmentShader:Tc,side:Ke}),p=new Ce({uniforms:Object.assign({},c,{uA:{value:.35},uSeed:{value:7.3},uW:{value:2.6}}),vertexShader:Ec,fragmentShader:Tc,side:Ke,transparent:!0,depthWrite:!1}),u=Object.assign({},c,f),v=new Ce({uniforms:u,vertexShader:ls,fragmentShader:xo,defines:{GEAR:1}}),x=new Ce({vertexShader:ls,fragmentShader:"void main(){ gl_FragColor = vec4(0.,0.,0.,1.); }",defines:{GEAR:1}}),A=new Ce({uniforms:c,vertexShader:ls,fragmentShader:"void main(){ gl_FragColor = vec4(0.,0.,0.,1.); }"}),P={},T={man:n},L={};function J(y,R,C,D){let Y=s.bones.length,K=[],st=[],ut=new Float32Array(Y),vt=new Float32Array(Y),Zt=[],Qt=new I(0,1,0),se=new I(0,0,1);s.bones.forEach((te,Re)=>{let qe=new I(...y.head[te]);Zt.push(qe);let Ie=new I(...y.tail[te]).sub(qe).normalize();/^(root|spine|neck|head|clavicle)/.test(te)&&(Ie=Qt.clone());let Se=Li(Math.abs(Ie.z)>.8?Qt:se,Ie),he=new I().crossVectors(Ie,Se);K.push(Ie.clone().addScaledVector(Se,.4).addScaledVector(he,.55).normalize()),st.push(Ie.clone().multiplyScalar(.55).addScaledVector(Se,.2).addScaledVector(he,1).normalize());let ue=s.parent[Re];if(ue!=null){let De=s.bones.indexOf(ue),Fe=qe.clone().sub(Zt[De]);ut[Re]=ut[De]+Fe.dot(K[De]),vt[Re]=vt[De]+Fe.dot(st[De])}});let qt=new Float32Array(s.nv*2),oe=new I;for(let te=0;te<s.nv;te++){let Re=0,qe=0;for(let Ie=0;Ie<4;Ie++){let Se=D[te*4+Ie];if(!Se)continue;let he=C[te*4+Ie];oe.set(R[te*3],R[te*3+1],R[te*3+2]).sub(Zt[he]),Re+=Se*(ut[he]+oe.dot(K[he])),qe+=Se*(vt[he]+oe.dot(st[he]))}qt[te*2]=Re,qt[te*2+1]=qe}return qt}let b=s.nv,E=e.lite!=null?!!e.lite:Math.min(screen.width||9999,screen.height||9999)<600||(navigator.deviceMemory||8)<=2;o.lite=E;let k=new pe(n.get("lod"),1),tt=y=>{let R=new Uint16Array(y.length/4*6);for(let C=0,D=0;C<y.length;C+=4)R[D++]=y[C],R[D++]=y[C+1],R[D++]=y[C+2],R[D++]=y[C],R[D++]=y[C+2],R[D++]=y[C+3];return R};function pt(y,R,C){y.computeVertexNormals();let D=y.attributes.normal.array,Y=C.headC;for(let K=0;K<b;K++){let st=X[K]/255;if(!st)continue;let ut=R[K*3]-Y[0],vt=R[K*3+1]-Y[1],Zt=R[K*3+2]-Y[2],Qt=Math.hypot(ut,vt,Zt)||1;ut=D[K*3]*(1-st)+ut/Qt*st,vt=D[K*3+1]*(1-st)+vt/Qt*st,Zt=D[K*3+2]*(1-st)+Zt/Qt*st;let se=Math.hypot(ut,vt,Zt)||1;D[K*3]=ut/se,D[K*3+1]=vt/se,D[K*3+2]=Zt/se}y.attributes.normal.needsUpdate=!0}let N=new Uint16Array(n.get("skinIndex")),V=n.get("skinWeight"),O=new Float32Array(V.length);for(let y=0;y<b;y++){let R=0;for(let C=0;C<4;C++)R+=V[y*4+C];for(let C=0;C<4;C++)O[y*4+C]=V[y*4+C]/(R||1)}let F=n.get("cloth"),G=n.get("mus"),X=n.get("face"),at=n.get("calm"),j=n.get("fiber"),rt=new Float32Array(b);for(let y=0;y<b;y++)rt[y]=(j[y]-32768)/65535;let W=s.nacc,ot=n.get("acc_index"),yt=n.get("acc_uv"),Ct=n.get("acc_skinIndex"),Tt=n.get("acc_skinWeight"),Ft=new Uint16Array(W*4),Bt=new Float32Array(W*4);for(let y=0;y<W;y++){Ft[y*4]=Ct[y*2],Ft[y*4+1]=Ct[y*2+1];let R=Tt[y*2]+Tt[y*2+1]||1;Bt[y*4]=Tt[y*2]/R,Bt[y*4+1]=Tt[y*2+1]/R}function Dt(y){let R=T[y],C=R.H.figs[y],D=R.get(y+"_pos"),Y=new Float32Array(b*3),K=0,st=0,ut=0;for(let $t=0;$t<b;$t++){let Ve=D[$t*3],Bn=D[$t*3+1],In=D[$t*3+2];C.posDelta&&(K+=Ve,st+=Bn,ut+=In,Ve=K,Bn=st,In=ut),Y[$t*3]=C.lo[0]+Ve/65535*(C.hi[0]-C.lo[0]),Y[$t*3+1]=C.lo[1]+Bn/65535*(C.hi[1]-C.lo[1]),Y[$t*3+2]=C.lo[2]+In/65535*(C.hi[2]-C.lo[2])}let vt=new mn;vt.setAttribute("position",new pe(Y,3)),vt.setIndex(k),pt(vt,Y,C),vt.setAttribute("face",new pe(X,1,!0)),vt.setAttribute("skinIndex",new pe(N,4)),vt.setAttribute("skinWeight",new pe(O,4));let Zt=R.get(y+"_hair"),Qt=new Uint8Array(b*4);for(let $t=0;$t<b;$t++)Qt[$t*4]=F[$t*3],Qt[$t*4+1]=F[$t*3+1],Qt[$t*4+2]=F[$t*3+2],Qt[$t*4+3]=Zt[$t];vt.setAttribute("cloth",new pe(Qt,4,!0));let se=new Pr(G,20);for(let $t=0;$t<5;$t++)vt.setAttribute("mus"+$t,new Lr(se,4,$t*4,!0));vt.setAttribute("fiber",new pe(rt,1)),vt.setAttribute("relief",new pe(R.get(y+"_relief"),1,!0)),vt.setAttribute("calm",new pe(at,1,!0)),vt.setAttribute("hatch",new pe(J(C,Y,N,O),2));let qt=s.bones.map($t=>{let Ve=new Es;return Ve.name=$t,Ve});s.bones.forEach(($t,Ve)=>{let Bn=s.parent[Ve],In=C.head[$t];if(Bn==null)qt[Ve].position.set(...In);else{let Wr=C.head[Bn];qt[Ve].position.set(In[0]-Wr[0],In[1]-Wr[1],In[2]-Wr[2]),qt[s.bones.indexOf(Bn)].add(qt[Ve])}});let oe=new fe,te=new ci(vt,m);te.add(qt[0]);let Re=new Ir(qt);te.bind(Re);let qe=new ci(vt,_);qe.bind(Re,te.bindMatrix);let Ie=new ci(vt,p);Ie.bind(Re,te.bindMatrix);let Se=new mn;Se.setAttribute("position",new pe(R.get(y+"_acc"),3)),Se.setIndex(new pe(ot,1)),Se.computeVertexNormals(),Se.setAttribute("accUV",new pe(yt,3)),Se.setAttribute("face",new pe(new Uint8Array(W),1,!0)),Se.setAttribute("skinIndex",new pe(Ft,4)),Se.setAttribute("skinWeight",new pe(Bt,4));let he=new ci(Se,d);he.bind(Re,te.bindMatrix);let ue=new ci(Se,_);ue.bind(Re,te.bindMatrix),te.frustumCulled=qe.frustumCulled=Ie.frustumCulled=he.frustumCulled=ue.frustumCulled=!1,Ie.renderOrder=-.5,oe.add(te),oe.add(qe),E||oe.add(Ie),oe.add(he),oe.add(ue);let De=new bo(s,C),Fe={};return qt.forEach($t=>Fe[$t.name]=$t),{grp:oe,mesh:te,hull:qe,hull2:Ie,acc:he,accHull:ue,rig:De,bones:Fe,F:C,pos:Y}}let Gt=y=>P[y]||(P[y]=Dt(y));!E&&e.extra&&e.extra("full").then(y=>{k=new pe(tt(_o(y).get("quads")),1);for(let R in P){let C=P[R];C.mesh.geometry.setIndex(k),pt(C.mesh.geometry,C.pos,C.F)}o.full=!0,Oe()}).catch(()=>{});let H={},Et=(y,R)=>{let C=new He(y,v);C.position.set(...R);let D=new He(y,_);return C.add(D),C},ct=new Ce({uniforms:{uInk:c.uInk,uPx:c.uPx,uDark:c.uDark,uHatch:c.uHatch},transparent:!0,depthWrite:!1,vertexShader:"varying vec2 vP; void main(){ vP = position.yz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",fragmentShader:`uniform vec3 uInk; uniform float uPx, uDark, uHatch; varying vec2 vP;
      ${Vr}
      void main(){ float e = smoothstep(.0, .2, .45 - abs(vP.y)) * smoothstep(.0, .35, .95 - abs(vP.x)) ;
        float l = hl((vP.x * .9 + vP.y * .45) * uHatch * .75, uPx * .45) * (.5 + .5 * vn(vec3(vP * 30., 1.)));
        float edge = (1. - smoothstep(uPx * .6, uPx * 1.6, abs(vP.y - .42) / fwidth(vP.y))) * smoothstep(.0, .5, .95 - abs(vP.x));
        gl_FragColor = linearToOutputTexel(vec4(uInk, (l * .32 + edge * .55) * e)); }`}),St=new Ti(.9,1.9).rotateY(-Math.PI/2),Ot=Ac(Et,(y,R)=>{let C=new He(St,ct),D=new fe;D.add(C);let Y={left:[.56,0],right:[-.56,Math.PI],front:[.6,Math.PI/2],back:[-.35,-Math.PI/2]}[y]||[.56,0],K=R!=null?R*(Y[0]<0?-1:1):Y[0];return{obj:D,update(st){let ut=st.s;D.scale.setScalar(ut),y==="front"||y==="back"?(D.position.set(0,.95*ut,K*ut),D.rotation.y=-Y[1]):(D.position.set(K*ut,.95*ut,.1*ut),D.rotation.y=Y[1])}}}),wt={},S=[];function M(y){S.forEach(R=>l.remove(R.obj)),S=[],(y||[]).forEach((R,C)=>{if(o.hide&&o.hide[R.id])return;let D=JSON.stringify(R),Y=wt[D];if(!Y){if(Y=Ot.make(R),!Y)return;wt[D]=Y}l.add(Y.obj),S.push(Y)})}let B={uJ:{value:Array.from({length:14},()=>new I(0,9,0))},uShade:{value:new ee},uPx:c.uPx,uDark:c.uDark},Q=new He(new Ti(4,4).rotateX(-Math.PI/2),new Ce({uniforms:B,vertexShader:ig,fragmentShader:`${sg}`,transparent:!0,depthWrite:!1}));Q.position.y=.001,Q.renderOrder=-1,l.add(Q);let et=new Ti(2,2),it={value:null},_t=new He(et,new Ce({uniforms:{tMap:it},vertexShader:vo,fragmentShader:ng,depthTest:!1,depthWrite:!1})),lt={tMap:{value:null},uDir:{value:[0,0]}},ft=new He(et,new Ce({uniforms:lt,vertexShader:vo,fragmentShader:tg,depthTest:!1,depthWrite:!1})),At={tMap:{value:null},uK:{value:1}},It=new He(et,new Ce({uniforms:At,vertexShader:vo,fragmentShader:eg,depthTest:!1,depthWrite:!1,blending:ys,transparent:!0})),nt=new As,Yt=new Ss(-1,1,1,-1,0,1),Pt,Lt,Nt={minFilter:on,magFilter:on,type:Dn,depthBuffer:!0},xt=1,Ut=1,kt=1,ce="";function Wt(){let y=i.getBoundingClientRect();kt=Math.min(window.devicePixelRatio||1,e.maxDpr||(o.lite?1.5:2)),xt=Math.max(1,Math.round(y.width)),Ut=Math.max(1,Math.round(y.height)),r.setPixelRatio(kt),r.setSize(xt,Ut,!1),a.aspect=xt/Ut,a.updateProjectionMatrix(),c.uPx.value=kt,c.uRes.value.set(xt*kt,Ut*kt,0);let R=o.lite?6:4,C=Math.max(16,Math.round(xt*kt/R)),D=Math.max(16,Math.round(Ut*kt/R));(!Pt||Pt.width!==C||Pt.height!==D)&&(Pt&&Pt.dispose(),Lt&&Lt.dispose(),Pt=new vn(C,D,Nt),Lt=new vn(C,D,Nt)),gt(),Ht()}function gt(){let y=xt+"x"+Ut+(o.dark?"d":"l");if(y===ce)return;ce=y;let R=lg(Math.round(xt*Math.min(kt,1.5)),Math.round(Ut*Math.min(kt,1.5)),o.dark,11);it.value&&it.value.dispose(),it.value=new Ur(R),it.value.colorSpace=ze}function U(y){o.dark=!!y;let R=(e.palette==="paint"?cg:hg)[o.dark?"dark":"light"];for(let[C,D]of[["Skin",R.skin],["Shirt",R.shirt],["Shorts",R.shorts],["Shoe",R.shoe],["Sole",R.sole]])for(let Y=0;Y<3;Y++)c["u"+C+Y].value.set(D[Y]);c.uInk.value.set(R.ink),B.uShade.value.set(o.dark?"#0b0705":R.ink),c.uHi.value.set(R.hi),c.uHair.value.set(R.hair),c.uGlow.value.set(R.glow),c.uGlowEdge.value.set(R.glowEdge),c.uGlowHalo.value.set(R.halo),c.uDark.value=o.dark?1:0;for(let C=0;C<3;C++)f["uSkin"+C].value.set(R.gear[0][C]);o.haloK=R.haloK,At.uK.value=R.haloK*(ht&&ht.halo||1),gt()}let ht,Mt,Vt,zt,de={};function me(y,R,C,D){let Y=y.scale,K=C.by||"t1",st=C.r!=null?C.r:.975,ut=C.side?[C.side]:["R","L"].filter(he=>{let ue=R[D==="arm"?he==="R"?"ra":"la":he==="R"?"rl":"ll"];return ue&&!Array.isArray(ue)});if(!ut.length)return;let vt=JSON.parse(JSON.stringify(R)),Zt=()=>K==="t1"?vt.t[1]:K==="t"||K==="t0"?vt.t[0]:K==="p0"?vt.p[0]:K==="p1"?vt.p[1]:vt.n!=null?vt.n:vt.t[1],Qt=C.span!=null?C.span:/^p/.test(K)?.2:30,se=Zt(),qt=(he,ue)=>{let De=ue-se;K==="t1"?he.t=[vt.t[0],ue]:K==="t"?(he.t=[vt.t[0]+De,vt.t[1]+De],vt.n!=null&&(he.n=vt.n+De)):K==="t0"?he.t=[ue,vt.t[1]]:K==="p0"?he.p=[ue,vt.p[1]]:K==="p1"?he.p=[vt.p[0],ue]:he.n=ue},oe=he=>{let ue=JSON.parse(JSON.stringify(vt));qt(ue,he);let De=Is(y,Object.assign({},ue,{anA:ue.an,anB:ue.an,anW:0}),ue,ue,0),Fe=0;for(let $t of ut){let Ve=De.T[D+$t];if(!Ve)continue;let Bn=De.Pw[(D==="arm"?"upperarm01.":"upperleg01.")+$t],In=D==="arm"?y.len["uarm"+$t]+y.len["farm"+$t]:y.len["thigh"+$t]+y.len["shin"+$t];Fe=Math.max(Fe,Bn.distanceTo(Ve)/In)}return Fe-st},te=se-Qt,Re=se+Qt,qe=oe(te),Ie=oe(Re),Se=se;if(qe*Ie>0)Se=Math.abs(qe)<Math.abs(Ie)?te:Re;else{for(let he=0;he<26;he++){let ue=(te+Re)/2,De=oe(ue);De>0==qe>0?(te=ue,qe=De):Re=ue}Se=(te+Re)/2}qt(R,Se)}function Ue(y){let R=y+":"+o.body;if(de[R]&&de[R].src===je[y])return de[R];let C=je[y],D=Gt(o.body).rig,Y=D.scale,K=Object.assign({},C,{k:C.k.map(st=>JSON.parse(JSON.stringify(st))),src:C});for(let st of K.k){if(st.fitArm&&me(D,st,st.fitArm,"arm"),st.fitLeg&&me(D,st,st.fitLeg,"leg"),!st.reach)continue;let ut=se=>{st.t=[se,se],st.n=se-4,st.rl=[se-180,se-180,st.rl[2],st.rl[3]],st.ll=[se-180,se-180,st.ll[2],st.ll[3]]},vt=se=>{ut(se);let qt=Is(D,Object.assign({},st,{anA:st.an,anB:st.an,anW:0}),st,st,0),oe=qt.Pw,te=st.ra,Re=new I(te.x!=null?te.x*Y*Qe.R:oe["upperarm01.R"].x+Qe.R*(te.dx||0)*Y,te.y*Y,te.z*Y);return oe["upperarm01.R"].distanceTo(Re)/(D.len.uarmR+D.len.farmR)},Zt=92,Qt=124;for(let se=0;se<24;se++){let qt=(Zt+Qt)/2;vt(qt)>st.reach?Qt=qt:Zt=qt}ut(Zt)}for(let st of K.k)try{let ut=Is(D,Object.assign({},st,{anA:st.an,anB:st.an,anW:0}),st,st,0);st.__pa=ut.pa}catch{}return de[R]=K}let le=()=>o.virt!=null?o.virt:performance.now(),_e={rep:450,still:700,move:1100},Je=400;function hn(y,R){let C=Ue(y),D=C.own?null:o.pace,Y=D?D.reduce((ut,vt)=>ut+vt,0):!C.own&&o.tempo||C.tempo,K=C.tempo/Y,st=C.reps||(C.alt?2:1);return{id:y,MV:C,seg:Uc(C,C.top?.4:0,D),per:st,tempo:Y,loopDur:Y*st,bp:D&&C.bp?D:C.bp,phase:0,lastT:R,rFrom:K,rTo:K,rT0:R,rT1:R,rep:null,still:!!o.reduced,fixedU:null,paused:!1}}let Cn=(y,R)=>R>=y.rT1?y.rTo:Le(y.rFrom,y.rTo,Mn(Math.max(0,(R-y.rT0)/(y.rT1-y.rT0))));function Os(y,R,C){un(y,R),y.rFrom=Cn(y,R),y.rTo=C,y.rT0=R,y.rT1=R+Je}function un(y,R){if(R>y.lastT){let C=Cn(y,y.lastT),D=Cn(y,(R+y.lastT)/2),Y=Cn(y,R);y.phase+=(R-y.lastT)/1e3*(C+4*D+Y)/6}y.lastT=R}let Nn=y=>Object.assign({},y);function Pn(y,R,C,D){if(!y||!o.started||o.reduced)return;let Y=_e[C]||450;try{let K=w(Nn(y),R,!1),st=w(Nn(D||o.track),R,!1),ut=0;for(let Zt of["root","spine01","upperarm01.L","upperarm01.R","upperleg01.L","upperleg01.R","lowerleg01.L","lowerleg01.R","lowerarm01.L","lowerarm01.R"])ut=Math.max(ut,K.sol.Qw[Zt].angleTo(st.sol.Qw[Zt]));let vt=K.sol.Pw.root.distanceTo(st.sol.Pw.root);if(ut<.03&&vt<.005)return;Y=Math.max(Y,Math.min(1800,300+420*ut+1600*vt))}catch{}o.prev={tr:y,t0:R,dur:Y,prev:o.prev}}function hs(y){if(je[y]||(y=je[o.move]?o.move:je.standing?"standing":je.squat?"squat":Object.keys(je)[0]),!y)throw new Error("no patterns defined");let R=le(),C=o.track;o.formK=[],o.lastB=null,o.track=hn(y,R),o.move=y,o.driven&&C&&(o.track.extU=C.extU,o.track.extRate=C.extRate),C&&C.id!==y&&(un(C,R),Pn(C,R,"move")),ht=o.track.MV,Mt=o.track.seg,zt=o.track.per,Vt=o.track.loopDur,M(ht.props);let D={};Ds.forEach(Y=>D[Y]=ht.glow[Y]||[0,0]),o.act=D,o.haloK&&(At.uK.value=o.haloK*(ht.halo||1)),Ht()}function ui(y){if(!T[y])return e.extra?(L[y]=L[y]||e.extra(y).then(R=>{T[y]=_o(R)}),o.want=y,L[y].then(()=>{o.want===y&&(ui(y),Oe())})):Promise.reject(new Error("no data for "+y));if(o.want=y,P[o.body]&&l.remove(P[o.body].grp),o.body=y,l.add(Gt(y).grp),c.uHeadC.value.set(...P[y].F.headC),o.track){let R=o.track,C=Ue(R.id);R.MV=C,R.seg=Uc(C,C.top?.4:0,o.pace),o.prev=null,ht=C,Mt=R.seg}return Ht(),Promise.resolve()}function On(y){if(y.fixedU!=null)return y.fixedU;let R=y.MV,C=y.seg,D=R.tempo*y.per;if(y.extU!=null&&!y.still)return y.extU;if(y.still)return R.top?C.find(Y=>Y.a===Y.b&&Y.a===R.top[0]).t0+.02:C[0].t1*.999+1e-4;if(y.rep!=null){let Y=(y.rep-1)%y.per*R.tempo;return Math.min(Y+y.phase,Y+R.tempo*.9999+(y.per>1&&y.rep%y.per?99:0))/D}return y.phase/D}function us(y,R){un(y,R);let C=Math.max(1e-6,Cn(y,R));if(y.bp){let K=og(y.bp,y.phase*y.bp.reduce((st,ut)=>st+ut,0)/y.MV.tempo);return{phase:K.phase,x:K.x,msLeft:K.secsLeft*1e3/(C*y.bp.reduce((st,ut)=>st+ut,0)/y.MV.tempo),u:On(y),rep:y.rep,after:K.after}}let D=On(y),Y=ag(y.MV,y.seg,D);return{phase:Y.phase,x:Y.x,msLeft:(Y.u1-D)*y.MV.tempo*y.per*1e3/C,u:D,rep:y.rep,after:Y.after}}function Hr(y,R,C,D){let Y=us(R,D),K=Y.phase==="in"?Mn(Y.x):Y.phase==="hold"?Y.after==="in"?1:0:1-Mn(Y.x),st=(K-.5)*2*(R.bp?1.6:1),ut=Object.assign({},y);ut.t=[y.t[0],y.t[1]+st*.6],ut.shR=(y.shR||0)+st*.9,ut.shL=(y.shL||0)+st*.9;let vt=.02,Zt=Br(R.MV,R.seg,C-vt).P.t[1],Qt=Br(R.MV,R.seg,C+vt).P.t[1],se=Math.max(-4,Math.min(4,-(Qt-Zt)*.35));return ut.n=(y.n!=null?y.n:y.t[1])+se+st*.3,ut}function w(y,R,C=!0){un(y,R);let D=Gt(o.body),Y=On(y),{P:K,A:st,B:ut,w:vt}=Br(y.MV,y.seg,Y),Zt=C&&!o.calm?Hr(K,y,Y,R):K;return{fig:D,sol:Is(D.rig,Zt,st,ut,vt),P:K}}function z(y){let R=Gt(o.body),{P:C,A:D,B:Y,w:K}=Br(ht,Mt,y);return{fig:R,sol:Is(R.rig,C,D,Y,K),P:C}}function Z(y,R){let{Qw:C}=R,D=y.rig,Y=[];for(let K of D.names){let st=D.parent[D.names.indexOf(K)],ut=C[K]||(st?C[st]:new ne);C[K]||(C[K]=ut),Y.push(st?C[st].clone().invert().multiply(ut):ut.clone())}return Y}function $(y,R,C){y.rig.names.forEach((D,Y)=>y.bones[D].quaternion.copy(R[Y])),y.bones.root.position.copy(C)}function q(y,R,C){let D=w(y,C),Y=D.fig,K=Z(Y,D.sol),st=D.sol.Pw.root.clone(),ut=Object.assign({},D.P);if(R){let vt=(C-R.t0)/R.dur;if(vt<1){let Zt=Mn(Math.max(0,vt)),Qt=q(R.tr,R.prev&&C-R.prev.t0<R.prev.dur?R.prev:null,C);K=K.map((oe,te)=>new ne().slerpQuaternions(Qt.L[te],oe,Zt)),st=Qt.root.clone().lerp(st,Zt),ut.e=Le(Qt.P.e!=null?Qt.P.e:1,ut.e!=null?ut.e:1,Zt);let se=Qt.P.gl||[1,1],qt=ut.gl||[1,1];ut.gl=[Le(se[0],qt[0],Zt),Le(se[1],qt[1],Zt)]}}return{fig:Y,sol:D.sol,L:K,root:st,P:ut}}function Rt(y){o.prev&&y-o.prev.t0>=o.prev.dur&&(o.prev=null);let R=q(o.track,o.prev,y);return $(R.fig,R.L,R.root),R.fig.grp.updateMatrixWorld(!0),R}let mt={pos:null,look:null,hatch:0,vp:new I,vl:new I,vh:0,target:null};function Ht(){if(!ht||!P[o.body])return;let y=[];for(let Fe=0;Fe<12;Fe++){let{sol:$t}=z(Fe/12);for(let Ve in $t.Pw)y.push($t.Pw[Ve])}let R=Gt(o.body),C=(ht.cam.yaw||0)*Pe,D=(ht.cam.el||0)*Pe,Y=new I(-Math.cos(C)*Math.cos(D),Math.sin(D),Math.sin(C)*Math.cos(D)),K=Y.clone().negate(),st=new I().crossVectors(K,new I(0,1,0)).normalize(),ut=new I().crossVectors(st,K),vt=1e9,Zt=-1e9,Qt=1e9,se=-1e9,qt=.09*R.rig.scale;for(let Fe of y){let $t=Fe.dot(st),Ve=Fe.dot(ut);vt=Math.min(vt,$t-qt*1.9),Zt=Math.max(Zt,$t+qt*1.9),Qt=Math.min(Qt,Ve-qt*.6),se=Math.max(se,Ve+qt*1.35)}(ht.props||[]).some(Fe=>Fe.id==="mat")&&(Qt=Math.min(Qt,-.05)),Qt=Math.min(Qt,new I(0,0,0).dot(ut)-.04);let oe=(vt+Zt)/2,te=(Qt+se)/2,Re=(ht.cam.zoom||1)*(e.zoom||1),qe=(se-Qt)/2*1.03/Re,Ie=(Zt-vt)/2*1.03/Re,Se=Math.tan(a.fov*Pe/2),he=Math.max(qe/Se,Ie/(Se*a.aspect))+.3,ue=st.clone().multiplyScalar(oe).add(ut.clone().multiplyScalar(te)),De=0;for(let Fe of y)De+=Fe.dot(K);De/=y.length,ue.addScaledVector(K,De),mt.target={pos:ue.clone().addScaledVector(Y,he),look:ue,hatch:Ut/(2*Se*he)/4.5},(!mt.pos||!o.started||o.reduced)&&Xt()}function Xt(){mt.target&&(mt.pos=mt.target.pos.clone(),mt.look=mt.target.look.clone(),mt.hatch=mt.target.hatch,mt.vp.set(0,0,0),mt.vl.set(0,0,0),mt.vh=0,jt())}function jt(){a.position.copy(mt.pos),a.lookAt(mt.look),a.updateMatrixWorld(),c.uHatch.value=mt.hatch}function Jt(y){if(!mt.target)return;let R=7,C=Math.min(y,.05);for(let[Y,K,st]of[[mt.pos,mt.vp,mt.target.pos],[mt.look,mt.vl,mt.target.look]]){let ut=st.clone().sub(Y).multiplyScalar(R*R).addScaledVector(K,-2*R);K.addScaledVector(ut,C),Y.addScaledVector(K,C)}let D=(mt.target.hatch-mt.hatch)*R*R-2*R*mt.vh;mt.vh+=D*C,mt.hatch+=mt.vh*C,jt()}let Kt=()=>mt.target&&(mt.pos.distanceTo(mt.target.pos)>5e-4||mt.vp.length()>5e-4);function Ee(y,R){let C=le(),D=o.track;un(D,C);let Y=Nn(D),K=On(Y);y==null?(D.rep=null,D.phase=K*D.MV.tempo*D.per):(D.rep=y,D.phase=R!=null?Math.max(0,(C-R)/1e3*Cn(D,C)):0),Pn(Y,C,"rep")}function tn(y){let R=le(),C=o.track;un(C,R),o.pace=Array.isArray(y)&&y.length>=2&&y.every(st=>st>=0)?y.slice():null;let D=Nn(C),Y=On(D),K=hn(C.id,R);K.phase=Y%1*K.MV.tempo*K.per,K.rep=null,K.paused=C.paused,C.paused&&(K.rFrom=K.rTo=0),o.track=K,Mt=K.seg,Vt=K.loopDur,Pn(D,R,"rep")}function Ne(y){let R=le(),C=o.track;o.tempo=y||null,C.tempo=!C.MV.own&&y||C.MV.tempo,C.loopDur=C.tempo*C.per,Vt=C.loopDur,C.paused||Os(C,R,C.MV.tempo/C.tempo)}function bn(y){let R=le(),C=o.track;!!y!==C.paused&&(C.paused=!!y,Os(C,R,y?0:C.MV.tempo/C.tempo))}function be(y){let R=le(),C=o.track;if(!!y==!!C.still)return;un(C,R);let D=Nn(C);C.still=!!y,y||(C.rep=null,C.phase=On(D)*C.MV.tempo*C.per),Pn(D,R,"still")}let ie=(y,R)=>[0,1,2,3].map(C=>{let D=Ds[R*4+C];return D?(o.act[D]||[0,0])[y]:0}),di=null;function xe(y){let R=performance.now(),{fig:C,sol:D,P:Y}=Rt(y),K=di==null?0:(y-di)/1e3;di=y,K>0&&Jt(K),o.started=!0;let st=Y.e!=null?Y.e:1,ut=Y.gl||[1,1];for(let qt=0;qt<5;qt++)c["aL"+qt].value=ie(0,qt),c["aR"+qt].value=ie(1,qt);if(ht.sideGlow){let qt=Ds.indexOf(ht.sideGlow),oe=Math.floor(qt/4),te=qt%4;c["aL"+oe].value[te]=ut[0],c["aR"+oe].value[te]=ut[1]}c.uGlowAmt.value=.2+.85*st,ds(y,K);let vt={bones:C.bones,s:C.rig.scale,hold:{a:Y.holdA,b:Y.holdB,w:Y.holdW||0}};for(let qt of S)qt.update(vt);if(["root","spine02","head","upperarm01.L","upperarm01.R","wrist.L","wrist.R","lowerleg01.L","lowerleg01.R","foot.L","foot.R","toe1-1.L","toe1-1.R","lowerarm01.R"].forEach((qt,oe)=>C.bones[qt].getWorldPosition(B.uJ.value[oe])),o.noRender)return;let Qt=ht&&(Object.keys(ht.glow||{}).length||ht.sideGlow);if(r.setRenderTarget(Pt),r.setClearColor(0,1),r.clear(),Qt){C.mesh.material=g,C.hull.visible=!1,Q.visible=!1;let qt=[];l.traverse(oe=>{oe.isMesh&&oe!==C.mesh&&oe.visible&&(qt.push(oe),oe.visible=!1)}),r.render(l,a),qt.forEach(oe=>oe.visible=!0),C.mesh.material=m,C.hull.visible=!0,Q.visible=!0,nt.children.length=0,nt.add(ft);for(let oe=0;oe<(o.lite?1:2);oe++)lt.tMap.value=Pt.texture,lt.uDir.value=[1.6/Pt.width,0],r.setRenderTarget(Lt),r.render(nt,Yt),lt.tMap.value=Lt.texture,lt.uDir.value=[0,1.6/Pt.height],r.setRenderTarget(Pt),r.render(nt,Yt)}r.setRenderTarget(null),e.paper===!1&&r.setClearColor(0,0),r.clear(),e.paper!==!1&&(nt.children.length=0,nt.add(_t),r.render(nt,Yt)),r.clearDepth(),r.render(l,a),nt.children.length=0,nt.add(It),At.tMap.value=Pt.texture,r.render(nt,Yt);let se=performance.now()-R;o.frames.push(se),o.frames.length>120&&o.frames.shift()}let sn={breath:[],rep:[],form:[],frame:[]},fi=(y,R)=>{for(let C of sn[y])try{C(R)}catch(D){console.error(D)}},pi=(y,R,C)=>{let D=y.when==null?"always":y.when;if(D==="always")return!0;if(Array.isArray(D)){let Y=(C%1+1)%1;return D[0]<=D[1]?Y>=D[0]&&Y<=D[1]:Y>=D[0]||Y<=D[1]}return String(D).split(/\s+/).includes(R.phase)};function ds(y,R){let C=o.track,D=us(C,y),Y=On(C),K=o.lastB;(!K||K.phase!==D.phase||K.rep!==D.rep)&&fi("breath",{phase:D.phase,msLeft:D.msLeft,rep:D.rep,t:y,after:D.after}),K&&D.rep!=null&&K.rep!==D.rep&&fi("rep",{rep:D.rep,t:y}),o.lastB={phase:D.phase,rep:D.rep};let st=ht.form||[],ut=o.formK;st.forEach((vt,Zt)=>{let Qt=!C.still&&pi(vt,D,Y),se=ut[Zt]||0,qt=o.reduced?Qt?1:0:se+((Qt?1:0)-se)*Math.min(1,R*9);se>.5!=qt>.5&&fi("form",{i:Zt,on:qt>.5,say:vt.say||"",t:y}),ut[Zt]=qt}),sn.frame.length&&fi("frame",{t:y,breath:D,u:Y})}let Xe=(y,R)=>{let C=/^(hand|foot|knee)([*^])$/.exec(y);if(!C)return y;let D={hand:"wrist.",foot:"foot.",knee:"lowerleg01."}[C[1]],Y=R.bones[D+"L"].getWorldPosition(new I).y,K=R.bones[D+"R"].getWorldPosition(new I).y;return D+(Y<K==(C[2]==="*")?"L":"R")};function Ln(y){let R=P[o.body],C=i.getBoundingClientRect(),D={};for(let Y of y){let K=Xe(Y,R),st=R.bones[K];if(!st)continue;let ut=st.getWorldPosition(new I).project(a);D[Y]=[(ut.x*.5+.5)*C.width,(.5-ut.y*.5)*C.height]}return D}function Ii(y){let R=ht&&ht.form||[],C=[];return R.forEach((D,Y)=>{let K=y?1:(o.formK||[])[Y]||0;if(K<.02)return;let st=D.line?"line":D.plumb?"plumb":D.level?"level":D.angle?"angle":null,ut=(D[st]||[]).slice(),vt=ut.concat(D.tick?[D.tick]:[],D.at?[D.at]:[]),Zt=Ln(vt);C.push({i:Y,k:K,kind:st,ext:D.ext!=null?D.ext:.1,pts:ut.map(Qt=>Zt[Qt]).filter(Boolean),tick:D.tick?Zt[D.tick]:null,say:D.say||"",at:D.at?Zt[D.at]:null,side:D.side||1})}),C}let Te=0,Fn=!0,Gr=e.fps?1e3/e.fps-2:o.lite?1e3/30-2:0,fs=-1e9;function Eo(){if(Te=0,!Fn||o.virt!=null)return;let y=le();(y-fs>=Gr||o.prev)&&(fs=y,xe(y));let R=o.track,C=le(),D=R.paused&&Cn(R,C)===0;(!R.still&&R.fixedU==null&&!D||o.prev||Kt())&&(Te=requestAnimationFrame(Eo))}function Oe(){!Te&&Fn&&(Te=requestAnimationFrame(Eo))}let To=new ResizeObserver(()=>{Wt(),Oe()});To.observe(i);let Fs=null;"IntersectionObserver"in window&&(Fs=new IntersectionObserver(y=>{Fn=y[0].isIntersecting&&!o.disposed,Oe()}),Fs.observe(i));let Ro=()=>{Fn=!document.hidden&&!o.disposed,Oe()};return document.addEventListener("visibilitychange",Ro),o.reduced=!!e.still,U(!!e.dark),ui("man"),hs(e.move||"squat"),Wt(),Oe(),e.still&&(o.reduced=!0,o.track.still=!0),o.track.lastT=le(),e.body&&e.body!=="man"&&ui(e.body),{move(y){hs(y),Oe()},rep(y){Ee(y),Oe()},theme(y){U(y),Oe()},body(y){let R=ui(y);return Oe(),R},current:()=>o.body,still(y){be(y),Oe()},breath(y){let R=y??le();return us(o.track,R)},screen:Ln,forms:Ii,formsAll:()=>Ii(!0),on(y,R){return(sn[y]=sn[y]||[]).push(R),()=>{let C=sn[y],D=C.indexOf(R);D>=0&&C.splice(D,1)}},props(y){return y&&typeof y=="object"&&(o.hide=Object.assign(o.hide||{},Object.fromEntries(Object.entries(y).map(([R,C])=>[R,!C]))),ht&&M(ht.props),Oe()),S.map(R=>R.id)},lite:()=>o.lite,seek(y,R={}){let C=R.t!=null?R.t:performance.now(),D=o.track;o.driven||(o.driven=!0,Te&&cancelAnimationFrame(Te),Te=0,o.virt=C,o.noRender=!1,o.calm=!1,D.fixedU=null);let Y=Math.max(0,C-o.virt);o.virt=Math.max(o.virt,C);for(let ut=o.prev;ut;ut=ut.prev)ut.tr.extU!=null&&ut.tr.extRate&&(ut.tr.extU=((ut.tr.extU+ut.tr.extRate*Y)%1+1)%1);let K=(y%1+1)%1,st=D.extU;if(st!=null){let ut=K-st;if(ut<-.5&&(ut+=1),ut>.5&&(ut-=1),Math.abs(ut)>.05&&!D.still){let vt=Nn(D);D.extU=K,Pn(vt,o.virt,"rep")}else Y>0&&(D.extRate=ut/Y)}return D.extU=K,xe(o.virt),this},drive(y){y||o.driven&&(o.driven=!1,o.virt=null,o.track.extU=null,o.track.lastT=le(),Oe())},ndc(y){let R=z(y),C=mt.target;if(!C)return null;let D=a.clone();D.position.copy(C.pos),D.lookAt(C.look),D.updateMatrixWorld(),D.updateProjectionMatrix();let Y=0,K=0,st=9;for(let ut in R.sol.Pw){if(ut==="db")continue;let vt=R.sol.Pw[ut];st=Math.min(st,vt.y/R.fig.rig.scale);let Zt=vt.clone().project(D);Y=Math.max(Y,Math.abs(Zt.x)),K=Math.max(K,Math.abs(Zt.y))}return{x:Y,y:K,low:st}},unknownProps:()=>(ht.props||[]).map(y=>y.id).filter(y=>!Ot.known(y)),dispose(){Fn=!1,Te&&cancelAnimationFrame(Te),Te=0,To.disconnect(),Fs&&Fs.disconnect(),document.removeEventListener("visibilitychange",Ro);for(let y in sn)sn[y].length=0;l.traverse(y=>{y.geometry&&y.geometry.dispose()}),Pt&&Pt.dispose(),Lt&&Lt.dispose(),it.value&&it.value.dispose(),r.dispose(),o.disposed=!0},now:le,moveId:()=>o.track.id,light(y){c.uLight.value.set(y[0],y[1],y[2]!=null?y[2]:.5),Oe()},snap(){Xt(),Oe()},tempo(y){o.pace&&tn(null),Ne(y),Oe()},pace(y){tn(y),Oe()},pause(y){bn(y),Oe()},tempoNow:()=>o.track.tempo,get moves(){return Object.keys(je).map(y=>({id:y,name:je[y].name,tempo:je[y].tempo,alt:!!je[y].alt,reps:je[y].reps||(je[y].alt?2:1),own:!!je[y].own,steps:je[y].steps||0}))},has:y=>!!je[y],stats(){let y=o.frames.slice().sort((R,C)=>R-C);return{n:y.length,median:y[y.length>>1]||0,p90:y[Math.floor(y.length*.9)]||0}},at(y){let R=o.track;o.prev=null,R.fixedU=y,o.calm=y!=null,y==null&&(R.phase=0,R.lastT=le(),R.rep=null),Xt(),xe(le()),Oe()},virt(y){let R=le();o.virt=y?R:null,o.noRender=!!y,o.calm=!1,o.track.fixedU=null,un(o.track,R),o.prev&&(o.prev.t0+=0),y||(o.track.lastT=le(),Oe())},draw(){let y=o.noRender;o.noRender=!1,xe(le()),o.noRender=y},tick(y){o.virt+=y,xe(o.virt);let R=P[o.body],C={};for(let D of R.rig.names){let Y=R.bones[D],K=Y.getWorldPosition(new I),st=Y.getWorldQuaternion(new ne);C[D]=[K.x,K.y,K.z,st.x,st.y,st.z,st.w]}return C},renderer:r,U:c,figs:P,camera:a,M:je,floor:Q,loaded:()=>Object.keys(T),track:y=>{let R=z(y),C={};for(let D in R.sol.Pw){let Y=R.sol.Pw[D];C[D]=[Y.x,Y.y,Y.z]}return C},planted:y=>{let R=o.track,C=R.seg,D=(y%1+1)%1,Y=C.find(vt=>D>=vt.t0&&D<vt.t1)||C[0],K=vt=>(R.MV.k[vt].on||"").split(" ").filter(Boolean),st=K(Y.a),ut=K(Y.b);return st.filter(vt=>ut.includes(vt)).map(vt=>So[vt]).filter(Boolean)},trackQ:y=>{let R=z(y),C={};for(let D in R.sol.Qw){let Y=R.sol.Qw[D],K=R.sol.Pw[D];C[D]=[Y.x,Y.y,Y.z,Y.w].concat(K?[K.x,K.y,K.z]:[])}return C},loopDur:()=>o.track.loopDur,mode:()=>({lite:o.lite,full:!!o.full,faces:P[o.body]?P[o.body].mesh.geometry.index.count/3:0}),dbg:y=>{let R=z(y),C=R.sol.Qw,D=R.fig.rig,Y={P:R.P,thighR:Us(new I(0,-1,0).applyQuaternion(C["upperleg01.R"]))};for(let K of["L","R"]){let st=D.hand[K].palm.clone().applyQuaternion(C["wrist."+K]),ut=D.dir0["finger3-1."+K].clone().applyQuaternion(C["finger3-1."+K]),vt=D.dir0["finger3-3."+K].clone().applyQuaternion(C["finger3-3."+K]);Y["palm"+K]=[st.x,st.y,st.z],Y["curl"+K]=Math.acos(Math.max(-1,Math.min(1,ut.dot(vt))))/Pe}return Y.shoes=!!R.fig.acc,Y.bones=D.names.length,Y}}}function Nc(i,t,e={}){let n=e.gold||(e.dark?"#e9b45a":"#b9781c"),s=e.ink||(e.dark?"#f2dcb4":"#3a2414"),r=e.halo||(e.dark?"rgba(30,20,12,.8)":"rgba(255,246,226,.85)"),l=e.font||'italic 600 16px "Cormorant Garamond", Georgia, serif',a=(h,f,m)=>Math.sin(h*.07+f*.05+m)*.8;i.save(),i.font=l;let o=wo(t,Object.assign({measure:h=>i.measureText(h).width,canvas:i.canvas},e));i.restore();let c=(h,f,m)=>{let d=()=>{i.beginPath(),h.forEach(([g,_],p)=>p?i.lineTo(g+a(g,_,1),_+a(_,g,2)):i.moveTo(g,_))};i.save(),i.lineCap="round",i.lineJoin="round",i.setLineDash(m||[7,6]),i.globalAlpha=f*.7,i.strokeStyle=r,i.lineWidth=5,d(),i.stroke(),i.globalAlpha=f*.95,i.strokeStyle=n,i.lineWidth=2,d(),i.stroke(),i.restore()};for(let h of t){let f=h.k,m=h.pts;if(h.kind==="line"&&m.length>=2){let[g,_]=m,p=_[0]-g[0],u=_[1]-g[1],v=h.ext;c([[g[0]-p*v,g[1]-u*v],[_[0]+p*v,_[1]+u*v]],f)}else if(h.kind==="plumb"&&m.length>=2)c([[m[0][0],m[0][1]-12],[m[0][0],m[1][1]+6]],f);else if(h.kind==="level"&&m.length>=2){let g=(m[0][1]+m[1][1])/2;c([[m[0][0]-14,g],[m[1][0]+14,g]],f)}else h.kind==="angle"&&m.length>=3&&c([m[0],m[1],m[2]],f,[5,5]);if(h.tick){let g=h.tick;c([[g[0]+10,g[1]-4],[g[0]+14,g[1]],[g[0]+22,g[1]-10]],f,[])}let d=h.say&&h.at?o[t.indexOf(h)]:null;if(d){let g=h.at,_=d.side,p=d.x,u=d.y;i.save(),i.globalAlpha=f*.6,i.strokeStyle=n,i.lineWidth=1,i.setLineDash([2,3]),i.beginPath(),i.moveTo(g[0]+_*6,g[1]-2),i.lineTo(p-_*4,u+3),i.stroke(),i.globalAlpha=f,i.font=l,i.textAlign=_>0?"left":"right",i.lineJoin="round",i.strokeStyle=r,i.lineWidth=5,i.setLineDash([]),i.strokeText(h.say,p,u),i.fillStyle=s,i.fillText(h.say,p,u),i.restore()}}}function wo(i,t={}){let e=t.canvas||null,n=t.w||(e?e.clientWidth:0)||9999,s=t.h||(e?e.clientHeight:0)||9999,r=t.margin!=null?t.margin:8,l=t.size||16,a=t.measure||(f=>f.length*l*.48),o=t.avoid||[],c=[],h=(f,m)=>f.x<m.x+m.w&&f.x+f.w>m.x&&f.y<m.y+m.h&&f.y+f.h>m.y;return i.map(f=>{if(!f.say||!f.at)return null;let m=f.at,d=a(f.say),g=(A,P,T)=>({x:A>0?P:P-d,y:T-l*.85,w:d,h:l*1.15}),_=(A,P)=>{let T=m[0]+A*P,L=m[1]-10;return{side:A,x:T,y:L,box:g(A,T,L)}},p=A=>A.x>=r&&A.y>=r&&A.x+A.w<=n-r&&A.y+A.h<=s-r,u=A=>!o.some(P=>h(A,P))&&!c.some(P=>h(A,P)),v=f.side||1,x=null;for(let A of[_(v,64),_(-v,64),_(v,30),_(-v,30)])if(p(A.box)&&u(A.box)){x=A;break}if(!x){x=_(v,64);let{x:A,y:P}=x,T=x.box;T.x<r&&(A+=r-T.x),T.x+T.w>n-r&&(A-=T.x+T.w-(n-r)),T.y<r&&(P+=r-T.y),T.y+T.h>s-r&&(P-=T.y+T.h-(s-r));let L=g(v,A,P);for(let J of o.concat(c))h(L,J)&&(P=J.y+J.h+l*.9,P+l*.3>s-r&&(P=J.y-l*.4),L=g(v,A,P));x={side:v,x:A,y:P,box:L}}return c.push(x.box),x})}var Ns=class{constructor(t,e){this.stage=t,this.tempo=e.tempo*1e3,this.reps=e.reps||10,this.leadMs=e.leadMs||(()=>0),this.onCount=e.onCount||(()=>{}),this.onCancel=e.onCancel||(()=>{}),this.onRep=e.onRep||(()=>{}),this.log=[]}start(t){this.t0=t,this.next=1,this.scheduled=0,this.paused=null,this.done=!1}boundary(t){return this.t0+(t-1)*this.tempo}tick(t){if(this.done||this.paused!=null)return;let e=this.next;if(e<=this.reps&&this.scheduled<e){let n=this.boundary(e)-this.leadMs(e);t>=n-34&&(this.scheduled=e,this.onCount(e,Math.max(n,t)),this.log.push({r:e,countStart:Math.max(n,t),lead:this.leadMs(e),boundary:this.boundary(e)}))}e<=this.reps&&t>=this.boundary(e)&&(this.stage.rep(e,this.boundary(e)),this.onRep(e,this.boundary(e)),this.next=e+1),this.next>this.reps&&t>=this.boundary(this.reps)+this.tempo&&(this.done=!0)}pause(t){this.paused==null&&(this.paused=t,this.stage.pause(!0))}resume(t){if(this.paused!=null){let e=t-this.paused;this.t0+=e,this.paused=null,this.stage.pause(!1)}}switchSides(t,e){if(this.scheduled>=this.next){this.scheduled=this.next-1;let n=this.log.findIndex(s=>s.r===this.next);n>=0&&this.log.splice(n,1),this.onCancel(this.next)}this.t0=t+e-(this.next-1)*this.tempo}};function Ao(i,t=.02){let e=i.getChannelData(0),n=i.sampleRate;for(let s=0;s<e.length;s++)if(Math.abs(e[s])>t)return s/n*1e3;return 0}var Oc=wc(window);window.GGFigure3D={create:Dc,RepClock:Ns,leadIn:Ao,drawForms:Nc,layoutForms:wo,define:Oc.define,patterns:()=>Object.keys(hi),errors:Oc.errors,BASES:Ps,MUSCLES:Ds,CONTACTS:So,version:"897.1"};window.GGRepClock={RepClock:Ns,leadIn:Ao};})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

/* p0.js */
try{
// BLD 897 v3d patterns p0: the six round 4 reference moves (Bird Dog, Weighted Glute Bridge, Bodyweight Squat, Leg
// Swings, Push-Up, Standing Reach). Plain data in the shape patterns/FORMAT.md describes. Owner: ENG.
var GG3D = window.GG3D = window.GG3D || {q: [], define: function(i, d){ this.q.push([i, d]); }};
(function(G){
var FLAT = 'flat';
G.define('bird-dog', {name: 'Bird Dog', tempo: 3, alt: true, top: [1, 3], rest: .04, hold: .22, base: 'fours',
  glow: {back: [1, 1], glutes: [1, 1], abs: [.4, .4], obliques: [.5, .5]}, sideGlow: 'glutes', cam: {yaw: 30, el: 30, zoom: 1.06},
  form: [{when: 'hold', line: ['hand*', 'foot*'], ext: .06, say: 'hips level, reach long', at: 'root', side: -1}],
  k: [
    {br: 'out', e: .2, gl: [0, 0]},
    {br: 'in', on: 'hL kR', n: 100, ra: [93, 94, 96], ll: [-86, -88, -96], hR: 'relax', pnR: 'in', e: 1, gl: [1, 0]},
    {br: 'out', e: .2, gl: [0, 0]},
    {br: 'in', on: 'hR kL', n: 100, la: [93, 94, 96], rl: [-86, -88, -96], hL: 'relax', pnL: 'in', e: 1, gl: [0, 1]}
  ]});
// The bridge stays a plain side view at a calm distance; its glow is kept modest.
G.define('weighted-bridge', {name: 'Weighted Glute Bridge', tempo: 3, top: [1], glow: {glutes: [.8, .8], hams: [.65, .65]}, cam: {yaw: 6, el: 12, zoom: 1}, halo: .7,
  props: ['mat', {id: 'dumbbell', at: 'hip'}],
  form: [{when: 'hold', line: ['lowerleg01.R', 'upperarm01.R'], say: 'knees to shoulders in one line', at: 'root', side: -1}],
  k: [
    {br: 'out', on: 'fR fL', p: [.1, 0], t: [-88, -90], n: -92, an: ['upperarm01.R', .1, -.42], ra: {db: [.07, .032, -.062], pole: [1, -.3, 0], f: 92}, la: {db: [.07, .032, -.062], pole: [1, -.3, 0], f: 92}, hR: 'grip', hL: 'grip', pnR: 'down', pnL: 'down',
      rl: {x: .12, y: .075, z: .36, pole: [0, 1, .4], f: 74}, ll: {x: .12, y: .075, z: .36, pole: [0, 1, .4], f: 74}, e: .25},
    {br: 'in', on: 'fR fL', p: [.1, 0], t: [-62, -70], n: -90, an: ['upperarm01.R', .1, -.42], ra: {db: [.07, .032, -.062], pole: [1, -.3, 0], f: 92}, la: {db: [.07, .032, -.062], pole: [1, -.3, 0], f: 92}, hR: 'grip', hL: 'grip', pnR: 'down', pnL: 'down',
      rl: {x: .12, y: .075, z: .36, pole: [0, 1, .4], f: 74}, ll: {x: .12, y: .075, z: .36, pole: [0, 1, .4], f: 74}, e: 1}
  ]});
G.define('squat', {name: 'Bodyweight Squat', tempo: 3, base: 'stand', glow: {quads: [1, 1], glutes: [.75, .75]}, cam: {yaw: 34, el: 8, zoom: 1},
  form: [{when: [.3, .7], plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'knees over toes', at: 'lowerleg01.R', side: 1},
    {when: [.3, .7], line: ['root', 'spine01'], say: 'chest tall', at: 'spine01', side: -1}],
  k: [
    {br: 'in', p: [.925, -.062], t: [181, 180], n: 182, ra: [6, 10], la: [6, 10], rl: {x: .14, y: .072, z: .02, f: 72}, ll: {x: .14, y: .072, z: .02, f: 72}, e: .2, lo: 6},
    {br: 'out', p: [.53, -.27], t: [138, 132], n: 150, ra: [92, 94], la: [92, 94], rl: {x: .14, y: .072, z: .02, f: 72, pole: [.35, 0, 1]}, ll: {x: .14, y: .072, z: .02, f: 72, pole: [.35, 0, 1]}, pnR: 'down', pnL: 'down', e: 1, lo: 10, ao: 12}
  ]});
G.define('leg-swing', {name: 'Leg Swings', tempo: 2, e: 'sine', rest: .02, glow: {flexors: [0, 1], hams: [0, 1]}, cam: {yaw: 14, el: 5, zoom: 1.02},
  props: ['wall'],
  form: [{when: 'always', plumb: ['head', 'foot.L'], say: 'stand tall', at: 'spine01', side: 1}],
  k: [
    {br: 'in', on: 'fL hL', p: [.93, -.062], t: [178, 180], n: 180, la: {x: .5, y: 1.18, z: .06, pole: [0, -1, -.4], f: 150}, ra: [-26, -14], rl: [62, 30], ll: {x: .1, y: .072, z: .0, f: 72}, hR: 'relax', hL: 'flat', pnR: 'in', pnL: 'wall', e: .9, lo: 2},
    {br: 'out', on: 'fL hL', p: [.93, -.03], t: [176, 179], n: 180, la: {x: .5, y: 1.18, z: .06, pole: [0, -1, -.4], f: 150}, ra: [22, 30], rl: [-34, -48], ll: {x: .1, y: .072, z: .0, f: 72}, hR: 'relax', hL: 'flat', pnR: 'in', pnL: 'wall', e: .9, lo: 2}
  ]});
G.define('push-up', {name: 'Push-Up', tempo: 3, dur: [2, 1], rest: .03, base: 'plank', glow: {chest: [1, 1], delts: [.7, .7], triceps: [.85, .85], abs: [.3, .3]}, cam: {yaw: 26, el: 14, zoom: 1.04},
  form: [{when: 'always', line: ['foot.R', 'upperarm01.R'], ext: .12, say: 'one long line', at: 'root', side: -1}],
  k: [
    {br: 'in', e: .3},
    {br: 'out', reach: null, t: [97, 97], n: 95, ra: {dx: .1, y: .055, z: .4, pole: [.6, 0, -1], f: FLAT}, la: {dx: .1, y: .055, z: .4, pole: [.6, 0, -1], f: FLAT},
      rl: [-83, -83, 8, 55], ll: [-83, -83, 8, 55], e: 1}
  ]});
// A held stretch (Stretch, Yoga): the pose holds while the breath leads, four counts in and six out.
G.define('reach-hold', {name: 'Standing Reach', tempo: 10, bp: [4, 6], base: 'stand', glow: {lats: [.6, .6], obliques: [.4, .4]}, cam: {yaw: 30, el: 6, zoom: 1},
  form: [{when: 'in out', plumb: ['head', 'foot.L'], say: 'shoulders soft', at: 'neck01', side: 1}],
  k: [
    {br: 'in', t: [180, 181], n: 182, ra: [172, 174], la: [172, 174], e: .8, ao: 14},
    {br: 'out', t: [180, 181], n: 182, ra: [172, 174], la: [172, 174], e: .8, ao: 14}
  ]});
})(window.GG3D);

}catch(e){(window.GG3D_LOADERR=window.GG3D_LOADERR||[]).push("p0.js"+': '+e.message);}
/* p1.js */
try{
// =====================================================================
// GROUNDED FIELD GUIDE (TM): 3D patterns, group PAT1: standing strength and cardio (GWG BLD 897).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// Plain data in the shape patterns/FORMAT.md describes: GG3D.define(id, {...}). Angles: 0 points down, 90 forward,
// 180 up, minus 90 back. Meters for the 1.73 m figure (scaled to each body). Side view faces +z. Owner: PAT1.
// Form first: neutral spine (pelvis and chest angles kept together), knees over the toes, heels down, soft joints,
// breath in on the lowering or opening and out on the effort, and a short gold form guide at the key moment.
// =====================================================================
var GG3D = window.GG3D = window.GG3D || {q: [], define: function(i, d){ this.q.push([i, d]); }};
(function(G){
// A planted foot: x out from the middle (mirrored per side), z forward, f the foot's angle (72 rests flat).
function foot(x, z, more){ var o = {x: x, y: .072, z: z, f: 72}; for (var k in more) o[k] = more[k]; return o; }
// Knees track out over the toes.
var KNEE = [.35, 0, 1];

// ---- Squats ----------------------------------------------------------
G.define('squat', {name: 'Bodyweight Squat', tempo: 3, base: 'stand', glow: {quads: [1, 1], glutes: [.75, .75]}, cam: {yaw: 34, el: 8, zoom: 1},
  form: [{when: [.3, .7], plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'knees over toes', at: 'lowerleg01.R', side: 1},
    {when: [.3, .7], line: ['root', 'spine01'], say: 'chest tall', at: 'spine01', side: -1}],
  k: [
    {br: 'in', p: [.925, -.062], t: [181, 180], n: 182, ra: [6, 10], la: [6, 10], rl: foot(.14, .02), ll: foot(.14, .02), e: .2, lo: 6},
    {br: 'out', p: [.53, -.27], t: [136, 138], n: 152, ra: [92, 94], la: [92, 94], rl: foot(.14, .02, {pole: KNEE}), ll: foot(.14, .02, {pole: KNEE}), pnR: 'down', pnL: 'down', e: 1, lo: 10, ao: 12}
  ]});

// One dumbbell held upright at the chest, elbows under it; the weight in front lets the chest stay taller.
G.define('goblet-squat', {name: 'Goblet Squat', tempo: 3, base: 'stand', glow: {quads: [1, 1], glutes: [.8, .8], abs: [.3, .3]}, cam: {yaw: 34, el: 8, zoom: 1},
  props: [{id: 'dumbbell', at: 'hands'}],
  form: [{when: [.3, .7], plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'knees over toes', at: 'lowerleg01.R', side: 1},
    {when: [.3, .7], line: ['root', 'neck01'], say: 'chest proud', at: 'spine01', side: -1}],
  k: [
    {br: 'in', p: [.925, -.062], t: [181, 181], n: 182, ra: [8, 116], la: [8, 116], rl: foot(.15, .02, {f: 70}), ll: foot(.15, .02, {f: 70}), hR: 'grip', hL: 'grip', pnR: 'up', pnL: 'up', e: .2, lo: 7, ao: 3},
    {br: 'out', p: [.49, -.21], t: [148, 150], n: 162, ra: [28, 132], la: [28, 132], rl: foot(.15, .02, {f: 70, pole: [.4, 0, 1]}), ll: foot(.15, .02, {f: 70, pole: [.4, 0, 1]}), hR: 'grip', hL: 'grip', pnR: 'up', pnL: 'up', e: 1, lo: 11, ao: 3}
  ]});

// Sit back to a light touch on the bench (or a chair), then stand tall through the whole foot.
G.define('bench-squat', {name: 'Squat to Bench', tempo: 3, base: 'stand', glow: {quads: [1, 1], glutes: [.85, .85]}, cam: {yaw: 30, el: 8, zoom: 1},
  props: [{id: 'bench', z: -.8}],
  form: [{when: [.35, .65], plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'knees over toes', at: 'lowerleg01.R', side: 1},
    {when: [.35, .65], line: ['root', 'neck01'], say: 'long back', at: 'spine01', side: -1}],
  k: [
    {br: 'in', p: [.925, -.062], t: [181, 180], n: 182, ra: [6, 10], la: [6, 10], rl: foot(.14, .04), ll: foot(.14, .04), e: .2, lo: 6},
    {br: 'out', p: [.56, -.3], t: [138, 140], n: 154, ra: [86, 90], la: [86, 90], rl: foot(.14, .04, {pole: KNEE}), ll: foot(.14, .04, {pole: KNEE}), pnR: 'down', pnL: 'down', e: 1, lo: 10, ao: 10}
  ]});

// ---- Lunges ----------------------------------------------------------
// Split squat: right foot forward, left foot back on its toes. The hips drop straight down, the chest stays tall.
G.define('lunge', {name: 'Split Squat', tempo: 3, base: 'stand', glow: {quads: [.55, 1], glutes: [.5, 1], hams: [.2, .4]}, cam: {yaw: 12, el: 6, zoom: 1},
  form: [{when: [.3, .7], plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'front knee over ankle', at: 'lowerleg01.R', side: -1},
    {when: [.3, .7], plumb: ['neck01', 'root'], say: 'tall and steady', at: 'spine01', side: -1}],
  k: [
    {br: 'in', p: [.8, -.15], t: [178, 180], n: 181, ra: [4, 6], la: [4, 6], rl: foot(.11, .32), ll: {x: .11, y: .13, z: -.5, f: 38, toe: 90}, e: .25, lo: 3},
    {br: 'out', p: [.52, -.15], t: [176, 179], n: 180, ra: [6, 8], la: [6, 8], rl: foot(.11, .32, {pole: [.15, 0, 1]}), ll: {x: .11, y: .13, z: -.5, f: 38, toe: 90}, e: 1, lo: 3}
  ]});

// Reverse lunge: step back with the left foot, lower the back knee toward the floor, step forward to stand.
G.define('reverse-lunge', {name: 'Reverse Lunge', tempo: 3.4, base: 'stand', glow: {quads: [.5, 1], glutes: [.5, 1], hams: [.2, .4]}, cam: {yaw: 14, el: 6, zoom: 1},
  form: [{when: [.42, .58], plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'front knee over ankle', at: 'lowerleg01.R', side: -1},
    {when: [.42, .58], line: ['root', 'neck01'], say: 'chest tall', at: 'spine01', side: -1}],
  k: [
    {br: 'in', on: 'fR', p: [.925, -.062], t: [181, 180], n: 182, ra: [4, 8], la: [4, 8], rl: foot(.11, .02), ll: foot(.11, .02, {toe: 88}), lift: .08, e: .2},
    {br: 'out', on: 'fR', p: [.52, -.46], t: [172, 175], n: 178, ra: [8, 10], la: [8, 10], rl: foot(.11, .02, {pole: [.15, 0, 1]}), ll: {x: .11, y: .15, z: -.84, f: 42, toe: 92}, lift: .08, e: 1}
  ]});

// ---- Hinges ----------------------------------------------------------
// Romanian deadlift: soft knees, the hips travel back, the back stays long, the dumbbells slide down the thighs.
G.define('hinge', {name: 'Romanian Deadlift', tempo: 3, base: 'stand', glow: {hams: [1, 1], glutes: [.85, .85], back: [.35, .35]}, cam: {yaw: 6, el: 6, zoom: 1},
  props: ['dumbbells'],
  form: [{when: [.3, .7], line: ['root', 'neck01'], ext: .1, say: 'long, flat back', at: 'spine01', side: 1},
    {when: [.3, .7], plumb: ['wrist.R', 'foot.R'], say: 'weights close to the legs', at: 'wrist.R', side: -1}],
  k: [
    {br: 'in', p: [.925, -.062], t: [181, 181], n: 182, ra: [7, 7], la: [7, 7], rl: foot(.12, .02), ll: foot(.12, .02), hR: 'grip', hL: 'grip', pnR: 'back', pnL: 'back', e: .2, ao: 4},
    {br: 'out', p: [.89, -.25], t: [112, 112], n: 118, ra: [-2, -2], la: [-2, -2], rl: foot(.12, .02), ll: foot(.12, .02), hR: 'grip', hL: 'grip', pnR: 'back', pnL: 'back', e: 1, ao: 4}
  ]});

// Single-leg Romanian deadlift: stand on the right leg, soft knee; the left leg reaches back in one line with the
// back; the dumbbell hangs from the left hand. Hips stay square.
G.define('sl-hinge', {name: 'Single-Leg Romanian Deadlift', tempo: 3.4, base: 'stand', glow: {hams: [.3, 1], glutes: [.5, 1], back: [.3, .3]}, cam: {yaw: 8, el: 6, zoom: 1},
  props: [{id: 'dumbbell', at: 'L'}],
  form: [{when: [.3, .7], line: ['head', 'foot.L'], say: 'one long line', at: 'root', side: 1},
    {when: [.3, .7], plumb: ['root', 'foot.R'], say: 'hips square', at: 'lowerleg01.R', side: -1}],
  k: [
    {br: 'in', on: 'fR', p: [.925, -.06], t: [181, 181], n: 182, ra: [6, 8], la: [6, 6], rl: foot(.1, .0), ll: [-8, -34, 20], hL: 'grip', pnL: 'back', e: .25, ao: 5},
    {br: 'out', on: 'fR', p: [.88, -.21], t: [98, 98], n: 104, ra: [0, 0], la: [-2, -2], rl: foot(.1, .0), ll: [-82, -82, 4], hL: 'grip', pnL: 'back', e: 1, ao: 5}
  ]});

// Dowel hip hinge: the dowel touches the head, the upper back, and the tailbone all the way down and up.
G.define('dowel-hinge', {name: 'Dowel Hip Hinge', tempo: 3.2, base: 'stand', glow: {hams: [.9, .9], glutes: [.8, .8], back: [.4, .4]}, cam: {yaw: 4, el: 6, zoom: 1},
  props: [{id: 'dowel', at: 'hands'}],
  form: [{when: [.3, .7], line: ['head', 'root'], ext: .08, say: 'head, back, tailbone touch', at: 'root', side: -1}],
  k: [
    {br: 'in', p: [.925, -.062], t: [181, 181], n: 181, ra: {rel: [.03, .6, -.05], pole: [1, .7, -.3]}, la: {rel: [.03, .1, -.07], pole: [1, -.3, -.7]}, rl: foot(.12, .02), ll: foot(.12, .02), hR: 'grip', hL: 'grip', pnR: 'back', e: .2},
    {br: 'out', p: [.89, -.25], t: [114, 114], n: 114, ra: {rel: [.03, .6, -.05], pole: [1, .7, -.3]}, la: {rel: [.03, .1, -.07], pole: [1, -.3, -.7]}, rl: foot(.12, .02), ll: foot(.12, .02), hR: 'grip', hL: 'grip', pnR: 'back', e: 1}
  ]});

// Swing: hike the bell back between the legs in a hinge, then snap the hips forward to stand tall; the arms stay
// long and the bell floats to chest height. Out on the snap.
G.define('swing', {name: 'Kettlebell Swing', tempo: 2, base: 'stand', glow: {glutes: [1, 1], hams: [.8, .8], back: [.3, .3]}, cam: {yaw: 6, el: 6, zoom: 1},
  props: [{id: 'kettlebell', at: 'hands'}],
  form: [{when: [.38, .62], line: ['root', 'neck01'], ext: .1, say: 'flat back, hips back', at: 'spine01', side: 1},
    {when: [.9, 1], plumb: ['head', 'foot.R'], say: 'stand tall, arms float', at: 'neck01', side: 1}],
  k: [
    {br: 'in', p: [.925, -.06], t: [181, 181], n: 182, ra: [80, 82, 84], la: [80, 82, 84], raO: -9, laO: -9, rl: foot(.17, .02), ll: foot(.17, .02), hR: 'grip', hL: 'grip', pnR: 'back', pnL: 'back', e: .6, lo: 8},
    {br: 'out', p: [.84, -.27], t: [110, 110], n: 116, ra: [-18, -18, -18], la: [-18, -18, -18], raO: -8, laO: -8, rl: foot(.17, .02, {pole: KNEE}), ll: foot(.17, .02, {pole: KNEE}), hR: 'grip', hL: 'grip', pnR: 'back', pnL: 'back', e: .4, lo: 9}
  ]});

// ---- Feet and stairs -------------------------------------------------
// Heel raise with a light hold on the back of a chair: rise onto the balls of the feet, pause, lower slowly.
G.define('calf-raise', {name: 'Heel Raises', tempo: 3, base: 'stand', top: [1], glow: {calves: [1, 1]}, cam: {yaw: 10, el: 4, zoom: 1},
  props: [{id: 'wall', at: 'left'}],
  form: [{when: 'hold', plumb: ['head', 'toe1-1.R'], say: 'tall, over the big toes', at: 'neck01', side: 1}],
  k: [
    {br: 'out', on: 'fR fL hL', p: [.925, -.062], t: [181, 181], n: 182, ra: [4, 10], la: {x: .5, y: 1.2, z: .06, pole: [0, -1, -.4], f: 150}, rl: foot(.11, .02, {toe: 88}), ll: foot(.11, .02, {toe: 88}), hR: 'relax', hL: 'flat', pnR: 'in', pnL: 'wall', lift: 0, e: .2},
    {br: 'in', on: 'tR tL hL', p: [1.006, -.006], t: [181, 181], n: 182, ra: [4, 10], la: {x: .5, y: 1.2, z: .06, pole: [0, -1, -.4], f: 150}, rl: {x: .11, y: .153, z: .076, f: 35, toe: 90}, ll: {x: .11, y: .153, z: .076, f: 35, toe: 90}, hR: 'relax', hL: 'flat', pnR: 'in', pnL: 'wall', lift: 0, e: 1}
  ]});

// Step-up: the whole right foot on a low step, press through that heel to stand tall on the step, then step down
// slowly with the left foot. Out on the way up.
G.define('step-up', {name: 'Step-Up', tempo: 3.4, base: 'stand', glow: {quads: [.4, 1], glutes: [.4, 1]}, cam: {yaw: 10, el: 6, zoom: 1},
  props: ['step'],
  form: [{when: [.02, .2], plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'press through the whole foot', at: 'lowerleg01.R', side: 1},
    {when: [.45, .6], plumb: ['head', 'foot.R'], say: 'stand tall', at: 'neck01', side: -1}],
  k: [
    {br: 'out', on: 'fR', p: [.88, .12], t: [172, 175], n: 178, ra: [10, 14], la: [-6, 4], rl: {x: .11, y: .272, z: .33, f: 72, pole: [.2, 0, 1]}, ll: foot(.11, -.02), lift: .12, e: .5},
    {br: 'in', on: 'fR', p: [1.125, .25], t: [181, 181], n: 182, ra: [4, 8], la: [4, 8], rl: {x: .11, y: .272, z: .33, f: 72}, ll: {x: .11, y: .272, z: .33, f: 72}, lift: .12, e: 1}
  ]});

// ---- Presses and arms ------------------------------------------------
// Hands placed from the pelvis (rel), so the rack and the lockout ride with the body through a squat or a dip.
var RACK = {rel: [.24, .47, .15], pole: [1, -1, .25], f: 180}, LOCK = {rel: [.16, .925, .07], pole: [1, 0, -.2], f: 180};
// Overhead press: dumbbells at the shoulders, press straight up until the arms are long beside the ears, ribs down.
G.define('press', {name: 'Dumbbell Shoulder Press', tempo: 3, base: 'stand', dur: [1, 1.5], glow: {delts: [1, 1], triceps: [.7, .7], upper: [.4, .4]}, cam: {view: 'three', turn: 22, el: 6, zoom: 1},
  props: ['dumbbells'],
  form: [{when: [.3, .55], plumb: ['wrist.R', 'upperarm01.R'], say: 'wrists over shoulders', at: 'wrist.R', side: -1},
    {when: 'always', plumb: ['neck01', 'root'], say: 'ribs down, tall', at: 'spine02', side: 1}],
  k: [
    {br: 'out', p: [.925, -.062], t: [181, 181], n: 182, ra: RACK, la: RACK, hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: .3},
    {br: 'in', p: [.925, -.062], t: [181, 181], n: 182, ra: LOCK, la: LOCK, hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: 1}
  ]});

// Push press: a small dip of the knees with the chest tall and heels down, then drive up and press.
G.define('push-press', {name: 'Dumbbell Push Press', tempo: 2.6, base: 'stand', dur: [.8, .9, 1.5], glow: {delts: [1, 1], triceps: [.7, .7], quads: [.6, .6], glutes: [.5, .5]}, cam: {view: 'three', turn: 22, el: 6, zoom: 1},
  props: ['dumbbells'],
  form: [{when: [.12, .32], plumb: ['lowerleg01.R', 'foot.R'], say: 'heels down, chest tall', at: 'lowerleg01.R', side: 1},
    {when: [.45, .6], plumb: ['wrist.R', 'upperarm01.R'], say: 'wrists over shoulders', at: 'wrist.R', side: -1}],
  k: [
    {br: 'in', p: [.925, -.062], t: [181, 181], n: 182, ra: RACK, la: RACK, rl: foot(.13, .02), ll: foot(.13, .02), hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: .3, lo: 6},
    {br: 'out', p: [.85, -.09], t: [179, 180], n: 181, ra: RACK, la: RACK, rl: foot(.13, .02, {pole: KNEE}), ll: foot(.13, .02, {pole: KNEE}), hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: .7, lo: 7},
    {br: 'in', p: [.925, -.062], t: [181, 181], n: 182, ra: LOCK, la: LOCK, rl: foot(.13, .02), ll: foot(.13, .02), hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: 1, lo: 6}
  ]});

// Squat to press: squat with the dumbbells at the shoulders, stand up strong and let the drive carry them
// overhead, then lower them to the shoulders as the next squat begins.
G.define('squat-press', {name: 'Squat to Press', tempo: 3.4, base: 'stand', dur: [1.1, 1], glow: {quads: [1, 1], glutes: [.8, .8], delts: [.9, .9], triceps: [.6, .6]}, cam: {view: 'three', turn: 8, el: 6, zoom: 1},
  props: ['dumbbells'],
  form: [{when: [.02, .12], plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'knees over toes', at: 'lowerleg01.R', side: 1},
    {when: [.5, .6], plumb: ['wrist.L', 'upperarm01.L'], say: 'stack the weights', at: 'wrist.L', side: 1}],
  k: [
    {br: 'out', p: [.52, -.22], t: [146, 148], n: 160, ra: RACK, la: RACK, rl: foot(.14, .02, {pole: KNEE}), ll: foot(.14, .02, {pole: KNEE}), hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: .8, lo: 11},
    {br: 'in', p: [.925, -.062], t: [181, 181], n: 182, ra: LOCK, la: LOCK, rl: foot(.14, .02), ll: foot(.14, .02), hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: 1, lo: 7}
  ]});

// Hammer curl: palms face each other, elbows stay by the sides, curl up, lower slowly.
G.define('curl', {name: 'Hammer Curls', tempo: 3, base: 'stand', dur: [1, 1.5], glow: {biceps: [1, 1], forearms: [.7, .7]}, cam: {view: 'three', turn: -8, el: 6, zoom: 1.05},
  props: ['dumbbells'],
  form: [{when: [.25, .6], plumb: ['upperarm01.R', 'lowerarm01.R'], tick: 'lowerarm01.R', say: 'elbows by your sides', at: 'lowerarm01.R', side: 1}],
  k: [
    {br: 'out', ra: [2, 3, 3], la: [2, 3, 3], hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', e: .2, ao: 7},
    {br: 'in', ra: [9, 146, 150], la: [9, 146, 150], hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', e: 1, ao: 7}
  ]});

// Overhead triceps extension: one dumbbell overhead in both hands; the elbows point up while the weight lowers
// behind the head, then press it back up.
G.define('triceps', {name: 'Overhead Triceps Extension', tempo: 3, base: 'stand', glow: {triceps: [1, 1], abs: [.2, .2]}, cam: {view: 'three', turn: -6, el: 8, zoom: 1.05},
  props: [{id: 'dumbbell', at: 'hands'}],
  form: [{when: [.3, .7], line: ['lowerarm01.R', 'upperarm01.R'], ext: .12, say: 'elbows point up', at: 'lowerarm01.R', side: 1},
    {when: 'always', plumb: ['neck01', 'root'], say: 'ribs down', at: 'spine02', side: -1}],
  k: [
    {br: 'in', ra: {x: .05, y: 1.81, z: .07, pole: [.4, .2, 1], f: 180}, la: {x: .05, y: 1.81, z: .07, pole: [.4, .2, 1], f: 180}, hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', e: .3},
    {br: 'out', ra: {x: .05, y: 1.52, z: -.15, pole: [.25, 1, .5], f: 320}, la: {x: .05, y: 1.52, z: -.15, pole: [.25, 1, .5], f: 320}, hR: 'grip', hL: 'grip', e: 1}
  ]});

// ---- Walking and carries ---------------------------------------------
// A walking stride in place (the floor runs under the feet): heel strike with the toes up, roll through, push off
// the ball of the foot; opposite arm and leg swing together. Eight steps a loop: breathe in for four, out for four.
// o.arms(side, fwd) gives the arms for a step (fwd: which leg leads); o.t the torso; o.down the drop at each strike.
function gait(o){
  var keys = [], lead = ['R', 'L'];
  for (var i = 0; i < 16; i++){
    var st = i % 4, s = lead[(st >> 1) & 1], f = s === 'R' ? 'rl' : 'll', b = s === 'R' ? 'll' : 'rl', k = {br: i < 8 ? 'in' : 'out', via: true, on: '', t: o.t || [179, 180], n: 181};
    if (st % 2 === 0){ k.p = [.9 - (o.down || 0), -.062]; k[f] = [o.reach || 24, 4, 92]; k[b] = [-(o.reach || 24) * .75, -36, 44]; }
    else { k.p = [.926, -.062]; k[b] = [2, 0, 72]; k[f] = [22, -40, 54]; var tmp = f; f = b; b = tmp; }
    var a = o.arms(st, s); for (var q in a) k[q] = a[q];
    keys.push(k);
  }
  return keys;
}
// Arm swing: the arm opposite the leading leg swings forward.
function swing(amt, bend){ return function(st, s){ var w = st % 2 ? 0 : 1, fw = [16 * amt * w, (16 * amt + bend) * w + bend * (1 - w) * .6], bk = [-14 * amt * w, -4 * amt * w + bend * .4];
  return s === 'R' ? {la: fw, ra: bk, ao: 6} : {ra: fw, la: bk, ao: 6}; }; }
G.define('walk', {name: 'Walk', wrap: true, tempo: 4.8, base: 'stand', glow: {glutes: [.35, .35], calves: [.35, .35]}, cam: {view: 'side', turn: 12, el: 5, zoom: 1},
  form: [{when: 'always', plumb: ['head', 'root'], say: 'walk tall', at: 'neck01', side: -1}],
  k: gait({arms: swing(1, 14)})});

// Farmer carry: a dumbbell hangs in each hand, the shoulders stay down and back, walk tall.
G.define('carry', {name: 'Farmer Carry', wrap: true, tempo: 4.8, base: 'stand', glow: {forearms: [1, 1], upper: [.7, .7], abs: [.4, .4], glutes: [.3, .3]}, cam: {view: 'side', turn: 14, el: 5, zoom: 1},
  props: ['dumbbells'],
  form: [{when: 'always', plumb: ['head', 'root'], say: 'tall, shoulders down', at: 'neck01', side: -1}],
  k: gait({reach: 20, arms: function(){ return {ra: [1, 1, 1], la: [1, 1, 1], hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', ao: 11}; }})});

// Suitcase carry: one dumbbell in the right hand; the body stays upright and level, no lean.
G.define('suitcase', {name: 'Suitcase Carry', wrap: true, tempo: 4.8, base: 'stand', glow: {obliques: [.4, 0], forearms: [0, .8], upper: [0, .4]}, cam: {view: 'three', turn: 18, el: 6, zoom: 1},
  props: [{id: 'dumbbell', at: 'R'}],
  form: [{when: 'always', level: ['upperarm01.R', 'upperarm01.L'], say: 'shoulders level', at: 'upperarm01.L', side: 1}],
  k: gait({reach: 20, arms: function(st, s){ var w = st % 2 ? 0 : 1; return {ra: [1, 1, 1], la: s === 'R' ? [12 * w, 22 * w + 6] : [-10 * w, 4], hR: 'grip', pnR: 'in', ao: 10}; }})});

// One-arm overhead carry: the dumbbell pressed overhead, arm long beside the ear, ribs down, walk tall.
G.define('overhead-carry', {name: 'One-Arm Overhead Carry', wrap: true, tempo: 4.8, base: 'stand', glow: {delts: [.2, 1], triceps: [0, .6], obliques: [.3, .3]}, cam: {view: 'three', turn: 14, el: 6, zoom: 1},
  props: [{id: 'dumbbell', at: 'R'}],
  form: [{when: 'always', plumb: ['wrist.R', 'upperarm01.R'], say: 'arm by your ear', at: 'upperarm01.R', side: -1}],
  k: gait({reach: 20, arms: function(st, s){ var w = st % 2 ? 0 : 1; return {ra: {rel: [.16, .925, .03], pole: [1, 0, -.2], f: 180}, la: s === 'R' ? [12 * w, 22 * w + 6] : [-10 * w, 4], hR: 'grip', pnR: 'fwd', ao: 8}; }})});

// Heel to toe walk: each heel sets down right in front of the other foot's toes, arms out a little for balance.
// Slow, two steps a loop.
G.define('heel-toe', {name: 'Heel-to-Toe Walk', steps: 2, tempo: 3.6, base: 'stand', glow: {calves: [.5, .5], glutes: [.4, .4], abs: [.3, .3]}, cam: {view: 'three', turn: 4, el: 8, zoom: 1},
  form: [{when: [.05, .2], level: ['toe1-1.L', 'foot.R'], say: 'heel to toe', at: 'foot.R', side: 1}],
  k: [
    {br: 'in', on: '', p: [.915, -.03], t: [180, 181], n: 176, rl: {x: .05, y: .072, z: .13, f: 72}, ll: {x: .05, y: .072, z: -.13, f: 72}, ra: [8, 12], la: [8, 12], ao: 34},
    {br: 'in', via: true, on: '', p: [.925, .06], t: [180, 181], n: 176, rl: {x: .05, y: .072, z: .13, f: 72}, ll: {x: .06, y: .17, z: .1, f: 60}, ra: [8, 12], la: [8, 12], ao: 38},
    {br: 'out', on: '', p: [.915, -.03], t: [180, 181], n: 176, rl: {x: .05, y: .072, z: -.13, f: 72}, ll: {x: .05, y: .072, z: .13, f: 72}, ra: [8, 12], la: [8, 12], ao: 34},
    {br: 'out', via: true, on: '', p: [.925, .06], t: [180, 181], n: 176, ll: {x: .05, y: .072, z: .13, f: 72}, rl: {x: .06, y: .17, z: .1, f: 60}, ra: [8, 12], la: [8, 12], ao: 38}
  ]});

// ---- In place cardio -------------------------------------------------
// March in place: knee up toward hip height, the opposite arm swings forward, tall chest. One rep each side.
G.define('march', {name: 'March in Place', tempo: 1.2, alt: true, base: 'stand', glow: {flexors: [.8, .8], quads: [.3, .3], calves: [.3, .3]}, cam: {view: 'three', turn: -6, el: 6, zoom: 1},
  form: [{when: 'always', plumb: ['head', 'root'], say: 'tall chest', at: 'neck01', side: 1}],
  k: [
    {br: 'in', on: 'fR fL', p: [.93, -.062], ra: [-6, 14], la: [-6, 14], ao: 6},
    {br: 'in', on: 'fL', p: [.93, -.062], rl: [70, -6, 64], ra: [-22, 18], la: [28, 84], ao: 6, e: 1, gl: [0, 1]},
    {br: 'out', on: 'fR fL', p: [.93, -.062], ra: [-6, 14], la: [-6, 14], ao: 6},
    {br: 'out', on: 'fR', p: [.93, -.062], ll: [70, -6, 64], la: [-22, 18], ra: [28, 84], ao: 6, e: 1, gl: [1, 0]}
  ], sideGlow: 'flexors'});

// Knee drive: reach both arms up tall, then drive one knee up as the arms pull down to meet it. Out on the drive.
G.define('knee-drive', {name: 'Knee Drives', tempo: 1.4, alt: true, base: 'stand', glow: {flexors: [.8, .8], abs: [.6, .6], lats: [.3, .3]}, cam: {view: 'three', turn: -6, el: 6, zoom: 1},
  form: [{when: [.2, .4], plumb: ['head', 'foot.L'], say: 'tall standing leg', at: 'neck01', side: -1}],
  k: [
    {br: 'out', on: 'fR fL', p: [.93, -.062], t: [181, 182], n: 182, ra: [168, 172], la: [168, 172], ao: 12, hR: 'relax', hL: 'relax', e: .3},
    {br: 'in', on: 'fL', p: [.925, -.06], t: [174, 164], n: 160, rl: [98, 2, 70], ra: {x: .2, y: 1.06, z: .34, pole: [.3, -.2, -1]}, la: {x: .0, y: 1.08, z: .34, pole: [.3, -.2, -1]}, ao: 8, hR: 'relax', hL: 'relax', e: 1},
    {br: 'out', on: 'fR fL', p: [.93, -.062], t: [181, 182], n: 182, ra: [168, 172], la: [168, 172], ao: 12, hR: 'relax', hL: 'relax', e: .3},
    {br: 'in', on: 'fR', p: [.925, -.06], t: [174, 164], n: 160, ll: [98, 2, 70], la: {x: .2, y: 1.06, z: .34, pole: [.3, -.2, -1]}, ra: {x: .0, y: 1.08, z: .34, pole: [.3, -.2, -1]}, ao: 8, hR: 'relax', hL: 'relax', e: 1}
  ]});

// Fast feet: a low athletic stance (hips back, chest forward, knees soft), tiny quick steps on the balls of the
// feet. Eight steps a loop: in for four, out for four.
function feet(){
  var keys = [], up = {y: .17, f: 48}, dn = {y: .09, f: 58};
  for (var i = 0; i < 16; i++){
    var s = (i >> 1) & 1 ? 'll' : 'rl', o = s === 'rl' ? 'll' : 'rl', lift = i % 2 === 0;
    var k = {br: i < 8 ? 'in' : 'out', via: true, on: '', p: [.83, -.13], t: [160, 162], n: 168, ra: [lift === (s === 'rl') ? -14 : 18, 92], la: [lift === (s === 'rl') ? 18 : -14, 92], hR: 'fist', hL: 'fist', ao: 8, lo: 8};
    k[s] = {x: .15, y: lift ? up.y : dn.y, z: .03, f: lift ? up.f : dn.f, toe: 92, pole: [.3, 0, 1]};
    k[o] = {x: .15, y: dn.y, z: .03, f: dn.f, toe: 92, pole: [.3, 0, 1]};
    keys.push(k);
  }
  return keys;
}
G.define('run', {name: 'Fast Feet', wrap: true, tempo: 2, base: 'stand', glow: {calves: [.9, .9], quads: [.3, .3]}, cam: {view: 'three', turn: -4, el: 6, zoom: 1},
  form: [{when: 'always', line: ['root', 'neck01'], say: 'quick, light feet', at: 'spine01', side: 1}],
  k: feet()});

// Box step: forward with the right foot, then the left, back with the right, then the left, tracing a small square.
G.define('box-step', {name: 'Box Step', steps: 4, tempo: 3.2, base: 'stand', glow: {calves: [.5, .5], quads: [.25, .25]}, cam: {view: 'three', turn: 6, el: 10, zoom: 1},
  form: [{when: 'always', plumb: ['head', 'root'], say: 'light feet, tall chest', at: 'neck01', side: 1}],
  k: [
    {br: 'in', on: 'fR fL', p: [.905, -.07], ll: foot(.12, -.02), rl: foot(.12, -.02), ra: [-8, 10], la: [10, 26], ao: 6},
    {br: 'in', via: true, on: 'fL', p: [.915, .0], ll: foot(.12, -.02), rl: {x: .12, y: .15, z: .14, f: 66}, ra: [0, 14], la: [0, 14], ao: 6},
    {br: 'in', on: 'fR fL', p: [.905, .08], ll: foot(.12, -.02), rl: foot(.12, .28), ra: [10, 26], la: [-8, 10], ao: 6},
    {br: 'in', via: true, on: 'fR', p: [.915, .16], rl: foot(.12, .28), ll: {x: .12, y: .15, z: .14, f: 66}, ra: [0, 14], la: [0, 14], ao: 6},
    {br: 'out', on: 'fR fL', p: [.905, .2], rl: foot(.12, .28), ll: foot(.12, .28), ra: [-8, 10], la: [10, 26], ao: 6},
    {br: 'out', via: true, on: 'fL', p: [.915, .14], ll: foot(.12, .28), rl: {x: .12, y: .15, z: .12, f: 66}, ra: [0, 14], la: [0, 14], ao: 6},
    {br: 'out', on: 'fR fL', p: [.905, .06], ll: foot(.12, .28), rl: foot(.12, -.02), ra: [10, 26], la: [-8, 10], ao: 6},
    {br: 'out', via: true, on: 'fR', p: [.915, -.02], rl: foot(.12, -.02), ll: {x: .12, y: .15, z: .12, f: 66}, ra: [0, 14], la: [0, 14], ao: 6}
  ]});

// Shadow boxing: left foot forward in a staggered stance, fists by the cheeks; punch straight, turning from the
// hips, and return to guard. Out with each punch.
var GUARD = {x: .11, y: 1.5, z: .17, pole: [.6, -1, -.2], f: 120};
G.define('punch', {name: 'Shadow Boxing', tempo: 1, alt: true, base: 'stand', glow: {delts: [.6, .6], obliques: [.2, .2]}, cam: {view: 'three', turn: 10, el: 6, zoom: 1},
  form: [{when: [.12, .3], line: ['upperarm01.R', 'wrist.R'], say: 'turn from the hips', at: 'root', side: 1}],
  k: [
    {br: 'out', p: [.89, -.07], t: [178, 179], n: 178, rl: {x: .14, y: .1, z: -.2, f: 58, toe: 92}, ll: foot(.13, .2), ra: GUARD, la: GUARD, hR: 'fist', hL: 'fist', pnR: 'in', pnL: 'in', lo: 6, e: .3},
    {br: 'in', p: [.89, -.06], t: [178, 179], n: 178, yaw: 22, rl: {x: .14, y: .1, z: -.2, f: 58, toe: 92}, ll: foot(.13, .2), ra: {x: .02, y: 1.42, z: .68, pole: [.3, -1, 0], f: 90}, la: GUARD, hR: 'fist', hL: 'fist', pnR: 'down', pnL: 'in', lo: 6, e: 1, gl: [0, 1]},
    {br: 'out', p: [.89, -.07], t: [178, 179], n: 178, rl: {x: .14, y: .1, z: -.2, f: 58, toe: 92}, ll: foot(.13, .2), ra: GUARD, la: GUARD, hR: 'fist', hL: 'fist', pnR: 'in', pnL: 'in', lo: 6, e: .3},
    {br: 'in', p: [.89, -.05], t: [178, 179], n: 178, yaw: -14, rl: {x: .14, y: .1, z: -.2, f: 58, toe: 92}, ll: foot(.13, .2), la: {x: .1, y: 1.44, z: .7, pole: [.3, -1, 0], f: 90}, ra: GUARD, hR: 'fist', hL: 'fist', pnL: 'down', pnR: 'in', lo: 6, e: 1, gl: [1, 0]}
  ]});

// ---- Balance ---------------------------------------------------------
// Knee lift balance: stand tall on the left foot, the right knee lifted, hands resting on the hips; a slow,
// steady breath leads (in 4, out 6).
var HIPS = {rel: [.19, .07, .02], pole: [1, -.2, -.6], f: 0};
G.define('balance', {name: 'Single-Leg Balance', tempo: 10, bp: [4, 6], base: 'stand', glow: {glutes: [.7, .1], calves: [.6, 0]}, cam: {view: 'three', turn: 0, el: 6, zoom: 1},
  form: [{when: 'in out', plumb: ['head', 'foot.L'], say: 'tall and still', at: 'neck01', side: 1}],
  k: [
    {br: 'in', on: 'fL', p: [.925, -.062], px: .035, t: [180, 181], n: 180, ll: foot(.09, .0), rl: [72, -4, 62], ra: HIPS, la: HIPS, hR: 'flat', hL: 'flat', pnR: 'in', pnL: 'in', e: .7},
    {br: 'out', on: 'fL', p: [.925, -.062], px: .035, t: [180, 181], n: 180, ll: foot(.09, .0), rl: [74, -3, 62], ra: HIPS, la: HIPS, hR: 'flat', hL: 'flat', pnR: 'in', pnL: 'in', e: .7}
  ]});

// ---- Side to side (front views) --------------------------------------
// IK feet: x is out from the middle for that side, so a negative x places a foot across the midline. px moves
// the hips (+ toward the figure's left).
function step(x, z, y, f){ return {x: x, y: y || .072, z: z || 0, f: f || 72, pole: [.45, 0, 1]}; }
function lift(x, z){ return {x: x, y: .15, z: z || 0, f: 62, pole: [.45, 0, 1]}; }
var READY = {ra: [16, 84], la: [16, 84], hR: 'fist', hL: 'fist', ao: 14, pnR: 'in', pnL: 'in'};
function k(o){ var r = {}, q; for (q in READY) r[q] = READY[q]; for (q in o) r[q] = o[q]; return r; }

// Side lunge rock: feet wide, toes turned out a little; the hips shift and sit back over one bent knee, which tracks
// over the toes, the other leg long; then rock through the middle to the other side.
var SLR = {rel: [.05, .33, .3], pole: [1, -1, .2], f: 120};
G.define('side-lunge-rock', {name: 'Side Lunge Rock', tempo: 3.2, base: 'stand', mirror: true, top: [1], hold: .1, glow: {adductors: [.8, .8], quads: [.6, .6], glutes: [.6, .6]}, cam: {view: 'front', turn: -14, el: 8, zoom: 1},
  form: [{when: 'hold', plumb: ['knee*', 'foot*'], tick: 'foot*', say: 'knee over toes', at: 'knee*', side: -1},
    {when: 'hold', line: ['root', 'neck01'], say: 'chest proud', at: 'spine02', side: 1}],
  k: [
    {br: 'in', on: 'fR fL', p: [.865, -.07], px: 0, t: [178, 179], n: 180, rl: step(.42, .02), ll: step(.42, .02), ra: SLR, la: SLR, hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in', lo: 18, e: .3},
    {br: 'out', on: 'fR fL', p: [.73, -.14], px: -.2, t: [164, 168], n: 172, rl: {x: .42, y: .072, z: .02, f: 72, pole: [.7, 0, 1]}, ll: step(.42, .02), ra: SLR, la: SLR, hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in', lo: 18, e: 1}
  ]});

// Skater steps: land wide on one foot with a soft knee and the chest up, the other leg sweeping behind; the
// opposite hand reaches toward the front foot. Push off and land the other way.
G.define('skater', {name: 'Skater Steps', tempo: 1.3, base: 'stand', mirror: true, glow: {glutes: [.5, 1], quads: [.4, .9], adductors: [.3, .3]}, cam: {view: 'front', turn: -12, el: 8, zoom: 1},
  form: [{when: [.02, .18], plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'soft knee over toes', at: 'lowerleg01.R', side: -1}],
  k: [
    {br: 'out', on: 'fR', p: [.76, -.12], px: -.34, t: [148, 154], n: 162, rl: {x: .46, y: .072, z: 0, f: 72, toe: 88, pole: [.4, 0, 1]}, ll: {x: -.24, y: .135, z: -.36, f: 48, toe: 90, pole: [0, 0, 1]},
      la: [44, 52], laO: [-28, -20, -10], ra: [-34, -22], raO: 18, hR: 'relax', hL: 'reach', e: 1},
    {br: 'in', via: true, on: 'fR', p: [.82, -.09], px: -.08, t: [168, 170], n: 172, rl: {x: .46, y: .072, z: 0, f: 72, toe: 88, pole: [.4, 0, 1]}, ll: {x: .24, y: .15, z: -.04, f: 62, toe: 84, pole: [.45, 0, 1]},
      la: [10, 18], ra: [10, 18], ao: 12, hR: 'relax', hL: 'relax', e: .5}
  ]});

// Lateral shuffle: a quarter squat, feet low and quick: three steps to the right and three back. Chest up.
function shuffle(){
  // Stance centers out and back (two shuffle steps each way, the lead foot first, then the trail foot).
  var C = [0, -.2, -.4, -.2], ks = [], half = .25;
  for (var j = 0; j < 4; j++){
    var c = C[j], dir = j < 2 ? -1 : 1, nc = c + .2 * dir, lead = dir < 0 ? 'R' : 'L';
    var r0 = c - half, l0 = c + half, r1 = nc - half, l1 = nc + half;
    // lead foot up, lead foot down (wide), trail foot up, trail foot down.
    var S = lead === 'R' ? [[r1, l0, 'R'], [r1, l0, ''], [r1, l1, 'L'], [r1, l1, '']] : [[r0, l1, 'L'], [r0, l1, ''], [r1, l1, 'R'], [r1, l1, '']];
    var P = [c + .07 * dir, c + .11 * dir, nc - .04 * dir, nc];
    for (var i = 0; i < 4; i++){
      var q = S[i], fr = q[2] === 'R' ? lift(-q[0], .02) : step(-q[0], .02), fl = q[2] === 'L' ? lift(q[1], .02) : step(q[1], .02);
      fr.pole = fl.pole = [.5, 0, 1];
      ks.push(k({br: j < 2 ? 'in' : 'out', via: i % 2 === 0, on: q[2] === 'R' ? 'fL' : q[2] === 'L' ? 'fR' : 'fR fL', p: [.79, -.13], px: P[i] + .2, t: [158, 162], n: 170, rl: fr, ll: fl, e: .8}));
    }
  }
  // Start on a planted stance: rotate so key 0 has both feet down.
  return ks.slice(3).concat(ks.slice(0, 3));
}
G.define('shuffle', {name: 'Lateral Shuffle', steps: 8, tempo: 3.2, base: 'stand', glow: {quads: [.8, .8], glutes: [.7, .7], adductors: [.5, .5], calves: [.4, .4]}, cam: {view: 'front', turn: -10, el: 8, zoom: 1},
  form: [{when: 'always', line: ['root', 'neck01'], say: 'low and light', at: 'spine02', side: 1}],
  k: shuffle()});

// Grapevine: step to the side, cross the back foot behind, step to the side again, tap the feet together; then
// travel back the other way. Arms swing easy. Breathe in for the way out, out for the way back.
function vine(){
  // Planted stances: [right foot x, left foot x (world, + left), right z, left z]; one foot moves to each next stance.
  var S = [[-.1, .1, 0, 0], [-.42, .1, 0, 0], [-.42, -.24, 0, -.16], [-.72, -.24, 0, -.16], [-.72, -.52, 0, 0],
    [-.72, -.2, 0, 0], [-.38, -.2, -.16, 0], [-.38, .1, -.16, 0]];
  return S.map(function(q, i){
    var n = S[(i + 1) % S.length], movesR = n[0] !== q[0] || n[2] !== q[2];
    var sw = i % 2 ? 1 : -1;
    return {br: i < 4 ? 'in' : 'out', on: movesR ? 'fL' : 'fR', p: [.9, -.062 - (q[2] + q[3]) * .3], px: (q[0] + q[1]) / 2 + .31, t: [179, 180], n: 180,
      rl: {x: -(q[0] + .31), y: .072, z: q[2], f: 72, pole: [.4, 0, 1]}, ll: {x: q[1] + .31, y: .072, z: q[3], f: 72, pole: [.4, 0, 1]}, lift: .07,
      ra: [10 * sw, 14 + 6 * sw], la: [-10 * sw, 14 - 6 * sw], ao: 16, e: .6};
  });
}
G.define('grapevine', {name: 'Grapevine', steps: 8, own: true, tempo: 6.4, base: 'stand', glow: {adductors: [.6, .6], glutes: [.5, .5], calves: [.4, .4]}, cam: {view: 'front', turn: -8, el: 8, zoom: 1},
  form: [{when: 'always', plumb: ['head', 'root'], say: 'smooth and tall', at: 'neck01', side: 1}],
  k: vine()});

// In and out steps: feet together, step the right foot out wide, then the left; step the right in, then the left.
// Quick, light, and low, on the balls of the feet.
function inout(zr, zl){
  var X = [[.08, .08, ''], [.24, .08, 'R'], [.4, .08, ''], [.4, .24, 'L'], [.4, .4, ''], [.24, .4, 'R'], [.08, .4, ''], [.08, .24, 'L']];
  return X.map(function(q, i){
    var z = function(x){ return zr ? (x > .3 ? 0 : zr) : 0; };
    var fr = q[2] === 'R' ? {x: q[0], y: .13, z: z(q[0]), f: 54, toe: 92, pole: [.5, 0, 1]} : {x: q[0], y: .09, z: z(q[0]), f: 58, toe: 92, pole: [.5, 0, 1]};
    var fl = q[2] === 'L' ? {x: q[1], y: .13, z: z(q[1]), f: 54, toe: 92, pole: [.5, 0, 1]} : {x: q[1], y: .09, z: z(q[1]), f: 58, toe: 92, pole: [.5, 0, 1]};
    return k({br: i < 4 ? 'in' : 'out', via: i % 2 === 1, on: q[2] === 'R' ? 'tL' : q[2] === 'L' ? 'tR' : 'tR tL', p: [.83, -.11 + (zr && q[0] < .3 && q[1] < .3 ? zr * .8 : zr && (q[0] < .3 || q[1] < .3) ? zr * .4 : 0)],
      px: (q[1] - q[0]) / 2, t: [162, 165], n: 170, rl: fr, ll: fl, e: .8});
  });
}
G.define('in-out', {name: 'In and Out Steps', steps: 4, tempo: 2, base: 'stand', glow: {calves: [.8, .8], quads: [.6, .6], adductors: [.4, .4]}, cam: {view: 'front', turn: -10, el: 8, zoom: 1},
  form: [{when: 'always', line: ['root', 'neck01'], say: 'quick, light, low', at: 'spine02', side: 1}],
  k: inout(0)});

// Quick feet ladder: step in, in (forward into the next square), then out, out (back and wide), quick and light.
G.define('quick-feet', {name: 'Quick Feet Ladder', steps: 4, tempo: 1.8, base: 'stand', glow: {calves: [.9, .9], quads: [.5, .5]}, cam: {view: 'three', turn: 20, el: 12, zoom: 1},
  form: [{when: 'always', line: ['root', 'neck01'], say: 'quick, light feet', at: 'spine02', side: 1}],
  k: inout(.26)});

// ---- Turning and balance strength ------------------------------------
// Wood chop: feet wide, a light dumbbell in both hands high by the right shoulder; chop down and across to the
// outside of the left knee, turning from the ribs and hips with a long back, then lift back up.
G.define('wood-chop', {name: 'Wood Chop', tempo: 3, base: 'stand', glow: {obliques: [.55, .55], delts: [.35, .35], glutes: [.3, .3]}, cam: {view: 'front', turn: -24, el: 8, zoom: 1},
  props: [{id: 'dumbbell', at: 'hands'}],
  form: [{when: [.4, .6], line: ['root', 'neck01'], say: 'turn from ribs and hips', at: 'spine02', side: 1},
    {when: [.4, .6], plumb: ['knee*', 'foot*'], say: 'knees over toes', at: 'lowerleg01.L', side: 1}],
  k: [
    {br: 'out', p: [.9, -.062], t: [180, 179], n: 178, yaw: -15, tw: -13, rl: step(.2, .02), ll: step(.2, .02), ra: {x: .34, y: 1.58, z: .24, pole: [.3, -1, -.3]}, la: {x: -.28, y: 1.6, z: .24, pole: [.3, -1, -.3]},
      hR: 'grip', hL: 'grip', pnR: 'back', pnL: 'back', lo: 10, e: .3},
    {br: 'in', p: [.74, -.17], t: [148, 142], n: 142, yaw: 14, tw: 14, rl: step(.2, .02), ll: step(.2, .02), ra: {x: -.22, y: .74, z: .38, pole: [.3, -1, 0]}, la: {x: .28, y: .72, z: .38, pole: [.3, -1, 0]},
      hR: 'grip', hL: 'grip', pnR: 'back', pnL: 'back', lo: 10, e: 1}
  ]});

// Standing airplane: hinged on the right leg, the left leg long behind in line with the back, arms out like wings;
// turn the chest open to the left, then back to face the floor.
G.define('airplane', {name: 'Standing Airplane', tempo: 3.4, base: 'stand', top: [1], glow: {glutes: [.3, 1], obliques: [.5, .5], hams: [.2, .6], upper: [.4, .4]}, cam: {view: 'three', turn: 26, el: 14, zoom: 1},
  form: [{when: [.05, .3], line: ['head', 'foot.L'], say: 'one long line', at: 'root', side: 1},
    {when: 'hold', plumb: ['root', 'foot.R'], say: 'steady standing knee', at: 'lowerleg01.R', side: -1}],
  k: [
    {br: 'in', on: 'fR', p: [.87, -.2], t: [98, 98], n: 102, rl: foot(.1, 0, {pole: [.2, 0, 1]}), ll: [-82, -82, 4], ra: [0, 0, 0], la: [0, 0, 0], raO: [92, 104, 100], laO: [92, 104, 100], hR: 'reach', hL: 'reach', pnR: 'down', pnL: 'down', e: .5},
    {br: 'out', on: 'fR', p: [.87, -.2], t: [98, 98], n: 102, tw: 55, rl: foot(.1, 0, {pole: [.2, 0, 1]}), ll: [-82, -82, 4], ra: [0, 0, 0], la: [0, 0, 0], raO: [92, 104, 100], laO: [92, 104, 100], hR: 'reach', hL: 'reach', pnR: 'fwd', pnL: 'fwd', e: 1}
  ]});

// Hip circles: feet hip width, hands on the hips; draw slow, big circles with the hips while the head stays over
// the feet. Breathe in for the back half, out for the front half.
G.define('hip-circles', {name: 'Hip Circles', wrap: true, tempo: 4, base: 'stand', glow: {glutes: [.4, .4], obliques: [.25, .25]}, cam: {view: 'three', turn: 10, el: 16, zoom: 1},
  form: [{when: 'always', plumb: ['head', 'root'], say: 'head over the feet', at: 'neck01', side: -1}],
  k: [0, 1, 2, 3, 4, 5, 6, 7].map(function(i){
    var a = i * Math.PI / 4, c = Math.cos(a), sn = Math.sin(a);
    return {br: i < 4 ? 'in' : 'out', via: true, p: [.915, -.062 + .055 * sn], px: .065 * c, t: [180 - 8 * sn, 180 - 6 * sn], n: 180 - 4 * sn, lb: -7 * c,
      rl: foot(.13, .02), ll: foot(.13, .02), ra: HIPS, la: HIPS, hR: 'flat', hL: 'flat', pnR: 'in', pnL: 'in', e: .5};
  })});

// ---- Dedicated patterns so the body matches the words (BLD 897 follow up) ----
// Step jacks: step one foot out as the arms rise out to the sides and overhead, step in as they lower.
var JACK_UP = {ra: [0, 0, 0], la: [0, 0, 0], raO: [164, 170, 174], laO: [164, 170, 174], hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in'};
var JACK_DN = {ra: [3, 6, 6], la: [3, 6, 6], ao: 8, hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in'};
function mix(a, b){ var o = {}, q; for (q in a) o[q] = a[q]; for (q in b) o[q] = b[q]; return o; }
G.define('jacks', {name: 'Step Jacks', own: true, tempo: 1.6, base: 'stand', mirror: true, glow: {delts: [.7, .7], adductors: [.4, .4], calves: [.4, .4]}, cam: {view: 'front', turn: -14, el: 6, zoom: 1},
  form: [{when: [.15, .35], plumb: ['head', 'root'], say: 'tall, arms long', at: 'neck01', side: 1}],
  k: [
    mix(JACK_DN, {br: 'in', on: 'fL', p: [.925, -.062], rl: step(.1, .02), ll: step(.1, .02), lift: .06, e: .3}),
    mix(JACK_UP, {br: 'out', on: 'fL', p: [.91, -.062], px: -.06, rl: step(.36, .02), ll: step(.1, .02), lift: .06, e: 1})
  ]});

// Jumping jacks: a light hop out wide as the arms rise overhead, a soft landing, then hop back together.
G.define('jumping-jacks', {name: 'Jumping Jacks', own: true, tempo: 1.5, air: .05, base: 'stand', glow: {delts: [.7, .7], calves: [.8, .8], adductors: [.4, .4]}, cam: {view: 'front', turn: -14, el: 6, zoom: 1},
  form: [{when: [.45, .6], plumb: ['knee*', 'foot*'], say: 'land soft, knees bent', at: 'lowerleg01.R', side: -1}],
  k: [
    mix(JACK_DN, {hR: 'open', hL: 'open', br: 'in', on: 'tR tL', p: [.89, -.07], rl: {x: .1, y: .09, z: .02, f: 60, toe: 90, pole: [.4, 0, 1]}, ll: {x: .1, y: .09, z: .02, f: 60, toe: 90, pole: [.4, 0, 1]}, lift: 0, e: .4}),
    mix(JACK_DN, {hR: 'open', hL: 'open', br: 'in', via: true, on: '', p: [.88, -.07], rl: {x: .2, y: .13, z: .02, f: 52, toe: 84, pole: [.4, 0, 1]}, ll: {x: .2, y: .13, z: .02, f: 52, toe: 84, pole: [.4, 0, 1]}, raO: [80, 70, 80], laO: [80, 70, 80], ra: [0, 12, 12], la: [0, 12, 12], lift: 0, e: .7}),
    mix(JACK_UP, {hR: 'open', hL: 'open', br: 'out', on: 'tR tL', p: [.85, -.08], rl: {x: .34, y: .09, z: .02, f: 60, toe: 90, pole: [.45, 0, 1]}, ll: {x: .34, y: .09, z: .02, f: 60, toe: 90, pole: [.45, 0, 1]}, lift: 0, e: 1}),
    mix(JACK_DN, {hR: 'open', hL: 'open', br: 'out', via: true, on: '', p: [.88, -.07], rl: {x: .2, y: .13, z: .02, f: 52, toe: 84, pole: [.4, 0, 1]}, ll: {x: .2, y: .13, z: .02, f: 52, toe: 84, pole: [.4, 0, 1]}, raO: [80, 70, 80], laO: [80, 70, 80], ra: [0, 12, 12], la: [0, 12, 12], lift: 0, e: .7})
  ]});

// Wall sit: back flat on the wall, knees over the ankles, thighs near level; a slow breath leads the hold.
G.define('wall-sit', {name: 'Wall Sit', tempo: 10, bp: [4, 6], base: 'stand', glow: {quads: [1, 1], glutes: [.5, .5]}, cam: {view: 'side', turn: 14, el: 6, zoom: 1},
  props: [{id: 'wall', at: 'back'}],
  form: [{when: 'in out', plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'knees over ankles', at: 'lowerleg01.R', side: 1},
    {when: 'in out', line: ['root', 'neck01'], say: 'back flat on the wall', at: 'spine02', side: 1}],
  k: [
    {br: 'in', on: 'fR fL', p: [.5, -.24], t: [180, 180], n: 180, rl: foot(.12, .25, {pole: [.2, 0, 1]}), ll: foot(.12, .25, {pole: [.2, 0, 1]}), ra: [4, 6], la: [4, 6], ao: 14, e: 1},
    {br: 'out', on: 'fR fL', p: [.5, -.24], t: [180, 180], n: 180, rl: foot(.12, .25, {pole: [.2, 0, 1]}), ll: foot(.12, .25, {pole: [.2, 0, 1]}), ra: [4, 6], la: [4, 6], ao: 14, e: 1}
  ]});

// Toe tap clock: stand tall on the left foot with a soft knee, hands on the hips; tap the right toes lightly
// forward, out to the side, and behind, returning beside the standing foot each time.
var HOVER = {x: .12, y: .11, z: .0, f: 62, toe: 86, pole: [.2, 0, 1]};
function tap(x, z){ return {x: x, y: .09, z: z, f: 52, toe: 92, pole: [.2, 0, 1]}; }
var TT = {p: [.895, -.062], px: .03, t: [180, 181], n: 178, ll: foot(.09, 0, {pole: [.2, 0, 1]}), ra: HIPS, la: HIPS, hR: 'flat', hL: 'flat', pnR: 'in', pnL: 'in', lift: 0};
G.define('toe-tap', {name: 'Toe Tap Clock', steps: 3, own: true, tempo: 4.8, base: 'stand', glow: {glutes: [.7, .2], calves: [.5, .1], abs: [.2, .2]}, cam: {view: 'three', turn: 4, el: 10, zoom: 1},
  form: [{when: 'always', plumb: ['head', 'foot.L'], say: 'tall over the standing foot', at: 'neck01', side: 1}],
  k: [
    mix(TT, {br: 'in', on: 'fL', rl: HOVER, e: .5}), mix(TT, {br: 'out', on: 'fL', rl: tap(.12, .3), e: .8}),
    mix(TT, {br: 'in', on: 'fL', rl: HOVER, e: .5}), mix(TT, {br: 'out', on: 'fL', rl: tap(.38, .04), e: .8}),
    mix(TT, {br: 'in', on: 'fL', rl: HOVER, e: .5}), mix(TT, {br: 'out', on: 'fL', p: [.905, -.04], rl: tap(.14, -.24), e: .8})
  ]});

// Step taps: face a step and tap its top with one foot, then the other, quick and light, like running in place.
G.define('step-tap', {name: 'Step Taps', tempo: .9, base: 'stand', mirror: true, glow: {flexors: [.6, .6], calves: [.6, .6], quads: [.3, .3]}, cam: {view: 'three', turn: -10, el: 8, zoom: 1},
  props: ['step'],
  form: [{when: 'always', plumb: ['head', 'root'], say: 'light feet, tall chest', at: 'neck01', side: 1}],
  k: [
    {br: 'in', on: 'tL', p: [.9, -.1], t: [176, 178], n: 176, rl: {x: .11, y: .09, z: .05, f: 60, toe: 90}, ll: {x: .11, y: .09, z: .05, f: 60, toe: 90}, ra: [26, 90], la: [-14, 70], hR: 'relax', hL: 'relax', ao: 8, lift: .06, e: .5},
    {br: 'out', on: 'tL', p: [.91, -.08], t: [176, 178], n: 176, rl: {x: .11, y: .29, z: .3, f: 62, toe: 90, pole: [.2, 0, 1]}, ll: {x: .11, y: .09, z: .05, f: 60, toe: 90}, ra: [-14, 70], la: [26, 90], hR: 'relax', hL: 'relax', ao: 8, lift: .06, e: 1}
  ]});

// Side and back leg lifts: stand tall with the left hand on the wall; lift the right leg a few inches out to the
// side (or straight back), hips level and the chest tall, then lower slowly. Out on the lift.
var WALLHAND = {x: .5, y: 1.2, z: .06, pole: [0, -1, -.4], f: 150};
var LIFT0 = {on: 'fL hL', p: [.925, -.062], px: .02, t: [180, 181], n: 180, ll: foot(.1, 0), rl: foot(.12, 0), la: WALLHAND, hL: 'flat', pnL: 'wall', ra: HIPS, hR: 'flat', pnR: 'in', lift: 0};
G.define('side-leg-lift', {name: 'Side Leg Lift', tempo: 3, base: 'stand', top: [1], hold: .25, glow: {glutes: [.2, 1], abs: [.2, .2]}, cam: {view: 'front', turn: -20, el: 6, zoom: 1},
  props: [{id: 'wall', at: 'left'}],
  form: [{when: 'hold', level: ['upperleg01.R', 'upperleg01.L'], say: 'hips level, toes forward', at: 'root', side: -1}],
  k: [mix(LIFT0, {br: 'out', e: .2}), mix(LIFT0, {br: 'in', p: [.925, -.062], px: .035, rl: [0, 0, 74], rlO: [24, 24, 10], e: 1})]});
G.define('back-leg-lift', {name: 'Back Leg Lift', tempo: 3, base: 'stand', top: [1], hold: .25, glow: {glutes: [.2, 1], hams: [0, .5]}, cam: {view: 'side', turn: 12, el: 6, zoom: 1},
  props: [{id: 'wall', at: 'left'}],
  form: [{when: 'hold', line: ['root', 'neck01'], say: 'long spine, squeeze the glute', at: 'spine02', side: 1}],
  k: [mix(LIFT0, {br: 'out', e: .2}), mix(LIFT0, {br: 'in', t: [177, 179], rl: [-20, -20, 40], e: 1})]});

// Heel-to-toe stand: one foot right in front of the other, heel touching toe; stand tall and breathe slowly.
G.define('heel-toe-stand', {name: 'Heel-to-Toe Stand', tempo: 10, bp: [4, 6], base: 'stand', glow: {calves: [.5, .5], glutes: [.4, .4], abs: [.2, .2]}, cam: {view: 'three', turn: 10, el: 10, zoom: 1},
  form: [{when: 'in out', plumb: ['head', 'root'], say: 'tall and still', at: 'neck01', side: 1}],
  k: [
    {br: 'in', on: 'fR fL', p: [.92, -.03], t: [180, 181], n: 176, rl: {x: .045, y: .072, z: .13, f: 72}, ll: {x: .045, y: .072, z: -.13, f: 72}, ra: [8, 12], la: [8, 12], ao: 26, e: .6},
    {br: 'out', on: 'fR fL', p: [.92, -.03], t: [180, 181], n: 176, rl: {x: .045, y: .072, z: .13, f: 72}, ll: {x: .045, y: .072, z: -.13, f: 72}, ra: [8, 12], la: [8, 12], ao: 24, e: .6}
  ]});

// Side lunge: step wide to one side and sit the hips back over that foot (knee over the toes), the other leg long;
// push back to center. One rep each side.
G.define('side-lunge', {name: 'Side Lunge', tempo: 3, base: 'stand', mirror: true, glow: {glutes: [.4, 1], quads: [.3, .9], adductors: [.8, .4]}, cam: {view: 'front', turn: -14, el: 8, zoom: 1},
  form: [{when: [.38, .5], plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'knee over toes', at: 'lowerleg01.R', side: -1},
    {when: [.38, .5], line: ['root', 'neck01'], say: 'chest proud, hips back', at: 'spine02', side: 1}],
  k: [
    {br: 'in', on: 'fL', p: [.925, -.062], t: [181, 181], n: 181, rl: step(.1, .02), ll: step(.1, .02), ra: SLR, la: SLR, hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in', lift: .07, e: .3},
    {br: 'out', on: 'fL', p: [.7, -.16], px: -.28, t: [158, 164], n: 168, rl: {x: .56, y: .072, z: .02, f: 72, pole: [.7, 0, 1]}, ll: step(.1, .02), ra: SLR, la: SLR, hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in', lift: .07, e: 1}
  ]});

// Alternating forward lunge: step forward, lower the back knee toward the floor with the chest tall, push back to
// stand, then the other leg.
G.define('walking-lunge', {name: 'Walking Lunge', tempo: 3, base: 'stand', mirror: true, glow: {quads: [.5, 1], glutes: [.5, 1], hams: [.2, .4]}, cam: {view: 'side', turn: 14, el: 6, zoom: 1},
  form: [{when: [.38, .5], plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'front knee over ankle', at: 'lowerleg01.R', side: -1},
    {when: [.38, .5], line: ['root', 'neck01'], say: 'chest tall', at: 'spine02', side: 1}],
  k: [
    {br: 'in', on: 'tL', p: [.925, -.062], t: [181, 180], n: 182, ra: [4, 8], la: [4, 8], rl: foot(.11, .02), ll: foot(.11, .02, {toe: 90}), lift: .08, e: .2},
    {br: 'out', on: 'tL', p: [.52, .37], t: [176, 178], n: 179, ra: [8, 10], la: [8, 10], rl: foot(.11, .85, {pole: [.15, 0, 1]}), ll: {x: .11, y: .11, z: .04, f: 57, toe: 90}, lift: .08, e: 1}
  ]});

// Wide stance reach: feet wide, right toes out, right knee bent over the ankle, arms long to each side, eyes past
// the right hand; a slow breath leads the hold.
var WSR = {p: [.76, -.08], px: -.12, t: [180, 181], n: 180, hy: -62, rl: {x: .5, y: .072, z: .04, f: 72, pole: [1, 0, .5]}, ll: step(.48, -.04), ra: [0, 0, 0], la: [0, 0, 0], raO: [88, 90, 90], laO: [88, 90, 90], hR: 'reach', hL: 'reach', pnR: 'down', pnL: 'down'};
G.define('wide-stance-reach', {name: 'Wide Stance Reach', tempo: 10, bp: [4, 6], base: 'stand', glow: {quads: [.4, .9], adductors: [.6, .4], delts: [.4, .4], glutes: [.3, .6]}, cam: {view: 'front', turn: -10, el: 6, zoom: 1},
  form: [{when: 'in out', plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'knee over ankle', at: 'lowerleg01.R', side: -1},
    {when: 'in out', level: ['wrist.R', 'wrist.L'], say: 'arms long', at: 'wrist.L', side: -1}],
  k: [mix(WSR, {br: 'in', on: 'fR fL', e: .9}), mix(WSR, {br: 'out', on: 'fR fL', e: .9})]});

// One-arm swing: one dumbbell held by one end in the right hand; hinge and hike it back, then snap the hips forward
// so it floats to chest height. The free arm hangs easy.
G.define('one-arm-swing', {name: 'One-Arm Dumbbell Swing', tempo: 2, base: 'stand', glow: {glutes: [1, 1], hams: [.8, .8], back: [.3, .3], obliques: [.2, 0]}, cam: {yaw: 6, el: 6, zoom: 1},
  props: [{id: 'dumbbell', at: 'R'}],
  form: [{when: [.38, .62], line: ['root', 'neck01'], ext: .1, say: 'flat back, hips back', at: 'spine01', side: 1},
    {when: [.9, 1], plumb: ['head', 'foot.R'], say: 'stand tall, arm floats', at: 'neck01', side: 1}],
  k: [
    {br: 'in', p: [.925, -.06], t: [181, 181], n: 182, ra: [80, 82, 84], raO: -4, la: [6, 12], laO: 8, rl: foot(.17, .02), ll: foot(.17, .02), hR: 'grip', hL: 'relax', pnR: 'back', e: .6, lo: 8},
    {br: 'out', p: [.84, -.27], t: [110, 110], n: 116, ra: [-18, -18, -18], raO: -3, la: [-4, 2], laO: 8, rl: foot(.17, .02, {pole: KNEE}), ll: foot(.17, .02, {pole: KNEE}), hR: 'grip', hL: 'relax', pnR: 'back', e: .4, lo: 9}
  ]});

// Side steps at the counter (a chair back here): hands resting on it, take slow steps to one side and back.
var CH = {rel: [.19, .02, .42], pole: [.4, -1, -.3], f: 90};
G.define('side-step', {name: 'Side Steps at the Counter', steps: 4, own: true, tempo: 4.8, base: 'stand', glow: {glutes: [.5, .5], adductors: [.3, .3]}, cam: {view: 'three', turn: 22, el: 10, zoom: 1},
  props: [{id: 'chair', z: .42}],
  form: [{when: 'always', plumb: ['head', 'root'], say: 'tall, toes forward', at: 'neck01', side: 1}],
  k: [
    {br: 'in', on: 'fL', p: [.925, -.062], px: 0, rl: step(.1, 0), ll: step(.1, 0), ra: CH, la: CH, hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', lift: .07, e: .4},
    {br: 'in', on: 'fR', p: [.915, -.062], px: -.11, rl: step(.34, 0), ll: step(.1, 0), ra: CH, la: CH, hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', lift: .07, e: .6},
    {br: 'out', on: 'fR', p: [.925, -.062], px: -.23, rl: step(.34, 0), ll: step(-.12, 0), ra: CH, la: CH, hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', lift: .07, e: .4},
    {br: 'out', on: 'fL', p: [.915, -.062], px: -.11, rl: step(.34, 0), ll: step(.1, 0), ra: CH, la: CH, hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', lift: .07, e: .6}
  ]});
})(window.GG3D);

}catch(e){(window.GG3D_LOADERR=window.GG3D_LOADERR||[]).push("p1.js"+': '+e.message);}
/* p2.js */
try{
// =====================================================================
// GROUNDED FIELD GUIDE (TM): 3D patterns, group PAT2: floor, bench, bar, and pulling (GWG BLD 897).
// (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// Plain data in the shape patterns/FORMAT.md describes: GG3D.define(id, {...}). Angles: 0 points down, 90 forward,
// 180 up, minus 90 back. Meters for the 1.73 m figure (scaled to each body). Side view faces +z. Owner: PAT2.
// Form first: a neutral spine (pelvis and chest kept together unless the move curls on purpose), shoulders packed
// down and back, wrists stacked over elbows, ribs down on every floor and plank move, soft long arms (never locked),
// planted hands, feet, knees, and back held still, breath out on the effort and in on the lowering or opening, a
// short gold form guide at the key moment, and modest, calm motion.
// =====================================================================
var GG3D = window.GG3D = window.GG3D || {q: [], define: function(i, d){ this.q.push([i, d]); }};
(function(G){
var FLAT = 'flat';
function ext(a, b){ var o = {}, k; for (k in a) o[k] = a[k]; for (k in b) o[k] = b[k]; return o; }

// ---- Lying on the back -------------------------------------------------
// Hands rest flat on the floor beside the hips, fingers toward the feet.
function floorHand(z){ return {x: .27, y: .028, z: z, pole: [1, 1, -.2], f: 92}; }
var SUPH = {hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', ra: floorHand(.02), la: floorHand(.02)};
// Feet flat, knees bent, heels under the knees (the bridge set up).
var FEETB = {x: .12, y: .075, z: .36, pole: [0, 1, .4], f: 74};
// The shoulders stay where they rest on the floor; the hips lift from them.
var SHOULDERS = ['upperarm01.R', .1, -.42];
var BLOW = {p: [.1, 0], t: [-88, -90], n: -92, an: SHOULDERS};
var BTOP = {p: [.1, 0], t: [-59, -68], n: -90, an: SHOULDERS};
var BRIDGE_LINE = {when: 'hold', line: ['lowerleg01.R', 'upperarm01.R'], say: 'knees to shoulders, one line', at: 'root', side: -1};

G.define('bridge', {name: 'Glute Bridge', tempo: 3, top: [1], hold: .3, glow: {glutes: [.85, .85], hams: [.6, .6]}, cam: {yaw: 6, el: 12, zoom: 1}, halo: .8, props: ['mat'],
  form: [BRIDGE_LINE],
  k: [
    ext(ext(BLOW, SUPH), {br: 'out', on: 'hR hL fR fL', rl: FEETB, ll: FEETB, e: .25}),
    ext(ext(BTOP, SUPH), {br: 'in', on: 'hR hL fR fL', rl: FEETB, ll: FEETB, e: 1})
  ]});

// The round 4 reference, kept as is (p0), with the back marked on the floor at the bottom.
var DB = {db: [.07, .032, -.062], pole: [1, -.3, 0], f: 92};
G.define('weighted-bridge', {name: 'Weighted Glute Bridge', tempo: 3, top: [1], hold: .3, glow: {glutes: [.8, .8], hams: [.65, .65]}, cam: {yaw: 6, el: 12, zoom: 1}, halo: .7,
  props: ['mat', {id: 'dumbbell', at: 'hip'}],
  form: [{when: 'hold', line: ['lowerleg01.R', 'upperarm01.R'], say: 'knees to shoulders in one line', at: 'root', side: -1}],
  k: [
    ext(BLOW, {br: 'out', on: 'fR fL', ra: DB, la: DB, hR: 'grip', hL: 'grip', pnR: 'down', pnL: 'down', rl: FEETB, ll: FEETB, e: .25}),
    ext(BTOP, {br: 'in', on: 'fR fL', ra: DB, la: DB, hR: 'grip', hL: 'grip', pnR: 'down', pnL: 'down', rl: FEETB, ll: FEETB, e: 1})
  ]});

// Hold the bridge, lift one foot a few inches with the knee bent, hips level, then the other.
var MARCH = [136, 66, 150];
G.define('bridge-march', {name: 'Glute Bridge March', tempo: 3, mirror: true, top: [1], hold: .22, glow: {glutes: [.9, .9], hams: [.6, .6], abs: [.35, .35]}, cam: {yaw: 10, el: 12, zoom: 1}, halo: .8, props: ['mat'],
  form: [{when: 'hold', level: ['upperleg01.R', 'upperleg01.L'], say: 'hips level', at: 'root', side: -1}],
  k: [
    ext(ext(BTOP, SUPH), {br: 'out', on: 'hR hL fR fL', rl: FEETB, ll: FEETB, e: .75}),
    ext(ext(BTOP, SUPH), {br: 'in', on: 'hR hL fL', rl: MARCH, ll: FEETB, e: 1})
  ]});

// Dead bug: arms up over the shoulders, knees stacked over the hips; one arm reaches back and the opposite leg
// reaches long, both hovering, while the low back stays on the floor.
var AUP = {ra: [180, 180, 180], la: [180, 180, 180], hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in'};
var TABLE = [180, 90, 172];
var DBUG = {p: [.09, 0], t: [-91, -90], n: -92};
G.define('dead-bug', {name: 'Dead Bug', tempo: 3, alt: true, top: [1, 3], hold: .22, glow: {abs: [1, 1], obliques: [.6, .6], flexors: [.3, .3]}, cam: {yaw: 14, el: 14, zoom: 1}, props: ['mat'],
  form: [{when: 'hold', level: ['root', 'spine02'], say: 'low back stays down', at: 'root', side: -1}],
  k: [
    ext(ext(DBUG, AUP), {br: 'out', on: 'p b', rl: TABLE, ll: TABLE, e: .3}),
    ext(ext(DBUG, AUP), {br: 'in', on: 'p b', rl: TABLE, ll: [95, 95, 170], ra: [274, 274, 274], e: 1}),
    ext(ext(DBUG, AUP), {br: 'out', on: 'p b', rl: TABLE, ll: TABLE, e: .3}),
    ext(ext(DBUG, AUP), {br: 'in', on: 'p b', rl: [95, 95, 170], ll: TABLE, la: [274, 274, 274], e: 1})
  ]});

// Hollow hold: low back pressed down, head, shoulders, and legs lifted a little, arms reaching long. Breath leads.
var HOLLOW = {p: [.075, 0], t: [-96, -110], n: -116, ra: [-108, -108, -108], la: [-108, -108, -108], rl: [104, 104, 160], ll: [104, 104, 160],
  hR: 'reach', hL: 'reach', pnR: 'in', pnL: 'in', on: 'p b'};
G.define('hollow', {name: 'Hollow Hold', tempo: 10, bp: [4, 6], glow: {abs: [1, 1], flexors: [.4, .4], quads: [.2, .2]}, cam: {yaw: 12, el: 12, zoom: 1}, props: ['mat'],
  form: [{when: 'always', line: ['wrist.R', 'foot.R'], ext: .04, say: 'low back pressed down', at: 'root', side: -1}],
  k: [ext(HOLLOW, {br: 'in', e: .9}), ext(HOLLOW, {br: 'out', t: [-96, -111], n: -117, rl: [105, 105, 160], ll: [105, 105, 160], e: 1})]});

// Reverse crunch: knees over the hips, then the hips curl up off the floor toward the ribs, and lower slowly.
G.define('reverse-crunch', {name: 'Reverse Crunch', tempo: 3, dur: [1, 1.4], glow: {abs: [1, 1], obliques: [.4, .4]}, cam: {yaw: 8, el: 12, zoom: 1}, props: ['mat'],
  form: [{when: 'out', line: ['upperarm01.R', 'wrist.R'], say: 'curl, then lower slowly', at: 'root', side: -1}],
  k: [
    ext(SUPH, {br: 'out', on: 'hR hL', p: [.1, 0], t: [-89, -90], n: -92, an: SHOULDERS, rl: [160, 84, 170], ll: [160, 84, 170], e: .3}),
    ext(SUPH, {br: 'in', on: 'hR hL', p: [.1, 0], t: [-62, -84], n: -92, an: SHOULDERS, rl: [218, 128, 200], ll: [218, 128, 200], e: 1})
  ]});

// Slow bicycle: shoulders lifted a little, fingertips light behind the head, elbows wide. One knee comes in as the
// opposite shoulder turns toward it and the other leg reaches long.
var HEAD = {ra: [-100, -90, -90], la: [-100, -90, -90], raO: [65, -60, -50], laO: [65, -60, -50], hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in'};
G.define('bicycle', {name: 'Slow Bicycle', tempo: 3, alt: true, glow: {abs: [1, 1], obliques: [1, 1], flexors: [.3, .3]}, cam: {yaw: 20, el: 18, zoom: 1}, props: ['mat'],
  form: [{when: 'out', line: ['neck01', 'knee^'], ext: 0, say: 'shoulder to knee, slow', at: 'spine01', side: 1}],
  k: [
    ext(HEAD, {br: 'out', on: 'p', p: [.09, 0], t: [-92, -104], n: -112, rl: [150, 98, 175], ll: [150, 98, 175], tw: 0, e: .5}),
    ext(HEAD, {br: 'in', on: 'p', p: [.09, 0], t: [-92, -110], n: -118, rl: [196, 120, 180], ll: [100, 100, 170], tw: -20, e: 1}),
    ext(HEAD, {br: 'out', on: 'p', p: [.09, 0], t: [-92, -104], n: -112, rl: [150, 98, 175], ll: [150, 98, 175], tw: 0, e: .5}),
    ext(HEAD, {br: 'in', on: 'p', p: [.09, 0], t: [-92, -110], n: -118, ll: [196, 120, 180], rl: [100, 100, 170], tw: 20, e: 1})
  ]});

// ---- Planks and push-ups ---------------------------------------------------
// The plank base keeps the body in one long line from heels to head (reach sets the body angle for each body).
var PLINE = {when: 'always', line: ['foot.R', 'upperarm01.R'], ext: .12, say: 'one long line', at: 'root', side: -1};
var ELBOWS = {when: 'out', angle: ['upperarm01.R', 'lowerarm01.R', 'wrist.R'], say: 'elbows back, not flared', at: 'lowerarm01.R', side: 1};
var PUSH_LOW = {reach: null, t: [97, 97], n: 95, ra: {dx: .1, y: .055, z: .4, pole: [.6, 0, -1], f: FLAT}, la: {dx: .1, y: .055, z: .4, pole: [.6, 0, -1], f: FLAT},
  rl: [-83, -83, 8, 55], ll: [-83, -83, 8, 55]};
G.define('push-up', {name: 'Push-Up', tempo: 3, dur: [2, 1], rest: .03, base: 'plank', glow: {chest: [1, 1], delts: [.7, .7], triceps: [.85, .85], abs: [.3, .3]}, cam: {yaw: 26, el: 14, zoom: 1.04},
  form: [PLINE],
  k: [{br: 'in', e: .3}, ext(PUSH_LOW, {br: 'out', e: 1})]});
// Fast push-ups: the same clean line, a quicker, springy press (no lower than the regular push-up).
G.define('fast-push-up', {name: 'Fast Push-Ups', tempo: 1.4, dur: [1, 1], rest: .02, base: 'plank', glow: {chest: [1, 1], delts: [.75, .75], triceps: [.9, .9], abs: [.35, .35]}, cam: {yaw: 26, el: 14, zoom: 1.04},
  form: [PLINE],
  k: [{br: 'in', e: .4}, ext(PUSH_LOW, {br: 'out', t: [99, 99], n: 97, rl: [-81, -81, 8, 55], ll: [-81, -81, 8, 55], e: 1})]});
// Push-ups on handles: a neutral grip (palms facing in), wrists straight, and a little more depth.
function handle(z, pole){ return {dx: .1, y: .15, z: z, pole: pole, f: 6}; }
G.define('handle-push-up', {name: 'Push-Up on Handles', tempo: 3, dur: [2, 1], rest: .03, base: 'plank', props: ['mat', 'handles'],
  glow: {chest: [1, 1], delts: [.7, .7], triceps: [.85, .85], abs: [.3, .3]}, cam: {yaw: 26, el: 14, zoom: 1.04},
  form: [PLINE, {when: 'out', plumb: ['lowerarm01.R', 'wrist.R'], say: 'wrists straight and stacked', at: 'wrist.R', side: 1}],
  k: [{br: 'in', ra: handle(.4, [.5, 0, -1]), la: handle(.4, [.5, 0, -1]), hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', e: .3},
    {br: 'out', reach: null, t: [96, 96], n: 94, ra: handle(.4, [.3, 0, -1]), la: handle(.4, [.3, 0, -1]), hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in',
      rl: [-84, -84, 8, 55], ll: [-84, -84, 8, 55], e: 1}]});

// Forearm plank: elbows under the shoulders, forearms long on the floor, heels to head in one line. The legs fit
// each body so the knees stay long; the breath leads.
var FARM = {dx: .03, y: .045, z: .7, pole: [0, -1, -.35], f: 88};
var FPLANK = {b: 'plank', reach: .71, ra: FARM, la: FARM, hR: 'fist', hL: 'fist', pnR: 'in', pnL: 'in', on: 'eR eL tR tL'};
G.define('plank', {name: 'Front Plank', tempo: 10, bp: [4, 6], base: 'plank', glow: {abs: [1, 1], obliques: [.5, .5], glutes: [.5, .5], delts: [.35, .35], quads: [.3, .3]}, cam: {yaw: 24, el: 14, zoom: 1.04},
  form: [{when: 'always', line: ['foot.R', 'upperarm01.R'], ext: .12, say: 'heels to head, one line', at: 'root', side: -1}],
  k: [ext(FPLANK, {br: 'in', e: .9}), ext(FPLANK, {br: 'out', e: 1})]});

// Shoulder taps: a high plank with the feet wide; one hand lifts to tap the opposite shoulder while the hips stay
// quiet, then the other. Each key fits its body angle from the hand that stays planted.
var PH = {dx: .1, y: .055, z: .4, pole: [.5, 0, -1], f: FLAT};
var TAPK = {reach: null, t: [108, 108], n: 104, ra: PH, la: PH, rl: [-72, -72, 22, 64], ll: [-72, -72, 22, 64], lo: 9};
G.define('shoulder-tap', {name: 'Plank Shoulder Tap', tempo: 2.4, mirror: true, top: [1], hold: .15, base: 'plank', glow: {abs: [1, 1], obliques: [.8, .8], delts: [.6, .6], glutes: [.3, .3]}, cam: {yaw: 30, el: 18, zoom: 1.04},
  form: [{when: 'hold', level: ['upperleg01.R', 'upperleg01.L'], say: 'hips quiet', at: 'root', side: -1}],
  k: [ext(TAPK, {br: 'in', fitArm: {r: .95, by: 't', span: 10, side: 'L'}, e: .5}),
    ext(TAPK, {br: 'out', on: 'hL tR tL', fitArm: {r: .95, by: 't', span: 10, side: 'L'}, ra: {rel: [-.17, .42, .1], pole: [.3, -1, -.3], f: 120}, hR: 'flat', pnR: 'in', e: 1})]});

// Plank pull-through: a high plank with the feet wide. The dumbbell sits just outside the right hand; the left hand
// reaches under the chest and drags it across to the left, the right hand comes under to take it, the left hand
// returns to the floor, and the right hand drags it back. Each drag is one rep; hips stay square the whole time.
var PT = {reach: null, t: [108, 108], n: 104, ra: PH, la: PH, rl: [-72, -72, 22, 64], ll: [-72, -72, 22, 64], lo: 10, hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down'};
function bell(x, y, z){ return {x: x, y: y, z: z, pole: [.3, -.3, -1], f: 4}; }
var PT_FIT_R = {r: .95, by: 't', span: 10, side: 'R'}, PT_FIT_L = {r: .95, by: 't', span: 10, side: 'L'};
G.define('pull-through', {name: 'Plank Pull-Through', tempo: 3, mirror: true, dur: [.9, .9, 2, 2], base: 'plank', props: ['mat', {id: 'dumbbell', at: 'key'}],
  glow: {abs: [1, 1], obliques: [1, 1], delts: [.6, .6], lats: [.4, .4]}, cam: {yaw: 30, el: 22, zoom: 1.04},
  form: [{when: 'out', level: ['upperleg01.R', 'upperleg01.L'], say: 'hips square', at: 'root', side: -1}],
  k: [
    ext(PT, {br: 'out', hold: 'L', on: 'hR tR tL', fitArm: PT_FIT_R, la: bell(-.36, .15, .38), hL: 'grip', pnL: 'in', e: .7}),
    ext(PT, {br: 'out', via: true, hold: 'L', on: 'hR tR tL', fitArm: PT_FIT_R, la: bell(.0, .2, .32), hL: 'grip', pnL: 'in', e: 1}),
    ext(PT, {br: 'in', hold: 'L', on: 'hL tR tL', fitArm: PT_FIT_R, la: bell(.36, .15, .38), hL: 'grip', pnL: 'in', e: .6}),
    ext(PT, {br: 'in', hold: 'R', on: 'hR tR tL', fitArm: PT_FIT_L, la: bell(.36, .15, .42), ra: bell(-.36, .15, .32), hL: 'grip', pnL: 'in', hR: 'grip', pnR: 'in', e: .5})
  ]});

// Bird dog: the round 4 reference (p0), with the injury line of the move as its form guide.
G.define('bird-dog', {name: 'Bird Dog', tempo: 3, alt: true, top: [1, 3], rest: .04, hold: .22, base: 'fours',
  glow: {back: [1, 1], glutes: [1, 1], abs: [.4, .4], obliques: [.5, .5]}, sideGlow: 'glutes', cam: {yaw: 30, el: 30, zoom: 1.06},
  form: [{when: 'hold', line: ['hand^', 'foot^'], ext: .06, say: 'hips level, reach long', at: 'root', side: -1}],
  k: [
    {br: 'out', e: .2, gl: [0, 0]},
    {br: 'in', on: 'hL kR', n: 100, ra: [93, 94, 96], ll: [-86, -88, -96], hR: 'relax', pnR: 'in', e: 1, gl: [1, 0]},
    {br: 'out', e: .2, gl: [0, 0]},
    {br: 'in', on: 'hR kL', n: 100, la: [93, 94, 96], rl: [-86, -88, -96], hL: 'relax', pnL: 'in', e: 1, gl: [0, 1]}
  ]});

// Side plank on the right forearm (seen from the front): elbow under the shoulder, feet stacked, the body rolled
// up off the floor into one straight line from feet to head. The breath leads.
var SIDEP = {p: [.4, 0], rz: 73.5, t: [180, 180], n: 180, an: ['lowerarm01.R', .062], ra: [0, 90, 90], raO: [90, 0, 0], la: [8, 30, 30], laO: [0, 0, 0],
  rl: [0, 0, 90], ll: [0, 0, 90], lo: 0, hR: 'fist', hL: 'relax', pnR: 'down', pnL: 'in', on: 'eR fR'};
G.define('side-plank', {name: 'Side Plank', tempo: 10, bp: [4, 6], props: ['mat'], glow: {obliques: [1, 1], abs: [.5, .5], glutes: [.45, .45], delts: [.35, .35]}, cam: {view: 'front', turn: -10, el: 12, zoom: 1},
  form: [{when: 'always', line: ['foot.R', 'upperarm01.L'], ext: .1, say: 'feet to head, one line', at: 'root', side: 1}],
  k: [ext(SIDEP, {br: 'in', e: .9}), ext(SIDEP, {br: 'out', e: 1})]});
// Side plank reach-through: the top arm reaches to the ceiling (in), then threads under the body as the chest turns
// toward the floor (out), hips held high.
// The planted forearm holds its place on the mat while the chest turns (elbow under the shoulder, forearm forward).
var RT_ARM = {x: .565, y: .062, z: .348, el: [.565, .062, .081], f: 90}, RT_AN = null;
G.define('reach-through', {name: 'Side Plank Reach-Through', tempo: 3, props: ['mat'], glow: {obliques: [1, 1], abs: [.6, .6], delts: [.5, .5], lats: [.4, .4]}, cam: {view: 'front', turn: -15, el: 14, zoom: 1},
  form: [{when: 'in', line: ['foot.R', 'upperarm01.L'], ext: .1, say: 'hips stay high', at: 'root', side: 1}],
  k: [
    ext(SIDEP, {br: 'in', ra: RT_ARM, an: RT_AN, p: [.369, 0], la: [90, 90, 90], laO: [86, 86, 86], pnL: 'out', hL: 'reach', tw: 0, ht: 0, e: .6}),
    ext(SIDEP, {br: 'out', ra: RT_ARM, an: RT_AN, p: [.369, 0], la: [90, 90, 90], laO: [-66, -66, -66], pnL: 'out', hL: 'reach', tw: -16, ht: -8, e: 1})
  ]});

// ---- On the bench --------------------------------------------------------
// Lying on the flat bench, head toward the back, hips near the front end, feet flat on the floor and wide.
var BFEET = {x: .2, y: .072, z: .64, pole: [.2, 1, 1], f: 72};
var ONBENCH = {p: [.55, .2], t: [-90, -90], n: -92, rl: BFEET, ll: BFEET, lo: 14, on: 'b fR fL'};
var WRIST_STACK = {when: 'in', plumb: ['wrist.R', 'lowerarm01.R'], say: 'wrists over elbows', at: 'wrist.R', side: 1};
G.define('bench-press', {name: 'Dumbbell Bench Press', tempo: 3, props: ['bench', 'dumbbells'], glow: {chest: [1, 1], triceps: [.6, .6], delts: [.6, .6]}, cam: {yaw: 18, el: 16, zoom: 1},
  form: [WRIST_STACK],
  k: [
    ext(ONBENCH, {br: 'out', ra: [22, 180, 180], la: [22, 180, 180], raO: [62, 0, 0], laO: [62, 0, 0], hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: .5}),
    ext(ONBENCH, {br: 'in', ra: [178, 178, 178], la: [178, 178, 178], raO: [6, 0, 0], laO: [6, 0, 0], hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: 1})
  ]});
// Incline press: the bench back at a low incline (30 degrees), hips on the seat, the press rising over the upper chest.
var INC = {p: [.6, -.02], t: [-120, -120], n: -122, rl: {x: .2, y: .072, z: .58, pole: [.2, 1, 1], f: 72}, ll: {x: .2, y: .072, z: .58, pole: [.2, 1, 1], f: 72}, lo: 14, on: 'b p fR fL'};
G.define('incline-press', {name: 'Incline Dumbbell Press', tempo: 3, props: [{id: 'incline', angle: 30}, 'dumbbells'], glow: {chest: [1, 1], delts: [.75, .75], triceps: [.6, .6]}, cam: {yaw: 18, el: 12, zoom: 1},
  form: [WRIST_STACK],
  k: [
    ext(INC, {br: 'out', ra: [-18, 176, 176], la: [-18, 176, 176], raO: [60, 0, 0], laO: [60, 0, 0], hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: .5}),
    ext(INC, {br: 'in', ra: [168, 170, 170], la: [168, 170, 170], raO: [6, 0, 0], laO: [6, 0, 0], hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: 1})
  ]});
// One-arm dumbbell row: left knee and left hand on the bench, right foot on the floor, back flat; the right elbow
// draws back to the hip and the dumbbell lowers all the way.
var ROWK = {p: [.92, -.3], t: [97, 99], n: 100, an: ['lowerleg01.L', .5, -.45], ll: [0, -90, -96], rl: {x: .32, y: .072, z: -.2, f: 72, pole: [.3, 0, 1]},
  la: {x: .13, y: .47, z: .28, pole: [.3, 0, -1], f: FLAT}, hL: 'flat', pnL: 'down', hR: 'grip', pnR: 'in', fitArm: {r: .96, by: 't', span: 10, side: 'L'}, on: 'hL kL fR'};
G.define('row', {name: 'One-Arm Dumbbell Row', tempo: 3, dur: [1, 1.3], props: ['bench', {id: 'dumbbell', at: 'R'}], glow: {lats: [.15, 1], back: [.3, .5], delts: [0, .5], biceps: [0, .55]}, cam: {yaw: 22, el: 14, zoom: 1},
  form: [{when: 'out', line: ['root', 'neck01'], say: 'flat back, elbow to hip', at: 'spine01', side: -1}],
  k: [
    ext(ROWK, {br: 'out', ra: [0, 0, 0], raO: [4, 0, 0], e: .4}),
    ext(ROWK, {br: 'in', ra: [-82, 2, 2], raO: [8, 0, 0], e: 1})
  ]});
// Chest-supported row: chest on the incline pad, facing it (the figure turns to face the back of the room); the
// elbows draw back past the ribs and the shoulder blades squeeze, then lower all the way.
var CSR = {yaw: 180, p: [.64, .02], t: [135, 135], n: 140, rl: {x: .14, y: .072, z: .6, f: -60, toe: -20, pole: [0, 0, -1]}, ll: {x: .14, y: .072, z: .6, f: -60, toe: -20, pole: [0, 0, -1]},
  hR: 'grip', hL: 'grip', pnR: 'out', pnL: 'out', on: 'tR tL'};
G.define('chest-row', {name: 'Chest-Supported Dumbbell Row', tempo: 3, dur: [1, 1.3], props: [{id: 'incline', angle: 45}, 'dumbbells'], glow: {lats: [.8, .8], back: [.5, .5], delts: [.5, .5], biceps: [.4, .4]},
  cam: {view: 'side-left', turn: -20, el: 14, zoom: 1},
  form: [{when: 'out', level: ['upperarm01.R', 'upperarm01.L'], say: 'squeeze the shoulder blades', at: 'spine01', side: 1}],
  k: [
    ext(CSR, {br: 'out', ra: [0, 0, 0], la: [0, 0, 0], raO: [8, 0, 0], laO: [8, 0, 0], e: .4}),
    ext(CSR, {br: 'in', ra: [-80, 2, 2], la: [-80, 2, 2], raO: [16, 0, 0], laO: [16, 0, 0], e: 1})
  ]});
// Hip thrust: upper back on the bench edge, feet flat, a dumbbell across the hips. Drive up until the body is flat
// from knees to shoulders (chin tucked, ribs down), shins straight up at the top, then lower.
var HT = {an: ['upperarm01.R', .53, -.06], ra: DB, la: DB, hR: 'grip', hL: 'grip', pnR: 'down', pnL: 'down', rl: {x: .14, y: .072, z: .8, pole: [0, 1, 1], f: 74}, ll: {x: .14, y: .072, z: .8, pole: [0, 1, 1], f: 74}, lo: 8, on: 'fR fL'};
G.define('hip-thrust', {name: 'Dumbbell Hip Thrust', tempo: 3, top: [1], hold: .3, props: [{id: 'bench', z: -.6}, {id: 'dumbbell', at: 'hip'}], glow: {glutes: [1, 1], hams: [.5, .5], quads: [.3, .3]}, cam: {yaw: 10, el: 10, zoom: 1}, halo: .8,
  form: [{when: 'hold', line: ['lowerleg01.R', 'upperarm01.R'], say: 'flat, knees to shoulders', at: 'root', side: -1}],
  k: [
    ext(HT, {br: 'out', p: [.4, .3], t: [-124, -116], n: -112, e: .3}),
    ext(HT, {br: 'in', p: [.4, .3], t: [-92, -92], n: -100, e: 1})
  ]});
// Bench leg raise: lying on the bench, hands holding its sides behind the head, low back stays on the bench.
var BGRIP = {x: .17, y: .43, z: -.47, pole: [1, .4, .2], f: -90};
var LRB = {p: [.55, .28], t: [-92, -90], n: -92, ra: BGRIP, la: BGRIP, hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', lo: 2, on: 'b hR hL'};
G.define('leg-raise', {name: 'Bench Leg Raise', tempo: 3, dur: [1, 1.5], props: ['bench'], glow: {abs: [1, 1], flexors: [.8, .8], quads: [.3, .3]}, cam: {yaw: 14, el: 12, zoom: 1},
  form: [{when: 'in', level: ['root', 'spine02'], say: 'low back stays down', at: 'root', side: -1}],
  k: [ext(LRB, {br: 'out', rl: [96, 96, 168], ll: [96, 96, 168], e: .5}), ext(LRB, {br: 'in', rl: [170, 170, 250], ll: [170, 170, 250], e: 1})]});
G.define('leg-raise-bent', {name: 'Bench Leg Raise', tempo: 3, top: [1], hold: .25, props: ['bench'], glow: {abs: [1, 1], flexors: [.7, .7]}, cam: {yaw: 14, el: 12, zoom: 1},
  form: [{when: 'hold', level: ['root', 'spine02'], say: 'low back stays down', at: 'root', side: -1}],
  k: [ext(LRB, {br: 'out', rl: [102, 58, 150], ll: [102, 58, 150], e: .5}), ext(LRB, {br: 'in', rl: [184, 104, 196], ll: [184, 104, 196], e: 1})]});

// ---- At the bar and the dip bars ------------------------------------------
// Pull-up: from a full hang (arms long, shoulders set), pull the chest up until the chin clears the bar, elbows
// driving down, then lower slowly to the full hang. Legs long and quiet, ribs down.
var PU_HANG = {b: 'hang', fitArm: {r: .97, by: 'p0', span: .2}, rl: [4, -6, 28], ll: [4, -6, 28], t: [180, 180], n: 180};
var PU_TOP = {b: 'hang', p: [1.62, -.15], t: [176, 171], n: 176, ra: {x: .24, y: 2.2, z: 0, pole: [1, -1, .3], f: 180}, la: {x: .24, y: 2.2, z: 0, pole: [1, -1, .3], f: 180}, rl: [8, -4, 28], ll: [8, -4, 28]};
var PU_GLOW = {lats: [1, 1], biceps: [.7, .7], upper: [.5, .5], forearms: [.4, .4], abs: [.2, .2]};
G.define('pull-up', {name: 'Pull-Up', tempo: 3, dur: [1, 1.5], props: ['bar'], glow: PU_GLOW, cam: {view: 'three', el: 4, zoom: 1},
  form: [{when: [.3, .5], level: ['upperarm01.R', 'upperarm01.L'], say: 'shoulders down, chest up', at: 'neck01', side: 1}],
  k: [ext(PU_HANG, {br: 'out', e: .4}), ext(PU_TOP, {br: 'in', e: 1})]});
G.define('pull-up-hold', {name: 'Pull-Up Top Hold', tempo: 10, bp: [4, 6], props: ['bar'], glow: PU_GLOW, cam: {view: 'three', el: 4, zoom: 1},
  form: [{when: 'always', level: ['upperarm01.R', 'upperarm01.L'], say: 'shoulders down, chest up', at: 'neck01', side: 1}],
  k: [ext(PU_TOP, {br: 'in', e: 1}), ext(PU_TOP, {br: 'out', p: [1.615, -.15], e: 1})]});
// Dead hang: a lower bar, so the toes may rest on the floor; shoulders soft, long easy breaths.
var HANGB = {b: 'hang', ra: {x: .24, y: 2.02, z: 0, pole: [1, 0, -.3], f: 180}, la: {x: .24, y: 2.02, z: 0, pole: [1, 0, -.3], f: 180}, fitArm: {r: .97, by: 'p0', span: .2}, rl: [3, 3, 20], ll: [3, 3, 20]};
G.define('hang', {name: 'Dead Hang', tempo: 10, bp: [4, 6], props: [{id: 'bar', y: 2.02}], glow: {forearms: [.9, .9], lats: [.4, .4], upper: [.3, .3]}, cam: {view: 'three', el: 4, zoom: 1},
  form: [{when: 'always', plumb: ['head', 'foot.R'], say: 'long and easy', at: 'spine01', side: 1}],
  k: [ext(HANGB, {br: 'in', e: .7}), ext(HANGB, {br: 'out', e: .7})]});
// Hanging knee raise: from a quiet hang, curl the knees up toward the chest (the pelvis tucks), then lower slowly
// with no swing.
G.define('knee-raise', {name: 'Hanging Knee Raise', tempo: 3, dur: [1, 1.5], props: ['bar'], glow: {abs: [1, 1], flexors: [.8, .8], obliques: [.4, .4], forearms: [.4, .4]}, cam: {view: 'three', turn: -15, el: 4, zoom: 1},
  form: [{when: 'in', plumb: ['head', 'root'], say: 'lower slowly, stay steady', at: 'spine01', side: 1}],
  k: [ext(PU_HANG, {br: 'out', e: .4}), ext(PU_HANG, {br: 'in', t: [190, 182], n: 178, rl: [104, 14, 60], ll: [104, 14, 60], e: 1})]});
// Bar dip: arms long on the dip bars, a slight forward lean; lower with control until the upper arms are about
// level, elbows tracking back, then press up. Knees bent, feet behind and clear.
var DIPH = {x: .27, y: 1.17, z: 0, pole: [0, 0, -1], f: 90};
var DIPK = {ra: DIPH, la: DIPH, hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', rl: [6, -78, -110], ll: [10, -74, -110], lo: 2, on: 'hR hL'};
var DIP_TOP = ext(DIPK, {p: [1.2, -.03], t: [172, 170], n: 172, fitArm: {r: .96, by: 'p0', span: .2}, shR: -3, shL: -3});
G.define('dip', {name: 'Bar Dip', tempo: 3, dur: [1.4, 1], props: ['dip'], glow: {triceps: [1, 1], chest: [.8, .8], delts: [.6, .6]}, cam: {view: 'three', turn: -10, el: 6, zoom: 1},
  form: [{when: 'out', level: ['upperarm01.R', 'lowerarm01.R'], say: 'upper arms level, then press', at: 'lowerarm01.R', side: 1}],
  k: [ext(DIP_TOP, {br: 'in', e: .4}), ext(DIPK, {br: 'out', p: [.96, .02], t: [160, 154], n: 160, e: 1})]});
G.define('dip-hold', {name: 'Dip Top Hold', tempo: 10, bp: [4, 6], props: ['dip'], glow: {triceps: [.9, .9], chest: [.5, .5], delts: [.5, .5], upper: [.3, .3]}, cam: {view: 'three', turn: -10, el: 6, zoom: 1},
  form: [{when: 'always', plumb: ['upperarm01.R', 'wrist.R'], say: 'shoulders down, arms long', at: 'neck01', side: 1}],
  k: [ext(DIP_TOP, {br: 'in', shR: -5, shL: -5, e: .9}), ext(DIP_TOP, {br: 'out', shR: -5, shL: -5, e: .9})]});

// ---- Standing, with a band or a wall -------------------------------------------
// Wall push-up: hands on the wall at shoulder height, feet a step back, heels to head in one line; bend the elbows
// to bring the chest toward the wall, then press away.
var WHAND = {x: .2, y: 1.3, z: .56, pole: [.6, -1, -.3], f: 180};
var WALLK = {b: 'stand', ra: WHAND, la: WHAND, hR: 'flat', hL: 'flat', pnR: 'fwd', pnL: 'fwd', rl: {x: .12, y: .072, z: -.42, f: 72, toe: 60}, ll: {x: .12, y: .072, z: -.42, f: 72, toe: 60}, on: 'hR hL fR fL'};
G.define('wall-push-up', {name: 'Wall Push-Up', tempo: 3, props: [{id: 'wall', at: 'front'}], glow: {chest: [1, 1], triceps: [.7, .7], delts: [.5, .5], abs: [.2, .2]}, cam: {view: 'side', turn: -28, el: 8, zoom: 1},
  form: [{when: 'always', line: ['foot.R', 'upperarm01.R'], ext: .08, say: 'one long line', at: 'root', side: -1}],
  k: [ext(WALLK, {br: 'in', p: [.87, -.16], t: [164, 164], n: 164, fitArm: {r: .96, by: 'p1', span: .15}, e: .4}),
    ext(WALLK, {br: 'out', p: [.82, -.03], t: [154, 154], n: 154, e: 1})]});
// Standing cross crunch: hands lightly behind the head, elbows wide; one knee lifts as the chest turns to bring
// the opposite elbow toward it, standing tall on the other leg.
var BEHIND = {ra: [-30, 150, 160], la: [-30, 150, 160], raO: [80, -55, -40], laO: [80, -55, -40], hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in'};
G.define('cross-crunch', {name: 'Standing Cross Crunch', tempo: 2.6, mirror: true, base: 'stand', glow: {obliques: [1, 1], abs: [.8, .8], flexors: [.4, .4]}, cam: {view: 'three', turn: 10, el: 6, zoom: 1},
  form: [{when: 'out', line: ['lowerarm01.L', 'lowerleg01.R'], ext: 0, say: 'elbow to knee, stand tall', at: 'spine01', side: 1}],
  k: [ext(BEHIND, {br: 'out', p: [.92, -.062], t: [180, 180], n: 180, e: .3}),
    ext(BEHIND, {br: 'in', on: 'fL', p: [.9, -.06], px: .05, t: [179, 166], n: 168, tw: -26, lb: -6, rl: [102, 4, 80], e: 1})]});
// Step back to balance: a short reverse lunge, then drive the back knee up in front and hold, standing tall on the
// other leg, then step back again.
var KH_FOOT = {x: .11, y: .072, z: .12, f: 72};
var KH_ARMS = {la: [-18, 0], ra: [22, 40]};
G.define('knee-hold', {name: 'Step Back to Balance', tempo: 3.4, top: [1], hold: .3, base: 'stand', glow: {glutes: [1, .5], quads: [.7, .5], flexors: [0, .7], abs: [.3, .3], calves: [.4, 0]}, cam: {view: 'three', turn: -6, el: 6, zoom: 1},
  form: [{when: 'hold', plumb: ['head', 'foot.L'], say: 'stand tall, hips level', at: 'spine01', side: 1}],
  k: [
    {br: 'out', on: 'fR fL', lift: .08, p: [.78, -.18], px: 0, t: [177, 178], n: 178, ll: KH_FOOT, rl: {x: .11, y: .13, z: -.6, f: 45, toe: 90, pole: [0, -1, .5]}, la: [-18, 0], ra: [22, 40], e: .5},
    {br: 'in', on: 'fL', lift: .08, p: [.92, -.03], px: .05, t: [180, 180], n: 180, ll: KH_FOOT, rl: {x: .1, y: .5, z: .34, f: 90, toe: 90, pole: [0, 0, 1]}, la: [42, 108], ra: [-24, 20], e: 1}
  ]})
// Band face pull: a band anchored at face height ahead; pull the ends toward the eyes with the elbows high and
// wide, squeeze between the shoulder blades, then return slowly.
var FPK = {b: 'stand', p: [.91, -.062], hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in'};
G.define('face-pull', {name: 'Band Face Pull', tempo: 3, dur: [1, 1.3], props: [{id: 'band', anchor: [0, 1.58, 1.15]}], glow: {upper: [1, 1], delts: [.7, .7], rotator: [.8, .8], biceps: [.3, .3]}, cam: {view: 'three', turn: 15, el: 8, zoom: 1},
  form: [{when: 'in', level: ['lowerarm01.R', 'lowerarm01.L'], say: 'elbows high and wide', at: 'neck01', side: 1}],
  k: [ext(FPK, {br: 'out', ra: [102, 102, 102], la: [102, 102, 102], raO: [12, 0, 0], laO: [12, 0, 0], e: .4}),
    ext(FPK, {br: 'in', ra: [-14, 120, 130], la: [-14, 120, 130], raO: [84, 22, 10], laO: [84, 22, 10], e: 1})]});
// High band pull-down, kneeling tall: reach up to the band, then draw the elbows down to the ribs, chest proud.
var PDK = {b: 'kneel', hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd'};
G.define('pull-down', {name: 'High Band Pull-Down', tempo: 3, dur: [1, 1.3], props: ['mat', {id: 'band', anchor: [0, 2.25, .4]}], glow: {lats: [1, 1], upper: [.6, .6], biceps: [.5, .5]}, cam: {view: 'three', turn: 10, el: 8, zoom: 1},
  form: [{when: 'in', plumb: ['lowerarm01.R', 'upperleg01.R'], say: 'elbows to ribs, chest proud', at: 'neck01', side: 1}],
  k: [ext(PDK, {br: 'out', t: [180, 180], n: 182, ra: [162, 166, 168], la: [162, 166, 168], raO: [14, 0, 0], laO: [14, 0, 0], e: .4}),
    ext(PDK, {br: 'in', t: [180, 178], n: 180, ra: [8, 150, 160], la: [8, 150, 160], raO: [26, 0, 0], laO: [26, 0, 0], e: 1})]});
// Pallof press: a band anchored at chest height to the right; hold the handle at the chest, press it straight out,
// hold for a breath without turning, and bring it back. Square hips and shoulders.
var PALK = {b: 'stand', p: [.9, -.062], rl: {x: .16, y: .072, z: 0, f: 72}, ll: {x: .16, y: .072, z: 0, f: 72}, hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in'};
G.define('pallof', {name: 'Pallof Press', tempo: 3, top: [1], props: [{id: 'band', anchor: [-1.05, 1.15, .1]}], glow: {obliques: [1, 1], abs: [.7, .7], glutes: [.3, .3]}, cam: {view: 'front', turn: 30, el: 8, zoom: 1},
  form: [{when: 'hold', level: ['upperarm01.R', 'upperarm01.L'], say: 'square, no turning', at: 'neck01', side: 1}],
  k: [ext(PALK, {br: 'out', ra: {x: .02, y: 1.13, z: .18, pole: [1, -1, -.2], f: 90}, la: {x: .02, y: 1.13, z: .18, pole: [1, -1, -.2], f: 90}, e: .5}),
    ext(PALK, {br: 'in', ra: {x: .02, y: 1.16, z: .47, pole: [1, -1, -.2], f: 90}, la: {x: .02, y: 1.16, z: .47, pole: [1, -1, -.2], f: 90}, fitArm: {r: .94, by: 'p1', span: .15}, e: 1})]});

// ---- Plank on the bench ------------------------------------------------------
// Slow mountain climbers: hands on the bench, body in one long line; drive one knee in toward the chest, step it
// back, then the other.
var CLH = {dx: .06, y: .5, z: .34, pole: [.4, 0, -1], f: FLAT};
var CLK = {p: [.6, -.2], t: [128, 128], n: 126, ra: CLH, la: CLH, hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', rl: [-52, -52, 30, 70], ll: [-52, -52, 30, 70], lo: 3, fitArm: {r: .96, by: 't', span: 10, side: 'R'}};
G.define('climber', {name: 'Slow Mountain Climbers', tempo: 3, mirror: true, props: [{id: 'bench', z: .82}], glow: {abs: [1, 1], flexors: [.8, .8], delts: [.4, .4], quads: [.3, .3]}, cam: {view: 'side', turn: 24, el: 12, zoom: 1},
  form: [{when: 'in', line: ['foot*', 'upperarm01.R'], ext: .08, say: 'one long line', at: 'root', side: -1}],
  k: [ext(CLK, {br: 'out', on: 'hR hL tR tL', an: ['toe1-1.*', .025, -.72], e: .4}),
    ext(CLK, {br: 'out', via: true, on: 'hR hL tL', an: ['toe1-1.*', .025, -.72], rl: [-12, -104, -50, 30], e: .7}),
    ext(CLK, {br: 'in', on: 'hR hL tL', an: ['toe1-1.*', .025, -.72], rl: [54, -82, -30, 30], e: 1}),
    ext(CLK, {br: 'in', via: true, on: 'hR hL tL', an: ['toe1-1.*', .025, -.72], rl: [-12, -104, -50, 30], e: .7})]})

// ---- Walk-out (inchworm) ---------------------------------------------------------
// Stand tall, hinge and set the hands on the floor (knees bend as much as needed), walk the hands out one at a time
// to a high plank, walk them back, and stand up. The toes stay planted the whole way; the heels rise as the body
// lengthens. Each hand step is one key, so the planted hand never slides.
function wh(z){ return {dx: .09, y: .055, z: z, pole: [.5, 0, -1], f: FLAT}; }
var WO_FEET = function(y, f, toe){ return {x: .11, y: y, z: 0, f: f, toe: toe, pole: [0, 0, 1]}; };
var WO_FLAT = WO_FEET(.072, 72), WO_BALL = {x: .11, y: .136, z: .037, f: 45, toe: 90, pole: [0, 0, 1]};
var WOH = {hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', lift: 0};
function woStep(zr, zl, p, t, n, feet, on){ return ext(WOH, {p: p, t: t, n: n, ra: wh(zr), la: wh(zl), rl: feet, ll: feet, fitArm: {r: .95, by: 'p1', span: .25}, on: on}); }
var WO_TOES = {x: .11, y: .168, z: .086, f: 22, toe: 64, pole: [0, -1, .2]};
var WO_PLANK = ext(WOH, {p: [.47, .88], t: [106, 106], n: 102, fitArm: {r: .95, by: 't', span: 12}, ra: wh(1.375), la: wh(1.375), rl: WO_TOES, ll: WO_TOES, on: 'hR hL tR tL'});
G.define('walk-out', {name: 'Inchworm', tempo: 10, own: true, steps: 12, dur: [2.2, 2, 1.1, 1.1, 1.1, 1.2, 1.5, 1.5, 1.5, 1.5, 1.2, 1.1, 1.1, 1.1, 2, 2.2], props: ['mat'], glow: {abs: [.8, .8], delts: [.7, .7], hams: [.6, .6], chest: [.4, .4], triceps: [.4, .4]}, cam: {view: 'side', turn: 22, el: 12, zoom: 1},
  form: [{when: [.42, .6], line: ['foot.R', 'upperarm01.R'], ext: .1, say: 'one long line', at: 'root', side: -1}],
  k: [
    {b: 'stand', br: 'out', on: 'fR fL', lift: 0, p: [.925, -.062], t: [180, 180], n: 180, rl: WO_FLAT, ll: WO_FLAT, ra: [4, 8, 8], la: [4, 8, 8], hR: 'flat', hL: 'flat', e: .2},
    {br: 'out', via: true, on: 'fR fL', lift: 0, p: [.87, -.12], t: [112, 98], n: 92, rl: WO_FLAT, ll: WO_FLAT, ra: [16, 16, 16], la: [16, 16, 16], hR: 'flat', hL: 'flat', pnR: 'in', pnL: 'in', e: .4},
    ext(woStep(.5, .5, [.8, -.12], [42, 26], 22, WO_FLAT, 'hL fR fL'), {br: 'in'}),
    ext(woStep(.8, .5, [.74, .08], [55, 46], 40, WO_FLAT, 'hR fR fL'), {via: true, br: 'out'}),
    ext(woStep(.8, .8, [.68, .22], [66, 60], 54, WO_BALL, 'hL tR tL'), {via: true, br: 'in'}),
    ext(woStep(1.1, .8, [.62, .38], [79, 75], 70, WO_BALL, 'hR tR tL'), {via: true, br: 'out'}),
    ext(woStep(1.1, 1.1, [.55, .56], [90, 88], 85, WO_BALL, 'hL tR tL'), {via: true, br: 'in'}),
    ext(woStep(1.375, 1.1, [.47, .76], [96, 96], 93, WO_BALL, 'hR tR tL'), {via: true, br: 'out', fitArm: {r: .95, by: 'p0', span: .06}}),
    ext(WO_PLANK, {br: 'in', on: 'hR tR tL', e: 1}),
    ext(woStep(1.375, 1.1, [.47, .76], [96, 96], 93, WO_BALL, 'hL tR tL'), {via: true, br: 'out', fitArm: {r: .95, by: 'p0', span: .06}}),
    ext(woStep(1.1, 1.1, [.55, .56], [90, 88], 85, WO_BALL, 'hL tR tL'), {via: true, br: 'in'}),
    ext(woStep(.8, 1.1, [.62, .38], [79, 75], 70, WO_BALL, 'hR tR tL'), {via: true, br: 'out'}),
    ext(woStep(.8, .8, [.68, .22], [66, 60], 54, WO_BALL, 'hL tR tL'), {via: true, br: 'in'}),
    ext(woStep(.5, .8, [.74, .08], [55, 46], 40, WO_FLAT, 'hR fR fL'), {via: true, br: 'out'}),
    ext(woStep(.5, .5, [.8, -.12], [42, 26], 22, WO_FLAT, 'fR fL'), {br: 'in'}),
    {br: 'in', via: true, on: 'fR fL', lift: 0, p: [.87, -.12], t: [112, 98], n: 92, rl: WO_FLAT, ll: WO_FLAT, ra: [16, 16, 16], la: [16, 16, 16], hR: 'flat', hL: 'flat', pnR: 'in', pnL: 'in', e: .4}
  ]});

// ---- Variants: each step's figure matches its own words ------------------------------
// Pelvic tilts: lying, knees bent; press the low back gently toward the floor on the out breath, let it return on
// the in breath. A small, smooth movement.
G.define('pelvic-tilt', {name: 'Pelvic Tilts', tempo: 4, glow: {abs: [.7, .7], glutes: [.3, .3]}, cam: {yaw: 6, el: 12, zoom: 1}, props: ['mat'],
  form: [{when: 'out', level: ['root', 'spine02'], say: 'small and smooth', at: 'root', side: -1}],
  k: [ext(ext(BLOW, SUPH), {br: 'out', on: 'hR hL fR fL', rl: FEETB, ll: FEETB, e: .3}),
    ext(ext(BLOW, SUPH), {br: 'in', on: 'hR hL fR fL', t: [-82, -89], rl: FEETB, ll: FEETB, e: .8})]});
// Single-leg glute bridge: one knee lifted and held, press through the other heel to lift the hips, hips level.
var SLB_UP = [150, 92, 172];
G.define('sl-bridge', {name: 'Single-Leg Glute Bridge', tempo: 3, top: [1], hold: .3, glow: {glutes: [.35, 1], hams: [.2, .7], abs: [.3, .3]}, cam: {yaw: 6, el: 12, zoom: 1}, halo: .8, props: ['mat'],
  form: [{when: 'hold', level: ['upperleg01.R', 'upperleg01.L'], say: 'hips level', at: 'root', side: -1}],
  k: [ext(ext(BLOW, SUPH), {br: 'out', on: 'hR hL fR', rl: FEETB, ll: SLB_UP, e: .3}),
    ext(ext(BTOP, SUPH), {br: 'in', on: 'hR hL fR', t: [-61, -69], rl: FEETB, ll: SLB_UP, e: 1})]});
// Dumbbell floor press: on the back, knees bent, a dumbbell in each hand over the chest; lower until the upper arms
// rest on the floor, then press up. (Tempo floor press is the same figure at a slower tempo.)
var FPK = {p: [.1, 0], t: [-89, -90], n: -92, rl: FEETB, ll: FEETB, hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', on: 'b fR fL'};
G.define('floor-press', {name: 'Dumbbell Floor Press', tempo: 3, props: ['mat', 'dumbbells'], glow: {chest: [1, 1], triceps: [.7, .7], delts: [.5, .5]}, cam: {yaw: 14, el: 16, zoom: 1},
  form: [WRIST_STACK],
  k: [ext(FPK, {br: 'out', ra: [62, 180, 180], la: [62, 180, 180], raO: [56, 0, 0], laO: [56, 0, 0], e: .5}),
    ext(FPK, {br: 'in', ra: [178, 178, 178], la: [178, 178, 178], raO: [6, 0, 0], laO: [6, 0, 0], e: 1})]});
// Incline push-up: hands on the edge of a bench (or a sturdy counter or table), body in one long line; lower the
// chest toward the edge, then press away.
var IPK = ext(CLK, {on: 'hR hL tR tL', an: ['toe1-1.*', .025, -.72]});
G.define('incline-push-up', {name: 'Incline Push-Up', tempo: 3, dur: [2, 1], props: [{id: 'bench', z: .82}], glow: {chest: [1, 1], triceps: [.8, .8], delts: [.6, .6], abs: [.3, .3]}, cam: {view: 'side', turn: 24, el: 12, zoom: 1},
  form: [{when: 'always', line: ['foot.R', 'upperarm01.R'], ext: .1, say: 'one long line', at: 'root', side: -1}],
  k: [ext(IPK, {br: 'in', e: .4}), ext(IPK, {br: 'out', fitArm: null, t: [116, 116], n: 114, ra: ext(CLH, {pole: [.6, 0, -1]}), la: ext(CLH, {pole: [.6, 0, -1]}), e: 1})]});
// Pike push-up: hips high, hands and feet on the floor like an upside down V; bend the elbows to bring the top of the
// head toward the floor between the hands, then press up.
var PKH = {dx: .07, y: .055, z: .45, pole: [.4, 0, -1], f: FLAT};
var PIKE = {p: [.86, -.12], t: [44, 44], n: 32, an: ['toe1-1.*', .03, -.52], ra: PKH, la: PKH, hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', rl: [-36, -36, 24, 66], ll: [-36, -36, 24, 66], lo: 4, on: 'hR hL tR tL'};
G.define('pike-push-up', {name: 'Pike Push-Up', tempo: 3, dur: [2, 1], props: ['mat'], glow: {delts: [1, 1], triceps: [.8, .8], upper: [.4, .4], chest: [.3, .3]}, cam: {view: 'side', turn: 20, el: 10, zoom: 1},
  form: [{when: 'out', plumb: ['wrist.R', 'lowerarm01.R'], say: 'elbows over wrists', at: 'lowerarm01.R', side: 1}],
  k: [ext(PIKE, {br: 'in', fitArm: {r: .95, by: 'p0', span: .15}, e: .4}), ext(PIKE, {br: 'out', p: [.74, -.1], t: [30, 30], n: 14, e: 1})]});
// Doorway row: stand in a doorway holding the frame with both hands, lean back with long arms, then pull the chest
// toward the frame. Body straight from heels to head.
var DRH = {x: .27, y: 1.08, z: .46, pole: [1, -1, -.3], f: 90};
var DRK = {b: 'stand', ra: DRH, la: DRH, hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', rl: {x: .11, y: .072, z: .37, f: 72}, ll: {x: .11, y: .072, z: .37, f: 72}, on: 'hR hL fR fL'};
G.define('doorway-row', {name: 'Doorway Row', tempo: 3, dur: [1, 1.3], props: [{id: 'door', z: .48}], glow: {lats: [.8, .8], upper: [1, 1], biceps: [.6, .6], delts: [.4, .4]}, cam: {view: 'side', turn: -30, el: 8, zoom: 1},
  form: [{when: 'in', line: ['foot.R', 'neck01'], say: 'one long line, squeeze', at: 'root', side: -1}],
  k: [ext(DRK, {br: 'out', p: [.88, .1], t: [198, 198], n: 196, fitArm: {r: .96, by: 'p1', span: .1}, e: .4}),
    ext(DRK, {br: 'in', p: [.91, .25], t: [188, 188], n: 187, fitArm: {r: .8, by: 'p1', span: .1}, e: 1})]});
// Band row: a band anchored at chest height in a door ahead; step back, then pull the elbows back past the ribs,
// shoulder blades squeezing, and return slowly.
var BRK = {b: 'stand', p: [.9, -.062], hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in'};
G.define('band-row', {name: 'Band Row', tempo: 3, dur: [1, 1.3], props: [{id: 'band', anchor: [0, 1.15, 1.2]}], glow: {lats: [.8, .8], upper: [1, 1], biceps: [.5, .5], delts: [.4, .4]}, cam: {view: 'three', turn: 15, el: 8, zoom: 1},
  form: [{when: 'in', plumb: ['lowerarm01.R', 'upperleg01.R'], say: 'elbows past the ribs', at: 'neck01', side: 1}],
  k: [ext(BRK, {br: 'out', ra: [88, 88, 88], la: [88, 88, 88], raO: [8, 0, 0], laO: [8, 0, 0], e: .4}),
    ext(BRK, {br: 'in', ra: [-42, 86, 88], la: [-42, 86, 88], raO: [10, 0, 0], laO: [10, 0, 0], e: 1})]});
// Chair dip and bench dip: hands on the front edge behind, fingers forward, feet forward and knees bent; bend the
// elbows straight back to lower a little, then press up. Shoulders stay down and away from the ears.
function dipEdge(edgeZ, props, name){
  var H = {x: .2, y: .48, z: edgeZ, pole: [0, 0, -1], f: 92};
  var K = {ra: H, la: H, hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', rl: {x: .14, y: .072, z: edgeZ + .62, f: 72, pole: [0, 0, 1]}, ll: {x: .14, y: .072, z: edgeZ + .62, f: 72, pole: [0, 0, 1]}, lo: 4, on: 'hR hL fR fL'};
  return {name: name, tempo: 3, dur: [1.3, 1], props: props, glow: {triceps: [1, 1], chest: [.4, .4], delts: [.5, .5]}, cam: {view: 'side', turn: 24, el: 8, zoom: 1},
    form: [{when: 'out', line: ['upperarm01.R', 'lowerarm01.R'], say: 'elbows straight back', at: 'lowerarm01.R', side: -1}],
    k: [ext(K, {br: 'in', p: [.5, edgeZ + .15], t: [178, 178], n: 180, shR: -3, shL: -3, fitArm: {r: .96, by: 'p0', span: .15}, e: .4}),
      ext(K, {br: 'out', p: [.36, edgeZ + .12], t: [174, 174], n: 178, shR: -3, shL: -3, e: 1})]};
}
G.define('chair-dip', dipEdge(.02, ['chair'], 'Chair Dip'));
G.define('bench-dip', dipEdge(-.05, [{id: 'bench', z: -.65}], 'Bench Dip'));
// Plank step-outs: a high plank; one foot steps out to the side and back in, then the other, hips level and still.
var PSO = {reach: null, t: [108, 108], n: 104, ra: PH, la: PH, rl: [-72, -72, 22, 64], ll: [-72, -72, 22, 64], rlO: 3, llO: 3, fitArm: {r: .95, by: 't', span: 10}, an: ['toe1-1.*', .025, -.82]};
G.define('plank-step-out', {name: 'Plank Step-Outs', tempo: 2.4, mirror: true, base: 'plank', glow: {abs: [1, 1], obliques: [.6, .6], glutes: [.6, .6], delts: [.4, .4]}, cam: {view: 'three', turn: 0, el: 18, zoom: 1},
  form: [{when: 'always', level: ['upperleg01.R', 'upperleg01.L'], say: 'hips level and still', at: 'root', side: -1}],
  k: [ext(PSO, {br: 'in', on: 'hR hL tR tL', e: .5}),
    ext(PSO, {br: 'in', via: true, on: 'hR hL tL', rl: [-79, -79, 22, 64], rlO: [10, 10, 4], e: .8}),
    ext(PSO, {br: 'out', on: 'hR hL tR tL', rl: [-71, -71, 22, 64], rlO: [19, 19, 6], e: 1}),
    ext(PSO, {br: 'out', via: true, on: 'hR hL tL', rl: [-79, -79, 22, 64], rlO: [10, 10, 4], e: .8})]});
// Bear crawl: hands and toes, knees hovering a few inches above the floor, back flat; opposite hand and foot step
// together, a few small steps forward, then back.
function bh(z){ return {dx: .02, y: .055, z: z, pole: [.3, 0, -1], f: FLAT}; }
function bf(z){ return {x: .12, y: .13, z: z, f: 40, toe: 90, pole: [0, -1, .6]}; }
function bear(rz, lz, rfz, lfz, pz, on, br, via){ var k = {br: br, p: [.57, pz], t: [99, 99], n: 97, ra: bh(rz), la: bh(lz), rl: bf(rfz), ll: bf(lfz), hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', lift: .07, on: on, e: .8}; if (via) k.via = true; return k; }
G.define('bear-crawl', {name: 'Bear Crawl', tempo: 4, own: true, steps: 4, props: ['mat'], glow: {abs: [1, 1], delts: [.8, .8], quads: [.6, .6], triceps: [.4, .4]}, cam: {view: 'side', turn: 26, el: 16, zoom: 1},
  form: [{when: 'always', line: ['root', 'neck01'], say: 'back flat, knees hover', at: 'spine01', side: -1}],
  k: [bear(.35, .35, -.4, -.4, 0, 'hL tR', 'in'), bear(.5, .35, -.4, -.25, .075, 'hR tL', 'out'), bear(.5, .5, -.25, -.25, .15, 'hL tR', 'in'),
    bear(.35, .5, -.25, -.4, .075, 'hR tL', 'out')]});
// Knee raise on the back pad (the dip tower): back on the pad, forearms on the arm rests, legs hanging; curl the knees
// up toward the chest, then lower slowly.
var TWR = {x: .27, y: 1.33, z: .22, el: [.27, 1.33, -.06], f: 90};
var TWK = {p: [1.12, -.1], t: [181, 182], n: 180, ra: TWR, la: TWR, hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', on: 'eR eL'};
G.define('back-pad-knee-raise', {name: 'Knee Raise on the Back Pad', tempo: 3, dur: [1, 1.5], props: [{id: 'dip', y: 1.3, pad: true}], glow: {abs: [1, 1], flexors: [.8, .8], obliques: [.4, .4]}, cam: {view: 'three', turn: -15, el: 4, zoom: 1},
  form: [{when: 'in', plumb: ['head', 'root'], say: 'back on the pad, lower slowly', at: 'spine01', side: 1}],
  k: [ext(TWK, {br: 'out', rl: [4, -4, 28], ll: [4, -4, 28], e: .4}), ext(TWK, {br: 'in', t: [188, 182], rl: [104, 14, 60], ll: [104, 14, 60], e: 1})]});
// Single-leg hip thrust: upper back on the bench edge, one foot planted, the other knee lifted and held; drive the
// hips up to a flat line, then lower.
var SLHT = ext(HT, {la: {db: [.07, .032, -.062], pole: [1, -.3, 0], f: 92}, ra: DB, hR: 'relax', hL: 'relax', ll: [172, 96, 176], on: 'fR'});
G.define('sl-hip-thrust', {name: 'Single-Leg Hip Thrust', tempo: 3, top: [1], hold: .3, props: [{id: 'bench', z: -.6}], glow: {glutes: [.35, 1], hams: [.2, .6], quads: [0, .3]}, cam: {yaw: 10, el: 10, zoom: 1}, halo: .8,
  form: [{when: 'hold', level: ['upperleg01.R', 'upperleg01.L'], say: 'hips level, flat line', at: 'root', side: -1}],
  k: [ext(SLHT, {br: 'out', p: [.4, .3], t: [-124, -116], n: -112, e: .3}), ext(SLHT, {br: 'in', p: [.4, .3], t: [-92, -92], n: -100, e: 1})]});
// Burpee walk-out: squat down and set the hands on the floor, walk the feet back to a high plank one at a time, walk
// them back in, and stand up with a reach overhead. Smooth and steady, the hands planted while the feet walk.
var BW_H = wh(.5);
function bwf(z, plank){ return plank ? {x: .11, y: .168, z: z - .054, f: 22, toe: 64, pole: [0, -1, .2]} : {x: .11, y: .136, z: z - .103, f: 45, toe: 90, pole: [0, 0, 1]}; }
var BW_SQ = {x: .14, y: .072, z: .02, f: 72, pole: [.3, 0, 1]};
function bwStep(rf, lf, p, t, on, br, via){ var k = ext(WOH, {br: br, p: p, t: t, n: t[1] - 4, ra: BW_H, la: BW_H, rl: rf, ll: lf, lift: .06, fitArm: {r: .95, by: 't', span: 18}, on: on}); if (via) k.via = true; return k; }
G.define('burpee-walk-out', {name: 'Burpee Walk-Out', tempo: 10, own: true, steps: 8, dur: [2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.6, 2], props: ['mat'],
  glow: {abs: [.8, .8], quads: [.7, .7], delts: [.6, .6], glutes: [.5, .5], chest: [.3, .3]}, cam: {view: 'side', turn: 22, el: 12, zoom: 1},
  form: [{when: [.42, .58], line: ['foot.R', 'upperarm01.R'], ext: .1, say: 'one long line', at: 'root', side: -1}],
  k: [
    {b: 'stand', br: 'out', on: 'fR fL', lift: 0, p: [.925, -.062], t: [180, 180], n: 180, rl: BW_SQ, ll: BW_SQ, ra: [4, 8, 8], la: [4, 8, 8], hR: 'flat', hL: 'flat', e: .2},
    ext(bwStep(BW_SQ, BW_SQ, [.44, -.16], [64, 62], 'hL hR fL', 'in'), {n: 74, fitArm: {r: .95, by: 'p0', span: .12}}),
    bwStep(bwf(-.33), BW_SQ, [.6, -.2], [88, 80], 'hL hR tR', 'out', true),
    bwStep(bwf(-.33), bwf(-.33), [.65, -.14], [96, 92], 'hL hR tL', 'in', true),
    bwStep(bwf(-.77, 1), bwf(-.33), [.6, -.06], [102, 100], 'hL hR tR', 'out', true),
    ext(bwStep(bwf(-.77, 1), bwf(-.77, 1), [.47, 0], [106, 106], 'hL hR tL', 'in'), {fitArm: {r: .95, by: 't', span: 12}, e: 1}),
    bwStep(bwf(-.33), bwf(-.77, 1), [.6, -.06], [102, 100], 'hL hR tR', 'out', true),
    bwStep(bwf(-.33), bwf(-.33), [.65, -.14], [96, 92], 'hL hR tL', 'in', true),
    bwStep(BW_SQ, bwf(-.33), [.6, -.2], [88, 80], 'hL hR fR', 'out', true),
    ext(bwStep(BW_SQ, BW_SQ, [.44, -.16], [64, 62], 'fR fL', 'in'), {n: 74, fitArm: {r: .95, by: 'p0', span: .12}}),
    {b: 'stand', br: 'out', on: 'fR fL', lift: 0, p: [.925, -.062], t: [180, 181], n: 182, rl: BW_SQ, ll: BW_SQ, ra: [172, 174, 174], la: [172, 174, 174], hR: 'reach', hL: 'reach', pnR: 'in', pnL: 'in', e: .6}
  ]});

})(window.GG3D);

}catch(e){(window.GG3D_LOADERR=window.GG3D_LOADERR||[]).push("p2.js"+': '+e.message);}
/* p3.js */
try{
// =====================================================================
// GROUNDED FIELD GUIDE (TM): 3D patterns, group PAT3: Flow, Yoga style, Balance, Stretch, seated, and mobility
// (GWG BLD 897). (c) 2026 Grow With Grounded LLC. Proprietary and confidential.
// Plain data: GG3D.define(id, {...}) in the shape patterns/FORMAT.md describes. Angles: 0 points down, 90 forward,
// 180 up, minus 90 back. Meters for the 1.73 m figure (scaled to each body). Side view faces +z.
// Breath leads the body: in on opening or rising, out on folding or settling, Hold on a held pose. Breath led moves
// carry bp (seconds in, out, or in, hold, out) and key lengths that match it, so each key lands on a breath turn:
// key 0 is the pose at the start of the in breath (the settled, exhaled pose), key 1 the pose at its end.
// Held stretches move only a little: the body lengthens on each in breath and eases deeper on each out breath.
// Form guide words name movement only, in a few positive words.
// =====================================================================
var GG3D = window.GG3D = window.GG3D || {q: [], define: function(i, d){ this.q.push([i, d]); }};
(function(G){
'use strict';
var A = function(){ var o = {}; for (var i = 0; i < arguments.length; i++){ var s = arguments[i]; for (var k in s) o[k] = s[k]; } return o; };
// Turns, bends, head turns and tilts, side shifts, and shrugs start at zero in every key, so no key inherits its
// neighbor's value and snaps.
var Z = {tw: 0, lb: 0, hy: 0, ht: 0, px: 0, shR: 0, shL: 0};
var K = function(){ return A.apply(null, [Z].concat([].slice.call(arguments))); };
var R = function(x){ return Math.round(x * 10) / 10; };
var FOOT = function(x, z, f, pole){ var o = {x: x, y: .072, z: z, f: f == null ? 72 : f}; if (pole) o.pole = pole; return o; };
// Breath paces. SLOW: four in, six out, one breath a loop (Flow, Yoga, Balance, Stretch). SLOW2: one breath each way
// for patterns with four keys (two breaths a loop, one side each).
var SLOW = {tempo: 10, bp: [4, 6], dur: [4, 6], rest: 0};
var SLOW2 = {tempo: 20, bp: [4, 6], dur: [4, 6, 4, 6], rest: 0, alt: true};

// ---- Sides ---------------------------------------------------------------
// A one sided hold (switch halfway, each side) is defined twice: id (as the words first say) and id + '-other' (the
// mirror image). Each carries other: the id of its partner, so a player flips sides at the half of a timed hold with
// stage.move(GG3D.get(id).other), and the move blend glides across.
var SWP = {ra: 'la', la: 'ra', rl: 'll', ll: 'rl', hR: 'hL', hL: 'hR', pnR: 'pnL', pnL: 'pnR', shR: 'shL', shL: 'shR', rollR: 'rollL', rollL: 'rollR', raO: 'laO', laO: 'raO', rlO: 'llO', llO: 'rlO'};
var NEGK = ['px', 'yaw', 'tw', 'lb', 'rz', 'hy', 'ht'];
var swapJ = function(v){ return typeof v === 'string' ? v.replace(/\.(L|R)\b/g, function(m, c){ return c === 'L' ? '.R' : '.L'; }) : v; };
var MK = function(k){ var o = {}, a, v, x; for (a in k){ v = k[a]; x = v;
  if (NEGK.indexOf(a) >= 0 && typeof v === 'number') x = -v;
  else if (a === 'on' && typeof v === 'string') x = v.split(' ').map(function(c){ return c.length === 2 ? c[0] + (c[1] === 'R' ? 'L' : c[1] === 'L' ? 'R' : c[1]) : c; }).join(' ');
  else if (a === 'an' && v) x = [swapJ(v[0])].concat(v.slice(1));
  else if (a === 'gl' && v) x = [v[1], v[0]];
  else if ((a === 'fitArm' || a === 'fitLeg') && v && v.side) x = A(v, {side: v.side === 'R' ? 'L' : 'R'});
  o[SWP[a] || a] = x; } return o; };
var MF = function(f){ var o = A(f), a; for (a in o) if (Array.isArray(o[a])) o[a] = o[a].map(swapJ); else o[a] = swapJ(o[a]); return o; };
var TWO = function(id, def){
  var m = A(def), g, k; m.k = def.k.map(MK); m.other = id; m.glow = {};
  for (g in def.glow || {}) m.glow[g] = [def.glow[g][1], def.glow[g][0]];
  m.form = (def.form || []).map(MF);
  if (m.props) m.props = m.props.map(function(pp){ if (typeof pp !== 'object') return pp; var q = A(pp); if (q.at === 'L') q.at = 'R'; else if (q.at === 'R') q.at = 'L'; else if (q.at === 'left') q.at = 'right'; else if (q.at === 'right') q.at = 'left';
    if (Array.isArray(q.anchor)) q.anchor = [-q.anchor[0], q.anchor[1], q.anchor[2]]; return q; });
  G.define(id, A(def, {other: id + '-other'})); G.define(id + '-other', m); };

// ---- Postures ----------------------------------------------------------
// Hands and knees: hands under the shoulders and knees under the hips, all four locked to the mat. The fit keeps the
// arms long on each body.
var H4 = {x: .25, y: .027, z: .44, f: 'flat', pole: [.4, 0, -1]};
var FOURS = {b: 'fours', an: ['lowerleg01.*', .055, .01], ra: H4, la: H4, fitArm: {r: .97, by: 't1'}};
// Seated cross legged on the floor: each foot tucked under the other knee, hands resting on the knees.
var XR = {x: -.12, y: .062, z: .02, f: 78, pole: [1, .2, .35]}, XL = {x: -.15, y: .075, z: .08, f: 78, pole: [1, .2, .35]};
var XH = {x: .34, y: .2, z: .05, f: 70, pole: [1, -.3, -.4]};
var CROSS = {p: [.15, -.28], t: [176, 181], n: 182, rl: XR, ll: XL, ra: XH, la: XH, hR: 'relax', hL: 'relax', pnR: 'down', pnL: 'down', ao: 18, lo: 0, on: 'p'};
var CROSSP = ['mat'];
// On a chair (the seat base): hands resting on the thighs.
var SEAT = {b: 'seat'};
// Lying on the back, knees bent and feet flat.
var BF = {x: .12, y: .075, z: .36, pole: [0, 1, .4], f: 74};
var SUP = {b: 'back', p: [.1, 0], t: [-88, -90], n: -92, rl: BF, ll: BF, ra: [92, 92, 92], la: [92, 92, 92], ao: 12, on: 'p b fR fL'};

// ---- Hands and knees ---------------------------------------------------
// Cat Cow: the chest lifts and the belly softens on the in breath; the back rounds and the chin draws in on the out.
G.define('cat-cow', A(SLOW, {name: 'Cat Cow', props: ['mat'], glow: {back: [.6, .6], abs: [.45, .45]}, cam: {yaw: 8, el: 14, zoom: 1.04},
  form: [{when: 'in', line: ['root', 'spine01'], say: 'chest forward, belly soft', at: 'spine02', side: 1},
    {when: 'out', say: 'round up, chin in', at: 'spine02', side: 1}],
  k: [
    K(FOURS, {br: 'in', t: [118, 86], n: 52, e: .5}),
    K(FOURS, {br: 'out', t: [87, 101], n: 116, e: .8})
  ]}));
// Thread the Needle: from hands and knees the right arm slides under along the mat and that shoulder rests down
// (out breath); the arm then reaches up to the ceiling as the chest opens (in breath). The left hand stays planted.
var TN = K(FOURS, {fitArm: null});
TWO('thread-needle', A(SLOW, {name: 'Thread the Needle', props: ['mat'], glow: {upper: [.6, .6], obliques: [.5, .5], rotator: [0, .5]}, cam: {yaw: 26, el: 18, zoom: 1.02},
  form: [{when: 'out', line: ['knee*', 'root'], say: 'hips stay over knees', at: 'root', side: -1}],
  k: [
    K(TN, {br: 'in', t: [100, 78], n: 70, tw: 42, hy: 30, ra: [2, 2, 2], raO: [-40, -42, -42], pnR: [0, .7, -.7], hR: 'relax', on: 'hL kR kL', e: .8}),
    K(TN, {br: 'out', t: [102, 104], n: 100, tw: -38, hy: -34, ra: [180, 180, 180], raO: [0, 0, 0], pnR: 'back', hR: 'reach', on: 'hL kR kL', e: .6})
  ]}));
// Child's Pose: knees wide, hips back toward the heels, arms long on the mat, forehead down; the back widens on
// each in breath and the hips settle on each out breath.
var CPH = {x: .27, y: .03, z: .72, f: 'flat', pole: [0, 1, 0]};
var CP = {b: 'kneel', an: ['lowerleg01.*', .055, .2], ra: CPH, la: CPH, hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', lo: 6, ao: 10, on: 'hR hL kR kL'};
G.define('child-pose', A(SLOW, {name: "Child's Pose", props: ['mat'], glow: {back: [.5, .5], lats: [.45, .45]}, cam: {yaw: 2, el: 12, zoom: 1.04},
  form: [{when: 'out', say: 'hips sink toward heels', at: 'root', side: -1}],
  k: [
    K(CP, {br: 'in', t: [66, 78], n: 58, rl: [55, -90, -96], ll: [55, -90, -96], e: .7}),
    K(CP, {br: 'out', t: [68, 82], n: 62, rl: [52, -90, -96], ll: [52, -90, -96], e: .5})
  ]}));
// Downward Dog: hands and feet locked, hips up and back in an upside down V, knees soft, head easy between the arms.
// The hips press up and back on each out breath.
var DH = {x: .255, y: .027, z: .45, f: 'flat', pole: [.3, 0, -1]}, DF = FOOT(.12, -.5, 58, [0, 0, 1]);
var DD = {p: [.88, -.19], ra: DH, la: DH, rl: DF, ll: DF, hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', ao: 8, lo: 4, on: 'hR hL fR fL', fitArm: {r: .975, by: 'p0'}};
G.define('down-dog', A(SLOW, {name: 'Downward Dog', props: ['mat'], glow: {hams: [.9, .9], calves: [.7, .7], delts: [.6, .6], lats: [.15, .15]}, cam: {yaw: 6, el: 8, zoom: 1.02},
  form: [{when: 'out', line: ['wrist.R', 'root'], ext: .05, say: 'long spine, hips high', at: 'spine02', side: -1}],
  k: [
    K(DD, {br: 'in', t: [40, 40], n: 22, e: .5}),
    K(DD, {br: 'out', t: [38, 38], n: 20, e: .8})
  ]}));

// ---- Kneeling ----------------------------------------------------------
// Half kneeling, the left knee down and the right foot forward (the guide's words), knee locked to the mat.
var HKL = {p: [.6, -.03], t: [180, 180], n: 180, ra: [4, 8], la: [4, 8], hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in',
  ll: [-8, -90, -96], rl: FOOT(.12, .46, 72, [0, 0, 1]), an: ['lowerleg01.L', .055, -.08], on: 'kL fR'};
var HKP = ['mat'];
// Hip Flexor Stretch: tall through the spine, the hips ease forward on each out breath until the front of the back
// hip opens; hands rest on the front knee.
var HFH = {dx: .02, y: .56, z: .36, f: 96, pole: [.5, -.3, -1]};
TWO('hip-flexor', A(SLOW, {name: 'Hip Flexor Stretch', props: HKP, glow: {flexors: [1, 0], glutes: [.4, 0], quads: [.4, 0]}, cam: {yaw: 0, el: 6, zoom: 1},
  form: [{when: 'out', plumb: ['head', 'root'], say: 'tall spine, hips ease forward', at: 'spine01', side: 1}],
  k: [
    K(HKL, {br: 'in', ll: [-26, -90, -96], t: [178, 181], n: 180, ra: HFH, la: HFH, pnR: 'down', pnL: 'down', e: 1}),
    K(HKL, {br: 'out', ll: [-14, -90, -96], t: [180, 182], n: 181, ra: HFH, la: HFH, pnR: 'down', pnL: 'down', e: .6})
  ]}));
// Ankle Rocks (half kneeling): the front knee travels forward over the toes with the heel down, then eases back.
TWO('ankle-rock', {name: 'Ankle Rocks', tempo: 2.8, props: HKP, glow: {calves: [0, 1]}, cam: {yaw: 0, el: 6, zoom: 1},
  form: [{when: 'out', plumb: ['lowerleg01.R', 'foot.R'], tick: 'foot.R', say: 'knee over toes, heel down', at: 'lowerleg01.R', side: 1}],
  k: [
    K(HKL, {br: 'out', ll: [-6, -90, -96], rl: FOOT(.12, .42, 72, [0, 0, 1]), ra: [6, 74], la: [6, 74], e: .3}),
    K(HKL, {br: 'in', ll: [-28, -90, -96], rl: FOOT(.12, .42, 72, [0, 0, 1]), t: [176, 178], ra: [10, 80], la: [10, 80], e: 1})
  ]});
// Half Kneeling One Arm Press: dumbbell at the left shoulder, on the side of the down knee; press straight up on the
// out breath, lower slowly on the in breath. The left glute stays firm.
TWO('kneel-press', {name: 'Half Kneeling One Arm Press', tempo: 3, top: [1], props: ['mat', {id: 'dumbbell', at: 'L'}],
  glow: {delts: [1, 0], triceps: [.7, 0], abs: [.4, .4], glutes: [.5, 0]}, cam: {yaw: 34, el: 6, zoom: 1},
  form: [{when: 'hold', plumb: ['wrist.L', 'root'], say: 'ribs down, press straight up', at: 'neck01', side: 1}],
  k: [
    K(HKL, {br: 'out', la: [12, 166, 170], laO: 34, hL: 'grip', pnL: 'in', ra: [8, 70], hR: 'relax', e: .3}),
    K(HKL, {br: 'in', la: [176, 178, 180], laO: 10, hL: 'grip', pnL: 'in', ra: [8, 70], hR: 'relax', e: 1})
  ]});
// Half Kneeling Band Chop: band anchored high on the left; both hands start up by the left shoulder and pull down
// across the body toward the right hip (out breath), then return with control (in breath). Hips stay square.
var HC = function(a){ return [[a, a, a], [a, a, a]]; };
var HO = {raO: [-16, -16, -16], laO: [-16, -16, -16]};
TWO('half-kneel-chop', {name: 'Half Kneeling Band Chop', tempo: 2.8, props: ['mat', {id: 'band', anchor: [.75, 2.05, .25], to: 'hands'}],
  glow: {obliques: [1, 1], abs: [.6, .6], lats: [.3, .3]}, cam: {yaw: 40, el: 8, zoom: 1},
  form: [{when: 'out', level: ['upperleg01.L', 'upperleg01.R'], say: 'hips square, chest turns', at: 'root', side: -1}],
  k: [
    K(HKL, {br: 'out', tw: 26, hy: 14, ra: HC(146)[0], la: HC(146)[1], raO: HO.raO, laO: HO.laO, hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', e: .3}),
    K(HKL, {br: 'in', tw: -24, hy: -12, ra: HC(34)[0], la: HC(34)[1], raO: HO.raO, laO: HO.laO, hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', e: 1})
  ]});
// Half Kneeling Band Lift: right knee down, left foot forward (the base); band anchored low on the left; both hands
// start by the left hip and lift up and across past the right shoulder (out breath), then return (in breath).
var HKR = MK(HKL);
TWO('half-kneel-lift', {name: 'Half Kneeling Band Lift', tempo: 2.8, props: ['mat', {id: 'band', anchor: [.75, .1, .25], to: 'hands'}],
  glow: {obliques: [1, 1], abs: [.6, .6], delts: [.4, .4]}, cam: {yaw: 40, el: 8, zoom: 1},
  form: [{when: 'out', level: ['upperleg01.L', 'upperleg01.R'], say: 'hips square, chest turns', at: 'root', side: -1}],
  k: [
    K(HKR, {br: 'out', tw: 22, hy: 12, ra: HC(34)[0], la: HC(34)[1], raO: HO.raO, laO: HO.laO, hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', e: .3}),
    K(HKR, {br: 'in', tw: -26, hy: -16, ra: HC(150)[0], la: HC(150)[1], raO: HO.raO, laO: HO.laO, hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', e: 1})
  ]});

// ---- Standing, breath led ----------------------------------------------
var ST = {b: 'stand', t: [180, 181], n: 182};
G.define('standing', A(SLOW, {name: 'Standing', glow: {}, cam: {yaw: 28, el: 6, zoom: 1}, form: [{when: 'in', plumb: ['head', 'foot.R'], say: 'stand tall, knees soft', at: 'spine01', side: 1}],
  k: [K(ST, {br: 'in', e: .2}), K(ST, {br: 'out', t: [180, 182], n: 183, ra: [8, 12], la: [8, 12], ao: 12, e: .2})]}));
G.define('stand-breath', A(SLOW, {name: 'Standing Breath', glow: {}, cam: {yaw: 28, el: 6, zoom: 1}, form: [{when: 'out', say: 'long, slow breath out', at: 'spine01', side: 1}],
  k: [K(ST, {br: 'in', p: [.925, -.062], e: .2}), K(ST, {br: 'out', p: [.93, -.062], t: [180, 183], n: 183, ra: [10, 14], la: [10, 14], ao: 16, e: .2})]}));
// Arms rise in front and overhead on the in breath and float down on the out breath.
G.define('arms-up', A(SLOW, {name: 'Arms Up', glow: {delts: [.5, .5], lats: [.4, .4]}, cam: {yaw: 30, el: 6, zoom: 1},
  form: [{when: 'out', plumb: ['head', 'foot.R'], say: 'ribs soft, shoulders down', at: 'neck01', side: 1}],
  k: [K(ST, {br: 'in', e: .2}), K(ST, {br: 'out', t: [180, 182], n: 184, ra: [174, 176], la: [174, 176], pnR: 'in', pnL: 'in', hR: 'reach', hL: 'reach', ao: 14, e: .8})]}));
// Forward Fold: knees soft, fold from the hips on the out breath, rise with a long spine on the in breath.
G.define('forward-fold', A(SLOW, {name: 'Forward Fold', glow: {hams: [.7, .7], back: [.4, .4]}, cam: {yaw: 24, el: 8, zoom: 1},
  form: [{when: 'out', plumb: ['lowerleg01.R', 'foot.R'], say: 'knees soft, fold from the hips', at: 'root', side: -1}],
  k: [
    K(ST, {br: 'in', p: [.86, -.16], t: [80, 44], n: 22, ra: [4, 6], la: [4, 6], rl: FOOT(.12, 0, 72, [0, 0, 1]), ll: FOOT(.12, 0, 72, [0, 0, 1]), ao: 6, e: 1}),
    K(ST, {br: 'out', e: .2})
  ]}));
// Side Reach: the right arm reaches up and the body leans gently left on the out breath; back to center with the left
// arm rising on the in breath; then the other side.
var UPS = {a: [0, 0, 0], o: [174, 180, 184]}, DNS = {a: [4, 8, 10], o: [10, 10, 10]};
var SBU = function(side){ return side > 0 ? {ra: UPS.a, raO: UPS.o, la: DNS.a, laO: DNS.o} : {la: UPS.a, laO: UPS.o, ra: DNS.a, raO: DNS.o}; };
G.define('side-bend', A(SLOW2, {name: 'Side Reach', glow: {obliques: [.7, .7], lats: [.6, .6]}, cam: {view: 'front', el: 6, zoom: 1},
  form: [{when: 'out', level: ['upperleg01.L', 'upperleg01.R'], say: 'hips steady, reach long', at: 'root', side: 1}],
  k: [
    K(ST, SBU(1), {br: 'in', lb: 20, ht: 6, px: -.02, hR: 'reach', pnR: 'fwd', e: 1}),
    K(ST, SBU(-1), {br: 'out', hL: 'reach', pnL: 'fwd', e: .5}),
    K(ST, SBU(-1), {br: 'in', lb: -20, ht: -6, px: .02, hL: 'reach', pnL: 'fwd', e: 1}),
    K(ST, SBU(1), {br: 'out', hR: 'reach', pnR: 'fwd', e: .5})
  ]}));
// Turn and Let the Arms Follow: the chest turns gently right and left from the waist, feet steady, arms loose.
G.define('stand-twist', A(SLOW, {name: 'Standing Twist', glow: {obliques: [.6, .6], back: [.3, .3]}, cam: {yaw: 50, el: 10, zoom: 1},
  form: [{when: 'in out', level: ['upperleg01.L', 'upperleg01.R'], say: 'hips steady, chest turns', at: 'root', side: 1}],
  k: [
    K(ST, {br: 'in', tw: -38, hy: -18, ra: [-14, 4], la: [22, 70], raO: 20, laO: -14, e: .6}),
    K(ST, {br: 'out', tw: 38, hy: 18, la: [-14, 4], ra: [22, 70], laO: 20, raO: -14, e: .6})
  ]}));
// Shoulder Rolls: shoulders rise toward the ears on the in breath and drop easy on the out breath.
G.define('stand-shrug', A(SLOW, {name: 'Shoulder Rolls', glow: {neck: [.4, .4], upper: [.4, .4]}, cam: {yaw: 30, el: 6, zoom: 1},
  form: [{when: 'out', say: 'shoulders drop, easy and slow', at: 'neck01', side: 1}],
  k: [K(ST, {br: 'in', e: .2}), K(ST, {br: 'out', shR: 24, shL: 24, e: .7})]}));
// Neck Release: one ear tips toward its shoulder (out breath), back through center (in breath), then the other side.
G.define('stand-neck', A(SLOW2, {name: 'Neck Release', glow: {neck: [.6, .6]}, cam: {view: 'front', el: 4, zoom: 1},
  form: [{when: 'out', level: ['upperarm01.L', 'upperarm01.R'], say: 'shoulders soft and level', at: 'neck01', side: 1}],
  k: [
    K(ST, {br: 'in', ht: -26, n: 176, e: .7}), K(ST, {br: 'out', e: .2}),
    K(ST, {br: 'in', ht: 26, n: 176, e: .7}), K(ST, {br: 'out', e: .2})
  ]}));
// Small arm circles, arms long at shoulder height, palms down. The hands trace small even circles (angles that rise
// and fall and swing forward and back, so the loop closes with no wrap).
var CIRC = function(base){ var k = [], i, th; for (i = 0; i < 8; i++){ th = i * 45 * Math.PI / 180;
  var a = R(90 + 16 * Math.sin(th)), o = R(76 + 12 * Math.cos(th));
  k.push(K(base, {br: i < 4 ? 'in' : 'out', via: true, ra: [a, a, a], la: [a, a, a], raO: [o, o, o], laO: [o, o, o], hR: 'reach', hL: 'reach', pnR: 'down', pnL: 'down', e: .7})); }
  return k; };
G.define('arm-circles', {name: 'Arm Circles', tempo: 2.4, rest: 0, glow: {delts: [.8, .8], rotator: [.5, .5]}, cam: {view: 'front', turn: -20, el: 8, zoom: 1},
  form: [{when: 'always', level: ['wrist.L', 'wrist.R'], say: 'arms long, shoulders down', at: 'neck01', side: 1}],
  k: CIRC(ST)});
// Dowel Pass-Through: a wide grip, straight arms; over the top and behind as far as feels smooth on the in breath,
// back over the top on the out breath. Ribs stay down.
var PT = function(a){
  return {ra: [a, a, a], la: [a, a, a], raO: 32, laO: 32, hR: 'grip', hL: 'grip'}; };
G.define('pass-through', {name: 'Dowel Pass-Through', tempo: 4, props: [{id: 'dowel', at: 'hands'}], glow: {delts: [.7, .7], chest: [.4, .4], rotator: [.5, .5]}, cam: {yaw: 22, el: 6, zoom: 1},
  form: [{when: 'in', plumb: ['head', 'foot.R'], say: 'ribs down, arms long', at: 'spine01', side: -1}],
  k: [
    K(ST, PT(22), {br: 'in', e: .3}),
    K(ST, PT(180), {br: 'in', via: true, e: .7}),
    K(ST, PT(224), {br: 'out', e: 1}),
    K(ST, PT(180), {br: 'out', via: true, e: .7})
  ]});
// Hug and Open: arms swing open wide (in breath), then wrap across the chest in a big hug (out breath).
var HUG = {ra: [90, 92, 92], la: [84, 86, 86], raO: [-8, -80, -86], laO: [-6, -76, -82], pnR: 'in', pnL: 'in', hR: 'relax', hL: 'relax'};
G.define('hug-open', {name: 'Hug and Open', tempo: 2.6, glow: {chest: [.6, .6], upper: [.7, .7], delts: [.4, .4]}, cam: {yaw: 40, el: 10, zoom: 1},
  form: [{when: 'in', say: 'chest open, shoulders down', at: 'neck01', side: 1}],
  k: [
    K(ST, HUG, {br: 'in', e: .4}),
    K(ST, {br: 'out', ra: [90, 92, 92], la: [90, 92, 92], raO: [82, 82, 82], laO: [82, 82, 82], pnR: 'fwd', pnL: 'fwd', hR: 'reach', hL: 'reach', e: 1})
  ]});
// Band Pull-Apart: arms straight at chest height; pull the band apart to the chest and squeeze the shoulder blades
// (out breath, held a count), return slowly (in breath).
G.define('pull-apart', {name: 'Band Pull-Apart', tempo: 2.6, top: [1], props: [{id: 'band', anchor: 'hands', to: 'hands'}], glow: {upper: [1, 1], rotator: [.6, .6], delts: [.5, .5]}, cam: {yaw: 50, el: 12, zoom: 1},
  form: [{when: 'hold', level: ['wrist.L', 'wrist.R'], say: 'squeeze, shoulders low', at: 'neck01', side: 1}],
  k: [
    K(ST, {br: 'out', ra: [88, 90, 90], la: [88, 90, 90], raO: 14, laO: 14, hR: 'grip', hL: 'grip', pnR: 'down', pnL: 'down', e: .3}),
    K(ST, {br: 'in', ra: [90, 92, 92], la: [90, 92, 92], raO: 86, laO: 86, shR: -3, shL: -3, hR: 'grip', hL: 'grip', pnR: 'down', pnL: 'down', e: 1})
  ]});
// Wall Slides: back on the wall, arms in a goal post; slide up as high as feels smooth on the out breath, back down
// on the in breath. Elbows and backs of the hands stay on the wall.
var WS = function(x, y){ return {ra: {x: x, y: y, z: -.3, f: 180, pole: [1, -.6, -.2]}, la: {x: x, y: y, z: -.3, f: 180, pole: [1, -.6, -.2]}, hR: 'relax', hL: 'relax', pnR: 'fwd', pnL: 'fwd'}; };
G.define('wall-slide', {name: 'Wall Slides', tempo: 3.2, props: [{id: 'wall', at: 'back', d: .3}], glow: {upper: [.8, .8], delts: [.5, .5], lats: [.3, .3]}, cam: {yaw: 60, el: 8, zoom: 1},
  form: [{when: 'out', line: ['root', 'neck01'], say: 'ribs down, back on the wall', at: 'spine01', side: 1}],
  k: [
    K(ST, WS(.42, 1.52), {br: 'out', p: [.9, -.16], t: [178, 179], rl: FOOT(.12, .08), ll: FOOT(.12, .08), e: .3}),
    K(ST, WS(.26, 1.86), {br: 'in', p: [.9, -.16], t: [178, 179], rl: FOOT(.12, .08), ll: FOOT(.12, .08), e: 1})
  ]});
// Ankle Rocks (standing at a wall): hands on the wall, the front knee bends forward toward the wall, heel down.
var WH = {x: .2, y: 1.2, z: .5, f: 176, pole: [.4, -1, -.3]};
TWO('stand-ankle-rock', {name: 'Ankle Rocks', tempo: 2.8, props: [{id: 'wall', at: 'front', d: .53}], glow: {calves: [1, .3]}, cam: {yaw: 0, el: 6, zoom: 1},
  form: [{when: 'out', plumb: ['lowerleg01.L', 'foot.L'], tick: 'foot.L', say: 'knee forward, heel down', at: 'lowerleg01.L', side: 1}],
  k: [
    K(ST, {br: 'out', p: [.88, -.04], ll: FOOT(.11, .22), rl: FOOT(.11, -.28, 76), ra: WH, la: WH, hR: 'flat', hL: 'flat', pnR: 'fwd', pnL: 'fwd', on: 'fR fL hR hL', e: .3}),
    K(ST, {br: 'in', p: [.85, .03], t: [176, 178], ll: FOOT(.11, .22, 72, [0, 0, 1]), rl: FOOT(.11, -.28, 76), ra: WH, la: WH, hR: 'flat', hL: 'flat', pnR: 'fwd', pnL: 'fwd', on: 'fR fL hR hL', e: 1})
  ]});
// World's Greatest Stretch: a long lunge, back knee down, right hand on the mat inside the left foot; the left arm
// rotates up to the ceiling as the chest opens (in breath), then returns (out breath).
var WG = {p: [.5, -.1], ll: FOOT(.13, .55, 72, [0, 0, 1]), rl: [-34, -90, -96], an: ['lowerleg01.R', .055, -.34], ra: {x: .06, y: .03, z: .52, f: 'flat', pole: [.5, 0, -1]}, hR: 'flat', pnR: 'down', on: 'fL kR hR', fitArm: {r: .96, by: 't1', side: 'R'}};
TWO('stretch', A(SLOW, {name: "World's Greatest Stretch", props: ['mat'], glow: {flexors: [0, .8], obliques: [.5, .5], upper: [.4, .4], hams: [.4, 0]}, cam: {yaw: 30, el: 14, zoom: 1},
  form: [{when: 'out', line: ['foot.R', 'root'], say: 'long back leg, chest opens', at: 'root', side: -1}],
  k: [
    K(WG, {br: 'in', t: [128, 112], n: 108, la: {x: .2, y: .03, z: .7, f: 'flat', pole: [.5, 0, -1]}, hL: 'flat', pnL: 'down', on: 'fL kR hR hL', e: .6}),
    K(WG, {br: 'out', t: [130, 116], n: 118, tw: 48, hy: 40, la: [180, 180, 180], hL: 'reach', pnL: 'fwd', e: 1})
  ]}));

// ---- Seated on a chair -------------------------------------------------
G.define('seat', A(SLOW, {name: 'Seated', props: ['chair'], glow: {}, cam: {yaw: 30, el: 8, zoom: 1},
  form: [{when: 'in', plumb: ['head', 'root'], say: 'sit tall, feet flat', at: 'spine01', side: 1}],
  k: [K(SEAT, {br: 'in', e: .2}), K(SEAT, {br: 'out', t: [181, 183], n: 183, e: .2})]}));
// Seated Cat Cow: hands on the knees, chest lifts forward on the in breath, back rounds on the out breath.
var CK = {dx: .02, y: .56, z: .28, f: 100, pole: [.5, -.4, -1]};
G.define('spinal-flex', A(SLOW, {name: 'Seated Cat Cow', props: ['chair'], glow: {back: [.6, .6], abs: [.4, .4]}, cam: {yaw: 12, el: 8, zoom: 1.04},
  form: [{when: 'in', say: 'chest lifts forward', at: 'spine01', side: 1}, {when: 'out', say: 'round back, chin in', at: 'spine01', side: 1}],
  k: [
    K(SEAT, {br: 'in', t: [192, 158], n: 136, ra: CK, la: CK, e: .5}),
    K(SEAT, {br: 'out', t: [172, 180], n: 188, ra: CK, la: CK, e: .8})
  ]}));
// Seated Forward Fold: hands walk down the shins and the chest rests toward the thighs on the out breath.
var SFH = {dx: .03, y: .2, z: .36, f: 40, pole: [.4, 0, -1]};
G.define('seat-fold', A(SLOW, {name: 'Seated Forward Fold', props: ['chair'], glow: {back: [.6, .6], hams: [.3, .3]}, cam: {yaw: 22, el: 10, zoom: 1},
  form: [{when: 'out', say: 'fold slowly, neck long', at: 'spine01', side: 1}],
  k: [
    K(SEAT, {br: 'in', t: [124, 104], n: 94, ra: SFH, la: SFH, e: 1}),
    K(SEAT, {br: 'out', ra: {dx: .03, y: .6, z: .12, f: 92, pole: [.4, 0, -1]}, la: {dx: .03, y: .6, z: .12, f: 92, pole: [.4, 0, -1]}, e: .2})
  ]}));
// Ankle Pumps: feet a little forward, heels stay down while the toes point and pull back.
var APF = function(f){ return {x: .12, y: .085, z: .48, f: f, pole: [0, 1, 1]}; };
G.define('ankle-pumps', {name: 'Ankle Pumps', tempo: 2, base: 'seat', glow: {calves: [.8, .8]}, cam: {yaw: 34, el: 10, zoom: 1},
  form: [{when: 'always', say: 'heels stay down', at: 'foot.R', side: 1}],
  k: [{br: 'in', rl: APF(52), ll: APF(52), e: .9}, {br: 'out', rl: APF(118), ll: APF(118), e: .4}]});
// Seated March: one knee lifts, then the other; the arms swing easy.
G.define('seat-march', {name: 'Seated March', tempo: 2.6, alt: true, base: 'seat', glow: {flexors: [.7, .7], abs: [.3, .3]}, sideGlow: 'flexors', cam: {yaw: 34, el: 8, zoom: 1},
  form: [{when: 'always', plumb: ['head', 'root'], say: 'sit tall', at: 'spine01', side: 1}],
  k: [
    {br: 'out', ra: [-12, 60], la: [14, 76], e: .3, gl: [0, 0], on: 'p fR fL'},
    {br: 'in', rl: [112, 20, 96], ra: [16, 82], la: [-14, 56], e: 1, gl: [0, 1], on: 'p fL'},
    {br: 'out', ra: [-12, 60], la: [14, 76], e: .3, gl: [0, 0], on: 'p fR fL'},
    {br: 'in', ll: [112, 20, 96], ra: [-14, 56], la: [16, 82], e: 1, gl: [1, 0], on: 'p fR'}
  ]});
// Seated Arm Circles: the same small circles, seated tall.
G.define('seat-arm-circles', {name: 'Seated Arm Circles', props: ['chair'], tempo: 2.4, rest: 0, glow: {delts: [.8, .8], rotator: [.5, .5]}, cam: {view: 'front', turn: -20, el: 8, zoom: 1},
  form: [{when: 'always', level: ['wrist.L', 'wrist.R'], say: 'arms long, sit tall', at: 'neck01', side: 1}],
  k: CIRC(SEAT)});
// Seated Overhead Press: from the shoulders, press up on the out breath, lower slowly on the in breath.
G.define('seat-press', {name: 'Seated Overhead Press', tempo: 3, top: [1], base: 'seat', props: ['chair', 'dumbbells'], glow: {delts: [1, 1], triceps: [.7, .7], upper: [.3, .3]}, cam: {yaw: 30, el: 6, zoom: 1},
  form: [{when: 'hold', plumb: ['wrist.R', 'root'], say: 'ribs down, press straight up', at: 'neck01', side: 1}],
  k: [
    {br: 'out', ra: [14, 168, 172], la: [14, 168, 172], raO: 44, laO: 44, hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: .3},
    {br: 'in', ra: [174, 178, 180], la: [174, 178, 180], raO: 16, laO: 16, hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', e: 1}
  ]});
// Lat Pulldown (seated): from arms long overhead, pull the bar to the upper chest leading with the elbows (out
// breath), let it rise slowly (in breath).
G.define('seat-pulldown', {name: 'Lat Pulldown', tempo: 2.8, base: 'seat', props: ['chair', {id: 'cable', from: [0, 2.1, .1], to: 'hands'}], glow: {lats: [1, 1], biceps: [.6, .6], upper: [.5, .5]}, cam: {yaw: 56, el: 8, zoom: 1},
  form: [{when: 'out', say: 'chest proud, elbows down', at: 'spine01', side: 1}],
  k: [
    {br: 'out', t: [182, 182], ra: [168, 172, 176], la: [168, 172, 176], raO: 22, laO: 22, hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: .3},
    {br: 'in', t: [180, 176], n: 180, ra: [-8, 158, 170], la: [-8, 158, 170], raO: 34, laO: 34, hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', e: 1}
  ]});
// Leg Press: back and hips on the pad, feet hip width on the plate; press through the whole foot (out breath),
// lower until the knees bend to about a right angle (in breath). Knees stay soft at the top.
var LPF = function(y, z){ return {x: .12, y: y, z: z, f: 184, pole: [0, .3, 1]}; };
G.define('leg-press', {name: 'Leg Press', tempo: 3, props: ['leg-press'], glow: {quads: [1, 1], glutes: [.8, .8]}, cam: {yaw: 6, el: 8, zoom: 1},
  form: [{when: 'out', plumb: ['lowerleg01.R', 'foot.R'], say: 'knees in line with toes', at: 'lowerleg01.R', side: 1}],
  k: [
    {br: 'out', p: [.42, -.2], t: [-136, -138], n: -142, rl: LPF(.62, .32), ll: LPF(.62, .32), ra: [20, 40], la: [20, 40], hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', ao: 18, lo: 6, on: 'p b', e: .4},
    {br: 'in', p: [.42, -.2], t: [-136, -138], n: -142, rl: LPF(.72, .6), ll: LPF(.72, .6), ra: [20, 40], la: [20, 40], hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', ao: 18, lo: 6, on: 'p b', e: 1}
  ]});
// Stationary Bike: seated, hands on the bars, the pedals turn in an even circle. Breath on its own easy pace.
var BK = function(th, side){ var a = (th + (side > 0 ? 180 : 0)) * Math.PI / 180; return {x: .13, y: Math.round((.3 - .17 * Math.cos(a)) * 1000) / 1000, z: Math.round((.22 + .17 * Math.sin(a)) * 1000) / 1000, f: R(80 - 18 * Math.sin(a)), pole: [0, .2, 1]}; };
var BIKE = function(){ var k = [], i; for (i = 0; i < 8; i++) k.push({br: i < 4 ? 'in' : 'out', via: true, p: [.86, -.22], t: [158, 150], n: 158, rl: BK(i * 45, -1), ll: BK(i * 45, 1),
  ra: {x: .2, y: 1.05, z: .45, f: 90, pole: [.3, -.4, -1]}, la: {x: .2, y: 1.05, z: .45, f: 90, pole: [.3, -.4, -1]}, hR: 'grip', hL: 'grip', pnR: 'down', pnL: 'down', ao: 12, lo: 3, on: 'p hR hL', e: .7}); return k; };
G.define('bike', {name: 'Stationary Bike', tempo: 1.8, rest: 0, bp: [3, 3], props: ['bike'], glow: {quads: [.8, .8], glutes: [.5, .5], calves: [.4, .4]}, cam: {yaw: 4, el: 8, zoom: 1},
  form: [{when: 'always', line: ['root', 'neck01'], say: 'long spine, easy shoulders', at: 'spine01', side: -1}],
  k: BIKE()});

// ---- Seated on the floor -------------------------------------------------
G.define('cross-seat', A(SLOW, {name: 'Cross Legged Seat', props: CROSSP, glow: {}, cam: {yaw: 34, el: 12, zoom: 1},
  form: [{when: 'in', plumb: ['head', 'root'], say: 'spine tall, shoulders soft', at: 'spine01', side: 1}],
  k: [K(CROSS, {br: 'in', e: .2}), K(CROSS, {br: 'out', t: [177, 183], n: 183, e: .2})]}));
G.define('breath', A(SLOW, {name: 'Seated Breath', props: CROSSP, glow: {}, cam: {yaw: 34, el: 12, zoom: 1},
  form: [{when: 'out', say: 'long, slow breath out', at: 'spine01', side: 1}],
  k: [K(CROSS, {br: 'in', e: .2}), K(CROSS, {br: 'out', t: [176, 184], n: 184, ao: 22, e: .2})]}));
G.define('shrug', A(SLOW, {name: 'Shoulder Rolls', props: CROSSP, glow: {neck: [.4, .4], upper: [.4, .4]}, cam: {yaw: 30, el: 8, zoom: 1},
  form: [{when: 'out', say: 'shoulders drop, easy and slow', at: 'neck01', side: 1}],
  k: [K(CROSS, {br: 'in', e: .2}), K(CROSS, {br: 'out', shR: 24, shL: 24, e: .7})]}));
G.define('neck', A(SLOW2, {name: 'Neck Release', props: CROSSP, glow: {neck: [.6, .6]}, cam: {view: 'front', el: 6, zoom: 1},
  form: [{when: 'out', level: ['upperarm01.L', 'upperarm01.R'], say: 'shoulders soft and level', at: 'neck01', side: 1}],
  k: [
    K(CROSS, {br: 'in', ht: -26, n: 176, e: .7}), K(CROSS, {br: 'out', e: .2}),
    K(CROSS, {br: 'in', ht: 26, n: 176, e: .7}), K(CROSS, {br: 'out', e: .2})
  ]}));
// Seated Twist: turned gently right with the left hand on the right knee, back to center on the in breath, turn left
// on the out breath, back to center, turn right.
var TW = function(side){ return side < 0 ? {tw: -34, hy: -24, la: {x: -.3, y: .22, z: .06, f: 60, pole: [1, -.4, -.3]}, ra: [-22, -20, -14], raO: [18, 18, 18], hR: 'relax', pnR: 'in'}
  : {tw: 34, hy: 24, ra: {x: -.3, y: .22, z: .06, f: 60, pole: [1, -.4, -.3]}, la: [-22, -20, -14], laO: [18, 18, 18], hL: 'relax', pnL: 'in'}; };
G.define('twist', A(SLOW2, {name: 'Seated Twist', props: CROSSP, glow: {obliques: [.7, .7], back: [.3, .3]}, cam: {yaw: 60, el: 14, zoom: 1},
  form: [{when: 'out', plumb: ['head', 'root'], say: 'sit tall, turn gently', at: 'spine01', side: 1}],
  k: [
    K(CROSS, TW(-1), {br: 'in', e: .8}), K(CROSS, {br: 'out', t: [177, 183], e: .2}),
    K(CROSS, TW(1), {br: 'in', e: .8}), K(CROSS, {br: 'out', t: [177, 183], e: .2})
  ]}));
// Seated Side Reach: the right arm reaches up and over as the body leans gently left (out breath); center with the
// left arm rising (in breath); then the other side. Both sit bones stay down.
G.define('seat-side-bend', A(SLOW2, {name: 'Seated Side Reach', props: CROSSP, glow: {obliques: [.7, .7], lats: [.6, .6]}, cam: {view: 'front', el: 8, zoom: 1},
  form: [{when: 'out', level: ['upperleg01.L', 'upperleg01.R'], say: 'sit bones down, reach long', at: 'root', side: 1}],
  k: [
    K(CROSS, {br: 'in', lb: 22, ht: 6, ra: UPS.a, raO: UPS.o, hR: 'reach', pnR: 'fwd', la: [12, 22, 30], laO: [26, 26, 26], hL: 'relax', e: 1}),
    K(CROSS, {br: 'out', la: UPS.a, laO: UPS.o, hL: 'reach', pnL: 'fwd', ra: [12, 22, 30], raO: [26, 26, 26], hR: 'relax', e: .5}),
    K(CROSS, {br: 'in', lb: -22, ht: -6, la: UPS.a, laO: UPS.o, hL: 'reach', pnL: 'fwd', ra: [12, 22, 30], raO: [26, 26, 26], hR: 'relax', e: 1}),
    K(CROSS, {br: 'out', ra: UPS.a, raO: UPS.o, hR: 'reach', pnR: 'fwd', la: [12, 22, 30], laO: [26, 26, 26], hL: 'relax', e: .5})
  ]}));
// Seated Overhead Reach: arms rise forward and overhead on the in breath and float down on the out breath.
G.define('seat-arms-up', A(SLOW, {name: 'Seated Overhead Reach', props: CROSSP, glow: {delts: [.5, .5], lats: [.4, .4]}, cam: {yaw: 30, el: 10, zoom: 1},
  form: [{when: 'out', plumb: ['head', 'root'], say: 'sit tall, shoulders down', at: 'neck01', side: 1}],
  k: [K(CROSS, {br: 'in', ra: [22, 62], la: [22, 62], e: .2}), K(CROSS, {br: 'out', t: [177, 183], n: 184, ra: [168, 174], la: [168, 174], raO: 10, laO: 10, hR: 'reach', hL: 'reach', pnR: 'in', pnL: 'in', e: .8})]}));
// Hip Switches: sitting with knees bent, feet wide, hands behind; both knees fall slowly to the right (out breath),
// back through the middle (in breath), then to the left.
var HS = function(s){ var fR = {x: .3, y: .072, z: .3, f: 70, pole: s === 0 ? [.2, 1, .3] : [s < 0 ? 1 : -1, .3, .3]},
  fL = {x: .3, y: .072, z: .3, f: 70, pole: s === 0 ? [.2, 1, .3] : [s < 0 ? -1 : 1, .3, .3]}; return {rl: fR, ll: fL}; };
var HSB = {b: 'floor', t: [160, 166], n: 170, ra: {x: .22, y: .03, z: -.5, f: -84, pole: [.3, 0, 1]}, la: {x: .22, y: .03, z: -.5, f: -84, pole: [.3, 0, 1]}, hR: 'flat', hL: 'flat', pnR: 'down', pnL: 'down', on: 'p hR hL fR fL'};
G.define('hip-switch', {name: 'Hip Switches', props: ['mat'], tempo: 3, alt: true, glow: {glutes: [.5, .5], adductors: [.4, .4], obliques: [.4, .4]}, cam: {view: 'front', turn: -30, el: 20, zoom: 1},
  form: [{when: 'out', say: 'knees fall slowly, chest tall', at: 'spine01', side: 1}],
  k: [
    K(HSB, HS(0), {br: 'out', e: .3}), K(HSB, HS(-1), {br: 'in', e: .9}),
    K(HSB, HS(0), {br: 'out', e: .3}), K(HSB, HS(1), {br: 'in', e: .9})
  ]});
// Seated Hamstring Reach: legs long, a tall seat, hands toward the shins; the fold eases a little deeper on each out
// breath and the chest lifts a little on each in breath.
var LNH = function(y, z){ return {dx: .03, y: y, z: z, f: 60, pole: [.4, 0, -1]}; };
G.define('life-nerve', A(SLOW, {name: 'Seated Hamstring Reach', props: ['mat'], glow: {hams: [.8, .8], back: [.3, .3]}, cam: {yaw: 14, el: 10, zoom: 1},
  form: [{when: 'in', line: ['root', 'spine01'], say: 'long back, fold from the hips', at: 'spine01', side: 1}],
  k: [
    {b: 'floor', br: 'in', t: [130, 112], n: 102, ra: LNH(.2, .4), la: LNH(.2, .4), hR: 'relax', hL: 'relax', e: 1},
    {b: 'floor', br: 'out', t: [140, 126], n: 120, ra: LNH(.21, .36), la: LNH(.21, .36), hR: 'relax', hL: 'relax', e: .7}
  ]}));
// Seated Row (cable): legs long and knees soft, chest proud; pull the handle to the belly and squeeze the shoulder
// blades (out breath), let it return slowly (in breath).
G.define('seat-row', {name: 'Seated Row', tempo: 2.8, props: ['mat', {id: 'cable', from: [0, .32, 1.1], to: 'hands'}], glow: {lats: [1, 1], upper: [.8, .8], biceps: [.5, .5]}, cam: {yaw: 10, el: 8, zoom: 1},
  form: [{when: 'out', line: ['root', 'neck01'], say: 'chest proud, tall spine', at: 'spine01', side: -1}],
  k: [
    {b: 'floor', br: 'out', shR: 0, shL: 0, t: [174, 176], rl: [86, 98, 168], ll: [86, 98, 168], ra: [86, 88, 90], la: [86, 88, 90], hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', ao: 8, e: .3},
    {b: 'floor', br: 'in', t: [182, 182], rl: [86, 98, 168], ll: [86, 98, 168], ra: [-34, 84, 90], la: [-34, 84, 90], hR: 'grip', hL: 'grip', pnR: 'in', pnL: 'in', ao: 12, shR: -2, shL: -2, e: 1}
  ]});

// ---- Lying ---------------------------------------------------------------
var LL = [92, 92, 150];
G.define('lie', A(SLOW, {name: 'Resting on the Back', props: ['mat'], glow: {}, cam: {yaw: 10, el: 22, zoom: 1},
  form: [{when: 'out', say: 'heavy and easy', at: 'root', side: -1}],
  k: [K(SUP, {br: 'in', rl: LL, ll: LL, lo: 8, ra: [94, 94, 94], la: [94, 94, 94], pnR: 'up', pnL: 'up', ao: 20, on: 'p b', e: .1}),
    K(SUP, {br: 'out', t: [-88, -91], rl: LL, ll: LL, lo: 8, ra: [94, 94, 94], la: [94, 94, 94], pnR: 'up', pnL: 'up', ao: 20, on: 'p b', e: .1})]}));
// Figure Four: on the back, the right ankle crossed over the left knee; both legs draw in gently, hands behind the
// left thigh. The legs ease in a little on each out breath.
var F4 = function(d){ return {ll: [192 + d, 96 + d * .5, 150], rl: {x: -.07, y: Math.round((.61 + d * .002) * 1000) / 1000, z: Math.round((-.07 - d * .008) * 1000) / 1000, f: 150, pole: [1, .3, .4]},
  ra: {x: .02, y: .36, z: -.02, f: 120, pole: [.6, -.3, -1]}, la: {x: .16, y: .36, z: -.02, f: 120, pole: [.6, -.3, -1]}, hR: 'grip', hL: 'grip', pnR: 'back', pnL: 'back'}; };
TWO('figure-4', A(SLOW, {name: 'Figure Four Stretch', props: ['mat'], glow: {glutes: [0, .9], back: [.2, .2]}, cam: {yaw: 0, el: 16, zoom: 1},
  form: [{when: 'out', say: 'knee opens, head rests down', at: 'root', side: -1}],
  k: [K(SUP, F4(4), {br: 'in', on: 'p b', e: 1}), K(SUP, F4(0), {br: 'out', on: 'p b', e: .7})]}));
// Floor Y-T Raise: face down, forehead resting; the arms lift into a Y, thumbs up (out breath), lower (in breath),
// then lift out wide into a T (out breath) and lower (in breath).
var PR = {b: 'front', n: 96, hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in'};
var YT = function(a, o){ return {ra: [a, a, a], la: [a, a, a], raO: o, laO: o}; };
G.define('yt-raise', {name: 'Y-T Raise', props: ['mat'], tempo: 3.4, top: [1, 3], dur: [1, 1, 1, 1.5], glow: {upper: [1, 1], rotator: [.6, .6], delts: [.4, .4]}, cam: {yaw: 24, el: 22, zoom: 1},
  form: [{when: 'hold', say: 'shoulders away from ears', at: 'neck01', side: 1}],
  k: [
    K(PR, YT(88, 34), {br: 'out', e: .3}),
    K(PR, YT(100, 34), {br: 'in', shR: -3, shL: -3, e: 1}),
    K(PR, YT(88, 86), {br: 'out', e: .3}),
    K(PR, YT(98, 86), {br: 'in', shR: -3, shL: -3, e: 1})
  ]});
// Floor W Raise: face down, elbows bent in a W beside the body; lift the arms and squeeze the shoulder blades down
// and together (out breath, held two counts), lower (in breath).
var WR = function(y){ return {ra: {x: .44, y: y, z: -.36, f: 92, pole: [1, 0, -.6]}, la: {x: .44, y: y, z: -.36, f: 92, pole: [1, 0, -.6]}}; };
G.define('w-raise', {name: 'Floor W Raise', props: ['mat'], tempo: 3, top: [1], glow: {upper: [1, 1], rotator: [.7, .7], back: [.3, .3]}, cam: {yaw: 24, el: 24, zoom: 1},
  form: [{when: 'hold', say: 'shoulder blades down and together', at: 'neck01', side: 1}],
  k: [K(PR, WR(.07), {br: 'out', e: .3}), K(PR, WR(.15), {br: 'in', shR: -4, shL: -4, e: 1})]});
// Open Book: on the right side, knees bent and stacked, arms long in front; the top arm opens up and over toward the
// floor behind, eyes following (in breath, a short hold), then closes back (out breath).
var OB = {b: 'side', rz: 90, rl: [76, -10, 76], ll: [80, -6, 76], ra: [90, 92, 92], la: [90, 92, 92], hR: 'flat', hL: 'reach', on: 'p'};
TWO('open-book', {name: 'Open Book', props: ['mat'], tempo: 12, bp: [4, 2, 6], dur: [4, 6], rest: 0, hold: 2 / 12, top: [1], glow: {chest: [.6, .6], obliques: [.5, .5], upper: [.4, .4]}, cam: {view: 'front', el: 30, zoom: 1},
  form: [{when: 'hold', line: ['lowerleg01.L', 'lowerleg01.R'], say: 'knees stay stacked', at: 'lowerleg01.L', side: 1}],
  k: [K(OB, {br: 'in', laO: [0, 0, 0], pnL: 'in', e: .3}), K(OB, {br: 'out', tw: 56, hy: 44, la: [90, 92, 92], laO: [116, 116, 116], pnL: 'fwd', e: 1})]});
// ---- Variants: the body matches the words ----------------------------------
// Slow Balance, standing (tai chi style): feet a little wider, knees soft, the weight glides with the breath.
var STW = A(ST, {p: [.91, -.062], rl: FOOT(.16, 0), ll: FOOT(.16, 0), ra: [10, 16], la: [10, 16], lo: 6});
G.define('weight-shift-side', A(SLOW, {name: 'Side to Side Weight Shift', glow: {glutes: [.4, .4], adductors: [.3, .3]}, cam: {view: 'front', turn: -24, el: 6, zoom: 1},
  form: [{when: 'in out', plumb: ['head', 'root'], say: 'tall and soft, glide slowly', at: 'spine01', side: 1}],
  k: [K(STW, {br: 'in', px: -.07, e: .5}), K(STW, {br: 'out', px: .07, e: .5})]}));
G.define('floating-arms', A(SLOW, {name: 'Floating Arms Side to Side', glow: {delts: [.4, .4], obliques: [.4, .4]}, cam: {view: 'front', turn: -24, el: 6, zoom: 1},
  form: [{when: 'in out', say: 'arms float, eyes follow', at: 'neck01', side: 1}],
  k: [K(STW, {br: 'in', px: -.07, tw: -24, hy: -18, ra: [84, 88, 88], la: [80, 86, 86], raO: [8, 8, 8], laO: [-6, -6, -6], hR: 'relax', hL: 'relax', pnR: 'down', pnL: 'down', e: .5}),
    K(STW, {br: 'out', px: .07, tw: 24, hy: 18, ra: [80, 86, 86], la: [84, 88, 88], raO: [-6, -6, -6], laO: [8, 8, 8], hR: 'relax', hL: 'relax', pnR: 'down', pnL: 'down', e: .5})]}));
// One foot a half step forward (the right): the weight rocks forward and back, then the other foot leads.
var STF = A(ST, {rl: FOOT(.12, .18), ll: FOOT(.12, -.14), ra: [10, 16], la: [10, 16]});
var STFP = function(z){ return [.88, z]; };
TWO('weight-shift-front', A(SLOW, {name: 'Front and Back Weight Shift', glow: {quads: [.3, .3], calves: [.3, .3]}, cam: {yaw: 10, el: 6, zoom: 1},
  form: [{when: 'in out', plumb: ['head', 'root'], say: 'tall spine, glide slowly', at: 'spine01', side: 1}],
  k: [K(STF, {br: 'in', p: [.88, -.12], e: .4}), K(STF, {br: 'out', p: [.88, .04], e: .5})]}));
TWO('reach-draw', A(SLOW, {name: 'Slow Reach and Draw Back', glow: {delts: [.4, .4], quads: [.3, .3]}, cam: {yaw: 14, el: 6, zoom: 1},
  form: [{when: 'in', say: 'reach long, shoulders soft', at: 'neck01', side: 1}],
  k: [K(STF, {br: 'in', p: [.88, -.12], ra: [22, 104, 110], la: [22, 104, 110], ao: 10, hR: 'relax', hL: 'relax', pnR: 'in', pnL: 'in', e: .3}),
    K(STF, {br: 'out', p: [.88, .04], ra: [86, 88, 90], la: [86, 88, 90], ao: 10, hR: 'reach', hL: 'reach', pnR: 'down', pnL: 'down', e: .6})]}));
// Slow Step Forward: the weight settles on the left foot, the right heel reaches forward and rolls down, the weight
// glides onto it and back, and the foot returns. Each change rides one breath.
var SSF = function(arms){ var up = arms ? {ra: [80, 86, 88], la: [80, 86, 88], pnR: 'down', pnL: 'down'} : {};
  return [K(ST, {br: 'in', on: 'fL', lift: .05, e: .2}),
    K(ST, up, {br: 'out', px: .06, rl: FOOT(.12, .3, 104), on: 'fL', e: .5}),
    K(ST, up, {br: 'in', p: [.9, .1], rl: FOOT(.12, .3), e: .6}),
    K(ST, up, {br: 'out', px: .06, rl: FOOT(.12, .3, 104), on: 'fL', lift: .05, e: .5})]; };
TWO('slow-step-forward', A(SLOW2, {name: 'Slow Step Forward', glow: {quads: [.4, .4], glutes: [.3, .3]}, cam: {yaw: 20, el: 6, zoom: 1},
  form: [{when: 'out', plumb: ['head', 'foot.L'], say: 'heel first, slow and tall', at: 'spine01', side: 1}], k: SSF(false)}));
TWO('slow-step-forward-arms', A(SLOW2, {name: 'Slow Step Forward with Floating Arms', glow: {quads: [.4, .4], delts: [.3, .3]}, cam: {yaw: 20, el: 6, zoom: 1},
  form: [{when: 'out', plumb: ['head', 'foot.L'], say: 'heel first, arms float', at: 'spine01', side: 1}], k: SSF(true)}));
// Slow Step to the Side: weight onto the left foot, the right foot steps out, the weight glides across and back.
TWO('slow-step-side', A(SLOW2, {name: 'Slow Step to the Side', glow: {glutes: [.4, .4], adductors: [.3, .3]}, cam: {view: 'front', turn: -20, el: 6, zoom: 1},
  form: [{when: 'in out', plumb: ['head', 'root'], say: 'tall and soft, glide slowly', at: 'spine01', side: 1}],
  k: [K(ST, {br: 'in', on: 'fL', p: [.88, -.062], ra: [10, 16], la: [10, 16], e: .2}),
    K(ST, {br: 'out', p: [.88, -.062], px: .06, rl: FOOT(.26, 0), ra: [10, 16], la: [10, 16], e: .4}),
    K(ST, {br: 'in', px: -.08, p: [.88, -.062], rl: FOOT(.26, 0), ra: [10, 16], la: [10, 16], e: .5}),
    K(ST, {br: 'out', on: 'fL', p: [.88, -.062], px: .06, rl: FOOT(.26, 0), ra: [10, 16], la: [10, 16], e: .4})]}));
// Hands Behind, Chest Open: hands clasp behind the back and the chest lifts gently.
G.define('hands-behind', A(SLOW, {name: 'Hands Behind, Chest Open', glow: {chest: [.7, .7], delts: [.5, .5]}, cam: {yaw: 40, el: 6, zoom: 1},
  form: [{when: 'in', say: 'chest lifts, shoulders soft', at: 'neck01', side: 1}],
  k: [K(ST, {br: 'in', ra: [-18, -22, -24], la: [-18, -22, -24], raO: [-14, -18, -18], laO: [-14, -18, -18], hR: 'grip', hL: 'relax', pnR: 'in', pnL: 'in', e: .6}),
    K(ST, {br: 'out', t: [180, 184], n: 184, ra: [-26, -30, -32], la: [-26, -30, -32], raO: [-14, -18, -18], laO: [-14, -18, -18], hR: 'grip', hL: 'relax', pnR: 'in', pnL: 'in', e: .9})]}));

// Chair Flow.
var CHT = function(side){ return side < 0 ? {tw: -30, hy: -22, la: [44, 66, 70], laO: [-34, -40, -40], ra: [-16, -14, -10], raO: [22, 22, 22], pnR: 'in', pnL: 'in'}
  : {tw: 30, hy: 22, ra: [44, 66, 70], raO: [-34, -40, -40], la: [-16, -14, -10], laO: [22, 22, 22], pnL: 'in', pnR: 'in'}; };
var SEATA = A(SEAT, {ra: [14, 72, 80], la: [14, 72, 80], raO: [0, 0, 0], laO: [0, 0, 0]});
G.define('chair-twist', A(SLOW2, {name: 'Seated Twist (Chair)', props: ['chair'], glow: {obliques: [.7, .7], back: [.3, .3]}, cam: {yaw: 50, el: 10, zoom: 1},
  form: [{when: 'out', plumb: ['head', 'root'], say: 'sit tall, feet flat, turn gently', at: 'spine01', side: 1}],
  k: [K(SEATA, CHT(-1), {br: 'in', e: .8}), K(SEATA, {br: 'out', e: .2}), K(SEATA, CHT(1), {br: 'in', e: .8}), K(SEATA, {br: 'out', e: .2})]}));
TWO('chair-hamstring', A(SLOW, {name: 'Seated Hamstring Stretch (Chair)', props: ['chair'], glow: {hams: [0, .9]}, cam: {yaw: 16, el: 8, zoom: 1},
  form: [{when: 'out', line: ['root', 'spine01'], say: 'long back, toes up', at: 'spine01', side: 1}],
  k: [K(SEAT, {br: 'in', t: [152, 158], n: 154, rl: {x: .12, y: .095, z: .7, f: 162, pole: [0, .5, 1]}, ra: {dx: .03, y: .4, z: .36, f: 80, pole: [.4, 0, -1]}, la: {dx: .03, y: .5, z: .22, f: 90, pole: [.4, 0, -1]}, on: 'p fR fL', e: 1}),
    K(SEAT, {br: 'out', t: [162, 168], n: 166, rl: {x: .12, y: .095, z: .7, f: 162, pole: [0, .5, 1]}, ra: {dx: .03, y: .45, z: .32, f: 84, pole: [.4, 0, -1]}, la: {dx: .03, y: .54, z: .18, f: 90, pole: [.4, 0, -1]}, on: 'p fR fL', e: .7})]}));
TWO('chair-figure-4', A(SLOW, {name: 'Seated Figure Four', props: ['chair'], glow: {glutes: [0, .9]}, cam: {yaw: 30, el: 10, zoom: 1},
  form: [{when: 'out', line: ['root', 'spine01'], say: 'long back, lean gently', at: 'spine01', side: 1}],
  k: [K(SEAT, {br: 'in', t: [164, 168], n: 166, rl: {x: -.04, y: .58, z: .26, f: 150, pole: [1, .3, .3]}, on: 'p fL', e: 1}),
    K(SEAT, {br: 'out', t: [174, 178], n: 178, rl: {x: -.04, y: .58, z: .26, f: 150, pole: [1, .3, .3]}, on: 'p fL', e: .7})]}));
TWO('chair-leg-extension', {name: 'Seated Leg Extension', tempo: 3, top: [1], base: 'seat', props: ['chair'], glow: {quads: [0, 1]}, cam: {yaw: 30, el: 6, zoom: 1},
  form: [{when: 'hold', say: 'sit tall, toes up', at: 'lowerleg01.R', side: 1}],
  k: [{br: 'out', e: .3}, {br: 'in', rl: [92, 86, 158], on: 'p fL', e: 1}]});
G.define('chair-heel-toe', {name: 'Seated Heel and Toe Raise', tempo: 2.4, base: 'seat', glow: {calves: [.8, .8]}, cam: {yaw: 34, el: 10, zoom: 1},
  form: [{when: 'always', say: 'slow and steady', at: 'foot.R', side: 1}],
  k: [{br: 'in', rl: {x: .13, y: .11, z: .3, f: 38, pole: [0, 0, 1]}, ll: {x: .13, y: .11, z: .3, f: 38, pole: [0, 0, 1]}, on: 'p', e: .9},
    {br: 'out', rl: {x: .13, y: .085, z: .34, f: 112, pole: [0, 0, 1]}, ll: {x: .13, y: .085, z: .34, f: 112, pole: [0, 0, 1]}, on: 'p', e: .5}]});
G.define('chair-arms-up', A(SLOW, {name: 'Seated Reach (Chair)', props: ['chair'], glow: {delts: [.5, .5], lats: [.4, .4]}, cam: {yaw: 30, el: 8, zoom: 1},
  form: [{when: 'out', plumb: ['head', 'root'], say: 'sit tall, shoulders down', at: 'neck01', side: 1}],
  k: [K(SEAT, {br: 'in', e: .2}), K(SEAT, {br: 'out', t: [181, 183], n: 184, ra: [168, 174, 176], la: [168, 174, 176], raO: [10, 10, 10], laO: [10, 10, 10], hR: 'reach', hL: 'reach', pnR: 'in', pnL: 'in', e: .8})]}));

// On the back.
G.define('lie-knees', A(SLOW, {name: 'Rest with Knees Up', props: ['mat'], glow: {}, cam: {yaw: 10, el: 22, zoom: 1},
  form: [{when: 'out', say: 'heavy and easy', at: 'root', side: -1}],
  k: [K(SUP, {br: 'in', ra: [94, 94, 94], la: [94, 94, 94], pnR: 'up', pnL: 'up', ao: 20, e: .1}), K(SUP, {br: 'out', t: [-88, -91], ra: [94, 94, 94], la: [94, 94, 94], pnR: 'up', pnL: 'up', ao: 20, e: .1})]}));
var HK = function(d){ return {rl: [206 + d, 80, 120], ll: [206 + d, 80, 120], ra: {x: .12, y: .4, z: -.02, f: 120, pole: [.6, -.3, -1]}, la: {x: .12, y: .4, z: -.02, f: 120, pole: [.6, -.3, -1]}, hR: 'relax', hL: 'relax', pnR: 'back', pnL: 'back', on: 'p b', lo: 8}; };
G.define('knees-to-chest', A(SLOW, {name: 'Hug Your Knees', props: ['mat'], glow: {back: [.5, .5], glutes: [.4, .4]}, cam: {yaw: 0, el: 14, zoom: 1},
  form: [{when: 'out', say: 'knees draw in, head rests down', at: 'root', side: -1}],
  k: [K(SUP, HK(6), {br: 'in', e: .9}), K(SUP, HK(0), {br: 'out', e: .6})]}));
var KS = function(s){ var pR = s === 0 ? [.2, 1, .3] : [s < 0 ? 1 : -1, .25, .3], pL = s === 0 ? [.2, 1, .3] : [s < 0 ? -1 : 1, .25, .3];
  return {rl: {x: .2, y: .075, z: .36, f: 74, pole: pR}, ll: {x: .2, y: .075, z: .36, f: 74, pole: pL}, ra: [92, 92, 92], la: [92, 92, 92], ao: 40}; };
G.define('knee-sway', A(SLOW2, {name: 'Knees Side to Side', props: ['mat'], glow: {obliques: [.6, .6], glutes: [.3, .3]}, cam: {view: 'front', turn: -30, el: 30, zoom: 1},
  form: [{when: 'out', say: 'shoulders rest, knees sway', at: 'root', side: -1}],
  k: [K(SUP, KS(-1), {br: 'in', e: .8}), K(SUP, KS(0), {br: 'out', e: .3}), K(SUP, KS(1), {br: 'in', e: .8}), K(SUP, KS(0), {br: 'out', e: .3})]}));
G.define('legs-up-wall', A(SLOW, {name: 'Legs Up the Wall', props: ['mat', {id: 'wall', at: 'front', d: .52}], glow: {hams: [.4, .4]}, cam: {yaw: 6, el: 16, zoom: 1},
  form: [{when: 'out', say: 'legs rest, breath slow', at: 'root', side: -1}],
  k: [K(SUP, {br: 'in', p: [.1, .3], rl: [178, 178, 180], ll: [178, 178, 180], ra: [94, 94, 94], la: [94, 94, 94], pnR: 'up', pnL: 'up', ao: 24, on: 'p b', e: .4}),
    K(SUP, {br: 'out', p: [.1, .3], t: [-88, -91], rl: [178, 178, 180], ll: [178, 178, 180], ra: [94, 94, 94], la: [94, 94, 94], pnR: 'up', pnL: 'up', ao: 24, on: 'p b', e: .4})]}));
var TH = function(a){ return {rl: [a, a, 176], ra: {x: .06, y: .5, z: .1, f: 160, pole: [.6, -.4, -1]}, la: {x: .02, y: .5, z: .1, f: 160, pole: [.6, -.4, -1]}, hR: 'grip', hL: 'grip', pnR: 'fwd', pnL: 'fwd', on: 'p b fL'}; };
TWO('towel-hamstring', A(SLOW, {name: 'Hamstring Stretch with a Towel', props: ['mat'], glow: {hams: [0, .9]}, cam: {yaw: 0, el: 12, zoom: 1},
  form: [{when: 'out', say: 'leg long, head rests down', at: 'root', side: -1}],
  k: [K(SUP, TH(170), {br: 'in', e: 1}), K(SUP, TH(164), {br: 'out', e: .7})]}));

// Standing stretches.
var WH2 = {x: .2, y: 1.2, z: .5, f: 176, pole: [.4, -1, -.3]};
TWO('wall-calf', A(SLOW, {name: 'Wall Calf Stretch', props: [{id: 'wall', at: 'front', d: .53}], glow: {calves: [0, 1]}, cam: {yaw: 0, el: 6, zoom: 1},
  form: [{when: 'out', line: ['foot.R', 'root'], say: 'back heel down, leg long', at: 'root', side: -1}],
  k: [K(ST, {br: 'in', p: [.86, .06], t: [172, 174], ll: FOOT(.11, .2, 72, [0, 0, 1]), rl: FOOT(.11, -.38, 74), ra: WH2, la: WH2, hR: 'flat', hL: 'flat', pnR: 'fwd', pnL: 'fwd', on: 'fR fL', e: 1}),
    K(ST, {br: 'out', p: [.87, .03], t: [174, 176], ll: FOOT(.11, .2, 72, [0, 0, 1]), rl: FOOT(.11, -.38, 74), ra: WH2, la: WH2, hR: 'flat', hL: 'flat', pnR: 'fwd', pnL: 'fwd', on: 'fR fL', e: .7})]}));
G.define('doorway-chest', A(SLOW, {name: 'Doorway Chest Stretch', glow: {chest: [.9, .9], delts: [.5, .5]}, cam: {yaw: 40, el: 8, zoom: 1},
  form: [{when: 'out', say: 'chest opens, shoulders soft', at: 'neck01', side: 1}],
  k: [K(ST, {br: 'in', p: [.88, .05], t: [176, 178], rl: FOOT(.12, .2), ll: FOOT(.12, -.12), ra: [0, 0, 0], la: [0, 0, 0], raO: [86, 172, 176], laO: [86, 172, 176], hR: 'flat', hL: 'flat', pnR: 'fwd', pnL: 'fwd', e: 1}),
    K(ST, {br: 'out', p: [.88, .01], t: [178, 180], rl: FOOT(.12, .2), ll: FOOT(.12, -.12), ra: [0, 0, 0], la: [0, 0, 0], raO: [86, 172, 176], laO: [86, 172, 176], hR: 'flat', hL: 'flat', pnR: 'fwd', pnL: 'fwd', e: .7})]}));
var QS = function(a){ return {rl: [a, -160, -150], ra: {x: .15, y: .6, z: -.24, f: -20, pole: [0, -.2, 1]}, hR: 'grip', pnR: 'in', la: {x: .5, y: 1.15, z: .04, f: 150, pole: [.3, -1, -.3]}, hL: 'flat', pnL: 'wall', on: 'fL hL'}; };
TWO('quad-stretch', A(SLOW, {name: 'Front of Thigh Stretch', props: [{id: 'wall', at: 'left'}], glow: {quads: [0, 1], flexors: [0, .5]}, cam: {yaw: 0, el: 6, zoom: 1},
  form: [{when: 'out', plumb: ['head', 'foot.L'], say: 'knees close, stand tall', at: 'spine01', side: 1}],
  k: [K(ST, QS(-8), {br: 'in', e: 1}), K(ST, QS(-2), {br: 'out', e: .7})]}));
TWO('cross-body-shoulder', A(SLOW, {name: 'Cross Body Shoulder Stretch', glow: {delts: [0, .9], upper: [0, .4]}, cam: {yaw: 50, el: 8, zoom: 1},
  form: [{when: 'out', say: 'shoulders down, arm long', at: 'neck01', side: 1}],
  k: [K(ST, {br: 'in', ra: [88, 90, 90], raO: [-60, -60, -60], la: [36, 112, 120], laO: [-26, -40, -40], hR: 'relax', hL: 'flat', pnL: 'back', e: 1}),
    K(ST, {br: 'out', ra: [88, 90, 90], raO: [-54, -54, -54], la: [34, 108, 116], laO: [-22, -36, -36], hR: 'relax', hL: 'flat', pnL: 'back', e: .7})]}));
TWO('triceps-stretch', A(SLOW, {name: 'Overhead Triceps Stretch', glow: {triceps: [0, .9], lats: [0, .4]}, cam: {yaw: 40, el: 8, zoom: 1},
  form: [{when: 'out', say: 'elbow up, ribs soft', at: 'neck01', side: 1}],
  k: [K(ST, {br: 'in', ra: [174, 12, 8], raO: [12, 12, 12], la: [154, 196, 200], laO: [-16, -20, -20], hR: 'relax', hL: 'flat', e: 1}),
    K(ST, {br: 'out', ra: [170, 16, 10], raO: [10, 10, 10], la: [150, 192, 196], laO: [-14, -18, -18], hR: 'relax', hL: 'flat', e: .7})]}));

// On the floor.
var BFT = {rl: {x: .03, y: .085, z: .02, f: 64, pole: [1, .5, .2]}, ll: {x: .03, y: .085, z: .02, f: 64, pole: [1, .5, .2]}, ra: {x: .1, y: .14, z: .02, f: 60, pole: [1, -.3, -.4]}, la: {x: .1, y: .14, z: .02, f: 60, pole: [1, -.3, -.4]}};
G.define('butterfly', A(SLOW, {name: 'Butterfly Stretch', props: ['mat'], glow: {adductors: [.9, .9]}, cam: {yaw: 40, el: 14, zoom: 1},
  form: [{when: 'in', plumb: ['head', 'root'], say: 'sit tall, knees fall open', at: 'spine01', side: 1}],
  k: [K(CROSS, BFT, {br: 'in', t: [160, 152], n: 150, e: 1}), K(CROSS, BFT, {br: 'out', t: [174, 180], n: 180, e: .6})]}));
G.define('seated-hip-circles', {name: 'Seated Hip Circles', tempo: 8, rest: 0, props: ['mat'], glow: {obliques: [.5, .5], back: [.4, .4]}, cam: {yaw: 40, el: 12, zoom: 1},
  form: [{when: 'always', plumb: ['head', 'root'], say: 'slow, easy circles', at: 'spine01', side: 1}],
  k: [K(CROSS, {br: 'in', via: true, t: [170, 172], lb: 0, e: .5}), K(CROSS, {br: 'in', via: true, t: [178, 180], lb: 10, e: .5}),
    K(CROSS, {br: 'out', via: true, t: [184, 186], lb: 0, e: .5}), K(CROSS, {br: 'out', via: true, t: [178, 180], lb: -10, e: .5})]});

// Incline Y-T Raise: chest on the incline bench (the body turned to face the high end of the pad), feet on the floor;
// the arms lift into a Y, thumbs up (out breath), lower (in breath), then out into a T (out breath) and lower.
var IP = {yaw: 180, p: [.62, .02], t: [132, 134], n: 140, rl: [-50, -72, -16], ll: [-50, -72, -16], hR: 'relax', hL: 'relax', lo: 6, on: 'fR fL'};
var IYT = function(a, o){ return {ra: [a, a, a], la: [a, a, a], raO: [o, o, o], laO: [o, o, o]}; };
G.define('incline-yt-raise', {name: 'Incline Y-T Raise', tempo: 3.4, top: [1, 3], rest: .08, props: ['incline', 'dumbbells'], glow: {upper: [1, 1], rotator: [.6, .6], delts: [.4, .4]}, cam: {yaw: 200, el: 12, zoom: 1},
  form: [{when: 'hold', say: 'shoulders away from ears', at: 'neck01', side: 1}],
  k: [K(IP, IYT(10, 14), {br: 'out', hR: 'grip', hL: 'grip', e: .3}), K(IP, IYT(138, 30), {br: 'in', hR: 'grip', hL: 'grip', e: 1}),
    K(IP, IYT(10, 14), {br: 'out', hR: 'grip', hL: 'grip', e: .3}), K(IP, IYT(96, 80), {br: 'in', hR: 'grip', hL: 'grip', e: 1})]});

})(window.GG3D);

}catch(e){(window.GG3D_LOADERR=window.GG3D_LOADERR||[]).push("p3.js"+': '+e.message);}
/* names.js */
try{
// BLD 897 v3d: move names that get their own 3D pattern, so the body matches the words Ava says. Checked in order
// before the SVG pattern mapping (GGMoves.of, pick, refine, fit): the first regex that matches the move's name wins.
// Plain data. Owner: PAT1 (standing strength and cardio).
var GG3D = window.GG3D = window.GG3D || {q: [], define: function(i, d){ this.q.push([i, d]); }};
GG3D.names = (GG3D.names || []).concat([
  [/\bstep jacks?\b/i, 'jacks'],
  [/\bjumping jacks?\b|\bstar jumps?\b/i, 'jumping-jacks'],
  [/\bwall sits?\b/i, 'wall-sit'],
  [/\btoe tap clock\b|\bsingle.?leg (balance )?reach\b/i, 'toe-tap'],
  [/\bstep taps?\b/i, 'step-tap'],
  [/\bside leg lifts?\b/i, 'side-leg-lift'],
  [/\bback leg lifts?\b/i, 'back-leg-lift'],
  [/\bheel.?to.?toe stand\b|\btandem stand\b/i, 'heel-toe-stand'],
  [/\bheel.?to.?toe walk\b|\btandem walk\b/i, 'heel-toe'],
  [/^side lunges?$/i, 'side-lunge'],
  [/\bwalking lunges?\b/i, 'walking-lunge'],
  [/\bwide stance reach\b/i, 'wide-stance-reach'],
  [/\bone.?arm (dumbbell |db )?swings?\b|\bsingle.?arm (dumbbell )?swings?\b/i, 'one-arm-swing'],
  [/\bbike intervals?\b/i, 'bike'],
  [/^side steps?\b/i, 'side-step']
]);
// PAT2 (floor, bench, bar, and pulling): variants whose words name a different set up than their general pattern.
GG3D.names = (GG3D.names || []).concat([
  [/\bpelvic tilts?\b/i, 'pelvic-tilt'],
  [/\b(single|one).?leg (glute )?bridges?\b/i, 'sl-bridge'],
  [/\b(single|one).?leg hip thrusts?\b/i, 'sl-hip-thrust'],
  [/\bfloor press\b/i, 'floor-press'],
  [/\b(incline|counter|table|bench) push.?ups?\b/i, 'incline-push-up'],
  [/\bpike push.?ups?\b/i, 'pike-push-up'],
  [/\bdoorway rows?\b|\bdoor ?frame rows?\b/i, 'doorway-row'],
  [/\bband(ed)? rows?\b/i, 'band-row'],
  [/\bchair dips?\b/i, 'chair-dip'],
  [/\bbench dips?\b/i, 'bench-dip'],
  [/\bplank step.?outs?\b/i, 'plank-step-out'],
  [/\bbear crawls?\b/i, 'bear-crawl'],
  [/\bknee raises? on the back pad\b|\bcaptain'?s chair\b/i, 'back-pad-knee-raise'],
  [/\bburpee walk.?outs?\b/i, 'burpee-walk-out']
]);
// PAT3 (Flow, Yoga, Balance, Stretch, Chair Flow): variants whose words name a set up or a move of their own.
GG3D.names = (GG3D.names || []).concat([
  [/\bincline y.?t raises?\b/i, 'incline-yt-raise'],
  [/\bseated twist\b|\bchair twist\b/i, 'chair-twist'],
  [/\bseated figure (4|four)\b/i, 'chair-figure-4'],
  [/\bseated leg extensions?\b/i, 'chair-leg-extension'],
  [/\bseated heel and toe raises?\b/i, 'chair-heel-toe'],
  [/^seated reach$/i, 'chair-arms-up'],
  [/\bslow step forward with floating arms\b/i, 'slow-step-forward-arms'],
  [/\bslow step forward\b/i, 'slow-step-forward'],
  [/\bslow step (to the side|and turn)\b/i, 'slow-step-side'],
  [/\bfloating arms side to side\b/i, 'floating-arms'],
  [/\bside to side weight shift\b/i, 'weight-shift-side'],
  [/\bfront and back weight shift\b/i, 'weight-shift-front'],
  [/\bslow reach and draw back\b|^slow sequence$/i, 'reach-draw'],
  [/\bhands behind,? chest open\b/i, 'hands-behind'],
  [/\bhug your knees\b/i, 'knees-to-chest'],
  [/\bknees side to side\b|\bwide knee rock\b/i, 'knee-sway'],
  [/\blegs up the wall\b/i, 'legs-up-wall'],
  [/\bhamstring stretch with a towel\b|\btowel hamstring\b/i, 'towel-hamstring'],
  [/\bdeep rest with knees up\b/i, 'lie-knees'],
  [/\bcalf stretch\b/i, 'wall-calf'],
  [/\bdoorway chest stretch\b/i, 'doorway-chest'],
  [/\bfront of thigh stretch\b|\bstanding quad(riceps)? stretch\b/i, 'quad-stretch'],
  [/\bcross.?body shoulder stretch\b/i, 'cross-body-shoulder'],
  [/\boverhead triceps stretch\b/i, 'triceps-stretch'],
  [/\bbutterfly stretch\b/i, 'butterfly'],
  [/\bseated hip circles\b/i, 'seated-hip-circles']
]);

}catch(e){(window.GG3D_LOADERR=window.GG3D_LOADERR||[]).push("names.js"+': '+e.message);}
