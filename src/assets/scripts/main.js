// const { $ } = require("video.js/dist/types/utils/dom");

var isRTL = ($('html').attr('dir') == "rtl") ? true : false,
  winWidth = $(window).width(),
  winHeight = $(window).height();

$(function () {
  browserDetect();
});


$(window).on('resize orientationchange', function () {
  // Do on resize
  winWidth = $(window).width(),
    winHeight = $(window).height();
});

$(window).on('scroll', function () {
  //Do on Scroll
});

$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    //Do on ESC press
  }
});

function browserDetect() {
  navigator.sayswho = (function () {
    var ua = navigator.userAgent,
      tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join('').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();
  $('body').addClass(navigator.sayswho);
}


$(document).ready(function () {
  // animateWords();
  
  openCloseHomeSidebar();

  openClosePortfolioSidebar();

  showcaseIsotopes();

  serviceSlider ();

  dataTrim();
  ChangeToSvg();
  formValidation();

});

// open / close home sidebar

function openCloseHomeSidebar () {
  $('.home-header .hamburger i').click(function(){ 
    $('.home-sidebar').toggleClass('open');
  });
}

// open / close portfolio sidebar

function openClosePortfolioSidebar () {
  $('.portfolio-header .left-content i').click(function(){
    $('.portfolio-sidebar').toggleClass('open');
    $('.portfolio-sidebar .item').removeClass('active');
  });

  $('.portfolio-sidebar .item').click(function(){
    $('.portfolio-sidebar .item').removeClass('active');
    $(this).addClass('active');
  });

  $(document).on('load', $(window).bind("resize", checkPosition));
  function checkPosition()
  {
      if ($(window).width() > 600){
          $('.portfolio-sidebar').removeClass('open');
      }
  }
  
}

// showcase isotopes

function showcaseIsotopes() {

  // changing name to default active
  var category_name = $('.portfolio-showcase .btns .active').html().toLowerCase();
  var first_letter = category_name[0].toUpperCase();
  var title_name = category_name.replace(category_name[0], first_letter);
  $('.portfolio-showcase .num-of-items .name').html(title_name);

  // changing number to default active
  var filterValue = $('.portfolio-showcase .btns .active').attr('data-filter');
  var numItem = $('.portfolio-showcase ' + filterValue).length;
  $('.portfolio-showcase .num-of-items .num').html(numItem);

  if (numItem < 2) {
    $('.portfolio-showcase .num-of-items .itms').html('item');
  } else {
    $('.portfolio-showcase .num-of-items .itms').html('items');
  }

  // init Isotope
  var $grid = $('.portfolio-showcase .grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows'
  });

  $grid.isotope({ filter: '.landscape' });

  $('.portfolio-showcase .filter-button-group').on('click', 'button', function(){
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });

    // Changing number (It has _ items)
    var numItem = $('.portfolio-showcase ' + filterValue).length;
    $('.portfolio-showcase .num-of-items .num').html(numItem);
    var category_name = $(this).html().toLowerCase();
    var first_letter = category_name[0].toUpperCase();
    var title_name = category_name.replace(category_name[0], first_letter);
    $('.portfolio-showcase .num-of-items .name').html(title_name);

    if (numItem < 2) {
      $('.portfolio-showcase .num-of-items .itms').html('item');
    } else {
      $('.portfolio-showcase .num-of-items .itms').html('items');
    }
    
    //Adding active btn affect
    $('.portfolio-showcase .btns button').removeClass('active');
    $(this).addClass('active');
  });
}

// services slider

function serviceSlider () {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'vertical',

    slidesPerView: 4,
    //slidesPerGroup: 4,
    //freeMode: true,
    spaceBetween: 47.5,
    loop: true,
    keyboard: {
      enabled: true,
    },
    // pagination: {
    //   el: ".swiper-pagination",
    //   //clickable: true,
    //   type: "fraction",
    // },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // custom pagination
    on: {
      slideChange: function () {
        var index_currentSlide = this.realIndex + 1;
        //console.log(index_currentSlide); 

        $('.portfolio-services .current-slide-js').html(index_currentSlide);
      },
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      601: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      991: {
        slidesPerView: 4,
        spaceBetween: 47.5,
      },
    },
  });

  const total_slides = ($('.portfolio-services .swiper-slide')).length;
  //console.log(total_slides);
  $('.portfolio-services .total-slide-js').html(total_slides);
}

function dataTrim() {
  var ellipsis = "...";
  $("[data-trim]").each(function () {
    var text = $(this).html();
    var charLimit = parseInt($(this).attr("data-trim"));
    $(this).html(TrimLength(text, charLimit));
    $(this).addClass("is--trimmed");
  });

  function TrimLength(text, maxLength) {
    text = $.trim(text);
    if (text.length > maxLength) {
      text = text.substring(0, maxLength - ellipsis.length);
      return text.substring(0, text.lastIndexOf(" ")) + ellipsis;
    } else return text;
  }
}

function ChangeToSvg() {
  $("img.js-tosvg").each(function () {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    $.get(
      imgURL,
      function (data) {
        var $svg = $(data).find("svg");
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " insvg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        if (
          !$svg.attr("viewBox") &&
          $svg.attr("height") &&
          $svg.attr("width")
        ) {
          $svg.attr(
            "viewBox",
            "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
          );
        }
        $img.replaceWith($svg);
      },
      "xml"
    );
  });
}


// Form Field Validation Start 

function formValidation() {
  const submitBtn = document.querySelectorAll(".Formsubmit");

  // Loop through each submit button
  submitBtn.forEach(function (button) {
    button.addEventListener('click', function (event) {
      var form = event.target.closest('form'); // Get the parent form of the clicked button
      var isValid = true;

      $(form).find(".form-row-dropdown, .form-fields-row").each(function () {
        var $select = $(this).find("select");
        var $errorMessage = $(this).find(".error");
        var $select2Container = $(this).find(".select2-container");

        if ($select.val() == null || $select.val() == "1") {
          isValid = false;
          $select2Container.addClass("error-border");
          $errorMessage.show();
        } else {
          $select2Container.removeClass("error-border");
          $errorMessage.hide();
        }
      });

      // Check input fields with the required class within the current form
      $(form).find(".required").each(function () {
        if ($(this).val().trim() === "") {
          isValid = false;
          $(this).addClass("error-border");
          $(this).siblings('.error').show();
        } else {
          $(this).removeClass("error-border");
          $(this).siblings('.error').hide();
        }
      });

      if (!isValid) {
        event.preventDefault(); // Prevent form submission if validation fails
      }
    });
  });

  // 
  var togglePasswordIcons = document.querySelectorAll('.eye-icon');
  var togglePasswordSlashIcons = document.querySelectorAll('.eye-slash-icon');

  togglePasswordIcons.forEach(function (icon) {
    icon.addEventListener('click', function () {
      togglePasswordVisibility(icon);
    });
  });

  togglePasswordSlashIcons.forEach(function (Slashicon) {
    Slashicon.addEventListener('click', function () {
      togglePasswordVisibility(Slashicon);
    });
  });

  function togglePasswordVisibility(clickedIcon) {
    var passwordField = clickedIcon.parentNode.querySelector('.password-field');
    var relatedIcon = clickedIcon.classList.contains('eye-icon') ?
      clickedIcon.nextElementSibling :
      clickedIcon.previousElementSibling;

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      clickedIcon.style.display = 'none';
      relatedIcon.style.display = 'block';
    } else {
      passwordField.type = 'password';
      clickedIcon.style.display = 'none';
      relatedIcon.style.display = 'block';
    }
  }
}


