export default class Slide {
    /**
     * @type {object}
     * @param {string}
     */
    constructor(el) {
        this.el = el;
    };

    moveSlideCard(num, idx) {
        var {additems} = this.el;
        var {startEl, endEl} = this.el.targets;
        var {nextEl, prevEl} = this.el.navigation;

        var slideCount = $(startEl+`.id-${idx} `+endEl).length - additems;
        var firstCard = $(startEl+`.id-${idx} `+endEl).first();
        var lastCard = $(startEl+`.id-${idx} `+endEl).last();
    
        num >= slideCount && (firstCard.removeClass('on'), lastCard.addClass('on')) // 현재item의 마지막 요소 채크
        num < slideCount && (lastCard.removeClass('on')) // 현재item의 마지막 요소가 아닌것 채크
        num > 0 && firstCard.removeClass('on'); // 현재item의 첫번째 요소보다 큰것 채크
        num === 0 && (firstCard.addClass('on'), lastCard.removeClass('on')) // 현재item의 첫번째 요소랑 같은것 채크
        
        firstCard.hasClass('on') ? $(startEl+`.id-${idx} `+prevEl).addClass('disabled') : $(startEl+`.id-${idx} `+prevEl).removeClass('disabled')
        lastCard.hasClass('on') ? $(startEl+`.id-${idx} `+nextEl).addClass('disabled') : $(startEl+`.id-${idx} `+nextEl).removeClass('disabled')
    
        var slideNum = -num * $(endEl).innerWidth();  //slideNum은 활성화된 아이템 자기자신을 저장해놓는다.
        document.querySelector(startEl+`.id-${idx} `+endEl).parentElement.style.transform = `translateX(${slideNum}px)`;
    };

    moveSlideNotice(num, idx){
        var {startEl, endEl} = this.el.targets;
        var {nextEl, prevEl} = this.el.navigation;

        var slideCount = ($(startEl+`.id-${idx} `+endEl).length / 4) - 3;
        var firstCard = $(startEl+`.id-${idx} `+endEl).first();
        var lastCard = $(startEl+`.id-${idx} `+endEl).last();
    
        num >= slideCount && (firstCard.removeClass('on'), lastCard.addClass('on')) // 현재item의 마지막 요소 채크
        num < slideCount && (lastCard.removeClass('on')) // 현재item의 마지막 요소가 아닌것 채크
        num > 0 && firstCard.removeClass('on'); // 현재item의 첫번째 요소보다 큰것 채크
        num === 0 && (firstCard.addClass('on'), lastCard.removeClass('on')) // 현재item의 첫번째 요소랑 같은것 채크
    
        firstCard.hasClass('on') ? $(startEl+`.id-${idx} `+prevEl).addClass('disabled') : $(startEl+`.id-${idx} `+prevEl).removeClass('disabled')
        lastCard.hasClass('on') ? $(startEl+`.id-${idx} `+nextEl).addClass('disabled') : $(startEl+`.id-${idx} `+nextEl).removeClass('disabled')
    
        var slideNum = -num * $(endEl).innerWidth(); //slideNum은 활성화된 아이템 자기자신을 저장해놓는다.
        document.querySelector(startEl+`.id-${idx} `+endEl).parentElement.style.transform = `translateX(${slideNum}px)`;
    };

    inithandCard(){
        var _self = this;
        var {additems} = this.el;
        var {startEl, endEl} = this.el.targets;
        var {nextEl, prevEl} = this.el.navigation;
        
        $(startEl).each(function(idx, _){
            var currentIdx = 0;
            var firstCard = $(startEl+`.id-${idx} `+endEl).first();
            var lastCard = $(startEl+`.id-${idx} `+endEl).last();
            var slideCount = $(startEl+`.id-${idx} `+endEl).length;
        
            currentIdx === 0 && (firstCard.addClass('on'),lastCard.removeClass('on'));
            firstCard.hasClass('on') && $(prevEl).addClass('disabled')
        
            $(startEl+`.id-${idx} `+nextEl).on('click', function(){
              if(currentIdx < slideCount - additems) {
                _self.moveSlideCard(currentIdx += additems, idx);
              }
            });
        
            $(startEl+`.id-${idx} `+prevEl).on('click', function(){
              if(currentIdx > 0) {
                _self.moveSlideCard(currentIdx -= additems, idx);
              }
            });
        });
    };

    inithandNotice() {
        var _self = this;
        var {additems} = this.el;
        var {startEl, endEl} = this.el.targets;
        var {nextEl, prevEl} = this.el.navigation;

        $(startEl).each(function(idx, _){
            var currentIdx = 0;
            var firstCard = $(startEl+`.id-${idx} `+endEl).first();
            var lastCard = $(startEl+`.id-${idx} `+endEl).last();
            var slideCount = $(startEl+`.id-${idx} `+endEl).length / 4;
        
            currentIdx === 0 && (firstCard.addClass('on'),lastCard.removeClass('on'));
            firstCard.hasClass('on') && $(prevEl).addClass('disabled')
        
            $(startEl+`.id-${idx} `+nextEl).on('click', function(){
                if(currentIdx < slideCount - 3) {
                    _self.moveSlideNotice(currentIdx += additems, idx);
                }
            });
        
            $(startEl+`.id-${idx} `+prevEl).on('click', function(){
                if(currentIdx > 0) {
                    _self.moveSlideNotice(currentIdx -= additems, idx);
                }
            });
        });
    };
}