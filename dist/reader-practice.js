/* Original synthetic examples and self-checks; no live feed or trade execution. */
(() => {
 "use strict";
 const sessions=new Map();
 const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
 function session(a){
  if(!sessions.has(a.id))sessions.set(a.id,{visible:Math.min(4,a.chartCase?.bars.length||0),answers:{}});
  return sessions.get(a.id);
 }
 function visibleBars(c,count){return c.bars.slice(0,clamp(Math.trunc(count)||1,1,c.bars.length));}
 function chartHTML(c,count){
  const bars=visibleBars(c,count),n=bars.length,[min,max]=c.yDomain;
  const W=680,H=300,left=62,right=20,top=28,bottom=44;
  const dx=(W-left-right)/c.bars.length;
  const x=i=>left+dx*(i+.5),y=p=>top+(max-p)/(max-min)*(H-top-bottom);
  const grid=Array.from({length:5},(_,i)=>{const p=min+(max-min)*i/4;return '<line x1="'+left+'" x2="'+(W-right)+'" y1="'+y(p)+'" y2="'+y(p)+'" stroke="#e3e7ed"/><text x="50" y="'+(y(p)+5)+'" text-anchor="end" fill="#687080" font-size="13">'+p.toFixed(1)+'</text>';}).join("");
  const levels=(c.levels||[]).filter(l=>(l.afterBar||0)<=n).map(l=>'<line x1="'+left+'" x2="'+(W-right)+'" y1="'+y(l.price)+'" y2="'+y(l.price)+'" stroke="#c18124" stroke-dasharray="5 5"/><text x="'+(W-right-2)+'" y="'+(y(l.price)-6)+'" text-anchor="end" fill="#865416" font-size="13">'+esc(l.label)+'</text>').join("");
  const candles=bars.map((b,i)=>{const up=b.c>=b.o,color=up?"#176bb9":"#626b78",height=Math.max(2,Math.abs(y(b.o)-y(b.c))),width=Math.min(26,dx*.56);
   return '<g data-visible-bar="'+(i+1)+'"><line x1="'+x(i)+'" x2="'+x(i)+'" y1="'+y(b.h)+'" y2="'+y(b.l)+'" stroke="'+color+'" stroke-width="2"/><rect x="'+(x(i)-width/2)+'" y="'+Math.min(y(b.o),y(b.c))+'" width="'+width+'" height="'+height+'" fill="'+(up?"#e3f0ff":color)+'" stroke="'+color+'" stroke-width="2"/><text x="'+x(i)+'" y="'+(H-18)+'" text-anchor="middle" fill="#687080" font-size="13">'+(i+1)+'</text></g>';
  }).join("");
  const last=bars.at(-1),note=c.notes?.[n-1]||"只根據已揭露的棒，寫下觀察、假說與失效條件。";
  return '<section class="pa-replay" aria-label="自編逐根圖例"><h2 id="reader-chart">'+esc(c.title)+'</h2><p>'+esc(c.context)+'</p><div class="pa-chart"><svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="假想價格圖，已揭露 '+n+' 根，藍色收高、灰色收低">'+grid+levels+candles+'</svg></div><div class="pa-replay-controls"><button type="button" class="btn secondary small" data-replay="previous" '+(n<=1?"disabled":"")+'>← 前一根</button><strong aria-live="polite">已揭露 '+n+' / '+c.bars.length+' 根</strong><button type="button" class="btn secondary small" data-replay="next" '+(n>=c.bars.length?"disabled":"")+'>下一根 →</button><button type="button" class="text-btn" data-replay="reset">重新開始</button></div><p class="pa-observation" role="status"><strong>現在只知道：</strong>'+esc(note)+'</p><p class="pa-lastbar">本根：開 '+last.o+'／高 '+last.h+'／低 '+last.l+'／收 '+last.c+'</p><details class="pa-data"><summary>查看已揭露的 OHLC 數字</summary><div class="reader-table-wrap"><table><thead><tr><th>棒序</th><th>開</th><th>高</th><th>低</th><th>收</th></tr></thead><tbody>'+bars.map((b,i)=>'<tr><td>'+(i+1)+'</td><td>'+b.o+'</td><td>'+b.h+'</td><td>'+b.l+'</td><td>'+b.c+'</td></tr>').join("")+'</tbody></table></div></details><p class="pa-example-note">本網站自編假想資料，每根視為一個已完成的十分鐘區間；橫軸為棒序，非實際日期。座標範圍事前固定；由棒形成的參考線只在相應棒已揭露後顯示。未揭露的 OHLC 不參與繪圖。藍色收高、灰色收低。這是學習圖例，沒有模擬成交或績效。</p></section>';
 }
 function quizHTML(a,s){
  const qs=a.caseQuiz||[];
  return '<section class="pa-quiz"><h2 id="reader-self-check">先判斷，再看解析</h2><p>以下為本網站自編題目。選擇後才顯示解析，結果不列入已讀進度或實盤資格。</p>'+qs.map((q,i)=>{
   const chosen=s.answers[i],answered=Number.isInteger(chosen);
   return '<fieldset class="pa-question"><legend>'+(i+1)+'．'+esc(q.question)+'</legend><div class="pa-choices">'+q.choices.map((c,j)=>'<button type="button" data-quiz="'+i+'" data-choice="'+j+'" aria-pressed="'+(chosen===j)+'"><span>'+String.fromCharCode(65+j)+'</span>'+esc(c)+'</button>').join("")+'</div>'+(answered?'<div class="pa-answer '+(chosen===q.answerIndex?"is-correct":"")+'" role="status"><strong>'+(chosen===q.answerIndex?"判讀一致":"再比較一次")+' · 參考選項 '+String.fromCharCode(65+q.answerIndex)+'</strong><p>'+esc(q.explanation)+'</p></div>':'<p class="pa-answer-pending">選一個答案，查看理由與反例。</p>')+'</fieldset>';
  }).join("")+'</section>';
 }
 function render(a){
  const s=session(a);
  return '<div class="reader-label">自編圖例與測驗 · 非原作者題庫</div>'+(a.chartCase?chartHTML(a.chartCase,s.visible):"")+quizHTML(a,s);
 }
 function mount(container,a){
  const s=session(a);
  function refresh(selector){container.innerHTML=render(a);mount(container,a);container.querySelector(selector)?.focus({preventScroll:true});}
  container.querySelectorAll("[data-replay]").forEach(b=>b.addEventListener("click",()=>{
   const action=b.dataset.replay;
   s.visible=action==="reset"?1:clamp(s.visible+(action==="next"?1:-1),1,a.chartCase.bars.length);
   refresh('[data-replay="'+action+'"]');
  }));
  container.querySelectorAll("[data-quiz]").forEach(b=>b.addEventListener("click",()=>{
   const i=Number(b.dataset.quiz),j=Number(b.dataset.choice);
   if(!Number.isInteger(i)||!Number.isInteger(j)||!a.caseQuiz[i]?.choices[j])return;
   s.answers[i]=j;refresh('[data-quiz="'+i+'"][data-choice="'+j+'"]');
  }));
 }
 globalThis.AtlasPractice=Object.freeze({render,mount,chartHTML,quizHTML,visibleBars});
})();

