$(function () {
  const social = ["ic-github", "ic-gitbook"];

  $(".list_sns > li > a").each(function (idx, el) {
    $(el).prepend(`<i class="${social[idx]} icon_common"></i>`);
  });
});
