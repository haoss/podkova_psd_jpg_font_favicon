'use strict'

// Document ready
$(document).on('ready', function(){

  // SVG Fallback
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };

  // E-mail Ajax Send
  // Documentation & Example: https://github.com/agragregra/uniMail
  $("form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Thank you!");
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    showCloseBtn: false
  });
  $('.popup__close').on('click', function(){
    $.magnificPopup.close();
  });

  imgThumbnails();
  mobileMenu();
  inputFocus();

  var owl = $('.specialists__carousel');
  owl.owlCarousel({
    items: 4,
    loop: true,
    nav: false,
    dots: false,
    responsive: {
      320: {
        items: 1
      },
      480: {
        items: 2
      },
      767: {
        items: 4
      }
    }
  });
  $('#specialistsLeft').click(function(){
      owl.trigger('prev.owl.carousel');

  })
  $('#specialistsRight').click(function(){
      owl.trigger('next.owl.carousel');
  });

  var owl2 = $('.news-list__carousel');
  owl2.owlCarousel({
    items: 2,
    loop: true,
    nav: false,
    dots: false,
    responsive: {
      320: {
        items: 1
      },
      991: {
        items: 2,
        margin: 30
      }
    }
  });
  $('#newslistLeft').click(function(){
      owl2.trigger('prev.owl.carousel');
  })
  $('#newslistRight').click(function(){
      owl2.trigger('next.owl.carousel');
  });

  $('.main-slider__carousel').owlCarousel({
    items: 1,
    nav: false,
    dots: true,
    loop: true,
    mouseDrag: false,
    // autoplay: true,
    // autoplayTimeout: 7000,
    smartSpeed: 2000
  });

  $('.special__carousel').owlCarousel({
    items: 1,
    nav: false,
    dots: true,
    loop: true,
    mouseDrag: true,
    autoplay: true,
    autoplayTimeout: 5000
  });

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  // $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('resize', function(){
  var width = $(window).width();

  if (width > 991 && $('#headerNav').hasClass('is-active')) {
    $('#headerNav').removeClass('is-active')
  }
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();

    var formData = {};

    var hasFile = false;

    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function imgThumbnails(){
  var img = $('.img-thumbnails');
  if (img.length < 0) return;
  if (img.attr('title') == undefined) return;

  img.each(function(){
    $('<span class="img-thumbnails__title">' + $(this).attr('title') + '</span>').insertAfter($(this))
  })
}

function mobileMenu(){
  $('#headerBtn').on('click', function(e){
    e.stopPropagation();
    $('#headerNav').toggleClass('is-active')
  });
  $(document).on('click', function(){
    if ($('#headerNav').hasClass('is-active')) {
      setTimeout(function(){
        $('#headerNav').removeClass('is-active')
      }, 400)
    }
  });
}

function inputFocus(){
  $('.input-focus').each(function(){
    var _this = $(this);
    _this.focus(function() {
      _this.parents('.block-focus').addClass('is-focus');
    }).blur(function() {
      if (!_this.val().length > 0) {
        _this.parents('.block-focus').removeClass('is-focus');
      }
    });
  })
}
