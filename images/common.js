import { _setCookie } from "./cookie.js";

const _tr = (select) => document.querySelector(select);
const _trs = (select) => Array.from(document.querySelectorAll(select));

$(function () {
  tistoryLighthouseCheck();
  display_control();
  thumnailLoaded();
  detail_side();

  getHeadingData();
  renderToc();
  onScrollMove();
  _tr("#tt-body-page .body-page") && onReloadMove();

  const share =
    window.innerWidth >= 1024
      ? _tr(".share_js")
      : _tr(".mo_footer_menu .share_js");
  share.addEventListener("click", () => {
    _tr(".share_temp").classList.add("on");
    setTimeout(function () {
      _tr(".share_temp").classList.remove("on");
    }, 2000);
    const input = _tr(".clipboard");

    input.value = window.location.href;
    input.selected;

    /* 텍스트 필드 안의 텍스트 복사 */
    navigator.clipboard.writeText(input.value);
  });

  /** 상세페이지 Kakao공유 기능 */
  const detailInfoObj = {
    tit: $(".area_article").attr("aria-label"),
    link: $(".area_article").data("link"),
    image: $(".inner_header").data("image"),
    tag: $(".tag_content a").map((_, el) => el.innerText),
    count: $(".list_reply .item_reply").map((_, el) => el),
  };

  const commInfo = _tr(".area_reply")?.getBoundingClientRect();
  const kakao_js = document.querySelector(".kakao_js");
  const kakaoLink = () => {
    const { tit, link, image, tag, count } = detailInfoObj;
    if(!image) alert('대표이미지가 있어야 합니다.')
    const tags = [...tag].reduce((acc, cur) => {
      return acc + ("#" + cur)
    },"");
    /* Kakao.Link */
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: tit,
        description: tags,
        imageUrl: image,
        link: {
          mobileWebUrl: window.location.origin + link,
          webUrl: window.location.origin + link,
        },
      },
      social: {
        commentCount: [...count].length,
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: window.location.origin + link,
            webUrl: window.location.origin + link,
          },
        },
      ],
    }); /* Kakao.Link // */
  }
  kakao_js && kakao_js.addEventListener('click', kakaoLink);
  /** 상세페이지 Kakao공유 기능 // */

  const comment_js = document.querySelector(".comment_js");
  if (comment_js) {
    /** 상세페이지 comment 기능 */
    $(".comment_js").on("click", function () {
      $("html, body").animate({ scrollTop: commInfo.top }, 500);
      // $("#comment").focus();
      return false;
    });
    /** 상세페이지 comment 기능 // */
  }

  const windowWidth = $(window).width();
  const tabBtnWidth = $(".tab_btn:first-child").width();
  $(".line_inner i:first-child").css({ width: tabBtnWidth, opacity: 1 });
  if (_tr("#tt-body-index .tbas_inner")) {
    const rect = _tr(".tbas_inner").getBoundingClientRect();
    $(".tab_btn").on("click", function () {
      const selfWidth = $(this).width();
      $(".tab_item").siblings().removeClass("active");
      const dataTab = $(this).data("tabs");
      $(this).addClass("on").siblings().removeClass("on");
      $(".visitant").hasClass("on") &&
        ($(".line_inner i:first-child")
          .css({ width: selfWidth, opacity: 1 })
          .attr("class", dataTab),
        $(".tab_item").eq(0).addClass("active"));
      $(".story").hasClass("on") &&
        ($(".line_inner i:first-child")
          .css({ width: selfWidth, opacity: 1 })
          .attr("class", dataTab),
        $(".tab_item").eq(1).addClass("active"));

      //모바일 해상도일때 경우
      windowWidth <= 1025 &&
        $("html, body").animate({ scrollTop: rect.top - 125 }, 300);
    });
  }

  $(".header_pc_icon_inner").on("click", function (e) {
    $(e.target).hasClass("ic-search") &&
      $(".box_header").addClass("on").find("input.inp_search").focus();
  });

  /** inp_search 인풋박스 */
  $("input.inp_search").keyup(function () {
    const content = $(this).val();
    content.length <= 0
      ? ($(this).removeClass("active"), $(".btn_search_del").hide())
      : ($(this).addClass("active"), $(".btn_search_del").show());
  });
  /** // inp_search 인풋박스 */
  /** 검색어(인풋박스) 삭제 */
  $(".btn_search_del").click(function () {
    $("input.inp_search").removeClass("active").val("").focus();
    $(this).hide();
  });
  /** // 검색어(인풋박스) 삭제 */

  /* notice 페이지 리로드시점 */
  var cookiedata = document.cookie;
  if (cookiedata.indexOf("bell=Y") < 0) {
    $(".notice_js").addClass("on");
  } else {
    $(".notice_js").removeClass("on");
  }
  /* // notice 페이지 리로드시점 */

  /** darkMode 여부 체크 */
  var darkModeN = function () {
    // darkMode 취소 함수
    var darkmode = false;
    if (typeof Storage !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(darkmode));
    }
    $("html").attr("data-dark", JSON.parse(localStorage.getItem("darkMode")));
  };
  var darkModeY = function () {
    // darkMode 실행 함수
    var darkmode = true;
    if (typeof Storage !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(darkmode));
    }
    $("html").attr("data-dark", JSON.parse(localStorage.getItem("darkMode")));
  };
  /** 사이드바 darkMode 여부 식별 및 상태에 맞에 식별 */
  $(".tab_itme").on("click", function () {
    if (JSON.parse(localStorage.getItem("darkMode"))) {
      $(".tabs_itmes li:first-child").attr("class", "LIGHT"),
        $(".box_gnb").eq(0).addClass("on");
      $(".mo_footer_menu .themMode").find("i").attr("class", "ic-moon");
      $(".mo_footer_menu .themMode").find("p").text("DARK");
      darkModeN();
    } else {
      $(".tabs_itmes li:first-child").attr("class", "DARK"),
        $(".box_gnb").eq(1).addClass("on");
      $(".mo_footer_menu .themMode").find("i").attr("class", "ic-sun");
      $(".mo_footer_menu .themMode").find("p").text("LIGHT");
      darkModeY();
    }
    return false;
  });
  /** 사이드바 darkMode 여부 식별 및 상태에 맞에 식별 //*/
  /** darkMode 여부 체크 (최초 렌더링 시점)*/
  var mobileMenuMode = $(".mo_footer_menu .menu.themMode");
  JSON.parse(localStorage.getItem("darkMode"))
    ? (darkModeY(),
      $(".dark").addClass("on"),
      $(".tabs_itmes li:first-child").attr("class", "DARK"),
      mobileMenuMode.find("i").attr("class", "ic-sun"),
      mobileMenuMode.find("p").text("LIGHT"))
    : (darkModeN(),
      $(".light").removeClass("on"),
      $(".tabs_itmes li:first-child").attr("class", "LIGHT"),
      mobileMenuMode.find("i").attr("class", "ic-moon"),
      mobileMenuMode.find("p").text("DARK"));
  /** // darkMode 여부 체크 (최초 렌더링 시점)*/

  /** category list 페이지 해당 카테고리 활성화 (최초 렌더링 시점) */
  function sidebarMenuSet(idx) {
    if (typeof Storage !== "undefined") {
      sessionStorage.setItem("menuIdx", JSON.stringify(idx));
    }
  }
  $(".category_list > li a").on("click", function () {
    var idx = $(".category_list > li a").index(this);
    sidebarMenuSet(idx);
  });

  /* 메인 페이지 type_card 각각의 섹션마다 data-num 가져와 menuIdx를 변경한다. */
  $(".thumb-category a").on("click", function () {
    var dataNum = parseInt($(this).closest(".type_card").attr("data-num"));
    sidebarMenuSet(dataNum);
  });
  /* // 메인 페이지 type_card 각각의 섹션마다 data-num 가져와 menuIdx를 변경한다. */

  var _self = $(".list_category .category_list li").eq(
    JSON.parse(sessionStorage.getItem("menuIdx"))
  );
  function sidebarMenu() {
    _self.addClass("active").siblings("li").removeClass("active");
  }

  sessionStorage.getItem("menuIdx") && sidebarMenu();

  var $location = $(location),
    pathname = $location.attr("pathname"),
    parts = pathname.split("/");

  if (parts[1] === "category") {
    _self.addClass("active");
  } else {
    _self.removeClass("active");
  }

  /** search list 페이지 해당 카테고리 활성화 (최초 렌더링 시점) */
  if (parts[1] === "search" && $(".inp_search").val().length > 0) {
    $(".btn_search_del").show();
  }
  /** // category list 페이지 해당 카테고리 활성화 (최초 렌더링 시점) */

  /** 상세페이지에서 category_list 해당 카테고리 활성화 (상세페이지에서 렌더링 시점)*/
  var categoryDetailTit = $(".info_text > span").text().trim();
  var fruits = new Array();
  var fruitsSub = new Array();

  $(".list_category .category_list > li").each(function (idx, el) {
    var categoryTit = $(el).find("> a").text().trim();
    fruits.push(removeCharacters(categoryTit));

    $(el)
      .find(".sub_category_list > li")
      .each(function (idx, el) {
        var categorySubTit = $(el).find("> a").text().trim();
        fruitsSub.push(categoryTit + "/" + categorySubTit);
      });
  });

  if (typeof Storage !== "undefined") {
    sessionStorage.setItem("categoryList", JSON.stringify(fruits));
  }
  if (typeof Storage !== "undefined") {
    sessionStorage.setItem("categoryListSub", JSON.stringify(fruitsSub));
  }

  $.each(
    JSON.parse(sessionStorage.getItem("categoryList")),
    function (idx, el) {
      if (el === categoryDetailTit) {
        $(".list_category .category_list > li").eq(idx).addClass("active");
        return false;
      }
    }
  );

  $.each(
    JSON.parse(sessionStorage.getItem("categoryListSub")),
    function (idx, el) {
      if (el === categoryDetailTit) {
        $(".list_category .category_list > li .sub_category_list > li")
          .eq(idx)
          .addClass("active");
      }
    }
  );

  /** 상세페이지에서 아이디영역으로 스크롤 이동 (상세페이지에서 렌더링 시점)*/
  const hash = window.location.hash;
  if (hash && document.getElementById(decodeURI(hash).slice(1))) {
    // #값이 있을때만 실행됨
    const $this = $(decodeURI(hash));
    $("html, body").animate({ scrollTop: $this.offset().top - 137 }, 300);
  }
  /** // 상세페이지에서 아이디영역으로 스크롤 이동 (상세페이지에서 렌더링 시점)*/
  /** 상세페이지에서 아이디영역으로 스크롤 이동*/
  $(document).on("click", "#tt-body-page .gtae_contents > li", function (e) {
    if ($($(e.target)).prop("tagName") === "A") {
      $("html, body").animate(
        { scrollTop: $($(e.target).attr("href")).offset().top - 137 },
        300
      );
    }
  });
  /** // 상세페이지에서 아이디영역으로 스크롤 이동*/

  /** 상세페이지에서 img alt 속성추가 및 저작관 표시작에 rel 적용 (상세페이지에서 렌더링 시점)*/
  const imgText = $("figure figcaption").html();
  $("#tt-body-page").length &&
    ($("figure img").attr("alt", imgText),
    $(".link_ccl").attr("rel", "noopener"));
  /** // 상세페이지에서 img alt 속성추가 및 저작관 표시작에 rel 적용 (상세페이지에서 렌더링 시점)*/

  function setScreenSize() {
    /** 윈도우창 리사이즈 함수 */
    let vw = 0;
    let vh = window.innerHeight * 0.01;
    windowWidth <= 1025
      ? (vw = (window.innerWidth - 40) * 0.01)
      : (vw = ($(".area_sidebar").width() - 40) * 0.01);
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }
  setScreenSize();
  window.addEventListener("resize", setScreenSize);
  /** 윈도우창 리사이즈 함수 // */
  /** 모바일 하단 매뉴 상태 변화에 맞는 식별 */
  $(".mo_footer_menu").on("click", ".menu", function (e) {
    $(e.currentTarget).hasClass("moreMenu") &&
      ($(".area_sidebar").addClass("on"), $("body").css("overflow", "hidden"));
    if ($(e.currentTarget).hasClass("themMode")) {
      if (JSON.parse(localStorage.getItem("darkMode"))) {
        $(e.currentTarget).find("i").attr("class", "ic-moon");
        $(e.currentTarget).find("p").text("DARK");
        $(".tabs_itmes li:first-child").attr("class", "LIGHT"),
          $(".box_gnb").eq(0).addClass("on");
        darkModeN();
      } else {
        $(e.currentTarget).find("i").attr("class", "ic-sun");
        $(e.currentTarget).find("p").text("LIGHT");
        $(".tabs_itmes li:first-child").attr("class", "DARK"),
          $(".box_gnb").eq(1).addClass("on");
        darkModeY();
      }
    }
  });
  /** 모바일 하단 매뉴 상태 변화에 맞는 식별 // */
  /** 모바일 전체 메뉴 닫기 */
  $(".close_icon").on("click", function () {
    $(".area_sidebar").removeClass("on");
    $("body").css("overflow", "");
  });
  /** 모바일 전체 메뉴 닫기 // */
  /* 서식 관리 tabs */
  var tabs_warp = Array.from(document.querySelectorAll(".tabs_warp"));
  tabs_warp.forEach(function (el, idx) {
    el.dataset.tabs = idx + 1;
    if (idx + 1 === parseInt(el.dataset.tabs)) {
      $(".tabs_inner")
        .eq(idx)
        .addClass(`tabs_${idx + 1}`);
    }

    $(`.tabs_${idx + 1}`).on("click", function (e) {
      e.preventDefault();
      var attr = $(e.target).attr("href");
      var txt = $(e.target).html();
      $(attr).show().siblings().hide();
      e.target !== this
        ? ($(e.target).addClass("on").siblings().removeClass("on"),
          $(`.tabs_inner.tabs_${idx + 1} > span`).attr("class", txt))
        : null;
    });
  });
  /* // 서식 관리 tabs */
  /* code Copy */
  $(".article_view pre").prepend(
    '<button class="code_btn" data-txt="Copy" aria-label="Code Copy"><i class="ic-copy"></i></button>'
  );
  $(".code_btn").on("click", function () {
    var self = $(this);
    var hljsTxt = self.next(".hljs").text();
    navigator.clipboard.writeText(hljsTxt); /* 텍스트 클립보드 복사 */
    self.attr("data-txt", "Copied !").addClass("on");

    setTimeout(function () {
      self.attr("data-txt", "Copy").removeClass("on");
    }, 2000);
  });
  /* // code Copy */
  /* 공지 사항 */
  _tr(".notice_js").addEventListener("click", notice.add);
  _tr(".closeIcon").addEventListener("click", notice.remove);

  $("html, body").on("scroll", function () {
    !$(".notice_template").hasClass("on")
      ? null
      : $(".notice_template").removeClass("on");
  });
  /*  공지 사항 // */
});

