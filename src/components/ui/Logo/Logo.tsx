import cx from 'classnames'

import { Href } from 'components/navigation'


type LogoProps = {
  className?: string
}

const Logo: React.FC<LogoProps> = (props) => {
  const { className } = props

  return (
    <Href to="/" className={cx('flex items-center', className)}>
      <img
        className="rounded-full"
        src="/images/icons/logo/logo.png"
        alt="Logo"
        width={70}
        height={70}
      />
    </Href>
  )
}

export default Logo
