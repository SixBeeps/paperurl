import Image from 'next/image'
import EditableLinkField from './components/EditableLinkField'
import NewLinkForm from './components/NewLinkForm'
import { cookies } from 'next/headers'
import styles from './page.module.css'

export default function Home() {
  const host = process.env.HOSTNAME
  if (!host) {
    console.error('HOSTNAME environment variable not set')
    return null
  }
  const cookieStore = cookies()
  const ownedLinks = cookieStore.has('links') ? JSON.parse(cookieStore.get('links').value) : []

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        paperurl
      </h1>
      <h2 className={styles.subtitle}>
        Simple, accountless URL shortener
      </h2>
      <hr className={styles.separator}></hr>
      <h3 className={styles.subtitle}>New link</h3>
      <NewLinkForm host={host} />
      <hr className={styles.separator}></hr>
      <h3 className={styles.subtitle}>Manage links</h3>
      {ownedLinks.length > 0 ? (
        <div className={styles.formContainer}>
          {ownedLinks.map((link) => (
            <EditableLinkField link={link} key={link.from} host={host} />
          ))}
        </div>
      ) : (
        <p className={styles.subtitle}>You don&apos;t have any links yet.</p>
      )}
    </main>
  )
}
