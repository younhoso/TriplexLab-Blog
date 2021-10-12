var menuIcons = ['ic-html', 'ic-js', 'ic-uiux' ,'ic-etc'];
var social = ['ic-github', 'ic-gitbook'];

$('.category_list > li a').each(function(idx, el){
  $(el).prepend(`<i class="${menuIcons[idx]}"></i>`);
});

$('.list_sns > li a').each(function(idx, el){
  $(el).prepend(`<i class="${social[idx]} icon_common"></i>`);
});
