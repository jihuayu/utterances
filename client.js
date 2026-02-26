(()=>{let e=window.matchMedia("(prefers-color-scheme: dark)").matches?"github-dark":"github-light",t=new URL(location.href),r=t.searchParams.get("utterances");r&&(localStorage.setItem("utterances-session",r),t.searchParams.delete("utterances"),history.replaceState(void 0,document.title,t.href));let i=document.currentScript;void 0===i&&(i=document.querySelector('script[src^="https://utteranc.es/client.js"],script[src^="http://localhost:4000/client.js"]'));let a={};for(let e=0;e<i.attributes.length;e++){let t=i.attributes.item(e);a[t.name.replace(/^data-/,"")]=t.value}"preferred-color-scheme"===a.theme&&(a.theme=e);let n=document.querySelector("link[rel='canonical']");a.url=n?n.href:t.origin+t.pathname+t.search,a.origin=t.origin,a.pathname=t.pathname.length<2?"index":t.pathname.substr(1).replace(/\.\w+$/,""),a.title=document.title;let s=document.querySelector("meta[name='description']");a.description=s?s.content:"";let o=encodeURIComponent(a.description).length;o>1e3&&(a.description=a.description.substr(0,Math.floor(1e3*a.description.length/o)));let l=document.querySelector("meta[property='og:title'],meta[name='og:title']");a["og:title"]=l?l.content:"",a.session=r||localStorage.getItem("utterances-session")||"",document.head.insertAdjacentHTML("afterbegin",`<style>
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
  </style>`);let c=i.src.match(/^https:\/\/utteranc\.es|http:\/\/localhost:\d+/)[0],h=`${c}/utterances.html`;i.insertAdjacentHTML("afterend",`<div class="utterances">
    <iframe class="utterances-frame" title="Comments" scrolling="no" src="${h}?${new URLSearchParams(a)}" loading="lazy"></iframe>
  </div>`);let m=i.nextElementSibling;i.parentElement.removeChild(i),addEventListener("message",e=>{if(e.origin!==c)return;let t=e.data;t&&"resize"===t.type&&t.height&&(m.style.height=`${t.height}px`)})})();
//# sourceMappingURL=client.js.map
