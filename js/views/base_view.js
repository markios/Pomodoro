(function($, undefined){
	"use strict";

	var base = APP.namespace("APP.base");

	base.pageView = Backbone.View.extend({
		hide : function(){
		  this.el.addClass('hide');
		  this._isInFocus = false;
		},
		render : function(){
		  this.el.removeClass('hide');
		  this._isInFocus = true;
		}
	});

})(jQuery);