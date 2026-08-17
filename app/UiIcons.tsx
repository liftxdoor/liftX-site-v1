type ArrowDirection = "right" | "left" | "up" | "down" | "up-right" | "down-right";

const arrowRotation: Record<ArrowDirection, number> = {
  right: 0,
  left: 180,
  up: -90,
  down: 90,
  "up-right": -45,
  "down-right": 45,
};

export function ArrowIcon({ direction = "right", className = "" }: { direction?: ArrowDirection; className?: string }) {
  return (
    <svg className={`uiIcon ${className}`.trim()} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <g transform={`rotate(${arrowRotation[direction]} 12 12)`}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </g>
    </svg>
  );
}

export function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`uiIcon ${className}`.trim()} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="m7 9.5 5 5 5-5" />
    </svg>
  );
}

export function DragHorizontalIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`uiIcon ${className}`.trim()} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4" />
    </svg>
  );
}

export function MessageIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`uiIcon ${className}`.trim()} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M20 15a4 4 0 0 1-4 4H9l-5 3v-5.2A4 4 0 0 1 3 14V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v8Z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  );
}
