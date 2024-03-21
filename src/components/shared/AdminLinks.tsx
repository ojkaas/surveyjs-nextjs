import Link from 'next/link'

type Props = {}

const AdminLinks = (props: Props) => {
  return (
    <>
      <li>
        <Link href='/admin/users'>Gebruikers</Link>
      </li>
      <li>
        <Link href='/admin/survey-definitions'>Vragenlijst</Link>
      </li>
      <li>
        <Link href='/admin/diagnoses'>Diagnoses</Link>
      </li>
      <li>
        <Link href='/admin/image-upload'>Afbeeldingen</Link>
      </li>
    </>
  )
}

export default AdminLinks
