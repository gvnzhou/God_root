'use strict';
var valid = require('validator');
let option = {
  logTime: true
};
exports.option = option;
//日期原型扩展
function GetWeekIndex(dateobj) {
  var firstDay = GetFirstWeekBegDay(dateobj.getFullYear());
  if (dateobj < firstDay) {
    firstDay = GetFirstWeekBegDay(dateobj.getFullYear() - 1);
  }
  var d = Math.floor((dateobj.valueOf() - firstDay.valueOf()) / 86400000);
  return Math.floor(d / 7) + 1;
}

function GetFirstWeekBegDay(year) {
  var tempdate = new Date(year, 0, 1);
  var temp = tempdate.getDay();
  if (temp === 1) {
    return tempdate;
  }
  temp = temp == 0 ? 7 : temp;
  tempdate = tempdate.setDate(tempdate.getDate() + (8 - temp));
  return new Date(tempdate);
}

function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

function wait(t) {
  return function(cb) {
    setTimeout(cb, t);
  };
}

function ext(a, b) {
  if (!b || !a) {
    return null;
  }
  for (var c in b) {
    b.hasOwnProperty(c) && (a[c] = b[c]);
  }
  return a;
}

Date.prototype.getWeek = function() {
  return GetWeekIndex(this);
};

Date.prototype.date2Str = function() {
  var y = this.getFullYear();
  var mon = (this.getMonth() + 1);
  mon = mon < 10 ? ('0' + mon) : mon;
  var date = this.getDate();
  date = date < 10 ? ('0' + date) : date;
  var hour = this.getHours();
  hour = hour < 10 ? ('0' + hour) : hour;
  var min = this.getMinutes();
  min = min < 10 ? ('0' + min) : min;
  var sec = this.getSeconds();
  sec = sec < 10 ? ('0' + sec) : sec;
  return (y + '-' + mon + '-' + date + ' ' + hour + ':' + min + ':' + sec);
};
Date.prototype.date8 = function(s) {
  let m = this.getMonth() + 1,
    d = this.getDate();
  m = m <= 9 ? ('0' + m) : m;
  d = d <= 9 ? ('0' + d) : d;
  s = s || '';
  return [this.getFullYear(), m, d].join(s);
};
/* 得到日期年月日等加数字后的日期 */
Date.prototype.dateAdd = function(interval, number) {
  var d = this;
  var k = {
    'y': 'FullYear',
    'q': 'Month',
    'm': 'Month',
    'w': 'Date',
    'd': 'Date',
    'h': 'Hours',
    'n': 'Minutes',
    's': 'Seconds',
    'ms': 'MilliSeconds'
  };
  var n = {
    'q': 3,
    'w': 7
  };
  eval('d.set' + k[interval] + '(d.get' + k[interval] + '()+' + ((n[interval] || 1) * number) + ')');
  return d;
};
/* 计算两日期相差的日期年月日等 */
/*Date.prototype.dateDiff = function(interval, objDate2) {
  var d = this,
    i = {},
    t = d.getTime(),
    t2 = objDate2.getTime();
  i['y'] = objDate2.getFullYear() - d.getFullYear();
  i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4);
  i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth();
  i['ms'] = objDate2.getTime() - d.getTime();
  i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000));
  i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
  i['h'] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
  i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
  i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
  return i[interval];
};*/

//
Array.prototype.copy = function() {
  return [].concat(this);
};

