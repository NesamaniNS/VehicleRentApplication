const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});


connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db connected');
});

class DbService {
    static getDbServiceInstance() {
        if (!instance) {
            instance = new DbService();
        }
        return instance;
    }

    async userRegistration(Name, Password, Email, City, ContactNumber) {
        try {

            const ExistsField = await new Promise((resolve,reject)=>{
                const query = "SELECT * FROM UserReg WHERE Name = ? OR Email = ?"
                    connection.query(query,[Name,Email],(err,result) => {
                       if(err) reject(new Error(err.message));
                       resolve(result);
                });
            });
            if(ExistsField.length>0){
                const ExistingUser = ExistsField[0];
                if(ExistingUser.Name===Name && ExistingUser.Email===Email){
                    return{ errorType:'both'}
                }else if(ExistingUser.Name===Name){
                    return{ errorType:'username'}
                }else if(ExistingUser.Email===Email){
                    return{ errorType:'Email'}
                }
            }
            const result = await new Promise((resolve, reject) => {
                const query1 = "INSERT INTO UserReg (Name, Password, Email, City, ContactNumber) VALUES (?, ?, ?, ?, ?)";
                    connection.query(query1, [Name, Password, Email, City, ContactNumber], (err, result) => {
                        if(err) reject(new Error(err.message));
                        resolve(result);
                });
            });
                            
            return { success:true, result};
        } catch (error) {
            console.error('Database Error:', error);
            throw error;
        }
    }
    

    async UserLogin(username,password){
        try {
            const usercheck = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM UserReg WHERE Name = ?';
                    connection.query(query,[username],(err,result) =>{  
                        if(err) reject(new Error(err.message));
                                resolve(result);
                });
            });
            const logincheck = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM UserReg WHERE Name = ? AND Password = ?';
                    connection.query(query,[username,password],(err,result) =>{  
                        if(err) reject(new Error(err.message));
                                resolve(result);
                });
            });
            
            if (usercheck.length === 0 && logincheck.length === 0) {
                return { errorType: 'both' };
            } else if (usercheck.length === 0) {
                return { errorType: 'username' };       
            } else if (logincheck.length === 0) {
                return { errorType: 'password' };       
            } else {
                return { success: true, user: logincheck[0] };
            }
            
        } catch (error) {
            console.log('Error Occured',error);
        }
    }

    async AdminLogin(username,password){
            try {
                const login = await new Promise((resolve, reject) => {
                    const query ='SELECT * FROM Admin WHERE Name = ? AND Password = ?';

                    connection.query(query,[username,password],(err,result) =>{
                        if(err) reject(new Error(err.message))
                            
                            resolve(result);
                    })
             })
                return login;
                
            } catch (error) {
                console.log('Error Occured',error);
            }
    }

    async GetVehicle(){
        try {
            const vehicle = await new Promise((resolve, reject) => {
                
                const query = 'SELECT * FROM Vehicle where Availability="Available"';
                connection.query(query,(err,result) =>{
                    if(err) reject(new Error(err.message));
                        resolve(result);
                })
            })
            return vehicle;
        } catch (error) {
            console.log(error)
        }
    }

    async GetDiscount(){
        try {
            const Discount = await new Promise((resolve, reject) => {

                const query = 'select DiscountID,DiscountPercent,discount.VIN,Status from discount join vehicle On discount.VIN = vehicle.VIN where vehicle.Availability="Available" AND Status = "Active"';
                connection.query(query,(err,result) => {
                    if(err) reject(new Error(err.message));
                    console.log('Query result:', result);
                        resolve(result);
                })
            })
            console.log('result:', Discount);
            return Discount;
        } catch (error) {
            console.log(error)
        }
    }

    async UpdateDiscount(VIN){
        try {
            const UpdateDiscount = await new Promise((resolve,reject)=>{

                const query ='UPDATE discount JOIN vehicle ON discount.VIN = vehicle.VIN SET discount.DiscountPrice = vehicle.BookingPrice - (vehicle.BookingPrice * discount.DiscountPercent / 100) WHERE discount.VIN = ?';
                  
                connection.query(query,VIN,(err,result)=>{
                    if(err) reject(new Error(err.message));
                    console.log('Query result:', result);
                        resolve(result);
                })
            })
            return UpdateDiscount;
        } catch (error) {
            console.log(error);
        }
    }

    async AfterDiscount(VIN){
        try {
            const Discount = await new Promise((resolve, reject) => {

                const query = 'select DiscountID,DiscountPercent,discount.VIN,DiscountPrice from discount where VIN =?';
                connection.query(query,VIN,(err,result) => {
                    if(err) reject(new Error(err.message));
                    console.log('Query result:', result);
                        resolve(result);
                })
            })
            console.log('result:', Discount);
            return Discount;
        } catch (error) {
            console.log(error)
        }
    }

    async userBooking(UserName, Email, VIN, DateOfBirth, Gender, Payment, BookingDate) {
        try {

            const result = await new Promise((resolve, reject) => {
                
                const query1 = "INSERT INTO Booking (Name, Email, VIN, DateOfBirth, Gender, Payment, BookingDate) VALUES (?, ?, ?, ?, ?, ?, ?)";
            
    
                    connection.query(query1, [UserName, Email, VIN, DateOfBirth, Gender, Payment, BookingDate], (err, result) => {
                       
                        if(err) reject(new Error(err.message));

                        resolve(result);
                })
            })
                            
            return result;
        } catch (error) {
            console.error('Database Error:', error);
            throw error;
        }
    }

    async BookedVehicle(){
        try {
            const vehicle = await new Promise((resolve, reject) => {
                
                const query = 'SELECT * FROM Vehicle where Availability="Booked"';
                connection.query(query,(err,result) =>{
                    if(err) reject(new Error(err.message));
                        resolve(result);
                })
            })
            return vehicle;
        } catch (error) {
            console.log(error)
        }
    }

    async UpdateVehicle(VIN){
        try {
            const UpdateVehicle = await new Promise((resolve,reject)=>{

                const query ='update Vehicle SET Availability="Booked" WHERE VIN=?';
                connection.query(query,VIN,(err,result)=>{
                    if(err) reject(new Error(err.message));
                    console.log('Query result:', result);
                        resolve(result);
                })
            })
            return UpdateVehicle;
        } catch (error) {
            console.log(error);
        }
    }

    async UserFeedback(UserName, Email, FeedbackType, VIN, BookingDate, Feedback){
        try {
            const login = await new Promise((resolve, reject) => {
                const query ='INSERT Into Feedback values (?, ?, ?, ?, ?, ?)';

                connection.query(query,[UserName, Email, FeedbackType, VIN, BookingDate, Feedback],(err,result) =>{
                    if(err) reject(new Error(err.message))
                        
                        resolve(result);
                })
            })
            return login;
            
        } catch (error) {
            console.log('Error Occured',error);
        }
}

