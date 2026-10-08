/* Magic — shared site behaviour: dropdown menu, mobile menu, tabs, lead form. */
(function () {
  var doc = document.documentElement;
  doc.classList.remove('no-js'); doc.classList.add('js');

  function closeAll(except) {
    document.querySelectorAll('.nav-item.open').forEach(function (it) {
      if (it === except) return;
      it.classList.remove('open');
      var b = it.querySelector('.nav-btn'); if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  function bindHeader(root) {
    root.querySelectorAll('.nav-item').forEach(function (it) {
      var b = it.querySelector('.nav-btn'); if (!b) return;
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !it.classList.contains('open');
        closeAll(it);
        it.classList.toggle('open', open);
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    var burger = root.querySelector('.burger'), mnav = root.querySelector('.mnav');
    if (burger && mnav) burger.addEventListener('click', function () {
      var open = !mnav.classList.contains('open');
      mnav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.querySelector('.ic-open').style.display = open ? 'none' : '';
      burger.querySelector('.ic-close').style.display = open ? '' : 'none';
    });
    if (mnav) mnav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if ((a.getAttribute('href') || '').charAt(0) === '#') { mnav.classList.remove('open'); burger && burger.setAttribute('aria-expanded', 'false'); }
      });
    });
  }
  document.addEventListener('click', function (e) { if (!e.target.closest('.nav-item')) closeAll(null); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.nav-item.open');
    closeAll(null);
    if (open) { var b = open.querySelector('.nav-btn'); b && b.focus(); }
  });
  window.MagicBindHeader = bindHeader;
  var hdr = document.querySelector('.hdr'); if (hdr) bindHeader(hdr);

  // tabs
  document.querySelectorAll('[data-tabs]').forEach(function (box) {
    var tabs = box.querySelectorAll('[role="tab"]'), panels = box.querySelectorAll('[role="tabpanel"]');
    function sel(i, focus) {
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
      panels.forEach(function (p, j) { p.hidden = j !== i; });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { sel(i); });
      t.addEventListener('keydown', function (e) {
        var rtl = doc.dir === 'rtl', n = tabs.length;
        if (e.key === 'ArrowRight') sel((i + (rtl ? n - 1 : 1)) % n, true);
        if (e.key === 'ArrowLeft') sel((i + (rtl ? 1 : n - 1)) % n, true);
      });
    });
    sel(0);
  });

  // lead form (front-end only)
  document.querySelectorAll('form.lead').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var box = f.parentNode, t = box.querySelector('.thanks');
      f.hidden = true; if (t) { t.hidden = false; t.focus(); }
    });
  });
})();
