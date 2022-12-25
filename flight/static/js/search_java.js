


document.getElementsByClassName("step-wizard-item")[1].classList.toggle("current-item");




var go = document.getElementsByClassName("item");
var items = document.getElementsByClassName("element");



function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

document.getElementsByClassName("MultiCarousel-inner")[0].style.transform = "translateX(0)";

for (let i = 0; i < 15; i++) {

  go[i].addEventListener("click", function() {
      
      document.getElementsByClassName("Dep_updated")[0].value = formatDate(go[i].value);

  });


  if ( go[i].value == document.getElementsByClassName("depo")[0].value){
    if (i < 5) {
      document.getElementsByClassName("MultiCarousel-inner")[0].style.transform = "translateX(0px)";
      
    } else if (i < 10) {
      document.getElementsByClassName("MultiCarousel-inner")[0].style.transform = "translateX(-600px)";

    } else {
      document.getElementsByClassName("MultiCarousel-inner")[0].style.transform = "translateX(-1200px)";
    }
    
    go[i].classList.toggle("active")
  }

}











document.addEventListener("DOMContentLoaded", () => {

  flight_select();

});





var box_1 = document.getElementsByClassName("box_1");
var box_1_details = document.getElementsByClassName("box_1_details");

var box_2 = document.getElementsByClassName("box_2");
var box_2_details = document.getElementsByClassName("box_2_details");


var box_3 = document.getElementsByClassName("box_3");
var box_3_details = document.getElementsByClassName("box_3_details");



function Hide_Box_1() {

  div_box_1_details.style.height = null;
  div_box_1.style.height = '100' + "px";
  div_box_1.style.borderBottomLeftRadius = '8px' ;
  div_box_1.style.borderBottomRightRadius = '8px' ;
  div_box_1_details.style.border = "none";
  // div_box_1.style.border = "solid #348ac7";
  return div_box_1_details.style.height = null;
}

function Show_box_1() {
  div_box_1.style.height = '110' + "px";
  div_box_1.style.borderBottomLeftRadius = '0px' ;
  div_box_1.style.borderBottomRightRadius = '0px' ;
  div_box_1_details.style.height = '100' + "px";
  // div_box_1_details.style.border = "solid #348ac7";
  div_box_1.style.borderBottom = "none";
  return   div_box_1_details.style.height = '100' + "px";
}

function Hide_Box_2() {
  div_box_2_details.style.height = null;
  div_box_2.style.height = '100' + "px";
  div_box_2.style.borderBottomLeftRadius = '8px' ;
  div_box_2.style.borderBottomRightRadius = '8px' ;
  div_box_2_details.style.border = "none";
  // div_box_2.style.border = "solid #348ac7";
  return   div_box_2_details.style.height = null;
}

function Show_box_2() {
  div_box_2.style.height = '110' + "px";
  div_box_2.style.borderBottomLeftRadius = '0px' ;
  div_box_2.style.borderBottomRightRadius = '0px' ;
  div_box_2_details.style.height = '270' + "px";
  // div_box_2_details.style.border = "solid #348ac7";
  div_box_2.style.borderBottom = "none";
  return   div_box_2_details.style.height = '390' + "px";
}

function Hide_Box_3() {
  div_box_3_details.style.height = null;
  div_box_3.style.height = '100' + "px";
  div_box_3.style.borderBottomLeftRadius = '8px' ;
  div_box_3.style.borderBottomRightRadius = '8px' ;
  div_box_3_details.style.border = "none";
  // div_box_3.style.border = "solid #348ac7";
  return   div_box_3_details.style.height = null;
}

function Show_box_3() {
  div_box_3.style.height = '110' + "px";
  div_box_3.style.borderBottomLeftRadius = '0px' ;
  div_box_3.style.borderBottomRightRadius = '0px' ;
  div_box_3_details.style.height = '100' + "px";
  // div_box_3_details.style.border = "solid #348ac7";
  div_box_3.style.borderBottom = "none";
  return   div_box_3_details.style.height = '390' + "px";
}




for (let i = 0; i < box_1.length; i++) {

  box_1[i].addEventListener("click", function() {
  // box_2[i].classList.remove('active');
  // box_3[i].classList.remove('active');
  this.classList.toggle("active");

    div_box_1 =box_1[i]
    div_box_1_details = box_1_details[i]

    div_box_2 =box_2[i]
    div_box_2_details = box_2_details[i]

    div_box_3 =box_3[i]
    div_box_3_details = box_3_details[i]


    if (div_box_1_details.style.height) {
      Hide_Box_1();
    } else {
      Show_box_1();
      Hide_Box_2();
      Hide_Box_3();

    }

  });
}


