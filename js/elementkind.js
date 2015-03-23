/*
class:
Element
Elements
Item_Elementkind
Meun_Elementkind
PCB
Panel
Paper
object:
def_elements
elementkinds
meun_elementkind
*/



var Element = Backbone.Model.extend({
	defaults: {
		kind: 'none',
		item: 'none',
		selected: false,
		p1: {
			x: 0,
			y: 0
		},
		p2: {
			x: 0,
			y: 0
		},
		render: function(context, x1, y1, x2, y2) {
			this.drawPoint(context, x1, y1);
			this.drawPoint(context, x2, y2);
			context.beginPath();
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.closePath();
			context.stroke();
		}
	},
	//在这里初始化构造器
	initialize: function() {
		this.build = function(point) {
			this.set('p1', point);
			this.build = function(point) {
				this.set('p2', point);
				delete this.build;
			};
		};
	},
	/*绘图及数学工具*/
	drawPoint: function(context, x, y, r) {
		context.save();
		context.fillStyle = 'rgb(0,0,0)';
		context.beginPath();
		context.arc(x, y, r || 3, 0, Math.PI * 2, true);
		context.closePath();
		context.fill();
		context.restore();
	},
	drawRect_redius: function(cxt, x, y, w, h, r) {
		cxt.beginPath();
		cxt.moveTo(x + r, y);
		cxt.arcTo(x + w, y, x + w, y + h, r);
		cxt.arcTo(x + w, y + h, x, y + h, r);
		cxt.arcTo(x, y + h, x, y, r);
		cxt.arcTo(x, y, x + w, y, r);
		cxt.closePath();
		cxt.fill();
		cxt.stroke();
	},
	//note:相对于(1,0)顺时针旋转
	getRad: function(x1, y1, x2, y2) {
		if (this.getLength(x1, y1, x2, y2) <= 0) return;
		return Math.atan2(y2 - y1, x2 - x1)

	},
	getLength: function(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	},

	radToDeg: function(reg) {
		return reg / Math.PI * 180;
	},

	degToRad: function(deg) {
		deg * Math.PI / 180
	},
	rotate: function(x, y, rad) {
		return {
			x: x * Math.cos(rad) - y * Math.sin(rad),
			y: x * Math.sin(rad) + y * Math.cos(rad)
		};
	},
	/***************/

	_render: function(context, trans) {
		var render = this.get('render');
		if (typeof(render) != 'undefined')
			context.save();
		render.call(this, context, trans, trans.toCanvas(this.get('p1').x), trans.toCanvas(this.get('p1').y), trans.toCanvas(this.get('p2').x), trans.toCanvas(this.get('p2').y));
		context.restore();
	},

	focus: function() {
		this.collection.findWhere({
			selected: true
		}).set({
			selected: false
		}); //不要阻断这次触发，否则view上显示不正常
		this.set({
			selected: true
		});
	},
	toggle: function() {
		this.set({
			selected: !this.get('selected')
		})
	},
	setP1:function(x,y){
		var a={x:x,y:y};
		this.set('p1',{x:x,y:y});
	},
	setP2:function(x,y){
		var a={x:x,y:y};
		this.set('p2',{x:x,y:y});
	}
});

var Elements = Backbone.Collection.extend({
	model: Element
});
//创建sidebar的model
var elementkinds = new Elements;
//sidebar的view
var Item_Elementkind = Backbone.View.extend({
	tagName: 'li',
	initialize: function() {
		this.listenTo(this.model, 'change', this.render)
	},
	events: {
		'click': 'focus'
	},

	render: function() {
		this.$el.html(this.model.get('item')).toggleClass('focus', this.model.get('selected'));

		return this;
	},

	focus: function() {
		this.model.focus();
	}
});

var Meun_Elementkind = Backbone.View.extend({
	el: $('#meun_elementkind'),
	initialize: function() {
		this.listenTo(elementkinds, 'reset', this.addAll);
	},
	addAll: function() {
		elementkinds.each(function(context) {
			var v = new Item_Elementkind({
				model: context
			});
			this.$el.append(v.render().el);
		}, this);
	}
});
//
var PCB = Backbone.Model.extend({
	defaults: {
		name: 'untitled',
		border: 5,
		width: 10,
		height: 10,
		scale: 20,
		selected: true,
		changed: false,
		existelements: null,
	},

	initialize: function() {
		//在这里创建新的对象，否则在new时会使用原来的对象
		this.set('existelements', new Elements);
		this.set('steadby', elementkinds.findWhere({
			selected: true
		}).clone());
		//事件监听
		this.listenTo(this.get('existelements'), 'change add remove reset', function() {
			this.set('changed', true);
			this.trigger('change:existelements');
		});
		this.on('change:width change:height change:scale', function() {
			this.set('changed', true);
		});
		this.listenTo(elementkinds, 'change', function() {
			//element的focus方法会触发两次change事件:删去原有的selected属性，添加selected属性
			if (typeof(elementkinds.findWhere({
					selected: true
				})) != 'undefined') {
				this.set('steadby', elementkinds.findWhere({
					selected: true
				}).clone());
			}
		});

	},

	builder: function(point) {
		this.get('steadby').build(point);
		if (typeof(this.get('steadby').build) == 'undefined') {
			var steadby = this.get('steadby'),
				existelements = this.get('existelements');
			steadby.set('item', (steadby.get('symbol') || steadby.get('item')) + (existelements.where({
				kind: steadby.get('kind')
			}).length + 1));
			steadby.set('selected', false);
			this.get('existelements').add(steadby);
			this.set('steadby', elementkinds.findWhere({
				selected: true
			}).clone());
			return;
		}
		this.trigger('change:steadby');
	},
	toCanvas: function(input) {
		if (typeof(input) !== 'undefined') return input * this.get('scale') + 0.5;
		return undefined;
	},

	toLocal: function(input) {
		if (typeof(input) !== 'undefined') return Math.round((input - 0.5) / this.get('scale'));
		return undefined;
	},

	focus: function() {
		this.collection.findWhere({
			selected: true
		}).set({
			selected: false
		});
		this.set({
			selected: true
		});
	},
	getInfo: function() {
		return {
			name: this.get('name'),
			width: this.get('width'),
			height: this.get('height')
		};
	}
});

