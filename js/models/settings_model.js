(function($, undefined){

var models = APP.namespace('APP.models');

	var Setting = Backbone.Model.extend({
		defaults: function() {
	      return {
	        timer_minutes:  25
	      };
	    }
	});

	var SettingsCollection =  Backbone.Collection.extend({
		
		model : Setting,
	    
	    // store the Todos's
	    localStorage : new Store("settings"),
	    
		// Filter down the list of all todo items that are finished.
	    getSettings: function() {
	       return this.models[0].attributes;
	    }
	});

	models.Settings = new SettingsCollection();

})(jQuery);