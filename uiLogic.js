// All of our user's expenditures.
var expenses = [{name: 'Mars Bar', quantity: 1, price: 0.5}]

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

  self.removeItem = function(item) {
    self.expenditures.remove(item);
  }

  // Summary statistics to let the user know how good / bad they are...

  self.tallyStats = function() {
    self.leftOver = ko.computed(function() {
      let initial = self.totalMoney();
      self.expenditures().forEach(item => {
        initial -= item.price;
      })
      return initial >= 0 ? initial.toFixed(2) : 0;
    }, self);

    self.moneySpent = ko.computed(function() {
      let totalSpent = 0;
      self.expenditures().forEach(item => {
        totalSpent += item.price;
      });
      return totalSpent;
    }, self);

    self.itemsBought = ko.computed(function() {
      let itemCount = 0;
      self.expenditures().forEach(item => {itemCount++});
      return itemCount;
    }, self);

    return {first: self.leftOver, second: self.moneySpent, third: self.itemsBought};
  }

  let summaryStats = self.tallyStats();
  self.leftOver = summaryStats.first;
  self.moneySpent = summaryStats.second;
  self.itemsBought = summaryStats.third;
  
}