var _s = {
  fillStr: function(str, len) { //填入什么字符多少位,中文算2个字符
    let l = (this + '').len();
    return this + ((len - l) > 0 ? str.times(len - l) : '');
  },
  toMoney: function(p) { //p精度  
      var num = this + '';
      num = num.replace(new RegExp(',', 'g'), '');
      // 正负号处理   
      var symble = '';
      if (/^([-+]).*$/.test(num)) {
          symble = num.replace(/^([-+]).*$/, '$1');
          num = num.replace(/^([-+])(.*)$/, '$2');
      }
      if (/^[-.0-9]+(\.[0-9]+)?$/.test(num)) {
          num = num.replace(new RegExp('^[0]+', 'g'), '');
          if (/^\./.test(num)) {
              num = '0' + num;
          }
          var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, '$1');
          var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, '$1');
          var re = /(\d+)(\d{3})/;
          while (re.test(integer)) {
              integer = integer.replace(re, '$1,$2');
          }
          if (+p) {
              decimal = decimal.substr(0, (+p + 1));
          }
          if (p === 0) {
              decimal = '';
          }
          return symble + integer + decimal;

      } else {
          return p;
      }
  },
  toLow: function() {
    return this.toLowerCase();
  },
  toUp: function() {
    return this.toUpperCase();
  },
  esHtml: function() {
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },
  toHtml: function() {
    return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  },
  reHtml: function() {
    return this.replace(/<\/?[^>]+>/gi, '');
  },
  times: function(n) {
    return n>0 ? new Array(n + 1).join(this) : '';
  },
  format: function() {
    var s = this,
      a = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
      a.push(arguments[i]);
    }
    return s.replace(/\{(\d+)\}/g, function(m, i) {
      return a[i] || '{' + i + '}';
    });
  },
  len: function() {
    return this.replace(/[^\x00-\xff]/g, '**').length;
  },
  toInt: function() {
    return parseInt(this);
  },
  replaceAll: function(s1, s2) {
    var a = this.split(s1);
    return a.join(s2);
  },
  trim: function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },
  camelize: function() {
    return this.replace(/(-[a-z])/g, function(s) {
      return s.substring(1).toUpperCase();
    });
  },
  ec: function(s) {
    s = s.trim();
    return (new RegExp('(^' + s + '\\s)|(\\s' + s + '$)|(\\s' + s + '\\s)|(^' + s + '$)', 'g')).test(this);
  },
  tc: function(s) {
    s = s.trim();
    if (this.ec(s)) {
      return this.dc(s);
    } else {
      return this.ac(s);
    }
  },
  dc: function(s) {
    if (this.ec(s)) {
      return this.trim().split(s).join('').replace(/\s{2,}/g, ' ').trim();
    } else {
      return this;
    }
  },
  ac: function(s) {
    return this.trim().dc(s) + ' ' + s;
  }
};
ext(String.prototype, _s);

Number.prototype.round = function(p) {
  p = Math.pow(10, p || 0);
  return Math.round(this * p) / p;
};
Number.prototype.fillStr = String.prototype.fillStr;
Date.prototype.fillStr = String.prototype.fillStr;
Buffer.prototype.contact = function(b) {
  /*
  utf8 有bom头
  EF BB BF [239 187 191]
   */
  var buf = new Buffer(this.length + b.length);
  this.copy(buf, 0, 0, this.length);
  b.copy(buf, this.length, 0, b.length);
  return buf;
};
exports.tools = {};
exports.ext = ext;
exports.tools.uuid = uuid;
exports.tools.wait = wait;
/*exports.G = {};
exports.G.timeOpt = function(obj) {
  var me = this;
  var funcAry = {};
  me.get = function(s) {
    if (!funcAry[s]) {
      return null;
    }
    if (!s || typeof funcAry[s].fn != 'function') {
      return null;
    }
    return funcAry[s];
  };
  me.add = function(o) {
    o = o || {};
    me.o = o;
    if (!o.name || funcAry[o.name]) {
      return;
    }
    funcAry[o.name] = {
      fn: o.fn,
      start: o.start,
      now: o.now || o.start,
      do: 0,
      endFn: o.endFn
    };
  };
  me.del = function(s) {
    if (!funcAry[s]) {
      return null;
    }
    if (!s || typeof funcAry[s].fn != 'function') {
      return null;
    }
    me.stop(s);
    funcAry[s] = null;
    delete funcAry[s];
  };
  me.clear = function() {
    funcAry = null;
    funcAry = {};
  };
  me.start = function(s) {
    if (!funcAry[s]) {
      return null;
    }
    if (!s || typeof funcAry[s].fn != 'function') {
      return null;
    }
    funcAry[s].do = 1;
  };
  me.pause = function(s) {
    if (!funcAry[s]) {
      return null;
    }
    if (!s || typeof funcAry[s].fn != 'function') {
      return null;
    }
    funcAry[s].do = 0;
  };
  me.stop = function(s) { //rest
    if (!funcAry[s]) {
      return null;
    }
    if (!s || typeof funcAry[s].fn != 'function') {
      return null;
    }
    funcAry[s].do = 0;
    funcAry[s].now = funcAry[s].start;
  };
  var mainTimer = function() {
    for (var i in funcAry) {
      var f = funcAry[i];
      if (f && (typeof f.fn === 'function') && f.do === 1 && f.now > -1) {
        f.fn(me);
        f.now--;
        if (f.now < 0 && f.endFn) {
          f.do = 0;
          f.endFn(me);
        }
      }
    }
    setTimeout(function() {
      mainTimer();
    }, obj.step || 1000 * 60);
  };
  mainTimer();
  return me;
};*/

