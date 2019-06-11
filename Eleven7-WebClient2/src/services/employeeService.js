/* eslint-disable camelcase */
import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/'

export const getAll = async function () {
  const response = await axios.get(baseUrl + 'employees/')
  return response.data
}

export const getEmployee = async function () {
  var user = JSON.parse(localStorage.getItem('user'))
  let id = (user.employee_id)
  const response = await axios.get(baseUrl + 'employees/' + id)
  return response.data
}

export const getEmployeeById = async function (id) {
  const response = await axios.get(baseUrl + 'employees/' + id)
  return response.data
}

export const getEmployeesByStoreId = async function (id) {
  const response = await axios.get(baseUrl + 'employees/store/' + id)
  return response.data
}

export const getAddress = async function (id) {
  const response = await axios.get(baseUrl + 'address/' + id)
  return response.data
}

export const edit_employee = async function (user) {
  let url = baseUrl + 'employees/edit'
  axios.post(url, user)
    .then(response => {
      return { status: response.status, err: null }
    })
    .catch(error => {
      console.error(error)
      return { status: error.status, err: error.data }
    })
}

export async function search_employee (payload) {
  let url = baseUrl + 'employees/search'
  console.log(JSON.stringify(payload, null, 4))
  let response = await axios.post(url, payload)
  if (response.status === 200) {
    return { status: response.status, err: null, result: response.data }
  } else {
    return { status: response.status, err: response.data, result: null }
  }
}
