const title = document.getElementById('title');
const author = document.getElementById('author');
const submit = document.getElementById('submit');
const bookDisplay = document.getElementById('display');

document.addEventListener('DOMContentLoaded', () => {
  let ElementStr = '';
  let bookArr = [];

  const DisplayBooks = () => {
    if (localStorage.getItem('book') === null) {
      localStorage.setItem('book', JSON.stringify(bookArr));
    } else {
      const bookArrStr = localStorage.getItem('book');
      bookArr = JSON.parse(bookArrStr);
    }
    bookArr.map((display, index) => {
      ElementStr += `<tr>
              <td>${display[0]}</td>
              <td>${display[1]}</td>
              <td><button onclick='remove(${index})'>Remove</button><td>
              </tr>
          `;
      return ElementStr;
    });
    bookDisplay.innerHTML = ElementStr;
  };

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const bookTitle = title.value;
    const B_Author = author.value;
    if (localStorage.getItem('book') === null) {
      const bookArr = [];
      bookArr.push([bookTitle, B_Author]);
      localStorage.setItem('book', JSON.stringify(bookArr));
    } else {
      const bookArrStr = localStorage.getItem('book');
      bookArr = JSON.parse(bookArrStr);
      bookArr.push([bookTitle, B_Author]);
      localStorage.setItem('book', JSON.stringify(bookArr));
    }
    title.value = '';
    author.value = '';
    ElementStr = '';
    bookDisplay.innerHTML = ElementStr;
    DisplayBooks();
  });

  remove = (id) => {
    const bookArrStr = localStorage.getItem('book');
    bookArr = JSON.parse(bookArrStr);
    bookArr.splice(id, 1);
    localStorage.setItem('book', JSON.stringify(bookArr));
    ElementStr = '';
    bookDisplay.innerHTML = ElementStr;
    DisplayBooks();
  };

  DisplayBooks();
});
