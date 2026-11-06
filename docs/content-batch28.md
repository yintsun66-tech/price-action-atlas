# 第二十八批 · v1.3.0 · 2026-11-06

本批聚焦限價成交假設對價格行為研究的影響。同步 GitHub main 後去重，選讀兩個平台的公開原始材料。新收錄不等於新發布，也不等於全文翻譯完成。

## 來源與範圍

- NinjaTrader，IsFillLimitOnTouch：https://static.ninjatrader.com/support/helpGuides/nt8/isfilllimitontouch.htm 。實讀整頁定義、預設、警語、語法與程式範例，未執行或操作軟體。只用四詞短句與精簡摘要；預設 false、價格穿越，以及 true、到達價格，均限定在回測語境。未重刊範例程式。
- John - SC Support，Post From: Estimated position in queue is 1 in Replay：https://www.sierrachart.com/SupportBoard.php?PostID=377537 。實讀單則完整客服答覆，未讀完整討論串。原頁顯示 2024-03-29 13:28:12，時區未標。十六詞短句對回放成交的說明，不是對所有現行版本的實測，也不把 estimated 解成真實交易所順位。頁面致謝數 0 僅記查核快照，不作評分。
- Sierra Chart，Trade Simulation：https://www.sierrachart.com/index.php?page=doc/TradeSimulation.php 。實讀回放 Bid／Ask 資料來源、成交紀錄與 Limit Orders 相關段落，未逐項核對全部文件或操作軟體。七詞短句的 non-replaying 限定特指佇列追蹤選項；限價模擬使用買賣價，不能直接說最新成交價一碰就會成交。

兩份動態文件未核對發布或修訂確日。三筆查核日為 2026-11-06；原題、英文短句與連結保留。只有 NinjaTrader 整頁文字列正文摘要，另兩筆為指定範圍摘要。未取得完整翻譯授權，未重刊長段、原圖或整串留言。商業平台說明與獲利證據分開，未補造星等。沒有新 Brooks 引用或付費課觀看聲明。

## 原創圖解與練習

pa3-stop-execution 保留原五節、來源、跳空圖例與測驗，尾端加兩節、兩項練習、一項檢核及兩個術語。新增圖 limit-touch-models.svg，並連回來源選讀。

例題假設買限價 100、數量一、跳動一、委託在事件前有效；甲路徑為 102→100→102，乙為 102→99→102。觸價模型兩者填單，穿越一跳模型只填乙。符合條件後整筆以 100 成交也是例題假設，並非資料已證實。兩套模型均不能證明真實成交，不重建平台完整算法，也未提供策略績效。

畫面檢查發現通用詞表把 Last 顯示成「最後」。本批新教材改用「最新成交價」，並使用「估計佇列位置追蹤」的中文名稱，保留來源的英文題名與必要術語。沒有把修正擴散到不相關語境，也沒有改變既有研究或實盤引擎。

## 數量與保留

62 個閱讀 ID 保持；其餘 61 篇、所有資源與影音檔位元組不變。37 張舊來源卡、70 筆舊圖解及 2372 筆既有英文來源物件與查核日保留。新來源卡共 39，圖解共 71。

英文網址 2375：正文摘要 44、指定範圍摘要 27、介紹 19、授權來源 2、未取得 4、待讀 2279。全文仍為一章正文完成、一來源選段及六個雙語單元；未核定來源 2373。閱讀與計畫筆記鍵、備份格式及使用者資料不改寫。

## 未採與失敗

- PTT 個股期被插隊原帖直接讀取返回 403；只見搜尋介紹，不摘錄其作者或留言結論，也不說沒有新文。
- Reddit 的 OHLC 成交假設串實讀主帖及可見回覆，作者已刪除或化名，樣本二十五與其他百分比未對帳；部分委託語意及保證也未採為規格。不把看不到的回覆說成不存在。
- CME Matching Algorithm Overview 只取得影片介紹，未觀看或取得逐字稿，不標影片已讀。
- TradingView 與 Brooks 公開檢索找到相關入口，本批未續讀完整來源，不標正文完成或新課程引用。

詳細決定保存在 reading/content-updates.json。未新建排程、留言、聯繫作者或執行交易。

## 重建與驗證

release.json 指定 build-content-batch28.cjs；作者檔 batch28-sources.json、batch28-support.json、limit-touch-models.svg，實讀紀錄 zh-core-source-reviews-21.json。重建後執行翻譯清單、中文呈現及版本標示，不重跑歷史全量生成器。

十組資料保留與可重現檢查、七十三項隔離閱讀器回歸、三項版本測試、網站資料／資產及 206 檔本機 HTTP 檢查通過。SVG XML 解析通過。瀏覽器已檢查新圖、正文新章節、章節導航、第二十八批兩篇篩選、英文原題／短句展開及指定答覆限制；新教材中文語境經重新載入核對。個人筆記及已讀標記未操作。

證據位於 workspace artifacts/content_batch28_2026-11-06/。本機通過不等於已部署；發布另核對 GitHub Actions、同版 Release、線上版號與全部 Git blob，維持既有公開 Pages 與舊 Sites 備援。
