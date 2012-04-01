(function($, undefined){
  "use strict";

  var menu = APP.namespace("APP.menu");


  menu.view = Backbone.View.extend({
  	initialise: function(){

  	},
  	events : {
  		"click #navigation li a" : "menuItemClicked"
  	},
  	menuItemClicked : function(event){
  		this.trigger("PageChanged", $(this).attr('href'));
  	}

  });


})(jQuery);