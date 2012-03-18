(function(){
  "use strict";

    var models = APP.namespace('APP.models');
	
	models.Todo = Backbone.Model.extend({
		defaults: function() {
	      return {
	        done:  false
	      };
	    },
	    // Toggle the `done` state of this Todos item.
	    toggle: function() {
	      this.save({done: !this.get("done")});
	    }
	});

	models.TodoCollection = Backbone.Collection.extend({
		
		model : models.Todo,
	    
	    // store the Todos's
	    localStorage : new Store("todos"),
	    
		// Filter down the list of all todo items that are finished.
	    done: function() {
	      return this.filter(function(todo){ return todo.get('done'); });
	    },

	    // Filter down the list to only todo items that are still not finished.
	    remaining: function() {
	      return this.without.apply(this, this.done());
	    },

	    // We keep the Todos in sequential order, despite being saved by unordered
	    // GUID in the database. This generates the next order number for new items.
	    nextOrder: function() {
	      if (!this.length) return 1;
	      return this.last().get('order') + 1;
	    },

	    // Todos are sorted by their original insertion order.
	    comparator: function(todo) {
	      return todo.get('order');
	    }
	});

	models.Todos = new models.TodoCollection;

})();