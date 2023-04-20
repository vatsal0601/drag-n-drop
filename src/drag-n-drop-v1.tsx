import { useState, type DragEvent, type SVGProps, forwardRef } from "react";
import { cn } from "./lib/utils";
import { items } from "./App";
import FlipMove from "react-flip-move";

interface DragIconProps extends SVGProps<SVGSVGElement> {}

const DragIcon = (props: DragIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="5" r="1"></circle>
    <circle cx="19" cy="5" r="1"></circle>
    <circle cx="5" cy="5" r="1"></circle>
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
    <circle cx="12" cy="19" r="1"></circle>
    <circle cx="19" cy="19" r="1"></circle>
    <circle cx="5" cy="19" r="1"></circle>
  </svg>
);

interface CardProps {
  item: typeof items[number];
  draggedElement: typeof items[number] | null;
  handleDragStart: (item: typeof items[number]) => void;
  handleDragEnter: (item: typeof items[number]) => void;
  handleDragEnd: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { item, draggedElement, handleDragStart, handleDragEnter, handleDragEnd },
    ref
  ) => (
    <div
      ref={ref}
      key={item.id}
      className={cn(
        "p-4 rounded-lg flex items-center gap-4 bg-blue-100 w-40 shadow transition-shadow",
        draggedElement?.id === item.id && "shadow-lg"
      )}
      draggable
      onDragStart={() => handleDragStart(item)}
      onDragEnter={() => handleDragEnter(item)}
      onDragEnd={() => handleDragEnd()}
    >
      <DragIcon
        className={cn(
          "w-4 h-4 cursor-grab flex-shrink-0",
          draggedElement?.id === item.id && "cursor-grabbing"
        )}
      />
      <span className="font-medium line-clamp-1">{item.text}</span>
    </div>
  )
);

export const DnDV1 = () => {
  const [draggableList, setDraggableList] = useState(items);
  const [onDragOver, setOnDragOver] = useState(false);
  const [draggedElement, setDraggedElement] = useState<
    typeof items[number] | null
  >(null);
  const [onCurrentElement, setOnCurrentElement] = useState<
    typeof items[number] | null
  >(null);

  const handleDragStart = (item: typeof items[number]) => {
    console.log("start");
    setDraggedElement(item);
  };

  const handleDragEnter = (item: typeof items[number]) => {
    if (!draggedElement) return;
    console.log("enter", item);
    setOnCurrentElement(item);
  };

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    console.log("drop");
    // e.preventDefault();

    if (!draggedElement || !onCurrentElement) return;

    if (onCurrentElement.id === draggedElement.id) return;

    const newDraggableList = draggableList.filter(
      (element) => element.id !== draggedElement.id
    );

    const index = draggableList.findIndex(
      (element) => element.id === onCurrentElement.id
    );

    if (index === -1) return;

    newDraggableList.splice(index, 0, draggedElement);

    console.log(newDraggableList);

    setOnCurrentElement(null);
    setDraggableList(newDraggableList);
  };

  const handleDragEnd = () => {
    console.log("end");
    setOnDragOver(false);
    setDraggedElement(null);
    setOnCurrentElement(null);
  };

  return (
    <section
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e)}
      className={cn(
        "p-4 container mx-auto bg-slate-100 grid grid-cols-5 gap-8 rounded-lg transition-colors",
        onDragOver && "bg-rose-100"
      )}
    >
      <FlipMove typeName={null}>
        {draggableList.map((item) => (
          <Card
            key={item.id}
            item={item}
            draggedElement={draggedElement}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
            handleDragEnd={handleDragEnd}
          />
        ))}
      </FlipMove>
    </section>
  );
};
