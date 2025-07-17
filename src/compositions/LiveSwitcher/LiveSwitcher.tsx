'use client'

import React from 'react'
import { Message } from '@locmod/intl'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import { useLive } from '@azuro-org/sdk'
import cx from 'classnames'

import { Icon } from 'components/ui'

import messages from './messages'


const Switch = () => {
  const { isLive, changeLive } = useLive()

  return (
<HeadlessSwitch
  checked={isLive}
  onChange={changeLive}
  className="relative flex h-5 w-12 cursor-pointer rounded-sm bg-white px-1 items-center transition-colors duration-200 ease-in-out ui-checked:bg-accent-red border border-grey-10 ui-checked:border-accent-red"
>
  {/* ON/OFF label in center */}
  <span className={`absolute inset-0 flex w-full items-center ${isLive ? 'justify-start': 'justify-end'} px-1 text-[10px] font-medium ${!isLive ? 'text-green-700' : 'text-red-600'} pointer-events-none select-none`}>
    {!isLive ? 'On' : 'Off'}
  </span>

  {/* Circle */}
  <span
    aria-hidden="true"
    className="pointer-events-none inline-block size-3 transform rounded-full bg-black transition-transform duration-200 ease-in-out translate-x-0 ui-checked:translate-x-[24px] ui-checked:bg-grey-10"
  />
</HeadlessSwitch>



  )
}

const LiveSwitcher: React.FC<{className?: string}> = ({ className }) => {
  return (
    <div className={cx('border border-accent-red-5 rounded-md bg-live-switcher-bg py-2 pl-4 pr-2 flex items-center justify-between', className)}>
      <div className="flex items-center text-blue-500">
        <Icon className="size-4 mr-2" name="interface/live" />
        <Message className="text-caption-12 font-medium text-blue-500 " value={messages.title} />
      </div>
      <Switch />
    </div>
  )
}

export default LiveSwitcher
