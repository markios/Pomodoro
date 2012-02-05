(function($, undefined){
	var task = APP.namespace('APP.tasks');
	
	task.Todo = Backbone.Model.extend({
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

	task.TodoCollection = Backbone.Collection.extend({
		
		model : task.Todo,
	    
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

	window.Todos = new task.TodoCollection;

	task.TodoView = APP.parentView.extend({
		tagName:  "li",

	    // Cache the template function for a single item.
	    _template : '#todoTemplate',

	    // The DOM events specific to an item.
	    events: {
	      "click .check"              : "toggleDone",
	      "dblclick div.todo-text"    : "edit",
	      "click span.todo-destroy"   : "clear",
	      "keypress .todo-input"      : "updateOnEnter"
	    },

	    // The TodosView listens for changes to its model, re-rendering.
	    initialize: function() {
	      this.model.bind('change', this.render, this);
	      this.model.bind('destroy', this.remove, this);
	    },

	    // Re-render the contents of the Todos item.
	    render: function() {
	      var rendered = $(this._template).tmpl(this.model);
		  $(this.el).html(rendered);
		  this.setEditArea();
		  return this;
	    },

	    // To avoid XSS (not that it would be harmful in this particular app),
	    // we use `jQuery.text` to set the contents of the Todos item.
	    setEditArea: function() {
	      this.input = this.$('.todo-input');
	      var self = this;
	      this.input.bind('keypress', function(e){ self.updateOnEnter(e); });
		  this.input.bind('blur', function(e){ self.close(); });
	    },

	    // Toggle the `"done"` state of the model.
	    toggleDone: function() {
	      this.model.toggle();
	    },

	    // Switch this view into `"editing"` mode, displaying the input field.
	    edit: function() {
	      $(this.el).addClass("editing");
	      this.input.focus();
	    },

	    // Close the `"editing"` mode, saving changes to the Todos.
	    close: function() {
	      this.model.save({name: this.input.val()});
	      $(this.el).removeClass("editing");
	    },

	    // If you hit `enter`, we're through editing the item.
	    updateOnEnter: function(e) {
	      if (e.keyCode == 13) this.close();
	    },

	    // Remove this view from the DOM.
	    remove: function() {
	      $(this.el).remove();
	    },

	    // Remove the item, destroy the model.
	    clear: function() {
	      this.model.destroy();
	    }
	});
	
	task.View = APP.parentView.extend({
		_template : '#taskTemplate',
		initialize: function() {
		   
		   Todos.bind('add', this.addOne, this);
		   Todos.bind('all', this.render, this);
		   Todos.bind('reset', this.addAll, this);
		   this._input = $('#task', this.el);

		   Todos.fetch();
		},
        events : {
        	"keypress #task" : "addTask"
        },
		// Add all items in the **Todos** collection at once.
	    addAll: function() {
	      Todos.each(this.addOne);
	    },

        addOne : function(item) {
        	var todoItem = new task.TodoView({model : item});
        	this.$("#todo-list").append(todoItem.render().el);
        },
		addTask : function (e) {
			var text = this._input.val();
      		if (!text || e.keyCode != 13) return;
      		
      		Todos.create({name : text});
      		
      		this._input.val('');
		},
		_showTasks : function(){
			/*$(this._template).tmpl(this._tasks.models)
							 .appendTo(this.el);*/
			window.Cufon.replace('.tasks');
		},
		render : function(){
			
		}
	});
})(jQuery)
	