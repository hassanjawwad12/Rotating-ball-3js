import * as THREE from 'three'
import {OrbitControls} from 'jsm/controls/OrbitControls.js'

const w = window.innerWidth;
const h = window.innerHeight-1;
const renderer= new THREE.WebGLRenderer({antialias: true})
renderer.setSize(w, h) 

document.body.appendChild(renderer.domElement);
 
const fov= 75
const aspect= w/h
const near=0.1
const far =10
const camera= new THREE.PerspectiveCamera(fov,aspect,near,far)
camera.position.z=2 

//for moving with cursor and zooming around 
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamoing = true
controls.dampingFactor =0.03

const scene= new THREE.Scene()
const torusGeometry = new THREE.TorusGeometry(1, 0.5, 8, 16); // Adjust parameters as needed
const geo= new THREE.IcosahedronGeometry(1.0,2)

//you can use basic material but it does not work with light
const mat= new THREE.MeshStandardMaterial(
    {color:0xffffff,
    flatShading:true
    }
)
const mesh = new THREE.Mesh(geo,mat)
scene.add(mesh)

const wireMat = new THREE.MeshBasicMaterial ( {
    color: 0xffffff,
    wireframe: true
})

const wiremesh = new THREE.Mesh(geo,wireMat)

//to make the rotation less flickery we add 
wiremesh.scale.setScalar(1.001)
mesh.add(wiremesh)

const hemilight = new THREE.HemisphereLight(0x0099ff,0xaa5500)
scene.add(hemilight)

function animate (t=0) {
    requestAnimationFrame(animate)
  //  mesh.scale.setScalar(Math.cos(t*0.001)+1.0)
    mesh.rotation.y=t*0.0001
    renderer.render(scene,camera) 
    controls.update()
}

animate()

