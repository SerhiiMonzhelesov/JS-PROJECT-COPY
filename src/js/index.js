import axios from 'axios';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const allBooks = document.querySelector('.all-books-area');
const screenWidth = window.screen.width;

loadTopBooks().then(data => {
  allBooks.innerHTML = renderTopBooks(data.data);
});

allBooks.addEventListener('click', handlerClickLoad);
async function handlerClickLoad(event) {
  if (event.target.nodeName !== 'BUTTON') return;
  else {
    try {
      const categoryName =
        event.target.closest('div').firstElementChild.textContent;
      const booksLoadMore = await getBooksByCategory(categoryName);
      renderBooks(booksLoadMore);
    } catch (error) {
      console.log(error);
    }
  }
}

async function loadTopBooks() {
  try {
    const data = await axios.get(
      'https://books-backend.p.goit.global/books/top-books'
    );
    return data;
  } catch {
    error => console.log(error);
  }
}

function renderTopBooks(arr) {
  console.log(arr[0].books[0]);

  let markTopBooks = '';
  let valueIteration = 0;
  if (screenWidth < 768) {
    return arr
      .map(({ books: [{ _id, title, author, book_image }], list_name }) => {
        return `<div class="home-books-field">
          <h2 class="home-category-title">${list_name}</h2>

          <ul class="home-book-list">
          <li class="home-book-item" data-id="${_id}">
              <img data-src="${book_image}"
                alt="${title}"
                width="335"
                heigth="485"
                class="lazyload home-book-photo blur-up"
                >
              <h3 class="home-book-name">${title}</h3>
              <p class="home-book-author">${author}</p>
            </li>
          </ul>
          
          <button class="btn load-more">see more</button>
        </div>`;
      })
      .join('');
  } else if (screenWidth >= 768 && screenWidth < 1440) {
    let widthImg = 218;
    let heigthImg = 316;
    return arr
      .map(({ books, list_name }) => {
        valueIteration = 3;
        let markItems = renderMarkupBook(
          books,
          valueIteration,
          widthImg,
          heigthImg
        );
        return `<div class="home-books-field">
     <h2 class="home-category-title">${list_name}</h2>
     <ul class="home-book-list">${markItems}</ul><button class="btn load-more">see more</button>
     </div>`;
      })
      .join('');
  } else {
    let widthImg = 180;
    let heigthImg = 256;
    return arr
      .map(({ books, list_name }) => {
        valueIteration = 5;
        let markItems = renderMarkupBook(
          books,
          valueIteration,
          widthImg,
          heigthImg
        );
        return `<div class="home-books-field">
     <h2 class="home-category-title">${list_name}</h2>
     <ul class="home-book-list">${markItems}</ul><button class="btn load-more">see more</button>
     </div>`;
      })
      .join('');
  }
}

function renderMarkupBook(books, valueIteration, widthImg, heigthImg) {
  let markItem = '';
  for (let i = 0; i < valueIteration; i += 1) {
    markItem += `<li class="home-book-item" data-id="${books[i]._id}">
              <img data-src="${books[i].book_image}"
                alt="${books[i].title}"
                width="${widthImg}"
                heigth="${heigthImg}"
                class="lazyload home-book-photo blur-up"
                >
              <h3 class="home-book-name">${books[i].title}</h3>
              <p class="home-book-author">${books[i].author}</p>
            </li>`;
  }
  return markItem;
}
// ===========================================================

// =====================ALINA FETCH AND RENDER=============================
async function getBooksByCategory(selectedCategory) {
  const response = await axios.get(
    `https://books-backend.p.goit.global/books/category`,
    {
      params: {
        category: selectedCategory,
      },
    }
  );
  return response;
}

function renderBooks({ data }) {
  console.log(data);
  const markBooksLoadMore = data
    .map(({ book_image, book_image_width, title, author, _id }) => {
      return ` <li data-id="${_id}"><img
    src="${book_image}"
    alt="${title}"
    width="${book_image_width}"
    class="book-photo"
    loading="lazy"
    />
    <h3 class="book-name">${title}</h3>
    <p class="book-author">${author}</p>
    </li>`;
    })
    .join();
  allBooks.innerHTML = markBooksLoadMore;
}

// const fetchUsers = async () => {
//   const baseUrl = 'https://jsonplaceholder.typicode.com';
//   const userIds = [1, 2, 3];

//   // 1. Створюємо масив промісів
//   const arrayOfPromises = userIds.map(async userId => {
//     const response = await fetch(`${baseUrl}/users/${userId}`);
//     return response.json();
//   });

//   // 2. Запускаємо усі проміси паралельно і чекаємо на їх завершення
//   const users = await Promise.all(arrayOfPromises);
//   console.log(users);
// };

// fetchUsers();
