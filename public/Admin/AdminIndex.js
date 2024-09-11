document.addEventListener('DOMContentLoaded',function(){

   const Login = document.getElementById('loginForm');

   if(Login){
    Login.addEventListener('submit',function(event){
                  event.preventDefault();
                  AdminLogin();
    })
   }

   const Vehicle = document.getElementById('VehicleformID');

   if(Vehicle){
    Vehicle.addEventListener('submit',function(event){
        event.preventDefault();
        VehicleInsertion();
    })
   }

   const Discount = document.getElementById('DiscountformID');

   if(Discount){
    document.addEventListener('submit',function(event){
        event.preventDefault();
        VehicleDiscount();
    })
   }

})

function AdminLogin(){

    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('Error').textContent='';
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    let valid = true;
    if(username === '' && password === ''){
        document.getElementById('Error').textContent = 'Username & Password is Required';
        valid = false;
    }
    else if (username === '') {
        document.getElementById('usernameError').textContent = 'Username is required';
        valid = false;
    }else if(password === '') {
        document.getElementById('passwordError').textContent = 'Password is required';
        valid = false;
    }

  if(valid){

    fetch('http://localhost:5000/Adminlogin',{
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
            document.getElementById('Error').textContent = 'Login successful';
            window.location.href="AdminDashboard.html";
        } else {
            document.getElementById('Error').textContent = 'Invalid details';
        }
    })
    .catch(err => {
       console.error('Error:', err);
        document.getElementById('Error').textContent = 'An error occurred. Please try again.';
    })
  }
    
}

function VehicleInsertion(){

    document.getElementById('VINerror').textContent = '';
    document.getElementById('VehicleNameerror').textContent = '';
    document.getElementById('Priceerror').textContent = '';
    document.getElementById('Availabilityerror').textContent = '';
    document.getElementById('Error').textContent='';

    const VIN = document.getElementById('VIN').value;
    const VehicleName = document.getElementById('VehicleName').value;
    const Price = document.getElementById('Price').value;
    const Availability = document.getElementById('Availability').value;

    let valid = true;
    
      if(VIN === '' && VehicleName === '' && Price === '' && Availability === ''){
        document.getElementById('Error').textContent='All Fields are Required';
        valid = false;
       }else if(VIN === ''){
        document.getElementById('VINerror').textContent='VehicleNumber is Required';
        valid = false;
       }else if(VehicleName === ''){
        document.getElementById('VehicleNameerror').textContent='VehicleName is Required';
        valid = false;
       }else if(Price === ''){
        document.getElementById('Priceerror').textContent='BookingPrice is Required';
        valid = false;
       }else if(Availability === ''){
        document.getElementById('Availabilityerror').textContent='Vehicle Availability is Required';
        valid = false;
       }

       if (!valid) return false;

       fetch('http://localhost:5000/VehicleInserts', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            VIN: VIN,
            VehicleName: VehicleName,
            Price: Price,
            Availability: Availability,
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
            let alertBox = document.getElementById("customAlertBox");
            let alertMessage = document.getElementById("alertMessage");

            alertMessage.innerHTML = 'Vehicle inserted sucessfully!'
            alertBox.style.display = "block";

            const closeTag = document.querySelector(".close");

   if(closeTag){
    document.addEventListener('click',function(){
        document.getElementById("customAlertBox").style.display = "none";
        window.location.href = "AdminDashboard.html";
    })
   }
        }else{
            document.getElementById('Error').textContent = 'Enter valid details';
        }
    })

    .catch(err => {
        console.error('Error:', err);
        document.getElementById('Error').textContent = 'Registration failed. Please try again.';
    });

}

function VehicleDiscount(){

    document.getElementById('DisIDerror').textContent = '';
    document.getElementById('DisPercenterror').textContent = '';
    document.getElementById('VINerror').textContent = '';
    document.getElementById('Priceerror').textContent = '';
    document.getElementById('Error').textContent='';

    const DisID = document.getElementById('DiscountID').value;
    const DisPercent = document.getElementById('DisPercent').value;
    const VIN = document.getElementById('VIN').value;
    const Price = document.getElementById('Price').value;

    let valid = true;
    
      if(DisID === '' && DisPercent === '' && VIN === '' && Price === ''){
        document.getElementById('Error').textContent='All Fields are Required';
        valid = false;
       }else if(DisID === ''){
        document.getElementById('DisIDerror').textContent='DiscountID is Required';
        valid = false;
       }else if(DisPercent === ''){
        document.getElementById('DisPercenterror').textContent='DiscountPercent is Required';
        valid = false;
       }else if(VIN === ''){
        document.getElementById('VINerror').textContent='VehicleNumber is Required';
        valid = false;
       }else if(Price === ''){
        document.getElementById('Priceerror').textContent='BookingPrice is Required';
        valid = false;
       }

       if (!valid) return false;

       fetch('http://localhost:5000/DiscountInserts', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            DisID: DisID,
            DisPercent: DisPercent,
            VIN: VIN,
            Price: Price,
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.success){
          let alertBox = document.getElementById("customAlertBox");
          let alertMessage = document.getElementById("alertMessage");
          
          alertMessage.innerHTML = 'Discount Added Sucessfully. Thankyou!.';
          alertBox.style.display = "block";

          const closeTag = document.querySelector(".close");
          if(closeTag){
            document.addEventListener('click',function(){
                alertBox.style.display = "none";
                window.location.href = "AdminDashboard.html";
            })
          }

        }else{
            document.getElementById('Error').textContent = 'Enter valid details';
        }
    })
    .catch(err => {
        console.error('Error:', err);
        document.getElementById('Error').textContent = 'Registration failed. Please try again.';
    });
}