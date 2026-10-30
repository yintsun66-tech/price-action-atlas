const fs=require('node:fs'),path=require('node:path');
const dist=path.resolve(__dirname,'../dist'),read=f=>fs.readFileSync(path.join(dist,f),'utf8'),write=(f,v)=>fs.writeFileSync(path.join(dist,f),typeof v==='string'?v:JSON.stringify(v,null,2)+'\n');
let html=read('index.html');
if(!html.includes('learning-paths.css'))html=html.replace('</head>','<link rel="stylesheet" href="learning-paths.css?v=20261030learn1">\n</head>');
if(!html.includes('src="reader-paths.js'))html=html.replace('<script defer src="reader.js','<script defer src="reader-paths.js?v=20261030learn1"></script><script defer src="reader.js');
if(!html.includes('id="reading-path-select"'))html=html.replace('<div class="reading-routes card"><h3>這次從哪裡讀起？</h3><p>依問題選一條路線；圖解、原典條件與本站研究假說分開。</p><div class="reading-route-grid" id="reading-route-grid"></div></div>',
 '<div class="reading-routes card learning-path-shell"><h3>先選一條路線，留下一個答案。</h3><p>從背景、K 棒、風險與紀錄開始，或依問題選擇進階路線。順序由本站編排；已讀進度沿用原有筆記紀錄。</p><label class="learning-path-picker">選擇學習路線<select id="reading-path-select" aria-label="選擇學習路線" disabled><option>正在載入路線…</option></select></label><div class="learning-path-content" id="reading-route-grid"></div></div>');
html=html.replace('id="reading-route-grid" aria-live="polite"','id="reading-route-grid"');
html=html.replace('<span class="pill blue">第七批翻譯與辨識練習</span><h3>目標、比例與判斷，逐一讀清楚。</h3><p>累積 56 篇繁中原創導讀與 6 篇授權節譯，全部 62 篇附有整理圖，共 68 張原創 SVG。這批新增兩篇原創導讀、一篇量度目標的授權中英選段與九題練習；來源短句、本站算例與完整範圍譯文分開標示。</p><a class="btn primary" href="#read/licensed-measured-move" id="reader-start">開始本批閱讀 →</a>',
 '<span class="pill blue">繁中精讀・持續更新</span><h3>先建立語言，再練習判斷。</h3><p>累積 56 篇繁中原創導讀與 6 篇授權節譯，全部 62 篇附有整理圖，共 68 張原創 SVG。先沿入門順序建立背景、K 棒、風險與紀錄，再按問題選擇進階路線；來源摘要、本站算例與授權譯文分開標示。</p><a class="btn primary" href="#read/brooks-context-first" id="reader-start">從入門第一篇開始 →</a>');
const marker='<!-- LEARNING_BATCH12_UPDATE -->';
if(!html.includes(marker))html=html.replace('<!-- READING_BATCH11_UPDATE -->',marker+'<a class="discovery-update" href="#reading"><span>10.30 學習導航與續譯</span><strong>從背景到紀錄：新入門路線、下一篇未讀與十八項詞條</strong><span>選一條路線開始 →</span></a>\n<!-- READING_BATCH11_UPDATE -->');
write('index.html',html);
let reader=read('reader.js');
if(!reader.includes('function renderLearningRoutes()'))reader=reader.replace('  function renderCatalog() {',`  let learningPaths=[], activeLearningPath="start";
  function renderLearningRoutes() {
    const P=globalThis.AtlasLearningPaths;
    if(!P||!learningPaths.length)return;
    const picker=q("#reading-path-select");
    if(picker){
      if(!picker.dataset.ready){picker.innerHTML=P.options(learningPaths);picker.dataset.ready="true";}
      picker.disabled=false;picker.value=activeLearningPath;
    }
    q("#reading-route-grid").innerHTML=P.render(P.model(learningPaths,activeLearningPath,state.records));
  }
  function renderCatalog() {`);
reader=reader.replace(/q\("#reading-more"\)\.hidden=shown\.length>=rows\.length;\r?\n\s+storageStatus\(\);(?:renderLearningRoutes\(\);)?/,'q("#reading-more").hidden=shown.length>=rows.length;\n    storageStatus();renderLearningRoutes();');
if(!reader.includes('AtlasLearningPaths?.prepare'))reader=reader.replace('      q("#reading-route-grid").innerHTML=(data.paths||[])','      learningPaths=globalThis.AtlasLearningPaths?.prepare(data.paths||[],manifest)||[];\n      if(learningPaths.length)renderLearningRoutes();\n      else q("#reading-route-grid").innerHTML=(data.paths||[])');
if(!reader.includes('activeLearningPath=e.target.value'))reader=reader.replace('  window.addEventListener("hashchange",route);','  q("#reading-path-select")?.addEventListener("change",e=>{activeLearningPath=e.target.value;renderLearningRoutes();});\n  window.addEventListener("hashchange",route);');
reader=reader.replace('q("#reader-start").href="#read/"+ids[0]','q("#reader-start").href="#read/"+(learningPaths[0]?.steps[0]?.id||ids[0])');
if(!reader.includes('storageStatus();renderLearningRoutes();'))throw Error('Missing learning route progress hook');
write('reader.js',reader);
const log=JSON.parse(read('reading/content-updates.json')),reviews=require('./zh-core-source-reviews-8.json');
const entry={id:'learning-batch12-20261030',collected:'2026-10-30',updated:'2026-10-30',timezone:'Asia/Taipei',description:'保留十二條既有路線，新增四篇入門順序、逐篇任務及下一篇未讀導航；續讀 Brooks 六項術語及兩個 MarketLife 公開介紹。',sources:reviews.map(r=>r.resourceId),articles:[],decisions:[...reviews.map(r=>({source:r.sourceTitle,url:r.url,status:r.status==='intro-only'?'只完成公開介紹':'指定詞條續讀，仍為部分摘要',reason:r.readScope})),{source:'兩個 MarketLife 課程影片與講義',status:'未採為正文完成',reason:'只取得公開課綱，未登入或觀看影片，不把目錄標為完整教材。'},{source:'Brooks 付費 13A',status:'只核對單元，不讀付費內容',reason:'公開課綱與網站地圖核對題名及官方網址；文字出處是公開詞表。'}],notes:['新入門順序與練習提示為本站編排，不冒充講師官方課綱。','所有既有文章、十二條路線資料、十九筆社群卡及筆記 schema 保留；導航只讀現有已讀標記，切換路線不寫入儲存。','已讀不是理解、考核或獲利資格；不顯示未驗證的學習成功率。','本批沒有取用失敗；未讀或未觀看的延伸內容繼續保留未完成範圍。']};
log.batches=[entry,...log.batches.filter(b=>b.id!==entry.id)];write('reading/content-updates.json',log);
console.log(JSON.stringify({newStarterSteps:4,originalPaths:12,articlePayloadsChanged:0,sourceReadings:reviews.length}));
