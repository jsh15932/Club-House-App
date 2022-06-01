import Axios from "./axios";

export const RegUser = async (form: any) => {
    try {
      const user = await Axios.post('/api/auth/registration', form ).then((res) => res.data);
      return user;
    } catch (err: any){
      throw err.name
    }
}
  
export const CodeConfirmed = async (data: {id: string, code: string}) => {
    try {
      const confirmed = await Axios.post('/api/auth/confirmed', data ).then((res) => res.data);
      return confirmed;
    } catch (err: any) {
      throw err.name
    }
}
  
export const LoginUser = async (data: {login: string, password: string}) => {
    try {
      const user = await Axios.post('/api/auth/login', data).then(res => res.data);
      return user;
    } catch (err: any) {
      throw err.name;
    }
}
  
export const UpdateUser = async (data: {filed: string, value: string | File | undefined}) => {
    try {
      const user = await Axios.post('/api/user/update', data).then(res => res.data);
      return user
    } catch (err: any){
      throw err.name;
    }
}
  
export const AvatarUpdate = async (form: any) => {
    try {
      const user = await Axios.post('/api/user/avatar', form).then(res => res.data);
      return user;
    } catch (err: any){
      throw err.name;
    }
}
  
export const CreateRoom = async (room: { title: string; type: string }) => {
    try{
      const newRoom = await Axios.post('/api/room/create', room).then(res => res.data);
      return newRoom;
    } catch (err: any){
      throw err.name;
    }
}
  
export const DeleteRoom = async (id: string) => {
    try{
      const delRoom = await Axios.delete(`/api/room/delete/${id}`).then(res => res.data);
      return delRoom;
    } catch (err: any){
      throw err.name;
    }
}
  
export const GetAllRooms = async () => {
    try{
      const rooms = await Axios.post('/api/room/all').then(res => res.data);
      return rooms;
    } catch (err: any){
      throw err.name;
    }
}