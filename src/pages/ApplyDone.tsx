import { parse } from 'qs'

import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import FixedBottomButton from '@/components/shared/FixedBottomButton'

function ApplyDone() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string }

  return (
    <Flex>
      <Text>
        {success === 'true'
          ? '신청이 완료되었습니다.'
          : '신청이 거절되었습니다.'}
      </Text>
      <FixedBottomButton
        label="확인"
        onClick={() => {
          window.history.back()
        }}
      />
    </Flex>
  )
}

export default ApplyDone
