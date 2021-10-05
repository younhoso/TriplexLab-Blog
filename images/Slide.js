export default class Slide {
    constructor(el){
        this.el = el;
        
        this.current = null;
        this.store = {length:0, curIdx: 0}
        this.initHand();
    }

    moveSlideCard(num, idx){
        const slideCount = $(`.type_card.id-${idx} .item_card`).length - 5;

        // num === slideCount && (firstCard.classList.remove('on'), lastCard.classList.add('on')) // 현재item의 마지막 요소 채크
        // num !== slideCount && (lastCard.classList.remove('on')) // 현재item의 마지막 요소가 아닌것 채크
        // num > 0 && firstCard.classList.remove('on'); // 현재item의 첫번째 요소보다 큰것 채크
        // num === 0 && (firstCard.classList.add('on'), lastCard.classList.remove('on')) // 현재item의 첫번째 요소랑 같은것 채크

        // firstCard.classList.contains('on') ? $(`.type_card.id-${idx} .typeCard_prev`).classList.add('disabled') : $(`.type_card.id-${idx} .typeCard_prev`).classList.remove('disabled')
        // lastCard.classList.contains('on') ? $(`.type_card.id-${idx} .typeCard_next`).classList.add('disabled') : $(`.type_card.id-${idx} .typeCard_next`).classList.remove('disabled')

        const slideNum = -num * document.querySelectorAll('.item_card').innerWidth;  //slideNum은 활성화된 아이템 자기자신을 저장해놓는다.
        gsap.to(`.type_card.id-${idx} .list_type_card`, 1, {x: slideNum, ease: Power4.easeOut });
    };

    moveSlideNotice(num, idx){

        const slideNum = -num * document.querySelectorAll('.item_notice').innerWidth; //slideNum은 활성화된 아이템 자기자신을 저장해놓는다.
        gsap.to(`.type_notice.id-${idx} .list_type_notice`, 1, {x: slideNum, ease: Power4.easeOut });
    };

    initHand() {
        const {targets, additems} = this.el;
        const {nextEl, prevEl} = this.el.navigation;
        const els = Array.from(document.querySelectorAll(targets));
        const next = document.querySelector(nextEl);
        const prev = document.querySelector(prevEl);
        const slidecard = this.moveSlideCard.bind(this);

        els.reduce((acc, cur, idx) => {
            let {curIdx} = this.store;
            const firstCard = document.querySelector(`.type_card.id-${idx} .item_card:first-child`);
            const lastCard = document.querySelector(`.type_card.id-${idx} .item_card:last-child`);
            const typeCardNext = document.querySelector(`.type_card.id-${idx} .typeCard_next`);
            const typeCardPrev = document.querySelector(`.type_card.id-${idx} .typeCard_prev`);
            const slideCount = document.querySelectorAll(`.type_card.id-${idx} .item_card`).length;

            curIdx === 0 && (firstCard.classList.add('on'),lastCard.classList.remove('on'));
            firstCard.classList.contains('on') && prev.classList.add('disabled')
            
            typeCardNext.addEventListener('click', () => {
                if(curIdx < slideCount - additems) {
                    slidecard(curIdx += 1, idx);
                }
            });

            typeCardPrev.addEventListener('click', () => {
                if(curIdx > 0) {
                    slidecard(curIdx -= 1, idx);
                  }
            });
                
        },0);
    }
}