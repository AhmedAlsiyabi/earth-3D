import * as THREE from "/build/three.module.js";
console.log(THREE);
import { OrbitControls } from "/jsm/controls/OrbitControls.js";
//to chech and show the fbs
import Stats from "/jsm/libs/stats.module.js";
const stats = Stats();
document.body.appendChild(stats.dom);
const canvas = document.querySelector(".webgl");
let scene;
let camera;
let renderer;
//create the scene
scene = new THREE.Scene();
// set up the camera

let fieldOfVeiw = 60;
let aspect = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 1000;
camera = new THREE.PerspectiveCamera(fieldOfVeiw, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

// rendering all the requirment and put it together

renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  anyialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor = (0x000000, 0.0);
const control = new OrbitControls(camera, renderer.domElement);
// build art structure

const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
  roughness: 1,
  meralness: 0,
  map: THREE.ImageUtils.loadTexture("texture/earthmap1k.jpg"),
  bumpMap: THREE.ImageUtils.loadTexture("texture/earthbump.jpg"),
  bumpScale: 0.3,
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
//create cloud Mesh
const cloudGeometry = new THREE.SphereGeometry(0.62, 32, 32);
const cloudMaterial = new THREE.MeshPhongMaterial({
  map: THREE.ImageUtils.loadTexture("texture/earthCloud.png"),
  transparent: true,
});
// create star and space
const starGeometry = new THREE.SphereGeometry(80, 50, 50);
const starMaterial = new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture("texture/galaxy.png"),
  side: THREE.BackSide,
});
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);
scene.add(earthMesh);
scene.add(starMesh);

// create light source
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointlight = new THREE.PointLight(0xffffff, 1);
pointlight.position.set(5, 3, 5);
scene.add(pointlight);
window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / window.innerHeight);
    render();
  },
  false,
);
// the render should be in the End to Rebder all thnigs
const animate = () => {
  requestAnimationFrame(animate);
  earthMesh.rotation.y -= 0.0015;
  cloudMesh.rotation.y -= 0.001;
  starMesh.rotation.y -= 0.0001;
  control.update();
  render();
  stats.update();
};
const render = () => {
  renderer.render(scene, camera);
};

animate();
