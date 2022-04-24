
// 基础数据类型
// 声明一个变量: ts 类型=> 值
// 这里需要注意number 和 Number, Number 可以描述实例
let num:number = 1

// let num:number = new Number(11) !!报错
// let num:Number = new Number(11) !!不报错

let num1:Number = 1

let str:string = 'hello'
let bool:boolean = true

//元组表示 长度是固定的, (内容的类型也要规定好)

let tuple:[string,number,boolean] = ['zf',1,true]

// 我们无法通过索引给元组添加不存在的属性

//tuple[3] = 100  !!报错

// 如果通过数组方法新增,必须元组中要支持此类型
tuple.push('zf1')

// 数组类型
let arr: number[] = [1,2,3]
let arr1: string[] = ['1','2','3']
let arr2: (number | string)[] = [1,'2','3']
let arr3: Array<number | string> = [1,'2','3']

// 枚举类型 enum  枚举中默认值从0开始,只有数字可以自行的向下推断,字符串不行

// 普通枚举,如果希望编译出一个对象,有类型格式 可以使用普通枚举
// 枚举中存在不同的类型,叫异构枚举,如果里面有数字后面没有,会自行判断

enum USER_ROLE{
    USER = 'abc',
    ADMIN = 2
}

// 数字类型可以反举

console.log(USER_ROLE.ADMIN) //2
console.log(USER_ROLE[2]) //ADMIN

// 常量枚举
// 常量枚举不会被编译

const enum STATUS_CODE{
    NOT_FOUND
}

console.log(STATUS_CODE.NOT_FOUND) 

// null 和 undefined
// 是任何类型中的子类型, 在严格模式下 null->null undefined -> undefined

let u:null = null
let u1:undefined = undefined

// void 类型 一般用于函数的返回值, 只能接受null或者undefined 严格模式下 null 会报错

function a1():void{
    return undefined
}

// never 永远不 永远达不到的类型, never是任何类型的子类型
// 报错 死循环  判断的时候可能永远进入不到某个判断

function myError():never{
    throw new Error()
}

function whileTrue():never{
    while(true){

    }
}
function byType(val:string){
    if(typeof val == 'string'){

    }else{
        // 永远无法达到
    }
}

//object 对象类型

const create = (obj:object)=>{

}

create([])
create({})
create(function(){})

// symbol 和 bigInt 类型

let sy = Symbol('123')
let sy1 = Symbol('123')

console.log(sy == sy1) // false

// 可选类型 ?

function obj(obj:{first:string,last?:string}){
    console.log(obj)
}
obj({first:'first'})

// 联合类型

function printId(id: number | string | string[]) {
    console.log("Your ID is: " + id);
    // 注意,使用联合类型时, TypeScript 只有在对联合体的每个成员都有效的情况下才允许操作
    // 例如: id.toUpperCase() 或者 Array.isArray(x) 此时都会报错, 因为number 不支持 toUpperCase 函数
  }
  // OK
  printId(101);
  // OK
  printId("202");
  // Error
//   printId({ myID: 22342 });

// 类型别名
type Point = {
    x: number;
    y: number;
};
type ID = number | string;

function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
} 
printCoord({ x: 100, y: 100 });

// 类型断言  as 或者  <HTMLCanvasElement>

const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

// 文字类型 除了一般类型string和之外number，我们还可以在类型位置引用特定的字符串和数字。

function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
}
// 正确的
printText("Hello, world", "left");
// Error centre不是alignment定义的值
//   printText("G'day, mate", "centre");

interface Options {
    width: number;
  }
  function configure(x: Options | "auto") {
    // ...
  }

//   非空断言运算符（后缀!）

function liveDangerously(x?: number | null) {
    // No error
    // null时调用toFixed 方法会报错,所以使用 ! 非空运算
    console.log(x!.toFixed());
}
// typeof 类型警卫 ==> typeof strs === "object"

// in 方法

type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}
move({swim:()=>{
    console.log('fly11')
}})

//类型谓词 is 

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
//  pet is Fish是我们在这个例子中的类型谓词。谓词采用 形式parameterName is Type，其中parameterName必须是当前函数签名中的参数名称。

// 任何时候isFish调用某个变量，如果原始类型兼容，TypeScript 就会将该变量缩小到该特定类型。

// Both calls to 'swim' and 'fly' are now okay.

function getSmallPet():Fish | Bird{
    return {fly:()=>{ console.log('fly')}}
}

let pet = getSmallPet();
 
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// never 类型_的穷举检查
interface Circle {
    kind: "circle";
    radius: number;
  }
   
  interface Square {
    kind: "square";
    sideLength: number;
  }
   
  type Shape = Circle | Square;

  function getArea(shape: Shape) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "square":
        return shape.sideLength ** 2;
      default:
        const _exhaustiveCheck: never = shape;
        return _exhaustiveCheck;
    }
  }
//   向联合中添加新成员Shape会导致 TypeScript 错误：
// interface Triangle {
//     kind: "triangle";
//     sideLength: number;
//   }
   
//   type Shape = Circle | Square | Triangle;
   
//   function getArea(shape: Shape) {
//     switch (shape.kind) {
//       case "circle":
//         return Math.PI * shape.radius ** 2;
//       case "square":
//         return shape.sideLength ** 2;
//       default:
//         const _exhaustiveCheck: never = shape;
//   <<<<Type 'Triangle' is not assignable to type 'never'.>>>>
//         return _exhaustiveCheck;
//     }
//   }

// <!----关于函数-----!>




  


