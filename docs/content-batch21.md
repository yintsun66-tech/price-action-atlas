# 第二十一批：型態分類、執行落差與影音選讀

查核及編輯日期：2026-11-01（Asia/Taipei）。依使用者要求繼續翻譯、搜尋文章、Podcast 與 YouTube；沿用私人網站，不重建已清除 Goal、不新增排程、不執行交易。

## 實讀來源與範圍

1. Adam H. Grimes，Fundamental Trading Patterns：<https://www.adamhgrimes.com/fundamental-trading-patterns/>。實讀五類型態的完整公開文字：簡單／複雜回檔、失敗測試、Anti 與突破；五張原圖未核驗，未讀付費教材。提供繁中精簡摘要與六詞短句，不搬用完整正文或來源圖。公開正文未列可確認發布日，保持 null；新收錄不等於新發表。未取得獨立教學評分，網站商業教育背景與績效證據分列。
2. Dave Mabe、Michael Nauss，Line Your Own Pockets E48，Your Backtest Looks Great - What Could Possibly Go Wrong?：<https://lineyourownpockets.com/episodes/your-backtest-looks-great-what-could-possibly-go-wrong>。官方發布 2025-07-07、片長 52:52；研究協作實讀官方公開逐字稿 00:00–52:46，主編再核對官方資料及短句所在段落。未播放或收聽音訊。繁中摘要著重逐筆核對預期與實際交易、漏單、成本與執行偏差；六詞短句的 09:21 是稿內標記，未核對音軌。股票案例、主持人商業背景與成效證據分開。原稿：<https://lineyourownpockets.com/episodes/your-backtest-looks-great-what-could-possibly-go-wrong/transcript>。
3. BTC Admin，UKSpreadBetting webinar: Price action trading with Al Brooks：<https://www.brookstradingcourse.com/price-action/ukspreadbetting-webinar-al-brooks/>。官網介紹發布 2022-06-06，稱訪談於 2022 年 5 月舉行、約一小時二分。只讀介紹、播放入口與公開留言；未取得影片或字幕。官方連出的 YouTube：<https://www.youtube.com/watch?v=91h0Dw9jwQ0>。直接 watch 與 embed 本次均取得失敗；官方介紹列 intro-only，YouTube 本身列 unavailable，不把介紹當成影片正文。未填目前觀看數或獨立評分。Main 共用基礎 15A「突破」、33A「保護停損」只作已核對公開課綱的相關補讀，不當成訪談原課出處。
4. Apple Podcasts US 節目頁：<https://podcasts.apple.com/us/podcast/line-your-own-pockets/id1762640188>。本次直接取得版本為 5.0／14 則，搜尋快照另顯 4.9／15 則；未統一成評分，rating 保持 null。這是節目層級與時間／快取版本限制，不能當成 E48 獨立成效或獲利證明。

## 授權翻譯續作

再次實讀 Wikibooks Technical Analysis／Patterns 公開正文及頁尾，固定版本 4351762；Copyrights 頁頁尾 4622060 核對 CC BY-SA 4.0、署名與相同方式分享。只使用文字，未重用原圖。

`licensed-continuation-reversal` 加入章首三段、型態表引介一段標題及十一列表格，作者檔為 `licensed-batch21.json`。新增正文三段、標題一個、表格一份，原有二十個中英區塊順序與文字完全保留；現有正文十六段、標題五個。中文優先，英文表格另行展開。

保留表中重複的 Ascending Triangle、原拼字 3 Raising Valleys；Minor Top、Scallop 等未定義詞不補造精確交易規則。原文 assumes、may、unlikely 的假設／可能語氣保留，不移植 Brooks 主觀機率。註明圖形分類不保證走勢或提供樣本外統計。整章尚未核發全文完成。

## 去重、略過與失敗

- Woods「Price Action Trading Strategies」已於第十六批實讀，不新增卡或重算完成。
- NY Fed／Macro Musings 債市結構候選與本批型態、執行主題較遠，未為增加數量收錄。
- YouTube 正式頁與 embed 取得失敗，保留入口、失敗與未看字幕範圍；不記成沒有新片。
- 未使用權利未明的書籍 PDF、第三方影片鏡像或完整商業逐字稿搬運。

## 內容與兼容性

新增三張選讀卡、兩個影音入口（p07、v07）；舊二十三張卡、十四個影音物件保留。現為二十六張卡、十六個影音入口（影片七、視覺教材二、Podcast 七）。搭配既有原創合成圖，標示非原作者圖、非真實行情或績效，不虛增圖數。

維持六十二個閱讀 ID、六十八張 SVG、十三條路線、雙地圖、四十八項任務及兩個既有筆記鍵。其餘六十一篇文章及全部圖、閱讀器、狀態 helper、地圖資產位元組保留；沒有寫入實際使用者筆記或已讀狀態。

英文來源網址 2367：正文摘要 35、介紹 19、部分摘要 21、授權選段來源 2、取得失敗 4、待讀 2286。新增六筆來源紀錄分別依實際讀取範圍登錄。獨立全文進度仍為 0 整來源完成、2 選段來源、6 雙語單元；不以新增表格或摘要冒充全站完成。

## 重建與驗證

依序執行：

```text
node scripts/prepare-batch21-reviews.cjs
node scripts/build-content-batch21.cjs
node scripts/build-media-library.cjs --media-only
node scripts/build-translation-ledger.cjs
node scripts/enable-chinese-first.cjs
```

`--media-only` 只重建影音區，保留既有書籍區和原介紹；新卡可提供獨立來源連結標籤與課程存取說明，避免沿用免費 12A 樣片說明。地圖生成器改為原位置更新自己的歷史紀錄，不讓舊地圖更新跳到最新批次之前。資產版本為 `20261101c21`。

workspace `tools/check_content_batch21*.cjs` 保留既有回歸，另核對新來源、原文表格、授權、舊文章／影音／來源物件、地圖與筆記相容。43 項資料檢查、73 項隔離記憶體閱讀器檢查、9 項來源與保留檢查、200 檔 HTTP 與重建一致性檢查通過。實際瀏覽器確認 Podcast 範圍、影片介紹與課程關係、原文表格展開、Grimes 來源揭露及無 console error；390px 下頁面無水平溢出，中文／英文表格約 331／306px，手機截圖已檢視。未在使用者瀏覽器寫入筆記進行測試。

驗證、截圖、略過與部署證據存於 workspace `artifacts/content_batch21_2026-11-01/`；發布結果以 native Sites 成功回傳為準。原私人讀者權限保留。
