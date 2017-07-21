//音乐播放器模块
(function($,root){
    var $scope = $(document.body);
    // 构造函数
    var AudioPlayer = function(){
        this.audio = new Audio();
        this.status = 'pause';
        this.bindEvent();
    };
    AudioPlayer.prototype = {
        bindEvent: function(){
            $(this.audio).on('ended', function(){
                $scope.find('.next-btn').trigger('click');
            });
        },
        play: function(){
            this.audio.play();
            this.status = 'play';
        },
        pause: function(){
            this.audio.pause();
            this.status = 'pause';
        },
        setAudioSource: function(src){
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay:function(time){
            this.audio.currentTime = time;
            this.play();
        }
    };
    root.AudioPlayer = AudioPlayer;
}(window.Zepto,window.player || (window.player={})));