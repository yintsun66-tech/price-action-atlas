/* Editorial reading layers. No note storage or trading actions. */
(() => {
 'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const guides=globalThis.AtlasReadingGuideData||{};
 function compose(html,a){
  const g=guides[a.id]||{}, takeaway=g.takeaway||a.keyPoints[0];
  const table=g.table?'<div class="reader-table-wrap"><table class="reader-lesson-table"><caption>'+E(g.table.caption)+'</caption><thead><tr>'+g.table.headers.map(h=>'<th scope="col">'+E(h)+'</th>').join('')+'</tr></thead><tbody>'+g.table.rows.map(r=>'<tr>'+r.map((v,i)=>'<'+(i?'td':'th scope="row"')+'>'+E(v)+'</'+(i?'td':'th')+'>').join('')+'</tr>').join('')+'</tbody></table></div>':'';
  const check=g.check?'<aside class="reader-selfcheck"><h3>先試著回答</h3><p>'+E(g.check.question)+'</p><details><summary>展開答案與理由</summary><p>'+E(g.check.answer)+'</p></details></aside>':'';
  const terms=a.glossary?.length?'<details class="reader-term-preview"><summary>需要術語說明？先看 '+a.glossary.length+' 個關鍵詞</summary><dl>'+a.glossary.map(t=>'<dt><strong>'+E(t.zh)+'（<span lang="en">'+E(t.en)+'</span>）</strong></dt><dd>'+E(t.note)+'</dd>').join('')+'</dl></details>':'';
  const figure=g.figure&&/^images\/study\/[a-z0-9-]+\.svg$/.test(g.figure.src)?'<figure class="reader-guide-figure"><a href="'+E(g.figure.src)+'" target="_blank" rel="noopener noreferrer"><img src="'+E(g.figure.src)+'" alt="'+E(g.figure.alt)+'" loading="lazy"></a><figcaption>'+E(g.figure.caption)+'</figcaption></figure>':'';
  const lead='<aside class="reader-compass" aria-label="本篇閱讀重點"><span class="reader-label">這篇先學會一件事</span><h2 id="reader-focus">'+E(g.question||a.title)+'</h2><p><strong>'+E(takeaway)+'</strong></p>'+(g.example?'<p>'+E(g.example)+'</p>'+table+'<p class="reader-counterexample"><strong>反例與界線：</strong>'+E(g.counterexample)+'</p>':'<p class="reader-first-task"><strong>讀完做這一步：</strong>'+E(a.exercise.steps[0])+'</p>')+terms+check+(g.related?'<p class="reader-prerequisite">'+g.related.map(r=>'<a href="#read/'+E(r.id)+'">'+E(r.label)+' →</a>').join(' · ')+'</p>':'')+'</aside>';
  if(Number.isInteger(g.advancedFrom)){
   for(let i=g.advancedFrom;i<a.sections.length;i++){
    const start='<section id="reader-section-'+i+'">', next=i+1<a.sections.length?'<section id="reader-section-'+(i+1)+'">':'<p class="reader-study-note">';
    const p=html.indexOf(start),end=html.indexOf(next,p);
    if(p>=0&&end>p)html=html.slice(0,p)+'<details class="reader-advanced"><summary>'+E(g.advancedLabel)+' · '+(i-g.advancedFrom+1)+'</summary>'+html.slice(p,end)+'</details>'+html.slice(end);
   }
  }
  // Keep all original wording and attribution available without repeating it before the lesson.
  html=html.replace(/<div class="reader-source-summary"><strong>來源短摘要／查核範圍<\/strong>([\s\S]*?)<\/div>/,'<details class="reader-source-summary"><summary>來源短摘要與查核範圍</summary>$1</details>');
  html=html.replace(/<h2 id="reader-summary">本篇學習摘要<\/h2><p class="reader-lead">([\s\S]*?)<\/p>/,'<details class="reader-overview"><summary>展開完整學習摘要</summary><p class="reader-lead">$1</p></details>');
  const sources=g.sourceCards?'<p class="reader-prerequisite"><strong>本次來源補讀：</strong>'+g.sourceCards.map(s=>'<a href="#community-'+E(s.id)+'">'+E(s.label)+' →</a>').join(' · ')+'</p>':'';
  const updated=g.editorialUpdated?'<p class="reader-editorial-date">閱讀編排更新 '+E(g.editorialUpdated)+'；原文查核日期仍依「來源與授權」各筆記錄。</p>':'';
  return lead+figure+sources+updated+html;
 }
 globalThis.AtlasReadingGuide=Object.freeze({compose});
})();
