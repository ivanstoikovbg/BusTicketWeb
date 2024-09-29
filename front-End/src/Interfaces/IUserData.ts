export interface RegisterUserData {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

export interface LoginUserData {
    firstName: string;
    password: string;
}

export interface AuthenticationResponse {
    _id: string;
    username: string;
    email: string;
    accessToken: string;
}
