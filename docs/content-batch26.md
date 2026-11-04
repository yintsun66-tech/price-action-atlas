# 第二十六批 · v1.1.0 · 2026-11-04

同日 v1.1.1 校正 TradingView 摘要的條件語氣：「歷史資料粒度及重算可能改變畫面」。原文並未聲稱每次必然改變；圖解、選讀範圍與完成數沿用 v1.1.0。

本批聚焦足跡圖的資料口徑與配對。同步 GitHub main 並去重後，選讀兩篇官方文件與一串公開討論；只將實際指定範圍列為部分摘要，沒有增加正文摘要或全文完成數。

## 來源與閱讀界線

- Sierra Chart Numbers Bars：https://www.sierrachart.com/index.php?l=doc/NumbersBars.php 。實讀定義中的對角比較、最低比較量、邊界缺值與零分母設定。文件很長，未讀完全部內容或實際操作軟體。五詞短句針對兩量「都」小於門檻的條件；不是任一側低就略過。此網址已在清單中，保留原來源 ID，避免把 page／l 參數別名新增為另一頁。
- TradingView Volume footprint charts: a complete guide：https://www.tradingview.com/support/solutions/43000726164-volume-footprint-charts-a-complete-guide/ 。實讀 Calculation 的資料來源、分類、失衡，以及警報重繪注意事項。其他設定與案例未逐項驗證，也未觀看嵌入影片。八詞短句說明棒內價格方向分類。跨平台口徑不能只靠相似畫面視為一致。
- Reddit Order Types in Footprint：https://www.reddit.com/r/FuturesTrading/comments/1ac86vv/order_types_in_footprint/ 。實讀主帖與 Leo_The_Tiger_NQ、giantstove、gtani 的可見回覆，保留不同意見；未取得或核對所有巢狀回覆與帳戶績效。八詞短句出自 Leo 對成交意圖推論的提醒。主帖的停利／停損歸類不是本站採用的規則表。

兩份官方文件的發布／修訂確日未核對。Reddit 只見 3y ago，不換算成已核對確日。來源卡保留英文原題、必要短句與原文連結，沒有重刊全文、原圖或完整規則清單。官方規格、化名經驗與獲利證據分開，沒有可比評分就不補造星等。沒有新增 Brooks 課程引用。

## 原創算例與圖解

既有 flow-footprint 單元尾端新增一節四段、一項練習與一項檢核。合成價位表為：101 的 Bid／Ask 量 2／3；100 為 1／30；99 為 10／8。

- 100 同列：30÷1＝30 倍。
- 100 對角：Ask 100 的 30 除以 Bid 99 的 10＝3 倍。
- 101 對角：3÷1＝3 倍。若本例自訂最低比較量為五，兩量都不足，則略過。9／1 不符合「兩量都不足」條件。

門檻與價位是教學假設，不是已驗證最佳參數。新圖 flow-diagonal-comparison.svg 為本站原創，示範比較範圍與小量條件，沒有冒充平台畫面、來源原圖、行情或績效。新增研究欄位把資料分類、粒度、列寬、設定、事件快照與未知動機分開。

## 保留與數量

62 個閱讀 ID 保持。其他 61 個文章檔、資源庫與影音檔位元組相同；原有 32 張來源卡及 68 筆圖解物件完整保留。足跡圖原七節、原題目與練習前綴保留，第一筆來源的舊查核範圍保存在 contentRevisions。筆記鍵與使用者資料不改寫。

新增三張來源卡至 35，圖解共 69 張。英文網址由 2368 變 2370：正文摘要仍 41、部分摘要 24、介紹 19、授權來源 2、未取得 4、待讀 2280。全文判定仍為一章正文完成、一來源選段、六個雙語單元；未核定來源增加為 2368。

## 採用與略過

本批採用上述三筆。Brooks Handling a losing trade 的公開頁已取得，但本批聚焦足跡口徑，沒有整理採用摘要，不標正文完成。PTT 原帖查詢未確認可核對的對應原帖，不把查詢未取得說成沒有新文。未使用未核對授權的商業 PDF，也沒有執行交易或新建排程。完整決定在 reading/content-updates.json。

## 重建、驗證與發布

release.json 的 contentBuild 改為 build-content-batch26.cjs。重建後執行翻譯清單、中文呈現及版本標示，保持舊來源查核日期。新作者檔為 batch26-sources.json、flow-diagonal-comparison.svg，實讀紀錄 zh-core-source-reviews-19.json。

八組資料與保留檢查、七十三項隔離閱讀器回歸及網站版本／來源／資產檢查通過；全部 204 個發布檔可重現。SVG XML 解析通過。瀏覽器實際打開足跡圖單元、三篇選讀篩選及 TradingView 英文／限制展開；新圖截圖已檢視，文字與箭頭沒有裁切。個人筆記未寫入。證據在 workspace artifacts/content_batch26_2026-11-04/；發布成功與線上比對另記，不用本機檢查冒充已上線。
