# 第三十三批：先確認定義，再計算金額

實際查核與編排日期：2026-11-11，Asia/Taipei。版本 v1.9.0。前版 v1.8.0；保留 62 篇文章 ID、原文、筆記鍵、來源日期及全部原有正文與測驗。

## 優先校讀

- ict-fvg：H1 101、已收線 L3 102.5、區間寬 1.5。並列未收線、成立、零寬三種狀態；自測用盤中 102.5 降至收線 100.8，答案為不成立。
- practice-risk-in-r：24,000／23,950、50 點、每點假設 10 元、成本假設 100 元，一口含成本 600 元；100,000×0.25%=250 元預算，向下取整零口。額外給定 24,100 平倉，淨利900，分別為價格分母1.8R、含成本分母1.5R；原預算不允許這筆單，不回填為實際交易。
- 沿用兩張原創圖；風險圖原本將23,950與600斷行，本次重排同一路徑，不增加圖數。圖／表／正文數字一致；所有數字是教學假設，無新商品規格或成本報價。
- 已深度編排五篇，其餘五十七篇仍使用共用層次，逐批續作。沒有宣稱全部已逐句校勘。

## 採用：英文原始來源

1. TradingView，Gaps：[官方文件](https://www.tradingview.com/support/solutions/43000675999-gaps/)。實讀 Definition、Summary、Inputs 全部文字；影片未觀看、圖片未重刊、軟體未操作。發布／修訂確日未標。採正文摘要，短句為三詞設定名稱 Close Gaps Partially。一般兩棒比較、圖框關閉及篩選不同於本站三棒FVG；預設標為關閉不代表完整回補或成交。功能文件不是獲利證明。
2. Sierra Chart：[How to calculate position size in programming way?](https://www.sierrachart.com/SupportBoard.php?ThreadID=32579)。實讀兩帖；首帖2018-02-10，摘要採2018-02-12 #2 Sierra Chart Engineering指定答覆。每跳貨幣金額與委託數量變數，短句Currency Value Per Tick四詞。未跟讀變數文件或執行程式；未指定商品跳動值，不能算出唯一口數。返還頁首為2026-10-16舊快照，不列即時檢視／感謝數。

均未確認全文重刊授權，僅精簡摘要與必要短句、保留原文連結。兩筆未收錄URL經翻譯清單及來源卡去重；新增一筆正文、一筆指定答覆，無全文完成升級。新例題不冒充上述作者公式推薦或Brooks原課，沒有新增Brooks單元引用。

## 實讀但未採用

- [TradingView／GoalsInMotion的3-Candle Fair Value Gap Alerts + Highlight](https://www.tradingview.com/script/w23KSvO4-3-Candle-Fair-Value-Gap-Alerts-Highlight/)：已讀全部公開說明及列式，原碼受保護。定義與現有最小幾何練習重複；沒有執行或驗證警報／跨週期行為。頁面只列Aug 13，不猜年份，不採人氣數字。
- [Brooks公開論壇Maximum Trade Size and Maximum Risk](https://www.brookstradingcourse.com/support-forum/general-trading-discussion/maximum-trade-size-and-maximum-risk/)：已讀Stephen原帖、追問及graeme brindley可見答覆。部分所稱CH回覆未在返回正文出現，不補造。頁面日期02/08/2023格式未核對，不任意換算。會員轉述機率、加碼經驗及QQQ研究均未獨立驗證；不轉成Al官方教法、微台／BTC勝率或加碼建議。未讀附件。

## 取得失敗／僅搜尋

- Reddit [How to define my risk?](https://www.reddit.com/r/Daytrading/comments/1kwgt09)：實際開啟回傳Cache miss，未取得正文，不能記為無新文或摘要完成。
- PTT Option停損口數搜尋未取得可辨識且可實讀的匹配原帖，只記搜尋覆蓋，不表示平台沒有新文。
- 威科夫原作者／機構、Reddit其他自述回測、未授權書籍PDF只有搜尋結果，未讀全文，不收錄、不轉譯績效或PDF。

## 驗收與發布

以既有完整測試加本批算術、兩棒與三棒、自測、圖路徑、來源日期與保留檢查；重建需穩定。檢查桌面及390px窄版的圖／表、答案、來源展開與原文。Actions、線上版本和同版Release確認後才對外稱發布；實際結果保存workspace artifacts/content_batch33_2026-11-11，不提交個人資料。
