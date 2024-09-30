document.addEventListener('DOMContentLoaded',function(){

    const registeruser = document.getElementById('registerform');
               if(registeruser){
                     registeruser.addEventListener('submit',function(event){
                        event.preventDefault();
                        Registeruser();
                     })
               }

    const login = document.getElementById('loginForm');
               if(login){
                     login.addEventListener('submit',function(event){
                        event.preventDefault();
                        UserLogin();
                    })
               }
    const username = localStorage.getItem('username');
    const welcomeuser = document.getElementById('usernameDisplay');

    if (username && welcomeuser) {
        welcomeuser.textContent = username;
    } else {
        welcomeuser.textContent = '';
    }

    const logout = document.getElementById('Logout');
               if(logout){
                logout.addEventListener('click',function(){
                    localStorage.removeItem('username');
                    window.location.href = '../index.html';
                })
               }

    const Discount = document.getElementById('DiscountForm');
               if(Discount){
                     Discount.addEventListener('submit',function(event){
                        event.preventDefault();
                        DiscountPrice();
                     })
               }           
    const Booking = document.getElementById('Bookingform');
                if(Booking){
                    const today = new Date().toISOString().split('T')[0];
                    document.getElementById('BookingDate').setAttribute('min', today);
                    
                    Booking.addEventListener('submit',function(event){
                        event.preventDefault();
                        BookingVehicle();
                    })
                }
    const Feedback = document.getElementById('Feedbackform');
                if(Feedback){
                    Feedback.addEventListener('submit',function(event){
                        event.preventDefault();
                        FeedBackVehicle();
                    })
                }             
})

function Registeruser(){
  document.getElementById('Error').textContent = '';
  document.getElementById('usernameerror').textContent='';
  document.getElementById('passworderror').textContent='';
  document.getElementById('Emailerror').textContent='';
  document.getElementById('cityerror').textContent='';
  document.getElementById('contacterror').textContent='';

  const UserName= document.getElementById('username').value;
  const Password= document.getElementById('password').value;
  const Email= document.getElementById('email').value;
  const City= document.getElementById('city').value;
  const ContactNumber= document.getElementById('contactnumber').value;

  const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const contactPattern = /^[6-9]\d{9}$/;

  let valid = true;
  
   if(UserName === ''){
    document.getElementById('usernameerror').textContent='Username is required';
    valid = false;
   }
   if(Password === ''){
    document.getElementById('passworderror').textContent='Password is required';
    valid = false;
   }else if(!passwordPattern.test(Password)){
    document.getElementById('passworderror').textContent = 'Password must be at least 8 characters, include a number, and a special character';
    valid = false;
   }
   if(Email === ''){
    document.getElementById('Emailerror').textContent='Email is required';
    valid = false;
   }
   if(City === ''){
    document.getElementById('cityerror').textContent='City is required';
    valid = false;
   }
   if(ContactNumber === ''){
    document.getElementById('contacterror').textContent='Contactnumber is required';
    valid = false;
   }else if(!contactPattern.test(ContactNumber)){
    document.getElementById('contacterror').textContent='Enter a valid 10-digit Indian phone number';
    valid = false;
   }
   if (valid) {

    fetch('http://localhost:5000/registers', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            Name: UserName,
            Password: Password,
            Email: Email,
            City: City,
            ContactNumber: ContactNumber,
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
            console.log('Success:', result);

            let alertBox = document.getElementById("customAlertBox");
            let alertMessage = document.getElementById("alertMessage");

            alertMessage.innerHTML = "Registration successfull! Please wait the page will redirect to login page.";
            alertBox.style.display = "block";

        setTimeout(() =>{
            window.location.href = 'UserLogin.html';
         },3000);
        }else{
              document.getElementById('Error').textContent = "Username or email is already exists!";
        }
    })
    .catch(err => {
        console.error('Error:', err);
        document.getElementById('usernameerror').textContent = 'Registration failed. Please try again.';
    });
   }
}

function UserLogin(){

    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('Error').textContent='';
  
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    let valid = true;
    if (username === '') {
        document.getElementById('usernameError').textContent = 'Username is required';
        valid = false;
    }
    if(password === '') {
        document.getElementById('passwordError').textContent = 'Password is required';
        valid = false;
    }

  if(valid){

    fetch('http://localhost:5000/userlogin',{
        headers:{
            'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            localStorage.setItem('username',username);
            window.location.href="UserDashboard.html";
        } else {
            document.getElementById('Error').textContent = 'Username or Password is Incorrect';
        }
    })
    .catch(err => {
       console.error('Error:', err);
        document.getElementById('Error').textContent = 'An error occurred. Please try again.';
    })
  }
    
}
 
