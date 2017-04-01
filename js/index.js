"use strict";

var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

var Ingredient = React.createClass({
  displayName: "Ingredient",

  render: function render() {
    return React.createElement(
      "li",
      null,
      this.props.ingredient
    );
  }
});

var Recipes = React.createClass({
  displayName: "Recipes",

  getInitialState: function getInitialState() {
    return { editing: false };
  },

  eachIngredient: function eachIngredient(text, i) {
    return React.createElement(Ingredient, { ingredient: text });
  },

  removeRecipe: function removeRecipe() {
    console.log("Deleting Recipe");
    this.props.deleteFromBoard(this.props.index);
  },

  editingRecipe: function editingRecipe() {
    this.setState({ editing: true });
  },

  close: function close() {
    this.setState({ editing: false });
  },

  updateRecipe: function updateRecipe() {
    console.log(" Updating Recipe ");
    var name = this.refs.newName.value;
    var ingredients = this.refs.newIngredients.value;
    ingredients = ingredients.split(",");
    var recipe = {
      "name": name,
      "ingredients": ingredients
    };
    this.props.updateFromBoard(recipe, this.props.index);
    this.close();
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "panel panel-default" },
        React.createElement(
          "div",
          { className: "myclass panel-heading", role: "tab" },
          React.createElement(
            "h4",
            { className: "panel-title" },
            React.createElement(
              "a",
              { role: "button", "data-toggle": "collapse", "data-parent": "#accordion", href: "#" + this.props.index, "aria-expanded": "true", "aria-controls": this.props.index },
              React.createElement(
                "span",
                { className: "text-primary" },
                this.props.name
              )
            )
          )
        ),
        React.createElement(
          "div",
          { id: this.props.index, className: "panel-collapse collapse", role: "tabpanel", "aria-labelledby": "headingOne" },
          React.createElement(
            "div",
            { className: "panel-body" },
            React.createElement(
              "h4",
              { className: "ingredients" },
              "Ingredients"
            ),
            React.createElement("hr", null),
            React.createElement(
              "ul",
              null,
              this.props.ingredients.map(this.eachIngredient)
            ),
            React.createElement("hr", null),
            React.createElement(
              "button",
              { className: "btn btn-danger", onClick: this.removeRecipe },
              "Delete"
            ),
            " ",
            React.createElement(
              "button",
              { onClick: this.editingRecipe, "data-toggle": "modal", "data-target": "#editrecipe", className: "btn btn-warning" },
              "Edit"
            ),
            React.createElement(
              Modal,
              { show: this.state.editing, className: "col-xs-12 col-sm-8 col-sm-offset-2" },
              React.createElement(
                Modal.Header,
                null,
                React.createElement(
                  Modal.Title,
                  null,
                  "Edit Recipe"
                )
              ),
              React.createElement(
                Modal.Body,
                null,
                React.createElement(
                  "form",
                  null,
                  React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                      "label",
                      { "for": "edit-name", className: "control-label" },
                      "Recipe"
                    ),
                    React.createElement("input", { type: "text", ref: "newName", defaultValue: this.props.name, className: "form-control", id: "edit-name", placeholder: "Recipe Name" })
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement(
                      "label",
                      { "for": "edit-ingredients", className: "control-label" },
                      "Ingredients"
                    ),
                    React.createElement("textarea", { ref: "newIngredients", className: "form-control", defaultValue: this.props.ingredients, id: "edit-ingredients", placeholder: "Enter Ingredients, Separated by comma" })
                  )
                )
              ),
              React.createElement(
                Modal.Footer,
                null,
                React.createElement(
                  Button,
                  { onClick: this.updateRecipe, bsStyle: "primary" },
                  "Edit Recipe"
                ),
                React.createElement(
                  Button,
                  { onClick: this.close },
                  "Close"
                )
              )
            )
          )
        )
      )
    );
  }
});

var Board = React.createClass({
  displayName: "Board",

  getInitialState: function getInitialState() {
    // gets the list of all stored recipies
    return { recipes: [{
        "name": "Spaghetti",
        "ingredients": ["Noodles", "Tomato Sauce"]
      }, {
        "name": "Onion Pie",
        "ingredients": ["Onion", "Pie Crust"]
      }], add: false };
  },

  removeRecipe: function removeRecipe(i) {
    console.log("Deleting Recipe from board:");
    var array = this.state.recipes;
    array.splice(i, 1);
    this.setState({ recipes: array });
  },

  updateRecipe: function updateRecipe(newData, i) {
    console.log("Editing Recipe");
    var array = this.state.recipes;
    array[i] = newData;
    this.setState({ recipes: array });
  },

  eachRecipe: function eachRecipe(data, i) {
    return React.createElement(Recipes, { index: i, name: data.name, ingredients: data.ingredients, deleteFromBoard: this.removeRecipe, updateFromBoard: this.updateRecipe });
  },

  addRecipe: function addRecipe() {
    this.setState({ add: true });
  },

  close: function close() {
    this.setState({ add: false });
  },

  saveRecipe: function saveRecipe() {
    var name = document.getElementById("recipe-name").value;
    var ingredients = document.getElementById("ingredients").value;
    ingredients = ingredients.split(",");
    console.log(name, ingredients);
    if (name == "") {
      name = "Untitled";
    }
    var recipe = {
      "name": name,
      "ingredients": ingredients
    };
    var array = this.state.recipes;
    array.push(recipe);
    this.setState({ recipes: array });
    this.close();
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "jumbotron" },
        this.state.recipes.map(this.eachRecipe)
      ),
      React.createElement(
        "button",
        { onClick: this.addRecipe, className: "btn btn-lg btn-primary" },
        "Add New Recipe "
      ),
      React.createElement(
        Modal,
        { show: this.state.add, className: "col-xs-12 col-sm-8 col-sm-offset-2" },
        React.createElement(
          Modal.Header,
          null,
          React.createElement(
            Modal.Title,
            null,
            "Add a Recipe"
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(
            "form",
            null,
            React.createElement(
              "div",
              { className: "form-group" },
              React.createElement(
                "label",
                { "for": "recipe-name", className: "control-label" },
                "Recipe"
              ),
              React.createElement("input", { type: "text", className: "form-control", id: "recipe-name", placeholder: "Recipe Name" })
            ),
            React.createElement(
              "div",
              { className: "form-group" },
              React.createElement(
                "label",
                { "for": "ingredients", className: "control-label" },
                "Ingredients"
              ),
              React.createElement("textarea", { className: "form-control", id: "ingredients", placeholder: "Enter Ingredients, Separated by comma" })
            )
          )
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: this.saveRecipe, bsStyle: "primary" },
            "Add Recipe"
          ),
          React.createElement(
            Button,
            { onClick: this.close },
            "Close"
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(Board, null), document.getElementById("board"));