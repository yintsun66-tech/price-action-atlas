require('./build-content-batch39.cjs');
const fs=require('node:fs'),path=require('node:path'),file=path.join(__dirname,'../dist/reading/content-updates.json');
const log=JSON.parse(fs.readFileSync(file,'utf8')),entry={id:'unit-correction-20261116',collected:'2026-11-16',updated:'2026-11-16',timezone:'Asia/Taipei',description:'修正DOM原創例題將未指定商品數量寫成口數的語境不一致。',articles:[],referencedArticles:['flow-depth'],sources:[],notes:['提問移除60口，明示教學單位不可直接換成期貨口數、BTC枚數或成交筆數。原例100、40、60、20、80及算術不變。','本次校讀不增加來源摘要、全文翻譯或深度編排計數；維持23/62、主線18/18。','Sierra英文術語頁Quantity段落與公開支援串86580僅作交叉查核，不新增來源卡；實讀範圍及略過理由見docs/unit-correction-20261116.md。']};
log.batches=[entry,...log.batches.filter(b=>b.id!==entry.id)];fs.writeFileSync(file,JSON.stringify(log,null,2)+'\n');
