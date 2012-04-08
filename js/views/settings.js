(function($, undefined){
  "use strict";

  var settings = APP.namespace('APP.settings');

  settings.view = Backbone.View.extend({
  	events: {
  		"click a.btn" : "closeModal",
      "change .js_time_setting" : "updateTimeSetting"
  	},
    _dateRages : {
      short_range : { lower : 5, upper: 30 },
      long_range : { lower : 15, upper: 60 }
    },
    _applyWebkitNotifications : function(event){
      var self = this;

      if(!window.webkitNotifications) return;

      if(window.webkitNotifications.checkPermission() === 0){
         this._allowNotifications.attr('DISABLED', true);
      }
      else{
         this._allowNotifications.on('click', function(){
            window.webkitNotifications.requestPermission(function(){
              self._allowNotifications.attr('DISABLED', true); 
              APP.createNotification();
              var settings = APP.models.Settings.getSettings();
              settings.notifications = true;
              settings.save();
            });
         });   
      }
    },
    _displaySuccessFor : function($element){
      $element
        .parent()
          .addClass('success')
          .find('.js_save_message')
            .removeClass('hide');

    },
    _appendOptionsRangeFor : function(element){
      var range = this._dateRages[element.attr('rel')],
          settingTime = +APP.models.Settings["get" + element.attr('id')](),
          html = "<option>1</option>";
      
      for(var i = range.lower; i <= range.upper; i += 5){
         var isSelected = (i === settingTime) ? "SELECTED" : "";
         html += "<option " + isSelected + ">" + i + "</option>";
      }

      element.append(html);
    },
    _addTimes : function(){
        var self = this;
        $.each(this._settingsElement, function(key, el){
            var element = $(el).find('.js_time_setting');
            self._appendOptionsRangeFor(element);
        });
    },
	  initialize : function(){
  		var self = this;
  		this._button = this.el.find('a.btn');
      this._settingsElement = this.el.find('.js_setting_element');
      this._allowNotifications = $('#AllowNotifications');

      this._addTimes();

      this._applyWebkitNotifications();

    	// remove the event listeners when the dialog is hidden
	    this.el.bind("hide", function() {
	        // remove event listeners on the buttons
	        self._button.unbind();
	    });
  	},
    updateTimeSetting : function(event){
      var element = $(event.currentTarget);
      APP.models.Settings['set' + element.attr('id')](element.val());
      this._displaySuccessFor(element);
    },
  	closeModal : function(event){
  		event.preventDefault();
  		this.el.modal('hide');
  	},
  	render : function(){
      // reset styles
      this._settingsElement.removeClass('success');

      this._settingsElement
              .find('.js_save_message')
                .addClass('hide');

      // kick off the modal window
		  this.el.modal({
	      "backdrop"  : "static",
	      "keyboard"  : true,
	      "show"      : true    
	    });
    }
  });



})(jQuery);


