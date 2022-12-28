import http from "@/utils/http";
import axios from "axios";

export const setRandomAvatar = () => {
    return http.request({
        url: '/user/avatar/random',
        method: 'POST',
    })
}

