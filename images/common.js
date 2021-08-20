$(function() {
    var arr_card = Array.from($('.type_card'));
    arr_card.reduce(function(acc,cur,idx){
      $(cur).addClass('id-'+idx);
      $(cur).find('.arrow_inner').addClass('id-'+idx);
      $(cur).find('.pagination_type_card').addClass('id-'+idx);
    },0);

    display_control();
    slider_control();
    api_category();
    var tab_itme_wd = $('.tabs_itmes').width();

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

    window.location.pathname.split('/')[1] === 'pages' && (
      $('.tab_itme.api').addClass('on'),
      $('.box_gnb.api').addClass('on'),
      $('.tab_itme.blog').removeClass('on'),
      $('.box_gnb.blog').removeClass('on'),
      $('.ani_on').stop().animate({left: (tab_itme_wd * 0.56)}, 150),
      $('#tt-body-page').addClass('api_detail')
    );

    $('.tab_itme').on('click', function(e) {
      e.preventDefault();
      $(e.target).siblings('.tab_itme').removeClass('on');
      $('.box_gnb').siblings().removeClass('on');
      $(e.target).addClass('on');

      $('.api').hasClass("on") && ($('.ani_on').stop().animate({left: (tab_itme_wd * 0.56)}, 150), $('.box_gnb').eq(1).addClass('on'));
      $('.blog').hasClass("on") && ($('.ani_on').stop().animate({left: (tab_itme_wd * 0.06)}, 150), $('.box_gnb').eq(0).addClass('on'));
      return false;
    });

    Array.from((document.querySelectorAll('#container .inner_header span.date'))).forEach(function(el) {
      el.innerText = el.innerText.substr(0, 11);
    })

    var modulesTemplate = function(data) {
      var template = '';
      template += '<ul class="items">';
      $.each(data, function(idx, item){  
        template += '<li class="item">'
        template += '<a href='+item.link+'>'+ item.txt +'</a>'
        template += '</li>';
      });
      template += '</ul>';
      return template;
    };

    var arrayText = $('.sub_category_list li').map(function(){
      return $.trim($(this).text());
    }).get();
    var arrayAttr = $('.sub_category_list li').map(function(){
      return $.trim($(this).find('a').attr('href'));
    }).get();

    var jsonArray = new Array();
    arrayText.forEach((el, idx) => {
      var jsonObj = new Object();
      jsonObj.id = (idx+1);
      jsonObj.txt = el;
      jsonObj.link = arrayAttr[idx];
      jsonArray.push(jsonObj)
    });

    var newPath = window.location.pathname
    if( newPath === '/category/Modules'){
      $('#tt-body-category').addClass('modules')

      // $('#main').html(modulesTemplate(jsonArray));
    } else if(newPath === '/category/Modules/Get%20Started') {
      $('.sub_category_list li').eq(0).addClass('active');
    } else if(newPath === '/category/Modules/Accordions') {
      $('.sub_category_list li').eq(1).addClass('active');
    } else if(newPath === '/category/Modules/MoreViews') {
      $('.sub_category_list li').eq(2).addClass('active');
    }
    
    $('.link_tit').html('ALL');

    $('.category_list').on('click', function(e) {
      $(e.target).addClass('active');
    });

    $('.mo_footer_menu').on('click', 'a', function() {
      $('.area_sidebar').addClass('on');
      $('#container').addClass('on');
      $('body').css('overflow', 'hidden');
    });

    $('.close_icon').on('click', function(e) {
      $('.area_sidebar').removeClass('on');
      $('#container').removeClass('on');
      $('body').css('overflow', '');
    });

    $('#container').on('click', function(e) {
      if($(this).hasClass('on')){
        e.currentTarget === e.target ? ($('.area_sidebar').removeClass('on'), $('#container').removeClass('on')) : null
      }
    });
});

function setCookie(name, value, day) {
  const date = new Date(); 
  date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000); 
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/'; 
};

function getCookie(name) { 
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)'); 
  return value? value[2] : null; 
};

function api_category() {
  var pars = {
    'accessToken' : getCookie('triplexlab_token'),
    'outputType' : 'json',
    'blogName' : 'https://triplexlab-api.tistory.com/'
  }
  $.ajax({
    type:'GET',
    url: 'https://www.tistory.com/apis/category/list?access_token='+pars.accessToken+'&output='+pars.outputType+'&blogName='+pars.blogName+''
  }).done(function(data) {
    console.log(data)
  });
};

