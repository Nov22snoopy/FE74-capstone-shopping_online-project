var callApi = new CallApi();
var validation = new Validation();
function getEle(id) {
  return document.getElementById(id);
}
var hinhAnhFromServer = "";
getListProduct();
function getListProduct() {
  callApi
    .fetchListData()
    .then(function (result) {
      renderData(result.data);
      console.log(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function renderData(data) {
  var content = "";
  data.forEach(function (product, i) {
    content += `
            <tr>
             <td>${i + 1}</td>
             <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.screen}</td>
              <td>${product.backCamera}</td>
              <td>${product.frontCamera}</td>
            <td>
            <img src="./../../img/${product.img}" alt="" class="w-50">

            </td>
            <td>${product.type}</td>
            <td>${product.desc}</td>
            <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEdit(${
                product.id
                })">Edit</button>

            <button class="btn btn-danger" onclick="handleDelete('${
                product.id
                }')">Delete</button>
            </td>
            </tr>
            `;
  });
  getEle("tblDanhSachSP").innerHTML = content;
}
function handleDelete(id) {
  console.log(id);
  callApi
    .deleteProduct(id)
    .then(function (result) {
      getListProduct();
    })
    .catch(function (result) {
      console.log(result);
    });
}
getEle("btnThemSP").addEventListener("click", function () {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add";
  var btnAdd = `<button class= "btn btn-success" onclick="handleAdd()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});
function handleEdit(id) {
  // update title
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit";

  var btnUpdate = `<button class="btn btn-success" onclick="handleUpdate(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  callApi
    .getProductById(id)
    .then(function (result) {
      console.log(result.data);
      //    dom toi cac the input show value
      getEle("name").value = result.data.name;
      getEle("price").value = result.data.price;
      getEle("screen").value = result.data.screen;
      getEle("backCamera").value = result.data.backCamera;
      getEle("frontCamera").value = result.data.frontCamera;
      getEle("desc").value = result.data.desc;
      getEle("type").value = result.data.type;

      // cap nhat hinh anh
    })
    .catch(function (error) {
      console.log(error);
    });
}
// update product
function handleUpdate(id) {
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var desc = getEle("desc").value;
  var type = getEle("type").value;
  if (getEle("img").files.length > 0) {
    img = getEle("img").files[0].name;
  }
  if (!img) {
    img = hinhAnhFromServer;
  }
  var product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  callApi
    .updateProduct(product)
    .then(function (result) {
      console.log(result.data);
      getListProduct();
      document.getElementsByClassName("close")[0].click();
      hinhAnhFromServer = "";
    })
    .catch(function (error) {
      console.log(error);
    });
}
// add product
function handleAdd() {
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var desc = getEle("desc").value;
  var type = getEle("type").value;
  var img ="";
  if (getEle("img").files.length > 0) {
    img = getEle("img").files[0].name;
  }

  //Validation
  var isValid = true;
  var validation = new Validation();
  isValid &= validation.kiemTraRong(name, "tbName", "Please add name of product") 
  isValid &= validation.kiemTraRong(price, "tbPrice", "Please add price of product")
  isValid &= validation.kiemTraRong(screen, "tbScreen", "Please add screen of product")
  isValid &= validation.kiemTraRong(backCamera, "tbBackCamera", "Please add backCamera of product")
  isValid &= validation.kiemTraRong(frontCamera, "tbFrontCamara", "Please add frontCamera of product")
  isValid &= validation.kiemTraRong(desc, "tbDesc", "Please add desc of product")
  isValid &= validation.kiemTraRong(type, "tbType", "Please add type of product")
  
  if (!isValid) {return null}
  else {
    var product = new Product(
        "",
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
      );
      callApi
        .addProduct(product)
        .then(function (result) {
          console.log(result.data);
          getListProduct();
          document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  
}
// Lay thong tin
function layThongTin() {
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var desc = getEle("desc").value;
  var type = getEle("type").value;

  // validation

}
