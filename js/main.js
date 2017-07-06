(function($) {
  "use strict";

var $ = jQuery,
$body = $('body'),
$windowBrowser = $(window),
link = '.header-box nav .slide-link a',
headerHeight = $('.header.top-menu').height(),
windowHeight = $(window).height(),
pageWidth = $(window).width(),
cache = [],
slider_container_height = 0,
isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);
var parent, child, scrollWidth, bodyWidth;

if (scrollWidth === undefined) {
  parent      = $('<div style="width: 50px; height: 50px; overflow: auto"><div/></div>').appendTo('body');
  child       = parent.children();
  scrollWidth = child.innerWidth() - child.height(99).innerWidth();
  parent.remove();
}


/* document.ready
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------*/

$(document).ready(function(){
  if($(".fixed-height").length>0) {
    fixedheight();
  }

  if( navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
    $('body').addClass('touch-device');
  }
  else{
    $('body').addClass('no-touch-device');
  }

  /* primary-banner
  -----------------------------------------------------------------*/
  if($(".heightPrimaryBanner").length>0) {
    heightPrimaryBanner();
  }

  /* appear-block
  ----------------------------------------------------------------*/
  if($(".appear-block").length>0) {
    $('.appear-block').each(function() {
      var $this = $(this);
      $this.addClass('appear-animation');

      if(!$body.hasClass('no-csstransitions') && ($body.width() + scrollWidth) > 767) {
        $this.appear(function() {
        var delay = ($this.attr('data-appear-animation-delay') ? $this.attr('data-appear-animation-delay') : 1);

          if(delay > 1) $this.css('animation-delay', delay + 'ms');
          $this.addClass($this.attr('data-appear-animation'));

          //start Team animate
          animateStart();

          //start PieProgress
          setTimeout(function() {
            $('#carousel .col-xs-12.active').find('.pie_progress').asPieProgress('start');
          }, 1500);

          setTimeout(function() {
            $this.addClass('appear-animation-visible');
          }, delay);
        }, {accX: 0, accY: -150});
      } else {
        $this.addClass('appear-animation-visible');
      }
    });
  }

  /**/
  if($(".pie_progress").length>0) {
    $('.pie_progress').asPieProgress({
      namespace: 'pie_progress'
    });
  }

  /**//**/

  /* Languages Width
  ----------------------------------------------------------------------*/
  if($("#languages").length>0) {
    var $ul = $("#languages ul");
    var ulWidth = 0;
    $("#languages ul li").each(function() {
        ulWidth = ulWidth + $(this).width() +10;
    });
    $("#languages ul").css("width", ulWidth );
  }

  /* header-soc-icon
  ----------------------------------------------------------------------*/
  if($(".header-soc-icon").length>0) {
    var $ul = $(".header-soc-icon ul");
    var ulWidth = 0;
    $(".header-soc-icon ul li").each(function() {
        ulWidth = ulWidth + $(this).width() +10;
    });
    $(".header-soc-icon ul").css("width", ulWidth );
  }

  /* menu-box
  -----------------------------------------------------------------*/
  if($(".menu-box").length>0) {
    moveWidget();
  }

  /* Header widthMenuBox
  ----------------------------------------------------------------------*/
  if($(".top-menu").length>0) {
    setTimeout(function(){
      widthMenuBox();
    }, 100);
  }

  /* mCustomScrollbar
  ----------------------------------------------------------------------*/
  if($(".no-touch-device .mc-scroll").length>0) {
    $('.mc-scroll').mCustomScrollbar({
      scrollInertia: 20,
    });
  }


    /* Video Youtube
  ----------------------------------------------------------------------*/
  if($(".bg-youtube-video").length>0) {
    $('.layer .background-video.bg-youtube-video').tubular({
      videoId: $(".background-video.bg-youtube-video").data('video'),
      start: 3,
      mute: true
    });
  }

  /* Remove Video
  ----------------------------------------------------------------------*/
  if($(".bg-video").length>0) {
    if(navigator.userAgent.match(/iPad|iPhone|Android/i)) {
      $('.bg-video').find('video').remove();
    }
  }

  /* ------------------- Add class if IE 11 or IE10 ------------------*/

  var ua = navigator.userAgent,
    doc = document.documentElement;

  if ((ua.match(/MSIE 10.0/i))) {
    doc.className = doc.className + "ie10";

  } else if((ua.match(/rv:11.0/i))){
    doc.className = doc.className + "ie11";

  }  else if((ua.match(/firefox/i))){
    doc.className = doc.className + "firefox";
  } else if((ua.match(/safari/i))){
    doc.className = doc.className + "safari";
  }

  // if (navigator.mozGetUserMedia ) {
  //   doc.className = doc.className + " firefox";
  // }

  /* RETINA
  ------------------------------------------------------------------*/
  if( 'devicePixelRatio' in window && window.devicePixelRatio >= 2 ){
    $('body').addClass('device-retina');
    var imgToReplace = $('img.replace-2x').get();

    for (var i=0,l=imgToReplace.length; i<l; i++) {
      var src = imgToReplace[i].src;
      src = src.replace(/\.(png|jpg|gif)+$/i, '@2x.$1');
      imgToReplace[i].src = src;

      $(imgToReplace[i]).load(function(){
        $(this).addClass('loaded');
      });
    }
  }

  /* Start ResponsiveSlides
  -------------------------------------------------------------------*/
  if($("#header:not(.always-minimized-menu)").length>0) {
    minimizedMenu();
  }
  setTimeout(function(){
    transformMenu();
  }, 200);
  setTimeout(function(){
    menu();
  }, 100);

  /* Top-nav-line
  -------------------------------------------------------------------*/
  if ($('.header').hasClass('menu-sidebar')) {
    $('.top-nav-line').css('display', 'block');
    $('.top-nav-line').append($('.logo-mini'));

  };

  /* Open menu slide
  -------------------------------------------------------------------*/
  var $menuElem = $(".header.menu-sidebar");
  $( "#menu-open" ).on( "click", function() {
    if ($menuElem.hasClass("open-menu")) {
      $menuElem.removeClass("open-menu");
      // $('body').removeClass("no-scroll");
      enableScroll();
    }
    else {
      $menuElem.addClass("open-menu");
      // $('body').addClass("no-scroll");
      disableScroll();
    }
  });
  $(".menu-close, main").on( "click", function() {
    $menuElem.removeClass("open-menu");
    $('body').removeClass("no-scroll");
    enableScroll();
  });


  /* add no-scroll for body */

  var $menuElem2 = $(".primary .navbar-toggle");
  $( ".primary .navbar-toggle" ).on( "click", function() {
    if ($menuElem2.hasClass("opened")) {
      // $('body').removeClass("no-scroll");
      enableScroll();
    }
    else {
      $menuElem2.addClass("opened");
      // $('body').addClass("no-scroll");
      disableScroll();
    }
  });


  /* Next section
  -----------------------------------------------------------------*/
  $('.next-sections').on('click', function(e) {
    e.preventDefault();
    var $link = $(this).data('next-box');

    $('html, body').animate({
      scrollTop: $($link).offset().top - (headerHeight - 1)
    }, 800 );
  });

  /* about move img and text box
  ----------------------------------------------------------------*/
  if($(".table-box").length>0) {
    setTimeout(function(){
      moveAboutBox();
      moveSectionBox();
    }, 300);
  }

  /* ISOTOPE
  ----------------------------------------------------------- */
  if($(".isotope").length>0) {

    // initialize Isotope after all images have loaded
    var $container = $('.isotope').imagesLoaded(function() {
      $container.isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
      });
    });

    // filter functions
    var itemReveal = Isotope.Item.prototype.reveal;
    Isotope.Item.prototype.reveal = function() {
      itemReveal.apply( this, arguments );
      $( this.element ).removeClass('isotope-hidden');
    };

    var itemHide = Isotope.Item.prototype.hide;
    Isotope.Item.prototype.hide = function() {
      itemHide.apply( this, arguments );
      $( this.element ).addClass('isotope-hidden');
    };

    // demo code
    $(function() {
      var $container = $('.isotope');
      $container.isotope({
        layoutMode: 'fitRows'
      });
      $('#filters .wrap-button').on( 'click', 'button', function() {
        var filtr = $( this ).attr('data-filter');
        $container.isotope({ filter: filtr });
      });
    });

    // change is-checked class on buttons
    $('.button-group .wrap-button').each( function( i, buttonGroup ) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });
    });

  }

  $body.on('click', '.a-sliders-close', function() {

    $('.sliders .sliders-preloader').removeClass('loaded');

    setTimeout(function(){
      $('body, html').animate({
        scrollTop: $('#portfolio').offset().top - headerHeight
      }, 550);
    },0);

    return false;
  });

  /* Scroll to link in Portfolio
  ----------------------------------------------------------------------*/
  $body.on('click', '.p-scroll', 'a-sliders-close', function(e) {
    $(this).addClass('start-slide');
    var target = $(this).attr('href');
    if ($(target).length) {
      setTimeout(function(){
        $('body, html').animate({
          scrollTop: $(target).offset().top - headerHeight
        }, 800);
      },500);
    }
    e.preventDefault();
    setTimeout(function(){
      // $(this).removeClass('start-slide');
    },800);
  });

  /*  HeightFilterIsotop
  ----------------------------------------------------------------*/
  if($(".wrap-isotop").length>0) {
    setTimeout(function(){
      heightFilterIsotop();
    }, 500);
  }

  /* Hide panel filter isotop
  ----------------------------------------------------------------*/
  $( ".isotop-filters .hide-panel" ).on( "click", function() {
    $('.isotop-filters').addClass('hide-panel');
    sizeHideFilter();
  });
  $( ".isotop-filters .show-panel, .hide-panel h1" ).on( "click", function() {
    $('.isotop-filters').removeClass('hide-panel');
    setTimeout(function(){
      $(".isotop-filters").css("width", "" );
      heightFilterIsotop();
    }, 100);
  });

  /* Count timer
  ----------------------------------------------------------------*/
  if($(".timer").length>0) {
    $('.timer').countTo();
  }

  /* Clit title
  -------------------------------------------------------------------*/
  if($('.slider-overlay').length>0) {
    titleParams();
  }

  /*  Iframe Youtube
  ----------------------------------------------------------------*/

  jQuery(".clickMe").on('click',function(){
    $('body').find('div.youtube-iframe').removeClass('show-video');
    $(this).parent().addClass('show-video');
    $(this).addClass('hide');
    $(".show-video .iframe").addClass('show-video');
    var vi = jQuery(".show-video .iframe");
    vi.attr("src", vi.data("autoplay-src") );
  });

  /* myTab
  -------------------------------------------------------------------*/
  if($(".myTab").length>0){
    $('.myTab').tabCollapse();
  }
    if($("#myTab").length>0){
    $('#myTab').tabCollapse();
  }
  if($("#myTab-2").length>0){
    $('#myTab-2').tabCollapse();
  }

  if($(".tab-content").length>0){

    $( "#myTab" ).on( "click", function() {
      $('#myTab-2').addClass('hide-active');
      $('#myTabContent').addClass('active');
      $('#myTabContent-2').removeClass('active');
      $('#myTab').removeClass('hide-active');
    });

    $( "#myTab-2" ).on( "click", function() {
      $('#myTab').addClass('hide-active');
      $('#myTabContent-2').addClass('active');
      $('#myTabContent').removeClass('active');
      $('#myTab-2').removeClass('hide-active');
    });

  }

  /* Fancy box
  ----------------------------------------------------------------------*/
  if($(".fancybox").length>0){
    $(".fancybox").fancybox({
      openEffect : 'elastic',
      closeEffect : 'elastic',
    });
  }

  /* Video Fancy box
  ----------------------------------------------------------------------*/
  // Fires whenever a player has finished loading
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // Fires when the player's state changes.
  function onPlayerStateChange(event) {
    // Go to the next video after the current one is finished playing
    if (event.data === 0) {
      $.fancybox.next();
    }
  }

  // The API will call this function when the page has finished downloading the JavaScript for the player API
  function onYouTubePlayerAPIReady() {
    // Initialise the fancyBox after the DOM is loaded
    $(document).ready(function() {
      $(".fancybox")
        .attr('rel', 'gallery')
        .fancybox({
            openEffect  : 'none',
            closeEffect : 'none',
            nextEffect  : 'none',
            prevEffect  : 'none',
            padding     : 0,
            margin      : 50,
            beforeShow  : function() {
              // Find the iframe ID
              var id = $.fancybox.inner.find('iframe').attr('id');

              // Create video player object and add event listeners
              var player = new YT.Player(id, {
                events: {
                  'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange
                }
              });
            }
        });
    });
  }


  /* OWL-Carousel
  -----------------------------------------------------------------*/
  if($(".owl-carousel").length>0){
    $(".owl-carousel").owlCarousel({
      loop:true,
      // nav:true,
      dots:true,
      responsiveClass:true,
      items:1
    });
  }

  /* Height Map
  ------------------------------------------------------------------------------*/
  heightMap();

  /* Google Maps
  ---------------------------------------------------------------- */
  if($(".map-canvas").length>0){
    setTimeout(function(){
      initializeMap();
    }, 1500 );
  }

  /* Select
  -----------------------------------------------------------------*/
  if($(".selectpicker").length>0){
    $('.selectpicker').selectpicker();
  }

  /* add class fixed for header top menu
  -------------------------------------------------------------------*/
  if($("#header:not('.promo-header')").length>0) {
    $(window).scroll(function(){
      var navHeight = windowHeight - 65;
      var window_top = $(window).scrollTop() - navHeight;
      var div_top = $('#nav-anchor').offset().top;
        if (window_top > div_top) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }
    });
  }

  /* add class fixed for top-nav-line slide menu
  -------------------------------------------------------------------*/
  if($(".top-nav-line").length>0) {
    $(window).scroll(function(){
      var navHeight = windowHeight - 69;
      var window_top = $(window).scrollTop() - navHeight;
      var div_top = $('#nav-anchor').offset().top;
        if (window_top > div_top) {
            $('.top-nav-line').addClass('fixed');
        } else {
            $('.top-nav-line').removeClass('fixed');
        }
    });
  }

  /* Current Navigation
  --------------------------------------------------------------------*/
  $windowBrowser.on('scroll', function() {

    // menu waypoint
    $(link).each(function(index) {
      var $this  = $(this),
        scrollPos = $windowBrowser.scrollTop()+1,
        refElement = $($this.attr('href')),
        thisTop = refElement.position().top;

      if (thisTop <= scrollPos &&
          thisTop + refElement.innerHeight() > scrollPos) {
        $(link).removeClass('current');
        $this.addClass('current');
      } else $this.removeClass('current');
    });

  });

  /* Scroll to link in menu
  ----------------------------------------------------------------------*/
  $body.on('click', link, function(e) {
    var target = $(this).attr('href');
    if ($(target).length) {
      $('body, html').animate({
        scrollTop: $(target).offset().top - (headerHeight - 1)
      }, 400);
    }
    e.preventDefault();
  });

  /* FEEDS
  ---------------------------------------------------------------------*/
  if($(".social-feeds").length>0) {
    setTimeout(function(){

      // Load the twitter widget
      $.post('php/ajax.php', {
        type: 'twitter'
      }, function(response) {
        response = $.parseJSON(response);
        if( 'success' === response.status ) {
          $('.twitter-timeline').html(response.html);
        } else {
          console.info('Twitter API error: ' + response.api_errors);
        }
      });

      // Load the instagram widget
      $.post('php/ajax.php', {
        type: 'instagram'
      }, function(response) {
        response = $.parseJSON(response);
        if( 'success' === response.status ) {
          $('#instagram-timeline').html(response.html);
        } else {
          console.info('Instagram API error: ' + response.api_errors);
        }
      });

    }, 100);
  }

  if($(".fb-page").length>0) {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_EN/sdk.js#xfbml=1&version=v2.3";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  /* Facebook
  ------------------------------------------------------------------------------*/

  $('#fb-widget ifarme').load( function() {
    $('#fb-widget ifarme').contents().find("head")
    .append($("<style type='text/css'>  div {background: #000 !important;} /style>"));
    $('#fb-widget ifarme ').contents().find('#facebook').css('background', 'red');
  });

  /* height Menu
  ----------------------------------------------------------------------*/
  heightMenu();

  /* movePortfolioSlider
  ----------------------------------------------------------------------*/
  movePortfolioSlider();

  /* Contact Form
  ----------------------------------------------------------------------*/
  $('.contact-form').submit(function(e){
    var form = $(this);

    e.preventDefault();

    $.ajax({
      type: 'POST',
      url : 'php/contact.php',
      data: form.serialize(),
      success: function(data){
        form.find('.form-message').html(data).fadeIn();


        form.find('.btn').prop('disabled', true);

        if ($(data).is('.send-true')){
          setTimeout(function(){
            form.trigger('reset');

            form.find('.btn').prop('disabled', false);

            form.find('.form-message').fadeOut().delay(500).queue(function(){
              form.find('.form-message').html('').dequeue();
            });
          }, 2000);
        } else {
          form.find('.btn').prop('disabled', false);
        }
      }
    });
  });

  /* Notify Me
  ------------------------------------------------------------------------*/
  $('.notify-me').submit(function(e){
    var form           = $(this),
        message        = form.find('.form-message'),
        messageSuccess = 'Your email is sended',
        messageInvalid = 'Please enter a valid email address',
        messageSigned  = 'This email is already signed',
        messageErrore  = 'Error request';

    e.preventDefault();

    $.ajax({
      url     : 'php/notify-me.php',
      type    : 'POST',
      data    : form.serialize(),
      success : function(data){
        form.find('.btn').prop('disabled', true);

        message.removeClass('text-danger').removeClass('text-success').fadeIn();

        console.log(data)

        switch(data) {
          case 0:
            message.html(messageSuccess).addClass('text-success').fadeIn();

            setTimeout(function(){
              form.trigger('reset');

              message.fadeOut().delay(500).queue(function(){
                message.html('').dequeue();
              });
            }, 2000);

            break;
          case 1:
            message.html(messageInvalid).addClass('text-danger').fadeIn();

            break;
          case 2:
            message.html(messageSigned).addClass('text-danger').fadeIn();

            setTimeout(function(){
              form.trigger('reset');

              message.fadeOut().delay(500).queue(function(){
                message.html('').dequeue();
              });
            }, 2000);

            break;
          default:
            message.html(messageErrore).addClass('text-danger').fadeIn();
        }

        form.find('.btn').prop('disabled', false);
      }
    });
  });

  /* Background-rslides
  ----------------------------------------------------------------------*/
  if($(".bg-rslides").length>0) {
    $(function() {
      $(".bg-rslides").responsiveSlides({
         speed: 1000,
         timeout: 10000,
      });
    });
  }

  /* last-posts height video block
  ----------------------------------------------------------------------*/
  if($(".last-posts").length>0) {
    lastPostsBoxHeight();
  }

  /* moveSerchform
  ----------------------------------------------------------------------*/
  moveSerchform();

  /* Show pass
  ----------------------------------------------------------------------*/
  if($(".login-box").length>0) {
    $( ".go-to-sing-in" ).on( "click", function() {
      $( ".nav-tabs .sing-in-link" ).trigger( "click" );
    });
  }

  /* Double click on touch-device
  ------------------------------------------------------------*/

  if($(".touch-device").length>0) {
    $("figure a").click(function(e){
      if($(this).hasClass('selected')){
        $(this).removeClass('selected');
      }
      else{
        $("figure a").removeClass('selected');
        $(this).addClass('selected');
        return false;
      }
    })
  }

  /* Double click on touch-device Portfolio
  ------------------------------------------------------------*/

  if($(".touch-device").length>0) {
    $(".isotope .element-item a").click(function(e){
      if($(this).hasClass('selected')){
        $(this).removeClass('selected');
      }
      else{
        $(".isotope .element-item a").removeClass('selected');
        $(this).addClass('selected');
        return false;
      }
    })
  }

  /*  start Dzsparallaxer
  -------------------------------------------------------------*/

  if($(".no-touch-device .dzsparallaxer").length>0) {
    startDzsparallaxer();
  }

  /* addScrollMenu
  -------------------------------------------------------------*/
  if($(" .top-menu").length>0) {
    addScrollMenu();
  }

  /* Converting img to svg
  -------------------------------------------------------------*/
  $('img.svg').each(function(){
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);

    }, 'xml');
  });

  /**/
  $('.go-play').on('click', function () {
    var video = $(this).parent().find('.video').get(0);
    var wrapBox = $(this).parent();
    if (video.paused === false) {
        video.pause();
        wrapBox.removeClass('play-my-video');
    } else {
        video.play();
        wrapBox.addClass('play-my-video');
    }

    return false;
  });







}); /* end document.ready */




 /* window resize
 --------------------------------------------------------------------
 --------------------------------------------------------------------
 ------------------------------------------------------------------*/

