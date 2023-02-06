export type boardType = {
  id: string;
  title: string;
  favorite: boolean;
  users: {
    id: string;
    userID: string;
    role: string;
  };
  order: number;
  column: columnType[];
};

export type columnType = {
  id: string;
  title: string;
  order: number;
  task: taskType[];
};

export type taskType = {
  id: string;
  title: string;
  order: number;
};
