import React from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Circle, Clock, CheckCircle2 } from 'lucide-react';
import TaskCard from './TaskCard';

const columns = [
  { id: 'todo', title: '待办', icon: Circle, color: 'bg-gray-100' },
  { id: 'in_progress', title: '进行中', icon: Clock, color: 'bg-blue-100' },
  { id: 'done', title: '已完成', icon: CheckCircle2, color: 'bg-green-100' },
];

// ---------- helpers ----------
const toId = (v) => String(v);
const colId = (status) => `col:${status}`;
const parseCol = (id) => (typeof id === 'string' && id.startsWith('col:') ? id.slice(4) : null);

// 点击这些元素不触发拖拽（避免点按钮时被当成拖拽）
function isInteractiveTarget(el) {
  if (!el) return false;
  const tag = el.tagName?.toLowerCase?.();
  return (
    tag === 'button' ||
    tag === 'a' ||
    tag === 'input' ||
    tag === 'textarea' ||
    tag === 'select' ||
    el.isContentEditable === true ||
    el.closest?.('[data-no-dnd="true"]')
  );
}

// ---------- components ----------
function DroppableColumn({ column, children }) {
  const { setNodeRef, isOver } = useDroppable({ id: colId(column.id) });

  return (
    <div
      ref={setNodeRef}
      className={[
        'flex-1 min-w-[300px] flex flex-col bg-gray-50 rounded-lg transition-colors',
        isOver ? 'ring-2 ring-blue-400' : '',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

function SortableTaskCard({ task, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: toId(task.id),
    data: { type: 'task', taskId: task.id },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
    userSelect: 'none',
    touchAction: 'none',
  };

  // 避免点击按钮/输入框时触发拖拽
  const safeListeners = {
    ...listeners,
    onPointerDown: (e) => {
      if (isInteractiveTarget(e.target)) return;
      listeners?.onPointerDown?.(e);
    },
    onKeyDown: (e) => {
      if (isInteractiveTarget(e.target)) return;
      listeners?.onKeyDown?.(e);
    },
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...safeListeners}>
      <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

// ---------- main ----------
export default function KanbanBoard({ tasks, onUpdateTask, onEditTask, onDeleteTask }) {
  const [activeId, setActiveId] = React.useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const tasksByStatus = React.useMemo(() => {
    const list = tasks || [];
    return {
      todo: list.filter((t) => t.status === 'todo'),
      in_progress: list.filter((t) => t.status === 'in_progress'),
      done: list.filter((t) => t.status === 'done'),
    };
  }, [tasks]);

  const activeTask = React.useMemo(() => {
    if (!activeId) return null;
    return (tasks || []).find((t) => toId(t.id) === toId(activeId)) ?? null;
  }, [activeId, tasks]);

  const handleDragStart = (event) => {
    setActiveId(event.active?.id ?? null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragEnd = React.useCallback(
    (event) => {
      const { active, over } = event;
      setActiveId(null);

      if (!active || !over) return;

      const list = tasks || [];
      const activeTaskLocal = list.find((t) => toId(t.id) === toId(active.id));
      if (!activeTaskLocal) return;

      // 目标：可能是列容器，也可能是某个 task
      let targetStatus = null;

      const overCol = parseCol(over.id);
      if (overCol) {
        targetStatus = overCol;
      } else {
        const overTask = list.find((t) => toId(t.id) === toId(over.id));
        if (overTask) targetStatus = overTask.status;
      }

      if (!targetStatus || activeTaskLocal.status === targetStatus) return;

      // ✅ 不要 await：拖拽收尾一定要顺滑
      Promise.resolve(onUpdateTask(activeTaskLocal.id, { status: targetStatus })).catch((err) => {
        console.error('Failed to update task status:', err);
      });
    },
    [tasks, onUpdateTask]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 h-full overflow-x-auto pb-4">
        {columns.map((column) => {
          const Icon = column.icon;
          const columnTasks = tasksByStatus[column.id] || [];

          return (
            <DroppableColumn key={column.id} column={column}>
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
                // ✅ SortableContext 的 items 必须与 useSortable 的 id 完全一致（string）
                items={columnTasks.map((t) => toId(t.id))}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[200px]">
                  {columnTasks.map((task) => (
                    <SortableTaskCard
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
            </DroppableColumn>
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-2 scale-105 opacity-80">
            <TaskCard task={activeTask} onEdit={() => { }} onDelete={() => { }} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
