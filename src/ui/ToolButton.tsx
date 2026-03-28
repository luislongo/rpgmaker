export interface ToolButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const ToolButton = ({ onClick, children }: ToolButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
    >
      {children}
    </button>
  );
};
