function Coin(type){
	this.type=type;
	this.x=0;
	this.y=0;
	this.cur=0;
	
	this.move();
}
Coin.prototype.draw=function(gd){
	gd.save();
	
	var n=0;
	switch(this.type){
		case 1:
		case 2:
			n=1;
		break;
		case 3:
		case 4:
		case 5:
			n=2;
		break;
	}
	
	gd.translate(this.x,this.y);
	gd.drawImage(JSON['coinAni'+n],
			0,this.cur*60,60,60,-30,-30,60,60
	);
	
	gd.restore();
};
Coin.prototype.move=function(){
	var _this=this;
	
	setInterval(function(){
		_this.x+=(0-_this.x)/8;
		_this.y+=(640-_this.y)/8;
		
	},30);
	
	setInterval(function(){
		_this.cur++;
		_this.cur%=10;
	},100);	
};