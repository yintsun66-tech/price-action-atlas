/* Curated media and books. Existing learning and reading storage remain untouched. */
(() => {
  'use strict';
  const controllers = [];
  for (const name of ['media', 'books']) {
    const root = document.getElementById(name);
    if (!root) continue;
    const grid = root.querySelector('[data-catalog-grid]');
    const cards = Array.from(grid.children);
    const search = root.querySelector('[data-catalog-search]');
    const type = root.querySelector('[data-catalog-type]');
    const language = root.querySelector('[data-catalog-language]');
    const sort = root.querySelector('[data-catalog-sort]');
    const reset = root.querySelector('[data-catalog-reset]');
    const more = root.querySelector('[data-catalog-more]');
    const status = root.querySelector('[data-catalog-status]');
    const initial = name === 'media' ? 6 : 4;
    let limit = initial;
    const normalize = value => value.normalize('NFKC').toLocaleLowerCase();
    const text = new Map(cards.map(card => [card, normalize(card.textContent)]));
    function render() {
      const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
      const rows = cards.filter(card =>
        (!type || type.value === 'all' || card.dataset.type === type.value) &&
        (!language || language.value === 'all' || card.dataset.language === language.value) &&
        terms.every(term => text.get(card).includes(term))
      );
      rows.sort((a, b) => sort?.value === 'popular'
        ? Number(b.dataset.popularity) - Number(a.dataset.popularity) || Number(a.dataset.order) - Number(b.dataset.order)
        : Number(a.dataset.order) - Number(b.dataset.order));
      cards.forEach(card => { card.hidden = true; });
      rows.forEach((card, index) => { grid.append(card); card.hidden = index >= limit; });
      status.textContent = '顯示 ' + Math.min(limit, rows.length) + ' / ' + rows.length + ' 筆符合的內容（共 ' + cards.length + ' 筆）';
      more.hidden = rows.length <= limit;
      more.textContent = '展開其餘 ' + Math.max(0, rows.length - limit) + ' 筆 ↓';
      root.querySelector('[data-catalog-empty]').hidden = rows.length !== 0;
      const note = root.querySelector('[data-popularity-note]');
      if (note) note.hidden = sort.value !== 'popular';
    }
    for (const control of [search, type, language, sort].filter(Boolean)) {
      control.addEventListener(control === search ? 'input' : 'change', () => { limit = initial; render(); });
    }
    function clear() {
      search.value = '';
      for (const control of [type, language, sort].filter(Boolean)) control.value = control.querySelector('option').value;
      limit = initial;
      render();
    }
    reset.addEventListener('click', clear);
    more.addEventListener('click', () => { limit = cards.length; render(); });
    function reveal(id) {
      const card = cards.find(row => row.id === id);
      if (!card) return;
      clear();
      limit = cards.length;
      render();
      card.scrollIntoView({block: 'start'});
    }
    controllers.push({reveal});
    root.querySelector('[data-catalog-controls]').hidden = false;
    render();
  }
  function route() {
    const id = location.hash.slice(1);
    if (/^(media|book)-[a-z0-9-]+$/.test(id)) controllers.forEach(control => control.reveal(id));
  }
  window.addEventListener('hashchange', route);
  route();
})();
