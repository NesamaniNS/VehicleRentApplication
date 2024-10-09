document.addEventListener('DOMContentLoaded',function(){

   const Login = document.getElementById('loginForm');

   if(Login){
    Login.addEventListener('submit',function(event){
                  event.preventDefault();
                  AdminLogin();
    })
   }

   const username = localStorage.getItem('username');
   const welcomeAdmin = document.getElementById('AdminNameDisplay');

   if(welcomeAdmin){
    if(username){
        welcomeAdmin.textContent = username;
    }else{
        welcomeAdmin.textContent = '';
    }
   }else {
        console.error('Element with ID "usernameDisplay" not found.'); 
    }

    const logout = document.getElementById('Logout');
               if(logout){
                logout.addEventListener('click',function(){
                    localStorage.removeItem('username');
                    window.location.href = '../index.html';
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
  
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
   
    const username = usernameInput.value;
    const password = passwordInput.value;
  
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    usernameInput.classList.remove('error-border');
    passwordInput.classList.remove('error-border');

    usernameInput.addEventListener('input', () => {
        if (usernameInput) {
            usernameInput.classList.remove('error-border');
            document.getElementById('usernameError').textContent = '';
        }
    });
    passwordInput.addEventListener('input', () => {
        if (passwordInput) {
            passwordInput.classList.remove('error-border');
            document.getElementById('passwordError').textContent = '';
        }
    });

    let valid = true;
    if (username === '') {
        usernameInput.classList.add('error-border');
        document.getElementById('usernameError').textContent = 'Please enter a username';
        valid = false;
    }else if (username.length < 3) {
        usernameInput.classList.add('error-border');
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters long.';
        valid = false;
       }
    if(password === '') {
        passwordInput.classList.add('error-border');
        document.getElementById('passwordError').textContent = 'Please enter a password';
        valid = false;
    }else if(!passwordPattern.test(password)){
        passwordInput.classList.add('error-border')
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters, include a number, and a special character';
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
            localStorage.setItem('username',result.username);
            window.location.href="AdminDashboard.html";
        } else {
            document.getElementById('Error').textContent = 'Invalid username or password';
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
    document.getElementById('VehicleTypeerror').textContent = '';
    document.getElementById('Availabilityerror').textContent = '';

    const VINInput = document.getElementById('VIN');
    const VehicleNameInput = document.getElementById('VehicleName');
    const PriceInput = document.getElementById('Price');
    const VehicleTypeInput = document.getElementById('VehicleType');
    const AvailabilityInput = document.getElementById('Availability');
     
    VINInput.addEventListener('input', () => {
        if (VINInput) {
            VINInput.classList.remove('error-border');
            document.getElementById('VINerror').textContent = '';
        }
    });
    VehicleNameInput.addEventListener('input', () => {
        if (VehicleNameInput) {
            VehicleNameInput.classList.remove('error-border');
            document.getElementById('VehicleNameerror').textContent = '';
        }
    });
    PriceInput.addEventListener('input', () => {
        if (PriceInput) {
            PriceInput.classList.remove('error-border');
            document.getElementById('Priceerror').textContent = '';
        }
    });
    VehicleTypeInput.addEventListener('input', () => {
        if (VehicleTypeInput) {
            VehicleTypeInput.classList.remove('error-border');
            document.getElementById('VehicleTypeerror').textContent = '';
        }
    });
    AvailabilityInput.addEventListener('input', () => {
        if (AvailabilityInput) {
            AvailabilityInput.classList.remove('error-border');
            document.getElementById('Availabilityerror').textContent = '';
        }
    });

    const VIN = VINInput.value;
    const VehicleName = VehicleNameInput.value;
    const Price = PriceInput.value;
    const VehicleType = VehicleTypeInput.value;
    const Availability = AvailabilityInput.value;

    VINInput.classList.remove('error-border');
    VehicleNameInput.classList.remove('error-border');
    PriceInput.classList.remove('error-border');
    VehicleTypeInput.classList.remove('error-border');
    AvailabilityInput.classList.remove('error-border');

    const indianVINPattern =  /^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$/;
    const validStateCodes = [
        'AN', 'AP', 'AR', 'AS', 'BR', 'CH', 'CT', 'DN', 'DL', 'GA',
        'GJ', 'HR', 'HP', 'JK', 'JH', 'KA', 'KL', 'MP', 'MH', 'MN',
        'ML', 'OR', 'PB', 'RJ', 'SK', 'TN', 'TS', 'UK', 'UP', 'WB',
    ];

    let valid = true;
    
       if(VIN === ''){
        VINInput.classList.add('error-border');
        document.getElementById('VINerror').textContent='Please enter the Vehicle Identification Number';
        valid = false;
       }else if(!indianVINPattern.test(VIN)){
        VINInput.classList.add('error-border');
        document.getElementById('VINerror').textContent='Invalid vehicle number (e.g: TN01AB1234)';
        valid = false;
       }else{
          const Statecode = VIN.substring(0,2)
          if(!validStateCodes.includes(Statecode)){
            VINInput.classList.add('error-border');
            document.getElementById('VINerror').textContent='Invalid state code in vehicle number';
            valid = false;
          }
       }
       if(VehicleName === ''){
        VehicleNameInput.classList.add('error-border');
        document.getElementById('VehicleNameerror').textContent='Please enter the vehicle name';
        valid = false;
       }
       if(Price === ''){
        PriceInput.classList.add('error-border');
        document.getElementById('Priceerror').textContent='Please enter the booking price';
        valid = false;
       }
       if(VehicleType === ''){
        VehicleTypeInput.classList.add('error-border');
        document.getElementById('VehicleTypeerror').textContent='Please select the vehicle type';
        valid = false;
       }
       if(Availability === ''){
        AvailabilityInput.classList.add('error-border');
        document.getElementById('Availabilityerror').textContent='Please specify the vehicles availability';
        valid = false;
       }

       if (valid){

       fetch('http://localhost:5000/VehicleInserts', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            VIN: VIN,
            VehicleName: VehicleName,
            Price: Price,
            VehicleType:VehicleType,
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
}

function VehicleDiscount(){

    document.getElementById('DisIDerror').textContent = '';
    document.getElementById('DisPercenterror').textContent = '';
    document.getElementById('VINerror').textContent = '';
    document.getElementById('Statuserror').textContent ='';
    
    const DisIDInput = document.getElementById('DiscountID');
    const DisPercentInput = document.getElementById('DisPercent');
    const VINInput = document.getElementById('VIN');
    const StatusInput = document.getElementById('Status')

    DisIDInput.addEventListener('input', () => {
        if (DisIDInput) {
            DisIDInput.classList.remove('error-border');
            document.getElementById('DisIDerror').textContent = '';
        }
    });
    DisPercentInput.addEventListener('input', () => {
        if (DisPercentInput) {
            DisPercentInput.classList.remove('error-border');
            document.getElementById('DisPercenterror').textContent = '';
        }
    });
    VINInput.addEventListener('input', () => {
        if (VINInput) {
            VINInput.classList.remove('error-border');
            document.getElementById('VINerror').textContent = '';
        }
    });
    StatusInput.addEventListener('input', () => {
        if (StatusInput) {
            StatusInput.classList.remove('error-border');
            document.getElementById('Statuserror').textContent = '';
        }
    });
    const DisID = DisIDInput.value;
    const DisPercent = DisPercentInput.value;
    const VIN = VINInput.value;
    const Status = StatusInput.value;
    
    DisIDInput.classList.remove('error-border')
    DisPercentInput.classList.remove('error-border')
    VINInput.classList.remove('error-border')
    StatusInput.classList.remove('error-border')

    let valid = true;
       
       if(DisID === ''){
        DisIDInput.classList.add('error-border')
        document.getElementById('DisIDerror').textContent='Please enter the Discount ID';
        valid = false;
       }
       if(DisPercent === ''){
        DisPercentInput.classList.add('error-border')
        document.getElementById('DisPercenterror').textContent='Please enter the discount percentage';
        valid = false;
       }
       if(VIN === ''){
        VINInput.classList.add('error-border')
        document.getElementById('VINerror').textContent='Please enter the Vehicle Identification Number';
        valid = false;
       }
       if(Status === ''){
        StatusInput.classList.add('error-border')
        document.getElementById('Statuserror').textContent='Please select the discount status';
        valid = false;
       }
    
       if (valid){

       fetch('http://localhost:5000/DiscountInserts', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            DisID: DisID,
            DisPercent: DisPercent,
            VIN: VIN,
            Status: Status,
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
}