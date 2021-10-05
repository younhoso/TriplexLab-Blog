$(function() {
  var menuIcons = ['ic-html', 'ic-js', 'ic-uiux' ,'ic-etc'];
  
  $('.category_list > li a').each(function(idx, el){
    $(el).prepend(`<i class="${menuIcons[idx]}"></i>`);
  });
  $('.share_js').on('click', function(){
    $('.share_temp').addClass('on');
    setTimeout(function(){
      $('.share_temp').removeClass('on');
    },2000);
    var input = $('.detail_side input');
    
    input.val(window.location.href);
    input.select();

     /* 텍스트 필드 안의 텍스트 복사 */
    navigator.clipboard.writeText(input.val());
  });
  $('.txt_state').on('click', function(){
    $('.thankyou').addClass('on');
    $('.cancel').addClass('on');
    setTimeout(function(){
      $('.thankyou').removeClass('on');
      $('.cancel').removeClass('on');
    },2000);
    var input = $('.detail_side input');
    
    input.val(window.location.href);
    input.select();

     /* 텍스트 필드 안의 텍스트 복사 */
    navigator.clipboard.writeText(input.val());
  });

  $('.comment').on('click', function(){
    $('html, body').animate({
      scrollTop: $(document).height()
    }, 500);
    $('#comment').focus();
    return false;
  });
  var arr_card = Array.from($('.type_card'));
  arr_card.reduce(function(acc,cur,idx){
    $(cur).addClass('id-'+idx);
  },0);
  var arr_notice = Array.from($('.type_notice'));
  arr_notice.reduce(function(acc,cur,idx){
    $(cur).addClass('id-'+idx);
  },0);
  
  display_control();
  slider_control();
  detail_side();
  slide();

  $('.tab_btn').on('click', function(){
    $('.tab_item').siblings().removeClass('active');
    var dataTab = $(this).data('tabs');
    $(this).addClass('on').siblings().removeClass('on');
    $('.visitant').hasClass("on") && ($('.line_inner i:first-child').attr('class', dataTab), $('.tab_item').eq(0).addClass('active'));
    $('.story').hasClass("on") && ($('.line_inner i:first-child').attr('class', dataTab), $('.tab_item').eq(1).addClass('active'));
    return false;
  });

  $('input.inp_search').on('focus', function() {
    $(this).addClass('active');
  });

  $('.header_icon_inner').on('click', function(e) {
    $(e.target).hasClass('ic-search') && ( $('.area_popup').fadeIn(), $('body').css('overflow', 'hidden') );
  });
  $('.btn_close').on('click', function () {
    $('.area_popup').fadeOut();
    $('body').css('overflow', '');
  });

  /* notice 페이지 리로드시점 */    
  var cookiedata = document.cookie;
  if(cookiedata.indexOf('bell=Y') < 0){
    $('.notice_js').addClass('on');
  } else {
    $('.notice_js').removeClass('on');
  }
   /* // notice 페이지 리로드시점 */

  $('.tab_itme').on('click', function(e) {
    $(e.currentTarget).siblings('.tab_itme').removeClass('on');
    $('.box_gnb').siblings().removeClass('on');
    $(e.currentTarget).addClass('on');

    $('.light').hasClass("on") && ($('.tabs_itmes li:first-child').attr('class', 'LIGHT'), $('.box_gnb').eq(0).addClass('on'));
    $('.dark').hasClass("on") && ($('.tabs_itmes li:first-child').attr('class', 'DARK'), $('.box_gnb').eq(1).addClass('on'));
    return false;
  });

  /** darkMode 여부 체크 */
  var darkModeN = function() {
    var darkmode = false;
    if(typeof(Storage) !== 'undefined'){localStorage.setItem('darkMode', JSON.stringify(darkmode));}
    $('html').attr('data-dark', JSON.parse(localStorage.getItem('darkMode')));
  };
  var darkModeY = function() {
    var darkmode = true;
    if(typeof(Storage) !== 'undefined'){localStorage.setItem('darkMode', JSON.stringify(darkmode));}
    $('html').attr('data-dark', JSON.parse(localStorage.getItem('darkMode')));
  };

  $('.tab_itme').on('click', function() {
    /** // 클릭이벤트 시점에서의 darkMode 여부 체크(최초 렌더링 시점과의 반대) */
    $('.light').hasClass('on') ? darkModeN() : darkModeY()
  });

  /** darkMode 여부 체크 (최초 렌더링 시점)*/
  JSON.parse(localStorage.getItem('darkMode')) ? (darkModeY(), $('.dark').addClass('on'), $('.tabs_itmes li:first-child').attr('class', 'DARK')) : (darkModeN(), $('.light').removeClass('on'), $('.tabs_itmes li:first-child').attr('class', 'LIGHT'))
  /** // darkMode 여부 체크  */

  function sidebarMenuSet(idx){
    if(typeof(Storage) !== 'undefined'){sessionStorage.setItem('menuIdx', JSON.stringify(idx))}
  };

  var _self = $('.list_category .category_list > li').eq(JSON.parse(sessionStorage.getItem('menuIdx')));
  function sidebarMenuGet(){
    $('.tt_category > li').attr('data-menu', JSON.parse(sessionStorage.getItem('menu')));
    _self.addClass('active').siblings('li').removeClass('active');
  };
  
  $('.category_list > li > a').on('click', function(e){
    var idx = $('.category_list > li > a').index(this);
    sidebarMenuSet(idx);
  });

  /** menu 여부 체크 (최초 렌더링 시점) */
  JSON.parse(sessionStorage.getItem('menu')) && sidebarMenuGet();

  var $location = $(location),
      pathname = $location.attr('pathname'),
      parts = pathname.split('/');

  if(parts[1] === 'category'){
    _self.addClass('active');
  } else {
    _self.removeClass('active');
  };

  var windowWidth = $( window ).width();
  function setScreenSize() {
    var vw = 0;
    var vh = window.innerHeight * 0.01;
    windowWidth <= 1025 ? vw = (window.innerWidth - 40) * 0.01 : vw = ($('.area_sidebar').width() - 40) * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  }
  setScreenSize();
  window.addEventListener('resize', setScreenSize);

  Array.from((document.querySelectorAll('#container .inner_header span.date'))).forEach(function(el) {
    el.innerText = el.innerText.substr(0, 11);
  })

  $('.mo_footer_menu').on('click', 'a', function() {
    $('.area_sidebar').addClass('on');
    $('body').css('overflow', 'hidden');
  });

  $('.close_icon').on('click', function(e) {
    $('.area_sidebar').removeClass('on');
    $('body').css('overflow', '');
  });
  
  /* 서식 관리 tabs */
  var tabs_warp = Array.from(document.querySelectorAll('.tabs_warp'));
  tabs_warp.forEach(function(el, idx){
    el.dataset.tabs = idx+1
    if(idx+1 === parseInt(el.dataset.tabs)){
      $('.tabs_inner').eq(idx).addClass(`tabs_${idx+1}`);
    }

    $(`.tabs_${idx+1}`).on('click', function(e){
      e.preventDefault();
      var attr = $(e.target).attr('href');
      var txt = $(e.target).html();
      $(attr).show().siblings().hide();
      e.target !== this ? ($(e.target).addClass('on').siblings().removeClass('on'), $(`.tabs_inner.tabs_${idx+1} > span`).attr('class', txt)) : null
    });
  });
  
  /* code Copy */
  $('.article_view pre').prepend('<button class="code_btn" data-txt="Copy"><i class="ic-copy"></i></button>');
  $('.code_btn').on('click', function(){
    var hljsTxt = $(this).next('.hljs').text();
    navigator.clipboard.writeText(hljsTxt);/* 텍스트 필드 안의 텍스트 복사 */
    $(this).attr('data-txt', 'Copied !')
  });
  /* // code Copy */
  /* // 서식 관리 tabs */
  
  /* 공지 사항 */
  $('.notice_js').on('click', function() {
    setCookie('bell', 'Y', 5);
    $(this).removeClass('on');
    $('.notice_template').addClass('on');
    var frag = document.getElementsByTagName('template')[0];
    var copy = frag.content.cloneNode(true);
    $('.notice_template .contents').html(copy);
  });

  $('.closeIcon').on('click', function() {
    $('.notice_template').removeClass('on');
  });

  $(window).on('scroll', function() {
    !$('.notice_template').hasClass('on') ? null : $('.notice_template').removeClass('on')
  });
  /* // 공지 사항 */
});


