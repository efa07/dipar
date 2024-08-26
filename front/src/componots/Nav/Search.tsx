import "./search.css"
const Search = () => {
  return (
    <div className="search-bar">
      <form 
      className="search-form d-flex align-items-center"
      method="POST"
      action="#"
      >
        <input
        type="text"
        name="query"
        placeholder="Find"
        title="Enter search keyword" />
        <button type="submit" title="Search">
            <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  )
}

export default Search
