(()=>{let e=window.matchMedia("(prefers-color-scheme: dark)").matches?"github-dark":"github-light",t=new URL(location.href),r=t.searchParams.get("utterances");r&&(localStorage.setItem("utterances-session",r),t.searchParams.delete("utterances"),history.replaceState(void 0,document.title,t.href));let i=document.currentScript;void 0===i&&(i=document.querySelector('script[src^="https://utteranc.raw2.cc/client.js"],script[src^="http://localhost:4000/client.js"]'));let n={};for(let e=0;e<i.attributes.length;e++){let t=i.attributes.item(e);n[t.name.replace(/^data-/,"")]=t.value}"preferred-color-scheme"===n.theme&&(n.theme=e);let a=document.querySelector("link[rel='canonical']");n.url=a?a.href:t.origin+t.pathname+t.search,n.origin=t.origin,n.pathname=t.pathname.length<2?"index":t.pathname.substr(1).replace(/\.\w+$/,""),n.title=document.title;let o=document.querySelector("meta[name='description']");n.description=o?o.content:"";let s=encodeURIComponent(n.description).length;s>1e3&&(n.description=n.description.substr(0,Math.floor(1e3*n.description.length/s)));let c=document.querySelector("meta[property='og:title'],meta[name='og:title']");n["og:title"]=c?c.content:"",n.session=r||localStorage.getItem("utterances-session")||"",document.head.insertAdjacentHTML("afterbegin",`<style>
    .utterances {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      max-width: 760px;
      margin-left: auto;
      margin-right: auto;
    }
    .utterances-frame {
      color-scheme: light;
      position: absolute;
      left: 0;
      right: 0;
      width: 1px;
      min-width: 100%;
      max-width: 100%;
      height: 100%;
      border: 0;
    }
  </style>`);let l=new URL(i.src).origin,h=`${l}/utterances.html`;i.insertAdjacentHTML("afterend",`<div class="utterances">
    <iframe class="utterances-frame" title="Comments" scrolling="no" src="${h}?${new URLSearchParams(n)}" loading="lazy"></iframe>
  </div>`);let m=i.nextElementSibling;i.parentElement.removeChild(i),addEventListener("message",e=>{if(e.origin!==l)return;let t=e.data;t&&"resize"===t.type&&t.height&&(m.style.height=`${t.height}px`)})})();
//# sourceMappingURL=client.js.map
