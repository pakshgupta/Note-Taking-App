// When user enter the notes add it to local storege
DisplayNotes();
let addnotes = document.getElementById("addBtn");
addnotes.addEventListener("click", function (e) {
  let addTitle=document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj={              // creating object for getting title and notes
    title: addTitle.value,
    text: addTxt.value
  }

  notesObj.push(myObj); //  update title and notes that user enter
  localStorage.setItem("notes", JSON.stringify(notesObj)); // update user notes to local storage
  addTitle.value =""; //clear addTitle after adding title
  addTxt.value = ""; //clear addTxt after adding text
  // console.log(notesObj);
  DisplayNotes();
});

// Create function to Display notes from local storage
function DisplayNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = []; // Create an array of notes
  } else {
    notesObj = JSON.parse(notes); // Make notes in string form array
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    //to display display notes in card format
    // this will add notes in card format and display it non screen,index+1 is used to show notes number and element is used to show the content of notes user enter
    html += `  
        <div class="notesCard my-2 mx-2 card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title"> ${element.title}</h5>  
            <p class="card-text"> ${element.text}
            </p>
            <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</button>
          </div>
        </div>`;
  });
  let noteselement = document.getElementById("notes");
  if (notesObj.length != 0) {
    // when user enter notes display it on web page
    noteselement.innerHTML = html;
  let date=document.getElementById('date')
  let todaydate=new Date();
  date.innerHTML=managedates(todaydate);
  } else {
    noteselement.innerHTML = "You have no notes yet"; // if user not have any note than display this message
  }
}

// Create function to delete notes

function deleteNotes(index) {
  let notes = localStorage.getItem("notes"); //get notes from local storage
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1); // it delete note form index to 1st position
  localStorage.setItem("notes", JSON.stringify(notesObj)); // it update local storage after deleting note
  DisplayNotes(); //  than we call display function to display current senario
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputval = search.value.toLowerCase(); // take input value which user enter in search box
  let notecards = document.getElementsByClassName("notesCard");
  Array.from(notecards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText; // get details through paragaph tag which contain information which user want
    if (cardTxt.includes(inputval)) {
      // compare input text with details user entered
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// Function to manage dates
function managedates(arg){
  let days=["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];
  let months=["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let year=arg.getFullYear();
  let month=months[arg.getMonth()];
  let day=days[arg.getDay()];
  let date=arg.getDate();
  return `${date} ${month} (${day}), ${year}`;
}