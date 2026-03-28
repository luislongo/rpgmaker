import type { IMapRepository } from "../../domain/ports/IMapRepository";
import type { Map } from "../../domain/entities/Map";

export const saveMapToFile = (
  repository: IMapRepository,
  map: Map,
  filename?: string
): void => {
  repository.saveToFile(map, filename);
};
