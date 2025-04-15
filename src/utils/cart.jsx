export function loadCart () {
    let cart = localStorage.getItem("cart");
    if (cart == null) {     //new user he or she don't have cart 
        cart = {
            orderedItems : [],
            days : 1,
            startingDate : formatDate(new Date()),      // new Date() is current date
            endingDate : formatDate(new Date())
        }
        const cartString = JSON.stringify(cart);   //convert the cart JSON to string, then we can save in localstorage not in database
        localStorage.setItem("cart", cartString);
        return cart;
    }
    cart = JSON.parse(cart);    //convert string to JSON    let cart = localStorage.getItem("cart");    If user already have cart
    return cart;
}

export function addToCart (key, qty) {      //add to cart
    const cart = loadCart();    //load cart from localstorage
    let found = false;          // boolean variable to find or not relavant key product in cart
    for (let i = 0; i < cart.orderedItems.length; i++) {    //check if item already in cart     cart.orderedItems means in cart we have more orderedItems
        if (cart.orderedItems[i].key == key) {      //if item already in cart
            cart.orderedItems[i].qty += qty;        //relavant order quantity multiply by qty
            found = true;                           //set found to true if finded

        }
    }
    if (!found) {               //if item not in cart
        cart.orderedItems.push({key, qty})      //add item to cart if not found in cart
    }

    const cartString = JSON.stringify(cart);        //get cart string and now we can save the cart in localstorage
    localStorage.setItem("cart", cartString);           //save the cart in localstorage
}

export function removeFromCart(key) {
    const cart = loadCart(); // load cart from localStorage
    const newCart = cart.orderedItems.filter((item) => item.key !== key); // remove item from cart
    cart.orderedItems = newCart;        // update cart
    const cartString = JSON.stringify(cart); // get cart string and now we can save the cart in localstorage
    localStorage.setItem("cart", cartString); // save the cart in localstorage
  }

// export function removeFromCart (key) {
//     const cart = loadCart();    //load cart from localstorage
//     const newCart = cart.orderedItems.filter((item)=>{item.key !== key})     //remove item from cart
//     cart.orderedItems = newCart;    //update cart
//     const cartString = JSON.stringify(cart);        //get cart string and now we can save the cart in localstorage
//     localStorage.setItem("cart", cartString);           //save the cart in localstorage
// }

export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
