!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n=window.webpackJsonp;window.webpackJsonp=function(t,r,u){for(var c,i,a=0,l=[];a<t.length;a++)i=t[a],o[i]&&l.push(o[i][0]),o[i]=0;for(c in r)Object.prototype.hasOwnProperty.call(r,c)&&(e[c]=r[c]);for(n&&n(t,r,u);l.length;)l.shift()()};var r={},o={1:0};t.e=function(e){function n(){i.onerror=i.onload=null,clearTimeout(a);var t=o[e];0!==t&&(t&&t[1](new Error("Loading chunk "+e+" failed.")),o[e]=void 0)}var r=o[e];if(0===r)return new Promise(function(e){e()});if(r)return r[2];var u=new Promise(function(t,n){r=o[e]=[t,n]});r[2]=u;var c=document.getElementsByTagName("head")[0],i=document.createElement("script");i.type="text/javascript",i.charset="utf-8",i.async=!0,i.timeout=12e4,t.nc&&i.setAttribute("nonce",t.nc),i.src=t.p+""+({0:"owners_de"}[e]||e)+"."+{0:"16e2b4131bc434f0c890"}[e]+".js";var a=setTimeout(n,12e4);return i.onerror=i.onload=n,c.appendChild(i),u},t.m=e,t.c=r,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="dist/",t.oe=function(e){throw console.error(e),e},t(t.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.zeroPad=function(e,t){return(Array(t+1).join("0")+e).slice(-t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.TYPE_CODES={90:0,91:6,92:1,93:5,94:0,95:0,96:0,97:8,98:3,99:9};var r=t.TYPE_LETTER_MAPPINGS={E:1,V:2,K:3,ET:4,ETA:5,VT:6,ES:8,ESA:8,EB:8,VS:9,VB:9,VM:9},o=t.TYPE_LETTERS=Object.keys(r),u=(t.CLASS_NUMBER_PATTERN_DESCIPTION_DE="1-3 Kennbuchstabe(n) (optional), gefolgt von 2-3 stelliger Baureihennummer",t.CLASS_NUMBER_PATTERN="^(?:("+o.join("|")+")[ ,-]?)?([0-9]{2,3})$");t.CLASS_NUMBER_REGEXP=new RegExp(u),t.ERRORS={TYPE_LETTER_INVALID:new Error("The provided type letter is not allowed. Should be one of: "+JSON.stringify(o)),CLASS_NUMBER_INVALID:new Error("The string does not match the required pattern: "+u)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=r(n(3)),u=r(n(4)),c=r(n(5)),i=n(0),a=n(1);!function(){function e(e){if(void 0!==e&&-1===a.TYPE_LETTERS.indexOf(e))throw a.ERRORS.TYPE_LETTER_INVALID;return!0}function t(t){var n=t.match(a.CLASS_NUMBER_REGEXP),r=n[1],o=void 0!==r&&e(r)?a.TYPE_LETTER_MAPPINGS[r]:"";if(null!==n)return{classKey:o,classNumber:n[2]};throw a.ERRORS.CLASS_NUMBER_INVALID}function r(e){var t=(e.classKey+e.classNumber).slice(0,3);return(0,i.zeroPad)(t,3)}function l(e){return{numberFormNode:e.getElementById("number_form"),locoCountryNode:e.querySelector('[name="loco_country"]'),locoOwnerNode:e.querySelector('[name="loco_owner"]'),locoClassInputNode:e.querySelector('[name="loco_class"]'),steamLocoOilInputNode:e.querySelector('[name="steam-loco-oil"]'),edvNumberInputNode:e.getElementById("edv_number"),uicNumberInputNode:e.getElementById("uic_number"),page1Node:e.getElementById("page1"),page2Node:e.getElementById("page2"),backButtonNode:e.getElementById("back_button")}}function d(){m.page1Node.style.display="block",m.page2Node.style.display="none"}function s(){m.page1Node.style.display="none",m.page2Node.style.display="block"}function f(e){e.preventDefault();var n=(0,o.default)(m.numberFormNode),u=n.loco_country.split(","),i=t(n.loco_class),a=new c.default(n["loco_class-code"],r(i),n["loco_indenture-number"],u,n.loco_owner),l=a.computeEdvNumber(),d=a.computeUicNumber().parts,f=document.createElement("u");f.textContent=d[4],m.edvNumberInputNode.textContent=l,m.uicNumberInputNode.innerHTML="",m.uicNumberInputNode.append([d[0],d[1],d[2],d[3]].join(" ")+" "),m.uicNumberInputNode.append(f),m.uicNumberInputNode.append("-"+d[5]),s()}function p(e){var t=(0,o.default)(m.numberFormNode);m.steamLocoOilInputNode.disabled="90"!==t["loco_class-code"]}var m=void 0;(m=l(document)).locoClassInputNode.setAttribute("pattern",a.CLASS_NUMBER_PATTERN),m.locoClassInputNode.setAttribute("title",a.CLASS_NUMBER_PATTERN_DESCIPTION_DE),m.numberFormNode.addEventListener("submit",f),m.numberFormNode.addEventListener("change",p),m.backButtonNode.addEventListener("click",d),n.e(0).then(n.bind(null,7)).then(function(e){var t=e.sort(function(e,t){return e.label.localeCompare(t.label)});m.locoOwnerNode.innerHTML="",(0,u.default)(t,m.locoOwnerNode,"DB"),m.locoOwnerNode.removeAttribute("disabled")})}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){for(var t=e.elements,n=[].slice.call(t).filter(function(e){return!(("checkbox"===e.type||"radio"===e.type)&&!e.checked)}).reduce(function(e,t){var n=t.name;return n.length&&-1===e.indexOf(n)&&e.push(n),e},[]),r={},o=0;o<n.length;o++){var u=n[o];r[u]=t[u].value}return r}},function(e,t,n){"use strict";function r(e,t,n){var r=document.createElement("option");return r.setAttribute("value",e),r.innerText=n,t&&r.setAttribute("selected",!0),r}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var o=e.reduce(function(e,t){var o=t.label.substr(0,1).toUpperCase(),u=t.value===n;return Array.isArray(e[o])||(e[o]=[]),e[o].push(r(t.value,u,t.label)),e},{});Object.keys(o).forEach(function(e){var n=document.createElement("optgroup");n.setAttribute("label",e),o[e].forEach(function(e){n.appendChild(e)}),t.appendChild(n)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){var n=[],r=!0,o=!1,u=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){o=!0,u=e}finally{try{!r&&i.return&&i.return()}finally{if(o)throw u}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=function(e,t,n,i,a){var l=this;this.typeCode=e,this.locoClass=t,this.indentureNumber=n,this.owner=a;var d=r(i,2);this.countryCode=d[0],this.countryShort=d[1],this.clearingNumber=c.TYPE_CODES[e],this.computeEdvNumber=function(){var e=l.locoClass+l.indentureNumber,t=o.luhn.calculate(e);return(0,u.zeroPad)(l.locoClass,3)+" "+(0,u.zeroPad)(l.indentureNumber,3)+"-"+t},this.computeUicNumber=function(){var e=""+l.clearingNumber+(0,u.zeroPad)(l.locoClass,3),t=(0,u.zeroPad)(l.indentureNumber,3),n=o.luhn.calculate([l.typeCode,l.countryCode,e,t].join(""));console.log([l.typeCode,l.countryCode,e,t].join(""));var r=[l.typeCode,l.countryCode,e,t+"-"+n,l.countryShort,l.owner],c=r.join(" "),i=c.lastIndexOf(" ");return{parts:r,string:c.substring(0,i)+"-"+c.substring(i+1)}}};var o=n(6),u=n(0),c=n(1)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.luhn={calculate:function(e){return 9*this.sum(e,!1)%10},verify:function(e){var t=this.sum(e,!0);return t>0&&t%10==0},sum:function(e,t){for(var n=0,r=0,o=e.length;o--;)r=Number(e[o]),n+=(t=!t)?this.computed[r]:r;return n},computed:[0,2,4,6,8,1,3,5,7,9]};t.luhnTools={createLuhnId:function(e){return e+r.calculate(e)},isLuhnId:function(e){return r.verify(e)}}}]);