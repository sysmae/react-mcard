import { createPortal } from 'react-dom'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Button from './Button'
import { colors } from '@styles/colorPalette'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
}

function FixedBottomButton({ label, onClick }: FixedBottomButtonProps) {
  const $portalRoot = document.getElementById('root-portal')
  if (!$portalRoot) return null

  return createPortal(
    <Container>
      <Button size="medium" full={true} onClick={onClick} css={buttonStyle}>
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`

const buttonStyle = css`
  border-radius: 8px;
`

export default FixedBottomButton
