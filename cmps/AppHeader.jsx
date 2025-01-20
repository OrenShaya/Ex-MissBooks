const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <section className='app-header'>
      <NavLink to="/" className='logo'>
        Miss Book
      </NavLink>
      <nav className='nav-bar'>
        <NavLink to='/#/'>
          Home
        </NavLink>
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
