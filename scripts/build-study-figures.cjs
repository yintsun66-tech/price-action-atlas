const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const G=require('./study-svg.cjs'),dist=path.resolve(__dirname,'../dist'),folder=path.join(dist,'images/study');fs.mkdirSync(folder,{recursive:true});
const files=fs.readdirSync(path.join(dist,'reading/articles')).filter(f=>f.endsWith('.json'));
const articles=files.map(f=>JSON.parse(fs.readFileSync(path.join(dist,'reading/articles',f),'utf8'))),byId=new Map(articles.map(a=>[a.id,a]));
const records=[];
function add(id,slug,title,svg,afterSection=0,caption='圖中路徑、標記及數字由本站自編，用於整理本篇問題，沒有產生交易訊號。'){
 const a=byId.get(id);assert.ok(a,id);assert.ok(Number.isInteger(afterSection)&&afterSection>=0&&afterSection<a.sections.length,id+' section');
 if(a.mode==='licensed-section'){svg=svg.replace('<g font-family=', '<metadata>Original Price Action Atlas diagram. CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/ . Not copied from the source textbook image.</metadata><g font-family=');caption+=' 本站新增原創圖亦依本篇 CC BY-SA 4.0 提供，未改作來源圖片。';}
 const file=id+'-'+slug+'.svg';fs.writeFileSync(path.join(folder,file),svg);
 records.push({id:id+'-'+slug,article:id,title,src:'images/study/'+file,width:960,height:Number(svg.match(/height="(\d+)"/)[1]),afterSection,caption,alt:title+'。'+caption,synthetic:true});
}
const process=(id,title,steps,section=0,note)=>add(id,'map',title,G.processFigure(title,'本站原創整理 · 每格是一個可核對的問題',steps),section,note);
const table=(id,title,headers,rows,section=0,footer)=>{const n=records.filter(r=>r.article===id&&r.id.startsWith(id+'-table')).length;add(id,n?'table-'+(n+1):'table',title,G.tableFigure(title,'本站自編數字與分類 · 非市場實測',headers,rows,footer),section);};
const line=(id,title,values,levels=[],notes=[],section=0)=>add(id,'path',title,G.lineFigure(title,'本站合成價格路徑 · 先標已知事件，再讀後續結果',values,{levels,notes}),section);
// Preserve the original nine replay datasets, adding a separate complete study image.
for(const a of articles.filter(a=>a.chartCase))add(a.id,'replay-overview','逐根練習：完整路徑整理',G.candles('逐根練習：完整路徑整理','以本篇「圖例與測驗」原有 OHLC 另繪，不是歷史行情',a.chartCase.bars,[
 '數字棒序對應原逐根案例；藍色收高，灰色收低。',
 '此圖顯示全部路徑；盲測請先切到「圖例與測驗」。',
 '正文若另有一組價格，請按各自例題使用。'
 ],(a.chartCase.levels||[]).map(l=>({price:l.price,label:l.label.slice(0,17)}))),a.sections.length-1,'本圖與原逐根回放採同一組合成 OHLC，完整揭露後續路徑。正文另組數字與這份案例分開使用；盲測請先切到「圖例與測驗」。');

table('pa3-bayes-evidence','同一百個候選，分母不同', ['結果','有證據 E','沒有 E','合計'],[['續行','18','12','30'],['未續行','14','56','70'],['合計','32','68','100']],1,'P（續行｜E）＝18／32＝56.25%；P（E｜續行）＝18／30＝60%。');
table('pa3-winrate-uncertainty','七成勝率，樣本數與區間不同',['虛構樣本','樣本勝率','95% Wilson 區間'],[['14／20','70%','48.1%–85.5%'],['140／200','70%','63.3%–75.9%']],0,'區間依二元獨立同分布近似計算；95% 是方法涵蓋率，不是未來保證。');
process('pa3-research-register','研究版本要連同失敗保存',[['提出問題','先寫資料與規則版本'],['留下所有嘗試','調參與刪時段也要記'],['保留新資料','看過結果後不再未使用'],['公布完整結果','一起列失敗與樣本不足']],2);
process('pa3-session-contract','十分鐘的起點，改變棒的身分',[['微台日盤例','08:45–08:55 第一棒'],['微台下一棒','08:55–09:05 第二棒'],['BTC 同時段例','08:40–08:50 為整十分鐘'],['到期月日盤','13:25–13:30 尾棒僅五分鐘']],0,'圖示為切棒協定；到期契約與其他月份須按各自收盤規格。');
process('pa3-podcast-to-hypothesis','訪談故事如何變成一個研究問題',[['記實際來源','只聽簡介就標簡介'],['分開原意','不把猜測當作者原話'],['提出可測條件','保留資料與失效定義'],['只選一個下一步','使用新資料回答問題']],1);

