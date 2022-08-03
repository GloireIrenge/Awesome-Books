const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const submitButton = document.getElementById('submit');
const index = 10;

function loadLocalStorage() {
  if (localStorage.getItem('mybook') === null) {
    localStorage.setItem('mybook', JSON.stringify([]));
    const data = localStorage.getItem('mybook');
    const bookStorage = JSON.parse(data);
    return bookStorage;
  }
  const data = localStorage.getItem('mybook');
  const bookStorage = JSON.parse(data);
  return bookStorage;
}

let storage = loadLocalStorage();

function updateLocalStorage() {
  localStorage.setItem('mybook', JSON.stringify(storage));
}

const DisplayBook = (mybook) => {
  const { title, author } = mybook;

  const renderContainer = document.createElement('tr');
  renderContainer.innerHTML = `
        <td> " ${title} " by ${author} <td>
        <button class="bg-danger text-light border-0 d-block" type="button" onclick="BookRemove('${mybook.id}')">Delete</button></td>
  `;
  return renderContainer;
};

const DisplayBooks = () => {
  const container = document.getElementById('ctn-book');
  container.innerHTML = '';
  if (storage !== null) {
    storage.forEach((mybook) => {
      container.appendChild(DisplayBook(mybook));
    });
  }
};
class MyBooks {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  static addBook(mybook) {
    storage.push(mybook);
    updateLocalStorage();
    DisplayBooks();
  }

  static BookRemove(bookId) {
    const books = storage.filter((item) => item.id !== parseInt(bookId, index));
    storage = books;
    updateLocalStorage();
    DisplayBooks();
  }
}

DisplayBooks();

function addBook(mybook) {
  MyBooks.addBook(mybook);
}

function BookRemove(bookId) {
  MyBooks.BookRemove(bookId);
}
BookRemove();

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const id = storage.length + 1;
  const title = titleInput.value;
  const author = authorInput.value;
  const mybook = new MyBooks(id, title, author);
  titleInput.value = '';
  authorInput.value = '';
  addBook(mybook);
  DisplayBooks();
});

DisplayBooks();
