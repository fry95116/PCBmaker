$(document).ready(function(){
	$('#sidebar .panel').perfectScrollbar();
	$('#messagebar').draggable({handle:"img"});
	$('#pad').perfectScrollbar();
	$('.tab').click(function(e){
		$('.panel').hide().removeClass('selected').eq($(this).index()).show().addClass('selected');
		$(this).addClass('selected').siblings().removeClass('selected');
		$('.sub_item').each(function(){
			$(this).find('img').height($(this).height()).css('display','block');
		});
	}); 
	
	$('.sub_item').click(function(){
		$(this).find('img').toggleClass('sub_item_rotate');
		//$(this).parent().find('li').slideToggle();
		//$(this).parent().siblings().find('li').slideUp(function(){$('#elementKind').perfectScrollbar('update');});
		$(this).next().slideToggle(function(){
			$('#sidebar .panel').perfectScrollbar('update');
		});
		$(this).parent().siblings().find('ul').slideUp(function(){$('#sidebar .panel').perfectScrollbar('update');});
		$(this).parent().siblings().find('.sub_item>img').removeClass('sub_item_rotate');
	});
	/*$('#meun_elementkind>li').click(function(){
		$(this).find('img').fadeToggle('narmal');
	});*/
	onReSize();
});

$(window).resize
(
	function()
	{
		onReSize();
	//	pcb.refresh();
	}
//	refresh(context,pcb);
);

function onReSize()
{
	var canvas=$('#canvas'),pad=$('#pad');
	$('#sidebar .panel').perfectScrollbar('update');
	$('#main').width($(window).width());
	$('#main').height($(window).height());
	/*if(typeof(pcb)!='undefined'){
		canvas.attr('width',pcb.toCanvas(pcb.width)+'px');
		canvas.attr('height',pcb.toCanvas(pcb.height)+'px');
		if(pad.width()>canvas.width())
		{
			canvas.css('left',(pad.width()-canvas.width())/2+'px');
		}
		else
		{
			canvas.css('left','0px');
		}
		if(pad.height()>canvas.height())
		{
			canvas.css('top',(pad.height()-canvas.height())/2+'px');
		}
		else
		{
			canvas.css('top','0px');
		}
		pcb.refresh();
	}*/
	pad.perfectScrollbar('update');
	
	$('.sub_item').each(function(){
		$(this).find('img').height($(this).height()).css('display','block');
	});
	$('.tab').each(function(){
		var img=$(this).find('img');
		img.width($(this).width());
		img.css('margin-top',(($(this).height()-img.height())/2)+'px');
		img.show();
	});
}