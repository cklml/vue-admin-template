import request from '@/utils/request'
import axios from 'axios'
import qs from 'qs'
export function login(data) {
  const data1 = {
    'grant_type': 'password',
    'type': 'mysql',
    'client_id': 'webapp',
    'client_secret': 'webapp',
    username: data.username,
    password: data.password
  }
  console.log(data1)
  // return request({
  //   baseURL: 'http://106.3.44.153:8207',
  //   url: 'connect/token',
  //   method: 'post',
  //   data1
  // })
  return axios({
    url: 'http://106.3.44.150:9002/gatewy-server/oauth-server/oauth/token',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: qs.stringify(data1)
  })
}

export function getInfo(token) {
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  return axios.get(
    'http://106.3.44.150:9002/gatewy-server/system-server/user/selectUser/zhgd',
    {
      headers: {
        Authorization: 'bearer ' + token
      }
    }
  )
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
