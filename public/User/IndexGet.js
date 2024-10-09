document.addEventListener('DOMContentLoaded',function(){
    
    const discountElement = document.getElementById('DiscountElementId'); 

    if(discountElement){
        fetch('http://localhost:5000/DiscountGets')
        .then(response => response.json())
        .then(data => DiscountGets(data['data']));
    }

    const vehicleElement = document.getElementById('vehicleElementId');
    
    if(vehicleElement){
        fetch('http://localhost:5000/VehicleGets')
        .then(response => response.json())
        .then(data => VehicleGets(data['data']));
    }

    const Discount = document.getElementById('AfterDiscountId');

    if(Discount){
        const VIN = localStorage.getItem('VIN')
        if(VIN){
        fetch('http://localhost:5000/AfterDiscount?VIN='+ VIN)
        .then(response => response.json())
        .then(data => AfterDiscount(data['data']));
    } else {
        console.error('VIN not found');
    }
    }

    const BookedVehicle = document.getElementById('BookedVehicleId');
    
    if(BookedVehicle){
        fetch('http://localhost:5000/BookedVehicle')
        .then(response => response.json())
        .then(data => BookedVehicleGets(data['data']));
    }
 
})

function VehicleGets(data){
    console.log('InnerHtml',data);

    const table = document.querySelector('#Vehicle tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='4'>No vehicle found!</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ VIN, VehicleName, BookingPrice, VehicleType}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${VIN}</td>`; 
        tableHtml += `<td>${VehicleName}</td>`;
        tableHtml += `<td>${BookingPrice}</td>`;
        tableHtml += `<td>${VehicleType}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function DiscountGets(data){
    console.log('InnerHtml',data);

    const table = document.querySelector('#Discount tbody');

    if (data.length === 0) {
        window.location.href="NoDiscount.html";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ DiscountID, DiscountPercent, VIN, Status}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${DiscountID}</td>`; 
        tableHtml += `<td>${DiscountPercent}</td>`;
        tableHtml += `<td>${VIN}</td>`;
        tableHtml += `<td>${Status}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function AfterDiscount(data){
    console.log('InnerHtml',data);

    const table = document.querySelector('#AfterDiscount tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='4'>No discount vehicles found! Please note the vehicle number u want to book.</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ DiscountID, DiscountPercent, VIN, DiscountPrice}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${DiscountID}</td>`; 
        tableHtml += `<td>${DiscountPercent}</td>`;
        tableHtml += `<td>${VIN}</td>`;
        tableHtml += `<td>${DiscountPrice}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function BookedVehicleGets(data){
    console.log('InnerHtml',data);

    const table = document.querySelector('#Vehicle tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='4'>No booked vehicles found!</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ VIN, VehicleName, BookingPrice, Availability}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${VIN}</td>`; 
        tableHtml += `<td>${VehicleName}</td>`;
        tableHtml += `<td>${BookingPrice}</td>`;
        tableHtml += `<td>${Availability}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}