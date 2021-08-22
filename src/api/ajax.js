import axios from 'axios'
import {message} from 'antd'

axios.interceptors.response.use(success => {
    if (success.status && success.status == 200 && success.data.status == 500) {
      message.error({message: success.data.msg})
        return;
    }
    if (success.data.msg) {
      message.success({message: success.data.msg})
    }
    return success.data;
}, error => {
    if (error.response.status == 504 || error.response.status == 404) {
      message.error({message: '服务器被吃了( ╯□╰ )'})
    } else if (error.response.status == 403) {
      message.error({message: '权限不足，请联系管理员'})
    } else if (error.response.status == 401) {
      message.error({message: error.response.data.msg ? error.response.data.msg : '尚未登录，请登录'})
    } else {
        if (error.response.data.msg) {
          message.error({message: error.response.data.msg})
        } else {
          message.error({message: '未知错误!'})
        }
    }
    return;
})

const baseUrl = '';

export const postKeyValueRequest = (url, params,base=baseUrl) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const postRequest = (url, params,base=baseUrl) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}
export const putRequest = (url, params,base=baseUrl) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const getRequest = (url, params,base=baseUrl) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    })
}
export const deleteRequest = (url, params,base=baseUrl) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        params: params
    })
}