const onScroll = () => {
  if(window.pageYOffset >= 240){
    _tr('.top-btn_js button').classList.add('on')
  } else {
    _tr('.top-btn_js button').classList.remove('on')
  }
}
window.addEventListener('scroll', onScroll);

_tr('.top-btn_js').addEventListener('click', () => {
  window.scrollTo(0, 0);
});

_trs('.category_list .sub_category_list li').forEach((el) => {
  el.insertAdjacentHTML('afterbegin','<i class="ic-arrow-right"></i>');
})

_tr('.coffee_Gift')?.addEventListener('click', () => {
  const temp = _tr(".qr_template").content;
  const clone = document.importNode(temp, true);
  const copy = clone.querySelector(".qr_inner");
  _tr("#wrap").appendChild(copy);
  
  _tr('.qr_inner').addEventListener('click', (e) => {
    if(e.target === e.currentTarget){
      _tr("#wrap").removeChild(_tr('.qr_inner'));
    }
  });
});

$(".inp_search").on("keyup", function (e) {
  if (this.value !== "" && e.keyCode === 13) {
    try {
      window.location.href =
        "/search/" + document.getElementsByName("search")[0].value;
      return false;
    } catch (e) {}
  }
});

$(".inp_submit").on("click", function () {
  if (document.querySelector(".inp_search").value !== "") {
    try {
      window.location.href =
        "/search/" + document.getElementsByName("search")[0].value;
      return false;
    } catch (e) {}
  }
});

