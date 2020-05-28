const { assign } = Object;
const { toString, hasOwnProperty } = Object.prototype;
const merge = (defaultConfig, config) => {
    const finnalConfig = defaultConfig;
    for (const key in config) {
        if (hasOwnProperty.call(config, key)) {
            if (finnalConfig[key]) {
                if (toString.call(config[key]) === '[object Object]') {
                    assign(finnalConfig[key], config[key]);
                } else {
                    finnalConfig[key] = config[key];
                }
            } else {
                finnalConfig[key] = config[key];
            }
        }
    }
    return finnalConfig;
};

export const getToolTip = (config = {}) => {
    const defaultConfig = {
        trigger: 'axis',
    };
    return merge(defaultConfig, config);
};

export const getGrid = (config) => {
    const defaultConfig = {
        top: '10%',
        left: '3%',
        right: '3%',
        bottom: '0%',
        containLabel: true,
    };
    return merge(defaultConfig, config);
};

export const getXAxis = (config = {}) => {
    if (toString.call(config) === '[object Array]') {
        return config;
    }
    const defaultConfig = {
        type: 'category', // x轴为类目类型
        axisLabel: {
            textStyle: {
                color: '#707070', // 字体样式
                fontSize: '12',
            },
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: ['#D8D8D8'], // 使用深浅的间隔色
            },
        },
        axisTick: {
            alignWithLabel: true,
            interval: 0,
        },
        data: [],
    };
    return [merge(defaultConfig, config)];
};

export const getYAxis = (config = {}) => {
    if (toString.call(config) === '[object Array]') {
        return config;
    }
    const defaultConfig = {
        type: 'value', // y轴为值类型
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: true, // 控制网格线是否显示
            lineStyle: {
                color: ['#D8D8D8'],
                type: 'dotted',
            },
        },
        axisLabel: {
            show: true, //  改变y轴字体颜色和大小
            textStyle: {
                color: '#707070',
                fontSize: '12',
            },
        },
    };
    return [merge(defaultConfig, config)];
};

export const getLegend = (config = {}) => {
    const defaultConfig = {
        left: '3%',
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 1,
        textStyle: {
            fontSize: 12, // 字体大小
            color: '#707070', // 字体颜色
        },
    };
    return assign(defaultConfig, config);
};
