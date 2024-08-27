const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./Userdbservice');
const dummy = null;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.post('/registers', (request, response) => {
    console.log("inside /registers endpoint");

    const { Name, Password, Email, City, ContactNumber } = request.body; 

    const db = dbService.getDbServiceInstance(); 

    db.userRegistration(Name, Password, Email, City, ContactNumber)
    
        .then(data => 
            response.json({ data: data }))
        .catch(err => {
            console.error('Database Error:', err);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});

app.post('/userlogin',(request, response) => {
    console.log('Inside /userlogin endpoint');

    const { username, password } = request.body;

    const db = dbService.getDbServiceInstance();

    db.UserLogin(username, password)
    
    .then(result => {
        console.log('Login Result:', result);
        if (result && result.length > 0) {
            response.json({ success: true });
        } else {
            response.json({ success: false });
        }
    })
    .catch(err => {
        console.error('Error:', err);
        response.status(500).json({ success: false, message: 'An error occurred' });
    });
});

app.post('/AdminLogin',(request,response) =>{

  console.log('Inside Sucessfull');

  const {username,password} = request.body;

  const db =dbService.getDbServiceInstance();
  db.AdminLogin(username,password)

  .then(result =>{
    console.log('Login Result:', result);
      if(result && result.length>0){
          response.json({success : true});
      }else{
          response.json({success : false});
      }
  })
  .catch(err =>{
    console.error('Error:', err);
    document.getElementById('Error').textContent = 'An error occurred. Please try again.';
  });
});

app.get('/VehicleGets',(request,response) =>{

    console.log('Inside vehicle');

    const db = dbService.getDbServiceInstance();

    const result = db.GetVehicle();
    console.log('resluts:',result);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log('Error for vehicle getting',err))
});

app.get('/DiscountGets',(request,response) =>{

    console.log('Inside Discount');

    const db = dbService.getDbServiceInstance();
    
    const result = db.GetDiscount();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log('Error for vehicle getting',err))
});

app.put('/UpdateDiscount',(request,response)=>{

    console.log('Update puts');

    const{VIN} = request.body;

    console.log(VIN);
    const db = dbService.getDbServiceInstance();
    db.UpdateDiscount(VIN)

   .then(result =>{
          if(result.affectedRows >0){
               response.json({success : true})
          }else{
            response.json({success : false});
        }
   })
   .catch(err =>{
    console.error('Error:', err);
    document.getElementById('vehNumberError').textContent = 'An error occurred. Please try again.';
  });
})

app.get('/AfterDiscount',(request,response) =>{

    console.log('Inside Discount');

    const db = dbService.getDbServiceInstance();
    
    const result = db.AfterDiscount();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log('Error for vehicle getting',err))
});

app.post('/Booking', (request, response) => {
    console.log("inside /registers endpoint");

    const { UserName, Email, VIN, Payment, Date } = request.body; 

    const db = dbService.getDbServiceInstance(); 

    db.userBooking(UserName, Email, VIN, Payment, Date)
    
        .then(result => {
            console.log('Query result:', result);
            if (result.affectedRows > 0) { 
                db.UpdateVehicle(VIN);
                response.json({ success: true });
            } else {
                response.json({ success: false });
            }
        })
        .catch(err => {
            console.error('Database Error:', err);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/BookedVehicle',(request,response) =>{

    console.log('Inside vehicle');

    const db = dbService.getDbServiceInstance();

    const result = db.BookedVehicle();
    console.log('resluts:',result);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log('Error for vehicle getting',err))
});

app.post('/userFeedback',(request, response) => {
    console.log('Inside /userlogin endpoint');

    const { username, Feedback } = request.body;

    const db = dbService.getDbServiceInstance();

    db.UserFeedback(username, Feedback)
    
    .then(result => {
        console.log('Login Result:', result);
        if (result.affectedRows>0) {
            response.json({ success: true });
        } else {
            response.json({ success: false });
        }
    })
    .catch(err => {
        console.error('Error:', err);
        response.status(500).json({ success: false, message: 'An error occurred' });
    });
});

app.post('/VehicleInserts', (request, response) => {
    console.log("inside /registers endpoint");

    const { VIN, VehicleName, Price, Availability } = request.body; 

    const db = dbService.getDbServiceInstance(); 
   
    db.VehicleInsertion(VIN, VehicleName, Price, Availability)
    
        .then(data => 
            response.json({ data: data }))
        .catch(err => {
            console.error('Database Error:', err);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});

app.post('/DiscountInserts', (request, response) => {
    console.log("inside /registers endpoint");

    const { DisID, DisPercent, VIN, Price } = request.body; 

    const db = dbService.getDbServiceInstance(); 
   
    db.DiscountInsertion(DisID, DisPercent, VIN, Price)
    
        .then(data => 
            response.json({ data: data }))
        .catch(err => {
            console.error('Database Error:', err);
            response.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/BookingGets',(request,response) =>{

    console.log('Inside vehicle');

    const db = dbService.getDbServiceInstance();

    const result = db.UserBookedVehicle();
    console.log('resluts:',result);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log('Error for vehicle getting',err))
});

app.get('/FeedbackGets',(request,response) =>{

    console.log('Inside vehicle');

    const db = dbService.getDbServiceInstance();

    const result = db.VehicleFeedback();
    console.log('resluts:',result);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log('Error for vehicle getting',err))
});

app.listen(process.env.PORT,()=> console.log('APP is Running'));