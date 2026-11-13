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
 const html=read('index.html');assert.ok(html.indexOf('id="learning-map"')<html.indexOf('id="site-map"'));assert.ok(html.includes('reading-route-options'));assert.ok(html.includes('site-map-options'));assert.ok(html.includes('合計 77 張原創 SVG'));assert.ok(!html.includes('閱讀庫更新：2026.10.29'));assert.ok(read('reader.js').includes('閱讀庫排序 '));assert.ok(read('reader.js').includes('parent.open=true'));assert.ok(read('readability.css').includes('100dvh'));
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
 const progress=JSON.parse(read('reading/editorial-progress.json'));assert.equal(progress.reviewed.length,19);assert.equal(progress.pending.length,43);assert.equal(progress.core.reviewed.length,16);assert.equal(progress.core.pending.length,2);assert.equal(new Set([...progress.reviewed,...progress.pending]).size,articles.length);
});
test('每個例題的圖與延伸入口都可追溯至現有文章或來源卡',()=>{
 const ids=new Set(articles.map(a=>a.id)),cards=new Set(JSON.parse(read('reading/community.json')).items.map(c=>c.id));for(const [id,g]of Object.entries(guides)){assert.ok(ids.has(id));for(const r of g.related||[])assert.ok(ids.has(r.id));for(const s of g.sourceCards||[])assert.ok(cards.has(s.id));if(g.figure)assert.ok(fs.existsSync(path.join(dist,g.figure.src)));}
});
test('收線和資料可用時點分開，候選帳本收合不藏掉延遲限制',()=>{
 const g=guides['pp2-closed-higher-frame'],a=articles.find(a=>a.id==='pp2-closed-higher-frame');assert.ok(g.check.question.includes('09:30:01'));assert.ok(g.check.answer.includes('09:30:03'));assert.equal(g.advancedFrom,6);const html=context.AtlasReadingGuide.compose(original(a),a);assert.equal((html.match(/class="reader-advanced"/g)||[]).length,1);assert.ok(html.indexOf('id="reader-section-5"')<html.indexOf('class="reader-advanced"'));assert.ok(read(g.figure.src).includes('09:35 補傳'));
});
test('後續創高不等於外側收盤，新成交後風險及空間重算',()=>{
 const g=guides['bp2-breakout-followthrough'];assert.ok(25056>25042&&25060>25042);assert.ok(25050>25000&&24995<25000);assert.equal(25052-24987,65);assert.equal(25080-25052,28);assert.ok(g.example.includes('不補造完整 K 棒'));assert.ok(g.check.answer.includes('65 點'));assert.ok(g.check.answer.includes('28 點'));const svg=read(g.figure.src);for(const n of ['25,056','25,060','25,025','24,982','25,050','24,995'])assert.ok(svg.includes(n));assert.ok(svg.includes('未給開盤'));
});
test('第二次計數保留候選、觸發及成交差別，圖片價格不拆字',()=>{
 const g=guides['bp2-second-entry'];assert.equal(g.table.rows.length,6);assert.ok(25035>25034&&25025>25024);assert.ok(g.check.answer.includes('E 只是候選參考棒'));assert.ok(g.check.answer.includes('不是帳戶成交回報'));assert.equal(25025-24993,32);assert.equal(25050-25025,25);const svg=read(g.figure.src);assert.ok(svg.includes('>→ 25,035</text>'));assert.ok(svg.includes('>→ 25,025</text>'));assert.ok(!svg.includes('>035</text>'));assert.ok(!svg.includes('>025</text>'));
});
test('價格取整、口數下捨及跳空損失對帳，既有初始風險不回填',()=>{
 const risk=p=>(p-96)*10+20;assert.equal(risk(100),60);assert.equal(risk(102),80);assert.ok(Math.abs(risk(100.2)-62)<1e-10);assert.equal(Math.floor(120/62),1);assert.equal(Math.floor(50/60),0);assert.ok(Math.abs(((100-95.4)*10+20)*2-132)<1e-10);const g=guides['pp2-structural-stop'];assert.ok(g.check.answer.includes('132'));assert.ok(g.check.answer.includes('成本 20 仍只計一次'));assert.ok(g.counterexample.includes('保證金'));
});
test('候選A的取消與B的期限分開，期限不含結束點且不回填成交',()=>{
 const g=guides['louie-wait-cancel'];assert.ok(g.example.includes('A 與 B 不混為同一條歷史'));const valid=t=>t>=9*60+55&&t<10*60+15;assert.equal(valid(10*60+5),true);assert.equal(valid(10*60+15),false);assert.equal(valid(10*60+16),false);assert.ok(g.check.answer.includes('另建新候選'));assert.ok(g.check.answer.includes('沒有任何已成交紀錄'));
});
test('停損觸發、價格R與限價未成交保持不同協定，基礎層保留限制',()=>{
 const g=guides['pa3-stop-execution'],a=articles.find(a=>a.id==='pa3-stop-execution');assert.equal(100-96,4);assert.equal((100-94)/4,1.5);assert.ok(94<95);assert.ok(g.check.answer.includes('先核對委託是否送出'));assert.ok(g.check.answer.includes('可能仍持有'));const h=context.AtlasReadingGuide.compose(original(a),a);assert.equal((h.match(/class="reader-advanced"/g)||[]).length,2);assert.ok(h.indexOf('id="reader-section-4"')<h.indexOf('class="reader-advanced"'));const svg=read(g.figure.src);assert.ok(svg.includes('毛損 6 點 = 1.5R'));assert.ok(svg.includes('可能仍然持有'));
});
test('契約尾段與尚未收線分開，前五階段例題不改已讀',()=>{
 assert.equal((13*60+45)-(8*60+45),300);assert.equal((13*60+30)-(8*60+45),285);assert.equal(Math.floor(285/10),28);assert.equal(285%10,5);assert.ok(guides['pa3-session-contract'].check.answer.includes('前者是已結束但截短'));const c={AtlasReadingGuideData:guides};vm.runInNewContext(read('site-maps-data.js'),c);vm.runInNewContext(read('site-maps.js'),c);const m=c.AtlasSiteMaps.model(articles,{});for(const s of m.stages.slice(0,5)){const h=c.AtlasSiteMaps.stageHTML(s);assert.ok(h.includes('本階段 3 / 3 篇附原創例題與答案'));assert.equal(s.done,0);}
});
test('相同六筆逐筆資料按筆數及分鐘分組，08:55邊界歸新棒且量守恆',()=>{
 const {trades,aggregate,countBars,timeBars}=require('../scripts/tick-time-figure.cjs');
 assert.deepEqual(countBars,[{o:100,h:101,l:99,c:99,v:10},{o:102,h:103,l:98,c:103,v:9}]);
 const from=t=>t.time<'08:55:00';assert.deepEqual(timeBars,[aggregate(trades.filter(from)),aggregate(trades.filter(t=>!from(t)))]);
 assert.deepEqual(timeBars,[{o:100,h:102,l:99,c:102,v:14},{o:98,h:103,l:98,c:103,v:5}]);
 assert.equal(countBars.reduce((n,b)=>n+b.v,0),timeBars.reduce((n,b)=>n+b.v,0));assert.notEqual(trades.length,19);
 const sec=t=>t.split(':').map(Number).reduce((n,v)=>n*60+v,0);assert.equal(sec(trades[2].time)-sec(trades[0].time),2);assert.equal(sec(trades[5].time)-sec(trades[3].time),1139);
 assert.ok(read(guides['practice-tick-time-transfer'].figure.src).includes('非平台可選設定'));
});
test('四流派共用資料時不能把缺少的訂單流變成獨立確認',()=>{
 const g=guides['school-market-fit'];assert.equal(g.table.rows.length,4);assert.ok(g.check.answer.includes('Delta'));assert.ok(g.counterexample.includes('四份獨立證據'));assert.ok(g.example.includes('成交量口徑尚未釐清'));assert.ok(g.table.rows[1][1].includes('量能未核對'));
});
test('同一候選日誌追加而不覆寫，無成交的損益不適用',()=>{
 const g=guides['practice-journal-before-after'];assert.ok(g.example.includes('DEMO:X:10:05:LONG:v1'));assert.ok(g.check.answer.includes('不適用'));assert.ok(g.counterexample.includes('重新整理'));assert.ok(g.example.includes('99.7'));assert.ok(g.check.answer.includes('成交'));
});
