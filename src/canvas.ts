import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type Map = {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  tiles: number[][][];
};

export const createCanvas = (ref: HTMLDivElement) => {
  const canvas = document.createElement("canvas");
  canvas.width = ref.clientWidth;
  canvas.height = ref.clientHeight;
  ref.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvas.width, canvas.height);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    0.1,
    1000
  );
  camera.position.z = 5;

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  new OrbitControls(camera, renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  let map: Map | null = null;

  const loadMap = (mapData: Map) => {
    map = mapData;
    clearScene();
    updateMesh();
  };

  const updateMesh = () => {
    if (!map) return;

    for (let x = 0; x < map.sizeX; x++) {
      for (let y = 0; y < map.sizeY; y++) {
        for (let z = 0; z < map.sizeZ; z++) {
          const tileValue = map.tiles[x][y][z];

          if (tileValue === 0) continue; // Skip empty tiles
          const tileMesh = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshBasicMaterial({
              color: tileValue === 0 ? 0x00ff00 : 0xff0000,
            })
          );
          tileMesh.position.set(
            x - map.sizeX / 2,
            y - map.sizeY / 2,
            z - map.sizeZ / 2
          );
          scene.add(tileMesh);
        }
      }
    }
  };

  const clearScene = () => {
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }
  };

  const destroyCanvas = () => {
    renderer.dispose();
    ref.removeChild(canvas);
  };

  return {
    loadMap,
    clearScene,
    destroyCanvas,
  };
};