async VehicleInsertion(VIN, VehicleName, Price,VehicleType, Availability) {
    try {

        const result = await new Promise((resolve, reject) => {
            
            const query1 = "INSERT INTO Vehicle (VIN, VehicleName, BookingPrice,VehicleType, Availability) VALUES (?, ?, ?,?, ?)";
        

                connection.query(query1, [VIN, VehicleName, Price,VehicleType, Availability], (err, result) => {
                   
                    if(err) reject(new Error(err.message));

                    resolve(result);
            })
        })
                        
        return result;
    } catch (error) {
        console.error('Database Error:', error);
        throw error;
    }
}

async DiscountInsertion(DisID, DisPercent, VIN, Status) {
    try {

        const result = await new Promise((resolve, reject) => {
            
            const query1 = "INSERT INTO Discount (DiscountID, DiscountPercent, VIN, Status) VALUES (?, ?, ?, ?)";
        

                connection.query(query1, [DisID, DisPercent, VIN, Status], (err, result) => {
                   
                    if(err) reject(new Error(err.message));

                    resolve(result);
            })
        })
                        
        return result;
    } catch (error) {
        console.error('Database Error:', error);
        throw error;
    }
}

async UserBookedVehicle(){
    try {
        const vehicle = await new Promise((resolve, reject) => {
            
            const query = 'SELECT * FROM Booking';
            connection.query(query,(err,result) =>{
                if(err) reject(new Error(err.message));
                    resolve(result);
            })
        })
        return vehicle;
    } catch (error) {
        console.log(error)
    }
}

async VehicleFeedback(){
    try {
        const Feedback = await new Promise((resolve, reject) => {      
            const query = 'select Booking.Name,Booking.Email,VehicleName,vehicle.VIN,Feedback from Booking join vehicle on vehicle.VIN = Booking.VIN join Feedback on vehicle.VIN = Feedback.VIN';
            connection.query(query,(err,result) =>{
                if(err) reject(new Error(err.message));
                    resolve(result);
            })
        })
        return Feedback;
    } catch (error) {
        console.log(error)
    }
}
 
async AdminGetVehicle(){
    try {
        const vehicle = await new Promise((resolve, reject) => {
            
            const query = 'SELECT * FROM Vehicle';
            connection.query(query,(err,result) =>{
                if(err) reject(new Error(err.message));
                    resolve(result);
            })
        })
        return vehicle;
    } catch (error) {
        console.log(error)
    }
}
}
module.exports = DbService;
