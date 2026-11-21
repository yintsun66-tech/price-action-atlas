require('./build-content-batch43.cjs');
const fs = require('node:fs');
const path = require('node:path');
const dist = path.join(__dirname, '../dist');
const articlePath = path.join(dist, 'reading/articles/pp2-time-exit.json');
const article = JSON.parse(fs.readFileSync(articlePath, 'utf8'));
const section = article.sections.find(section => section.heading.endsWith('三種退出不能互相抵銷'));
section.paragraphs[0] = section.paragraphs[0].replace(
  '從未收在 102 以上，且最新收盤回到 99.5 以下',
  '前三根收盤都低於 102，且第三根收盤低於 99.5'
);
fs.writeFileSync(articlePath, JSON.stringify(article, null, 2) + '\n');

const updatesPath = path.join(dist, 'reading/content-updates.json');
const updates = JSON.parse(fs.readFileSync(updatesPath, 'utf8'));
const entry = {
  "id": "content-batch44-20261121",
  "collected": "2026-11-21",
  "updated": "2026-11-21",
  "timezone": "Asia/Taipei",
  "description": "時間退出教材補齊計時、門檻與成交例題。",
  "articles": [],
  "referencedArticles": [
    "pp2-time-exit"
  ],
  "sources": [
    "https://www.adamhgrimes.com/a-few-trading-rules/"
  ],
  "notes": [
    "28／62 篇完成深度編排，34 篇待續。",
    "明定恰好收 102 達進展門檻，等於 99.5 則不符合本例的早退條件。",
    "英文作者原文複核、公開社群略過理由與 PTT 取得失敗見 docs/content-batch44.md。"
  ]
};
updates.batches = [entry, ...updates.batches.filter(batch => batch.id !== entry.id)];
fs.writeFileSync(updatesPath, JSON.stringify(updates, null, 2) + '\n');

const communityPath = path.join(dist, 'reading/community.json');
const community = JSON.parse(fs.readFileSync(communityPath, 'utf8'));
community.intro = {
  heading: '第六根收線後，退出以哪個價格計算？',
  text: '時間退出新增計時對照與自測。深度編排完成 28／62 篇。',
  links: [{ id: 'pp2-time-exit', label: '練習判斷到期、停損與成交' }]
};
fs.writeFileSync(communityPath, JSON.stringify(community, null, 2) + '\n');
const htmlPath = path.join(dist, 'index.html');
const index = JSON.parse(fs.readFileSync(path.join(dist, 'reading/index.json'), 'utf8'));
const html = fs.readFileSync(htmlPath, 'utf8');
fs.writeFileSync(htmlPath, html.replace(/<!-- COMMUNITY_LIBRARY_START -->[\s\S]*?<!-- COMMUNITY_LIBRARY_END -->/, require('./render-community.cjs')(community, index)));
