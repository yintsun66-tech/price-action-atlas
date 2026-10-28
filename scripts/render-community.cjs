/* Shared renderer. Preserve each source's original check date across batches. */
const assert=require('node:assert/strict');
const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link=(u,t)=>{assert.ok(/^https:\/\//.test(u),'HTTPS source required');return '<a href="'+E(u)+'" target="_blank" rel="noopener noreferrer">'+E(t)+' ↗</a>';};
module.exports=(data,manifest)=>{
 const title=id=>{const a=manifest.articles.find(a=>a.id===id);assert.ok(a,'Missing article '+id);return a.title;};
 const fallback=data.legacyChecked||data.checked;
 const cards=data.items.map(c=>`<article class="community-card card" id="community-${E(c.id)}" data-community-card data-kind="${E(c.kind)}" data-language="${E(c.language)}" data-batch="${c.batch||6}">
<div class="community-labels"><span class="pill ${c.kind==='author'?'blue':'green'}">${c.kind==='author'?'原作者／官方教材':'社群選讀'}</span><span>${E(c.platform)}</span><span>${c.language==='en'?'英文→繁中':'繁體中文'}</span><span>第${c.batch||6}批收錄</span></div>
<p class="community-author">${E(c.author)}</p><h3>${E(c.title)}</h3><p class="community-summary">${E(c.summary)}</p>
<p class="community-date"><strong>發布：</strong>${E(c.published||'確切日期未核對')}<br>${E(c.dateNote)}<br><strong>收錄：</strong>${E(c.collected||fallback)} · <strong>查核：</strong>${E(c.checked||fallback)}</p>
${c.quote?'<details class="community-quote"><summary>英文短句、繁中翻譯與語境</summary><blockquote lang="en">'+E(c.quote.en)+'</blockquote><p lang="zh-Hant"><strong>'+E(c.quote.zh)+'</strong></p><p>'+E(c.quote.context)+'</p></details>':'<p class="community-translation">原文已為繁中，本卡提供摘要。</p>'}
<details class="community-review"><summary>評價依據、證據與限制</summary><p><strong>評價依據：</strong>${E(c.review.basis)}</p><p><strong>學習用途：</strong>${E(c.review.learning)}</p><p><strong>限制：</strong>${E(c.review.limits)}</p><p><strong>熱門度：</strong>${E(c.review.engagement)}</p><p><strong>實際讀取：</strong>${E(c.access)}</p><p><strong>翻譯範圍：</strong>${E(c.translation)}</p></details>
${(c.courseRefs||[]).map(r=>'<p class="community-course"><strong>'+E(r.version+' '+r.unit+' · '+r.topic)+'</strong><br>'+E(r.relation)+' · '+link(r.url,'官方單元')+'<br>會員文章與官方課程分開歸屬，未觀看付費內容。</p>').join('')}
<div class="community-tags">${c.tags.map(t=>'<span>'+E(t)+'</span>').join('')}</div><div class="community-related"><strong>搭配站內閱讀</strong>${c.related.map(id=>'<a href="#read/'+id+'">'+E(title(id))+' →</a>').join('')}</div><div class="community-actions">${link(c.url,'閱讀原始文章／討論')}</div></article>`).join('\n');
 const options=(data.batches||[]).map(b=>'<option value="'+b.batch+'">'+E(b.title)+'</option>').join('');
 const latest=data.batches?.[0],count=latest?data.items.filter(c=>c.batch===latest.batch).length:data.items.length;
 return `<!-- COMMUNITY_LIBRARY_START -->
<section id="community" aria-labelledby="community-title"><div class="section-head"><div><div class="eyebrow">READ THE SOURCE · KEEP THE CONTEXT</div><h2 id="community-title">新文章與社群。<br>讀見觀點，也讀清界線。</h2></div><p>累積 ${data.items.length} 篇選讀；本批新增 ${count} 篇來源。英文短句附繁中譯文，原作者教材、官方規格與社群經驗分開標示。</p></div>
<div class="community-intro card"><strong>看見百分比，先確認它在計算什麼。</strong><p>${E(data.policy)} 未取得可核對評分時保留缺項，不以行銷語氣或互動數建立獲利排名。</p><p>10.29 新增威科夫圖式、FVG 事件比例、重繪文件及訂單流選讀，另加入三篇配圖閱讀單元。舊來源保持原查核日期，可依批次篩選。</p><p><a href="#read/licensed-measured-move">閱讀量度目標的授權中英選段 →</a> · <a href="#read/ict-event-rates">練習分清事件比例與勝率 →</a> · <a href="#read/wyckoff-template-uncertainty">保留圖式之外的未決 →</a></p></div>
<div class="community-controls" id="community-controls" hidden><label>搜尋選讀<input type="search" id="community-search" placeholder="作者、社群、ICT、威科夫…"></label><label>收錄批次<select id="community-batch"><option value="all">全部批次</option>${options}</select></label><label>來源類型<select id="community-kind"><option value="all">全部來源</option><option value="author">原作者／官方教材</option><option value="community">社群選讀</option></select></label><label>來源語言<select id="community-language"><option value="all">全部語言</option><option value="en">英文附繁中</option><option value="zh-Hant">繁體中文</option></select></label><button type="button" class="btn secondary" id="community-reset">清除篩選</button></div>
<p id="community-status" aria-live="polite">${data.items.length} 篇選讀 · 發表、收錄及查核時間分開</p><div class="community-grid" id="community-grid">${cards}</div><p id="community-empty" hidden>沒有符合的選讀，請縮短關鍵字或清除篩選。</p><div class="more-wrap"><button type="button" class="btn secondary" id="community-more" hidden>展開其餘選讀 ↓</button></div>
<details class="community-method card"><summary>每天更新時，如何決定要放什麼？</summary><p><strong>選讀條件：</strong>來源可合法公開閱讀、能明確歸屬原作者，且對目前問題有新增價值。新收錄也可能是舊文，日期逐筆保留；沒有合格內容不湊數。</p><p><strong>翻譯：</strong>一般來源只提供短摘要與必要短句，開放授權選段另列完整範圍。只讀簡介或 FAQ 就明寫該範圍，不假稱看過影片或審過程式。</p><p><strong>評價：</strong>會員解讀不自動等於原作者立場；行銷、互動與自報績效各自保留證據限制，不由本站補造驗證。</p><p><strong>更新紀錄：</strong>本專區編輯 ${E(data.checked)}；各卡查核日分列。<a href="reading/community.json" target="_blank" rel="noopener noreferrer">查看來源資料 ↗</a> · <a href="reading/content-updates.json" target="_blank" rel="noopener noreferrer">查看收錄與略過紀錄 ↗</a></p></details>
</section>
<!-- COMMUNITY_LIBRARY_END -->`;
};
