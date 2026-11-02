# Price Action Atlas 維護規則

- 回覆與教材使用繁體中文；研究包含英文原始來源。未授權的公開文章只提供適量摘要與必要短句，不完整翻譯或重刊全文。已核對開放授權的選段保留原文、譯文、署名與授權。
- Brooks 引用依官方公開課綱核對 Main／Forex、單元編號、中文主題與連結；原始出處與相關補讀分列，不能聲稱看過未取得的付費課。
- 主要儲存庫為 https://github.com/yintsun66-tech/price-action-atlas ，Git remote 名稱 github。主要網站為 https://yintsun66-tech.github.io/price-action-atlas/ 。使用者於 2026-11-02 明確同意 GitHub 與 Pages 公開。舊 Sites 網站及 .openai/hosting.json 僅作歷史保留；不要把日後更新發到舊 Sites，也不要刪除舊站。
- 每次實質更新都要升版並在回覆附版本號。依 docs/versioning.md 更新 VERSION、package.json、release.json、CHANGELOG.md 與 dist/version.json；新教材或功能升 minor，修正升 patch，不相容變更升 major。
- 保留既有文章 ID、來源查核日期、授權範圍、筆記鍵及備份格式。使用者筆記不可放到 GitHub；換網域的 localStorage 不能宣稱已自動搬移。
- 先讀 docs/daily-content-workflow.md，去重並實讀來源，記錄採用、略過、失敗及範圍。摘要不當成全文完成，投票不當獲利證明，原創練習不冒充作者參數。
- 最新教材生成器由 release.json 的 contentBuild 指定。完成內容生成後執行 npm run build、npm test，檢查重建穩定、預覽與子路徑資產。不要重跑會回退內容的歷史生成器。
- 發布使用 main 與不可覆寫的 vX.Y.Z 標籤。GitHub Pages 僅部署與檔內版本相符且高於所有先前版本的標籤；成功部署後建立 GitHub Release。確認 Actions 與線上版本成功才稱已上線。
- 不另建排程、不執行交易。每日既有工作沿用相同發布版本規則。
