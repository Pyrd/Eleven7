import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/stock'

// PRODUCTS
export const getAll = async function () {
  const response = await axios.get(baseUrl + '/products')
  return response.data
}
export const getCategories = async function () {
  const response = await axios.get(baseUrl + '/product_category')
  return response.data
}

export const getById = async function (id) {
  const response = await axios.get(baseUrl + '/product/' + id)
  return response.data
}

export const addItem = async function (item) {
  let url = baseUrl + '/product/add'
  // if(creds.is_admin != null || creds.is_admin == 1) url = baseUrl+"/register-admin"
  axios.post(url, item)
    .then(response => {
      return { status: response.status, err: response.data }
    })
    .catch(error => {
      console.error(error)
      return { status: error.status, err: error.data }
    })
}

export const editById = async function (item) {
  let url = baseUrl + '/product/edit/'
  axios.post(url, item)
    .then(response => {
      return { status: response.status, err: null }
    })
    .catch(error => {
      console.error(error)
      return { status: error.status, err: error.data }
    })
}

export const deleteById = async function (pid) {
  let url = baseUrl + '/product/delete/' + pid
  axios.post(url)
    .then(response => {
      return { status: response.status, err: null }
    })
    .catch(error => {
      console.error(error)
      return { status: error.status, err: error.data }
    })
}
// Inventories

export const getAllInventory = async function () {
  const response = await axios.get(baseUrl + '/inventory')
  return response.data
}

export const getInventoryById = async function (id) {
  const response = await axios.get(baseUrl + '/inventory/' + id)
  return response.data
}

export const editInventoryById = async function (id, items) {
  let url = baseUrl + '/inventory/edit/' + id
  axios.post(url, items)
    .then(response => {
      return { status: response.status, err: null }
    })
    .catch(error => {
      console.error(error)
      return { status: error.status, err: error.data }
    })
}
