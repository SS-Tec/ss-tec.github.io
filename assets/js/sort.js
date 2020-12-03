//var shopItems = [
//    { id: '1', name: 'harindu Wijesunghe', price: 1000, oldprice: 2000, cat: 'new', href: 'cart.html', priimg: 'assets/img/logo/icon-md.png', secimg: '', des: 'gona', tags: [{ txt: '50%', color: 'new' }] },
//];
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
        '<div class="product-badge">'+tagsdes+'</div>' +
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