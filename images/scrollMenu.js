class ScrollMenu {
  constructor(el) {
    this.el = el;
    this.$$ = (ele) => Array.from(document.querySelectorAll(ele));
    this.$ = (ele) => document.querySelector(ele);
    this.store = { menuNames: [] };
    this.init();
  }

  selector(selector) {
    let collection;

    if (!selector) {
      collection = document.querySelectorAll(null);
    } else {
      collection = document.querySelector(selector);
    }
    return collection;
  }

  templateMenu(el = null, idx = 0) {
    const { addIdName } = this.el;
    const trimStr = el.innerText.split(" ").join(""); //띄어쓰기 제거
    return `
      <li id="${addIdName}-${idx}" class="item">
        <a href="javascript:void(0)">${trimStr}</a>
      </li>
    `;
  }

  scroll() {
    const { menuNames } = this.store;
    //화면의 높이를 가져와서 4등분 한다.(2등분해도 된다.)
    //항목이 4등분 지점안으로 올때 하이라이트를 줄려고 계산
    let windowHeight = (window.innerHeight / 4).toFixed(0);
    //본문에 다시 h태그를 가져온다.
    menuNames.forEach((item) => {
      //h태그 객체가 화면의 상단에서 얼마큼 떨어져 있는지 가져와서
      let myPosition = item.getBoundingClientRect().top;
      //그 거리가 -30에서 이전 화면의 높이 3등분 한 값보다 작으면
      //함수실행 화면 상단에서 3분지1 지점 안으로 들어오면 작동하게끔
      if (myPosition > -30 && myPosition < windowHeight) {
        this.togglCss(item.id);
      }
    });
  }

  togglCss(targetId) {
    const { targetMenu, addClassName } = this.el;
    if (targetId === "") return;

    //받아온 아이디값으로 메뉴에서 해당 아이디를 가진 객체에 highlights를 넣어준다.
    this.$$("." + addClassName).forEach((item) => {
      item.classList.remove(addClassName);
    });
    this.$(targetMenu)
      .querySelector("#" + targetId)
      .classList.add(addClassName);
  }

  init() {
    const { targetMenu, targetView, addIdName, addClassName, menuNames } =
      this.el;
    this.store.menuNames = Array.from(
      this.$(targetView).querySelectorAll(menuNames)
    );
    const temp_html = this.store.menuNames
      .map((item, idx) => {
        item.setAttribute("id", `${addIdName}-${idx}`);
        return this.templateMenu(item, idx);
      })
      .join("");
    this.$(targetMenu).innerHTML = temp_html;

    this.$(targetMenu).querySelector("li").classList.add(addClassName);
    this.$(targetMenu)
      .querySelectorAll("li")
      .forEach((item) => {
        item.addEventListener("click", (e) => {
          const id = this.$(targetView).querySelector("#" + e.currentTarget.id);
          const offsetEleY = id.getBoundingClientRect().top;
          //스크롤로 이동한 거리(window.pageYOffset) + 현재화면 기준으로한 상대경로 값(offsetEleY)을 합한 값으로 절대경로를 구한다.
          //137px 만큼 여백을 줌
          const scrollPosition = window.pageYOffset + offsetEleY - 137;
          window.scrollTo({ top: scrollPosition, left: 0, behavior: "smooth" });
        });
      });

    window.addEventListener("scroll", () => this.scroll());
  }
}

export default ScrollMenu;
