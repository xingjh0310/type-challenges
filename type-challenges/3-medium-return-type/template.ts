

type MyReturnType<T> = T extends (...arg: any[]) => infer R ? R : never

const fn = (v: boolean) => {
    if (v)
      return 1
    else
      return 2
  }

type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"

// typeof 关键字判断变量的类型 
// 个人理解: T 泛型传入的是函数类型, T 通过 extends 继承一个函数, 推导出来的返回值 通过 infer 定义为 R, 有返回值就返回 R 无返回值,就返回 never
// T extends ** 结合 infer 可以作为一个固定的写法,用来做 返回值推导