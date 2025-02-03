// React component for a link you can 
import styles from '../page.module.css'
import { SaveFloppyDisk, Trash } from 'iconoir-react'

export default function EditableLinkField({ link }) {
	return (
		<form action="/api/edit_link" method="GET" className={styles.form}>
			<div className={styles.formField}>
				<span>paperurl.io/</span>
				<b>{link.from}</b>
			</div>
			<input type="hidden" name="from" value={link.from} />
			<input type="hidden" name="key" value={link.key} />
			<div className={styles.formField}>
				<label htmlFor="to" className={styles.label}>Destination<span className={styles.required}>*</span>&nbsp;</label>
				<input type="url" name="to" placeholder="https://example.com" className={`${styles.input} ${styles.inputText}`} defaultValue={link.to} />
			</div>
			<div className={styles.formField}>
				<label htmlFor="friendly" className={styles.label}>Friendly name&nbsp;</label>
				<input type="text" name="friendly" placeholder="Untitled link" className={`${styles.input} ${styles.inputText}`} defaultValue={link.friendly} />
			</div>
			<div className={styles.formField}>
				<button type="submit" className={`${styles.input} ${styles.inputButton}`}><SaveFloppyDisk /></button>
				<button type="submit" className={`${styles.input} ${styles.inputButton}`} formAction='/api/delete_link' formMethod='GET'><Trash /></button>
			</div>
		</form>
	)
}