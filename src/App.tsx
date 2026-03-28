import { useEffect, useRef } from "react";
import { createCanvas } from "./canvas";
import { ToolButton } from "./ui/ToolButton";
import { FilePlusCornerIcon, SaveIcon } from "lucide-react";
import { FolderOpenIcon } from "lucide-react";

const mapFile = {
  sizeX: 10,
  sizeY: 10,
  sizeZ: 10,
  tiles: Array(10).fill(Array(10).fill(Array(10).fill(1))),
};

function App() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasInstanceRef = useRef<ReturnType<typeof createCanvas> | null>(
    null
  );

  useEffect(() => {
    canvasInstanceRef.current = createCanvas(canvasContainerRef.current!);
    canvasInstanceRef.current.loadMap(mapFile);

    return () => canvasInstanceRef.current?.destroyCanvas();
  }, [canvasContainerRef]);

  return (
    <div className="absolute m-0 top-0 left-0 h-full w-full items-center justify-start gap-4 ">
      <div className="col-span-1 col-start-1 h-fit">
        <ToolButton
          onClick={() => {
            //Creates new file
            const newMap = {
              sizeX: 10,
              sizeY: 10,
              sizeZ: 10,
              tiles: Array(10).fill(Array(10).fill(Array(10).fill(0))),
            };
            canvasInstanceRef.current?.loadMap(newMap);
          }}
        >
          <FilePlusCornerIcon className="w-5 h-5" />
        </ToolButton>
        <ToolButton
          onClick={() => {
            //Loads file opens file dialog and loads map data from JSON
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".json";
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (event) => {
                const text = event.target?.result as string;
                const mapData = JSON.parse(text);
                canvasInstanceRef.current?.loadMap(mapData);
              };
              reader.readAsText(file);
            };
            input.click();
          }}
        >
          <FolderOpenIcon className="w-5 h-5" />
        </ToolButton>
        <ToolButton
          onClick={() => {
            //Saves file downloads map data as JSON
            const dataStr =
              "data:text/json;charset=utf-8," +
              encodeURIComponent(JSON.stringify(mapFile));
            const downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "map.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          }}
        >
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