$( window ).resize(function() {

  if($(".fixed-height").length>0) {
    fixedheight();
  }

  if($(".menu-box").length>0) {
    moveWidget();
  }
  if($(".top-menu").length>0) {
    widthMenuBox();
  }

  if($("#header:not(.always-minimized-menu)").length>0) {
    minimizedMenu();
  }
  if ($("#header.top-menu").hasClass("transform-menu")) {
    $("#header.top-menu").removeClass("transform-menu");
  };
  setTimeout(function(){
    menu();
  }, 100);
  setTimeout(function(){
     transformMenu();
  }, 200);
  /* about move img and text box
  ----------------------------------------------------------------*/
  if($(".table-box").length>0) {
    setTimeout(function(){
      moveAboutBox();
      moveSectionBox();
    }, 300);
  }

  /* primary-banner
  -----------------------------------------------------------------*/
  if($(".heightPrimaryBanner").length>0) {
    heightPrimaryBanner();
  }

  /* Team-carousel
  -----------------------------------------------------------------*/
  if($("#team-carousel").length>0) {
    teamCarousel();
    marginTopTeamCarousel();
  }

  /* Clients-carousel
  -----------------------------------------------------------------*/
  if($(".client-carousel").length>0) {
    $(".client-carousel *").removeAttr('style');
    setTimeout(function(){
      clCarousel();
    },100);
  }

  /*  HeightFilterIsotop
  ----------------------------------------------------------------*/
   if($(".wrap-isotop").length>0) {
    filterReset();
  }

  /*  HeightFilterIsotop
  ----------------------------------------------------------------*/
  if($(".wrap-isotop").length>0) {
    setTimeout(function(){
      heightFilterIsotop();
    }, 100);
  }

  /* heightIsotop
  --------------------------------------------------------------------*/
  if($(".isotope").length>0){
    heightIsotop();
  }

  /*  Slider-overlay
  ----------------------------------------------------------------*/
  if($('.slider-overlay').length>0) {
    titleParams();
    //titleCanvas();
  }

  /* Height Map
  ------------------------------------------------------------------------------*/
  heightMap();

  /* Google Maps
  ---------------------------------------------------------------- */
  if($(".map-canvas").length>0){
    setTimeout(function(){
      initializeMap();
    }, 500 );
  }

  /* height about-us img
  ----------------------------------------------------------------------*/
  if($("#about-us").length>0) {
    heightBlockImg();
  }

  /* height Menu
  ----------------------------------------------------------------------*/
  heightMenu();

  /* movePortfolioSlider
  ----------------------------------------------------------------------*/
  movePortfolioSlider();

  /* FaceBook reload
  ----------------------------------------------------------------------*/
  if($(".fb-page").length>0) {
    $(".fb-page").attr("data-width", $('.social-feeds-box').width());
    FB.XFBML.parse();
  }

  /* Close portfolio
  ----------------------------------------------------------------------*/
  if($(".no-touch-device .a-sliders-close").length>0) {
    $('.a-sliders-close').trigger( "click" );
  }

  /* last-posts height video block
  ----------------------------------------------------------------------*/
  if($(".last-posts").length>0) {
    lastPostsBoxHeight();
  }

  /* moveSerchform
  ----------------------------------------------------------------------*/
  moveSerchform();


  /*  start Dzsparallaxer
  ---------------------------------------------------------------------------------------*/

  if($(".no-touch-device .dzsparallaxer").length>0) {
    startDzsparallaxer();
  }

  /* addScrollMenu
  -------------------------------------------------------------*/
  if($(" .top-menu").length>0) {
    addScrollMenu();
  }

  /* Hide panel filter isotop
  ----------------------------------------------------------------*/
  if ($( ".isotop-filters").hasClass('hide-panel')) {
    $(".isotop-filters").css("height", ' ');
    setTimeout(function(){
      sizeHideFilter();
    }, 300 );
    console.log('sdsd');
  };


}); /* end window resize */


