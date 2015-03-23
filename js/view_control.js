$(document).ready(function() {
	$('.sidebar-panel').perfectScrollbar();
	$('#pad').perfectScrollbar();
	$('#msg_new_file').draggable();
	//msg_new_file
	$('#new_file').click(function() {
		$(this).toggleClass('focus');
		$('#msg_new_file').clearForm().toggle('normal');
	});
	$('#msg_new_file .close').click(function() {
		$('#new_file').trigger('click');
		return false;
	});
	//保存文件
	$('#save_file').click(function() {
		if (typeof(pcb) === 'undefined') return;
		var data = new Blob([JSON.stringify(pcb)]);
		$(this).html('<a download="untitled.pcm" href="' + window.URL.createObjectURL(data) + '">点击以保存</a>');
	});
	$('#save_file').mouseleave(function() {
		$(this).html('保存');
	});
	//打开文件
	function loadFile(str, title) {
		if (typeof(paper) !== 'undefined') {
			if (pcb.get('changed') == false) {
				paper.clear();
			} else {
				if (confirm('有修改尚未保存！\n是否放弃未保存的修改？')) {
					console.log('t');
					paper.clear();
				} else {
					return false;
				}
			}
		}
		var init = $.parseJSON(str);
		var ex_init = init.existelements.slice(0);
		init.existelements = null;
		init.name = title;
		_.each(ex_init, function(cxt) {
			cxt.render = elementkinds.findWhere({
				kind: cxt.kind
			}).get('render');
		});
		pcb = new PCB(init);
		paper = new Paper({
			model: pcb
		});
		el_list = new Meun_ExistElements({
			model: pcb.get('existelements')
		});
		$('#pad').append(paper.$el);
		pcb.get('existelements').reset(ex_init);
		pcb.set('changed', false);
	}

	$('#files').change(function() {

		var fr = new FileReader();
		var title = this.files[0].name;
		fr.onloadend = function(evt) {
			if (FileReader.DONE == fr.readyState) {
				loadFile(this.result, title);
			}
		}
		fr.readAsText(this.files[0]);
		$(this).val('');
	});
	//新建文件
	$('#msg_new_file form').submit(function() {
		var init = {};
		_.each($(this).serializeArray(), function(context) {
			if (context.value != '') {
				init[context.name] = parseInt(context.value);
			}
		});
		if (typeof(paper) !== 'undefined') {
			if (pcb.get('changed') == false) {
				paper.clear();
			} else {
				if (confirm('有修改尚未保存！\n是否放弃未保存的修改？')) {
					console.log('t');
					paper.clear();
				} else {
					console.log('f');
					$('#new_file').trigger('click');
					return false;
				}
			}
		}
		pcb = new PCB(init);
		paper = new Paper({
			model: pcb
		});
		el_list = new Meun_ExistElements({
			model: pcb.get('existelements')
		});
		$('#pad').append(paper.$el);
		$('#new_file').trigger('click');
		return false;
	});
	//paper
	$('.paper .header').click(function() {
		$('.paper form').slideToggle();
	});
	//sidebar
	$('.tab').click(function(e) {
		$('.sidebar-panel').hide().removeClass('selected').eq($(this).index()).show().addClass('selected');
		$(this).addClass('selected').siblings().removeClass('selected');
		$('.sub_item').each(function() {
			$(this).find('img').height($(this).height()).css('display', 'block');
		});
	});

	$('.sub_item').click(function() {
		$(this).find('img').toggleClass('sub_item_rotate');
		$(this).next().slideToggle(function() {
			$('#sidebar .panel').perfectScrollbar('update');
		});
		$(this).parent().siblings().find('ul').slideUp(function() {
			$('#sidebar .panel').perfectScrollbar('update');
		});
		$(this).parent().siblings().find('.sub_item>img').removeClass('sub_item_rotate');
	});
	//控制面板
	$('#con-btn-up').click(function() {
		if (typeof(pcb) !== 'undefined')
			_.each(pcb.get('existelements').where({
				selected: true
			}), function(cxt) {
				var p1 = cxt.get('p1'),p2 = cxt.get('p2');
				var p1x=p1.x,p1y=p1.y,p2x=p2.x,p2y=p2.y;
				cxt.setP1(p1x,--p1y);
				cxt.setP2(p2x,--p2y);
			});
	});
	$('#con-btn-down').click(function() {
		if (typeof(pcb) !== 'undefined')
			_.each(pcb.get('existelements').where({
				selected: true
			}), function(cxt) {
				var p1 = cxt.get('p1'),p2 = cxt.get('p2');
				var p1x=p1.x,p1y=p1.y,p2x=p2.x,p2y=p2.y;
				cxt.setP1(p1x,++p1y);
				cxt.setP2(p2x,++p2y);
			});
	});
	$('#con-btn-left').click(function() {
		if (typeof(pcb) !== 'undefined')
			_.each(pcb.get('existelements').where({
				selected: true
			}), function(cxt) {
				var p1 = cxt.get('p1'),p2 = cxt.get('p2');
				var p1x=p1.x,p1y=p1.y,p2x=p2.x,p2y=p2.y;
				cxt.setP1(--p1x,p1y);
				cxt.setP2(--p2x,p2y);
			});
	});
	$('#con-btn-right').click(function() {
		if (typeof(pcb) !== 'undefined')
			_.each(pcb.get('existelements').where({
				selected: true
			}), function(cxt) {
				var p1 = cxt.get('p1'),p2 = cxt.get('p2');
				var p1x=p1.x,p1y=p1.y,p2x=p2.x,p2y=p2.y;
				cxt.setP1(++p1x,p1y);
				cxt.setP2(++p2x,p2y);
			});
	});
	$('#con-btn-del').click(function() {
		if (typeof(pcb) !== 'undefined')
			_.each(pcb.get('existelements').where({
				selected: true
			}), function(cxt) {
				cxt.destroy()
			});
	});
	onReSize();
});

$(window).resize(
	function() {
		onReSize();
	}
);

function onReSize() {
	$('#pad').perfectScrollbar('update');
	$('#sidebar-panel').perfectScrollbar('update');
	$('#main').width($(window).width());
	$('#main').height($(window).height());
	$('.sub_item').each(function() {
		$(this).find('img').height($(this).height()).css('display', 'block');
	});
	$('.tab').each(function() {
		var img = $(this).find('img');
		img.width($(this).width());
		img.css('margin-top', (($(this).height() - img.height()) / 2) + 'px');
		img.show();
	});
}