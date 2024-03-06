import Form from '@/components/signin/Form'
import { useCallback } from 'react'
import { FormValues } from '@/models/signin'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import { useAlertContext } from '@/contexts/AlertContext'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'

function SigninPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleFormSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues
      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (e) {
        //firebase error handling
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/wrong-password') {
            open({
              title: '계정의 정보를 다시 확인해주세요.',
              onButtonClick: () => {},
            })
          }
        }
        //common error handling
        open({
          title: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {},
        })
      }
    },
    [open],
  )
  return (
    <div>
      <Form onSubmit={handleFormSubmit} />
    </div>
  )
}

export default SigninPage
