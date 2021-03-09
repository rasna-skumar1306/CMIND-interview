import { useEffect, useState } from 'react'
import './App.css'

import orderBy from 'lodash/orderBy'
import Books from './Books'

function App() {
  const [columnSort, setColumnSort] = useState({ name: '', type: 'asc' })
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(Books.rows)

  useEffect(() => {
    handleSearch()
    //eslint-disable-next-line
  }, [search])

  const invert = {
    asc: 'desc',
    desc: 'asc',
  }

  const sort = (prop) => {
    setColumnSort({
      name: prop,
      type: columnSort.name === prop ? invert[columnSort.type] : 'asc',
    })
  }

  const handleSearch = () => {
    let res = Books.rows.filter(
      (book) =>
        book.Author.toLowerCase().includes(search.toLowerCase()) ||
        book.Title.toLowerCase().includes(search.toLowerCase())
    )
    setResults(res)
  }

  const Book = ({ data }) =>
    data.map((book, idx) => (
      <tr key={idx} className='row'>
        <td className='id'>{book.BookID}</td>
        <td className='title'>{book.Title}</td>
        <td className='author'>{book.Author}</td>
        <td className='price'>{book.Price}</td>
        <td className='publishDate'>{book.PublishDate}</td>
      </tr>
    ))

  return (
    <div className='App'>
      <input
        className='search'
        type='search'
        placeholder='search Title or Author'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <table className='books'>
        <thead>
          <tr>
            <th onClick={() => sort('BookID')}>Id</th>
            <th onClick={() => sort('Title')}>Title</th>
            <th onClick={() => sort('Author')}>Author</th>
            <th onClick={() => sort('Price')}>Price</th>
            <th onClick={() => sort('PublishDate')}>PublishDate</th>
          </tr>
        </thead>
        <tbody>
          <Book data={orderBy(results, columnSort.name, columnSort.type)} />
        </tbody>
      </table>
    </div>
  )
}

export default App
