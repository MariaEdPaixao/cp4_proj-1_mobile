// funções relacionadas a chamadas externas sobre usuários

import axios from "axios"

export default async function getUsers() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data
}
