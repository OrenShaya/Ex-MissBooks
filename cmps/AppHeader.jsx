
export function AppHeader() {
  return (
    <section className='app-header'>
      <div className='logo' onClick={() => { /* do a routing function here */ }}>
        Miss Book
      </div>
      <nav className='nav-bar'>
        <a href='#' onClick={() => { /* do a routing function here */ }}>
          Home
        </a>
        <a href='#' onClick={() => { /* do a routing function here */ }}>
          Books
        </a>
        <a href='#' onClick={() => { /* do a routing function here */ }}        >
          About
        </a>
      </nav>
    </section>
  )
}
