let e,t,r;var i,n=/^([\w-_]+)\/([\w-_.]+)$/i;let s=function(){let e=Object.fromEntries(new URL(location.href).searchParams),t=null,r=null;if("issue-term"in e){if(void 0!==(t=e["issue-term"])){if(""===t)throw Error("When issue-term is specified, it cannot be blank.");if(-1!==["title","url","pathname","og:title"].indexOf(t)){if(!e[t])throw Error(`Unable to find "${t}" metadata.`);t=e[t]}}}else if("issue-number"in e){if((r=+e["issue-number"]).toString(10)!==e["issue-number"])throw Error(`issue-number is invalid. "${e["issue-number"]}`)}else throw Error('"issue-term" or "issue-number" must be specified.');if(!("repo"in e))throw Error('"repo" is required.');if(!("origin"in e))throw Error('"origin" is required.');let i=n.exec(e.repo);if(null===i)throw Error(`Invalid repo: "${e.repo}"`);return{owner:i[1],repo:i[2],endpoint:function(e){let t;if(void 0===e)return"https://xtalk.raw2.cc";let r=e.trim();if(""===r)throw Error('"endpoint" cannot be blank.');try{t=new URL(r)}catch{throw Error(`Invalid endpoint URL: "${e}"`)}if(!/^https?:$/.test(t.protocol))throw Error('"endpoint" must be an absolute http(s) URL.');return t.search="",t.hash="",t.toString().replace(/\/$/,"")}(e.endpoint),issueTerm:t,issueNumber:r,origin:e.origin,url:e.url,title:e.title,description:e.description,label:e.label,theme:e.theme||"github-light",session:e.session}}(),a={value:null};function o(e){return`https://api.utteranc.es/authorize?${new URLSearchParams({redirect_uri:e})}`}async function l(){if(a.value)return a.value;if(!s.session)return null;let e=await fetch("https://xtalk.raw2.cc/api/utterances/token",{method:"POST",mode:"cors",body:JSON.stringify(s.session)});if(e.ok){let t=await e.json();return a.value=t,t}return null}let h="https://xtalk.raw2.cc",c="https://api.github.com",u="application/vnd.github.VERSION.html+json",m="application/vnd.github.v3+json",d=["+1","-1","laugh","hooray","confused","heart","rocket","eyes"],p=`${h}/`;function v(e){return`${e.trim().replace(/\/+$/,"")}/`}function g(e){let t=new URL(e.url);for(let e of[p,v(c)]){let r=new URL(e);if(t.origin===r.origin&&t.pathname.startsWith(r.pathname)){let e=t.pathname.substring(r.pathname.length).replace(/^\/+/,"");return`${e}${t.search}`}}return`${t.pathname.replace(/^\/+/,"")}${t.search}`}function f(e,t){(t=t||{}).mode="cors",t.cache="no-cache";let r=new Request(new URL(e.replace(/^\/+/,""),p),t);return r.headers.set("Accept",m),null!==a.value&&r.headers.set("Authorization",`token ${a.value}`),r}let b={standard:{limit:Number.MAX_VALUE,remaining:Number.MAX_VALUE,reset:0},search:{limit:Number.MAX_VALUE,remaining:Number.MAX_VALUE,reset:0}};function w(e){return fetch(e).then(t=>{if(401===t.status&&(a.value=null),403===t.status&&t.json().then(e=>{"Resource not accessible by integration"===e.message&&window.dispatchEvent(new CustomEvent("not-installed"))}),!function(e){let t=e.headers.get("X-RateLimit-Limit"),r=e.headers.get("X-RateLimit-Remaining"),i=e.headers.get("X-RateLimit-Reset"),n=/\/search\//.test(e.url),s=n?b.search:b.standard;if(s.limit=+t,s.remaining=+r,s.reset=+i,403===e.status&&0===s.remaining){let e=new Date(0);e.setUTCSeconds(s.reset);let t=Math.round((e.getTime()-new Date().getTime())/1e3/60);console.warn(`Rate limit exceeded for ${n?"search API":"non-search APIs"}. Resets in ${t} minute${1===t?"":"s"}.`)}}(t),"GET"===e.method&&-1!==[401,403].indexOf(t.status)&&e.headers.has("Authorization"))return e.headers.delete("Authorization"),w(e);if(function(e,t){let r,i;if("GET"!==e.method||e.headers.has("Authorization")||![401,403,404].includes(t.status)||(r=new URL(v(c)),(i=new URL(e.url)).origin===r.origin&&i.pathname.startsWith(r.pathname)))return!1;let n=g(e);return!/^user(?:\?|$)/.test(n)}(e,t))return w(new Request(new URL(g(e),v(c)),{method:"GET",mode:e.mode,cache:e.cache,headers:new Headers(e.headers)}));return t})}function $(r,i){let n,s;return w((n=f(`repos/${e}/${t}/issues/${r}/comments?page=${i}&per_page=25`),s=`${u},${m}`,n.headers.set("Accept",s),n)).then(e=>{if(!e.ok)throw Error("Error fetching comments.");return e.json()})}async function y(e,t){let r=f(e=function(e){if(!/^https?:\/\//.test(e))return e.replace(/^\/+/,"");let t=new URL(p),r=new URL(e);if(t.origin!==r.origin||!r.pathname.startsWith(t.pathname))throw Error(`Reaction URL "${e}" does not match endpoint "${t.href}"`);let i=r.pathname.substring(t.pathname.length).replace(/^\/+/,"");return`${i}${r.search}`}(e),{method:"POST",body:JSON.stringify({content:t})});r.headers.set("Accept",m);let i=await w(r),n=i.ok?await i.json():null;if(201===i.status)return{reaction:n,deleted:!1};if(200!==i.status)throw Error('expected "201 reaction created" or "200 reaction already exists"');let s=f(`${e}/${n.id}`,{method:"DELETE"});return s.headers.set("Accept",m),await w(s),{reaction:n,deleted:!0}}let E=[1e3,"second",6e4,"minute",36e5,"hour",864e5,"day",6048e5,"week",23328e5,"month"],L={month:"short",day:"numeric",year:"numeric"},x=-1;function k(){let e=document.body.scrollHeight;e!==x&&(x=e,parent.postMessage({type:"resize",height:e},r))}let A=0;function C(){let e=Date.now();e-A>50&&(A=e,setTimeout(k,50))}let T={"+1":"Thumbs Up","-1":"Thumbs Down",laugh:"Laugh",hooray:"Hooray",confused:"Confused",heart:"Heart",rocket:"Rocket",eyes:"Eyes"},R={"+1":"👍","-1":"👎",laugh:"️😂",hooray:"️🎉",confused:"😕",heart:"❤️",rocket:"🚀",eyes:"👀"};function S(e,t,r,i){return`
  <button
    reaction
    type="submit"
    action="javascript:"
    formaction="${e}"
    class="btn BtnGroup-item reaction-button"
    value="${t}"
    aria-label="Toggle ${T[t]} reaction"
    reaction-count="${i}"
    ${r?"disabled":""}>
    ${R[t]}
  </button>`}function U(e,t){let r=t=>S(e,t,!1,0)+`<span class="reaction-name" aria-hidden="true">${T[t]}</span>`;return`
  <details class="details-overlay details-popover reactions-popover">
    <summary ${"center"===t?'tabindex="-1"':""}>${M}</summary>
    <div class="Popover" style="${"center"===t?"left: 50%;transform: translateX(-50%)":"right:6px"}">
      <form class="Popover-message ${"center"===t?"":"Popover-message--top-right"} box-shadow-large" action="javascript:">
        <span class="reaction-name">Pick your reaction</span>
        <div class="BtnGroup">
          ${d.slice(0,4).map(r).join("")}
        </div>
        <div class="BtnGroup">
          ${d.slice(4).map(r).join("")}
        </div>
      </form>
    </div>
  </details>`}function _(e){return`
  <details class="details-overlay details-popover reactions-popover">
    <summary aria-label="Reactions Menu">${M}</summary>
    <div class="Popover" style="${"center"===e?"left: 50%;transform: translateX(-50%)":"right:6px"}">
      <div class="Popover-message ${"center"===e?"":"Popover-message--top-right"} box-shadow-large" style="padding: 16px">
        <span><a href="${o(s.url)}" target="_top">Sign in</a> to add your reaction.</span>
      </div>
    </div>
  </details>`}let M='<svg class="octicon" style="margin-right:3px" viewBox="0 0 7 16" version="1.1" width="7" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 4H3v3H0v1h3v3h1V8h3V7H4V4z"></path></svg><svg class="octicon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.81 12.81a6.72 6.72 0 0 1-2.17 1.45c-.83.36-1.72.53-2.64.53-.92 0-1.81-.17-2.64-.53-.81-.34-1.55-.83-2.17-1.45a6.773 6.773 0 0 1-1.45-2.17A6.59 6.59 0 0 1 1.21 8c0-.92.17-1.81.53-2.64.34-.81.83-1.55 1.45-2.17.62-.62 1.36-1.11 2.17-1.45A6.59 6.59 0 0 1 8 1.21c.92 0 1.81.17 2.64.53.81.34 1.55.83 2.17 1.45.62.62 1.11 1.36 1.45 2.17.36.83.53 1.72.53 2.64 0 .92-.17 1.81-.53 2.64-.34.81-.83 1.55-1.45 2.17zM4 6.8v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2H5.2C4.53 8 4 7.47 4 6.8zm5 0v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2h-.59C9.53 8 9 7.47 9 6.8zm4 3.2c-.72 1.88-2.91 3-5 3s-4.28-1.13-5-3c-.14-.39.23-1 .66-1h8.59c.41 0 .89.61.75 1z"></path></svg>',H={COLLABORATOR:"Collaborator",CONTRIBUTOR:"Contributor",MEMBER:"Member",OWNER:"Owner",FIRST_TIME_CONTRIBUTOR:"First time contributor",FIRST_TIMER:"First timer",NONE:""};class B{constructor(e,t,r){this.comment=e,this.currentUser=t;let{user:i,html_url:n,created_at:s,body_html:a,author_association:o,reactions:l}=e;this.element=document.createElement("article"),this.element.classList.add("timeline-comment"),i.login===t&&this.element.classList.add("current-user");let h=H[o],c=d.reduce((e,t)=>e+l[t],0),u="",m="";r||(t?(u=U(e.reactions.url,"right"),m=U(e.reactions.url,"center")):(u=_("right"),m=_("center"))),this.element.innerHTML=`
      <a class="avatar" href="${i.html_url}" target="_blank" tabindex="-1">
        <img alt="@${i.login}" height="44" width="44"
              src="${i.avatar_url}?v=3&s=88">
      </a>
      <div class="comment">
        <header class="comment-header">
          <span class="comment-meta">
            <a class="text-link" href="${i.html_url}" target="_blank"><strong>${i.login}</strong></a>
            commented
            <a class="text-link" href="${n}" target="_blank">${function(e,t){let r=e-t.getTime();if(r<5e3)return"just now";let i=0;for(;i+2<E.length&&1.1*r>E[i+2];)i+=2;let n=E[i],s=E[i+1],a=Math.round(r/n);return a>3&&i===E.length-2?`on ${t.toLocaleDateString(void 0,L)}`:1===a?`${"hour"===s?"an":"a"} ${s} ago`:`${a} ${s}s ago`}(Date.now(),new Date(s))}</a>
          </span>
          <div class="comment-actions">
            ${h?`<span class="author-association-badge">${h}</span>`:""}
            ${u}
          </div>
        </header>
        <div class="markdown-body markdown-body-scrollable">
          ${a}
        </div>
        <div class="comment-footer" reaction-count="${c}" reaction-url="${l.url}">
          <form class="reaction-list BtnGroup" action="javascript:">
            ${d.map(e=>S(l.url,e,!t||r,l[e])).join("")}
          </form>
          ${m}
        </div>
      </div>`;let p=this.element.querySelector(".markdown-body"),v=p.querySelector(".email-hidden-toggle a");if(v){let e=p.querySelector(".email-hidden-reply");v.onclick=t=>{t.preventDefault(),e.classList.toggle("expanded")}}O(p)}setCurrentUser(e){this.currentUser!==e&&(this.currentUser=e,this.comment.user.login===this.currentUser?this.element.classList.add("current-user"):this.element.classList.remove("current-user"))}}function O(e){Array.from(e.querySelectorAll(":not(.email-hidden-toggle) > a")).forEach(e=>{e.target="_top",e.rel="noopener noreferrer"}),Array.from(e.querySelectorAll("img")).forEach(e=>e.onload=C),Array.from(e.querySelectorAll("a.commit-tease-sha")).forEach(e=>e.href="https://github.com"+e.pathname)}class z{constructor(e,t){this.user=e,this.issue=t,this.timeline=[],this.count=0,this.element=document.createElement("main"),this.element.classList.add("timeline"),this.element.innerHTML=`
      <h1 class="timeline-header">
        <a class="text-link" target="_blank"></a>
        <em>
          - powered by
          <a class="text-link" href="https://utteranc.raw2.cc" target="_blank">utteranc.raw2.cc</a>
        </em>
      </h1>`,this.countAnchor=this.element.firstElementChild.firstElementChild,this.marker=document.createComment("marker"),this.element.appendChild(this.marker),this.setIssue(this.issue),this.renderCount()}setUser(e){this.user=e;let t=e?e.login:null;for(let e=0;e<this.timeline.length;e++)this.timeline[e].setCurrentUser(t);C()}setIssue(e){this.issue=e,e?(this.count=e.comments,this.countAnchor.href=e.html_url,this.renderCount()):this.countAnchor.removeAttribute("href")}insertComment(e,t){let r=new B(e,this.user?this.user.login:null,this.issue.locked),i=this.timeline.findIndex(t=>t.comment.id>=e.id);if(-1===i)this.timeline.push(r),this.element.insertBefore(r.element,this.marker);else{let t=this.timeline[i],n=t.comment.id===e.id;this.element.insertBefore(r.element,t.element),this.timeline.splice(i,+!!n,r),n&&t.element.remove()}t&&(this.count++,this.renderCount()),C()}insertPageLoader(e,t,r){let{element:i}=this.timeline.find(t=>t.comment.id>=e.id);i.insertAdjacentHTML("afterend",`
      <div class="page-loader">
        <div class="zigzag"></div>
        <button type="button" class="btn btn-outline btn-large">
          ${t} hidden items<br/>
          <span>Load more...</span>
        </button>
      </div>
    `);let n=i.nextElementSibling,s=n.lastElementChild,a=s.lastElementChild;return s.onclick=r,{setBusy(){a.textContent="Loading...",s.disabled=!0},remove(){s.onclick=null,n.remove()}}}renderCount(){this.countAnchor.textContent=`${this.count} Comment${1===this.count?"":"s"}`}}let I=`data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" version="1.1"><path fill="rgb(179,179,179)" fill-rule="evenodd" d="M8 10.5L9 14H5l1-3.5L5.25 9h3.5L8 10.5zM10 6H4L2 7h10l-2-1zM9 2L7 3 5 2 4 5h6L9 2zm4.03 7.75L10 9l1 2-2 3h3.22c.45 0 .86-.31.97-.75l.56-2.28c.14-.53-.19-1.08-.72-1.22zM4 9l-3.03.75c-.53.14-.86.69-.72 1.22l.56 2.28c.11.44.52.75.97.75H5l-2-3 1-2z"></path></svg>')}`,P="Nothing to preview";class j{constructor(r,i){var n;let a;this.user=r,this.submit=i,this.submitting=!1,this.renderTimeout=0,this.handleInput=()=>{let r=this.textarea.value,i=/^\s*$/.test(r);this.submitButton.disabled=i,this.textarea.scrollHeight<450&&this.textarea.offsetHeight<this.textarea.scrollHeight&&(this.textarea.style.height=`${this.textarea.scrollHeight}px`,C()),clearTimeout(this.renderTimeout),i?this.preview.textContent=P:(this.preview.textContent="Loading preview...",this.renderTimeout=setTimeout(()=>w(f("markdown",{method:"POST",body:JSON.stringify({text:r,mode:"gfm",context:`${e}/${t}`})})).then(e=>e.text()).then(e=>this.preview.innerHTML=e).then(()=>O(this.preview)).then(C),500))},this.handleSubmit=async e=>{e.preventDefault(),this.submitting||(this.submitting=!0,this.textarea.disabled=!0,this.submitButton.disabled=!0,await this.submit(this.textarea.value).catch(()=>0),this.submitting=!1,this.textarea.disabled=!this.user,this.textarea.value="",this.submitButton.disabled=!1,this.handleClick({...e,target:this.form.querySelector(".tabnav-tab.tab-write")}),this.preview.textContent=P)},this.handleClick=({target:e})=>{if(!(e instanceof HTMLButtonElement)||!e.classList.contains("tabnav-tab")||"true"===e.getAttribute("aria-selected"))return;this.form.querySelector('.tabnav-tab[aria-selected="true"]').setAttribute("aria-selected","false"),e.setAttribute("aria-selected","true");let t=e.classList.contains("tab-preview");this.textarea.style.display=t?"none":"",this.preview.style.display=t?"":"none",C()},this.handleKeyDown=({which:e,ctrlKey:t})=>{13===e&&t&&!this.submitButton.disabled&&this.form.dispatchEvent(new CustomEvent("submit"))},this.element=document.createElement("article"),this.element.classList.add("timeline-comment"),this.element.innerHTML=`
      <a class="avatar" target="_blank" tabindex="-1">
        <img height="44" width="44">
      </a>
      <form class="comment" accept-charset="UTF-8" action="javascript:">
        <header class="new-comment-header tabnav">
          <div class="tabnav-tabs" role="tablist">
            <button type="button" class="tabnav-tab tab-write"
                    role="tab" aria-selected="true">
              Write
            </button>
            <button type="button" class="tabnav-tab tab-preview"
                    role="tab">
              Preview
            </button>
          </div>
        </header>
        <div class="comment-body">
          <textarea class="form-control" placeholder="Leave a comment" aria-label="comment"></textarea>
          <div class="markdown-body" style="display: none">
            ${P}
          </div>
        </div>
        <footer class="new-comment-footer">
          <a class="text-link markdown-info" tabindex="-1" target="_blank"
             href="https://guides.github.com/features/mastering-markdown/">
            <svg class="octicon v-align-bottom" viewBox="0 0 16 16" version="1.1"
              width="16" height="16" aria-hidden="true">
              <path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15
                13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4
                8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z">
              </path>
            </svg>
            Styling with Markdown is supported
          </a>
          <button class="btn btn-primary" type="submit">Comment</button>
          <a class="btn btn-primary" href="${o(s.url)}" target="_top">
            <svg class="octicon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
            Sign in with GitHub
          </a>
        </footer>
      </form>`,this.avatarAnchor=this.element.firstElementChild,this.avatar=this.avatarAnchor.firstElementChild,this.form=this.avatarAnchor.nextElementSibling,this.textarea=this.form.firstElementChild.nextElementSibling.firstElementChild,this.preview=this.form.firstElementChild.nextElementSibling.lastElementChild,this.signInAnchor=this.form.lastElementChild.lastElementChild,this.submitButton=this.signInAnchor.previousElementSibling,this.setUser(r),this.submitButton.disabled=!0,this.textarea.addEventListener("input",this.handleInput),this.form.addEventListener("submit",this.handleSubmit),this.form.addEventListener("click",this.handleClick),this.form.addEventListener("keydown",this.handleKeyDown),n=this.textarea,a=()=>{removeEventListener("mousemove",C),removeEventListener("mouseup",a)},n.addEventListener("mousedown",()=>{addEventListener("mousemove",C),addEventListener("mouseup",a)})}setUser(e){this.user=e,this.submitButton.hidden=!e,this.signInAnchor.hidden=!!e,e?(this.avatarAnchor.href=e.html_url,this.avatar.alt="@"+e.login,this.avatar.src=e.avatar_url+"?v=3&s=88",this.textarea.disabled=!1,this.textarea.placeholder="Leave a comment"):(this.avatarAnchor.removeAttribute("href"),this.avatar.alt="@anonymous",this.avatar.src=I,this.textarea.disabled=!0,this.textarea.placeholder="Sign in to comment")}clear(){this.textarea.value=""}}async function N(e,t){let r=e=>{for(let r of e)t.insertComment(r,!1)},i=Math.ceil(e.comments/25),n=[$(e.number,1)];i>1&&n.push($(e.number,i)),i>2&&e.comments%25<3&&e.comments%25!=0&&n.push($(e.number,i-1));let s=await Promise.all(n);for(let e of s)r(e);let a=i-n.length,o=2,l=i=>{if(0===a)return;let n=async()=>{h.setBusy();let t=await $(e.number,o);h.remove(),r(t),a--,o++,l(t)},s=i.pop(),h=t.insertPageLoader(s,25*a,n)};l(s[0])}e=s.owner,t=s.repo,p=(i=s.endpoint)&&""!==i.trim()?`${i.trim().replace(/\/+$/,"")}/`:`${h}/`,async function(){var i,n,o,h,c;let d;await l().catch(()=>null);let[p,v]=await Promise.all([null!==s.issueNumber?(h=s.issueNumber,w(f(`repos/${e}/${t}/issues/${h}`)).then(e=>{if(!e.ok)throw Error("Error fetching issue via issue number.");return e.json()})):(c=s.issueTerm,d=`"${c}" type:issue in:title repo:${e}/${t}`,w(f(`search/issues?q=${encodeURIComponent(d)}&sort=created&order=asc`)).then(e=>{if(!e.ok)throw Error("Error fetching issue via search.");return e.json()}).then(e=>{if(0===e.total_count)return null;for(let t of(e.total_count>1&&console.warn(`Multiple issues match "${d}".`),c=c.toLowerCase(),e.items))if(-1!==t.title.toLowerCase().indexOf(c))return t;return console.warn(`Issue search results do not contain an issue with title matching "${c}". Using first result.`),e.items[0]})),null===a.value?Promise.resolve(null):w(f("user")).then(e=>e.ok?e.json():null),(i=s.theme,n=s.origin,new Promise(e=>{let t=document.createElement("link");t.rel="stylesheet",t.setAttribute("crossorigin","anonymous"),t.onload=e,t.href=`/stylesheets/themes/${i}/utterances.css`,document.head.appendChild(t),addEventListener("message",e=>{e.origin===n&&"set-theme"===e.data.type&&(t.href=`/stylesheets/themes/${e.data.theme}/utterances.css`)})}))]);r=s.origin,addEventListener("resize",C),addEventListener("load",C);let g=new z(v,p);if(document.body.appendChild(g.element),p&&p.comments>0&&N(p,g),C(),p&&p.locked)return;o=!!v,addEventListener("click",async e=>{let t=e.target instanceof HTMLElement&&e.target.closest("button");if(!t||!t.hasAttribute("reaction")||(e.preventDefault(),!o))return;t.disabled=!0;let r=t.closest("details");r&&(r.open=!1);let i=t.formAction,n=t.value,{deleted:s}=await y(i,n),a=`button[reaction][formaction="${i}"][value="${n}"],[reaction-count][reaction-url="${i}"]`,l=Array.from(document.querySelectorAll(a)),h=s?-1:1;for(let e of l)e.setAttribute("reaction-count",(parseInt(e.getAttribute("reaction-count"),10)+h).toString());t.disabled=!1,C()},!0);let b=new j(v,async r=>{var i,n,a,o,l,h;let c,d;if(!p){let r,h,c;p=await (i=s.issueTerm,n=s.url,a=s.title,o=s.description||"",l=s.label,r=`repos/${e}/${t}/issues`,h={title:i,body:`# ${a}

${o}

[${n}](${n})`},l&&(h.labels=[l]),(c=f(r,{method:"POST",body:JSON.stringify(h)})).headers.set("Accept",m),w(c).then(e=>{if(!e.ok)throw Error("Error creating comments container issue");return e.json()})),g.setIssue(p)}let v=await (h=p.number,c=f(`repos/${e}/${t}/issues/${h}/comments`,{method:"POST",body:JSON.stringify({body:r})}),d=`${u},${m}`,c.headers.set("Accept",d),w(c).then(e=>{if(!e.ok)throw Error("Error posting comment.");return e.json()}));g.insertComment(v,!0),b.clear()});g.element.appendChild(b.element)}(),addEventListener("not-installed",function e(){removeEventListener("not-installed",e),document.querySelector(".timeline").insertAdjacentHTML("afterbegin",`
  <div class="flash flash-error">
    Error: utterances is not installed on <code>${s.owner}/${s.repo}</code>.
    If you own this repo,
    <a href="https://github.com/apps/utterances" target="_top"><strong>install the app</strong></a>.
    Read more about this change in
    <a href="https://github.com/utterance/utterances/pull/25" target="_top">the PR</a>.
  </div>`),C()});
//# sourceMappingURL=utterances.05b1b771.js.map
