/* Static, cited community selections. No external embeds, account access or storage writes. */
(() => {
 'use strict';
 const root=document.getElementById('community');if(!root)return;
 const by=id=>document.getElementById('community-'+id),cards=Array.from(root.querySelectorAll('[data-community-card]'));
 const search=by('search'),kind=by('kind'),language=by('language'),batch=by('batch'),status=by('status'),more=by('more');
 const normalize=v=>v.normalize('NFKC').toLocaleLowerCase(),texts=new Map(cards.map(c=>[c,normalize(c.textContent)]));let limit=4;
 function render(){
  const terms=normalize(search.value).trim().split(/\s+/).filter(Boolean);
  const rows=cards.filter(c=>(kind.value==='all'||c.dataset.kind===kind.value)&&(language.value==='all'||c.dataset.language===language.value)&&(!batch||batch.value==='all'||c.dataset.batch===batch.value)&&terms.every(t=>texts.get(c).includes(t)));
  cards.forEach(c=>{c.hidden=true;});rows.forEach((c,i)=>{c.hidden=i>=limit;});
  status.textContent='顯示 '+Math.min(rows.length,limit)+' / '+rows.length+' 篇符合的選讀（共 '+cards.length+' 篇）';
  by('empty').hidden=rows.length>0;more.hidden=limit>=rows.length;
 }
 function reset(){search.value='';kind.value='all';language.value='all';if(batch)batch.value='all';limit=4;render();}
 for(const c of [search,kind,language,batch].filter(Boolean))c.addEventListener(c===search?'input':'change',()=>{limit=4;render();});
 by('reset').addEventListener('click',reset);more.addEventListener('click',()=>{limit=cards.length;render();});
 function route(){if(!location.hash.startsWith('#community-'))return;const card=cards.find(c=>'#'+c.id===location.hash);if(!card)return;reset();limit=cards.length;render();card.scrollIntoView({block:'start'});}
 by('controls').hidden=false;render();route();window.addEventListener('hashchange',route);
})();
