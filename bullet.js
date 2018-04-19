//炮弹具体尺寸
var BULLET_SIZE=[
	null,
	{x: 86, y: 0, w: 24, h: 26},
	{x: 62, y: 0, w: 25, h: 29},
	{x: 30, y: 0, w: 31, h: 35},
	{x: 32, y: 35, w: 27, h: 31},
	{x: 30, y: 82, w: 29, h: 33},
	{x: 0, y: 82, w: 30, h: 34},
	{x: 0, y: 0, w: 30, h: 44}
];

	
	function Bullet(type){
		this.type=type;
		this.x=0;
		this.y=0;
		this.iSpeed=10;
		this.w=BULLET_SIZE[this.type].w;
		this.h=BULLET_SIZE[this.type].h;
		this.rotate=0;
		
		this.move();
	}
	
	Bullet.prototype.draw=function(gd){
		gd.save();
		gd.translate(this.x,this.y);
		gd.rotate(d2a(this.rotate));
		gd.drawImage(JSON['bullet'],BULLET_SIZE[this.type].x,BULLET_SIZE[this.type].y,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
		
		gd.restore();
			
	};
	
	Bullet.prototype.move=function(){
		
		var _this=this;
		setInterval(function(){
			_this.x+=Math.sin(d2a(_this.rotate))*_this.iSpeed;
			_this.y-=Math.cos(d2a(_this.rotate))*_this.iSpeed;
		},30);
			
	};