<<<<<<< HEAD
function PCBmodel(context,scale,w,h)
{
	this.scale=scale;
	this.width=w+20;
	this.height=h+20;
	this.existElement=[];
    this.context=context;
	this.state=0;

	this.toCanvas=function(input)
	{
        if(input)return input*this.scale+0.5;
        return undefined;
	}
	this.toLocal=function(input)
    {
        if(input)return Math.round(input/this.scale);
        return undefined;
    }
	this.refresh=function()
	{
		this.clear();
		this.drawRange();
		this.drawGrid();
		this.drawDDB(10,10,pcb.width-20,pcb.height-20);
        this.drawElements();
	}

	//清空canvas
	//
	this.clear=function()
	{
		context.clearRect(0,0,context.canvas.width,context.canvas.height);
	}

	this.drawRange=function()
	{
		context.save();
		context.fillStyle='rgb(255,255,255)';
		context.fillRect(0,0,this.toCanvas(this.width-1),this.toCanvas(this.height-1));
		context.strokeRect(0,0,this.toCanvas(this.width-1),this.toCanvas(this.height-1));
		context.restore();
	}

	this.drawGrid=function()
	{
		context.save();
		context.strokeStyle='rgba(0,0,0,0.3)';
		context.lineWidth=1;
		context.beginPath();
		for(x=0;x<pcb.width;x++)
		{
			context.moveTo(this.toCanvas(x),0);
			context.lineTo(this.toCanvas(x),this.toCanvas(pcb.height-1));

		}
		for(y=0;y<pcb.height;y++)
		{
			context.moveTo(0,this.toCanvas(y));
			context.lineTo(this.toCanvas(pcb.width-1),this.toCanvas(y));

		}
		context.closePath();
		context.stroke();
		context.restore();
	}

	this.drawDDB=function(x,y,width,height)
	{
		context.save();
		//设置状态
		context.strokeStyle='black';
		context.fillStyle='#f6f1c3';
		context.lineWidth=2;
		context.beginPath();
		//画框
		context.moveTo(this.toCanvas(x-0.5),this.toCanvas(y-0.5));
		context.lineTo(this.toCanvas(x+width-0.5),this.toCanvas(y-0.5));
		context.lineTo(this.toCanvas(x+width-0.5),this.toCanvas(y+height-0.5));
		context.lineTo(this.toCanvas(x-0.5),this.toCanvas(y+height-0.5));
		context.lineTo(this.toCanvas(x-0.5),this.toCanvas(y-0.5));
		//画圈
		var radius=0.17;
		for(i=y;i<y+height;i++)
		{
			for(j=x;j<x+width;j++)
			{
				context.moveTo(this.toCanvas(j+radius),this.toCanvas(i));
				context.arc(this.toCanvas(j),this.toCanvas(i),this.toCanvas(radius), 0, Math.PI * 2, true);
			}
		}
		context.closePath();
		context.stroke();
		context.fill();
		//画焊盘
		context.strokeStyle='#ffb942';
		context.lineWidth=3;
		context.beginPath();
		for(i=y;i<y+height;i++)
		{
			for(j=x;j<x+width;j++)
			{
				context.moveTo(this.toCanvas(j+radius),this.toCanvas(i));
				context.arc(this.toCanvas(j),this.toCanvas(i), this.toCanvas(radius), 0, Math.PI * 2, true);
			}
		}
		context.closePath();
		context.stroke();
		context.restore();
	}

    this.drawElements=function()
    {
        for(var i=0;i<this.existElement.length;i++ )
        {
            this.existElement[i].draw(context,this);
        }
    }

}

