type taskType = { id: string; title: string; content: string };
export type tasksType = { [key: string]: taskType };

export type colType = { id: string; title: string; taskIds: string[] };
export type colsType = { [key: string]: colType };

export type dataType = {
  tasks: tasksType;
  columns: colsType;
  columnOrder: string[];
};
