
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
    cart_ReadAndDrawSideCart();
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    //var objectStore = db.createObjectStore("cart", { keyPath: "id" });

};

window.onload = function (s) {
    cart_ReadAndDrawSideCart();
};


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
            console.log(tot);
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
                '<span class="cart-price">' + cursor.value.price + ' LKR</span>' +
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
        cart_ReadAndDrawSideCart();
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
        if (!draw) cart_ReadAndDrawSideCart();
        return true;
    };
    request.onerror = function (event) {
        console.error("failed to remove item! Key : " + id);
        return false;
    }
}