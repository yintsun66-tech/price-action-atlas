/* Original SVG teaching diagrams. Inputs are synthetic examples, never market data. */
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const C={ink:'#1d1d1f',muted:'#586272',blue:'#176bb9',teal:'#28766d',amber:'#9b671d',red:'#9d4f51',line:'#dce3ed',wash:'#f1f6fc'};
const text=(x,y,value,size=24,fill=C.ink,anchor='start',weight=450)=>`<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${esc(value)}</text>`;
function wrap(value,n=30){const chars=Array.from(String(value)),rows=[];for(let i=0;i<chars.length;i+=n)rows.push(chars.slice(i,i+n).join(''));return rows;}
function para(x,y,value,n=35,size=23,fill=C.muted){return wrap(value,n).map((r,i)=>text(x,y+i*(size+10),r,size,fill)).join('');}
function start(title,subtitle,H=600){return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="${H}" viewBox="0 0 960 ${H}" role="img" aria-labelledby="t d"><title id="t">${esc(title)}</title><desc id="d">${esc(subtitle)}。本站原創合成教學圖；不是即時行情、原作者圖表或績效證據。</desc><rect width="960" height="${H}" rx="22" fill="#fff"/><g font-family="-apple-system,BlinkMacSystemFont,'Microsoft JhengHei',sans-serif">${text(40,49,title,28,C.ink,'start',760)}${text(40,85,subtitle,21,C.muted)}`;}
function end(H=600){return `<path d="M40 ${H-48}H920" stroke="${C.line}"/>${text(40,H-20,'原創合成示意 · 非真實行情／交易訊號 · 價格、量與事件均須另行驗證',19,C.muted)}</g></svg>`;}
function plot(values,{x=85,y=150,w=790,h=245,min,max,color=C.blue,levels=[],labels=[]}={}){
 min=min??Math.min(...values)-2;max=max??Math.max(...values)+2;const px=i=>x+i*w/Math.max(1,values.length-1),py=v=>y+(max-v)/(max-min)*h;
 let s='';for(let i=0;i<4;i++){const v=min+(max-min)*i/3;const yy=py(v);s+=`<path d="M${x} ${yy}H${x+w}" stroke="${C.line}"/>`+text(x-12,yy+7,Number(v.toFixed(1)).toLocaleString('en-US'),20,C.muted,'end');}
 for(const l of levels)s+=`<path d="M${x} ${py(l.price)}H${x+w}" stroke="${C.amber}" stroke-dasharray="7 6" stroke-width="2"/>`+text(x+w,py(l.price)-9,l.label,20,C.amber,'end');
 s+=`<path d="${values.map((v,i)=>(i?'L':'M')+px(i)+' '+py(v)).join(' ')}" fill="none" stroke="${color}" stroke-width="4.5" stroke-linejoin="round"/>`;
 values.forEach((v,i)=>{s+=`<circle cx="${px(i)}" cy="${py(v)}" r="4" fill="${color}"/>`;if(values.length<=14)s+=text(px(i),y+h+31,i+1,20,C.muted,'middle');});
 for(const l of labels)s+=`<circle cx="${px(l.at)}" cy="${py(values[l.at])}" r="15" fill="#fff" stroke="${color}" stroke-width="2"/>`+text(px(l.at),py(values[l.at])+7,l.mark,20,color,'middle',750);
 return s;
}
function lineFigure(title,subtitle,values,{levels=[],notes=[],min,max}={}){const H=640+Math.max(0,notes.length-3)*35;return start(title,subtitle,H)+plot(values,{min,max,levels})+text(85,434,'橫軸：觀察順序；折線僅表達本圖指定價位',20,C.muted)+notes.map((s,i)=>text(40,478+i*34,s,22)).join('')+end(H);}
function paired(title,subtitle,a,b,notes=[]){const H=625;return start(title,subtitle,H)+text(60,133,a.title,23,C.ink,'start',700)+text(530,133,b.title,23,C.ink,'start',700)+plot(a.values,{x:95,y:170,w:325,h:230,min:a.min,max:a.max,levels:a.levels||[]})+plot(b.values,{x:565,y:170,w:325,h:230,min:b.min,max:b.max,levels:b.levels||[],color:C.teal})+notes.map((s,i)=>text(40,468+i*34,s,22)).join('')+end(H);}
function processFigure(title,subtitle,steps,footer='每次更新都保存當時資料，不以後來結果回填原判斷。'){
 const H=210+Math.ceil(steps.length/2)*160;let s=start(title,subtitle,H);
 steps.forEach((p,i)=>{const x=40+(i%2)*460,y=118+Math.floor(i/2)*160;s+=`<rect x="${x}" y="${y}" width="420" height="135" rx="16" fill="${i%2?'#f4f7f8':C.wash}" stroke="${C.line}"/>`+text(x+22,y+37,String(i+1).padStart(2,'0')+'  '+p[0],24,C.ink,'start',730)+para(x+22,y+78,p[1],17,21);});
 s+=text(40,H-76,footer,21,C.muted);return s+end(H);
}
function tableFigure(title,subtitle,headers,rows,footer='各欄描述的是不同事件，請先確認計算口徑。'){
 const widths=headers.map(()=>880/headers.length),rowH=86,H=235+(rows.length+1)*rowH;let s=start(title,subtitle,H);const y=122;
 headers.forEach((h,j)=>{const x=40+widths[j]*j;s+=`<rect x="${x}" y="${y}" width="${widths[j]}" height="72" fill="${C.wash}"/>`+para(x+16,y+29,h,Math.floor((widths[j]-28)/23),22,C.ink);});
 rows.forEach((row,i)=>row.forEach((v,j)=>{const x=40+widths[j]*j,yy=y+72+i*rowH;s+=`<rect x="${x}" y="${yy}" width="${widths[j]}" height="${rowH}" fill="${i%2?'#f8f9fb':'#fff'}" stroke="${C.line}"/>`+(Array.isArray(v)?v.map((line,k)=>text(x+16,yy+31+k*32,line,22,C.ink)).join(''):para(x+16,yy+31,v,Math.floor((widths[j]-28)/22),22,C.ink));}));
 s+=para(40,H-107,footer,38,21);return s+end(H);
}
function candlePlot(bars,{x=90,y=150,w=770,h=260,min,max,levels=[]}={}){
 min=min??Math.min(...bars.map(b=>b.l))-1;max=max??Math.max(...bars.map(b=>b.h))+1;const py=v=>y+(max-v)/(max-min)*h,dx=w/bars.length;let s='';
 for(let i=0;i<4;i++){const v=min+(max-min)*i/3;s+=`<path d="M${x} ${py(v)}H${x+w}" stroke="${C.line}"/>`+text(x-12,py(v)+7,Number(v.toFixed(1)).toLocaleString('en-US'),20,C.muted,'end');}
 for(const l of levels)s+=`<path d="M${x} ${py(l.price)}H${x+w}" stroke="${C.amber}" stroke-width="2" stroke-dasharray="7 6"/>`+text(x+w,py(l.price)-8,l.label,20,C.amber,'end');
 bars.forEach((b,i)=>{const xx=x+dx*(i+.5),up=b.c>=b.o,color=up?C.blue:C.muted,ww=Math.min(40,dx*.44);s+=`<path d="M${xx} ${py(b.h)}V${py(b.l)}" stroke="${color}" stroke-width="3"/><rect x="${xx-ww/2}" y="${Math.min(py(b.o),py(b.c))}" width="${ww}" height="${Math.max(3,Math.abs(py(b.o)-py(b.c)))}" fill="${up?'#e4f0fe':color}" stroke="${color}" stroke-width="2"/>`+text(xx,y+h+31,i+1,22,C.muted,'middle');});return s;
}
function candles(title,subtitle,bars,notes=[],levels=[]){const H=650+Math.max(0,notes.length-3)*34;return start(title,subtitle,H)+candlePlot(bars,{levels})+notes.map((s,i)=>text(40,468+i*34,s,22)).join('')+end(H);}
function fvgFigure(){const H=660,bull=[{o:99,h:101,l:98,c:100},{o:100,h:104,l:99.5,c:103.5},{o:103.5,h:106,l:102.5,c:105}],bear=[{o:105,h:106,l:104,c:104.5},{o:104.5,h:105,l:100,c:100.5},{o:100.5,h:102.5,l:98,c:99}];
 let s=start('FVG：以影線極值辨識三棒區間','本圖是本站最小幾何定義；須等第 3 棒收線',H)+text(65,133,'多頭：L3 102.5 > H1 101',23,C.blue,'start',700)+text(530,133,'空頭：H3 102.5 < L1 104',23,C.teal,'start',700);
 s+=candlePlot(bull,{x:90,y:165,w:330,h:255,min:97,max:107})+candlePlot(bear,{x:565,y:165,w:330,h:255,min:97,max:107});
 const py=v=>165+(107-v)/10*255;
 s+=`<rect x="110" y="${py(102.5)}" width="290" height="${py(101)-py(102.5)}" fill="#f5d79f" opacity=".48"/><rect x="585" y="${py(104)}" width="290" height="${py(102.5)-py(104)}" fill="#b8ddd5" opacity=".48"/>`;
 s+=text(70,477,'多頭候選區：[101, 102.5]',23)+text(530,477,'空頭候選區：[102.5, 104]',23)+text(40,527,'第 2 棒的價幅已穿越該區；三棒不重疊，不代表從未成交。',23)+text(40,563,'這張 K 線圖也沒有提供當時的掛單深度或機構身份。',23,C.muted);return s+end(H);
}
module.exports={esc,C,text,para,start,end,plot,lineFigure,paired,processFigure,tableFigure,candles,candlePlot,fvgFigure};
