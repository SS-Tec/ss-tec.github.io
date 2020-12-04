// ================= Cart ========================
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    console.error("Your browser doesn't support a stable version of IndexedDB. Cart will not work!");
}
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

// ================= Post ========================

function OrderCart() {
    if (isEmpty(CheckOutPostUrl)) return;
    if (isEmpty(captchares)) {
        $("#btnOrder").prop('disabled', true);
        alert("Please Check 'I'm not a robot'");
        return;
    }
    var itms = new Array();
    var trans = db.transaction("cart");
    var objectStore = trans.objectStore("cart");
    objectStore.openCursor().onsuccess = function () {
        var cursor = event.target.result;
        if (cursor) {
            console.info("ID : " + cursor.value.id + " | Name : " + cursor.value.name + " | Price : " + cursor.value.price + " | Qty : " + cursor.value.qty);
            var it = {
                Id: cursor.value.id,
                Name: cursor.value.name,
                Qty: cursor.value.qty
            };
            itms.push(it);
            cursor.continue();
        }
    };
    trans.oncomplete = function () {
        if (itms.length == 0) {
            $("#btnOrder").prop('disabled', true);
            alert("Please Add Items To Cart!");
            return;
        }
        var orderInfo = {
            FName: $("#f_name").val(),
            LName: $("#l_name").val(),
            Email: $("#email").val(),
            CompanyName: $("#com-name").val(),
            Address1: $("#street-address").val(),
            Address2: $("#street-address1").val(),
            Address3: $("#street-address2").val(),
            Town: $("#town").val(),
            State: $("#sate").val(),
            PostCode: $("#postcode").val(),
            Phone: $("#phone").val(),
            OrderNote: $("#ordernote").val(),
            Items: itms
        };
        console.log("Order Adding");
        $.ajax({
            type: "POST",
            url: CheckOutPostUrl,
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(orderInfo),
            success: function (msg) {
                if (msg) {
                    console.log("Order Success");
                    //location.reload(true);
                } else {
                    console.log("Order Failed");
                }
            }
        })
            .done(function (res) {
                console.log('res', res);
            });
    };
}
function PostContact() {
    console.log("Post Con");
    if (isEmpty(ContactPostUrl)) return;
    if (isEmpty(captchares)) {
        $("#btnOrder").prop('disabled', true);
        alert("Please Check 'I'm not a robot'");
        return;
    }

    var contactInfo = {
        Name: $("#first_name").val(),
        Phone: $("#phone").val(),
        Email: $("#email").val(),
        Subject: $("#subject").val(),
        Message: $("#msg").val()
    }

    $.ajax({
        type: "POST",
        url: ContactPostUrl,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(contactInfo),
        success: function (msg) {
            if (msg) {
                console.log("Contact Success");
                //location.reload(true);
            } else {
                console.log("Contact Failed");
            }
        }
    })
        .done(function (res) {
            console.log('res', res);
        });
}

// ================= Captcha ========================
var captchares = "";
var verifyCallback = function (response) {
    
    $("#btnOrder").prop('disabled', isEmpty(response));
    captchares = response;
};
var onloadCallback = function () {
    grecaptcha.render('recaptchabox', { 'sitekey': '6LdfpPgZAAAAAN6AF8LeIfL3zE-T2D_7f1NU5tqY', 'callback': verifyCallback, 'theme': 'light' });
};

// ================= Search ========================

var begintext = "";
var schcat = "";
var ispageShop = "";
var frmq = false;
window.onload = function (e) {
    begintext = document.getElementById("txtinfo").innerText;
    ispageShop = document.title.toLowerCase().includes("shop");
    RefsearchShop();
    var qusch = getParameterByName("sch-txt");
    if (!isEmpty(qusch)) {
        searchShop();
    }
};

document.getElementById("schtxt").onkeyup = function (event) {
    if (event.keyCode === 13) {
        SchNotShop();
    }
    searchShop();
};
document.getElementById("schtxtmob").onkeyup = function (event) {
    if (event.keyCode === 13) {
        SchNotShop();
    }
    searchShop();
};

function RefsearchShop() {
    schcat = getParameterByName("sch-category");
    if (!isEmpty(schcat)) {
        if (schcat.toLowerCase() == "all") schcat = "";
        else searchShop();
    }
}

