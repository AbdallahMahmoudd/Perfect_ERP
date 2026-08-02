/* ------------------------
    Table of Contents

  1. Predefined variables
  2. Preloader  
  3. FullScreen
  4. Counter
  5. Owl carousel
  6. Testimonial Carousel
  7. Magnific Popup
  8. Scroll to top
  9. Banner Section
  10. Fixed Header
  11. Scrolling Animation
  12. Text Color, Background Color And Image
  13. Contact Form
  14. ProgressBar
  15. Countdown
  16. Wow Animation
  17. HT Window load and functions
  

------------------------ */

"use strict";

/*------------------------------------
  HT Predefined variables
--------------------------------------*/
const $window = $(window),
    $fullScreen = $('.fullscreen-banner') || $('.section-fullscreen'),
    $halfScreen = $('.halfscreen-banner'),
    searchActive = false;

//Check if function exists
$.fn.exists = function () {
  return this.length > 0;
};


/*------------------------------------
  HT PreLoader
--------------------------------------*/
function preloader() {
   $('#ht-preloader').fadeOut();
}


/*------------------------------------
  HT FullScreen
--------------------------------------*/
function fullScreen() {
    if ($fullScreen.exists()) {
        $fullScreen.each(function () {
        const $elem = $(this),
        elemHeight = $window.height();
        if($window.width() < 768 ) $elem.css('height', elemHeight/ 1);
        else $elem.css('height', elemHeight);
        });
        }
        if ($halfScreen.exists()) {
        $halfScreen.each(function () {
        const $elem = $(this),
        elemHeight = $window.height();
        $elem.css('height', elemHeight / 2);
        });
    }
}


/*------------------------------------
  HT menu
--------------------------------------*/
function menu() {  
 $('.dropdown-menu a.dropdown-toggle').on('click', function() {
  if (!$(this).next().hasClass('show')) {
    $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
  }
  const $subMenu = $(this).next(".dropdown-menu");
  $subMenu.toggleClass('show');

  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function() {
    $('.dropdown-submenu .show').removeClass("show");
  });

  return false;
});
}



/*------------------------------------
  HT Counter
--------------------------------------*/
function counter() {  
  $('.count-number').countTo({
    refreshInterval: 2
  });   
}


/*------------------------------------
  HT Owl Carousel
--------------------------------------*/
function owlcarousel() {
$('.owl-carousel').each( function() {
  const $carousel = $(this);
  $carousel.owlCarousel({
      items : $carousel.data("items"),
      slideBy : $carousel.data("slideby"),
      center : $carousel.data("center"),
      loop : true,
      margin : $carousel.data("margin"),
      dots : $carousel.data("dots"),
      nav : $carousel.data("nav"),      
      autoplay : $carousel.data("autoplay"),
      autoplayTimeout : $carousel.data("autoplay-timeout"),
      navText : [ '<span class="fas fa-angle-left"><span>', '<span class="fas fa-angle-right"></span>' ],
      responsive: {
        0:{items: $carousel.data('xs-items') ? $carousel.data('xs-items') : 1},
        576:{items: $carousel.data('sm-items')},
        768:{items: $carousel.data('md-items')},
        1024:{items: $carousel.data('lg-items')},
        1200:{items: $carousel.data("items")}
      },
  });
});
}


/*------------------------------------
  HT Testimonial Carousel
--------------------------------------*/  
function testimonialcarousel() {
    $('.testimonial-carousel').on('slide.bs.carousel', function (evt) {
      $('.testimonial-carousel .controls li.active').removeClass('active');
      $('.testimonial-carousel .controls li:eq('+$(evt.relatedTarget).index()+')').addClass('active');
    })
}

/*------------------------------------
  HT Scroll to top
--------------------------------------*/
function scrolltop() {
  const pxShow = 300,
    goTopButton = $(".scroll-top")
    // Show or hide the button
  if ($(window).scrollTop() >= pxShow) goTopButton.addClass('scroll-visible');
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= pxShow) {
      if (!goTopButton.hasClass('scroll-visible')) goTopButton.addClass('scroll-visible')
    } else {
      goTopButton.removeClass('scroll-visible')
    }
  });
  $('.smoothscroll').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
}


 /*------------------------------------
  HT Banner Section
--------------------------------------*/
function headerheight() {
  $('.fullscreen-banner .align-center, .nav-arrows span').each(function(){
    const headerHeight=$('.header').height();
    // headerHeight+=15; // maybe add an offset too?
    $(this).css('padding-top',headerHeight+'px');
  });
}


