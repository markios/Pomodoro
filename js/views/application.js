(function($, undefined){
	"use strict";
	var application = APP.namespace('APP');

	function appicationMenuController(){
     var settingsModal = new APP.settings.view({el : $('#settingsModal')});
     
     function launchModal(){
     	    settingsModal.render();
     }

     if(window.webkitNotifications && window.webkitNotifications.checkPermission() === 0){
        application.createNotification();          
     }

     $('#settings_option').on('click', function(event){
  	   event.preventDefault();
  	   launchModal();
     });

     $(document).on('keypress', function(event){
     	  if(event.keyCode === 223) launchModal();
     });
  }

  application.createNotification = function(){
      APP.settings.notification = window.webkitNotifications.createNotification(
                    'images/clock.png', 
                    'Pomodoro Complete', 
                    'Your pomodoro is complete');
  };

	application.init = function(){
		
		// get the  app settings
		var settings = APP.models.Settings;
        settings.fetch();

        if(settings.models.length === 0){
           settings.create();
        }

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
       this.tutorial = $('#js_tutorial', this.el);
    },
    events : {
       "click #js_watch_tutorial" : "showTutorial"
    }, 
    showTutorial : function(event){
       this.hero.addClass('hide');
       this.tutorial.removeClass('hide');
    }
  });

	application.pomodoro = APP.base.pageView.extend({
	    _defaultTitle : document.title,
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