$(".btn_search").on("click", function () {
  $(".box_header").addClass("on");
});
$(".back_btn").on("click", function () {
  $(".box_header").removeClass("on");
});

function removeCharacters(str) {
  /**알파벳 n 및 빈 공백 제거(정규표현식) 함수*/
  const strw = String(str);
  return strw.replace(/[\s,n]/gim, "");
}

// /* post 문서 스크롤 맨 하단 감지 */
let isVisible = true;
function docHeight() {
  let scrollTop;
  let innerHeight;
  let scrollHeight;
  if (document.getElementById("tt-body-page")) {
    scrollTop = $(document).scrollTop();
    innerHeight = $(window).height();
    scrollHeight = $(document).height();

    if ($(".article_view").offset().top <= scrollTop + 137) {
      $("#tt-body-page .gtae").addClass("is-fixed");
    } else {
      $("#tt-body-page .gtae").removeClass("is-fixed");
    }
  }
  if (scrollTop + innerHeight >= scrollHeight && isVisible) {
    $(".share_like1").addClass("on");
    setTimeout(function () {
      $(".share_like1").removeClass("on");
      isVisible = false; //문서 로드후 딱 한번만 실행 시키기 위함
    }, 2000);
  }
}

window.addEventListener("scroll", docHeight);
// /* post 문서 스크롤 맨 하단 감지 // */

