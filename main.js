const title = document.getElementById('title');
const author = document.getElementById('author');
const submit = document.getElementById('submit');
const bookDisplay = document.getElementById('display');

document.addEventListener('DOMContentLoaded', () => {
  let ElementStr = '';
  let MyArr = [];

  const DisplayBooks = () => {
    if (localStorage.getItem('item') === null) {
      localStorage.setItem('item', JSON.stringify(MyArr));
    } else {
      const BookString = localStorage.getItem('item');
      MyArr = JSON.parse(BookString);
    }
    MyArr.map((show, items) => {
      ElementStr += `<tr>
              <td>${show[0]}</td>
              <td>${show[1]}</td>
              <td><button onclick=' BookRemove(${items})'>Remove</button><td>
              </tr>
          `;
      return ElementStr;
    });
    bookDisplay.innerHTML = ElementStr;
  };

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const Title = title.value;
    const Author = author.value;
    if (localStorage.getItem('item') === null) {
      const MyArr = [];
      MyArr.push([Title, Author]);
      localStorage.setItem('item', JSON.stringify(MyArr));
    } else {
      const BookString = localStorage.getItem('item');
      MyArr = JSON.parse(BookString);
      MyArr.push([Title, Author]);
      localStorage.setItem('item', JSON.stringify(MyArr));
    }
    title.value = '';
    author.value = '';
    ElementStr = '';
    bookDisplay.innerHTML = ElementStr;
    DisplayBooks();
  });

  BookRemove = (id) => {
    const BookString = localStorage.getItem('item');
    MyArr = JSON.parse(BookString);
    MyArr.splice(id, 1);
    localStorage.setItem('item', JSON.stringify(MyArr));
    ElementStr = '';
    bookDisplay.innerHTML = ElementStr;
    DisplayBooks();
  };

  DisplayBooks();
});
