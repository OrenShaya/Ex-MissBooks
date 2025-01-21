const { Routes, Route, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { HomePage } from "./pages/Home.jsx"
import { Stats } from "./pages/Stats.jsx"

export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/book" element={<BookIndex/>} />
                        <Route path="/stats" element={<Stats/>} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}
