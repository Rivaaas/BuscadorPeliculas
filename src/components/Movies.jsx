import React from 'react'

const ListOfMovies = ({ movies }) => {
  return (
    <ul className='movies'>
      {
        movies.map(movie => (
          <li key={movie.id} className='movie'>
            <h3> {movie.title}</h3>
            <p>{movie.year}</p>
            <div className="divMovie">
              <img src={movie.poster} alt={movie.Title} />
            </div>
          </li>
        ))
      }
    </ul>
  )
}

const noResults = () => {
  return (
    <p>No se encontraron peliculas para esta busqueda</p>
  )
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0
  return (
    hasMovies
      ?
      <ListOfMovies movies={movies} />
      :
      <p>NO HAY RESULTADOS</p>
  )
}