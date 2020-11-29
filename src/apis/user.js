import $ from '../libs/util';
function getUserInfo() {
    return $.ajax.get('/');
  }
  
  export default {
    getUserInfo,
  };