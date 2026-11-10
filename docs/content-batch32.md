# 第三十二批 · v1.7.0 · 2026-11-10

本批填補合成圖價格與回測成交來源的教材缺口。未取得全文重刊授權，採精簡繁中摘要與必要短句，保留原文入口；不是整篇逐字翻譯或績效證據。

## 實讀來源

- TradingView：Strategy produces unrealistic results on non-standard chart types (Heikin Ashi, Renko, etc.)，https://www.tradingview.com/support/solutions/43000481029-strategy-produces-unrealistic-results-on-non-standard-chart-types-heikin-ashi-renko-etc/ 。實讀全部公開文字與程式範例，未執行腳本、核驗圖像或操作目前介面。發布及修訂確日未知；原頁選項名稱 Using standard OHLC 只按該頁記錄，不宣稱目前選單名稱已核對。
- Sierra Chart：Heikin-Ashi，https://www.sierrachart.com/index.php?ID=138&Name=Heikin-Ashi&page=doc%2FStudiesReference.php 。實讀 Description、公式、Inputs、Spreadsheet 說明文字；未下載或執行試算表。頁尾修改日 2025-01-24 不是首次發布日。
- Sierra 公開支援串 Heikin-Ashi study questions，https://www.sierrachart.com/SupportBoard.php?Page=1&ThreadID=93599 。實讀兩則貼文，採 2024-07-18 第 2 則 John - SC Support 欄位答覆的指定範圍摘要。未測試顏色規則或軟體，工具頁首舊時間、貼文日期、今日查核日分列，不作即時互動量排名。

前兩筆列正文摘要，討論串只列指定答覆摘要。三筆查核日為 2026-11-10；沒有新 Brooks 引用，也沒有觀看付費課。英文短句各六、五、八詞，繁中優先、英文可展開。

## 校註與原創算例

平均 K 的計算與成交價格分開。標準 OHLC 成交設定不能保證棒內路徑、延遲與成本均已正確，也不推廣為所有非標準圖的通用修復。客服的 only 用語解釋最末棒覆寫機制；本站算術校註另保留「數值可能偶然相等」，不改成兩種來源永遠不同。

本站自設非首根、非最末棒原始 OHLC 為 101／107／98／104，前一平均 K 開收為 110／108。當根合成開 109、高 109、低 98、收 102.5；合成四值再平均為 104.625。原始棒收漲、合成棒收跌；合成開盤 109 超出當根原始高 107，不能當該根內的真實成交。本例未提供逐筆路徑或最小跳動，也不代表別的時間未成交 109。

既有 pp2-signal-gap 前七節、題目與舊來源保留，追加兩節、術語、練習及版本註記。960×760 原創圖兩棒共用每價格單位 16 像素尺度，不是平台截圖、交易訊號或原作者數字。

## 搜集及未採

另實讀 Reddit r/pinescript 的合成圖回測原帖與可見回覆；只顯示相對日期，對選項消失與可重播的會員說法未操作核驗。本批以官方文件支持技術定義，不採「唯一可行方法」、不再重繪或獲利保證，未新增來源卡。Brooks 公開討論及 PTT 搜尋未找到本批可實讀的相符原帖，不能推論沒有新文。其他 FAQ、腳本與網路 PDF 僅見搜尋介紹，未冒充已讀、已執行或可完整翻譯。

## 驗證與發布

作者檔 batch32-sources.json、ha-price-provenance.svg；生成器 build-content-batch32.cjs，實讀紀錄 zh-core-source-reviews-25.json。預期 62 個閱讀單元、74 張原創圖、48 張來源卡、2110 資源、16 影音；英文來源 2383，正文摘要 51、指定範圍摘要 30、介紹 19、授權 2、未取得 4、待讀 2277。全文翻譯完成判定保持；不將摘要算為完整翻譯。

執行重建、版本、資料保留、閱讀器、子路徑 HTTP 與實際畫面驗收，檢查算例四值、圖上尺度、最末棒限制及篩選／英文展開。通過後依版本規則推送 main 與不可覆寫 v1.7.0；確認 Actions、Pages 線上版號、同版本 Release 與已提交檔案比對成功才稱已發布。證據保存在 workspace artifacts/content_batch32_2026-11-10/，個人筆記／備份不上傳；不另建排程、不執行交易。

本機驗收完成：十組資料與可重現檢查、七十三項隔離閱讀器回歸、三項版本測試及 209 檔子路徑 HTTP 檢查通過。瀏覽器確認第三十二批三篇／累積四十八篇，OHLC Avg 搜尋只留一篇、清除恢復三篇，英文短句可展開；閱讀器追加兩節、新圖與完整 SVG 正常，公式、同尺度與限制可讀。沒有操作使用者筆記或已讀狀態。
