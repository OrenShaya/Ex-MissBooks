import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onSelectBook, onRemoveBook }) {
  return (
    <section className="books-lst-container">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <BookPreview book={book} />
          <button onClick={() => onSelectBook(book.id)}>Select</button>
          <button onClick={() => onRemoveBook(book.id)}>Delete</button>
        </div>
      ))}
    </section>
  )
}
