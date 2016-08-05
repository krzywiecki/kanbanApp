(function($) {

	var Board = Backbone.View.extend({

		initialize: function() {
			this.columns = new Backbone.Collection();
			this.listenTo(this.columns, 'add', this.addColumn);
			this.$columns = this.$el;
		},

		events: {
    		'click #new-column' : 'newColumn'
		},

		newColumn: function() {
			this.columns.add({
				name: prompt('Type column name')
			});
		},

		addColumn: function(model) {
			var column = new Column({
				model: model
			});
			this.$columns.append(column.$el);
		}
	});

	var ColumnTemplate = Handlebars.compile('<p>{{ name }}</p><ul></ul><button class="new-card">Create new card</button>');
	
	var Column = Backbone.View.extend({
		
		tagName: 'li',

		className: 'columns',

		events: {
			'click button.new-card': 'newCard'
		},

		initialize: function(options) {
			this.cards = new Backbone.Collection();
			this.listenTo(this.cards, 'add', this.addCard);
			this.$cards = this.$el;

			this.model = options.model;
			this.listenTo(this.model, 'change', this.render);
			this.render();
		},

		newCard: function() {
			this.cards.add({
				name: prompt('Type card name')
			});
		},

		addCard: function(model) {
			var card = new Card({
				model: model
			});
			this.$cards.append(card.$el);
		},

		render: function(){
			this.$el.html(ColumnTemplate(this.model.toJSON()));
		}
	});
	
	var Card = Backbone.View.extend({
	
		tagName: 'li',
	
		className: 'cards',

		initialize: function(options) {
			this.model = options.model;
			this.listenTo(this.model, 'change', this.render);
			this.render();
		},

		render: function(){
			var columnData = this.model.toJSON();
			this.$el.html(columnData.name);
		}
	});

	new Board({
		el: $('#board')
	});

})(jQuery);