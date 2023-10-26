import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        paperurl
      </h1>
      <h2 className={styles.subtitle}>
        Simple, accountless URL shortener
      </h2>
      <div className={styles.formContainer}>
        <form action="/api/new_link" method="GET" className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="to" className={styles.label}>Destination<span className={styles.required}>*</span>&nbsp;</label>
            <input type="url" name="to" placeholder="https://example.com" className={styles.input} />
          </div>
          <div className={styles.formField}>
            <label htmlFor="from" className={styles.label}>from paperurl.io/</label>
            <input type="text" name="from" placeholder="example" className={styles.input} />
          </div>
          <div className={styles.formField}>
            <label htmlFor="friendly" className={styles.label}>Friendly name&nbsp;</label>
            <input type="text" name="friendly" placeholder="Untitled link" className={styles.input} />
          </div>
          <input type="submit" value="Shorten" className={`${styles.input} ${styles.inputButton}`} />
        </form>
      </div>
    </main>
  )
}
