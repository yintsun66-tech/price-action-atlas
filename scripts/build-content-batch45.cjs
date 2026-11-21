require('./build-content-batch44.cjs');
const fs = require('node:fs');
const path = require('node:path');
const dist = path.join(__dirname, '../dist');
const articlePath = path.join(dist, 'reading/articles/pp2-target-trailing.json');
const article = JSON.parse(fs.readFileSync(articlePath, 'utf8'));
const example = article.sections[2].paragraphs[0];
const before = '若 A 在 108 觸發目標後退出，而 B 後續創高至 113，再於追蹤停損 107 附近退出，忽略費用時 A 得 8、B 得 7。';
const after = '本算例假設 A 的目標成交價是 108，B 創高至 113 後以指定的 107 退出，扣費前每單位價格損益分別為 8 與 7。';
article.sections[2].paragraphs[0] = example.replace(before, after);
fs.writeFileSync(articlePath, JSON.stringify(article) + '\n');

const updatesPath = path.join(dist, 'reading/content-updates.json');
const updates = JSON.parse(fs.readFileSync(updatesPath, 'utf8'));
const entry = {
  "id": "content-batch45-20261121",
  "collected": "2026-11-21",
  "updated": "2026-11-21",
  "timezone": "Asia/Taipei",
  "description": "固定目標與追蹤停損新增同進場對照及更新時點練習。",
  "articles": [],
  "referencedArticles": [
    "pp2-target-trailing"
  ],
  "sources": [
    "https://www.adamhgrimes.com/trailing-stops-9-ideas-you-can-use-today/"
  ],
  "notes": [
    "29／62 篇深度編排，33 篇待續。",
    "沿用原圖，明示 108 與 107 為合成成交價。",
    "複讀既有英文作者正文。Sierra Chart 候選原頁擷取失敗，詳見 docs/content-batch45.md。"
  ]
};
updates.batches = [entry, ...updates.batches.filter(batch => batch.id !== entry.id)];
fs.writeFileSync(updatesPath, JSON.stringify(updates, null, 2) + '\n');

const communityPath = path.join(dist, 'reading/community.json');
const community = JSON.parse(fs.readFileSync(communityPath, 'utf8'));
community.intro = {
  "heading": "同一個進場，怎麼比較兩種出場？",
  "text": "固定目標與追蹤停損新增對照與自測。深度編排完成 29／62 篇。",
  "links": [
    {
      "id": "pp2-target-trailing",
      "label": "重算出場價與追蹤停損"
    }
  ]
};
fs.writeFileSync(communityPath, JSON.stringify(community, null, 2) + '\n');
const htmlPath = path.join(dist, 'index.html');
const index = JSON.parse(fs.readFileSync(path.join(dist, 'reading/index.json'), 'utf8'));
const html = fs.readFileSync(htmlPath, 'utf8');
fs.writeFileSync(htmlPath, html.replace(/<!-- COMMUNITY_LIBRARY_START -->[\s\S]*?<!-- COMMUNITY_LIBRARY_END -->/, require('./render-community.cjs')(community, index)));
