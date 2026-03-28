import type { IMapRepository } from "../../domain/ports/IMapRepository";
import type { IRenderer } from "../../domain/ports/IRenderer";
import type { Map } from "../../domain/entities/Map";

export const loadMapFromFile = async (
  repository: IMapRepository,
  renderer: IRenderer
): Promise<Map | null> => {
  const map = await repository.loadFromFile();
  if (map) {
    renderer.loadMap(map);
  }
  return map;
};
