let currentPos = 0
let targetPos = 0
let ease = 0.075
// Utility variables for `requestAnimationFrame`
let rafId = undefined
let rafActive = false
let container = document.querySelector('.container')

let projects = Array.prototype.slice.call(document.querySelectorAll('.proj'))

let windowW, containerH, imageH
let rotateXMaxList = []
let rotateYMaxList = []
let translateXMax = -200


projects.forEach(function () {
    rotateXMaxList.push(8)
    rotateYMaxList.push(-8)
})

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
    updateAnProjects()
    setTransform(container, 'translateY('+ -currentPos +'px)')
}


function updateScroll () {
    targetPos = window.scrollY || window.pageYOffset
    startAn()
}
window.addEventListener('scroll', updateScroll)

//function referenced to know how to rotate and animate an image while scrolling
function updateAnProjects () {
    let ratio = currentPos / imageH
    // Some variables for using in the loop
    let intersectionRatioIndex, intersectionRatioValue, intersectionRatio
    let rotateX, rotateXMax, rotateY, rotateYMax, translateX

    // For each `image` element, make calculations and set CSS `transform` accordingly
    projects.forEach(function (image, index) {
        // Calculating the `intersectionRatio`, similar to the value provided by
        // the IntersectionObserver API
        intersectionRatioIndex = windowW > 760 ? parseInt((index / 2)) : index
        intersectionRatioValue = ratio - intersectionRatioIndex
        intersectionRatio = Math.max(0, 1 - Math.abs(intersectionRatioValue))
        // Calculate the `rotateX` value for the current `image`
        rotateXMax = rotateXMaxList[index]
        rotateX = rotateXMax - (rotateXMax * intersectionRatio)
        rotateX = rotateX.toFixed(2)
        // Calculate the _`rotateY`_ value for the current _`image`_
        rotateYMax = rotateYMaxList[index]
        rotateY = rotateYMax - (rotateYMax * intersectionRatio)
        rotateY = rotateY.toFixed(2)
        // Calculate the `translateX` value for the current `image`
        if (windowW > 760) {
            translateX = translateXMax - (translateXMax * easeOut(intersectionRatio))
            translateX = translateX.toFixed(2)
        } else {
            translateX = 0
        }
        // Invert `rotateX` and `rotateY` values in case the image is below the center of the viewport
        // Also update `translateX` value, to achieve an alternating effect
        if (intersectionRatioValue < 0) {
            rotateX = -rotateX
            rotateY = -rotateY
            translateX = index % 2 ? -translateX : 0
        } else {
            translateX = index % 2 ? 0 : translateX
        }
        // Set the CSS `transform`, using calculated values
        setTransform(image, 'perspective(500px) translateX('+ translateX +'px) rotateX('+ rotateX +'deg) rotateY('+ rotateY +'deg)')
    })
}


// scratching cover and revealing img of project
let name;
let boxCanvas;
let xCanvas;
let yCanvas;
//reveal();

function reveal(){
    let idq = ['first','sec','third','four','five','six']
    name= []
    for(let i=0;i<6;i++){
    name[i] = document.getElementById(idq[i])
    boxCanvas = name[i].getContext('2d')

    let card = new Image()
    card.src = "projFront.png"

    card.onload = function (){
        boxCanvas.drawImage(card, 0, 0, name[i].width, name[i].height)
    }
}

let xpos,ypos;
    name[0].addEventListener("mousemove",function (event){
        xpos = event.clientX;
        ypos = event.clientY;
        //need to know if we detect left button or not
        //if(leftButton()){
        getCoorwrtCanvas(xpos,ypos)
        //console.log(xCanvas,yCanvas)
            scratch(xCanvas,yCanvas);
        //}
    })
    name[1].addEventListener("mousemove",function (event){
        xpos = event.clientX;
        ypos = event.clientY;
        //need to know if we detect left button or not
        //if(leftButton()){
        getCoorwrtCanvas(xpos,ypos)
        //console.log(xCanvas,yCanvas)
        scratch(xCanvas,yCanvas);
        //}
    })
    name[2].addEventListener("mousemove",function (event){
        xpos = event.clientX;
        ypos = event.clientY;
        //need to know if we detect left button or not
        //if(leftButton()){
        getCoorwrtCanvas(xpos,ypos)
        //console.log(xCanvas,yCanvas)
        scratch(xCanvas,yCanvas);
        //}
    })
    name[3].addEventListener("mousemove",function (event){
        xpos = event.clientX;
        ypos = event.clientY;
        //need to know if we detect left button or not
        //if(leftButton()){
        getCoorwrtCanvas(xpos,ypos)
        //console.log(xCanvas,yCanvas)
        scratch(xCanvas,yCanvas);
        //}
    })
    name[4].addEventListener("mousemove",function (event){
        xpos = event.clientX;
        ypos = event.clientY;
        //need to know if we detect left button or not
        //if(leftButton()){
        getCoorwrtCanvas(xpos,ypos)
        //console.log(xCanvas,yCanvas)
        scratch(xCanvas,yCanvas);
        //}
    })
    name[5].addEventListener("mousemove",function (event){
        xpos = event.clientX;
        ypos = event.clientY;
        //need to know if we detect left button or not
        //if(leftButton()){
        getCoorwrtCanvas(xpos,ypos)
        //console.log(xCanvas,yCanvas)
        scratch(xCanvas,yCanvas);
        //}
    })


}

function leftButton(){

}
function getCoorwrtCanvas(xpos,ypos){
    let canvasDimen = name.getBoundingClientRect()
    xCanvas = xpos - canvasDimen.left
    yCanvas = ypos - canvasDimen.top
    xCanvas = Math.floor((xpos - canvasDimen.left) / (canvasDimen.right - canvasDimen.left) * name.width)
    yCanvas = Math.floor((ypos - canvasDimen.top) / (canvasDimen.bottom - canvasDimen.top) * name.height)
    console.log(canvasDimen.left,canvasDimen.top,xCanvas,yCanvas)
}
function scratch(xpos,ypos){
    boxCanvas.beginPath();
    boxCanvas.arc(xpos, ypos, 20 , 0, 2*Math.PI, true);
    boxCanvas.fillStyle = '#000';
    boxCanvas.globalCompositeOperation = "destination-out";
    boxCanvas.fill();
}





