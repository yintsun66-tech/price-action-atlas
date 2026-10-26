
"use strict";
const DATA=window.ATLAS_CORE_DATA;
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function emphasizeLead(value){
 const text=String(value),end=text.search(/[。；！？]/);
 const cut=end<0?text.length:end+1;
 return '<strong class="reading-key">'+esc(text.slice(0,cut))+'</strong>'+esc(text.slice(cut));
}
const byId=Object.fromEntries(DATA.resources.map(r=>[r.id,r]));
const taskIds=new Set(DATA.units.flatMap(u=>u.tasks.map((_,i)=>`u${u.n}-${i}`)));
const KEY="price-action-atlas-v1";
let state={version:1,tasks:[],journal:"",hours:6,start:"2026-10-26",stage:0};
let persistence=true,showCount=9,toastTimer;
function sanitize(raw){
 if(!raw||typeof raw!=="object"||raw.version!==1)throw new Error("備份版本不相容");
 return {version:1,tasks:Array.isArray(raw.tasks)?Array.from(new Set(raw.tasks.filter(x=>typeof x==="string"&&taskIds.has(x)))):[],journal:typeof raw.journal==="string"?raw.journal.slice(0,40000):"",hours:[3,6,10].includes(raw.hours)?raw.hours:6,start:typeof raw.start==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(raw.start)&&!isNaN(new Date(raw.start+"T12:00:00").getTime())?raw.start:"2026-10-26",stage:Number.isInteger(raw.stage)&&raw.stage>=0&&raw.stage<6?raw.stage:0};
}
try{const raw=localStorage.getItem(KEY);if(raw)state=sanitize(JSON.parse(raw));}catch(e){persistence=false;}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));persistence=true;}catch(e){persistence=false;}updateSaveStatus();}
function updateSaveStatus(){const el=$("#save-status");el.innerHTML=`<i class="dot" style="background:${persistence?'#228353':'#a56820'}"></i>${persistence?'進度儲存在此瀏覽器':'暫存於本頁，請匯出備份'}`;$("#journal-status").textContent=persistence?"已儲存在此瀏覽器":"瀏覽器無法儲存；離開前請匯出備份";}
function toast(text){clearTimeout(toastTimer);$("#toast").textContent=text;$("#toast").classList.add("visible");toastTimer=setTimeout(()=>$("#toast").classList.remove("visible"),3500);}
function dateAt(days,full=false){const d=new Date(state.start+"T12:00:00");d.setDate(d.getDate()+days);return d.toLocaleDateString("zh-TW",{year:full?"numeric":undefined,month:"numeric",day:"numeric"});}
function unitDates(n){const a=Math.floor((n-1)*6/state.hours*7),b=Math.ceil(n*6/state.hours*7)-1;return dateAt(a)+" – "+dateAt(b);}
function external(r){return `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)} ↗</a>`;}
function renderMap(){
 $("#stage-map").innerHTML=DATA.stages.map(s=>{const ids=DATA.units.filter(u=>u.stage===s.id).flatMap(u=>u.tasks.map((_,i)=>`u${u.n}-${i}`));const done=ids.filter(i=>state.tasks.includes(i)).length;return `<button class="map-card" data-stage="${s.id}" aria-pressed="${state.stage===s.id}" aria-controls="plan-content"><div class="map-number"><span>0${s.id+1}</span><span>${done} / 8 <span aria-hidden="true">↗</span></span></div><div class="map-en">${esc(s.en)}</div><h3>${esc(s.title)}</h3><p>${esc(s.summary)}</p></button>`;}).join("");
 $$("[data-stage]").forEach(b=>b.addEventListener("click",()=>selectStage(Number(b.dataset.stage),true)));
}
function renderPlan(){
 const s=DATA.stages[state.stage];
 $("#plan-content").innerHTML=`<div class="stage-overview card"><div><div class="eyebrow">STAGE 0${s.id+1} · 單元 ${s.weeks.join('–')}</div><h3>${esc(s.question)}</h3><p>${esc(s.summary)}</p></div><div class="stage-gate"><strong>這一階段的自我檢核</strong><p>${esc(s.gate)}</p><p class="module-note">${esc(s.modules)} <a href="${esc(byId['b-index'].url)}" target="_blank" rel="noopener noreferrer">查看公開課綱 ↗</a></p></div></div><div class="units-grid">${DATA.units.filter(u=>u.stage===state.stage).map(unitHTML).join("")}</div>`;
 $("#prev-stage").disabled=state.stage===0;$("#next-stage").disabled=state.stage===5;
 $$(".task-check").forEach(input=>input.addEventListener("change",()=>{const set=new Set(state.tasks);input.checked?set.add(input.dataset.task):set.delete(input.dataset.task);state.tasks=Array.from(set);persist();renderProgress();renderMap();renderPrint();}));
}
function courseHTML(item,compact=false){const codes=item.courseRefs||[],note=item.courseNote||'';if(!codes.length&&!note)return '';const exact=item.courseRelation==='sample-origin',heading=exact?'官方樣片出處 · Main':'Brooks 相關單元補讀 · Main';const links=codes.map(code=>{const l=DATA.brooksCourse.lessons[code];return `<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer" title="${esc(code+'｜'+l.label+'｜購課後登入原站觀看')}"><b>${esc(code)}</b> ${esc(l.label)} ↗</a>`;}).join('');const origin=item.courseOrigin?`<p>樣片原始版本：<a href="${esc(item.courseOrigin.url)}" target="_blank" rel="noopener noreferrer">${esc(item.courseOrigin.edition+' '+item.courseOrigin.code)} ↗</a></p>`:'';return `<div class="course-ref ${compact?'compact':''}">${codes.length?`<strong>${heading}</strong><div class="course-chips">${links}</div>`:''}${origin}${note?(compact?`<details><summary>對照說明</summary><p>${esc(note)}</p></details>`:`<p>${esc(note)}</p>`):''}</div>`;}
function coursePrint(item){const codes=item.courseRefs||[];return `<div class="course-print"><strong>Brooks 官方課程補讀（Main）：</strong>${codes.map(code=>{const l=DATA.brooksCourse.lessons[code];return `<div>${esc(code+'｜'+l.label)}：<span>${esc(l.url)}</span></div>`;}).join('')}${item.courseNote?`<p>${esc(item.courseNote)}</p>`:''}</div>`;}
function mentorLinks(u){return u.mentorResources?.length?`<details class="unit-mentor"><summary>Ali／Brad 延伸練習 · 選讀</summary><p>先完成本單元；以下教材不計入本單元 6 小時估計。</p><div class="unit-resources">${u.mentorResources.map(id=>external(byId[id])).join("")}</div></details>`:"";}
function unitHTML(u){return `<article class="unit-card card"><div class="unit-top"><span>單元 ${String(u.n).padStart(2,'0')} · 約 6 小時</span><span>${unitDates(u.n)}</span></div><h3>${esc(u.title)}</h3><p class="unit-focus">${esc(u.focus)}</p><div class="unit-block"><h4>閱讀與觀看</h4><p>${esc(u.reading)}</p><div class="unit-resources">${u.resources.map(id=>external(byId[id])).join("")}</div></div>${courseHTML(u)}<div class="unit-block"><h4>刻意練習</h4><p>${esc(u.drill)}</p></div><div class="unit-output"><strong>這次要留下的成果</strong>${esc(u.output)}</div>${mentorLinks(u)}<ul class="tasks">${u.tasks.map((t,i)=>{const id=`u${u.n}-${i}`;return `<li><label><input class="task-check" type="checkbox" data-task="${id}" ${state.tasks.includes(id)?'checked':''}><span>${esc(t)}</span></label></li>`;}).join("")}</ul><p class="unit-gate"><strong>檢核：</strong>${esc(u.gate)}</p></article>`;}
function selectStage(id,scroll=false){state.stage=id;persist();renderMap();renderPlan();if(scroll)$("#plan").scrollIntoView({behavior:"smooth",block:"start"});}
function renderProgress(){const n=state.tasks.length;$("#progress-text").textContent=`${n} / ${taskIds.size} 項任務`;
 $("#progress-fill").style.width=(n/taskIds.size*100)+"%";$(".progress-track").setAttribute("aria-valuenow",n);
 const next=DATA.units.flatMap(u=>u.tasks.map((t,i)=>({id:`u${u.n}-${i}`,text:t,stage:u.stage}))).find(t=>!state.tasks.includes(t.id));
 $("#next-task").textContent=next?"下一步："+next.text:"已完成練習清單；下一步是持續驗證與復盤。";
 $("#continue-link").onclick=e=>{e.preventDefault();selectStage(next?next.stage:5,true);};}