function DiscountPrice(){

      document.getElementById('vehNumberError').textContent = '';
      
      const VIN = document.getElementById('vehicleNumber').value;

      let valid = true;

      if(VIN === ''){
        document.getElementById('vehNumberError').textContent = 'Vehicle Number is Required';
        valid = false;
      }
      
      if(valid){
        fetch('http://localhost:5000/UpdateDiscount',{
            headers:{
                'Content-Type':'application/json'
            },
            method : 'PUT',
            body :JSON.stringify({
                VIN : VIN
            })
        })
        .then(response => response.json())
        .then(result =>{
            if(result.success){
                document.getElementById('vehNumberError').textContent ='Update Sucessfull';
                window.location.href="AfterDiscount.html";
            }else {
                document.getElementById('vehNumberError').textContent = 'Please Enter Valid Vehicle Number';
            }
        })
        .catch(err => {
            console.error('Error:', err);
             document.getElementById('vehNumberError').textContent = 'An error occurred. Please try again.';
         })
      }
}

function BookingVehicle(){
    
    document.getElementById('usernameerror').textContent = '';
    document.getElementById('emailerror').textContent = '';
    document.getElementById('VINerror').textContent='';
    document.getElementById('dateerror').textContent = '';
    document.getElementById('Error').textContent='';

    const username = document.getElementById('username').value;
    const email = document.getElementById('Email').value;
    const vin = document.getElementById('VIN').value;
    const payment = document.getElementById('BookingType').value;
    const date = document.getElementById('BookingDate').value;

    let valid = true;

    if(username === '' && email === '' && vin === '' && date === '' ){
        document.getElementById('Error').textContent = 'All Fields are Required';
        return false;
    }else if(username === ''){
        document.getElementById('usernameerror').textContent = 'Username is Required';
        return false;
    }else if(email === ''){
        document.getElementById('emailerror').textContent = 'Email is Required';
        return false;
    }else if(vin === ''){
        document.getElementById('VINerror').textContent = 'Vehicle Number Required';
        return false;
    }else if(payment === ''){
        document.getElementById('Error').textContent = 'Payment Method is Required';
        return false;
    }else if(date === ''){
        document.getElementById('dateerror').textContent = 'Date is Required';
        return false;
    }
   
    if(valid){
        fetch('http://localhost:5000/Booking',{
            headers:{
                'Content-Type':'Application/json'
            },
            method: 'POST',
            body:JSON.stringify({
                UserName:username,
                Email:email,
                VIN:vin,
                Payment:payment,
                Date:date,
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.success){
                let alertBox = document.getElementById("customAlertBox");
                let alertMessage = document.getElementById("alertMessage");
    
                alertMessage.innerHTML = 'Vehicle Booked sucessfully! Email sent to Registered Email Address,Thankyou..'
                alertBox.style.display = "block";
    
                const closeTag = document.querySelector(".close");
    
       if(closeTag){
        document.addEventListener('click',function(){
            document.getElementById("customAlertBox").style.display = "none";
            window.location.href = "UserDashboard.html";

        })
       }
            }else{
                document.getElementById('Error').textContent ='Booking Failed';
            }
        })
        .catch(err => {
            console.error('Error:', err);
            document.getElementById('usernameerror').textContent = 'Registration failed. Please try again.';
        });
        return valid;
    }
}

function FeedBackVehicle(){
    document.getElementById('usernameError').textContent = '';
    document.getElementById('feedbackError').textContent = '';
    document.getElementById('Error').textContent='';
  
    const username = document.getElementById('username').value;
    const feedback = document.getElementById('feedback').value;
  
    let valid = true;
    if(username === '' && feedback === ''){
        document.getElementById('Error').textContent = 'All Fields is Required';
        valid = false;
    }
    else if (username === '') {
        document.getElementById('usernameError').textContent = 'Username is required';
        valid = false;
    }else if(feedback === '') {
        document.getElementById('feedbackError').textContent = 'FeedBack is required';
        valid = false;
    }

  if(valid){

    fetch('http://localhost:5000/userFeedback',{
        headers:{
            'Content-Type':'application/json'
        },
        method:'POST',
        body:JSON.stringify({
            username: username,
            Feedback: feedback
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            let alertBox = document.getElementById("customAlertBox");
            let alertMessage = document.getElementById("alertMessage");

            alertMessage.innerHTML = 'Feedback inserted sucessfully!'
            alertBox.style.display = "block";

            const closeTag = document.querySelector(".close");

   if(closeTag){
    document.addEventListener('click',function(){
        document.getElementById("customAlertBox").style.display = "none";
        window.location.href = "UserDashboard.html";
    })
   }
            
        } else {
            document.getElementById('Error').textContent = 'Failed Try Again';
        }
    })
    .catch(err => {
       console.error('Error:', err);
        document.getElementById('Error').textContent = 'An error occurred. Please try again.';
    })
  }
}