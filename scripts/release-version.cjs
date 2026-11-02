const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{bump}=require('./version-policy.cjs');
const root=path.resolve(__dirname,'..'),[kind,...args]=process.argv.slice(2),i=args.indexOf('--summary'),summary=i<0?'':args.slice(i+1).join(' ').trim();assert.ok(summary,'請提供 --summary "本版實質變更"；未提供不改檔案。');
const file=n=>path.join(root,n),json=n=>JSON.parse(fs.readFileSync(file(n),'utf8')),old=fs.readFileSync(file('VERSION'),'utf8').trim(),next=bump(old,kind),release=json('release.json'),pkg=json('package.json');assert.equal(release.version,old);assert.equal(pkg.version,old);
const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
release.version=next;release.released=date;release.notes=[summary];pkg.version=next;
fs.writeFileSync(file('VERSION'),next+'\n');for(const [name,value]of [['package.json',pkg],['release.json',release]])fs.writeFileSync(file(name),JSON.stringify(value,null,2)+'\n');
const changelog=fs.readFileSync(file('CHANGELOG.md'),'utf8');fs.writeFileSync(file('CHANGELOG.md'),changelog.replace('# 版本更新紀錄\n',`# 版本更新紀錄\n\n## v${next} — ${date}\n\n- ${summary}\n`));
require('./stamp-version.cjs');console.log(old+' → '+next+'；請補齊 release.json notes 與 CHANGELOG，完成驗證後才標記發布。');
