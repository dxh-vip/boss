function Web(type){
	this.type=type;
	this.x=0;
	this.y=0;
	this.w=240;
	this.h=240;
	this.scale=0.8;

	this.move();
}

Web.prototype.draw=function(gd){
	gd.save();

	gd.translate(this.x,this.y);

	if(this.scale>1.2){
		this.scale=1;
	}
	gd.scale(this.scale,this.scale);
	gd.drawImage(JSON['web'],0,0,this.w,this.h,-this.w/3,-this.h/3,this.w/1.5,this.h/1.5);

	gd.restore();
};

Web.prototype.move=function(){
	var _this=this;
	setInterval(function(){
		_this.scale+=0.1;
	},200);
};
