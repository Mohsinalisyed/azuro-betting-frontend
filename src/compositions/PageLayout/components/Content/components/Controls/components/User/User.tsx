'use client'

import React, { useState } from 'react'
import { useChain, useWaveStats } from '@azuro-org/sdk'
import { WaveLevelName } from '@azuro-org/toolkit'
import { useDisconnect } from 'wagmi'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'
import copy from 'copy-to-clipboard'
import { useIsMounted } from 'hooks'
import { Message, useIntl } from '@locmod/intl'
import cx from 'classnames'
import { constants, shortenAddress, toLocaleString } from 'helpers'

import { Icon } from 'components/ui'
import { Href } from 'components/navigation'
import { Dropdown } from 'components/inputs'

import messages from './messages'


const azuroIconClassNameByLevel: Record<WaveLevelName, string> = {
  [WaveLevelName.Grey]: 'fill-gradient-azuro-waves-grey',
  [WaveLevelName.Mist]: 'fill-gradient-azuro-waves-mist',
  [WaveLevelName.Sky]: 'fill-gradient-azuro-waves-sky',
  [WaveLevelName.Blue]: 'fill-gradient-azuro-waves-blue',
  [WaveLevelName.Ultramarine]: 'fill-gradient-azuro-waves-ultramarine',
  [WaveLevelName.Bright]: 'fill-gradient-azuro-waves-bright',
  [WaveLevelName.Brilliant]: 'fill-gradient-azuro-waves-brilliant',
  [WaveLevelName.Royal]: 'fill-gradient-azuro-waves-royal',
}

const AzuroWaves: React.FC = () => {
  const { address } = useAccount()
  const { data, isFetching } = useWaveStats({
    account: address!,
  })

  const { points, levelDescription: { name } } = data || { points: '0', levelDescription: { name: WaveLevelName.Grey } }

  return (
    <Href
      className="rounded-4 p-2 mt-2 bg-grey-10 rounded-sm block"
      toTab={constants.links.waves}
    >
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center">
          <Icon
            name="interface/azuro_wave"
            className={cx('size-6', azuroIconClassNameByLevel[name])}
          />
          <div className="ml-2">
            <Message
              className="text-caption-12 font-semibold capitalize"
              value={messages.wave.title}
              tag="p"
            />
            <Message
              className="text-caption-12 text-grey-60 mt-[2px]"
              value={{ ...messages.wave.text, values: { level: name } }}
              tag="p"
            />
          </div>
        </div>
        {
          isFetching ? (
            <div className="bone h-[0.875rem] w-5 rounded-full" />
          ) : (
            <div className="text-caption-12 font-semibold">{toLocaleString(points || 0, { digits: 2 })}</div>
          )
        }
      </div>
    </Href>
  )
}

export const LanguageSelector: React.FC = () => {
  const { setLocale } = useIntl()
  // Get saved locale or fallback to browser or 'en'
  const getInitialLocale = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('locale')

      if (saved) {
        return saved
      }

      if (navigator.language) {
        return navigator.language.split('-')[0]
      }
    }

    return 'en'
  }
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
  ]
  const [ locale, setLocalLocale ] = React.useState(getInitialLocale)
  const [ isOpen, setIsOpen ] = React.useState(false)

  const handleSelect = (code: string) => {
    setLocalLocale(code)
    setLocale(code)

    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', code)
    }
    setIsOpen(false)
  }

  React.useEffect(() => {
    setLocale(locale)
  }, [ locale, setLocale ])

  return (
    <Dropdown
      className="mt-2 bg-transparent"
      contentClassName="min-w-[120px]"
      placement="bottomRight"
      content={
        (
          <div className="absolute left-4 flex flex-col ml-2 py-1 bg-grey-15 rounded-2">
            {
              languages.map(lang => (
                <button
                  key={lang.code}
                  className={
                    cx(
                      'px-3 py-1 text-left text-caption-13 hover:bg-grey-10 transition',
                      lang.code === locale && 'font-bold text-brand-500'
                    )
                  }
                  onClick={() => handleSelect(lang.code)}
                  type="button"
                >
                  {lang.label}
                </button>
              ))
            }
          </div>
        )
      }
    >
  <div>
        <button
        className="flex items-center gap-2  py-1 px-2 rounded text-caption-13 text-grey-60 focus:outline-none"
        type="button"
        onClick={() => setIsOpen(v => !v)}
      >
        <Icon className="size-4" name="interface/lose" />
        {languages.find(l => l.code === locale)?.label}
        <Icon className={cx('size-3 transition', isOpen && 'rotate-180')} name="interface/caret_down" />
      </button>
  </div>
    </Dropdown>
  )
}

const Content: React.FC = () => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { appChain } = useChain()
  const [ isCopied, setCopied ] = useState(false)
  const isMounted = useIsMounted()

  const handleCopyClick = () => {
    copy(address!)
    setCopied(true)

    setTimeout(() => {
      if (isMounted()) {
        setCopied(false)
      }
    }, 1000)
  }

  const buttonClassName = 'px-2 py-1 border border-grey-15 text-grey-60 hover:text-grey-90 transition cursor-pointer rounded-full'

  return (
    <div className="border border-grey-20 p-2 ds:w-[18.75rem] bg-bg-l2 rounded-md overflow-hidden">
      <div className="p-1 bg-bg-l1 mt-2 rounded-md">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center">
            <div className="p-1 rounded-full bg-grey-10 border border-grey-15 mr-2">
              <Icon className="size-5 stroke-grey-70 fill-transparent" name="interface/user_avatar" />
            </div>
            <div className="text-caption-13">{shortenAddress(address!)}</div>
          </div>
          <div className="flex items-center">
            <div className={cx(buttonClassName, { '!text-accent-green': isCopied })} onClick={handleCopyClick}>
              <Icon className="size-4" name={isCopied ? 'interface/check' : 'interface/copy'} />
            </div>
            <a
              href={`${appChain.blockExplorers!.default.url}/address/${address}`}
              target="_blank"
              rel="noreferrer"
              className={cx(buttonClassName, 'ml-1')}
            >
              <Icon className="size-4" name="interface/external_link" />
            </a>
          </div>
        </div>
        <AzuroWaves />
      </div>
      <LanguageSelector />
      <Href to="/profile" className="mt-2 p-2 flex items-center text-grey-60 hover:text-grey-90 transition-all">
        <Icon className="size-4 mr-2" name="interface/mybets" />
        <Message className="text-caption-13" value={messages.myBets} />
      </Href>
      <div
        className="p-2 mt-2 flex items-center text-grey-60 hover:text-accent-red transition-all cursor-pointer"
        onClick={() => disconnect()}
      >
        <Icon className="size-4 mr-2" name="interface/logout" />
        <Message className="text-caption-13" value={messages.disconnect} />
      </div>
    </div>
  )
}

const User: React.FC = () => {
  return (
    <Dropdown
      className={cx('group')}
      contentClassName="mb:p-0"
      buttonClassName="wd:h-10 -wd:h-8"
      content={<Content />}
      placement="bottomRight"
    >
      <div className="flex items-center text-grey-60 ui-open:text-grey-90 hover:text-grey-90">
        <div className="bg-bg-l2 p-1 rounded-full ds:size-10 mb:size-8">
          <Icon className="w-full stroke-grey-70 fill-transparent" name="interface/user_avatar" />
        </div>
        <Icon className="size-5 ui-open:rotate-180 ml-1" name="interface/caret_down" />
      </div>
    </Dropdown>
  )
}

export default User
