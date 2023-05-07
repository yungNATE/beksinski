// TODO : Refactor ce code de merde

var mat;
var scene;
var camera;
var renderer;
var frustumSize;
const SIZE = 1000;

let liquidEffect2 = function() {
	
	script = document.querySelector('#script1');
	script.addEventListener('load', function() {
		loadCanvas();

		document.querySelector('#liquidEffect2canvas').addEventListener("mousemove", function (e) { 
			currentCanvasPos = e.clientX / SIZE;


			mat.uniforms.dispFactor.value = Math.round(currentCanvasPos * 100) / 100
		});

		/* addEventListener("mousemove", function (e) { // TODO : si valeur > 1 et < 0 sont retenues, changer le calcul ici
			screenSize = window.innerWidth
			screenCenter = screenSize / 2
			mousePos = e.clientX
			mousePosCentered = mousePos - screenCenter
			mousePosCanvas = mousePosCentered + camera.right
			canvasSize = camera.right * 2

			
			// j'aimerais que cette condition me donne les coord.
			// exactes de l'image rendue.
			// --
			// En gros if(hoverImage()){ mat.uniforms.dispFactor.value = % de la taille totale de l'image rendue en fct de la pos de mon pointeur
			if( e.clientX > screenCenter + camera.left &&
				e.clientX < screenCenter + camera.right 
			){
				
				console.log(camera.left	);
			
				// currentCanvasPos = mousePosCanvas / canvasSize;


				// mat.uniforms.dispFactor.value = Math.round(currentCanvasPos * 100) / 100
				// console.log(mat.uniforms.dispFactor.value);
			}
		}); */

	});
	script.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js");


}
window.addEventListener('load', liquidEffect2);

function loadCanvas () {
	// window.addEventListener("resize", onWindowResize);
	frustumSize = 600;
	var aspect = window.innerWidth / window.innerHeight;
	var aspect = SIZE / SIZE;
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
	renderer.domElement.id = 'liquidEffect2canvas';
	renderer.setClearColor( 0x000000, 0 );
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	var parent = document.body;
	function onWindowResize() {
		var aspect = window.innerWidth / window.innerHeight;
		camera.left = (-frustumSize * aspect) / 2;
		camera.right = (frustumSize * aspect) / 2;
		camera.top = frustumSize / 2;
		camera.bottom = -frustumSize / 2;
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
		"../../beksinski/media/img/hug.jpg",
		function (texture) {
			addToGPU(texture);
		}
	);
	var texture2 = loader.load(
		// "https://robindelaporte.fr/codepen/loader/10.png",
		"../../beksinski/media/img/hug-wall.jpg",
		
		function (texture) {
			addToGPU(texture);
		}
	);
	// var disp = loader.load("https://robindelaporte.fr/codepen/loader/fluid.jpg");
	var disp = loader.load("../js/libs/hover-effect/images/heightMap.png");
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
	this.GUI = new dat.GUI(); this.GUI.add(mat.uniforms.dispFactor, "value", -1, 2, 0.01).name("transition"); // effet vachement cool !!

	
}

