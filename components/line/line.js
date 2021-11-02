import * as echarts from '../../ec-canvas/echarts';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lineData:{
      type:Object,
      value:{
        xdata:[],
        ydata:[],
        lineTitle:""
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lineData:{},
    ec: {
      lazyLoad: true //设置图表懒加载
    }
  },

  lifetimes: {
    attached: function() {
        // 在组件实例进入页面节点树时执行
        // 获取echarts组件，并赋值给变量，然后初始化图表
        this.oneComponent = this.selectComponent('#mychart-dom-line');
      },
    detached: function() {
        // 在组件实例被从页面节点树移除时执行
      },
    },
  
    // properties里接受的数据发生改变时执行
    observers:{
      'lineData':function(lineData){
        if(lineData){
          this.initEchartsLine(lineData) 
        }
      }
    },
  /**
   * 组件的方法列表
   */
  methods: {
    setOption(chart,lineData){
      const option={
        title: {
          text: lineData.lineTitle,
          left: 'center'
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
          data: lineData.xdata,
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
          data: lineData.ydata
        }]
      };
      chart.setOption(option);
    },
    //初始化图表
    initEchartsLine(lineData){
      this.oneComponent = this.selectComponent('#mychart-dom-line');
      this.oneComponent.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
      canvas.setChart(chart);
      this.setOption(chart,lineData)//赋值给echarts图标
      this.chart = chart
      return chart
    });
    }
  }
})
