import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/stores'

export const getAll = async function () {
  const response = await axios.get(baseUrl)
  return response.data
}

export const getStoreById = async function (id) {
  const response = await axios.get(baseUrl + '/' + id)
  return response.data
}

export const getSaleById = async function (id) {
  const response = await axios.get(baseUrl + '/sale/' + id)
  return response.data
}
export const getAllSales = async function () {
  const response = await axios.get(baseUrl + '/sales/all')
  return response.data
}

export const getWeekSales = async function () {
  const response = await axios.get(baseUrl + '/sales/week')
  return response.data
}

export const getDaySales = async function () {
  const response = await axios.get(baseUrl + '/sales/day/')
  return response.data
}

export const getProductSalesById = async function (id) {
  const response = await axios.get(baseUrl + '/salesproducts/' + id)
  return response.data
}

export const getAllSalesById = async function (id) {
  const response = await axios.get(baseUrl + '/sales/all/' + id)
  return response.data
}
export const getWeekSalesById = async function (id) {
  const response = await axios.get(baseUrl + '/sales/week/' + id)
  return response.data
}

export const getDaySalesById = async function (id) {
  const response = await axios.get(baseUrl + '/sales/day/' + id)
  return response.data
}

export const postSale = async function (payload) {
  let url = baseUrl + '/sales/add/'
  // console.log(JSON.stringify(payload, null, 4))
  let response = await axios.post(url, payload)
  if (response.status === 200) {
    return { status: response.status, err: null, result: response.data }
  } else {
    return { status: response.status, err: response.data, result: null }
  }
}

export const postMultipleSale = async function (payload) {
  let url = baseUrl + '/sales/add/many'
  // console.log(JSON.stringify(payload, null, 4))
  let response = await axios.post(url, payload)
  if (response.status === 200) {
    return { status: response.status, err: null, result: response.data }
  } else {
    return { status: response.status, err: response.data, result: null }
  }
}

export const postSupply = async function (payload) {
  let url = baseUrl + '/supply/add/'
  // console.log(JSON.stringify(payload, null, 4))
  let response = await axios.post(url, payload)
  if (response.status === 200) {
    return { status: response.status, err: null, result: response.data }
  } else {
    return { status: response.status, err: response.data, result: null }
  }
}

export const getSupply = async function (payload) {
  let url = baseUrl + '/supply/get/'
  // console.log(JSON.stringify(payload, null, 4))
  let response = await axios.post(url, payload)
  if (response.status === 200) {
    return { status: response.status, err: null, result: response.data }
  } else {
    return { status: response.status, err: response.data, result: null }
  }
}

export const getSupplyById = async function (id) {
  const response = await axios.get(baseUrl + '/supply/' + id)
  return response.data
}

export const getSupplyItemById = async function (id) {
  const response = await axios.get(baseUrl + '/supply/items/' + id)
  return response.data
}

export const getAllSupply = async function () {
  const response = await axios.get(baseUrl + '/supply')
  return response.data
}
