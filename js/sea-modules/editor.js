define("editor", function(require, exports, module) {
	window.UEDITOR_HOME_URL = '/js/sea-modules/ueditor/';

	seajs.use('ueditor/ueditor.config',function(){
		seajs.use(['common/queryparam','ueditor/ueditor.all','common/popup'],function(Q){
			var ue = UE.getEditor('editor');
			var id = Q('id'); //1413298462460

			if(id){
				$.ajax({
					url: '/html/'+id+'.htm',
					cache:false,
					success:function(htm){
						ue.addListener("ready", function () {
						    ue.setContent(htm);
						});
					} 
				});
			}

			$('#submit').on('click',function(){
				$.ajax({
					url:'?',
					type:'post',
					dataType:'json',
					data:{
						id: 	id,
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
