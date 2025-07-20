// scroll btn
const scrollTopBtn = document.querySelector('.scroll-top'); // الحصول على الزر

// إظهار الزر بشكل سلس عند التمرير للأسفل
window.onscroll = () => {
    if (window.scrollY > 200) { // إذا تجاوز التمرير 200 بيكسل
        scrollTopBtn.classList.add('show'); // إضافة الكلاس لإظهار الزر
    } else {
        scrollTopBtn.classList.remove('show'); // إزالة الكلاس لإخفاء الزر
    }
};

// إرجاع الصفحة إلى الأعلى عند الضغط على الزر
scrollTopBtn.onclick = () => {
    window.scrollTo({
        top: 0, // العودة إلى أعلى الصفحة
        behavior: 'smooth' // تمرير سلس
    });
};



window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden"); // إضافة كلاس الإخفاء
});




// كود العداد
document.addEventListener("DOMContentLoaded", function () {
    // تحديد جميع العناصر التي نريد تشغيل العداد فيها
    const counters = document.querySelectorAll(".cont");

    // إعداد Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                startCounter(counter);
                observer.unobserve(counter); // إلغاء المراقبة بعد التشغيل
            }
        });
    }, {
        threshold: 0.5 // 50% من العنصر يجب أن يكون مرئيًا لتشغيل العداد
    });

    counters.forEach(counter => observer.observe(counter));
});

// وظيفة تشغيل العداد
function startCounter(counter) {
    const target = +counter.getAttribute("data-target"); // الرقم النهائي
    const duration = 2000; // المدة الزمنية للعد (2 ثوانٍ)
    const increment = target / duration * 16; // مقدار الزيادة في كل إطار (16ms للإطار الواحد)

    let current = 0;
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval); // إيقاف العداد عند الوصول للرقم النهائي
        }
        // تنسيق الرقم باستخدام toLocaleString
        counter.textContent = '+' + Math.floor(current).toLocaleString();
    }, 16); // 16ms لكل إطار
}

// swiper code
const swiper = new Swiper('.swiper-section-1', {
    // Optional parameters
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Enable RTL
    rtl: true, // إجبار الاتجاه على RTL

    // Responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    const alert = document.getElementById('success-alert');
                    alert.classList.remove('d-none');
                    form.reset();
                    setTimeout(() => alert.classList.add('d-none'), 5000);
                } else {
                    alert('حدث خطأ أثناء الإرسال.');
                }
            })
            .catch(error => {
                alert('فشل الإرسال: ' + error.message);
            });
    });
});
