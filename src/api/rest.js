import axios from "axios";

const urlStart = 'https://5f591fbc8040620016ab8e0b.mockapi.io/api/resource1';

export default function(options){
  let defaults = {
    url: '',
    method: 'GET',
    data: null,
    responseHandler: null
  }
  
  let preparedOptions = {...defaults, ...options};
  
  let {url, method, data, responseHandler} = preparedOptions;
  
  let handleResponse = response => {
    return typeof(responseHandler) === 'function' ? responseHandler(response) : response;
  };
  
  let catchError = error => {
    
    console.log(error);
    
  };
  
  method = method.toLowerCase();
  
  if(!url)
    throw new Error(`Url is required!`);
  
  if(!axios[method])
    throw new Error(`Method ${method} is not allowed!`);
  
  switch(method){
    case 'post':
      return axios[method](urlStart+url, data).then(handleResponse).catch(catchError);
    case 'put':
      return axios[method](urlStart+url, data).then(handleResponse).catch(catchError);
    default:
      return axios[method](urlStart+url).then(handleResponse).catch(catchError);
  }
}