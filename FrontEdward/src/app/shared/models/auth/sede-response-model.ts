import { Role } from "./role-model"

export interface SedeResponse {
    id: number;
    username: string;
    role: Role;
    name: string;
    address: string;
}