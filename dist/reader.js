/* Price Action Atlas · on-demand reading library · 2026-10-26 */
(() => {
  "use strict";
  const q = s => document.querySelector(s), qa = s => Array.from(document.querySelectorAll(s));
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const KEY = "price-action-atlas-reader-v1", S = globalThis.AtlasReaderState;
  const dialog = q("#reader-dialog"), cache = new Map();
  let manifest = [], ids = [], state = {version:1,records:{}}, current = null, activeTab = "guide";
  let limit = 6, ticket = 0, saved = true, opener = null, manifestReady = false;
  const url = u => { try { const x = new URL(u); return /^https?:$/.test(x.protocol) ? x.href : "#"; } catch { return "#"; } };
  const link = (u,t) => '<a href="'+esc(url(u))+'" target="_blank" rel="noopener noreferrer">'+esc(t)+' ↗</a>';
  const Z=globalThis.AtlasZh||{inline:esc,paragraph:v=>"<p>"+esc(v)+"</p>",list:a=>"<ul>"+a.map(v=>"<li>"+esc(v)+"</li>").join("")+"</ul>",setArticle:()=>{},original:v=>"<p>"+esc(v)+"</p>"};
  const paragraphs = a => a.map(p=>Z.paragraph(p,current?.glossary||[])).join("");
  const list = a => Z.list(a,current?.glossary||[]);
  function record(id) { return state.records[id] || {read:false,bookmarked:false,note:"",updated:""}; }
  function notice(text) { q("#reading-result").textContent = text; }
  function storageStatus() {
    q("#reading-storage").textContent = saved ? "閱讀筆記儲存在此瀏覽器，可匯出備份。" : "瀏覽器未能儲存：本次變更暫留記憶體，離開前請匯出備份。";
    q("#reading-storage").classList.toggle("storage-warning", !saved);
    if (current) q("#reader-note-status").textContent = saved ? "已儲存在此瀏覽器；不會上傳或同步。" : "尚未寫入瀏覽器，請先備份這篇筆記。";
  }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); saved = true; }
    catch { saved = false; }
    storageStatus();
  }
  function update(patch) {
    if (!current) return;
    state.records[current.id] = {...record(current.id),...patch,updated:new Date().toISOString()};
    persist();
  }
  function download(name, value) {
    const blob = new Blob([JSON.stringify(value,null,2)],{type:"application/json;charset=utf-8"});
    const objectURL = URL.createObjectURL(blob), a = document.createElement("a");
    a.href=objectURL; a.download=name; a.click();
    setTimeout(()=>URL.revokeObjectURL(objectURL),1000);
  }
  function backup(only) {
    const records = only ? {[only]:record(only)} : state.records;
    download(only ? only+"-note.json" : "price-action-atlas-reading-notes.json",
      {application:"price-action-atlas-reading",version:1,exportedAt:new Date().toISOString(),records});
  }
  function filtered() {
    const text=q("#reading-search").value.trim().toLocaleLowerCase(), terms=text.split(/\s+/).filter(Boolean);
    const category=q("#reading-category").value, progress=q("#reading-state").value;
    const topic=q("#reading-topic").value, batch=q("#reading-batch").value;
    return manifest.filter(a=>{
      const r=record(a.id);
      return (category==="all"||a.category===category) &&
        (topic==="all"||a.topic===topic) && (batch==="all"||String(a.batch)===batch) &&
        (progress==="all"||(progress==="read"?r.read:progress==="unread"?!r.read:r.bookmarked)) &&
        terms.every(t=>[a.title,a.subtitle,a.summary,a.category,...a.tags].join(" ").toLocaleLowerCase().includes(t));
    });
  }
  let learningPaths=[], activeLearningPath="start";
  function renderLearningRoutes() {
    globalThis.AtlasSiteMaps?.update(manifest,state.records);
    const P=globalThis.AtlasLearningPaths;
    if(!P||!learningPaths.length)return;
    const picker=q("#reading-path-select");
    if(picker){
      if(!picker.dataset.ready){picker.innerHTML=P.options(learningPaths);picker.dataset.ready="true";}
      picker.disabled=false;picker.value=activeLearningPath;
    }
    q("#reading-route-grid").innerHTML=P.render(P.model(learningPaths,activeLearningPath,state.records));
  }
  function renderCatalog() {
    if (!manifestReady) return;
    const rows=filtered(), shown=rows.slice(0,limit);
    q("#reading-count").textContent=manifest.length;
    q("#reading-done").textContent=ids.filter(id=>record(id).read).length;
    q("#reading-saved").textContent=ids.filter(id=>record(id).bookmarked).length;
    const guides=manifest.filter(a=>a.mode==="guide").length, licensed=manifest.filter(a=>a.mode==="licensed-section").length;
    q("#reading-result").textContent="顯示 "+shown.length+" / "+rows.length+" 個單元 · "+guides+" 篇原創導讀＋"+licensed+" 篇授權節譯";
    q("#reading-grid").innerHTML=shown.length ? shown.map(a=>{
      const r=record(a.id);
      return '<article class="reading-card card"><div class="reading-card-top"><span class="pill '+(a.mode==="licensed-section"?"green":"blue")+'">'+esc(a.category)+'</span><span>'+esc(a.minutes)+' 分鐘</span>'+((a.batch||1)>=2?'<span class="batch-label">'+(a.batch===7?'第七批新讀':a.batch===6?'第六批選讀':a.batch===5?'第五批節譯':a.batch===4?'第四批新增':a.batch===3?'第三批新增':'第二批新增')+'</span>':'')+'</div><h3><a href="#read/'+a.id+'">'+esc(a.title)+'</a></h3><p>'+esc(a.summary)+'</p><div class="reading-card-meta"><span>'+esc(a.mode==="licensed-section"?"CC BY-SA 範圍譯文":"本網站原創導讀")+'</span><span>'+esc(a.level)+'</span><span>'+esc(a.topic||'基礎')+'</span><span>'+esc(a.figureCount||0)+' 張整理圖</span></div><div class="reading-card-bottom"><a href="#read/'+a.id+'" class="text-btn">開啟閱讀 →</a><span aria-label="閱讀狀態">'+(r.read?"已讀 ✓":"尚未標記已讀")+(r.bookmarked?" · 已收藏":"")+'</span></div></article>';
    }).join("") : '<div class="empty-state">沒有符合的單元。請縮短關鍵字或改用「全部閱讀來源」。</div>';
    q("#reading-more").hidden=shown.length>=rows.length;
    storageStatus();renderLearningRoutes();
  }
  function actions() {
    const r=record(current.id);
    q("#reader-bookmark").setAttribute("aria-pressed",String(r.bookmarked));
    q("#reader-bookmark").textContent=r.bookmarked?"已收藏 ✓":"收藏這篇";
    q("#reader-read").setAttribute("aria-pressed",String(r.read));
    q("#reader-read").textContent=r.read?"已標記已讀 ✓":"標記已讀";
    q("#reader-note").value=r.note;
    const i=ids.indexOf(current.id);
    q("#reader-position").textContent="閱讀庫排序 "+(i+1)+" / "+ids.length;
    q("#reader-previous").disabled=i===0; q("#reader-next").disabled=i===ids.length-1;
    storageStatus();
  }
  function sourceHTML(a) {
    const sources=a.sources.map(s=>'<section class="reader-source"><h3>'+link(s.url,s.title)+'</h3><p><strong>作者：</strong>'+esc(Z.sourceAuthor?Z.sourceAuthor(s):s.author)+'<br><strong>來源語言：</strong>'+esc(s.language)+' · 查核 '+esc(s.checked)+'</p><p><strong>實際取得：</strong>'+esc(s.access)+'</p><p><strong>本頁使用範圍：</strong>'+esc(s.scope)+'</p><p><strong>授權：</strong>'+esc(s.license)+'</p></section>').join("");
    const refs=a.courseRefs.length?'<h2 id="reader-course">Brooks 官方單元對照</h2><p>以下依官方公開頁標題核對。相關補讀不表示本篇是該付費單元的翻譯，也不表示已觀看付費課程。</p>'+a.courseRefs.map(r=>'<p><strong>'+esc(r.version)+" "+esc(r.unit)+" · "+esc(r.topic)+'</strong><br>'+esc(r.relation)+' · '+link(r.url,"官方單元")+'</p>').join(""):'<p>本篇未指定 Brooks 課程出處。作者自有內容不因觀念相近而歸屬 Brooks。</p>';
    const license=a.license?'<section class="reader-license"><h2>本小節的重用授權</h2><p>'+esc(a.license.attribution)+'</p><p><strong>範圍：</strong>'+esc(a.license.scope)+'</p><p><strong>修改：</strong>'+esc(a.license.changes)+'</p><p>'+link(a.license.url,a.license.id)+' · '+link(a.license.sourceRevision,"固定原文版本")+' · '+link(a.license.history,"作者與修訂歷史")+'</p><p>此授權適用本篇節譯與附加說明，不將整個網站程式或其他作者教材一併變更授權。下載檔保留原文、譯文與署名，可依相同授權重用。</p></section>':"";
    return '<h2 id="reader-provenance">查核與使用界線</h2><p>'+esc(a.provenance)+'</p><p><strong>翻譯狀態：</strong>'+esc(a.translationStatus)+'</p>'+sources+refs+license+'<p class="reader-revision">本頁版本 '+esc(a.revision)+' · 網站編輯與翻譯由 AI 協助，閱讀時請對照原始資料。<a href="#plan" data-reader-plan>返回原有學習任務 →</a></p>';
  }
  function diagram() {
    return '<figure class="reader-figure"><svg viewBox="0 0 680 150" role="img" aria-label="自編研究流程：事實、假說、失效條件、記錄結果"><rect x="8" y="30" width="140" height="80" rx="16" fill="#eef5ff"/><rect x="182" y="30" width="140" height="80" rx="16" fill="#eef5ff"/><rect x="356" y="30" width="140" height="80" rx="16" fill="#fff4e5"/><rect x="530" y="30" width="140" height="80" rx="16" fill="#eef6ef"/><g fill="#1d1d1f" font-size="19" text-anchor="middle" font-weight="700"><text x="78" y="76">觀察事實</text><text x="252" y="76">提出假說</text><text x="426" y="76">失效條件</text><text x="600" y="76">保留結果</text></g><g fill="#86868b" font-size="24"><text x="156" y="77">→</text><text x="330" y="77">→</text><text x="504" y="77">→</text></g></svg><figcaption>本網站自編示意流程，非作者原圖、交易訊號或績效證據。</figcaption></figure>';
  }
  function translationHTML(a) {
    if(!a.translation||!a.license)return '<p>本篇沒有已授權的完整譯文。</p>';
    const block=(t,lang)=>{const v=t[lang];if(t.kind==='list')return '<'+(t.ordered?'ol':'ul')+'>'+v.map(x=>'<li>'+esc(x)+'</li>').join('')+'</'+(t.ordered?'ol':'ul')+'>';return '<p>'+esc(v)+'</p>';};
    return '<h2 id="reader-translation">授權選段・繁中對照</h2><div class="reader-license"><strong>'+esc(a.translationScope||a.license.scope)+'</strong><p>'+esc(a.license.attribution)+' '+link(a.license.url,a.license.id)+'</p></div>'+a.translation.map(t=>{
      if(t.kind==='table'){const table=lang=>'<div class="reader-table-wrap"><table class="reader-translation-table"><thead><tr>'+t.headers[lang].map(v=>'<th>'+esc(v)+'</th>').join('')+'</tr></thead><tbody>'+t.rows.map(row=>'<tr>'+row[lang].map(v=>'<td>'+esc(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';return table('zh')+'<details class="zh-original"><summary>展開英文原表</summary><div lang="en">'+table('en')+'</div></details>';}
      if(t.kind==='heading')return '<h3 class="reader-translation-heading">'+esc(t.zh)+'</h3>'+Z.original(t.en,'展開英文標題');
      return '<div class="reader-parallel"><div lang="zh-Hant"><span class="reader-label">繁體中文譯文</span>'+block(t,'zh')+'</div><details class="zh-original"><summary>展開本段英文原文</summary><div lang="en">'+block(t,'en')+'</div></details></div>';
    }).join('')+'<h3>編輯校對註</h3>'+paragraphs(a.translationNotes||[]);
  }
  function renderTab(name) {
    if (!current) return;
    activeTab=name;
    const a=current, body=q("#reader-body"); Z.setArticle(a);
    qa("[data-reader-tab]").forEach(b=>{const selected=b.dataset.readerTab===name;b.setAttribute("aria-selected",String(selected));b.tabIndex=selected?0:-1;});
    if(name==="guide"){
      body.innerHTML='<div class="reader-label">'+(a.mode==="licensed-section"?"節譯導覽與編輯說明":"本網站原創導讀 · 非原作者逐字稿")+'</div><h2 id="reader-summary">本篇學習摘要</h2><p class="reader-lead">'+esc(a.summary)+'</p><section class="reader-keypoints"><h3>先記住這幾點</h3>'+list(a.keyPoints)+'</section><div class="reader-source-summary"><strong>來源短摘要／查核範圍</strong><p>'+esc(a.sourceSummary)+'</p></div>'+a.sections.map((s,i)=>'<section id="reader-section-'+i+'"><h2 id="reader-heading-'+i+'">'+esc(s.heading)+'</h2>'+paragraphs(s.paragraphs)+(globalThis.AtlasFigures?.render(a,i)||'')+'</section>').join("")+'<p class="reader-study-note"><strong>閱讀後：</strong>切換到「整理圖」放大圖像，或用「圖例與測驗」練習；「來源與授權」保留實際取得範圍。</p>';
      if(a.translation&&a.license)body.innerHTML='<div class="reader-license"><strong>本篇提供明列範圍的英文與繁體中文對照。</strong><p>先讀導讀，或直接逐段核對原文、清單與中文；校對註另列。</p><button type="button" class="btn primary" data-open-translation>閱讀英文／繁中對照 →</button></div>'+body.innerHTML;
      if(a.communityRef)body.innerHTML='<aside class="reader-source-summary"><strong>本篇搭配英文來源與短句翻譯</strong><p><a href="#community-'+esc(a.communityRef)+'">開啟原作者選讀、短句翻譯與評價依據 →</a></p></aside>'+body.innerHTML;
      if(globalThis.AtlasProbabilities){
        body.innerHTML=body.innerHTML.replace('<div class="reader-source-summary">',globalThis.AtlasProbabilities.banner(a)+'<div class="reader-source-summary">');
        // Insert only at the explicit passage index. Never infer a number from a keyword.
        a.sections.forEach((s,i)=>{const marker='<section id="reader-section-'+i+'"><h2 id="reader-heading-'+i+'">'+esc(s.heading)+'</h2>'+paragraphs(s.paragraphs);body.innerHTML=body.innerHTML.replace(marker,marker+globalThis.AtlasProbabilities.inline(a,i));});
      }
    } else if(name==="figures"){
      body.innerHTML=globalThis.AtlasFigures?globalThis.AtlasFigures.renderAll(a):'<h2 id="reader-figures">整理圖暫時未載入</h2><p>請重新整理以讀取圖解；原文章與練習仍可使用。</p>';
    } else if(name==="probabilities"){
      body.innerHTML=globalThis.AtlasProbabilities?globalThis.AtlasProbabilities.render(a):'<h2 id="reader-probability">機率註記暫時未載入</h2><p>請重新整理。不要因缺少標註而自行推定機率。</p>';
    } else if(name==="exercise"){
      body.innerHTML='<div class="reader-label">本網站自編練習 · 非作者官方交易系統</div><h2 id="reader-exercise">'+esc(a.exercise.title)+'</h2>'+diagram()+'<ol>'+a.exercise.steps.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol><h2 id="reader-review">完成後的檢核</h2>'+list(a.exercise.review)+'<p>練習可使用歷史回放與模擬紀錄。這些問題沒有替策略提供勝率或收益保證。</p>';
    } else if(name==="glossary"){
      body.innerHTML=globalThis.AtlasGlossary?globalThis.AtlasGlossary.render(a,Z):'<h2 id="reader-glossary">中英術語</h2><p>以下是本篇使用的工作定義。不同作者可能有不同用法，請對照原文。</p><dl class="reader-terms">'+a.glossary.map(t=>'<div><dt><strong>'+esc(t.en.toLowerCase()==='fill'?'成交':t.zh)+'</strong></dt><dd>'+Z.inline(t.note,a.glossary)+Z.original(t.en,"展開英文術語")+'</dd></div>').join("")+'</dl>';
      if(globalThis.AtlasGlossary)globalThis.AtlasGlossary.mount(body,a);
    } else if(name==="cases") {body.innerHTML=globalThis.AtlasPractice.render(a);globalThis.AtlasPractice.mount(body,a);}
    else if(name==="translation") body.innerHTML=translationHTML(a);
    else body.innerHTML=sourceHTML(a);
    if(name==="guide"&&globalThis.AtlasReadingGuide?.compose)body.innerHTML=globalThis.AtlasReadingGuide.compose(body.innerHTML,a);
    q("#reader-toc").innerHTML='<strong>本頁目錄</strong>'+Array.from(body.querySelectorAll("h2[id]")).map(h=>'<a href="#'+h.id+'" data-toc="'+h.id+'">'+esc(h.textContent)+'</a>').join("");
    q("#reader-toc").querySelectorAll("[data-toc]").forEach(el=>el.addEventListener("click",e=>{e.preventDefault();const target=document.getElementById(el.dataset.toc);if(target){let parent=target.parentElement;while(parent&&parent!==body){if(parent.tagName==="DETAILS")parent.open=true;parent=parent.parentElement;}target.scrollIntoView({behavior:"smooth",block:"start"});}}));
    body.querySelectorAll("[data-reader-plan]").forEach(el=>el.addEventListener("click",()=>{dialog.close();}));
    body.querySelectorAll("[data-reader-probability]").forEach(el=>el.addEventListener("click",()=>{renderTab("probabilities");document.getElementById("reader-prob-"+el.dataset.readerProbability)?.scrollIntoView({behavior:"smooth",block:"start"});}));
    body.querySelectorAll("[data-open-translation]").forEach(el=>el.addEventListener("click",()=>{renderTab("translation");document.getElementById("reader-translation")?.scrollIntoView({block:"start"});}));
    body.setAttribute("aria-labelledby","reader-tab-"+name);
  }
  async function openArticle(id) {
    const found=manifest.find(a=>a.id===id), token=++ticket;
    if (!dialog.open) { opener=document.activeElement; dialog.showModal(); document.documentElement.classList.add("reader-open"); }
    q("#reader-document").hidden=true; q("#reader-loading").hidden=false;
    q("#reader-loading").textContent="正在載入這篇內容…"; current=null;
    if(!found){q("#reader-loading").textContent="找不到這篇閱讀單元。請按「閱讀庫」返回目錄。";return;}
    try {
      let a=cache.get(id);
      if(!a){const response=await fetch("reading/articles/"+encodeURIComponent(id)+".json",{cache:"no-cache"});if(!response.ok)throw new Error("HTTP "+response.status);a=await response.json();if(a.id!==id||!Array.isArray(a.sections))throw new Error("內容版本不一致");cache.set(id,a);}
      if(token!==ticket)return;
      current=a;
      q("#reader-title").textContent=a.title; q("#reader-subtitle").textContent=a.subtitle;
      q("#reader-meta").textContent=a.language+"來源 · 約 "+a.minutes+" 分鐘 · "+a.level+" · 文章修訂 "+a.revision;
      q("#reader-badges").innerHTML='<span class="pill blue">'+esc(a.category)+'</span><span class="pill">'+esc(a.mode==="licensed-section"?"授權範圍節譯":"原創導讀")+'</span>';
      q('[data-reader-tab="translation"]').hidden=!a.translation;
      q('[data-reader-tab="cases"]').hidden=!a.caseQuiz?.length;
      q("#reader-license-download").hidden=!a.license;
      q("#reader-loading").hidden=true; q("#reader-document").hidden=false;
      actions(); renderTab("guide"); dialog.scrollTop=0; q("#reader-title").focus({preventScroll:true});
    } catch(e) {
      if(token!==ticket)return;
      q("#reader-loading").replaceChildren();
      const p=document.createElement("p");p.textContent="內容暫時無法載入（"+e.message+"）。原有學習計畫仍可使用。";
      const retry=document.createElement("button");retry.className="btn secondary";retry.textContent="重新載入本篇";retry.addEventListener("click",()=>openArticle(id));
      q("#reader-loading").append(p,retry);
    }
  }
  function route() {
    if(!manifestReady)return;
    if(location.hash.startsWith("#read/")){
      const id=location.hash.slice(6);
      if(current?.id!==id)openArticle(id);
    } else if(dialog.open){ticket++;dialog.close();}
  }
  function goCatalog() { location.hash="reading"; route(); }
  qa("[data-reader-tab]").forEach(b=>{
    b.id="reader-tab-"+b.dataset.readerTab;b.setAttribute("aria-controls","reader-body");
    b.addEventListener("click",()=>renderTab(b.dataset.readerTab));
    b.addEventListener("keydown",e=>{
      if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;e.preventDefault();
      const tabs=qa("[data-reader-tab]").filter(x=>!x.hidden),i=tabs.indexOf(b);
      const next=tabs[e.key==="Home"?0:e.key==="End"?tabs.length-1:(i+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length];
      renderTab(next.dataset.readerTab);next.focus();
    });
  });
  q("#reader-back").addEventListener("click",e=>{e.preventDefault();goCatalog();});
  q("#reader-close").addEventListener("click",goCatalog);
  dialog.addEventListener("cancel",e=>{e.preventDefault();goCatalog();});
  dialog.addEventListener("close",()=>{
    ticket++;current=null;document.documentElement.classList.remove("reader-open");
    if(opener?.isConnected)opener.focus({preventScroll:true});
  });
  q("#reader-read").addEventListener("click",()=>{update({read:!record(current.id).read});actions();renderCatalog();});
  q("#reader-bookmark").addEventListener("click",()=>{update({bookmarked:!record(current.id).bookmarked});actions();renderCatalog();});
  q("#reader-note").addEventListener("input",e=>update({note:e.target.value}));
  q("#reader-export-one").addEventListener("click",()=>current&&backup(current.id));
  q("#reading-export").addEventListener("click",()=>manifestReady&&backup());
  q("#reader-license-download").addEventListener("click",()=>{if(current?.license)download(current.id+"-CC-BY-SA-4.0.json",current);});
  q("#reading-import").addEventListener("click",()=>manifestReady&&q("#reading-import-file").click());
  q("#reading-import-file").addEventListener("change",async e=>{
    const f=e.target.files[0];if(!f)return;
    try{
      if(f.size>2000000)throw new Error("檔案超過 2 MB");
      const raw=JSON.parse(await f.text());
      if(raw.application!=="price-action-atlas-reading"||raw.version!==1||!raw.records)throw new Error("這不是閱讀庫備份；原有 48 項任務請使用學習計畫的匯入");
      const merged=S.merge(state,raw,ids);state=merged;persist();renderCatalog();if(current)actions();
      notice("已合併閱讀紀錄；不同筆記保留兩份，原有學習任務未變更。");
    }catch(err){notice("無法匯入："+err.message);}finally{e.target.value="";}
  });
  ["reading-search","reading-category","reading-state","reading-topic","reading-batch"].forEach(id=>q("#"+id).addEventListener(id==="reading-search"?"input":"change",()=>{limit=6;renderCatalog();}));
  q("#reading-more").addEventListener("click",()=>{limit=manifest.length;renderCatalog();});
  q("#reader-previous").addEventListener("click",()=>{const i=ids.indexOf(current?.id);if(i>0)location.hash="read/"+ids[i-1];});
  q("#reader-next").addEventListener("click",()=>{const i=ids.indexOf(current?.id);if(i>=0&&i<ids.length-1)location.hash="read/"+ids[i+1];});
  q("#reading-path-select")?.addEventListener("change",e=>{activeLearningPath=e.target.value;renderLearningRoutes();});
  window.addEventListener("hashchange",route);
  window.addEventListener("storage",e=>{
    if(e.key===KEY)notice("另一個分頁更新了閱讀筆記。請先匯出本頁備份，再重新整理以載入；不會覆蓋正在寫的內容。");
  });
  async function init(){
    try{
      const res=await fetch("reading/index.json",{cache:"no-cache"});if(!res.ok)throw new Error("HTTP "+res.status);
      const data=await res.json();manifest=data.articles;ids=manifest.map(a=>a.id);
      if(new Set(ids).size!==ids.length||!ids.every(id=>/^[a-z0-9-]+$/.test(id)))throw new Error("目錄格式錯誤");
      try{state=S.clean(JSON.parse(localStorage.getItem(KEY)||"{}"),ids);}catch{saved=false;}
      learningPaths=globalThis.AtlasLearningPaths?.prepare(data.paths||[],manifest)||[];
      if(learningPaths.length)renderLearningRoutes();
      else q("#reading-route-grid").innerHTML=(data.paths||[]).map(p=>'<div><strong>'+esc(p.title)+'</strong><p>'+esc(p.description)+'</p>'+p.ids.filter(id=>ids.includes(id)).map((id,i)=>'<a href="#read/'+id+'">'+(i+1)+'．'+esc(manifest.find(a=>a.id===id).title)+' →</a>').join('<br>')+'</div>').join("");
      manifestReady=true;q("#reader-start").href="#read/"+(learningPaths[0]?.steps[0]?.id||ids[0]);renderCatalog();route();
      // Catalog routes add height above this section. Resolve its initial deep link afterwards.
      if(["#probabilities","#schools","#community","#site-map","#learning-map","#map","#plan","#journal"].includes(location.hash)||location.hash.startsWith("#community-"))q(location.hash)?.scrollIntoView({block:"start"});
    }catch(e){
      globalThis.AtlasSiteMaps?.unavailable();
      notice("閱讀目錄暫時無法載入："+e.message);
      q("#reading-grid").innerHTML='<div class="empty-state">請重新整理後再試。你仍可使用原有學習計畫與教材連結。</div>';
    }
  }
  init();
})();

