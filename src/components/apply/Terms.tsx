import Agreement from '../shared/Agreement'
import { 약관목록 } from '@constants/apply'
import { useCallback, useState, MouseEvent } from 'react'
import FixedBottomButton from '../shared/FixedBottomButton'
import { ApplyValues } from '@/models/apply'

function Terms({ onNext }: { onNext: (terms: ApplyValues['terms']) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prev) => {
        const next = { ...prev }
        for (const key in next) {
          next[key] = checked
        }
        return next
      })
    },
    [],
  )

  const isEveryAgreed = Object.values(termsAgreements).every((v) => v)

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={isEveryAgreed} onChange={handleAllAgreement}>
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prev) => ({
                ...prev,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!isEveryAgreed}
        onClick={() => {
          onNext(Object.keys(termsAgreements))
        }}
      />
    </div>
  )
}

export default Terms