function renderSchedule(){
 $("#start-date").value=state.start;$$("[data-hours]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.hours)===state.hours)));
 const weeks=Math.ceil(72/state.hours);$("#schedule-note").textContent=`精選路徑約 72 小時 · 依目前投入約 ${weeks} 週 · 預估 ${dateAt(Math.ceil(72/state.hours*7)-1,true)} 完成，可按檢核延長。`;
}
function renderPrint(){
 $("#print-plan").innerHTML=`<p>計畫開始 ${esc(state.start)} · 每週 ${state.hours} 小時 · ${state.tasks.length}/48 項任務完成。以下為學習安排，非獲利或實盤門檻。</p>`+DATA.units.map(u=>`<article class="print-unit"><div class="eyebrow">STAGE 0${u.stage+1} · ${unitDates(u.n)}</div><h3>單元 ${u.n}｜${esc(u.title)}</h3><p>${esc(u.focus)}</p><p><strong>閱讀：</strong>${esc(u.reading)}</p><p><strong>練習：</strong>${esc(u.drill)}</p><p><strong>交付：</strong>${esc(u.output)}</p><ul>${u.tasks.map((t,i)=>`<li>${state.tasks.includes(`u${u.n}-${i}`)?'☑':'☐'} ${esc(t)}</li>`).join("")}</ul><p><strong>檢核：</strong>${esc(u.gate)}</p>${coursePrint(u)}<div class="source-links">${[...u.resources,...(u.mentorResources||[])].map(id=>`<div>${esc(byId[id].title)}：<span class="print-source">${esc(byId[id].url)}</span></div>`).join("")}</div></article>`).join("");
}
function getFiltered(){const terms=$("#resource-search").value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean),author=$("#author-filter").value,lang=$("#lang-filter").value,kind=$("#kind-filter").value,access=$("#access-filter").value,topic=$("#topic-filter").value,featured=$("#featured-only").checked;
 const rows=DATA.resources.filter(r=>(!featured||r.featured)&&terms.every(q=>[r.title,r.original,r.note,r.author,r.published,...(r.courseRefs||[]).flatMap(id=>[id,DATA.brooksCourse.lessons[id].label]),...(r.topics||[]).map(t=>DATA.topicOptions.find(o=>o.id===t)?.label||t)].join(" ").toLocaleLowerCase().includes(q))&&(author==='all'||(r.teacherKeys||[]).includes(author))&&(lang==='all'||r.lang===lang)&&(kind==='all'||r.kind===kind)&&(access==='all'||r.access===access)&&(topic==='all'||(r.topics||[]).includes(topic)));
 const sort=$("#sort-filter").value;if(sort==='newest')rows.sort((a,b)=>(b.published||'').localeCompare(a.published||''));if(sort==='title')rows.sort((a,b)=>(a.original||a.title).localeCompare(b.original||b.title));return rows;}
