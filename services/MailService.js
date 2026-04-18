const nodemailer = require('nodemailer')

class Mail {
    constructor() {
        this.driver = process.env.MAIL_DRIVER || "log";
        if (this.driver === process.env.MAIL_DRIVER) {
            if (!process.env.SMTP_HOST) throw new Error('SMTP_HOST is not defined in environment variables')
            if (!process.env.STARTTLS_PORT) throw new Error('STARTTLS_PORT is not defined in environment variables')
            if (!process.env.SMTP_USER) throw new Error('SMTP_USER is not defined in environment variables')
            if (!process.env.SMTP_PASS) throw new Error('SMTP_PASS is not defined in environment variables')
            if (!process.env.FROM_EMAIL) throw new Error('FROM_EMAIL is not defined in environment variables')
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.STARTTLS_PORT,
                secure: false,
                // requireTLS: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            })
        }
    }

    async sendMail({ to, subject, html }) {
        try {
            if (this.driver === 'log') {
                debug('Email Log Driver:')
                debug('To:', to)
                debug('Subject:', subject)
                debug('HTML:', html)
                return { success: true, messageId: 'Email logged' }
            }
            if (this.driver === process.env.MAIL_DRIVER) {
                const info = await this.transporter.sendMail({
                    from: process.env.FROM_EMAIL,
                    to,
                    subject,
                    html
                })
                return {
                    success: true,
                    messageId: info.messageId,
                    _raw: info
                }
            }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = Mail;