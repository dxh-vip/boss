var JSON={};

//d2a
function d2a(n){
	return n*Math.PI/180;	
}

//a2d
function a2d(n){
	return n*180/Math.PI;	
}

//随机数
function rnd(m,n){
	return parseInt(Math.random()*(m-n)+n);	
}


//加载游戏资源
function loadImage(arr,fnSucc,fnLoad){
	var count=0;
	for(var i=0; i<arr.length;i++){
		var oImage=new Image();
		(function(index){
			oImage.onload=function(){
				count++;		
				
				//保存资源
				JSON[arr[index]]=this;
				
				fnLoad && fnLoad(count,arr.length);
				
				if(count==arr.length){
					fnSucc && fnSucc();	
				}
			
			};	
		})(i);
			
		oImage.src='img/'+arr[i]+'.png';
	};	
}