function renderLibrary(){const rows=getFiltered(),shown=rows.slice(0,showCount);$("#resource-count").textContent=`顯示 ${shown.length} / ${rows.length} 筆 · 全庫 ${DATA.totalResources.toLocaleString()} 筆${archiveLoaded?'':'（目前僅搜尋已載入來源）'}`;
 $("#resource-grid").innerHTML=shown.length?shown.map(r=>`<article class="resource-card card" id="resource-${r.id}"><div class="resource-head"><span class="resource-kind">${esc(r.kind)} · ${esc(r.lang)}</span><span class="pill ${r.access==='免費'?'blue':''}">${esc(r.access)}</span></div><h3>${esc(r.title)}</h3>${r.original?`<p class="original-title" lang="en">${esc(r.original)}</p>`:''}<p class="resource-meta">${esc(r.author)}${r.duration?' · '+esc(r.duration):''}${r.published?' · '+esc(r.published.slice(0,10)):''}</p><p class="resource-note">${esc(r.note)}</p>${(r.topics||[]).some(t=>t!=='general')?`<p class="resource-topics">${r.topics.map(t=>DATA.topicOptions.find(o=>o.id===t)?.label).filter(Boolean).map(esc).join(' · ')}</p>`:''}${courseHTML(r,true)}${r.evaluationId?`<button type="button" class="evaluation-link" data-evaluation="${esc(r.evaluationId)}">閱讀這個來源的評價與限制 ↗</button>`:''}<p class="scope-tag">${r.archive?'延伸目錄 · 請展開查核範圍':'精選來源 · 附學習導讀'}</p><div class="resource-actions">${videoId(r)?`<button class="btn secondary small" data-video="${r.id}" aria-label="播放 ${esc(r.title)}">▷ 頁內播放</button>`:''}<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${r.kind==='影片'?'原始影片':r.kind==='播放清單'?'開啟片單':'開啟來源'} ↗</a></div><details><summary>來源與查核範圍</summary><p>${esc(r.scope)}<br>查核日期：${esc(r.checked)}</p></details></article>`).join(""):`<div class="empty-state">沒有符合的資源。可取消「只看核心精選」，或調整篩選條件。</div>`;
 $("#show-more").hidden=shown.length>=rows.length;$("#show-all").hidden=!$("#featured-only").checked;
 $$("[data-video]").forEach(b=>b.addEventListener("click",()=>openVideo(byId[b.dataset.video])));
}
function filterTeacher(key){ensureArchive();['lang-filter','kind-filter','access-filter','topic-filter'].forEach(id=>$("#"+id).value='all');$("#sort-filter").value='source';$("#resource-search").value='';$("#author-filter").value=key;$("#featured-only").checked=false;showCount=9;renderLibrary();$("#library").scrollIntoView({behavior:'smooth'});}
function renderMentors(){
 $("#mentor-grid").innerHTML=DATA.mentors.map(m=>`<article class="mentor-card card"><div class="mentor-kicker"><div class="mentor-avatar" aria-hidden="true">${m.id==='ali'?'AM':'BW'}</div><span class="eyebrow">${m.id==='ali'?'SYSTEMS & RESEARCH':'CONTEXT & EXECUTION'}</span></div><h3>${esc(m.name)}</h3><p class="mentor-subtitle">${esc(m.subtitle)}</p><p class="mentor-role">${esc(m.role)} <a href="${esc(m.source)}" target="_blank" rel="noopener noreferrer">官方介紹 ↗</a></p><p class="mentor-question">${esc(m.question)}</p><p class="mentor-lead">${esc(m.lead)}</p><div class="mentor-links">${m.start.map(id=>external(byId[id])).join('')}</div><div class="mentor-actions"><button class="btn secondary small" data-template="${m.id}">加入我的練習卡 ＋</button><button class="text-btn" data-teacher="${m.id}">查閱教材索引 →</button></div></article>`).join('');
 $("#twm-modules").innerHTML=DATA.programModules.map(m=>`<tr><td>${String(m.n).padStart(2,'0')}</td><td><strong>${esc(m.title)}</strong><span>${esc(m.guide)}</span>${courseHTML(m,true)}</td><td><button class="text-btn" data-module-stage="${m.stage}">階段 0${m.stage+1} →</button></td></tr>`).join('');
 $("#mentor-comparisons").innerHTML=DATA.comparisons.map(c=>`<div><h4>${esc(c.title)}</h4><p>${esc(c.left)}</p><p>${esc(c.right)}</p>${courseHTML(c,true)}<div class="comparison-test"><strong>怎麼驗證？</strong><p>${esc(c.test)}</p></div><div class="unit-resources">${c.sources.map(id=>external(byId[id])).join('')}</div></div>`).join('');
 const c=DATA.coverage,a=c.authorArchives;
 $("#coverage-band").innerHTML=[[a.brad.entries.toLocaleString(),'Brad 官方作者文章'],[a.ali.entries,'Ali 官方作者文章'],[c.uniqueVideoEntries,'官方頻道／片單去重影片'],[c.quantTeachingPagesVerified,'Quant 教學公開頁']].map(([n,t])=>`<div><strong>${n}</strong><span>${t}</span></div>`).join('');
 $("#coverage-list").innerHTML=`<p><strong>官方文章目錄：</strong><a href="${esc(a.brad.source)}" target="_blank" rel="noopener noreferrer">Brad 共 ${a.brad.linked_pages} 頁 ↗</a>、<a href="${esc(a.ali.source)}" target="_blank" rel="noopener noreferrer">Ali 共 ${a.ali.linked_pages} 頁 ↗</a>，已逐頁核對標題與日期。收錄索引不代表逐篇精讀；相同網址與既有資源合併。</p><p><strong>官方影片目錄：</strong><a href="https://www.youtube.com/@systematictrading" target="_blank" rel="noopener noreferrer">Quant Systems ↗</a>與<a href="https://www.youtube.com/@brookstradingcourse" target="_blank" rel="noopener noreferrer">Brooks ↗</a>的影片、直播、可取得 Shorts，以及 ${DATA.totalPlaylists} 個公開播放清單。以影片 ID 去重；片單含部分較舊影片。Brooks 共享頻道的講者未逐支確認，僅公開片名明示 Brad 者加上 Brad 標籤，目前 ${c.explicitBradVideoTitles} 筆。Ali 標籤也可能包含團隊訪談，不能解讀成皆由 Ali 主講。</p><p><strong>課程與工具：</strong>核對 <a href="https://www.quantsystems.ca/page-sitemap.xml" target="_blank" rel="noopener noreferrer">Quant sitemap 教學頁 ↗</a>，另補 PTM、SA2、TWM、突破研究、CAD 與免費課程公開入口。完整會員影片、付費白皮書、私人或刪除內容未取得；不重製付費教材。</p><p><strong>閱讀與翻譯範圍：</strong>精選公開文章附中文導讀；影片只核對目錄與片長，未逐支完整觀看或取得全部逐字稿。中文主題分類及練習由本計畫編排。全庫 ${DATA.totalResources.toLocaleString()} 筆含原有 Brooks、方方土與研究來源，不等於 ${DATA.totalResources.toLocaleString()} 份完整譯文。日期：${esc(c.asOf)}。</p>`;
 $$("[data-template]").forEach(b=>b.addEventListener('click',()=>appendTemplate(b.dataset.template)));
 $$("[data-teacher]").forEach(b=>b.addEventListener('click',()=>filterTeacher(b.dataset.teacher)));
 $$("[data-module-stage]").forEach(b=>b.addEventListener('click',()=>selectStage(Number(b.dataset.moduleStage),true)));
 renderMentorPath('ali');
}
function renderMentorPath(id){const p=DATA.mentorPaths.find(p=>p.id===id);$("#mentor-path-title").textContent=p.title;$("#mentor-path-panel").setAttribute('aria-labelledby','tab-'+id);$("#mentor-path-panel").innerHTML=`<p class="mentor-path-intro">${esc(p.intro)}</p><div class="path-grid">${p.steps.map(s=>`<article class="path-step"><h4>${esc(s.title)}</h4><p>${esc(s.why)}</p><div class="unit-resources">${s.resources.map(id=>external(byId[id])).join('')}</div><div class="path-exercise"><strong>留下的成果：</strong>${esc(s.exercise)}</div>${courseHTML(s,true)}</article>`).join('')}</div>`;$$("[data-mentor]").forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.mentor===id));b.tabIndex=b.dataset.mentor===id?0:-1;});}
function appendTemplate(id){const m=DATA.mentors.find(m=>m.id===id);const extra=(state.journal?'\n\n—— 新一輪練習 ——\n':'')+m.template;if(state.journal.length+extra.length>40000){toast('筆記已接近容量，請先下載備份並整理。');return;}state.journal+=extra;$("#journal").value=state.journal;persist();$("#journal").scrollIntoView({behavior:'smooth',block:'center'});$("#journal").focus({preventScroll:true});toast('已將練習卡附加到筆記末尾。');}
function videoId(r){try{const u=new URL(r.url);return u.hostname==='www.youtube.com'&&u.pathname==='/watch'?u.searchParams.get('v'):null;}catch(e){return null;}}
let videoOpener;
function openVideo(r){const id=videoId(r);if(!/^[A-Za-z0-9_-]{11}$/.test(id))return;videoOpener=document.activeElement;$("#video-title").textContent=r.title;$("#video-original").href=r.url;
 const frame=document.createElement('iframe');frame.src=`https://www.youtube-nocookie.com/embed/${id}?rel=0`;frame.title=r.title;frame.allow='encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';$("#video-frame").replaceChildren(frame);$("#video-dialog").showModal();}
