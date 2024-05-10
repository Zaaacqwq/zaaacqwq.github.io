import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

//Set Up the Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sphereTexture = createCircleTexture("#646cffaa", 128);

// Sphere
const particlesCount = 1000; // Number of particles
const geometry = new THREE.BufferGeometry();
const positions = [];
const radius = 250; // Radius of the sphere

for (let i = 0; i < particlesCount; i++) {
    // Spherical coordinates
    const phi = Math.acos(-1 + (2 * i) / particlesCount);
    const theta = Math.sqrt(particlesCount * Math.PI) * phi;

    // Convert spherical to Cartesian coordinates
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    positions.push(x, y, z);
}
geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
);

const sphereMaterial = new THREE.PointsMaterial({
    size: 7.5,
    map: sphereTexture,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
});
const particleSystem = new THREE.Points(geometry, sphereMaterial);
scene.add(particleSystem);

// Ring
const ringParticlesCount = 10000;
const ringGeometry = new THREE.BufferGeometry();
const ringPositions = [];
const ringRadius = 450; // Radius of the ring
const ringWidth = 100; // Width of the ring in the plane
const ringThickness = 2; // Minimal thickness of the ring

for (let i = 0; i < ringParticlesCount; i++) {
    const theta = Math.random() * Math.PI * 2; // Angle around the ring
    // Distribute particles within the ring's width
    const radiusOffset = (Math.random() - 0.5) * ringWidth; // Offset from the ring's central radius
    const x = Math.cos(theta) * (ringRadius + radiusOffset);
    const y = (Math.random() - 0.5) * ringThickness; // Very small variation for thickness
    const z = Math.sin(theta) * (ringRadius + radiusOffset);
    ringPositions.push(x, y, z);
}
ringGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(ringPositions, 3)
);

const ringTexture = createCircleTexture("#646cffaa", 64);
const ringMaterial = new THREE.PointsMaterial({
    size: 2,
    map: ringTexture,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
});
const ringParticleSystem = new THREE.Points(ringGeometry, ringMaterial);
scene.add(ringParticleSystem);

// Stars
const starsCount = 50000; // Increase or decrease based on desired density
const starsGeometry = new THREE.BufferGeometry();
const starPositions = [];

// Assuming the scene size, adjust as necessary
const spaceSize = 2500;

for (let i = 0; i < starsCount; i++) {
    const x = THREE.MathUtils.randFloatSpread(spaceSize);
    const y = THREE.MathUtils.randFloatSpread(spaceSize);
    const z = THREE.MathUtils.randFloatSpread(spaceSize);

    starPositions.push(x, y, z);
}
starsGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starPositions, 3)
);

const starTexture = createCircleTexture("#ffffff", 64);
const starsMaterial = new THREE.PointsMaterial({
    size: 0.7,
    map: starTexture,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
});
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);


// Texture
function createCircleTexture(color, size) {
    const matCanvas = document.createElement("canvas");
    matCanvas.width = matCanvas.height = size;
    const matContext = matCanvas.getContext("2d");
    // Create a circle
    const center = size / 2;
    matContext.beginPath();
    matContext.arc(center, center, size / 2, 0, 2 * Math.PI, false);
    matContext.closePath();
    matContext.fillStyle = color;
    matContext.fill();
    // Create texture
    return new THREE.CanvasTexture(matCanvas);
}


// Set Up the Camera
// const controls = new OrbitControls(camera, renderer.domElement);


// Glow Effect
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    2.0,
    0.1,
    0.1
);
composer.addPass(bloomPass);



// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    particleSystem.rotation.y += 0.00025;
    ringParticleSystem.rotation.y += 0.00025;

    starField.rotation.x += 0.00005;
    starField.rotation.y += 0.00005;

    TWEEN.update();
    // controls.update();
    composer.render();
    // renderer.render(scene, camera);

    
}

animate();

// Resize Event
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

// Function to update camera position
function updateCameraPosition(newX, newY, newZ) {
    // Create a new tween for the camera's position
    new TWEEN.Tween(camera.position)
        .to({
            x: newX,
            y: newY !== undefined ? newY : camera.position.y, // If newY is provided, use it, otherwise keep current Y
            z: newZ !== undefined ? newZ : camera.position.z, // If newZ is provided, use it, otherwise keep current Z
        }, 1500) // 1000 milliseconds = 1 second for the transition
        .easing(TWEEN.Easing.Quadratic.InOut) // This easing is smooth start and end, but you can choose others
        .start(); // Start the tween
}

camera.position.x = 600;
camera.position.y = 125;
camera.position.z = 400;

camera.rotateX(-0.25);


// Attach the updateCameraPosition function to the window object
window.updateCameraPosition = updateCameraPosition;