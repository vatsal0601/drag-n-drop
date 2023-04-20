import { useRef, type SVGProps } from "react";
import { cn } from "./lib/utils";
import { items } from "./App";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type OnDragEndResponder,
} from "react-beautiful-dnd";

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

export const DnDV2 = () => {
  const draggableList = useRef(items);

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;

    // const newDraggableList = reorder(
    //   draggableList,
    //   result.source.index,
    //   result.destination.index
    // );

    const newDraggableList = draggableList.current.filter(
      (_, index) => index !== result.source.index
    );

    newDraggableList.splice(
      result.destination.index,
      0,
      draggableList.current[result.source.index]
    );

    console.log(newDraggableList);
    draggableList.current = newDraggableList;
  };

  return (
    <section>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={cn(
                "p-4 container mx-auto bg-slate-100 rounded-lg grid grid-cols-5 gap-8 transition-colors",
                snapshot.isDraggingOver && "bg-rose-100"
              )}
            >
              {draggableList.current.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        "p-4 rounded-lg flex items-center gap-4 bg-blue-100 w-40 shadow transition-shadow",
                        snapshot.isDragging && "cursor-grabbing shadow-lg"
                      )}
                      style={provided.draggableProps.style}
                    >
                      <DragIcon className="w-4 h-4 cursor-grab flex-shrink-0" />
                      <span className="font-medium line-clamp-1">
                        {item.text}
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};
