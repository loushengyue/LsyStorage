/* *
 *      LsyStorage
 *      author loushengyue
 *      website http://www.loushengyue.com
 *      version 1.0.2
 *      methods {
 *              .getItem(key[string])
 *              .getArr(prex[string])
 *              .setItem(key[string],value[string,object])
 *              .setArr(prex[string],values[array])
 *              .setList(keys[array],values[array])
 *              .removeItem(key[string])
 *              .clearAll()
 *           }
 */
;(function (win) {
    /* *
     *      The constructor of LsyStorage
     */
    var storage = function () {
        this.version = '1.0.2';
    };
    /* *
     *      ckeck val is the right typeof string, if not, change it.
     *      val     typeof String,Array,Object
     *      return  typeof string
     */
    storage.prototype.checkVal = function (val) {
        if (typeof val === 'object') {
            val = JSON.stringify(val);
        }
        return val;
    };
    /* *
     *      ckeck key is the right typeof string, if not, change it.
     *      val     typeof String,Array,Object
     *      return  typeof string
     */
    storage.prototype.checkKey = function (key) {
        if (typeof key != 'string') {
            console.log('the key is not string!');
            return false;
        }
        return true;
    };
    /* *
     *      ckeck the length of keyArr and valArr, if them are not eq, return false.
     *      keyArr     typeof Array
     *      valArr     typeof Array
     *      return     typeof boolean
     */
    storage.prototype.checkKeyVal = function (keyArr, valArr) {
        if (keyArr.length != valArr.length) {
            console.log('The length of keyArr and valArr need eq.');
            return false;
        }
        return true;
    };
    /* *
     *      ckeck the typeof str.
     *      str        typeof Object,String,Array
     *      return     typeof boolean
     */
    storage.prototype.isJsonStr = function (str) {
        try {
            var obj = JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };
    /* *
     *      ckeck the typeof arr.
     *      arr        typeof Object,String,Array
     *      return     typeof boolean
     */
    storage.prototype.checkArr = function (arr) {
        return arr instanceof Array;
    };
    /* *
     *      get some strorages from localStroage.
     *      prex       typeof String
     *      return     typeof Array
     */
    storage.prototype.getArr = function (prex) {
        var _this = this;
        var arr = [];
        var reg = new RegExp(prex);
        var keys = Object.keys(win.localStorage);
        keys.forEach(function (key) {
            if (reg.test(key)) {
                arr.push(_this.getItem(key));
            }
        });
        return arr;
    };
    /* *
     *      setItem by keys and values
     *      keys       typeof Array
     *      values     typeof values
     */
    storage.prototype.setList = function (keys, values) {
        if (this.checkKeyVal(keys, values)) {
            for (var i = 0, n = keys.length; i < n; i++) {
                this.setItem(keys[i], values[i]);
            }
        }
    };
    /* *
     *      setItem by prex and arr
     *      prex       typeof String
     *      arr        typeof Array
     */
    storage.prototype.setArr = function (prex, arr) {
        if (this.checkArr(arr)) {
            for (var i = 0, n = arr.length; i < n; i++) {
                var key = prex + '_' + i;
                this.setItem(key, arr[i]);
            }
        } else {
            this.setItem(prex, arr);
        }
    };
    /* *
     *      Clear localStorage. Like the methods of clear().
     */
    storage.prototype.clearAll = function () {
        win.localStorage.clear();
    };
    /* *
     *      Remove item by key. Like the methods of removeItem().
     *      key  typeof  String
     */
    storage.prototype.removeItem = function (key) {
        win.localStorage.removeItem(key);
    };
    /* *
     *      Get item from localStorage by key.
     *      key      typeof  String
     *      return   typeof  String,Object
     */
    storage.prototype.getItem = function (key) {
        var str = win.localStorage.getItem(key);
        if (this.isJsonStr(str)) {
            str = JSON.parse(win.localStorage.getItem(key));
        }
        return str;
    };
    /* *
     *      Set item by key and val.
     *      key      typeof  String
     *      val      typeof  String
     */
    storage.prototype.setItem = function (key, val) {
        if (this.checkKey(key)) {
            val = this.checkVal(val);
            win.localStorage.setItem(key, val);
        }
    };
    /* *
     *      constructor init function.
     */
    storage.init = function () {
        return new this();
    };
    win['LsyStorage'] = storage.init();
})(window);
