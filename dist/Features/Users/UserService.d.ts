import { UserDTO } from "../../types/Users.type";
declare const _default: {
    getAllUsers: () => Promise<UserDTO[]>;
    getUserById: (userId: string) => Promise<UserDTO | null>;
};
export default _default;
