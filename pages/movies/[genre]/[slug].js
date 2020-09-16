import { Box, Flex } from 'reflexbox'
import { NextSeo } from 'next-seo'

export default function Movie({movie}) {

  const SEO = {
    title: `Next Movies | ${movie.title}`,
    description: movie.description,
    openGraph: {
      title: movie.title,
      description: movie.title
    }
  }

  return (
    <>
      <NextSeo {...SEO} />
      <Box variant="container">
        <Box as="h2" my={40}>{movie.title}</Box>
        <Box maxWidth={600}>
          {movie.description}  
        </Box>
      </Box>
    </>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query
  const { API_URL } = process.env

  const res = await fetch(`${API_URL}/movies?slug=${slug}`)
  const data = await res.json()

  return {
    props: {
      movie: data[0]
    }
  }
}