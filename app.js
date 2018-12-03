///////////////////////
// Book constructor
// creating actual book object
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

///////////////////////
// UI constructor
// a set of prototype methods to do things like 
// add book to the list, delete the book, show the alert message
// things that have to do with the UI
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
  // if (target.className.indexOf('delete') !== '-1') {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

//Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Show error
UI.prototype.showAlert = function(msg, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(msg));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert Alert
  container.insertBefore(div, form);

  // alert.textContent = msg;
  // document.getElementById('book-form').insertAdjacentElement('beforebegin', div);

  // Dissapear after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
    // div.remove();
  }, 3000);
}

///////////////////////
// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book (title, author, isbn);
  
  // Instantiate UI object
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn ==='') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');

  } else {
    // Add book to list
    ui.addBookToList(book);
    // Show success
    ui.showAlert('Book Added!', 'success');
    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
})

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  // Instantiate UI object
  const ui = new UI();
  // Delete book
  ui.deleteBook(e.target);
  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
})