function display_control() {
  // 박스 헤더
  if (
    $("#main .area_cover").children(":first-child").hasClass("type_featured")
  ) {
    $("#wrap").addClass("white");
  } else if ($("#main .area_cover").length > 0) {
    $("#main .area_cover").addClass("cover_margin");
  }

  // 글 출력이 있는 경우
  if ($(".area_view").length != false) {
    if (
      $(
        "#main > .area_cover:first-child > .type_featured:first-child, .type_article_header_cover"
      ).length
    ) {
      $("#wrap").addClass("white");
    }
  }

  // 로그인, 로그아웃 버튼 처리
  if (window.T.config.USER.name) {
    $(".btn-for-user").show();
  } else {
    $(".btn-for-guest").show();
  }

  $('.btn-for-guest [data-action="login"]').click(function () {
    document.location.href =
      "https://www.tistory.com/auth/login?redirectUrl=" +
      encodeURIComponent(window.TistoryBlog.url);
  });
  $('.btn-for-user [data-action="logout"]').click(function () {
    document.location.href =
      "https://www.tistory.com/auth/logout?redirectUrl=" +
      encodeURIComponent(window.TistoryBlog.url);
  });
}

/** 모든 리스트에 섬네일들 Lazy-Loading 만들기 */
function callback(mutationsList) {
  var txt_like = mutationsList[0].target.querySelector(".txt_like").textContent;
  if (mutationsList[0].type === "attributes") {
    $(".util_like .txt_count").text(txt_like);
  } else {
    // console.log(txt_like);
  }
  mutationsList[0].target.classList.contains("like_on")
    ? $(".item1 i").attr("class", "ic-like-bg")
    : $(".item1 i").attr("class", "ic-like"); //새로시점에 변경 유지
}

