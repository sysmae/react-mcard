import Flex from '@/components/shared/Flex'
import TextField from '@/components/shared/TextField'
import Button from '@/components/shared/Button'
import Text from '../shared/Text'
import Spacing from '../shared/Spacing'

import { useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { colors } from '@/styles/colorPalette'
import validator from 'validator'
import { FormValues } from '@/models/signin'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormValues((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )
  const errors = useMemo(() => validate(formValues), [formValues])

  const disabled = !(Object.keys(errors).length === 0)

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="example@gmail.com"
        onChange={handleFormValues}
        value={formValues.email}
      />
      <Spacing size={16} />

      <TextField
        label="비밀번호"
        type="password"
        name="password"
        onChange={handleFormValues}
        value={formValues.password}
      />
      <Spacing size={32} />

      <Button
        size="medium"
        disabled={disabled}
        onClick={() => onSubmit(formValues)}
      >
        로그인
      </Button>
      <Spacing size={12} />

      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}
function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}
  if (!validator.isEmail(formValues.email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8자 이상이어야 합니다.'
  }

  return errors
}
const formContainerStyles = css`
  padding: 24px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`
export default Form
