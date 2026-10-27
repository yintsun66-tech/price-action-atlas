/* Shared, context-bound probability notes for the library and article reader. */
(() => {
  'use strict';
  const D=globalThis.AtlasProbabilityData;
  if(!D)return;
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safe=u=>{try{const x=new URL(u);return /^https?:$/.test(x.protocol)?x.href:'#';}catch{return '#';}};
  const link=(u,t)=>'<a href="'+esc(safe(u))+'" target="_blank" rel="noopener noreferrer">'+esc(t)+' ↗</a>';
  const notes=new Map(D.entries.map(e=>[e.id,e]));
  const bindings=a=>(D.bindings[a.id]||[]).filter(b=>notes.has(b.ref));
  const kind=e=>e.kind==='brooks'?'Brooks 公開原典情境':e.kind==='editorial'?'本站編輯準則／未指定數值':'本站自編算例／非實測';
  function card(e,prefix){
    const s=D.sources[e.source];
    const related=Object.entries(D.bindings).filter(([,bs])=>bs.some(b=>b.ref===e.id)).map(([id])=>id);
    return '<article class="prob-card '+(e.kind==='brooks'?'':'prob-example')+'" id="'+prefix+esc(e.id)+'"><div class="prob-card-top"><span class="prob-kind">'+kind(e)+'</span><span>核對 '+D.checked+'</span></div><h3>'+esc(e.title)+'</h3><p class="prob-estimate"><strong>'+esc(e.estimate)+'</strong></p><p><strong>估計什麼：</strong>'+esc(e.event)+'</p><p><strong>適用背景：</strong>'+esc(e.context)+'</p><details><summary>時間、原意與查核出處</summary><dl><div><dt>時間／目標</dt><dd>'+esc(e.horizon)+'</dd></div><div><dt>原意／計算口徑</dt><dd>'+esc(e.meaning)+'</dd></div><div><dt>本站編輯提醒</dt><dd>'+esc(e.caution)+'</dd></div></dl>'+(e.quote?'<blockquote><p lang="en">'+esc(e.quote)+'</p><p>'+esc(e.quoteZh)+'</p></blockquote>':'')+(s?'<p class="prob-source"><strong>確定的公開出處：</strong>'+link(s.url,s.title)+'<br>'+esc(s.author)+' · '+esc(s.published)+'<br>查找小節：<span lang="en">'+esc(e.locator)+'</span><br>'+esc(s.access)+'</p>':'<p class="prob-source"><strong>確定的本站出處：</strong><a href="#read/'+esc(e.article)+'">開啟自編算例 →</a><br>本站另行計算與編輯；沒有市場實測資料。</p>')+e.refs.map(r=>'<p class="prob-course"><strong>'+esc(r.version)+' '+esc(r.unit)+' · '+esc(r.topic)+'</strong><br>'+esc(r.relation)+' · '+link(r.url,'官方單元')+'</p>').join('')+(e.refs.length?'<p class="prob-source">單元編號與主題已由官方公開課綱／網站地圖核對；僅作相關補讀，不宣稱數字出自該付費影片。Main 與 Forex 共用的基礎部分，不混入後段 Forex 專屬單元。</p>':'')+(related.length?'<p class="prob-related"><strong>相關閱讀：</strong>'+related.map(id=>'<a href="#read/'+esc(id)+'">'+esc(D.titles?.[id]||id)+'</a>').join(' · ')+'</p>':'')+'</details></article>';
  }
  function policy(){return '<div class="prob-policy"><strong>先確認分母，再讀百分比。</strong><p>'+esc(D.warning)+'</p><p>80% 區間突破失敗、約 80% 強勢突破有跟進，以及 75% 多頭通道破線，談的是不同背景與不同事件，不能互相取代、取平均或連乘。</p></div>';}
  function render(a){
    const selected=[...new Set(bindings(a).map(b=>b.ref))].map(id=>notes.get(id));
    return '<h2 id="reader-probability">本篇機率註記</h2>'+policy()+(selected.length?'<p>下列原典條件是相關補充；本篇自編 K 線與練習沒有因此取得相同機率。可在「導讀」對照標註位置。</p>'+selected.map(e=>card(e,'reader-prob-')).join(''):'<p class="prob-unquantified"><strong>本篇未提供可核對的數值機率。</strong>「可能」「偏強」「較可靠」保持定性；這不表示機率為零，也不補成五五波。方方土與其他作者的用語，不自動套用 Brooks 詞彙約定。</p>')+'<p><a href="#probabilities">查看完整機率註記與用語表 →</a></p>';
  }
  function inline(a,i){return bindings(a).filter(b=>b.section===i).map(b=>{
    const e=notes.get(b.ref);
    return '<aside class="prob-inline"><span class="prob-kind">'+(e.kind==='brooks'?'相關原典情境 · 非本段算例勝率':e.kind==='editorial'?'本站編輯準則 · 不代替原作者估計':'本站算例註記 · 非市場實測')+'</span><p><strong>'+esc(e.title)+'：'+esc(e.estimate)+'</strong></p><p><strong>背景：</strong>'+esc(e.context)+'</p><p><strong>事件：</strong>'+esc(e.event)+'</p><button type="button" class="text-btn" data-reader-probability="'+esc(e.id)+'">核對條件與出處 →</button></aside>';
  }).join('');}
  function banner(a){const count=bindings(a).length;return '<aside class="prob-article-banner"><strong>機率閱讀提醒</strong><p>'+(count?'本篇有 '+count+' 項情境註記；數字的事件與背景分開列在「機率註記」。':'本篇沒有已核對的數值機率；定性描述保持定性。')+'<strong>自編圖例不是 Brooks 統計樣本。</strong></p></aside>';}
  function mountLibrary(){
    const root=document.querySelector('#probability-grid');if(!root)return;
    const search=document.querySelector('#probability-search'),type=document.querySelector('#probability-type'),status=document.querySelector('#probability-status');
    function update(){const words=search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);const rows=D.entries.filter(e=>(type.value==='all'||type.value===e.kind)&&words.every(w=>[e.title,e.estimate,e.context,e.event,e.horizon,e.meaning,e.caution].join(' ').toLocaleLowerCase().includes(w)));root.innerHTML=rows.map(e=>card(e,'library-prob-')).join('')||'<p>沒有符合的註記。可試「反轉」「突破」或「自編」。</p>';status.textContent='顯示 '+rows.length+' / '+D.entries.length+' 項註記 · '+D.entries.filter(e=>e.kind==='brooks').length+' 項原典／用語情境＋1 項編輯準則＋'+D.entries.filter(e=>e.kind==='example').length+' 項自編數值辨識';}
    search.addEventListener('input',update);type.addEventListener('change',update);
    document.querySelector('#probability-reset').addEventListener('click',()=>{search.value='';type.value='all';update();});
    document.querySelector('#probability-method').innerHTML=policy()+'<p class="prob-method-source">'+esc(D.provenance)+' '+link(D.sources.statistics.url,'核對 Brooks 本人的機率說明')+'</p>';
    update();
  }
  globalThis.AtlasProbabilities={render,inline,banner,mountLibrary};
  mountLibrary();
})();
