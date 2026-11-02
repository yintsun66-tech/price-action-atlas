const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{parse}=require('./version-policy.cjs');
const root=path.resolve(__dirname,'..'),json=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8')),release=json('release.json'),version=fs.readFileSync(path.join(root,'VERSION'),'utf8').trim();parse(version);assert.equal(release.version,version);assert.equal(json('package.json').version,version);
const file=path.join(root,'dist/index.html');let html=fs.readFileSync(file,'utf8');
html=html.replace(/<!-- ATLAS_RELEASE_START -->[\s\S]*?<!-- ATLAS_RELEASE_END -->\s*/g,'').replace(/<!-- ATLAS_VERSION_HEAD -->[\s\S]*?<!-- ATLAS_VERSION_HEAD_END -->\s*/g,'');
html=html.replace('</head>',`<!-- ATLAS_VERSION_HEAD --><meta name="atlas-version" content="${version}"><link rel="stylesheet" href="release.css?v=${version}"><!-- ATLAS_VERSION_HEAD_END -->\n</head>`);
const badge=`<!-- ATLAS_RELEASE_START --><a class="atlas-release" href="${release.repository}/releases/tag/v${version}" target="_blank" rel="noopener noreferrer" aria-label="網站版本 v${version}，查看更新紀錄">v${version}</a><!-- ATLAS_RELEASE_END -->`;
assert.ok(html.includes('<div class="topbar-actions">'));html=html.replace('<div class="topbar-actions">','<div class="topbar-actions">'+badge);
html=html.replace(/<footer class="footer">[\s\S]*?<\/footer>/,`<footer class="footer"><div><strong>Price Action Atlas</strong> · 繁體中文閱讀庫 · <a href="${release.repository}/releases/tag/v${version}" target="_blank" rel="noopener noreferrer">版本 v${version}</a> · ${release.released}</div><div><a href="${release.repository}" target="_blank" rel="noopener noreferrer">GitHub 原始檔與更新紀錄 ↗</a></div></footer>`);
// All local HTML asset links share the released version, including old generators' cache tokens.
html=html.replace(/((?:src|href)="(?!https?:|data:|#)[^"?]+)\?v=[^"&]+/g,`$1?v=${version}`);
fs.writeFileSync(file,html);fs.copyFileSync(path.join(root,'scripts/release.css'),path.join(root,'dist/release.css'));
fs.writeFileSync(path.join(root,'dist/version.json'),JSON.stringify({version,released:release.released,timezone:release.timezone,repository:release.repository,site:release.site,contentEdition:release.contentEdition,notes:release.notes},null,2)+'\n');
fs.writeFileSync(path.join(root,'dist/release-notes.txt'),`Price Action Atlas v${version} — ${release.released}\n\n${release.notes.map(s=>'- '+s).join('\n')}\n\n網站：${release.site}\n`);
console.log('Stamped release v'+version);