function closeVideo(){ $("#video-dialog").close(); }
$("#video-close").addEventListener('click',closeVideo);$("#video-dialog").addEventListener('close',()=>{$("#video-frame").replaceChildren();if(videoOpener?.isConnected)videoOpener.focus();});
$("#video-dialog").addEventListener('click',e=>{if(e.target===$("#video-dialog")){const b=e.target.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)closeVideo();}});
const contexts={
 trend:{title:"趨勢：先觀察回檔是否破壞原結構。",text:"高低點與方向延續只是觀察起點。接著寫出：哪個價格或行為出現時，我就不再把它視為順勢回檔？",values:[30,38,35,48,58,53,62,73,68,77,86,80,88,99,94,105,116,109,119,127,121,132],label:"趨勢行情概念示意"},
 range:{title:"區間：先比較位置，別只看單根力量。",text:"在已定義的邊界與區間中段，類似 K 棒可能有不同意義。練習標出不交易的位置，並保留真正突破的反例。",values:[54,71,85,73,57,42,36,48,67,83,74,61,46,34,48,70,86,72,57,39,47,63],label:"區間行情概念示意"},
 test:{title:"突破回測：邊界必須在突破之前就存在。",text:"觀察突破、後續延續與回測。回到區間內、沒有成交、或回測後失敗，都要保留在紀錄中，而不是事後刪除。",values:[40,49,61,55,42,38,54,61,51,46,59,79,94,83,69,65,80,97,108,101,118,129],label:"突破後回測概念示意"}
};
function renderContext(name){const c=contexts[name];$$("[data-context]").forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.context===name)));const vals=c.values,x=i=>24+i*22.5,y=v=>198-v*1.22;
 let svg='<title>'+c.label+'，原創非真實價格</title><g stroke="#e8e8ef"><path d="M15 45H515M15 100H515M15 155H515M15 205H515"/></g>';
 if(name==='range')svg+='<rect x="14" y="87" width="503" height="71" fill="#edf3fa"/><path d="M14 87H517M14 158H517" stroke="#a3bedb" stroke-dasharray="4 4"/>';
 if(name==='test')svg+='<path d="M16 121H396" stroke="#8eb6df" stroke-dasharray="4 4"/><text x="23" y="112" fill="#626269" font-size="10">事前邊界</text>';
 vals.forEach((v,i)=>{const prev=i?vals[i-1]:v-5,up=v>=prev,open=prev+(up?2:-2),hi=Math.max(v,open)+5,lo=Math.min(v,open)-6;svg+=`<path d="M${x(i)} ${y(hi)}V${y(lo)}" stroke="${up?'#0071e3':'#858590'}" stroke-width="1.7"/><rect x="${x(i)-4.5}" y="${Math.min(y(open),y(v))}" width="9" height="${Math.max(3,Math.abs(y(open)-y(v)))}" rx="1" fill="${up?'#0071e3':'#fff'}" stroke="${up?'#0071e3':'#858590'}" stroke-width="1.4"/>`;});
 svg+='<text x="15" y="220" fill="#777780" font-size="9">概念示意・不代表可交易結果</text>';$("#context-chart").innerHTML=svg;$("#context-chart").setAttribute('aria-label',c.label);$("#context-explanation").innerHTML='<strong>'+esc(c.title)+'</strong>'+esc(c.text);$("#context-course-ref").innerHTML=courseHTML(DATA.courseConcepts[name],true);}
