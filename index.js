const bookForm = document.getElementById('bookForm');
const tbody = document.querySelector('tbody');
const table = document.querySelector("table");
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
  tbody.innerHTML += `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td class="reads">${book.read}</td>
      <td><button class="changeStatusBtn btn btn-secondary">Change status</button></td>
      <td><button class="deleteBtn btn btn-danger">Delete book</button></td>
    </tr>  
  `;
}

function deleteBook(arr, value) {
  var a = []
  for(var i = 0; i<arr.length; i++) {
    if(arr[i].title == value) {
      a = arr.splice(i, 1)
    }
  }
  return a;
}

function changeStatus(arr, value) {
  for(var i = 0; i<arr.length; i++) {
    if(arr[i].title == value) {
      arr[i].read == true ? arr[i].read = false : arr[i].read = true;
    }
  }
}

function clearInput(form) {
  form[0].value = '';
  form[1].value = '';
  form[2].value= '';
}

function bookCheck(title, author, arr) {
  for(var i = 0; i<arr.length; i++) {
    if(arr[i].title == title && arr[i].author == author) {
      return true;
    }
  }
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault()

console.log("Form submitted")

  const newTitle = bookForm[0].value;
  const newAuthor = bookForm[1].value;
  const newPages = bookForm[2].value;
  
  let confirmation = true;

  if (!newTitle) {
    alert("You have to fill all data");
    confirmation = false;
  } 

  if (!newAuthor) {
    alert("You have to fill all data");
    confirmation = false;
  }

  if (!newPages) {
    alert("You have to fill all data");
    confirmation = false;
  }

  if (bookCheck(newTitle, newAuthor, myLibrary) == true) {
    alert("Book with same title by same author already exists");
    confirmation = false;
  }

  if (confirmation == false) {
    console.log(myLibrary)
    return false;
      }

  else {
  
    const newBook = new Book(newTitle, newAuthor, newPages);
    bookToLibrary(newBook);
    bookToDom(newBook);
    console.log(newBook);
    console.log(myLibrary) 
    clearInput(bookForm)
  }
});



table.addEventListener("click", (e) => {
  e.preventDefault()

  const btn = e.target;
    var removeData = btn.closest("tr").firstElementChild.textContent;
    console.log(removeData)

  if (btn.classList.contains("deleteBtn")) {
      

    deleteBook(myLibrary, removeData)

    console.log(myLibrary)

    let removed = btn.closest("tr").remove();
    console.log(removed)
    console.log("Book deleted from DOM");
    console.log(btn)

  }
  else 
    if (btn.classList.contains("changeStatusBtn")) {
      console.log("Status changed");

      changeStatus(myLibrary, removeData)
      console.log(myLibrary)

      let changed = btn.parentElement.previousElementSibling;
      console.log(changed)

      changed.textContent == 'false' ? changed.innerHTML = 'true' : changed.innerHTML = 'false'
    }

});

/*function deleteBook {


} */