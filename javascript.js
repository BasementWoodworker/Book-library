const bookArray = [];
const main = document.querySelector("main");
const addButton = document.querySelector("#add-button");
const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const authorInput = document.querySelector("#author");
const pageInput = document.querySelector("#pages");
const readInput = document.querySelector("#read-status");
const cancelButton = document.querySelector("#cancel-button");

form.className = "hidden";
bookArray.push(new Book("The Hobbit", "J.R.R Tolkien", 295, "⨯"));
bookArray.push(new Book("Harry Potter", "J.K. Rowling", 354, "✓"));
bookArray.forEach(element => addBookToDOM(element));

function createElementWithClass(elementType, elementClass) {
  const temp = document.createElement(elementType);
  temp.className = elementClass;
  return temp;
}

function Book(name, author, pages, readStatus) {
  this["Name:"] = name;
  this["Author:"] = author;
  this["Pages:"] = pages;
  this["Read:"] = readStatus;
}

Book.prototype.changeReadStatus = function() {
  this["Read:"] === "✓" ? this["Read:"] = "⨯" : this["Read:"] = "✓";
  const readStatusElement = this.domElement.children[3].children[1];
  readStatusElement.textContent = this["Read:"];
}

Book.prototype.deleteBook = function() {
  this.domElement.remove();
  const index = bookArray.indexOf(this);
  bookArray.splice(index, 1);
}

function addBookToDOM(bookObject) {
  const book = document.createElement("div");
  book.className = "book";
  for (const property in bookObject) {
    if (!Object.hasOwn(bookObject, property)) continue;
    const container = createElementWithClass("div", "pair-container");
    book.appendChild(container);

    let temp = document.createElement("p");
    temp.textContent = property;
    container.appendChild(temp);

    temp = document.createElement("p");
    temp.textContent = bookObject[property];
    container.appendChild(temp);
  }
  const toggleReadButton = createElementWithClass("button", "toggle-read-button");
  toggleReadButton.textContent = "Toggle read status";
  book.appendChild(toggleReadButton);
  toggleReadButton.addEventListener("click", () => bookObject.changeReadStatus());

  const deleteButton = createElementWithClass("button", "delete-button");
  deleteButton.textContent = "Delete book";
  book.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => bookObject.deleteBook());

  bookObject.domElement = book;
  main.appendChild(book);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newBook = new Book(nameInput.value, authorInput.value, pageInput.value, readInput.checked ? "✓" : "⨯");
  bookArray.push(newBook);
  addBookToDOM(newBook);
  form.classList.toggle("hidden");
})
addButton.addEventListener("click", () => form.classList.toggle("hidden"));
cancelButton.addEventListener("click", () => form.classList.toggle("hidden"));