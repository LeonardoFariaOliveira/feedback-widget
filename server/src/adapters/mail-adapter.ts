export interface SubmitMail{

    subject: string
    body:string

}

export interface MailAdapter{

    sendMail: (data:SubmitMail)=> Promise<void>

}