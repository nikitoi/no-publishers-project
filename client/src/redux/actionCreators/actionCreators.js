import { ADD_FILE, GET_FILE} from '../actionTypes/actionTypes'

export const addFileAC = (payload) => {
  return {
    type: ADD_FILE,
    payload
  }
}

export const getFileAC = (payload) => {
  return {
    type: GET_FILE,
    payload
  }
}
