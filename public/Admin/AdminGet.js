document.addEventListener('DOMContentLoaded',function(){

    const Booking = document.getElementById('BookingElementID');
     
   if(Booking){
          fetch('http://localhost:5000/BookingGets')
          .then(response => response.json())
          .then(data => BookingGets(data['data']))
   }

   const Feedback = document.getElementById('FeedbackElementId');
     
   if(Feedback){
          fetch('http://localhost:5000/FeedbackGets')
          .then(response => response.json())
          .then(data => FeedbackGets(data['data']))
   }

   const Vehicle = document.getElementById('vehicleElementId');
     
   if(Vehicle){
          fetch('http://localhost:5000/AdminVehicleGets')
          .then(response => response.json())
          .then(data => VehicleGets(data['data']))
   }
})

function BookingGets(data){

    console.log('InnerHtml',data);

    const table = document.querySelector('#Bookingtable tbody');

    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='7'>No booked vehicles found!</td></tr>";
        return;
    }

    let tableHtml ="";

    data.forEach(function ({ Name, Email, VIN, DateOfBirth, Gender, Payment, BookingDate}) {

        const formattedDateOfBirth = new Date(DateOfBirth).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedBookingDate = new Date(BookingDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

        tableHtml += "<tr>";
        tableHtml += `<td>${Name}</td>`; 
        tableHtml += `<td>${Email}</td>`;
        tableHtml += `<td>${VIN}</td>`;
        tableHtml += `<td>${formattedDateOfBirth}</td>`;
        tableHtml += `<td>${Gender}</td>`;
        tableHtml += `<td>${Payment}</td>`;
        tableHtml += `<td>${formattedBookingDate}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function FeedbackGets(data){

    const table = document.querySelector('#Feedbacktable tbody');

    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Feedbacks are found!</td></tr>";
        return;
    }

    let tableHtml ='';

    data.forEach(function({Name, Email, VehicleName, VIN, Feedback}){
        tableHtml += "<tr>";
        tableHtml += `<td>${Name}</td>`;
        tableHtml += `<td>${Email}</td>`;
        tableHtml += `<td>${VehicleName}</td>`;
        tableHtml += `<td>${VIN}</td>`;
        tableHtml += `<td><button class='view-feedback-btn' data-feedback='${Feedback}'>View Feedback</button></td>`;
        tableHtml += "</tr>";
    })

    table.innerHTML = tableHtml;

    document.querySelectorAll('.view-feedback-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const feedback =(this.getAttribute('data-feedback'));
            showModal(feedback);
        });
    });
}

function showModal(feedback) {
    const modal = document.getElementById('feedbackModal');
    const modalContent = document.getElementById('modalFeedbackContent');
    modalContent.textContent = feedback;
    modal.style.display = "block";
}

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('feedbackModal').style.display = "none";
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('feedbackModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


function VehicleGets(data){
    console.log('InnerHtml',data);

    const table = document.querySelector('#Vehicle tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No vehicle found!</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ VIN, VehicleName, BookingPrice, VehicleType, Availability}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${VIN}</td>`; 
        tableHtml += `<td>${VehicleName}</td>`;
        tableHtml += `<td>${BookingPrice}</td>`;
        tableHtml += `<td>${VehicleType}</td>`;
        tableHtml += `<td>${Availability}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
