import Top from '@/components/shared/Top'
import AdBanners from '@/components/home/AdBanners'
import CardList from '@/components/home/CardList'
function HomePage() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subtitle="고객님을 위한 혜택 가득 카드 모음"
      />
      <AdBanners />
      <CardList />
    </div>
  )
}

export default HomePage
