# 版本與 GitHub Pages 發布

自 2026-11-02 起，主要原始檔與發布平台為 GitHub。首版 v1.0.0 保留既有 35 次提交及教材批次；歷史內容日期不追溯改寫。

- 網站：https://yintsun66-tech.github.io/price-action-atlas/
- 原始檔：https://github.com/yintsun66-tech/price-action-atlas
- 發布紀錄：https://github.com/yintsun66-tech/price-action-atlas/releases
- 內容為公開網站；個人筆記、進度、帳戶憑證與備份檔不得上傳儲存庫。

## 每次更新的版本

採三段版本 X.Y.Z：新增教材或功能升 minor，例如 v1.1.0；翻譯、排版或連結修正升 patch，例如 v1.0.1；不相容的資料或功能變更升 major，例如 v2.0.0。所有對使用者發布的變更均需新版本，同時更新網站標示、紀錄與 Git 標籤。文內查核日、文章來源日及 contentEdition 仍分開保存，不能以版本日期掩蓋舊文。

VERSION 是發版版本，release.json 是日期、當版說明與最新教材生成器，package.json 與 dist/version.json 必須一致。標籤不可移動或覆寫。npm 的 private:true 僅防止誤發布到 npm，不表示 GitHub 儲存庫私人。

## 維護步驟

1. 讀 AGENTS.md 與每日流程，先同步 github/main；實際讀取並去重，編輯教材與作者檔。
2. 新內容批次完成後，將 release.json 的 contentBuild 改為本批生成器；若無新批次則維持原值。舊生成器中寫死的歷史日期不要改為今日。
3. 例如執行 `npm run version:minor -- --summary "新增兩篇來源摘要與練習"`。修正則用 version:patch。補齊 release.json notes 與 CHANGELOG.md 的當版項目。
4. 執行 `npm run build`、`npm test`，確認再次 build 不改變產物；另做必要的閱讀器與瀏覽器驗證。build 會先跑指定教材批次，再產生翻譯清單、中文呈現與版本標示。請勿只從歷史批次全量重建。
5. 提交全部必要作者檔、文件及 dist，推送 main；Actions 的主分支驗證通過後，建立不可覆寫的 `vX.Y.Z` 標籤並推送。Git remote 為 github。
6. 標籤流程核對版本與遞增關係、重建網站、執行檢查，再由 Pages artifact 部署 dist。成功後自動建立同版本 GitHub Release。未成功前不得稱已上線，失敗後保留版本與日誌並修正；已公開版本的修正另升 patch。
7. 檢查線上 version.json、閱讀入口與來源展開，回覆附版本號、網站及必要的更新重點。

## 筆記移轉

localStorage 依網域與瀏覽器分開。舊 ChatGPT Sites 網站不會自動轉移進度。由舊站「匯出進度備份」，到 GitHub Pages 的「匯入備份」；閱讀器的筆記另沿用原有備份入口。不要把備份交給公開儲存庫。保留既有 price-action-atlas-v1、price-action-atlas-reader-v1 格式，搬移不重寫使用者紀錄。

舊 Sites 網站與 .openai/hosting.json 保留作歷史備援，不再作每日更新發布目標。未設定舊站自動重新導向，也未刪除舊站。

GitHub Pages 流程依英文官方文件核對：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages 。本文是操作說明，不涉及教材勝率或成效評價。
