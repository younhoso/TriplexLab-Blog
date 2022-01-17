import { _setCookie } from "./cookie.js";

$(function () {
  tistoryLighthouseCheck();
  display_control();
  thumnailLoaded();
  detail_side();

  $(".share_js").on("click", function () {
    $(".share_temp").addClass("on");
    setTimeout(function () {
      $(".share_temp").removeClass("on");
    }, 2000);
    var input = $(".clipboard");

    input.val(window.location.href);
    input.select();

    /* 텍스트 필드 안의 텍스트 복사 */
    navigator.clipboard.writeText(input.val());
  });

  /** 상세페이지 Kakao공유 기능 */
  var detailInfoObj = {
    tit: $(".area_article").attr("aria-label"),
    link: $(".area_article").data("link"),
    image: $(".inner_header").data("image"),
    tag: $(".tag_content a").map((_, el) => el.innerText),
    count: $(".list_reply .item_reply").map((_, el) => el),
  };

  var kakao_js = document.querySelector(".kakao_js");
  if (kakao_js) {
    var commInfo = comment.getBoundingClientRect();
    var { tit, link, image, tag, count } = detailInfoObj;
    var tags =
      [...tag].reduce((acc, cur) => acc + ("#" + cur), "") ||
      "#" + $(".tit_logo").html();
    /* Kakao.Link */
    Kakao.Link.createDefaultButton({
      container: ".kakao_js",
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
    /** 상세페이지 Kakao공유 기능 // */
  }

  var comment_js = document.querySelector(".comment_js");
  if (comment_js) {
    /** 상세페이지 comment 기능 */
    $(".comment_js").on("click", function () {
      $("html, body").animate({ scrollTop: commInfo.top }, 500);
      $("#comment").focus();
      return false;
    });
    /** 상세페이지 comment 기능 // */
  }

  var windowWidth = $(window).width();
  var tabBtnWidth = $(".tab_btn:first-child").width();
  $(".line_inner i:first-child").css({ width: tabBtnWidth, opacity: 1 });
  if (document.getElementById("tt-body-index")) {
    var rect = document.querySelector(".tbas_inner").getBoundingClientRect();
    $(".tab_btn").on("click", function () {
      var selfWidth = $(this).width();
      $(".tab_item").siblings().removeClass("active");
      var dataTab = $(this).data("tabs");
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
    var content = $(this).val();
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

  /** 상세페이지에서 제목, 부제목 영역 아이디값, tab메뉴 활성화 */
  const h2El = Array.from(document.querySelectorAll(".article_view h2"));
  const h3El = Array.from(document.querySelectorAll(".article_view h3"));
  const ElsArr = [...h2El, ...h3El];
  const contentTemplate = () => {
    const template = ElsArr.map((item, idx) => {
      $(item).attr("id", changeRegexr($(item).text()));
      $(item).attr("data-id", `tit-${idx}`);

      if ($(ElsArr[idx])[0].localName === "h2") {
        return `<li class="list-item"> 
        <a href="#${changeRegexr($(item).text())}">
          ${removeBlankSpace($(item).text())}
        </a>
      </li>`;
      } else if ($(ElsArr[idx])[0].localName === "h3") {
        return `<li class="list-item"> 
          <a class="list-item-r" href="#${changeRegexr($(item).text())}">
            ${removeBlankSpace($(item).text())}
          </a>
        </li>`;
      }
    }).join("");
    if (document.getElementById("tt-body-page")) {
      document.querySelector("#tt-body-page .gtae_contents").innerHTML =
        template;
    }
  };
  contentTemplate();
  /** // 상세페이지에서 category_list 해당 카테고리 활성화 (상세페이지에서 렌더링 시점)*/

  /** 상세페이지에서 아이디영역으로 스크롤 이동 (상세페이지에서 렌더링 시점)*/
  var hash = window.location.hash;
  if (hash && document.getElementById(decodeURI(hash).slice(1))) {
    // #값이 있을때만 실행됨
    var $this = $(decodeURI(hash));
    $("html, body").animate({ scrollTop: $this.offset().top - 137 }, 500);
  }
  /** // 상세페이지에서 아이디영역으로 스크롤 이동 (상세페이지에서 렌더링 시점)*/
  /** 상세페이지에서 아이디영역으로 스크롤 이동*/
  $(document).on("click", "#tt-body-page .gtae_contents a", function () {
    $("html, body").animate(
      { scrollTop: $($(this).attr("href")).offset().top - 137 },
      500
    );
  });
  /** // 상세페이지에서 아이디영역으로 스크롤 이동*/

  /** 상세페이지에서 img alt 속성추가 및 저작관 표시작에 rel 적용 (상세페이지에서 렌더링 시점)*/
  var imgText = $("figure figcaption").html();
  $("#tt-body-page").length &&
    ($("figure img").attr("alt", imgText),
    $(".link_ccl").attr("rel", "noopener"));
  /** // 상세페이지에서 img alt 속성추가 및 저작관 표시작에 rel 적용 (상세페이지에서 렌더링 시점)*/

  /** 윈도우창 리사이즈 함수 */
  function setScreenSize() {
    var vw = 0;
    var vh = window.innerHeight * 0.01;
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
  $(".notice_js").on("click", function () {
    _setCookie("bell", "Y", 5);
    $(this).removeClass("on");
    $(".notice_template").addClass("on");
    var frag = document.getElementsByTagName("template")[0];
    var copy = frag.content.cloneNode(true);
    $(".notice_template .contents").html(copy);
  });
  $(".closeIcon").on("click", function () {
    $(".notice_template").removeClass("on");
  });

  $("html, body").on("scroll", function () {
    !$(".notice_template").hasClass("on")
      ? null
      : $(".notice_template").removeClass("on");
  });
  /*  공지 사항 // */

  /* 스크롤 방향 감지 */
  // var lastScrollY = 0;
  // function moblieScroll(e){
  //   var moHeaderMenu = $('.box_header');
  //   if(windowWidth <= 1025){ //모바일 해상도일때 경우
  //     // 스크롤 방향의 조건
  //     $(this).scrollTop() > lastScrollY ? moHeaderMenu.addClass('on') : moHeaderMenu.removeClass('on')
  //     lastScrollY < 0 && moHeaderMenu.removeClass('on'); // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
  //   } else { //PC 해상도일때 경우
  //     $(this).scrollTop() > lastScrollY ? moHeaderMenu.addClass('on') : moHeaderMenu.removeClass('on')
  //   }
  //   lastScrollY = $(this).scrollTop(); // 마지막 스크롤 방향 위치 감지
  // };
  // $('html, body').on('scroll', moblieScroll);
  /* 스크롤 방향 감지 // */

  const activateTargetSection = (targetSectionNo) => {
    $(".gtae_contents li").removeClass("on");
    $(".gtae_contents li:nth-child(" + targetSectionNo + ")").addClass("on");
  };

  const addEventToEl = (elList) => {
    let lastScroll = 0;
    document.addEventListener("scroll", function () {
      const thisTop = $(document).scrollTop() + 137;
      if ($(".gtae").hasClass("is-fixed")) {
        for (let i = 0; i < elList.length; i++) {
          if (
            thisTop >= $(`.body-page [data-id=tit-${i}]`).offset().top &&
            thisTop < $(`.body-page [data-id=tit-${i + 1}]`).offset().top
          ) {
            activateTargetSection(i + 1);
          }
          if ($(`.body-page [data-id=tit-${elList.length - 1}]`)) {
            return;
          }
        }
      }
      lastScroll = window.scrollY;
    });
  };

  const boxElList = document.querySelectorAll(".gtae_contents li");
  addEventToEl(boxElList);
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

function changeRegexr(str) {
  /** 특수문자 및 빈 공백을 '-'로 변경(정규표현식)하는 함수. (단 []안에있는 문자와 이모지는 제외한다.)*/
  var str = String(str);
  return str.replace(
    /[^a-zA-Z0-9ㄱ-ㅎ가-힣👇👉🔥👏👍✅🔒😃☕️🎯🙌🎉📌📜🙏🙋‍♂️👨‍💻🤟📡🧭😀👋🚵🚵‍♀️🚴‍♂️🦿😄😭🖱👈📺]/gim,
    "-"
  );
}

// function removeRegexr(str){ /**a-zA-Z0-9ㄱ-ㅎ가-힣를 제외한 나머지들 빈 공백 제거 함수*/
//   var str = String(str);
//   return str.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣]/gim, '')
// };

function removeBlankSpace(str) {
  /**빈 공백 제거(정규표현식) 함수*/
  var str = String(str);
  return str.replace(/[\s]/gim, "");
}

function removeCharacters(str) {
  /**알파벳 n 및 빈 공백 제거(정규표현식) 함수*/
  var str = String(str);
  return str.replace(/[\s,n]/gim, "");
}

// /* post 문서 스크롤 맨 하단 감지 */
var isVisible = true;
function docHeight() {
  var scrollTop;
  var innerHeight;
  var scrollHeight;
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
$(window).on("scroll", docHeight);
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

/* 티스토리에서 자동 삽입되는 요소 중에 lighthouse 퍼포먼스 체크에 방해되는 요소들 개선  */
function tistoryLighthouseCheck() {
  var editEntry = document.querySelector("#editEntry");
  var cancel = document.querySelector(".lb-cancel");
  var declaration = Array.from(
    document.querySelectorAll(".area_reply .item_reply .date a")
  );
  var postBtn = Array.from(document.querySelectorAll(".btn_post"));
  var pageEl = Array.from(
    document.querySelectorAll(".area_paging a:not([href])")
  );
  var iframe = Array.from(
    document.querySelectorAll(
      '#tt-body-page figure[data-ke-type="video"][data-video-host] iframe'
    )
  );

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
      var els = el.nextElementSibling;
      if (els.nodeName === "FIGCAPTION") {
        var txt = els.innerHTML;
        return el.setAttribute("title", txt);
      }
    });
}
/* 티스토리에서 자동 삽입되는 요소 중에 lighthouse 퍼포먼스 체크에 방해되는 요소들 개선 // */
