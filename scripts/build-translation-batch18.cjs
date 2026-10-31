const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dist=path.resolve(__dirname,'../dist'),read=f=>JSON.parse(fs.readFileSync(path.join(dist,f),'utf8')),write=(f,v)=>fs.writeFileSync(path.join(dist,f),typeof v==='string'?v:JSON.stringify(v,null,2)+'\n'),additions=require('./licensed-batch18.json');
const marker='2026-10-31 授權選段續譯';
for(const item of additions){const file='reading/articles/'+item.articleId+'.json',a=read(file);assert.equal(a.license.id,'CC BY-SA 4.0');assert.equal(item.sentencePairs.map(s=>s.en).join(' '),item.en);assert.equal(item.sentencePairs.map(s=>s.zh).join(''),item.zh);
 if(!a.translationRevisions?.some(r=>r.id==='licensed-batch18')){
  if(a.id==='licensed-trends')a.translation.push({kind:'heading',en:'Up-Trend',zh:item.headingZh});
  a.translation.push(...item.sentencePairs.map(s=>({kind:'paragraph',en:s.en,zh:s.zh})));
 }
 a.revision='2026-10-31';a.minutes=12;
 if(a.id==='licensed-trends'){
  a.subtitle='趨勢概念與「上升趨勢」完整子小節；保留歷史案例、英文與語氣。';
  a.summary='本篇保留三種趨勢的原有節譯，新增上升趨勢歷史案例的三句完整對照。股票案例的日期、價位及來源範圍分列；導讀、合成圖與校註另標。';
  a.translationScope='Trends 主標題下的三段正文與一行製圖占位文字，加上完整 Up-Trend 子小節的一段正文（拆為三句對照）；不含 Range-bound / Oscillating 或其他小節。';
  a.keyPoints[0]='完整翻譯指定 Trends 概念選段與 Up-Trend 子小節；不是整章。';
  a.translationNotes[2]='三種趨勢範例行是原頁製圖占位文字；本站另繪折線為合成資料。新增 Up-Trend 中的「下圖」亦照譯，但本頁沒有重製來源圖。';
  const note='本批逐句保留 2009 年 3 月至 2011 年 5 月、100 至 350 與「大約兩年」；原文未明列幣別或價格還原方式，不自行補填，也不當作今日價格。';if(!a.translationNotes.includes(note))a.translationNotes.push(note);
  const section={heading:'四、歷史案例與合成圖分開',paragraphs:['新增 Up-Trend 是原作者的歷史描述，英文依原句照錄。來源提到的圖像未重製、歷史行情未重建；本站現有整理圖使用合成資料，並非該股票案例。']};a.sections=[...a.sections.filter(s=>s.heading!==section.heading),section];
  a.caseQuiz[2].question='原文的四種趨勢範例行是什麼性質？';
 }else{
  a.subtitle='量度目標與新增泡沫討論第一段；原文逐句保留，校註另列。';
  a.summary='本篇保留量度目標的原有節譯，新增泡沫討論的第一段四句對照。作者的結構判斷與心理描述照譯，沒有把它們改成已驗證的泡沫門檻或交易規則。';
  a.translationScope='Targets 前三段正文，以及第二段後的一行製圖占位文字；第三段拆為四句對照。不含最後一段邊際買方討論及末尾占位文字，非全小節或全章。';
  a.keyPoints[0]='完整翻譯指定前三段正文與中間一行占位文字，不是整個 Targets 小節。';
  a.sections[0].paragraphs[0]='對照頁保留 Targets 前兩段及後面一行占位文字，再續譯泡沫討論的第一段；最後一段邊際買方討論尚未翻入。這是 Wikibooks 社群教材，不是 Brooks 官方教材；一般英文語氣不直接承接 Brooks 的機率詞彙定義。';
  const section={heading:'四、比喻照譯，判斷依據另外查核',paragraphs:['泡沫段落是原作者的觀點。對數刻度與重力的用語並未在此轉成可運算判準；恐懼、貪婪等描述，也沒有附行為資料或數值機率。譯文保留原意，不能據此替今日行情下診斷。']};a.sections=[...a.sections.filter(s=>s.heading!==section.heading),section];
  a.translationNotes[3]='原前兩段後的一行是製圖占位文字；本站另繪合成圖，沒有冒充原圖。';
  const note='新增第三段逐句保留作者評價；「不受重力與對數刻度約束」是原文欠精確的比喻，非本頁採用的數學門檻。末句指缺乏恐懼且貪婪到極致，並非同時缺乏兩者。';if(!a.translationNotes.includes(note))a.translationNotes.push(note);
  a.caseQuiz[2].choices[2]='Targets 前三段正文與中間一行占位文字';a.caseQuiz[2].explanation='新增泡沫討論第一段，仍未翻入最後一段邊際買方討論或整章。';
 }
 a.translationStatus='已授權選段完整逐句翻譯，保留英文原文；範圍以本頁說明為準，非整章翻譯。';
 a.translationRevisions=[...(a.translationRevisions||[]).filter(r=>r.id!=='licensed-batch18'),{id:'licensed-batch18',date:'2026-10-31',note:marker,addedSection:item.section,addedSentences:item.sentencePairs.length}];
 a.license.scope=a.translationScope+' 本篇新增導讀、校註、合成圖與練習亦依相同授權。';
 const attribution=' 原版節譯保留；2026-10-31 續譯與分句校對：Price Action Atlas，AI 協助。';if(!a.license.attribution.includes('2026-10-31 續譯'))a.license.attribution+=attribution;
 a.license.changes='原有節譯保留，新增明列選段的繁中逐句對照與校註；英文原句照錄並分句排版，未重用來源圖片。';
 a.sources[0].checked='2026-10-31';a.sources[0].scope=a.translationScope;a.sources[0].access='已讀公開原頁對應文字，頁尾固定版本仍為 4351762；固定版本入口本次工具取得失敗，改由原頁版本標記核對。';a.sources[1].checked='2026-10-31';
 write(file,a);
}
const m=read('reading/index.json');for(const r of m.articles){const item=additions.find(a=>a.articleId===r.id);if(!item)continue;const a=read('reading/articles/'+r.id+'.json');for(const k of ['subtitle','summary','minutes'])r[k]=a[k];r.tags=[...new Set([...a.glossary.flatMap(t=>[t.en,t.zh]),...a.keyPoints,'英文對照','完整節譯','整理圖'])];}m.revision='2026-10-31';write('reading/index.json',m);
const sectionFile=path.join(__dirname,'translation-section.html');let section=fs.readFileSync(sectionFile,'utf8');const note='<!-- TRANSLATION_BATCH18_NOTE -->\n <div class="card translation-coverage-note"><strong>10.31 原文逐句保留：兩處授權選段續譯。</strong><p><a href="#read/licensed-trends">上升趨勢歷史案例：新增三句</a> · <a href="#read/licensed-measured-move">泡沫討論第一段：新增四句</a>。開啟文章後選「授權節譯對照」，中文優先、英文逐句展開；附摘要、術語及校註。</p><p><strong>授權與範圍：</strong>Wikibooks 固定版本 4351762，CC BY-SA 4.0；明列此次完整翻譯的選段，保留作者、版本、改作與下載。其餘書籍、影片及未授權全文不列完成。</p></div>\n';if(section.includes('<!-- TRANSLATION_BATCH18_NOTE -->'))section=section.replace(/<!-- TRANSLATION_BATCH18_NOTE -->[\s\S]*?(?=<!-- CONTENT_BATCH17_NOTE -->)/,note);else section=section.replace('<!-- CONTENT_BATCH17_NOTE -->',note+'<!-- CONTENT_BATCH17_NOTE -->');section=section.replace(/(<!-- CONTENT_BATCH17_NOTE -->\s*)<div class="card translation-coverage-note">([\s\S]*?)<\/div>/,'$1<details class="card translation-coverage-note"><summary>前批：資料邊界與來源校讀</summary>$2</details>');fs.writeFileSync(sectionFile,section);
let html=fs.readFileSync(path.join(dist,'index.html'),'utf8');const update='<!-- TRANSLATION_BATCH18_UPDATE -->';if(!html.includes(update))html=html.replace('<!-- CONTENT_BATCH17_UPDATE -->',update+'<a class="discovery-update" href="#read/licensed-trends"><span>10.31 原文與逐句翻譯</span><strong>兩處授權選段續譯 · 七句中英對照與校註</strong><span>開啟對照 →</span></a>\n<!-- CONTENT_BATCH17_UPDATE -->');write('index.html',html);
const log=read('reading/content-updates.json'),entry={id:'translation-batch18-20261031',collected:'2026-10-31',updated:'2026-10-31',timezone:'Asia/Taipei',description:'擴充兩個既有授權閱讀單元，新增七句完整中英對照；原文、摘要與校註分列。',articles:additions.map(a=>a.articleId),sources:['Wikibooks Patterns 4351762','Wikibooks Copyrights 4622060'],decisions:[{source:'Up-Trend 子小節與 Targets 第三段',url:'https://en.wikibooks.org/wiki/Technical_Analysis/Patterns',status:'授權指定選段續譯',reason:'實讀原頁，頁尾版本 4351762；核對 CC BY-SA 4.0。原文逐句照錄，不重刊來源圖。'},{source:'固定版本與永久入口',url:'https://en.wikibooks.org/w/index.php?title=Technical_Analysis/Patterns&oldid=4351762',status:'工具取得失敗，已用版本相同原頁核對',reason:'固定網址與 Special:PermanentLink 入口由研究工具回傳不可取得；原頁成功讀取且頁尾版本一致，不把失敗記成沒有教材。'},{source:'Targets 最後一段與未授權商業教材',status:'本批尚未處理',reason:'明列新增範圍；不以摘要冒充逐字翻譯，也不宣稱全章完成。'}],notes:['兩個閱讀 ID、筆記鍵、原有英文及譯文區塊保留；只更新選段範圍及相應測驗說明。','新增兩段原文拆為七句逐句對照，原句文字與順序可還原。','原文比喻與作者評價照譯，無新增機率、幣別、價格還原或 Brooks 課程歸屬。','保留 CC BY-SA 4.0、固定版本、修訂歷史及帶原文的下載檔。','正文摘要總數不增加；只是既有授權選段擴充，不代表整章或全站完成。']};log.batches=[entry,...log.batches.filter(b=>b.id!==entry.id)];write('reading/content-updates.json',log);console.log(JSON.stringify({expandedArticles:2,newSentencePairs:7,articleCount:m.articles.length,newEnglishWords:additions.reduce((n,a)=>n+a.en.split(/\s+/).length,0)}));
