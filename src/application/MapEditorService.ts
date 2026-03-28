import type { Map } from "../domain/entities/Map";
import type { IRenderer } from "../domain/ports/IRenderer";
import type { IMapRepository } from "../domain/ports/IMapRepository";
import { createNewMap } from "./useCases/createNewMap";
import { loadMapFromFile } from "./useCases/loadMapFromFile";
import { saveMapToFile } from "./useCases/saveMapToFile";

export class MapEditorService {
  private readonly renderer: IRenderer;
  private readonly repository: IMapRepository;
  private currentMap: Map | null = null;

  constructor(renderer: IRenderer, repository: IMapRepository) {
    this.renderer = renderer;
    this.repository = repository;
  }

  getCurrentMap(): Map | null {
    return this.currentMap;
  }

  newMap(sizeX = 10, sizeY = 10, sizeZ = 10): void {
    this.currentMap = createNewMap(sizeX, sizeY, sizeZ);
    this.renderer.loadMap(this.currentMap);
  }

  async openMap(): Promise<void> {
    const map = await loadMapFromFile(this.repository, this.renderer);
    if (map) {
      this.currentMap = map;
    }
  }

  saveMap(filename = "map.json"): void {
    if (!this.currentMap) return;
    saveMapToFile(this.repository, this.currentMap, filename);
  }

  loadMap(map: Map): void {
    this.currentMap = map;
    this.renderer.loadMap(map);
  }

  destroy(): void {
    this.renderer.destroy();
  }
}
