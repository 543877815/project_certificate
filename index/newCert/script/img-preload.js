(function(){
    var imgs = document.getElementsByTagName("img");
    var imgsLength = imgs.length;
    var count = 0 ;
    var imgsArray = new Array();
    for (var i = 0 ; i < imgsLength ; i++){
        imgsArray.push(imgs[i].src);
    }
    $.each(imgsArray, function(i,src){
        var imgObj = new Image();
        $(imgObj).on("load error", function(){
            document.getElementsByClassName("percentage")[0].innerText = (Math.round((count+1)/imgsLength*100)) + "%";
           if(count >= imgsLength-1){
               document.getElementById("initial").style.display = 'none';
               document.getElementsByTagName("body")[0].style.overflow = 'scroll';
           }
           paint((count+1)/imgsLength);
           count++;
       })
        imgObj.src = src;
    })
 var circle = {
            x : 150,    //圆心的x轴坐标值
            y : 150,    //圆心的y轴坐标值
            r : 60,     //圆的半径
            w : 10,     //圆环的宽度
            gap : 72    //圆环间隙
        };
    //获取Canvas对象(画布)
    var canvasOutside = document.getElementById("canvasOutside");
    //简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
    if(canvasOutside.getContext){  
        //获取对应的CanvasRenderingContext2D对象(画笔)
        var ctx = canvasOutside.getContext("2d");  
        ctx.strokeStyle = "black";
        ctx.lineWidth = circle.w+2;
        for(var i = 0 ; i < 12 ; i ++ ){
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.r, (Math.PI/6)*i-(Math.PI/circle.gap), (Math.PI/6)*i+(Math.PI / circle.gap), false);    
            ctx.stroke();
        }

    }

    var canvasInside = document.getElementById("canvasInside");
    if(canvasOutside.getContext){
        var ctx = canvasInside.getContext("2d");
        //开始一个新的绘制路径
        ctx.beginPath();
        //设置弧线的颜色为蓝色
        ctx.strokeStyle = "#f7f7f7";
        ctx.lineWidth = circle.w;
        //沿着坐标点(100,100)为圆心、半径为50px的圆的顺时针方向绘制弧线
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, false);    
        //按照指定的路径绘制弧线
        ctx.stroke();
    }

    
    function paint(arg){
        var canvasInside = document.getElementById("canvasCenter");
        if(canvasOutside.getContext){
            var ctx = canvasInside.getContext("2d");
        //开始一个新的绘制路径
        ctx.beginPath();
        //设置弧线的颜色为蓝色
        ctx.strokeStyle = "#069";
        ctx.lineWidth = circle.w+1;
        //沿着坐标点(100,100)为圆心、半径为50px的圆的顺时针方向绘制弧线
        ctx.arc(circle.x, circle.y, circle.r, -Math.PI / 2, arg * Math.PI * 2 -Math.PI / 2, false);    
        //按照指定的路径绘制弧线
        ctx.stroke();
        ctx.closePath();
    }
}
})();