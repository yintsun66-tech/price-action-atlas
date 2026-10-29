/* Translation-only checkpoint: retain all original articles, cards and learner state. */
const fs=require('node:fs'),path=require('node:path');
const dist=path.resolve(__dirname,'../dist'),read=f=>JSON.parse(fs.readFileSync(path.join(dist,f),'utf8'));
const reviews=require('./zh-core-source-reviews-5.json');
let html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const marker='<!-- TRANSLATION_BATCH9_UPDATE -->',card=marker+'<a class="discovery-update" href="#translation"><span>10.30 核心翻譯續讀</span><strong>帶狀交易四篇 · 視覺化學習 · Brooks 六個術語</strong><span>閱讀繁中摘要 →</span></a>\n';
if(!html.includes(marker))html=html.replace('<!-- CONTENT_BATCH8_UPDATE -->',card+'<!-- CONTENT_BATCH8_UPDATE -->');
fs.writeFileSync(path.join(dist,'index.html'),html);
const log=read('reading/content-updates.json'),entry={
 id:'translation-batch9-20261030',collected:'2026-10-30',updated:'2026-10-30',timezone:'Asia/Taipei',
 description:'七個既有英文來源續讀：五篇正文摘要、Brooks 六詞條與臺灣當沖論文指定文字；英文短句收合，中文優先。',
 sources:reviews.map(r=>r.resourceId),articles:[],
 decisions:reviews.map(r=>({source:r.sourceTitle,url:r.url,status:r.status==='body-summary'?'採用正文摘要':'補讀既有部分內容',reason:r.readScope})),
 notes:['全部七個網址已在來源清單，不重複新增來源卡或灌增網址總數。','五篇 Ali 客座文章未標作 Brooks 親筆或付費課來源；沒有讀取付費內容。','原文百分比、優越性與心理學主張分列作者立場及本站校註，不當作樣本外績效。','原 62 篇文章、16 筆社群來源及兩組筆記鍵保留。','08A、33A 依官方公開課綱及單元頁題名核對，只列相關補讀。']
};
log.batches=[entry,...log.batches.filter(b=>b.id!==entry.id)];
fs.writeFileSync(path.join(dist,'reading/content-updates.json'),JSON.stringify(log,null,2)+'\n');
console.log(JSON.stringify({reviewedSources:reviews.length,newBodySummaries:reviews.filter(r=>r.status==='body-summary').length,existingPartialReadings:2}));
