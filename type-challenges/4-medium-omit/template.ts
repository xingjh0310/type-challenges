


type MyOmit<T, K extends keyof T> = {[P in keyof T as P extends K ? never : P ] : T[P]}




interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}

// keyof T 相当于 keyof Todo 输出 'title' | 'description' | 'completed'
// K extends keyof T 表示 K 肯定是 三项值中的其中一种
// P in keyof T 循环 'title' | 'description' | 'completed', 循环出来的每一项P 通过as 断言, 判断当前P 是否继承于传入的K, 存在的话输出never,不存在输出P