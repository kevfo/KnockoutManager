// All of our user's expenditures.
var expenses = [
  {itemName: 'Mars Bar', itemQuantity: '0', itemPrice: '0'}
]

var viewModel = function(expense, money) {
  var self = this;
  self.expenditures = ko.observableArray(expense);

  // The user can mess around with these variables:
  self.totalMoney = ko.observable(money);

  // Button functionalities:
  self.addItemToTable = function() {
    self.expenditures.push(
      {
        itemName : '',
        itemQuantity: '0',
        itemPrice: '0'
      }
    )
  }

  self.sortByPrice = function() {
    self.expenditures.sort(function(a, b) {
      return a.itemPrice < b.itemPrice ? -1 : 1;
    });
  }

  self.sortByQuantity = function() {
    self.expenditures.sort(function(a, b) {
      return a.itemQuantity < b.itemQuantity ? -1 : 1;
    });
  }

  self.removeItem = function(item) {
    self.expenditures.remove(item);
  }

  // Summary statistics to let the user know how good / bad they are...
  self.leftOver = ko.computed(function() {
    let initial = self.totalMoney();
    self.expenditures().forEach(item => {
      initial -= parseInt(item.itemPrice);
    })
    return initial > 0 ? `$${initial.toFixed(2)}` : '0$';
  }, self);

  self.moneyGone = ko.computed(function() {
    let totalSpent = 0;
    self.expenditures().forEach(item => {
      totalSpent += parseInt(item.itemPrice) * parseInt(item.itemQuantity);
    });
    return `$${totalSpent}`;
  }, self);

  self.itemsBought = ko.computed(function() {
    let itemCount = 0;
    self.expenditures().forEach(item => {itemCount++});
    return itemCount + ' items';
  }, self);

  self.finalConsensus = ko.computed(function() {
    return self.moneyGone > self.totalMoney() ? "Yes :(" : "No :)";
  })
}
