/* Authoring batches are chronological: base, 2, ... 9, 10. Never use lexical order. */
function sequence(file){const m=/^zh-core-source-reviews(?:-(\d+))?\.json$/.exec(file);if(!m)throw Error('Invalid source review filename');return m[1]?Number(m[1]):0;}
module.exports=(a,b)=>sequence(a)-sequence(b)||a.localeCompare(b);
