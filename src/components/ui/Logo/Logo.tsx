import cx from 'classnames'

import { Href } from 'components/navigation'


type LogoProps = {
  className?: string
}

const Logo: React.FC<LogoProps> = (props) => {
  const { className } = props

  return (
    <Href to="/" className={cx('flex items-center h-full', className)}>
      <img
        className="rounded-full"
        src="/images/icons/logo/logo.png"
        alt="Logo"
        width={60}
        height={60}
      />
    </Href>
  )
}

export default Logo
