# Price Action Atlas 每日內容更新

使用者於 2026-10-28 選擇每日更新。已建立本聊天 heartbeat：價格行為教材每日蒐集與繁中更新，時間預設 Asia/Taipei 每日 10:00。這是本機聊天的持續工作排程，沒有另建 Sites 雲端寫入器或第二份排程。排程設定成功不表示未來每次研究或發布必然成功；每次執行仍須查核及確認發布結果。

## 既有網站

- checkout：`C:/Users/editi/Documents/Codex/AI TRADING/sites/price-action-atlas`
- 網址：https://price-action-atlas-study.yintsun66.chatgpt.site
- 精確專案 ID 以 `.openai/hosting.json` 為準，重用目前網站；維持只有擁有者可讀。
- 原有進度鍵 `price-action-atlas-v1`；閱讀與筆記鍵 `price-action-atlas-reader-v1`。不得任意更換 ID、清除或更改存取權。

## 研究與去重

1. 先讀 workspace `AGENTS.md`、Sites skill、本站 README，以及 `reading/index.json`、`reading/articles/*.json`、`reading/community.json`、`reading/content-updates.json`、media 目錄。搜尋 canonical URL 及標題去重。
2. 優先英文原作者、公開課綱、交易所與研究；另蒐集 Reddit、TradingView、Brooks 公開討論區、PTT、Sierra Chart 等原帖，作為學習需求與假說來源。不要擅自加入私人社群、發帖、留言或聯絡他人。
3. 每次先看最後成功紀錄，再適度重疊搜尋範圍。新收錄可以是有新增價值的舊文，必須列發布日，不能稱全部最新。只見相對日期時保留確日未核對。
4. 實際讀到什麼就記什麼。只有標題、摘要、影片簡介或索引時，不能聲稱已讀全文或看過影片；取得失敗列失敗，不記成無更新。
5. 不為湊數加入重複、低品質或無新價值的內容。保存未採用的理由。已存在來源若只更正內容，保留其 ID 與修訂說明。

## 翻譯與評價

- 繁體中文為主。未確認完整授權時，提供精簡來源摘要、必要英文短句及忠實繁中譯文。所有源自同一頁的內容合併計入來源使用限額；避免在文章、卡片及其他輸出重複搬用同一長段。
- 完整小節翻譯僅用於已核對的開放授權或使用者有權提供的文字。保留作者、固定版本／修訂歷史、範圍、變更、授權，圖片另查權利。論壇上可搜尋到的商業書籍 PDF 並不代表已獲授權。
- 可能性詞語保持上下文。沒有明列數字就不填機率；有數字要保留事件、分母、期間、來源及主觀／實測身分。社群勝率以自述標示，不轉成微台或 BTC 勝率。
- Brooks 官方觀念附 Main／Forex、可核對單元編號、中文主題、官方 URL 與關係。會員或其他作者的解讀不能冒充原課出處。未觀看付費課不說已觀看。
- 評價說明來自誰、用於什麼，未取得獨立評分就不造星等。跨平台互動量口徑不同，不合併人氣榜；只列能核對的 dated snapshot。商業背景與績效證據分開。

## 編輯、驗證與發布

1. Existing Site 依 Sites skill 取得狀態與短期 source credential，用 source helper open，同步後才修改。token 僅記憶體與 stdin，不寫入文件、指令列或輸出。
2. 來源卡位於 `dist/reading/community.json`；目前以 `scripts/build-content-batch7.cjs` 重建最新批次，來源卡共用 `scripts/render-community.cjs`。第六批作者檔為 `scripts/community-articles.cjs`，第七批為 `scripts/batch7-articles.cjs` 及 `scripts/batch7-sources.json`。新批次不要覆寫歷史作者檔；新增批次後更新通用目錄及 HTML 區塊。來源發布、收錄及查核日期分列，舊卡保留原日期。若變更生成器，驗證重跑不重複插入或回退內容。
3. 新閱讀文章保持 schema、收藏與筆記相容，附原創整理圖；在 `scripts/build-study-figures.cjs` 加入對應圖，避免無圖或錯配。合成資料與原作者圖、歷史行情分開標示。圖片不能暗示未提供的資料或把原案例當績效。
4. 同步 `reading/index.json`、閱讀路線、必要的批次與主題選項、`school-titles.js`、圖解索引，以及首頁的實際文章／授權／圖／題數。不要盲目重跑寫死舊批次總數的歷史生成器。
5. 每批保留更新前文章雜湊。最新整合測試為 `tools/check_content_batch7.cjs` 與 `tools/check_content_batch7_sources.cjs`（相對 workspace）；新增文章後按真實目錄擴充驗收，不能刪減既有斷言來掩蓋錯誤。測試重點為舊文章及筆記保留、來源與授權、短句長度、篩選、深連結、圖像與測驗、轉義、未取得資料的標示。確認產出可重現。
6. 按 Sites preview 參考檢查本機網頁；保留可見頁面與互動驗證。本輪 HTTP 檢查入口為 `tools/check_content_batch7_http.cjs`，使用實際 owned preview URL，不猜固定埠。
7. 每批更新 `reading/content-updates.json`，保留來源、採用／略過／失敗。通過後用 source helper 打包及推送精確 commit，以原有 owner-private 發布。成功 native 結果與 URL 才算已部署；失敗不要假稱網站更新。
8. 工作區 `artifacts/` 保存該批檢查、commit、部署結果及必要畫面，不把敏感資料寫入站內。發布後檢查關鍵內容並保留交付頁，關閉 owned preview 與臨時分頁。

