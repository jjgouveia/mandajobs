$(document).ready(function () {

    var menu = false;


    $(".menu").click(function () {

        if (menu) {
            $(".menuLista").addClass("-noesActivo");
            setTimeout(
                function () {
                    $(".menuLista").removeClass('-esActivo');
                    $("#menu").removeClass("close");
                    $(".menuLista").removeClass("-noesActivo");
                }, 300);

            menu = false;
        } else {

            $(".menuLista").addClass('-esActivo');
            $(".menu").addClass("close");

            menu = true
        }
    });


    $(".close").click(function () {
        $(".menu").removeClass("close");
        $('.menuLista').removeClass('-esActivo');
    });


});