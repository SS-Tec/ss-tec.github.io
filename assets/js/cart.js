
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    console.error("Your browser doesn't support a stable version of IndexedDB. Cart will not work!");
}

const cartData = [
    { id: "01", name: "gopal", price: 35, qty: 1, img: '' },
    { id: "02", name: "prasad", price: 12000, qty: 1, img: '' }
];
var db;
var request = window.indexedDB.open("DB", 1);

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
    cart_ReadAndDraw();
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("cart", { keyPath: "id" });

};
var ispageCart = false;
var ispageCheckout = false;
window.onload = function (s) {
    //ispageCart = document.title.toLowerCase().includes("cart");
    //ispageCheckout = document.title.toLowerCase().includes("checkout");
    //console.log("load");
    //cart_ReadAndDraw();
};
function cart_ReadAndDraw() {
    ispageCart = document.title.toLowerCase().includes("cart");
    ispageCheckout = document.title.toLowerCase().includes("checkout");
    if (ispageCart) cart_ReadAndDrawCart();
    else if (ispageCheckout) cart_ReadAndDrawCheckoutCart();
    cart_ReadAndDrawSideCart();
}

function cart_ReadAndDrawSideCart() {
    var objectStore = db.transaction("cart").objectStore("cart");
    var cart = document.getElementById("sideCart");
    cart.innerHTML = "";
    var tot = new Array();
    objectStore.openCursor().onsuccess = function () {
        var cursor = event.target.result;
        //if (objectStore.count() == 0) {
        //    cart.innerHTML += ('<li class="minicart-item"> No Items In Cart! </li>');
        //} else
        if (cursor) {
            console.info("ID : " + cursor.value.id + " | Name : " + cursor.value.name + " | Price : " + cursor.value.price + " | Qty : " + cursor.value.qty);
            tot.push(+cursor.value.price);
            //console.log(tot);
            cart.innerHTML += ('<li class="minicart-item">' +
                '<div class="minicart-thumb">' +
                '<a href="' + cursor.value.href + '">' +
                '<img src="' + cursor.value.img + '" alt="cart item">' +
                '</a>' +
                '</div>' +
                '<div class="minicart-content">' +
                '<h3 class="product-name">' +
                '<a href="' + cursor.value.href + '">' + cursor.value.name + '</a>' +
                '</h3>' +
                ' <p>' +
                ' <span class="cart-quantity">' + cursor.value.qty + ' <strong>&times;</strong> </span>' +
                '<span class="cart-price">' + (+cursor.value.price * +cursor.value.qty) + ' LKR</span>' +
                ' </p>' +
                '</div>' +
                '<button class="minicart-remove" onclick="cart_Remove(' + "'" + cursor.value.id + "'" + ')"><i class="pe-7s-close"></i></button>' +
                ' </li>');

            cursor.continue();
        }

        var v = 0;
        for (var i = 0; i < tot.length; i++) {
            v += +tot[i];
        }
        document.getElementById("lbsbTotprice").innerText = v + " LKR";
        document.getElementById("lbTotprice").innerText = v + " LKR";
        if (tot.length == 0) {
            cart.innerHTML = ('<li><div class="alert alert-warning text-center" style="width:100%">No Items In Cart!</div></li>');
        }
        document.getElementById("cccount").innerText = tot.length;
        document.getElementById("cccountmob").innerText = tot.length;
    };

}

