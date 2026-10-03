(function () {
  'use strict';

  /* 网盘按钮：按 data-link 统一读 SITE_LINKS 跳转 */
  document.querySelectorAll('[data-link]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var url = window.SITE_LINKS && window.SITE_LINKS[el.getAttribute('data-link')];
      if (url) {
        e.preventDefault();
        window.open(url, '_blank', 'noopener');
      }
    });
  });

  /* 移动端折叠导航 */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* 返回顶部按钮 */
  var backTop = document.getElementById('backTop');
  if (backTop) {
    var onScroll = function () {
      backTop.hidden = window.scrollY < 400;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* FAQ 手风琴 */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    var a = q.nextElementSibling;
    q.addEventListener('click', function () {
      var expanded = q.getAttribute('aria-expanded') === 'true';
      q.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      a.style.maxHeight = expanded ? '0' : a.scrollHeight + 'px';
    });
  });

  /* 滚动渐显 */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.feature-card, .shot-card, .scene-list li, .step').forEach(function (el, i) {
      el.classList.add('fade-in');
      el.style.transitionDelay = (i % 3) * 60 + 'ms';
      io.observe(el);
    });
  }
})();
