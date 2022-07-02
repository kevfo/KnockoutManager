// All of our user's expenditures.
var expenses = []

var viewModel = function(name, quantity, price, money) {
  var self = this;
  self.expenditures = ko.observableArray(expenses);

  // The user can mess around with these variables:
  self.itemName = ko.observable(name);
  self.itemQuantity = ko.observable(quantity);
  self.itemPrice = ko.observable(price);
  self.totalMoney = ko.observable(money);

  // Button functionalities:
  self.addItemToTable = function() {
    self.expenditures.push(
      {
        name : self.itemName(),
        quantity: self.itemQuantity(),
        price: self.itemPrice()
      }
    )
  }

  self.sortByNames = function() {
    self.expenditures.sort(function(a, b) {
      return a.name < b.name ? -1 : 1;
    });
  }

  // Making a new grid view model:
  self.expenseModel = new ko.simpleGrid.viewModel({
    data: self.expenditures(),
    columns: [
      { headerText : "Item Name", rowText : 'name'},
      { headerText : 'Quantity', rowText : 'quantity'},
      { headerText : 'Price', rowText : function(item) {return `SGD${item.price.toFixed(2)}`}}
    ],
    pageSize: 5
  })

  // Summary statistics to let the user know how good / bad they are...

}

ko.applyBindings(new viewModel('Sample Item', 'Sample Quantity', 'Sample Price', 20));
