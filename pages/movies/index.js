import fetch from 'isomorphic-unfetch';
import { Flex, Box } from 'reflexbox'
import { useRouter } from 'next/router'

export default function MoviesPage({movies, page, numberOfMovies}) {
  const router = useRouter()
  const lastPage = Math.ceil(numberOfMovies / 2)

  return (
    <Box variant="container" pt={40}>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}><h3>{movie.title}</h3></li>
        ))}
      </ul>
      
      <Flex mt={40} pl={20} justifyContent="space-between" max-width={300}>
        <button 
          onClick={() => router.push(`/movies?page=${page - 1}`)}
          disabled={page <= 1}>
          Previous
        </button>
        <button 
          onClick={() => router.push(`/movies?page=${page + 1}`)}
          disabled={lastPage <= page}>
          Next
        </button>
      </Flex>
    </Box>
  )
}


export async function getServerSideProps({ query }) {
  const { API_URL } = process.env
  let page = query.page || 1
  let start = +page === 1 ? 0 : (+page - 1) * 2

  const numberOfMoviesResponse = await fetch(`${API_URL}/movies/count`)
  const numberOfMovies = await numberOfMoviesResponse.json()

  const res = await fetch(`${API_URL}/movies?_start=${start}&_limit=2`)
  const data = await res.json()

  return {
    props: {
      movies: data,
      page: +page,
      numberOfMovies
    }
  }
}