const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { name: field, value, type } = target
    if (type === 'number') value = +value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))

  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  const { title, price } = filterByToEdit

  return (
    <section className="filter-container">
      <div className="filter-inside-container">
        <h2 className="filter-header">Filter books:</h2>
        <form className="books-filter" onSubmit={onSubmitFilter}>
          <div className="filter-section">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              className="input"
              placeholder="Search by title..."
            />
          </div>

          <div className="filter-section">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price || ''}
              onChange={handleChange}
              className="input"
              placeholder="Search by price"
            />
          </div>
        </form>
      </div>
    </section>
  )
}
