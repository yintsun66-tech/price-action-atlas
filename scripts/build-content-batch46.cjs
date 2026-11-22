require('./build-content-batch45.cjs');
const fs = require('node:fs');
const path = require('node:path');
const dist = path.join(__dirname, '../dist');
const updatesPath = path.join(dist, 'reading/content-updates.json');
const updates = JSON.parse(fs.readFileSync(updatesPath, 'utf8'));
const entry = {
  "id": "content-batch46-20261122",
  "collected": "2026-11-22",
  "updated": "2026-11-22",
  "timezone": "Asia/Taipei",
  "description": "威科夫圖式與 FVG 回補比例補圖文對照、反例及解答。",
  "articles": [],
  "referencedArticles": [
    "wyckoff-template-uncertainty",
    "ict-event-rates"
  ],
  "sources": [
    "https://articles.stockcharts.com/article/articles-wyckoff-2016-01-secrets-of-point-and-figure-distribution/",
    "https://www.tradingview.com/pine-script-docs/concepts/repainting/"
  ],
  "notes": [
    "31／62 篇深度編排，31 篇待續。",
    "沿用兩張原創圖與同組合成數字。英文實讀範圍及略過來源詳見 docs/content-batch46.md。"
  ]
};
updates.batches = [entry, ...updates.batches.filter(batch => batch.id !== entry.id)];
fs.writeFileSync(updatesPath, JSON.stringify(updates, null, 2) + '\n');

const communityPath = path.join(dist, 'reading/community.json');
const community = JSON.parse(fs.readFileSync(communityPath, 'utf8'));
community.intro = {
  "heading": "保留當時的觀察，分清比例的分母",
  "text": "威科夫圖式與 FVG 回補新增對照與自測。深度編排完成 31／62 篇。",
  "links": [
    {
      "id": "wyckoff-template-uncertainty",
      "label": "相同前五點，兩種後續"
    },
    {
      "id": "ict-event-rates",
      "label": "同三次回補，為何有不同比例"
    }
  ]
};
fs.writeFileSync(communityPath, JSON.stringify(community, null, 2) + '\n');
const htmlPath = path.join(dist, 'index.html');
const index = JSON.parse(fs.readFileSync(path.join(dist, 'reading/index.json'), 'utf8'));
const html = fs.readFileSync(htmlPath, 'utf8');
fs.writeFileSync(htmlPath, html.replace(/<!-- COMMUNITY_LIBRARY_START -->[\s\S]*?<!-- COMMUNITY_LIBRARY_END -->/, require('./render-community.cjs')(community, index)));
