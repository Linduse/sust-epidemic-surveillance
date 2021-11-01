// components/line/line.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    xdata:{
      type:Array,
      value:[]
    },
    ydata:{
      type:Array,
      value:[]
    },
    title:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    setOption(chart,xdata,ydata,title){
      const option={
        title: {
          text: title,
          left: 'center'
        },
        legend: {
          data: ['A'],
          top: 50,
          left: 'center',
          backgroundColor: 'red',
          z: 100
        },
        grid: {
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xdata,
          // show: false
        },
        yAxis: {
          x: 'center',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
          // show: false
        },
        series: [{
          name: 'A',
          type: 'line',
          smooth: true,
          data: ydata
        }]
      };
      chart.setOption(option);
    },
    //初始化图表
    initEchartsLine(xdata,ydata,title){
      this.oneComponent.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
      canvas.setChart(chart);
      this.setOption(char,xdata,ydata,title)//赋值给echarts图标
      this.chart = chart
      return chart
    });
    }
  }
})
