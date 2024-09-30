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

            const result = await new Promise((resolve, reject) => {
                
                const query1 = "INSERT INTO UserReg (Name, Password, Email, City, ContactNumber) VALUES (?, ?, ?, ?, ?)";
            
                    connection.query(query1, [Name, Password, Email, City, ContactNumber], (err, result) => {
                       
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
    

    async UserLogin(username,password){
        try {
            const login = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM UserReg WHERE Name = ? AND Password = ?';

                connection.query(query,[username,password],(err,result) =>{
                
                    if(err) reject(new Error(err.message));

                        resolve(result);
        
                })
            })
            return login;
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

                const query = 'SELECT DiscountID,DiscountPercent,vehicle.VIN,vehicle.BookingPrice From Discount Left join vehicle ON Discount.VIN = vehicle.VIN where Availability = "Available"';
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

                const query ='update discount SET DiscountPrice=BookingPrice-(BookingPrice*DiscountPercent/100) WHERE VIN=?';
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

    async AfterDiscount(){
        try {
            const Discount = await new Promise((resolve, reject) => {

                const query = 'SELECT DiscountID,DiscountPercent,vehicle.VIN,DiscountPrice From Discount Left join vehicle ON Discount.VIN = vehicle.VIN where Availability = "Available"';
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

    async userBooking(UserName, Email, VIN, Payment, Date) {
        try {

            const result = await new Promise((resolve, reject) => {
                
                const query1 = "INSERT INTO Booking (Name, Email, VIN, Payment, Date) VALUES (?, ?, ?, ?, ?)";
            
    
                    connection.query(query1, [UserName, Email, VIN, Payment, Date], (err, result) => {
                       
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
                
                const query = 'SELECT * FROM Vehicle where Availability="UnAvailable"';
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

                const query ='update Vehicle SET Availability="UnAvailable" WHERE VIN=?';
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

    async UserFeedback(username,Feedback){
        try {
            const login = await new Promise((resolve, reject) => {
                const query ='INSERT Into Feedback values (?,?)';

                connection.query(query,[username,Feedback],(err,result) =>{
                    if(err) reject(new Error(err.message))
                        
                        resolve(result);
                })
            })
            return login;
            
        } catch (error) {
            console.log('Error Occured',error);
        }
}

async VehicleInsertion(VIN, VehicleName, Price, Availability) {
    try {

        const result = await new Promise((resolve, reject) => {
            
            const query1 = "INSERT INTO Vehicle (VIN, VehicleName, BookingPrice, Availability) VALUES (?, ?, ?, ?)";
        

                connection.query(query1, [VIN, VehicleName, Price, Availability], (err, result) => {
                   
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

async DiscountInsertion(DisID, DisPercent, VIN, Price) {
    try {

        const result = await new Promise((resolve, reject) => {
            
            const query1 = "INSERT INTO Discount (DiscountID, DiscountPercent, VIN, BookingPrice) VALUES (?, ?, ?, ?)";
        

                connection.query(query1, [DisID, DisPercent, VIN, Price], (err, result) => {
                   
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
            const query = 'SELECT * FROM Feedback';
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

}


module.exports = DbService;