function setCookie(name, value, day) {
var date = new Date(); 
date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000); 
document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/'; 
};

function getCookie(name) { 
var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)'); 
return value? value[2] : null; 
};

function slider_control() {
  var interleaveOffset = 0.5;
  var slide_data = $('.slide_zone').data('slide');
  var windowWidth = $( window ).width();
  
  /* 매인 배너 영역 Swiper기능 */
  (function(){
    var swiperOptions = {
      loop: false,
      watchSlidesProgress: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
        clickable: true,
      },
      speed: 500,
      // autoplay: {
      //   delay: 4600,
      //   disableOnInteraction: false,
      // },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      on: {
          init: function () {
            $(".swiper-progress-bar").removeClass("animate");
            $(".swiper-progress-bar").removeClass("active");
            $(".swiper-progress-bar").eq(0).addClass("animate");
            $(".swiper-progress-bar").eq(0).addClass("active");
          },
          slideChangeTransitionStart: function (el) {
            $(".swiper-progress-bar").removeClass("animate");
            $(".swiper-progress-bar").removeClass("active");
            $(".swiper-progress-bar").eq(0).addClass("active");
          },
          slideChangeTransitionEnd: function () {
            $(".swiper-progress-bar").eq(0).addClass("animate");
          },
          progress: function() {
            var swiper = this;
            swiper.slides.reduce(function(acc,cur,idx){
              var slideProgress = swiper.slides[idx].progress;
              var innerOffset = swiper.width * interleaveOffset;
              var innerTranslate = slideProgress * innerOffset;
              $('.swiper-progress-bar').css({"background": `rgba(${slide_data.color[idx].text},0.3)`});
              $('.swiper-progress-bar .slide_progress-bar::after').css({"background": `rgb(${slide_data.color[idx].text})`});
              
              $(swiper.slides[idx]).find('.link_slide').css({
                "transform":"translate3d(" + innerTranslate + "px, 0, 0)",
                "background-color": slide_data.color[idx].bg
              });
              if(windowWidth <= 1025) { //모바일 해상도일때 경우
                $(swiper.slides[idx]).find('.link_slide .bg_gradient').css({
                  "background": `rgb(${slide_data.color[idx].gradient})`,
                  "background": `linear-gradient(180deg, rgba(${slide_data.color[idx].gradient},1) 0%, rgba(${slide_data.color[idx].gradient},1) 46%, rgba(${slide_data.color[idx].gradient},0) 100%)`,
                });
              } else { //PC 해상도일때 경우
                $(swiper.slides[idx]).find('.link_slide .bg_gradient').css({
                  "background": `rgb(${slide_data.color[idx].gradient})`,
                  "background": `linear-gradient(90deg, rgba(${slide_data.color[idx].gradient},1) 0%, rgba(${slide_data.color[idx].gradient},1) 50%, rgba(${slide_data.color[idx].gradient},0) 100%)`,
                });
              }
              $(swiper.slides[idx]).find('.link_slide .text_slide').css({
                "color": slide_data.color[idx].text
              });
            },0); 
          },
          setTransition: function(_, speed) {
            var swiper = this;
            for (var i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = speed + "ms";
              swiper.slides[i].querySelector(".link_slide").style.transition = speed + "ms";
            }
          }
        }
    };

    if(windowWidth <= 1025){  //모바일 해상도일때 경우
      swiperOptions.simulateTouch = true
    } else {  //PC 해상도일때 경우
      swiperOptions.simulateTouch = true
    }

    var myswiper = new Swiper('.swiper-container', swiperOptions);
    
    $(".swiper-button-pause").click(function(){
      myswiper.autoplay.stop();
    });
    $(".swiper-button-play").click(function(){
      myswiper.autoplay.start();
    });
    $(".swiper-playpau").click(function(e){
      $(e.currentTarget).removeClass('on').siblings().addClass('on');
    });
  })();
  /* 매인 배너 영역 Swiper기능 // */
};