function renderExpectancy(){const p=Number($("#win-rate").value)/100,w=Number($("#win-size").value),c=Number($("#cost-size").value),e=p*w-(1-p)-c;$("#win-rate-value").value=Math.round(p*100)+'%';$("#win-size-value").value=w.toFixed(1)+'R';$("#cost-size-value").value=c.toFixed(2)+'R';$("#expectancy-value").textContent=(e>=0?'+':'')+e.toFixed(2)+'R';$("#break-even").textContent='損益兩平勝率約 '+((1+c)/(w+1)*100).toFixed(1)+'%';$("#expectancy-result").classList.toggle('negative',e<0);}
function download(name,text,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$("#export-btn").addEventListener('click',()=>{download('price-action-atlas-progress.json',JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2),'application/json;charset=utf-8');toast('已匯出進度與筆記備份。');});
$("#import-btn").addEventListener('click',()=>$("#import-file").click());
$("#import-file").addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>1000000)throw new Error('檔案超過 1 MB');const incoming=sanitize(JSON.parse(await f.text()));const merged=Array.from(new Set([...state.tasks,...incoming.tasks]));const mergedJournal=incoming.journal===state.journal?state.journal:state.journal&&incoming.journal?state.journal+'\n\n—— 匯入筆記 ——\n'+incoming.journal:state.journal||incoming.journal;if(mergedJournal.length>40000)throw new Error('合併筆記超過 40,000 字元，請先下載筆記再整理備份');state={...incoming,tasks:merged,journal:mergedJournal};persist();initStateUI();toast('已合併進度與筆記，並套用匯入的時程設定。');}catch(err){toast('無法匯入：'+err.message);}finally{e.target.value='';}});
$("#journal").addEventListener('input',e=>{state.journal=e.target.value;persist();});
$("#journal-export").addEventListener('click',()=>{download('price-action-learning-journal.txt',state.journal||'尚未填寫學習筆記。','text/plain;charset=utf-8');});
$("#print-btn").addEventListener('click',()=>{renderPrint();window.print();});
$("#start-date").addEventListener('change',e=>{if(!e.target.value)return;state.start=e.target.value;persist();renderSchedule();renderPlan();renderPrint();});
 $$("[data-hours]").forEach(b=>b.addEventListener('click',()=>{state.hours=Number(b.dataset.hours);persist();renderSchedule();renderPlan();renderPrint();}));
