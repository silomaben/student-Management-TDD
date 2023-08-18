import mssql from 'mssql'
const {  addStudent, fetchAllStudents, fetchOneStudent, deleteStudent,payFees } = require('../Controllers/studentManager');

const res = {json: jest.fn()}




describe('registering a new student',()=>{


    it('should return a message if student registration is successfull ', async ()=>{
            const req = {
                body: {
                    full_name: "peter Kiriamiti",
                    fee_balance: 2000,
                    currentClass: "year 2 Bsc Computer Science"
                }
            }

            const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                connected: true,
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: 1
                })
            })
 
            await addStudent(req,res)

            // expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalledWith({
                message: "student added successfully"
            })


            res.json.mockRestore()
            

    })

    // verify input received

    it('should verify all input fields are filled',async function(){

        const body = {
            full_name: "peter Kiriamiti",
        }

        const request = {body:body}

        await addStudent(request,res)

        expect(res.json).toHaveBeenCalledWith({
            message: "please input all student details"
        })

        res.json.mockRestore()


    })
})


describe("fetching details for a single student",()=>{

    it("should fetch details for a single student",async()=>{

        const mockedStudent =  {
            "id": "student_id",
            "full_name": "John Kiriamiti",
            "fee_balance": "1000", 
            "currentClass": "year 2 Bsc Computer Science"
          }

        const mockedStudentId = 'student_id'


        const req = {
            params: {
                id: mockedStudentId
            }
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [mockedStudent]
            })
        })

        await fetchOneStudent(req, res)

        expect(res.json).toHaveBeenCalledWith({student: [ mockedStudent ]})

        res.json.mockRestore()


    })

})






describe("fetching details for all student",()=>{

    
    it('should fetch details for a single student',async()=>{
        const res = {json: jest.fn()}

        // acts as students list
        const mockedStudents = [{
            "id": "5c21c3c3-f289-4238-85ee-b3534e52765a",
            "full_name": "John Kiriamiti",
            "fee_balance": "2000",
            "currentClass": "year 2 Bsc Computer Science"
          }]

        const req = {}

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: mockedStudents
            })
        })

        await fetchAllStudents(req,res)

        // expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({"all_students": mockedStudents})

        res.json.mockRestore()
    })


})


describe("delete student",()=>{

    it("should return a message for successful deletion of sudent records", async()=>{
        const mockedStudentId = 'new-student-id'
        const req = {
            params:{
                id: mockedStudentId
            }
        }

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })

        await deleteStudent(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: 'Student records have been deleted successfully'
        })

        res.json.mockRestore()
    })

    

})

describe("update fee balance for specified student",()=>{
    it("should return a message for successful fee balance update", async()=>{

        const mockedStudentId = '969f9f87-e948-4895-a183-21474d3ced78'

        const req = {
            params:{
                id:mockedStudentId
            }
        }
        

        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: [1]
            })
        })

        await payFees(req, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "Fees has been paid successfully. School fees balance has been updated"
        })



    })

})