function utilLike() {
  $(".postbtn_like .uoc-icon").trigger("click");
  !$(".postbtn_like .uoc-icon").hasClass("like_on")
    ? ($(".item1 i").attr("class", "ic-like-bg"),
      $(".like_temp").addClass("on"))
    : $(".item1 i").attr("class", "ic-like"); //클릭 이벤트 시점에 변경
  setTimeout(function () {
    $(".like_temp").removeClass("on");
  }, 2500);
}

function detail_side() {
  /* 공감 아이콘 클릭 이벤트 처리 */
  if ($(".postbtn_like .uoc-icon").hasClass("btn_post")) {
    /* 공감 수 변경 시 처리 */
    var targetNode = document.getElementById("reaction0"); // 감시할 대상 Node
    var config = { attributes: true, childList: true, subtree: true }; // 감시자 설정

    // 공감 클릭 이벤트 연결
    $(".util_like").on("click", utilLike);

    // 감시자 인스턴스 생성lighthouse
    var observer = new MutationObserver(callback);
    // 감시할 대상 Node를 전달하여 감시 시작
    observer.observe(targetNode, config);
    /* 공감 개수 변경 시 처리 // */

    setTimeout(function () {
      $(".util_like .txt_count").text(
        $(".postbtn_like .uoc-icon .txt_like").text()
      );
    }, 100);
  }
  /* 공감 아이콘 클릭 이벤트 처리 */
}

