import './css/style.scss'
import './css/iconfont.css'

import $ from 'jquery'

$(() => {
    $('#menu-btn').on('click', () => {
        if ($('#mobile-nav').is(':visible')) {
            $('#mobile-nav').hide();
        } else {
            $('#mobile-nav').show();
        }
    })
})

// 侧边栏选项卡
$('.sidebar .tabs>div').on('click', event => {
    $(event.target).siblings('div').removeClass('active');
    $(event.target).addClass('active');
    let index = $(event.target.parentElement).children('div').index(event.target);
    $('.sidebar .tabs-content>div').hide();
    $('.sidebar .tabs-content>div').eq(index).show();
})