add('bp2-trend-channel','two-paths','同向創高，回檔深度不同',G.paired('同向創高，回檔深度不同','兩條正文自編路徑；座標相同以便比較',
 {title:'緊密：保留多數上行成果',values:[24900,24960,24940,25000,24982,25040],min:24880,max:25060},
 {title:'寬幅：回到前段附近',values:[24900,24980,24910,25000,24925,25025],min:24880,max:25060},['緊密路徑回檔 20、18 點；寬幅路徑回吐更大。','方向相同，不表示可以使用相同停損與持有預期。']),2);
table('bp2-range-location','相同二十點風險，不同位置',['候選','成交／停損','位置與空間'],[['A 邊緣','25,018／24,998','到中線 25,060：42點'],['B 中段','25,063／25,043','附近即是雙向拉扯區']],1,'區間 25,000–25,120；上緣前的點數不能全部當作無阻力報酬。');
table('bp2-second-entry','先看高低點，再辨認兩次嘗試',['棒','高／低','角色'],[['B → C','25,034 → 25,035','第一次向上觸發'],['D、E','高點回落至25,024','再次回落'],['E → F','25,024 → 25,025','第二次向上觸發']],2,'C 與 F 是觸發棒；第二次計數不保證續行，也不等於第二根陽線。');
line('bp2-reversal-evidence','反轉證據逐步增加，仍需檢查空間',[24900,25100,25075,25045,25080,25020],[{price:25060,label:'原已知回檔低點 25,060'}],['25,075：受壓但未破低；25,045：結構被破壞。','反彈 25,080 後再破 25,045，形成更低高低點。','這條路徑不能直接識別獲利了結或新增空單。'],3);

table('pp2-structural-stop','先有結構價，再計算可承擔口數',['假設成交','停損／含成本風險','120預算可容許'],[['100','96／60 元一口','最多兩口'],['102','96／80 元一口','最多一口'],['100.2（取整）','96／62 元一口','最多一口']],1,'乘數10、成本20皆為例題假設；實際上限、保證金與滑價另查。');
line('pp2-target-trailing','固定目標與追蹤出場，交換不同結果',[100,103,108,113,110,107],[{price:108,label:'A：固定目標 108'},{price:107,label:'B：另給定於107附近退出'}],['兩版初始停損 96；本圖只展示正文指定的結果。','A 毛利 8，B 毛利 7；沒有由這條折線重算追蹤線。','追蹤新價只能在計算完成後生效，不回填棒內。'],2);
process('pp2-closed-higher-frame','高週期沒收線，就還不是已知背景',[['09:20','09:00–09:30 尚未完成'],['09:30','先接收完整三十分鐘資料'],['09:30:03 例','計算完成後才能生效'],['09:35 補傳','保存修訂，不追溯發訊號']],1);
add('pp2-signal-gap','candle','強棒外觀與下一棒風險分開',G.candles('強棒外觀與下一棒風險分開','正文例：開100、高110、低99、收109',[{o:100,h:110,l:99,c:109}],['實體 9／振幅 11＝81.8%；不是勝率。','原參考進場 109、停損 98；下一可用價若變113，風險變15。','固定結構目標131，報酬風險比變為18／15＝1.2。']),0);
process('pp2-time-exit','六根完整棒，到期與成交分開',[['10:00 進場例','第一根於10:10完成'],['11:00','第六根完成，產生到期'],['下一可用價格','收100.4不保證成交100.4'],['若成交99.8','從100進場毛損0.2，再扣費']],1);
add('pp2-intrabar-path','two-orders','同一組 OHLC，兩條觸價順序',G.paired('同一組 OHLC，兩條觸價順序','開100、高106、低94、收102；假定事前已持有多單',
 {title:'甲：100 → 106 → 94 → 102',values:[100,106,94,102],min:92,max:108,levels:[{price:104,label:'目標104'},{price:96,label:'停損96'}]},
 {title:'乙：100 → 94 → 106 → 102',values:[100,94,106,102],min:92,max:108,levels:[{price:104,label:'目標104'},{price:96,label:'停損96'}]},['甲先觸目標，乙先觸停損；棒的顏色無法告訴你順序。','停利優先或停損優先是模型假設，不能冒稱歷史事實。']),0);
