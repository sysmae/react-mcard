import Flex from './Flex'
import Text from './Text'
import { css } from '@emotion/react'

export interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
}

function ListRow({ left, contents, right, withArrow, onClick }: ListRowProps) {
  return (
    <Flex as="li" css={listRowContainerStyles} onClick={onClick} align="center">
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents} </Flex>
      <Flex>{right}</Flex>
      {withArrow && <IconArrowRight />}
    </Flex>
  )
}

function ListRowTexts({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subtitle}</Text>
    </Flex>
  )
}
const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listRowLeftStyles = css`
  margin-right: 14px;
`

const listRowContentsStyles = css`
  flex: 1;
`
function IconArrowRight() {
  return (
    <svg
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width={20}
      height={20}
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7  c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8  L298.3,256z" />
    </svg>
  )
}

ListRow.Texts = ListRowTexts

export default ListRow