$("#prev-stage").addEventListener('click',()=>selectStage(Math.max(0,state.stage-1),true));$("#next-stage").addEventListener('click',()=>selectStage(Math.min(5,state.stage+1),true));
['resource-search','author-filter','lang-filter','kind-filter','access-filter','topic-filter','sort-filter'].forEach(id=>$("#"+id).addEventListener(id==='resource-search'?'input':'change',()=>{if(id==='resource-search'?$("#resource-search").value.trim():$("#"+id).value!=='all')$("#featured-only").checked=false;showCount=9;renderLibrary();}));
$("#reset-filters").addEventListener('click',()=>{['author-filter','lang-filter','kind-filter','access-filter','topic-filter'].forEach(id=>$("#"+id).value='all');$("#sort-filter").value='source';$("#resource-search").value='';$("#featured-only").checked=false;showCount=9;renderLibrary();});
 $$("[data-mentor]").forEach(b=>{b.addEventListener('click',()=>renderMentorPath(b.dataset.mentor));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const id=e.key==='Home'?'ali':e.key==='End'?'brad':b.dataset.mentor==='ali'?'brad':'ali';renderMentorPath(id);$("#tab-"+id).focus();});});
$("#featured-only").addEventListener('change',()=>{showCount=9;renderLibrary();});$("#show-more").addEventListener('click',()=>{showCount+=12;renderLibrary();});
$("#show-all").addEventListener('click',()=>{$("#reset-filters").click();showCount=12;renderLibrary();});
 $$("[data-context]").forEach(b=>b.addEventListener('click',()=>renderContext(b.dataset.context)));
