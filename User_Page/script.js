$('button').on('click', () => {
    if (localStorage.getItem('data')) {
        var data = JSON.parse(localStorage.getItem('data')).data;
        divCreation(data);
    } else {
        $.ajax({
            url: 'https://reqres.in/api/users?page=2',
            method: 'GET',
            dataType: 'JSON',
            success: (data, textStatus, jqXHR) => {
                if (jqXHR.status != 200) {
                    if (!$('.mistake').length) {
                        $('body').append('<span class="mistake">Ошибка: данные не получены</span>');
                    }
                    return;
                }
                localStorage.setItem('data', JSON.stringify(data));
                divCreation(data.data);
            }
        });
    }
});

function divCreation(userData) {
    try {
        if ($('.main-wrapper').length) $('.wrapper').add('.main-wrapper').remove();
        $('body').append('<div class="main-wrapper"></div>');
        userData.forEach((item, i) => {
            $('.main-wrapper').append(`<div class="users" data-pos="${i}"><span>User ${i + 1} </span></div>`)
        })
        $('.users').eq(0).addClass('active');
        $('body').append(`<div class="wrapper"><img src="${userData[0].avatar}"><div class="cont"><span>First Name: ${userData[0]['first_name']}</span><span>Last Name: ${userData[0]['last_name']}</span></div></div>`);
        $('.main-wrapper').on('click', (event) => {
            if (!$(event.target).hasClass('users') && event.target.nodeName != 'SPAN') return;
            $('.users').removeClass('active');
            (event.target.nodeName == 'DIV') ? $(event.target).addClass('active') : $(event.target).parent().addClass('active');
            $('img').eq(0).attr('src', userData[$('.active')[0].dataset.pos].avatar);
            $('.cont').children().eq(0).text(`First Name: ${userData[$('.active')[0].dataset.pos]['first_name']}`);
            $('.cont').children().eq(1).text(`Last Name: ${userData[$('.active')[0].dataset.pos]['last_name']}`);
        });
    } catch (e) {
        if ($('.mistake').length) $('.mistake').remove();
        $('main-wrapper').remove();
        $('body').append('<span class="mistake">Ошибка: данные не получены</span>');
        localStorage.clear();
    }
}