for (let i = 0; i < box_2.length; i++) {

    box_2[i].addEventListener("click", function() {
    // box_1[i].classList.remove('active');
    // box_3[i].classList.remove('active');
    this.classList.toggle("active");

    div_box_1 =box_1[i]
    div_box_1_details = box_1_details[i]

    div_box_2 =box_2[i]
    div_box_2_details = box_2_details[i]

    div_box_3 =box_3[i]
    div_box_3_details = box_3_details[i]


    if (div_box_2_details.style.height) {
      Hide_Box_2();
    } else {
      Hide_Box_1();
      Show_box_2();
      Hide_Box_3();
    }
  });
}



for (let i = 0; i < box_3.length; i++) {

    box_3[i].addEventListener("click", function() {
    // box_1[i].classList.remove('active');
    // box_2[i].classList.remove('active');
    this.classList.toggle("active");

    div_box_1 =box_1[i]
    div_box_1_details = box_1_details[i]

    div_box_2 =box_2[i]
    div_box_2_details = box_2_details[i]

    div_box_3 =box_3[i]
    div_box_3_details = box_3_details[i]


    if (div_box_3_details.style.height) {
      Hide_Box_3();
    } else {
      Hide_Box_1();
      Hide_Box_2();
      Show_box_3();

    }
  });
}



function flight_select() {
  document.querySelectorAll(".flight-radio").forEach(radio => {
      radio.addEventListener('click', e => {
          document.querySelectorAll('#flight_id_origin').forEach(flight_id => {
            flight_id.value = e.target.value;
            // flight_id.attributes['price'].value = e.target.attributes['price_value'].value;
            document.getElementById('origin_div').innerHTML = e.target.attributes['price'].value + " $";
            console.log(document.querySelectorAll('#origin_div'));
            console.log(e.target.value);
            console.log(e.target.attributes['price'].value);
          });


      });

  });
  document.querySelectorAll(".flight-radio-round").forEach(radio => {
    radio.addEventListener('click', e => {
        document.querySelectorAll('#flight_id_destination').forEach(flight_id => {
          flight_id.value = e.target.value;
          // flight_id.attributes['price'].value = e.target.attributes['price_value'].value;
          document.getElementById('destination_div').innerHTML = e.target.attributes['price'].value + " $";

          console.log(e.target.value);
          console.log(e.target.attributes['price'].value);

        });


    });
});
  
}


// - - - - - - - - -- - - 



$(document).ready(function () {
  var itemsMainDiv = ('.MultiCarousel');
  var itemsDiv = ('.MultiCarousel-inner');
  var itemWidth = "";

  $('.leftLst, .rightLst').click(function () {
      var condition = $(this).hasClass("leftLst");
      if (condition)
          click(0, this);
      else
          click(1, this);
  });

  ResCarouselSize();




  $(window).resize(function () {
      ResCarouselSize();
  });

  //this function define the size of the items
  function ResCarouselSize() {
      var incno = 0;
      var dataItems = ("data-items");
      var itemClass = ('.item');
      var id = 0;
      var btnParentSb = '';
      var itemsSplit = '';
      var sampwidth = $(itemsMainDiv).width();
      var bodyWidth = $('body').width();
      $(itemsDiv).each(function () {
          id = id + 1;
          var itemNumbers = $(this).find(itemClass).length;
          btnParentSb = $(this).parent().attr(dataItems);
          itemsSplit = btnParentSb.split(',');
          $(this).parent().attr("id", "MultiCarousel" + id);


          if (bodyWidth >= 1200) {
              incno = itemsSplit[3];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 992) {
              incno = itemsSplit[2];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 768) {
              incno = itemsSplit[1];
              itemWidth = sampwidth / incno;
          }
          else {
              incno = itemsSplit[0];
              itemWidth = sampwidth / incno;
          }
          // $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
          $(this).css({'width': itemWidth * itemNumbers });

          $(this).find(itemClass).each(function () {
              $(this).outerWidth(itemWidth);
          });

          $(".leftLst").addClass("over");
          $(".rightLst").removeClass("over");

      });
  }


  //this function used to move the items
  function ResCarousel(e, el, s) {
      var leftBtn = ('.leftLst');
      var rightBtn = ('.rightLst');
      var translateXval = '';
      var divStyle = $(el + ' ' + itemsDiv).css('transform');
      var values = divStyle.match(/-?[\d\.]+/g);
      var xds = Math.abs(values[4]);
      if (e == 0) {
          translateXval = parseInt(xds) - parseInt(itemWidth * s);
          $(el + ' ' + rightBtn).removeClass("over");

          if (translateXval <= itemWidth / 2) {
              translateXval = 0;
              $(el + ' ' + leftBtn).addClass("over");
          }
      }
      else if (e == 1) {
          var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
          translateXval = parseInt(xds) + parseInt(itemWidth * s);
          $(el + ' ' + leftBtn).removeClass("over");

          if (translateXval >= itemsCondition - itemWidth / 2) {
              translateXval = itemsCondition;
              $(el + ' ' + rightBtn).addClass("over");
          }
      }
      $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
  }

  //It is used to get some elements from btn
  function click(ell, ee) {
      // var Parent = "#" + $(ee).parent().attr("id");
      var Parent = "#" + "MultiCarousel1";
      if (window.innerWidth < 600){
        var slide = 1;
      }
      else{
        var slide = 6;
      }
      // var slide = $(Parent).attr("data-slide");
      ResCarousel(ell, Parent, slide);
  }

});



