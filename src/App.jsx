import { useEffect, useRef, useState } from 'react'
import './App.css'
import React from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'


function useSearch() {
  const [search, updateSearch] = useState("")
  const [error, setError] = useState("")
  const isFirstInput = useRef(true)

  useEffect(() => {

    if (isFirstInput.current) {
      isFirstInput.current = search === ""
      return
    }

    if (search === "") {
      setError("No se puede buscar una pelicula vacia")
      return
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un numero")
      return

    }

    if (search.length < 3) {
      setError("No se puede tener menos de 3 caracteres")
      return
    }

    setError("")
  }, [search])

  return { search, updateSearch, error }

}

function App() {
  const [sort,setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search,sort })


  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies()
  }

  const handleChange = (e) => {
    updateSearch(e.target.value)
  }

  const handleSort = () => {
    setSort(!sort)
    
  }

  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de peliculas</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input
              style={{
                border: '1px solid ',
                borderColor: error ? 'red' : 'blue',
              }}
              onChange={handleChange}
              value={search}
              name="search"
              placeholder='Los vengadores, Spiderman, Hulk, Iron Man....'
            />
            <input type="checkbox" onChange={handleSort} checked={sort} />
            <button type="submit" onSubmit={handleSubmit}>Buscar</button>
          </form>
          {error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}
        </header>
        <main>
          {
            loading ? <h1>CARGANDO</h1> : <Movies movies={movies} />
          }
        </main>
      </div >
    </>
  )
}


export default App
