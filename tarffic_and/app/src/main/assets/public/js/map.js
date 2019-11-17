window.onLoad  = function(){
    var marker = [];
    var pic_src = ['01.png','02.png','03.png','04.png'];
    var img = document.getElementById("view")
    var current_index = 0 ;
    // var pre_btn = document.getElementById("pre");
    var next_btn = document.getElementById("next");
    
    // $.ajax({
    //     url:url,
    //     data:'{"data":"123"}',
    // })

    



    var map = new AMap.Map('container',{
        zoom:18,
      //  pitch:75,
        zooms:[14,20],
        layers:[
            new AMap.TileLayer.Satellite(),
            new AMap.TileLayer.RoadNet()
        ],
        center:[117.296724,39.054494],
        resizeEnable: true,
        
    });


    var map_layer = (content) => {
        layui.use('layer',function(){
            var layer = layui.layer;
            layer.open({
                type:1,
                title:"路口监控",
                area:['390px','300px'],
                content:$(content),
                shadeClose:false,
                offset:'25px',
            })
        })
    }


    var marker1 = new AMap.Marker({
        position: new AMap.LngLat(117.295609,39.054922),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '景盛路与渌水道交叉口监控'
    });

    var marker2 = new AMap.Marker({
        position: new AMap.LngLat(117.293902,39.053944),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '海天路与渌水道交叉口监控'
    });
    marker.push(marker1);
    marker.push(marker2);
// 将创建的点标记添加到已有的地图实例：
    map.add(marker);

    marker1.on('click',function(e){
        map_layer('#pic_layer');
    });

    marker2.on('click',function(e){
        map_layer('#pic_layer')
    });

    $("#pre").on('click',function(e){
        console.log(current_index)
        if(current_index === 0){
            img.src = '../img/view/'+pic_src[3];
            current_index = 3;
                }else{
                    current_index = current_index-1
                    img.src = '../img/view/'+pic_src[current_index];
                }
    });

    $("#next").on('click',function(e){
        if(current_index === 3){
                   img.src = '../img/view/'+pic_src[0];
                   current_index = 0;
                }else{
                    current_index += 1;  
                    img.src = '../img/view/'+pic_src[current_index];
                }
    });
    
}