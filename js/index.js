$(document).ready(function(){
   $($('#elementKind ul')[0]).hoverAccordion();
});


function onReSize()
{
	$('#main').width($(window).width());
	$('#main').height($(window).height());
	if(pcb)
	{
		$('#canvas').attr('width',pcb.toCanvas(pcb.width)+'px');
		$('#canvas').attr('height',pcb.toCanvas(pcb.height)+'px');
	}
	if($('#pad').width()>$('#canvas').width())
	{
		$('#canvas').css('left',($('#pad').width()-$('#canvas').width())/2+'px');
	}
	else
	{
		$('#canvas').css('left','0px');
	}
	if($('#pad').height()>$('#canvas').height())
	{
		$('#canvas').css('top',($('#pad').height()-$('#canvas').height())/2+'px');
	}
	else
	{
		$('#canvas').css('top','0px');
	}
	pcb.refresh();
    document.getElementById('state').innerHTML=''+pcb.state;
}


//var vector=createVector();
var canvas=document.getElementById('canvas');
var con=canvas.getContext('2d');
var pcb=new PCBmodel(con,20,15,15);
$('#new').click(function()
{
    var w=$('#create');
    if(w.css('display')==='none') w.css('display','block');
    else w.css('display','none');

});
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
