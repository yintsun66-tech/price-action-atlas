const assert=require('node:assert/strict');
const parse=value=>{assert.match(value,/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/,'版本須為無前導零的 X.Y.Z');return value.split('.').map(Number);};
const compare=(a,b)=>{const x=parse(a),y=parse(b);for(let i=0;i<3;i++)if(x[i]!==y[i])return Math.sign(x[i]-y[i]);return 0;};
function bump(value,kind){const n=parse(value),index={major:0,minor:1,patch:2}[kind];assert.notEqual(index,undefined,'只接受 major、minor 或 patch');n[index]++;for(let i=index+1;i<3;i++)n[i]=0;return n.join('.');}
function verifyTag(version,tag,otherTags=[]){parse(version);assert.equal(tag,'v'+version,'標籤與 VERSION 不一致');for(const t of otherTags){if(t===tag||!/^v\d+\.\d+\.\d+$/.test(t))continue;assert.ok(compare(version,t.slice(1))>0,'禁止以較舊或相同版本覆蓋已發布版本：'+t);}return true;}
module.exports={parse,compare,bump,verifyTag};
