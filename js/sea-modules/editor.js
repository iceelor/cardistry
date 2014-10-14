define("sea-modules/editor", function(require, exports, module) {
	window.UEDITOR_HOME_URL = '/js/ueditor/';

	seajs.use('ueditor/ueditor.config',function(){
		seajs.use(['ueditor/ueditor.all','sea-modules/common/popup'],function(){
			var ue = UE.getEditor('editor');

				$('#submit').on('click',function(){
					alert( ue.getAllHtml(), '显示正文' );
				});
		});
	});
	
});
