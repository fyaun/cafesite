$(function() {


//テキストのカウントアップの設定
var bar = new ProgressBar.Line(loading_text, {//id名を指定
    strokeWidth: 0,//進捗ゲージの太さ
    duration: 1000,//時間指定(1000＝1秒)
    trailWidth: 0,//線の太さ
    text: {//テキストの形状を直接指定   
        style: {
            position:'absolute',
            left:'50%',
            top:'50%',
            margin:'0',
            transform:'translate(-50%,-50%)',
            'font-family':'Playfair Display, sans-serif, serif',
            'font-size':'1.5rem',
            color:'#fff',
        },
        autoStyleContainer: false //自動付与のスタイルを切る
    },
    step: function(state, bar) {
        bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
    }
});
//アニメーションスタート
bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画
    $("#loading").delay(500).fadeOut(800);//アニメーションが終わったら#loadingをフェードアウト
});  



// ハンバーガー
let initialText = $('#myText').text(); // 初期のテキストを保存


$('.drawer-icon').on('click', function(e) {
    e.preventDefault();
  
    $('.drawer-icon').toggleClass('is-active');
    $('.drawer-content').toggleClass('is-active');
    $('.drawer-background').toggleClass('is-active');
    $('#wrapper').toggleClass('is-active');
    $('.wave').toggleClass('is-active');
    $('body').toggleClass('is-active');

    let currentText = $('#myText').text();

    if (currentText === initialText) {
        $('#myText').text('CLOSE');
      } else {
        $('#myText').text(initialText);
      }
  
    return false;
  });


//scroll_effect
$(window).scroll(function () {
    var scrollAnimationElm = document.querySelectorAll('.scroll_left');
    var scrollAnimationFunc = function () {
      for (var i = 0; i < scrollAnimationElm.length; i++) {
        var triggerMargin = 100;
        if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin) {
          scrollAnimationElm[i].classList.add('on');
        }
      }
    }
    window.addEventListener('load', scrollAnimationFunc);
    window.addEventListener('scroll', scrollAnimationFunc);
  });



  var unit = 100,
  canvasList, // キャンバスの配列
  info = {}, // 全キャンバス共通の描画情報
  colorList; // 各キャンバスの色情報

/**
* Init function.
* 
* Initialize variables and begin the animation.
*/
function init() {
  info.seconds = 0;
  info.t = 0;
      canvasList = [];
  colorList = [];
  // canvas1個めの色指定
  canvasList.push(document.getElementById("waveCanvas"));
  colorList.push(['#a6a7a9', '#a6a7a9', '#a6a7a9', '#a6a7a9', '#a6a7a9']);//重ねる波線の色設定
  
  
      // 各キャンバスの初期化
      for(var canvasIndex in canvasList) {
      var canvas = canvasList[canvasIndex];
      canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
      canvas.height = 200;//波の高さ
      canvas.contextCache = canvas.getContext("2d");
  }
  // 共通の更新処理呼び出し
      update();
}

function update() {
      for(var canvasIndex in canvasList) {
      var canvas = canvasList[canvasIndex];
      // 各キャンバスの描画
      draw(canvas, colorList[canvasIndex]);
  }
  // 共通の描画情報の更新
  info.seconds = info.seconds + .014;
  info.t = info.seconds*Math.PI;
  // 自身の再起呼び出し
  setTimeout(update, 35);
}

/**
* Draw animation function.
* 
* This function draws one frame of the animation, waits 20ms, and then calls
* itself again.
*/
function draw(canvas, color) {
      // 対象のcanvasのコンテキストを取得
  var context = canvas.contextCache;
  // キャンバスの描画をクリア
  context.clearRect(0, 0, canvas.width, canvas.height);

  //波線を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
  drawWave(canvas, color[0], 0.8, 3, 0);
  drawWave(canvas, color[1], 0.5, 4, 0);
  drawWave(canvas, color[2], 0.3, 1.6, 0);
  drawWave(canvas, color[3], 0.2, 3, 100);
  drawWave(canvas, color[4], 0.5, 1.6, 250);
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
  var context = canvas.contextCache;
  context.strokeStyle = color;//線の色
  context.lineWidth = 1;//線の幅
  context.globalAlpha = alpha;
  context.beginPath(); //パスの開始
  drawSine(canvas, info.t / 0.5, zoom, delay);
  context.stroke(); //線
}

/**
* Function to draw sine
* 
* The sine curve is drawn in 10px segments starting at the origin. 
* drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawSine(canvas, t, zoom, delay) {
  var xAxis = Math.floor(canvas.height/2);
  var yAxis = 0;
  var context = canvas.contextCache;
  // Set the initial x and y, starting at 0,0 and translating to the origin on
  // the canvas.
  var x = t; //時間を横の位置とする
  var y = Math.sin(x)/zoom;
  context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

  // Loop to draw segments (横幅の分、波を描画)
  for (i = yAxis; i <= canvas.width + 10; i += 10) {
      x = t+(-yAxis+i)/unit/zoom;
      y = Math.sin(x - delay)/3;
      context.lineTo(i, unit*y+xAxis);
  }
}

init();




  // スムーススクロール
  var pagetop = $('#page_top');
  pagetop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      pagetop.fadeIn();
    } else {
      pagetop.fadeOut();
    }
  });
  pagetop.click(function () {
    $('body, html').animate({
        scrollTop: 0
    }, 1000);
    return false;
  });


  $(document).ready(function() {
    const fixedElm = $('#header');

    let scrollPoint = 0;
    let lastPoint = 0;
    
    $(window).scroll(function() {
      scrollPoint = $(window).scrollTop();
      
      if (scrollPoint > lastPoint) {
        fixedElm.css('background-color', '');
      } else {
        fixedElm.css('background-color', '#0b0c10');
      }
      
      lastPoint = scrollPoint;

      if (scrollPoint === 0) {
        fixedElm.css('background-color', ''); // 背景色をデフォルト
      }

    });
  });



});