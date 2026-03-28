import type { Map } from "../entities/Map";

export interface IMapRepository {
  loadFromFile(): Promise<Map | null>;
  saveToFile(map: Map, filename?: string): void;
}
