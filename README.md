# Price Action Atlas · 閱讀庫

2026-10-29 全站繁中計畫實作中：62 個閱讀單元完成站內用語盤點，預設中文、英文可展開；建立 2,328 個去重英文來源的處理清單。第一批核心實讀含 7 篇正文摘要、3 個介紹摘要及 3 個取得失敗紀錄，並保留既有選段；尚有來源待處理，沒有宣稱全站英文來源已翻完。詳見 `docs/fullsite-translation.md`，重建與驗證須使用該文件所列最新入口。

2026-10-28 圖解與流派擴充：全庫54篇皆附整理圖，共60張原創SVG；新增威科夫、ICT、訂單流與橫向比較12篇、36題測驗。提供同圖觀點切換及依市場／資料層的研究規劃。詳見 `docs/schools-and-figures.md`。

2026-10-28 機率情境校註：新增 18 項原典／數值註記與可搜尋的機率專區，24 篇文章建立情境對照、16 處直接相關段落加入文旁標註，42 篇皆有機率註記分頁。保留 Brooks 的條件、估計事件與近似語氣；自編數字另列，不作微台或 BTC 實測值。詳見 `docs/probability-annotations.md`。

2026-10-28 第三批實作教材：新增 8 篇繁中原創導讀、24 題測驗與 3 個自編逐根圖例。補充條件機率、勝率不確定性、研究登記、委託成交、市場時鐘、訪談筆記、標記一致性與拒絕清單。新內容已連回相關影音，詳見 `docs/reading-library-batch3.md`。

2026-10-27 影音與書籍更新：新增 `#media` 的 14 筆影片／圖解／Podcast 入口，以及 `#books` 的 11 本作品與 1 組 PDF 課程書。提供中文摘要、來源、評價快照、推薦順序及站內文章連結。以 `node scripts/build-media-library.cjs` 重建靜態專區；詳見 `docs/media-library-update.md`。

目前累積 56 篇繁體中文原創導讀與 6 篇開放教材的指定範圍中英對照，共 62 個閱讀單元、68 張原創整理圖、9 個自編逐根圖例及 123 題測驗，維持原私人網站與 48 項學習任務。

## 檔案
- `dist/index.html`：網站骨架；沿用大字與粗黑重點。
- `dist/atlas.css`、`dist/atlas.js`：既有學習計畫、導師、評選與資源庫。
- `dist/data/core.js`：初次所需的 143 個來源與完整學習計畫。
- `dist/data/resources-archive-*.json`：其餘 1,967 個索引，按需載入並還原原順序。
- `dist/reading/index.json`：62 個閱讀單元的輕量目錄。
- `dist/reading/articles/*.json`：分篇內容、來源範圍、授權與版本。
- `dist/reader.js`、`dist/reader-state.js`、`dist/reader.css`：閱讀、收藏、筆記及備份。
- `dist/reader-practice.js`、`dist/reader-practice.css`：自編逐根 K 線圖例與測驗，不使用即時行情。
- 目錄支援主題與批次篩選、十二條閱讀路線。圖例與測驗的作答暫留本次頁面，不作績效、實盤資格或已讀評分。

## 內容更新
更新文章 JSON 後，同步目錄的標題、摘要與標籤。ID 應保持不變，讓書籤與已讀紀錄繼續生效。一般來源使用 `mode: guide`，不得因公開可讀就加入全文譯文。只有確認授權範圍的內容才能提供 `translation` 與完整 `license`、固定來源版本、修改及署名資料。

Brooks 課程對照須有 Main／Forex 版本、單元編號、中文主題、官方網址及「確定出處／相關主題補讀」關係。第一批使用 Main 12A、15A、33A；第二批另核對 15B、16D、18A、15F、09A、22A，均作相關補讀，未重建付費課。

## 筆記與存取
原學習計畫仍使用 `price-action-atlas-v1`；新閱讀紀錄使用獨立的 `price-action-atlas-reader-v1`。兩者都只存於當前瀏覽器，沒有跨裝置同步。閱讀庫匯入只接受自己的備份格式，差異筆記合併而不覆蓋；合併超長時整次拒絕。儲存失敗會提示先匯出。

網站持續 owner-private。CC BY-SA 4.0 僅適用所列節譯頁與該頁新增內容，並不涵蓋網站其他教材或程式。該頁可下載包含署名的 JSON 重用檔，沒有保存使用者筆記。

## 第二批驗證（2026-10-27）
- 36 項非瀏覽器檢查通過：資料完整性、分篇與分頁渲染、深連結、筆記保留、錯誤狀態、索引重試等。
- 47 個本機 HTTP 檢查通過，暫時測試伺服器已停止。
- 原 2,110 個索引物件與 48 項任務內容雜湊一致。
- 瀏覽器工具曾拒絕預覽目標，未改走其他瀏覽器方式；桌面與 390px 手機的實際視覺及觸控驗收仍未確認。已做響應式來源檢查，不把它當成實際瀏覽器驗收。

本輪未啟用資料庫、檔案儲存、付費擴容或自動爬取。全部靜態內容約 2.23 MB，首頁 HTML 約 36 KB；這些是未壓縮檔案大小，並非線上傳輸量或 Sites 合約配額。


第二批校對日期：2026-10-27（台北）。來源與範圍詳見 docs/research-brooks-batch2.md、docs/research-priority-batch2.md。原 21 篇文章位元組、資源索引及原有任務程式未變更。

第六批（2026-10-28）：新增社群與新文專區，含 8 篇來源選讀、短句翻譯、評價與限制，另有 2 篇原創導讀。以 `node scripts/build-community-library.cjs` 重建；每日更新規則見 docs/daily-content-workflow.md。

