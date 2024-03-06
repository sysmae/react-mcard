import styled from '@emotion/styled'

interface SpacingProps {
  size: number
  direction?: 'horizontal' | 'vertical'
}

const Spacing = styled.div<SpacingProps>`
  margin: ${({ size, direction }: SpacingProps) =>
    direction === 'horizontal' ? `0 ${size}px` : `${size}px 0`};
`
export default Spacing
