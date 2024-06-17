import axios from '../../utils/axios';

export const getAllUsers = () => { 
    return axios.get('/get_all_users');
  };

  export const userStatusUpdate = (userId, newStatus) => {
    return axios.post('/user_status_update', {userId,newStatus});
  };

  export const userDelete = (userId) => { 
    return axios.put(`/user/${userId}/delete`);
  };