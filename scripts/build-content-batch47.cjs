require('./build-content-batch46.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const renderCommunity = require('./render-community.cjs');
const dist = path.join(__dirname, '../dist');
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const write = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
const date = '2026-11-25';
const id = 'flow-footprint';
const sourceId = 'tv-footprint-data-method';
const official = 'https://www.tradingview.com/support/solutions/43000726164-volume-footprint-charts-a-complete-guide/';
const announcement = 'https://www.tradingview.com/blog/en/tick-based-calculations-footprint-volume-delta-cvd-62523/';
const summary = 'TradingView 預設依棒內價格方向分類成交量。啟用逐筆模式後，優先使用資料提供的主動成交方向，缺少時依報價或逐筆價格變動推定。圖表狀態列顯示使用的方法。';
const scope = '複核官方說明的彙總、成交量分類、逐筆計算與資料涵蓋段落，並閱讀功能公告；未實機比對圖表或商品行情。';
const dateNote = '官方動態說明，發布與修訂確日未確認。2026-11-04 初讀，2026-11-25 複核逐筆模式。';

const articlePath = path.join(dist, 'reading/articles', id + '.json');
const article = read(articlePath);
const section = article.sections.find(section => section.heading.startsWith('八、'));
const alreadyRevised = section.paragraphs[2] === summary;
if (!alreadyRevised) assert.match(section.paragraphs[2], /TradingView 官方指定段落/);
section.paragraphs.splice(2, alreadyRevised ? 3 : 1, summary,
  '比較前先記商品、分類方法、涵蓋時段、價位列寬和門檻。逐筆資料若不足以涵蓋整個時段，足跡圖可從第一筆可用成交開始計算。TradingView 的成交量分布（Volume Profile）與 Pine 的 request.footprint() 仍採預設彙總口徑。',
  '自測｜圖上的 100 價位 Ask 30、99 價位 Bid 10，對角比是三倍。若另一張圖採預設彙總，兩圖的三倍能直接當成同一個逐筆事件嗎？不能。比值只說明各自的分子是分母三倍。對照既有圖解，先核對 30 和 10 分別來自哪一欄，以及兩圖怎麼把成交量分到該欄。');
const source = article.sources.find(source => source.url === official);
if (!article.contentRevisions.some(revision => revision.id === 'content-batch47')) {
  article.contentRevisions.push({
    id: 'content-batch47', date, note: '補充逐筆分類、涵蓋範圍及三倍比率的自測。',
    priorSourceCheck: source.checked, priorSourceAccess: source.access, priorSourceScope: source.scope
  });
}
Object.assign(source, {checked: date, access: scope});
article.revision = date;
write(articlePath, article);

const communityPath = path.join(dist, 'reading/community.json');
const community = read(communityPath);
const card = community.items.find(card => card.id === sourceId);
Object.assign(card, {summary, access: scope, checked: date, dateNote});
card.quote.context = '這句描述預設彙總模式。逐筆模式的優先順序與回退條件見同一官方文件。';
card.review.learning = '比較圖表前記下狀態列的分類方法與資料涵蓋區間。';
community.checked = date;
community.intro = {
  heading: '比較足跡圖前，先看資料如何分類',
  text: '用既有三價位圖解練習辨別彙總與逐筆模式。',
  links: [{id, label: '讀足跡圖分類與自測'}]
};
write(communityPath, community);

const reviewsPath = path.join(__dirname, 'zh-core-source-reviews-19.json');
const reviews = read(reviewsPath);
const review = reviews.find(review => review.resourceId === 'source-b26-' + sourceId);
Object.assign(review, {checked: date, dateNoteZh: dateNote, readScope: scope, summaryZh: summary,
  keyPointsZh: [card.review.learning]});
review.shortExcerpt.scope = card.quote.context;
review.evidence.urls = [official, announcement];
review.evidence.scope = scope;
write(reviewsPath, reviews);

const indexPath = path.join(dist, 'reading/index.json');
const index = read(indexPath);
index.revision = date;
write(indexPath, index);
const htmlPath = path.join(dist, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
fs.writeFileSync(htmlPath, html.replace(/<!-- COMMUNITY_LIBRARY_START -->[\s\S]*?<!-- COMMUNITY_LIBRARY_END -->/, renderCommunity(community, index)));

const updatesPath = path.join(dist, 'reading/content-updates.json');
const updates = read(updatesPath);
const entry = {
  id: 'content-batch47-20261125',
  collected: date, updated: date, timezone: 'Asia/Taipei',
  description: '更新足跡圖教材、來源卡及繁中摘要的 TradingView 分類說明。',
  articles: [], referencedArticles: [id], sources: [official, announcement],
  notes: ['同一張三價位原創圖新增讀圖自測。來源選讀與去重結果見 docs/content-batch47.md。']
};
updates.batches = [entry, ...updates.batches.filter(batch => batch.id !== entry.id)];
write(updatesPath, updates);
