$(function () {
  const social = ["ic-gitbook", "ic-github"];

  $(".list_sns > li > a").each(function (idx, el) {
    $(el).prepend(`<i class="${social[idx]} icon_common"></i>`);
  });
});
