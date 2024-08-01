// var scrollPos = 0;
// $(window).scroll(function(){
   // var st = $(this).scrollTop();
   // if (st > scrollPos){
   //   $(".wrapper").addClass("bottom");
   // } else {     
   //   $(".wrapper").removeClass("bottom");
   // }
   // scrollPos = st;    
// });



$(document).ready(function() {

var last_scroll = 0;
window.onscroll = function(){
  if(window.scrollY > last_scroll){
    // console.log('down');
    $(".wrapper").addClass("bottom");
  }else{
    // console.log('up');
    $(".wrapper").removeClass("bottom");
  }
  last_scroll = window.scrollY;
}

// var timer;
// $(window).on('wheel', function(e){
//     if (e.originalEvent.wheelDelta >= 0){
//         console.log('Вверх');
//         // clearTimeout(timer);
//     } else {
//         console.log('Вниз');
//         // clearTimeout(timer);
//     }
// });

// let lastScrollTop = 0;
// let scrollable = document.querySelector("body");

// scrollable.addEventListener("scroll", function() {
//   let scrollTop = scrollable.scrollTop;
//   if (scrollTop > lastScrollTop) {
//     // console.log("Прокрутка вниз");
//     $(".wrapper").addClass("bottom");
//   } else {
//     // console.log("Прокрутка вверх");
//     $(".wrapper").removeClass("bottom");
//   }
//   lastScrollTop = scrollTop;
// });

//     document.body.addEventListener('mousewheel DOMMouseScroll MozMousePixelScroll', e => {
//     const delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 10) || 1
//     const direction = Math.sign(delta) //  результат 1 или -1
//     if (direction == 1){
//         $(".wrapper").addClass("bottom");
//     } else {
//         $(".wrapper").removeClass("bottom");
//     }
// });

// $(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
//     delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
//     if (delta >= 0) {
//       // $('#result').html('Вверх');
//       $(".wrapper").removeClass("bottom");
//     } else {
//       // $('#result').html('Вниз');
//       $(".wrapper").addClass("bottom");
//     }
//   });

    $(".dr_title").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dr_parent");
      sl = parent.find(".dr_content");
      if(sl.is(":hidden")) {
        parent.addClass("active");
        sl.slideDown(300);
      } else {               
        sl.slideUp(300);
        parent.removeClass("active");
      }
    });

    // -----------

    $(document).on("click", "[data-popup-link]",  function(e) {
      e.preventDefault();
      popupName = $(this).attr("data-popup-link");
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      topCoord = $(document).scrollTop();
      $("body").addClass("fixed");
      $("body").css({
          "top" :  -1 * topCoord + "px",
          "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup = '"+ popupName +"']").addClass("active");
    });
    $(document).on("click", ".close, .popup_bg", function(e) {
      e.preventDefault();
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").removeClass("fixed");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").attr("style", "");
      $("[data-popup]").removeClass("active");
      $(".popup_bg").fadeOut(300);
    });
    $(this).keydown(function(eventObject){
      if (eventObject.which == 27 && $("body").hasClass("fixed")) {
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").removeClass("fixed");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").attr("style", "");      
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").removeClass("active");
      }
    });
    $(document).on("mouseup", function(e) {
      if($(".popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").removeClass("fixed");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").attr("style", "");    
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").removeClass("active");
        }
      }
    });

});