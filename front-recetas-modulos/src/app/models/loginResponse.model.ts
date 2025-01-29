import { Usuario } from "./usuario.model";

export interface LoginResponse {
    data: {
        attributes: Usuario;
        token: string;
    }
}

export interface Login {
    email: string;
    password: string
    device_name: string;
}
