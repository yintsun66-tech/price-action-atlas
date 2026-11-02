const fs=require('node:fs'),cp=require('node:child_process'),path=require('node:path'),{verifyTag}=require('./version-policy.cjs');
const root=path.resolve(__dirname,'..'),version=fs.readFileSync(path.join(root,'VERSION'),'utf8').trim(),tag=process.argv[2]||process.env.GITHUB_REF_NAME;
const tags=cp.execFileSync('git',['tag','--list','v*'],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);verifyTag(version,tag,tags);console.log('Validated release '+tag);