function display_control() {
// 검색어 삭제
$('.btn_search_del').click(function() {
  $('.inp_search').val('');
});

// 박스 헤더
if ($('#main .area_cover').children(':first-child').hasClass('type_featured')) {
  $('#wrap').addClass('white');
} else if ($('#main .area_cover').length > 0) {
  $('#main .area_cover').addClass('cover_margin');
}

// 글 출력이 있는 경우
if ($('.area_view').length != false) {
  if($('#main > .area_cover:first-child > .type_featured:first-child, .type_article_header_cover').length) { $('#wrap').addClass('white');}
}

// 로그인, 로그아웃 버튼 처리
if (window.T.config.USER.name) {
  $('.btn-for-user').show();
} else {
  $('.btn-for-guest').show();
}

$('.btn-for-guest [data-action="login"]').click(function() {
  document.location.href = 'https://www.tistory.com/auth/login?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
});
$('.btn-for-user [data-action="logout"]').click(function() {
  document.location.href = 'https://www.tistory.com/auth/logout?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
});
};

function detail_side(){
$('.btn_post').attr('id','reaction'); //Node 대상 찾기 위해서 이미로 id 넣어줌.
/* 공감 아이콘 클릭 이벤트 처리 */
if ($('.postbtn_like .uoc-icon').hasClass('btn_post')) {
  /* 공감 수 변경 시 처리 */
  var targetNode = document.getElementById('reaction'); // 감시할 대상 Node
  var config = { attributes: true, childList: true, subtree: true }; // 감시자 설정
  function callback(mutationsList) {  
    var txt_like = mutationsList[0].target.querySelector('.txt_like').textContent;
    if(mutationsList[0].type === 'attributes') {
      $('.detail_side .util_like .txt_count').text(txt_like);
    } else {
      console.log(txt_like)
    }
    mutationsList[0].target.classList.contains('like_on') ? $('.item1 i').attr('class', 'ic-like-bg') : $('.item1 i').attr('class', 'ic-like'); //새로시점에 변경 유지
  };
  // 공감 클릭 이벤트 연결
  $('.detail_side .util_like').click(function (e) {
    $('.postbtn_like .uoc-icon').trigger('click');
    !$('.postbtn_like .uoc-icon').hasClass('like_on') ? $('.item1 i').attr('class', 'ic-like-bg') : $('.item1 i').attr('class', 'ic-like'); //클릭 이벤트 시점에 변경
  });

  // var sideUl = document.querySelector('.detail_side ul');
  // sideUl.addEventListener('click', function(e){
  //   e.target.classList.contains('bg_them_mode') ? e.target.classList.add('on') : null
  //   e.target.getElementsByTagName('i') ? e.target.closest('.bg_them_mode').classList.add('on') : null
  // });
  
  // 감시자 인스턴스 생성
  var observer = new MutationObserver(callback);
  // 감시할 대상 Node를 전달하여 감시 시작
  observer.observe(targetNode, config);
  /* 공감 수 변경 시 처리 // */
  setTimeout(function(){
    $('.detail_side .util_like .txt_count').text($('.postbtn_like .uoc-icon .txt_like').text());
  },450);
}
/* 공감 아이콘 클릭 이벤트 처리 */
};

