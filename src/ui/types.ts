export type TaskListState = 'default' | 'loading' | 'empty' | 'error';

// Inferred from visual usage in task item and modal components.
export type UiTask = {
  id: string;
  text: string;
  completed: boolean;
  starred: boolean;
  dateStringShort: string;
  dateStringLong: string;
  timeString: string;
};

export type OpenElement = 'create' | 'modal' | null;
export type OpenModalElement = 'task' | 'update' | 'delete';

export type UiTaskAction = 'complete' | 'star';

export type TaskActionParams = {
  id: string;
  action: UiTaskAction;
};

export type TaskMutationHandlers = {
  onToggleComplete?(taskId: string): void;
  onToggleStar?(taskId: string): void;
  onUpdateTaskText?(taskId: string, text: string): void;
  onDeleteTask?(taskId: string): void;
};