window.addEventListener("orientationchange", function() {
  $('.a-sliders-close').trigger( "click" );
}, false);


$( window ).load(function() {
  /* masonry
  -------------------------------------------------------------------*/
  if($(".grid").length>0){
    $('.grid').masonry({
      itemSelector: '.grid-item',
    });
  }

  /* Hide preloader
  -------------------------------------------------------------------*/
  setTimeout(function(){
    $('.preloader').fadeOut('slow',function(){$(this).remove();});
  }, 200);

  /* Team-carousel
  -----------------------------------------------------------------*/
  if($("#team-carousel").length>0) {

    setTimeout(function(){
      teamCarousel();
    }, 100);

    marginTopTeamCarousel();
  }

  /* Clients-carousel
  -----------------------------------------------------------------*/
  if($(".client-carousel").length>0) {
    clCarousel();
  }

  /* ---------------------- SOCIAL BUTTONS --------------------------*/
  if($(".social-inp").length>0) {
    var urlsoc = location.href;
    $('.shared-btn').each(function(){
      new GetShare({
        root: $(this),
        network: $(this).data('network'),
        button: {text: ''},
        share: {
          url: urlsoc,
          message: 'Link to '+urlsoc+' '
        }
      });
    });
  }

  /* ShareCount
  ----------------------------------------------------------------------------- */
  function shareCount() {
    var numb = $('.post-soc-icon .social-inp .getshare-counter'),
      allCount = 0;
    numb.each(function () {
      allCount = allCount + Number($(this).html());
    });
    $('.count-shared .quantity').html(allCount);
  }

  if($(".tlt").length>0) {
    $(function () {
      $('.tlt').textillate();
    })
  }

  if($(".tlt-2").length>0) {
    $(function () {
      $('.tlt-2').textillate({ in: { sync: true}});
    })
  }

  /* height about-us img
  ----------------------------------------------------------------------*/
  if($("#about-us").length>0) {
    setTimeout(function(){
      heightBlockImg();
    }, 500);
  }

  /* twitter-timeline Slider
  ------------------------------------------------------------------------------*/
  if($(".twitter-timeline").length>0) {
    twitterCarousel();
  }

  /* heightIsotop
  --------------------------------------------------------------------*/
  if($(".isotope").length>0){
    heightIsotop();
  }

  /* beginning-now
  -------------------------------------------------------------------*/

  if($("main:not(.promo) .isotope.beginning-now").length>0) {
    fadeElementItem();
  }


}); //and window load





