import ListRow from '../shared/ListRow'
import Badge from '../shared/Badge'
import flatten from 'lodash.flatten'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'

import { useInfiniteQuery } from 'react-query'
import { getCards } from '@/remote/card'
import { useCallback } from 'react'

function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense: true,
    },
  )

  const navigate = useNavigate()

  const loadMore = useCallback(() => {
    if (isFetching || hasNextPage === false) return
    fetchNextPage()
  }, [isFetching, hasNextPage, fetchNextPage])

  const cards = flatten(data?.pages.map(({ items }) => items))

  if (!data) return null

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        // scrollableTarget="root"
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subtitle={card.name}
                  />
                }
                right={
                  card.payback != null ? (
                    <Badge label={card.payback}></Badge>
                  ) : null
                }
                withArrow={true}
                onClick={() => {
                  navigate(`/card/${card.id}`)
                }}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
