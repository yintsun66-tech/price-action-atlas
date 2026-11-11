const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
const read=f=>fs.readFileSync(path.join(dist,f),'utf8'),json=f=>JSON.parse(read(f)),write=(f,v)=>fs.writeFileSync(path.join(dist,f),typeof v==='string'?v:JSON.stringify(v,null,2)+'\n');
const release=JSON.parse(fs.readFileSync(path.join(root,'release.json'),'utf8')),manifest=json('reading/index.json'),figures=json('reading/figures.json');
const total=manifest.articles.length,figureCount=figures.figures.length;
const guideBatches=fs.readdirSync(__dirname).filter(f=>/^reading-guides-batch\d+\.json$/.test(f)).sort((a,b)=>Number(a.match(/\d+/)[0])-Number(b.match(/\d+/)[0]));
const guides=Object.assign({},require('./reading-guides.json'),...guideBatches.map(f=>JSON.parse(fs.readFileSync(path.join(__dirname,f),'utf8'))));
for(const id of Object.keys(guides))if(!manifest.articles.some(a=>a.id===id))throw Error('Unknown guide '+id);
write('reading/reading-guides.json',guides);
write('reading-guide-data.js','/* Original editorial examples; no new external source review. */\nglobalThis.AtlasReadingGuideData='+JSON.stringify(guides)+';\n');
fs.copyFileSync(path.join(__dirname,'reading-guide-runtime.js'),path.join(dist,'reading-guide.js'));
fs.copyFileSync(path.join(__dirname,'readability.css'),path.join(dist,'readability.css'));
let reader=read('reader.js');
reader=reader.replace('q("#reader-position").textContent=(i+1)+" / "+ids.length;','q("#reader-position").textContent="閱讀庫排序 "+(i+1)+" / "+ids.length;');
reader=reader.replace('" · 查核 "+a.revision','" · 文章修訂 "+a.revision');
if(!reader.includes('AtlasReadingGuide?.compose'))reader=reader.replace('    q("#reader-toc").innerHTML=', '    if(name==="guide"&&globalThis.AtlasReadingGuide?.compose)body.innerHTML=globalThis.AtlasReadingGuide.compose(body.innerHTML,a);\n    q("#reader-toc").innerHTML=');
// A TOC link into a collapsed advanced lesson opens that lesson before scrolling.
reader=reader.replace('document.getElementById(el.dataset.toc)?.scrollIntoView({behavior:"smooth",block:"start"});','const target=document.getElementById(el.dataset.toc);if(target){let parent=target.parentElement;while(parent&&parent!==body){if(parent.tagName==="DETAILS")parent.open=true;parent=parent.parentElement;}target.scrollIntoView({behavior:"smooth",block:"start"});}');
write('reader.js',reader);
let zh=read('chinese.js');
// Keep ambiguous terms intact; explain them with article-specific glossary entries.
zh=zh.replace("['spread','stop','tick','fill','h2','l2']","['spread','stop','tick','fill','h2','l2','last','close','likely','probably','usually','delta','cvd','dom','fvg','mss','utc','bid','ask']");
zh=zh.replace("'utc','bid','ask']","'utc','bid','ask','footprint','footprint / numbers bars','bid 120','ask 180','bid 成交量','ask 成交量','bid/ask','bid／ask','ohlc','ohlcv']");
zh=zh.replace("if(t.en&&t.zh&&t.en.length>1)","if(t.en&&t.zh&&t.en.length>1&&!contextual.has(t.en.toLowerCase()))");
zh=zh.replace("const source=String(value??''),d=dictionary(glossary)","const source=String(value??''),d=dictionary(glossary)");
// Suppress duplicated bilingual title halves after identical translations.
const dedupe=".replace(/^([^｜]+)\\s*｜\\s*\\1$/, '$1')";
zh=zh.split(dedupe).join('').replace(".replace(/主課程版（主課程）/g",dedupe+".replace(/主課程版（主課程）/g");
write('chinese.js',zh);
let html=read('index.html');
html=html.replace(/<nav class="topnav" aria-label="主要導覽">[\s\S]*?<\/nav>/,'<nav class="topnav" aria-label="主要導覽"><a href="#learning-map">開始／繼續學習</a><a href="#reading">找文章</a><a href="#site-map">探索全站</a><a href="#plan">練習計畫</a></nav>');
html=html.replace(/<strong>\d+<\/strong><span>個(?:學習|可讀)單元<\/span>/,'<strong>'+total+'</strong><span>個可讀單元</span>');
html=html.replace('href="#reading">開始閱讀教材','href="#learning-map">開始學習');
const choices='<!-- READABILITY_ENTRIES_START --><div class="atlas-entry-choices" aria-label="選擇學習入口"><a href="#learning-map"><strong>第一次來</strong><span>六階段、十八篇主線，從背景與 K 棒開始。</span></a><a href="#learning-map"><strong>接著學下去</strong><span>依已讀紀錄找到下一篇，接著完成階段練習。</span></a><a href="#reading"><strong>帶著問題找答案</strong><span>搜尋文章與術語，或展開進階閱讀路線。</span></a></div><!-- READABILITY_ENTRIES_END -->';
if(html.includes('<!-- READABILITY_ENTRIES_START -->'))html=html.replace(/<!-- READABILITY_ENTRIES_START -->[\s\S]*?<!-- READABILITY_ENTRIES_END -->/,choices);else html=html.replace('<div class="atlas-map-quicklinks">',choices+'\n<div class="atlas-map-quicklinks">');
html=html.replace(/<p class="intro-note">[\s\S]*?<\/p>/,'<p class="intro-note">網站版本 v'+release.version+' · 發布 '+release.released+'。主線為六階段十八篇精讀；十二個練習單元與四十八項任務搭配各階段使用。各來源的實際查核日期另列於文章與來源卡。</p>');
// Put the core route first; preserve all section IDs and full navigation.
const maps=html.match(/<!-- ATLAS_SITE_MAPS_START -->([\s\S]*?)<!-- ATLAS_SITE_MAPS_END -->/);
if(maps){const p=maps[1].indexOf('<section id="learning-map"');if(p>=0){const site=maps[1].slice(0,p).trim(),learn=maps[1].slice(p).trim();html=html.replace(maps[0],'<!-- ATLAS_SITE_MAPS_START -->\n'+learn+'\n<details class="site-map-options"><summary>需要找其他內容？展開全站導覽</summary>'+site+'</details>\n<!-- ATLAS_SITE_MAPS_END -->');}}
// Advanced routes stay functional, but no longer compete with the core eighteen.
const routeSelect=html.indexOf('id="reading-path-select"');
if(routeSelect>=0&&!html.includes('class="reading-route-options"')){
 const begin=html.lastIndexOf('<div class="reading-routes',routeSelect);
 const end=html.indexOf('<div class="reading-tools',routeSelect);
 if(begin>=0&&end>begin)html=html.slice(0,begin)+'<details class="reading-route-options"><summary>進階選讀：展開十三條閱讀路線</summary>'+html.slice(begin,end)+'</details>'+html.slice(end);
}
html=html.replace(/全庫 \d+ 篇皆有整理圖，合計 \d+ 張原創 SVG。/,'全庫 '+total+' 篇皆有整理圖，合計 '+figureCount+' 張原創 SVG。');
html=html.replace(/全部 \d+ 篇附有整理圖，共 \d+ 張原創 SVG/,'全部 '+total+' 篇附有整理圖，共 '+figureCount+' 張原創 SVG');
html=html.replace(/<strong>\d+<\/strong><span>張原創向量圖<\/span>/,'<strong>'+figureCount+'</strong><span>張原創向量圖</span>');
html=html.replace('本批新增 12 篇導讀與 36 題自我檢核','2026-10-28 流派批次新增 12 篇導讀與 36 題自我檢核').replace('篇本批新增導讀','篇 10.28 新增導讀');
html=html.replaceAll('同樣叫 Last：先確認是原始價還是平均 K 欄位','Last 欄位：先確認是原始價還是平均 K 收盤');
if(!html.includes('readability.css'))html=html.replace('</head>','<link rel="stylesheet" href="readability.css?v='+release.version+'">\n</head>');
if(!html.includes('reading-guide.js'))html=html.replace('<script defer src="reader.js','<script defer src="reading-guide-data.js?v='+release.version+'"></script><script defer src="reading-guide.js?v='+release.version+'"></script><script defer src="reader.js');
const coreIds=require('./site-maps.json').stages.flatMap(s=>s.ids),coreWorked=coreIds.filter(id=>guides[id]?.check).length;
// The first three editorial lessons predate the inline figure field; each already has a figure in its article.
const reviewed=Object.keys(guides).filter(id=>guides[id].check&&guides[id].counterexample&&guides[id].table&&figures.figures.some(f=>f.article===id)).length;
const reviewedIds=Object.keys(guides).filter(id=>guides[id].check&&guides[id].counterexample&&guides[id].table&&figures.figures.some(f=>f.article===id));
write('reading/editorial-progress.json',{updated:release.released,scope:'原創例題、反例、答案與對應圖的編排；不是外部來源全文校勘、使用者閱讀進度或策略驗證。',total,reviewed:reviewedIds,pending:manifest.articles.filter(a=>!reviewedIds.includes(a.id)).map(a=>a.id),core:{total:coreIds.length,reviewed:coreIds.filter(id=>reviewedIds.includes(id)),pending:coreIds.filter(id=>!reviewedIds.includes(id))}});
const coverage='<p id="readability-progress" class="readability-progress"><strong>'+reviewed+' / '+total+' 篇已補齊原創例題、反例與答案。</strong>十八篇主線已涵蓋 '+coreWorked+' / '+coreIds.length+' 篇；其餘逐批校讀。這是教材編排進度，與你的已讀紀錄及外部來源翻譯完成度分開。</p>';
if(html.includes('id="readability-progress"'))html=html.replace(/<p id="readability-progress"[\s\S]*?<\/p>/,coverage);else html=html.replace('<div class="reading-tools">',coverage+'\n<div class="reading-tools">');
write('index.html',html);
const log=json('reading/content-updates.json');
const entry={id:'readability-20261110',collected:'2026-11-10',updated:'2026-11-10',timezone:'Asia/Taipei',description:'依全站審查重整閱讀層次、入口與三篇示範；修正多義詞替換與數字日期口徑。',articles:[],referencedArticles:Object.keys(guides),sources:[],notes:['62 篇共用問題、核心觀念與練習入口；三篇追加原創算例表與可展開答案。','Footprint 的第六節起、訊號跳空的平均 K 兩節改為可展開進階內容，保留原始文章、圖說、機率及所有來源。','本次為既有資料的編排與語境校正；未讀取新外部來源，不增加正文摘要或全文翻譯完成數。','主線十八篇、十二練習單元、四十八任務的關係明示；進階路線與全站入口按需展開。','原排程維持 Asia/Taipei 每天十點，先校讀、圖文對應與改善理解，再新增少量來源。']};
// Historical revision records retain their actual scope and ordering.
if(!log.batches.some(b=>b.id===entry.id)){entry.referencedArticles=['brooks-context-first','pp2-signal-gap','flow-footprint'];log.batches.unshift(entry);}write('reading/content-updates.json',log);
require('./stamp-version.cjs');
console.log(JSON.stringify({readability:true,articles:total,figures:figureCount,workedExamples:Object.keys(guides).length}));