$(window).scroll(function() {
  if($("main:not(.promo) .isotope").length>0) {
    fadeElementItem();
  }
  if($("main:not(.promo) .team-element:not(.show-team-element)").length>0) {
    fadeTeamElement();
  }
});

/*------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
/*---------------------- Function List -----------------------------*/
/*------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
/*------------------------------------------------------------------*/


/* Header widthMenuBox
-------------------------------------------------------------------*/
function widthMenuBox(){
  var windowWidth = $(window).width();
  $(".header-box ").css("width","") // reset when resize
  var firstBox = $('#header .header-box:nth-child(1n)').width();
  var thirdBox = $('#header .header-box:nth-child(3n)').width();

  if (firstBox >= thirdBox) {
    var widthBox = firstBox;
  }else if (thirdBox >= firstBox) {
    var widthBox = thirdBox;
  };

  var widthMenuBox = windowWidth - (widthBox * 2 ) -7;
  $("#header .menu-box").css("width", widthMenuBox );

  $("#header .first, #header .third").css("width", (widthBox + 1) );


}

function transformMenu(){

  if ($("#header.top-menu").hasClass("transform-menu")) {
    $("#header.top-menu").removeClass("transform-menu");
  };

  setTimeout(function(){

    var widthMenuBox = $('.header-box.menu-box').width();
    var full_weight=0;
    $(".navbar-nav >li").each(function(){
    full_weight+=$(this).innerWidth() + 10;
    });

    if (full_weight > widthMenuBox) {
      $("#header.top-menu").addClass("transform-menu");
    }
    menu();

  }, 200);

}

