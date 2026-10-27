# 機率情境校註 · 2026-10-28

本輪新增 18 項機率／數值註記：10 項 Brooks 公開原典與用語情境、1 項本站編輯準則、7 項本站自編算例。24 篇既有文章的指定段落加入連結；全部 42 篇皆提供「機率註記」分頁，無可確認數值者維持定性。原文章 JSON、48 項任務、2,110 筆資源索引及筆記格式不變。

## 證據界線

- 原典機率保留原文限定詞，分開記錄條件、估計事件、時間／目標、原意與本站提醒。
- 不能把突破失敗、後續跟進、形成波段、破趨勢線與交易扣成本獲利視為同一事件。
- Brooks 在公開問答明確說通道約 70% 是未經他測試的個人指引。本輪沒有用此數字估計微台、BTC 或站內合成圖。
- 「十根兩腿」不是十根期限；通道一至五根開始反轉也不是已到通道另一側的期限。
- 詞彙表的 likely / probably / usually 是至少六成把握，unlikely 是至多四成；必須辨認被修飾的命題。「通常只有 40%」不改為至少六成。often / sometimes 未擅自對應固定數字。
- H2／L2 在核對段落只有高機率的定性描述，不補成固定六成。
- 本站 56.25%、Wilson 區間、標記一致率、誤報算式、棒形及預算百分比分類為自編示例。沒有新增市場實績。

## 已核對英文來源

1. Al Brooks, [Ask Al: Trading statistics & probabilities](https://www.brookstradingcourse.com/ask-al/trading-statistics-probabilities/)（2016-04-10；問答 2015-03-18）。已讀公開逐字稿的 How do we determine probabilities 小節，未宣稱付費影片觀看。
2. Al Brooks, [10 best price action trading patterns](https://www.brookstradingcourse.com/price-action/10-best-price-action-trading-patterns/)（2020-08-18）。核對 Major trend reversals、Final flags、High 2 bull flags and Low 2 bear flags、Wedges 小節。僅短摘要及少量必要釋義，未重刊全文或原圖。
3. Al Brooks, [Trading ranges – areas of confusion](https://www.brookstradingcourse.com/how-to-trade-manual/trading-ranges/)（2020-10-25）。Most breakout attempts fail。
4. Al Brooks, [Ask Al: Structuring limit and stop order trades](https://www.brookstradingcourse.com/ask-al/structuring-limit-stop-order-trades/)（2017-01-08；問答 2016-01-27）。General rule for probability 與 Structure and manage your trade。九成棒占比與有條件管理獲利的九成說法不得混淆。
5. [官方英文詞彙表](https://www.brookstradingcourse.com/price-action-trading-terms-glossary/)。本次直接頁面讀取受限，由官方頁公開搜尋索引文字核對四個詞條；此取得限制已顯示於註記，未宣稱完整新修訂核對。

官方論壇讀者回覆只協助找出爭議，不作 Brooks 本人機率的權威證據。未核對原著頁碼，沒有提供虛構書籍頁次、課程時間戳或付費觀看聲明。

## 課程補讀

[官方 Main 課綱](https://www.brookstradingcourse.com/trade-price-action/)與[網站地圖](https://www.brookstradingcourse.com/website-sitemap/)核對單元編號及網址。30A／30E 的會員頁亦可核對標題。相關基礎單元為 Main 與 Forex 共用部分；不把後段 Forex 單元混入。

新列 Main 30A〈交易者方程式與機率〉、30E〈40–60 準則相關主題〉、23A〈最後旗形〉；另沿用已核對的 22A、15A、15B、18A、16D、09A、33A。全部標為「相關主題補讀」，確定的數字出處是上列公開文章／問答，並非未觀看的會員影片。

## 實作與維護

- `dist/reading/probabilities.js`：具名註記、來源、補讀與明確的文章段落綁定；不進行關鍵字自動配機率。
- `dist/reader-probabilities.js`：全站可搜尋機率卡、文旁短註、文章分頁；沒有行情或下單介面。
- `dist/probabilities.css`：大字、粗黑重點、原生 details，單欄手機排版。
- `dist/reader.js`：將已指定的註記插在對應段落；未載入註記時提示重新整理，不推定數值。
- 期望值滑桿額外明示 45% 是使用者假設，不是 Brooks 機率；損益兩平字體放大。
- 原筆記 key 與內容不寫入註記元資料；註記不能觸發每日決策台或驗證通過。

檢查包含原有 37 項閱讀庫回歸及 12 項情境、來源、篩選、段落跳轉、缺值與資料保留驗證。以 `node tools/check_probability_annotations.cjs` 從工作區根目錄執行；這是非瀏覽器檢查，發布後另做實際網頁檢視。沒有啟用資料庫、付費擴容或外部追蹤。
