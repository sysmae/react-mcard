import Top from '@/components/shared/Top'
import AdBanners from '@/components/home/AdBanners'
import CardList from '@/components/home/CardList'
import ListRow from '@/components/shared/ListRow'
import { Suspense } from 'react'

function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subtitle="고객님을 위한 혜택 가득 카드 모음"
      />
      <AdBanners />
      <Suspense
        fallback={[...new Array(10)].map((_, idx) => (
          <ListRow.Skeleton key={idx} />
        ))}
      >
        <CardList />
      </Suspense>
    </div>
  )
}

export default HomePage
