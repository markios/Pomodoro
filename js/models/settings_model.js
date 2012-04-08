(function($, undefined){

var models = APP.namespace('APP.models');

	var Setting = Backbone.Model.extend({
		defaults: function() {
	      return {
	        pomodoro_time:  25,
	        short_rest_time: 10,
	        notifications : false
	      };
	    }
	});

	var SettingsCollection =  Backbone.Collection.extend({
		
		model : Setting,
	    
	    // store the Todos's
	    localStorage : new Store("settings"),
	    
	    _updateTimeFor : function(attribute, time){
    		var appSetting = this.models[0];
	    	appSetting.attributes[attribute] = time;
	    	appSetting.save();
	    },
	    _getSetting : function(setting){
    		return this.models[0].attributes[setting];
	    },
		// Filter down the list of all todo items that are finished.
	    getSettings: function() {
	       return this.models[0].attributes;
	    },
	    setPomodoroTime : function(withTime){
	    	this._updateTimeFor("pomodoro_time", withTime);
		},
		getPomodoroTime : function(){
			return this._getSetting("pomodoro_time");
		},
		getShortRestTime : function(){
			return this._getSetting("short_rest_time");
		},
	    setShortRestTime : function(withTime){
	    	this._updateTimeFor("short_rest_time", withTime);
	    }
	});

	models.Settings = new SettingsCollection();

})(jQuery);