(function() {
    var $ = jQuery;
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
				holder = $('<div class="popup" style="display:none;"></div>'),
				close = $('<a href="javascript:void(0);" class="popup-close icon">&#xe61e;</a>'),
				inner = $('<div class="popup-inner"></div>').css({
					width: o.width
				}),
				roc = o.removeOnClose;

			close.appendTo(holder);
			//点击半透明层关闭
			if( o.blurToClose ){
				holder.on('click',function(e){
					e.target === this && holder.close();
				});
			}
			holder.on('click','.popup-close',function(){
				holder.close();
			});

			//添加当前DOM到holder
			this.appendTo( inner );
			inner.appendTo( holder );
			holder.appendTo(document.body);

			holder.open = function(){
				var t = this;
				if( o.beforeOpen.call(t) !== false ){
					root.addClass('popup-overflow');
					t.show();
					o.afterOpen.call(t);
				}
			};

			holder.close = function(handle){
				var t = this;
				if( o.beforeClose.call(t,handle) !== false ){
					roc ? t.remove() : t.hide();
					if( !$('.popup:visible').length ){
						root.removeClass('popup-overflow');	//只要还有弹框就不能移除
					}
				}
			};

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
			$( '.popup:visible > .popup-close' ).trigger('click');	
		}
	});
	//上下居中
	$(window).on('resize popup_reset',function(e){
		var pop = $('.popup-alert:visible'), panel = pop.find('.popup-inner');
		if( pop.length){
			var mgt = ( $(window).height() - panel.height() ) / 2 - 30;
			panel.css({
				marginTop : ( mgt > 0 ? mgt : 0 )
			});
		}
	});

	var formCreat = function(c){
		var t = c.items, 
			inputs = [];

		for (var i = 0; i < t.length; i++) {
			inputs.push( '<p class="ui-input"><span class="icon">'+t[i].icon+'</span><input type="'+(t[i].type||'text')+'" placeholder="'+t[i].label+'" name="'+t[i].name+'"/></p>' );
		};

		return inputs.join('');
	};
	var confirm = function(info,title,confirmLine,cbk){
		var des, type; 
		if( typeof confirmLine === 'function' ){
			cbk = confirmLine;
			confirmLine = null;
		}else{
			cbk = new Function();
		}
		info = (function(c){
			if( typeof c === 'object' ){
				des = !c.des ? '' : '<p class="ui-confirm-des">'+c.des+'</p>';
				confirmLine = '<p class="clearfix ui-confirm-forget">'
					+(!c.help ? '' : ('<span class="icon">&#xe62d;</span>'+c.help) )
					+'<a href="javascript:void(0);" class="ui-confirm-submit">'+(c.button||'确定')+'</a>'
				+'</p>';
				return formCreat(c);
			}else{
				type = 'popup-alert';
				return '<p class="ui-input popup-dialog">'+c+'&nbsp;</p>';
			}
		})(info);
		var panel = $('<div class="ui-confirm clearfix"><form action="">'
						+'<h1 class="ui-confirm-title">'+(title||'温馨提示')+'</h1>'
						+( des ? '<p class="ui-confirm-des">'+des+'</p>' : '' )
						+info
						+(confirmLine||'<p class="clearfix"><a href="javascript:void(0);" class="ui-confirm-cancel popup-close">取 消</a><a href="javascript:void(0);" class="ui-confirm-submit">确 定</a></p>')
					+'</form></div>');
		var	d = panel.pop({
				close : false,
				beforeOpen:function(){
					this.addClass(type);
				},
				beforeClose : function(handle){
					var rt = cbk.call( d, $(handle).hasClass('ui-confirm-submit') );
					return handle ? rt : undefined;
				},
				afterOpen : function(){
					$(window).trigger('popup_reset');	
				}
			});

		panel.on('click','.ui-confirm-submit',function(e){
			d.close( this );			
		});

	};
	$.extend({
		confirm: confirm,
		alert:function(info,title,cbk){
			confirm(info,title,'<p class="clearfix"><a href="javascript:void(0);" class="ui-confirm-submit">确 定</a></p>',cbk);
		}
	});
})();
