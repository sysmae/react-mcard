import styled from '@emotion/styled'

interface SpacingProps {
  size: number
  direction?: 'horizontal' | 'vertical'
}

const Spacing = styled.div<SpacingProps>`
  margin: ${({ size, direction }: SpacingProps) =>
    direction === 'horizontal' ? `width: ${size}px` : `height:${size}px`};
`
export default Spacing
