import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import { type ChainId } from '@azuro-org/toolkit'
import { constants } from 'helpers'
import { appChains } from 'wallet/chains'

import { KycModalProvider } from 'src/contexts/KycModal/KycModalContext'
import Providers from 'compositions/Providers/Providers'
import PageLayout from 'compositions/PageLayout/PageLayout'

import '../scss/globals.scss'


dayjs.extend(utc)
dayjs.extend(duration)

const inter = Inter({ subsets: [ 'latin' ] })
const roboto = Roboto({ subsets: [ 'latin' ], weight: [ '400', '500', '700' ], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(constants.baseUrl || 'http://localhost:3000'),
  title: 'Liberland Casino',
  description: '',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersList = await headers()
  const cookieStore = await cookies()

  const userAgent = headersList.get('user-agent')
  const _initialChainId = cookieStore.get('appChainId')?.value
  const initialLiveState = JSON.parse(cookieStore.get('live')?.value || 'false')

  const initialChainId = _initialChainId &&
    ((appChains as unknown as Array<{ id: number }>).find(chain => chain.id === +_initialChainId)?.id as ChainId) || constants.defaultChain.id

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={roboto.className}>
        <Providers
          // initialState={initialState}
          userAgent={userAgent || ''}
          initialLiveState={initialLiveState}
          initialChainId={initialChainId}
        >
          <KycModalProvider>

            <PageLayout>
              {children}
            </PageLayout>
          </KycModalProvider>
        </Providers>
      </body>
    </html>
  )
}
