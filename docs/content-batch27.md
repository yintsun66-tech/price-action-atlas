# 第二十七批 · v1.2.0 · 2026-11-05

本批連接威科夫的相對表現與報酬算術。同步 GitHub main、比對既有網址後，實讀兩篇 StockCharts 公開教學文字，並另讀 TradingView RSI 的定義與計算指定段落。閱讀完成只表示讀取範圍，未增加全文翻譯完成數。

## 來源與界線

- StockCharts ChartSchool，Wyckoff Stock Analysis：https://chartschool.stockcharts.com/table-of-contents/market-analysis/wyckoff-analysis-articles/wyckoff-stock-analysis 。實讀完整公開教學文字、案例敘述、風險與結語；未逐圖核對行情、操作平台或讀取外鏈書籍。保留六詞短句對方法「概括指引」的限定。XLF 例前段 strength 與後文 weakness 不一致，不採其圖例作核驗案例。既有來源 ID 保持，原查核範圍保存在文章修訂紀錄。
- StockCharts ChartSchool，Price Relative/Relative Strength：https://chartschool.stockcharts.com/table-of-contents/technical-indicators-and-overlays/technical-indicators/price-relative-relative-strength 。實讀完整公開教學文字，未核驗原圖、外鏈試算表或書籍。十詞短句保留原文 equal，並另標本站精確算術的定義。原頁的 daily changes 不因本站定義而被靜默改寫。
- TradingView，Relative Strength Index (RSI)：https://www.tradingview.com/support/solutions/43000502338-relative-strength-index-rsi/ 。僅整理 Definition 與 Calculation；未驗證完整案例、執行程式或觀看影片。三詞短句與摘要說明同一序列的平均上漲／下跌，不能與兩標的價格比率混為一談。

三頁均未確認發布或修訂確日，查核日為 2026-11-05。StockCharts 頁面未列個人署名，使用發布者署名；商業平台教材與獲利證據分開，未取得獨立評分就不造星等。正文摘要不包含平台導覽與附加說明；未重刊原文圖表。沒有新增 Brooks 課程引用。

## 原創算例與圖解

wyckoff-cycle 原五節保留，尾端加兩節、一道練習、一項檢核與兩個術語。三個共同時點的合成價格為 A：100、99、98；基準：100、97、95。

- A 絕對報酬 −2%，基準 −5%；報酬差 +3 個百分點。
- 價格比率的百分比變動為 (98÷95)÷(100÷100)−1，約 +3.16%。
- 本站明確定義的比率百分比變動為 (1+rA)÷(1+rB)−1，通常不精確等於 rA−rB。原文的簡略措辭與本站算術校註分列，不把校註冒充原作者原話。

兩條序列都下跌，相對較強不表示持有獲利。新圖 wyckoff-relative-performance.svg 是原創合成教學圖，不是來源股票案例、真實行情或策略績效。三個點未指定 RSI 期間、平滑與完整歷史，不捏造 RSI 數值。

## 數量與相容性

62 個閱讀 ID、筆記鍵與備份格式保留。其餘 61 個文章檔、資源庫與影音未變；35 張舊來源卡、69 筆舊圖解物件及 2369 筆其他既有英文來源紀錄完整保留。新增兩張來源卡至 37，新圖共 70 張。原查核日不以今日批次覆寫。

英文來源 2372：正文摘要 43、指定範圍摘要 25、介紹 19、授權來源 2、未取得 4、待讀 2279。全文判定仍為一章正文完成、一來源選段、六個雙語單元；未核定來源為 2370。新增來源不等於新增完整譯文。

## 未採材料

Reddit 的 13,000 次威科夫訊號自述只讀主帖與可見問答，未展開全部回覆，也沒有足以重現其宣稱績效的已讀規格；不採勝率或把未讀部分說成沒有資料。TradingView Relative Strength Comparison 的保護腳本說明已讀，但閉源且本批內容重複，不新增。Ruben Villahermosa 的 effort/result 公開文與既有主題重疊，不湊數。PTT 查詢未取得可核對的相符原帖；Brooks 查詢主要返回其他 strength 語境。完整採用／略過範圍在 reading/content-updates.json，不把查詢未取得說成沒有新文。

## 重建與驗證

release.json 指定 build-content-batch27.cjs，再執行翻譯清單、中文呈現與版本標示。作者檔為 batch27-sources.json、batch27-support.json、wyckoff-relative-performance.svg，實讀紀錄 zh-core-source-reviews-20.json。

九組資料與保留檢查、七十三項隔離閱讀器回歸、三項版本測試及網站資料／資產檢查通過；205 個發布檔可重現，SVG XML 解析通過。個人筆記未寫入。瀏覽器檢視連線不可用，桌面應用檢視請求逾時，未完成本批瀏覽器像素及實際互動驗收，也未用舊截圖冒充證據。已完成的自動閱讀器與 HTTP 檢查不能取代這項畫面限制。

檢查及發布結果保存在 workspace artifacts/content_batch27_2026-11-05/。發布狀態以 GitHub Actions、同版本 Release 及線上逐檔比對為準，不把本機完成說成已上線。未新建排程或執行交易。
