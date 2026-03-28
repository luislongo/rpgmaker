import { useEffect, useRef } from "react";
import { ToolButton } from "./ui/ToolButton";
import { FilePlusCornerIcon, FolderOpenIcon, SaveIcon } from "lucide-react";
import { MapEditorService } from "./application/MapEditorService";
import { ThreeJSRenderer } from "./infrastructure/renderer/ThreeJSRenderer";
import { JsonFileMapRepository } from "./infrastructure/repositories/JsonFileMapRepository";

const DEFAULT_MAP = {
  sizeX: 10,
  sizeY: 10,
  sizeZ: 10,
  tiles: Array(10)
    .fill(null)
    .map(() =>
      Array(10)
        .fill(null)
        .map(() => Array(10).fill(1))
    ),
};

function App() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const editorServiceRef = useRef<MapEditorService | null>(null);

  useEffect(() => {
    const container = canvasContainerRef.current!;
    const renderer = new ThreeJSRenderer(container);
    const repository = new JsonFileMapRepository();
    const service = new MapEditorService(renderer, repository);

    service.loadMap(DEFAULT_MAP);
    editorServiceRef.current = service;

    return () => service.destroy();
  }, []);

  return (
    <div className="absolute m-0 top-0 left-0 h-full w-full items-center justify-start gap-4">
      <div className="col-span-1 col-start-1 h-fit">
        <ToolButton onClick={() => editorServiceRef.current?.newMap()}>
          <FilePlusCornerIcon className="w-5 h-5" />
        </ToolButton>
        <ToolButton onClick={() => editorServiceRef.current?.openMap()}>
          <FolderOpenIcon className="w-5 h-5" />
        </ToolButton>
        <ToolButton onClick={() => editorServiceRef.current?.saveMap()}>
          <SaveIcon className="w-5 h-5" />
        </ToolButton>
      </div>

      <div
        className="h-full w-full"
        id="canvas-container"
        ref={canvasContainerRef}
      />
    </div>
  );
}

export default App;
