window.onload = function() {
  var oC = document.querySelector('#c1');
  var gd = oC.getContext('2d');
  // 可视窗口高度
  var oCwidth = getClientWidth();
  // 可视窗口宽度
  var oCheight = getClientHeight();
  // 炮台宽度 = 可视窗口宽度
  // 炮台高度
  var batteryHeight = parseInt(parseInt(oCwidth) * 122 / 765);
  var batteryHeight1 = parseInt(parseInt(oCwidth) * 122 / 765 * 0.59);

  //判断横屏竖屏
  function checkDirect() {
    if (
      document.documentElement.clientHeight >=
      document.documentElement.clientWidth
    ) {
      return 'portrait';
    } else {
      return 'landscape';
    }
  }

  //显示屏幕方向提示浮层
  function orientNotice() {
    var orient = checkDirect();
    if (orient != 'portrait') {
      orientLayer.style.display = 'none';
    } else {
      orientLayer.style.display = 'block';
    }
  }

  loadImage(resource, function() {
    //存放炮弹
    var arr_bullet = [];

    //存鱼
    var arr_fish = [];

    //存死鱼
    var arr_dieFish = [];

    //存金币
    var arr_coin = [];

    //存渔网
    var arr_web = [];

    var derection = [-1, 1];

    //画炮
    var c = new Cannon(1);
    setInterval(function() {
      var orient = checkDirect();
      oCwidth = getClientWidth();
      oCheight = getClientHeight();
      gd.clearRect(0, 0, oCwidth, oCheight);
      oC.setAttribute('width', oCwidth);
      oC.setAttribute('height', oCheight);
      batteryHeight = parseInt(parseInt(oCwidth) * 122 / 765);
      batteryHeight1 = parseInt(parseInt(oCwidth) * 122 / 765 * 0.59);
      c.x = oCwidth / 2 + CANNON_SIZE[c.type].w / 2;
      c.y = oCheight - CANNON_SIZE[c.type].h / 2 + 10;
      if (orient != 'portrait') {
        //出鱼
        if (Math.random() <= 0.05) {
          var f = new Fish(rnd(1, 6));

          derection.sort(function() {
            return Math.random() - 0.5;
          });

          f.y = rnd(100, 500);
          if (derection[0] > 0) {
            f.rotate = rnd(-45, 45);
          } else {
            f.x = oC.width;
            f.rotate = rnd(145, 225);
          }
          arr_fish.push(f);
        }
        //画鱼
        for (var i = 0; i < arr_fish.length; i++) {
          arr_fish[i].draw(gd);
        }

        //画炮弹
        for (var i = 0; i < arr_bullet.length; i++) {
          arr_bullet[i].draw(gd);
        }

        //画死鱼
        for (var i = 0; i < arr_dieFish.length; i++) {
          arr_dieFish[i].draw(gd);
        }

        //画金币
        for (var i = 0; i < arr_coin.length; i++) {
          arr_coin[i].draw(gd);
        }

        //画渔网
        for (var i = 0; i < arr_web.length; i++) {
          arr_web[i].draw(gd);
        }
        //碰撞检测
        for (var i = 0; i < arr_fish.length; i++) {
          for (var j = 0; j < arr_bullet.length; j++) {
            if (arr_fish[i].inFish(arr_bullet[j].x, arr_bullet[j].y)) {
              var x = arr_fish[i].x;
              var y = arr_fish[i].y;
              var type = arr_fish[i].type;

              //创建死鱼
              var dieFish = new DieFish(type);

              dieFish.x = x;
              dieFish.y = y;
              dieFish.w = FISH_SIZE[arr_fish[i].type].w;
              dieFish.h = FISH_SIZE[arr_fish[i].type].h;
              dieFish.rotate = arr_fish[i].rotate;

              arr_dieFish.push(dieFish);

              setTimeout(function() {
                arr_dieFish.shift();
                arr_web.shift();
              }, 500);

              //创建金币
              var coin = new Coin(type);
              coin.x = x;
              coin.y = y;
              arr_coin.push(coin);

              //创建渔网
              var web = new Web(type);
              web.x = x;
              web.y = y;
              arr_web.push(web);

              arr_fish.splice(i, 1);
              i--;

              arr_bullet.splice(j, 1);
              j--;
            }
          }
        }
        gd.drawImage(
          JSON['bottom'],
          0,
          0,
          765,
          122,
          0,
          oCheight - batteryHeight1,
          oCwidth,
          batteryHeight
        );
        c.draw(gd);
      }
    }, 16);

    oC.addEventListener('touchstart', function(ev) {
      console.log(ev.targetTouches[0]);
      var x = ev.targetTouches[0].clientX - c.x - oC.offsetLeft;
      var y = c.y - ev.targetTouches[0].clientY - oC.offsetTop;
      var d = 90 - a2d(Math.atan2(y, x));

      c.rotate = d;
      c.emitChange();

      //创建炮弹
      var oBullet = new Bullet(c.type);

      oBullet.x = c.x;
      oBullet.y = c.y;
      oBullet.rotate = c.rotate;
      arr_bullet.push(oBullet);

      //创建音频
      // var oA = new Audio();
      // oA.src = 'snd/cannon.mp3';
      // oA.play();
    });
  });

  function init() {
    orientNotice();
    window.addEventListener(
      'onorientationchange' in window ? 'orientationchange' : 'resize',
      function() {
        oCwidth = getClientWidth();
        oCheight = getClientHeight();
        c = new Cannon(1, oCwidth, oCheight);
        console.log(c);
        setTimeout(orientNotice, 50);
      }
    );
  }
  init();
};
