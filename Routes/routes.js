import { Router } from 'express';
import { addStudent, fetchAllStudents, fetchOneStudent } from '../Controllers/studentManager';

const studentmanagerRouter = Router();

studentmanagerRouter.post('/',addStudent);
studentmanagerRouter.get('/', fetchAllStudents);
studentmanagerRouter.get('/:id',fetchOneStudent);


export default{
    studentmanagerRouter
}