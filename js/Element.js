<<<<<<< HEAD
/**
 * Created by tom smith on 2015/2/6
 */


function Element()
{
    this.kind=0;
    this.p1={};
    this.p2={};
    this._build1=function(x,y)
    {
        this.p1.x=x;
        this.p1.y=y;
        this.build=this._build2;
    }
    this._build2=function(x,y)
    {
        this.p2.x=x;
        this.p2.y=y;
        if(Math.pow(this.p1.x,2)+Math.pow(this.p1.y,2)>Math.pow(this.p2.x,2)+Math.pow(this.p2.y,2))
        {
            var sw=this.p1;
            this.p1=this.p2;
            this.p2=sw;
        }
        delete this.build;
    }
    this.build=this._build1;

    this.drawPoint=function(context,x,y)
    {
        context.save();
        context.fillStyle='rgb(0,0,0)';
        context.beginPath();
        context.arc(x,y,3,0,Math.PI*2,true);
        context.closePath();
        context.fill();
        context.restore();
    }

    this.draw=function(context,pcb)
    {
        this._draw(context,pcb.toCanvas(this.p1.x),pcb.toCanvas(this.p1.y),pcb.toCanvas(this.p2.x),pcb.toCanvas(this.p2.y));
    }
}
/*画点，调试用*/
function Point(x,y)
{
    this.draw=function(context)
    {
        context.save();
        context.fillStyle='rgb(0,0,0)';
        context.beginPath();
        context.arc(x,y,5,0,Math.PI*2,true);
        context.closePath();
        context.fill();
        context.restore();
    }
}

function Resitor()
{
    Element.call(this);
    this.kind=1;
    this._draw=function(context,x1,y1,x2,y2)
    {
        //画焊点
        if(!(x1&&y1)) return;
        this.drawPoint(context,x1,y1);
        if(!(x2&&y2)) return;
        this.drawPoint(context,x2,y2);
        context.save();
        /*context.beginPath();
        context.arc(x1,y1,3,0, Math.PI * 2, true);
        context.arc(x2,y2,3,0, Math.PI * 2, true);
        context.closePath();
        context.fill();*/
        //画引脚
        context.strokeStyle='#000000';
        context.linewidth=2;
        context.beginPath();
        context.moveTo(x1,y1);
        context.save();
        context.translate((x1+x2)/2,(y1+y2)/2);
        context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
        context.lineTo(0,-20);
        context.moveTo(0,20);
        context.restore();
        context.lineTo(x2,y2);
        context.closePath();
        context.stroke();
        //画主体
        context.lineWidth=2;
        context.strokeStyle='#3433f1';
        context.fillStyle='rgba(153,204,255,0.45)';
        context.translate((x1+x2)/2,(y1+y2)/2);
        context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
        context.beginPath();
        context.moveTo(-6,20);
        context.lineTo(6,20);
        context.lineTo(6,-20);
        context.lineTo(-6,-20);
        context.closePath();
        context.stroke();
        context.fill();

        context.restore();
    }
}

function ElectrolyticCapacitor()
{
    Element.call(this);
    this.kind=2;
    this._draw=function(context,x1,y1,x2,y2)
    {
        //画焊点
        if(!(x1&&y1)) return;
        this.drawPoint(context,x1,y1);
        if(!(x2&&y2)) return;
        this.drawPoint(context,x2,y2);
        context.save();
        var radius=14;
        //画引脚
        context.strokeStyle='#000000';
        context.linewidth=2;
        context.beginPath();
        context.moveTo(x1,y1);
        context.save();
        context.translate((x1+x2)/2,(y1+y2)/2);
        context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
        context.lineTo(0,-radius);
        context.moveTo(0,radius);
        context.restore();
        context.lineTo(x2,y2);
        context.closePath();
        context.stroke();

        //画负极标志
        context.save();
        context.translate((x1+x2)/2,(y1+y2)/2);
        context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
        context.beginPath();
        context.arc(0,0,radius-context.linewidth/4,-1*Math.PI/3+Math.PI/2,Math.PI/3+Math.PI/2,false);
        context.closePath();
        context.restore();
        context.fillStyle='rgba(173,85,199,1)';
        context.fill();
        context.restore();
        //画主体
        context.fillStyle='rgba(173,85,199,0.45)';
        context.beginPath();
        context.arc((x1+x2)/2,(y1+y2)/2,radius,0,Math.PI*2,true);
        context.closePath();
        context.fill();
        context.stroke();


    }
}

