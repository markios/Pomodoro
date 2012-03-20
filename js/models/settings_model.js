(function($, undefined){

var models = APP.namespace('APP.models');

	models.Setting = Backbone.Model.extend({
		defaults: function() {
	      return {
	        timer_minutes:  25
	      };
	    }
	});

	models.SettingsCollection =  Backbone.Collection.extend({
		
		model : models.Setting,
	    
	    // store the Todos's
	    localStorage : new Store("settings"),
	    
		// Filter down the list of all todo items that are finished.
	    getSettings: function() {
	       return this.models[0].attributes;
	    }
	});

	models.Settings = new models.SettingsCollection();

})(jQuery);