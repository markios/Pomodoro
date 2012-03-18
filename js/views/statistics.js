(function($, undefined){

	var statistics = APP.namespace('APP.statistics');

	statistics.view = APP.parentView.extend({
		_tasksElements : [],
		_updateTaskStats : function(){
			
			var that = this;

			$.each(this._tasksElements, function(index, element){
				
				var $taskStat = that[element].el,
				    amount = that[element].getData();

				if(+$taskStat.html() === amount) return;
				var $clone = $taskStat
								.clone()
								.html(amount);

			    $taskStat
			    	.before($clone)
			    	.remove();

			    that[element].el = $clone;
			});
		},
		initialize: function() {

		   this._totalTasks = { el : $('#total_tasks', this.el) };
		   this._totalTasks.getData = function(){
		   	   return window.APP.models.Todos.length;
		   };
		   this._tasksElements.push("_totalTasks");

		   this._completeTasks = { el : $('#complete_tasks', this.el) };
		   this._completeTasks.getData = function(){
               return window.APP.models.Todos.done().length;
		   }; 
		   this._tasksElements.push("_completeTasks");		   

		   this._inProgressTasks = { el : $('#inProgress_tasks', this.el) };
		   this._inProgressTasks.getData = function(){
               return window.APP.models.Todos.remaining().length;
		   };
		   this._tasksElements.push("_inProgressTasks");		   		   

		   var todos = APP.models.Todos;
		   todos.bind('add', $.proxy(this._updateTaskStats, this));
		   todos.bind('change', $.proxy(this._updateTaskStats, this));
		},
		render : function(){
			this._updateTaskStats();
		}
	});


})(jQuery);