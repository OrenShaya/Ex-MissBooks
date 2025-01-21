import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onGoBack }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function getBookLng(lng) {
        switch (lng) {
            case 'he':
                return 'Hebrew'
            case 'sp':
                return 'Spanish'
            default:
                return 'English'
        }
    }

    function getPublisheDate() {
        const currYear = new Date().getFullYear()
        let publishedYear = book.publishedDate
        let diff = currYear - publishedYear
        if (diff > 10) publishedYear += ' - Vintage'
        else if (diff < 10) publishedYear += ' - NEW!'
        return publishedYear
    }

    function getPageCount() {
        let pageCount = book.pageCount
        if (book.pageCount > 500) pageCount += ' - Long reading'
        else if (book.pageCount > 200) pageCount += ' - Decent reading'
        else if (book.pageCount < 100) pageCount += ' - Light rading'
        return pageCount
    }

    function getPriceClass() {
        if (book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'
        else return ''
    }


    if (!book) return <div>Loading...</div>

    const { title, subtitle, thumbnail, authors, description, language, categories, listPrice } = book

    return (
        <section className="book-details-container">
            <div className="book-details-title">{title}</div>
            <div className="book-details-subtitle">{subtitle}</div>
            <div className="book-thumbnail-container">
                {listPrice.isOnSale && (
                    <div className="book-details-on-sale">On-sale!</div>
                )}
                <img src={thumbnail} />
            </div>

            <div className="book-details-info">
                <div className="book-details-info-row">
                    <span className="book-details-info-title">Year publish:</span>
                    <span className="book-details-info-text">{getPublisheDate()}</span>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">
                        Author{authors.length > 1 ? "s" : ""}:
                    </span>
                    <span className="book-details-info-text">
                        {authors.toString()}
                    </span>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Language:</span>
                    <span className="book-details-info-text">
                        {getBookLng(language)}
                    </span>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Categories:</span>
                    <span className="book-details-info-text">
                        {categories.toString()}
                    </span>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Pages:</span>
                    <span className="book-details-info-text">{getPageCount()}</span>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Price:</span>
                    <span className={"book-details-info-text " + getPriceClass()}>
                        for only {listPrice.amount}
                    </span>
                </div>

                <div className="book-details-buy-container">
                    {listPrice.isOnSale && (
                        <button
                            className="buy-book-btn"
                            onClick={() => alert(`feature in development...`)}
                        >
                            Buy it now!
                        </button>
                    )}
                    <div className="actions-btns">
                        <button className="go-back-btn" onClick={onGoBack}>
                            ⬅ Go back
                        </button>
                    </div>
                </div>

                <div className="book-details-info-row">
                    <span className="book-details-info-title">Description:</span>
                    <LongTxt txt={description} />
                </div>
            </div>
        </section>
    )
}
