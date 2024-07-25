import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight - 1;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// for moving with cursor and zooming around
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const scene = new THREE.Scene();

// Load your texture
const texture = new THREE.TextureLoader().load('/play.jpg');  

// Material with texture
const material = new THREE.MeshBasicMaterial({
  map: texture,
});

const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 2), material);
scene.add(mesh);

const hemilight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemilight);

function animate(t = 0) {
  requestAnimationFrame(animate);
  mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
  controls.update();
}

animate();