function cart_ReadAndDrawCart() {
    var objectStore = db.transaction("cart").objectStore("cart");
    var cart = document.getElementById("Carttable");
    cart.innerHTML = "";
    var tot = new Array();
    objectStore.openCursor().onsuccess = function () {
        var cursor = event.target.result;
        //if (objectStore.count() == 0) {
        //    cart.innerHTML += ('<li class="minicart-item"> No Items In Cart! </li>');
        //} else
        if (cursor) {
            console.info("ID : " + cursor.value.id + " | Name : " + cursor.value.name + " | Price : " + cursor.value.price + " | Qty : " + cursor.value.qty);
            tot.push(+cursor.value.price);
            //console.log(tot);
            cart.innerHTML += ('<tr>' +
                '<td class="pro-thumbnail"><a href="' + cursor.value.href + '"><img class="img-fluid" src="' + cursor.value.img + '" alt="cart item" /></a></td>' +
                '<td class="pro-title"><a href="' + cursor.value.href + '">' + cursor.value.name + '</a></td>' +
                '<td class="pro-price"><span>' + cursor.value.price + ' LKR</span></td>' +
                '<td class="pro-quantity">' +
                '<div class="pro-qty"><input type="text" value="' + cursor.value.qty + '" ></div > ' +
                '</td>' +
                '<td class="pro-subtotal"><span>' + (+cursor.value.price * +cursor.value.qty) + ' LKR</span></td>' +
                '<td class="pro-remove"><a onclick="cart_Remove(' + "'" + cursor.value.id + "'" + ')"><i class="fa fa-trash-o"></i></a></td>' +
                '</tr>');

            cursor.continue();
        }

        var v = 0;
        for (var i = 0; i < tot.length; i++) {
            v += +tot[i];
        }
        document.getElementById("lbsbTotprice").innerText = v + " LKR";
        document.getElementById("lbTotprice").innerText = v + " LKR";
        if (tot.length == 0) {
            cart.innerHTML = ('<tr><td colspan="6"><div class="alert alert-warning text-center" style="width:100%">No Items In Cart!</div></td></tr>');
        }
        document.getElementById("cccount").innerText = tot.length;
        document.getElementById("cccountmob").innerText = tot.length;
    };

}

function cart_ReadAndDrawCheckoutCart() {
    var objectStore = db.transaction("cart").objectStore("cart");
    var cart = document.getElementById("Carttable");
    cart.innerHTML = "";
    var tot = new Array();
    objectStore.openCursor().onsuccess = function () {
        var cursor = event.target.result;
        //if (objectStore.count() == 0) {
        //    cart.innerHTML += ('<li class="minicart-item"> No Items In Cart! </li>');
        //} else
        if (cursor) {
            console.info("ID : " + cursor.value.id + " | Name : " + cursor.value.name + " | Price : " + cursor.value.price + " | Qty : " + cursor.value.qty);
            tot.push(+cursor.value.price);
            //console.log(tot);
            cart.innerHTML += ('<tr>' +
                '<td><a href=\"' + cursor.value.href + '\">' + cursor.value.name + '<strong> x ' + cursor.value.qty + '</strong></a></td>' +
                '<td> ' + (+cursor.value.price * +cursor.value.qty) + ' LKR</td> ' +
                '</tr>');

            cursor.continue();
        }

        var v = 0;
        for (var i = 0; i < tot.length; i++) {
            v += +tot[i];
        }
        document.getElementById("lbsbTotprice").innerText = v + " LKR";
        document.getElementById("lbTotprice").innerText = v + " LKR";
        if (tot.length == 0) {
            document.getElementById("checkbody").innerHTML = ('<div class="alert alert-info text-center" style="width:100%">Please Add Items To Cart Before Checkout!</div>');
        }
    };

}

function cart_Get(id) {
    var transaction = db.transaction(["cart"]);
    var objectStore = transaction.objectStore("cart");
    var request = objectStore.get(id);

    request.onerror = function (event) {
        console.error("failed to read db!");
        return null;
    };

    request.onsuccess = function (event) {
        if (request.result) {
            return request.result;
        } else {
            console.log("item not found! value : " + id);
            return false;
        }
    };
}

function cart_Add(item) {
    var request = db.transaction(["cart"], "readwrite").objectStore("cart").add(item);

    request.onsuccess = function (event) {
        console.log("item added! value : " + item);
        cart_ReadAndDraw();
        return true;
    };

    request.onerror = function (event) {
        console.warn("failed to add item! item already contains! value : " + item);
        return false;
    }
}

function cart_Set(item) {
    var val = db.transaction(["cart"]).objectStore("cart").get(item.id);

    val.onerror = function (event) {
        console.error("failed to read db!");
        return false;
    };

    val.onsuccess = function (event) {
        if (val.result) {
            cart_Remove(item.id, true);
        }
        return cart_Add(item);
    };

}

function cart_Remove(id, draw) {
    var request = db.transaction(["cart"], "readwrite").objectStore("cart").delete(id);

    request.onsuccess = function (event) {
        console.log("item removed! Key : " + id);
        if (!draw) cart_ReadAndDraw();
        return true;
    };
    request.onerror = function (event) {
        console.error("failed to remove item! Key : " + id);
        return false;
    }
}