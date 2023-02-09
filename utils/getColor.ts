export const getColor = (index: number, type: "text" | "bg" | "border") => {
  switch (index % 5) {
    case 0:
      return `${type}-violet-900`;
    case 1:
      return `${type}-rose-900`;
    case 2:
      return `${type}-teal-700`;
    case 3:
      return `${type}-indigo-700`;
    case 4:
      return `${type}-cyan-800`;
  }
};
