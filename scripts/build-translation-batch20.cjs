const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dist=path.resolve(__dirname,'../dist'),addition=require('./licensed-batch20.json'),date=addition.checked;
const read=f=>JSON.parse(fs.readFileSync(path.join(dist,f),'utf8')),write=(f,v)=>fs.writeFileSync(path.join(dist,f),typeof v==='string'?v:JSON.stringify(v,null,2)+'\n');
const ids=['licensed-support-resistance','licensed-continuation-reversal'],updated=[];
for(const id of ids){
 const file='reading/articles/'+id+'.json',a=read(file);assert.equal(a.license.id,addition.license);assert.ok(a.license.sourceRevision.includes('4351762'));
 const added=id===ids[0]?addition.support:[...addition.patterns,...addition.candlestick];
 if(!a.translationRevisions?.some(r=>r.id==='licensed-batch20')){
  a.translation=id===ids[0]?[...a.translation,...addition.support]:[...addition.patterns,...a.translation,...addition.candlestick];
 }
 a.revision=date;a.minutes=id===ids[0]?15:17;
 if(id===ids[0]){
  a.subtitle='兩個同名小節完整文字對照：供需假設、價格極值與重新測試。';
  a.summary='完整對照原章兩個 Support and Resistance 小節：先保留供需解釋的假設語氣，再讀極值、重測與「確認」的原文用法。英文可逐段展開，作者判斷與本站校註分列。';
  a.translationTitle='支撐與壓力：原章兩個同名小節';
  a.translationScope='原章兩個 Support and Resistance 同名小節：第一節三段正文，第二節四段正文與兩行製圖占位文字，依各節原順序完整對照。不含其餘小節、導覽或來源圖片；不是整章。';
  a.keyPoints[0]='兩個同名小節的七段正文與兩行占位文字已完整對照；不是整章。';
  a.sections[0].paragraphs[1]='對照頁保留第一個同名小節三段，並接續第二個同名小節四段正文與兩行製圖占位文字；兩節在原章並不相鄰，依原標題區分，不把它們誤認為一段連續原文。固定版本與修訂歷史可於來源核對。';
  const heading='四、原文的「確認」不等於下一次必然守住';
  a.sections=[...a.sections.filter(s=>s.heading!==heading),{heading,paragraphs:['第二小節把未跌破舊低點稱為支撐獲確認；這是該作者的概念用法，沒有規定容許誤差、觀察幾根、看最高最低或收盤，也沒有測出後續成功率。「頂與底從不孤立形成」也是原作者自己稱為大膽的主張，不能在校註中冒充已證實事實。','原文說重測；本站的研究練習則另要求事前固定舊點、時鐘與失效條件，並記錄沒有重測就離開、測後跌破等反例。原有整理圖是合成資料，不是原作者股票圖或這兩節的實證。']}];
  a.translationNotes=[...a.translationNotes,'第二節的 often 譯「往往」、would expect 譯「預期」、can say 譯「可以說」；不換成數值機率。','price spike 依高／低上下文譯「價格尖峰／尖峰高低點」；principal 原文如此，中文依上下文譯「原理」，英文不改。','ring high / low 與 retest 兩行是原頁製圖占位文字，照譯但未重製來源圖。'].filter((v,i,all)=>all.indexOf(v)===i);
  a.caseQuiz[2].choices[2]='原章兩個同名小節的七段正文與兩行占位文字';
  a.caseQuiz[2].explanation='本批已補入第二個同名小節；完整節譯只涵蓋明列兩節，不含全章與來源圖片。';
 }else{
  a.subtitle='保留舊譯，補上型態總論、成交量確認說法與 K 線型態小節。';
  a.summary='完整對照 Patterns 父節文字及其延續、反轉、K 線三個子小節。從連線、通道與三角形，讀到突破與成交量的作者說法；保留 suggest、can 等語氣，不把清單或「確認」當成已驗證交易策略。';
  a.translationTitle='型態總論、延續、反轉與 K 線：指定範圍完整對照';
  a.translationScope='Patterns 父節七段正文與一行製圖占位文字，以及 Continuation pattern.、Reversal patterns、Candlestick Pattern 三個完整子小節（含原清單與分組標籤）。不含章首導言、章首型態對照表、其他主節、導覽或來源圖片；不是整章。';
  a.keyPoints[0]='Patterns 父節與延續、反轉、K 線三個子小節已完整對照；不是整章。';
  const heading='四、四個點、成交量與反轉：仍缺研究定義';
  a.sections=[...a.sections.filter(s=>s.heading!==heading),{heading,paragraphs:['父節說通道與三角形至少需要兩個尖峰高點、兩個尖峰低點；沒有定義轉折確認或何時畫線，向右延伸不代表右側結果已知。原文另把當天高於平常的成交量稱為突破確認，卻未定義「平常」的期間或數值門檻。這些說法須與可重現規則、成本及樣本驗證分開。','K 線子節只說可能指出反轉開始，並連向維基百科。這次只翻譯本節文字，沒有接續翻譯或驗證該外鏈，也沒有把股票的日成交量說法直接套到微台或 BTC。既有合成圖展示相同起點的不同後續，不能替原作者提供勝率。']}];
  a.translationNotes=[...a.translationNotes,'新補 Patterns 父節中的 can be said、implies 與 K 線子節中的 can indicate，分別保留「可以說」「暗示」「可能指出」；沒有增補成功率。','成交量「確認」為原文主張；原文未附比較基期、統計或跨市場檢驗，本站不將它改為實證結論。','kiwi 只出現在製圖占位文字，原文沒有說明含義；照錄 kiwi，不擅自譯成紐西蘭市場或鳥類。','K 線小節末句的 wikipedia:candlestick pattern 是來源外鏈標籤；中文按其意譯，英文標籤照錄。該外鏈內容未在本批閱讀或翻譯。'].filter((v,i,all)=>all.indexOf(v)===i);
 }
 a.translationStatus='已授權指定範圍完整翻譯並保留英文；範圍依本頁明列，非整章或經驗證交易系統。';
 a.translationRevisions=[...(a.translationRevisions||[]).filter(r=>r.id!=='licensed-batch20'),{id:'licensed-batch20',date,addedParagraphs:added.filter(p=>p.kind==='paragraph'&&!p.en.startsWith('- ')).length,addedPlaceholders:added.filter(p=>p.en.startsWith('- ')).length}];
 a.license.scope=a.translationScope+' 本篇新增導讀、校註、合成圖與練習亦依相同授權。';
 if(!a.license.attribution.includes('第二十批'))a.license.attribution+=' 2026-10-31 第二十批續譯與校對：Price Action Atlas，AI 協助。';
 a.license.changes='保留所有舊中英對照區塊，新增明列範圍之完整段落及占位文字，補上摘要、來源與語氣校註；未重用來源圖片。';
 a.sources[0]={...a.sources[0],checked:date,access:addition.access,scope:a.translationScope};
 a.sources[1]={...a.sources[1],checked:date,access:'實讀公開文字重用政策，核對署名、改作、相同授權及媒體另查條件。'};
 write(file,a);updated.push(a);
}
const index=read('reading/index.json');for(const a of updated){const row=index.articles.find(x=>x.id===a.id);for(const key of ['subtitle','summary','minutes'])row[key]=a[key];row.tags=[...new Set([...a.glossary.flatMap(t=>[t.en,t.zh]),...a.keyPoints,'英文對照','完整節譯','整理圖'])];}index.revision=date;write('reading/index.json',index);
const file=path.join(__dirname,'translation-section.html');let template=fs.readFileSync(file,'utf8');
const note='<!-- TRANSLATION_BATCH20_NOTE -->\n <div class="card translation-coverage-note"><strong>10.31 續譯：重測、突破與型態語氣。</strong><p><a href="#read/licensed-support-resistance">支撐與壓力：兩個同名小節</a> · <a href="#read/licensed-continuation-reversal">型態總論與三個子小節</a>。新增十二段正文、三行製圖占位文字的完整中英對照，保留舊譯與原文順序。</p><p>中文優先、英文可逐段展開；<strong>作者所說的「確認」與本站校註分開</strong>，不補造勝率。另併入上批已核對的 <a href="#read/licensed-measured-move">Targets 完整小節</a>；仍不是整章翻譯。</p></div>\n';
if(template.includes('<!-- TRANSLATION_BATCH20_NOTE -->'))template=template.replace(/<!-- TRANSLATION_BATCH20_NOTE -->[\s\S]*?(?=<!-- TRANSLATION_BATCH19_NOTE -->)/,note);else template=template.replace('<!-- TRANSLATION_BATCH19_NOTE -->',note+'<!-- TRANSLATION_BATCH19_NOTE -->');
template=template.replace(/(<!-- TRANSLATION_BATCH19_NOTE -->\s*)<div class="card translation-coverage-note">([\s\S]*?)<\/div>/,'$1<details class="card translation-coverage-note"><summary>前批：Targets 小節補完與核心介紹</summary>$2</details>');
fs.writeFileSync(file,template);
let html=fs.readFileSync(path.join(dist,'index.html'),'utf8');const marker='<!-- TRANSLATION_BATCH20_UPDATE -->';if(!html.includes(marker))html=html.replace('<!-- TRANSLATION_BATCH19_UPDATE -->',marker+'<a class="discovery-update" href="#read/licensed-support-resistance"><span>10.31 完整節譯續讀</span><strong>支撐重測、型態與突破 · 保留英文與推測語氣</strong><span>閱讀中英對照 →</span></a>\n<!-- TRANSLATION_BATCH19_UPDATE -->');write('index.html',html);
const log=read('reading/content-updates.json'),entry={id:'translation-batch20-20261031',collected:date,updated:date,timezone:'Asia/Taipei',description:'續譯兩個既有授權單元：第二個支撐壓力小節、Patterns 父節與 K 線小節；併入前批尚未發布內容。',articles:ids,sources:[addition.sourceRevision,addition.licensePolicy],decisions:[{source:'Wikibooks Patterns 4351762',url:addition.source,status:'指定範圍完整翻譯',reason:'實讀正文及版本頁尾；CC BY-SA 4.0，保留英文、舊譯與署名。新增十二段正文及三行占位文字，沒有重用來源圖。'},{source:'wikipedia:candlestick pattern',url:'https://en.wikipedia.org/wiki/Candlestick_pattern',status:'未接續處理',reason:'僅是原小節外鏈標籤，本批未讀其內容，不列摘要完成。'}],notes:['原文往往、暗示、可以說及可能等語氣保留；確認不是量化勝率。','兩個同名支撐小節不相鄰，明列各自順序，不偽裝為連續原文。','所有舊譯區塊與 62 個閱讀 ID 保留，其他 60 篇文章、圖像、筆記及權限不變。','來源整頁全文仍未完成；沒有因多譯小節而升級全文完成狀態。','目標已由使用者清除，本批依新的繼續翻譯請求執行，未另建目標或排程。']};log.batches=[entry,...log.batches.filter(b=>b.id!==entry.id)];write('reading/content-updates.json',log);
console.log(JSON.stringify({articles:ids,newProseParagraphs:12,newPlaceholders:3}));
