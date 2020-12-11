import {Role} from './Role';
import {Course} from './Course';

export class User{
  id:number;
  lastname:string;
  firstname:string;
  username:string;
  email:string
  password:string;
  role:string;
  logged:boolean;
  img:string;
}