function thumnailLoaded() {
  var target = Array.from(document.querySelectorAll(".thumnail")); // 감시할 대상자
  function callback(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > 0) {
        // 관찰 대상이 viewport 안에 들어온 경우
        entry.target.style.backgroundImage = `url(${entry.target.dataset.src})`;
        // 이미지를 불러왔다면 타켓 엘리먼트에 대한 관찰을 멈춘다.
        observer.unobserve(entry.target);
      }
    });
  }
  var io = new IntersectionObserver(callback);

  target.forEach(function (el, idx) {
    io.observe(el);
  });
}
/** 모든 리스트에 섬네일들 Lazy-Loading 만들기 // */

/** 공지 사항 */
const notice = {
  isNotice: true,
  noticeGet: function() {
    return notice.isNotice
  },
  noticeSet: function(val) {
    notice.isNotice = val;
  },
  add: function() {
    const temp = _tr("template").content;
    _tr(".notice_template").classList.add("on");
    const clone = document.importNode(temp, true);
    const copy = clone.querySelector(".tag_board");
    notice.noticeGet() && (_tr(".notice_template .contents").appendChild(copy));
    notice.noticeSet(false);
  },
  remove: function() { 
    _tr(".notice_template").classList.remove("on");
  }
}
/** // 공지 사항 */

/** 상세페이지에서 Contents네비 해당 스크롤 기능 */
const entryWrapName = "body-page"; // 본문글 전체 내용
const entryName = "contents_style"; // 본문글 내용
const navName = "gtae_contents"; // 네비게이션 Wrap 이름 지정
const headerName = "box_header"; // 상단 헤더 클래스 이름
const gap = 40; // toc 상단 위치값

const TOC_CONST = {
  //스크롤 초기값
  navItem: [],
  offsetTops: [],
  mainWrap: document.querySelector("." + entryWrapName),
  contentWrap: document.querySelector("." + entryName),
  navWrap: document.querySelector("." + navName),
  headings: [],
  newHeadings: [],
  navItemArr: [],
  headerHeight:
    headerName != ""
      ? document.querySelector("." + headerName).offsetHeight
      : 0,
};

function getHeadingData() {
  const contentWrap = TOC_CONST.contentWrap;
  let offsetTops = TOC_CONST.offsetTops;
  let newHeadings = TOC_CONST.newHeadings;

  const headings = contentWrap
    ? Array.from(contentWrap.querySelectorAll("h1, h2, h3, h4"))
    : [];
  TOC_CONST.headings = headings;

  headings.forEach(function (item, index) {
    item.id = "toc-link-" + index;
    if (item.innerText.trim() === "") {
      return;
    }

    if (TOC_CONST.mainWrap) {
      offsetTops.push(
        parseInt(
          item.offsetTop +
            TOC_CONST.mainWrap.offsetTop -
            TOC_CONST.headerHeight -
            gap
        )
      );
      newHeadings.push({
        name: item.localName,
        index: parseInt(item.localName.substring(1)),
        text: item.innerText,
        id: item.id,
        top:
          item.offsetTop +
          TOC_CONST.headerHeight +
          TOC_CONST.mainWrap.offsetTop,
      });
    }
  });
}
/** 상세페이지에서 Contents네비 해당 스크롤 기능 */

