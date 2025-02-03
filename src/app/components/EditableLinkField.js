"use client"
import styles from '../page.module.css'
import { SaveFloppyDisk, Trash } from 'iconoir-react'

export default function EditableLinkField({ link }) {
	return (
		<form action="/api/edit_link" method="PATCH" className={styles.form} onSubmit={(e) => {
			e.preventDefault()

			// HTML doesn't allow methods other than GET and POST, so we need to use some JS trickery to send a PATCH or DELETE request
			const method = e.nativeEvent.submitter.getAttribute('name')
			const form = e.target
			const to = form.querySelector('input[name="to"]').value
			const from = form.querySelector('input[name="from"]').value
			const key = form.querySelector('input[name="key"]').value
			const friendly = form.querySelector('input[name="friendly"]').value
			fetch(`/api/edit_link?to=${to}&from=${from}&key=${key}&friendly=${friendly}`, { method })
			.then((response) => {
				if (response.ok)
					window.location.reload()
				else
					response.json().then((data) => alert(data.data))
			})
		}}>
			<div className={styles.formField}>
				<span>paperurl.io/</span>
				<b>{link.from}</b>
			</div>
			<input type="hidden" name="from" value={link.from} />
			<input type="hidden" name="key" value={link.key} />
			<div className={styles.formField}>
				<label htmlFor="to" className={styles.label}>Destination<span className={styles.required}>*</span>&nbsp;</label>
				<input type="url" name="to" placeholder="https://example.com" className={styles.inputText} defaultValue={link.to} />
			</div>
			<div className={styles.formField}>
				<label htmlFor="friendly" className={styles.label}>Friendly name&nbsp;</label>
				<input type="text" name="friendly" placeholder="Untitled link" className={styles.inputText} defaultValue={link.friendly} />
			</div>
			<div className={styles.formActions}>
				<button type="submit" className={styles.inputButton} name="PATCH" formMethod="PATCH"><SaveFloppyDisk /> Save</button>
				<button type="submit" className={styles.inputButton} name="DELETE" formMethod="DELETE"><Trash /> Delete</button>
			</div>
		</form>
	)
}