// JavaScript Document
(function ($, window) {

    var britishsummerfruits = {};

    britishsummerfruits.properties = {
        windowWidth: '',
        isMobile: false
    };

    britishsummerfruits.utils = {

        // checks based on CSS class
        mobileCheck: function() {
            var rtnVal = false;
            if($('html').hasClass('mobile')){
                rtnVal = true;
            }
            return rtnVal;
        }
    };

    britishsummerfruits.environment = {

        resize: function(){
        },

        init: function (){
            // check for mobile
            if (britishsummerfruits.utils.mobileCheck()){
                britishsummerfruits.properties.isMobile = true;
            }
        }
    };

    britishsummerfruits.navigation = {

        // main navigation
        $mobileNav: $('nav#menu'),
        $mobileNavCloseButton: $('.close-mobile-navigation-link'),
        API: undefined,

        resize: function(){
            britishsummerfruits.navigation.API.close();
        },

        init: function(){

            if (typeof HasTouch != 'undefined') {
                if(!HasTouch){
                    $('.hover-on-desktop-only').addClass('has-hover').removeClass('hover-on-desktop-only');
                }
            }

            britishsummerfruits.navigation.$mobileNav.mmenu({
                "offCanvas": {
                    "position": "right"
                }
            });

            britishsummerfruits.navigation.API = britishsummerfruits.navigation.$mobileNav.data("mmenu");
            britishsummerfruits.navigation.$mobileNavCloseButton.on('click', function() {
                britishsummerfruits.navigation.API.close();
            });
        }
    };

    britishsummerfruits.news = {

        $items: $('.news-detail'),

        init: function(){
            this.$items.each(function(index, el){
                $(el).find('[data-toggle]').on('click', function(){
                    $(el).toggleClass('full');
                });
            });
        }
    };

    britishsummerfruits.carousel = {
        init: function(){
            $('.owl-carousel').owlCarousel({
                items:1,
                autoHeight:true,
                nav: true,
                loop: true
            });
        }
    };

    britishsummerfruits.heroCarousel = {

        $carousel: $('#hero-carousel'),

        init: function(){
            var dots = this.$carousel.find('.dots span');
            var slides = this.$carousel.find('.slide');

            if(this.$carousel.length){
                setInterval(function(){

                    // current index
                    var count = slides.length;
                    var index = slides.index($('.active'));
                    index++;
                    if(index === count){
                        index = 0;
                    }
                    slides.removeClass('active');
                    slides.eq(index).addClass('active');

                    dots.removeClass('active');
                    dots.eq(index).addClass('active');

                }, 7000);
            }
        }
    };

    britishsummerfruits.init = function () {

        // all init here
        britishsummerfruits.environment.init();
        britishsummerfruits.navigation.init();
        britishsummerfruits.carousel.init();
        britishsummerfruits.news.init();
        britishsummerfruits.carousel.init();
        britishsummerfruits.heroCarousel.init();

        // resize triggers
        $(window).on('resize', function () {

            var newWidth = $(window).width(),
                oldWidth = britishsummerfruits.properties.windowWidth;

            if (oldWidth != newWidth) {
                britishsummerfruits.properties.windowWidth = newWidth;
                britishsummerfruits.resize();
            }
        });

        // trigger initial resize, just to be sure
        britishsummerfruits.resize();
        $(window).trigger('resize');
    };

    // main resize
    britishsummerfruits.resize = function () {
        britishsummerfruits.environment.resize();
        britishsummerfruits.navigation.resize();
    };

    // main init
    $(document).ready(function () {
        britishsummerfruits.init();
        $(window).scroll(function (event) {
            //britishsummerfruits.scrollEvents();
        });
    });

}(jQuery, window));