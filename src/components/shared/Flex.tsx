import styled from '@emotion/styled'
import { CSSProperties } from 'react'
import { SerializedStyles } from '@emotion/react'

interface FlexProps {
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  direction?: CSSProperties['flexDirection']
  css?: SerializedStyles
}

const Flex = styled.div<FlexProps>(({ align, justify, direction }) => ({
  display: 'flex',
  alignItems: align,
  justifyContent: justify,
  flexDirection: direction,
}))

export default Flex
