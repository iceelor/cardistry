define("menu", function(require, exports, module) {
	seajs.use(['common/popup','common/valid'],function(){
		var _email = $.form.regValids.email;

		$('#identification').on('click',function(){
			$.confirm( {
				items:[{
					name:"code",
					icon:"&#xe62c;",
					label:"邀请码"
				}],
				des:'请输入邀请码:',
				help:'<a href="#" target="_blank">如何获得邀请码？</a>'
			}, '资深玩家认证', function(r){
				if( r ){
					var err = $.form.valid( $('[name=code]',this),{required:true} );
					alert(err);
					return !err;
				}
			});
		});

		$('#logIn').on('click',function(){
			$.confirm({
				items:[
					{name:"email", 	icon:"&#xe62e;",label:"账号"},
					{name:"pswd",	icon:"&#xe62c;",label:"密码",type:'password'}
				],
				des:'请使用cardistry.cn账号登录：<a href="javascript:void(0);" onclick="$(\'#register\').trigger(\'click\');"><span class="icon">&#xe61c;</span>注册</a>',
				help:'<a href="#" target="_blank">忘记密码?</a>',
				button:'登录'
			},'登录',function(r){
				if( r ){
					return !!$(this).formValid(!1,{
						interrupt:true,
						get:function(name){return this[name]},
						email:{required:true,regexp:_email ,errorTip:'不是合法的email格式'},
						pswd: {required:true,regexp:/^\w+$/,errorTip:'只能使用字母数字及下划线',minlen:6,maxlen:20}
					},{
						validTip:function(inp,err){
							if(err){alert(inp[0].placeholder+err)}
						}
					});
				}
			});
		});


		$('#register').on('click',function(){
			$.confirm({
				items:[
					{name:"email", 	icon:"&#xe62e;",label:"账号"},
					{name:"username",	icon:"&#xe603;",label:"用户名"},
					{name:"userpass",	icon:"&#xe62c;",label:"密码",type:'password'},
					{name:"userpass1",	icon:"&#xe62c;",label:"确认密码",type:'password'},
					{name:"phone",	icon:"&#xe639;",label:"联系电话"},
					{name:"yzm",	icon:"&#xe62c;",label:"验证码", type:'code', src:'/image.do?type=reg'}
				],
				des:'请填写必要信息：',
				help:'<a href="#" target="_blank">如何获取内测邀请码</a>',
				button:'注册'
			},'注册账号',function(r){
				if( r ){
					if( $('[name=pswd]',this).val() != $('[name=pswd1]',this).val() ){
						alert('两次密码不一致');
						return false;
					}
					if( !!$(this).formValid(!1,{
						interrupt:true,
						get:function(name){return this[name]},
						email:{required:true,regexp:_email ,errorTip:'不是合法的email格式'},
						username: {required:true,regexp:/^\w+$/,errorTip:'只能使用字母数字及下划线',maxlen:20},
						userpass: {required:true,regexp:/^\w+$/,errorTip:'只能使用字母数字及下划线',minlen:6,maxlen:20},
						userpass1:{required:true,regexp:/^\w+$/,errorTip:'只能使用字母数字及下划线',minlen:6,maxlen:20},
						phone: {type:'mobile',errorTip:'请输入正确的手机号'},
						yzm: {required:true,regexp:/^\w+$/}
					},{
						validTip:function(inp,err){
							if(err){alert(inp[0].placeholder+err)}
						}
					}) ){
						$.ajax({
							url: '/register.do',
							type: 'post',
							dataType:'json',
							data: $(this).find('form').serialize(),
							success:function(res){
								console.log(res);
							}
						});
					}else{
						return false;
					}
				}
			});
		});
	});

	seajs.use(['common/requestAFrame'],function(R){
		var index = 1, 
			info = ['<a href="javascript:void(0)"><span class="icon" >&#xe62e;</span>您有3条新消息</a>',
					'<a href=""><span class="icon">&#xe60e;</span>您有个人信息需要完善！</a>'];
		R.addTimeout('message',function(){
			$('#tip')
				.prepend( $('<div class="tip-line" style="display:none">'+info[++index%2]+'<b class="icon" onclick="$(this).parent().remove();">&#xe61e;</b></div>').fadeIn() )
				.children(':gt(7)').fadeOut(function(){
					$(this).remove()
				});
		},5000);
	});
});
