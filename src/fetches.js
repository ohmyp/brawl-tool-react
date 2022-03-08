import axios from "axios";
class Fetches{
    getBrawlers = async () => {
        return axios.get(`http://localhost:3001/brawlers`)
            .then(res => res.data.list)
            .catch(err => console.log(err))
    }
    getBrawlersCount = async () => {
        return axios.get(`http://localhost:3001/brawlers/count`)
            .then(res => res.data.length)
            .catch(err => console.log(err))
    }
    getPlayerByTag = async (playerTag) => {
        return axios.get(`http://localhost:3001/players/${playerTag}`)
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err))
    }
    getClubByTag = async (clubTag) => {
        if (clubTag)
        return axios.get(`http://localhost:3001/clubs/${clubTag.slice(1)}`)
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err))
    }
    getIcons = async () => {
        return axios.get(`http://localhost:3001/icons`)
            .then(res => res.data)
            .catch(err => console.log(err))
    }
}
export default new Fetches