import http from "@/utils/http";

export const getUserList = () => {
    return http.request({
        url: '/sys/user',
        method: 'GET',
    })
}


export const getUserByEamil = (email: string) => {
    return http.request({
        url: '/sys/user/' + email,
        method: 'GET',
    })
}


export const addUserApi = (data: Object) => {
    return http.request({
        url: '/sys/user/',
        method: 'PUT',
        data
    })
}

export const updateUser = (data: Object) => {
    return http.request({
        url: '/sys/user/',
        method: 'POST',
        data
    })
}


export const addNewBook = (data: Object) => {
    return http.request({
        url: '/sys/books/',
        method: 'PUT',
        data
    })
}

export const deleteBookById = (bookId: number) => {
    return http.request({
        url: '/sys/books/' + bookId,
        method: 'DELETE',
    })
}


export const updateBookByBid = (data: Object) => {
    return http.request({
        url: '/sys/books',
        method: 'POST',
        data
    })
}


export const banByUid = (data: Object) => {
    return http.request({
        url: '/sys/user/ban',
        method: 'DELETE',
        data
    })
}