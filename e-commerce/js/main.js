(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top shadow-sm');
        } else {
            $('.nav-bar').removeClass('sticky-top shadow-sm');
        }
    });


    // Hero Header carousel
    var headerCarousel = $(".header-carousel");
    headerCarousel.owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 8000, /* Stays for 8s */
        smartSpeed: 1500, /* Transition takes 1.5s */
        center: false,
        dots: false,
        loop: true,
        margin: 0,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });

    // Re-animate captions on slide change
    headerCarousel.on('changed.owl.carousel', function (event) {
        var item = event.item.index - 2;     // Position of the current item
        $('h4').removeClass('animated slideInDown');
        $('h1').removeClass('animated slideInDown');
        $('a.btn').removeClass('animated slideInDown');

        $('.owl-item').not('.cloned').eq(item).find('h4').addClass('animated slideInDown');
        $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated slideInDown');
        $('.owl-item').not('.cloned').eq(item).find('a.btn').addClass('animated slideInDown');
    });


    // ProductList carousel
    $(".productList-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    // ProductList categories carousel
    $(".productImg-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        items: 1,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });


    // Single Products carousel
    $(".single-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        dotsData: true,
        loop: true,
        items: 1,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });


    // ProductList carousel
    $(".related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });



    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });



    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });




    // Footer Accordion for Mobile
    $('.footer-item h4').click(function () {
        if ($(window).width() < 768) {
            $(this).toggleClass('active');
            $(this).parent().toggleClass('active');
        }
    });

    // --- New Logic from Index.html ---

    // Toast Notification Logic
    window.showToast = function (message, type = 'success') {
        let container = document.getElementById("toast-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = `toast ${type} show`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i> ${message}`;

        container.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Cart Logic
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        // Dispatch event for other listeners (like cart page if open in another tab, though mostly for current page updates)
        window.dispatchEvent(new Event('cartUpdated'));
    }

    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badge = document.getElementById("cart-count");
        if (badge) badge.innerText = count;
    }

    // Initialize Cart Count on Load
    updateCartCount();

    // Sorting Logic
    $('#sort-products').change(function () {
        const sortValue = $(this).val();
        const productList = $('.product-list');
        const products = productList.children('.col-lg-4, .col-md-6').get();

        products.sort(function (a, b) {
            const priceA = parseFloat($(a).data('price'));
            const priceB = parseFloat($(b).data('price'));
            const nameA = $(a).data('name').toUpperCase();
            const nameB = $(b).data('name').toUpperCase();

            if (sortValue === 'price-low') {
                return priceA - priceB;
            } else if (sortValue === 'price-high') {
                return priceB - priceA;
            } else if (sortValue === 'name-asc') {
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            } else {
                return 0; // Default order (could be improved by storing original index)
            }
        });

        $.each(products, function (idx, item) {
            productList.append(item);
        });
    });

    // Add to Cart Event Delegation
    $(document).on('click', '.add-to-cart', function (e) {
        e.preventDefault();
        const btn = $(this);
        const product = {
            id: btn.data('id'),
            name: btn.data('name'),
            price: Number(btn.data('price')),
            image: btn.data('image'),
            quantity: 1
        };

        const existing = cart.find(item => item.id == product.id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push(product);
        }

        saveCart();
        showToast(`${product.name} added to cart!`);
    });

})(jQuery);

