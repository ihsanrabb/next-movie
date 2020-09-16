import { i18n } from '../i18n'
import styled from "@emotion/styled"
import {useContext} from 'react'
import {I18nContext} from 'next-i18next'

const LanguangeSwitcher = () => {
  const { i18n: {language}} = useContext(I18nContext)

  return (
    <LanguangeSwitcherStyled>
      <button 
        type="button" 
        onClick={() => i18n.changeLanguage('hr')} 
        className={language === 'hr' ? 'is-active': ''}>IN
      </button>
      <button 
        type="button" 
        onClick={() => i18n.changeLanguage('en')} 
        className={language === 'en' ? 'is-active': ''}>EN
      </button>
    </LanguangeSwitcherStyled>
  )
}

const LanguangeSwitcherStyled = styled.div`
  button.is-active {
    background-color : #000;
    color: #fff;
  }
`

export default LanguangeSwitcher