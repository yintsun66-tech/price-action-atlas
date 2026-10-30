/* Preserve article payloads, source IDs and learner state; change presentation only. */
const fs=require('node:fs'),path=require('node:path');
const dist=path.resolve(__dirname,'../dist'),read=f=>fs.readFileSync(path.join(dist,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(dist,f),s);
let html=read('index.html');
if(!html.includes('reading-layout.css'))html=html.replace('</head>','<link rel="stylesheet" href="reading-layout.css?v=20261030read1">\n</head>');
const toc='<aside class="reader-toc" aria-label="本篇目錄" id="reader-toc"></aside>';
if(!html.includes('class="reader-contents"'))html=html.replace(toc,'<details class="reader-contents"><summary>展開本篇章節</summary>'+toc+'</details>');
const marker='<!-- READING_BATCH11_UPDATE -->';
if(!html.includes(marker))html=html.replace('<!-- CONTENT_BATCH10_UPDATE -->',marker+'<a class="discovery-update" href="#translation-resource-discovery-galen-woods-2"><span>10.30 續譯與閱讀更新</span><strong>從型態發想到行情背景，兩篇英文原作者摘要</strong><span>單欄大字，繼續閱讀 →</span></a>\n<!-- CONTENT_BATCH10_UPDATE -->');
write('index.html',html);
const log=JSON.parse(read('reading/content-updates.json')),reviews=require('./zh-core-source-reviews-7.json');
const entry={id:'reading-batch11-20261030',collected:'2026-10-30',updated:'2026-10-30',timezone:'Asia/Taipei',description:'兩筆既有待讀英文來源補上實讀正文摘要；文章改採專注單欄與可展開目錄，保留筆記與原文。',sources:reviews.map(r=>r.resourceId),articles:[],decisions:reviews.map(r=>({source:r.sourceTitle,url:r.url,status:'既有待讀來源轉為正文摘要',reason:r.readScope})),notes:['只作繁中精簡摘要與必要短句，不重製完整文章、原作者圖或未核對的付費內容。','Woods 原文開收不等式疑誤以本站校註分列；Fuller 的高機率及學員數保留為作者主張。','Medium 僅作留白、文章寬度與字級層次參考；本站自行設計，不使用其商標、版型程式或文章。','62 個原閱讀單元、19 筆來源卡資料、筆記鍵與進度資料保留；目錄改為預設收合。','Brooks、Ali、SMB 等重複主題本批未另行讀取；不把未讀材料標示完成，沒有取用失敗冒記成沒有新文。']};
log.batches=[entry,...log.batches.filter(b=>b.id!==entry.id)];write('reading/content-updates.json',JSON.stringify(log,null,2)+'\n');
console.log(JSON.stringify({existingSourcesSummarized:2,readingUnits:62,presentation:'single-column',noteKeysUnchanged:true}));
