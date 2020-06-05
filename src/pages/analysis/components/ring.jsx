import { BasicRing } from '_components/echarts';

export default () => {
    const data = [
        { value: 28, name: '一级' },
        { value: 34, name: '二级' },
        { value: 38, name: '三级' },
    ];
    const color = ['#FF5F5F', '#FFD858', '#48D6A1'];
    const legendData = ['一级', '二级', '三级'];
    return (
        <BasicRing
            config={{
                color,
                data,
                legendData,
            }}
            style={{ width: '100%', height: '100%' }}
        />
    );
};
