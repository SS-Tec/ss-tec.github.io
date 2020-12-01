var begintext = "";
window.onload = function (e) {
    begintext = document.getElementById("txtinfo").innerText;
};

function searchShop() {
    var txt = document.getElementById("schtxt").value;
    if (isEmpty(txt)) txt = document.getElementById("schtxtmob").value
    var rangeSlider = $(".price-range");
    var ele = document.getElementById("shop-container").getElementsByClassName("search-item-shop");
    var rescount = 0;
    for (var i = 0; i < ele.length; i++) {
        var name = ele[i].getAttribute("data-name");
        var price = ele[i].getAttribute("data-price");
        if (name.toLowerCase().includes(txt) && (price <= rangeSlider.slider("values", 1) && price >= rangeSlider.slider("values", 0))) {
            ele[i].style.display = "block";
        } else {
            ele[i].style.display = "none";
            rescount++;
        }
    }
    if (rescount == 0) document.getElementById("txtinfo").innerText = begintext;
    else if (rescount == ele.length) {
        document.getElementById("txtinfo").innerText = "No Results Found For '" + txt + "' And Price > " + rangeSlider.slider("values", 0) + " And Price < " + rangeSlider.slider("values", 1);
    }
    else {
        if (isEmpty(txt)) document.getElementById("txtinfo").innerText = "Showing Results For Price > " + rangeSlider.slider("values", 0) + "LKR And Price < " + rangeSlider.slider("values", 1);
        else document.getElementById("txtinfo").innerText = "Showing Results For '" + txt + "' And Price > " + rangeSlider.slider("values", 0) + " And Price < " + rangeSlider.slider("values", 1) + "LKR";
    }
}

function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}