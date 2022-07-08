$(function(){
    // 我们要定义两个变量来控制，一个控制图片的个数，一个控制小点的，因为个数不一样
    var $key = 0;//这个变量控制图片的播放
    var $circle = 0;//控制下面的小点，或者控制有序列表
    var speed = 1000;//设置时间，后面谁需要谁调用
    // 点击右侧，因为要滑动，我们animate
    $("#right").click(function(){
        // 右侧直接调用包包--定时器
        autoplay();
    });

    // 左侧按钮开始，右侧++ 改成左侧-- 直接赋值右侧
    $("#left").click(function(){
        $key--;
        // 判断
        if($key < 0){
            // alert("我走完了")
            $key = 4;//因为我们到了第五张图，所以是4
            $("#box ul").css("left",-4500);//因为我们要看5张图最左侧的距离 -5*900
        }
        $("#box ul").stop().animate({"left":-$key*900},speed);

        // 下面的控制的小点点要跟着动
        $circle--;
        // 要判断，因为我们有5个点，所以到4
        if($circle < 0){
            $circle = 4;
        }
        $("#box ol li").eq($circle).addClass('current').siblings().removeClass('current');
    });

    // 定时器开始，其实定时器就是跟我们右侧点击一样
    var timer = setInterval(autoplay,2000);
    function autoplay(){
        $key++;//因为我们处于第一张图，点击就开始播放第二张
        // 判断
        if($key > 5){
            // alert("我走完了")
            $key = 1;//因为我们到了第六张图，其实按道理下次就应该到第二张图，所以$key = 1
            $("#box ul").css("left",0);//因为我们要快速恢复到原来的位置，所以直接css
        }
        $("#box ul").stop().animate({"left":-$key*900},speed);

        // 下面的控制的小点点要跟着动
        $circle++;
        // 要判断，因为我们有5个点，所以到4
        if($circle > 4){
            $circle = 0;//表示从第一个开始
        }
        $("#box ol li").eq($circle).addClass('current').siblings().removeClass('current');
    }

    // 下面是点击小按钮
    $("#box ol li").click(function(){
        $key = $(this).index();
        $circle = $(this).index();
        // 下面的就是跟上面思路一样的
        $("#box ul").stop().animate({"left":-$key * 900},speed);
        $("#box ol li").eq($circle).addClass('current').siblings().removeClass('current');
    })

    // 清除定时器，鼠标经过的时候清除定时器
    $("#box").hover(function(){
        clearInterval(timer);
        timer = null;//节省内存
    },function(){
        // 工作经验
        clearInterval(timer);
        timer = setInterval(autoplay,2000);
    })
})