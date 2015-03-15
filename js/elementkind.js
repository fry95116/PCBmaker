/*
class:
ElementKind
ElementKinds
Item_Elementkind
Meun_Elementkind
object:
def_elements
elementkinds
meun_elementkind
*/

var ElementKind = Backbone.Model.extend({
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
		build: function(point) {
			this.p1 = point;
			this.build = this._build;
		},
		_build: function(point) {
			this.p2 = point;
			delete this.build;
		},
		render: function(context) {}
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
	toggle:function(){
		this.set({selected:!this.get('selected')})
	}
});

var ElementKinds = Backbone.Collection.extend({
	model: ElementKind
});
var elementkinds = new ElementKinds;

//view
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

var meun_elementkind = new Meun_Elementkind;
def_elements[0].selected = true;
elementkinds.reset(def_elements);