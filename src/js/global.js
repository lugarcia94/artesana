$(document).ready(function () {
    //menu mobile
    $('.header__mainbar-mobile').click(function(){
        $('.header .menuMain').addClass('open');
    })
    $('.header .menuMain button.btn-close-menu-mobile').click(function(){
        $('.header .menuMain').removeClass('open');
    })

    //produto frete
    $('input#btnCalculaFreteProduto').attr('value', 'Calcular')
    $('input#txtCalculaFreteProduto').attr('placeholder', 'Digite seu CEP')
    

    if ($(".category__products >span").length) {
        $(".category__products >span").append("<div class='fbits-item-lista-spot fbits-item-lista-spot-empty'></div>")
        $(".category__products >span").append("<div class='fbits-item-lista-spot fbits-item-lista-spot-empty'></div>")
        $(".category__products >span").append("<div class='fbits-item-lista-spot fbits-item-lista-spot-empty'></div>")
    }

    $('.desc__short a').on('click', function (e) {
        e.preventDefault();
        var id = $(".descricao__produto"),
            targetOffset = $(id).offset().top;

        $('html, body').animate({
            scrollTop: targetOffset - 120
        }, 500);
    });
    $(".newsletter-box input#Nome").attr("placeholder", "Seu nome aqui");
    $(".newsletter-box input#Email").attr("placeholder", "Digite seu e-mail");

    $(".category__btn-mobile").click(function () {
        $('body').addClass('filter__open');
    });

    $(".category__filter-close").click(function () {
        $('body').removeClass('filter__open');
    });

    $(".header__mainbar-mobile").click(function () {
        $('body').addClass('menu__open');
    });

    $(".header__mainbar-mobile-close").click(function () {
        $('body').removeClass('menu__open');
    });

    if (jQuery('.fbits-categoria').length) {
        $(".categoria__name-span").append(Fbits.Categoria.Nome);
    }

    if (jQuery('.desc__short').length) {
        $("#conteudo-0 .conteudoAbasProduto .paddingbox").clone().appendTo($('.desc__short'));
    }
    


    $('body').addClass('active__body');

    $(document).ajaxComplete(function () {
        if (jQuery('.minicart-qtde-itens').is(':empty')) {
            jQuery('.minicart-qtde-itens').append('0');
        }
    });

    $('.header__navbar-wrapper .menu >li').each(function () {
        var list = $(this).find('>ul').html();

        if ($(this).find('>ul').length) {
            $(this).append('<div class="menu__dropdow"><div><ul class="menu__list"> ' + list);
            $(this).find('>ul').remove();

            if ($(this).find('>a img').length) {
                $(this).find('.menu__dropdow').append('<div class="menu__image"><a href="' + this.children[0] + '">' + $(this).find('>a').html() + '</a></div>');
                $(this).find('>a img').remove();
            }
        }
        $(this).addClass('list');
    });

    $('.full__banner-container').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    });


    $('.showcase .showcase__list:not(.not-carousel) > span').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [{
            breakpoint: 1100,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: false
            }
        }
        ]
    });

    //slick ruler
    $('.ruler__list').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        arrow: false,
        dots: false,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,
                autoplay: true,
                arrows: false
            }
        },
        {
            breakpoint: 481,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                autoplay: true,
                arrows: false
            }
        }
        ]
    });

    //circle ruler
    $('.circle__wrapper').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        arrow: false,
        dots: false,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: true
            }
        },
        {
            breakpoint: 481,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true
            }
        }
        ]
    });

    //compre junto
    $('.divCompreJuntoCarrossel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: true,
        dots: false,
        infinite: false
    });


    

    
    var lastScrollTop = 0;
    $(window).scroll(function () {
        var st = $(this).scrollTop();

        if (st > 150) {
            $('body').addClass('moving');
            if (st > lastScrollTop) {
                $('body').addClass('moving--down');
            } else {
                $('body').removeClass('moving--down');
            }
            lastScrollTop = st;
        } else {
            $('body').removeClass('moving');
        }
    });

    $('.btNews').attr('value', 'QUERO ME CADASTRAR');

    $(".botoesSpot .spotTelevendas").each(function () {
        $(this).closest(".spot").addClass("spot__request");
    });

    if ($(window).width() < 1250) {
        $('.header__topbar-list').slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            responsive: [{
                breakpoint: 1030,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: true
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: true
                }
            },
            {
                breakpoint: 490,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true
                }
            }
            ]
        });
    }
});

$(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.url.indexOf("CadastroNews") >= 0) {
        $(".popUp-News input#modal-Nome").attr("placeholder", "Seu nome aqui")
        $(".popUp-News input#modal-Email").attr("placeholder", "Seu e-mail aqui")
        $(".popUp-News input#btnCadastrarNews").attr("value", "QUERO GANHAR!")
    }
    $("input.inputSearch[type='text']").attr("placeholder", "O que você procura?");
});

if ($(window).width() < 992) {
    $('.full__banner-list').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
    });

    $('.mini-banner .mini-banner__wrapper').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false
    });

    $('.mini-footer .mini-footer__banners').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false
    });
}