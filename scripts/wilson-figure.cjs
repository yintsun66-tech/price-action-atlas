const G=require('./study-svg.cjs');
function wilson(w,n,z=1.9599639845){if(!Number.isInteger(n)||n<=0||!Number.isInteger(w)||w<0||w>n)throw Error('Invalid binomial counts');const p=w/n,d=1+z*z/n,center=(p+z*z/(2*n))/d,half=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return {p,lower:center-half,upper:center+half,width:2*half};}
const samples=[[14,20],[140,200]].map(([w,n])=>({w,n,...wilson(w,n)}));
function render(){const H=640,x=p=>210+p*650,fmt=p=>(p*100).toFixed(1);let s=G.start('同樣70%，區間不一樣寬','本站虛構計數 · 獨立同分布二元近似 · 雙側95% Wilson',H);
 for(let p=0;p<=100;p+=20)s+=`<path d="M${x(p/100)} 155V365" stroke="${G.C.line}"/>`+G.text(x(p/100),402,p+'%',20,G.C.muted,'middle');
 samples.forEach((a,i)=>{const y=205+i*130,c=i?G.C.teal:G.C.blue;s+=G.text(40,y-9,a.w+'／'+a.n,24,G.C.ink,'start',700)+G.text(40,y+24,'觀察70%',20,G.C.muted)+`<path d="M${x(a.lower)} ${y}H${x(a.upper)}" stroke="${c}" stroke-width="7"/><path d="M${x(a.lower)} ${y-12}V${y+12}M${x(a.upper)} ${y-12}V${y+12}" stroke="${c}" stroke-width="3"/><circle cx="${x(a.p)}" cy="${y}" r="8" fill="${c}"/>`+G.text((x(a.lower)+x(a.upper))/2,y-23,fmt(a.lower)+'%–'+fmt(a.upper)+'%',22,c,'middle',700);});
 return s+G.text(40,460,'第一組寬約37.3百分點；第二組寬約12.6百分點。',23)+G.text(40,502,'圓點是觀察比例，不是區間中點；不是下一筆勝率保證。',22,G.C.muted)+G.text(40,544,'同一成本假設仍為 −0.05R；比例區間不等於淨收益區間。',22,G.C.muted)+G.end(H);}
module.exports=Object.assign(render,{wilson,samples});
