import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/stat'

export const getSales = async function (payload) {
  let url = baseUrl + '/sales/'
  // console.log(JSON.stringify(payload, null, 4))
  let response = await axios.post(url, payload)
  if (response.status === 200) {
    return { status: response.status, err: null, result: response.data }
  } else {
    return { status: response.status, err: response.data, result: null }
  }
}

export const getSupply = async function (payload) {
  let url = baseUrl + '/supply/'
  // console.log(JSON.stringify(payload, null, 4))
  let response = await axios.post(url, payload)
  if (response.status === 200) {
    return { status: response.status, err: null, result: response.data }
  } else {
    return { status: response.status, err: response.data, result: null }
  }
}
