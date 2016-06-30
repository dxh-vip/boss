window.onload=function(){
	var oC=document.querySelector('#c1');
	var gd=oC.getContext('2d');
	
	loadImage(resource,function(){
		
		//存放炮弹
		var arr_bullet=[];
		
		//存鱼
		var arr_fish=[];
		
		//存死鱼
		var arr_dieFish=[];	
		
		
		//存金币
		var arr_coin=[];
		
		//存渔网
		var arr_web=[];
		
		
		//画炮
		var c=new Cannon(1);
		
		var derection=[-1,1];
		
		setInterval(function(){
			
			gd.clearRect(0,0,oC.width,oC.height);
			
			//出鱼
			if(Math.random()<=0.05){
				var f=new Fish(rnd(1,6));
				
				derection.sort(function(){
					return Math.random()-0.5;	
				});
				
				f.y=rnd(100,500);
				if(derection[0]>0){
					f.rotate=rnd(-45,45);		
				}else{
					f.x=oC.width;
					f.rotate=rnd(145,225);	
				}
				
				
				arr_fish.push(f);
			}
			
			
			
			//画鱼
			for(var i=0;i<arr_fish.length;i++){
				arr_fish[i].draw(gd);	
			}
			
			
			//画炮弹
			for(var i=0; i<arr_bullet.length;i++){
				arr_bullet[i].draw(gd);
			}
			
			
			//画死鱼
			for(var i=0; i<arr_dieFish.length;i++){
				arr_dieFish[i].draw(gd);	
			}
			
			//画金币
			for(var i=0; i<arr_coin.length;i++){
				arr_coin[i].draw(gd);
			}
			
			//画渔网
			for(var i=0; i<arr_web.length;i++){
				arr_web[i].draw(gd);
			}
			
			
			//碰撞检测
			for(var i=0; i<arr_fish.length;i++){
				for(var j=0; j<arr_bullet.length;j++){
					if(arr_fish[i].inFish(arr_bullet[j].x,arr_bullet[j].y)){
						
						var x=arr_fish[i].x;
						var y=arr_fish[i].y;
						var type=arr_fish[i].type;
						
						
						//创建死鱼
						var dieFish=new DieFish(type);
						
						dieFish.x=x;
						dieFish.y=y;
						dieFish.w=FISH_SIZE[arr_fish[i].type].w;
						dieFish.h=FISH_SIZE[arr_fish[i].type].h;
						dieFish.rotate=arr_fish[i].rotate;
						
						
						arr_dieFish.push(dieFish);
						
						
						setTimeout(function(){
							arr_dieFish.shift();
							arr_web.shift();
						},500);
						
						
						//创建金币
						var coin=new Coin(type);
						coin.x=x;
						coin.y=y;
						arr_coin.push(coin);
						
						
						
						//创建渔网
						var web=new Web(type);
						web.x=x;
						web.y=y;
						arr_web.push(web);
						
						
						//创建音频
						var oA=new Audio();
						oA.src='snd/coin.wav';
						oA.play();
						
						
						arr_fish.splice(i,1);
						i--;
						
						arr_bullet.splice(j,1);
						j--;	
					}					
				}
			}
			
			
			
			//画炮台
			gd.drawImage(JSON['bottom'],0,0,765,72,5,oC.height-72,765,72);
			c.draw(gd);
			
		},16);
	
	
		
		oC.onclick=function(ev){
			var x=ev.clientX-c.x-oC.offsetLeft;
			var y=c.y-ev.clientY-oC.offsetTop;
			
			var d=90-a2d(Math.atan2(y,x));
			
			c.rotate=d;
			c.emitChange();
			
			//创建炮弹
			var oBullet=new Bullet(c.type);
			
			
			oBullet.x=c.x;
			oBullet.y=c.y;
			oBullet.rotate=c.rotate;
			arr_bullet.push(oBullet);
			
			var oA=new Audio();
			oA.src='snd/cannon.mp3';
			oA.play();
		};
	});
};