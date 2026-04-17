$(document).ready(function() {
    // ============================================
    // THEME TOGGLE (Light/Dark Mode)
    // ============================================
    
    const themeToggle = $('#theme-toggle');
    const htmlElement = $('html');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.attr('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.on('click', function() {
        const currentTheme = htmlElement.attr('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.attr('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.find('i');
        if (theme === 'dark') {
            icon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
        }
    }

    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================
    
    const hamburger = $('.hamburger');
    const navLinks = $('.nav-links');
    
    hamburger.on('click', function() {
        navLinks.toggleClass('active');
        hamburger.toggleClass('active');
    });
    
    // Close menu when a link is clicked
    navLinks.find('a').on('click', function() {
        navLinks.removeClass('active');
        hamburger.removeClass('active');
    });

    // ============================================
    // SMOOTH SCROLLING & ACTIVE NAV LINK
    // ============================================
    
    const sections = $('section');
    const navItems = $('.nav-links a');
    
    $(window).on('scroll', function() {
        let current = '';
        
        sections.each(function() {
            const sectionTop = $(this).offset().top - 200;
            if ($(window).scrollTop() >= sectionTop) {
                current = $(this).attr('id');
            }
        });
        
        navItems.removeClass('active');
        navItems.filter(`[href="#${current}"]`).addClass('active');
    });

    // ============================================
    // SCROLL-TO-TOP ANIMATION
    // ============================================
    
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            if (!$('.scroll-to-top').length) {
                $('body').append(`
                    <button class="scroll-to-top" title="Back to top">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                `);
            }
        } else {
            $('.scroll-to-top').remove();
        }
    });
    
    $(document).on('click', '.scroll-to-top', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // ============================================
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                $(entry.target).css({
                    opacity: 1,
                    transform: 'translateY(0)',
                    transition: 'all 0.6s ease'
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe service cards, education cards, etc.
    $('.service-card, .education-card, .skill-category, .timeline-item, .interest-card').each(function() {
        // Check if element is already visible on page load
        const rect = this.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (isVisible) {
            // If already visible, don't apply fade-in animation
            $(this).css({
                opacity: 1,
                transform: 'translateY(0)'
            });
        } else {
            // Apply fade-in animation for elements below the fold
            $(this).css({
                opacity: 0,
                transform: 'translateY(30px)'
            });
            observer.observe(this);
        }
    });

    // ============================================
    // SERVICE CARDS HOVER EFFECT
    // ============================================
    
    $('.service-card').on('mouseenter', function() {
        $(this).css({
            'box-shadow': '0 10px 30px rgba(99, 102, 241, 0.2)',
            'border-color': 'var(--primary-color)'
        });
    }).on('mouseleave', function() {
        $(this).css({
            'box-shadow': 'none',
            'border-color': 'transparent'
        });
    });

    // ============================================
    // INTEREST CARDS HOVER EFFECT
    // ============================================
    
    $('.interest-card').on('mouseenter', function() {
        $(this).find('.interest-icon').css({
            'animation': 'spin 0.6s ease'
        });
    }).on('mouseleave', function() {
        $(this).find('.interest-icon').css({
            'animation': 'none'
        });
    });

    // ============================================
    // SKILL TAGS ANIMATION
    // ============================================
    
    $('.skill-tag').on('mouseenter', function() {
        $(this).css({
            'transform': 'translateY(-3px) scale(1.05)',
            'box-shadow': '0 5px 15px rgba(99, 102, 241, 0.4)'
        });
    }).on('mouseleave', function() {
        $(this).css({
            'transform': 'translateY(0) scale(1)',
            'box-shadow': 'none'
        });
    });

    // ============================================
    // CONTACT FORM INTERACTION
    // ============================================
    
    $('.contact-link').on('mouseenter', function() {
        $(this).css('transform', 'translateX(10px)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'translateX(0)');
    });

    // ============================================
    // PARALLAX EFFECT ON HERO
    // ============================================
    
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        $('.hero').css({
            'background-position': '0 ' + (scrollTop * 0.5) + 'px'
        });
    });

    // ============================================
    // COUNTER ANIMATION FOR STATS
    // ============================================
    
    function animateCounter($element, target, suffix) {
        const start = 0;
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (target - start) * progress);

            $element.text(current + suffix);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        update();
    }
    
    let statsAnimated = false;
    $(window).on('scroll', function() {
        if (!statsAnimated && $('.stat-box').length) {
            const statsTop = $('.stat-box').first().offset().top;
            if ($(window).scrollTop() + $(window).height() > statsTop) {
                statsAnimated = true;
                $('.stat-box h3').each(function() {
                    const $stat = $(this);
                    const target = parseInt($stat.data('target'), 10);
                    const suffix = $stat.data('suffix') || '';
                    animateCounter($stat, target, suffix);
                });
            }
        }
    });

    // ============================================
    // RIPPLE EFFECT ON BUTTONS
    // ============================================
    
    $('.cta-button, .social-icon').on('click', function(e) {
        const $button = $(this);
        const offset = $button.offset();
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;
        
        const $ripple = $('<span class="ripple"></span>');
        $ripple.css({
            left: x,
            top: y
        });
        
        $button.append($ripple);
        
        setTimeout(function() {
            $ripple.remove();
        }, 600);
    });

    // ============================================
    // HAMBURGER ANIMATION
    // ============================================
    
    hamburger.on('click', function() {
        const spans = $(this).find('span');
        if (navLinks.hasClass('active')) {
            spans.eq(0).css({
                'transform': 'rotate(45deg) translate(10px, 10px)',
                'background': 'var(--primary-color)'
            });
            spans.eq(1).css({
                'opacity': '0'
            });
            spans.eq(2).css({
                'transform': 'rotate(-45deg) translate(8px, -8px)',
                'background': 'var(--primary-color)'
            });
        } else {
            spans.css({
                'transform': 'none',
                'opacity': '1',
                'background': 'var(--text-dark)'
            });
        }
    });

    // ============================================
    // TYPING ANIMATION (Optional - for intro text)
    // ============================================
    
    const typingText = $('.hero-text > p:nth-child(2)');
    if (typingText.length && !typingText.hasClass('typed')) {
        const originalText = typingText.text();
        typingText.text('').addClass('typed');
        
        let charIndex = 0;
        function typeChar() {
            if (charIndex < originalText.length) {
                typingText.text(typingText.text() + originalText.charAt(charIndex));
                charIndex++;
                setTimeout(typeChar, 50);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeChar, 500);
    }

    // ============================================
    // SCROLL LOCK (Optional - for better UX)
    // ============================================
    
    // Prevent scroll while animations are playing
    $('html').on('wheel', function(e) {
        if ($('.ripple').length > 0) {
            e.preventDefault();
        }
    });

    // ============================================
    // LAZY LOAD IMAGES
    // ============================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = $(entry.target);
                    if (img.data('src')) {
                        img.attr('src', img.data('src'));
                        img.removeAttr('data-src');
                    }
                    imageObserver.unobserve(entry.target);
                }
            });
        });
        
        $('img[data-src]').each(function() {
            imageObserver.observe(this);
        });
    }

    // ============================================
    // TOOLTIP EFFECT
    // ============================================
    
    $('.social-icon, .contact-link').attr('data-tooltip', function() {
        return $(this).attr('title') || $(this).find('span').text();
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    
    $(document).on('click', 'a[href^="#"]', function(e) {
        if ($(this).attr('href') !== '#') {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            if (target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 60
                }, 1000);
            }
        }
    });

    // ============================================
    // ADD RIPPLE STYLE FOR BUTTONS
    // ============================================
    
    const rippleStyle = `
        <style>
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleAnimation 0.6s ease-out;
                pointer-events: none;
            }
            
            @keyframes rippleAnimation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            .scroll-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
                color: white;
                border: none;
                border-radius: 50%;
                font-size: 1.2rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
                transition: all 0.3s ease;
                z-index: 99;
            }
            
            .scroll-to-top:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
            }
        </style>
    `;
    
    $('head').append(rippleStyle);

    // ============================================
    // RESIZE HANDLER
    // ============================================
    
    $(window).on('resize', function() {
        // Adjust animations based on screen size
        if ($(window).width() <= 768) {
            $('.nav-links').removeClass('active');
            $('.hamburger').removeClass('active');
        }
    });

    console.log('Portfolio site loaded successfully!');
});
