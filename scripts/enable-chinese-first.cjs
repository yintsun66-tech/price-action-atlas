/* Reproducible presentation-only migration. Original learning data and IDs are untouched. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dist=path.resolve(__dirname,'../dist'),read=f=>fs.readFileSync(path.join(dist,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(dist,f),s);
function patch(file,before,after){let s=read(file);if(s.includes(after))return;if(!s.includes(before))throw Error('Patch target missing '+file+': '+before.slice(0,70));write(file,s.replace(before,after));}
patch('reader.js','const paragraphs = a => a.map(p => "<p>"+esc(p)+"</p>").join("");','const Z=globalThis.AtlasZh||{inline:esc,paragraph:v=>"<p>"+esc(v)+"</p>",list:a=>"<ul>"+a.map(v=>"<li>"+esc(v)+"</li>").join("")+"</ul>",setArticle:()=>{},original:v=>"<p>"+esc(v)+"</p>"};\n  const paragraphs = a => a.map(p=>Z.paragraph(p,current?.glossary||[])).join("");');
patch('reader.js','const list = a => "<ul>"+a.map(p=>"<li>"+esc(p)+"</li>").join("")+"</ul>";','const list = a => Z.list(a,current?.glossary||[]);');
patch('reader.js','const a=current, body=q("#reader-body");','const a=current, body=q("#reader-body"); Z.setArticle(a);');
patch('reader.js','<dt><span lang="en">\'+esc(t.en)+\'</span> · \'+esc(t.zh)+\'</dt><dd>\'+esc(t.note)+\'</dd>','<dt><strong>\'+esc(t.en.toLowerCase()===\'fill\'?\'成交\':t.zh)+\'</strong></dt><dd>\'+Z.inline(t.note,a.glossary)+Z.original(t.en,"展開英文術語")+\'</dd>');
patch('reader.js','<dt><strong>\'+esc(t.zh)+\'</strong>','<dt><strong>\'+esc(t.en.toLowerCase()===\'fill\'?\'成交\':t.zh)+\'</strong>');
// Translation blocks default to Chinese. English text remains exact and collapsible.
let reader=read('reader.js');const begin=reader.indexOf('  function translationHTML(a) {'),end=reader.indexOf('  function renderTab(name)',begin);assert.ok(begin>0&&end>begin);
const translation=`  function translationHTML(a) {
    if(!a.translation||!a.license)return '<p>本篇沒有已授權的完整譯文。</p>';
    const block=(t,lang)=>{const v=t[lang];if(t.kind==='list')return '<'+(t.ordered?'ol':'ul')+'>'+v.map(x=>'<li>'+esc(x)+'</li>').join('')+'</'+(t.ordered?'ol':'ul')+'>';return '<p>'+esc(v)+'</p>';};
    return '<h2 id="reader-translation">授權選段・繁中對照</h2><div class="reader-license"><strong>'+esc(a.translationScope||a.license.scope)+'</strong><p>'+esc(a.license.attribution)+' '+link(a.license.url,a.license.id)+'</p></div>'+a.translation.map(t=>{
      if(t.kind==='table'){const table=lang=>'<div class="reader-table-wrap"><table class="reader-translation-table"><thead><tr>'+t.headers[lang].map(v=>'<th>'+esc(v)+'</th>').join('')+'</tr></thead><tbody>'+t.rows.map(row=>'<tr>'+row[lang].map(v=>'<td>'+esc(v)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';return table('zh')+'<details class="zh-original"><summary>展開英文原表</summary><div lang="en">'+table('en')+'</div></details>';}
      if(t.kind==='heading')return '<h3 class="reader-translation-heading">'+esc(t.zh)+'</h3>'+Z.original(t.en,'展開英文標題');
      return '<div class="reader-parallel"><div lang="zh-Hant"><span class="reader-label">繁體中文譯文</span>'+block(t,'zh')+'</div><details class="zh-original"><summary>展開本段英文原文</summary><div lang="en">'+block(t,'en')+'</div></details></div>';
    }).join('')+'<h3>編輯校對註</h3>'+paragraphs(a.translationNotes||[]);
  }
`;
reader=reader.slice(0,begin)+translation+reader.slice(end);write('reader.js',reader);
patch('atlas.js','<h3>${esc(r.title)}</h3>${r.original?', '<h3>${esc(globalThis.AtlasZh?.title(r)||r.title)}</h3>${r.original?');
patch('atlas.js','<p class="resource-note">${esc(r.note)}</p>','${globalThis.AtlasZh?globalThis.AtlasZh.resource(r):`<p class="resource-note">${esc(r.note)}</p>`}');
patch('atlas.js','${esc(r.author)}${r.duration?', '${esc(globalThis.AtlasZh?.author?.(r)||r.author)}${r.duration?');
patch('atlas.js','<div class="map-en">${esc(s.en)}</div>','<div class="map-en">${esc(["基礎","行情背景","交易設定","風險與管理","微台研究","驗證"][s.id])}</div>');
patch('atlas.js','STAGE 0${s.id+1} · 單元','階段 0${s.id+1} · 單元');
patch('atlas.js','<em>${esc(g.en)}</em><strong>${esc(g.zh)}</strong>','<strong>${esc(g.zh)}</strong><details class="zh-original"><summary>展開英文術語</summary><em lang="en">${esc(g.en)}</em></details>');
let html=read('index.html');
const labels={'Context before signal.':'先判斷背景，再看訊號。','READ · UNDERSTAND · PRACTICE':'閱讀・理解・練習','READ THE SOURCE · KEEP THE CONTEXT':'閱讀來源・保留語境','FOUR LENSES · ONE BODY OF EVIDENCE':'四種觀點・共同證據','PROBABILITY · IN CONTEXT':'機率・連著背景讀','WATCH · VISUALIZE · LISTEN':'觀看・圖解・聆聽','A READING SHELF WITH A PURPOSE':'按問題選擇參考書','THE LEARNING MAP':'學習地圖','YOUR STUDY PLAN':'我的學習計畫','TWO COMPLEMENTARY LENSES':'兩種互補的觀點','SOURCE DISCOVERY · 2026.10.24':'教材評選・2026.10.24','A SMALL READING EXPERIMENT':'小型閱讀比較練習','THE RESOURCE LIBRARY':'資源圖書館','THINK BEFORE YOU TRADE':'先思考，再交易','FROM KNOWLEDGE TO EVIDENCE':'從知識走向證據','YOUR LEARNING JOURNAL':'我的學習筆記'};
for(const [en,zh] of Object.entries(labels))html=html.split('>'+en+'<').join('>'+zh+'<');
html=html.replace(/<div class="eyebrow">READING[^<]*<\/div>/g,'<div class="eyebrow">繁體中文閱讀庫</div>');
if(!html.includes('chinese-data.js')){html=html.replace('</head>','<link rel="stylesheet" href="chinese.css?v=20261031literal2">\n</head>');html=html.replace('<script defer src="data/core.js','<script defer src="chinese-data.js?v=20261031literal2"></script><script defer src="chinese.js?v=20261031literal2"></script>\n<script defer src="data/core.js');}
assert.ok(html.includes('chinese-data.js'),'Chinese script load location not found');
html=html.replace(/(<script[^>]+(?:atlas|reader|media|community|reader-probabilities)\.js)\?v=[^"']+/g,'$1?v=20261031literal2');
html=html.replace(/((?:chinese-data|chinese|translation|reader-glossary)\.js|chinese\.css)\?v=[^"']+/g,'$1?v=20261031literal2');
if(!html.includes('translation.js'))html=html.replace('</body>','<script defer src="translation.js?v=20261031literal2"></script>\n</body>');
if(!html.includes('href="#translation"'))html=html.replace('<a href="#community">社群與新文</a>','<a href="#community">社群與新文</a><a href="#translation">翻譯進度</a>');
const section=fs.readFileSync(path.join(__dirname,'translation-section.html'),'utf8').trimEnd();
if(html.includes('<!-- TRANSLATION_LEDGER_START -->'))html=html.replace(/<!-- TRANSLATION_LEDGER_START -->[\s\S]*?<!-- TRANSLATION_LEDGER_END -->\s*/,section+'\n');else html=html.replace('<!-- COMMUNITY_LIBRARY_START -->',section+'\n<!-- COMMUNITY_LIBRARY_START -->');
// Existing source quotes become Chinese-first; English remains inside its own details.
html=html.replace(/<details class="community-quote"><summary>英文短句、繁中翻譯與語境<\/summary><blockquote lang="en">([\s\S]*?)<\/blockquote><p lang="zh-Hant"><strong>([\s\S]*?)<\/strong><\/p><p>([\s\S]*?)<\/p><\/details>/g,'<div class="community-quote"><p lang="zh-Hant"><strong>$2</strong></p><p>$3</p><details class="zh-original"><summary>展開英文短句</summary><blockquote lang="en">$1</blockquote></details></div>');
html=html.replace(/<p class="media-original" lang="en">([\s\S]*?)<\/p>/g,'<details class="zh-original"><summary>展開英文原題</summary><p class="media-source-title" lang="en">$1</p></details>');
html=html.replace(/<span lang="en">([^<]+)<\/span>/g,'<details class="zh-original"><summary>展開英文題名</summary><span lang="en" data-keep-original>$1</span></details>');
html=html.replaceAll('>Podcast<','>播客／聲音節目<').replaceAll('>Podcast ·','>播客・').replaceAll('訪談 Podcast','訪談聲音節目');
if(!html.includes('reader-glossary.js'))html=html.replace('<script defer src="reader.js','<script defer src="reader-glossary.js?v=20261031literal2"></script><script defer src="reader.js');
write('index.html',html);
for(const f of fs.readdirSync(path.join(dist,'images/study')).filter(f=>f.endsWith('.svg'))){let s=read('images/study/'+f);s=s.replace('>Delta<','>成交量差<').replace('>95% Wilson <','>95% 威爾遜區間 <').replace('>01  Brooks PA<','>01 Brooks 價格行為<').replace('>03  ICT<','>03 ICT 方法<');write('images/study/'+f,s);}
console.log('Chinese-first presentation enabled');
// Keep the installed navigation maps and their reader asset version after later translation builds.
if(fs.existsSync(path.join(dist,'site-maps.js')))require('./build-site-maps.cjs');
