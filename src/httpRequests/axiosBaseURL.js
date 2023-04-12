import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === 'development'
? 'http://localhost:5000/projectmania'
: 'http://tomrossner.dev/projectmania';