## 全站繁中工作銜接（2026-10-29）

完整範圍與未完成工序見 `docs/fullsite-translation.md`。新來源與標題整理須同步翻譯清單；只翻標題不增加正文摘要完成數。編輯或重跑歷史生成器後，最後依序執行 `node scripts/build-translation-ledger.cjs` 與 `node scripts/enable-chinese-first.cjs`，再跑 workspace 的 `tools/check_fullsite_zh_reader.cjs`、`tools/check_fullsite_zh.cjs`。維持中文優先、英文可展開，不讓歷史生成器恢復英文預設版面或清除未完成清單。

## 通知

有實質新增、重要更正、發布失敗或需要使用者處理時，以繁中簡要回報並附網站直接連結。沒有合格新內容且狀態未變時保持安靜。不另建排程，不執行交易。

第八批以 `scripts/build-content-batch8.cjs` 加入來源卡及更新紀錄，再執行翻譯清單與中文呈現生成器；不重跑寫死舊批次的完整生成器。網站 canonical 網域已轉為 yintsun66；舊網域會重新導向，瀏覽器筆記不會自動跨 origin 同步，不能宣稱已移轉。

第九批為既有來源翻譯續讀，不新增社群卡。最新重建順序：`build-content-batch9.cjs` → `build-translation-ledger.cjs` → `enable-chinese-first.cjs`。實讀作者檔為 `zh-core-source-reviews-5.json`，可選 `shortExcerpt`、`termNotes`、`editorNotesZh` 分開短句、詞條與本站校註，不能以編輯判讀冒充原文。最新驗證入口為 workspace `tools/check_translation_batch9.cjs`、`tools/check_translation_batch9_reader.cjs`、`tools/check_translation_batch9_http.cjs`；保留前批全部斷言並新增本批範圍檢查。

第十批（2026-10-30）重建順序為 `build-content-batch10.cjs` → `build-translation-ledger.cjs` → `enable-chinese-first.cjs`。新來源作者檔 `batch10-sources.json`，指定續譯檔 `zh-core-source-reviews-6.json`。來源卡可選 `figure`，只允許 `images/study/*.svg` 既有原創示意，圖說必須區分與原文圖例、真實行情及績效的關係。沿用圖片不增加圖數。最新驗證為 workspace `tools/check_content_batch10.cjs`、`tools/check_content_batch10_reader.cjs`、`tools/check_content_batch10_http.cjs`，保留完整閱讀回歸與舊來源物件比對。

第十一批（2026-10-30）改進文章閱讀版面並續譯兩筆既有英文來源，未新增來源卡。最新重建順序為 `build-reading-batch11.cjs` → 翻譯清單 → 中文呈現；實讀檔 `zh-core-source-reviews-7.json`，樣式及相容性見 `docs/reading-layout.md`。不要只重建第十批而漏掉新閱讀樣式；目錄包裝與資產連結須保留。最新驗證改用 workspace `tools/check_reading_batch11*.cjs`。

第十二批（2026-10-30）新增專注學習導航，保留十二條既有路線並加一條入門順序；以現有已讀紀錄更新下一篇，不改寫筆記 schema。續讀作者檔為 `zh-core-source-reviews-8.json`，完整實作與範圍見 `docs/learning-navigation.md`。最新重建改為 `build-learning-batch12.cjs` → 翻譯清單 → 中文呈現，驗證用 workspace `tools/check_learning_batch12*.cjs`；原文章、路線及狀態 helper 仍須保留。

第十三批（2026-10-30）續讀三筆既有文字來源，未新增文章、卡片或導航。實讀檔 `zh-core-source-reviews-9.json`，範圍見 `docs/translation-batch13.md`。最新重建為 `build-translation-batch13.cjs` → 翻譯清單 → 中文呈現，驗證為 workspace `tools/check_translation_batch13*.cjs`。SMB 讀取公開字幕不能寫成影片已觀看；Brad 歷史評論中的 Today 必須對應發布日。後續作者檔第 10 號起須先檢查排序再覆蓋同網址紀錄。
