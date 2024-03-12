// let hide = document.querySelector('.showBtn');

// alert('hello');

// document.querySelector('.showBtn').onClick = function(){
//     // let show = document.querySelector('.side-nav')
//     document.querySelector('.side-nav').classList.add('hidden');
//     console.log(show.classList); 
//     console.log('hello'); 
// }

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
    else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


document.addEventListener("DOMContentLoaded", function () {
  // make it as accordion for smaller screens
  if (window.innerWidth < 992) {

    // close all inner dropdowns when parent is closed
    document.querySelectorAll('.navbar .dropdown').forEach(function (everydropdown) {
      everydropdown.addEventListener('hidden.bs.dropdown', function () {
        // after dropdown is hidden, then find all submenus
        this.querySelectorAll('.submenu').forEach(function (everysubmenu) {
          // hide every submenu as well
          everysubmenu.style.display = 'none';
        });
      })
    });

    document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
      element.addEventListener('click', function (e) {
        let nextEl = this.nextElementSibling;
        if (nextEl && nextEl.classList.contains('submenu')) {
          // prevent opening link if link needs to open dropdown
          e.preventDefault();
          if (nextEl.style.display == 'block') {
            nextEl.style.display = 'none';
          } else {
            nextEl.style.display = 'block';
          }

        }
      });
    })
  }
  // end if innerWidth
});




// calendar
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelector(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDayofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += '<li class="inactive">${lastDateofLastMonth-i + 1}</li>'
  }
  for (let i = 1; i<= lastDateofMonth; i++) {
    let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                 &&currYear === new Date().getFullYear() ? "active" : "";
    liTag += '<li class="${isToday}">$ {i}</li>';
  }

  for (let i = lastDateofMonth; i < 6; i++) {
    liTag += '<li class="inactive">&{i - lastDayofMonth + 1}</li>'
  }

  currentDate.innerText = "${months[currMonth]} ${currYear}";
  daysTag.innerHTML = liTag;

}
renderCalendar();

prevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if(currMonth < 0 || currMonth > 11){
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});