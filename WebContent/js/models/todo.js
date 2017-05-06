var app = app || {};

// Todoモデル
app.Todo = Backbone.Model.extend({
	default: {
		title: '',
		completed: false
	},
	toggle: function(){
		this.save({
			completed: !this.get('completed')
		});
	}
});