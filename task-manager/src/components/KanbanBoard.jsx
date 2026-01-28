import React from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Circle, Clock, CheckCircle2 } from 'lucide-react';
import TaskCard from './TaskCard';

const columns = [
  { id: 'todo', title: '待办', icon: Circle, color: 'bg-gray-100' },
  { id: 'in_progress', title: '进行中', icon: Clock, color: 'bg-blue-100' },
  { id: 'done', title: '已完成', icon: CheckCircle2, color: 'bg-green-100' },
];

export default function KanbanBoard({ tasks, onUpdateTask, onEditTask, onDeleteTask }) {
  const [activeId, setActiveId] = React.useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const tasksByStatus = React.useMemo(() => {
    return {
      todo: tasks.filter(t => t.status === 'todo'),
      in_progress: tasks.filter(t => t.status === 'in_progress'),
      done: tasks.filter(t => t.status === 'done'),
    };
  }, [tasks]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    const overColumn = columns.find(col => col.id === over.id);
    if (overColumn && activeTask.status !== overColumn.id) {
      await onUpdateTask(activeTask.id, { status: overColumn.id });
      return;
    }

    const overTask = tasks.find(t => t.id === over.id);
    if (overTask && activeTask.status !== overTask.status) {
      await onUpdateTask(activeTask.id, { status: overTask.status });
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeTask = activeId ? tasks.find(t => t.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 h-full overflow-x-auto">
        {columns.map((column) => {
          const Icon = column.icon;
          const columnTasks = tasksByStatus[column.id] || [];

          return (
            <div
              key={column.id}
              className="flex-1 min-w-[300px] flex flex-col bg-gray-50 rounded-lg"
            >
              <div className={`${column.color} p-4 rounded-t-lg border-b border-gray-200`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-gray-700" />
                    <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  </div>
                  <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                    {columnTasks.length}
                  </span>
                </div>
              </div>

              <SortableContext
                items={columnTasks.map(t => t.id)}
                strategy={verticalListSortingStrategy}
                id={column.id}
              >
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  {columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                    />
                  ))}
                  {columnTasks.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <p>暂无任务</p>
                    </div>
                  )}
                </div>
              </SortableContext>
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-3 scale-105">
            <TaskCard
              task={activeTask}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
