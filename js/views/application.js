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
		// this will run jags stuff
	}

	application.pomodoro = Backbone.View.extend({
	    el : '.main',
        initialize : function() {
    	
          // if settings are valid start pomodoro

    	  var tasks = new APP.tasks.View({el : $('.task-holder')}),
	          timer = new APP.timer.view({el : $('.timer-holder')}),
	          statistics = new APP.statistics.view({ el : $('#statistics')});
			
			  // fetch models
			  APP.models.Todos.fetch();
			  APP.models.Pomodoros.fetch();

			  // render the views
			  timer.render();
	      	  statistics.render();

		},
	    render: function(){
			
	    }
	});
	
})(jQuery)