/* Licensed English sections, translated against Wikibooks revision 4351762. */
const fs=require('node:fs'),path=require('node:path');
const dist=path.resolve(__dirname,'../dist'),out=path.join(dist,'reading/articles');
const revision='2026-10-28',sourceRevision='https://en.wikibooks.org/w/index.php?title=Technical_Analysis/Patterns&oldid=4351762';
const p=(en,zh)=>({kind:'paragraph',en,zh}),heading=(en,zh)=>({kind:'heading',en,zh}),items=(en,zh)=>({kind:'list',en,zh});
const definitions=[{
 id:'licensed-trends',title:'趨勢的三種方向：英文原文與繁中逐段對照',subtitle:'完整翻譯 Trends 的直接正文，保留股票背景及原文假設。',topic:'趨勢',minutes:12,
 scope:'Trends 標題下、Up-Trend 子標題之前的三段正文與一行製圖占位文字；不含 Up-Trend、Range-bound / Oscillating 等子小節。',
 summary:'本篇逐段翻譯開放教材如何描述上升、下降與區間趨勢。英文先談股票長期走勢的企業背景，再談較短期的預期變化，最後描述高低點；這三個層次不能直接混成微台或 BTC 十分鐘的進場規則。原文及繁中對照可直接閱讀，中文導讀與新增合成圖另行標示。',
 keyPoints:['本次完整範圍是 Trends 的直接正文，不是整個 Trends 章節。','原文的 tend、may 與 assumes 類語氣保留，不改成必然。','equity instruments 在此指股票類工具，不能直接替期貨或永續合約背書。','新高、新低及回檔仍須事前定義，原文沒有給固定勝率。'],
 translation:[
 p('Numerous types of trends can be identified in market price data including trends including increasing and decreasing price trends as well as range-bound or oscillating trends. As a general rule equity instruments tend to trend upwards over time, because of the preference of boards to retain earnings and grow the business rather paying out all the surpluses or profits produced to equity holders.','市場價格資料中可以辨識出多種趨勢，包括價格上升、價格下降，以及受限於區間或來回震盪的趨勢。一般而言，股票類工具隨時間推移傾向呈現上升趨勢，因為董事會較偏好保留盈餘、擴展業務，而不是將產生的全部盈餘或利潤都分配給股東。'),
 p('Businesses that are continuously making losses will deplete their reserves and their instruments will tend to fall in value over the long term. Shorter term trends may indicate a shift in market expectations from one level of earnings to another of from a change in the level of confidence and a trend analysis may seek to identify this trend as something distinct from the overall trend caused by the fundamental performance of the business.','持續虧損的企業會耗盡其儲備，其金融工具的價值長期而言也會傾向下跌。較短期的趨勢，可能反映市場對獲利水準的預期從一個層次轉向另一個層次，或反映信心水準的變化；趨勢分析可能試圖辨識這種趨勢，將其與企業基本面表現所造成的整體趨勢區分開來。'),
 p('There is a vital piece of information that is revealed when confirming support or resistance. It is the notion of a trend. An uptrend is a situation in which we experience rising prices in the form of new highs and shallow pullbacks. Similarly, a downtrend has lower peaks and prices continue to make new lows. If the price oscillates without any clear direction, it is said to be range-bound or in consolidation. Decreasing ranges between highs are lows are considered triangle patterns.','在確認支撐或壓力時，會顯露出一項重要資訊，也就是趨勢的概念。上升趨勢是價格以創新高及淺幅回檔的形式上漲的情況。同樣地，下降趨勢具有較低的峰值，而且價格持續創下新低。如果價格來回震盪，沒有任何明確方向，就稱為受限於區間，或處於整理之中。高點與低點之間的區間逐漸縮小，被視為三角形型態。'),
 p('- uptrend / downtrend / oscillating / triangle examples -','— 上升趨勢／下降趨勢／震盪／三角形的範例 —')],
 notes:['原文重複 including trends including，中文依語意順譯，未刪除分類資訊。','原文 another of from 及 highs are lows 語法有誤；中文依上下文分別譯為「或反映」及「高點與低點」，英文保留原貌。','最後一行是原頁製圖占位文字，不是已提供的歷史圖表。本頁另繪的折線為本站合成資料。','股票長期方向的解釋是原文敘述，沒有附本篇可驗證的實證；譯文不代表編輯已認可其普遍成立。'],
 sections:[{heading:'一、先辨認原文說的是哪種市場',paragraphs:['開頭兩段使用企業、盈餘與股東等詞。它提供股票背景下的概念解釋，沒有在這裡研究微台期貨、BTC 永續或十分鐘策略。讀到「一般而言」「傾向」時，保留其範圍；不能將它改寫為所有資產長期必漲。']},{heading:'二、高低點是描述，規則要另外寫',paragraphs:['以下是本站另設的觀察例：100、106、103、110、107、114。若事前指定這六個已完成轉折，可以描述峰值與谷值逐步提高；但轉折如何確認、要等待幾根棒，仍需另定。圖已展示完整路徑，不能拿它當作當時可知的訊號。']},{heading:'三、逐句保留不確定性',paragraphs:['tend 譯為「傾向」，may 譯為「可能」，不是補上固定百分比。原文沒有提供樣本數、成功事件或觀察期限；沒有這些條件，就無法由幾個英文用語推算微台或 BTC 的交易勝率。']}],
 glossary:[{en:'Equity instruments',zh:'股票類工具',note:'本段以企業盈餘和股東為背景，不泛指所有期貨。'},{en:'Shallow pullback',zh:'淺幅回檔',note:'原文定性用語，本小節沒有指定幅度門檻。'},{en:'Tend / May',zh:'傾向／可能',note:'保留程度，不換成一定或自行添加機率。'}],
 questions:[['原文企業盈餘背景能直接證明什麼？',['微台十分鐘必然上漲','BTC 永續有固定勝率','不能直接證明這兩者的交易優勢'],2,'市場、時間尺度與交易規則不同，原文也未提供相應回測。'],['may 最合適的翻法是？',['可能','一定','至少有六成勝率'],0,'此處 may 沒有指定數值，應保留可能的語氣。'],['最後一行範例文字的性質是？',['已核對的微台歷史圖','原頁製圖占位文字','Brooks 官方圖表'],1,'原文只有占位文字；本站新增圖以合成資料另繪。']]
},{
 id:'licensed-range-consolidation',title:'區間、推動與整理：保留歷史背景的完整節譯',subtitle:'逐段讀懂 Range-bound / Oscillating，不把整理翻成一定續行。',topic:'區間',minutes:10,
 scope:'完整 Range-bound / Oscillating 子小節的三段正文與一行製圖占位文字；不含前面的 Up-Trend 或後面的 Patterns。',
 summary:'本篇完整翻譯 Range-bound / Oscillating。原文先舉 2009–2011 年 Reliance Industries 的歷史描述，再談快速推動與暫停；「看起來」「經常」「被視為」都保留原語氣。新增導讀把「眼前橫向整理」與「日後續行或反轉」分開，並說明原頁未實際附上的圖不可視為已驗證證據。',
 keyPoints:['歷史公司與期間依原文保留，不是今天行情。','impulse 在此譯為推動，不自動套用其他流派的完整模型。','often 沒有固定百分比，cannot continue indefinitely 沒有給反轉時間。','healthy 是作者的評價用語，不是低風險或可獲利認證。'],
 translation:[
 p('The chart below is a plot of the price movement of the Reliance Industries (India) which stayed very much in a range during March 2009 to February 2011. This stock remained in the range of 900 to 1200 during this period.','下方圖表描繪印度 Reliance Industries 的價格走勢；在 2009 年 3 月至 2011 年 2 月期間，價格大致維持在一個區間內。這檔股票在該期間保持於 900 至 1200 的區間。'),
 p('At certain junctures, prices seem to accelerate either up or down and go for long stretches without a pause. This is considered an impulse, and often lead to incredible gains or drops in price. These impulses cannot continue indefinitely, and at some point must pause or reverse direction. During these periods, it lacks clear direction and is considered in a consolidation sequence. Even though it seems that prices should continue forever, these pauses are in fact quite healthy.','在某些時刻，價格似乎會加速上漲或下跌，持續很長一段而沒有停頓。這被視為一段推動，經常帶來驚人的價格漲幅或跌幅。這些推動不可能無限持續，到了某個時點必須暫停或改變方向。在這些時期，價格缺乏明確方向，被視為處於一段整理過程。即使價格看起來好像會永遠延續，這些暫停其實相當健康。'),
 p('They serve a vital role in forecasting price targets once the trend continues or reverses.','一旦趨勢延續或反轉，這些暫停對預測價格目標具有重要作用。'),
 p('- chart delineating impulse vs. consolidation -','— 區分推動與整理的圖表 —')],
 notes:['原文說「下方圖表」，但本次讀取的小節未顯示可核對該歷史走勢的圖；原文價格與期間照譯，本批沒有另外核驗歷史價格或調整方式。','第二段 During these periods 的指涉依上下文理解為推動暫停、缺乏方向的時期，不代表快速推動本身沒有方向。','healthy 譯為「健康」以保留作者評價；這不是統計結論，不能替代成本、失效與風險計算。','原文同時保留 continues or reverses；中文不可省略反轉可能。末行製圖占位也一併保留。'],
 sections:[{heading:'一、先把歷史描述與現在分開',paragraphs:['原文提到印度股票、過去期間及價格區間。這段只照譯作者描述，不將其寫成已重建的行情；價格是否經過拆股等調整，也不是本小節提供的資訊。本站合成圖使用另一組數字，沒有偽裝成該公司歷史圖。']},{heading:'二、暫停不等於方向已決定',paragraphs:['本站另設例子：100、110、103、109、104、111。這段價格在先前上推後交錯，僅提供整理的觀察材料。其後既可能往上延伸，也可能跌破；完整六點折線不含 OHLC 或成交量，不能用來宣稱出現 FVG 或已完成價量確認。']},{heading:'三、沒有方向時，保留兩條後續路徑',paragraphs:['讀完原文後，可以在筆記分別留下「向原方向續行」及「向相反方向離開」兩個候選。等新資料到達再更新，不因作者說暫停健康就預先指定會漲；也不因推動不能永續，就在沒有時間條件時推定立刻反轉。']}],
 glossary:[{en:'Range-bound',zh:'受限於區間',note:'描述價格缺乏明確單一方向。'},{en:'Impulse',zh:'推動',note:'本小節描述一段快速、有方向的價格移動，不是完整波浪或 ICT 模型定義。'},{en:'Consolidation',zh:'整理',note:'原文仍容許後續延續或反轉。'},{en:'Often',zh:'經常',note:'這份原文未指定數值機率。'}],
 questions:[['原文的 900–1200 指什麼？',['今天 BTC 的價位','原文描述的印度股票歷史區間','微台建議停損'],1,'公司、期間與數字按歷史原文保留，不是目前行情。'],['整理後原文保留哪種可能？',['只可能續漲','只可能反轉','延續或反轉'],2,'continues or reverses 必須兩者都翻入。'],['healthy 是否能證明低風險？',['不能，它是作者評價','能，等於固定六成勝率','能，表示不用停損'],0,'此詞未附研究條件，不是風險或期望值證據。']]
},{
 id:'licensed-continuation-reversal',title:'延續與反轉型態：逐句翻譯 suggest 的原意',subtitle:'兩個完整短小節與原有清單；名稱不是已確認的方向。',topic:'基礎',minutes:10,
 scope:'Continuation pattern. 與 Reversal patterns 兩個完整子小節，包括正文、清單與兩個上／下趨勢分組標籤；不含 Patterns 父節正文或 Candlestick Pattern。',
 summary:'完整翻譯開放教材列出的延續及反轉型態，保留兩份清單與原文拼字。最關鍵的字是 suggest：圖形提示某種可能，不能改成確認一定發生。新增導讀與圖解以相同已知起點、不同後續路徑示範這個差別，不替任何名稱指定勝率。',
 keyPoints:['兩個短小節都完整翻入，並保留清單順序。','suggest 譯為暗示，不強化成保證或已證實。','原文 Trenline 疑為 Trendline，英文照錄、中文校對註說明。','雙頂、頭肩等名稱不是當下即可知道的完整交易規則。'],
 translation:[heading('Continuation pattern.','延續型態。'),
 p('There are continuation patterns which suggest that the stock will continue to do what it was doing earlier ie if it was moving up it would continue to move up. Various continuation patterns are','有些延續型態暗示股票會繼續先前的走勢；也就是說，如果原本正在上漲，就會繼續上漲。各種延續型態包括：'),
 {...items(['Flag / pennant','Triangle','Channel','Trenline'],['旗形／三角旗形','三角形','通道','趨勢線']),ordered:true},
 heading('Reversal patterns','反轉型態'),
 p('There are reversal patterns which suggest that the stock will now do the reverse of what it was doing earlier. If the stock price was moving moving up it would now move down.','有些反轉型態暗示股票現在會走出與先前相反的走勢。如果股價原本正在上漲，現在就會轉而下跌。'),
 p('When stock is in up trend:','當股票處於上升趨勢時：'),items(['Double / Multiple top','Head and shoulder'],['雙重頂／多重頂','頭肩形態']),
 p('When stock is in down trend:','當股票處於下降趨勢時：'),items(['Double /Multiple bottom','Inverted head and shoulder'],['雙重底／多重底','倒頭肩形態'])],
 notes:['原文 suggest 控制後面的 would／will 敘述，整段屬型態所暗示的方向，並非作者提供的必然價格預測。','原文 Trenline 疑為 Trendline 的拼字錯誤。英文保留 Trenline，中文按可能原意譯「趨勢線」，此為編輯判讀。','原文 moving moving 重複，中文合併為「正在」。Head and shoulder 依原文字面譯「頭肩形態」；上升趨勢分組暗示常見頭肩頂用法，但不額外假稱原文明寫 top。','原文沒有指定如何確認峰谷、何時成立、進出場或成本，也沒有本專案可使用的量化績效。'],
 sections:[{heading:'一、分類清單與訊號分開讀',paragraphs:['旗形、通道、雙頂與頭肩是原文列出的名稱。它沒有在這兩小節中給出完整幾何條件、觀察尺度或完成時間，因此不能直接把清單當成可重現的策略。不同教材可能把同一形態放在不同情境使用，需回到各自定義。']},{heading:'二、相同起點仍可以有不同結果',paragraphs:['本站另設共同已知起點：100、108、104、109、105。其後甲走到 112、115，乙走到 101、98。前五點相同，右側結果不同；完整圖只示範未來的不確定性，沒有宣稱前五點已構成特定官方型態，也沒有估計兩條路徑的機率。']},{heading:'三、中文翻譯不要偷偷加上確認',paragraphs:['「暗示會延續」與「確認一定延續」的意思不同。先保留原文 suggest 的限制，再另寫自己的觀察、觸發與失效條件。若建立形態研究，還需保存失敗與未決案例，才能回答新資料中條件是否有用；這部分是本站建議，不屬於原文清單。']}],
 glossary:[{en:'Suggest',zh:'暗示',note:'保留方向提示，不等於確定、統計確認或固定勝率。'},{en:'Continuation pattern',zh:'延續型態',note:'指向原有走勢延續的型態分類。'},{en:'Reversal pattern',zh:'反轉型態',note:'指向先前走勢改變的型態分類。'},{en:'Pennant',zh:'三角旗形',note:'保留與 Flag／旗形的名稱差別；原文未在此給量化幾何。'}],
 questions:[['suggest 應如何處理？',['改成確認一定發生','保留為暗示','自行加入七成'],1,'原文的提示語氣不能在翻譯中刪掉。'],['兩條路徑的前五點相同，能判斷哪條必然發生嗎？',['不能','必然是向上','必然是向下'],0,'圖片提供不同後續可能，沒有提供概率或確定方向。'],['Trenline 在本頁如何呈現？',['偷偷改掉英文不說明','翻成另一個指標','英文照錄，中文譯趨勢線並註明判讀'],2,'保留可核對原貌，並把編輯判斷明確標出。']]
}];
for(const d of definitions){
 const a={...d,category:'授權節譯',language:'英文',level:'基礎',batch:5,mode:'licensed-section',revision,
  sourceSummary:'已讀 Wikibooks Technical Analysis／Patterns 的公開文字，頁尾固定版本 4351762。原文屬社群教材概念敘述，未提供微台／BTC 回測。',
  exercise:{title:'先對照原文，再記錄自己的解讀',steps:['開啟「授權節譯對照」，逐段核對英文與繁中。','圈出推測語氣、商品與期間，避免在翻譯中擴大。','把原文內容、編輯校對註與自己的研究條件分三欄記錄。'],review:['完整翻譯的範圍是否明確？','是否把描述翻成保證，或補上原文沒有的勝率？','是否區分原頁占位文字與本站新增圖？']},
  sources:[{title:'Technical Analysis／Patterns — '+d.title,url:sourceRevision,author:'Wikibooks contributors',language:'英文',checked:revision,access:'已讀公開正文，頁尾固定版本為 4351762；固定版本入口保留供核對。',scope:d.scope,license:'CC BY-SA 4.0；本批僅使用文字，未重用來源媒體。'},{title:'Wikibooks:Copyrights — 重用文字的條件',url:'https://en.wikibooks.org/w/index.php?title=Wikibooks:Copyrights&oldid=4622060',author:'Wikibooks contributors',language:'英文',checked:revision,access:'已核對公開政策的署名、改作及相同授權條件。',scope:'僅用於核對文字授權，不視為所有圖片的授權。',license:'政策說明；相關教材文字採 CC BY-SA 4.0。'}],courseRefs:[],
  translationStatus:'已授權完整節譯；僅限本頁明列範圍。',provenance:'依原頁公開文字逐段翻譯，保留段落及清單順序。原文拼字、語氣及資料限制另列校對註；導讀、合成圖、練習與測驗為本站新增。這是 Wikibooks 社群教材，不是 Brooks 官方課程或已驗證交易系統。',
  translationTitle:d.title,translationScope:d.scope,translationNotes:d.notes,
  license:{id:'CC BY-SA 4.0',url:'https://creativecommons.org/licenses/by-sa/4.0/',attribution:'原文：Wikibooks contributors，Technical Analysis／Patterns，固定版本 4351762。繁體中文翻譯、導讀、合成圖與練習：Price Action Atlas，AI 協助，2026-10-28。本篇譯文及新增內容依 CC BY-SA 4.0 提供。',scope:d.scope+' 本篇新增說明、練習與圖解亦依相同授權。',changes:'新增繁體中文翻譯、校對說明、合成圖與練習；保留英文對照，未使用來源圖片。',sourceRevision,history:'https://en.wikibooks.org/w/index.php?title=Technical_Analysis/Patterns&action=history'},
  caseQuiz:d.questions.map(([question,choices,answerIndex,explanation])=>({question,choices,answerIndex,explanation}))};
 delete a.notes;delete a.questions;delete a.scope;
 fs.writeFileSync(path.join(out,a.id+'.json'),JSON.stringify(a,null,2)+'\n');
}
module.exports=definitions.map(a=>a.id);
if(require.main===module)console.log(JSON.stringify({licensedUnits:definitions.length,englishParagraphs:definitions.reduce((n,a)=>n+a.translation.filter(t=>t.kind==='paragraph').length,0),listItems:definitions.reduce((n,a)=>n+a.translation.filter(t=>t.kind==='list').reduce((s,t)=>s+t.en.length,0),0)}));
