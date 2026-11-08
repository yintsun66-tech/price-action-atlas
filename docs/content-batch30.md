# 第三十批 · v1.5.0 · 發布日 2026-11-09

**研究及來源查核：2026-11-08；瀏覽器驗收：2026-11-09。** 11-08 瀏覽器介面不可用時先保留候選版，11-09 恢復後完成同一批畫面及互動驗收，沒有改寫來源日期或另升一版。實際部署以 GitHub Actions、Release 與線上版本結果為準。

本批優先消化既有英文待讀來源，沒有新增英文網址。兩篇公開評論實讀後才列正文摘要，新增四項來源卡機率語境。這些是歷史閱讀，不是今日交易建議。

## 來源及閱讀範圍

- Brad，Emini Tight Trading Range at September High：https://www.brookstradingcourse.com/analysis/emini-tight-trading-range-at-september-high/ 。發布 2023-12-06；實讀全部公開文字，含 Emini 日線／五分鐘預期、EURUSD、圖表說明及兩則可見留言。未核驗原圖、觀看影片或付費課。七詞短句保留 Without it 的均線回測條件與 probably 的定性語氣；回測可能由下跌或橫盤等待均線上移發生，不改成當天必跌。
- Brad，Emini Surprise Bear Breakout：https://www.brookstradingcourse.com/analysis/emini-surprise-bear-breakout-3/ 。發布 2025-02-24；實讀全部公開文字，含 Emini 日線／五分鐘預期、EURUSD 及圖表說明。日線部分有重複段落，沒有當兩份證據。五詞短句保留不勉強交易的條件語境；盤後影片、原圖及付費課未觀看或核驗。

原頁文字署名 Brad；Al 另在圖表區署為繪圖者。既有索引姓名保留，新增確認欄只用原頁可見署名，不把文章正文冒充 Al 的付費課逐字稿。發布日與查核日 2026-11-08 分列；未取得原始發表／後續編輯版本快照，不將當前頁面當作已鎖定的盤前預測命中證據。

僅摘要 Emini 相關背景、指定機率與短句，沒有重刊全文、EURUSD 全部敘述、留言、圖像或影片。官方網站有課程銷售，未取得可比獨立評分或績效對帳，不補造熱門排名。

## 四項機率語境

- 2023-12-06 的 20%：從開盤即形成趨勢。該句未明訂趨勢持續多久。
- 2025-02-24 的 75%：出現兩小時橫盤，且在第二個小時結束前開始；沒有要求橫盤必須從開盤那刻開始。
- 同篇 50%：續跌後，接著兩小時橫盤，屬於組合路徑事件。
- 同篇 20%：從開盤形成，並持續全天的趨勢；原句明寫 lasting all day。

上述均按作者當日文字標註。所讀頁面未附數值的樣本分母、估計方法及可重算紀錄，不當作已驗證勝率，不直接相加或當獨立機率相乘。probably、likely、odds favor 等未量化句子保持定性，沒有補造「第二段下跌」的新百分比。

新增語境區塊預設繁中，事件、日期與依據限制直接可見；原題與短句仍可展開英文。四條註記位於來源卡及來源摘要，既有閱讀器的十八項機率紀錄保留。

## 課程補讀及查核限制

18A「交易區間」與 15A「突破」只列 Main／Forex 共用基礎的相關主題補讀。直接讀取兩份課綱索引返回 403；另由官方 Forex 課綱搜尋結果實讀 15A／18A 相關列，並讀兩個官方單元的標題及適用 Main、Forex 成員文字交叉核對。沒有說已重新讀完完整 Main 課綱、觀看付費課或知道影片內時間戳。

- https://www.brookstradingcourse.com/trade-forex-price-action/
- https://www.brookstradingcourse.com/price-action-fundamentals/video-18a-trading-ranges/
- https://www.brookstradingcourse.com/price-action-fundamentals/video-15a-breakouts/

通用課程入口未由工具取得的結果亦保留，不當作已讀課程。期望值初查中的 Adam Grimes、Reddit、PTT 只見搜尋摘錄，本批未採正文或社群自述績效。完整決定見 reading/content-updates.json。

## 相容性與本機數量

62 個閱讀單元、目錄、72 筆原創圖解、資源／影音檔位元組保持。41 張舊來源卡完整保留，新增兩張至 43，圖片沿用本站原創背景比較與計畫檢核圖；不是歷史 Emini 圖表重建，不增加圖數。

英文網址仍 2378：正文摘要 47、指定範圍摘要 29、介紹 19、授權來源 2、未取得 4、待讀 2277。兩個既有來源 ID、資源連結與收錄日保留，其他 2376 筆英文來源物件不變。全文完成判定與六個雙語單元不變；摘要沒有冒充完整翻譯。

## 重建與已完成驗證

release.json 指向 build-content-batch30.cjs。作者檔為 batch30-sources.json、batch30-probability-notes.css，實讀紀錄 zh-core-source-reviews-23.json。共用卡片渲染器增加可選 probabilityNotes，所有欄位轉義並檢查語境與依據，沒有修改前端筆記或學習狀態。

十組資料保留、來源與語境、HTML 轉義及可重現檢查通過；七十三項隔離閱讀器回歸、三項版本測試及網站資料／資產檢查通過。207 個本機檔案 HTTP 檢查通過。

11-09 實際瀏覽器驗收：第三十批顯示兩篇、累積四十三篇；兩種 20% 的期限及 75% 起點條件正確顯示，英文短句可展開，75% 搜尋只留一篇、清除後恢復兩篇。機率區塊的大字與分隔可讀，18A／15A 相關補讀及圖說範圍可見，兩張沿用圖片載入正常。保存當批真實預覽畫面 probability-notes-preview.png，未操作使用者已讀或筆記。

## 發布驗證協定

README、CHANGELOG 及 release.json 使用實際發布日 11-09，內容批次與兩篇查核日保留 11-08。完成重建及驗證後提交 main；Actions 成功後才推送不可覆寫的 v1.5.0 標籤。確認 Pages、同版 GitHub Release 及 workspace tools/verify_content_batch30_live.cjs 的 207 個 Git blob 比對後，才稱已上線。發布回執與線上真實畫面保存在 workspace 的本批 artifacts，不將個人筆記上傳。

checkpoint 與檢查位於 workspace artifacts/content_batch30_2026-11-08/。這次沒有建立新排程或執行交易。
