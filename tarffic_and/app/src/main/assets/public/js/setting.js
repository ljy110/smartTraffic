var baseurl = "http://116.62.147.57:6789";
var light_add = document.getElementById("light_add");
var road_add = document.getElementById("road_add");

var begin_light = document.getElementById("begin_light");
var end_light = document.getElementById("end_light");
var begin_road = document.getElementById("begin_road");
var end_road = document.getElementById("end_road");
var red_light = document.getElementById("red");
var green_light = document.getElementById("green");
var save_plan = document.getElementById("save");
var dis_select = document.getElementById("dis_select");
var road1_select = document.getElementById("road1_select");
var road2_select = document.getElementById("road2_select");
var light_table = document.getElementById("light_table");
var road_table = document.getElementById("road_table");
var r_road = document.getElementById("r_road");
var dis_road = document.getElementById("dis_road");



// var addTime = function addTime(id) {
//     for (var i = 0;i<timelist.length;i++){
//         id.innerHTML+= "<option value='"+timelist[i]+"'>" +timelist[i]+ "</option>"
//     }
// }

var addTime = (id) => {
    timelist.forEach(
        function(item){
            id.innerHTML+= "<option value='"+item+"'>" +item+ "</option>"
        }
    )
}

//删除表格信息
function dele(nowTr,mid,index,rid){
    console.log(nowTr);
    
    console.log(index)
    url = ["/Lightconf/delete","/Roadconf/delete"];

    $.ajax({
        url:baseurl+url[index],
        type:"post",
        data:'{"mid":"'+mid+'","rid":"'+rid+'"}',
        success:function (data) {
            if (data === 't'){

                layui.use('layer',function(){
                    var layer = layui.layer;
                    layer.msg('删除成功',{
                        icon:1
                    });
                })
                
                    $(nowTr).parent().parent().remove();
                
            }else if (data.rs === 'f'){
                alert("删除失败");
            }
        }
    })

}

// 全局路灯添加
light_add.onclick = function(){
    console.log(dis_select.value);
    if (dis_select.value === "" || road1_select.value==="0" || road2_select.value==="0"){
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.msg('请选择地区',{
                icon:2
            });
        });
    }else {
        addTime(begin_light);
        addTime(end_light);
        layui.use(['form','layer'], function(){
            var layer = layui.layer;
            var form = layui.form;
            layer.open({
                type:1,
                title:"添加",
                area:['400px','350px'],
                content:$('#setting_light'),
                btn: ['确定添加', '取消'],
                success:function(){
                    $('.layui-form').modal();
                    $('.modal-backdrop').remove();//去掉遮罩层
                },
                end:function(){
                    document.getElementById("light_form").reset();
                    layui.form.render();
                },
                yes:function (index) {
                    var begin = begin_light.value;
                    var end = end_light.value;
                    var storage = window.localStorage;
                    var light_id = storage["light_id"];
                    var time = document.getElementById("time").value;
                    
                    var planId = document.getElementById("planId").value;
                    console.log(light_id);
                    var Da_light = "{begin:'"+begin+"',end:'"+end+"',mid:'"+planId+"',rid:'"+light_id+"',time:'"+time+"'}";
                    // light_table.innerHTML+='<tr>'+ '<td> '+begin+'- '+end+' </td>'+'<td>'+time+'  <a style="float:right" onclick="dele(this,'+Da_light+','+del_url+')" class="delete">删除</a> </td>'+'</tr>';
                    console.log(Da_light)
                    layer.closeAll();
                    $.ajax({
                        type:"POST",
                        url:baseurl+"/Lightconf/add",
                        data:Da_light,
                        success:function (data) {
                            // data = JSON.parse(data);
                            console.log(data);
                            if (data === "t"){
                                info = "{mid:"+planId+",rid:"+light_id+"}"
                                del_url = "0"
                                layer.closeAll();
                                layer.msg('添加成功',{
                                    icon:1
                                });
                                light_table.innerHTML+='<tr>'+ '<td> '+begin+'- '+end+' </td>'+'<td>'+time+'s后变换  <a style="float:right" onclick="dele(this,'+planId+','+del_url+','+light_id+')" class="delete">删除</a> </td>'+'</tr>';
                            }else if (data.rs==="f"){
                                alert("添加失败");
                            }
                        },
                    })

                }
            })

        });
    }


};

// 全局道路变化
road_add.onclick = function(){
    if (dis_road.value === "" || r_road.value===""){
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.msg('请选择地区',{
                icon:2
            });
        });
    }else {
            
            addTime(begin_road);
            addTime(end_road);
        layui.use(['form','layer'], function(){
            var layer = layui.layer;
            var form = layui.form
            layer.open({
                type:1,
                title:"添加",
                area:['400px','400px'],
                content:$('#setting_road'),
                btn: ['添加', '取消'],
                success:function(){
                        $('.layui-form').modal();
                        $('.modal-backdrop').remove();
                },
                end:function(){
                    document.getElementById("road_form").reset();
                    layui.form.render();
                },
                yes:function (index) {
                    
                        var begin = begin_road.value;
                        var end = end_road.value;
                        var storage = window.localStorage;
                        var road_id = storage["road_id"];
                        console.log(road_id);
                        var planRoad = document.getElementById("planRoad").value;
                        var roadChange = document.getElementById("roadChange").value;
                        var Da_road = "{begin:'" + begin + "',end:'" + end + "' ,rid:'" + road_id + "' ,mid:'"+planRoad+"' ,pos:'"+roadChange+"'}";
                        console.log(Da_road)
                        var road_url = '1'
                        //road_table.innerHTML += '<tr>' + '<td> ' + begin + '- ' + end + ' </td>' + '<td><a style="float:right" onclick="dele(this,' + Da_road + ')" class="delete">删除</a></td>' + '</tr>';
                        $.ajax({
                            type: "POST",
                            url: baseurl+"/Roadconf/add",
                            data: Da_road,
                            success: function (data) {
                                
                                if (data === "t") {
                                    layer.closeAll();
                                    layer.msg('添加成功', {
                                        icon: 1
                                    });
                                    road_table.innerHTML += '<tr>' + '<td> ' + begin + '- ' + end + ' </td>' + '<td>当前隔离带的位置为'+roadChange+'<a style="float:right" onclick="dele(this,' + planRoad + ','+road_url+','+road_id+')" class="delete">删除</a></td>' + '</tr>';
                                } else if (data.rs === "f") {
                                    alert("添加失败");
                                }
                            },
                        })
                    

                }
            })

        });
    }


};