/** 매인 페이지 각 색션마다 슬라이드 기능 구현 */
function slide() {
  function moveSlideCard(num, idx){
    var slideCount = $(`.type_card.id-${idx} .item_card`).length - 5;
    var firstCard = $(`.type_card.id-${idx} .item_card`).first();
    var lastCard = $(`.type_card.id-${idx} .item_card`).last();

    num >= slideCount && (firstCard.removeClass('on'), lastCard.addClass('on')) // 현재item의 마지막 요소 채크
    num < slideCount && (lastCard.removeClass('on')) // 현재item의 마지막 요소가 아닌것 채크
    num > 0 && firstCard.removeClass('on'); // 현재item의 첫번째 요소보다 큰것 채크
    num === 0 && (firstCard.addClass('on'), lastCard.removeClass('on')) // 현재item의 첫번째 요소랑 같은것 채크

    firstCard.hasClass('on') ? $(`.type_card.id-${idx} .typeCard_prev`).addClass('disabled') : $(`.type_card.id-${idx} .typeCard_prev`).removeClass('disabled')
    lastCard.hasClass('on') ? $(`.type_card.id-${idx} .typeCard_next`).addClass('disabled') : $(`.type_card.id-${idx} .typeCard_next`).removeClass('disabled')

    var slideNum = -num * $('.item_card').innerWidth();  //slideNum은 활성화된 아이템 자기자신을 저장해놓는다.
    gsap.to(`.type_card.id-${idx} .list_type_card`, 1, {x: slideNum, ease: Power4.easeOut });
  };

  function moveSlideNotice(num, idx) {
    var slideCount = ($(`.type_notice.id-${idx} .item_notice`).length / 4) - 3;
    var firstCard = $(`.type_notice.id-${idx} .item_notice`).first();
    var lastCard = $(`.type_notice.id-${idx} .item_notice`).last();

    num >= slideCount && (firstCard.removeClass('on'), lastCard.addClass('on')) // 현재item의 마지막 요소 채크
    num < slideCount && (lastCard.removeClass('on')) // 현재item의 마지막 요소가 아닌것 채크
    num > 0 && firstCard.removeClass('on'); // 현재item의 첫번째 요소보다 큰것 채크
    num === 0 && (firstCard.addClass('on'), lastCard.removeClass('on')) // 현재item의 첫번째 요소랑 같은것 채크

    firstCard.hasClass('on') ? $(`.type_notice.id-${idx} .typeNotice_prev`).addClass('disabled') : $(`.type_notice.id-${idx} .typeNotice_prev`).removeClass('disabled')
    lastCard.hasClass('on') ? $(`.type_notice.id-${idx} .typeNotice_next`).addClass('disabled') : $(`.type_notice.id-${idx} .typeNotice_next`).removeClass('disabled')

    var slideNum = -num * $('.item_notice').innerWidth(); //slideNum은 활성화된 아이템 자기자신을 저장해놓는다.
    gsap.to(`.type_notice.id-${idx} .list_type_notice`, 1, {x: slideNum, ease: Power4.easeOut });
  };

  $('.type_card').each(function(idx, _){
    var currentIdx = 0;
    var firstCard = $(`.type_card.id-${idx} .item_card`).first();
    var lastCard = $(`.type_card.id-${idx} .item_card`).last();
    var slideCount = $(`.type_card.id-${idx} .item_card`).length;

    currentIdx === 0 && (firstCard.addClass('on'),lastCard.removeClass('on'));
    firstCard.hasClass('on') && $('.typeCard_prev').addClass('disabled')

    $(`.type_card.id-${idx} .typeCard_next`).on('click', function(){
      if(currentIdx < slideCount - 5) {
        moveSlideCard(currentIdx += 5, idx);
      }
    });

    $(`.type_card.id-${idx} .typeCard_prev`).on('click', function(){
      if(currentIdx > 0) {
        moveSlideCard(currentIdx -= 5, idx);
      }
    });
  }); 

  $('.type_notice').each(function(idx, _){
    var currentIdx = 0;
    var firstCard = $(`.type_notice.id-${idx} .item_notice`).first();
    var lastCard = $(`.type_notice.id-${idx} .item_notice`).last();
    var slideCount = $(`.type_notice.id-${idx} .item_notice`).length / 4;

    currentIdx === 0 && (firstCard.addClass('on'),lastCard.removeClass('on'));
    firstCard.hasClass('on') && $('.typeNotice_prev').addClass('disabled')

    $(`.type_notice.id-${idx} .typeNotice_next`).on('click', function(){
      if(currentIdx < slideCount - 3) {
        moveSlideNotice(currentIdx += 1, idx);
      }
    });

    $(`.type_notice.id-${idx} .typeNotice_prev`).on('click', function(){
      if(currentIdx > 0) {
        moveSlideNotice(currentIdx -= 1, idx);
      }
    });
  });
};
/** // 매인 페이지 각 색션마다 슬라이드 기능 구현 */