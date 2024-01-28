import {  Repository } from "typeorm";
import { Admin } from "../../entities/Admin.entity";

export interface AdminRepository {
    get repos () : Repository<Admin>
}