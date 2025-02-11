import { CreateNewUser, UserDTO } from "../../types/Users.type";
declare const _default: {
    register: (reqBody: CreateNewUser) => Promise<UserDTO>;
    login: (reqBody: {
        email: string;
        password: string;
    }) => Promise<{
        accessToken: never;
        refreshToken: never;
    }>;
    refreshToken: (token: string) => Promise<never>;
    logout: (userId: string) => Promise<{
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
