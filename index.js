const bookFormEl = document.getElementById('bookForm');
const tbodyEl = document.querySelector('tbody');

let myLibrary = []

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
}

function bookToLibrary(book) {
  myLibrary.push(book)
}

function bookToDom(book) {
  tbodyEl.innerHTML += `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read}</td>
      <td><button class="button btn btn-secondary">Change status</button></td>
      <td><button class="deleteBtn btn btn-secondary">Delete book</button></td>
    </tr>  
  `;
}



bookForm.addEventListener("submit", (e) => {
  e.preventDefault()

console.log("Form submitted")

const newTitle = bookForm[0].value;
  const newAuthor= bookForm[1].value;
  const newPages = bookForm[2].value;
  
  let confirmation = "true";

  if (!newTitle) {
    alert("You have to fill all data");
    confirmation = "false";
  } 

  if (!newAuthor) {
    alert("You have to fill all data");
    confirmation = "false";
  }

  if (!newPages) {
    alert("You have to fill all data");
    confirmation = "false";
  }

  if (confirmation == "false") {
    console.log(myLibrary)
    return false;
  }
  else {
  
  const newBook = new Book(newAuthor, newTitle, newPages);
  bookToLibrary(newBook);
  bookToDom(newBook);
  console.log(newBook);
  console.log(myLibrary) }
  
});



/*function deleteBook {


} */