function CeramicsCapacitor()
{
    Element.call(this);
    this.kind=3;
    this._draw=function(context,x1,y1,x2,y2)
    {
        //画焊点
        if(!(x1&&y1)) return;
        this.drawPoint(context,x1,y1);
        if(!(x2&&y2)) return;
        this.drawPoint(context,x2,y2);
        context.save();
        var a=6;
        var b=14;
        //画引脚
        context.strokeStyle='#000000';
        context.linewidth=2;
        context.beginPath();
        context.moveTo(x1,y1);
        context.save();
            context.translate((x1+x2)/2,(y1+y2)/2);
            context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
            context.lineTo(0,-10);
            context.moveTo(0,10);
            context.restore();
            context.lineTo(x2,y2);
            context.closePath();
            context.stroke();
            //画主体
            context.save();
                context.translate((x1+x2)/2,(y1+y2)/2);
                context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
                var radius=(a>b)?a:b;
                context.save();
                    context.scale(a/radius,b/radius);
                    context.beginPath();
                    context.arc(0,0,radius,0,Math.PI*2,true);
                    context.closePath();
                context.restore();
                context.stroke();
                context.fillStyle='rgba(53,196,125,0.45)';
                context.fill();
            context.restore();
        context.restore();
    }
=======
/**
 * Created by tom smith on 2015/2/6
 */


function Element()
{
    this.kind=0;
    this.p1={};
    this.p2={};
    this._build1=function(x,y)
    {
        this.p1.x=x;
        this.p1.y=y;
        this.build=this._build2;
    }
    this._build2=function(x,y)
    {
        this.p2.x=x;
        this.p2.y=y;
        if(Math.pow(this.p1.x,2)+Math.pow(this.p1.y,2)>Math.pow(this.p2.x,2)+Math.pow(this.p2.y,2))
        {
            var sw=this.p1;
            this.p1=this.p2;
            this.p2=sw;
        }
        delete this.build;
    }
    this.build=this._build1;

    this.drawPoint=function(context,x,y)
    {
        context.save();
        context.fillStyle='rgb(0,0,0)';
        context.beginPath();
        context.arc(x,y,3,0,Math.PI*2,true);
        context.closePath();
        context.fill();
        context.restore();
    }

    this.draw=function(context,pcb)
    {
        this._draw(context,pcb.toCanvas(this.p1.x),pcb.toCanvas(this.p1.y),pcb.toCanvas(this.p2.x),pcb.toCanvas(this.p2.y));
    }
}
/*画点，调试用*/
function Point(x,y)
{
    this.draw=function(context)
    {
        context.save();
        context.fillStyle='rgb(0,0,0)';
        context.beginPath();
        context.arc(x,y,5,0,Math.PI*2,true);
        context.closePath();
        context.fill();
        context.restore();
    }
}

function Resitor()
{
    Element.call(this);
    this.kind=1;
    this._draw=function(context,x1,y1,x2,y2)
    {
        //画焊点
        if(!(x1&&y1)) return;
        this.drawPoint(context,x1,y1);
        if(!(x2&&y2)) return;
        this.drawPoint(context,x2,y2);
        context.save();
        /*context.beginPath();
        context.arc(x1,y1,3,0, Math.PI * 2, true);
        context.arc(x2,y2,3,0, Math.PI * 2, true);
        context.closePath();
        context.fill();*/
        //画引脚
        context.strokeStyle='#000000';
        context.linewidth=2;
        context.beginPath();
        context.moveTo(x1,y1);
        context.save();
        context.translate((x1+x2)/2,(y1+y2)/2);
        context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
        context.lineTo(0,-20);
        context.moveTo(0,20);
        context.restore();
        context.lineTo(x2,y2);
        context.closePath();
        context.stroke();
        //画主体
        context.lineWidth=2;
        context.strokeStyle='#3433f1';
        context.fillStyle='rgba(153,204,255,0.45)';
        context.translate((x1+x2)/2,(y1+y2)/2);
        context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
        context.beginPath();
        context.moveTo(-6,20);
        context.lineTo(6,20);
        context.lineTo(6,-20);
        context.lineTo(-6,-20);
        context.closePath();
        context.stroke();
        context.fill();

        context.restore();
    }
}

function ElectrolyticCapacitor()
{
    Element.call(this);
    this.kind=2;
    this._draw=function(context,x1,y1,x2,y2)
    {
        //画焊点
        if(!(x1&&y1)) return;
        this.drawPoint(context,x1,y1);
        if(!(x2&&y2)) return;
        this.drawPoint(context,x2,y2);
        context.save();
        var radius=14;
        //画引脚
        context.strokeStyle='#000000';
        context.linewidth=2;
        context.beginPath();
        context.moveTo(x1,y1);
        context.save();
        context.translate((x1+x2)/2,(y1+y2)/2);
        context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
        context.lineTo(0,-radius);
        context.moveTo(0,radius);
        context.restore();
        context.lineTo(x2,y2);
        context.closePath();
        context.stroke();

        //画负极标志
        context.save();
        context.translate((x1+x2)/2,(y1+y2)/2);
        context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
        context.beginPath();
        context.arc(0,0,radius-context.linewidth/4,-1*Math.PI/3+Math.PI/2,Math.PI/3+Math.PI/2,false);
        context.closePath();
        context.restore();
        context.fillStyle='rgba(173,85,199,1)';
        context.fill();
        context.restore();
        //画主体
        context.fillStyle='rgba(173,85,199,0.45)';
        context.beginPath();
        context.arc((x1+x2)/2,(y1+y2)/2,radius,0,Math.PI*2,true);
        context.closePath();
        context.fill();
        context.stroke();


    }
}

function CeramicsCapacitor()
{
    Element.call(this);
    this.kind=3;
    this._draw=function(context,x1,y1,x2,y2)
    {
        //画焊点
        if(!(x1&&y1)) return;
        this.drawPoint(context,x1,y1);
        if(!(x2&&y2)) return;
        this.drawPoint(context,x2,y2);
        context.save();
        var a=6;
        var b=14;
        //画引脚
        context.strokeStyle='#000000';
        context.linewidth=2;
        context.beginPath();
        context.moveTo(x1,y1);
        context.save();
            context.translate((x1+x2)/2,(y1+y2)/2);
            context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
            context.lineTo(0,-10);
            context.moveTo(0,10);
            context.restore();
            context.lineTo(x2,y2);
            context.closePath();
            context.stroke();
            //画主体
            context.save();
                context.translate((x1+x2)/2,(y1+y2)/2);
                context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
                var radius=(a>b)?a:b;
                context.save();
                    context.scale(a/radius,b/radius);
                    context.beginPath();
                    context.arc(0,0,radius,0,Math.PI*2,true);
                    context.closePath();
                context.restore();
                context.stroke();
                context.fillStyle='rgba(53,196,125,0.45)';
                context.fill();
            context.restore();
        context.restore();
    }
>>>>>>> gh-pages
}