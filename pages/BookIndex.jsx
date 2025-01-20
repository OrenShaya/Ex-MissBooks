const { useEffect, useState } = React

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            // .then((books) => setBooks(books))
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
            })
            .catch((err) => {
                console.log('Problems removing book:', err)
            })
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (!books) return <div>Loading...</div>
    return (
        <main>
            {!selectedBookId &&
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    {!!books.length && (
                        <BookList
                            books={books}
                            onSelectBook={onSelectBookId}
                            onRemoveBook={onRemoveBook}
                        />
                    )}

                    {!books.length && <div> No Books found...</div>}
                </React.Fragment>
            }

            {selectedBookId && (
                <section>
                    <BookDetails
                        bookId={selectedBookId}
                        onGoBack={() => setSelectedBookId(null)}
                    />
                </section>
            )}

        </main>
    )
}
