/* Contextual annotations, checked against public English originals on 2026-10-28.
   This registry is educational metadata, never a market probability estimator. */
(() => {
  'use strict';
  const base='https://www.brookstradingcourse.com/';
  const course=(unit,slug,topic)=>({version:'Main · 共用 Price Action Fundamentals',unit,topic,url:base+'price-action-fundamentals/video-'+unit.toLowerCase()+'-'+slug+'/',relation:'相關主題補讀'});
  const courses={
    equation:course('30A','traders-equation-probability','交易者方程式與機率'),
    band:course('30E','traders-equation-probability','交易者方程式與機率：40–60 準則'),
    mtr:course('22A','major-trend-reversals','主要趨勢反轉'),
    flag:course('23A','final-flags','最後旗形'),
    breakout:course('15A','breakouts','突破'),
    follow:course('15B','breakouts','突破與後續跟進'),
    range:course('18A','trading-ranges','交易區間'),
    channel:course('16D','channels','通道：緊通道與寬通道'),
    count:course('09A','pullbacks-bar-counting','回檔與棒數計數'),
    stop:course('33A','protective-stops','保護停損')
  };
  const sources={
    statistics:{title:'Ask Al: Trading statistics & probabilities',url:base+'ask-al/trading-statistics-probabilities/',author:'Al Brooks',published:'2016-04-10；問答日期 2015-03-18',locator:'How do we determine probabilities',access:'已核對官方公開英文逐字稿；未宣稱觀看付費課。'},
    glossary:{title:'Glossary of terms for price action trading',url:base+'price-action-trading-terms-glossary/',author:'Al Brooks／Brooks Trading Course',published:'頁面未採用可確認的修訂日期',locator:'likely / probably / usually / unlikely',access:'本次由官方頁的公開搜尋索引文字核對詞條；直接讀取頁面受限。'},
    patterns:{title:'10 best price action trading patterns',url:base+'price-action/10-best-price-action-trading-patterns/',author:'Al Brooks',published:'2020-08-18',locator:'各卡標示的小節',access:'已核對官方公開英文文章；不是付費課逐字稿或書籍逐頁核對。'},
    ranges:{title:'Trading ranges – areas of confusion',url:base+'how-to-trade-manual/trading-ranges/',author:'Al Brooks',published:'2020-10-25',locator:'Most breakout attempts fail',access:'已核對官方公開英文文章。'},
    orders:{title:'Ask Al: Structuring limit and stop order trades',url:base+'ask-al/structuring-limit-stop-order-trades/',author:'Al Brooks',published:'2017-01-08；問答日期 2016-01-27',locator:'General rule for probability / Structure and manage your trade',access:'已核對官方公開英文逐字稿；文中的原圖語境不能移作本站合成圖的機率。'}
  };
  const brooks=(id,title,estimate,context,event,horizon,meaning,caution,source,locator,refs,extra={})=>({id,kind:'brooks',title,estimate,context,event,horizon,meaning,caution,source,locator,refs,...extra});
  const custom=(id,title,estimate,context,event,horizon,meaning,caution,article)=>({id,kind:'example',title,estimate,context,event,horizon,meaning,caution,article,refs:[]});
  const entries=[
    brooks('language','Brooks 的機率用語約定','至少 60%／至多 40%','限 Brooks 詞彙表明確列出的詞義。','likely、probably、usually：至少六成把握；unlikely：至多四成把握。','詞條本身沒有指定 K 棒數或交易目標。','這是作者的用語約定，並非新做的頻率測量。','先辨認詞語修飾哪個事件。「通常只有 40%」中的通常，不把 40% 改成至少 60%；其他作者的「通常」也不套用這份約定。','glossary','likely / probably / usually / unlikely',[courses.equation],{quote:'At least 60 percent certain. / At most 40 percent certain.',quoteZh:'至少六成把握／至多四成把握。'}),
    brooks('qualitative','沒有明確數字，就保留定性','未指定數值','原段只寫 often、sometimes，或未明定事件的 high probability。','仍需從該句上下文確認是續行、回測、形成波段，或交易獲利。','原文未提供，就標為未指定。','本輪核對來源沒有為 often、sometimes 設定通用百分比。','不把「有時」猜成 20%，也不把「較可靠」自動補成 60% 或 70%。這是本站編輯規則；遇到另一段有明確數值時，另附那一段的條件。','glossary','詞條範圍核對；缺少固定對應時不擅補',[courses.equation]),
    brooks('mtr40','新趨勢尚未明朗的早期反轉','通常僅 40%','在新趨勢明確之前，嘗試主要趨勢反轉的早期進場。','形成所期待的主要反轉／新趨勢。','此段未列固定觀察棒數、完整出場演算法。','作者指出：早進、緊停損通常伴隨低機率，即使型態外觀漂亮。','不是任意反轉棒、第二次進場或本站圖例都擁有 40% 勝率；不能自行補上「六根內先到 2R」。','patterns','Major trend reversals',[courses.mtr]),
    brooks('flag40','最後旗形：形成波段與小贏小輸','通常約 40%','最後旗形反轉，並採作者該段的波段成功標準。','達成波段；原文一般目標為至少十根、兩腿，報酬至少為風險兩倍。','至少十根、兩腿是一般波段目標，並非保證在第十根前完成。','其餘 60% 包含小贏與小輸，作者說通常互相抵銷。','不能把其餘 60% 改寫成全部停損，也不能把「十根兩腿」換成本站六根持有規則。','patterns','Final flags',[courses.flag,courses.equation]),
    brooks('confirmed60','等反轉方向出現強勢突破','往往 60% 或更高','反轉之後，等待新方向的強勢突破才進場。','形成可交易波段。','該段未列精確持有期限。','作者同時指出：此時停損較遠，風險報酬的交換條件改變。','保留「往往」與新方向突破的條件；不是保證、不適用所有收過前高的棒，也不表示能沿用早進場的緊停損。','patterns','Final flags',[courses.flag,courses.breakout]),
    brooks('range80','仍在交易區間內的突破嘗試','80% 失敗','事前辨認為交易區間，討論其上、下緣的突破嘗試。','向上或向下的突破嘗試失敗，回到區間行為。','公開段落未指定一律幾根內失敗。','這是市場慣性背景下的作者準則。','突破失敗不等於你的反向單先到目標；強勢有效突破出現後，需重判背景。不得拿 100% 減此數當成 PA_BREAKOUT_V1 的勝率。','ranges','Most breakout attempts fail',[courses.range,courses.breakout]),
    brooks('channel70','通道下緣突破後反轉的例子','約 70%（指引）','作者討論通道／楔形下破，尤其平行邊界、超賣的空頭通道案例。','下破失敗，反轉回通道上側。','文中通常一至五根開始反轉；所舉案例約十根才反轉。','作者明說此 70% 沒有經他測試，是個人指引。','一至五根不是到達上緣的保證期限。保留原文例外；不是所有通道或微台／BTC 的實測值。','statistics','How do we determine probabilities',[courses.channel],{quote:'Have I tested it? No. It’s just my guideline.',quoteZh:'我測試過它嗎？沒有。它只是我的指引。'}),
    brooks('follow80','強勢突破之後仍有跟進','可能約 80%','作者在機率問答中，以真正強勢突破對比一般模糊情況。','突破後出現 follow-through（同方向後續跟進）。','該句未指定固定棒數與目標距離。','原文把這個數字表達為近似估計。','跟進不等於扣成本獲利、先到 2R、形成全天單邊或一定達成量度目標；不能與區間突破失敗的 80% 混用。','statistics','How do we determine probabilities',[courses.follow]),
    brooks('channel75','多頭通道跌破趨勢線','75%','原文討論多頭通道／楔形與下側多頭趨勢線。','跌破多頭趨勢線。','該段未給統一計時期限。','事件是向下破線，不等同完整空頭趨勢。','不可改標「立刻放空有 75% 勝率」，也不與另一段通道反轉約 70% 取平均。兩者條件與事件不同。','patterns','Wedges: three pushes up or down',[courses.channel]),
    brooks('h2-quality','H2／L2：較高機率仍需背景','定性，未列百分比','順勢旗形中，逆勢嘗試兩次失敗，原趨勢有恢復理由。','原趨勢的延續。','該段只說往往快速移動，未給統一期限。','原文稱此為高機率延續型態，該段沒有給固定數字。','H2 名稱、第二根陽線或第二次觸發，都不能單獨換算成 60% 勝率。','patterns','High 2 bull flags and Low 2 bear flags',[courses.count]),
    brooks('band40-60','40–60 準則與「九成的棒」','40–60%；約 90% 的棒','一般通道或區間，與少數清楚的強勢突破相對。','40–60% 談多空交易假說；90% 談棒的情境占比，分母不同。','問答描述未來幾根；沒有一套可直接複製的固定停損停利。','原文另有「正確建構與管理下可能有九成獲利機會」的說法，條件不可刪。','不能把九成棒的占比或有條件的管理說法，標成本站任一訊號有 90% 勝率；也不表示小停損、遠目標能同時取得原文機率。','orders','General rule for probability / Structure and manage your trade',[courses.band,courses.stop]),
    custom('example-scalp80','十六贏、四輸的自編清單','80%（假設計數）','二十筆虛構練習，十六筆各賺 1 單位、四筆各虧 5。','此清單獲利筆數占比 16／20。','僅限指定二十筆，沒有市場期間。','毛損益 16−20＝−4；高勝率仍可虧損。','本站算例，不是 Brooks 型態統計，也不是任何策略的績效。','brooks-scalp-math'),
    custom('example-bayes','先辨認條件機率的分母','56.25% 與 60%（假設）','虛構百例：續行 30 例；其中 18 有 E；未續行中 14 也有 E。','P（續行｜E）＝18／32；P（E｜續行）＝18／30。','僅此分類表；原例未設定真實交易出場與市場期間。','56.25% 與 60% 的條件方向不同，不能互換。','E 不等於本站的強棒標籤；不是 Brooks 給的數字，也不是微台或 BTC 勝率。','pa3-bayes-evidence'),
    custom('example-wilson','樣本勝率與 Wilson 區間','70%；95% 方法涵蓋率','虛構 14／20、140／200；使用獨立同分布二元試驗近似。','計數勝率皆 70%；95% 是區間方法的長期涵蓋率。','各自二十筆、二百筆假設樣本，非市場期間。','區間分別約 48.1–85.5%、63.3–75.9%。','不能說未來有 95% 機率落入此區間；不是未來最低勝率、收益保證或 Brooks 的經驗機率。','pa3-winrate-uncertainty'),
    custom('example-agreement','兩位標記者的一致率','80%（一致率）','虛構二十張圖，十六張同標。','標記相同的圖占比 16／20。','這二十張圖，不是二十筆交易。','原始一致率未作機會校正。','不等於正確率、交易勝率或圖形預測機率；全部標不確定也能一致。','pa3-label-consistency'),
    custom('example-multiple','多次檢定的誤報算例','約 64.2%（假設）','二十個獨立、無真實效果的檢定，各用 5% 誤報率。','至少一個誤報：1−0.95²⁰。','一次進行這二十個假設檢定。','64.2% 依賴獨立及其他假設。','不是某策略的失敗率，也不是論文 PBO 的估計；本數字為本站自編算式。','pa3-research-register'),
    custom('example-shape','實體比例是外觀測量','81.8%／9.1%（棒形）','虛構 OHLC：100／110／99／109。','實體 9／振幅 11；收盤距最高 1／振幅 11。','僅這一根已完成示例棒。','表示棒形比例，不是在估計將來發生事件的機率。','不能把 81.8% 的實體誤稱 81.8% 勝率；研究門檻仍須另行驗證。','pp2-signal-gap'),
    custom('example-budget','風險百分比是預算限制','0.25%（預設）','自訂每筆計畫風險占帳戶權益的上限。','允許承擔的計畫損失金額占比。','該筆交易的計畫風險，不是未來成功事件。','這是本專案風控假設，並不估計圖形機率。','不是 Brooks 官方風險比例，也不代表最大實際損失一定受限於此值。','practice-risk-in-r')
  ];
  // Each binding identifies the existing passage; it adds no probability to synthetic bars.
  const bindings={
    'brooks-context-first':[{ref:'language',section:2},{ref:'band40-60',section:0}],
    'brooks-candle-evidence':[{ref:'follow80',section:0},{ref:'qualitative',section:3}],
    'brooks-breakout-test':[{ref:'range80',section:0},{ref:'follow80',section:2}],
    'brooks-pullback-language':[{ref:'h2-quality',section:1}],
    'brooks-order-intent':[{ref:'band40-60',section:0}],
    'brooks-scalp-math':[{ref:'example-scalp80',section:1},{ref:'band40-60',section:4}],
    'brooks-psychology-audit':[{ref:'qualitative',section:0}],
    'bp2-breakout-followthrough':[{ref:'follow80',section:0},{ref:'range80',section:4}],
    'bp2-trend-channel':[{ref:'channel75',section:0},{ref:'channel70',section:4}],
    'bp2-range-location':[{ref:'range80',section:0}],
    'bp2-failed-breakout':[{ref:'range80',section:0},{ref:'channel70',section:4}],
    'bp2-second-entry':[{ref:'h2-quality',section:3}],
    'bp2-reversal-evidence':[{ref:'mtr40',section:0},{ref:'confirmed60',section:4},{ref:'flag40',section:5}],
    'pa3-label-consistency':[{ref:'example-agreement',section:3}],
    'pa3-bayes-evidence':[{ref:'example-bayes',section:1}],
    'pa3-winrate-uncertainty':[{ref:'example-wilson',section:0}],
    'pa3-research-register':[{ref:'example-multiple',section:1}],
    'pp2-signal-gap':[{ref:'example-shape',section:0}],
    'practice-risk-in-r':[{ref:'example-budget',section:1}],
    'practice-context-hypothesis':[{ref:'qualitative',section:1}],
    'practice-tick-time-transfer':[{ref:'qualitative',section:0}],
    'louie-context-pairs':[{ref:'qualitative',section:0}],
    'louie-chart-notes':[{ref:'qualitative',section:0}],
    'louie-wait-cancel':[{ref:'qualitative',section:0}]
  };
  entries.find(e=>e.id==='qualitative').kind='editorial';
  globalThis.AtlasProbabilityData={titles:{"pa3-bayes-evidence":"一根強棒如何改變看法：先看基礎機率，再更新證據","pa3-winrate-uncertainty":"十四勝六敗代表什麼：勝率、樣本數與不確定性","pa3-research-register":"留下失敗版本：避免把回測挑冠軍當成發現優勢","pa3-stop-execution":"停損觸發之後：價格保護與未成交風險如何取捨","pa3-session-contract":"十分鐘不是同一張圖：切棒、日盤與契約月份","pa3-podcast-to-hypothesis":"把名師訪談變成研究筆記：故事、方法與證據分開","pa3-label-consistency":"第二次進場標記不一致：先修定義，再談自動化","pa3-anti-playbook":"從虧損案例建立拒絕清單：不要把篩選變成挑結果","bp2-breakout-followthrough":"突破後的兩根棒：確認延續，還是看見拒絕？","bp2-trend-channel":"同樣創新高：緊通道與寬通道為何要分開讀？","bp2-range-location":"區間的邊緣與中段：相同訊號，空間完全不同","bp2-failed-breakout":"突破失敗的三個層次：退回、反向推進、再突破","bp2-second-entry":"第二次進場怎麼數：訊號棒、觸發棒與背景分開","bp2-reversal-evidence":"獲利了結還是趨勢反轉：看價格證據，不猜下單者","pp2-structural-stop":"停損位置先由結構決定，再檢查一口是否負擔得起","pp2-target-trailing":"固定目標與追蹤停損：同一個好進場，會長成不同策略","pp2-closed-higher-frame":"較高週期看背景，十分鐘看觸發：先解決兩個時鐘","pp2-signal-gap":"強勢訊號棒不等於好成交：把跳空後的計畫重算","pp2-time-exit":"突破後遲遲不走：新資訊、時間退出與認錯","pp2-intrabar-path":"同一根棒碰到停利又碰到停損：OHLC 沒說的事","licensed-support-resistance":"支撐與壓力：保留「被認為」的完整小節翻譯","brooks-context-first":"先讀背景，再讀訊號：建立你的盤面地圖","louie-chart-notes":"看圖筆記：把已知事實與交易推論分開","practice-risk-in-r":"先把風險變成同一把尺：R 與部位大小","brooks-candle-evidence":"K 棒是證據：避免只看顏色與形態名字","brooks-breakout-test":"突破之後怎麼讀：先區分事件與假說","brooks-pullback-language":"回檔、反轉與第二次嘗試：先統一用語","brooks-order-intent":"訊號不等於成交：把進場意圖寫完整","brooks-scalp-math":"小賺多次就夠嗎：把成本與大虧放進算式","brooks-workspace-routine":"建立簡潔看盤工作區：讓資料與流程先到位","brooks-psychology-audit":"把交易心理寫成行為紀錄：從壓力回到可核對流程","louie-context-pairs":"同形異境：相似 K 棒為何要分開比較","louie-wait-cancel":"等待與取消：把交易想法寫成有期限的計畫","louie-replay-audit":"遮住未來複盤：把好決策與好結果分開","practice-discretion-audit":"直覺怎麼接受檢查：把人為判斷留下證據","practice-pattern-laboratory":"從看見圖形到提出假說：建立自己的型態實驗簿","practice-journal-before-after":"一張圖要留兩次：盤中預期與盤後結果分開寫","practice-tick-time-transfer":"ES 的 tick 圖，為什麼不能直接搬成微台十分鐘規則","practice-replay-evidence":"看盤中影片時，先檢查你究竟看見了什麼","practice-context-hypothesis":"先讀背景，再讀訊號：不要讓一根強棒決定整天","practice-plan-not-stop-only":"交易計畫不只是一個停損價：把取消條件寫完","licensed-price-forecasting":"價格預測的分類：一個開放教材小節的完整對照"},version:1,checked:'2026-10-28',sources,courses,entries,bindings,
    provenance:'Brooks 在公開問答說明：資料有多種來源，部分是主觀指引；圖形定義也涉及判斷。本頁僅核對列出的公開英文來源，未逐頁核對書籍、未觀看或重建付費課。',
    warning:'以下 Brooks 數字保留原作者情境與近似語氣，沒有本站實測樣本數、信賴區間或微台／BTC 校準。本站十分鐘 K 線圖例與六根、2R 規則均不得直接繼承這些數字。'};
})();
