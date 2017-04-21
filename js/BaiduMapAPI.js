var map;//定义地图全局变量
function init(){
	// 百度地图API功能
	map = new BMap.Map("baidumap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(114.353622,30.56486), 5);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("武汉");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	
	
	//-------------地图样式控制---------------------------------
	//初始化模板选择的下拉框
	var sel = document.getElementById('stylelist');
	for(var key in mapstyles){
		var style = mapstyles[key];
		var item = new  Option(style.title,key);
		sel.options.add(item);
	}
	//window.map = map;
	changeMapStyle('normal')
	sel.value = 'normal';
	
	//--------------------输入框自动提示控制--------------------------
	
	//-----------------------起点-------------------------------------------------------------------------------------------
	var aa = new BMap.Autocomplete(    //建立一个自动完成的对象
		{"input" : "tex_a"
		,"location" : map
	});
	
	aa.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
	var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	aa.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
	var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		
		setPlace();
	});
	//------------------------------------------------------------------------------------------------------------------
	//----------------------------终点--------------------------------------------------------------------------------------
	var ab = new BMap.Autocomplete(    //建立一个自动完成的对象
		{"input" : "tex_b"
		,"location" : map
	});
	
	ab.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
	var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	ab.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
	var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		
		setPlace();
	});
	//------------------------------------------------------------------------------------------------------------------
	
	//搜索实时定位
	function setPlace(){
		map.clearOverlays();    //清除地图上所有覆盖物
		function myFun(){
			var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
			map.centerAndZoom(pp, 18);
			map.addOverlay(new BMap.Marker(pp));    //添加标注
		}
		var local = new BMap.LocalSearch(map, { //智能搜索
		  onSearchComplete: myFun
		});
		local.search(myValue);
	}
	//输入提示标签值返回
	function G(id) {
		return document.getElementById(id);
	}
}

//改变地图样式
function changeMapStyle(style){
	map.setMapStyle({style:style});
	$('#desc').html(mapstyles[style].desc);
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


//-------------------------------------------------------------------------------------------
// 创建单点标记函数
function addMarker(point){
  var marker = new BMap.Marker(point);
  map.addOverlay(marker);
  
}

// 创建跳动标记函数
function addMarkerBound(point){
  var marker = new BMap.Marker(point);
  map.addOverlay(marker);
  marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
}

// 创建图片标记函数
function addMarkerPic(point){
  var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
  var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
  map.addOverlay(marker);
}

//添加小学
function addPrimary(){
	//清除地图覆盖物
	map.clearOverlays();
	//创建添加的标记点
	var point = new BMap.Point(111.65, 40.82);
	//定位地图中心到标记点
	map.centerAndZoom(point, 18);
	//调用标记点函数进行标记
	addMarker(point);
}

//添加初中
function addJuniormiddle(){
	//清除地图覆盖物
	map.clearOverlays();
	//创建添加的标记点
	var point = new BMap.Point(106.71, 26.57);
	//定位地图中心到标记点
	map.centerAndZoom(point, 18);
	//调用标记点函数进行标记
	addMarker(point);
}

//添加高中
function addSeniormiddle(){
	//清除地图覆盖物
	map.clearOverlays();
	//创建添加的标记点
	var point = new BMap.Point(116.46,39.92);
	//定位地图中心到标记点
	map.centerAndZoom(point, 18);
	//调用标记点函数进行标记
	addMarkerBound(point);
}

//添加大学
function addUniversity(){
	//清除地图覆盖物
	map.clearOverlays();
	//创建添加的标记点
	var point = new BMap.Point(114.353622,30.56486);
	//定位地图中心到标记点
	map.centerAndZoom(point, 18);
	//调用标记点函数进行标记
	addMarkerPic(point);
}

//显示全部
function fullscreen(){
	//清除地图覆盖物
	map.clearOverlays();
	//定义信息点坐标集合
	var data_info = [[111.65, 40.82,"我的小学"],
					 [106.71, 26.57,"我的初中"],
					 [116.46,39.92,"我的高中"],
					 [114.353622,30.56486,"我的大学"]
					];
	//遍历每个点的经纬度
	//data_info[i][0]，每一个坐标点的第一列，即经度
	//data_info[i][1]，每一个坐标点的第二列，即纬度
	for (var i = 0; i < data_info.length; i ++) {
		var marker = new BMap.Point(data_info[i][0],data_info[i][1]);
		//调用添加标注点函数，逐个添加标记点
		addMarker(marker);
	}
	//定义地图的中心点，在中国的中心，西安附近
	var point = new BMap.Point(108.95,34.27);
	//显示中心与地图级别，为了能够看到全国范围
	map.centerAndZoom(point, 5);
}

