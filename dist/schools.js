/* Comparative learning planner. Choices describe intended data, not connected feeds. */
(() => {
 'use strict';
 const root=document.querySelector('#schools');if(!root)return;
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const profiles=[
  {key:'pa',name:'Brooks Price Action',tag:'價格結構主線',question:'現在偏向趨勢、區間，還是轉換？',focus:'以已知高低點、逐棒強弱、突破及後續反應整理背景。',data:'基本價格圖可開始；交易研究仍須成交與成本。',limit:'作者的經驗機率保留事件與上下文，不能直接移植為微台或 BTC 勝率。',ids:['brooks-context-first','bp2-breakout-followthrough','bp2-reversal-evidence'],refs:[['Main 12A · 市場週期（相關補讀）','https://www.brookstradingcourse.com/price-action-fundamentals/video-12a-market-cycle/'],['Main 15A · 突破（相關補讀）','https://www.brookstradingcourse.com/price-action-fundamentals/video-15a-breakouts/']],evidence:'官方公開文章與課綱可核對觀念；未聲稱讀完付費課或驗證作者全部績效。'},
  {key:'wyckoff',name:'威科夫 Wyckoff',tag:'價量與階段',question:'區間內的測試，支持哪一個供需假說？',focus:'用價格、可靠量能、較大段結構及測試事件，區分候選累積、派發或未決。',data:'價量口徑要一致；點數圖因果推算另需固定規格。',limit:'Spring／UTAD 並非必備；綜合人是思考模型，圖形不識別真實機構。',ids:['wyckoff-cycle','wyckoff-spring','wyckoff-effort'],refs:[['ChartSchool · 威科夫公開教材','https://chartschool.stockcharts.com/table-of-contents/market-analysis/wyckoff-analysis-articles/the-wyckoff-method-a-tutorial'],['Wyckoff Analytics · 結構變異的提醒','https://www.wyckoffanalytics.com/accumulation-the-bigger-picture/']],evidence:'本批核對當代威科夫教育機構公開文章，未取得威科夫原版完整課程。商業課程介紹與教學清晰度，不作收益證明。'},
  {key:'ict',name:'ICT · Inner Circle Trader',tag:'結構、區域與時段',question:'穿越既有高低點之後，有哪些可確認的結構變化？',focus:'將流動性位置、位移、MSS、三棒 FVG 與時段，拆成可重播的研究條件。',data:'K 線可描述圖形；完整成交與掛單仍需不同資料。',limit:'FVG 不表示從未成交，OB 不證明機構倉位；紐約時窗須處理夏令時間。',ids:['ict-fvg','ict-structure','ict-liquidity'],refs:[['官方 2022 Mentorship 播放清單','https://www.youtube.com/playlist?list=PLVgHx4Z63paYiFGQ56PjTF1PGePL3r69s'],['官方 Episode 6 · FVG／MSS 主題入口','https://www.youtube.com/watch?v=Bkt8B3kLATQ']],evidence:'核對官方影片名稱與公開描述，未取得官方逐字稿、未宣稱完整觀看。本站公式為最小研究定義；受眾與觀看數屬傳播度，沒有在本批形成獨立績效評分。'},
  {key:'flow',name:'Order Flow · 訂單流',tag:'成交與可見掛單',question:'關鍵價位實際成交了什麼，可見委託又如何改變？',focus:'用 Footprint、Delta／CVD、DOM 與深度事件觀察更細的市場活動。',data:'需要主動方向與價位成交；深度研究還需同步快照與更新。',limit:'Delta 不是人數差或淨流入；掛單消失可能撤單。較細資料也不識別機構身份。',ids:['flow-footprint','flow-absorption','flow-depth'],refs:[['Sierra Chart · Numbers Bars 定義','https://www.sierrachart.com/index.php?l=doc/NumbersBars.php'],['CME · MBO 與 MBP 格式說明','https://www.cmegroup.com/articles/faqs/market-by-order-mbo.html']],evidence:'官方交易所與軟體文件可核對格式、計算與資料範圍；本輪沒有連接即時訂單流、訂閱付費行情或取得獨立策略實績。'}
 ];
 const rows=[
  ['主要觀察','價格、擺動、背景與跟進','價量、階段與結構測試','高低點、位移、FVG、時段','主動成交與可見委託事件'],
  ['基本資料','已完成 OHLC','價格＋可靠、可比較的量','固定切棒的 OHLC 與時區','逐筆／價位分類；深度另需更新'],
  ['可問的問題','突破後是否被接受？','測試後是否減少供給／需求？','穿越後是否符合固定結構定義？','成交努力與價格反應是否一致？'],
  ['確認與失效','後續收線與事前結構界線','候選、測試及反方向證據','第三棒收線、結構點與期限','事前價格區域、事件窗與資料完整'],
  ['適合的研究場景','先用十分鐘圖建立共同事件','較大區間與可靠價量比較','明確價位、時窗與形態辨識','關鍵價位的細部成交／執行'],
  ['常見誤讀','漂亮棒型等於固定勝率','事後標字母就證明吸籌','FVG 是無成交區、OB 是真實掛單','正Delta必漲、大掛單一定守住'],
  ['量化入口','固定背景、突破與收線條件','凍結邊界、測試及量能尺度','凍結擺動、影線、時點與門檻','凍結分類、重置、序號與缺漏'],
  ['微台日盤限制','契約、08:45切棒與成本','量能差異未釐清不確認價量','紐約開盤不能平移成日盤開盤','現有十分鐘與成交下載不等於完整簿'],
  ['BTC 限制','平台、永續及週末背景','固定市場與成交量單位','週期、時窗、DST及資金費','單一平台／串流不代表全市場'],
  ['證據如何評價','教學估計與市場實測分開','模型與可否證觀察分開','原作者入口與本站規則分開','文件規格與獲利證據分開']
 ];
 const views={
  pa:{title:'PA：先記越界、收回與跟進',facts:'價格下探99後返回104，再離開已標觀察區。可研究已知位置與後續反應。',missing:'此圖不是完整OHLC；若採收線確認，先定義每個點的資料身分。',next:'固定候選與失效時點，再用下一個可用成交研究，不把最後115帶回最初判斷。'},
  wyckoff:{title:'威科夫：候選測試，量能仍缺項',facts:'下側穿越後返回，可以提出候選 spring 或其他競爭假說。',missing:'沒有可靠成交量與完整階段背景，不能把它確認為價量累積或辨認操盤者。',next:'先保存候選與未決，量能核對後才研究是否增加資訊。'},
  ict:{title:'ICT：先有已知高低點，再談結構變化',facts:'可以記錄穿越已知低點及反向推進，另訂位移與擺動確認條件。',missing:'折線沒有連續三棒影線，不能由此圖宣告 FVG；也沒有機構未成交委託。',next:'先固定 MSS 的研究版本；FVG 與時段是另需資料的條件，不補畫不存在的證據。'},
  flow:{title:'訂單流：這份圖的資料還不夠',facts:'價格只指出可以進一步觀察的位置。',missing:'缺價位成交、主動方分類與深度，無法畫出真實 Footprint、CVD 或吸收。',next:'取得合法、同步且完整的對應資料後，再新增一層研究；不以棒色估算值冒充實際分類。'}
 };
 const link=(url,t)=>'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(t)+' ↗</a>';
 const titles=globalThis.AtlasSchoolTitles||{};
 document.querySelector('#school-cards').innerHTML=profiles.map(p=>'<article class="school-card card"><span class="pill blue">'+esc(p.tag)+'</span><h3>'+esc(p.name)+'</h3><p><strong>'+esc(p.question)+'</strong></p><p>'+esc(p.focus)+'</p><p><strong>資料起點：</strong>'+esc(p.data)+'</p><p><strong>保留的界線：</strong>'+esc(p.limit)+'</p><div class="school-links">'+p.ids.map((id,i)=>'<a href="#read/'+id+'">'+(i+1)+'．'+esc(titles[id]||id)+' →</a>').join('')+'</div><details><summary>來源、評價與實際取得範圍</summary><p>'+esc(p.evidence)+'</p>'+p.refs.map(r=>'<p>'+link(r[1],r[0])+'</p>').join('')+'</details></article>').join('');
 document.querySelector('#school-table-body').innerHTML=rows.map(r=>'<tr><th scope="row">'+esc(r[0])+'</th>'+r.slice(1).map(v=>'<td>'+esc(v)+'</td>').join('')+'</tr>').join('');
 const buttons=Array.from(document.querySelectorAll('[data-school-view]'));
 function show(key){const v=views[key];if(!v)return;buttons.forEach(b=>{const selected=b.dataset.schoolView===key;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});document.querySelector('#school-scene-output').innerHTML='<h4>'+esc(v.title)+'</h4><p><strong>目前可見：</strong>'+esc(v.facts)+'</p><p><strong>仍然缺少：</strong>'+esc(v.missing)+'</p><p><strong>下一步：</strong>'+esc(v.next)+'</p>';document.querySelector('#school-scene-output').setAttribute('aria-labelledby','school-view-'+key);}
 buttons.forEach((b,i)=>{b.addEventListener('click',()=>show(b.dataset.schoolView));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const j=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;show(buttons[j].dataset.schoolView);buttons[j].focus();});});
 function plan(){const market=document.querySelector('#school-market').value,data=document.querySelector('#school-data').value,hasVolume=data!=='ohlc',hasTrades=['trades','depth'].includes(data),hasDepth=data==='depth';
  const descriptions=[['Brooks PA','先研究已知高低點、突破與返回，固定收線與成交時點。'],['威科夫',hasVolume?'若量已核對，可比較相同時段的努力與結果；階段標記仍保留未決。':'先做價格事件練習，量能未提供，不確認價量累積或派發。'],['ICT','有完整OHLC才做三棒與結構辨識；時窗另按日期與市場定義。'],['訂單流',hasDepth?'可規劃分類成交與可見掛單回放；先驗證快照、序號及同步。':hasTrades?'可規劃Footprint／CVD；沒有深度時不還原掛單新增與撤銷。':'資料不足以還原真實Delta、CVD與DOM；先列取得需求。']];
  document.querySelector('#school-planner-output').innerHTML=descriptions.map(([t,d])=>'<div><h4>'+esc(t)+'</h4><p>'+esc(d)+'</p></div>').join('');
  document.querySelector('#school-market-note').textContent=market==='tmf'?'微台：使用實際TMF契約與日盤。本站既有量能差異仍待釐清；此選單不代表已取得或驗證任何新資料。紐約開盤時段也不能直接替代日盤開盤。':'BTC：固定Binance USDⓈ-M BTCUSDT、數量單位與資金費。這是單一平台研究；選單不代表本站已連接逐筆或深度，人工確認時段另按原規劃。';
 }
 ['school-market','school-data'].forEach(id=>document.querySelector('#'+id).addEventListener('change',plan));show('pa');plan();
 globalThis.AtlasSchools={show,plan};
})();