function renderToc() {
  /** 상세페이지 네비게이션 리스트 html 만들고 렌더링 */
  const headings = Array.from(TOC_CONST.headings);
  const temp_html = headings
    .map((item, idx) => {
      return `<li class="list-item" target-idx=${idx}> 
      <a href="#${item.id}">
        ${item.innerText}
      </a>
    </li>`;
    })
    .join("");

  if (document.querySelector("#tt-body-page .gtae_contents")) {
    document.querySelector("#tt-body-page .gtae_contents").innerHTML =
      temp_html;
  }
}

function changeCurrent(targetIndex) {
  const navItemArr = TOC_CONST.navItemArr;
  navItemArr.forEach(function (item, index) {
    if (index !== targetIndex) {
      item.classList.remove("on");
    } else {
      item.classList.add("on");
    }
  });
}

function onReloadMove() {
  /* 클릭 시 스크롤 이동 */
  const navWrap = TOC_CONST.navWrap;
  !navWrap.children.length && (_tr(".contentsTie").style.display = "none");
  const navItem = Array.from(navWrap.querySelectorAll("a"));
  const { navItemArr } = TOC_CONST;
  navItem.forEach((item) => {
    navItemArr.push(item);
  });
}

function onScrollMove() {
  /* 스크롤 이벤트 */
  const tocOnScroll = function (e) {
    const scrollTop =
      e.target.scrollingElement && e.target.scrollingElement.scrollTop;
    if (TOC_CONST.scriptScroll == true) {
      return;
    } else {
      let targetIndex = 0;
      const offsetTops = TOC_CONST.offsetTops;
      offsetTops.forEach(function (item, idx) {
        if (scrollTop >= item) {
          targetIndex = idx;
        }
      });
      changeCurrent(targetIndex);
    }
  };

  let timer;
  $(window).on("scroll", function (e) {
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        tocOnScroll(e);
      }, 400);
    }
  });
}

/* 티스토리에서 자동 삽입되는 요소 중에 lighthouse 퍼포먼스 체크에 방해되는 요소들 개선  */
function tistoryLighthouseCheck() {
  const detail_category = _tr(".another_category");
  const editEntry = document.querySelector("#editEntry");
  const cancel = document.querySelector(".lb-cancel");
  const lightbox = document.querySelector("#lightbox");
  const lightboxOverlay = document.querySelector("#lightboxOverlay");
  const declaration = Array.from(
    document.querySelectorAll(".area_reply .item_reply .date a")
  );
  const postBtn = Array.from(document.querySelectorAll(".btn_post"));
  const pageEl = Array.from(
    document.querySelectorAll(".area_paging a:not([href])")
  );
  const iframe = Array.from(
    document.querySelectorAll(
      '#tt-body-page figure[data-ke-type="video"][data-video-host] iframe'
    )
  );

  detail_category && detail_category.remove();
  editEntry && editEntry.setAttribute("title", "[##_title_##]");
  cancel && cancel.setAttribute("href", "javascript:;");
  declaration &&
    declaration.map(function (el) {
      return el.remove();
    });
  pageEl &&
    pageEl.map(function (el) {
      return el.setAttribute("href", "javascript:;");
    });
  postBtn &&
    postBtn.map(function (_, idx) {
      return (
        postBtn[0].setAttribute("aria-label", "관리자 버튼"),
        postBtn[idx].setAttribute("id", `reaction${idx}`)
      );
    });

  iframe &&
    iframe.map(function (el) {
      const els = el.nextElementSibling;
      if (els.nodeName === "FIGCAPTION") {
        const txt = els.innerHTML;
        return el.setAttribute("title", txt);
      }
    });
  lightbox.remove();
  lightboxOverlay.remove();
}
/* 티스토리에서 자동 삽입되는 요소 중에 lighthouse 퍼포먼스 체크에 방해되는 요소들 개선 // */
