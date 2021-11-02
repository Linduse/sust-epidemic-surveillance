import * as echarts from '../../ec-canvas/echarts';
import geoJson from './china.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList : {       // 地图中展示的数据
      type: Array,
      value: [],
    },
    
    dataPoint: {    // 为地图某个位置标点，本例中来实现，地图中某个省份清零后，为其省份插上小红旗
      type: Array,
      value: []
    },
    chinaMapTitle:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      lazyLoad: true //设置图表懒加载
    }
    ,
    dataList: [],
    chinaMapTitle:""
  },
  lifetimes: {
    attached: function() {
        // 在组件实例进入页面节点树时执行
        // 获取echarts组件，并赋值给变量，然后初始化图表
        this.oneComponent = this.selectComponent('#mychart-dom-area');
      },
    detached: function() {
        // 在组件实例被从页面节点树移除时执行
      },
    },
  
    // properties里接受的数据发生改变时执行
    observers:{
      'dataList':function(dataList){
        if(dataList.length > 0){
          this.getData(dataList) 
        }
      }
    },

  /**
   * 组件的方法列表
   */
  methods: {
      getData(dataList,chinaMapTitle) {
          this.initChart(dataList,this.data.chinaMapTitle);
      },
      initChart(dataList,chinaMapTitle) {
        this.oneComponent = this.selectComponent('#mychart-dom-area');
          this.oneComponent.init((canvas, width, height, dpr) => {
            console.log(3333)
              const chart = echarts.init(canvas, null, {
                  width: width,
                  height: height,
                  devicePixelRatio: dpr // new
              })
              canvas.setChart(chart);
  echarts.registerMap('china', geoJson);

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function(e, t, n) {
        return '地区：' + e.data.name + '\n确诊：' + e.data.value
      },
      textStyle:{
        align:'left'
      }
    },
    title: {
      text: chinaMapTitle,
      textStyle: {
        color: '#000',
        fontSize: 15
    },
      x: 'center'
    },
    
    visualMap: {
      min: 0,
      max: chinaMapTitle=="中国疫情累计确诊地图"? 2000:200,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [{
      type: 'map',
      mapType: 'china',
      label: {
        normal: {
          show: true
        },
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      itemStyle: {

        normal: {
          borderColor: '#389BB7',
          areaColor: '#fff',
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0
        }
      },
      animation: false,

      data: dataList
    
    }],

  };

  chart.setOption(option);

  return chart;
          })
      },
  }
})

