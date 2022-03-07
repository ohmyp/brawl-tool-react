import axios from "axios";
class Fetches{
    getBrawlers = async (cb) => {
        return await axios.get(`http://localhost:3001/brawlers`)
            .then(res => cb(res.data.list))
            .catch(err => console.log(err))
    }
    getPlayerByTag = async (playerTag, cb) => {
        return await axios.get(`http://localhost:3001/players/${playerTag}`)
            .then(res => {
                console.log(res.data);
                cb(res.data)
            })
            .catch(err => console.log(err))
    }
    getIcons = async (cb) => {
        return await axios.get(`http://localhost:3001/icons`)
            .then(res => {
                console.log(res.data);
                cb(res.data)
            })
            .catch(err => console.log(err))
    }
}
export default new Fetches