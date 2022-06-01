import axios from 'axios';
import { config } from '../config';
import { IRoom } from '../dto/room.dto';
import { IUser } from '../dto/user.dto';

const ServerSiderRequest = (token: string | undefined) => {
    const Axios = axios.create({
        baseURL: config.api,
        headers: {['Authorization']: `Bearer ${token}`}
    });

    return {
        async AllRooms(): Promise<Error | IRoom[]> {
            try {
                const rooms = await Axios.post('/api/room/all').then((res) => res.data);
                return rooms;
            } catch (err: any) {
                return [] as IRoom[];
            }
        },

        async OneRoom(id: string | string[]): Promise<IRoom> {
            try {
                const room = await Axios.post(`/api/room/one/${id}`).then(res => res.data);
                return room;
            } catch (err: any) {
                return {} as IRoom;
            }
        },

        async GetProfile(): Promise<IUser> {
            try {
                const user = await Axios.post('/api/user/own').then((res) => res.data);
                return user;
            } catch (err: any) {
                return {} as IUser;
            }
        },
    };
}

export default ServerSiderRequest;