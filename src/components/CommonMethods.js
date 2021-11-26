export const compare = (a, b) => {
  if (a.isDone < b.isDone) {
    return -1;
  }
  if (a.isDone > b.isDone) {
    return 1;
  }
  return 0;
};

export const getTasks = (userID) => {
  const result = localStorage.getItem(`task-${userID}`);
  if (result) {
    return JSON.parse(result);
  }
  return [];
};

export const arrayCheck = (arr) => {
  if (Array.isArray(arr) && arr.length) {
    return arr;
  }
  return [];
};

export const todayDate = new Date();
