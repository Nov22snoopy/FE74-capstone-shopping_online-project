function CallApi() {
  this.fetchDataList = function () {
    return axios({
      url: `https://63df6ff78b24964ae0edc536.mockapi.io/api/product`,
      method: 'GET'
    })
  };

  this.findProduct = function (id) {
    return axios ({
      url: `https://63df6ff78b24964ae0edc536.mockapi.io/api/product/${id}`,
      method: 'GET'
    })
  }
}