['win-rate','win-size','cost-size'].forEach(id=>$("#"+id).addEventListener('input',renderExpectancy));
function initStateUI(){renderMap();renderPlan();renderProgress();renderSchedule();renderPrint();$("#journal").value=state.journal;updateSaveStatus();}
$("#resource-total").textContent=DATA.totalResources.toLocaleString();$("#video-total").textContent=DATA.totalVideos;$("#show-all").textContent=`查看全部 ${DATA.totalResources} 筆資源 →`;
$("#topic-filter").insertAdjacentHTML("beforeend",DATA.topicOptions.map(t=>`<option value="${t.id}">${esc(t.label)}</option>`).join(''));
$("#glossary-grid").innerHTML=DATA.glossary.map(g=>`<div class="glossary-item"><em>${esc(g.en)}</em><strong>${esc(g.zh)}</strong><p>${esc(g.definition)}</p>${courseHTML(g,true)}</div>`).join('');
$("#course-quick-map").innerHTML=DATA.courseQuickMap.map(row=>`<div><h4>${esc(row.title)}</h4>${courseHTML(row,true)}</div>`).join('');
$("#expectancy-course-ref").innerHTML=courseHTML(DATA.courseConcepts.expectancy,true);
// DISCOVERY_RUNTIME_START
let discoveryLimit=6;
const discoveryPriority={start:'先試免費教材',supplement:'補充讀法',observe:'保留觀察'};
const discoveryModes={live:'直播／互動說明',replay:'回放／復盤',course:'圖文／課程'};
function renderDiscovery(){
 const q=$('#discovery-search').value.trim().toLocaleLowerCase(),lang=$('#discovery-lang').value,mode=$('#discovery-format').value,priority=$('#discovery-priority').value;
 const rows=DATA.discovery.profiles.filter(p=>(lang==='all'||p.lang===lang)&&(mode==='all'||p.formats.includes(mode))&&(priority==='all'||p.priority===priority)&&(!q||[p.name,p.market,p.approach,p.fit,p.caveat,p.review.summary,...p.materials.flatMap(m=>[m.title,m.original,m.mode])].join(' ').toLocaleLowerCase().includes(q)));
 const shown=rows.slice(0,discoveryLimit);
 $('#discovery-count').textContent=`顯示 ${shown.length} / ${rows.length} 組來源 · 查核 ${DATA.discovery.checked}`;
 $('#discovery-more').hidden=shown.length>=rows.length;
 $('#discovery-grid').innerHTML=shown.length?shown.map(p=>`<article class="discovery-card card" id="discovery-${esc(p.id)}"><header><div><div class="source-language">${esc(p.lang)} · ${esc(p.market)}</div><h3>${esc(p.name)}</h3></div><span class="source-badge ${esc(p.priority)}">${discoveryPriority[p.priority]}</span></header><p class="source-line">${esc(p.approach)}</p><p class="source-fit">${emphasizeLead(p.fit)}</p><p class="source-caveat"><strong>適用限制：</strong>${emphasizeLead(p.caveat)}</p><ul class="source-materials">${p.materials.map(m=>`<li><a href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">${esc(m.title)} ↗</a><small>${esc(m.mode)} · ${esc(m.access||'免費')}</small><p>${esc(m.guide)}</p></li>`).join('')}</ul><div class="review-summary"><strong>評價證據｜${esc(p.review.label)}</strong><p>${esc(p.review.summary)}</p><details class="review-details"><summary>閱讀評價、來源與限制 ＋</summary>${p.review.positive?`<p><strong>正面線索：</strong>${esc(p.review.positive)}</p>`:''}<p><strong>限制與疑點：</strong>${esc(p.review.caution)}</p>${p.review.snapshot?`<div class="review-snapshot">平台快照：${esc(p.review.snapshot)}。屬平台用戶評分，非本網站評分或獲利率。</div>`:''}<div class="review-links">${p.review.links.map(l=>`<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.title)} ↗</a>`).join('')}${(p.officialSources||[]).map(l=>`<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">官方核對：${esc(l.title)} ↗</a>`).join('')}</div></details></div><div class="source-actions"><button type="button" class="text-btn" data-discovery-library="${esc(p.id)}">在圖書館查看這組教材 →</button><span>${esc(p.checked)} 核對</span></div></article>`).join(''):'<div class="empty-state">沒有符合的評選來源，請調整搜尋或篩選。</div>';
 $$('[data-discovery-library]').forEach(b=>b.addEventListener('click',()=>filterTeacher('discovery-'+b.dataset.discoveryLibrary)));
}
function openDiscoveryEvaluation(id){const p=DATA.discovery.profiles.find(p=>p.id===id);if(!p)return;$('#discovery-lang').value='all';$('#discovery-format').value='all';$('#discovery-priority').value='all';$('#discovery-search').value=p.name;discoveryLimit=1000;renderDiscovery();$('#discovery').scrollIntoView({behavior:'smooth'});}
function initDiscovery(){
 const d=DATA.discovery;
 $('#discovery-update-label').textContent=`${d.profiles.length}組來源評選 · ${d.addedIds.length}筆新教材入口`;
 $('#discovery-metrics').innerHTML=`<div><strong>${d.profiles.length}</strong><span>組來源與評價檔案</span></div><div><strong>${d.addedIds.length}</strong><span>筆新教材入口</span></div><div><strong>${d.profiles.filter(p=>p.lang==='中文').length} / ${d.profiles.filter(p=>p.lang==='英文').length}</strong><span>中文 / 英文來源</span></div>`;
 $('#discovery-scope').textContent=d.scope;
 $('#discovery-watchlist').innerHTML=d.watchlist.map(x=>`<p><strong>${esc(x.name)}：</strong>${esc(x.reason)}</p>`).join('');
 $('#author-filter').insertAdjacentHTML('beforeend','<option value="new">本輪新增中英文來源</option><optgroup label="教材評選來源">'+d.profiles.map(p=>`<option value="discovery-${esc(p.id)}">${esc(p.name)}</option>`).join('')+'</optgroup>');
 ['discovery-search','discovery-lang','discovery-format','discovery-priority'].forEach(id=>$('#'+id).addEventListener(id==='discovery-search'?'input':'change',()=>{discoveryLimit=1000;renderDiscovery();}));
 $('#discovery-more').addEventListener('click',()=>{discoveryLimit=1000;renderDiscovery();});
 $('#resource-grid').addEventListener('click',e=>{const b=e.target.closest('[data-evaluation]');if(b)openDiscoveryEvaluation(b.dataset.evaluation);});
 renderDiscovery();
}

