const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),release=JSON.parse(fs.readFileSync(path.join(root,'release.json'),'utf8'));
assert.match(release.contentBuild,/^scripts\/[a-z0-9-]+\.cjs$/);
for(const file of [release.contentBuild,'scripts/build-translation-ledger.cjs','scripts/enable-chinese-first.cjs','scripts/build-readability.cjs'])cp.execFileSync(process.execPath,[file],{cwd:root,stdio:'inherit'});
