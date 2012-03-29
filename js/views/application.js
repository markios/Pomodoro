(function($, undefined){
	"use strict";
	var application = APP.namespace('APP');

	function settingsArePresent(){
          return APP.models.Settings.length > 0;
    }

	application.init = function(){
		
		// get the  app settings
		var settings = APP.models.Settings;
        settings.fetch();

        // initialize backbone application
        var App = Backbone.Router.extend({
          routes: {
            "": "index",
            "pomodoro" : "pomodoro"
          },
          index: function() {
             // set up
             if(settingsArePresent()){
             	// forward user to their tasks
                app.navigate("pomodoro", {trigger: true});   
             }
             application.home
          },
          pomodoro : function(){
          	var mainView = new APP.pomodoro();
            mainView.render(); 
          }
        });
        window.app = new App();
        Backbone.history.start();
	};

	application.home = {
		// this will homepage stuff
	}

	application.pomodoro = Backbone.View.extend({
	    el : '.main',
	    _bindPomodoroChange : function(){
	    	this._currentPomodoro.bind('change', function(event){
	    		console.log('time');
	    	});
	    },
        initialize : function() {
    	
          var tasks = new APP.tasks.View({el : $('.task-holder')}),
	          timer = new APP.timer.view({el : $('.timer-holder')}),
	          statistics = new APP.statistics.view({ el : $('#statistics')}),
	          self = this;
			
			  // fetch models
			  APP.models.Todos.fetch();

			  APP.models.Pomodoros.bind('add', function(){
			  	 self._currentPomodoro = APP.models.Pomodoros.at(0);
			  	 self._bindPomodoroChange();	
			  });
			  
			  // render the views
			  timer.render();
	      	  statistics.render();
		}
	});
	
})(jQuery)