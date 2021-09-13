import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
// const gui = new dat.GUI()

// Canvas
//creating canvas 
const canvas = document.querySelector('canvas.webgl')

// Scene
//creating scene
const scene = new THREE.Scene()

// Objects
//creating object 
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

// Materials
//creating object material 
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.8
material.roughness = 0.1
material.color = new THREE.Color(0xffc0cb)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.set(-5, -1, 7)
scene.add(pointLight)
//second light
const pointLight2 = new THREE.PointLight(0xffff00, 5)
pointLight2.position.set(1, 0.5, 1)
pointLight2.intensity = 3
scene.add(pointLight2)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 0, 1.2)
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener("mousemove", onDocumnetMouseMove)
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumnetMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * 0.002
    targetY = mouseY * 0.002


    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.6 * elapsedTime
    sphere.rotation.y += 0.6* (targetX - sphere.rotation.y)
    sphere.rotation.x += 0.6 * (targetY - sphere.rotation.x)
    sphere.rotation.z += 0.6 * (targetY - sphere.rotation.x)


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()