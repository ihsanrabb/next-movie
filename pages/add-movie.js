import { Box } from 'reflexbox'
import styled from '@emotion/styled'
import getConfig from 'next/config'
import { useState } from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'

const { publicRuntimeConfig } = getConfig()

const AddMovie = () => {
  const [movieTitle, setMovieTitle] = useState('')
  const [movieSlug, setMovieSlug] = useState('')

  function addMovie() {
    const jwt = parseCookies().jwt

    console.log('jwt bos', jwt)

    const movieInfo = {
      title : movieTitle,
      slug: movieSlug
    }

    const configHeaders = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }

    axios.post(`${publicRuntimeConfig.API_URL}/movies`, movieInfo, configHeaders)
      .then((res) => {
        console.log('res', res)
      }).catch(err => console.log(err))

  }

  return (
    <AddMovieStyled>
      <Box variant="container">
        <Box as="h2">
          Add Movie
        </Box>

        <form>
          <input type="text" placeholder="Movie Title" onChange={(e) => setMovieTitle(e.target.value)} value={movieTitle} /><br />
          <input type="text" placeholder="Movie Slug" onChange={(e) => setMovieSlug(e.target.value)} value={movieSlug} /><br />
          <button type="button" onClick={() => addMovie()}>Add Movie</button>
        </form>
      </Box>
    </AddMovieStyled>
  )
}

const AddMovieStyled = styled.div`
  input {
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`

export default AddMovie