let c = {
  /*
  http://stanislavs.org/helppc/ansi_codes.html
  */
  cls: '\x1b[0;0;H\x1b[0J',
  xy: function(x, y) {
    return `\x1b[${y};${x};H`;
  },
  none: '\x1b[m',
  black: '\x1b[30m',
  red: '\x1b[31m\x1b[1m',
  green: '\x1b[32m\x1b[1m',
  yellow: '\x1b[33m\x1b[1m',
  blue: '\x1b[34m\x1b[1m',
  magenta: '\x1b[35m\x1b[1m',
  cyan: '\x1b[36m\x1b[1m',
  white: '\x1b[37m\x1b[1m',
  lred: '\x1b[31m',
  lgreen: '\x1b[32m',
  lyellow: '\x1b[33m',
  lblue: '\x1b[34m',
  lmagenta: '\x1b[35m',
  lcyan: '\x1b[36m',
  lwhite: '\x1b[37m'
};

exports.c = c;
exports.tools.rnd = function(a, b) {
  return Math.round(Math.random() * (b - a)) + a;
};

var getStackTrace = function() {
  var obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
};

let re = /\\(.+)\.js:(\d+:\d+)/g;
// let log = function(...args) {
//   getStackTrace().split('\n')[2].match(re);
//   let s = ' [' + c.lgreen + RegExp.$1.split('\\').pop() + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']';
//   if (typeof args[0] === 'object') {
//     console.log(args);
//     console.log(s);
//   } else {
//     console.log(args + (option.logTime ? s : ''));
//   }

//   return 1;
// };
// let err = function(...args) {
//   getStackTrace().split('\n')[2].match(re);
//   let s = ' [' + c.lred + RegExp.$1.split('\\').pop() + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']';
//   if (typeof args[0] === 'object') {
//     console.log(args);
//     console.log(s);
//   } else {
//     console.log(args + (option.logTime ? s : ''));
//   }
//   return 1;
// };
// exports.log = log;
// exports.err = err;
exports.tools.checkParam = function(a, b) { //检查两个对象是否符合参数要求
  // NOTICE : 0的问题
  var c = {};
  var _n;
  for (let i in b) {
    //console.log(['req1',!a[i],b[i].req])
    if (b[i].req === 1 && !a[i]) {
      return {
        code: 400,
        msg: i + '必填'
      };
    }
    if (a[i] === undefined) {
      c[i] = a[i] || b[i].def;
      continue;
    }
    switch (b[i].type.toLow()) {
      case 'int':
        _n = a[i] === 0 ? 0 : (a[i] || b[i].def);
        if (!valid.isInt(_n + '')) {
          return {
            code: 400,
            msg: i + '类型错误,应为整型'
          };
        }
        c[i] = _n;
        break;
      case 'positive':
        _n = a[i] === 0 ? 0 : (a[i] || b[i].def);
        if (!valid.isInt(_n + '') || _n <= 0) {
          return {
            code: 400,
            msg: i + '类型错误,应为正数'
          };
        }
        c[i] = _n;
        break;
      case 'negative':
        _n = a[i] === 0 ? 0 : (a[i] || b[i].def);
        if (!valid.isInt(_n + '') || _n >= 0) {
          return {
            code: 400,
            msg: i + '类型错误,应为负数'
          };
        }
        c[i] = _n;
        break;
      case 'string':
        _n = a[i] === '' ? '' : ((a[i] || '') + '' || b[i].def);
        c[i] = _n;
        break;
      case 'datetime':
        // TODO : ie 需要补一个 toISOString 函数
        _n = (a[i] || b[i].def);
        if (!valid.isISO8601(_n + '')) {
          return {
            code: 400,
            msg: i + '类型错误,应为日期型'
          };
        }
        c[i] = _n;
        break;
      case 'bool':
        _n = a[i];
        if (!valid.isBoolean(_n + '')) {
          return {
            code: 400,
            msg: i + '类型错误，,应为布尔型'
          };
        }
        c[i] = _n;
        break;
      case 'number':
        _n = a[i] === 0 ? 0 : (a[i] || b[i].def);
        if (!valid.isDecimal(_n + '')) {
          return {
            code: 400,
            msg: i + '类型错误,应为数值型'
          };
        }
        c[i] = _n;
        break;
      default:
        return {
          code: 500,
          msg: '参数定义错误'
        };
    }
  }
  return {
    code: 200,
    msg: '',
    data: c
  };
};