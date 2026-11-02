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

第十四批（2026-10-30）新增兩篇英文來源卡並續讀 PATs 指定問答。作者檔 `zh-core-source-reviews-10.json`；已加入數字排序 helper，基礎檔先讀，再依數字批次覆蓋。最新重建為 `build-content-batch14.cjs` → 翻譯清單 → 中文呈現，驗證為 workspace `tools/check_content_batch14*.cjs`，範圍及略過紀錄見 `docs/content-batch14.md`。新來源卡共 21，不改原 62 篇文章、導航或筆記鍵。


## 2026-10-30｜第十五批：成交語意續譯與閱讀優化

- 實讀 CME Futures Order Types 的四節公開文字、TradingView Bar Magnifier 的正文、週期表與限制；兩筆既有來源由 pending 改為 body-summary，不新增重複網址。
- CME 的委託語意不套用至微台或 Binance；Bar Magnifier 不是逐筆重建，一分鐘內雙觸價的處理另列本站校註。兩頁發布日未確認，影片與程式均未執行。
- 繁中摘要、必要短句、術語及原文連結集中於來源清單；不宣稱全文翻譯。官方規格不是獨立成效評分。
- 新增 reading-comfort.css：中文內文使用本機無襯線字體，維持桌機 22px／手機 20px，精簡標頭空白及英文揭露列；重點粗黑與鍵盤焦點保留。前批提示收折，減少翻譯入口的閱讀負擔。
- 保留 62 個文章檔、68 張原圖、21 張選讀卡、2110 筆原始資源，以及既有筆記、進度與讀者權限。驗證及發布紀錄見 artifacts/content_batch15_2026-10-30/。
- 目前 2359 個英文來源：正文摘要 28、介紹 13、部分 21、授權選段 2、未取得 3、待讀 2292；完整計畫仍未完成。


第十六批（2026-10-31）續譯三篇既有英文正文，另確認一篇只有入口說明而無當日文字報告。作者檔 `zh-core-source-reviews-12.json`，範圍與限制見 `docs/translation-batch16.md`。重建 `build-translation-batch16.cjs` → 翻譯清單 → 中文呈現；驗證為 workspace `tools/check_translation_batch16*.cjs`。翻譯清單更新日可前進，舊來源首次盤點日與原查核紀錄不變。正文摘要累計 31，介紹 14，待讀 2288；其餘狀態與 2359 個網址總數不變。


第十七批（2026-10-31）每日精選新增 Sierra 公開支援串與威科夫測試文章，社群卡共 23，英文來源 2361，正文摘要 33。來源用語差異、未採候選與未核驗範圍詳見 `docs/content-batch17.md`。重建 `build-content-batch17.cjs` → 翻譯清單 → 中文呈現；驗證使用 workspace `tools/check_content_batch17*.cjs`。維持大字、既有原創圖、文章及筆記相容，不另建排程。


第十八批（2026-10-31）擴充兩個既有授權單元，新增 Up-Trend 全小節與 Targets 第三段，共七句逐句中英對照；保持原有譯文區塊與筆記 ID。作者檔 `licensed-batch18.json`，重建 `build-translation-batch18.cjs` → 翻譯清單 → 中文呈現。驗證使用 workspace `tools/check_translation_batch18*.cjs`，必須明列兩個預期文章變更例外，檢查其餘 60 篇及舊中英區塊不變；不得移除原有回歸斷言。固定入口失敗與原頁版本核對、授權範圍詳見 `docs/translation-batch18.md`。


第十九批（2026-10-31）目標 active 後恢復實質翻譯。Targets 小節四段正文與兩行占位文字已完整對照；兩筆核心入口只列介紹，正文摘要仍 33，介紹 16，待讀 2286。新增獨立全文進度 `translation/fulltext-progress.json` 與明確來源完成稽核，完整範圍見 `docs/goal-translation-contract.md`，批次見 `docs/translation-batch19.md`。重建 `build-translation-batch19.cjs` → 翻譯清單（含全文進度）→ 中文呈現；驗證 workspace `tools/check_translation_batch19*.cjs`。不要將恢復狀態或完整小節當成全站達成。其後使用者已清除該目標，不能自行重建。

