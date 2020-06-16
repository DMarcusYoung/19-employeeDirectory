import axios from 'axios'

export default {
    getEmployees:() => axios.get("https://randomuser.me/api/?results=100&nat=us")
}
