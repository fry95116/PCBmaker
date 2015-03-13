/*$(document).ready(function(){
	$('#elementKind>ul').hoverAccordion();
	$('#elementKind').perfectScrollbar();
	$('#elementKind>ul>li').mouseover(
		function(){
			console.log('t');
			$('#elementKind').perfectScrollbar('update');
		}
	);
});*/
$(document).ready(function(){
	$('#sidebar .panel').perfectScrollbar();
	$('#pad').perfectScrollbar();
	$('.tab').click(function(e){
		$('.panel').hide().removeClass('selected').eq($(this).index()).show().addClass('selected');
		$(this).addClass('selected').siblings().removeClass('selected');
		$('.sub_item').each(function(){
			$(this).find('img').height($(this).height()).css('display','block');
		});
	});
	$('.sub_item').each(function(){
		$(this).find('img').height($(this).height()).css('display','block');
	});
	$('.sub_item').click(function(){
		$(this).find('img').toggleClass('sub_item_rotate');
		//$(this).parent().find('li').slideToggle();
		//$(this).parent().siblings().find('li').slideUp(function(){$('#elementKind').perfectScrollbar('update');});
		$(this).next().slideToggle();
		$(this).parent().siblings().find('ul').slideUp(function(){$('#sidebar .panel').perfectScrollbar('update');});
		$(this).parent().siblings().find('.sub_item>img').removeClass('sub_item_rotate');

	});


});
function onReSize()
{
	var canvas=$('#canvas'),pad=$('#pad');
	$('#sidebar .panel').perfectScrollbar('update');
	$('#main').width($(window).width());
	$('#main').height($(window).height());
	if(pcb)
	{
		canvas.attr('width',pcb.toCanvas(pcb.width)+'px');
		canvas.attr('height',pcb.toCanvas(pcb.height)+'px');
	}
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
	pad.perfectScrollbar('update');
	pcb.refresh();
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


var canvas=document.getElementById('canvas');
var con=canvas.getContext('2d');
var pcb=new PCBmodel(con,20,60,40);

canvas.onclick=function(e)
{
  console.log('pos:'+pcb.toLocal(e.offsetX||e.layerX)+','+pcb.toLocal(e.offsetY||e.layerY));
  var x=pcb.toLocal(e.offsetX||e.layerX);
  var y=pcb.toLocal(e.offsetY||e.layerY)
  if(!(pcb.existElement[0]&&pcb.existElement[0].build))
  {
    pcb.existElement.unshift(new CeramicsCapacitor());
  }
  pcb.existElement[0].build(x,y);
  pcb.refresh();
};

onReSize();
//pcb.refresh();
/*canvas.onmousemove=function(e)
{
	drawPoint(toLocalAxis(e.layerX,e.layerY).x,toLocalAxis(e.layerX,e.layerY).y);
};*/

$(window).resize
(
	function()
	{
		onReSize();
	//	pcb.refresh();
	}
//	refresh(context,pcb);
);
