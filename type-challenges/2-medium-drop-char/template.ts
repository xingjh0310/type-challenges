
// ts

// type MyPick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };

// type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'


type DropChar<S, C> = S extends `${infer F}${infer Rest}` ? F extends C ? DropChar<Rest,C> : `${F}${DropChar<Rest,C>}` : S




type pop<T extends unknown []> = T extends [...infer R, infer t] ? R : never

type arr = pop<[1,2,3]> // [1,2]

// 个人理解 infer 是定义变量接收, 首先 T extends 的是一个数组, [...R] 代表 [1,2] [t] 代表 3 

// infer是一个只能在 extends出现的时候 才能使用的关键字

// infer相当于声明一个类型变量，这个类型的变量 取决于传入的 T ,R 只能值 ?的左侧 也就是 true 分支使用


[]
// type DropChar<T,K> = K extends `${infer F}${infer Rest}` ? F extent K ? DropChar<Rest,K>:`${F}${DropChar<Rest,C>}` : T

// type Person = "name" | "school" | "major"

// type Obj =  {
//   [p in Person]: string
// }