const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dist=path.resolve(__dirname,'../dist'),indexPath=path.join(dist,'reading/index.json'),catalog=JSON.parse(fs.readFileSync(indexPath,'utf8'));
const newIds=['school4-comparison','school-same-chart','school-market-fit','wyckoff-cycle','wyckoff-spring','wyckoff-effort','ict-fvg','ict-structure','ict-liquidity','flow-footprint','flow-absorption','flow-depth'];
const all=new Map(fs.readdirSync(path.join(dist,'reading/articles')).filter(f=>f.endsWith('.json')).map(f=>{const a=JSON.parse(fs.readFileSync(path.join(dist,'reading/articles',f),'utf8'));return [a.id,a];}));
const figureIndex=JSON.parse(fs.readFileSync(path.join(dist,'reading/figures.json'),'utf8'));
const metadata=a=>({id:a.id,category:a.category,title:a.title,subtitle:a.subtitle,summary:a.summary,level:a.level,minutes:a.minutes,mode:a.mode,batch:a.batch,topic:a.topic,tags:[...new Set([...(a.tags||[]),...a.keyPoints,'整理圖'])],hasCases:!!a.caseQuiz?.length,hasChart:!!a.chartCase,figureCount:figureIndex.figures.filter(f=>f.article===a.id).length});
catalog.articles=[...newIds.map(id=>metadata(all.get(id))),...catalog.articles.filter(a=>!newIds.includes(a.id)).map(a=>({...a,figureCount:figureIndex.figures.filter(f=>f.article===a.id).length}))];
const routes=[
 {title:'四種交易語言，先用同一份證據比較',description:'先讀比較範圍與同圖示例，再依資料能力選研究問題。',ids:['school4-comparison','school-same-chart','school-market-fit']},
 {title:'威科夫：結構、測試與價量',description:'先保留候選與未決，再練習 Spring／UTAD 及努力與結果。',ids:['wyckoff-cycle','wyckoff-spring','wyckoff-effort']},
 {title:'ICT：幾何、結構與時段',description:'固定三棒、擺動與確認時間，分開圖形敘事與實際訂單。',ids:['ict-fvg','ict-structure','ict-liquidity']},
 {title:'訂單流：由成交分類到可見深度',description:'先學 Bid／Ask 成交、Delta 與 CVD，再檢查吸收及委託資料。',ids:['flow-footprint','flow-absorption','flow-depth']}
];
catalog.paths=[...routes,...catalog.paths.filter(p=>!routes.some(r=>r.title===p.title))];catalog.revision='2026-10-28';
assert.equal(catalog.articles.length,54);assert.equal(new Set(catalog.articles.map(a=>a.id)).size,54);assert.ok(catalog.articles.every(a=>a.figureCount>0));
fs.writeFileSync(indexPath,JSON.stringify(catalog,null,2)+'\n');
fs.writeFileSync(path.join(dist,'school-titles.js'),'globalThis.AtlasSchoolTitles='+JSON.stringify(Object.fromEntries(catalog.articles.map(a=>[a.id,a.title])))+';\n');
let h=fs.readFileSync(path.join(dist,'index.html'),'utf8');
if(!h.includes('id="schools"')){
 h=h.replace('<a href="#probabilities">機率註記</a>','<a href="#probabilities">機率註記</a><a href="#schools">流派比較與圖解</a>');
 h=h.replace('<section id="probabilities"',`<section id="schools" aria-labelledby="schools-title">
<div class="section-head"><div><div class="eyebrow">FOUR LENSES · ONE BODY OF EVIDENCE</div><h2 id="schools-title">讀懂四種交易語言。<br>用同一份證據比較。</h2></div><p>Brooks 價格行為、威科夫、ICT 與訂單流。比較問題、資料與適用情境，把可見事實和分析假說分開。</p></div>
<p class="school-intro"><strong>先讓行情文字有圖可對照，再讓流派有證據可比較。</strong>本批新增 12 篇導讀與 36 題自我檢核；全庫 54 篇皆有整理圖，合計 60 張原創 SVG。所有圖均為合成教學，沒有把作者圖表或即時行情重製為研究績效。</p>
<div class="school-stats"><div><strong>54</strong><span>篇附整理圖的文章</span></div><div><strong>60</strong><span>張原創向量圖</span></div><div><strong>12</strong><span>篇本批新增導讀</span></div></div>
<div id="school-cards" class="school-grid"></div>
<div class="school-comparison card"><h3>橫向比較：先固定比較的是什麼。</h3><p>本表以 Brooks 作價格行為代表；威科夫與 ICT 也使用價格結構，訂單流則補充成交與掛單資訊。以下是本站整合分析，沒有替任何流派建立獲利排名。較寬的表格可左右捲動。</p><div class="school-table-wrap"><table class="school-table"><caption class="sr-only">四種交易語言的資料、事件、適用場景與限制比較</caption><thead><tr><th scope="col">比較面向</th><th scope="col">Brooks PA</th><th scope="col">威科夫</th><th scope="col">ICT</th><th scope="col">訂單流</th></tr></thead><tbody id="school-table-body"></tbody></table></div><p class="school-table-caption"><strong>共同驗收：</strong>規則可重現、使用當時資料、保留失敗與未決、計入成本，最後才檢查未參與調整的資料。</p></div>
<div class="school-scene card"><h3>同一段路徑，切換觀看方式。</h3><p>共同資料只有下圖指定價位順序，沒有完整 OHLC、量能、逐筆成交或委託簿。切換觀點不會增加缺少的資料；完整圖已包含後來結果。</p><div class="atlas-figure-viewport"><a href="images/study/school-same-chart-path.svg" target="_blank" rel="noopener noreferrer"><img src="images/study/school-same-chart-path.svg" width="960" height="640" loading="lazy" decoding="async" alt="本站合成價位路徑：下探99後返回104，其後走到115；觀察區100至106。沒有完整OHLC、量能或訂單流。"></a></div><div class="school-scene-tabs" role="tablist" aria-label="同圖切換觀看方式"><button type="button" role="tab" id="school-view-pa" data-school-view="pa" aria-selected="true" aria-controls="school-scene-output">Brooks PA</button><button type="button" role="tab" id="school-view-wyckoff" data-school-view="wyckoff" aria-selected="false" aria-controls="school-scene-output">威科夫</button><button type="button" role="tab" id="school-view-ict" data-school-view="ict" aria-selected="false" aria-controls="school-scene-output">ICT</button><button type="button" role="tab" id="school-view-flow" data-school-view="flow" aria-selected="false" aria-controls="school-scene-output">訂單流</button></div><div id="school-scene-output" class="school-scene-output" role="tabpanel"></div><p><a href="#read/school-same-chart">讀完整的同圖比較導讀 →</a></p></div>
<div class="school-planner card"><h3>依你打算使用的資料，安排研究範圍。</h3><p><strong>這是學習規劃選單，沒有連接即時行情。</strong>選擇較細資料，只表示你打算具備該資料，不代表本站已取得、驗證或可以下單。</p><div class="school-planner-controls"><label>研究市場<select id="school-market" aria-label="選擇研究市場"><option value="tmf">微台 TMF 日盤</option><option value="btc">Binance BTCUSDT 永續</option></select></label><label>打算具備的資料<select id="school-data" aria-label="選擇規劃資料層"><option value="ohlc">僅 OHLC 價格</option><option value="ohlcv">OHLC＋已核對成交量</option><option value="trades">另有可靠分類成交</option><option value="depth">另有同步深度與更新</option></select></label></div><div id="school-planner-output" class="school-planner-output" aria-live="polite"></div><p id="school-market-note" class="school-planner-note"></p></div>
<div class="school-source-policy"><h3>資料與評價的使用方式</h3><p>新內容包含英文第一手資料與繁中說明。Brooks 引用附 Main 單元及官方連結，僅作相關補讀；其他作者教材分別歸屬原作者。ICT 本次只核對官方影片名稱與描述，本站公式不冒充已完整觀看的原課。</p><p>交易所或軟體文件可核對計算，教材評價可協助判斷清晰度；本批沒有取得可替微台或 BTC 背書的四流派獨立績效比較。圖片均為本站原創合成，沒有保存個人交易或觸發任何下單。</p><p><a href="#read/school4-comparison">從完整橫向比較開始 →</a> · <a href="#probabilities">核對機率原意與限制 →</a></p></div>
<noscript><p>互動比較需要 JavaScript。所有原始教材連結保留在各來源與閱讀文章中。</p></noscript>
</section>
<section id="probabilities"`);
 const start=h.indexOf('<div class="reading-intro card">'),end=h.indexOf('<div class="reading-tools">',start);assert.ok(start>0&&end>start);
 h=h.slice(0,start)+`<div class="reading-intro card"><div><span class="pill blue">第四批圖解與流派教材</span><h3>一篇文字，一組可對照的圖。</h3><p>累積 52 篇繁中原創導讀與 2 篇授權小節節譯，全部 54 篇附有整理圖，共 60 張原創 SVG。本批另加入威科夫、ICT、訂單流與同圖比較 12 篇、36 題測驗。圖中條件是教學整理；作者主張、本站假說與市場驗證分開。</p><a class="btn primary" href="#read/school4-comparison" id="reader-start">開始四流派比較 →</a></div><div class="reading-stats"><div><strong id="reading-count">54</strong><span>個可讀單元</span></div><div><strong id="reading-done">0</strong><span>個標記已讀</span></div><div><strong id="reading-saved">0</strong><span>個收藏</span></div><p id="reading-storage">閱讀筆記儲存在此瀏覽器，可匯出備份。</p></div></div>\n`+h.slice(end);
 h=h.replace('<option>推薦來源</option><option>授權節譯</option>','<option>推薦來源</option><option>威科夫</option><option>ICT</option><option>訂單流</option><option>流派比較</option><option>授權節譯</option>');
 h=h.replace('<option value="3">第三批實作</option>','<option value="4">第四批圖解與流派</option><option value="3">第三批實作</option>');
 h=h.replace('<button role="tab" data-reader-tab="probabilities"','<button role="tab" data-reader-tab="figures" aria-selected="false">整理圖</button><button role="tab" data-reader-tab="probabilities"');
 h=h.replace('<link rel="stylesheet" href="schools.css', '<link rel="stylesheet" href="schools.css');
 h=h.replace('</head>','<link rel="stylesheet" href="schools.css?v=20261028schools">\n</head>');
 h=h.replace(/<script defer src="reader\.js\?v=[^"]+"><\/script>/,'<script defer src="reading/figures.js?v=20261028schools"></script><script defer src="reader-figures.js?v=20261028schools"></script><script defer src="school-titles.js?v=20261028schools"></script><script defer src="schools.js?v=20261028schools"></script><script defer src="reader.js?v=20261028schools"></script>');
 h=h.replace('<!-- READING_BATCH3_UPDATE -->','<a class="discovery-update" href="#schools"><span>10.28 圖解與流派比較</span><strong>54 篇都有圖 · 威科夫、ICT、訂單流新教材</strong><span>開始比較 →</span></a>\n<!-- READING_BATCH3_UPDATE -->');
}
if(!h.includes('id="reading-route-grid"'))h=h.replace('<div class="reading-tools">','<div class="reading-routes card"><h3>這次從哪裡讀起？</h3><p>依問題選一條路線；圖解、原典條件與本站研究假說分開。</p><div class="reading-route-grid" id="reading-route-grid"></div></div>\n<div class="reading-tools">');
assert.ok(h.includes('id="schools"')&&h.includes('data-reader-tab="figures"')&&h.includes('id="reading-route-grid"'));
fs.writeFileSync(path.join(dist,'index.html'),h);
console.log(JSON.stringify({articles:catalog.articles.length,paths:catalog.paths.length,figures:figureIndex.figures.length,quizQuestions:[...all.values()].reduce((n,a)=>n+(a.caseQuiz||[]).length,0)}));
