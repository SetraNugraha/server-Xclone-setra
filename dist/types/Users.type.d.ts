export interface CreateNewUser {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
    profileImage: string | null;
    birthday: string;
}
export interface UserDTO {
    id: string;
    name: string;
    username: string;
    email: string;
    profileImage: string | null;
    birthday: string;
}
export interface UserModel extends UserDTO {
    password: string;
}
export interface UserWithToken extends UserDTO {
    token: string | null;
}
