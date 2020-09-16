import { NextSeo } from 'next-seo'
import {Box} from 'reflexbox'
import fetch from 'isomorphic-unfetch'
import {useContext} from 'react'
import {I18nContext} from 'next-i18next'

const About = ({page}) => {
  const { i18n: {language}} = useContext(I18nContext)

  const SEO = {
    title: page.title,
    description: 'just normal about page'
  }

  return (
    <> 
      <NextSeo {...SEO} />
      <Box variant="container">
        <Box as="h2" my={40}>
          {language === 'en' ? page.title : page.title_hr}
        </Box>
        <div dangerouslySetInnerHTML={{__html: language === 'en' ? page.content : page.content_hr }}/>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const { API_URL } = process.env
  
  const res = await fetch(`${API_URL}/pages/1`)
  const data = await res.json()

  return {
    props: {
      page: data
    },
    revalidate: 1
  }
}

About.defaultProps = {
  i18nNamespaces: ['common']
}

export default About