/* Header Menu
-------------------------------------------------------------------*/
/*Add clas minimized-menu */
function minimizedMenu(){
  var body    = $('body');
  if ((body.width() + scrollWidth) < 992){
    $('#header.top-menu').addClass('minimized-menu');
  }
  else {
    $('#header.top-menu').removeClass('minimized-menu');
  };
}

/*Menu*/
function menu() {
  var body    = $('body'),
      primary = '.primary';

  $(primary).find('.parent > a .open-sub').remove();

  if ((body.width() + scrollWidth) < 992 || $('.header').hasClass('minimized-menu') || $('.header').hasClass('transform-menu'))
    $(primary).find('.parent > a, .megamenu .title').append('<span class="open-sub"><span></span><span></span></span>');
  else
    $(primary).find('ul').removeAttr('style').find('li').removeClass('active');

  $(primary).find('.open-sub').click(function(e){
    e.preventDefault();

    var item = $(this).closest('li, .box');

    if ($(item).hasClass('active')) {
      $(item).children().last().slideUp(600);
      $(item).removeClass('active');
    } else {
      var li = $(this).closest('li, .box').parent('ul, .sub-list').children('li, .box');

      if ($(li).is('.active')) {
        $(li).removeClass('active').children('ul').slideUp(600);
      }

      $(item).children().last().slideDown(600);
      $(item).addClass('active');

      if (body.width() + scrollWidth > 991) {
        var maxHeight = body.height() - ($(primary).find('.navbar-nav')).offset().top - 20;

        $(primary).find('.navbar-nav').css({
          maxHeight : maxHeight,
          overflow  : 'auto'
        });
      }
    }
  });

  $(primary).find('.parent > a').click(function(e){
    if (((body.width() + scrollWidth) > 991) &&  (isTouchDevice)) {
      var $this = $(this);

      if ($this.parent().hasClass('open')) {
        $this.parent().removeClass('open')
      } else {
        e.preventDefault();

        $this.parent().addClass('open')
      }
    }
  });

  body.on('click', function(e) {
    if (!$(e.target).is(primary + ' *')) {
      if ($(primary + ' .collapse').hasClass('in')) {
        $(primary + ' .navbar-toggle').addClass('collapsed');
        $(primary + ' .navbar-collapse').collapse('hide');
      }
    }
  });

  $( "#header .navbar .navbar-toggle" ).on( "click", function() {
    if ($('.navbar-collapse.collapse').hasClass('in')) {
      $('#header .navbar .navbar-toggle').removeClass('opened');
    }
    else{
      $('#header .navbar .navbar-toggle').addClass('opened');
    }
  });

  $( "main" ).on( "click", function() {
    if ($('.navbar-collapse.collapse').hasClass('in')) {
      $('#header .navbar .navbar-toggle').removeClass('opened');
    }
  });

 /* Top Menu
 -------------------------------------------------------------------*/
 var topMenu = $('.top-navbar').find('.collapse');

  if ((body.width() + scrollWidth) < 992)
    topMenu.css('width', body.find('#top-box .container').width());
  else
    topMenu.css('width', 'auto');
}