function slider_control() {
    var interleaveOffset = 0.5;
    var slide_data = $('.slide_zone').data('slide');
    var windowWidth = $( window ).width();
    
    function swiperCommonOptions() {
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

              $('.slide_item.swiper-slide-next').find('.text').css('transform', 'translateX(100px)');
              $('.slide_item.swiper-slide-next').find('.text_slide strong').css('transform', 'translateX(100px)');
            },
            slideChangeTransitionStart: function (el) {
              var indx = el.activeIndex - el.previousIndex;

              $(".swiper-progress-bar").removeClass("animate");
              $(".swiper-progress-bar").removeClass("active");
              $(".swiper-progress-bar").eq(0).addClass("active");

              $('.slide_item').eq(el.activeIndex).find('.text').css('transform', 'translateX(0)');
              $('.slide_item').eq(el.activeIndex).find('.text_slide strong').css('transform', 'translateX(0)');
            },
            slideChangeTransitionEnd: function () {
              $(".swiper-progress-bar").eq(0).addClass("animate");

              $('.slide_item.swiper-slide-prev').find('.text').css('transform', 'translateX(-100px)');
              $('.slide_item.swiper-slide-prev').find('.text_slide strong').css('transform', 'translateX(-100px)');

              $('.slide_item.swiper-slide-next').find('.text').css('transform', 'translateX(100px)');
              $('.slide_item.swiper-slide-next').find('.text_slide strong').css('transform', 'translateX(100px)');
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
    };

    if(windowWidth <= 1025) { //모바일 해상도일때 경우
      swiperCommonOptions();
    } else {  //PC 해상도일때 경우
      swiperCommonOptions();
    }

    var swiperCardOptions = {
      slidesPerView: 'auto',
      scrollbar: {
        el: '.scrollbar_type_card'
      },
    }
    new Swiper('.type_card.id-0 .swiper_type_card', swiperCardOptions);
    new Swiper('.type_card.id-1 .swiper_type_card', swiperCardOptions);
    new Swiper('.type_card.id-2 .swiper_type_card', swiperCardOptions);
};

  function display_control() {
    var $location = $(location),
        pathname = $location.attr('pathname'),
        href = $location.attr('href'),
        parts = pathname.split('/');

      $.ajax({
        type: 'get', dataType: "json", url: 'https://tistory3.daumcdn.net/tistory/4741094/skin/images/data.json',
      }).done(function(data) {
        var localStorage_datafill = {
          APIMenus : data.APIMenus,
          APITab : data.APITab,
          searchItems : data.searchItems,
        }
        setCookie('triplexlab_token', data.triplexlab_token, 1);

        if(typeof(Storage) !== 'undefined'){
          localStorage.setItem('data', JSON.stringify(localStorage_datafill))
        }
        var localdata = localStorage.getItem('data');
        var searchItem = JSON.parse(localdata).searchItems;
        var apiMenus = JSON.parse(localdata).APIMenus;

        var randomPopularity = searchItem.popularity.sort(() => Math.random() - 0.5);         //배열 요소에는 인기 검색어들을 랜덤으로 추출하여 배열에 담씁니다.
        var randomRecommendation = searchItem.recommendation.sort(() => Math.random() - 0.5); //배열 요소에는 추천 검색어들을 랜덤으로 추출하여 배열에 담씁니다.

        /**  // 추천 검색어 */
        var template_recommendation = '';
        template_recommendation += '<ul class="list_sidebar">';
        randomRecommendation.reduce(function(acc, cur){
          template_recommendation += '<li class="item_sidebar"><a href="/search/'+cur.name+'">'+cur.name+'</a></li>';
        },0);
        template_recommendation += '</ul>';
        /**  추천 검색어 // */
        /**  // 인기 검색어 */
        var template_popularity = '';
        template_popularity += '<ul class="list_sidebar">';
        randomPopularity.reduce(function(acc, cur){
          template_popularity += '<li class="item_sidebar"><a href="/search/'+cur.name+'">'+cur.name+'</a></li>';
        },0);
        template_popularity += '</ul>';
        /** 인기 검색어 // */
        
        /** // api Menus  */
        var template_apiMenus = '';
        template_apiMenus += '<ul class="api_inner">';
        apiMenus.leftsidebar.reduce(function(acc, cur){
          var apiMenusKey = Object.keys(cur)[0];
          template_apiMenus += '<h3>'+apiMenusKey+'</h3>';
          for ( const property in cur ) {
            cur[property].reduce(function(acc, cur){
              template_apiMenus += '<li class="api_items"><a href="/pages/'+cur.link+'">'+cur.name+'</a></li>';
            },0)
          }
        },0);
        template_apiMenus += '</ul>';
        /** api Menus // */

        $('.box_gnb.api').append(template_apiMenus);
        $('.tag_recomme').append(template_recommendation);
        $('.tag_popularity').append(template_popularity);
      });

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