//  - - - - - - - - -  - - -- - - - 

$(document).ready(function () {
  var itemsMainDiv = ('.Carousel');
  var itemsDiv = ('.Carousel-inner');
  var itemWidth = "";

  $('.leftL, .rightL').click(function () {
      var condition = $(this).hasClass("leftL");
      if (condition)
          click(0, this);
      else
          click(1, this)
  });

  ResCarouselSize();




  $(window).resize(function () {
      ResCarouselSize();
  });

  //this function define the size of the items
  function ResCarouselSize() {
      var incno = 0;
      var dataItems = ("data-items");
      var itemClass = ('.element');
      var id = 0;
      var btnParentSb = '';
      var itemsSplit = '';
      var sampwidth = $(itemsMainDiv).width();
      var bodyWidth = $('body').width();
      $(itemsDiv).each(function () {
          id = id + 1;
          var itemNumbers = $(this).find(itemClass).length;
          btnParentSb = $(this).parent().attr(dataItems);
          itemsSplit = btnParentSb.split(',');
          $(this).parent().attr("id", "Carousel" + id);


          if (bodyWidth >= 1200) {
              incno = itemsSplit[3];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 992) {
              incno = itemsSplit[2];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 768) {
              incno = itemsSplit[1];
              itemWidth = sampwidth / incno;
          }
          else {
              incno = itemsSplit[0];
              itemWidth = sampwidth / incno;
          }
          // $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
          document.getElementsByClassName("Carousel-inner")[0].style.transform = "translateX(0)";

          for (let i = 0; i < 15; i++) {

            items[i].addEventListener("click", function() {
                
                document.getElementsByClassName("Ret_updated")[0].value = formatDate(items[i].value);
          
            });
          
          
            if ( items[i].value == document.getElementsByClassName("Reto")[0].value){
              if (i < 5) {
                document.getElementsByClassName("Carousel-inner")[0].style.transform = "translateX(0px)";
                
              } else if (i < 10) {
                document.getElementsByClassName("Carousel-inner")[0].style.transform = "translateX(-600px)";
          
              } else {
                document.getElementsByClassName("Carousel-inner")[0].style.transform = "translateX(-1200px)";
              }
              
              items[i].classList.toggle("active")
            }
          
          }

          $(this).css({'width': itemWidth * itemNumbers });

          $(this).find(itemClass).each(function () {
              $(this).outerWidth(itemWidth);
          });

          $(".leftL").addClass("over");
          $(".rightL").removeClass("over");

      });
  }


  //this function used to move the items
  function ResCarousel(e, el, s) {
      var leftBtn = ('.leftL');
      var rightBtn = ('.rightL');
      var translateXval = '';
      var divStyle = $(el + ' ' + itemsDiv).css('transform');
      var values = divStyle.match(/-?[\d\.]+/g);
      var xds = Math.abs(values[4]);
      if (e == 0) {
          translateXval = parseInt(xds) - parseInt(itemWidth * s);
          $(el + ' ' + rightBtn).removeClass("over");

          if (translateXval <= itemWidth / 2) {
              translateXval = 0;
              $(el + ' ' + leftBtn).addClass("over");
          }
      }
      else if (e == 1) {
          var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
          translateXval = parseInt(xds) + parseInt(itemWidth * s);
          $(el + ' ' + leftBtn).removeClass("over");

          if (translateXval >= itemsCondition - itemWidth / 2) {
              translateXval = itemsCondition;
              $(el + ' ' + rightBtn).addClass("over");
          }
      }
      $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
  }

  //It is used to get some elements from btn
  function click(ell, ee) {
      // var Parent = "#" + $(ee).parent().attr("id");
      var Parent = "#" + "Carousel1";
      var slide = $(Parent).attr("data-slide");
      ResCarousel(ell, Parent, slide);
  }

});





