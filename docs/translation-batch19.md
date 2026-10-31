# 第十九批：恢復目標、補完小節與全文獨立計數

2026-10-31 目標回報 active 後恢復內容工作。完整範圍見 `goal-translation-contract.md`，不能把控制列的恢復文字當成已達成目標。

## 授權文字

`licensed-measured-move` 已補上 Targets 最後一段的三句及末尾占位文字，原有七個對照區塊保留，現在四段正文與兩行占位文字完整覆蓋，共十一個段／句對照區塊。不是整個 Patterns 來源頁完成。固定版本 4351762、CC BY-SA 4.0、署名與修訂歷史沿用。

最後一段描述邊際買方、第一次修正與較低高點；照譯作者的敘述，不補進場條件、機率或今日訊號。`air lifts` 原文未定義，保留英文，暫譯與限制另註。來源圖片未核驗或重用。

## 核心入口

兩筆原待讀核心頁完成公開介紹摘要：Rayner 十八課課綱、TraderTom 四頻道用途與第四頻道帳戶條件。未讀個別課程、觀看影片或直播、加入頻道或核驗成交。免費頁不代表全文翻譯授權。兩筆均為 intro-only，不增加正文摘要完成數。

## 全文驗收

`translation/fulltext-progress.json` 與原閱讀狀態分開：2361 個來源均列入；目前來源整頁全文完成 0，2 個來源已有指定範圍對照、對應 6 個授權單元，其餘全文與授權尚待核對。完整小節與正文摘要不自動轉成整頁全文完成。

`scripts/fulltext-source-audits.json` 保留明確完成核對的擴充入口，現在為空。若未提供版本、證據及同來源實際對照單元，生成器拒絕列完整來源。未知授權與未核對狀態不擅自定為禁止或已許可。

## 重建與驗證

`build-translation-batch19.cjs` → `build-translation-ledger.cjs`（同時產生全文進度）→ `enable-chinese-first.cjs`。原 61 個未編輯文章、所有舊對照區塊、筆記及樣式保持；只更新目標小節與相應目錄／範圍題目。

使用 workspace `tools/check_translation_batch19*.cjs`。工作區證據存於 `artifacts/translation_batch19_2026-10-31/`。HTTP 檔案由 196 增加到 197，新增的是按需查閱的全文進度資料，未引入資料庫或付費擴容。
