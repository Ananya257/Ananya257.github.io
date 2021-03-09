
let f1 = document.getElementById("f1");
f1.addEventListener("click",function(){move(f1)})
let i1 = document.getElementById("i1");
i1.addEventListener("click",function(){moveIn(f1)})

let f2 = document.getElementById("f2");
f2.addEventListener("click",function(){move(f2)})
let i2 = document.getElementById("i2");
i2.addEventListener("click",function(){moveIn(f2)})

let f3 = document.getElementById("f3");
f3.addEventListener("click",function(){move(f3)})
let i3 = document.getElementById("i3");
i3.addEventListener("click",function(){moveIn(f3)})

let f4 = document.getElementById("f4");
f4.addEventListener("click",function(){move(f4)})
let i4 = document.getElementById("i4");
i4.addEventListener("click",function(){moveIn(f4)})

let f5 = document.getElementById("f5");
f5.addEventListener("click",function(){move(f5)})
let i5 = document.getElementById("i5");
i5.addEventListener("click",function(){moveIn(f5)})

let f6 = document.getElementById("f6");
f6.addEventListener("click",function(){move(f6)})
let i6 = document.getElementById("i6");
i6.addEventListener("click",function(){moveIn(f6)})


function move(front){
    front.style.left = '1250';
}
function moveIn(front){
    front.style.left = '900';
}

let currentPos = 0
let targetPos = 0
let ease = 0.075
// Utility variables for `requestAnimationFrame`
let rafId = undefined
let rafActive = false
let container = document.querySelector('.container')

let projects = Array.prototype.slice.call(document.querySelectorAll('.insideC,.fgC'))

let windowW, containerH, imageH

let translateXMax = -200



function easeOut(t) {
    return t * (2 - t)
}


function setTransform (pro, transform) {
    pro.style.transform = transform
    pro.style.WebkitTransform = transform
}

let scroll = document.createElement('div')
scroll.className = 'scroll'
document.body.appendChild(scroll)

//window.addEventListener('resize', setup)
setUp()

function setUp() {
    windowW = window.innerWidth
    containerH = container.getBoundingClientRect().height
    imageH = containerH / (windowW > 760 ? projects.length / 2 : projects.length)
// Set `height` for the scroll element
    scroll.style.height = containerH + 'px'
    startAn();
}

function startAn() {
    if (!rafActive) {
        rafActive = true
        rafId = requestAnimationFrame(updateAn)
    }
}

function updateAn(){
    let difference = targetPos - currentPos;
    let delta = difference*ease
    if(Math.abs(difference)<0.1){
        delta = 0;
    }
    if (delta) {
        currentPos += delta
        // Round value for better performance
        currentPos = parseFloat(currentPos.toFixed(2))
        rafId = requestAnimationFrame(updateAn)
    }
    else {
        currentPos = targetPos
        rafActive = false
        cancelAnimationFrame(rafId)
    }
    //updateAnProjects()
    setTransform(container, 'translateY('+ -currentPos +'px)')
}


function updateScroll () {
    targetPos = window.scrollY || window.pageYOffset
    startAn()
}
window.addEventListener('scroll', updateScroll)