line('licensed-support-resistance','區域先標好，之後才觀察測試',[104,100,103,108,110,106,101,105],[{price:100,label:'事前觀察支持區100附近'},{price:110,label:'事前觀察阻力區110附近'}],['這是本站另外設計的圖，不是開放教材原圖。','接近區域只是觀察；確認、取消、成交仍須另定。'],1);
process('brooks-context-first','把看多拆成三份可核對的內容',[['觀察','高點與低點是否提高'],['解讀','暫時偏向延續假說'],['行動','價格風險太大仍可觀望'],['失效','返回已知區域就重評']],0);
process('louie-chart-notes','同一張圖的事實、推論與動作',[['圖的身分','商品、契約、時區與收線'],['事實','實際越過哪個已知價位'],['推論','這可能支持哪種背景'],['動作','等待、取消或記錄下一棒']],1);
table('practice-risk-in-r','可負擔風險，比想下幾口先決',['欄位','自編值','意義'],[['進場／失效','24,000／23,950','價格風險50點'],['一口計畫風險','50×10＋100＝600元','成本100是例題假設'],['帳戶預算','100,000×0.25%＝250元','整數口數為零，略過']],1,'風險預算不夠，不把結構停損硬縮成可下單的距離。');
add('brooks-candle-evidence','shape','單棒外觀可以量測，路徑仍未知',G.candles('單棒外觀可以量測，路徑仍未知','本圖另設教學 OHLC：100／110／98／108',[{o:100,h:110,l:98,c:108}],['實體由100到108，影線顯示最高110、最低98。','僅這四個數字，無法知道先到110或先到98。','同樣的棒形還需放回趨勢、區間與所在位置。']),0);
add('brooks-breakout-test','accept-reject','同一邊界，延續與拒絕分開',G.paired('同一邊界，延續與拒絕分開','本圖另設標準化價格例；邊界先定為100',
 {title:'留在外側的候選路徑',values:[97,99,98,103,102,105],min:94,max:108,levels:[{price:100,label:'已知邊界100'}]},
 {title:'退回內側的候選路徑',values:[97,99,98,103,99,96],min:94,max:108,levels:[{price:100,label:'已知邊界100'}]},['越界只是第一步；後續結果必須等後續資料。','沒有給定規則以前，圖形不代表可交易勝率。']),1);
process('brooks-pullback-language','第二次嘗試，必須有中間變化',[['先前方向','先指定哪段趨勢在恢復'],['第一次觸發','不是第一個低點的別名'],['再次回落','失去第一次恢復成果'],['第二次觸發','計數成立也可能失敗']],1);
process('brooks-order-intent','同樣叫 stop，用途與狀態不同',[['進場觸發','觸發後增加方向風險'],['持倉保護','觸發後嘗試減少持倉'],['委託回報','接受不等於已成交'],['取消與過期','沒有新條件不復活舊單']],0);
table('brooks-scalp-math','八成勝率，毛損益仍為負',['虛構組別','筆數×每筆','合計'],[['獲利交易','16×1','＋16'],['虧損交易','4×（−5）','−20'],['合計','16／20勝＝80%','−4，尚未扣成本']],1,'80% 僅此自編清單的獲利占比，沒有對應市場或 Brooks 型態勝率。');
process('brooks-workspace-routine','三個畫面，配上同一個時鐘',[['價格畫面','市場與來源時間可見'],['決策表','候選、失效與有效期限'],['持倉回報','以實際數量與成交對帳'],['資料中斷','停用新判斷並核對狀態']],1);
table('brooks-psychology-audit','流程與結果分開評分',['是否守規格','結果獲利','結果虧損'],[['符合','合規獲利','合規虧損'],['不符合','違規獲利','違規虧損']],1,'規格先存在才有合規與否；單筆運氣不能證明策略有優勢。');
add('louie-context-pairs','location','同樣的強棒，邊緣與中段不同',G.paired('同樣的強棒，邊緣與中段不同','下列為另設合成路徑，兩者區間均為100–120',
 {title:'靠近下緣後回升',values:[105,101,102,107],min:98,max:122,levels:[{price:100,label:'下緣100'},{price:120,label:'上緣120'}]},
 {title:'在中段出現同幅上推',values:[113,109,110,115],min:98,max:122,levels:[{price:100,label:'下緣100'},{price:120,label:'上緣120'}]},['最後一段同為上推5；位置與前方空間不同。','圖片只整理觀察問題，不替作者或市場指定勝率。']),1);
