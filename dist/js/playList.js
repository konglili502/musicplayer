//渲染歌曲列表
(function($,root){
    var $playList = $('<div class="play-list">' + 
                    '<div class="line-head">播放列表</div>' + 
                    '<ul class="play-list-wrapper">1</ul>'+ 
                    '<div class="close-btn">关闭</div>' +
                    '</div>');
    var $scope = $(document.body);
    var controlManager;
    //
    function render(data){
        var html = '';
        for(var i = 0; i < data.length; i++){
            html += '<li><h3>' + data[i].song + '<span> - ' + data[i].singer + '</span></h3></li>';
        }
        $playList.find('ul').html(html);
        $scope.append($playList);
        bindEvent();
    }
    //绑定事件
    function bindEvent(){
        $scope.on('click', '.close-btn', function(){
            $playList.removeClass('show');
        });
        $scope.on('click','li',function(){
            var index = $(this).index();
            controlManager.index = index;
            signSong(index);
            $scope.trigger('player:change',[index,true]);
            $scope.find('.play-btn').addClass('playing');
            setTimeout(function(){
                $scope.find('.play-list').removeClass('show');
            },500);
        }) 
    }
    //标记正在播放的歌曲
    function signSong(index){
        $playList.find('.playing').removeClass('playing');
        $playList.find('li').eq(index).addClass('playing');
    }
    //
    function show(index,control){
        controlManager = control;
        signSong(index);
        $playList.addClass('show');
    }
    root.playList = {
        render:render,
        show:show
    };
}(window.Zepto,window.player || (window.player={})));