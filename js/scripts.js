(function($){

	$.fn.extend({
		pop:function(opt){
			var o = $.extend({
				beforeOpen:function(){},
				afterOpen:function(){},
				beforeClose:function(){},
				width : 680,
				autoOpen: true,
				close : true,		//显示关闭按钮
				removeOnClose : true, 	//关闭时移除DOM
				blurToClose : false 		//是否支持点击半透明层关闭弹框
			},opt);

			var root = $('html'),
				holder = $('<div class="popholder" style="display:none;"></div>'),
				close = $('<a class="pp-close icon">ã</a>'),
				inner = $('<div class="pp-inner"></div>').css({
					width: o.width
				}),
				roc = o.removeOnClose;

			holder.open = function(){
				var t = this;
				if( o.beforeOpen.call(t) !== false ){
					root.addClass('pop-overflow');
					t.show();
					o.afterOpen.call(t);
				}
			};

			holder.close = function(handle){
				var t = this;
				if( o.beforeClose.call(t,handle) !== false ){
					roc ? t.remove() : t.hide();
					if( !$('.popholder:visible').length ){
						root.removeClass('pop-overflow');	//只要还有弹框就不能移除
					}
				}
			};

			//添加关闭按钮和操作	
			if( o.close ){
				close.appendTo(holder);
			}
			//点击半透明层关闭
			if( o.blurToClose ){
				holder.on('click',function(e){
					e.target === this && holder.close();
				});
			}
			holder.on('click','.pp-close',function(){
				holder.close();
			});

			//添加当前DOM到holder
			this.appendTo( inner );
			inner.appendTo( holder );
			holder.appendTo(document.body);
			//自动打开
			if( o.autoOpen ){
				holder.open();
			}
			return holder;
		}
	});

	// confirm|alert 相关 全局操作
	$(document).on('keyup',function(e){
		if( e.keyCode == 27 ){
			$( '.popholder:visible .pp-title .pp-close' ).trigger('click');	
		}
	});
	//上下居中
	$(window).on('resize ppreset',function(e){
		var pop = $('.popholder:visible'), panel = pop.find('.pp-dialog');
		if( pop.length && panel.length ){
			var mgt = ( $(window).height() - panel.height() ) / 2;
			panel.css({
				marginTop : ( mgt > 0 ? mgt : 0 )
			});
		}
	});

	$.extend({
		confirm: function(info,title,buttons,cbk){
			buttons = buttons || ['确定','取消'];
			cbk = cbk || new Function();
			var panel = $('<div class="pp-confirm pp-dialog"><h3 class="pp-title">'
							+(title||'确认')+
							'<a class="pp-close icon">ã</a></h3><div class="pp-panel">'
							+info+
							'</div><div class="pp-btnline"><a href="javascript:;" class="pp-ensure button btn-blue">'
							+(buttons[0]||'确定')+
							'</a>&nbsp;<a href="javascript:;" class="pp-close button btn-gray">'
							+(buttons[1]||'取消')+
							'</a></div></div>');
			var	d = panel.pop({
					width : 320,
					close : false,
					beforeClose : function(handle){
						var rt = cbk.call( d, $(handle).hasClass('pp-ensure') );
						return handle ? rt : undefined;
					},
					afterOpen : function(){
						$(window).trigger('ppreset');
					}
				});

			panel.on('click','.pp-ensure',function(e){
				d.close( this );			
			});

		},
		alert:function(info,title,cbk){
			cbk = cbk || new Function();
			var panel = $('<div class="pp-alert pp-dialog"><h3 class="pp-title">'
							+(title||'警告')+
							'<a class="pp-close icon">ã</a></h3><div class="pp-panel">'
							+info+
							'</div><div class="pp-btnline"><a href="javascript:;" class="pp-close button btn-blue">确定</a></div></div>');
			var	d = panel.pop({
					width : 320,
					close : false,
					beforeClose : function(){
						cbk.call( d );
					},
					afterOpen : function(){
						$(window).trigger('ppreset');
					}
				});
		}
	});

	

})(jQuery);