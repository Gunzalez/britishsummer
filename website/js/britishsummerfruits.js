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

    britishsummerfruits.recipeFilter = {

        $controls: $('#filter-controls'),
        $filtered: $('#filtered'),
        $mobileTrigger: $('#filter-controls-mobile'),
        init: function(){

            this.$controls.on('click', 'span', function(){

                var $filterTag = $(this);
                var tag = $filterTag.attr('data-filter-tag');
                var items = $('#filtered').find("[data-tags]");
                var $emptyList = $('#empty-list');
                
                $emptyList.removeClass('is-empty');

                if(!$filterTag.hasClass('active')){
                    $filterTag.parent().find('.active').removeClass('active');
                    for (var i = 0; i < items.length; i++) {
                        var $item = $(items[i]);
                        $item.addClass('filtered-out');
                        if ($item.attr('data-tags').split(" ").indexOf(tag) > -1 || tag === "") {
                            $item.removeClass('filtered-out');
                        }
                    }
                    $filterTag.addClass('active');
                }

                if(!$('#filtered').find("[data-tags]").not('.filtered-out').length){
                    $emptyList.addClass('is-empty');
                }
                
            });

            var that = this;
            this.$mobileTrigger.on('click', function(){
                that.$controls.toggleClass('on-for-mobile');
            });
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

    britishsummerfruits.carousel = {
        init: function(){
            $('.owl-carousel').owlCarousel({
                items:1,
                margin:10,
                autoHeight:true,
                nav: true,
                loop: true
            });
        }
    };


    britishsummerfruits.init = function () {

        // all init here
        britishsummerfruits.environment.init();
        britishsummerfruits.navigation.init();
        britishsummerfruits.carousel.init();
        britishsummerfruits.recipeFilter.init();

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