第二十批（2026-10-31）依新的繼續翻譯要求，擴充支撐壓力與延續反轉兩個既有授權單元，新增十二段正文及三行占位文字。未改其餘 60 篇、所有舊對照區塊、筆記及圖。重建 `build-translation-batch20.cjs` → 翻譯清單 → 中文呈現；驗證 workspace `tools/check_translation_batch20*.cjs`。完整範圍及手機截圖驗證限制見 `docs/translation-batch20.md`；發布一併包含此前尚未上線的第十九批，維持私人權限。


2026-10-31 網站雙地圖：#site-map 為十六個專區入口，#learning-map 為六階段十八篇精讀。原 #map、#plan、十三條閱讀路線與筆記格式保留。enable-chinese-first.cjs 在地圖已安裝時最後自動執行 build-site-maps.cjs，避免後續翻譯回退導覽與閱讀器資產版本。若單獨改地圖，可直接重建；驗證使用 workspace tools/check_site_maps.cjs、check_site_maps_reader.cjs，另保留閱讀回歸。詳見 docs/site-maps.md。

第二十一批（2026-11-01）：`prepare-batch21-reviews.cjs` → `build-content-batch21.cjs` → `build-media-library.cjs --media-only` → 翻譯清單 → 中文呈現。作者檔為 batch21-sources.json、batch21-media.json、licensed-batch21.json、zh-core-source-reviews-15.json。只重建影音以保留書籍區；地圖紀錄原位置更新，避免置頂舊批次。Podcast 實讀逐字稿不等於已聽音訊，YouTube 介紹與直接取得失敗分別登錄；平台評價版本不一致就保留差異、不填統一星等。現有 26 張來源卡、16 影音、2367 英文網址，全文完成仍 0。驗證使用 workspace tools/check_content_batch21*.cjs，範圍與略過見 docs/content-batch21.md；筆記測試只在隔離記憶體進行，不寫入實際使用者狀態。

第二十二批（2026-11-01）：`build-translation-batch22.cjs` → `verify-batch22-coverage.cjs` → 翻譯清單 → 中文呈現；作者檔 licensed-batch22.json，來源快照 docs/sources/batch22-basis-3562704.txt。首筆來源章節教學正文覆蓋稽核綁定固定版本、實讀範圍、排除項、中英區塊雜湊及逐項檢查，只有該章的文字升為 complete-source；圖片、導覽與外鏈另列。全文生成器會拒絕與稽核雜湊不符的內容。保留所有其他來源與 62 個閱讀 ID，驗證用 workspace tools/check_translation_batch22*.cjs。瀏覽器預覽連線異常，本批實際畫面驗證未完成；不以舊截圖作本批證據。範圍與限制見 docs/translation-batch22.md。

第二十三批（2026-11-01）：`build-content-batch23.cjs` → 翻譯清單 → 中文呈現。作者檔 batch23-sources.json、batch23-practice.json；實讀紀錄 zh-core-source-reviews-16.json。三個既有 pending 網址實讀後改正文摘要，來源總數不增；29 張卡、38 正文摘要、2283 待讀。摘要不增加全文完成數。新增自編練習只附在原三個單元尾端，舊節、題目、原文與筆記格式保留。選讀標題用「新增選讀」分清卡片與來源網址。驗證用 workspace tools/check_content_batch23*.cjs，來源、限制與瀏覽器恢復驗證見 docs/content-batch23.md。


第二十四批（2026-11-01 蒐集，2026-11-02 接續發布）：build-content-batch24.cjs → 翻譯清單 → 中文呈現；作者檔 batch24-sources.json、batch24-practice.json，實讀紀錄 zh-core-source-reviews-17.json。只新增一篇未收錄的 Sierra 公開支援串與一節原創滾動算例；歷史修正、現行版本及計算定義分開。Reddit 未取得完整回覆與其他未採候選明列範圍，不說成沒有新文。驗證使用 workspace tools/check_content_batch24*.cjs，範圍見 docs/content-batch24.md。原查核與蒐集日期保留，發布日期另記。