function searchShop() {
    if (ispageShop) {
        var qusch = getParameterByName("sch-txt");
        if (!isEmpty(qusch) && !frmq) {
            var isMob = !isEmpty(getParameterByName("mobile")) && getParameterByName("mobile") == 'true';
            if (isMob) document.getElementById("schtxtmob").value = qusch;
            else document.getElementById("schtxt").value = qusch;
            frmq = true;
        }
        var txt = document.getElementById("schtxt").value;
        if (isEmpty(txt)) txt = document.getElementById("schtxtmob").value
        var rangeSlider = $(".price-range");
        var ele = document.getElementById("shop-container").getElementsByClassName("search-item-shop");
        var rescount = 0;
        for (var i = 0; i < ele.length; i++) {
            var name = ele[i].getAttribute("data-name");
            var price = ele[i].getAttribute("data-price");
            var section = ele[i].getAttribute("data-section");
            if (name.toLowerCase().includes(txt.toLowerCase()) && (price <= rangeSlider.slider("values", 1) && price >= rangeSlider.slider("values", 0)) && (isEmpty(schcat) || section.toLowerCase() == schcat.toLowerCase())) {
                ele[i].style.display = "block";
            } else {
                ele[i].style.display = "none";
                rescount++;
            }
        }
        if (rescount == 0) document.getElementById("txtinfo").innerText = begintext;
        else if (rescount == ele.length) {
            document.getElementById("txtinfo").innerText = "No Results Found For '" + txt + "' And " + (isEmpty(schcat) ? "" : ("Category = '" + schcat + "' And")) + "Price > " + rangeSlider.slider("values", 0) + " And Price < " + rangeSlider.slider("values", 1);
        }
        else {
            if (isEmpty(txt)) document.getElementById("txtinfo").innerText = "Showing Results For " + (isEmpty(schcat) ? "" : ("Category = '" + schcat + "' And ")) + "Price > " + rangeSlider.slider("values", 0) + "LKR And Price < " + rangeSlider.slider("values", 1);
            else document.getElementById("txtinfo").innerText = "Showing Results For '" + txt + "' And " + (isEmpty(schcat) ? "" : ("Category = '" + schcat + "' ")) + "' And Price > " + rangeSlider.slider("values", 0) + " And Price < " + rangeSlider.slider("values", 1) + "LKR";
        }
    }
}

function SchNotShop() {
    ispageShop = document.title.toLowerCase().includes("shop");
    if (!ispageShop) {
        var mobile = false;
        var txt = document.getElementById("schtxt").value;
        if (isEmpty(txt)) {
            mobile = true;
            txt = document.getElementById("schtxtmob").value;
        }
        window.location.href = "shop.html?sch-txt=" + txt + "&mobile=" + mobile;
    }
}

// ================= Sorting ========================