/*this.drawCeramicsCapacitor=function(x1,y1,x2,y2)
{
	context.save();
	var a=0.3;
	var b=0.7;
	//画引脚
	context.strokeStyle='#000000';
	context.linewidth=2;
	context.beginPath();
	context.moveTo(toCanvasAxis(x1),toCanvasAxis(y1));
	context.save();
	context.translate((toCanvasAxis(x1)+toCanvasAxis(x2))/2,(toCanvasAxis(y1)+toCanvasAxis(y2))/2);
	context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
	context.lineTo(0,toCanvasAxis(-0.5));
	context.moveTo(0,toCanvasAxis(0.5));
	context.restore();
	context.lineTo(toCanvasAxis(x2),toCanvasAxis(y2));
	context.closePath();
	context.stroke();
	//画焊点
	context.beginPath();
	context.arc(toCanvasAxis(x1),toCanvasAxis(y1),3,0, Math.PI * 2, true);
	context.arc(toCanvasAxis(x2),toCanvasAxis(y2),3,0, Math.PI * 2, true);
	context.closePath();
	context.fill();
	//画主体
	context.save();
	context.translate((toCanvasAxis(x1)+toCanvasAxis(x2))/2,(toCanvasAxis(y1)+toCanvasAxis(y2))/2);
	context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
	var radius=(a>b)?a:b;
	context.save();
	context.scale(a/radius,b/radius);
	context.beginPath();
	context.arc(0,0,toCanvasAxis(radius),0,Math.PI*2,true);
	context.closePath();
	context.restore();
	context.stroke();
	context.fillStyle='rgba(53,196,125,0.45)';
	context.fill();
	context.restore();
	context.restore();
}*/
=======
function PCBmodel(context,scale,w,h)
{
	this.scale=scale;
	this.width=w+20;
	this.height=h+20;
	this.existElement=[];
    this.context=context;
	this.state=0;

	this.toCanvas=function(input)
	{
        if(input)return input*this.scale+0.5;
        return undefined;
	}
	this.toLocal=function(input)
    {
        if(input)return Math.round(input/this.scale);
        return undefined;
    }
	this.refresh=function()
	{
		this.clear();
		this.drawRange();
		this.drawGrid();
		this.drawDDB(10,10,pcb.width-20,pcb.height-20);
        this.drawElements();
	}

	//清空canvas
	//
	this.clear=function()
	{
		context.clearRect(0,0,context.canvas.width,context.canvas.height);
	}

	this.drawRange=function()
	{
		context.save();
		context.fillStyle='rgb(255,255,255)';
		context.fillRect(0,0,this.toCanvas(this.width-1),this.toCanvas(this.height-1));
		context.strokeRect(0,0,this.toCanvas(this.width-1),this.toCanvas(this.height-1));
		context.restore();
	}

	this.drawGrid=function()
	{
		context.save();
		context.strokeStyle='rgba(0,0,0,0.3)';
		context.lineWidth=1;
		context.beginPath();
		for(x=0;x<pcb.width;x++)
		{
			context.moveTo(this.toCanvas(x),0);
			context.lineTo(this.toCanvas(x),this.toCanvas(pcb.height-1));

		}
		for(y=0;y<pcb.height;y++)
		{
			context.moveTo(0,this.toCanvas(y));
			context.lineTo(this.toCanvas(pcb.width-1),this.toCanvas(y));

		}
		context.closePath();
		context.stroke();
		context.restore();
	}

	this.drawDDB=function(x,y,width,height)
	{
		context.save();
		//设置状态
		context.strokeStyle='black';
		context.fillStyle='#f6f1c3';
		context.lineWidth=2;
		context.beginPath();
		//画框
		context.moveTo(this.toCanvas(x-0.5),this.toCanvas(y-0.5));
		context.lineTo(this.toCanvas(x+width-0.5),this.toCanvas(y-0.5));
		context.lineTo(this.toCanvas(x+width-0.5),this.toCanvas(y+height-0.5));
		context.lineTo(this.toCanvas(x-0.5),this.toCanvas(y+height-0.5));
		context.lineTo(this.toCanvas(x-0.5),this.toCanvas(y-0.5));
		//画圈
		var radius=0.17;
		for(i=y;i<y+height;i++)
		{
			for(j=x;j<x+width;j++)
			{
				context.moveTo(this.toCanvas(j+radius),this.toCanvas(i));
				context.arc(this.toCanvas(j),this.toCanvas(i),this.toCanvas(radius), 0, Math.PI * 2, true);
			}
		}
		context.closePath();
		context.stroke();
		context.fill();
		//画焊盘
		context.strokeStyle='#ffb942';
		context.lineWidth=3;
		context.beginPath();
		for(i=y;i<y+height;i++)
		{
			for(j=x;j<x+width;j++)
			{
				context.moveTo(this.toCanvas(j+radius),this.toCanvas(i));
				context.arc(this.toCanvas(j),this.toCanvas(i), this.toCanvas(radius), 0, Math.PI * 2, true);
			}
		}
		context.closePath();
		context.stroke();
		context.restore();
	}

    this.drawElements=function()
    {
        for(var i=0;i<this.existElement.length;i++ )
        {
            this.existElement[i].draw(context,this);
        }
    }

}

/*this.drawCeramicsCapacitor=function(x1,y1,x2,y2)
{
	context.save();
	var a=0.3;
	var b=0.7;
	//画引脚
	context.strokeStyle='#000000';
	context.linewidth=2;
	context.beginPath();
	context.moveTo(toCanvasAxis(x1),toCanvasAxis(y1));
	context.save();
	context.translate((toCanvasAxis(x1)+toCanvasAxis(x2))/2,(toCanvasAxis(y1)+toCanvasAxis(y2))/2);
	context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
	context.lineTo(0,toCanvasAxis(-0.5));
	context.moveTo(0,toCanvasAxis(0.5));
	context.restore();
	context.lineTo(toCanvasAxis(x2),toCanvasAxis(y2));
	context.closePath();
	context.stroke();
	//画焊点
	context.beginPath();
	context.arc(toCanvasAxis(x1),toCanvasAxis(y1),3,0, Math.PI * 2, true);
	context.arc(toCanvasAxis(x2),toCanvasAxis(y2),3,0, Math.PI * 2, true);
	context.closePath();
	context.fill();
	//画主体
	context.save();
	context.translate((toCanvasAxis(x1)+toCanvasAxis(x2))/2,(toCanvasAxis(y1)+toCanvasAxis(y2))/2);
	context.rotate(-1*Math.atan((x2-x1)/(y2-y1)));
	var radius=(a>b)?a:b;
	context.save();
	context.scale(a/radius,b/radius);
	context.beginPath();
	context.arc(0,0,toCanvasAxis(radius),0,Math.PI*2,true);
	context.closePath();
	context.restore();
	context.stroke();
	context.fillStyle='rgba(53,196,125,0.45)';
	context.fill();
	context.restore();
	context.restore();
}*/
>>>>>>> gh-pages
