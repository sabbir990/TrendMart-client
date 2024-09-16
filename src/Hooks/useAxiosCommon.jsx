import axios from 'axios'
import React from 'react'

const axiosCommon = axios.create({
    baseURL : 'https://trensmartserver.vercel.app'
})
export default function useAxiosCommon() {
  return axiosCommon;
}
