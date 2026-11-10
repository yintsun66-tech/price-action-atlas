/* Traditional Chinese presentation; source text and browser notes stay intact. */
(() => {
 'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const rx=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const base=globalThis.AtlasZhTerms||{},titles=globalThis.AtlasZhTitles||{},reviews=globalThis.AtlasZhReviews||[];
 const reviewById=Object.fromEntries(reviews.map(r=>[r.resourceId,r]));
 const reviewByUrl=Object.fromEntries(reviews.map(r=>[r.url,r]));
 const contextual=new Set(['spread','stop','tick','fill','h2','l2','last','close','likely','probably','usually','delta','cvd','dom','fvg','mss','utc','bid','ask','footprint','footprint / numbers bars','bid 120','ask 180','bid 成交量','ask 成交量','bid/ask','bid／ask','ohlc','ohlcv']);
 function dictionary(glossary=[]){const d=Object.fromEntries(Object.entries(base).filter(([k])=>!contextual.has(k.toLowerCase())));for(const t of glossary){if(t.en&&t.zh&&t.en.length>1&&!contextual.has(t.en.toLowerCase()))d[t.en]=t.en.toLowerCase()==='fill'?'成交':t.zh;}return d;}
 function text(value,glossary=[]){
  const source=String(value??''),d=dictionary(glossary),keys=Object.keys(d).filter(k=>k.length>1&&d[k]&&d[k]!==k).sort((a,b)=>b.length-a.length);
  if(!keys.length)return source;
  const folded=Object.fromEntries(keys.map(k=>[k.toLocaleLowerCase(),d[k]]));
  return source.replace(new RegExp('(^|[^A-Za-z0-9])('+keys.map(rx).join('|')+')(?=$|[^A-Za-z0-9])','gi'),(_,pre,key,offset)=>key.toLowerCase()==='price action'&&source.slice(offset+pre.length+key.length).startsWith(' Atlas')?pre+key:pre+folded[key.toLocaleLowerCase()]).replace(/^([^｜]+)\s*｜\s*\1$/, '$1').replace(/主課程版（主課程）/g,'主課程版').replace(/三棒失衡區間\s*三棒失衡/g,'三棒失衡區間').replace(/三棒\s*三棒失衡區間/g,'三棒失衡區間');
 }
 function original(value,label='展開英文用語與原版文字') {return '<details class="zh-original"><summary>'+E(label)+'</summary><div lang="en">'+E(value)+'</div></details>';}
 function paragraph(value,glossary=[]){const translated=text(value,glossary);return '<p lang="zh-Hant">'+E(translated)+'</p>'+(translated!==String(value)?original(value):'');}
 function list(values,glossary=[]){return '<ul>'+values.map(v=>'<li>'+E(text(v,glossary))+(text(v,glossary)!==String(v)?original(v):'')+'</li>').join('')+'</ul>';}
 function title(r){return titles[r.id]?.titleZh||text(r.title);}
 function resource(r){
  const review=reviewById[r.id]||reviewByUrl[r.url],english=/英文/.test(r.lang||'');
  if(!english)return '<p class="resource-note">'+E(text(r.note))+'</p>';
  const labels={'body-summary':'已讀正文・繁中摘要','intro-only':'僅公開介紹摘要','excerpt-summary':'僅短句／部分內容摘要','licensed-excerpt':'授權指定選段','unavailable':'本次無法取得・未完成摘要'};
  const label=review?labels[review.status]:'待讀取原文・尚無內容摘要';
  return '<div class="zh-resource-summary"><strong>'+E(label)+'</strong>'+(review?paragraph(review.summaryZh)+'<p class="zh-scope"><strong>實際讀取：</strong>'+E(review.readScope)+'<br><strong>本次查核：</strong>'+E(review.checked)+'</p>':'<p>下列文字是既有學習方向，不能視為已讀原文的摘要。</p>')+(review?.attributionNoteZh?'<p><strong>'+(review.authorCorrected?'作者更正：':'作者核對：')+'</strong>'+E(review.attributionNoteZh)+'</p>':'')+'<details><summary>既有學習方向與來源範圍</summary><p>'+E(text(r.note))+'</p></details><a href="#translation-resource-'+E(r.id)+'">查看翻譯範圍與處理進度 →</a></div>';
 }
 let currentGlossary=[];
 const localizedBlocks=new Map();
 function localize(root){
  if(!document.createTreeWalker||!root)return;
  // Reader headings are reused across articles. Discard the former article's
  // translation marker and original-text disclosure when their text changes.
  for(const [block,entry] of localizedBlocks){
   if(!block.isConnected){entry.disclosure.remove();localizedBlocks.delete(block);continue;}
   if(block.textContent!==entry.visible){entry.disclosure.remove();block.removeAttribute('data-zh-rendered');localizedBlocks.delete(block);}
  }
  const skip='script,style,textarea,input,select,option,pre,code,[lang="en"],.zh-original,[data-zh-rendered],.resource-meta,.community-author,.brand';
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[],blocks=new Map();let n;
  while((n=walker.nextNode())){const p=n.parentElement;if(!p||p.closest(skip)||!/[A-Za-z]/.test(n.nodeValue))continue;const g=p.closest('#reader-dialog')?currentGlossary:[],t=text(n.nodeValue,g);if(t===n.nodeValue)continue;nodes.push([n,t]);const b=p.closest('p,li,dd,dt,h1,h2,h3,h4,legend,.eyebrow,.map-en');if(b&&!b.closest('button,a')&&!blocks.has(b))blocks.set(b,b.textContent);}
  for(const [node,t] of nodes)node.nodeValue=t;
  for(const [block,before] of blocks){if(block.dataset.zhRendered)continue;block.dataset.zhRendered='true';const d=document.createElement('details'),s=document.createElement('summary'),p=document.createElement('div');d.className='zh-original';s.textContent='展開英文用語與原版文字';p.lang='en';p.textContent=before;d.append(s,p);block.after(d);localizedBlocks.set(block,{visible:block.textContent,disclosure:d});}
  for(const e of root.querySelectorAll('.original-title[lang="en"]')){if(e.closest('.zh-original'))continue;const d=document.createElement('details'),s=document.createElement('summary');d.className='zh-original';s.textContent='展開英文原題';e.replaceWith(d);d.append(s,e);}
 }
 globalThis.AtlasZh={escape:E,text,inline:(v,g=[])=>E(text(v,g)),paragraph,list,original,title,resource,author:r=>(reviewById[r.id]||reviewByUrl[r.url])?.authorCorrected||r.author,sourceAuthor:s=>reviewByUrl[s.url]?.authorCorrected||s.author,setArticle:a=>{currentGlossary=a?.glossary||[];},localize};
 if(typeof MutationObserver!=='undefined'&&document.body){
  let queued=false;const observer=new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;observer.disconnect();localize(document.body);observer.observe(document.body,{childList:true,subtree:true});});});
  localize(document.body);observer.observe(document.body,{childList:true,subtree:true});
 }
})();
