import type { Map } from "../entities/Map";

export interface IRenderer {
  loadMap(map: Map): void;
  destroy(): void;
}
