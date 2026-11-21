require('./build-content-batch42.cjs');
const fs = require('node:fs');
const path = require('node:path');
const dist = path.join(__dirname, '../dist');
const updatesPath = path.join(dist, 'reading/content-updates.json');
const updates = JSON.parse(fs.readFileSync(updatesPath, 'utf8'));
const entry = {
  "id": "content-batch43-20261121",
  "collected": "2026-11-21",
  "updated": "2026-11-21",
  "timezone": "Asia/Taipei",
  "description": "棒內雙觸價教材新增順序對照表、持倉反例與自測。",
  "articles": [],
  "referencedArticles": [
    "pp2-intrabar-path"
  ],
  "sources": [
    "https://www.tradingview.com/support/solutions/43000669285-what-is-bar-magnifier-backtesting-mode/"
  ],
  "notes": [
    "27/62 篇深度編排，35 篇待續。",
    "重讀 TradingView 官方公開說明的低週期對照、進出場示例與資料上限。原案例與原圖價位沿用。",
    "已有來源直接複核，無新增來源卡。詳見 docs/content-batch43.md。"
  ]
};
updates.batches = [entry, ...updates.batches.filter(batch => batch.id !== entry.id)];
fs.writeFileSync(updatesPath, JSON.stringify(updates, null, 2) + '\n');

const communityPath = path.join(dist, 'reading/community.json');
const community = JSON.parse(fs.readFileSync(communityPath, 'utf8'));
community.intro = {
  heading: '同一根 K 棒內，哪個價位先到？',
  text: '棒內雙觸價新增順序對照與練習。深度編排完成 27／62 篇。',
  links: [{ id: 'pp2-intrabar-path', label: '比較兩條相同開高低收的路徑' }]
};
fs.writeFileSync(communityPath, JSON.stringify(community, null, 2) + '\n');
const htmlPath = path.join(dist, 'index.html');
const index = JSON.parse(fs.readFileSync(path.join(dist, 'reading/index.json'), 'utf8'));
const html = fs.readFileSync(htmlPath, 'utf8');
fs.writeFileSync(htmlPath, html.replace(/<!-- COMMUNITY_LIBRARY_START -->[\s\S]*?<!-- COMMUNITY_LIBRARY_END -->/, require('./render-community.cjs')(community, index)));