function SortItems(col, acending) {

    if (col == 'def') {
        shopItems.sort(function (a, b) {
            var nameA = a.id.toLowerCase();
            var nameB = b.id.toLowerCase();
            if (nameA < nameB) { //acending
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        if (!acending) shopItems.reverse();
    }
    else if (col == 'price') {
        shopItems.sort((a, b) => a.price - b.price);
        if (!acending) shopItems.reverse();
    }
    else if (col == 'name') {
        shopItems.sort(function (a, b) {
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
            if (nameA < nameB) { //acending
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        if (!acending) shopItems.reverse();
    }
    var shopwrap = document.getElementById("shop-container");
    shopwrap.innerHTML = "";
    for (var i = 0; i < shopItems.length; i++) {
        shopwrap.innerHTML += DrawShopItem(shopItems[i]);
    }

    // console.log(Items);
}

function SortValChange() {
    var e = document.getElementById("sortby");
    if (e.value == 1) SortItems('def', true);
    else if (e.value == 2) SortItems('def', false);
    else if (e.value == 3) SortItems('name', true);
    else if (e.value == 4) SortItems('name', false);
    else if (e.value == 5) SortItems('price', true);
    else if (e.value == 6) SortItems('price', false);
    RefsearchShop();
}

function DrawShopItem(val) {

    var tagsdes = "";
    var tagsmob = "";
    for (var i = 0; i < val.tags.legnth; i++) {
        tagsdes += '<div class="product-label ' + val.tags[i].color + '"><span>' + val.tags[i].txt + '</span></div>';
    }
    for (var i = 0; i < val.tags.legnth; i++) {
        tagsmob += '<div class="tag-label ' + val.tags[i].color + '"><span>' + val.tags[i].txt + '</span></div>';
    }
    var html = (
        '<div class="col-md-4 col-sm-6 search-item-shop" data-name="' + val.name + '" data-price="' + val.price + '" data-section="' + val.cat + '">' +
        '<!-- product item start -->' +
        '<div class="product-item">' +
        '<figure class="product-thumb">' +
        '<a href="' + val.href + '">' +
        '<img class="pri-img" src="' + val.priimg + '" alt="' + val.name + '">' +
        '<img class="sec-img" src="' + val.secimg + '" alt="' + val.name + '">' +
        '</a>' +
        '<div class="product-badge">' + tagsdes + '</div>' +
        '<div class="cart-hover">' +
        '<button class="btn btn-cart" onclick="cart_Set({ id: ' + "'" + val.id + "'" + ', name: ' + "'" + val.name + "'" + ', price: ' + val.price + ', qty: 1, img: ' + "'" + val.priimg + "'" + ', href:' + "'" + val.href + "'" + ' })">add to cart</button>' +
        '</div>' +
        '</figure>' +
        '<div class="product-caption text-center">' +
        '<div class="product-identity">' +
        '<p class="manufacturer-name"><a href="' + val.href + '"><strong>Sound &amp; Safety Technologies</strong></a></p>' +
        '</div>' +
        '<h6 class="product-name">' +
        '<a href="' + val.href + '">' + val.name + '</a>' +
        '</h6>' +
        '<div class="price-box">' +
        '<span class="price-regular">' + val.price + ' LKR</span>' +
        '<span class="price-old"><del>' + val.oldprice + ' LKR</del></span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<!-- product item end -->' +
        '<!-- product list item start -->' +
        '<div class="product-list-item shadow-sm">' +
        '<figure class="product-thumb">' +
        '<a href="' + val.href + '">' +
        '<img class="pri-img" src="' + val.priimg + '" alt="' + val.name + '">' +
        '<img class="sec-img" src="' + val.secimg + '" alt="' + val.name + '">' +
        '</a>' +
        '<div class="product-badge">' + tagsdes + '</div>' +
        '<div class="cart-hover">' +
        '<button class="btn btn-cart" onclick="cart_Set({ id: ' + "'" + val.id + "'" + ', name: ' + "'" + val.name + "'" + ', price: ' + val.price + ', qty: 1, img: ' + "'" + val.priimg + "'" + ', href:' + "'" + val.href + "'" + ' })">add to cart</button>' +
        '</div>' +
        '</figure>' +
        '<div class="product-content-list">' +
        '<div class="product-identity">' +
        '<p class="manufacturer-name"><a href="' + val.href + '"><strong>Sound &amp; Safety Technologies</strong></a></p>' +
        '</div>' +
        '<h6 class="product-name">' +
        '<a href="' + val.href + '">' + val.name + '</a>' +
        '</h6>' +
        '<div class="price-box">' +
        '<span class="price-regular">' + val.price + ' LKR</span>' +
        '<span class="price-old"><del>' + val.oldprice + ' LKR</del></span>' +
        '</div>' +
        '<p>' + val.des + '</p>' +
        '</div>' +
        '</div>' +
        '<!-- product list item end -->' +
        '<!-- product list item start -->' +
        '<div class="product-list-item-mobile shadow-sm">' +
        '<div class="group-slide-item">' +
        '<div class="group-item">' +
        '<div class="group-item-thumb">' +
        '<a href="Non-Contact-Temperature-Detective-Infrared-Digital-Camera.html" tabindex="0">' +
        '<img src="' + val.priimg + '" alt="' + val.name + '" style="border-top-left-radius:5px;border-bottom-left-radius:5px;">' +
        '</a>' +
        '</div>' +
        '<div class="group-item-desc">' +
        '<h5 class="group-product-name">' +
        '<a href="' + val.href + '" tabindex="0">' +
        val.name +
        '</a>' +
        '</h5>' +
        '<div class="price-box">' +
        '<span class="price-regular">' + val.price + 'LKR</span>' +
        '<span class="price-old"><del>' + val.oldprice + ' LKR</del></span>' +
        '</div>' +
        '<div class="product-badge">' + tagsmob + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<!-- product list item mobile -->' +
        '</div>');
    return html;
}

// ================= Common ========================

function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}