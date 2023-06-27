import axios from 'axios';

const allBooks = document.querySelector('.all-books-area');

async function loadTopBooks() {
  try {
    const data = await axios.get(
      'https://books-backend.p.goit.global/books/top-books'
    );
    renderTopBooks(data.data);
  } catch {
    error => console.log(error);
  }
}

loadTopBooks();

function renderTopBooks(arr) {
  if (document.documentElement.clientWidth < 768) {
    let markTopBooks = arr
      .map(({ books: [{ _id, title, author, book_image }], list_name }) => {
        return `<div class="books-field">
          <h2 class="category-title">${list_name}</h2>

          <ul class="book-list">
          <li class="book-item" data-id="${_id}">
              <img src="${book_image}"
                alt="${title}"
                width="335"
                class="book-photo"
                loading="lazy">
              <h3 class="book-name">${title}</h3>
              <p class="book-author">${author}</p>
            </li>
          </ul>
          
          <button class="btn load-more">see more</button>
        </div>`;
      })
      .join('');
    allBooks.innerHTML = markTopBooks;
  }

  if (document.documentElement.clientWidth >= 768) {
    let markupTopBooks = arr
      .map(({ books, list_name }) => {
        let markItem = renderMarkupBook(books);
        return `<div class="books-field">
     <h2 class="category-title">${list_name}</h2>
     <ul class="book-list">${markItem}</ul><button class="btn load-more">see more</button>
     </div>`;
      })
      .join('');
    allBooks.innerHTML = markupTopBooks;
  }
}

function renderMarkupBook(books) {
  let markItem = '';
  for (let i = 0; i < 3; i += 1) {
    markItem += `<li class="book-item" data-id="${books[i]._id}">
              <img src="${books[i].book_image}"
                alt="${books[i].title}"
                width="218"
                heigth="316"
                class="book-photo"
                loading="lazy">
              <h3 class="book-name">${books[i].title}</h3>
              <p class="book-author">${books[i].author}</p>
            </li>`;
  }
  return markItem;
}

const fetchUsers = async () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const userIds = [1, 2, 3];

  // 1. Створюємо масив промісів
  const arrayOfPromises = userIds.map(async userId => {
    const response = await fetch(`${baseUrl}/users/${userId}`);
    return response.json();
  });

  // 2. Запускаємо усі проміси паралельно і чекаємо на їх завершення
  const users = await Promise.all(arrayOfPromises);
  console.log(users);
};

fetchUsers();
// btnLoadMore.addEventListener('click', handlerClickLoad);
// function handlerClickLoad(event) {
//   // const div = event.target.closest('div');
//   console.log(event.currentTarget);
// }
