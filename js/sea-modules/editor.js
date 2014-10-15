define("sea-modules/editor", function(require, exports, module) {
	window.UEDITOR_HOME_URL = '/js/ueditor/';

	seajs.use('ueditor/ueditor.config',function(){
		seajs.use(['ueditor/ueditor.all','sea-modules/common/popup'],function(){
			var ue = UE.getEditor('editor');


			$.ajax({
				url: '/html/1413298462460.htm',
				cache:false,
				success:function(htm){
					ue.addListener("ready", function () {
					    ue.setContent(htm);
					});
				} 
			});

			$('#submit').on('click',function(){
				$.ajax({
					url:'?',
					type:'post',
					dataType:'json',
					data:{
						id: 	1413298462460,
 						html: 	ue.getAllHtml(),
						content:ue.getContent(),
						text: 	ue.getContentTxt() 
					},
					success:function(d){
						if(d.success){
							open(d.url);
						}
					}
				});
			});
		});
	});
	
});
