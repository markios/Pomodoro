(function($, undefined){
	var task = APP.namespace('APP.tasks');
	
	task.task = Backbone.Model.extend({
		defaults: function() {
	      return {
	        done:  false
	      };
	    },
	    // Toggle the `done` state of this todo item.
	    toggle: function() {
	      this.save({done: !this.get("done")});
	    }
	});

	task.taskCollection = Backbone.Collection.extend({
		model : task.task,
	    localStorage: new Store("todos"),
	    
	    parse: function(response) {
	    	return response.posts;
	    }
	});

	task.todo = APP.parentView.extend({
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

	    // The TodoView listens for changes to its model, re-rendering.
	    initialize: function() {
	      this.model.bind('change', this.render, this);
	      this.model.bind('destroy', this.remove, this);
	    },

	    // Re-render the contents of the todo item.
	    render: function() {
	      var todo = $(this._template).tmpl(this.model);
		  $(this.el).html(todo);
		  return this;
	    },

	    // To avoid XSS (not that it would be harmful in this particular app),
	    // we use `jQuery.text` to set the contents of the todo item.
	    setText: function() {
	      var text = this.model.get('text');
	      this.$('.todo-text').text(text);
	      this.input = this.$('.todo-input');
	      this.input.bind('blur', _.bind(this.close, this)).val(text);
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

	    // Close the `"editing"` mode, saving changes to the todo.
	    close: function() {
	      this.model.save({text: this.input.val()});
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
	
	task.view = APP.parentView.extend({
		_template : '#taskTemplate',
		initialize: function() {
		   this._tasks = new task.taskCollection();
		   this._tasks.bind('add', this.addOne, this);
		   this._tasks.bind('all', this.render, this);
		   this._input = $('#task', this.el);

		   this._tasks.fetch();
		},
        events : {
        	"keypress #task" : "addTask"
        },
        addOne : function(todo) {
        	var todoItem = new task.todo({model : todo});
        	this.$("#todo-list").append(todoItem.render().el);
        },
		addTask : function (e) {
			var text = this._input.val();
      		if (!text || e.keyCode != 13) return;
      		this._tasks.create({name : text});
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
	