import http from "@/utils/http";

export const setRandomAvatar = () => {
    return http.request({
        url: '/user/avatar/random',
        method: 'POST',
    })
}

export const setAvatar = (file: any) => {
    let params = new FormData()
    params.append('file', file)
    return http.request({
        url: '/user/avatar',
        method: 'POST',
        params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}