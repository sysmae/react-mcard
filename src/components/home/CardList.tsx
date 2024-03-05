import ListRow from '../shared/ListRow'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'

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
    },
  )

  const loadMore = useCallback(() => {
    if (isFetching || !hasNextPage) return
    fetchNextPage()
  }, [isFetching, hasNextPage, fetchNextPage])

  const cards = flatten(data?.pages.map(({ items }) => items))

  if (!data) return null

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
      >
        {cards.map((card, index) => {
          return (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subtitle={card.name} />
              }
              right={card.payback != null ? <div>{card.payback}</div> : null}
              onClick={() => {}}
              withArrow={true}
            />
          )
        })}
      </InfiniteScroll>
    </div>
  )
}

export default CardList
