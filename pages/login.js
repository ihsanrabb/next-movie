import {Box} from "reflexbox"
import getConfig from 'next/config'
import styled from "@emotion/styled"
import { useState } from 'react'
import axios from 'axios'
import { setCookie } from 'nookies'
import Router from "next/router"

const { publicRuntimeConfig } = getConfig()

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    let loginInfo = {
      identifier: username,
      password: password
    }
    
    axios.post(`${publicRuntimeConfig.API_URL}/auth/local`, loginInfo)
      .then((res) => {
        setCookie(null, 'jwt', res.data.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
        Router.push('/payed-article')
      }).catch(err => console.log(err))

  }

  return (
    <>
      <LoginStyled>
        <Box variant="container">
          <Box as="h2" my={40}>
            You need to login to access this page
          </Box>

          <form>
            <input type="email" onChange={e => setUsername(e.target.value)} value={username} /><br/>
            <input type="password" onChange={e => setPassword(e.target.value)} value={password} /><br/>
            <button type="button" onClick={() => handleLogin()} >Login</button>
          </form>
        </Box>
      </LoginStyled>
    </>
  )
}

const LoginStyled = styled.div`
  input {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`

export default Login