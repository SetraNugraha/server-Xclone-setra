import { UserDTO, UserModel, UserWithToken } from "../../types/Users.type";
declare const _default: {
    getAllUsers: () => Promise<UserDTO[]>;
    getUserById: (userId: string) => Promise<UserDTO | null>;
    getUserByEmail: (email: string) => Promise<UserModel | null>;
    getUserByToken: (token: string) => Promise<UserWithToken | null>;
};
export default _default;