/*------------------------------------
  HT Fixed Header
--------------------------------------*/
function fxheader() {
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 100) {
      $('#header-wrap').addClass('fixed-header');
    } else {
      $('#header-wrap').removeClass('fixed-header');
    }
  });
}

/*------------------------------------
  HT Scrolling Animation
--------------------------------------*/
function scrolling() {
  $('.nav-item a[href*="#"]:not([href="#"]):not([href="#show"]):not([href="#hide"])').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 0);
        return false;
      }
    }
  });
  // Closes responsive menu when a scroll trigger link is clicked
  $('.nav-item a[href*="#"]:not([href="#"])').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });       
}


/*------------------------------------------
  HT Text Color, Background Color And Image
---------------------------------------------*/
function databgcolor() {
    $('[data-bg-color]').each(function(index, el) {
     $(el).css('background-color', $(el).data('bg-color'));  
    });
    $('[data-text-color]').each(function(index, el) {
     $(el).css('color', $(el).data('text-color'));  
    });
    $('[data-bg-img]').each(function() {
     $(this).css('background-image', 'url(' + $(this).data("bg-img") + ')');
    });
}


/*------------------------------------
  HT Contact Form
--------------------------------------*/
function contactform() { 
    $('#contact-form').validator();

    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

    // if the validator does not prevent form submit
    if (!e.isDefaultPrevented()) {
        const url = "php/contact.php";

        // POST values in the background the the script URL
        $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(),
            success: function (data)
            {
            // data = JSON object that contact.php returns

            // we recieve the type of the message: success x danger and apply it to the 
            const messageAlert = 'alert-' + data.type;
            const messageText = data.message;

            // let's compose Bootstrap alert box HTML
            const alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
            
            // If we have messageAlert and messageText
            if (messageAlert && messageText) {
                // inject the alert to .messages div in our form
                $('#contact-form').find('.messages').html(alertBox).show().delay(2000).fadeOut('slow');
                // empty the form
                $('#contact-form')[0].reset();
            }
          }
        });
        return false;
    }
 })    
}


/*------------------------------------
  HT ProgressBar
--------------------------------------*/
  function progressbar () {
    const progressBar = $('.progress');
    if(progressBar.length) {
      progressBar.each(function () {
        const Self = $(this);
        Self.appear(function () {
          const progressValue = Self.data('value');

          Self.find('.progress-bar').animate({
            width:progressValue+'%'           
          }, 1000);
        });
      })
    }
}
/*------------------------------------
  HT Countdown
--------------------------------------*/
$('.countdown').each(function () {

    const $counter = $(this);

    function initCountdown() {

        const finalDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

        $counter
            .countdown(finalDate)
            .on('update.countdown', function (event) {

                $counter.find('.days').text(event.strftime('%-D'));
                $counter.find('.hours').text(event.strftime('%H'));
                $counter.find('.minutes').text(event.strftime('%M'));
                $counter.find('.seconds').text(event.strftime('%S'));

            })
            .on('finish.countdown', function () {

                $counter.countdown('remove');
                initCountdown();

            });

    }

    initCountdown();

});

/*------------------------------------
  HT Wow Animation
--------------------------------------*/
function wowanimation() {
    const wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true
    });
    wow.init();
}


/*------------------------------------
  HT Window load and functions
--------------------------------------*/
$(function () {
    fullScreen();
    menu();
    owlcarousel();
    counter();
    testimonialcarousel();
    scrolltop();
    headerheight();
    fxheader();
    scrolling();
    databgcolor();
    contactform();
    progressbar();
});


$window.resize(function() {
  fullScreen();
});


$(window).on('load', function() {
    // preloader();
    wowanimation();
});
//
if ($('.hero-wrapper').length > 0) {
    $("header").addClass("custom-header")
}
// Year
document.getElementById("year").innerHTML = (new Date).getFullYear()