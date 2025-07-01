import cx from 'classnames'

import { Href } from 'components/navigation'


type LogoProps = {
  className?: string
}

const Logo: React.FC<LogoProps> = (props) => {
  const { className } = props

  return (
    <Href to="/" className={cx('flex items-center', className)}>
    <img src="/images/icons/logo/logo.jpg" alt="Logo" width={60} height={60} className='rounded-full'/>
    </Href>
  )
}

export default Logo
