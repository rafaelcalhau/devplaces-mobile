import axios from 'axios'
import { apiURL as baseURL } from '../../app.json'

export default axios.create({ baseURL })