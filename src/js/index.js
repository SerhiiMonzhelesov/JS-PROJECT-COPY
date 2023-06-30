import axios from 'axios';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const allBooks = document.querySelector('.all-books-area');
const titlePage = document.querySelector('.home-title');

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
      makeTitleAccent(categoryName);
      allBooks.innerHTML = renderBooks(booksLoadMore);
      window.scrollTo(0, 0);
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
  let valueIteration = 0;

  if (window.screen.width < 768) {
    return arr
      .map(({ books: [{ _id, title, author, book_image }], list_name }) => {
        return `<div class="home-books-field">
          <h2 class="home-category-title">${list_name}</h2>

          <ul class="home-book-list">
          <li class="home-book-item" data-id="${_id}">
              <img data-src="${book_image}"
                alt="${title}"
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
  } else if (window.screen.width >= 768 && window.screen.width < 1440) {
    return arr
      .map(({ books, list_name }) => {
        valueIteration = 3;
        let markItems = renderMarkupBook(books, valueIteration);
        return `<div class="home-books-field">
     <h2 class="home-category-title">${list_name}</h2>
     <ul class="home-book-list">${markItems}</ul><button class="btn load-more">see more</button>
     </div>`;
      })
      .join('');
  } else {
    return arr
      .map(({ books, list_name }) => {
        valueIteration = 5;
        let markItems = renderMarkupBook(books, valueIteration);
        return `<div class="home-books-field">
     <h2 class="home-category-title">${list_name}</h2>
     <ul class="home-book-list">${markItems}</ul><button class="btn load-more">see more</button>
     </div>`;
      })
      .join('');
  }
}

function renderMarkupBook(books, valueIteration) {
  let markItem = '';
  for (let i = 0; i < valueIteration; i += 1) {
    markItem += `<li class="home-book-item" data-id="${books[i]._id}">
              <img data-src="${books[i].book_image}"
                alt="${books[i].title}"
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
  let markLoadItems = '';
  markLoadItems += data
    .map(({ _id, title, author, book_image }) => {
      return `<li class="home-book-item" data-id="${_id}">
              <img data-src="${book_image}"
                alt="${title}"
                class="lazyload home-book-photo blur-up"
                >
              <h3 class="home-book-name">${title}</h3>
              <p class="home-book-author">${author}</p>
            </li>`;
    })
    .join('');
  let markupLoadCategory = `<ul class="home-book-list">${markLoadItems}</ul>`;
  return markupLoadCategory;

  // const markBooksLoadMore = data
  //   .map(({ _id, title, author, book_image }) => {
  //     return ` <li data-id="${_id}" class="home-book-item"><img
  //   src="${book_image}"
  //   alt="${title}"

  //   class="home-book-photo"
  //   loading="lazy"
  //   />
  //   <h3 class="home-book-name">${title}</h3>
  //   <p class="home-book-author">${author}</p>
  //   </li>`;
  //   })
  //   .join();
  // return markBooksLoadMore;
}

function makeTitleAccent(categoryName) {
  const arrOfName = categoryName.split(' ');
  titlePage.textContent = arrOfName.slice(0, arrOfName.length - 1).join(' ');
  titlePage.insertAdjacentHTML(
    'beforeend',
    ` <span class="home-title-accent">${arrOfName[arrOfName.length - 1]}</span>`
  );
}