/* menu add scroll
--------------------------------------------------------------------*/
function addScrollMenu(){

  setTimeout(function(){
    if($('#header').hasClass('minimized-menu') || $('#header').hasClass('transform-menu')){

      $('.navbar-collapse').mCustomScrollbar({
        scrollInertia: 20,
      });
    }
    else {
      $('.navbar-collapse').mCustomScrollbar("destroy");
    }
  }, 2800);

}

/* MoveWidget
-------------------------------------------------------------------*/
function moveWidget(){
  if ($body.width() + scrollWidth < 768) {
    $('.widget-box').append($('#languages'));
    $('.widget-box').append($('.header-soc-icon'));
  }else{
    $('.header-box.first').append($('#languages'));
    $('.header-box.third').append($('.header-soc-icon'));
  }
}

/* Primary Banner
-------------------------------------------------------------------*/
function heightPrimaryBanner(){
  var pWindowHeight= $(window).height();
  $(".heightPrimaryBanner").css("height", (pWindowHeight - headerHeight) );
}

/* MoveAboutBox
-------------------------------------------------------------------*/
function moveAboutBox(){
 if ($body.width() + scrollWidth < 991) {
  $('.table-row').each(function(index, element){
   var el = $(element);
   el.find('.table-box:nth-child(2) .t2').after(el.find(' .table-box:nth-child(2) .t1'));
  });
 } else {
  $('.table-row').each(function(index, element){
   var el = $(element);
   el.find('.table-box:nth-child(2) .t1').after(el.find(' .table-box:nth-child(2) .t2'));
  });
 }
}
function moveSectionBox(){
  if ($body.width() + scrollWidth < 991) {
    $('.table-box.t2').after($(' .table-box.t1'));
  }else{
    $('.table-box.t1').after($(' .table-box.t2'));
  }
}

/**/
function marginTopTeamCarousel(){
  if ($body.width() + scrollWidth >= 992) {
    setTimeout(function(){
    var HeightThumbsWrapper = $("#team-carousel #thumbs-wrapper").height() +40;
    $("#team-carousel #carousel-wrapper ").css("margin-top", -HeightThumbsWrapper)
    }, 100);
  }else{
    $("#team-carousel #carousel-wrapper ").css("margin-top", "")
  }
}

/* Team carouFredSel
  ----------------------------------------------------------------*/
function teamCarousel() {

  $('#carousel').carouFredSel({
    responsive: true,
    circular: true,
    auto: false,
    width: '100%',
    items: {
      visible: 1,
       width: 300,
       height: 'auto',
    },
    scroll: {
      fx: 'fade'
    }
  });

  $('#thumbs').carouFredSel({
    responsive: true,
    circular: true,
    infinite: false,
    auto: false,
    prev: '#prev',
    next: '#next',
    items: {
      visible: {
        min: 1,
        max: 4
      },
       //width: 400,
      // height: '66%'
    },
    scroll : {
        items           : 1,
      }
  });

  $( "#thumbs a" ).on( "click", function(e) {
    var button = $(this);

    e.preventDefault();

    if(button.hasClass('selected'))
      return false;

    animateFinish();

    var duration = 1;

    $('#carousel .col-xs-12.active [data-out-animation]').each(function(){
      var $this = $(this);

      if ($this.data('outAnimationDelay')){
        if ($this.data('outAnimationDelay') >= duration)
          duration = $this.data('outAnimationDelay');
      }

      duration = duration + 1000;

      setTimeout(function(){
        $('#carousel').trigger('slideTo', '#' + button.attr('href').split('#').pop());
        $('#carousel .col-xs-12').removeClass('active');
        $('#' + button.attr('href').split('#').pop()).addClass('active');
        $('#thumbs a').removeClass('selected');
        button.addClass('selected');

        animateStart();

        //start PieProgress
        setTimeout(function() {
          $('#carousel .col-xs-12.active').find('.pie_progress').asPieProgress('start');
        }, 1500);

      }, duration);
    });
  });

}

