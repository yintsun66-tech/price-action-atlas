/* Six complete synthetic trades, grouped two ways. Horizontal axes are bar order. */
const G=require('./study-svg.cjs');
const trades=[{time:'08:45:01',price:100,qty:1},{time:'08:45:02',price:101,qty:8},{time:'08:45:03',price:99,qty:1},{time:'08:46:00',price:102,qty:4},{time:'08:55:00',price:98,qty:3},{time:'09:04:59',price:103,qty:2}];
const aggregate=xs=>({o:xs[0].price,h:Math.max(...xs.map(t=>t.price)),l:Math.min(...xs.map(t=>t.price)),c:xs.at(-1).price,v:xs.reduce((n,t)=>n+t.qty,0)});
const countBars=[aggregate(trades.slice(0,3)),aggregate(trades.slice(3))],timeBars=[aggregate(trades.slice(0,4)),aggregate(trades.slice(4))];
function render(){const H=660;return G.start('同六筆成交，四根不同的棒','本站合成資料；3筆棒僅為手算，非平台可選設定',H)+G.text(65,133,'每 3 筆成交一棒',23,G.C.blue,'start',700)+G.text(530,133,'08:45 起每十分鐘一棒',23,G.C.teal,'start',700)+G.candlePlot(countBars,{x:90,y:165,w:330,h:250,min:96,max:104})+G.candlePlot(timeBars,{x:565,y:165,w:330,h:250,min:96,max:104})+G.text(60,480,'數量合計：10 ／ 9',22)+G.text(530,480,'數量合計：14 ／ 5',22)+G.text(60,519,'歷時：2秒 ／ 18分59秒',21,G.C.muted)+G.text(530,519,'每棒區間：10分鐘',21,G.C.muted)+G.text(40,567,'橫軸只顯示棒序，不按時間等比例；筆數、數量與分鐘不可互換。',22,G.C.muted)+G.end(H);}
module.exports=Object.assign(render,{trades,aggregate,countBars,timeBars});
