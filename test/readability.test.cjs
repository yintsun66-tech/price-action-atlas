const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const dist=path.resolve(__dirname,'../dist'),read=f=>fs.readFileSync(path.join(dist,f),'utf8'),guides=JSON.parse(read('reading/reading-guides.json'));
const context={AtlasReadingGuideData:guides};vm.runInNewContext(read('reading-guide.js'),context);
const articles=JSON.parse(read('reading/index.json')).articles.map(a=>JSON.parse(read('reading/articles/'+a.id+'.json')));
const E=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function original(a){return a.sections.map((s,i)=>'<section id="reader-section-'+i+'"><h2 id="reader-heading-'+i+'">'+s.heading+'</h2>'+s.paragraphs.map(p=>'<p>'+p+'</p>').join('')+'</section>').join('')+'<p class="reader-study-note">閱讀後</p>';}
test('全部閱讀單元顯示核心與練習，並保留每個原章節與原文',()=>{
 for(const a of articles){const result=context.AtlasReadingGuide.compose(original(a),a);assert.ok(result.includes('reader-focus'),a.id);for(const [i,s]of a.sections.entries()){assert.equal(result.split('id="reader-section-'+i+'"').length,2);for(const p of s.paragraphs)assert.ok(result.includes(p),a.id);}assert.ok(result.includes(E(a.keyPoints[0]))||guides[a.id],a.id);}
});
test('長文的進階層保留章節 ID，基礎層不收合',()=>{
 for(const id of ['flow-footprint','pp2-signal-gap']){const a=articles.find(a=>a.id===id),g=guides[id],result=context.AtlasReadingGuide.compose(original(a),a);assert.equal((result.match(/class="reader-advanced"/g)||[]).length,a.sections.length-g.advancedFrom);assert.ok(result.indexOf('id="reader-section-0"')<result.indexOf('class="reader-advanced"'));assert.ok(result.includes(g.check.answer));}
});
test('範例算術與不同規則的差異可核對',()=>{
 assert.equal((131-109)/(109-98),2);assert.equal((131-113)/(113-98),1.2);assert.equal(113+2*(113-98),143);assert.equal(180-120,60);assert.equal(120+180,300);assert.equal(100-200,-100);
 assert.ok(guides['pp2-signal-gap'].check.answer.includes('143'));assert.ok(guides['flow-footprint'].check.answer.includes('−100'));
});
test('多義詞與術語不被無語境替換，英文原文仍可展開',()=>{
 const c={};vm.runInNewContext(read('chinese-data.js'),c);vm.runInNewContext(read('chinese.js'),c);
 assert.equal(c.AtlasZh.text('Last / Close / Delta / FVG'), 'Last / Close / Delta / FVG');
 assert.equal(c.AtlasZh.text('Delta',[{en:'Delta',zh:'主動買賣成交量差'}]),'Delta');
 assert.equal(c.AtlasZh.text('Market Cycle｜市場週期'),'市場週期');
 assert.equal(c.AtlasZh.text('likely、probably、usually'),'likely、probably、usually');
 assert.ok(c.AtlasZh.original('Last').includes('lang="en"'));
});
test('主線先於探索且路線收合，數量與日期一致',()=>{
 const html=read('index.html');assert.ok(html.indexOf('id="learning-map"')<html.indexOf('id="site-map"'));assert.ok(html.includes('reading-route-options'));assert.ok(html.includes('site-map-options'));assert.ok(html.includes('合計 74 張原創 SVG'));assert.ok(!html.includes('閱讀庫更新：2026.10.29'));assert.ok(read('reader.js').includes('閱讀庫排序 '));assert.ok(read('reader.js').includes('parent.open=true'));assert.ok(read('readability.css').includes('100dvh'));
});
test('FVG 自測只在收線後確認，圖表使用同一組邊界',()=>{
 const g=guides['ict-fvg'];assert.ok(g.example.includes('H1 = 101'));assert.ok(g.example.includes('L3 = 102.5'));assert.equal(102.5-101,1.5);assert.equal(100.8>101,false);assert.ok(g.check.answer.includes('不符合'));assert.ok(g.check.answer.includes('100.8'));assert.match(read(g.figure.src),/L3 102.5 &gt; H1 101/);assert.ok(g.counterexample.includes('中央棒'));
});
test('風險表的金額、分母及圖中完整數字一致',()=>{
 const g=guides['practice-risk-in-r'];assert.equal((24000-23950)*10+100,600);assert.equal(Math.floor(250/600),0);assert.equal(((24100-24000)*10-100)/500,1.8);assert.equal(900/600,1.5);assert.ok(g.check.answer.includes('原先 250 元預算不允許此單'));
 const svg=read(g.figure.src);assert.ok(svg.includes('24,000 ／ 23,950'));assert.ok(svg.includes('500 + 100 = 600 元'));assert.ok(!/<script|<image|https?:/.test(svg.replace('http://www.w3.org/2000/svg','')));
});
test('單棒兩種路徑具有相同OHLC，實體比例與結果機率分開',()=>{
 const shape=xs=>({o:xs[0],h:Math.max(...xs),l:Math.min(...xs),c:xs.at(-1)});assert.deepEqual(shape([100,110,98,108]),shape([100,98,110,108]));assert.equal(110-98,12);assert.equal(108-100,8);assert.equal(110-108,2);assert.equal(100-98,2);assert.ok(guides['brooks-candle-evidence'].check.answer.includes('外觀比例不是勝率'));
});
test('通道與位置例題沿用原正文價位，而非混入另一組回放',()=>{
 const channel=guides['bp2-trend-channel'],range=guides['bp2-range-location'];assert.equal(24980-24910,70);assert.equal(25000-24925,75);assert.ok(channel.table.rows[0][2].includes('70'));assert.equal(25060-25018,42);assert.equal(25060-25063,-3);assert.equal(25120-25063,57);assert.equal(57/20,2.85);assert.ok(range.check.answer.includes('沒有證明會到價或能成交'));assert.ok(guides['louie-chart-notes'].check.answer.includes('不能把 99.7 填回 10:05'));
});
test('第一階段例題覆蓋與使用者已讀不同，不寫入筆記或偷加已讀',()=>{
 const c={AtlasReadingGuideData:guides};vm.runInNewContext(read('site-maps-data.js'),c);vm.runInNewContext(read('site-maps.js'),c);
 const records={'brooks-context-first':{read:false,note:'保留筆記'}},before=JSON.stringify(records),m=c.AtlasSiteMaps.model(articles,records),html=c.AtlasSiteMaps.stageHTML(m.stages[0]);assert.equal(m.done,0);assert.ok(html.includes('本階段 3 / 3 篇附原創例題與答案'));assert.ok(html.includes('0 / 3 已讀'));assert.equal(JSON.stringify(records),before);
 const progress=JSON.parse(read('reading/editorial-progress.json'));assert.equal(progress.reviewed.length,9);assert.equal(progress.pending.length,53);assert.equal(progress.core.reviewed.length,6);assert.equal(progress.core.pending.length,12);assert.equal(new Set([...progress.reviewed,...progress.pending]).size,articles.length);
});
test('每個例題的圖與延伸入口都可追溯至現有文章或來源卡',()=>{
 const ids=new Set(articles.map(a=>a.id)),cards=new Set(JSON.parse(read('reading/community.json')).items.map(c=>c.id));for(const [id,g]of Object.entries(guides)){assert.ok(ids.has(id));for(const r of g.related||[])assert.ok(ids.has(r.id));for(const s of g.sourceCards||[])assert.ok(cards.has(s.id));if(g.figure)assert.ok(fs.existsSync(path.join(dist,g.figure.src)));}
});
