/******************************************************
 * jQuery plug-in
 * Easy Background Image Resizer
 * Developed by J.P. Given (http://johnpatrickgiven.com)
 * Useage: anyone so long as credit is left alone
 ******************************************************/

(function ($) {
    // Global Namespace
    var jqez = {};

    // Define the plugin
    $.fn.ezBgResize = function (options) {

        // Set global to obj passed
        jqez = options;

        // If img option is string convert to array.
        // This is in preparation for accepting an slideshow of images.
        if (!$.isArray(jqez.img)) {
            var tmp_img = jqez.img;
            jqez.img = [tmp_img]
        }

        $("<img/>").attr("src", jqez.img).load(function () {
            jqez.width = this.width;
            jqez.height = this.height;

            // Create a unique div container
            $("body").prepend('<div id="jq_ez_bg"></div>');

            // Add the image to it.
            $("#jq_ez_bg").append('<img src="' + jqez.img[0] + '" width="' + jqez.width + '" height="' + jqez.height + '" border="0">');
            $("#jq_ez_bg").append('<img src="' + jqez.img[0] + '" width="' + jqez.width + '" height="' + jqez.height + '" border="0">');

            // First position object
            $("#jq_ez_bg").css("visibility", "hidden");

            // Overflow set to hidden so scroll bars don't mess up image size.
            $("body").css({
                "overflow": "hidden"
            });

            resizeImage();
        });
    };

    $(window).bind("resize", function () {
        resizeImage();
    });

    // Actual resize function
    function resizeImage() {

        $("#jq_ez_bg").css({
            //"position":"fixed",
            "top": "0px",
            "left": "0px",
            "z-index": "-1",
            "overflow": "hidden",
            "width": $(window).width() + "px",
            "height": $(window).height() + "px",
            "opacity": jqez.opacity
        });

        // Image relative to its container
        $(".item").css("position", "relative");

        // Resize the img object to the proper ratio of the window.
        // var iw = $(".item").width();
        // var ih = $(".item").height();
        var iw = $(".item").width();
        var ih = $(".item").height();

        if ($(window).width() > $(window).height()) {
            //console.log(iw, ih);
            if (iw > ih) {
                var fRatio = iw / ih;
                $(".item").css("width", $(window).width() + "px");
                $(".item").css("height", Math.round($(window).width() * (1 / fRatio)));
                // $(".item").css("width",$(window).width() + "px");
                // $(".item").css("height",Math.round($(window).width() * (1/fRatio)));

                var newIh = Math.round($(window).width() * (1 / fRatio));

                if (newIh < $(window).height()) {
                    var fRatio = ih / iw;
                    $(".item").css("height", $(window).height());
                    $(".item").css("width", Math.round($(window).height() * (1 / fRatio)));
                }
            } else {
                var fRatio = ih / iw;
                $(".item").css("height", $(window).height());
                $(".item").css("width", Math.round($(window).height() * (1 / fRatio)));
            }
        } else {
            var fRatio = ih / iw;
            $(".item").css("height", $(window).height());
            $(".item").css("width", Math.round($(window).height() * (1 / fRatio)));
        }

        // Center the image
        if (typeof(jqez.center) == 'undefined' || jqez.center) {
            if ($(".item").width() > $(window).width()) {
                var this_left = ($(".item").width() - $(window).width()) / 2;
                $(".item").css({
                    "top": 0,
                    "left": -this_left
                });
            }
            if ($(".item").height() > $(window).height()) {
                var this_height = ($(".item").height() - $(window).height()) / 2;
                $(".item").css({
                    "left": 0,
                    "top": -this_height
                });
            }
        }

        $("#jq_ez_bg").css({
            "visibility": "visible"
        });

        // Allow scrolling again
        $("body").css({
            "overflow": "auto"
        });


    }


})(jQuery);