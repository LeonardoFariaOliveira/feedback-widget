import { Router } from 'express'
import { SubmitFeedback } from './utils/submitFeedback';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodeMailerAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

const routes = Router()



routes.post('/create', async (req, res)=> {

  const {type,  comment, screenshot} = req.body
  const prismaFeedbackRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodeMailerAdapter()

  const submitFeedback = new SubmitFeedback(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  )

  await submitFeedback.create({type,  comment, screenshot})

  return res.status(201).json({
    msg:"Ok"
  })

})

routes.get('/status', (req, res) => {
    res.status(200).json({
      status: 'OK',
    })
  })
  
export default routes