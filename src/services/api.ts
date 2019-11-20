import axios from 'axios'
import { apiURL as baseURL } from '../config.json'

export default axios.create({ baseURL })