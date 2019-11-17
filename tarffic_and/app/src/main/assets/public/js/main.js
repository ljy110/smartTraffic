var ws = new WebSocket('ws://localhost:8080');
ws.onopen = function () {
    console.log('服务器打开');
    ws.send('from client: hello');
};
ws.onmessage = function (e) {
    console.log('ws onmessage');
    console.log('from server: ' + e.data);
    var myDate = new Date();
    var month=myDate.getMonth()+1;
    var current = myDate.getFullYear()+"年"+month+"月"+myDate.getDate()+"日"+""+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
    var time = document.createElement("p");
    time.classList.add("time_log");
    time.innerHTML=current;
    var content =  document.getElementById("content");
    content.appendChild(time);
    var main_log = document.createElement("div");
    main_log.classList.add("change_log");
    main_log.innerHTML = e.data;
    content.appendChild(main_log);
};

ws.onclose = function (e) {
    console.log("服务器关闭");
};
ws.onerror = function () {
    console.log("连接出错");
};

var baseurl = "http://116.62.147.57:6789";


// $.ajax({
//     url:baseurl+'/Log',
//     data:'{}'
// })



$(document).ready(function(){
    var dis_select = $("#dis_select");
    var road1_select = $("#road1_select");
    var road2_select = $("#road2_select");
    var dis_road = $("#dis_road");

    
});

function add_dis(id) {
    for(var i=0;i<TJ.length;i++){
        id.innerHTML+="<option value='"+TJ[i].name+"'>" +TJ[i].name+"</option>"
    }
}

add_dis(dis_select);
add_dis(dis_road);



// 信号灯全局设置查看
dis_select.onchange = function (e)
{
    var light_id = "";
    var dis_val = dis_select.value;
    for (var i = 0;i<TJ.length;i++){
        if (dis_val===TJ[i].name){
            var roadList = TJ[i].roadList;
            var light_id1 = TJ[i].num;
            removeEle(road1_select);
            removeEle(road2_select);
            for (var j = 0;j<roadList.length;j++){
                road1_select.innerHTML+="<option value='"+roadList[j].roadname+"'>" +roadList[j].roadname+"</option>"
                road2_select.innerHTML+="<option value='"+roadList[j].roadname+"'>" +roadList[j].roadname+"</option>"
            }
            road1_select.onchange = function (e) {
                var road1_val = road1_select.value;
                for (var k=0;k<roadList.length;k++){
                    if (road1_val===roadList[k].roadname){
                        var light_id2=roadList[k].num;

                        road2_select.onchange = function (e) {
                            var road2_val = road2_select.value;
                            for (var w = 0;w<roadList.length;w++){
                                if (road2_val===roadList[w].roadname){
                                    light_id=light_id1+""+light_id2+""+roadList[w].num;


                                    // var storage = window.localStorage;
                                    // storage["light_id"] = light_id;
                                    // console.log(storage["light_id"]);
                                    
                                    // url_index = '1'
                                    // light_table.innerHTML+='<tr>'+ '<td> '+'8:00-9:00'+' </td>'+'<td><a style="float:right" onclick="dele(this,'+url_index+')" class="delete">删除</a></td>'+'</tr>';

                                    $.ajax({
                                        url: baseurl+"/Lightconf/view",
                                        type:"post",
                                        data:'{"rid":'+light_id+'}',
                                        success:function (data) {
                                            console.log(data);        
                                            var storage = window.localStorage;
                                            storage["light_id"] = light_id;
                                            console.log(storage["light_id"]);                                            
                                            url_index = '0'                
                                            var arr = JSON.parse(data);                
                                            for (var k = 0;k<arr.length;k++){
                                                mid = arr[k].mid;
                                                rid = arr[k].rid;
                                                console.log(arr[k])
                                                //arr[k] = JSON.parse(arr[k])
                                                light_table.innerHTML+='<tr>'+ '<td> '+arr[k].begin+'- '+arr[k].end+' </td>'+'<td>'+arr[k].time +'s后变换信号灯 <a style="float:right" onclick="dele(this,'+mid+','+url_index+','+rid+')" class="delete">删除</a></td>'+'</tr>';
                                            }
                                            
                                            

                                        }
                                   })
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
// 信号灯全局设置


// 车道全局设置
dis_road.onchange = function (e) {
    var r_val = document.getElementById("r_road");
    var road_id = "";
    var dis_val = dis_road.value;
    console.log(dis_val)
    for (var i = 0; i<TJ.length;i++){
        if (dis_val===TJ[i].name){
            var roadList = TJ[i].roadList;
            var road_id1= TJ[i].num;
            removeEle(r_val);
            for (var j = 0;j<roadList.length;j++){
                r_val.innerHTML+="<option value='"+roadList[j].roadname+"'>" +roadList[j].roadname+ "</option>"
            }
            r_val.onchange = function (e) {
                var r = r_val.value;
                for (var j=0 ; j<roadList.length;j++){
                    if (r === roadList[j].roadname){
                        console.log(roadList[j].num);
                        road_id=road_id1+""+ roadList[j].num;
                    }
                }
                
                var storage = window.localStorage;
                storage["road_id"] = road_id;
                var road_url = '1'
                $.ajax({
                    url: baseurl+"/Roadconf/view",
                    type:"POST",
                    data: '{rid:'+road_id+'}',
                    success:function (data) {
                        console.log(data)
                        var arry = JSON.parse(data);
                        //road_table.innerHTML += '<tr>' + '<td> ' + arry.begin + '- ' + arry.end + ' </td>' + '<td>隔离带当前位置为'+arry.pos+'<a style="float:right" onclick="dele(this,' + arry.mid + ' ,'+road_url+','+arry.rid+')" class="delete">删除</a></td>' + '</tr>';
                        for (var k = 0;k<arry.length;k++){
                            var info = {"mid":arr[k].mid,"rid":arr[k].rid};
                            road_table.innerHTML += '<tr>' + '<td> ' + begin + '- ' + end + ' </td>' + '<td>隔离带当前位置为'+arr[k].pos+'<a style="float:right" onclick="dele(this,' + info + ')" class="delete">删除</a></td>' + '</tr>';
                        }

                    },
                    error:function(){
                        console.log("失败");
                    }
                    
                    
                })
            }
        }
    }
};


function removeEle(val) {
    var option = val.getElementsByTagName("option");
    for (var k=0;k<option.length;k++){
        val.removeChild(option[k]);
    }
    val.innerHTML="<option value=" + "0" + ">" + "--请选择--" + "</option>";
}

function removeTr(id) {
    var tr = id.getElementsByTagName("tr");
    for (var k=0;k<tr.length;k++){
        val.removeChild(tr[k]);
    }
}

function addTr(id,arr) {

}