/* Clients carouFredSel
  ----------------------------------------------------------------*/
  function clCarousel() {
  var carousel = $('.client-carousel');

  carousel.each(function(){
    var $this = $(this);

    $this.find('.cl-carousel').carouFredSel({
      responsive: true,
      circular: true,
      auto: false,
      width: '100%',
      items: {
        visible: 1,
         width: 300,
         height: 'auto',
      },
      scroll: {
        fx: 'cover-fade'
      }
    });

    $this.find('.cl-thumbs').carouFredSel({
      responsive: true,
      circular: true,
      infinite: false,
      auto: false,
      width: '100%',
      prev:  $this.find('.cl-prev'),
      next:  $this.find('.cl-next'),
      items: {
        visible: {
          min: 1,
          max: 4
        },
        width: 150,
        // height: '66%'
      },
      scroll : {
            items           : 1,
        }
    });

    $this.find('.cl-thumbs a').on( "click", function() {
      $this.find('.cl-carousel').trigger('slideTo', '#' + this.href.split('#').pop() );
      $this.find('.cl-thumbs a').removeClass('selected');
      $(this).addClass('selected');
      return false;
    });
  })
}

/* Height item-isotop
-----------------------------------------------------------------*/
function filterReset(){
  $( "#filters .wrap-button .button:first-of-type" ).trigger( "click" );
}

function heightFilterIsotop(){
   if (($body.width() + scrollWidth) >= 768) {
    var heightItemImg = $('.isotope .element-item:not(.isotope-hidden) img').height();
    $(".isotop-filters").css("top", heightItemImg );
    $(".isotop-filters").css("height", (heightItemImg * 2) );
  }else{
    $(".isotop-filters").css("height", "" );
  }
}

function sizeHideFilter(){
  var heightItemImg = $('.isotope .element-item:not(.isotope-hidden) img').height();
  $(".isotop-filters").css("height", heightItemImg);
  var widthItemImg = $('.isotope .element-item:not(.isotope-hidden) img').width();
  $(".isotop-filters").css("width", widthItemImg);
}

/* Fix Height Isotop block
------------------------------------------------------------------------*/
function heightIsotop(){
  $(".isotope.my-height").css("min-height", "");
  setTimeout(function(){
    var firstHeight = $('.isotope').height();
    $(".isotope.my-height").css("min-height", firstHeight);
  }, 500);
}

/* Background Clip Title
-----------------------------------------------------------------*/
function titleParams() {
  var textT = $('.text-transparent');

  textT.each(function(){
    var $this = $(this),
        title = $this.find('.title-box .title'),
        fontSize = 100,
        fontWeight  = 800,
        fontFamily,
        bg = '#fff';

    if (title.data('fontsize')) {
      var fontSize = title.data('fontsize');

      title.css('fontSize', fontSize + 'px');

      if ($body.width() < 992 && $body.width() > 767)
        title.css('fontSize', (fontSize * 0.6) + 'px');

      else if ($body.width() < 1042 && $body.width() > 991)
        title.css('fontSize', (fontSize * 0.4) + 'px');

      else if ($body.width() < 1400 && $body.width() > 1043)
        title.css('fontSize', (fontSize * 0.6) + 'px');

      else if ($body.width() < 1650 && $body.width() > 1580)
        title.css('fontSize', (fontSize * 0.8) + 'px');

      else if ($('body').width() < 768)
        title.css('fontSize', (fontSize * 0.42) + 'px');

      fontSize = parseFloat(title.css('font-size'));
    }

    if (title.data('fontweight')) {
      title.css('fontWeight', title.data('fontweight'));
      fontWeight = title.data('fontweight');
    }

    if (title.data('fontfamily')) {
      title.css('fontFamily', title.data('fontfamily'));
      fontFamily = title.data('fontfamily');
    }

    if (title.data('bg')) {
      $this.find('.bg').css('background', title.data('bg'));
      bg = title.data('bg');
    }

    $this.find('.title-canvas').remove();

    var titleWidth  = title.width(),
        titleHeight = title.height();

    title.after('<canvas class="title-canvas" width="' + titleWidth + '" height="' + titleHeight + '"></canvas>');

    var canvas = $this.find('.title-canvas').get(0),
        ctx = canvas.getContext('2d');

    ctx.fillStyle = bg;
    ctx.fillRect(0,0,titleWidth,titleHeight);

    ctx.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily;
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';

    ctx.globalCompositeOperation = 'destination-out';
    wrapText(ctx, title.text(), titleWidth / 2 , fontSize * 0.87, titleWidth, fontSize);
    title.addClass('hidden-title');
    $this.addClass('loaded');
  });
}
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var textLine = line + words[n] + ' ';
    var metrics = ctx.measureText(textLine);
    var textWidth = metrics.width;
    if (textWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = textLine;
    }
  }
  ctx.fillText(line, x, y);
}

//Animate Start
function animateStart(){
  $('#carousel [data-animation]').each(function(){
    var $this     = $(this),
        animation = 'fadeIn',
        outAnimation = 'fadeOut',
        delay     = 1;

    if ($this.data('animation'))
      animation = $this.data('animation');

    if ($this.data('animationDelay'))
      delay = $this.data('animationDelay');

    if ($this.data('outAnimation'))
      outAnimation = $this.data('outAnimation');

    $this.removeClass(outAnimation);

    if ($this.closest('.col-xs-12').hasClass('active'))
      $this.css('animation-delay', delay + 'ms').addClass('animated').addClass(animation);
  });
}

//Animate Finish
function animateFinish(){
  var duration = 1;

  $('#carousel .col-xs-12.active [data-out-animation]').each(function(){
    var $this        = $(this),
        animation    = 'fadeIn',
        outAnimation = 'fadeOut',
        delay        = 1,
        outDelay     = 1;

    if ($this.data('animation'))
      animation = $this.data('animation');

    if ($this.data('outAnimation'))
      outAnimation = $this.data('outAnimation');

    if ($this.data('animationDelay'))
      delay = $this.data('animationDelay');

    if ($this.data('outAnimationDelay'))
      outDelay = $this.data('outAnimationDelay');

    $this.css('animation-delay', delay + 'ms');

    if (outDelay >= duration)
      duration = outDelay;

    $this.removeClass(animation).addClass(outAnimation);

    if ($this.data('outAnimationDelay'))
      $this.css('animation-delay', outDelay + 'ms');
    else
      $this.css('animation-delay', '1ms');
  });
}

