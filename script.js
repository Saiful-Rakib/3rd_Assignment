const bookNameInput = document.getElementById('bookName');
const authorNameInput = document.getElementById('authorName');
const addBookBtn = document.getElementById('addBook');
const bookList = document.getElementById('bookList');

addBookBtn.addEventListener('click', function () {
  const bookName = bookNameInput.value;
  const authorName = authorNameInput.value;

  if (bookName === '' || authorName === '') {
    alert('Please fill all fields');
    return;
  }

  // 1. Create row
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${bookName}</td>
    <td>${authorName}</td>
    <td><button class="delete">Delete</button></td>
  `;

  bookList.appendChild(tr);

  saveToLocalStorage(bookName, authorName);

  bookNameInput.value = '';
  authorNameInput.value = '';
});

bookList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    const row = e.target.parentElement.parentElement;
    removeFromLocalStorage(row.children[0].innerText);
    row.remove();
  }
});

function saveToLocalStorage(book, author) {
  let books = JSON.parse(localStorage.getItem('books')) || [];
  books.push({ book, author });
  localStorage.setItem('books', JSON.stringify(books));
}
document.addEventListener('DOMContentLoaded', loadBooks);

function loadBooks() {
  let books = JSON.parse(localStorage.getItem('books')) || [];

  books.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.book}</td>
      <td>${item.author}</td>
      <td><button class="delete">Delete</button></td>
    `;
    bookList.appendChild(tr);
  });
}
function removeFromLocalStorage(bookName) {
  let books = JSON.parse(localStorage.getItem('books')) || [];
  books = books.filter(item => item.book !== bookName);
  localStorage.setItem('books', JSON.stringify(books));
}
