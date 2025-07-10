'use client'

import { useSports } from 'hooks'

import { useKycModal } from 'src/contexts/KycModal/KycModalContext'
import Sport, { SportSkeleton } from 'compositions/events/Sport/Sport'
import { LeagueSkeleton } from 'compositions/events/League/League'
import TopEvents from 'compositions/events/TopEvents/TopEvents'
import EmptyContent from 'compositions/events/EmptyContent/EmptyContent'
import Navbar from 'compositions/events/Navbar/Navbar'
import FilteredLeagues from 'compositions/events/FilteredLeagues/FilteredLeagues'
import UniqueEvents from 'compositions/events/UniqueEvents/UniqueEvents'
import KycModal from 'compositions/modals/Attestaion/KycModal'


const Sports: React.FC = () => {
  const { sports, isFetching } = useSports()

  if (isFetching) {
    return (
      <>
        <SportSkeleton>
          <LeagueSkeleton />
        </SportSkeleton>
      </>
    )
  }

  if (!sports) {
    return <EmptyContent />
  }

  return (
    <>
      {
        sports.map(sport => (
          <Sport key={sport.slug} sport={sport}>
            {
              sport.slug === 'unique' ? (
                <UniqueEvents leagues={sport.leagues} />
              ) : (
                <FilteredLeagues
                  sportSlug={sport.slug}
                  leagues={sport.leagues}
                />
              )
            }
          </Sport>
        ))
      }
    </>
  )
}

export default function TopPage() {
  const { isOpen, closeModal } = useKycModal()

  return (
    <>
      <TopEvents />
      <Navbar>
        <Sports />
      </Navbar>
      <KycModal open={isOpen} onClose={closeModal} />
    </>
  )
}
