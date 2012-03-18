(function($, undefined){
	
	var task = APP.namespace('APP.tasks');

	task.TodoView = APP.parentView.extend({
		tagName:  "tr",

	    // Cache the template function for a single item.
	    _template : '#todoTemplate',

	    // The DOM events specific to an item.
	    events: {
	      "click .check"              : "toggleDone",
	      "dblclick div.todo-text"    : "edit",
	      "click .todo-destroy"   	  : "clear",
	      "keypress .todo-input"      : "updateOnEnter"
	    },

	    // The TodosView listens for changes to its model, re-rendering.
	    initialize: function() {
	      this.model.bind('change', this.render, this);
	      this.model.bind('destroy', this.remove, this);
	    },

	    // Re-render the contents of the Todos item.
	    render: function() {
	      this.el = $(this.el);
	      var rendered = $(this._template).tmpl(this.model);
		  this.el.html(rendered);
		  this.setEditArea();
		  this.displayArea =  this.el.find('.display');
		  return this;
	    },

	    // To avoid XSS (not that it would be harmful in this particular app),
	    // we use `jQuery.text` to set the contents of the Todos item.
	    setEditArea: function() {
	      this.input = this.$('.todo-input');
	      this.input.bind('keypress', $.proxy(this.updateOnEnter, this));
		  this.input.bind('blur', $.proxy(this.close, this));
	    },

	    // Toggle the `"done"` state of the model.
	    toggleDone: function() {
	      this.displayArea.toggleClass('done');
	      this.model.toggle();
	    },

	    // Switch this view into `"editing"` mode, displaying the input field.
	    edit: function() {
	      this.el.addClass("editing");
	      this.input.focus();
	    },

	    // Close the `"editing"` mode, saving changes to the Todos.
	    close: function() {
	      this.model.save({name: this.input.val()});
	      this.el.removeClass("editing");
	    },

	    // If you hit `enter`, we're through editing the item.
	    updateOnEnter: function(e) {
	      if (e.keyCode == 13) this.close();
	    },

	    // Remove this view from the DOM.
	    remove: function() {
	      this.el.remove();
	    },

	    // Remove the item, destroy the model.
	    clear: function() {
	      this.model.destroy();
	    }
	});
	
	task.View = APP.parentView.extend({
		_template : '#taskTemplate',
		_totalArea : $('#total'),
		initialize: function() {
		   
		   var todos = APP.models.Todos;

		   todos.bind('add', function(item){
		   	  this.showTotal();
		   	  this.addOne(item);
		   }, this);

		   todos.bind('remove', this.showTotal, this);

		   todos.bind('all', this.render, this);
		   todos.bind('reset', this.addAll, this);
		   this._input = $('#task', this.el);
		},
        events : {
        	"keypress #task" : "addTask"
        },
        showTotal : function(){
        	this._totalArea.html('Total : ' + APP.models.Todos.length);
        },
		// Add all items in the **Todos** collection at once.
	    addAll: function() {
	    	this.showTotal();
	    	APP.models.Todos.each(this.addOne);
	    },
        addOne : function(item) {
        	var todoItem = new task.TodoView({model : item});
        	$("#todo-list").append(todoItem.render().el);
        },
		addTask : function (e) {
			var text = this._input.val();
      		if (!text || e.keyCode != 13) return;
      		
      		APP.models.Todos.create({name : text});
      		
      		this._input.val('');
		},
		render : function(){ }
	});
})(jQuery)
	