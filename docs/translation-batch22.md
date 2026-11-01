# 第二十二批：價格預測與技術分析基礎的正文補譯

查核日期：2026-11-01，Asia/Taipei。依新的「請繼續翻譯」要求接續執行，沿用原私人網站，不建立目標、排程或執行交易。

## 來源與實讀

本批實讀 Wikibooks contributors 的 Technical Analysis／Basis of Technical Analysis 公開原頁全部教學文字、表格、圖說及頁尾：

- 原頁：<https://en.wikibooks.org/wiki/Technical_Analysis/Basis_of_Technical_Analysis>
- 固定版本：3562704，頁尾列最後編輯日 2019-08-12。固定入口本次工具取得失敗，原頁可讀且頁尾版本一致；失敗與替代核對方法一併保留，不寫成沒有內容或已成功取得固定入口。
- 授權：實讀 Wikibooks:Copyrights 公開政策，頁尾 4622060，核對 CC BY-SA 4.0 文字署名、改作、相同授權及非文字媒體另查。只用文字，沒有重用原圖。
- Satyam 維基百科外鏈未接續閱讀，來源圖片未核驗或重建；均排除於本次完成範圍。

## 實際新增

沿用 `licensed-price-forecasting` 的穩定 ID，保留原三句與五列表格的全部英文、繁中及順序，新增八段正文、一行圖說與五個小節標題。完整教學文字涵蓋 Price Forecasting、Basis of Technical Analysis、Price Movement、Case Study、Satyam Computer Scandal。

新譯文與校註以 `scripts/licensed-batch22.json` 保存。價格反映資訊的「信念」、供需簡化、平均量缺少基準、operators 未定義及 today 的歷史語境均分開解釋。Rs.180、Rs.5、兩個交易時段與 `stock stock` 的原字保留，不宣稱已獨立驗證該股票行情或數字，也不套成微台／BTC 勝率。

本章教學正文現在共十一段／句、五列表格、五個小節標題與一行圖說，全部保留英文可展開。來源圖片、網站導覽、頁尾制式文字及外鏈內容不在完成範圍。原作者主張與本站校註分開；原有合成圖不是 Satyam 圖表。

## 首筆正文全文覆蓋稽核

`docs/sources/batch22-basis-3562704.txt` 保存按公開正文核對的英文文字快照與授權；空白及表格分隔改為純文字，原字詞不變。`scripts/verify-batch22-coverage.cjs` 對照讀者內容的完整英文序列、五列各格、全部標題及圖說，避免只由標題或小節數推算完成。

`scripts/fulltext-source-audits.json` 首次新增明確來源 ID、固定版本、範圍、排除項、來源取得方式、覆蓋數量與中英對照區塊 SHA-256。全文進度生成器檢查稽核對應單元、來源網址及區塊雜湊，並區分完整正文的文字授權與指定選段。待辦中的該來源也改為已核對本章正文，不再要求重複補譯相同段落。

全文進度現為：**1 個來源章節教學正文完成中英對照、1 個來源有明列選段、2365 個來源的全文與授權尚未核定、6 個雙語單元**。不是全站完成。英文去重網址仍為 2367；原讀取狀態計數保留（35 正文摘要、19 介紹、21 部分摘要、2 授權內容來源、4 取得失敗、2286 待讀），全文狀態另外稽核，不把新翻譯虛增成新文章或新來源。

## 重建

```text
node scripts/build-translation-batch22.cjs
node scripts/verify-batch22-coverage.cjs
node scripts/build-translation-ledger.cjs
node scripts/enable-chinese-first.cjs
```

不重跑舊影音或圖像生成器。資產版本 `20261101t22`。原 62 個閱讀 ID、61 篇其他文章、68 張 SVG、26 張來源卡、16 個影音入口、雙地圖、十三條路線、四十八項任務及兩個筆記鍵均保留。

## 驗證與限制

- workspace `tools/check_translation_batch22.cjs` 保留 43 項既有資料回歸，只按實際修改新增本單元的舊雜湊例外。
- `check_translation_batch22_reader.cjs` 保留 73 項隔離 DOM／記憶體閱讀器與地圖回歸；新增正文數量更新為十二個 paragraph 區塊（含圖說）。未寫入實際使用者的筆記或已讀紀錄。
- `check_translation_batch22_sources.cjs` 的 10 項檢查另核對完整來源快照、授權、舊譯、歷史數字語境、所有其他文章／來源紀錄、全文稽核與更新紀錄。
- 200 檔 HTTP／雜湊檢查與整批重建一致性通過；沒有增設或修改閱讀 CSS、閱讀器或地圖程式。
- 本機預覽伺服器成功提供內容，但 CUA 在既有分頁導航與重新綁定時均回報瀏覽器使用者介面不可用。依 browser-troubleshooting 及 Sites preview guidance，沒有改走其他瀏覽器控制技術或修改正常網站來補償工具問題。本批**實際桌機／手機畫面驗證未完成**；不能沿用上批截圖冒充本批證據。使用已通過的內容與隔離閱讀器驗證發布，部署成功與否以 native Sites 回傳為準。

來源取得失敗、檢查及發布紀錄存於 workspace `artifacts/translation_batch22_2026-11-01/`。私人讀者權限維持原狀。
