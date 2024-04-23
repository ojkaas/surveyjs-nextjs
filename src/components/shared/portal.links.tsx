import Link from 'next/link'

type Props = {}

const PortalLinks = (props: Props) => {
  return (
    <>
      <li>
        <Link href='/portal/vragenlijsten'>Vragenlijsten</Link>
      </li>
    </>
  )
}

export default PortalLinks