// The original learning tasks only need core references. Search loads the full index.
let archiveLoaded=false,archivePromise=null;
function archiveState(message, retry=false){
 const el=$("#archive-state");el.replaceChildren();
 const span=document.createElement("span");span.textContent=message;el.append(span);
 if(retry){const b=document.createElement("button");b.className="text-btn";b.textContent="載入完整索引";b.addEventListener("click",ensureArchive);el.append(b);}
}
async function ensureArchive(){
 if(archiveLoaded)return true;
 if(archivePromise)return archivePromise;
 archiveState("正在載入完整 2,110 筆索引；載入後會保留目前搜尋條件。");
 archivePromise=(async()=>{
  try{
   const parts=await Promise.all(DATA.archiveFiles.map(async file=>{
    const res=await fetch(file,{cache:"no-cache"});if(!res.ok)throw new Error("HTTP "+res.status);
    const rows=await res.json();if(!Array.isArray(rows))throw new Error("索引格式錯誤");return rows;
   }));
   const merged=[...DATA.resources,...parts.flat()],seen=new Set(merged.map(r=>r.id));
   if(seen.size!==DATA.totalResources||merged.length!==seen.size)throw new Error("索引版本不一致");
   const order=new Map(DATA.resourceOrder.map((id,i)=>[id,i]));
   if(merged.some(r=>!order.has(r.id)))throw new Error("索引識別碼不一致");
   merged.sort((a,b)=>order.get(a.id)-order.get(b.id));
   DATA.resources=merged;Object.assign(byId,Object.fromEntries(merged.map(r=>[r.id,r])));
   archiveLoaded=true;archiveState("完整 2,110 筆索引已載入。目錄收錄不代表已逐篇精讀或取得全文翻譯授權。");
   renderLibrary();return true;
  }catch(error){
   archiveState("完整索引暫時無法載入（"+error.message+"）；目前搜尋僅涵蓋已載入精選，可重新嘗試。",true);
   return false;
  }finally{archivePromise=null;}
 })();
 return archivePromise;
}
function initLazyArchive(){
 archiveState("精選與學習任務所需來源已載入。完整索引會在瀏覽資源庫或使用搜尋時按需載入。",true);
 if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(x=>x.isIntersecting)){ensureArchive();observer.disconnect();}
  },{rootMargin:"150px"});
  observer.observe($("#library"));
 }
 $("#library").addEventListener("input",ensureArchive,true);
 $("#library").addEventListener("change",ensureArchive,true);
 $("#library").addEventListener("click",e=>{if(e.target.closest("button"))ensureArchive();},true);
 document.querySelectorAll('a[href="#library"]').forEach(a=>a.addEventListener("click",ensureArchive));
}

initLazyArchive();
initDiscovery();
// DISCOVERY_RUNTIME_END
initStateUI();renderMentors();renderLibrary();renderContext('trend');renderExpectancy();