process('louie-wait-cancel','等待、取消與過期，是不同狀態',[['等待','資料與條件尚未到齊'],['候選具備','重算價格與風險'],['取消','假說或預算已失效'],['過期','期限到後須等新條件']],0);
process('louie-replay-audit','每次揭露前，先保存原判斷',[['固定樣本','先選日期與觀察範圍'],['遮住右側','只使用當時已知資料'],['留原答案','再揭露下一根收線'],['分開檢核','價格事件、成交與成本']],1);
process('practice-discretion-audit','裁量濾網，也要留下被略過的候選',[['共同候選','所有版本用相同母體'],['事前理由','人工接受或略過要有時間'],['保留反例','被拒絕後上漲也不能刪'],['新資料驗證','先查紀錄，再比淨結果']],1);
process('practice-pattern-laboratory','把型態拆成能被推翻的事件',[['固定邊界','只用當時已知的高低'],['觀察越界','先記價格，再取名稱'],['寫反例','未延續與未決一起保存'],['再建交易','另外定義成交與退出']],1);
process('practice-journal-before-after','盤中筆記與盤後結果分開保存',[['時點A','只記可見結構與下一步'],['時點B','收到新資料追加修正'],['盤後','另列結果，不擦舊文字'],['週末','只挑一個可檢查問題']],2);
process('practice-tick-time-transfer','兩種切棒方式，不等於同一時長',[['時間棒','固定十分鐘完成一棒'],['成交筆數棒','固定筆數，所需時間改變'],['相同逐筆','可能形成不同圖形'],['資料不足','只有OHLC時不宣稱精確移植']],0);
process('practice-replay-evidence','畫面證據的四個不同層次',[['盤後箭頭','完成圖上的理想位置'],['盤中計畫','講出候選未必有下單'],['單筆成交','仍不等於全天完整記錄'],['可對帳記錄','時間、數量及報表互核']],1);
add('practice-context-hypothesis','three-backgrounds','一根強棒，先放回不同背景',G.paired('一根強棒，先放回不同背景','本站另設同幅上推；前段結構有不同作用',
 {title:'雙邊重疊後上推',values:[100,106,101,107,102,108],min:96,max:112},
 {title:'連續延伸後再上推',values:[80,86,90,96,102,108],min:78,max:112},['左側問前方邊界；右側問延伸與停損距離。','兩張圖最後皆上推6，不自動產生相同交易條件。']),2);
process('practice-plan-not-stop-only','交易計畫是一串可重播的狀態',[['觀察與候選','新資料才更新身分'],['允許進場','價格、時間及預算均符合'],['持倉管理','以實際成交重算風險'],['結束與停用','期限、退出及故障都要記']],0);
process('licensed-price-forecasting','名詞、規則與證據，是三個工作',[['教材名詞','原文表格是一種分類'],['自訂規則','固定當時可計算條件'],['研究證據','另測成本、風險與新資料'],['保留界線','授權可重用不表示會獲利']],2,'圖由本站新增；沒有重繪來源的完整分類表。');

// New schools: keep all numerical examples aligned with their article paragraphs.
line('wyckoff-cycle','下跌暫停成區間，先保留兩條假說',[120,110,100,108,102,110,104],[{price:100,label:'下緣100'},{price:110,label:'上緣110'}],['此刻只知道出現區間，還不知道最終累積或續跌。','Composite Man 是思考模型，不是可辨識的機構身分。'],1);
line('wyckoff-spring','候選 Spring：越過下緣後返回',[108,100,105,110,104,98,102,111,110,115],[{price:100,label:'事前下緣100'},{price:110,label:'事前上緣110'}],['先前區間100–110；最低98、收102才有返回事件。','後面111、110、115是另外給定的後續，不能提前知道。','Spring／UTAD非必備；此圖沒有真實量能或機構身份。'],1);
add('wyckoff-spring','utad','候選 UTAD：上破也可能繼續漲',G.paired('候選 UTAD：上破也可能繼續漲','本站另外給定的兩條路徑，原觀察區均100–110',
 {title:'上破後回到區間',values:[104,109,112,108,105,101],min:98,max:118,levels:[{price:110,label:'已知上緣110'}]},
 {title:'上破後持續延伸',values:[104,109,112,114,113,117],min:98,max:118,levels:[{price:110,label:'已知上緣110'}]},['上破事件本身，無法事前確定最終派發或續行。','候選、確認與失敗的資料時點各自保存。']),2);
add('wyckoff-effort','effort-result','同樣六千量，淨進展可以不同',G.paired('同樣六千量，淨進展可以不同','兩段皆六根、總量6000；所有價格與量均為合成',
 {title:'甲：收盤淨進展＋6',values:[100,101,102,104,105,106],min:99,max:108},
 {title:'乙：收盤淨進展＋1',values:[100,100.2,100.7,100.4,100.8,101],min:99,max:108},['相同總量搭配不同價格結果，只是可檢查的現象。','原因與後續方向仍需額外證據，不直接宣告吸收。']),1);
