// 注意:每次调用 $.get()或 $.post()或 $.ajax()的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajiax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://127.0.0.1:8080' + options.url
})