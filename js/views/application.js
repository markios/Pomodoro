(function($, undefined){
	"use strict";
	var application = APP.namespace('APP');

	function settingsArePresent(){
       return APP.models.Settings.length > 0;
    }

    var appicationMenuController = function(){

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
    };

	application.init = function(){
		
		// get the  app settings
		var settings = APP.models.Settings;
        settings.fetch();

        appicationMenuController();

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
             } else {
             	if(this.pomodoro){
             		this.pomodoro.destroy();
             	}
	             this.home = new APP.home({el : $('#home')}); 
	          	 this.home.render();
             }
             
          },
          pomodoro : function(){
             if(this.home){
             	this.home.destroy();
             }
          	 this.pomodoro = new APP.pomodoro({el : $('#pomodoro')});
          	 this.pomodoro.render(); 
          }
        });
        window.app = new App();
        Backbone.history.start();
	};

	application.home = Backbone.View.extend({
		initialize : function(){
		  // bind to page focus change event

		},
		render : function(){
		  //this.el.removeClass('hide');
		}
	});

	application.pomodoro = Backbone.View.extend({
	    _defaultTitle : 'Pomodoro',
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

          // tie into menu click event
          APP.menu.view.bind('PageChanged', function(page){
          	if(page !== '#pomodoro'){
              this.el.addClass('hide');
          	} else {
          	  this.el.removeClass('hide');	
          	}
          });

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
		},
		render: function(){
			this.el.removeClass('hide');
		}
	});
	
})(jQuery)