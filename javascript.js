const desktopInfo = document.getElementById('desktop-info')

if (!isMobile()){
    desktopInfo.style.display = 'flex';
}


//const container = document.getElementById("container");
const numberContainer = document.getElementById('numbers');
var gameRunning = true;

const instructions = document.getElementById('instructions')

const numOfLosers = document.getElementById('number-of-losers')
const btnPlus = document.getElementById('btn-plus')
const btnMinus = document.getElementById('btn-minus')
const btnStart = document.getElementById('btn-start')


var currentNumOfLosers = 1;

btnPlus.addEventListener('click', () => {
    if (currentNumOfLosers < 9) {
        currentNumOfLosers += 1;
        numOfLosers.innerHTML = currentNumOfLosers;
    }
});
btnMinus.addEventListener('click', () => {
    if (currentNumOfLosers > 1) {
        currentNumOfLosers -= 1;
        numOfLosers.innerHTML = currentNumOfLosers;
    }
});


//START GAME//
btnStart.addEventListener('click', () => {
    instructions.style.display = 'none';

    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });


    document.addEventListener("touchstart", (e) => {
        if (gameRunning === true) {
            [...e.changedTouches].forEach((touch) => {
                const dot = document.createElement("div");
                dot.classList.add("dot");
                dot.classList.add('orbit-in');
                dot.style.top = `${touch.pageY}px`;
                dot.style.left = `${touch.pageX}px`;
                dot.id = `dot_${touch.identifier}`;
                document.body.append(dot);
                endCountdown()
            });
            if ([...e.touches].length >= currentNumOfLosers + 1) {
                startCountdown()
            } else {
                endCountdown()
            }
        }
    });


    document.addEventListener("touchmove", (e) => {

        if (gameRunning === true) {
            [...e.changedTouches].forEach((touch) => {
                const dot = document.getElementById(`dot_${touch.identifier}`);
                dot.style.top = `${touch.pageY}px`;
                dot.style.left = `${touch.pageX}px`;
            });
        }
    });


    document.addEventListener("touchend", (e) => {

        if (gameRunning === true) {
            [...e.changedTouches].forEach((touch) => {
                console.log(e);
                const dot = document.querySelectorAll(`#dot_${touch.identifier}`);
                dot.forEach((dot) => {
                    dot.classList.remove('orbit-in')
                    dot.classList.add('orbit-out')
                    dot.addEventListener('animationend', () => {
                        dot.remove();
                    })
                });
            });
            if ([...e.touches].length <= currentNumOfLosers) {
                endCountdown()
            }
        }
    });
});


var interval

function startCountdown() {
    let countdown = 3;
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(function () {
        if (countdown <= 0) {
            old_number = document.getElementById('id_' + (countdown + 1))
            if (document.body.contains(old_number)) {
                old_number.classList.add('vanish')
                old_number.addEventListener('animationend', () => {

                    endGame()
                })
            }
        }
        else {
            number = document.createElement('div')
            number.innerHTML = countdown
            number.id = 'id_' + countdown
            number.classList.add('shrink', 'number')
            numberContainer.append(number)
            old_number = document.getElementById('id_' + (countdown + 1))
            if (document.body.contains(old_number)) {
                old_number.classList.add('vanish')
            }
        }
        countdown--;
    }, 1000);
}

function endCountdown() {
    document.querySelectorAll('.number').forEach((number) => {
        number.remove()
    })
    clearInterval(interval);
}

//TODO: HIER MÜSSEN DIE DOTS NOCH ENTFERNT WERDEN UND MEHRERE LOSERS HERVORGEHOBEN WERDEN!
function endGame() {
    endCountdown();
    gameRunning = false;
    dots = document.querySelectorAll('.dot');
    var dotsArr = Array.prototype.slice.call(dots);
    losers = []
    for (var i = 0; i < currentNumOfLosers; i++) {
        losers.push(dotsArr.sort(function () { return 0.5 - Math.random(); }).pop());
    }

    dotsArr.forEach((dot) => {
        dot.classList.add('orbit-out');
        dot.classList.remove('orbit-in');
    })
    losers.forEach((dot) => {
        dot.classList.add('orbit-grow');
        dot.classList.remove('orbit-in');
    })
    setTimeout(
        function () {
            document.getElementById('btnRestart').style.display = 'block';
            document.getElementById('bg-text').style.display = 'none';
        }, 2000);

}

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }

function isMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };