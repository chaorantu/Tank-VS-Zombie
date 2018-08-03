$(function(){
	trackMove();
	//小车的移动
	carMove();
	makeCars();
})
var score=0;
var num=5;
var movecar=[];
var movecar1=[];
var item1=[];
var hit=[];
var hit1=[];
var time=3000;
var i=0;
var x=0;
var y=0;
function trackMove(){
	$(".track").animate({"top":"-1%"},time,"linear",function(){
		$(".track").animate({"top":"-100%"},0);
		trackMove();
	});
}
//记录当前跑道位置
var roadCount = 2;
function carMove(){
	document.onkeydown=function(ev){
		var eve =ev||event;
		if(eve.keyCode == 37){
//			roadCount = roadCount<=0?0:roadCount-1;
            roadCount--;
			if(roadCount>=0){
			$("#car").animate({"left":2.5 + 20*roadCount + "%"},300,"linear");
			}
			else{
				roadCount=0;
			}
		}
		else if(eve.keyCode == 39){
//			roadCount=roadCount>=4?4:roadCount+1;
            roadCount++;
            if(roadCount<=4){
			$("#car").animate({"left":2.5 + 20*roadCount + "%"},300,"linear");
			}
            else{
            	roadCount=4;
            }
		}
		else if(eve.keyCode == 32){
			if(num>0){
			num--;
			document.getElementById('bulletnum'). innerHTML="子弹数："+num;
			var car =document.getElementById("car");
			var carTop=car.offsetTop;
			var carHeight=car.offsetHeight;
			var carLeft=car.offsetLeft;
			var carWidth=car.offsetWidth;
			var bullet =document.createElement("div");
			$(".trackBox").append(bullet);
			bullet.className="Bullet";
			$(bullet).css("left",carLeft+carWidth*.5-bullet.offsetWidth*.5);
			$(bullet).css("top",carTop);
//			var test=bullet.offsetTop;
//          console.log(test);
			$(bullet).animate({"top":"1%"},1000,"linear",function(){
		    bullet.remove();
	});
	        Shoot(bullet);
		}
			else{
				$("#remind").fadeIn(1000,function(){
			$("#remind").fadeOut(200);
		});
			}
		}
	}
}
//创建其他小车定时器
var timerOfMake
function makeCars(){
	timerOfMake=setInterval(function(){
		makeCar();
	},600);
}
function makeCar(){
	//定义一个其他小车
	var state=Math.floor(Math.random()*2);
	var item=Math.floor(Math.random()*10);
	if(item==0){
	var div2 =document.createElement("div");
	//把它放到trackBox里
	$(".trackBox").append(div2);
	//给他一个样式
	div2.className="item_bullet";
	var roadNum=Math.floor(Math.random()*5);
	$(div2).css("left",5+roadNum*20+"%");
	item1[y]=div2;
	y++;
	$(div2).animate({"top":"100%"},2000,"linear",function(){
		div2.remove();
	});
	//碰撞检测
	crashCar(div2,"0");
	}
	if(state==0){
	var div =document.createElement("div");
	//把它放到trackBox里
	$(".trackBox").append(div);
	//给他一个样式
	div.className="otherCar";
	var roadNum=Math.floor(Math.random()*5);
	$(div).css("left",5+roadNum*20+"%");
	var duration = Math.floor(Math.random()*6000);
	duration=duration<2000?2000:duration;
	movecar[i]=div;
	hit[i]=0;
	i++;
	$(div).animate({"top":"100%"},duration,"linear",function(){
		div.remove();
	});
	//碰撞检测
	crashCar(div,"1");
	}
	if(state==1){
		var div1 =document.createElement("div");
	//把它放到trackBox里
	$(".trackBox").append(div1);
	//给他一个样式
	div1.className="otherCar1";
	$(div1).addClass("walk");
	var roadNum=Math.floor(Math.random()*5);
	$(div1).css("left",2.5+roadNum*20+"%");
	var duration = Math.floor(Math.random()*6000);
	duration=duration<2000?2000:duration;
	movecar1[x]=div1;
	hit1[x]=0;
	x++;
	$(div1).animate({"top":"100%"},duration,"linear",function(){
		div1.remove();
	});
	//碰撞检测
	crashCar(div1,"1");
	}
}
function crashCar(div,p){
//	取到我要移动的小车
	var car =document.getElementById("car");
	setInterval(function(){
	var carLeft=car.offsetLeft;
	var carTop=car.offsetTop;
	var carWidth=car.offsetWidth;
	var carHeight=car.offsetHeight;
	var divLeft=div.offsetLeft;
	var divTop=div.offsetTop;
	var divWidth=div.offsetWidth;
	var divHeight=div.offsetHeight;
	if(Math.abs(carTop-divTop)<divHeight && Math.abs(carLeft-divLeft)<divWidth){
		if(p==1){
		$(car).addClass("boom");
		gameOver();
		}
		if(p==0){
		num=num+10;
		document.getElementById('bulletnum'). innerHTML="子弹数："+num;
		div.remove();
		}
	}
	},30);
}
function Shoot(bullet){
	setInterval(function(){
	var bulletTop=bullet.offsetTop;
	var bulletLeft=bullet.offsetLeft;
	var bulletWidth=bullet.offsetWidth;
	var bulletHeight=bullet.offsetHeight;
	
//	console.log(movecar[1].offsetTop);
for(var n=0;n<movecar.length;n++)
{
	var carLeft=movecar[n].offsetLeft;
	var carTop=movecar[n].offsetTop;
	var carWidth=movecar[n].offsetWidth;
	var carHeight=movecar[n].offsetHeight;
	if(Math.abs(carTop-bulletTop)<carHeight && carLeft<bulletLeft&&bulletLeft<carLeft+carWidth){
		//gameOver();
		$(movecar[n]).addClass("boom");
		hit[n]++;
		bullet.remove();
		if(hit[n]==2){
	    movecar[n].remove();
	    
//		movecar[n].remove();
		score++;
		document.getElementById('score'). innerHTML="得分："+score;
		}
	}
}
for(var m=0;m<movecar1.length;m++)
{
	var carLeft=movecar1[m].offsetLeft;
	var carTop=movecar1[m].offsetTop;
	var carWidth=movecar1[m].offsetWidth;
	var carHeight=movecar1[m].offsetHeight;
	if(Math.abs(carTop-bulletTop)<carHeight && carLeft<bulletLeft&&bulletLeft<carLeft+carWidth){
		//gameOver();
		$(movecar1[m]).removeClass("walk").addClass("boom1");
		bullet.remove();
		 setTimeout(function(){
	    	movecar1[m].remove();
	    },400);
		score++;
		var sco=document.getElementById('score');
		sco. innerHTML="得分："+score;
	}
}
	},30);
}

function gameOver(){
	alert("GAME OVER");
	window.location.reload();
}
