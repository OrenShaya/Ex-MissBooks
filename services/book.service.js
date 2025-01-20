import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOKS_KEY = 'booksDB'
_createBooks()

export const bookService = {
  query,
  get,
  save,
  remove,
  getDefaultFilter,
  getEmptyBook,
}

function query(filterBy) {
  return storageService.query(BOOKS_KEY)
    .then((books) => {
      if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        books = books.filter((b) => regExp.test(b.title))
      }
      if (filterBy.price) {
        books = books.filter((b) => b.listPrice.amount <= filterBy.price)
      }
      return books
    })
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOKS_KEY, book)
  } else {
    const newBook = _createBook(book.title, book.amount)
    return storageService.post(BOOKS_KEY, newBook)
  }
}

function getDefaultFilter() {
  return { title: '', price: 0 }
}

function getEmptyBook() {
  return { title: '', amount: '' }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOKS_KEY)
  if (!books || !books.length) {
    fetch('assets/json/books.json')
      .then((response) => response.json())
      .then((jsonData) => {     
        const books = []
        for (let i = 0; i < 20; i++) {
          const book = {
            id: utilService.makeId(),
            title: jsonData[i].title,
            subtitle: jsonData[i].subtitle,
            authors: jsonData[i].authors,
            publishedDate: jsonData[i].publishedDate,
            description: jsonData[i].description,
            pageCount: jsonData[i].pageCount,
            categories: jsonData[i].categories,
            thumbnail: `/assets/booksImages/${i + 1}.jpg`,
            language: jsonData[i].language,
            listPrice: jsonData[i].listPrice
          }
          books.push(book)
        }
        console.log(books)        
        utilService.saveToStorage(BOOKS_KEY, books)
      })
    // const ctgs = ['Love', 'Fiction', 'Poetry', 'Cyber-Punk', 'Religion']
  }
}

function _createBook(title, amount) {
  return {
    id: utilService.makeId(),
    title,
    subtitle: utilService.makeLorem(15),
    authors: ['Duna elle'],
    publishedDate: utilService.getRandomInt(1700, 2022),
    description: utilService.makeLorem(50),
    pageCount: utilService.getRandomInt(1, 700),
    categories: ['Computers', 'Hack'],
    thumbnail: `/assets/booksImages/${utilService.getRandomInt(1, 20)}.jpg`,
    language: 'en',
    listPrice: {
      amount: amount,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  }
}

