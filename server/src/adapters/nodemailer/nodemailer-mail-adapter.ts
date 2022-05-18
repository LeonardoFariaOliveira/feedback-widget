import { MailAdapter, SubmitMail } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a3ab125ca40bf6",
      pass: "6c2ca5382c2a85"
    }
  });


export class NodeMailerAdapter implements MailAdapter{

async sendMail({subject, body}: SubmitMail){

    await transport.sendMail({
    from:"Equipe Feedback Widget <ola@widget.com>",
    to: 'Leonardo Faria <leonardo.faria@cyberswitch.dev>',
    subject:subject,
    html:body
  })

}

}