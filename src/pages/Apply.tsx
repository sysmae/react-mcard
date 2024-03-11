import { useState } from 'react'
import Terms from '@/components/apply/Terms'
import BasicInfo from '@/components/apply/Basicinfo'
import CardInfo from '@/components/apply/Cardinfo'
import { ApplyValues } from '@/models/apply'

function ApplyPage() {
  const [step, setStep] = useState(0)
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log(terms)
    setStep(1)
  }
  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {
    console.log(infoValues)
    setStep(2)
  }
  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo /> : null}
    </div>
  )
}

export default ApplyPage
