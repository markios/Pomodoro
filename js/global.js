window.APP = window.APP || {};

window.APP.namespace = function(ns_string){
	var parts = ns_string.split('.'),
		parent = APP,
		i;
	if(parts[0] === 'APP'){
		parts = parts.slice(1);
	}

	for(i=0; i< parts.length; i+=1){
		if(typeof parent[parts[i]] === 'undefined'){
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};

window.APP.ui = {
	block : function(item){
		item.block({
		    message:'<img src="images/load.gif">',
		    css: { 
	             border: 'none', 
	             padding: '15px', 
	             backgroundColor: '#000000', 
	             '-webkit-border-radius': '10px', 
	             '-moz-border-radius': '10px', 
	             opacity: .5, 
	             color: '#ffffff' 
		}});
	},
    unblock : function(item){
	  item.unblock();
    }
};	

window.APP.parentView = Backbone.View.extend({
	_block : function(){
		APP.ui.block(this.el);
	},
	_unblock : function(){
		APP.ui.unblock(this.el);
	} 
});