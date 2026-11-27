require('./build-content-batch47.cjs');
const fs = require('node:fs');
const path = require('node:path');
const dist = path.join(__dirname, '../dist');
const id = 'community-failed-followthrough';
const date = '2026-11-27';
const figurePath = path.join(dist, 'images/study', id + '-path.svg');
const figure = fs.readFileSync(figurePath, 'utf8');
fs.writeFileSync(figurePath, figure.replace('x="85" y="434"', 'x="85" y="454"'));

const updatesPath = path.join(dist, 'reading/content-updates.json');
const updates = JSON.parse(fs.readFileSync(updatesPath, 'utf8'));
const entry = {
  id: 'content-batch48-20261127',
  collected: date, updated: date, timezone: 'Asia/Taipei',
  description: '突破失敗教材新增同圖四個時點的對照、缺資料反例及自測。',
  articles: [], referencedArticles: [id],
  sources: ['https://www.adamhgrimes.com/breakouts-and-breakout-failures-real-world-trading/'],
  notes: ['32／62 篇深度編排，30 篇待續。指定範圍查核和來源取捨見 docs/content-batch48.md。']
};
updates.batches = [entry, ...updates.batches.filter(batch => batch.id !== entry.id)];
fs.writeFileSync(updatesPath, JSON.stringify(updates, null, 2) + '\n');
