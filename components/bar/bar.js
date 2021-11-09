// components/line/line.js
import * as echarts from '../../ec-canvas/echarts';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    barData:{
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
   barData:{},
   ec: {
    lazyLoad: true //设置图表懒加载
  },
  barColour:''
  },

   
    ec: {
      lazyLoad: true //设置图表懒加载
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
      'barData':function(barData){
        if(barData){
          var barColour='';
          if(barData.barTitle == '累计确诊Top10'){
            barColour='#e83132'
          }else if(barData.barTitle == '现有确诊Top10'){
            barColour='#ff6a57'
          }else if(barData.barTitle == '新增确诊Top10'){
            barColour='#ec9217'
          }else if(barData.barTitle == '累计死亡Top10'){
            barColour='#4d5054'
          }else if(barData.barTitle == '累计治愈Top10'){
            barColour='#1073b5e1'
          }
          this.data.barColour=barColour
          this.initEchartsLine(barData) 
        }
      }
    },
  /**
   * 组件的方法列表
   */
  methods: {
    setOption(chart,barData){
      const option = {
        title : {
            text: barData.barTitle,
            left: 'center'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            //data:['一模','二模','三模']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : barData.xdata
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                type:'bar',
                data:barData.ydata,
                color:this.data.barColour,
                itemStyle: {
                  normal: {
                    label: {
                      show: true,  //开启显示
                      position: 'top',  //在上方显示
                      textStyle: {  //数值样式
                        color: 'black',
                        fontSize: 6
                      }
                    }
                  }
                },
            }
        ]
    };
      chart.setOption(option);
    },

    //初始化图表
    initEchartsLine(barData){
      this.oneComponent = this.selectComponent('#mychart-dom-line');
      this.oneComponent.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
      canvas.setChart(chart);
      this.setOption(chart,barData)//赋值给echarts图标
      this.chart = chart
      return chart
    });
    }
  }
})
