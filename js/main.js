// ========================= Scroll to Top Button =========================
const scrollTopBtn = document.querySelector('.scroll-top');

window.onscroll = () => {
    if (window.scrollY > 200) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
};

scrollTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ========================= Page Loader =========================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
});

// ========================= Counter on Scroll =========================
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".cont");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});

function startCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const duration = 2000;
    const increment = target / duration * 16;
    let current = 0;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        counter.textContent = '+' + Math.floor(current).toLocaleString();
    }, 16);
}

// ========================= Swiper Initialization =========================
function initSwiper(selector, options) {
    return new Swiper(selector, options);
}

document.addEventListener("DOMContentLoaded", () => {
    initSwiper('.swiper-section-1', {
        loop: true,
        spaceBetween: 30,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        rtl: true,
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    initSwiper('.swiper-our-work', {
        loop: true,
        spaceBetween: 30,
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });

    // const colors = ['#e3f2fd', '#f1f8ff', '#ede7f6', '#fce4ec', '#f3f9fb'];
    initSwiper('.portfolio-swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: { delay: 2000, disableOnInteraction: false },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        },
        on: {
            init() {
                const section = document.getElementById('portfolio');
                // section.style.backgroundColor = colors[this.realIndex % colors.length];
            },
            slideChange() {
                const section = document.getElementById('portfolio');
                section.style.transition = 'background-color 0.6s ease';
                // section.style.backgroundColor = colors[this.realIndex % colors.length];
            }
        }
    });
});

// ========================= Contact Form =========================
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                const alert = document.getElementById('success-alert');
                if (response.ok) {
                    alert?.classList.remove('d-none');
                    form.reset();
                    setTimeout(() => alert?.classList.add('d-none'), 5000);
                } else {
                    alert('حدث خطأ أثناء الإرسال.');
                }
            })
            .catch(error => {
                alert('فشل الإرسال: ' + error.message);
            });
    });
});

// ========================= Mobile Menu =========================
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById('mobileMenuBtn'); // كان menuToggle
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenuBtn'); // كان closeMenu
    const menuOverlay = document.getElementById('menuOverlay');
    let isMenuOpen = false;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            isMenuOpen = !isMenuOpen;
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
            document.body.style.overflow = '';
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
            document.body.style.overflow = '';
        });
    }
});

// ========================= Scroll Effects & Active Links =========================
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    const mobileMenu = document.getElementById("mobileMenu");
    const scrollTop = window.scrollY;

    if (navbar) {
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    const sections = document.querySelectorAll("section[id]");
    const scrollPos = scrollTop + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll(".nav-down a, .mobile-link").forEach(link => {
                link.classList.remove("active");
            });
            const activeLink = document.querySelector(`.nav-down a[href="#${sectionId}"]`);
            const activeMobileLink = document.querySelector(`.mobile-link[href="#${sectionId}"]`);
            activeLink?.classList.add("active");
            activeMobileLink?.classList.add("active");
        }
    });
});

// ========================= Scroll Indicator & Hero Animation =========================
document.addEventListener("DOMContentLoaded", () => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    scrollIndicator?.addEventListener('click', () => {
        window.scrollBy({ top: window.innerHeight - 200, behavior: 'smooth' });
    });

    const heroElements = document.querySelectorAll('.hero-title, .hero-description, .btn');
    const animateOnScroll = () => {
        heroElements.forEach(el => {
            const pos = el.getBoundingClientRect().top;
            if (pos < window.innerHeight - 100) {
                el.classList.add('animate__animated');
                if (el.classList.contains('hero-title')) el.classList.add('animate__fadeInDown');
                else if (el.classList.contains('hero-description')) el.classList.add('animate__fadeInUp');
                else if (el.classList.contains('btn-primary')) el.classList.add('animate__fadeInLeft');
                else if (el.classList.contains('btn-secondary')) el.classList.add('animate__fadeInRight');
            }
        });
    };

    window.addEventListener("load", animateOnScroll);
    window.addEventListener("scroll", animateOnScroll);
});

document.addEventListener("DOMContentLoaded", () => {
    // تفعيل active عند الضغط على روابط القائمة الجانبية
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
// كود تفعيل العنصر النشط في قائمة التنقل
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });