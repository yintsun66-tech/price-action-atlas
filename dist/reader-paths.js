/* Learning navigation reads the reader's state; it never stores or changes learner records. */
(function(root){
  'use strict';
  const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const START={id:'start',title:'第一次來：背景、K 棒、風險與紀錄',description:'先建立共同語言，再留下自己的判斷。這是本站編排的入門路線，不是任何講師的官方課綱。',ids:['brooks-context-first','brooks-candle-evidence','practice-risk-in-r','practice-journal-before-after']};
  const tasks={
    'brooks-context-first':'先遮住右側：寫下行情背景，以及一項會改變你看法的證據。',
    'brooks-candle-evidence':'用開、高、低、收描述一根棒，再寫一個相同棒形卻不宜進場的背景。',
    'practice-risk-in-r':'自訂進場與停損，計算一口的計畫金額風險，另列成本與跳空限制。',
    'practice-journal-before-after':'保留一份當時預期與一份事後結果，檢查自己是否把結果寫回事前。',
    'ict-event-rates':'先寫事件、分母與觀察期限，再說明為何回補比例不是交易勝率。',
    'wyckoff-template-uncertainty':'指出區間中仍未確定的一件事，避免只挑符合圖式的部分。',
    'flow-footprint':'把主動成交分類與每筆交易同時存在的買賣雙方分開說明。',
    'flow-depth':'列出可見掛單、撤單與實際成交各需要哪一種資料。',
    'pa3-stop-execution':'分別寫出停損觸發、送單與成交；為跳空情境保留不利價格。',
    'pa3-research-register':'先登記規則及失敗版本，再看成績，保留未用於調參的新資料。'
  };
  function prepare(paths,articles){
    const byId=new Map(articles.map(a=>[a.id,a]));
    return [START,...paths.map((p,i)=>({...p,id:'route-'+i}))].map(p=>({...p,steps:p.ids.filter(id=>byId.has(id)).map(id=>({...byId.get(id),task:tasks[id]||'讀完先做本篇「練習」，再到「來源與授權」核對條件與使用範圍。'}))})).filter(p=>p.steps.length);
  }
  function model(routes,selected,records){
    const route=routes.find(p=>p.id===selected)||routes[0];if(!route)return null;
    const steps=route.steps.map(a=>({...a,read:records?.[a.id]?.read===true}));
    return {route,steps,done:steps.filter(a=>a.read).length,next:steps.find(a=>!a.read)||steps[0],complete:steps.every(a=>a.read),minutes:steps.reduce((n,a)=>n+(Number(a.minutes)||0),0)};
  }
  function options(routes){return routes.map(p=>'<option value="'+E(p.id)+'">'+E(p.title)+'</option>').join('');}
  function render(m){
    if(!m)return '<p>目前沒有可用路線，仍可從下方閱讀庫選篇。</p>';
    return '<div class="learning-path-head"><div><span class="learning-path-label">一次專注一條路線</span><h4>'+E(m.route.title)+'</h4><p>'+E(m.route.description)+'</p></div><a class="btn primary" href="#read/'+E(m.next.id)+'">'+(m.complete?'重讀這條路線':'繼續下一篇未讀')+' →</a></div><div class="learning-path-progress"><span>已標記已讀 <strong>'+m.done+' / '+m.steps.length+'</strong> 篇</span><span>文章標示閱讀時間合計約 '+m.minutes+' 分鐘；練習另計</span><progress max="'+m.steps.length+'" value="'+m.done+'" aria-label="本條路線已讀進度"></progress></div><ol class="learning-path-steps">'+m.steps.map((a,i)=>'<li><span class="learning-path-number" aria-hidden="true">'+String(i+1).padStart(2,'0')+'</span><div><span class="learning-path-step-meta">'+E(a.level)+' · 約 '+E(a.minutes)+' 分鐘 · '+(a.read?'已標記已讀 ✓':'尚未標記已讀')+'</span><h5><a href="#read/'+E(a.id)+'">'+E(a.title)+'</a></h5><p><strong>留下一個答案：</strong>'+E(a.task)+'</p></div></li>').join('')+'</ol><p class="learning-path-boundary"><strong>已讀是你的閱讀標記，不能代替理解、自測或交易驗證。</strong>開啟文章後，可從「整理圖」「練習」與「圖例與測驗」繼續；各篇提供的分頁依實際內容顯示。進度沿用原有紀錄。</p>';
  }
  root.AtlasLearningPaths=Object.freeze({prepare,model,options,render});
})(globalThis);
