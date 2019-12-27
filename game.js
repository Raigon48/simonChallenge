let simonSays = new Array();
let colorArray = ['red','green','yellow','blue'];

let started = false;
let level = 0;
let currentVal = 0;

function randomColorGenerator() {
    return colorArray[Math.floor(Math.random()*4)];
};

function pushColor(color) {
    simonSays.push(color);
}

function playSound(sound) {
    var audio = new Audio('sounds/'+ sound + '.mp3');
    audio.play();
}

function nextSequence() {
    var color = randomColorGenerator();
        pushColor(color);
        setTimeout(() => {
            playSound(color);
            $('.'+color).addClass('blink');
            setTimeout(()=> {
            $('.'+color).removeClass('blink');
            }, 500);
            level++;
            $('h1').text('Level '+level);
        }, 1000);
}

function gameReset() {
    simonSays = [];
    started = false;
    level = 0;
    currentVal = 0;
}

$(document).keypress(() => {
    if(!started) {
        started = true;
        nextSequence();
    }
})

function checkAnswer(val) {
    if(simonSays[currentVal++] === val) {
        if(currentVal === simonSays.length) {
            currentVal = 0;
            nextSequence();
        }
    }
    else {
        gameReset();
        $('body').addClass('red-background');
        setTimeout(() => {
            $('body').removeClass('red-background');
        }, 50);
        playSound('wrong');
        $('h1').text('Game Over, Press a key to play again!');
    }
}

$('.box').click((event) => {
    if(started) {
        var val = event.target.value;
        playSound(val);
        $('.'+val).addClass('blink');
        setTimeout(()=> {
            $('.'+val).removeClass('blink');
        }, 500);
        checkAnswer(val);
    }
});
