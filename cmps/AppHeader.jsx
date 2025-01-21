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
        <NavLink to="/book">
          Books
        </NavLink>
        <NavLink to="/about">
          About
        </NavLink>
        <NavLink to="/stats">
          Stats
        </NavLink>
      </nav>
    </section>
  )
}
