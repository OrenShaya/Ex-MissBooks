const { useEffect, useState } = React
import { bookService } from "../services/book.service.js"

export function Stats() {
    const [data, setData] = useState({});

    useEffect(() => {
        bookService.query().then(books => {  
            const categoriesData = books.reduce((acc, book) => {
                book.categories.forEach(cat => {    
                    if (acc[cat]) acc[cat] = acc[cat] + 1
                    else acc[cat] = 1
                });
                return acc
            }, {})
            setData(categoriesData)
        })
    }, [])
   
    return (
        <section className="stats">
            <h1>
                Welcome to stats page! 
            </h1> 
            <div>
                <ul className="chart">
                    {
                        Object.keys(data).map((key) => {
                            return (
                                <li key={key}>
                                    {data[key]} {(data[key] > 1) ? 'Books' : 'Book'}
                                    <span style={{height: `${data[key] * 5}%`}} title={key}></span>
                                </li>
                            )
                        })
                    }
                    {/* <li> <span style={{height: '5%'}} title="ActionScript"></span> </li> */}
                </ul>
            </div>
        </section>
    )
}