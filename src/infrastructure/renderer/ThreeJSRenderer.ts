import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import type { IRenderer } from "../../domain/ports/IRenderer";
import type { Map } from "../../domain/entities/Map";

export class ThreeJSRenderer implements IRenderer {
  private readonly container: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.canvas = document.createElement("canvas");
    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
    container.appendChild(this.canvas);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.width, this.canvas.height);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.canvas.width / this.canvas.height,
      0.1,
      1000
    );
    this.camera.position.z = 15;

    new OrbitControls(this.camera, this.renderer.domElement);

    this.animate();
  }

  loadMap(map: Map): void {
    this.clearScene();

    for (let x = 0; x < map.sizeX; x++) {
      for (let y = 0; y < map.sizeY; y++) {
        for (let z = 0; z < map.sizeZ; z++) {
          const tileValue = map.tiles[x][y][z];
          if (tileValue === 0) continue;

          const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshBasicMaterial({
              color: tileValue === 1 ? 0xff0000 : 0x00ff00,
            })
          );
          mesh.position.set(
            x - map.sizeX / 2,
            y - map.sizeY / 2,
            z - map.sizeZ / 2
          );
          this.scene.add(mesh);
        }
      }
    }
  }

  destroy(): void {
    this.renderer.dispose();
    this.container.removeChild(this.canvas);
  }

  private clearScene(): void {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }

  private animate(): void {
    const loop = () => {
      requestAnimationFrame(loop);
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }
}
