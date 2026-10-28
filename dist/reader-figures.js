/* Tailored original images, with explicit narrative bindings and synthetic-data labels. */
(() => {
 'use strict';
 const D=globalThis.AtlasFigureData;if(!D)return;
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const figures=a=>D.figures.filter(f=>f.article===a.id&&/^images\/study\/[a-z0-9-]+\.svg$/.test(f.src));
 function one(f){return '<figure class="atlas-reading-figure" data-study-figure="'+esc(f.id)+'"><div class="atlas-figure-label">本站原創整理圖 · 合成教學資料</div><h3>'+esc(f.title)+'</h3><div class="atlas-figure-viewport"><a href="'+esc(f.src)+'" target="_blank" rel="noopener noreferrer" aria-label="開啟完整整理圖：'+esc(f.title)+'"><img src="'+esc(f.src)+'" alt="'+esc(f.alt)+'" width="'+f.width+'" height="'+f.height+'" loading="lazy" decoding="async"></a></div><figcaption>'+esc(f.caption)+' <a href="'+esc(f.src)+'" target="_blank" rel="noopener noreferrer">開啟完整 SVG 圖 ↗</a></figcaption></figure>';}
 function render(a,section){return figures(a).filter(f=>f.afterSection===section).map(one).join('');}
 function renderAll(a){return '<h2 id="reader-figures">本篇整理圖</h2><p>圖依本篇問題另行整理；來源原圖、真實行情及本站合成圖分開。較寬的圖可左右捲動，或點開完整 SVG 放大。完整路徑可能包含後續結果；盲測請先使用原「圖例與測驗」。</p>'+figures(a).map(one).join('');}
 globalThis.AtlasFigures={render,renderAll,count:a=>figures(a).length};
})();
