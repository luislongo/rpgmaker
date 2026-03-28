import type { Map } from "../../domain/entities/Map";

export const createNewMap = (sizeX = 10, sizeY = 10, sizeZ = 10): Map => ({
  sizeX,
  sizeY,
  sizeZ,
  tiles: Array(sizeX)
    .fill(null)
    .map(() =>
      Array(sizeY)
        .fill(null)
        .map(() => Array(sizeZ).fill(0))
    ),
});
