export default class Slide {
    /**
     * @type {object}
     * @param {string}
     */
    constructor(el) {
        this.el = el;
        this.inithand();
    };

    moveSlideCard(num, idx) {
        const {additems} = this.el;
        const {startEl, endEl} = this.el.targets;
        const {nextEl, prevEl} = this.el.navigation;
        const el = $(startEl+`.id-${idx} `+endEl);
        let slideCount;

        if(startEl === ".type_notice"){
          slideCount = (el.length / 4) - 3;
        } else if(startEl === ".type_card" || startEl === ".type_post"){
          slideCount = el.length - additems;
        }

        const firstCard = el.first();
        const lastCard = el.last();
    
        num >= slideCount && (firstCard.removeClass('on'), lastCard.addClass('on')) // 현재item의 마지막 요소 채크
        num < slideCount && (lastCard.removeClass('on')) // 현재item의 마지막 요소가 아닌것 채크
        num > 0 && firstCard.removeClass('on'); // 현재item의 첫번째 요소보다 큰것 채크
        num === 0 && (firstCard.addClass('on'), lastCard.removeClass('on')) // 현재item의 첫번째 요소랑 같은것 채크
        
        firstCard.hasClass('on') ? $(startEl+`.id-${idx} `+prevEl).addClass('disabled') : $(startEl+`.id-${idx} `+prevEl).removeClass('disabled')
        lastCard.hasClass('on') ? $(startEl+`.id-${idx} `+nextEl).addClass('disabled') : $(startEl+`.id-${idx} `+nextEl).removeClass('disabled')

        const slideNum = -num * $(endEl).innerWidth();  //slideNum은 활성화된 아이템 자기자신을 저장해놓는다.
        document.querySelector(startEl+`.id-${idx} `+endEl).parentElement.style.transform = `translateX(${slideNum}px)`;
    };

    inithand(){
        const _self = this;
        const {additems} = this.el;
        const {startEl, endEl} = this.el.targets;
        const {nextEl, prevEl} = this.el.navigation;
        
        $(startEl).each(function(idx, elem){
            const el = $(startEl+`.id-${idx} `+endEl);
            const firstCard = $(startEl+`.id-${idx} `+endEl).first();
            const lastCard = $(startEl+`.id-${idx} `+endEl).last();
            let slideCount;
            let currentIdx = 0;
        
            currentIdx === 0 && (firstCard.addClass('on'),lastCard.removeClass('on'));
            firstCard.hasClass('on') && $(prevEl).addClass('disabled')
        
            $(elem).on('click', nextEl, function(){
              if(currentIdx < slideCount - additems) {
                _self.moveSlideCard(currentIdx += additems, idx);
              }
            });
        
            $(elem).on('click', prevEl, function(){
              if(currentIdx > 0) {
                _self.moveSlideCard(currentIdx -= additems, idx);
              }
            });

            if(startEl === ".type_notice"){
              slideCount = $(startEl+`.id-${idx} `+endEl).length;
              slideCount > 12 ? $(startEl+`.id-${idx} `+nextEl).removeClass('disabled') : $(startEl+`.id-${idx} `+nextEl).addClass('disabled');
            } else if(startEl === ".type_card"){
              slideCount = $(startEl+`.id-${idx} `+endEl).length;
              slideCount > 5 ? $(startEl+`.id-${idx} `+nextEl).removeClass('disabled') : $(startEl+`.id-${idx} `+nextEl).addClass('disabled');
            } else if(startEl === ".type_post"){
              slideCount = $(startEl+`.id-${idx} `+endEl).length;
              slideCount > 5 ? $(startEl+`.id-${idx} `+nextEl).removeClass('disabled') : $(startEl+`.id-${idx} `+nextEl).addClass('disabled');
            }
        });
    };
  }