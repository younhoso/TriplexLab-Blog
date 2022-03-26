$(function () {
  const menuIcons = [
    {id: 1, name: "ic-html"},
    {id: 2, name: "ic-js"},
    {id: 3, name: "ic-connection"},
    {id: 4, name: "ic-uiux"},
    // {id: 5, name: "ic-ts"}, //타입스크립트 비공개 상태
    {id: 6, name: "ic-react"},
    {id: 7, name: "ic-server"},
  ];
  const social = ["ic-github", "ic-gitbook"];

  for(let i = 0; i < menuIcons.length; i++){
    const {id, name} = menuIcons[i];
    $(".category_list > li").eq(i).attr('data-id', id);
    if(id === Number($(".category_list > li").eq(i).data('id'))){
      $(".category_list > li > a").eq(i).prepend(`<i class="${name}"></i>`);
    }
  }

  $(".list_sns > li > a").each(function (idx, el) {
    $(el).prepend(`<i class="${social[idx]} icon_common"></i>`);
  });
});
