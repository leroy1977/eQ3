/*global jQuery */
/* Contents
// ------------------------------------------------>
	1.  LOADING SCREEN
	2.  BACKGROUND INSERT
	3.	NAV MODULE
	4.  MOBILE MENU
	5.  HEADER AFFIX
	6.  HEADER STATIC
	7.  COUNTER UP
	8.  COUNTDOWN DATE
	9.  AJAX MAILCHIMP
	10. AJAX CAMPAIGN MONITOR 
	11. OWL CAROUSEL
	12. MAGNIFIC POPUP
	13. MAGNIFIC POPUP VIDEO
	14. BACK TO TOP
	15. GALLERY FLITER
	16. WORK FLITER
	17. FOLLOW INSTAGRAM
	18. TWITTER FEED
	19. PROGRESS BAR
	20. SLIDER RANGE
	21. AJAX CONTACT FORM
	22. GOOGLE MAP
	23. PARALLAX FOOTER
*/
(function($) {
    "use strict";
    /* ------------------  LOADING SCREEN ------------------ */

    $(window).on("load", function() {
        $(".preloader").fadeOut(5000);
        $(".preloader").remove();
    });

    /* ------------------  Background INSERT ------------------ */

    var $bgSection = $(".bg-section");
    var $bgPattern = $(".bg-pattern");
    var $colBg = $(".col-bg");

    $bgSection.each(function() {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("bg-section");
        $(this).remove();
    });

    $bgPattern.each(function() {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("bg-pattern");
        $(this).remove();
    });

    $colBg.each(function() {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("col-bg");
        $(this).remove();
    });

    /* ------------------  NAV MODULE  ------------------ */

    var $moduleIcon = $(".module-icon"),
        $moduleCancel = $(".module-cancel");
    $moduleIcon.on("click", function(e) {
        $(this).parent().siblings().removeClass('module-active'); // Remove the class .active form any sibiling.
        $(this).parent(".module").toggleClass("module-active"); //Add the class .active to parent .module for this element.
        e.stopPropagation();
    });
    // If Click on [ Search-cancel ] Link
    $moduleCancel.on("click", function(e) {
        $(".module").removeClass("module-active");
        e.stopPropagation();
        e.preventDefault();
    });

    $(".sidearea-icon").on("click", function() {
        if ($(this).parent().hasClass('module-active')) {
            $(".wrapper").addClass("sidearea-active");
            $(this).addClass("module-sidearea-close");
        } else {
            $(".wrapper").removeClass("sidearea-active");
            $(this).removeClass("module-sidearea-close");
        }
    });

    /* ------------------  MOBILE MENU ------------------ */

    var $dropToggle = $("[data-toggle='dropdown']");
    $dropToggle.on("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent().siblings().removeClass("show");
        $(this).parent().toggleClass("show");
    });

    /* ------------------ HEADER AFFIX ------------------ */

    $(window).scroll(function() {
        if ($(document).scrollTop() > 100) {
            $('.fixed-top').addClass('affix');
        } else {
            $('.fixed-top').removeClass('affix');
        }
    });

    /* ------------------  COUNTER UP ------------------ */

    $(".counting").counterUp({
        delay: 10,
        time: 1000
    });

    /* ------------------ COUNTDOWN DATE ------------------ */

    $(".countdown").each(function() {
        var $countDown = $(this),
            countDate = $countDown.data("count-date"),
            newDate = new Date(countDate);
        $countDown.countdown({
            until: newDate,
            format: "MMMM Do , h:mm:ss a"
        });
    });

    /* ------------------  AJAX MAILCHIMP ------------------ */

    $('.mailchimp').ajaxChimp({
        url: "http://wplly.us5.list-manage.com/subscribe/post?u=91b69df995c1c90e1de2f6497&id=aa0f2ab5fa", //Replace with your own mailchimp Campaigns URL.
        callback: chimpCallback

    });

    function chimpCallback(resp) {
        if (resp.result === 'success') {
            $('.subscribe-alert').html('<div class="alert alert-success">' + resp.msg + '</div>').fadeIn(1000);
            //$('.subscribe-alert').delay(6000).fadeOut();

        } else if (resp.result === 'error') {
            $('.subscribe-alert').html('<div class="alert alert-danger">' + resp.msg + '</div>').fadeIn(1000);
        }
    }

    /* ------------------  AJAX CAMPAIGN MONITOR  ------------------ */

    $('#campaignmonitor').submit(function(e) {
        e.preventDefault();
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function(data) {
                if (data.Status === 400) {
                    alert("Error: " + data.Message);
                } else { // 200
                    alert("Success: " + data.Message);
                }
            });
    });

    /* ------------------ OWL CAROUSEL ------------------ */

    $(".carousel").each(function() {
        var $Carousel = $(this);
        $Carousel.owlCarousel({
            loop: $Carousel.data('loop'),
            autoplay: $Carousel.data("autoplay"),
            margin: $Carousel.data('space'),
            nav: $Carousel.data('nav'),
            dots: $Carousel.data('dots'),
            center: $Carousel.data('center'),
            dotsSpeed: $Carousel.data('speed'),
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: $Carousel.data('slide-rs'),
                },
                1000: {
                    items: $Carousel.data('slide'),
                }
            }
        });
    });

    /* ------------------ MAGNIFIC POPUP ------------------ */

    var $imgPopup = $(".img-popup");
    $imgPopup.magnificPopup({
        type: "image"
    });
    $('.img-gallery-item').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /* ------------------  MAGNIFIC POPUP VIDEO ------------------ */

    $('.popup-video,.popup-gmaps').magnificPopup({
        disableOn: 700,
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });

    /* ------------------  BACK TO TOP ------------------ */

    var backTop = $('#back-to-top');

    if (backTop.length) {
        var scrollTrigger = 200, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    backTop.addClass('show');
                } else {
                    backTop.removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        backTop.on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    /* ------------------ GALLERY FLITER ------------------ */

    var $galleryFilter = $(".gallery-filter"),
        galleryLength = $galleryFilter.length,
        protfolioFinder = $galleryFilter.find("a"),
        $galleryAll = $("#gallery-all");

    // init Isotope For gallery
    protfolioFinder.on("click", function(e) {
        e.preventDefault();
        $galleryFilter.find("a.active-filter").removeClass("active-filter");
        $(this).addClass("active-filter");
    });
    if (galleryLength > 0) {
        $galleryAll.imagesLoaded().progress(function() {
            $galleryAll.isotope({
                filter: "*",
                animationOptions: {
                    duration: 750,
                    itemSelector: ".gallery-item",
                    easing: "linear",
                    queue: false,
                }
            });
        });
    }
    protfolioFinder.on("click", function(e) {
        e.preventDefault();
        var $selector = $(this).attr("data-filter");
        $galleryAll.imagesLoaded().progress(function() {
            $galleryAll.isotope({
                filter: $selector,
                animationOptions: {
                    duration: 750,
                    itemSelector: ".gallery-item",
                    easing: "linear",
                    queue: false,
                }
            });
            return false;
        });
    });

    /* ------------------ WORK FLITER ------------------ */

    var $workFilter = $(".work-filter"),
        workLength = $workFilter.length,
        workFinder = $workFilter.find("a"),
        $workAll = $("#work-all");

    // init Isotope For gallery
    workFinder.on("click", function(e) {
        e.preventDefault();
        $workFilter.find("a.active-filter").removeClass("active-filter");
        $(this).addClass("active-filter");
    });
    if (workLength > 0) {
        $workAll.imagesLoaded().progress(function() {
            $workAll.isotope({
                filter: "*",
                animationOptions: {
                    duration: 750,
                    itemSelector: ".work-item",
                    easing: "linear",
                    queue: false,
                }
            });
        });
    }
    workFinder.on("click", function(e) {
        e.preventDefault();
        var $selector = $(this).attr("data-filter");
        $workAll.imagesLoaded().progress(function() {
            $workAll.isotope({
                filter: $selector,
                animationOptions: {
                    duration: 750,
                    itemSelector: ".work-item",
                    easing: "linear",
                    queue: false,
                }
            });
            return false;
        });
    });

    /* ------------------  FOLLOW INSTAGRAM ------------------ */

    var instafeedFooter = $('#instafeedFooter').length,
        InstaUserID = '3666232855',
        /*YOUR_USER_ID*/
        InstaAccessToken = '3666232855.1677ed0.76f7bea2e1f74c4995004f2c05922bb4'; /*YOUR_ACCESS_TOKEN*/

    if (instafeedFooter > 0) {

        var userFeedFooter = new Instafeed({
            target: 'instafeedFooter',
            get: 'user',
            userId: InstaUserID,
            accessToken: InstaAccessToken,
            limit: $('.instafeed').data("insta-number"),
            template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="insta-hover"><i class="fa fa-plus"></i></div></a>',
            resolution: 'low_resolution',
        });
        userFeedFooter.run();
    }

    /* ------------------  TWITTER FEED ------------------ */

    var twitterFeed = $('#twitter-feed'),
        twitterID = '721372281637888000'; // Your Twitter Widget Id Here

    if (twitterFeed.length > 0) {
        var twitterConfig = {
            "id": twitterID,
            "domId": 'twitter-feed',
            "maxTweets": twitterFeed.data("numtweets"),
            "showUser": false,
            "showTime": true,
            "showRetweet": false,
            "showInteraction": false,
            "enableLinks": true,
            "customCallback": handleTweets,
            "dateFunction": momentDateFormatter,
        };

        function handleTweets(tweets) {
            var x = tweets.length;
            var n = 0;
            var element = document.getElementById('twitter-feed');
            var html = '<ul class="list-unstyled mb-0">';
            while (n < x) {
                html += '<li>' + tweets[n] + '</li>';
                n++;
            }
            html += '</ul>';
            element.innerHTML = html;
        }

        function momentDateFormatter(date, dateString) {
            return moment(dateString).fromNow();
        }
        twitterFetcher.fetch(twitterConfig);
    }

    /* ------------------  SCROLL TO ------------------ */

    var aScroll = $('a[data-scroll="scrollTo"]');
    aScroll.on('click', function(event) {
        var target = $($(this).attr('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
            if ($(this).hasClass("menu-item")) {
                $(this).parent().addClass("active");
                $(this).parent().siblings().removeClass("active");
            }
        }
    });

    /* ------------------ PROGRESS BAR ------------------ */

    $(".progressbar").each(function() {
        $(this).waypoint(function() {
            var progressBar = $(".progress-bar"),
                progressBarTitle = $(".progress-title .value");
            progressBar.each(function() {
                $(this).css("width", $(this).attr("aria-valuenow") + "%");
            });
            progressBarTitle.each(function() {
                $(this).css('opacity', 1);
            });
        }, {
            triggerOnce: true,
            offset: 'bottom-in-view'
        });
    });

    /* ------------------ SLIDER RANGE ------------------ */

    var $sliderRange = $("#slider-range"),
        $sliderAmount = $("#amount");
    $sliderRange.slider({
        range: true,
        min: 0,
        max: 500,
        values: [50, 300],
        slide: function(event, ui) {
            $sliderAmount.val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $sliderAmount.val("$" + $sliderRange.slider("values", 0) + " - $" + $sliderRange.slider("values", 1));

    /* ------------------  AJAX CONTACT FORM  ------------------ */

    var contactForm = $(".contactForm"),
        contactResult = $('.contact-result');
    contactForm.validate({
        debug: false,
        submitHandler: function(contactForm) {
            $(contactResult, contactForm).html('Please Wait...');
            $.ajax({
                type: "POST",
                url: "assets/php/contact.php",
                data: $(contactForm).serialize(),
                timeout: 20000,
                success: function(msg) {
                    $(contactResult, contactForm).html('<div class="alert alert-success" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>').delay(3000).fadeOut(2000);
                },
                error: $('.thanks').show()
            });
            return false;
        }
    });

    /* ------------------ GOOGLE MAP ------------------ */

    $(".googleMap").each(function() {
        var $gmap = $(this);
        $gmap.gMap({
            address: $gmap.data('map-address'),
            zoom: $gmap.data('map-zoom'),
            maptype: $gmap.data('map-type'),
            markers: [{
                address: $gmap.data('map-address'),
                maptype: $gmap.data('map-type'),
                html: $gmap.data('map-info'),
                icon: {
                    image: $gmap.data('map-maker-icon'),
                    iconsize: [76, 61],
                    iconanchor: [76, 61]
                }
            }]
        });
    });

    /* ------------------  PARALLAX FOOTER ------------------ */

    siteFooter();
    $(window).resize(function() {
        siteFooter();
    });

    function siteFooter() {
        var siteContent = $('#wrapperParallax');

        var siteFooter = $('#footerParallax');
        var siteFooterHeight = siteFooter.height();

        siteContent.css({
            "margin-bottom": siteFooterHeight
        });
    };

}(jQuery));