add('ict-fvg','geometry','三棒 FVG：定義與資料能力分開',G.fvgFigure(),0,'多頭例對照正文 H1=101、L3=102.5，寬度1.5；右側另加鏡像方向示意。須等第3棒收線；區間不表示從未成交，也不表示一定回補。');
line('ict-structure','自編 MSS：先固定被突破的結構點',[100,104,102,105,101],[{price:104,label:'既有高點104'},{price:102,label:'事前已確認短期低點102'}],['上破104、之後收在101，才依本例形成候選。','位移門檻與FVG是額外條件，不能自動補上。','本圖是本站最小研究定義，不是完整ICT原課策略。'],1);
table('ict-liquidity','時段附日期，紐約與台北一起看',['情境','紐約09:30','研究限制'],[['夏令UTC−4','台北21:30','台北比紐約快12小時'],['冬令UTC−5','台北22:30','台北比紐約快13小時'],['微台日盤開盤','台北08:45','不是相同的開盤時段']],2,'09:30 是時間轉換例，不是所有 ICT 模型的固定進場時點。');
table('flow-footprint','同一價位的成交：Bid × Ask',['分類','合成數量','解讀'],[['Bid 成交量','120','主動賣出分類'],['Ask 成交量','180','主動買入分類'],['Delta','180−120＝＋60','不是新增60口多單'],['總分類成交量','120＋180＝300','每筆仍有買賣雙方']],1,'這只是單一價位，整棒數值須再加總其他價位；單位由資料源決定。');
table('flow-footprint','CVD 換起點，累積高度跟著改',['棒序','Delta','第一棒前歸零','第二棒前重置'],[['1','＋60','60','不納入'],['2','−20','40','−20'],['3','＋10','50','−10']],2,'同樣的成交序列，重置不同可得不同數值；不是價格反轉保證。');
add('flow-absorption','two-futures','正 Delta 未推進，後續仍有兩條路',G.paired('正 Delta 未推進，後續仍有兩條路','另給定99.9–100的分類Delta＋60、末價99.9',
 {title:'路徑甲：離開阻力向下',values:[99.9,100,99.9,99.4,99.7,99.2],min:99,max:101,levels:[{price:100,label:'事前阻力100'}]},
 {title:'路徑乙：其後仍向上突破',values:[99.9,100,99.9,100.4,100.2,100.8],min:99,max:101,levels:[{price:100,label:'事前阻力100'}]},['＋60是額外給的合成成交，並非從折線推算。','吸收是待驗證解讀；兩種後續與未決都必須保留。']),2);
table('flow-depth','相同末量四十，事件可能完全不同',['路徑','原掛量','事件','末掛量'],[['甲','100','撤回60','40'],['乙','100','新增20、成交80','40']],1,'僅有前後快照，不能把減少60全當成成交，更不能推知交易者身份。');
process('school4-comparison','四種方法，先辨認各自看什麼',[['Brooks PA','價格、背景與後續反應'],['威科夫','價量、結構階段與測試'],['ICT','高低點、位移與時段'],['訂單流','主動成交與可見掛單']],0,'此圖是本站比較；不是四個作者共同背書的交易系統。');
line('school-same-chart','同一段合成行情，資料能力不變',[110,106,102,105,101,106,99,104,108,112,109,115],[{price:100,label:'已標觀察區下側100'},{price:106,label:'已標觀察區上側106'}],['可見：下探99後返回104；後面115是之後才知道。','缺少完整OHLC、可靠量與逐筆／深度；不補FVG或Delta。'],0);
process('school-market-fit','依資料能力增加研究，不跳階段',[['OHLC價格','先研究已知邊界與收線'],['可靠OHLCV','再比較價量及同時段基準'],['分類成交','再研究價位Delta與CVD'],['同步深度','最後檢查可見委託與執行']],3,'順序依本專案資料條件安排，不是盈利能力或流派高低排名。');

for(const a of articles)assert.ok(records.some(r=>r.article===a.id),'Missing tailored figure: '+a.id);
assert.equal(new Set(records.map(r=>r.id)).size,records.length);
const index={version:1,checked:'2026-10-28',original:true,figures:records};
fs.writeFileSync(path.join(dist,'reading/figures.json'),JSON.stringify(index,null,2)+'\n');
fs.writeFileSync(path.join(dist,'reading/figures.js'),'/* Original teaching-image metadata. No market data. */\nglobalThis.AtlasFigureData='+JSON.stringify(index)+';\n');
console.log(JSON.stringify({articles:articles.length,figures:records.length,bytes:records.reduce((n,r)=>n+fs.statSync(path.join(dist,r.src)).size,0)}));
