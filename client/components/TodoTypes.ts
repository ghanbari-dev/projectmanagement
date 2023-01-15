export type taskType = { _id: string; title: string;order:number, content: string };
export type tasksType = { [key: string]: taskType };

export type colType = { _id: string; title: string;order:number, task: taskType[] };
export type colsType = { [key: string]: colType };

export type dataType = {
  tasks: tasksType;
  columns: colsType;
  columnOrder: string[];
};
