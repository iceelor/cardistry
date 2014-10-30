define("square", function(require, exports, module) {
	var loginUser = {
		id : 2850
	};

	var li = '{{#each list}}' +
			'<li class="type-{{type}} {{option}}-option">' +
			'	<a href="ownspace.html" class="user-photo" data-id="{{authorId}}"><img src="{{authorImg}}" /><span class="tl-name"">超级暗夜刺客</span></a>' +
			// '	<span class="tl-name"">超级暗夜刺客</span>' +
			'	<span class="icon tl-article">&#xe60a;</span>' +
			'	<span class="icon tl-video">&#xe613;</span>' +
			'	<div class="con">' +
			'		<a href="javascript:void(0)" class="clearfix">' +
			'			<div><img src="{{titleImg}}"><i></i></div>' +
			'			<strong>{{title}}</strong>' +
			'			<span>{{description}}</span>' +
			'		</a>' +
			'	</div>' +
			'	<div class="ui-func clearfix">' +
			'		<a href="javascript:void(0);" class="icon edit">&#xe61f;</a>' +
			'		<a href="javascript:void(0);" class="icon delete">&#xe627;</a>' +
			'		<a href="javascript:void(0);" class="icon heart">&#xe61d;</a>' +
			'		<a href="javascript:void(0);" class="icon share">&#xe636;</a>' +
			'	</div>' +
			'</li>{{/each}}',
	 	li_time = '{{#each group_list}}'+
	 		'<li class="tl-time"><b></b><span>{{date_group}}</span></li>'+li+
	 		'{{/each}}';

	seajs.use([
		'util/handlebars.min',
		'common/template-init',
		'common/date-util',
		'util/underscore.min'
	],function(template,T,DU){
		
		T.init({
			tmpl: $( '<script type="text/html"><ul class="clearfix">'+li_time+'</ul></script>' ),
			sourceUrl: 'json/square_list.json',
			target: '#timeline',
			begin:function(o){
				var t = o.source.list,
					groupMap = _.groupBy( t, function(item){
						item.option = loginUser.id === item.authorId ? 'self' : '';
						var d = new Date();
						d.setTime( item.gmt_create );
						return DU.format( d, 'yy年MM月' );
					} );

				o.source.group_list = _.map( groupMap, function(list,key){
					return {
						date_group:key,
						list:list
					}
				} );
			}
		});
		
	});

	var article_pop = '' +
		'<div class="article"></div>' +
		'<div class="discuss">' +
		'	<div class="discuss-form clearfix">' +
		'		<textarea>发表评论</textarea>' +
		'		<p><a href="">发送</a><span>你还可以输入500字</span></p>' +
		'	</div>' +
		'	<a href="" class="discuss-more">显示更早的回复</a>'+
		'	<div class="discuss-cont">' +
		'		<div class="discuss-box clearfix">'+
		'			<a href="" class="discuss-photo"><img src="images/4.jpg" /></a>'+
		'			<p class="discuss-message"><a href="">时扬扬</a> : </p>'+
		'			<p class="discuss-message">你好！</p>'+
		'			<p class="discuss-time">16:20 <a href=""><span class="icon">&#xe612;</span>回复</a></p>'+
		'		</div>'+
		'		<ul class="discuss-cont-inner" style="display:block;">'+
		'			<li class="clearfix">'+
		'				<a href="" class="discuss-photo"><img src="images/4.jpg" /></a>'+
		'				<p class="discuss-message"><a href="">张博</a> @ <a href="">时扬扬</a> : </p>'+
		'				<p class="discuss-message">你好</p>'+
		'				<p class="discuss-time">16:20 <a href=""><span class="icon">&#xe612;</span>回复</a></p>'+
		'			</li>'+
		'			<li class="clearfix">'+
		'				<a href="" class="discuss-photo"><img src="images/4.jpg" /></a>'+
		'				<p class="discuss-message"><a href="">张博</a> @ <a href="">时扬扬</a> : </p>'+
		'				<p class="discuss-message">你好</p>'+
		'				<p class="discuss-time">16:20 <a href=""><span class="icon">&#xe612;</span>回复</a></p>'+
		'			</li>'+
		'		</ul>'+
		'	</div>' +
		'	<div class="discuss-cont">' +
		'		<div class="discuss-box clearfix">'+
		'			<a href="" class="discuss-photo"><img src="images/4.jpg" /></a>'+
		'			<p class="discuss-message"><a href="">时扬扬</a> : </p>'+
		'			<p class="discuss-message"> 你好</p>'+
		'			<p class="discuss-time">16:20 <a href=""><span class="icon">&#xe612;</span>回复</a></p>'+
		'		</div>'+
		'		<ul class="discuss-cont-inner" style="display:block;">'+
		'			<li class="clearfix">'+
		'				<div class="discuss-form clearfix">' +
		'					<textarea>发表评论</textarea>' +
		'					<p><a href="">发送</a><span>你还可以输入500字</span></p>' +
		'				</div>' +
		'			</li>'+
		'		</ul>'+
		'	</div>' +
		'</div>';

	seajs.use(['common/popup'],function(){
		$(document).on('click','.con a',function(){
			$(article_pop).pop({width:1000});
		});
	});
});