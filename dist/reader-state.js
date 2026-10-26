/* Reading progress is independent of the original 48-task learning plan. */
(function (root) {
  "use strict";
  const VERSION = 1, MAX_NOTE = 20000;
  function clean(raw, ids, strict = false) {
    const records = Object.create(null);
    const src = raw && typeof raw === "object" && raw.records && typeof raw.records === "object" ? raw.records : {};
    for (const id of ids) {
      const r = Object.prototype.hasOwnProperty.call(src, id) ? src[id] : null;
      if (!r || typeof r !== "object") continue;
      const note = typeof r.note === "string" ? r.note : "";
      if (strict && note.length > MAX_NOTE) throw new Error("單篇筆記超過 20,000 字元，請先分開整理");
      records[id] = {
        read: r.read === true, bookmarked: r.bookmarked === true,
        note: note.slice(0, MAX_NOTE),
        updated: typeof r.updated === "string" ? r.updated.slice(0, 40) : ""
      };
    }
    return { version: VERSION, records };
  }
  function merge(a, b, ids) {
    const current = clean(a, ids), incoming = clean(b, ids, true);
    for (const id of ids) {
      const x = current.records[id], y = incoming.records[id];
      if (!y) continue;
      if (!x) { current.records[id] = y; continue; }
      let note = x.note || y.note;
      if (x.note && y.note && x.note !== y.note) {
        note = x.note.includes(y.note) ? x.note : y.note.includes(x.note) ? y.note :
          x.note + "\n\n—— 匯入的閱讀筆記 ——\n" + y.note;
      }
      if (note.length > MAX_NOTE) throw new Error("合併後的筆記過長；原有筆記未變更，請先分開備份");
      current.records[id] = {
        read: x.read || y.read, bookmarked: x.bookmarked || y.bookmarked,
        note, updated: new Date().toISOString()
      };
    }
    return current;
  }
  root.AtlasReaderState = Object.freeze({ clean, merge, MAX_NOTE, VERSION });
})(globalThis);

