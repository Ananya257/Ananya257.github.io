let renderer, scene, camera
let width, height, cx, cy, wWidth, wHeight;

const loader = new THREE.TextureLoader();

let conf = {
    color: 0xffffff,
    objectWidth: 10,
    objectHeight: 10,
    objectThickness: 3,
    ambientColor: 0x808080,
    light1Color: 0xffffff,
    shadow: false,
    perspective: 75,
    cameraZ: 75,
};

let objects = [];
let geometry, material;
let hMap,nx, ny;


renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('reveal-effect'), antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 75;

scene = new THREE.Scene();
geometry = new THREE.BoxGeometry(conf.objectWidth, conf.objectHeight, conf.objectThickness);

//window.addEventListener('load', initScene);
//document.getElementById('trigger').addEventListener('click', initScene);
initScene();
animate();
document.getElementById('nameid').addEventListener('click', function(event){
    //event.preventDefault();
    startAnim();
    /*setTimeout(function () {
        window.location.href = "index.html"; //will redirect to your blog page (an ex: blog.html)
    }, 3000);*/
    //homepg()
    //document.getElementById("main").style.backgroundImage = url("bg1.jpg");
    document.getElementById("homeAna").style.display = 'block';
    document.getElementById("mic").style.display = 'block';
    document.getElementById("play").style.display = 'block';
    let info = new TypeWriter(document.getElementById('initial'),["Hi! I am Ananya Singh."],3000)
    info.type()
});

function initScene() {
    onResize();
    scene = new THREE.Scene();
    Lights();
    initObjects();
}

function Lights() {
    scene.add(new THREE.AmbientLight(conf.ambientColor));
    let light = new THREE.PointLight(0xffffff);
    light.position.z = 100;
    scene.add(light);
}

function initObjects() {
    objects = [];
    nx = Math.round(wWidth / conf.objectWidth) + 1;
    ny = Math.round(wHeight / conf.objectWidth) + 1;
    let mesh, x, y;
    for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
            material = new THREE.MeshLambertMaterial({ color: '#EF959D', transparent: true, opacity: 1 });
            /*material = new THREE.MeshBasicMaterial({
                  map: loader.load("texture.jpg"),
              });*/
            mesh = new THREE.Mesh(geometry, material);
            x = -wWidth / 2 + i * conf.objectWidth;
            y = -wHeight / 2 + j * conf.objectWidth;
            mesh.position.set(x, y, 0);
            objects.push(mesh);
            scene.add(mesh);
        }
    }
    document.body.classList.add('loaded');
    //startAnim();
}

function startAnim(event) {
    document.body.classList.remove('revealed');
    objects.forEach(mesh => {
        mesh.rotation.set(0, 0, 0);
        mesh.material.opacity = 1;
        mesh.position.z = 0;
        let delay = THREE.Math.randFloat(1, 2);
        let rx = THREE.Math.randFloatSpread(2 * Math.PI);
        let ry = THREE.Math.randFloatSpread(2 * Math.PI);
        let rz = THREE.Math.randFloatSpread(2 * Math.PI);
        TweenMax.to(mesh.rotation, 2, { x: rx, y: ry, z: rz, delay: delay });
        TweenMax.to(mesh.position, 2, { z: 80, delay: delay + 0.5, ease: Power1.easeOut });
        TweenMax.to(mesh.material, 2, { opacity: 0, delay: delay + 0.5 });
    });
    setTimeout(() => {
        document.body.classList.add('revealed');
    }, 4500);

    document.getElementById("overlay").style.display = "none";
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

function onResize() {
    width = window.innerWidth;
    cx = width / 2;
    height = window.innerHeight;
    cy = height / 2;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    let size = getRendererSize();
    wWidth = size[0];
    wHeight = size[1];
}

function getRendererSize() {
    const cam = new THREE.PerspectiveCamera(75, camera.aspect);
    const vFOV = cam.fov * Math.PI / 180;
    const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
    const width = height * cam.aspect;
    return [width, height];
}


    let fullTxt;
    let typeSpeed
    let txt = ''
    let txtElement;


    class TypeWriter {
        constructor(txt, words, wait = 3000) {
            txtElement = txt;
            this.words = ["Hi! I am Ananya Singh. <br> All fired up? <br> Say HOORAY to know more about me!"];
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);

        }

        type() {


            if(this.wordIndex<this.words.length) {
                //console.log(this.words.length)
                //console.log(index)
                fullTxt = this.words[this.wordIndex];
                //console.log(fullTxt)

                txt = fullTxt.substring(0, txt.length + 1);


                // Insert txt into element
                if(txt!=='<') {
                    txtElement.innerHTML = `<span class="txt">${txt}</span>`;
                }

                // Initial Type Speed
                typeSpeed = 150;

                if (txt.length == fullTxt.length) {
                    this.wordIndex++;
                    //typeSpeed =200;
                }

                setTimeout(() => this.type(), typeSpeed);
            }
        }

        static aboutMe() {
            //current text vanishes
            // setTimeout('("#initial").fadeOut("slow")', 5000)
            /*console.log(fullTxt)
            console.log(txt)
            txt = fullTxt.substring(0, txt.length - 1);
            fullTxt = fullTxt.substring(0, fullTxt.length - 1);
            console.log(fullTxt.length);
            txtElement.innerHTML = `<span class="txt">${txt}</span>`;
            setTimeout(() => this.aboutMe(), typeSpeed);*/
            document.getElementById('initial').style.display = 'none';
            document.getElementById('m').style.display = 'block';
        }
    }


