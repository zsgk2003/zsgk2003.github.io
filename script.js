// 导航栏移动端菜单切换
(function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // 点击菜单项后关闭移动端菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // 点击外部区域关闭菜单
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
      if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
})();

// 平滑滚动到锚点
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();

// 新闻页面的锚点高亮
(function() {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // 添加高亮效果
        target.style.backgroundColor = '#fef3c7';
        target.style.transition = 'background-color 0.3s';
        setTimeout(() => {
          target.style.backgroundColor = '';
        }, 2000);
      }, 100);
    }
  }
})();

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
  // 可以在这里添加其他初始化代码
  console.log('Research Group Website Loaded');
});
