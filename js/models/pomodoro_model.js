(function($, undefined){
	"use strict";

	var models = APP.namespace('APP.models');

	models.Pomodoro = Backbone.Model.extend({
		defaults: function() {
	      return {
	        done:  false,
	        created: new Date()
	      };
	    },
	    // Toggle the `done` state of this Todos item.
	    toggle: function() {
	      this.save({done: !this.get("done")});
	    }
	});

	models.PomodoroCollection = Backbone.Collection.extend({
		
		model : models.Pomodoro,
	    
	    // store the Todos's
	    localStorage : new Store("pomodoros"),
	    
		// Filter down the list of all todo items that are finished.
	    done: function() {
	      return this.filter(function(pomodoro){ return pomodoro.get('done'); });
	    },

	    current: function(){
	      return this.filter(function(pomodoro){ return pomodoro.get('done') == false; });
	    }
	    
	});

	models.Pomodoros = new models.PomodoroCollection();

})(jQuery);