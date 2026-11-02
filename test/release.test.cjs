const test=require('node:test'),assert=require('node:assert/strict'),{parse,bump,verifyTag}=require('../scripts/version-policy.cjs');
test('版本必須無前導零，並且有完整三段',()=>{for(const s of ['01.0.0','1.0','v1.0.0','1.0.0-beta'])assert.throws(()=>parse(s));});
test('升 minor 與 major 時，後續數字歸零',()=>{assert.equal(bump('1.2.9','patch'),'1.2.10');assert.equal(bump('1.2.9','minor'),'1.3.0');assert.equal(bump('1.2.9','major'),'2.0.0');});
test('標籤必須吻合內容，且不能回退到較舊版本',()=>{assert.throws(()=>verifyTag('1.0.1','v1.0.0'));assert.throws(()=>verifyTag('1.0.1','v1.0.1',['v1.1.0']));assert.throws(()=>verifyTag('1.0.0','v1.0.0',['v2.0.0']));assert.equal(verifyTag('1.0.10','v1.0.10',['v1.0.9','v1.0.10']),true);});
