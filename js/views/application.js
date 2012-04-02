(function($, undefined){
	"use strict";
	var application = APP.namespace('APP');

	function appicationMenuController(){
     function launchModal(){
     	  var element = $('#settingsModal'),
      	  settings = new APP.settings.view({el : element});

 	        settings.render();
     }

     $('#settings_option').on('click', function(event){
  	   event.preventDefault();
  	   launchModal();
     });
     $(document).on('keypress', function(event){
     	  if(event.keyCode === 223) launchModal();
     });
  }

	application.init = function(){
		
		// get the  app settings
		var settings = APP.models.Settings;
        settings.fetch();

        appicationMenuController();

        // initialize backbone application
        var App = Backbone.Router.extend({
          initialize : function(){
            this.home = new APP.home({el : $('#home')}); 
            this.pomodoro = new APP.pomodoro({el : $('#pomodoro')});
          },
          routes: {
            "": "index",
            "pomodoro" : "pomodoro"
          },
          _hidePrevious : function(){
             if(this._currentView){
               this[this._currentView].hide();
             }
          },
          index: function() {
             // if settings are there and its first view
            this._hidePrevious();
            this.home.render();
            this._currentView = "home";
            
          },
          pomodoro : function(){
             this._hidePrevious();
             this.pomodoro.render(); 
             this._currentView = "pomodoro";
          }
        });
        window.app = new App();
        Backbone.history.start();
	};

	application.home = APP.base.pageView.extend({
		initialize : function(){
		   this.hero = $('#js_hero', this.el);
    },
    events : {
       "click #js_watch_tutorial" : "showTutorial"
    }, 
    showTutorial : function(event){
       
    }
  });

	application.pomodoro = APP.base.pageView.extend({
	    _defaultTitle : "Pomodoro",
      _bindPomodoroChange : function(){
	    	var self = this;
	    	this._currentPomodoro.bind('remove', function(){
	    		self._setDocumentTitle(self._defaultTitle);
	    	});
	    	this._currentPomodoro.bind('change', function(event){
	    		self._setDocumentTitle(self._currentPomodoro.getTime());
	    	});
	    },
	    _setDocumentTitle : function(title){
    		document.title = title;
	    },
      initialize : function() {
    	  var self = this;

        APP.models.Pomodoros.bind('add', function(){
  	  	  self._currentPomodoro = APP.models.Pomodoros.at(0);
  	  	  self._bindPomodoroChange();	
  	    });

        var tasks = new APP.tasks.View({el : $('.task-holder')}),
            timer = new APP.timer.view({el : $('.timer-holder')}),
            statistics = new APP.statistics.view({ el : $('#statistics')});
    	
		    // fetch models
		    APP.models.Todos.fetch();
	
		    // render the views
		    timer.render();
      	statistics.render();
		  }
	});
	
})(jQuery)