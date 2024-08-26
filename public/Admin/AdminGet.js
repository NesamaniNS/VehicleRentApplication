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
})

function BookingGets(data){

    console.log('InnerHtml',data);

    const table = document.querySelector('#Bookingtable tbody');

    if(data.length === 0){
        table.BookingGets = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml ="";

    data.forEach(function ({ Name, Email, VIN, Payment, Date}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${Name}</td>`; 
        tableHtml += `<td>${Email}</td>`;
        tableHtml += `<td>${VIN}</td>`;
        tableHtml += `<td>${Payment}</td>`;
        tableHtml += `<td>${Date}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function FeedbackGets(data){

    const table = document.querySelector('#Feedbacktable tbody');

    if(data.length === 0){
        table.BookingGets = "<tr><td class='no-data' colspan='2'>No Data</td></tr>";
        return;
    }

    let tableHtml ='';

    for(let i=0;i< data.length;i++){
        let{Username,Feedback} = data[i];

        tableHtml += "<tr>";
        tableHtml += `<td>${Username}</td>`;
        tableHtml += `<td>${Feedback}</td>`;
        tableHtml += "</tr>";
    }
    table.innerHTML = tableHtml;
}