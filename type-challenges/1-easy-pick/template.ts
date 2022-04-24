
// ts 联合类型 union

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};
