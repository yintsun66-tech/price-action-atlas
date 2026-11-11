/* Given high/low/close only. Do not invent opens or intrabar paths. */
const G=require('./study-svg.cjs');
module.exports=()=>G.tableFigure('同樣創高，收盤可能在兩側','本站自編 B2 比較 · 事前上緣 25,000',
 ['B2 欄位','路徑 A','路徑 B'],
 [['最高','25,056','25,060'],['最低','25,025','24,982'],['收盤',['25,050','留在上緣外'],['24,995','回到上緣內']]],
 '兩版共用 B1 收盤 25,036；B2 未完成前不能預填，這裡未給開盤。');
