(function($, undefined){

	var statistics = APP.namespace('APP.statistics');

	var stat_view = Backbone.View.extend({
		_template : '#statTemplate', 
		initialize : function(){
			// bind events
			
		},
		render : function(){

		}
	});

	statistics.view = Backbone.View.extend({
		_tasksElements : [],
		_updateTaskStats : function(){
			
			var that = this;

			$.each(this._tasksElements, function(index, element){
				
				var $taskStat = that[element].el,
				    amount = that[element].getData();

				// if value has changed exit
				if(+$taskStat.html() === amount) return;

				// clone el for css 3 animation to work
				var $clone = $taskStat
								.clone()
								.html(amount);

			    $taskStat
			    	.before($clone)
			    	.remove();

			    that[element].el = $clone;
			});
		},
		_updatePomodoroStats : function(){
			

		},
		_initPomodotoStats : function(){
			var self = this;

			this.pomodoros = APP.models.Pomodoros;

			this._totalPomodoros = { el : $('#total_pomodoros', this.el) };
			this._totalPomodorosToday = { el : $('#pomodoros_today', this.el) };

			this._currentPomodoro = this.pomodoros.current();

			this._currentPomodoro.bind('done', $.proxy(this._updatePomodoroStats, this));

			this.pomodoros.bind('add', function(){
				self._currentPomodoro = self.pomodoros.current();
			});

			this._updatePomodoroStats();
		},
		_initTaskStats : function(){
		   var self = this;
			// add task elements
		   this._totalTasks = { el : $('#total_tasks', this.el) };
		   this._totalTasks.getData = function(){
		   	   return window.APP.models.Todos.length;
		   };
		   this._tasksElements.push("_totalTasks");

		   this._completeTasks = { el : $('#complete_tasks', this.el) };
		   this._completeTasks.getData = function(){
               var result = window.APP.models.Todos.done().length || 0;
               return result;
		   }; 
		   this._tasksElements.push("_completeTasks");		   

		   this._inProgressTasks = { el : $('#inProgress_tasks', this.el) };
		   this._inProgressTasks.getData = function(){
               var result = window.APP.models.Todos.remaining().length || 0;
               return result;
		   };
		   this._tasksElements.push("_inProgressTasks");	

		   // finally bind task events to update internal models
		   var todos = APP.models.Todos;
		   todos.bind('add', this._updateTaskStats, this);
		   todos.bind('change', this._updateTaskStats, this);
		   todos.bind('remove', this._updateTaskStats, this);

		},
		initialize: function() {
		   this._initPomodotoStats();
		   this._initTaskStats();
		   var s = new stat_view({name : 'pomodoro_today'});		   
		},
		render : function(){
			this._updateTaskStats();
		}
	});
})(jQuery);