$(function() {
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

    $('.comment').on('click', function(){
      gsap.to("html, body",{scrollTop: $(document).height(), duration: 0.5});
      $('#comment').focus();
    });
    var arr_card = Array.from($('.type_card'));
    arr_card.reduce(function(acc,cur,idx){
      $(cur).addClass('id-'+idx);
    },0);
    var arr_notice = Array.from($('.type_notice'));
    arr_notice.reduce(function(acc,cur,idx){
      $(cur).addClass('id-'+idx);
    },0);
    
    detail_side();
    display_control();
    slider_control();
    api_postItem();

    $('.tab_btn').on('click', function(){
      $('.tab_item').siblings().removeClass('active');
      
      $(this).each(function(idx, el){
        var tab_btn_wd = $(el).width();
        var tab_btn_wdPrev = $(this).prev().innerWidth();
        var paddL = parseInt($(this).css('padding-left'));

        var gsapAmi1 = { width: tab_btn_wd, x: 20, duration: 0.35};
        var gsapAmi2 = { width: tab_btn_wd, x: tab_btn_wdPrev + paddL + 6, duration: 0.35};

        $(el).addClass('on').siblings().removeClass('on');
        $('.visitant').hasClass("on") && (gsap.to(".line", gsapAmi1), $('.tab_item').eq(0).addClass('active'));
        $('.story').hasClass("on") && (gsap.to(".line", gsapAmi2), $('.tab_item').eq(1).addClass('active'))
      });
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

    var tab_itme_wd = $('.tabs_itmes').width();
    // entry 페이지 리로드시점 
    window.location.pathname.split('/')[1] === 'entry' && (
      $('.tab_itme.api').addClass('on'),
      $('.box_gnb.api').addClass('on'),
      $('.tab_itme.blog').removeClass('on'),
      $('.box_gnb.blog').removeClass('on'),
      gsap.to(".ani_on", {x: (tab_itme_wd * 0.5), duration: 0.15}),
      $('#tt-body-page').addClass('api_detail')
    );

    /* notice 페이지 리로드시점 */    
    var cookiedata = document.cookie;
    if(cookiedata.indexOf('bell=Y') < 0){
      $('.notice_js').addClass('on');
    } else {
      $('.notice_js').removeClass('on');
    }
     /* // notice 페이지 리로드시점 */

    $('.tab_itme').on('click', function(e) {
      $(e.target).siblings('.tab_itme').removeClass('on');
      $('.box_gnb').siblings().removeClass('on');
      $(e.target).addClass('on');

      $('.api').hasClass("on") && (gsap.to(".ani_on", {x: (tab_itme_wd * 0.5), duration: 0.15}),  $('.box_gnb').eq(1).addClass('on'),  $('.skin_link, .box_tool').addClass('fiex'));
      $('.blog').hasClass("on") && (gsap.to(".ani_on", {x: (tab_itme_wd * 0.01), duration: 0.15}),  $('.box_gnb').eq(0).addClass('on'), $('.skin_link, .box_tool').removeClass('fiex'));
      
      return false;
    });

    function setScreenSize() {
      let vh = window.innerHeight * 0.01;
      document.querySelector('.area_sidebar').style.setProperty('--vh', `${vh}px`);
    }
    setScreenSize();

    Array.from((document.querySelectorAll('#container .inner_header span.date'))).forEach(function(el) {
      el.innerText = el.innerText.substr(0, 11);
    })

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
    $('.code_inner pre').prepend('<button class="code_btn" data-txt="Copy"><i class="ic-copy"></i></button>');
    $('.code_btn').on('click', function(){
      var hljsTxt = $(this).next('.hljs').text();
      navigator.clipboard.writeText(hljsTxt);/* 텍스트 필드 안의 텍스트 복사 */
      $(this).attr('data-txt', 'Copied !')
    });
    /* // code Copy */
    /* // 서식 관리 tabs */
    
    /* 공지 사항 */
    $('.notice_js').on('click', function() {
      setCookie('bell', 'Y', 7);
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

function api_postItem() {
    var postReadtUrl = 'https://www.tistory.com/apis/post/read?';
    var pars = {
      'accessToken' : getCookie('triplexlab_token'),
      'outputType' : 'json',
      'blogName' : 'triplexlab-api',
    }

    var imgUrl= $('.inner_header').data('image');
    var path = window.location.pathname;
    var parsRead2 = {
      ...pars,
      'postId': path.substr(1),
    }

    var {accessToken, outputType, blogName, postId} = parsRead2;

    $.ajax({
      type:'GET',
      url: postReadtUrl+'access_token='+accessToken+'&output='+outputType+'&blogName='+blogName+'&postId='+postId
    }).done(function(res) {
      var {item} = res.tistory;

      var tags = new Array();
      item['tags']?.tag ? item['tags'].tag.forEach(function(_, i){tags.push(`#${item['tags'].tag[i]}`);}) : tags.push(`#TriplexLab, #${item['title']}`);

      var datas = {
        title: item['title'],
        description: tags.join(),
        imageUrl: imgUrl,
        postUrl: item['postUrl'],
        comments: parseInt(item['comments']),
        content: item['content']
      }
      var {title, description, imageUrl, postUrl, comments} = datas;

      Kakao.Link.createDefaultButton({
        container: '.share_kakao_js',
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: postUrl,
            webUrl: postUrl,
          },
        },
        social: {
          commentCount: comments
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: postUrl,
              webUrl: postUrl,
            },
          }
        ],
      }); /* Kakao.Link // */
    });
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

    /* type_card 배너 영역(3군대) Swiper기능 */
    $('.type_card').each(function(idx, el){
      var swiperCardOptions = {
        slidesPerView: 'auto',
        navigation: {
          nextEl: `.type_card.id-${idx} .typeCard_next`,
          prevEl: `.type_card.id-${idx} .typeCard_prev`,
        },
      };

      if( windowWidth <= 1025) { //모바일 해상도일때 경우
        swiperCardOptions.allowTouchMove = true;
        swiperCardOptions.slidesPerGroup= 1;
      } else {   //PC 해상도일때 경우
        swiperCardOptions.allowTouchMove = false;
        swiperCardOptions.slidesPerGroup= 3;
      }

      new Swiper(`.type_card.id-${idx} .swiper_type_card`, swiperCardOptions);
    });
    /* type_card 배너 영역(3군대) Swiper기능 // */
    
    /* LATEST STORY 배너 영역 Swiper기능 */
    $('.type_notice').each(function(idx, el) {
      console.log(`.type_notice.id-${idx} .typeNotice_next`)
      var swiperTypeNotice = {
        breakpoints:{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          }
        },
        grid: {
          rows: 4
        },
        navigation: {
          nextEl: `.type_notice.id-${idx} .typeNotice_next`,
          prevEl: `.type_notice.id-${idx} .typeNotice_prev`,
        },
      }

      if( windowWidth <= 1025) { //모바일 해상도일때 경우
        swiperTypeNotice.allowTouchMove = true;
        swiperTypeNotice.slidesPerGroup= 1;
      } else {   //PC 해상도일때 경우
        swiperTypeNotice.allowTouchMove = false;
        swiperTypeNotice.slidesPerGroup= 3;
      }

      new Swiper(`.type_notice.id-${idx} .swiper_type_notice`, swiperTypeNotice);
    });
    /* LATEST STORY 배너 영역 Swiper기능 // */
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

      /** 추천 검색어 */
      var template_recommendation = '';
      template_recommendation += '<ul class="list_sidebar">';
      randomRecommendation.reduce(function(acc, cur){
        template_recommendation += '<li class="item_sidebar"><a href="/search/'+cur.name+'">'+cur.name+'</a></li>';
      },0);
      template_recommendation += '</ul>';
      /**  추천 검색어 // */
      /**  인기 검색어 */
      var template_popularity = '';
      template_popularity += '<ul class="list_sidebar">';
      randomPopularity.reduce(function(acc, cur){
        template_popularity += '<li class="item_sidebar"><a href="/search/'+cur.name+'">'+cur.name+'</a></li>';
      },0);
      template_popularity += '</ul>';
      /** 인기 검색어 // */
      
      /** api Menus  */
      var template_apiMenus = '';
      template_apiMenus += '<ul class="api_inner">';
      apiMenus.leftsidebar.reduce(function(acc, cur){
        var apiMenusKey = Object.keys(cur)[0];
        template_apiMenus += '<h3>'+apiMenusKey+'</h3>';
        for ( const property in cur ) {
          cur[property].reduce(function(acc, cur){
            template_apiMenus += '<li class="api_items"><a href="/'+cur.link+'">'+cur.name+'</a></li>';
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

function detail_side(){
  var current = 0;

  function add(el){
    el.classList.add('on');
    current = el;
  }

  function remove(el) {
    el.classList.remove('on');
  }

  function control() {
    if(currentItem){ 
      remove(currentItem)
    }
  }

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
      } 
      mutationsList[0].target.classList.contains('like_on') ? $('.item1 i').attr('class', 'ic-like-bg') : $('.item1 i').attr('class', 'ic-like'); //새로시점에 변경 유지
    };
    // 공감 클릭 이벤트 연결
    $('.detail_side .util_like').click(function (e) {
      $('.postbtn_like .uoc-icon').trigger('click');
      !$('.postbtn_like .uoc-icon').hasClass('like_on') ? $('.item1 i').attr('class', 'ic-like-bg') : $('.item1 i').attr('class', 'ic-like'); //클릭 이벤트 시점에 변경
    });

    var sideUl = document.querySelector('.detail_side ul');
    sideUl.addEventListener('click', function(e){
      e.target.classList.contains('bg_them_mode') ? e.target.classList.add('on') : null
      e.target.getElementsByTagName('i') ? e.target.closest('.bg_them_mode').classList.add('on') : null
    });
    
    // 감시자 인스턴스 생성
    var observer = new MutationObserver(callback);
    // 감시할 대상 Node를 전달하여 감시 시작
    observer.observe(targetNode, config);
  /* 공감 수 변경 시 처리 // */

    $('.detail_side .util_like .txt_count').text($('.postbtn_like .uoc-icon .uoc-count').text());
  }
  /* 공감 아이콘 클릭 이벤트 처리 */
};