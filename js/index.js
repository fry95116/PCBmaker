
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