var Paper = Backbone.View.extend({
	//model:创建时添加
	className: 'paper panel panel-default',
	initialize: function() {
		this.$el.html(this.template(this.model.getInfo()));
		this.listenTo(this.model, 'change:existelements change:steadby', this.elements_render);
		this.listenTo(this.model, 'change:width change:height change:scale', this.onSizeChange);
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(elementkinds, 'change', this.initCreater);
		this.$el.draggable();
		//draggable()会自动添加一个position，记得删掉
		this.$el.css('position', '');
		this.onSizeChange();
		this.elements_render();
		this.$('.header').click(function() {
			$(this).parent().find('form').slideToggle();
		});
		var myself = this;
		this.$('form').submit(function() {
			var data = $(this).serializeArray();
			if (data[0].value != '') {
				myself.model.set('width', parseInt(data[0].value));
			}
			if (data[1].value != '') {
				myself.model.set('height', parseInt(data[1].value));
			}
			$(this).parent().find('.header').trigger('click');
			return false;
		});
		this.$('.close').click(function() {
			if (myself.model.get('changed') == false) {
				myself.clear();
			} else {
				if (confirm('有修改尚未保存！\n是否放弃未保存的修改？')) {
					myself.clear();
				} else {
					return false;
				}
			}
		});
	},

	events: {
		'click': 'onClick'
	},
	template: _.template($('#paper_template').html()),

	changeName: function() {
		this.$('h5').html(this.model.get('name'));
	},

	onSizeChange: function() {
		this.$('.canvas_group canvas').attr('width', this.model.toCanvas(this.model.get('width') + this.model.get('border') * 2 - 1) + 1);
		this.$('.canvas_group canvas').attr('height', this.model.toCanvas(this.model.get('height') + this.model.get('border') * 2 - 1) + 1);
		this.bg_render();
		this.elements_render();
	},

	onClick: function(e) {
		if (e.target == $('.canvas_elements')[0]) {
			console.log('pos:' + this.model.toLocal(e.offsetX || e.layerX) + ',' + this.model.toLocal(e.offsetY || e.layerY));
			this.model.builder({
				x: this.model.toLocal(e.offsetX || e.layerX),
				y: this.model.toLocal(e.offsetY || e.layerY)
			});
		}
	},

	bg_render: function() {
		var context = this.$('.canvas_bg')[0].getContext('2d');
		//clear canvas
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		//draw Range
		context.strokeRect(0, 0, this.model.toCanvas(this.model.get('width') + this.model.get('border') * 2 - 1), this.model.toCanvas(this.model.get('width') + this.model.get('border') * 2 - 1));
		//draw grid
		context.save();
		context.strokeStyle = 'rgba(0,0,0,0.3)';
		context.lineWidth = 1;
		context.beginPath();
		for (x = 0; x < this.model.get('width') + this.model.get('border') * 2; x++) {
			context.moveTo(this.model.toCanvas(x), 0);
			context.lineTo(this.model.toCanvas(x), this.model.toCanvas(this.model.get('height') + this.model.get('border') * 2 - 1));

		}
		for (y = 0; y < this.model.get('height') + this.model.get('border') * 2; y++) {
			context.moveTo(0, this.model.toCanvas(y));
			context.lineTo(this.model.toCanvas(this.model.get('width') + this.model.get('border') * 2 - 1), this.model.toCanvas(y));

		}
		context.closePath();
		context.stroke();
		context.restore();
		//drawDDB
		//this.drawDDB(context,this.model.get('border'),this.model.get('border'),this.model.get('width'),this.model.get('height'));
		(function(context, x, y, width, height) {
			context.save();
			//设置状态
			context.strokeStyle = 'black';
			context.fillStyle = '#f6f1c3';
			context.lineWidth = 2;
			context.beginPath();
			//画框
			context.moveTo(this.model.toCanvas(x - 0.5), this.model.toCanvas(y - 0.5));
			context.lineTo(this.model.toCanvas(x + width - 0.5), this.model.toCanvas(y - 0.5));
			context.lineTo(this.model.toCanvas(x + width - 0.5), this.model.toCanvas(y + height - 0.5));
			context.lineTo(this.model.toCanvas(x - 0.5), this.model.toCanvas(y + height - 0.5));
			context.lineTo(this.model.toCanvas(x - 0.5), this.model.toCanvas(y - 0.5));
			//画圈
			var radius = 0.17;
			for (i = y; i < y + height; i++) {
				for (j = x; j < x + width; j++) {
					context.moveTo(this.model.toCanvas(j + radius), this.model.toCanvas(i));
					context.arc(this.model.toCanvas(j), this.model.toCanvas(i), this.model.toCanvas(radius), 0, Math.PI * 2, true);
				}
			}
			context.closePath();
			context.stroke();
			context.fill();
			//画焊盘
			context.strokeStyle = '#ffb942';
			context.lineWidth = 3;
			context.beginPath();
			for (i = y; i < y + height; i++) {
				for (j = x; j < x + width; j++) {
					context.moveTo(this.model.toCanvas(j + radius), this.model.toCanvas(i));
					context.arc(this.model.toCanvas(j), this.model.toCanvas(i), this.model.toCanvas(radius), 0, Math.PI * 2, true);
				}
			}
			context.closePath();
			context.stroke();
			context.restore();
		}).call(this, context, this.model.get('border'), this.model.get('border'), this.model.get('width'), this.model.get('height'));
	},

	elements_render: function() {
		var context = this.$('.canvas_elements')[0].getContext('2d');
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		var scale = this.model.get('scale');
		var trans = {
			toCanvas: function(input) {
				if (typeof(input) !== 'undefined') return input * scale + 0.5;
				return undefined;
			},
			toLocal: function(input) {
				if (typeof(input) !== 'undefined') return Math.round((input - 0.5) / scale);
				return undefined;
			},
		};
		this.model.get('existelements').each(function(element) {
			//console.log(element.get('item'));
			if (element.get('kind') === 'wire') element._render(context, trans);
		});
		this.model.get('existelements').each(function(element) {
			//console.log(element.get('item'));
			if (element.get('kind') !== 'wire') element._render(context, trans);
		});
		var steadby = this.model.get('steadby');
		if (typeof(steadby.build) != 'undefined' && typeof(steadby.get('p1')) != undefined) {
			steadby.drawPoint(context, this.model.toCanvas(steadby.get('p1').x), this.model.toCanvas(steadby.get('p1').y));
		}
	},

	clear: function() {
		this.model.get('existelements').trigger('destroy:all');
		this.model.destroy();
	}
});

