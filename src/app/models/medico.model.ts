import { _Hospital } from '../interfaces/hospital';
import { _Usuario } from '../interfaces/usuario';


export class Medico {
    public _id: string;
    public nombre?: string;
    public img?: string;
    public usuario?: _Usuario;
    public hospital?: _Hospital;
}