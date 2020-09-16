import { withTranslation } from '../i18n'
import {Box} from 'reflexbox'

const Contact = ({t}) => {
  return (
    <>
      <Box variant="container">
        <Box as="h2" my={40}>
          {t('contact:Contact')}
        </Box>
        <Box as="div">
          {t('contact:Desc')}
        </Box>
      </Box>
    </>
  )
}

Contact.getInitialProps = async () => ({
  namespacesRequired: ['common', 'contact'],
})

export default withTranslation()(Contact)