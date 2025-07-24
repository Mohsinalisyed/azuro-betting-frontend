'use client'

import React, { useRef, useState } from 'react'
import cx from 'classnames'
import { type GameQuery, type MarketOutcome } from '@azuro-org/toolkit'
import { Icon } from 'components/ui'
import { useKycVerification } from 'src/hooks/useKycVerification'
import { useKycModal } from 'src/contexts/KycModal/KycModalContext'
import OddsValue from 'compositions/OddsValue/OddsValue'
import useButton from './utils/useButton'


type OutcomeButtonProps = {
  marketName: string
  outcome: MarketOutcome
  game: NonNullable<GameQuery['game']>
  isLocked: boolean
  size?: 28 | 40
}

const OutcomeButton: React.FC<OutcomeButtonProps> = (props) => {
  const { marketName, outcome, game, isLocked, size = 28 } = props
  const nodeRef = useRef<HTMLDivElement>(null)
  const { odds, isActive, onClick: originalOnClick } = useButton({ marketName, outcome, game, nodeRef })

  // KYC check
  const { openModal, kycLoading, kycVerification } = useKycModal()

  const handleClick = () => {
    // if (!kycVerification?.isVerified) {
    //   openModal()
    // }
    // else {
    originalOnClick()
    // }
  }

  const buttonClassName = cx(
    'group/button w-full relative flex items-center justify-between ds:px-3 mb:px-2 overflow-hidden',
    'text-caption-13 font-semibold border-none rounded-min select-none',
    {
      'hover:text-brand-50 hover:bg-brand-5': !isLocked && !isActive,
      'text-grey-10 bg-grey-90': isActive,
      'bg-grey-15': !isActive,
      'text-grey-40 cursor-not-allowed': isLocked,
      'h-7': size === 28,
      'h-10': size === 40,
    }
  )

  return (
    <>
      <button
        className={buttonClassName}
        disabled={isLocked || kycLoading}
        onClick={handleClick}
      >
        <div className="flex items-center">
          {
            isLocked && (
              <Icon className="mr-1 size-4 text-grey-40" name="interface/lock" />
            )
          }
          <div
            className={
              cx('text-left whitespace-normal', {
                'group-hover/button:text-brand-50': !isLocked && !isActive,
                'text-grey-10': isActive,
                'text-grey-60': !isActive,
                'text-grey-40': isLocked,
              })
            }
          >
            {outcome.selectionName}
          </div>
        </div>
        <div ref={nodeRef} className="group/odds flex items-center">
          <Icon
            className={
              cx(
                'size-4 text-transparent transition-color',
                'group-[.increased]/odds:text-accent-green',
                'group-[.decreased]/odds:text-accent-red group-[.decreased]/odds:rotate-180'
              )
            }
            name="interface/caret_up"
          />
          <OddsValue
            className={
              cx(
                'transition-color',
                'group-[.increased]/odds:text-accent-green',
                'group-[.decreased]/odds:text-accent-red'
              )
            }
            odds={odds}
          />
        </div>
      </button>
    </>
  )
}

export default OutcomeButton
