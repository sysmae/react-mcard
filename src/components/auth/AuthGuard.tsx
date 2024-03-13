import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/remote/firebase'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atoms/user'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    } else {
      setUser(null)
    }
    setIsAuthenticated(true)
  })
  if (!isAuthenticated) {
    return null
  }
  return <>{children}</>
}

export default AuthGuard
