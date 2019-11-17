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
    time.class="time_log"
    time.innerHTML=current;
    var content =  document.getElementById("content");
    content.appendChild(time);
    var main_log = document.createElement("div");
    main_log.class="change_Log";
    main_log.innerHTML = e.data;
    content.appendChild(main_log);
};

ws.onclose = function (e) {
    console.log("服务器关闭");
};
ws.onerror = function () {
    console.log("连接出错");
};
