"use client"
import React from 'react'
import styles from '../page.module.css'

const NewLinkForm = ({ host }) => {
	return (
		<div className={styles.formContainer}>
			<form action="/api/new_link" method="GET" className={styles.form} onSubmit={(e) => {
				e.preventDefault()
				const form = e.target
				const to = form.querySelector('input[name="to"]').value
				const from = form.querySelector('input[name="from"]').value
				const friendly = form.querySelector('input[name="friendly"]').value
				fetch(`/api/new_link?to=${to}&from=${from}&friendly=${friendly}`)
				.then((response) => {
					if (response.ok)
						window.location.reload()
					else
						response.json().then((data) => alert(data.data))
				})
			}}>
				<div className={styles.formField}>
				<label htmlFor="to" className={styles.label}>Destination<span className={styles.required}>*</span>&nbsp;</label>
				<input type="url" name="to" placeholder="https://example.com" className={styles.inputText} />
				</div>
				<div className={styles.formField}>
				<label htmlFor="from" className={styles.label}>from {host}/to/</label>
				<input type="text" name="from" placeholder="example" className={styles.inputText} />
				</div>
				<div className={styles.formField}>
				<label htmlFor="friendly" className={styles.label}>Friendly name&nbsp;</label>
				<input type="text" name="friendly" placeholder="Untitled link" className={styles.inputText} />
				</div>
				<input type="submit" value="Shorten" className={styles.inputButton} />
			</form>
		</div>
	)
}

export default NewLinkForm