
import users from "./users"
import album from "./album"


const get = (config: Request) => {
    return { ...config, method: 'GET', }

}
const api = {
    users: users(config),
    album
}

export default api