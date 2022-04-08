function Menu(toppings, sizes) {
  this.toppings = toppings;
  this.sizes = sizes;
}

let menu = new Menu(["Pepperoni", "Bacon", "Sausage", "Canadian Bacon", "Mushrooms", "Black Olives", "Green Pepper", "Garlic", "Onions", "Pineapple", "Extra Cheese"], ["10 inch", "12 inch", "14 inch"]);

function Pizza(toppings, size) {
  this.toppings = toppings;
  this.size = size;
}

Pizza.prototype.priceCalc = function(pizza) {
  let price = 11 + (this.toppings.length * .25);
  if(this.size === "10 inch") {
    price += 0;
  } else if (this.size === "12 inch") {
    price += 2;
  } else if (this.size === "14 inch") {
    price += 5;
  }
  return price;
}


// ui logic



$(document).ready(function() {
  menu.sizes.reverse().forEach(function(size){
    $("#pizza-form").prepend('<input type="radio" name="size" value="'+size+'">'+'<label>'+size+'</label>');
  });
  $("#pizza-form").prepend("<h4>Size:</h4>");
  menu.toppings.reverse().forEach(function(topping){
    $("#pizza-form").prepend('<input type="checkbox" name="toppings" value="'+topping+'">'+'<label>'+topping+'</label>');
  });
  $("#pizza-form").prepend("<h4>Toppings ($0.25 each):</h4>");

  $("#pizza-form").change(function(){
    let size = $("input:radio[name=size]:checked").val();
    let toppings = $("input:checkbox[name=toppings]:checked").map(function(){
      return $(this).val();
    }).get();
    let pizza = new Pizza(toppings, size);
    $("#current-price").text("$"+pizza.priceCalc())
  });

  $("#pizza-form").submit(function(event){
    event.preventDefault();
    let size = $("input:radio[name=size]:checked").val();
    let toppings = $("input:checkbox[name=toppings]:checked").map(function(){
      return $(this).val();
    }).get();
    let pizza = new Pizza(toppings, size);
    console.log(pizza.priceCalc());

    $(".receipt").append("<h4>Price: $" + pizza.priceCalc()+"</h4>")
  });

});
