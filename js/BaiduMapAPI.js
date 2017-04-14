var map;//定义地图全局变量
function init(){
	// 百度地图API功能
	map = new BMap.Map("baidumap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(114.353622,30.56486), 15);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("武汉");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}
//步行规划函数
function WalkRouteQuery(){
	alert("这里是测试是否跳进了这个函数里，OK!");
	var a=document.getElementById("tex_a").value;
	alert("输入的起点是："+a);
	var b=document.getElementById("tex_b").value;
	alert("输入的终点是："+b);
	var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
    walking.search(a,b);
}
//驾车路线函数
function DrivingQuery(){
	map.clearOverlays(); 
	var a=document.getElementById("tex_a").value;
	var b=document.getElementById("tex_b").value;
	var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
	driving.search(a,b);
}
//公交查询函数
function BusQuery(){
	map.clearOverlays(); 
	var a=document.getElementById("tex_a").value;
	var b=document.getElementById("tex_b").value;
    var transit = new BMap.TransitRoute(map, {renderOptions: {map: map, panel: "r-result"}
	});
    transit.search(a, b);
}