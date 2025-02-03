import Image from 'next/image'
import EditableLinkField from './components/EditableLinkField'
import { cookies } from 'next/headers'
import styles from './page.module.css'

export default function Home() {
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
      <div className={styles.separator}></div>
      <h3 className={styles.subtitle}>New link</h3>
      <div className={styles.formContainer}>
        <form action="/api/new_link" method="GET" className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="to" className={styles.label}>Destination<span className={styles.required}>*</span>&nbsp;</label>
            <input type="url" name="to" placeholder="https://example.com" className={`${styles.input} ${styles.inputText}`} />
          </div>
          <div className={styles.formField}>
            <label htmlFor="from" className={styles.label}>from paperurl.io/</label>
            <input type="text" name="from" placeholder="example" className={`${styles.input} ${styles.inputText}`} />
          </div>
          <div className={styles.formField}>
            <label htmlFor="friendly" className={styles.label}>Friendly name&nbsp;</label>
            <input type="text" name="friendly" placeholder="Untitled link" className={`${styles.input} ${styles.inputText}`} />
          </div>
          <input type="submit" value="Shorten" className={`${styles.input} ${styles.inputButton}`} />
        </form>
      </div>
      <div className={styles.separator}></div>
      <h3 className={styles.subtitle}>Manage links</h3>
      {ownedLinks.length > 0 ? (
        <div className={styles.formContainer}>
          {ownedLinks.map((link) => (
            <EditableLinkField link={link} key={link.from} />
          ))}
        </div>
      ) : (
        <p className={styles.subtitle}>You don&apos;t have any links yet.</p>
      )}
    </main>
  )
}