第七批（2026-10-29）：新增 5 筆英文來源選讀，共 13 筆；新讀涵蓋威科夫圖式、ICT 風格腳本的事件比例、TradingView 重繪文件及 Bookmap 公開教材。新增 2 篇原創導讀與 1 篇 Wikibooks Targets 指定選段的 CC BY-SA 中英對照、3 張原創圖及 9 題。以 `node scripts/build-content-batch7.cjs` 重建最新批次；共用來源卡渲染器為 `scripts/render-community.cjs`。舊卡保留原查核日期，不改標為本日新文。最新檢查入口在 workspace 的 `tools/check_content_batch7*.cjs`。

全站繁中第二個檢查點（2026-10-29）：11 筆核心來源依實際正文／介紹／部分範圍加入繁中摘要，累積 9 篇正文摘要；來源清單擴至 2,350 個網址。62 篇文章及既有筆記保留。接續規則與未完成範圍見 docs/fullsite-translation.md。

第八批（2026-10-30）：新增三筆可追溯來源卡，續讀核心／既有英文資料，正文摘要累積 12 筆；新增逐篇中英術語快查與前置翻譯進度。重建順序 batch8 → translation ledger → chinese-first。使用者的長期品質目標見 docs/learner-quality-roadmap.md。

核心翻譯第九批（2026-10-30）：七筆既有來源續讀，新增五篇正文摘要，累積 17 筆；Brooks 六詞條與臺灣當沖論文仍明列部分範圍。繁中短句先讀、英文可展開，原作者主張與本站校註分列。重建順序 batch9 → translation ledger → chinese-first；清單 2,355 個網址，完整計畫仍未完成。

第十批（2026-10-30）：新增兩篇英文及一篇繁中原作者選讀，附既有原創搭配圖；續譯 Brooks 六項詞條與臺灣論文門檻敏感性／結語。社群卡共 19，英文來源清單共 2,357，正文摘要紀錄 19；全站仍在逐筆處理。重建 batch10 → translation ledger → chinese-first，驗證入口與未完成範圍見 docs。

第十一批（2026-10-30）：Woods、Fuller 兩筆既有英文來源補上正文摘要，累積 21 筆；文章改為專注單欄與收合目錄，保留原文及筆記。

第十二批（2026-10-30）：保留十二條路線並新增入門四篇，提供路線選擇、下一篇未讀及逐篇任務。Brooks 指定詞條累計十八項，兩個 MarketLife 課程只完成公開介紹。英文來源 2,357：21 正文、13 介紹、2,298 待讀，其餘範圍分列。最新重建為 learning batch12 → translation ledger → chinese-first，說明見 `docs/learning-navigation.md`，驗證為 workspace `tools/check_learning_batch12*.cjs`。

第十三批（2026-10-30）：兩篇 Brad 歷史分析與一篇 SMB 公開字幕選讀，文字正文摘要累計 24 筆；50% 回檔位置、50/50 主觀說法與統計勝率分開。既有文章、圖、路線及筆記保留。重建為 translation batch13 → translation ledger → chinese-first，驗證為 workspace `tools/check_translation_batch13*.cjs`，範圍見 `docs/translation-batch13.md`。

第十四批（2026-10-30）：新增 Grimes、Woods 兩篇英文舊文選讀，續讀 PATs 問答；來源卡共 21，英文網址 2,359，正文摘要 26，部分摘要 21。作者紀錄改按數字批次排序，既有文章、導航、來源紀錄與筆記保留。最新重建為 content batch14 → translation ledger → chinese-first，驗證為 workspace `tools/check_content_batch14*.cjs`，範圍見 `docs/content-batch14.md`。


第十七批（2026-10-31）：每日新選讀加入 Sierra 資料／欄位支援串與威科夫測試的來源校讀，共 23 張來源卡、2361 個英文網址、33 筆正文摘要。保留第十五批閱讀優化及第十六批的三篇續譯與一筆介紹範圍。未完成清單、舊來源日期及筆記相容性保留；詳見 `docs/content-batch17.md`。


第十八批（2026-10-31）：續譯兩處已授權選段，共七句完整中英對照，新增摘要、來源及語氣校註。原有 62 個閱讀 ID 保留，原文可逐句展開，帶署名與授權的下載沿用；完整範圍見 `docs/translation-batch18.md`。


第十九批（2026-10-31）：恢復全站繁中目標；完成 Targets 小節文字，保留舊中英對照，續讀兩個核心介紹。全文完成與正文摘要分開統計，完整說明及驗證入口見 `docs/translation-batch19.md`。

第二十批（2026-10-31）：續譯原章第二個支撐壓力小節、Patterns 父節與 K 線子節，共十二段正文與三行占位文字；保留原文、舊譯與校註。兩個既有單元擴充，62 個 ID、68 張圖及筆記相容性保持。全文進度不冒充整頁完成。最新重建及驗證見 `docs/translation-batch20.md`。原 Goal 已由使用者清除，本批依新的翻譯請求執行。

網站雙地圖（2026-10-31）：新增 `#site-map` 的十六個用途入口及 `#learning-map` 的六階段十八篇精讀。顯示下一篇未讀與練習成果，沿用原閱讀紀錄；首頁更新收合、閱讀頁可返回地圖。原文章、筆記、四十八項任務與十三條路線保留。重建、驗證及限制見 `docs/site-maps.md`。

第二十一批（2026-11-01）：新增 Grimes 型態文章、LYOP E48 官方逐字稿摘要與 Brooks 公開訪談介紹，來源卡二十六張、影音十六個；Wikibooks 續譯三段正文及十一列型態原表，英文可展開。英文來源 2367，正文摘要 35，未把未取得的 YouTube 字幕列完成。使用 media-only 重建避免回退書籍區；完整範圍、驗證與略過紀錄見 `docs/content-batch21.md`。
