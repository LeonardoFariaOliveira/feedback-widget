import { MailAdapter } from '../adapters/mail-adapter'
import {FeedbacksRepository} from '../repositories/feedbacks-repository'

interface SubmitFeedbackI{

    type:string
    comment:string
    screenshot?: string

}


export class SubmitFeedback{

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){}

    async create(request:SubmitFeedbackI){
        const {type, comment, screenshot} = request

        if(!type){

            throw new Error('Type is required')

        }
        
        if(!comment){

            throw new Error('Comment is required')

        }
        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format')

        }

        await this.feedbacksRepository.create({

            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({

            subject:'Novo Feedback',
            body:  [
                `<div style = "font-family: sans-serif; font-size:16px; color:#222;">`,
                `Tipo do feedback: ${type}`,
                `Comentario: ${comment}`,
                screenshot? `<img src = '${screenshot}' alt = 'screeshot'`: null,
                `</div>`,
              ].join('\n')

        })



    }
    
    

}