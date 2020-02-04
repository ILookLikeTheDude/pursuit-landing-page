let vidCloseBtn = document.getElementById("vid-close-btn");
let vidLinkBtn = document.getElementById("vidLinkBtn");
console.log(vidLinkBtn);
//remove char forced by CKEditor
vidLinkBtn.firstChild.textContent = '';

//layer fade timing
let fadeOutMed = {
    "z-index": 0,
    opacity: 0,
    transition: 'opacity 0.5s linear'
};
let fadeInMed = {
    "z-index": 1,
    opacity: 1,
    transition: 'opacity 0.5s linear'
};
let fadeInSlow = {
    "z-index": 1,
    opacity: 1,
    transition: 'opacity 1.5s ease-in',
    transitionDelay: '1.0s'
};
let fadeOutFast = {
    "z-index": 0,
    opacity: 0,
    transition: 'opacity 0.3s ease-out'
};

let allSceneElements = document.getElementsByClassName('scene');
const TOTAL_SCENES = allSceneElements.length;
let count = TOTAL_SCENES;
console.log(count);

$(function () {

    //allSceneElements.forEach(element => console.log(element));

    //remove user agent focus and hover styling
    vidCloseBtn.onclick = function() {
        vidLinkBtn.style.color = "white";
        vidLinkBtn.style.outline = "none";

        //stop video playback when close icon clicked
        let vidContainer = $('#video-player');
        let video = vidContainer.attr("src");
        vidContainer.attr("src","");
        vidContainer.attr("src",video);
    };

    function changeProgressBar(c) {
        let barWidth = ((TOTAL_SCENES/c>>0) + (TOTAL_SCENES%c)) * 10;
        $('#progress-bar').animate({width: barWidth + '%'});
        console.log(c);
        console.log(barWidth);
    }


    //set arrow visibility based on page number
    let arrowDisplay = function(pageNumber) {
        if (pageNumber === 1) {
            $('#pursuit-right-arrow').css("visibility", "hidden");
            $('#pursuit-left-arrow').css("visibility", "visible");
        } else if (pageNumber === TOTAL_SCENES) {
            $('#pursuit-right-arrow').css("visibility", "visible");
            $('#pursuit-left-arrow').css("visibility", "hidden");
        } else {
            $('#pursuit-right-arrow').css("visibility", "visible");
            $('#pursuit-left-arrow').css("visibility", "visible");
        }
    };

    //onscreen ui arrow event handlers - cross fades
    $('#pursuit-right-arrow').on("click", function() {
        if (count > 1) {
            $('#scene-' + count + ' .content-block').css(fadeOutFast);
            $('#scene-' + count).css(fadeOutMed);
            $('#scene-' + (count - 1)).css(fadeInMed);
            $('#scene-' + (count - 1) + ' .content-block').css(fadeInSlow);
            count--;
            changeProgressBar(count);
            arrowDisplay(count);
        }
        return count;
    });
    $('#pursuit-left-arrow').on("click", function () {
        if (count < TOTAL_SCENES) {
            $('#scene-' + (count + 1)).css(fadeInMed);
            $('#scene-' + (count + 1) + ' .content-block').css(fadeInSlow);
            $('#scene-' + count + ' .content-block').css(fadeOutFast);
            $('#scene-' + count).css(fadeOutMed);
            count++;
            changeProgressBar(count);
            arrowDisplay(count);
        }
        return count;
    });

    //keyboard arrow event handlers
    $(document).on("keydown", function(e) {
        if(e.which === 39) {
            if (count > 1) {
                $('#scene-' + count + ' .content-block').css(fadeOutFast);
                $('#scene-' + count).css(fadeOutMed);
                $('#scene-' + (count - 1)).css(fadeInMed);
                $('#scene-' + (count - 1) + ' .content-block').css(fadeInSlow);
                count--;
                changeProgressBar(count);
                arrowDisplay(count);
            }
            return count;

        } else if (e.which === 37) {
            if (count < TOTAL_SCENES) {
                $('#scene-' + (count + 1)).css(fadeInMed);
                $('#scene-' + (count + 1) + ' .content-block').css(fadeInSlow);
                $('#scene-' + count + ' .content-block').css(fadeOutFast);
                $('#scene-' + count).css(fadeOutMed);
                count++;
                changeProgressBar(count);
                arrowDisplay(count);
            }
            return count;
        }
        e.preventDefault();
    });
});