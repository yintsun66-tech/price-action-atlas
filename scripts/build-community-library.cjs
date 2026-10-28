const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dist=path.resolve(__dirname,'../dist'),read=f=>fs.readFileSync(path.join(dist,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(dist,f),s);
const added=require('./community-articles.cjs');for(const a of added)write('reading/articles/'+a.id+'.json',JSON.stringify(a,null,2)+'\n');
require('./build-study-figures.cjs');
const m=JSON.parse(read('reading/index.json')),figures=JSON.parse(read('reading/figures.json')).figures;
const ids=added.map(a=>a.id),metadata=a=>({id:a.id,category:a.category,title:a.title,subtitle:a.subtitle,summary:a.summary,level:a.level,minutes:a.minutes,mode:a.mode,batch:a.batch,topic:a.topic,tags:[...a.glossary.flatMap(g=>[g.en,g.zh]),...a.keyPoints,'社群選讀'],hasCases:true,hasChart:false,figureCount:figures.filter(f=>f.article===a.id).length});
m.articles=[...added.map(metadata),...m.articles.filter(a=>!ids.includes(a.id))];
const route={title:'從新文章到可檢查的筆記',description:'先讀公開作者教材，再用本站自編資料練習預期、期限與未觸發。社群短句集中在新文專區。',ids};
m.paths=[route,...m.paths.filter(p=>p.title!==route.title)];m.revision='2026-10-28';
assert.equal(new Set(m.articles.map(a=>a.id)).size,m.articles.length);write('reading/index.json',JSON.stringify(m,null,2)+'\n');
write('school-titles.js','globalThis.AtlasSchoolTitles='+JSON.stringify(Object.fromEntries(m.articles.map(a=>[a.id,a.title])))+';\n');
const data=JSON.parse(read('reading/community.json')),E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),link=(u,t)=>'<a href="'+E(u)+'" target="_blank" rel="noopener noreferrer">'+E(t)+' ↗</a>';
for(const c of data.items){assert.ok(/^https:\/\//.test(c.url),'HTTPS source required');for(const r of c.courseRefs||[])assert.ok(/^https:\/\//.test(r.url));}
const title=id=>m.articles.find(a=>a.id===id)?.title;
const cards=data.items.map((c,i)=>`<article class="community-card card" id="community-${E(c.id)}" data-community-card data-kind="${c.kind}" data-language="${c.language}">
<div class="community-labels"><span class="pill ${c.kind==='author'?'blue':'green'}">${c.kind==='author'?'原作者教材':'社群選讀'}</span><span>${E(c.platform)}</span><span>${c.language==='en'?'英文→繁中':'繁體中文'}</span></div>
<p class="community-author">${E(c.author)}</p><h3>${E(c.title)}</h3><p class="community-summary">${E(c.summary)}</p>
<p class="community-date"><strong>發布：</strong>${E(c.published||'確切日期未核對')}<br>${E(c.dateNote)}<br><strong>收錄／查核：</strong>${data.checked}</p>
${c.quote?'<details class="community-quote"><summary>英文短句、繁中翻譯與語境</summary><blockquote lang="en">'+E(c.quote.en)+'</blockquote><p lang="zh-Hant"><strong>'+E(c.quote.zh)+'</strong></p><p>'+E(c.quote.context)+'</p></details>':'<p class="community-translation">原文已為繁中，本卡提供摘要。</p>'}
<details class="community-review"><summary>評價依據、證據與限制</summary><p><strong>評價依據：</strong>${E(c.review.basis)}</p><p><strong>學習用途：</strong>${E(c.review.learning)}</p><p><strong>限制：</strong>${E(c.review.limits)}</p><p><strong>熱門度：</strong>${E(c.review.engagement)}</p><p><strong>實際讀取：</strong>${E(c.access)}</p><p><strong>翻譯範圍：</strong>${E(c.translation)}</p></details>
${(c.courseRefs||[]).map(r=>'<p class="community-course"><strong>'+E(r.version+' '+r.unit+' · '+r.topic)+'</strong><br>'+E(r.relation)+' · '+link(r.url,'官方單元')+'<br>會員文章與官方課程分開歸屬，未觀看付費內容。</p>').join('')}
<div class="community-related"><strong>搭配站內閱讀</strong>${c.related.map(id=>'<a href="#read/'+id+'">'+E(title(id))+' →</a>').join('')}</div>
<div class="community-actions">${link(c.url,'閱讀原始文章／討論')}</div></article>`).join('\n');
const section=`<!-- COMMUNITY_LIBRARY_START -->
<section id="community" aria-labelledby="community-title"><div class="section-head"><div><div class="eyebrow">READ THE SOURCE · KEEP THE CONTEXT</div><h2 id="community-title">新文章與社群。<br>讀見觀點，也讀清界線。</h2></div><p>這批 ${data.items.length} 篇選讀，涵蓋原作者文章與五個公開社群平台。英文短句附繁中譯文；來源摘要、本站練習及實證分開。</p></div>
<div class="community-intro card"><strong>先比較內容價值，再看人氣。</strong><p>${E(data.policy)} 只有可核對的互動才列快照，沒有評分就保留缺項；原站上的會員回覆也不自動代表原作者。</p><p>本批新增 ${added.length} 篇原創導讀、${added.length} 張整理圖與 ${added.reduce((n,a)=>n+a.caseQuiz.length,0)} 題練習。這是新收錄批次，文章發布日期逐筆保留；沒有聲稱全部剛發表。</p><p><a href="#read/community-failed-followthrough">先練習突破預期的期限 →</a> · <a href="#read/community-three-bar-notes">再寫三根棒的預期筆記 →</a></p></div>
<div class="community-controls" id="community-controls" hidden><label>搜尋選讀<input type="search" id="community-search" placeholder="作者、社群、吸收、重繪…"></label><label>來源類型<select id="community-kind"><option value="all">全部來源</option><option value="author">原作者教材</option><option value="community">社群選讀</option></select></label><label>來源語言<select id="community-language"><option value="all">全部語言</option><option value="en">英文附繁中</option><option value="zh-Hant">繁體中文</option></select></label><button type="button" class="btn secondary" id="community-reset">清除篩選</button></div>
<p id="community-status" aria-live="polite">${data.items.length} 篇新收錄選讀 · 原始發表日與查核日分開</p><div class="community-grid" id="community-grid">${cards}</div><p id="community-empty" hidden>沒有符合的選讀，請縮短關鍵字或清除篩選。</p><div class="more-wrap"><button type="button" class="btn secondary" id="community-more" hidden>展開其餘選讀 ↓</button></div>
<details class="community-method card"><summary>每天更新時，如何決定要放什麼？</summary><p><strong>選讀條件：</strong>來源可合法公開閱讀、對目前研究有新增價值、能明確歸屬原作者，並能保存限制或反例。沒有合格新內容時，不以重複文章湊數。</p><p><strong>翻譯：</strong>未確認完整授權的文章只提供短摘要與必要短句；已核對的開放教材才提供完整範圍節譯。論壇引用付費書籍、外流 PDF 或會員私群，不因可搜尋到就重刊。</p><p><strong>社群評價：</strong>正反意見分開，互動量不是準確率。未取得對帳與完整資料時，保留自述身分；沒有從這些貼文產生實盤訊號。</p><p><strong>更新紀錄：</strong>版本 ${data.checked}；<a href="reading/community.json" target="_blank" rel="noopener noreferrer">查看本批來源與查核資料 ↗</a> · <a href="reading/content-updates.json" target="_blank" rel="noopener noreferrer">查看收錄與略過紀錄 ↗</a></p></details>
</section>
<!-- COMMUNITY_LIBRARY_END -->`;
let h=read('index.html');
if(h.includes('<!-- COMMUNITY_LIBRARY_START -->'))h=h.replace(/<!-- COMMUNITY_LIBRARY_START -->[\s\S]*?<!-- COMMUNITY_LIBRARY_END -->/,section);else h=h.replace('<section id="schools"',section+'\n<section id="schools"');
if(!h.includes('<a href="#community">社群與新文</a>'))h=h.replace('<a href="#reading">閱讀教材</a>','<a href="#reading">閱讀教材</a><a href="#community">社群與新文</a>');
const guides=m.articles.filter(a=>a.mode==='guide').length,licensed=m.articles.length-guides;
h=h.replace(/第五批英文精讀<\/span><h3>讀原文，也讀懂語氣。/,'第六批文章與社群</span><h3>讓每次閱讀，都留下可檢查的筆記。');
h=h.replace(/累積 \d+ 篇繁中原創導讀與 \d+ 篇授權節譯，全部 \d+ 篇附有整理圖，共 \d+ 張原創 SVG。本批新增趨勢、區間整理、延續與反轉三篇完整範圍節譯，附逐段英文／繁中對照及 9 題檢核。/,`累積 ${guides} 篇繁中原創導讀與 ${licensed} 篇授權節譯，全部 ${m.articles.length} 篇附有整理圖，共 ${figures.length} 張原創 SVG。本批另加入 ${data.items.length} 篇文章與社群選讀、${added.length} 篇原創練習導讀；短句翻譯與完整授權節譯分開標示。`);
h=h.replace('href="#read/licensed-trends" id="reader-start">開始英文精讀','href="#read/community-failed-followthrough" id="reader-start">開始本批練習');
h=h.replace(/id="reading-count">\d+/,`id="reading-count">${m.articles.length}`).replace(/全庫 \d+ 篇皆有整理圖，合計 \d+ 張/,`全庫 ${m.articles.length} 篇皆有整理圖，合計 ${figures.length} 張`).replace(/<strong>\d+<\/strong><span>篇附整理圖/,`<strong>${m.articles.length}</strong><span>篇附整理圖`).replace(/<strong>\d+<\/strong><span>張原創向量圖/,`<strong>${figures.length}</strong><span>張原創向量圖`).replace(/\d+ 篇都有圖 ·/,m.articles.length+' 篇都有圖 ·');
if(!h.includes('第六批文章與社群</option>'))h=h.replace('<option value="5">','<option value="6">第六批文章與社群</option><option value="5">');
if(!h.includes('COMMUNITY_BATCH6_UPDATE'))h=h.replace('<!-- READING_BATCH3_UPDATE -->','<!-- COMMUNITY_BATCH6_UPDATE --><a class="discovery-update" href="#community"><span>10.28 文章與社群選讀</span><strong>8 篇新來源 · 英文短句附繁中 · 評價與限制可核對</strong><span>開始選讀 →</span></a>\n<!-- READING_BATCH3_UPDATE -->');
if(!h.includes('href="community.css'))h=h.replace('</head>','<link rel="stylesheet" href="community.css?v=20261028c6">\n</head>');
if(!h.includes('src="community.js'))h=h.replace('</body>','<script defer src="community.js?v=20261028c6"></script>\n</body>');
h=h.replaceAll('?v=20261028zh5','?v=20261028c6');write('index.html',h);
let r=read('reader.js');r=r.replace("(a.batch===5?'第五批節譯'","(a.batch===6?'第六批選讀':a.batch===5?'第五批節譯'");
if(!r.includes('if(a.communityRef)'))r=r.replace('if(globalThis.AtlasProbabilities){',`if(a.communityRef)body.innerHTML='<aside class="reader-source-summary"><strong>本篇搭配英文來源與短句翻譯</strong><p><a href="#community-'+esc(a.communityRef)+'">開啟原作者選讀、短句翻譯與評價依據 →</a></p></aside>'+body.innerHTML;
      if(globalThis.AtlasProbabilities){`);
r=r.replace('if(["#probabilities","#schools"].includes(location.hash))','if(["#probabilities","#schools","#community"].includes(location.hash)||location.hash.startsWith("#community-"))');write('reader.js',r);
console.log(JSON.stringify({articles:m.articles.length,figures:figures.length,communitySources:data.items.length,paths:m.paths.length}));
