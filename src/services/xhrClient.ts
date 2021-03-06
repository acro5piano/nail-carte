import axios from 'axios'
import { STORAGE_TOKEN } from 'sarte/stores/AuthStore'
import { API_URL } from 'sarte/config'

const http = axios.create({
  baseURL: API_URL,
  transformRequest: [
    function(data, headers) {
      headers['Authorization'] = 'Bearer ' + localStorage.getItem(STORAGE_TOKEN)
      return JSON.stringify(data)
    },
  ],
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface UploadResult {
  url: string
}

export const GET = (path: string) => http.get(`${API_URL}${path}`).then(res => res.data)
export const POST = (path: string, data: object) => http.post(`${API_URL}${path}`, data).then(res => res.data)
export const PUT = (path: string, data: object) => http.put(`${API_URL}${path}`, data).then(res => res.data)
export const UPLOAD = (path: string, data: object): Promise<UploadResult> =>
  axios.post(`${API_URL}${path}`, data).then(res => res.data)
