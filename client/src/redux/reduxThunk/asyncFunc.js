import { addFileAC, getFileAC} from '../actionCreators/actionCreators'

export const fetchAddFile = (file) => {
  return (dispatch) => {
    
    fetch(process.env.REACT_APP_SERVER_URL+'/upl',{
      method: 'POST',
      body: file
  })
  .then(res => res.json())
  .then(data => dispatch(addFileAC(data)))
}}

export const fetchGetFile = (id) => {
  return (dispatch) => {
    fetch(process.env.REACT_APP_SERVER_URL+'/read', {    
      method: 'POST',
      responseType: 'blob',
      headers: { 'Content-Type' : 'Application/json' },
      body: JSON.stringify({id: id})
    })
    .then(async res => res.blob([res.data], {type: 'application/pdf'}))
    .then(data => dispatch(getFileAC(data)))
  }
}
