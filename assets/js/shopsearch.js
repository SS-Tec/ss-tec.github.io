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