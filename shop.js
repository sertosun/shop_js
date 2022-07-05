const image_box = document.querySelectorAll(".product_image_box");
const product_button = document.querySelectorAll(".product_item_button");

image_box.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (
      (product_button[index].style.transform =
        "translateY(100%)" && product_button[index].style.opacity == 0)
    ) {
      product_button[index].style.transform = "translateY(0)";
      product_button[index].style.opacity = 1;
    } else {
      product_button[index].style.transform = "translateY(100%)";
      product_button[index].style.opacity = 0;
    }
  });
});

/* --------------------------------- */

//1 Schritt

if (document.readyState == "loading") {
  // console.log(document.readyState)
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Stück für Stück wurde diese Function aufgebaut (2.Schritt ohne Inhalt)
function ready() {
  //4.1 Schritt
  var removeCartItemButtons = document.getElementsByClassName("btn_remove");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
    // console.log("clicked on remove");
  }

  // 5.1 Schritt
  var quantityInputs = document.getElementsByClassName("cart_quantity_input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // 6.1 Schritt
  var addToCartButtons = document.getElementsByClassName("product_item_button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  // 8.1 Schritt
  document
    .getElementsByClassName("btn_kaufen")[0]
    .addEventListener("click", purchaseClicked);
}

// 8.Schritt
function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart_items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

//4.Schritt
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}
// 5.Schritt
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value)) {
    input.value = 1;
  } else if (input.value <= 0) {
    input.parentElement.parentElement.remove();
  }
  updateCartTotal();
}

// 6.Schritt
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title =
    shopItem.getElementsByClassName("product_item_title")[0].innerText;
  //  console.log(title)
  var price =
    shopItem.getElementsByClassName("product_item_price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("product_item_image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}
//7.Schritt
function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart_row");
  var cartItems = document.getElementsByClassName("cart_items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart_item_title");
  var cartItemQunatity = cartItems.getElementsByClassName(
    "cart_quantity_input"
  );
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      cartItemQunatity[i].value++;
      return;
    }
  }
  var cartRowContents = `
      <div class="cart_item cart_column">
          <img class="cart_item_image" src="${imageSrc}" width="100" height="100">
          <span class="cart_item_title">${title}</span>
      </div>
      <span class="cart_price cart_column">${price}</span>
      <div class="cart_quantity cart_column">
          <input class="cart_quantity_input" type="number" value="1">
          <button class="btn btn_remove" type="button">REMOVE</button>
      </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn_remove")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart_quantity_input")[0]
    .addEventListener("change", quantityChanged);
}

// 3.Schritt
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart_items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart_row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart_price")[0];
    // console.log(priceElement.innerText)
    var quantityElement = cartRow.getElementsByClassName(
      "cart_quantity_input"
    )[0];

    var price = parseFloat(priceElement.innerText.replace("€", ""));
    //console.log(price)
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = total.toFixed(2);
  console.log(total);
  document.getElementsByClassName("cart_total_price")[0].innerText =
    "€" + total;
}
