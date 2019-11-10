$(document).ready(function() {
    /**
     * Ferramenta de carrinho
     */
    var toolContainer = $(".tool__product-list"),
        productVariant;

    for (const i in Fbits.Produto.ProdutoVariante) {
        if (Fbits.Produto.ProdutoVariante.hasOwnProperty(i)) {
            productVariant = Fbits.Produto.ProdutoVariante[i].ProdutoVarianteId;
            const element = Fbits.Produto.ProdutoVariante[i];
        }
    }
    console.log(productVariant);

    var settings = {
        async: true,
        crossDomain: true,
        url:
            "https://api.fbits.net/produtos/" +
            productVariant +
            "?tipoIdentificador=ProdutoVarianteId&camposAdicionais=Atributo",
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: "Basic 2BDig-8dea632a-a11a-4f95-8705-37fe92031c3e",
            "Cache-Control": "no-cache"
        }
    };

    $.ajax(settings).done(function(response) {
        //Verifica o retorno
        if (response) {
            console.log("resposta: ", response);
            for (const _i in response.atributos) {
                if (response.atributos.hasOwnProperty(_i)) {
                    const element = response.atributos[_i];
                    if (element.nome === "idGetProduct") {
                        console.log("Primeira resposta: ", element);
                        const variantreturno = element.valor;

                        var resProdSku = variantreturno,
                            settings3 = {
                                async: true,
                                crossDomain: true,
                                url:
                                    "https://api.fbits.net/produtos/" +
                                    resProdSku +
                                    "?tipoIdentificador=Sku&camposAdicionais=Informacao",
                                method: "GET",
                                headers: {
                                    Accept: "application/json",
                                    Authorization:
                                        "Basic 2BDig-8dea632a-a11a-4f95-8705-37fe92031c3e",
                                    "cache-control": "no-cache"
                                }
                            };

                        $.ajax(settings3).done(function(infsProd) {
                            console.log("infos", infsProd);
                            var produto =
                                '<div class="tool__product-item">\
                                <div class="labels"></div>\
                                <header>' +
                                infsProd.nome +
                                '</header>\
                                <input type="number" name="qtd-prod" value="1">\
                                <div class="prices">' +
                                infsProd.precoPor +
                                '</div>\
                                <button class="tool__js-addtoList" data-include="' +
                                infsProd.produtoVarianteId +
                                '">Incluir no carrinho</button>\
                            </div>';

                            toolContainer.append(produto);
                        });
                    }
                }
            }
        }
    });

    var ListProdsTool = [];

    /**
     * Tool add to List
     */
    $(document).on("click", ".tool__js-addtoList", function() {
        var _idProd = $(this).data("include"),
            _qtdProd = $(this)
                .parent()
                .find("input")
                .val();
        $(this).toggleClass("ins");

        if ($(this).hasClass("ins")) {
            ListProdsTool.push([_idProd, _qtdProd]);
        } else {
            var index = ListProdsTool.indexOf(_idProd);
            if (index > -1) {
                ListProdsTool.splice(index, 1);
            }
        }

        console.log(ListProdsTool);
    });

    /**
     * Tool add to Cart
     */
    $(document).on("click", ".tool_js-addToCart", function() {
        var _dominio = "2bdigital.ecommercestore.com.br", //Dominio da loja Trocar para window.location.host
            _produtoVarianteId = "";
        for (const id in ListProdsTool) {
            if (ListProdsTool.hasOwnProperty(id)) {
                const itns = ListProdsTool[id];
                if (id == ListProdsTool.length - 1) {
                    _produtoVarianteId += itns[0] + "," + itns[1];
                } else {
                    _produtoVarianteId += itns[0] + "," + itns[1] + "&";
                }
            }
        }
        var url =
            "http://checkout.2bdigital.ecommercestore.com.br/Carrinho/Produto/Add/" +
            ListProdsTool[0][0];
        console.log(url);

        fetch(url, { method: "GET" }).then(function(res) {
            console.log(res);
        });

        //fetch(url, {method: 'GET'})

        /* var data = {
            Accept: "application/json",
            Authorization: "Basic 2BDig-8dea632a-a11a-4f95-8705-37fe92031c3e",
            "cache-control": "no-cache",
            contentType: "application/json",
            cache: false
        };

        $.get(
            url,
            "",
            function(data, textStatus, jqXHR) {
                console.log(data);
            },
            "json"
        ); */

        ListProdsTool = [];
        console.log(ListProdsTool);
    });

    //menu mobile
    $(".icomobile-hamburguer").click(function(e) {
        $("body").addClass("menu-mob-open");
    });
    $(".menu-mobile .close-menu").click(function() {
        $("body").removeClass("menu-mob-open");
    });

    $('.filtroTitle.title').click(function(){
        $('.fbits-topo-categoria.divmobile').toggleClass('open')
    })

    $('a#outrasAvaliacoes').html('avaliações')

    //produto frete
    $("input#btnCalculaFreteProduto").attr("value", "Calcular");
    $("input#txtCalculaFreteProduto").attr("placeholder", "Digite seu CEP");

    if ($(".category__products >span").length) {
        $(".category__products >span").append(
            "<div class='fbits-item-lista-spot fbits-item-lista-spot-empty'></div>"
        );
        $(".category__products >span").append(
            "<div class='fbits-item-lista-spot fbits-item-lista-spot-empty'></div>"
        );
        $(".category__products >span").append(
            "<div class='fbits-item-lista-spot fbits-item-lista-spot-empty'></div>"
        );
    }

    $(".desc__short a").on("click", function(e) {
        e.preventDefault();
        var id = $(".descricao__produto"),
            targetOffset = $(id).offset().top;

        $("html, body").animate(
            {
                scrollTop: targetOffset - 120
            },
            500
        );
    });
    $("div#fbits-cadastro-newsletter input#Nome").attr(
        "placeholder",
        "Digite seu nome"
    );
    $("div#fbits-cadastro-newsletter input#Email").attr(
        "placeholder",
        "Digite seu e-mail"
    );

    $(".category__btn-mobile").click(function() {
        $("body").addClass("filter__open");
    });

    $(".category__filter-close").click(function() {
        $("body").removeClass("filter__open");
    });

    $(".header__mainbar-mobile").click(function() {
        $("body").addClass("menu__open");
    });

    $(".header__mainbar-mobile-close").click(function() {
        $("body").removeClass("menu__open");
    });

    if (jQuery(".fbits-categoria").length) {
        $(".categoria__name-span").append(Fbits.Categoria.Nome);
    }

    if (jQuery(".desc__short").length) {
        $("#conteudo-0 .conteudoAbasProduto .paddingbox p")
            .clone()
            .appendTo($(".desc__short"));
    }

    $("body").addClass("active__body");

    $(document).ajaxComplete(function() {
        if (jQuery(".minicart-qtde-itens").is(":empty")) {
            jQuery(".minicart-qtde-itens").append("0");
        }
    });

    $(".header__navbar-wrapper .menu >li").each(function() {
        var list = $(this)
            .find(">ul")
            .html();

        if ($(this).find(">ul").length) {
            $(this).append(
                '<div class="menu__dropdow"><div><ul class="menu__list"> ' +
                    list
            );
            $(this)
                .find(">ul")
                .remove();

            if ($(this).find(">a img").length) {
                $(this)
                    .find(".menu__dropdow")
                    .append(
                        '<div class="menu__image"><a href="' +
                            this.children[0] +
                            '">' +
                            $(this)
                                .find(">a")
                                .html() +
                            "</a></div>"
                    );
                $(this)
                    .find(">a img")
                    .remove();
            }
        }
        $(this).addClass("list");
    });

    $(".full__banner-container").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    });

    $(".showcase .showcase__list:not(.not-carousel) > span").slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [
            {
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
    $(".ruler__list").slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        arrow: false,
        dots: false,
        responsive: [{
            breakpoint: 1300,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                arrows: false
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                autoplay: true,
                arrows: false
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                autoplay: true,
                arrows: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                autoplay: true,
                arrows: false
            }
        ]
    });

    //brands
    $(".brands__content").slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        arrow: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1301,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    dots: false,
                    autoplay: true,
                    arrows: false
                }
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    arrows: false
                }
            }
        ]
    });

    //compre junto
    $(".divCompreJuntoCarrossel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: true,
        dots: false,
        infinite: false
    });

    var lastScrollTop = 0;
    $(window).scroll(function() {
        var st = $(this).scrollTop();

        if (st > 150) {
            $("body").addClass("moving");
            if (st > lastScrollTop) {
                $("body").addClass("moving--down");
            } else {
                $("body").removeClass("moving--down");
            }
            lastScrollTop = st;
        } else {
            $("body").removeClass("moving");
        }
    });

    $("div#fbits-cadastro-newsletter .btNews").attr("value", "Enviar");

    $(".botoesSpot .spotTelevendas").each(function() {
        $(this)
            .closest(".spot")
            .addClass("spot__request");
    });

    if ($(window).width() < 1250) {
        $(".header__topbar-list").slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            responsive: [
                {
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

$(document).ajaxComplete(function(event, xhr, settings) {
    if (settings.url.indexOf("CadastroNews") >= 0) {
        $(".popUp-News input#modal-Nome").attr("placeholder", "Seu nome aqui");
        $(".popUp-News input#modal-Email").attr(
            "placeholder",
            "Seu e-mail aqui"
        );
        $(".popUp-News input#btnCadastrarNews").attr("value", "QUERO GANHAR!");
    }
    $("input.inputSearch[type='text']").attr(
        "placeholder",
        "O que você esta buscando?"
    );

    if ($(".conteudoAbasProduto .price__none").length) {
        $(".conteudoAbasProduto .price__none").appendTo(
            $(".product__details-topo")
        );
    }
});

if ($(window).width() < 992) {
    $(".full__banner-list").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true
    });

    $(".mini-footer .mini-footer__banners").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false
    });
}

var userLogged = Fbits.Usuario.Email;

if ($(userLogged) != null) {
    $("body").addClass("logged");
}

if ($(".fbits-login").length) {
    $(
        '<a href="mailto:name@email.com" class="upload__img">Faça upload de imagem via e-mail.</a>'
    ).appendTo($(".cadastroUsuario.cadastroFisica"));
}
