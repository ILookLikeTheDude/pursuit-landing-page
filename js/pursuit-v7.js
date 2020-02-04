$(function () {
//remove char forced by CKEditor
    $('#play-circle').empty();

//layer fade timing
    let fadeOutMed = {
        'z-index': 0,
        opacity: 0,
        transition: 'opacity 0.5s linear'
    };
    let fadeInMed = {
        'z-index': 1,
        opacity: 1,
        transition: 'opacity 0.5s linear'
    };
    let fadeInSlow = {
        'z-index': 1,
        opacity: 1,
        transition: 'opacity 1.0s ease-in',
        transitionDelay: '1.0s'
    };
    let fadeOutFast = {
        'z-index': 0,
        opacity: 0,
        transition: 'opacity 0.3s ease-out'
    };

    let $scene = $('.scene');
    const TOTAL_SCENES = $scene.length;
    let count = 0;
    let $leftArrow = $('#pursuit-left-arrow');
    let $rightArrow = $('#pursuit-right-arrow');
    let leftArrow = document.getElementById('pursuit-left-arrow');
    let rightArrow = document.getElementById('pursuit-right-arrow');
    let $beginButton = $('#btn-begin');
    let $allControls = $('#btn-begin, #pursuit-left-arrow, #pursuit-right-arrow');

    //getters
    function getScene(c) {
        return $($scene[c]);
    }
    function getLinks(c) {
        return $($scene[c]).find('.content-block').find('a');
    }


    //progress bar display and functionality
    function changeProgressBar(c) {
        let barWidth = (100 / (TOTAL_SCENES - 1)) * c;
        $('#progress-bar').animate({width: barWidth + '%'});
    }


    //load next background image
    function loadNextBackground(c) {
        let $nextScene= $($scene[c + 1]);
        let $hasClassBackground = ($nextScene.hasClass('load-next-background'));
        if ( ! $hasClassBackground ) {
            $nextScene.addClass('load-next-background');
        }
    }


    //scene transitions
    let transPrevious = function(c) {
        $($scene[c]).find('.content-block').css(fadeOutFast);
        $($scene[c]).css(fadeOutMed);
        $($scene[c - 1]).css(fadeInMed);
        $($scene[c - 1]).find('.content-block').css(fadeInSlow);
    };

    let transNext = function(c) {
        $($scene[c]).find('.content-block').css(fadeOutFast);
        $($scene[c]).css(fadeOutMed);
        $($scene[c + 1]).css(fadeInMed);
        $($scene[c + 1]).find('.content-block').css(fadeInSlow);
    };

    let forward = function(c) {
        loadNextBackground(c);
        if (c < TOTAL_SCENES - 1 ) {
            transNext(c);
            changeProgressBar(c + 1);
            arrowDisplay(c + 1);
            getScene(c + 1).focus();
        }
        return count++;
    };

    let back = function(c) {
        if (c > 0) {
            transPrevious(c);
            changeProgressBar(c - 1);
            arrowDisplay(c - 1);
            getScene(c - 1).focus();
        }
        return count--;
    };

    //set arrow visibility based on page number
    let arrowDisplay = function(pageNumber) {
        if (pageNumber === TOTAL_SCENES - 1) {
            $rightArrow.css('visibility', 'hidden');
            $leftArrow.css('visibility', 'visible');
        } else if (pageNumber === 0) {
            $rightArrow.css('visibility', 'hidden');
            $leftArrow.css('visibility', 'hidden');
        } else {
            $rightArrow.css('visibility', 'visible');
            $leftArrow.css('visibility', 'visible');
        }
    };

    let changeScene = function(c, th) {
        //let $this = th;
        if (th === rightArrow) {
            forward(c);
        } else if (th === leftArrow) {
            back(c);
        } else {
            forward(c);
        }
    };



    //forward and back click event handlers
    $allControls.on('click', function() {
        changeScene(count, this);
    });



    //keyboard arrow event handlers (keyboard arrows trigger right/left nav) (combine all into function with switch
    // block)
    $(document).on('keydown', function(e) {
        if(e.which === 39) {
            changeScene(count, rightArrow);
            e.preventDefault();

        } else if (e.which === 37) {
            changeScene(count, leftArrow);
            e.preventDefault();
        }
    });



    //arrow button focus controls (return / space)
    $rightArrow.on('keypress', function(e) {
        if (e.which === 13 || e.which === 32) {
            changeScene(count, this);
            e.preventDefault();
        }
    });

    $leftArrow.on('keypress', function(e) {
        if (e.which === 13 || e.which === 32) {
            changeScene(count, this);
            e.preventDefault();
        }
    });



    //remove user agent focus and hover styling
    $('#vid-close-btn').on('click', function() {
        $('#vidLinkBtn').css({'color' : 'white',}).focusout();
        //stop video playback when close icon clicked
        let vidContainer = $('#video-player');
        let video = vidContainer.attr('src');
        vidContainer.attr('src','');
        vidContainer.attr('src',video);
    });
});