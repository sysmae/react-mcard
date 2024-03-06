import Form from '@/components/signup/Form'
import { FormValues } from '@/models/signup'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { auth, store } from '@remote/firebase'
import { COLLECTIONS } from '@/constants'

function SignUpPage() {
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      await updateProfile(user, {
        displayName: name,
      })
      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: name,
      }
      await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

      //TODO: 로그인 처리
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignUpPage
