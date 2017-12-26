/* *
 *      LsyStorage
 *      author loushengyue
 *      website http://www.loushengyue.com
 *      version 1.0.3
 *      methods
 *              .getItem(key[string])
 *              .getItemsByKeys(keys[array])
 *              .getArr(prex[string])
 *              .setItem(key[string],value[string,object])
 *              .setArr(prex[string],values[array])
 *              .setList(keys[array],values[array])
 *              .removeItem(key[string])
 *              .clearAll()
 */
;(function (win, doc) {
    /* *
     *      The constructor of Storages
     */
    var Storages = function () {
        this.version = '1.0.3';
    };
    /* *
     *      ckeck val is the right typeof string, if not, change it.
     *      val     typeof String,Array,Object
     *      return  typeof string
     */
    Storages.prototype.checkVal = function (val) {
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
    Storages.prototype.checkKey = function (key) {
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
    Storages.prototype.checkKeyVal = function (keyArr, valArr) {
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
    Storages.prototype.isJsonStr = function (str) {
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
    Storages.prototype.checkArr = function (arr) {
        return arr instanceof Array;
    };
    /* *
     *      setItem by keys and values
     *      keys       typeof Array
     *      values     typeof values
     */
    Storages.prototype.setList = function (keys, values) {
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
    Storages.prototype.setArr = function (prex, arr) {
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
     *      sortKeys by index of keys
     *      keys       typeof String
     */
    Storages.prototype.sortKeys = function (keys) {
        if (!keys instanceof Array) {
            return false;
        }
        keys.map(function (a, b) {
            a = Number(a.match(/_\d+$/)[0].substr(1));
            b = Number(b.match(/_\d+$/)[0].substr(1));
            return a - b;
        });
        return keys;
    };
    /* *
     *      filterKeys by RegExp
     *      reg       typeof String
     *      keys        typeof Array
     */
    Storages.prototype.filterKeysByReg = function (keys, prex) {
        var arr = [];
        var reg = new RegExp(prex);
        keys.forEach(function (key) {
            if (reg.test(key)) {
                arr.push(key);
            }
        });
        return arr;
    };
    /* *
     *      getItems By Keys
     *      keys        typeof Array
     */
    Storages.prototype.getItemsByKeys = function (keys) {
        var arr = [];
        var _this = this;
        keys.forEach(function (key) {
            arr.push(_this.getItem(key));
        });
        return arr;
    };
    /* *
     *  ----------------------------------------------------------------------
     */
    var LsyStorage = function () {
        this.version = 'Lsy localStorage 1.0.3';
    };
    LsyStorage.prototype = new Storages();
    LsyStorage.prototype.constructor = LsyStorage;
    /* *
     *      Clear localStorage. Like the methods of clear().
     */
    LsyStorage.prototype.clearAll = function () {
        win.localStorage.clear();
    };
    /* *
     *      Remove item by key. Like the methods of removeItem().
     *      key  typeof  String
     */
    LsyStorage.prototype.removeItem = function (key) {
        win.localStorage.removeItem(key);
    };
    /* *
     *      Get item from localStorage by key.
     *      key      typeof  String
     *      return   typeof  String,Object
     */
    LsyStorage.prototype.getItem = function (key) {
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
    LsyStorage.prototype.setItem = function (key, val) {
        if (this.checkKey(key)) {
            val = this.checkVal(val);
            win.localStorage.setItem(key, val);
        }
    };
    /* *
     *      get some strorages from localStroage.
     *      prex       typeof String
     *      return     typeof Array
     */
    LsyStorage.prototype.getArr = function (prex) {
        var _this = this;
        var arr = [];
        var keys = Object.keys(win.localStorage);
        keys = _this.filterKeysByReg(keys, prex);
        arr = _this.getItemsByKeys(keys);
        return arr;
    };

    win['LsyStorage'] = new LsyStorage();
})(window, document);
