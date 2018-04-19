//鱼
		var FISH_SIZE=[
			null,
			{w: 55, h: 37, collR: 17},
			{w: 78, h: 64, collR: 24},
			{w: 72, h: 56, collR: 20},
			{w: 77, h: 59, collR: 22},
			{w: 107, h: 122, collR: 29}
		];
		
		//鱼
		function Fish(type){
			this.type=type;
			this.x=0;
			this.y=0;
			this.w=0;
			this.h=0;
			this.rotate=0;
			this.ispeed=1;
			this.cur=0;
			this.collR=FISH_SIZE[this.type].collR;
			
			this.move();
		}
		Fish.prototype.draw=function(gd){
			var w=FISH_SIZE[this.type].w;
			var h=FISH_SIZE[this.type].h;
			
			gd.save();
			gd.translate(this.x,this.y);
			gd.rotate(d2a(this.rotate));
			
			if(this.rotate>90){
				gd.scale(1,-1);
			}
			
			gd.drawImage(JSON['fish'+this.type],0,this.cur*h,w,h,-w/2,-h/2,w,h);
			gd.restore();
		};
		
		Fish.prototype.move=function(){
			var _this=this;
			setInterval(function(){
				_this.x+=Math.cos(d2a(_this.rotate))*_this.ispeed;
				_this.y+=Math.sin(d2a(_this.rotate))*_this.ispeed;
			},30);
			
			//画尾巴
			setInterval(function(){
				_this.cur++;
				_this.cur%=4;
			},200);
		};
		
		Fish.prototype.inFish=function(x,y){
			var a=y-this.y;
			var b=x-this.x;
			
			var c=Math.sqrt(a*a+b*b);
			
			if(c<this.collR){
				return true;
			}else{
				return false;	
			}
			
		};
		
		
		
		
		
		
		
		
		
		
		
		
		