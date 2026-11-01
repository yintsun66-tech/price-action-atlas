const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),a=JSON.parse(fs.readFileSync(path.join(root,'dist/reading/articles/licensed-price-forecasting.json'),'utf8'));
const snapshot=fs.readFileSync(path.join(root,'docs/sources/batch22-basis-3562704.txt'),'utf8').split('--- BEGIN SOURCE TEXT ---')[1].split('--- END SOURCE TEXT ---')[0];
const flatten=t=>t.kind==='table'?[...t.headers.en,...t.rows.flatMap(r=>r.en)]:Array.isArray(t.en)?t.en:[t.en];
const norm=s=>s.replace(/\s+/g,' ').trim();
assert.equal(norm(a.translation.flatMap(flatten).join(' ')),norm(snapshot),'Source teaching text must be fully covered, in original order');
assert.equal(a.translation.filter(t=>t.kind==='heading').length,5);
assert.equal(a.translation.filter(t=>t.kind==='paragraph'&&t.sourceRole!=='caption').length,11);
assert.equal(a.translation.filter(t=>t.sourceRole==='caption').length,1);
assert.equal(a.translation.find(t=>t.kind==='table').rows.length,5);
for(const t of a.translation){if(t.kind==='table'){assert.equal(t.headers.en.length,t.headers.zh.length);for(const r of t.rows){assert.equal(r.en.length,r.zh.length);assert.ok(r.zh.every(Boolean));}}else assert.ok(t.zh&&t.en);}
assert.equal(a.license.id,'CC BY-SA 4.0');
const audit=JSON.parse(fs.readFileSync(path.join(__dirname,'fulltext-source-audits.json'),'utf8')).find(r=>r.sourceId==='556ebe1e576b291ac491');assert.ok(audit?.complete&&audit.unitIds.includes(a.id));
assert.equal(audit.evidence.englishAndChineseBlocksSha256,crypto.createHash('sha256').update(JSON.stringify(a.translation)).digest('hex'));
assert.ok(audit.excluded.includes('來源圖片')&&audit.evidence.method.includes('取得失敗'));
console.log(JSON.stringify({source:'3562704',coverage:'all teaching text; excludes images, navigation and linked content',proseBlocks:11,tableRows:5,headings:5,captions:1,passed:true}));
