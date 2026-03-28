import type { IMapRepository } from "../../domain/ports/IMapRepository";
import type { Map } from "../../domain/entities/Map";

export class JsonFileMapRepository implements IMapRepository {
  loadFromFile(): Promise<Map | null> {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";

      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) {
          resolve(null);
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const text = event.target?.result as string;
            const mapData: Map = JSON.parse(text);
            resolve(mapData);
          } catch {
            console.error("Failed to parse map file");
            resolve(null);
          }
        };
        reader.onerror = () => resolve(null);
        reader.readAsText(file);
      };

      input.oncancel = () => resolve(null);
      input.click();
    });
  }

  saveToFile(map: Map, filename = "map.json"): void {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(map, null, 2));

    const anchor = document.createElement("a");
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", filename);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }
}
