$(document).ready(function(){

    $('.input-daterange').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        startDate: '0d'
    });
    
    });


    
    

    


document.getElementsByClassName("step-wizard-list")[0].style.display = "None"; 

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#flight-from").addEventListener("input", event => {
        flight_from(event);
    });

    document.querySelector("#flight-to").addEventListener("input", event => {
        flight_to(event);
    });

    document.querySelector("#flight-from").addEventListener("focus", event => {
        flight_from(event, true);
    });

    document.querySelector("#flight-to").addEventListener("focus", event => {
        flight_to(event, true);
    });


    document.querySelectorAll('.trip-type').forEach(type => {
    type.onclick = trip_type;
});


});



function showplaces(input) {
    let box = input.parentElement.querySelector(".places_box");
    box.style.display = 'block';
}


function hideplaces(input) {
    let box = input.parentElement.querySelector(".places_box");
    setTimeout(() => {
        box.style.display = 'none';
    }, 100);

}

function selectplace(option) {
    let input = option.parentElement.parentElement.querySelector('input[type=text]');
    input.value = option.dataset.value.toUpperCase();
    input.dataset.value = option.dataset.value;
}


function flight_from(event, focus) {
    let input = event.target;
    let list = document.querySelector('#places_from');

    showplaces(input);
    if(!focus) {
    input.dataset.value = '';
                }
    if(input.value.length > 0) {
      fetch('query/places/'+input.value)
      .then(response => response.json())
      .then(data => {
          list.innerHTML = '';
          data.forEach(element => {
              let div = document.createElement('div');
              div.setAttribute('class', 'each_places_from_list');
              div.classList.add('places__list');
              div.setAttribute('onmousedown', "selectplace(this)");
              div.setAttribute('data-value', element.code);
              div.innerText = `${element.city} (${element.country})`;
              list.append(div);
            });
      });
      }}


function flight_to(event, focus) {
    let input = event.target;
    let list = document.querySelector('#places_to');
    showplaces(input);

    if(!focus) {
    input.dataset.value = '';
                }
    if(input.value.length > 0) {
      fetch('query/places/'+input.value)
      .then(response => response.json())
      .then(data => {
          list.innerHTML = '';
          data.forEach(element => {
              let div = document.createElement('div');
              div.setAttribute('class', 'each_places_to_list');
              div.classList.add('places__list');
              div.setAttribute('onmousedown', "selectplace(this)");
              div.setAttribute('data-value', element.code);
              div.innerText = `${element.city} (${element.country})`;
              list.append(div);
            });
      });
      }}


function trip_type() {
    // console.log(document.querySelectorAll('.trip-type'));
    document.querySelectorAll('.trip-type').forEach(type => {
        if(type.checked) {
            if(type.value === "1") {

                document.querySelector('#return_date').value = '';
                document.querySelector('#return_date').disabled = true;
            }
            else if(type.value === "2") {
                document.querySelector('#return_date').disabled = false;
                
            }
        }
    })
}


$(function(){


   today = new Date().toJSON().slice(0,10)
   $('#input_date').attr('min', today);
   $('#return_date').attr('min', today);

});

function handler(e){

  maxDate = e.target.value;

  $('#return_date').attr('min', maxDate);

}


function flight_search() {


    if((document.querySelector("#Adult_id").value) < (document.querySelector("#Infant_id").value)) {
        alert("All infant passengers must be accompanied by at least one adult for reservations made online.");
        return false;
    } 

    if((document.querySelector("#flight-from").dataset.value) == (document.querySelector("#flight-to").dataset.value)) {
        alert("Departure and arrival points cannot be the same. Please change one.");
        return false;
    } 
    if(!document.querySelector("#flight-from").dataset.value) {
        alert("Please select flight origin.");
        return false;
    }
    if(!document.querySelector("#flight-to").dataset.value) {
        alert("Please select flight destination.");
        return false;
    }

    // if(  (document.querySelector("#input_date").value) == ""   ){
    //     alert("Please select departure date.");
    //     return false;
    // }

    // document.getElementsByClassName("step-wizard-item")[2].classList.toggle("current-item");


    // console.log(document.querySelector("#second_toggle").value);
    
    if(document.querySelector("#first_toggle").checked) {
        if(  (document.querySelector("#input_date").value) == ""   ){
            alert("Please select departure date.");
            return false;
        }
    }

    if(document.querySelector("#second_toggle").checked) {
        if(  (document.querySelector("#return_date").value) == ""   ){
            alert("Please select return date.");
            return false;
        }

        if ( (document.querySelector("#input_date").value) > (document.querySelector("#return_date").value)  ){
            alert("Enter the dates correctly");
            return false;

        }

    }



    

}


