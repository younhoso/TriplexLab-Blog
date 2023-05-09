import Swiper from './swiper.min.js';
import Slide from './slide.js';

(function(){
  /** 메인 페이지 type_card 각각의 섹션마다 data-num 추가*/
  var arrListNew = new Array()
  $('.list_category .category_list > li').each(function(idx, el){
    var categoryTit = $(el).find('> a').text().trim();
    arrListNew.push(categoryTit)
  });
  arrListNew.forEach((el, idx) => {
    if(el === arrListNew[0]){
      $('.type_card').eq(0).attr('data-num', idx)
    } else if(el === arrListNew[1]){
      $('.type_card').eq(1).attr('data-num', idx)
    } else if(el === arrListNew[5]){
      $('.type_card').eq(2).attr('data-num', idx)
    }
  });
  
  /** // 메인 페이지 type_card 각각의 섹션마다 data-num 추가*/
  /* 메인 페이지 Slide 각각의 섹션마다 고유한 id값 부여 */
  const arr_card = Array.from($('.type_card'));

  arr_card.reduce(function(acc,cur,idx){
    $(cur).addClass('id-'+idx);
  },0);
  
  const arr_notice = Array.from($('.type_notice'));
  arr_notice.reduce(function(acc,cur,idx){
    $(cur).addClass('id-'+idx);
  },0);
  
  const arr_post = Array.from($('.type_post'));
  arr_post.reduce(function(acc,cur,idx){
    $(cur).addClass('id-'+idx);
  },0);
  /* // 메인 페이지 Slide 각각의 섹션마다 고유한 id값 부여 */

/** 메인 페이지 Slide 기능 Card영역 */
new Slide({
  targets: {
    startEl: '.type_card',
    endEl: '.item_card',
  },
  navigation: {
    nextEl: ".typeCard_next",
    prevEl: ".typeCard_prev",
  },
  additems: 5, //움직일 아이템 개수를 정의합니다.
})

/** 메인 페이지 Slide 기능 Notice영역 */
new Slide({
  targets: {
    startEl: '.type_notice',
    endEl: '.item_notice',
  },
  navigation: {
    nextEl: ".typeNotice_next",
    prevEl: ".typeNotice_prev",
  },
  additems: 1, //움직일 아이템 개수를 정의합니다.
})

/** 메인 페이지 Slide 기능 Post영역 */
new Slide({
  targets: {
    startEl: '.type_post',
    endEl: '.item_post',
  },
  navigation: {
    nextEl: ".typePost_next",
    prevEl: ".typePost_prev",
  },
  additems: 5, //움직일 아이템 개수를 정의합니다.
});


  const windowWidth = window.screen.width;

   /* 매인 배너 영역 Swiper기능 */
  var slider_control = function() {
    const interleaveOffset = 0.5;
    const slide_data = $('.slide_zone').data('slide');
      const swiperOptions = {
        loop: false,
        
        watchSlidesProgress: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
          clickable: true,
        },
        speed: 500,
        // autoplay: {
        //   delay: 3600,
        //   disableOnInteraction: false,
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
            progress: function() {
              const swiper = this;
              swiper.slides.reduce(function(acc,cur,idx){
                const slideProgress = swiper.slides[idx].progress;
                const innerOffset = swiper.width * interleaveOffset;
                const innerTranslate = slideProgress * innerOffset;

                swiper.slides[idx].querySelector('.link_slide').style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
                swiper.slides[idx].querySelector('.link_slide').style.backgroundColor = slide_data.color[idx].bg;
               
                if(windowWidth <= 1025) { //모바일 해상도일때 경우
                  swiper.slides[idx].querySelector('.link_slide .bg_gradient').style.background = `rgb(${slide_data.color[idx].gradient})`;
                  swiper.slides[idx].querySelector('.link_slide .bg_gradient').style.background = `linear-gradient(180deg, rgba(${slide_data.color[idx].gradient},1) 0%, rgba(${slide_data.color[idx].gradient},1) 46%, rgba(${slide_data.color[idx].gradient},0) 100%)`;
                } else { //PC 해상도일때 경우
                  swiper.slides[idx].querySelector('.link_slide .bg_gradient').style.background = `rgb(${slide_data.color[idx].gradient})`;
                  swiper.slides[idx].querySelector('.link_slide .bg_gradient').style.background = `linear-gradient(90deg, rgba(${slide_data.color[idx].gradient},1) 0%, rgba(${slide_data.color[idx].gradient},1) 50%, rgba(${slide_data.color[idx].gradient},0) 100%)`;
                }

                swiper.slides[idx].querySelector('.link_slide .text_slide').style.color = slide_data.color[idx].text
              },0); 
            },
            setTransition: function(_, speed) {
              const swiper = this;
              for (let i = 0; i < swiper.slides.length; i++) {
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

      new Swiper('.swiper-container', swiperOptions);
  };
  /* 매인 배너 영역 Swiper기능 // */

  slider_control();
})();