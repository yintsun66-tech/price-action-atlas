# Price Action Atlas 第二批：推薦來源技術導讀

研究核對日期：2026-10-27（台北）。只使用下列可直接取得的作者／平台官方公開文字。本批未觀看付費課程，未取得影片逐字稿，未外聯作者。未重製原圖、程式碼或影片。

交付：`priority-batch2.json`，6 篇原創技術導讀、每篇 6 節、每篇 3 題三選一案例測驗（共 18 題）。`sourceSummary` 為獨立短摘要，均少於 100 個中文字；正文、所有價格、乘數、成本、時間門檻、取整算例及題目為網站自編。不是原文逐段翻譯、作者官方交易系統或 PA_BREAKOUT_V1 變更，不是歷史行情或績效證據。全文翻譯／重刊權限未確認，維持原創導讀及原文連結模式。

## 與第一批區別

已閱讀既有 8 篇 `practice-*`：背景假說、主觀判斷稽核、交易紀錄、型態實驗簿、計畫取消、影片證據、R／部位、tick 圖移植。第二批改為可計算的執行細節：價格格子與結構停損、出場版本、背景有效時間、進場跳空重算、完整棒時間退出、棒內事件狀態。沒有只把第一批標題換字。

## 已讀來源與使用範圍

1. Galen Woods，**Price Action Trading Strategies Beyond Price Patterns**。
   原文：[官方文章](https://www.tradingsetupsreview.com/price-action-trading-strategies/)。可讀完整公開文字；採用的短觀念是型態能界定自然風險位置。網站自編結構緩衝、跳動取整與現金風險算式。原文圖例及其他章節未重製。對應 `pp2-structural-stop`。
2. Adam H. Grimes，**Trailing stops: 9 ideas you can use today**。
   原文：[官方文章](https://www.adamhgrimes.com/trailing-stops-9-ideas-you-can-use-today/)。可讀完整公開文字；短摘要為停損可隨結構發展調整，需配合交易方式。本批未整理九點全文，使用自編兩版本、時序與十筆損益算例。對應 `pp2-target-trailing`。
3. Galen Woods，**Swing Trading Strategy with Multiple Time-Frames**。
   原文：[官方文章](https://www.tradingsetupsreview.com/swing-trading-multiple-time-frames/)。可讀公開雙週期規則與案例文字。原文週線／日線方法只作來源背景；本批三十分鐘／十分鐘、自編背景條件與資料到齊延遲不是原文策略。未複製其圖與規則表。對應 `pp2-closed-higher-frame`。
4. Galen Woods，**How to Manage Gap Risk in Swing Trading**。
   原文：[官方文章](https://www.tradingsetupsreview.com/manage-gap-risk-swing-trading/)。可讀完整公開文字；短摘要限進場跳空會改變風險、前提與可承受性不足可略過。數字棒形、淨風險計算與取消門檻為自編。本批沒有採納或翻譯原文所有股票／選擇權建議；全天商品亦不宣稱沒有跳價風險。對應 `pp2-signal-gap`。
5. Adam H. Grimes，**A Few Trading Rules**。
   原文：[官方文章](https://www.adamhgrimes.com/a-few-trading-rules/)。可讀完整公開文字；只摘要預期情境不展開時可考慮時間退出。六棒上限、三棒進展檢查與所有觸價例為本網站自編，不是作者參數。對應 `pp2-time-exit`。
6. 太妃的市場朗讀／Tefi Reading Charts，**讓我們從頭來過：第一季第四期官方文字介紹**。
   原文：[官方公開頁](https://tefistudio.com/zh/page/free-course)。只讀公開介紹，以時間／幅度討論主導力的範圍；沒有取得影片內容、字幕或觀看完整影片，不把自編時間退出掛名為 Tefi 課程規則。作 `pp2-time-exit` 繁中相關補讀。
7. TradingView，**What is bar magnifier backtesting mode**。
   原文：[官方文件](https://www.tradingview.com/support/solutions/43000669285-what-is-bar-magnifier-backtesting-mode/)。已讀公開說明、低週期路徑的進出場先後示例與資料限制；未複製碼、圖或功能表。網站使用自編 OHLC 雙路徑、未成交狀態與逐筆事件測試，未宣稱 Python 引擎已有 TradingView 功能。對應 `pp2-intrabar-path`。

## 固定 ID／標題

- `pp2-structural-stop`：停損位置先由結構決定，再檢查一口是否負擔得起
- `pp2-target-trailing`：固定目標與追蹤停損：同一個好進場，會長成不同策略
- `pp2-closed-higher-frame`：較高週期看背景，十分鐘看觸發：先解決兩個時鐘
- `pp2-signal-gap`：強勢訊號棒不等於好成交：把跳空後的計畫重算
- `pp2-time-exit`：突破後遲遲不走：新資訊、時間退出與認錯
- `pp2-intrabar-path`：同一根棒碰到停利又碰到停損：OHLC 沒說的事

## 內容檢核

- 每篇正文約 800–840 個漢字，總文字約 1,000–1,100 字符；不靠警語湊正文。
- 每篇 3 題、每題 3 選項，答案索引為整數 0–2，答案位置輪換並附具體解釋。
- 所有 `courseRefs` 留空；沒有把 Galen、Grimes 或 Tefi 自有內容當成 Brooks 課程原始出處。
- 來源皆為英文或繁中原始公開頁，沒有二手推薦清單代替實際內容。
- 沒有替作者標勝率、保證收益或以教學案例作實績；沒有宣稱已獲全文翻譯權。
