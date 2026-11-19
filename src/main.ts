import * as THREE from 'three';

// M0: 빈 3D 마을. 파스텔 잔디 타일, 집 한 채, 플레이어 한 명, 45도 추적 카메라.
const app = document.getElementById('app')!;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x89f7fe);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const sun = new THREE.DirectionalLight(0xfffde7, 0.75);
sun.position.set(12, 20, 14);
scene.add(sun);

// 바닥 타일 (광장은 크림색, 바깥은 잔디색)
const tileGeo = new THREE.BoxGeometry(0.96, 0.4, 0.96);
const grassMat = new THREE.MeshLambertMaterial({ color: 0x9ccc65 });
const plazaMat = new THREE.MeshLambertMaterial({ color: 0xfff3e0 });
for (let z = -7; z <= 7; z++) {
  for (let x = -7; x <= 7; x++) {
    const plaza = Math.abs(x) <= 3 && Math.abs(z) <= 3;
    const tile = new THREE.Mesh(tileGeo, plaza ? plazaMat : grassMat);
    tile.position.set(x, -0.2, z);
    scene.add(tile);
  }
}

// 집 한 채 (임시 도형, 나중에 GLB 모델로 교체)
const house = new THREE.Group();
const walls = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.0, 1.3), new THREE.MeshLambertMaterial({ color: 0xfff8e1 }));
walls.position.y = 0.5;
const roof = new THREE.Mesh(new THREE.ConeGeometry(1.25, 0.8, 4), new THREE.MeshLambertMaterial({ color: 0xff7043 }));
roof.position.y = 1.4;
roof.rotation.y = Math.PI / 4;
house.add(walls, roof);
house.position.set(-3, 0, -3);
scene.add(house);

// 플레이어 (임시 캡슐)
const player = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.22, 0.4, 4, 12),
  new THREE.MeshLambertMaterial({ color: 0x4fc3f7 }),
);
player.position.set(0, 0.45, 1);
scene.add(player);

function onResize(): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);

function animate(): void {
  requestAnimationFrame(animate);
  camera.position.lerp(new THREE.Vector3(player.position.x, 6.2, player.position.z + 6.2), 0.12);
  camera.lookAt(player.position.x, 0.4, player.position.z);
  renderer.render(scene, camera);
}
animate();
