let callApi = new CallApi();
getDataList();
let cart = [];
loadCart()
/**
 * function get data from Api
 */
function getDataList() {
  callApi
    .fetchDataList()
    .then(function (result) {
      console.log(result.data);
      renderProduct(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Function display product on webite
 * @param {*} data
 */
function renderProduct(data) {
  let contentHTML = "";
  data.forEach((product) => {
    contentHTML += `
      <div class="col-xl-4 col-sm-6 col-12">
        <div class="card product-item">
          <img class="card-img-top" src="./admin-page/img/${product.img}" alt="product">
          <div class="card-body">
            <h4 class="card-title">$ ${product.price}</h4>
            <p class="card-text">${product.name}</p>
            <span>
              <img src="./images/star.png" alt="">
              <img src="./images/star.png" alt="">
              <img src="./images/star.png" alt="">
              <img src="./images/star.png" alt="">
            </span>
          </div>
          <div class="product-footer">
            <button class = "btn btn-success" onclick = "viewDetail('${product.id}')"
            >Detail</button>
          </div>
        </div>
      </div>
    `;
  });
  document.getElementsByClassName("product-list")[0].innerHTML = contentHTML;
}

/**
 * Get product detail
 * @param {*} id
 */
function viewDetail(id) {
  callApi
    .findProduct(id)
    .then(function (result) {
      console.log(result.data);
      document.getElementById("open-detail").click();
      renderProductDetail(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Print detail inofmation of product on website
 * @param {*} data
 */
function renderProductDetail(data) {
  let addBtn = `<button class="btn btn-success" onclick="addDetail('${data.id}')">Add to cart</button>`;
  let detailHTML = `
    <div class="row">
      <div class="col-6">
        <div class="detail-img">
          <img src="./admin-page/img/${data.img}" alt="" class="img-fluid">
        </div>
      </div>
      <div class="col-6">
        <div class="detail-info">
          <p><b>Name</b>: ${data.name} </p>
          <p><b>Price</b>: ${data.price}</p>
          <p><b>Name</b>: ${data.screen}</p>
          <p><b>Back Camera</b>: ${data.backCamera}</p>
          <p><b>Front Camera</b>: ${data.frontCamera}</p>
          <p><b>Description</b>: ${data.desc}</p>
          <p><b>Type</b>: ${data.type} </p>
        </div>
      </div>
    </div>
  `;
  document.querySelector(".modal-body").innerHTML = detailHTML;
  document.querySelector(".modal-footer").innerHTML = addBtn;
}

/**
 * Get data of product to add to cart
 * @param {*} id
 */
function addDetail(id) {
  callApi
    .findProduct(id)
    .then(function (result) {
      addToCart(
        result.data.id,
        result.data.name,
        result.data.price,
        result.data.img
      );
      renderCart(cart);
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * add product to cart
 * @param {*} data
 * @returns
 */
function addToCart(id, name, price, img) {
  let product = new Product(id, name, price, img);
  let cartItem = {
    item: product,
    count: 1,
  };
  for (let i in cart) {
    if (cart[i].item.id === cartItem.item.id) {
      cart[i].count++;
      saveCart();
      return;
    }
  }
  cart.push(cartItem);
  saveCart();
}

function removeCart(id) {
  for (let i in cart) {
    if (cart[i].item.id === id) {
      cart[i].count--;
      if (cart[i].count === 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }
  saveCart();
}

function removeCartAll(id) {
  for (let i in cart) {
    if (cart[i].item.id === id) {
      cart.splice(i, 1);
      break;

    }
  }
  saveCart();
};

function totalCount(){
  let totalCount =0;
  cart.forEach((item)=>{
    totalCount+=item.count
  })
  return totalCount;
};

/**
 * total price in cart
 * @returns
 */
function totalPrice() {
  let total = 0;
  cart.forEach((item) => {
    total += item.item.price * item.count;
  });
  return total;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty");
  } else {
    alert("Purchase successfully");
    cart = [];
    renderCart(cart);
  }
  saveCart();
}

/**
 * render table cart
 * @param {*} data
 */
function renderCart(data) {
  let cart = [];
  cart = data;
  console.log(cart.length);
  let contentHTML = "";
  if (cart.length == 0) {
    contentHTML = `
    <tr>
      <td colspan="4">
        <p style="font-size: 18px;">"Your cart is empty"</p>
      </td>
    </tr>
    `;
  }
  for (let i = 0; i < cart.length; i++) {
    contentHTML += `
    <tr>
      <td class="pt-3 pb-3"><img src=" ./admin-page/img/${
        cart[i].item.img
      }" alt="" width = 100px></td>
      <td class="">${(cart[i].item.name)}</td>
      <td class="">${cart[i].item.price}</td>
      <td class="">
        <span>
          <button class="btn btn-secondary" onclick="minusItem('${
            cart[i].item.id
          }')">-</button>
            ${cart[i].count}
          <button class="btn btn-secondary" onclick="plusItem('${
            cart[i].item.id
          }','${cart[i].item.name}','${cart[i].item.price}'), '${
          cart[i].item.img
          }'">+</button>  
        <span>
      </td>
      <td>
        <button class="btn btn-danger" onclick="deleteItem('${
          cart[i].item.id
        }')">Delete</button>
      </td>
    </tr>
    `;
  }
  document.getElementById("renderCart").innerHTML = contentHTML;
  document.getElementById("cart-footer").innerHTML =
    `           
    <span >
      <button class="btn btn-success" onclick="checkout()">
        Purchase
      </button>
    </span>` +
    "<h3>Total: $</h3> " +
    "<h3>" +
    totalPrice() +
    "</h3>";
};
document.getElementById("cartDisplay").innerHTML = totalCount()

/**
 * Plus item in cart
 * @param {*} id
 * @param {*} name
 * @param {*} price
 */
function plusItem(id, name, price, img) {
  addToCart(id, name, price, img);
  renderCart(cart);
}

function minusItem(id) {
  removeCart(id);
  renderCart(cart);
}

function deleteItem(id) {
  removeCartAll(id);
  renderCart(cart);
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
function loadCart() {
  cart = JSON.parse(localStorage.getItem("shoppingCart"));
  renderCart(cart);
}
