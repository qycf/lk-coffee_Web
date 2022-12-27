import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useUserStore } from '../../stores/user';
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// 接口类型和方法
interface BaseType {
    baseURL: string;
    getConfigParams(): any;
    interceptors(instance: AxiosInstance, url: string | number | undefined): any;
    request(options: AxiosRequestConfig): any;
}

interface AxiosRequestType {
    baseURL?: string;
    url?: string | undefined;
    data?: any;
    params?: any;
    method?: string;
    headers?: any;
    timeout?: number;
    value?: any
    cancelToken?: any
}

// 取消重复请求
const CancelToken = axios.CancelToken
// 用于存储每个请求的取消函数以及对应标识
let sources: any = []

// 取消函数
let removeSource = (config: any) => {
    for (let item in sources) {
        if (sources[item].umet === config.url + "&" + config.method) {
            sources[item].cancel('已取消重复请求，请勿重复请求')
            sources.splice(item, 1)
        }
    }
}

class AxiosHttpRequest implements BaseType {
    baseURL: string;
    timeout: number;
    constructor() {
        // this.baseURL = import.meta.env.VITE_APP_BASE_API
        this.baseURL = 'http://127.0.0.1:8080'
        this.timeout = 1500
    }
    // 配置参数 
    getConfigParams() {
        const config = {
            baseURL: this.baseURL,
            timeout: this.timeout,
            headers: {},
        }

        return config;
    }
    // 拦截设置
    interceptors(instance: AxiosInstance, url: string | number | undefined) {
        // 请求拦截
        instance.interceptors.request.use((config: AxiosRequestType) => {


            // 取消重复请求
            removeSource(config)
            config.cancelToken = new CancelToken(c => {
                // 将取消函数存起来
                sources.push({ umet: config.url + '&' + config.method, cancel: c })
            })
            // 添加全局的loading..
            // 请求头携带token
            let userStore = useUserStore()
            config.data = true
            config.headers['lktoken'] = userStore.token
            if (!config.headers['Content-Type']) {
                config.headers['Content-Type'] = 'application/json;charset=utf-8'
            }


            // get请求映射params参数
            if (config.method === 'get' && config.params) {
                let url = config.url + '?';
                for (const propName of Object.keys(config.params)) {
                    const value = config.params[propName];
                    var part = encodeURIComponent(propName) + "=";
                    if (value !== null && typeof (value) !== "undefined") {
                        if (typeof value === 'object') {
                            for (const key of Object.keys(value)) {
                                let params = propName + '[' + key + ']';
                                var subPart = encodeURIComponent(params) + "=";
                                url += subPart + encodeURIComponent(value[key]) + "&";
                            }
                        } else {
                            url += part + encodeURIComponent(value) + "&";
                        }
                    }
                }
                url = url.slice(0, -1);
                config.params = {};
                config.url = url;
            }

            return config
        }, (error: any) => {

            return Promise.reject(error)
        })

        // 响应拦截
        instance.interceptors.response.use((res: any) => {
            // 2xx 范围内的状态码都会触发该函数。

            // 取消重复请求
            removeSource(res.config)

            return Promise.resolve(res)

        }, (error: any) => {
            // 超出 2xx 范围的状态码都会触发该函数。
            // error(error.response.data.msg + ",请联系管理员")
            showNotify({ type: 'danger', message: error.response.data.msg });
            // return Promise.reject()
        })
    }

    /**
     * 外部调用方法
     * @param options axios请求参数
     * @returns 实例
     */
    request(options: AxiosRequestConfig) {
        const instance = axios.create();
        options = Object.assign(this.getConfigParams(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

// 实例化请求类
const http = new AxiosHttpRequest();

export default http;