// Init On DOM Load
    document.addEventListener('DOMContentLoaded', init);

// Init App
    function init() {
        const txtElement = document.querySelector('.textType');
        const words = JSON.parse(txtElement.getAttribute('words'));
        const wait = txtElement.getAttribute('waitText');
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }

    var mic
    var vol = 0

    function setup() {
        //createCanvas(windowWidth, windowHeight);
        // Create an Audio input
        mic = new p5.AudioIn();
        // start the Audio Input.
        // By default, it does not .connect() (to the computer speakers)

    }

    function draw() {
        document.getElementById("mic").addEventListener("click", function (){
            document.getElementById("mic").src = "mic.png";
            mic.start();
        });
        var vol = mic.getLevel();
        console.log(vol);

        if (vol > 0.5) {
            noLoop();
            TypeWriter.aboutMe();
        }


        var h = map(vol, 0, 0.5, height, 0);

    }

    function touchStarted() {
        if (p5.prototype.getAudioContext().state !== 'running') {
            p5.prototype.getAudioContext().resume();
        }
    }

    document.getElementById("play").addEventListener("click", ballNextTab);


    function ballNextTab() {
        document.getElementById('homeAna').style.display = 'none';

        let Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composites = Matter.Composites,
            Events = Matter.Events,
            Constraint = Matter.Constraint,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            World = Matter.World,
            Bodies = Matter.Bodies;

        let engine = Engine.create(),
            world = engine.world;
        engine.world.gravity.y = 0;
        document.getElementById('ball').style.display = 'block';
        var canvas = document.getElementById('ball');
        canvas.width  = 1000;
        canvas.height = 1000;
        canvas.style.backgroundColor ="#001933";
        let render = Render.create({
            element: document.body,
            canvas: canvas,
            engine: engine,
            options: {
                width: 1000,
                height: 1000,
                wireframes:false,
                background: '#001933'

                //top: 0
            }

        });

        Render.run(render);

        let runner = Runner.create();
        Runner.run(runner, engine);

        let rockOptions = { density: 0.004 },
            rock = Bodies.polygon(500, 750, 8, 20, rockOptions),
            anchor = { x: 500, y: 750 },
            elastic = Constraint.create({
                pointA: anchor,
                bodyB: rock,
                stiffness: 0.05
            });
        let block1 = Bodies.rectangle(200, 100, 200, 40,{
            render: {
                sprite: {
                    texture: 'pr.png'
                }
            }
            });
        let block2 = Bodies.rectangle(800, 100, 200, 40, {
            render: {
                sprite: {
                    texture: 'sk.png'
                }
            }
        });
        World.add(engine.world, [rock, elastic,block1,block2]);


        Events.on(engine, 'afterUpdate', function() {
            if (mouseConstraint.mouse.button === -1 && (rock.position.x > 600 || rock.position.y < 700)) {
                rock = Bodies.polygon(500, 750, 7, 20, rockOptions);
                World.add(engine.world, rock);
                elastic.bodyB = rock;
            }
            if(block1.position.x!=200 || block1.position.y!=100){
                window.location.href = "projects.html";
            }
            if(block2.position.x!=800 || block2.position.y!=100){
                window.location.href = "skills.html";
            }
        });

        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        World.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;





    }


