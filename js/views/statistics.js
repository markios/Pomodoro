(function($, undefined){

	var statistics = APP.namespace('APP.statistics');

	statistics.view = APP.parentView.extend({
		_updateTaskStats : function(){
			var todos = APP.models.Todos;
			this._totalTasks.html(todos.length).removeClass('data-pulse').addClass('data-pulse');
			this._completeTasks.html(todos.done().length).removeClass('data-pulse').addClass('data-pulse');
			this._inProgressTasks.html(todos.remaining().length).removeClass('data-pulse').addClass('data-pulse');
		},
		initialize: function() {

		   this._totalTasks = $('#total_tasks', this.el);
		   this._completeTasks = $('#complete_tasks', this.el);
		   this._inProgressTasks = $('#inProgress_tasks', this.el);
		   
		   var todos = APP.models.Todos;
		   todos.bind('add', $.proxy(this._updateTaskStats, this));
		   todos.bind('change', $.proxy(this._updateTaskStats, this));
		},
		render : function(){
			this._updateTaskStats();
		}
	});


})(jQuery);