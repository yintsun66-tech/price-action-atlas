# 第三十一批 · v1.6.0 · 2026-11-09

本批新增兩篇尚未收錄的英文公開教材摘要，及既有圖式單元的兩節原創練習與一張圖。未確認完整翻譯授權，因此只提供精簡繁中摘要、必要短句及原文入口。不是今日交易建議。

## 實讀及歸屬

- Bruce Fraser，Secrets of Point and Figure Distribution，2016-01-16；頁面 03:08 PM 時區未標。實讀全部教學正文文字，未核驗原圖、重建原文歷史指數或驗證績效。舊網址重新導向至 https://articles.stockcharts.com/article/articles-wyckoff-2016-01-secrets-of-point-and-figure-distribution/ ，採最終網址去重，原網址保存在作者檔。
- Step Three of the Wyckoff Method，https://wyckoffstockmarketinstitute.com/wyckoff_articles/Wyckoff_Articles/wyckoff_step3.htm 。實讀全部公開教學正文；頁面以 The Jamison Group, Inc. 版權署名，個人作者、首次發布與修訂日未列。頁尾 ©2009 不是可確定的發文日。原文比較指數／衍生商品計數可靠性的說法未經本站實驗核驗，不採為交易結論。

來源查核日皆為 2026-11-09。未觀看付費課或影片，不重刊原圖；未新增 Brooks 課程引用。機構或平台的作者介紹不當作獲利證明，未取得可比獨立評分時不補星等。

## 學習內容

到價不等於反轉，目標價格不等於進場後的報酬。Fraser 提出的保守三比一報酬風險是該文準則，不冒充所有威科夫版本的規定或命中率；另一篇未指定通用最小計數門檻，兩者問題不同。

自編算例假設已選定八欄、每格二點、三格轉向，投射距離 48 點。自設高點 160、計數線 156，向下得到目標區 108–112；另設空單進場 148、停損 164，風險 16 點、近端潛在報酬 36 點，保守報酬風險 2.25。未扣成本、未給路徑或到價機率，不是完整點數圖建構、作者原行情或 TMF／BTC 訊號。

既有 wyckoff-template-uncertainty 的前四節、原題及來源保留，追加第五、六節、術語、練習與版本註記。一張 960×760 原創圖同時用於閱讀器及兩張來源卡；不因重用而增加圖數。

## 搜集與未採用

Sierra CVD 文件去重後確認第二十三批已讀，第二十四批另有滾動主題，未重複算新文。另一則 9:30 重置原帖讀取返回 cache miss，記為取得失敗，不能推論沒有新文。Reddit 只得搜尋摘錄、PTT／TradingView 混合檢索未取得適合原帖，沒有冒充完整閱讀；Wyckoff Analytics 教材／影片只有搜尋介紹，本批未作全文或已觀看判定。未授權書籍 PDF 不取作完整翻譯。

## 重建與驗證

最新入口 scripts/build-content-batch31.cjs，作者檔 batch31-sources.json、pnf-objective-risk.svg，實讀紀錄 zh-core-source-reviews-24.json。生成後執行 build-current、verify-site 與版本測試，workspace tools/check_content_batch31*.cjs 保留既有閱讀器、筆記與資料檢查。

預期 62 個閱讀單元、73 張原創圖、45 張來源卡、2110 資源及 16 影音；英文來源 2380，其中正文摘要 49、指定範圍 29、介紹 19、授權 2、未取得 4、待讀 2277。全文完成判定及原有六個雙語單元保持。舊來源 ID、查核日與筆記格式保留。

通過可重現重建、資料、閱讀器、子路徑 HTTP 及實際畫面互動後，依版本規則推送 main／v1.6.0。確認 Actions、同版 Release、線上版本及已提交檔案比對才稱已發布。證據保存在 workspace artifacts/content_batch31_2026-11-09/；不將個人筆記或備份上傳公開儲存庫，不另建排程、不執行交易。

本機驗收完成：十組資料與可重現檢查、七十三項隔離閱讀器回歸、三項版本測試及 208 檔子路徑 HTTP 檢查通過。實際瀏覽器確認第三十一批兩篇／累積四十五篇、Fraser 搜尋一篇及清除恢復兩篇、英文短句可展開、未知發文日與版權年分列；閱讀器兩節與新圖呈現正常，完整 SVG 無裁字，位置非等比例另標示。沒有操作使用者筆記或已讀狀態。
