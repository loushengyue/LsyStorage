# LsyStorage

```
plugin LsyStorage
author loushengyue
website http://www.loushengyue.com
version 1.0.2
methods
        .getItem(key[string])
        .getArr(prex[string])
        .setItem(key[string],value[string,object])
        .setArr(prex[string],values[array])
        .setList(keys[array],values[array])
        .removeItem(key[string])
        .clearAll()
```



## localStorage是什么？
#### localStorage是HTML5提供的没有时间限制的数据存储方法。相比cookie，它的存储容量更大，读取更方便，由于没有过期时间限制，它可以将数据保存很长时间（除非手动清楚浏览器缓存数据）。

由于使用localStorage所提供的`setItem()`、`getItem()` 、`removeItem()` 等方法具有局限性（对数组，对象存取不方便），在此，封装了一个插件[LsyStorage.js](https://github.com/loushengyue/LsyStorage)，完善了对数组，对象的读取方法。

#### LsyStorage.js下载：[点击下载](https://github.com/loushengyue/LsyStorage/archive/master.zip)
#### bower下载命令：
```
$ bower install https://github.com/loushengyue/LsyStorage.git
```

------
## 使用方法

### `.setItem(key[string],value[string,object])`

例如：

```
var key = 'zhangsan';
var value = 'He is 20 years old boy.';
var objKey = 'lisi';
var objVal = {
    age: 18,
    sex:'man'
};
LsyStorage.setItem(key, value); //存储字符串
LsyStorage.setItem(objKey, objVal); //存储对象
```


### `.setArr(prex[string],values[array])`

例如：

```
var prex = 'fruit';
var fruits = ['apple', 'banana', 'orange'];
LsyStorage.setArr(prex, fruits); // 以变量prex为前缀存储数组fruits
```

### `.setList(keys[array],values[array])`

例如：

```
var keys = ['aa', 'bb', 'cc'];
var values = ['the value of aa', 'the value of bb', 'the value of cc'];
LsyStorage.setList(keys, values); //以keys为键，以vualue为值进行map映射法存储，注意两个数组的长度必须一致
```

### `.getItem(key[string])`

例如：

```
var key = 'zhangsan';
var student = LsyStorage.getItem(key);  //通过键key获取localStorage所对应的value值
console.log(student); // He is 20 years old boy.
```

### `.getArr(prex[string])`

例如：

```
var prex = 'fruit';
var fruits = LsyStorage.getArr(prex); //通过键前缀prex获取localStorage所对应的系列value值
console.log(fruits); //['apple', 'banana', 'orange']
```

### `.removeItem(key[string])`

例如：

```
var key = 'lisi';
LsyStorage.removeItem(key); //通过键key删除localStorage所对应的value值；
var lisi = LsyStorage.getItem(key);
console.log(lisi); //undefined
```

### `.clearAll()`

例如：

```
LsyStorage.clearAll(); // 删除所有的localStorage信息
```
