var gulp = require('gulp');
//开启服务器插件
var connect = require('gulp-connect');
//less插件
var less = require('gulp-less');


//转移html文件
gulp.task('html', function(){
	//gulp中读取文件的函数gulp.src('')
	gulp.src('./src/index.html')   //把./src/index.html文件变成流
		.pipe(connect.reload())	   //监听文件流，如果有变化，服务器自动刷新
		.pipe(gulp.dest('./dist'));//把文件流变成html文件，并放在dist文件中

});
//转移css文件，并预编译less(即把less变成css)
gulp.task('css', function(){
	// gulp.src('./src/css/*.less')
	gulp.src('./src/css/*.less')
		.pipe(less())			//变成css形式
		.pipe(connect.reload()) //服务器监听css文件,西东刷新页面
		.pipe(gulp.dest('./dist/css'));
});
// 转移js
gulp.task('js',function(){
	gulp.src('./src/js/*.js')
		.pipe(connect.reload())
		.pipe(gulp.dest('./dist/js'));
})

//监听文件变化
gulp.task('watch', function(){
	gulp.watch('./src/index.html', ['html']);
	gulp.watch('./src/css/*.less', ['css']);
	gulp.watch('./src/js/*.js', ['js']);
});
//启动服务器
gulp.task('server', function(){
	connect.server({
		port:8002,
		livereload:true
	});
});
//




//触发事件
gulp.task('default', ['html', 'watch', 'server', 'css','js']);
