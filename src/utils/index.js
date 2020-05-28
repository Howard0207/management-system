import moment from 'moment';

export * from './echarts';

/**
 * 未完成
 */
export const TokenStorage = {
    get() {
        localStorage.getItem('token');
    },
    set(token) {
        localStorage.setItem('token', token);
    },
};

/**
 * 柯里化方法，处理索引位置数据所占百分比
 * @param {type: array[num], desc: 值为数字的数组} valueList
 * @param {type: number, desc: 精度} precision
 * @return {type: func, desc: 返回一个携带索引参数的函数，该方法返回索引位置数据百分比}
 */
export function percentPrecision(valueList, precision) {
    const sum = valueList.reduce((acc, val) => {
        return acc + (isNaN(val) ? 0 : val);
    }, 0);

    const digits = Math.pow(10, precision);
    // 扩大比例
    const votesPerQuota = valueList.map((val) => {
        return ((isNaN(val) ? 0 : val) / sum) * digits * 100;
    });
    const targetSeats = digits * 100;

    const seats = votesPerQuota.map((votes) => {
        return Math.floor(votes);
    });

    let currentSum = seats.reduce((acc, val) => {
        return acc + val;
    }, 0);

    const remainder = votesPerQuota.map((votes, idx) => {
        return votes - seats[idx];
    });

    while (currentSum < targetSeats) {
        let max = Number.NEGATIVE_INFINITY;
        let maxId = null;
        for (let i = 0, len = remainder.length; i < len; ++i) {
            if (remainder[i] > max) {
                max = remainder[i];
                maxId = i;
            }
        }
        ++seats[maxId];
        remainder[maxId] = 0;
        ++currentSum;
    }

    return function calcPercent(idx) {
        if (!valueList[idx]) {
            return 0;
        }
        if (sum === 0) {
            return 0;
        }
        return seats[idx] / digits;
    };
}

/**
 * 订阅发布
 */
export const EventHub = {
    events: {},
    on(event, fn) {
        if (this.events[event]) {
            this.events[event].push(fn);
        } else {
            this.events[event] = [fn];
        }
    },
    emit(event, ...rest) {
        this.events[event].forEach((fn) => {
            fn(...rest);
        });
    },
    off(event, fn) {
        if (fn === undefined) {
            delete this.events[event];
        } else {
            const idx = this.events[event].indexOf(fn);
            if (idx >= 0) {
                this.events[event].splice(idx, 1);
            }
        }
    },
};

/**
 * 根据传入的数值得到今天，昨天，明天等等天数
 * @param {Number} dayNum 正整数或负整数
 * @return {String} 返回值为 yyyyMMdd 格式：2020-05-20
 * */
export function getYTTdate(dayNum) {
    const day = new Date();
    day.setTime(day.getTime() + 24 * 60 * 60 * 1000 * dayNum);
    let month = day.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const res = `${day.getFullYear()}-${month}-${day.getDate()}`;
    return res;
}

/**
 * 数字最多显示3位小数
 * @param { Number } mun 数值
 * @return { Number } 数值
 * */
export function getKeepADecimal3(mun) {
    return Math.floor(mun * 1000) / 1000;
}

/**
 * 获取近三天数据
 * @return { Array }
 * */
export function getDefault3Day() {
    return [
        moment().subtract(2, 'days').format('MM-DD'),
        moment().subtract(1, 'days').format('MM-DD'),
        moment().format('MM-DD'),
    ];
}

/**
 * 获取近三月数据
 * @return { Array }
 * */
export function getDefault3Months() {
    return [
        moment().subtract(3, 'months').format('MM月'),
        moment().subtract(2, 'months').format('MM月'),
        moment().subtract(1, 'months').format('MM月'),
    ];
}

/**
 * 千分位并保留 n 位小数
 * @param { Number } num 数值
 * @param { Number } decimal 需要保留的小数位
 * @return { Float } 浮点数
 * */
export function micrometerLevel(num, decimal) {
    let newNum = num;
    if (newNum === '') return '--';
    if (decimal === 0 || decimal === undefined) {
        return `${newNum}`.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
    }
    if (typeof newNum === 'string') {
        newNum = Number(newNum);
    }
    return newNum.toFixed(decimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

/**
 * 保留 n 位小数
 * @param { Number } num 数值
 * @param { Number } decimal 需要保留的小数位
 * @return { Float } 浮点数
 * */
export function retainDecimal(num, decimal) {
    if (num === '') return '--';
    return num.toFixed(decimal);
}

/**
 * 事件绑定方法
 * @param {type: DomElement, desc: 绑定事件的元素 } obj
 * @param {type: Event, desc: 监听的事件} ev
 * @param {type: func, desc: 处理事件的方法} fn
 */
export function myAddEvent(obj, ev, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent(`on${ev}`, fn);
    }
}

/**
 * 事件解绑
 * @param {type: DomElement, desc: 解绑事件的元素 } obj
 * @param {type: Event, desc: 监听的事件} ev
 * @param {type: func, desc: 处理事件的方法} fn
 */
export function myRemoveEvent(obj, ev, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(ev, fn, false);
    } else {
        obj.detachEvent(`on${ev}`, fn);
    }
}
