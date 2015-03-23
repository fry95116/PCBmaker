var def_elements =
	[{
		kind: 'text',
		item: '文本',
		render: function(cxt, trans, x1, y1, x2, y2) {
			cxt.textBaseline = 'bottom';
			cxt.translate(x1, y1);
			cxt.rotate(this.getRad(x1, y1, x2, y2));
			cxt.strokeText(this.get('item'), 0, 0);
		}
	}, {
		kind: 'jumper',
		item: '飞线',
		render: function(cxt, trans, x1, y1, x2, y2) {
			var length = this.getLength(x1, y1, x2, y2);
			var head = 6; //线头长度
			var width = 2; //线宽的1/2
			cxt.save();
			//坐标变换
			cxt.translate(x1, y1);
			cxt.rotate(this.getRad(x1, y1, x2, y2));
			//画线头
			cxt.beginPath();
			cxt.moveTo(0, 0);
			cxt.lineTo(head, 0);
			cxt.moveTo(length - head, 0);
			cxt.lineTo(length, 0);
			cxt.closePath();
			cxt.stroke();
			//画线
			cxt.fillStyle = '#7e7e7e';
			cxt.beginPath();
			cxt.moveTo(head, -width);
			cxt.lineTo(head, width);
			cxt.lineTo(length - head, width);
			cxt.lineTo(length - head, -width);
			cxt.closePath();
			cxt.stroke();
			cxt.fill();
			cxt.restore();
			//画焊点
			this.drawPoint(cxt, x1, y1);
			this.drawPoint(cxt, x2, y2);
		}

	}, {
		kind: 'wire',
		item: '走线',
		render: function(cxt, trans, x1, y1, x2, y2) {
			cxt.lineWidth = 3;
			cxt.strokeStyle = '#0000ff';
			//画线
			cxt.beginPath();
			cxt.moveTo(x1, y1);
			cxt.lineTo(x2, y2);
			cxt.closePath();
			cxt.stroke();
			//画焊点
			this.drawPoint(cxt, x1, y1);
			this.drawPoint(cxt, x2, y2);
		}
	}, {
		kind: 'pin_header',
		item: '排针',
		render: function(cxt, trans, x1, y1, x2, y2) {
			//对点做约束
			if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
				var length = trans.toLocal(Math.abs(x2 - x1));
				var dir = (x2 - x1 > 0) ? 0 : Math.PI;
			} else {
				var length = trans.toLocal(Math.abs(y2 - y1));
				var dir = (y2 - y1 < 0) ? Math.PI * 3 / 2 : Math.PI / 2;
			}
			//坐标变换
			cxt.translate(x1, y1);
			cxt.rotate(dir);
			for (var i = 0; i < length + 1; i++) {
				//画底座
				var width = trans.toCanvas(0.5);
				cxt.lineWidth = width;
				cxt.lineJoin = "bevel";
				cxt.strokeStyle = '#404040';
				cxt.beginPath();
				cxt.moveTo(-width / 2, -width / 2);
				cxt.lineTo(-width / 2, width / 2);
				cxt.lineTo(width / 2, width / 2);
				cxt.lineTo(width / 2, -width / 2);
				cxt.closePath();
				cxt.stroke();
				//画针脚
				width = trans.toCanvas(0.3);
				cxt.fillStyle = '#e0e0e0';
				cxt.beginPath();
				cxt.moveTo(-width / 2, -width / 2);
				cxt.lineTo(-width / 2, width / 2);
				cxt.lineTo(width / 2, width / 2);
				cxt.lineTo(width / 2, -width / 2);
				cxt.closePath();
				cxt.fill();
				cxt.translate(trans.toCanvas(1) - 0.5, 0);
			}
		}
	}, {
		kind: 'socket',
		item: '排母',
		render: function(cxt, trans, x1, y1, x2, y2) {
			//对点做约束
			if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
				var length = trans.toLocal(Math.abs(x2 - x1));
				var dir = (x2 - x1 > 0) ? 0 : Math.PI;
			} else {
				var length = trans.toLocal(Math.abs(y2 - y1));
				var dir = (y2 - y1 < 0) ? Math.PI * 3 / 2 : Math.PI / 2;
			}
			//坐标变换
			cxt.translate(x1, y1);
			cxt.rotate(dir);
			//画底座
			var width = trans.toCanvas(0.6);
			cxt.fillStyle = '#000000';
			cxt.beginPath();
			cxt.moveTo(-width / 2, -width / 2);
			cxt.lineTo(-width / 2, width / 2);
			cxt.lineTo(trans.toCanvas(length) + width / 2, width / 2);
			cxt.lineTo(trans.toCanvas(length) + width / 2, -width / 2);
			cxt.closePath();
			cxt.fill();
			for (var i = 0; i < length + 1; i++) {
				//画针脚
				width = trans.toCanvas(0.3);
				cxt.fillStyle = '#616161';
				cxt.beginPath();
				cxt.moveTo(-width / 2, -width / 2);
				cxt.lineTo(-width / 2, width / 2);
				cxt.lineTo(width / 2, width / 2);
				cxt.lineTo(width / 2, -width / 2);
				cxt.closePath();
				cxt.fill();
				cxt.translate(trans.toCanvas(1) - 0.5, 0);
			}
		}
	}, {
		kind: 'female_header',
		item: '连接器'
	}, {
		kind: 'simple_ic',
		item: '单列IC',
		symbol: 'IC',
		render: function(cxt, trans, x1, y1, x2, y2) {
			//对点做约束
			if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
				var length = trans.toLocal(Math.abs(x2 - x1));
				var dir = (x2 - x1 > 0) ? 0 : Math.PI;
			} else {
				var length = trans.toLocal(Math.abs(y2 - y1));
				var dir = (y2 - y1 < 0) ? Math.PI * 3 / 2 : Math.PI / 2;
			}
			//坐标变换
			cxt.save();
			cxt.translate(x1, y1);
			cxt.rotate(dir);
			//画主体
			var width = trans.toCanvas(0.7);
			cxt.linewidth = 2;
			cxt.strokeStyle = '#000000';
			cxt.fillStyle = 'rgba(189,189,189,0.7)';
			this.drawRect_redius(cxt,-width / 2,-width / 2, trans.toCanvas(length) + width,width,trans.toCanvas(0.1));
			cxt.restore();
			this.drawPoint(cxt, x1, y1);
		}
	}, {
		kind: 'double_ic',
		item: '双列IC',
		symbol: 'IC',
		render: function(cxt, trans, x1, y1, x2, y2) {
			//检查：不存在0行或者0列的ic
			if (x1 === x2 || y1 === y2) {
				alert('error');
				this.collection.remove(this);
			}
			
			//坐标变换
			cxt.translate(x1, y1);
			var dx=x2-x1,dy=y2-y1;
			if(dy>0) {
				var rad=dx>0?0:(-1*Math.PI/2);
			}
			else {
				var rad=dx>0?Math.PI/2:Math.PI;
			}
			//if(rad<0)rad=Math.PI*+rad;
			cxt.rotate(-1*rad);
			var np=this.rotate(dx,dy,rad);
			console.log(this.radToDeg(rad));
			cxt.lineWidth=2;
			cxt.strokeStyle="#9a9a9a";
			cxt.fillStyle = 'rgba(204,204,204,0.7)';
			this.drawRect_redius(cxt,0,-trans.toCanvas(0.5),np.x,np.y+trans.toCanvas(1),trans.toCanvas(0.3));
			//画引脚
			for(var i=0;i<trans.toLocal(np.y)+1;i++){
				this.drawPoint(cxt, 0, trans.toCanvas(i));
				this.drawPoint(cxt,np.x,trans.toCanvas(i));
			}
			//画标记点
			cxt.fillStyle = '#9a9a9a';
			cxt.beginPath();
			cxt.arc(trans.toCanvas(0.5), 0, 4, 0, Math.PI * 2, true);
			cxt.closePath();
			cxt.fill();
		}
	}, {
		kind: 'sesitor',
		item: '电阻',
		symbol: 'R',
		render: function(cxt, trans, x1, y1, x2, y2) {
			var length = this.getLength(x1, y1, x2, y2);
			var height = 40; //电阻长度
			var width = 6; //电阻宽的1/2
			cxt.save();
			//坐标变换
			cxt.translate(x1, y1);
			cxt.rotate(this.getRad(x1, y1, x2, y2));
			//画线头
			cxt.beginPath();
			cxt.moveTo(0, 0);
			cxt.lineTo((length - height) / 2, 0);
			cxt.moveTo((length + height) / 2, 0);
			cxt.lineTo(length, 0);
			cxt.closePath();
			cxt.stroke();
			//画主体
			cxt.lineWidth = 2;
			cxt.strokeStyle = '#3433f1';
			cxt.fillStyle = 'rgba(153,204,255,0.45)';
			cxt.beginPath();
			cxt.moveTo((length - height) / 2, -width);
			cxt.lineTo((length - height) / 2, width);
			cxt.lineTo((length + height) / 2, width);
			cxt.lineTo((length + height) / 2, -width);
			cxt.closePath();
			cxt.fill();
			cxt.stroke();
			cxt.restore();
			//画焊点
			this.drawPoint(cxt, x1, y1);
			this.drawPoint(cxt, x2, y2);
		}

	}, {
		kind: 'ceramics_capacitor',
		item: '独石电容',
		symbol: 'C',
		render: function(cxt, trans, x1, y1, x2, y2) {
			var a = 14;
			var b = 6;
			var length = this.getLength(x1, y1, x2, y2);
			cxt.save();
			//坐标变换
			cxt.translate(x1, y1);
			cxt.rotate(this.getRad(x1, y1, x2, y2));
			//画引脚
			cxt.strokeStyle = '#000000';
			cxt.beginPath();
			cxt.moveTo(0, 0);
			cxt.lineTo((length - 14 * 2) / 2, 0);
			cxt.moveTo((length + 14 * 2) / 2, 0);
			cxt.lineTo(length, 0);
			cxt.closePath();
			cxt.stroke();

			//画主体
			var radius = (a > b) ? a : b;
			cxt.save();
			cxt.scale(a / radius, b / radius);
			cxt.beginPath();
			cxt.arc(length/2, 0, radius, 0, Math.PI * 2, true);
			cxt.closePath();
			cxt.restore();
			cxt.stroke();
			cxt.fillStyle = 'rgba(53,196,125,0.45)';
			cxt.fill();
			cxt.restore();
			//画焊点
			this.drawPoint(cxt, x1, y1);
			this.drawPoint(cxt, x2, y2);

		}
	}, {
		kind: 'electrolytic_capacitor',
		item: '电解电容',
		symbol: 'C',
		render: function(cxt, trans, x1, y1, x2, y2) {
			var length = this.getLength(x1, y1, x2, y2);
			cxt.save();
			//坐标变换
			cxt.translate(x1, y1);
			cxt.rotate(this.getRad(x1, y1, x2, y2));
			var radius = 14;
			//画引脚
			cxt.strokeStyle = '#000000';
			cxt.beginPath();
			cxt.moveTo(0, 0);
			cxt.lineTo((length - radius * 2) / 2, 0);
			cxt.moveTo((length + radius * 2) / 2, 0);
			cxt.lineTo(length, 0);
			cxt.closePath();
			cxt.stroke();
			//画负极标志
			cxt.beginPath();
			cxt.arc(length / 2, 0, radius - cxt.linewidth / 4, -1 * Math.PI / 3, Math.PI / 3, false);
			cxt.closePath();
			cxt.fillStyle = 'rgba(173,85,199,1)';
			cxt.fill();
			//画主体
			cxt.fillStyle = 'rgba(173,85,199,0.45)';
			cxt.beginPath();
			cxt.arc(length / 2, 0, radius, 0, Math.PI * 2, true);
			cxt.closePath();
			cxt.fill();
			cxt.stroke();
			cxt.restore();
			//画焊点
			this.drawPoint(cxt, x1, y1);
			this.drawPoint(cxt, x2, y2);
		}
	}, {
		kind: 'diode',
		item: '二极管',
		symbol: 'D',
		render: function(cxt, trans, x1, y1, x2, y2) {
			var length = this.getLength(x1, y1, x2, y2);
			var height = 40; //二极管长度
			var width = 6; //二极管宽的1/2
			cxt.save();
			//坐标变换
			cxt.translate(x1, y1);
			cxt.rotate(this.getRad(x1, y1, x2, y2));
			//画线头
			cxt.beginPath();
			cxt.moveTo(0, 0);
			cxt.lineTo((length - height) / 2, 0);
			cxt.moveTo((length + height) / 2, 0);
			cxt.lineTo(length, 0);
			cxt.closePath();
			cxt.stroke();
			//画主体
			cxt.lineWidth = 2;
			cxt.strokeStyle = '#fc3329';
			cxt.fillStyle = 'rgba(252,219,209,0.8)';
			cxt.beginPath();
			cxt.moveTo((length - height) / 2, -width);
			cxt.lineTo((length - height) / 2, width);
			cxt.lineTo((length + height) / 2, width);
			cxt.lineTo((length + height) / 2, -width);
			cxt.closePath();
			cxt.fill();
			cxt.stroke();
			cxt.beginPath();
			cxt.moveTo((length + height * 0.6) / 2, width);
			cxt.lineTo((length + height * 0.6) / 2, -width);
			cxt.closePath();
			cxt.stroke();
			cxt.restore();
			//画焊点
			this.drawPoint(cxt, x1, y1);
			this.drawPoint(cxt, x2, y2);
		}
	}, {
		kind: 'led',
		item: 'LED',
		render: function(cxt, trans, x1, y1, x2, y2) {
			var length = this.getLength(x1, y1, x2, y2);
			cxt.save();
			//坐标变换
			cxt.translate(x1, y1);
			cxt.rotate(this.getRad(x1, y1, x2, y2));
			var radius = 10;
			//画引脚
			cxt.strokeStyle = '#000000';
			cxt.beginPath();
			cxt.moveTo(0, 0);
			cxt.lineTo((length - radius * 2) / 2, 0);
			cxt.moveTo((length + radius *2) / 2, 0);
			cxt.lineTo(length, 0);
			cxt.closePath();
			cxt.stroke();
			//画主体
			cxt.lineWidth = 3;
			cxt.strokeStyle = '#ff0000';
			cxt.fillStyle = 'rgba(255,0,0,0.4)';
			cxt.beginPath();
			cxt.arc(length / 2, 0, radius, -1 * Math.PI / 5, Math.PI / 5, true);
			cxt.closePath();
			cxt.fill();
			cxt.stroke();
			cxt.restore();
			//画焊点
			this.drawPoint(cxt, x1, y1);
			this.drawPoint(cxt, x2, y2);
		}
	}, {
		kind: 'bjt',
		item: '三极管',
		render:function(cxt, trans, x1, y1, x2, y2){
			//对点做约束
			if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
				var dir = (x2 - x1 > 0) ? 0 : Math.PI;
			} else {
				var dir = (y2 - y1 < 0) ? Math.PI * 3 / 2 : Math.PI / 2;
			}
			cxt.save();
			//坐标变换
			cxt.translate(x1, y1);
			cxt.rotate(dir);
			var radius = trans.toCanvas(1.3);
			//画主体
			cxt.lineWidth = 2;
			cxt.strokeStyle = 'rgb(164,100,91)';
			cxt.fillStyle = 'rgba(210,193,174,0.5)';
			cxt.beginPath();
			//cxt.arc( trans.toCanvas(1), 0, radius, Math.PI / 6, Math.PI *5/ 6, true);
			cxt.moveTo(trans.toCanvas(-0.4),trans.toCanvas(0.3));
			cxt.lineTo(trans.toCanvas(-0.4),-1*trans.toCanvas(0.1));
			cxt.arcTo(
				trans.toCanvas(1),
				-1*trans.toCanvas(1.1),
				trans.toCanvas(2.4),
				-1*trans.toCanvas(0.1),
				trans.toCanvas(2.2)
			);
			cxt.lineTo(trans.toCanvas(2.4),-1*trans.toCanvas(0.1));
			cxt.lineTo(trans.toCanvas(2.4),trans.toCanvas(0.3));
			cxt.closePath();
			cxt.fill();
			cxt.stroke();
			
			//画焊点
			this.drawPoint(cxt, 0, 0);
			this.drawPoint(cxt, trans.toCanvas(1), 0);
			this.drawPoint(cxt, trans.toCanvas(2), 0);
			cxt.restore();
		}
	}, {
		kind: 'botton',
		item: '按键',
		render:function(cxt, trans, x1, y1, x2, y2){
			//对点做约束
			if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
				var dir = (x2 - x1 > 0) ? 0 : Math.PI;
			} else {
				var dir = (y2 - y1 < 0) ? Math.PI * 3 / 2 : Math.PI / 2;
			}
			//坐标变换
			cxt.translate(x1, y1);
			cxt.rotate(dir);
			var radius = trans.toCanvas(1.3);
			//画连结标记
			cxt.fillStyle = '#909090';
			cxt.fillRect(0,0,trans.toCanvas(2)-0.5,-1*trans.toCanvas(0.5)-0.5);
			cxt.fillRect(0,-1*trans.toCanvas(1.5),trans.toCanvas(2)-0.5,-1*trans.toCanvas(0.5)-0.5);
			//画主体
			cxt.lineWidth=2;
			cxt.fillStyle = 'rgba(224,224,224,0.7)';
			this.drawRect_redius(cxt,0,0,trans.toCanvas(2)-0.5,-1*trans.toCanvas(2)-0.5,5);
			//引脚
			this.drawPoint(cxt,0,0);
			this.drawPoint(cxt,0,-1*trans.toCanvas(2));
			this.drawPoint(cxt,trans.toCanvas(2),-1*trans.toCanvas(2));
			this.drawPoint(cxt,trans.toCanvas(2),0);
			//
			this.drawPoint(cxt,trans.toCanvas(0.3), -1*trans.toCanvas(0.3));
			this.drawPoint(cxt,trans.toCanvas(0.3), -1*trans.toCanvas(1.7));
			this.drawPoint(cxt,trans.toCanvas(1.7), -1*trans.toCanvas(1.7));
			this.drawPoint(cxt,trans.toCanvas(1.7), -1*trans.toCanvas(0.3));
			//画按键
			cxt.fillStyle = '#000000';
			cxt.beginPath();
			cxt.arc(trans.toCanvas(1), -1*trans.toCanvas(1), 11, 0, Math.PI * 2, true);
			cxt.closePath();
			cxt.fill();
		}
	}, {
		kind: 'switcher',
		item: '自锁开关',
		render:function(cxt, trans, x1, y1, x2, y2){
			//对点做约束
			if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
				var dir = (x2 - x1 > 0) ? 0 : Math.PI;
			} else {
				var dir = (y2 - y1 < 0) ? Math.PI * 3 / 2 : Math.PI / 2;
			}
			//坐标变换
			cxt.translate(x1, y1);
			cxt.rotate(dir);
			var radius = trans.toCanvas(1.3);
			//画主体
			cxt.lineWidth=1;
			cxt.fillStyle = 'rgb(224,224,224)';
			this.drawRect_redius(cxt,0,0,trans.toCanvas(2)-0.5,-1*trans.toCanvas(2)-0.5,5);
			//引脚
			this.drawPoint(cxt,0,0);
			this.drawPoint(cxt,trans.toCanvas(1),0);
			this.drawPoint(cxt,trans.toCanvas(2),0);

			this.drawPoint(cxt,0,-1*trans.toCanvas(2));
			this.drawPoint(cxt,trans.toCanvas(1),-1*trans.toCanvas(2));
			this.drawPoint(cxt,trans.toCanvas(2),-1*trans.toCanvas(2));
			//画按键
			cxt.fillStyle = '#039be5';
			cxt.beginPath();
			cxt.moveTo(trans.toCanvas(0.6), -1*trans.toCanvas(0.6));
			cxt.lineTo(trans.toCanvas(0.6), -1*trans.toCanvas(1.4));
			cxt.lineTo(trans.toCanvas(1.4), -1*trans.toCanvas(1.4));
			cxt.lineTo(trans.toCanvas(1.4), -1*trans.toCanvas(0.6));
			cxt.closePath();
			cxt.stroke();
			cxt.fill();
		}
	}, ];