var Item_ExistElements = Backbone.View.extend({
	tagName: 'li',
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.re);
	},
	events: {
		'click': 'selected',
		'dblclick': 'clear'
	},

	render: function() {
		this.$el.html(this.model.get('item')).toggleClass('focus', this.model.get('selected'));

		return this;
	},

	selected: function() {
		this.model.toggle();
	},

	clear: function() {
		this.model.destroy();
	},

	re: function(model) {
		this.remove();
		if ($('.' + model.get('kind')+' li').length == 0) {
			$('.' + model.get('kind')).remove()
		}
	}
});

var Meun_ExistElements = Backbone.View.extend({
	el: $('#meun_existelements'),
	template: _.template($('#sub_item_template').html()),
	initialize: function() {
		this.listenTo(this.model, 'reset', this.addAll);
		this.listenTo(this.model, 'add', this.addOne);
		this.listenTo(this.model, 'destroy:all', this.re);
	},
	addAll: function() {
		this.$el.html('');
		this.model.each(function(context) {
			this.addOne(context);
		}, this);
	},
	addOne: function(model) {
		var v = new Item_ExistElements({
			model: model
		});
		if ($('.' + model.get('kind')).length > 0) {
			$('.' + model.get('kind')+' ul').append(v.render().el);
			return;
		}
		var t = $(this.template({
			kind: model.get('kind'),
			item: elementkinds.findWhere({kind:model.get('kind')}).get('item')
		}));
		t.find('ul').append(v.render().el);
		this.$el.append(t[0]);
		t.find('.sub_item').click(function() {
			$(this).find('img').toggleClass('sub_item_rotate');
			$(this).next().slideToggle(function() {
				$('#sidebar .panel').perfectScrollbar('update');
			});
			$(this).parent().siblings().find('ul').slideUp(function() {
				$('#sidebar .panel').perfectScrollbar('update');
			});
			$(this).parent().siblings().find('.sub_item>img').removeClass('sub_item_rotate');
		});
		this.$el.append(t[0]);
	},
	re:function(){
		this.$el.empty();
		this.stopListening();
	}
});

var meun_elementkind = new Meun_Elementkind;
def_elements[0].selected = true;
elementkinds.reset(def_elements);