const bookForm = document.getElementById('bookForm');
const tbody = document.querySelector('tbody');
const table = document.querySelector('table');

let myLibrary = [];

if (localStorage.getItem('myLibrary') !== null) {
  myLibrary = JSON.parse(window.localStorage.getItem('myLibrary'));
}


function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
}

function bookToLibrary(book) {
  myLibrary.push(book);
}

function libraryToStorage() {
  window.localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
function booksToDom() {
myLibrary.forEach(book => bookToDom(book));
}

function bookToDom(book) {
  tbody.innerHTML += `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td class='reads'>${book.read}</td>
      <td><button class="changeStatusBtn btn btn-secondary">Change status</button></td>
      <td><button class="deleteBtn btn btn-danger">Delete book</button></td>
    </tr>
  `;
}

function deleteBook(arr, value) {
  let a = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].title === value) {
      a = arr.splice(i, 1);
    }
  }
  return a;
}

function changeStatus(arr, value) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].title === value) {
      // eslint-disable-next-line
      arr[i].read === true ? arr[i].read = false : arr[i].read = true;
    }
  }
}

function clearInput(form) {
  form[0].value = '';
  form[1].value = '';
  form[2].value = '';
}

// eslint-disable-next-line
function bookCheck(title, author, arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].title === title && arr[i].author === author) {
      return true;
    }
  }
}
document.addEventListener('DOMContentLoaded', booksToDom)

// eslint-disable-next-line
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTitle = bookForm[0].value;
  const newAuthor = bookForm[1].value;
  const newPages = bookForm[2].value;

  let confirmation = true;

  if (!newTitle || !newAuthor || !newPages) {
    alert('You have to fill all data');
    confirmation = false;
  }

  if (bookCheck(newTitle, newAuthor, myLibrary)) {
    alert('Book with same title by same author already exists');
    confirmation = false;
  }

  if (confirmation === false) {
    return false;
  }

  const newBook = new Book(newTitle, newAuthor, newPages);
  bookToLibrary(newBook);
  bookToDom(newBook);
  libraryToStorage()
  clearInput(bookForm);
});

table.addEventListener('click', (e) => {
  e.preventDefault();

  const btn = e.target;
  const removeData = btn.closest('tr').firstElementChild.textContent;

  if (btn.classList.contains('deleteBtn')) {
    deleteBook(myLibrary, removeData);
    btn.closest('tr').remove();
    libraryToStorage()
  } else
  if (btn.classList.contains('changeStatusBtn')) {
    changeStatus(myLibrary, removeData);
    const changed = btn.parentElement.previousElementSibling;
    // eslint-disable-next-line
      changed.textContent === 'false' ? changed.innerHTML = 'true' : changed.innerHTML = 'false';
      libraryToStorage()
    }
});
