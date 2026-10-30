# 專注閱讀版面（2026-10-30）

本次參考 Medium 的文章閱讀節奏：集中單欄、寬鬆行距、清楚字級層次與較少卡片邊框。版面由本站自行設計，沒有匯入 Medium 程式、商標或文章。

- `dist/reading-layout.css` 放在中文樣式之後，覆寫文章、閱讀庫、來源摘要與社群選讀排版；原 `reader.css` 不改動。
- 正文最多 720px，桌面 22px、窄螢幕 20px；字型使用本機可用字型，沒有新增遠端字型請求。
- 保留所有閱讀器 ID、分頁、圖解、鍵盤焦點、關閉操作與筆記事件。目錄改為原生 `details` 收合，來源與英文仍按需展開。
- 筆記鍵 `price-action-atlas-v1`、`price-action-atlas-reader-v1` 不變；沒有改寫既有使用者資料。
- 閱讀庫及來源清單改為單欄分隔線樣式，保留既有搜尋、分批載入與狀態顯示。

重建順序：`build-reading-batch11.cjs` → `build-translation-ledger.cjs` → `enable-chinese-first.cjs`。新樣式與原有中文呈現同時發布，資產版本 `20261030read1`。

本批 `zh-core-source-reviews-7.json` 是兩筆既有待讀來源的實讀紀錄：Galen Woods 與 Nial Fuller。只作精簡繁中摘要及必要短句，不代替完整原文或課程。累積英文網址仍為 2,357，正文摘要增至 21，待讀 2,300；其餘介紹、部分摘要、授權選段及未取得狀態分列。全站翻譯尚未完成。

驗證及發布紀錄放在 workspace `artifacts/reading_batch11_2026-10-30/`。使用 `tools/check_reading_batch11*.cjs` 保留前批全部內容與閱讀器斷言，另比對 68 個原文章、樣式、索引及狀態檔，並驗證兩筆狀態轉換。瀏覽器另驗證文章寬度、手機排版、目錄、分頁與英文展開。
