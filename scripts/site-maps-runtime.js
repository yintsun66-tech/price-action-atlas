/* Navigation is editorial; progress is read from the existing reader without writing it. */
(function(root){
 'use strict';
 const DATA=root.AtlasMapData,E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const validId=v=>/^[a-z0-9-]+$/.test(v),articleHref=id=>validId(id)?'#read/'+id:'#reading';
 function model(articles,records){
  const byId=new Map(articles.map(a=>[a.id,a]));
  const stages=DATA.stages.map(s=>{const steps=s.ids.filter(id=>byId.has(id)).map(id=>({...byId.get(id),read:records?.[id]?.read===true}));return {...s,steps,done:steps.filter(a=>a.read).length,minutes:steps.reduce((n,a)=>n+(Number(a.minutes)||0),0)};});
  const steps=stages.flatMap(s=>s.steps),nextStage=stages.find(s=>s.steps.some(a=>!a.read));
  return {stages,total:steps.length,done:steps.filter(a=>a.read).length,next:nextStage?.steps.find(a=>!a.read)||null,nextStage:nextStage?.id||null};
 }
 function search(query){
  const terms=String(query).trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return DATA.groups.map(g=>({...g,items:g.items.filter(i=>terms.every(t=>[g.title,i.title,i.description,i.tags].join(' ').toLocaleLowerCase().includes(t)))})).filter(g=>g.items.length);
 }
 function stageHTML(s){
  const next=s.steps.find(a=>!a.read),all=s.steps.length>0&&!next;
  return '<div class="atlas-stage-intro"><span class="atlas-map-kicker">這一階段要回答</span><h3>'+E(s.title)+'</h3><p>'+E(s.question)+'</p><div class="atlas-map-output"><strong>留下的成果</strong><p>'+E(s.output)+'</p></div><a class="atlas-map-plan" href="#plan">搭配原有每週計畫 →</a></div><div class="atlas-stage-reading"><div class="atlas-stage-reading-head"><strong>精讀順序</strong><span>'+s.done+' / '+s.steps.length+' 已讀 · 約 '+s.minutes+' 分鐘</span></div><ol>'+s.steps.map((a,i)=>'<li><span class="atlas-map-step" aria-hidden="true">'+String(i+1).padStart(2,'0')+'</span><div><a href="'+articleHref(a.id)+'">'+E(a.title)+'</a><span class="atlas-map-reading-state">'+(a.read?'已標記已讀 ✓':'尚未標記已讀')+' · 約 '+E(a.minutes)+' 分鐘</span></div></li>').join('')+'</ol>'+(s.steps.length?'<a class="btn primary" href="'+articleHref((next||s.steps[0]).id)+'">'+(all?'重讀本階段':'閱讀本階段下一篇')+' →</a>':'<p>這一階段的文章暫未載入，請從閱讀庫查找。</p>')+'<p class="atlas-map-fine">時間為文章標示合計，練習另計。</p></div>';
 }
 let current=null,selected=null,mounted=false;
 const q=s=>document.querySelector(s);
 function render(){
  if(!current||!mounted)return;
  if(!current.stages.some(s=>s.id===selected))selected=current.nextStage||current.stages[0]?.id;
  const stage=current.stages.find(s=>s.id===selected);if(!stage)return;
  q('#atlas-learning-stages').innerHTML=current.stages.map((s,i)=>'<li><button type="button" data-map-stage="'+E(s.id)+'" aria-pressed="'+(s.id===selected)+'" aria-controls="atlas-stage-detail"><span class="atlas-map-stage-number">'+String(i+1).padStart(2,'0')+'</span><strong>'+E(s.title)+'</strong><span class="atlas-map-stage-state">'+s.done+' / '+s.steps.length+' 已讀'+(s.id===current.nextStage?' · 建議接續':'')+'</span></button></li>').join('');
  q('#atlas-stage-detail').innerHTML=stageHTML(stage);
  q('#atlas-learning-count').textContent=current.done+' / '+current.total+' 篇';
  const progress=q('#atlas-learning-progress');progress.max=current.total||1;progress.value=current.done;
  q('#atlas-next-label').textContent=current.next?'接著讀這一篇':'精讀文章已全部標記已讀';
  q('#atlas-next-article').textContent=current.next?.title||'選一個階段，重做一次練習';
  q('#atlas-next-article').href=current.next?articleHref(current.next.id):'#learning-map';
  q('#atlas-next-context').textContent=current.next?'第 '+String(current.stages.findIndex(s=>s.id===current.nextStage)+1).padStart(2,'0')+' 階段 · 約 '+current.next.minutes+' 分鐘':'閱讀標記不代表理解或交易驗證通過。';
  q('#atlas-map-status').textContent='沿用此瀏覽器的閱讀標記。開啟或收藏文章不會自動變成已讀。';
 }
 function update(articles,records){current=model(articles,records);render();}
 function unavailable(){if(mounted)q('#atlas-map-status').textContent='閱讀進度暫時無法載入；下方文章連結與各階段完整清單仍可使用。';}
 function mount(){
  if(mounted||!q('#site-map')||!q('#learning-map'))return;mounted=true;
  q('#atlas-learning-stages').addEventListener('click',e=>{const button=e.target.closest('[data-map-stage]');if(!button||button.disabled)return;selected=button.dataset.mapStage;render();q('#atlas-learning-stages [data-map-stage="'+selected+'"]').focus({preventScroll:true});});
  const input=q('#atlas-map-search'),reset=q('#atlas-map-reset');
  function filter(){const groups=search(input.value),hrefs=new Set(groups.flatMap(g=>g.items.map(i=>i.href)));document.querySelectorAll('#site-map [data-map-href]').forEach(el=>{el.hidden=!hrefs.has(el.dataset.mapHref);});document.querySelectorAll('#site-map [data-map-group]').forEach(el=>{el.hidden=!Array.from(el.querySelectorAll('[data-map-href]')).some(n=>!n.hidden);});q('#atlas-map-empty').hidden=hrefs.size>0;q('#atlas-map-result').textContent=hrefs.size+' / '+DATA.groups.reduce((n,g)=>n+g.items.length,0)+' 個專區入口';}
  input.addEventListener('input',filter);reset.addEventListener('click',()=>{input.value='';filter();input.focus();});filter();render();
 }
 root.AtlasSiteMaps=Object.freeze({model,search,stageHTML,update,unavailable});
 if(typeof document!=='undefined')mount();
})(globalThis);
