(function($, undefined){
	var taskList = APP.namespace('APP.tasks');
	
	taskList.task = Backbone.Model.extend({
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

	taskList.taskCollection = Backbone.Collection.extend({
		model : taskList.task,
	    localStorage: new Store("todos"),
	    parse: function(response) {
	    	return response.posts;
	    }
	});

	taskList.todo = APP.parentView.extend({
	tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

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
      $(this.el).html(this.template(this.model.toJSON()));
      this.setText();
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
	
	taskList.view = APP.parentView.extend({
		_template : '#taskTemplate',
		initialize: function() {
		   this._tasks = new taskList.taskCollection();
		   var self = this;
		   this._input = $('#task', this.el);
		   //this._tasks.bind("all", this._showTasks, this);
		   //this._tasks.fetch();
        },
        events : {
        	"keypress #task" : "addTask"
        },
		addTask : function (e) {
			if(e.which === 13) {
				var task = this._input.val();
				this._input.val('');
			    var result = this._tasks.create({name : task});
				console.dir(result);			   
			}
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
	