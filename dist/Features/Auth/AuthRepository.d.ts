import { CreateNewUser, UserDTO } from "../../types/Users.type";
declare const _default: {
    register: (reqBody: CreateNewUser) => Promise<UserDTO>;
    updateToken: (userId: string, token: string) => Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        username: string;
        email: string;
        password: string;
        profileImage: string | null;
        birthday: string;
        token: string | null;
    }>;
    deleteToken: (userId: string) => Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        username: string;
        email: string;
        password: string;
        profileImage: string | null;
        birthday: string;
        token: string | null;
    }>;
};
export default _default;
