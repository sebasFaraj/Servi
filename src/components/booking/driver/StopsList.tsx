import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, MapPin, Plus, X } from 'lucide-react';
import type { Stop } from '../../../types/booking';

interface StopsListProps {
  stops: Stop[];
  onStopClick: (stop: Stop) => void;
  onRemoveStop: (stopId: string) => void;
  onReorderStops: (stops: Stop[]) => void;
  onAddStop: () => void;
  maxStops?: number;
}

const StopsList = ({
  stops,
  onStopClick,
  onRemoveStop,
  onReorderStops,
  onAddStop,
  maxStops = 5
}: StopsListProps) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(stops);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order numbers
    const reorderedStops = items.map((stop, index) => ({
      ...stop,
      order: index
    }));

    onReorderStops(reorderedStops);
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="stops">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {stops.map((stop, index) => (
                <Draggable key={stop.id} draggableId={stop.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg 
                               border-2 border-gray-200 dark:border-gray-700"
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="mr-3 text-gray-400 cursor-grab"
                      >
                        <GripVertical className="w-5 h-5" />
                      </div>
                      
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => onStopClick(stop)}
                      >
                        <div className="flex items-center">
                          <MapPin className={`w-5 h-5 mr-2 ${
                            stop.type === 'pickup' 
                              ? 'text-teal-600' 
                              : stop.type === 'dropoff' 
                                ? 'text-red-600'
                                : 'text-blue-600'
                          }`} />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {stop.type}
                            </p>
                            <p className="font-medium dark:text-white">
                              {stop.address || 'Select location'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {stop.type === 'stop' && (
                        <button
                          onClick={() => onRemoveStop(stop.id)}
                          className="ml-2 p-1 text-gray-400 hover:text-red-600 
                                   dark:text-gray-500 dark:hover:text-red-400"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {stops.length < maxStops && (
        <button
          onClick={onAddStop}
          className="w-full flex items-center justify-center space-x-2 p-4 rounded-lg 
                   border-2 border-dashed border-gray-200 dark:border-gray-700 
                   text-gray-500 dark:text-gray-400 hover:border-teal-500 
                   dark:hover:border-teal-500 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Stop</span>
        </button>
      )}
    </div>
  );
};

export default StopsList;