/* SKILLS SIRCLES
------------------------------------------------------------------------*/
function initSkillSircles(classElem) {
  var $skillItem = $(classElem);
  if ($skillItem) {
    $skillItem.each(function(){
      var $this = $(this),
          title,
          dataPercent = dataAttrSkills($this, 'percent', '50'),
          startcolorline = dataAttrSkills($this, 'start-color', 'transparent'),
          color = dataAttrSkills($this,'color', '#111');

      title = $this.text();
      // advanced settings
      $this.appear(function() {
        $this.easyCircleSkill({
          percent        : dataPercent,
          linesize       : 3,
          startcolorline : startcolorline,
          skillName      : title,
          colorline      : color
        });
      });

    });
  };
};
function dataAttrSkills(elem, dataName, setDefault) {
  var data = elem.data(dataName),
    res= !!data ? data : setDefault;
  return res;
}

/* Google Map
-----------------------------------------------------------------------*/

function initializeMap() {
  var myCenter=new google.maps.LatLng(-15.7942287, -47.8821658);
  var image = 'images/marker.png';
  var marker=new google.maps.Marker({
      position:myCenter,
      title: 'Brasília',
      icon: image,
  });

  var mapProp = {
      center:myCenter,
      zoom: 10,
      draggable: false,
      scrollwheel: false,
      disableDefaultUI: true,
      mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  var map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);
  marker.setMap(map);

  google.maps.event.addListener(marker, 'click', function() {

    infowindow.setContent(contentString);
    infowindow.open(map, marker);

  });
}

/* Portfolio fadeIn element
----------------------------------------------------------------------*/
function fadeElementItem() {
  if ($(document, window).scrollTop() + windowHeight >= $('.portfolio').offset().top) {

    var $target = $('.element-item');
    var hold = 50;

    $.each($target,function(i,t){
      var $this = $(t);
      setTimeout(function(){ $this.addClass('show-element'); },i*hold);
    });

  }
}

/* Portfolio fadeIn element
----------------------------------------------------------------------*/

function fadeTeamElement() {
  var carouselHeight = $('#team-carousel').height();

  if ($(document, window).scrollTop() + windowHeight >= $('#team').offset().top + (carouselHeight / 2)) {
    $('.team-element').addClass('show-team-element');
  }

}

/* height about-us img
----------------------------------------------------------------------*/
function heightBlockImg(){
  $("#about-us .img-content-box .t1 ").css("height", "auto" );
  var boxHeight = $('#about-us .img-content-box').height();
  var helloBoxHeight = $('#about-us .img-content-box .t2').innerHeight();
  $("#about-us .img-content-box .t1 ").css("height", (boxHeight - helloBoxHeight) );
}

/* height Menu
----------------------------------------------------------------------*/
function heightMenu(){
  var maxHeight = windowHeight - headerHeight;
  $(".navbar-collapse, #header.menu-sidebar").css("max-height", maxHeight );
  if ($('#header').hasClass('menu-sidebar') && ($body.width() + scrollWidth) > 767) {
    var firstBoxHeight = $('#header.menu-sidebar .first').height();
    var thirdBoxHeight = $('#header.menu-sidebar .third').height();

    $("#header.menu-sidebar .menu-box").css("height", (maxHeight - firstBoxHeight - thirdBoxHeight) );
  };
}

/* MovePortfolioSlider
-------------------------------------------------------------------*/
function movePortfolioSlider(){
  if ($body.width() + scrollWidth < 768) {
    $('#filters').insertAfter($('#portfolio-anchor'));
    $('#portfolio-anchor').insertBefore($('#portfolio .sliders'));
  }else{
    $('.wrap-isotop').append($('#filters'));
  }
}

/* twitter-timeline Slider
------------------------------------------------------------------------------*/

function twitterCarousel(){
  setTimeout(function(){
    $('.twitter-timeline ul').owlCarousel({
      loop:true,
      dots:false,
      margin:10,
      nav:true,
      navText: ["<i class='fa fa-chevron-circle-left'></i>", "<i class='fa fa-chevron-circle-right'></i>"],
      responsive:{
          0:{
            items:1
          },
        }
    })
     $('.twitter-timeline ul').addClass('show-carousel');
  }, 1500);
}

/* Height Map
------------------------------------------------------------------------------*/
function heightMap(){
  $("#map-canvas").css("height", "" );
  setTimeout(function(){
    if ($body.width() + scrollWidth > 767) {
      var boxHeight = $('.fix-map-height').innerHeight();
      $("#map-canvas").css("height", boxHeight );
    }else{
      $("#map-canvas").css("min-height", 300 );
    };
  }, 400);
}

/* Last-posts box height
------------------------------------------------------------------------------*/
function lastPostsBoxHeight(){
  setTimeout(function(){
    var imgHeight = $('.last-posts .img-last-post-box img').height();
    $(".last-posts .youtube-iframe").css("height", imgHeight );
  }, 100);
}

/* Move searchform
-----------------------------------------------------------------------------*/
function moveSerchform(){
  if ($body.width() + scrollWidth < 992) {
    $('#searchform').insertBefore($('#blog , .blog-post '));
  }else{
    $('.search-form').append($('#searchform'));
  }
}

/* startDzsparallaxer
-----------------------------------------------------------------------*/
function startDzsparallaxer(){
  if ($body.width() + scrollWidth > 991) {

    $('.dzsparallaxer').each(function(){
      var $this = $(this);
      var elOpion = $this.data('options');
      dzsprx_init(this, elOpion );
    });
  }
}

function fixedheight(){
  var fixedheight = windowHeight*0.6;
  $('.fixed-height').css('height', fixedheight +'px');
}



/* enable scroll
---------------------------------------------------------------------------------------*/
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}






}());
