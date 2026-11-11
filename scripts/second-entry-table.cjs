/* Original synthetic prices. Keep each price intact on a separate line. */
const G=require('./study-svg.cjs');
module.exports=()=>G.tableFigure('先看高低點，再辨認兩次嘗試','本站自編數字與分類 · 非市場實測',
 ['棒','高點變化','角色'],
 [['B → C',['25,034','→ 25,035'],'第一次向上觸發'],['D、E','高點回落至25,024','再次回落'],['E → F',['25,024','→ 25,025'],'第二次向上觸發']],
 'C 與 F 是觸發棒；第二次計數不保證續行，也不等於第二根陽線。');
