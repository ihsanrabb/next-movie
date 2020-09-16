import { Box } from "reflexbox"
import getConfig from 'next/config'
import {parseCookies, destroyCookie} from 'nookies'
import Router from 'next/router'


const PayedArticle = ({test, articles}) => {

  function handleLogout() {
    destroyCookie(null, 'jwt', {
      path: '/'
    })
    Router.push('/')
  }

  return (
    <>
      <Box variant="container"> 
        <Box as="h2" my={40}>
          Payed Article {test}  
        </Box>
        <button type="button" onClick={() => handleLogout()}>Logout</button>

        {articles.map(article => (
          <div className="article" key={article.id}>
            <h3>{article.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: article.body }} />
          </div>
        ))}

      </Box>
    </>
  )
}

const { publicRuntimeConfig } = getConfig()

export async function getServerSideProps(ctx) {

  const jwt = parseCookies(ctx).jwt

  const res = await fetch(`${publicRuntimeConfig.API_URL}/payed-articles`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  const articles = await res.json()

  return {
    props: {
      test: "hahahha",
      articles: articles
    }
  }
}

export default PayedArticle