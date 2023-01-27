import axios from "axios";
import {Message} from "element-ui";

// 请求拦截
axios.interceptors.response.use(data => {
    if (data.status && data.status == 200 && data.data.status == 500) {
        Message.error({message: data.data.msg})
        return;
    }
    return data.status;
}, error => {
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: "服务器被吃了"})
    } else if (error.response.status == 403) {
        Message.error({message: "权限不足,请联系管理员"})
    } else if (error.response.status == 401) {
        Message.error({message: "尚未登录，请登录"})
    } else {
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: "未知错误"})
        }
    }
    return;
})

// 封装请求
// 前缀
let base = '';
export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            console.log(ret)
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}


export const postRequest = (url, params) => {
    return axios({
        method: 'POST',
        'url': `${base}${url}`,
        data: params
    })
}

export const putRequest = (url, params) => {
    return axios({
        method: 'PUT',
        'url': `${base}${url}`,
        data: params
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: 'GET',
        'url': `${base}${url}`,
        data: params
    })
}

export const delRequest = (url, params) => {
    return axios({
        method: 'delete',
        'url': `${base}${url}`,
        data: params
    })
}
