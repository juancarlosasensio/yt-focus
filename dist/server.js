(()=>{"use strict";var e={n:n=>{var r=n&&n.__esModule?()=>n.default:()=>n;return e.d(r,{a:r}),r},d:(n,r)=>{for(var t in r)e.o(r,t)&&!e.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:r[t]})},o:(e,n)=>Object.prototype.hasOwnProperty.call(e,n)};const n=require("express");var r=e.n(n);const t=require("cors");var o=e.n(t);const s=require("react-dom/server");var c=e.n(s);const i=require("react");function l(){return i.createElement("div",null,"Hello World")}var a=r()();a.use(o()()),a.use(r().static("dist")),a.get("*",(function(e,n,r){var t=c().renderToString(i.createElement(l,null));n.send('\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>YoutubeFocus with SSR</title>\n        <script src="/bundle.js" defer><\/script>\n        <link href="/main.css" rel="stylesheet" />\n      </head>\n\n      <body>\n        <div id="app">'.concat(t,"</div>\n      </body>\n    </html>\n  "))}));var u=process.env.PORT||3e3;a.listen(u,(function(){console.log("Server is listening on port: ".concat(u))}))})();