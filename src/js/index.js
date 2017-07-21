//移动端jquery库
var $ = window.Zepto;
var $scope = $(document.body);
var dataUrl = '/mock/data.json';
var player = window.player;
console.log(player);
var render = player.render;
var songList;
var controlManager;
var audioPlayer = new player.AudioPlayer();
var processor = player.processor;

var playList = player.playList;

//绑定一个自定义事件
$scope.on('player:change',function(e, index,flag){
	var curData = songList[index];
	render(curData);
	audioPlayer.setAudioSource(curData.audio);
	if(audioPlayer.status === 'play' || flag){
		audioPlayer.play();
		processor.start();
	}
	processor.render(curData.duration);
})

//绑定touch事件
function bindTouch(){
	var $slidePint = $scope.find('.slide-point');
	var offset = $scope.find('.pro-wrapper').offset();
	// console.log(offset);
	var left = offset.left;
	var width = offset.width;
	$slidePint.on('touchstart', function(){
		processor.stop();
	}).on('touchmove',function(e){
		// console.log(e);
		var x = e.changedTouches[0].clientX - left;
		var percent = x/width;
		if(percent < 0){
			percent = 0;
		}else if(percent > 1){
			percent = 1;
		}
		processor.updata(percent);
	}).on('touchend',function(e){
		var x = e.changedTouches[0].clientX - left;
		var percent = x/width;
		if(percent < 0){
			percent = 0;
		}else if(percent > 1){
			percent = 1;
		}
		var index = controlManager.index;
		var curDuration = songList[index].duration;
		var curTime = percent * curDuration;
		audioPlayer.jumpToPlay(curTime);
		processor.start(percent);
		$scope.find('.play-btn').addClass('playing');
	})
}
//绑定点击事件
$scope.on('click', '.prev-btn', function(){
	var index = controlManager.prev();
	$scope.trigger('player:change',index);
});
$scope.on('click', '.next-btn', function(){
	var index = controlManager.next();
	$scope.trigger('player:change',index);
});
$scope.on('click','.play-btn',function(){
	//toggleClass('playing')如果.play-btn中没有playing的类，就把playing的类加进去，如果有，就删除
	$(this).toggleClass('playing'); 
	if(audioPlayer.status === 'pause'){
		audioPlayer.play();
		processor.start(); 
	}else{
		audioPlayer.pause();
		processor.stop();
	}
});
//在公司调用Ajax请求
$scope.on('click','.like-btn',function(){
	var index = controlManager.index;
	$scope.find('.like-btn').toggleClass('liked');
	songList[index].isLike = !songList[index].isLike;
})

$scope.on('click','.list-btn',function(index){
	var index = controlManager.index;
	playList.show(index,controlManager);
}) 



//首先进行数据请求
function getData(url, cb){
	$.ajax({
		url:url,
		type:'GET',
		success:cb,
		error:function(e){
			console.log(e);
		}
	});
}

//成功的回调函数
function successCb(data){
	console.log(data);
	songList = data;
	bindTouch();
	playList.render(data);
	controlManager = new player.ControlManager(songList.length);
	$scope.trigger('player:change',0);
}
getData(dataUrl, successCb);


