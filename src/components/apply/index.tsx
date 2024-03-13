import Terms from '@/components/apply/Terms'
import BasicInfo from '@/components/apply/Basicinfo'
import CardInfo from '@/components/apply/Cardinfo'
import { ApplyValues, APPLY_STATUS } from '@/models/apply'
import { useState, useEffect } from 'react'
import useUser from '@/hooks/auth/useUser'
import { useParams } from 'react-router-dom'

function Apply({ onSubmit }: { onSubmit: (applyValues: ApplyValues) => void }) {
  const user = useUser()
  const { id } = useParams<{ id: string }>()
  const storageKey = `applied-${user?.uid}-${id}`

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)

    if (!applied) {
      return { userId: user?.uid, cardId: id, step: 0 }
    }
    return JSON.parse(applied)
  })

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey)
      onSubmit({
        ...applyValues,
        status: APPLY_STATUS.READY,
        appliedAt: new Date(),
      } as ApplyValues)
    } else {
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [onSubmit, applyValues, storageKey])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({
      ...prev,
      terms,
      step: (prev.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...infoValues,
      step: (prev.step as number) + 1,
    }))
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>,
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...cardInfoValues,
      step: (prev.step as number) + 1,
    }))
  }

  return (
    <div>
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </div>
  )
}

export default Apply
