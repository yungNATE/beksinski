var mat;
var scene;
var camera;
var renderer;
var frustumSize;

let minimum = -0.01;
let maximum = 0.99;
const CANTEXCEEDVALUE = 3;
let resetMinMax = function() { minimum = -0.01; maximum = 0.99;}
let lockCleanTransition = function() { resetMinMax(); deformation = 0;}
// on click on enter key, call lockCleanTransition
document.addEventListener('keydown', (event) => {
	if(event.key == "Enter") {
		console.log("Valeurs bloquées !");
		lockCleanTransition();
	}
});


let deformation = .01;
let leftLocked = false;
let rightLocked = false;

let leftFirst = true;
let rightFirst = true;



let liquidEffect2 = function() {

	console.info(`INFORMATION
-----------
Pour profiter de l'effet de déformation de base, sans qu'il n'augmente, vous pouvez utiliser la touche "Entrée" pour réinitialiser et bloquer les valeurs.
	`);
	
	let threeScript = document.createElement('script');
	threeScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js");
    document.head.appendChild(threeScript);
    
	threeScript.addEventListener('load', function() {
		loadCanvas();

		let canvas = document.querySelector('#desperateCanvas');
		canvas.addEventListener("mousemove", e => onMoveDesperate(e));
		
		
		let pagePrecedente = window.frames.top.document.referrer.split("/").pop().split(".")[0];
		let onMoveDesperate = (e) => { 	
			// based on pointer position, determine the value of the transition, value should between minimum and maximum
			let value = (e.clientX - 0) * (maximum - minimum) / (window.innerWidth - 0) + minimum;
			
			// console.log(value);

			let approxBorder = 150;
			
			// if pointer near the left edge, decrease maximum value
			if (e.clientX < approxBorder && (!leftLocked)) {
				
				if (!leftFirst){
					maximum += (deformation*=2);
					leftLocked = true;
					rightLocked = false;
				} 
				leftFirst = false;

				if(pagePrecedente == "cold_after" && Math.abs(minimum) >= CANTEXCEEDVALUE){
					window.location.href = "hot.html";
				}

			}
			// if pointer near the right edge, increase minimum value
			if (e.clientX > window.innerWidth - approxBorder && (!rightLocked)) {

				if (!rightFirst){
					minimum -= (deformation*=2);
					rightLocked = true;
					leftLocked = false;
				} 
				rightFirst = false;

				if(pagePrecedente == "hot" && Math.abs(maximum) >= CANTEXCEEDVALUE){
					window.location.href = "cold.html";
				}
			}

			
			mat.uniforms.dispFactor.value = Math.round(value * 100) / 100
		};
	});


}
window.addEventListener('load', liquidEffect2);

function loadCanvas () {
	window.addEventListener("resize", onWindowResize);
	frustumSize = 600;
	var aspect = window.innerWidth / window.innerHeight;
	var aspect = 1;
	var clock = new THREE.Clock(true);
	scene = new THREE.Scene();
	camera = new THREE.OrthographicCamera(
		(frustumSize * aspect) / -2,
		(frustumSize * aspect) / 2,
		frustumSize / 2,
		frustumSize / -2,
		1,
		1000
	);
	camera.lookAt(scene.position);
	camera.position.z = 1;
	renderer = new THREE.WebGLRenderer( { alpha: true } );
	renderer.setPixelRatio = 1;
	renderer.domElement.id = 'desperateCanvas';
	renderer.setClearColor( 0x000000, 0 );
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	var parent = document.body;
	function onWindowResize() {
		// var aspect = window.innerWidth / window.innerHeight;
        aspect = 1;
		camera.left = (frustumSize * aspect) / -2;
		camera.right = (frustumSize * aspect) / 2;
		camera.top = frustumSize / 2;
		camera.bottom = frustumSize / -2;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	var addToGPU = function (t) {
		renderer.setTexture2D(t, 0);
	};
	var loader = new THREE.TextureLoader();
	loader.crossOrigin = "";
	var texture1 = loader.load(
		// "https://robindelaporte.fr/codepen/loader/0.png",
		"media/img/hug.jpg",
		function (texture) {
			addToGPU(texture);
		}
	);
	var texture2 = loader.load(
		// "https://robindelaporte.fr/codepen/loader/10.png",
		"media/img/hug-wall.jpg",
		
		function (texture) {
			addToGPU(texture);
		}
	);
	// var disp = loader.load("https://robindelaporte.fr/codepen/loader/fluid.jpg");
	var disp = loader.load("media/img/heightMap.png");
	disp.wrapS = disp.wrapT = THREE.RepeatWrapping;
	mat = new THREE.ShaderMaterial({
		uniforms: {
			time: { type: "f", value: 1.0 },
			angle1: { type: "f", value: Math.PI / 4 },
			angle2: { type: "f", value: -(Math.PI / 4) * 3.0 },
			random: { type: "f", value: 0.0 },
			dispFactor: { type: "f", value: 0.0 },
			texture: { type: "t", value: texture1 },
			texture2: { type: "t", value: texture2 },
			disp: { type: "t", value: disp },
			res: {
				type: "vec4",
				value: new THREE.Vector4(parent.offsetWidth, parent.offsetHeight, 1.0, 1.0)
			}
		},
		vertexShader: document.getElementById("vertexShader").textContent,
		fragmentShader: document.getElementById("fragmentShader").textContent,
		transparent: true,
		opacity: 1.0
	});
	geometry = new THREE.PlaneBufferGeometry(600, 600, 1);
	var object = new THREE.Mesh(geometry, mat);
	scene.add(object);
	var animate = function () {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
		var d = clock.getDelta();
		mat.uniforms.time.value += d;
	};
	animate(); 
	// this.GUI = new dat.GUI(); this.GUI.add(mat.uniforms.dispFactor, "value", 0, 1, 0.01).name("transition");
	// this.GUI = new dat.GUI(); this.GUI.add(mat.uniforms.dispFactor, "value", -1, 2, 0.01).name("transition"); // effet vachement cool !!

	
}