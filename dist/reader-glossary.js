/* Search the current article's working definitions, without writing reading notes. */
(() => {
 'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const normalize=v=>String(v??'').normalize('NFKC').toLocaleLowerCase().replace(/[-–—/]/g,' ').replace(/\s+/g,' ').trim();
 const matches=(term,query)=>{const haystack=normalize([term.en,term.zh,term.note].join(' '));return normalize(query).split(' ').filter(Boolean).every(t=>haystack.includes(t));};
 function render(a,Z){
  return '<h2 id="reader-glossary">本篇中英術語快查</h2><p>這裡是本篇的工作定義。輸入中文、英文或定義中的關鍵字；不同作者的用法仍須對照原文。</p><div class="reader-term-controls"><label for="reader-term-search">搜尋本篇術語<input type="search" id="reader-term-search" placeholder="例如：停損、risk、背景…" autocomplete="off"></label><button type="button" class="btn secondary" id="reader-term-clear">清除搜尋</button></div><p id="reader-term-status" aria-live="polite">顯示 '+a.glossary.length+' / '+a.glossary.length+' 個術語</p><dl class="reader-terms">'+a.glossary.map((t,i)=>'<div data-reader-term="'+i+'"><dt><strong>'+E(t.en.toLowerCase()==='fill'?'成交':t.zh)+'</strong></dt><dd>'+Z.inline(t.note,a.glossary)+Z.original(t.en,'展開英文術語')+'</dd></div>').join('')+'</dl><p id="reader-term-empty" hidden>沒有符合的術語。可縮短關鍵字，或清除搜尋查看本篇全部用語。</p>';
 }
 function mount(body,a){
  const input=body.querySelector('#reader-term-search'),clear=body.querySelector('#reader-term-clear'),status=body.querySelector('#reader-term-status'),empty=body.querySelector('#reader-term-empty');
  if(!input||!clear||!status||!empty)return;
  const rows=Array.from(body.querySelectorAll('[data-reader-term]'));
  const apply=()=>{let count=0;for(const row of rows){const show=matches(a.glossary[Number(row.dataset.readerTerm)],input.value);row.hidden=!show;if(show)count++;}status.textContent='顯示 '+count+' / '+a.glossary.length+' 個術語';empty.hidden=count!==0;};
  input.addEventListener('input',apply);clear.addEventListener('click',()=>{input.value='';apply();input.focus();});apply();
 }
 globalThis.AtlasGlossary={normalize,matches,render,mount};
})();
