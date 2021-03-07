import React, { Component } from 'react';
import *as d3 from 'd3'               //引入D3
import data from './1552970000.json' //引入数据
import './style.css';

  let linksLine;
  let nodesCircle;
  let color;
  let simulation;
  const WIDTH = 1800;
  const HEIGHT = 600;
  let nodenum=[];
  var job_len=data['#job_num']
  var tooltip = d3.select("body") 
  .append("div")
  .attr("class","tooltip")

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  
  componentDidMount() {
    this.draw();

  }
   

  draw =()=> {
    //初始化数据

    let links= data.links;
    let nodes =[];
    let list_length=links.length
    let array=[]
    for(let i = 0; i <list_length; i++ ){  
      array.push(links[i].value) 
      nodenum.push(links[i].node_num)
      }
      let arrays=[]
    for(var j=array.length;j>=0;j--){
      arrays.push(array[j])
    }
    nodes=[]
    for(let i=0;i<data['min_value'].length;i++){
      nodes.push({"id":i,"category":"fixed"})
      }  
  
    let  max=data['max_value']//存放每组数里面的最大值
    for(let i=0;i<max.length;i++){
        if(max[i]<200000){
          max[i]=100000
      }
    }

    let s=0 
      for(let i=0;i<max.length;i++){
        color=d3.scaleLinear()
          .domain([0,max[i]+1]) 
          .range(['green','red'])
        for(let j =0;j<job_len[i];j++){
          nodes.push({colors:color(array[s]),"values":array[s],"node_num":links[s].node_num})//j只是length
          s=s+1
        }
  }  
  this.setState({ //setState状态管理
    nodes: nodes,
    links:links
  })
  this.forceChart(nodes, links)
 
}
    fun=()=>{//自定义函数
      let contents=this.refs.Biao.value
      let content=parseInt(contents)
      var Circle=document.getElementsByTagName('circle')
      for (var i=0;i<nodenum.length;i++){
        if(nodenum[i]===content){ 
        Circle[i+job_len.length].setAttribute("r",15)
        }
      }
    }

forceChart = (nodes, links) => {
  this.refs['theChart'].innerHTML = '';
    
   simulation=d3.forceSimulation(nodes) // 指定被引用的nodes数组
      .force("link", d3.forceLink(links).strength(0.15).distance(5))
      .force('center', d3.forceCenter(WIDTH / 2, HEIGHT / 2))
      .force('manyBody', d3.forceManyBody().strength(-2))
      .force("x",d3.forceX())
      .force("y",d3.forceY())
    //拖拽模块
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0.1);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      const drag = d3.drag()//拖拽
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
             
      //缩放
      function onZoomStart(d) {
        // console.log('start zoom');
      }
      function zooming(event,d) {
        // 缩放和拖拽整个g
        g.attr('transform', event.transform); // 获取g的缩放系数和平移的坐标值。
      }
      function onZoomEnd() {
        // console.log('zoom end');
      }
    const zoom = d3.zoom()
        // .translateExtent([[0, 0], [WIDTH, HEIGHT]]) // 设置或获取平移区间, 默认为[[-∞, -∞], [+∞, +∞]]
        .scaleExtent([1 / 10, 10]) // 设置最大缩放比例
        .on('start', onZoomStart)
        .on('zoom', zooming)
        .on('end', onZoomEnd);
     // svg
    const svg = d3.select('#theChart').append('svg') // 在id为‘theChart’的标签内创建svg
      .style('width', WIDTH)
      .style('height', HEIGHT * 0.9)
      .call(zoom); // 缩放
      const g = svg.append('g'); // 则svg中创建g
    //绘制连线
    linksLine = svg.select('g')
      .selectAll('line')
      .data(links) // 绑定数据
      .enter() // 为数据添加对应数量的占位符
      .append('line') // 在占位符上面生成折线（用path画）
      .attr('d', (d) => { return d && 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y; }) //遍历所有数据。d表示当前遍历到的数据，返回绘制的贝塞尔曲线
      .attr('stroke', '#999')
      .attr('opacity', 0.1)
      .attr('stroke-width',0.1)
    //绘制节点
      nodesCircle = svg.select('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle') // 创建圆
      .attr('r', 3) // 半径
      .attr('stroke','#999')
      .attr('stroke-width',1)
      .attr('fill',function(d){ return d.colors})
      .on("mouseover",function(event,d){
           if(d.values===undefined){
        tooltip.html("作业:"+d.index) 
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY + 20) + "px")
               .style("opacity",1.0);  
           } 
            else{
            tooltip.html("net:"+d.values+"node_num:"+d.node_num) 
              .style("left", (event.pageX) + "px")
              .style("top", (event.pageY + 20) + "px")
              .style("opacity",1.0);  
            }
          })
          .on("click",function(event,d){
            
                         d3.select(this).attr("r",8)
                         // }
          })
          .call(drag)
          simulation.on('tick', () => {
          nodesCircle.attr('transform', (d) => {
            return d && 'translate(' + d.x + ',' + d.y + ')';
          });
          linksLine.attr('d', (d) => {
            const path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
            return path;
          });
        })

    }
  render() {
    return (
      <div>
        <div className="outerDiv">
          <div className="theChart" id="theChart" ref="theChart">
          </div>
              <div >        
                <input type="text"  ref="Biao"/>查询的结果在图中高亮显示
                <button onClick={this.fun}>点击获取值</button>
              </div>
          </div>
      </div>
    )
  }
}
