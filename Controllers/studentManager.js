const {v4} = require('uuid');
const mssql = require ('mssql');
const { sqlConfig } = require('../Config/config');



const addStudent = async (req,res)=>{
    try {
        const id = v4();
        const {full_name, fee_balance, currentClass } = req.body

        if(!full_name || !fee_balance || !currentClass ){
            return res.json({ message: "please input all student details" })
        }

        const pool = await mssql.connect(sqlConfig)

        
        if(pool.connected){
           const result =  await pool.request()
            .input('id',mssql.VarChar, id)
            .input('full_name', mssql.VarChar, full_name)
            .input('fee_balance', mssql.Int, fee_balance)
            .input('currentClass', mssql.VarChar, currentClass)
            .execute('addNewStudent')
            
            if(result.rowsAffected==1){
                console.log('connected jhgijkg');
                return res.json({
                    message: "student added successfully"
                })
            }else{
                return res.json({message: "student registration failed"})
            }

            

        }

    } catch (error) {
        return res.json({Error:error.message})
    }
}




const fetchAllStudents = async (req,res)=>{
    try {

        const pool = await (mssql.connect(sqlConfig))

        const students = (await pool.request().execute('fetchAllStudents')).recordset
        res.json({all_students: students})
    } catch (error) {
        return res.json({error})
    }
}


const fetchOneStudent = async(req,res)=>{
    try {
        const id = req.params.id;

        const pool = await mssql.connect(sqlConfig)

        const student = (await pool.request().input('id', id).execute('fetchOneStudent')).recordset

       
        res.json({
            student
        })
    } catch (error) {
        return res.json({error})
    }
}


const deleteStudent = async(req,res)=>{
    try {
        const id = req.params.id;
        
        const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('id', id)
        .execute('deleteStudent')
      
        if(result.rowsAffected == 1){
            res.json({
                    message: 'Student records have been deleted successfully'
            })
        }else{
            res.json({
                message: 'Student records deletion failed'
        })
        }


    } catch (error) {
        return res.json({Error:error});
    }
}

const payFees = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}


module.exports = {
    addStudent,
    fetchAllStudents,
    fetchOneStudent,
    deleteStudent,
    payFees
}