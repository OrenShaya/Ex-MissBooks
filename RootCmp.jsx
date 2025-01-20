const { Routes, Route, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/Home.jsx"

export function App() {
    return (
        <Router>
            <section className="app">
                <header>
                    <AppHeader/>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/book" element={<BookIndex/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                    {/* <HomePage /> */}
                    {/* <AboutUs /> */}
                    {/* <BookIndex /> */}
                </main>
            </section>
        </Router>
    )
}
