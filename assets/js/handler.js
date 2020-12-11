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
            tot.push((+cursor.value.price * +cursor.value.qty));
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
                '<button class="minicart-remove" onclick="cart_Remove(' + "'" + cursor.value.id + "'" + ',false,true)"><i class="pe-7s-close"></i></button>' +
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
            tot.push((+cursor.value.price * +cursor.value.qty));
            //console.log(tot);
            cart.innerHTML += ('<tr>' +
                '<td class="pro-thumbnail"><a href="' + cursor.value.href + '"><img class="img-fluid" src="' + cursor.value.img + '" alt="cart item" /></a></td>' +
                '<td class="pro-title"><a href="' + cursor.value.href + '">' + cursor.value.name + '</a></td>' +
                '<td class="pro-price"><span>' + cursor.value.price + ' LKR</span></td>' +
                '<td class="pro-quantity">' +
                '<div class="pro-qty">' +
                '<span class="dec qtybtn" onclick="DecQty(' + "'" + cursor.value.id + "'" + ')">-</span>' +
                '<input type="text" value="' + cursor.value.qty + '" id="crtqty' + cursor.value.id + '">' +
                '<span class="inc qtybtn" onclick="IncQty(' + "'" + cursor.value.id + "'" + ')">+</span>' +
                '</div> ' +
                '</td>' +
                '<td class="pro-subtotal"><span>' + (+cursor.value.price * +cursor.value.qty) + ' LKR</span></td>' +
                '<td class="pro-remove"><a onclick="cart_Remove(' + "'" + cursor.value.id + "'" + ',false,true)"><i class="fa fa-trash-o"></i></a></td>' +
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
            tot.push((+cursor.value.price * +cursor.value.qty));
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

function IncQty(id) {
    var transaction = db.transaction(["cart"]);
    var objectStore = transaction.objectStore("cart");
    var request = objectStore.get(id);

    request.onerror = function (event) {
        console.error("failed to read db!");
        return null;
    };

    request.onsuccess = function (event) {
        if (request.result) {
            if (!isEmpty(request.result)) {
                request.result.qty++;
                cart_Set(request.result, false);
                $('#crtqty' + id).val(request.result.qty);
            }
        } else {
            console.log("item not found! value : " + id);
            return false;
        }
    };
}
function DecQty(id) {
    var transaction = db.transaction(["cart"]);
    var objectStore = transaction.objectStore("cart");
    var request = objectStore.get(id);

    request.onerror = function (event) {
        console.error("failed to read db!");
        return null;
    };

    request.onsuccess = function (event) {
        if (request.result) {
            if (!isEmpty(request.result) && request.result.qty > 1) {
                request.result.qty--;
                cart_Set(request.result, false);
                $('#crtqty' + id).val(request.result.qty);
            }
        } else {
            console.log("item not found! value : " + id);
            return false;
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

function cart_Add(item, draw = true, alet = false) {
    var txtqtyip = $('#qtyitem');
    if (!isEmpty(txtqtyip)) item.qty = txtqtyip.val();
    if (item.price == -1) {
        alert("You Can't Add This Item To Cart. Please Contact Us And Ask For More Details About The Following Item!");
        return;
    }

    var request = db.transaction(["cart"], "readwrite").objectStore("cart").add(item);

    request.onsuccess = function (event) {
        console.log("item added! value : " + item);
        if (alet) alert("Item Added To Cart!");
        if (draw) cart_ReadAndDraw();
        return true;
    };

    request.onerror = function (event) {
        console.warn("failed to add item! item already contains! value : " + item);
        if (alet) alert("Item Already Added To Cart!");
        return false;
    }
}

function cart_Set(item, draw = true, alet = false) {
    var val = db.transaction(["cart"]).objectStore("cart").get(item.id);

    val.onerror = function (event) {
        console.error("failed to read db!");
        return false;
    };

    val.onsuccess = function (event) {
        if (val.result) {
            cart_Remove(item.id, true, false);
        }
        return cart_Add(item, draw, alet);
    };

}

function cart_Remove(id, draw, alet) {
    var request = db.transaction(["cart"], "readwrite").objectStore("cart").delete(id);

    request.onsuccess = function (event) {
        console.log("item removed! Key : " + id);
        if (alet) alert("Item Removed From Cart!");
        if (!draw) cart_ReadAndDraw();
        return true;
    };
    request.onerror = function (event) {
        console.error("failed to remove item! Key : " + id);
        if (alet) alert("Failed To Remove Item From Cart!");
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
        $('#sub-form')[0].reset();
        $("#btnOrder").prop('disabled', true);
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
    $('#sub-form')[0].reset();
    $("#btnOrder").prop('disabled', true);
}

// ================= Navigate ========================

function Navigate(pge, q) {
    var mobile = false;
    var txt = document.getElementById("schtxt").value;
    var sort = document.getElementById("sortby").value;
    var minp = $(".price-range").slider("values", 0);
    var maxp = $(".price-range").slider("values", 1);
    var ipp = document.getElementById("ipp").value;
    if (isEmpty(txt)) {
        mobile = true;
        txt = document.getElementById("schtxtmob").value;
    }
    window.location.href = pge + "?" + q + "&sch-txt=" + txt + "&min-price=" + minp + "&max-price=" + maxp + "&sort=" + sort + "&ipp=" + ipp + "&mobile=" + mobile;
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

var schcat = "";
var ispageShop = "";
var frmq = false;
window.onload = function (e) {

    ispageShop = document.title.toLowerCase().includes("shop");
    searchFromPapa();
    //var qusch = getParameterByName("sch-txt");
    //if (!isEmpty(qusch)) {
    //    searchShop();
    //}
    searchShop();
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

//function RefsearchShop() {
//    schcat = getParameterByName("sch-category");
//    if (!isEmpty(schcat)) {
//        if (schcat.toLowerCase() == "all") schcat = "";
//        else searchShop();
//    }
//}

function ICValChange() {
    var e = document.getElementById("ipp");
    if (showitemcount != e.value) {
        showitemcount = e.value;
        DrawPgnos(ShowingItmCount, false);
    }
}

var showitemcount = 6;
var selPgno = 1;
var ShowingItmCount = 0;
function DrawPgnos(itc, rst = true) {
    ShowingItmCount = itc;
    //var c = 0;
    //var ele = document.getElementById("shop-container").getElementsByClassName("search-item-shop");
    //for (var i = 0; i < ele.length; i++) {
    //    if (ele[i].style.display == 'block') {
    //        c++;
    //        if (c >= (showitemcount * (selPgno - 1)) && c <= (showitemcount * selPgno)) console.log('');
    //        else ele[i].style.display = 'none';
    //    }
    //}
    searchShop(rst);
    // setPageNos(itc);
}

function setPageNos(itmcount) {
    var ele = document.getElementById('pgenos');
    ShowingItmCount = itmcount;
    var pgc = toInt((itmcount) / (showitemcount));
    console.log(pgc);
    var html = "";
    html += '<li><a class="previous ' + (pgc <= 1 ? 'disabled' : '') + '" onclick="GotoPreviousPage()" id="prevb"><i class="pe-7s-angle-left"></i></a></li>';
    for (var i = 0; i < pgc; i++) {
        html += '<li class="' + ((i + 1) == selPgno ? 'active' : '') + '"><a onclick="SetPageNo(' + (i + 1) + ')">' + (i + 1) + '</a></li>'
    }
    html += '<li><a class="next ' + (pgc <= 1 ? 'disabled' : '') + '" onclick="GotoNextPage()" id="nxtb"><i class="pe-7s-angle-right"></i></a></li>'
    ele.innerHTML = html;
}
function SetPageNo(pagenum) {
    if (pagenum == selPgno) return;
    if (pagenum == 0) pagenum = 1;
    var pgc = toInt((ShowingItmCount) / (showitemcount));
    if (pgc < pagenum) pagenum = pgc;
    selPgno = pagenum;
    console.log('SetPageNo - selected page', selPgno);
    searchShop(false);
}

function GotoPreviousPage() {
    var ele = document.getElementById('prevb');
    if (ele.classList.contains('disabled')) return;
    var pgc = toInt((ShowingItmCount) / (showitemcount));
    if (selPgno > pgc) selPgno = 1;
    if ((selPgno - 1) >= 1) selPgno--;
    else selPgno = pgc;
    console.log('GotoPreviousPage - selected page', selPgno);
    DrawPgnos(ShowingItmCount, false);
}

function GotoNextPage() {
    var ele = document.getElementById('nxtb');
    if (ele.classList.contains('disabled')) return;
    if (selPgno == 0) selPgno = 1;
    var pgc = toInt((ShowingItmCount) / (showitemcount));
    if (pgc >= (selPgno + 1)) selPgno++;
    else selPgno = 1;
    console.log(' GotoNext - selected page', selPgno);
    DrawPgnos(ShowingItmCount, false);
}

function toInt(x) {
    return Math.ceil(x)
}

function searchFromPapa() {
    var section = getParameterByName("sch-category");
    var minp = getParameterByName("min-price");
    var maxp = getParameterByName("max-price");
    var text = getParameterByName("sch-txt");
    var sort = getParameterByName("sort");
    var ipp = getParameterByName("ipp");
    var ismobile = getParameterByName("mobile");

    console.log("sec", section);
    console.log("mob", ismobile);
    console.log("text", text);
    console.log("sort", sort);
    console.log("ipp", ipp);
    console.log("min", minp);
    console.log("max", maxp);


    if (ismobile == 'true') {
        document.getElementById("schtxtmob").value = text;
        console.log("mobtrue");
    }
    else if (ismobile == 'false') {
        document.getElementById("schtxt").value = text;
        console.log("mobfalse");
    }
    //document.getElementById("sortby").value = +sort;
    $('#sortby option[value=' + sort + ']').attr('selected', 'selected');
    $('#sortby').niceSelect('update');
    $('#ipp option[value=' + ipp + ']').attr('selected', 'selected');
    $('#ipp').niceSelect('update');
    if (!isEmpty(section)) {
        if (section.toLowerCase() == "all") section = "";
        //else searchShop();
    }
    schcat = section;
    if (!isEmpty(minp)) $(".price-range").slider("values", 0, minp);
    if (!isEmpty(maxp)) $(".price-range").slider("values", 1, maxp);
    if (!isEmpty(sort)) SortValChange(true);
}

function searchShop(rst = true) {
    if (ispageShop) {
        if (rst) selPgno = 1;
        var txt = document.getElementById("schtxt").value;
        if (isEmpty(txt)) txt = document.getElementById("schtxtmob").value
        var rangeSlider = $(".price-range");
        var ele = document.getElementById("shop-container").getElementsByClassName("search-item-shop");
        var rescount = 0;
        var c = 0;
        for (var i = 0; i < shopItems.length; i++) {
            var name = ele[i].getAttribute("data-name");
            var price = ele[i].getAttribute("data-price");
            var section = ele[i].getAttribute("data-section");
            if (name.toLowerCase().includes(txt.toLowerCase()) && (price <= rangeSlider.slider("values", 1) && price >= rangeSlider.slider("values", 0) || price == -1) && (isEmpty(schcat) || section.toLowerCase() == schcat.toLowerCase())) {
                c++;
                if ((c > (showitemcount * (selPgno - 1)) && c <= (showitemcount * selPgno))) ele[i].style.display = "block";
                else ele[i].style.display = "none";
            } else {
                ele[i].style.display = "none";
                rescount++;
            }
        }
        if (rescount == 0) document.getElementById("txtinfo").innerText = 'Showing ' + ((showitemcount * (selPgno - 1)) + 1) + '-' + ((showitemcount * selPgno) + ((selPgno - 1) == 0 ? 0 : -1)) + ' of ' + (shopItems.length - rescount) + ' results';
        else if (rescount == shopItems.length) {
            document.getElementById("txtinfo").innerText = "No Results Found For '" + txt + "' And " + (isEmpty(schcat) ? "" : ("Category = '" + schcat + "' And")) + "Price > " + rangeSlider.slider("values", 0) + " LKR And Price < " + rangeSlider.slider("values", 1) + " LKR";
        }
        else {
            if (isEmpty(txt)) document.getElementById("txtinfo").innerText = "Showing Results " + ((showitemcount * (selPgno - 1)) + 1) + '-' + ((showitemcount * selPgno) + ((selPgno - 1) == 0 ? 0 : -1)) + " For " + (isEmpty(schcat) ? "" : ("Category = '" + schcat + "' And ")) + "Price > " + rangeSlider.slider("values", 0) + " LKR And Price < " + rangeSlider.slider("values", 1) + " LKR";
            else document.getElementById("txtinfo").innerText = "Showing Results " + ((showitemcount * (selPgno - 1)) + 1) + '-' + ((showitemcount * selPgno) + ((selPgno - 1) == 0 ? 0 : -1)) + " For '" + txt + "' And " + (isEmpty(schcat) ? "" : ("Category = '" + schcat + "' ")) + "' And Price > " + rangeSlider.slider("values", 0) + " LKR And Price < " + rangeSlider.slider("values", 1) + " LKR";
        }
        ShowingItmCount = (shopItems.length - rescount);
        console.log('ded', ShowingItmCount);
        setPageNos(ShowingItmCount);
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
    var undf = new Array();
    for (var i = 0; i < shopItems.length; i++) {
        if (shopItems[i].price != -1) { shopwrap.innerHTML += DrawShopItem(shopItems[i]); }
        else undf.push(i);
    }
    for (var i = 0; i < undf.length; i++) {
        shopwrap.innerHTML += DrawShopItem(shopItems[undf[i]]);
    }

    // console.log(Items);
}

function SortValChange(dont = false) {
    var e = document.getElementById("sortby");
    if (e.value == 1) SortItems('def', true);
    else if (e.value == 2) SortItems('def', false);
    else if (e.value == 3) SortItems('name', true);
    else if (e.value == 4) SortItems('name', false);
    else if (e.value == 5) SortItems('price', true);
    else if (e.value == 6) SortItems('price', false);
    if (!dont) searchShop();
}

function DrawShopItem(val) {
    var html = "";
    html += '<div class="col-md-4 col-sm-6 search-item-shop" data-name="' + val.name + '" data-price="' + val.price + '" data-section="' + val.cat + '">';
    html += '<!-- product item start -->';
    html += '<div class="product-item">';
    html += '<figure class="product-thumb">';
    html += '<a href="' /*+ val.href*/ + '">';
    html += '<img class="pri-img" src="' + val.priimg + '" alt="' + val.name + '">';
    html += '<img class="sec-img" src="' + val.secimg + '" alt="' + val.name + '">';
    html += '</a>';
    html += '<div class="product-badge">';
    for (var i = 0; i < val.tags.length; i++) {
        html += '<div class="product-label ' + val.tags[i].color + '"><span>' + val.tags[i].txt + '</span></div>';
    }
    html += '</div>';
    html += '<div class="cart-hover">';
    html += '<button class="btn btn-cart" onclick="cart_Add({ id: ' + "'" + val.id + "'" + ', name: ' + "'" + val.name + "'" + ', price: ' + val.price + ', qty: 1, img: ' + "'" + val.priimg + "'" + ', href:' + "'" + val.href + "'" + ' },true,true)">add to cart</button>';
    html += '</div>';
    html += '</figure>';
    html += '<div class="product-caption text-center">';
    html += '<div class="product-identity">';
    html += '<p class="manufacturer-name"><a href="' + val.href + '"><strong>Sound &amp; Safety Technologies</strong></a></p>';
    html += '</div>';
    html += '<h6 class="product-name">';
    html += '<a href="' + val.href + '">' + val.name + '</a>';
    html += '</h6>';
    html += '<div class="price-box">';
    html += '<span class="price-regular">' + (val.price == -1 ? 'Contact us For Latest Prices' : (val.price + ' LKR')) + '</span>';
    html += (val.oldprice == 0 ? '' : '<span class="price-old"><del>' + val.oldprice + ' LKR</del></span>');
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<!-- product item end -->';
    html += '<!-- product list item start -->';
    html += '<div class="product-list-item shadow-sm">';
    html += '<figure class="product-thumb">';
    html += '<a href="' /*+ val.href*/ + '">';
    html += '<img class="pri-img" src="' + val.priimg + '" alt="' + val.name + '">';
    html += '<img class="sec-img" src="' + val.secimg + '" alt="' + val.name + '">';
    html += '</a>';
    html += '<div class="product-badge">';
    for (var i = 0; i < val.tags.length; i++) {
        html += '<div class="product-label ' + val.tags[i].color + '"><span>' + val.tags[i].txt + '</span></div>';
    }
    html += '</div>';
    html += '<div class="cart-hover">';
    html += '<button class="btn btn-cart" onclick="cart_Add({ id: ' + "'" + val.id + "'" + ', name: ' + "'" + val.name + "'" + ', price: ' + val.price + ', qty: 1, img: ' + "'" + val.priimg + "'" + ', href:' + "'" + val.href + "'" + ' },true,true)">add to cart</button>';
    html += '</div>';
    html += '</figure>';
    html += '<div class="product-content-list">';
    html += '<div class="product-identity">';
    html += '<p class="manufacturer-name"><a href="' + val.href + '"><strong>Sound &amp; Safety Technologies</strong></a></p>';
    html += '</div>';
    html += '<h6 class="product-name">';
    html += '<a href="' + val.href + '">' + val.name + '</a>';
    html += '</h6>';
    html += '<div class="price-box">';
    html += '<span class="price-regular">' + (val.price == -1 ? 'Contact us For Latest Prices' : (val.price + ' LKR')) + ' LKR</span>';
    html += (val.oldprice == 0 ? '' : '<span class="price-old"><del>' + val.oldprice + ' LKR</del></span>');
    html += '</div>';
    html += '<p>' + val.des + '</p>';
    html += '</div>';
    html += '</div>';
    html += '<!-- product list item end -->';
    html += '<!-- product list item start -->';
    html += '<div class="product-list-item-mobile shadow-sm">';
    html += '<div class="group-slide-item">';
    html += '<div class="group-item">';
    html += '<div class="group-item-thumb">';
    html += '<a href="Non-Contact-Temperature-Detective-Infrared-Digital-Camera.html" tabindex="0">';
    html += '<img src="' + val.priimg + '" alt="' + val.name + '" style="border-top-left-radius:5px;border-bottom-left-radius:5px;">';
    html += '</a>';
    html += '</div>';
    html += '<div class="group-item-desc">';
    html += '<h5 class="group-product-name">';
    html += '<a href="' + val.href + '" tabindex="0">';
    html += val.name;
    html += '</a>';
    html += '</h5>';
    html += '<div class="price-box">';
    html += '<span class="price-regular">' + (val.price == -1 ? 'Contact us For Latest Prices' : (val.price + ' LKR')) + 'LKR</span>';
    html += (val.oldprice == 0 ? '' : '<span class="price-old"><del>' + val.oldprice + ' LKR</del></span>');
    html += '</div>';
    html += '<div class="product-badge">'
    for (var i = 0; i < val.tags.length; i++) {
        html += '<div class="tag-label ' + val.tags[i].color + '"><span>' + val.tags[i].txt + '</span></div>';
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<!-- product list item mobile -->';
    html += '</div>'
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