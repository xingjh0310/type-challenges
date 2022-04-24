(function () {
  'use strict';

  // 枚举类型 enum  枚举中默认值从0开始,只有数字可以自行的向下推断,字符串不行
  // 普通枚举,如果希望编译出一个对象,有类型格式 可以使用普通枚举
  // 枚举中存在不同的类型,叫异构枚举,如果里面有数字后面没有,会自行判断
  var USER_ROLE;
  (function (USER_ROLE) {
      USER_ROLE["USER"] = "abc";
      USER_ROLE[USER_ROLE["ADMIN"] = 2] = "ADMIN";
  })(USER_ROLE || (USER_ROLE = {}));
  // 数字类型可以反举
  console.log(USER_ROLE.ADMIN); //2
  console.log(USER_ROLE[2]); //ADMIN
  console.log(0 /* NOT_FOUND */);
  // symbol 和 bigInt 类型
  var sy = Symbol('123');
  var sy1 = Symbol('123');
  console.log(sy == sy1); // false
  // 可选类型 ?
  function obj(obj) {
      console.log(obj);
  }
  obj({ first: 'first' });
  // 联合类型
  function printId(id) {
      console.log("Your ID is: " + id);
      // 注意,使用联合类型时, TypeScript 只有在对联合体的每个成员都有效的情况下才允许操作
      // 例如: id.toUpperCase() 或者 Array.isArray(x) 此时都会报错, 因为number 不支持 toUpperCase 函数
  }
  // OK
  printId(101);
  // OK
  printId("202");
  function printCoord(pt) {
      console.log("The coordinate's x value is " + pt.x);
      console.log("The coordinate's y value is " + pt.y);
  }
  printCoord({ x: 100, y: 100 });
  // 类型断言  as 或者  <HTMLCanvasElement>
  document.getElementById("main_canvas");
  function move(animal) {
      if ("swim" in animal) {
          return animal.swim();
      }
      return animal.fly();
  }
  move({ swim: function () {
          console.log('fly11');
      } });
  //类型谓词 is 
  function isFish(pet) {
      return pet.swim !== undefined;
  }
  //  pet is Fish是我们在这个例子中的类型谓词。谓词采用 形式parameterName is Type，其中parameterName必须是当前函数签名中的参数名称。
  // 任何时候isFish调用某个变量，如果原始类型兼容，TypeScript 就会将该变量缩小到该特定类型。
  // Both calls to 'swim' and 'fly' are now okay.
  function getSmallPet() {
      return { fly: function () { console.log('fly'); } };
  }
  var pet = getSmallPet();
  if (isFish(pet)) {
      pet.swim();
  }
  else {
      pet.fly();
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

})();
