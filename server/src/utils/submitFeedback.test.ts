import { SubmitFeedback } from "./submitFeedback"


const createFeedbackSpy = jest.fn()
const sendFeedbackSpy = jest.fn()

const submitFeedBack = new SubmitFeedback(
    {create: createFeedbackSpy},
    {sendMail:sendFeedbackSpy}
)

describe('submit-feedback', ()=>{
    it('should be able to submit a feedback', async()=>{
        await expect(submitFeedBack.create({
            type:'BUG',
            comment:'example comment',
            screenshot: 'data:image/png;base64, teste'
        })).resolves.not.toThrow()  

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendFeedbackSpy).toHaveBeenCalled()
    })
    it('should not be able send feedback without a type', async()=>{
        expect(submitFeedBack.create({
            type:'',
            comment:'example comment',
            screenshot: 'data:image/png;base64, teste'
        })).rejects.toThrow()
    })

    
    it('should not be able send feedback without a comment', async()=>{
        expect(submitFeedBack.create({
            type:'BUG',
            comment:'',
            screenshot: 'data:image/png;base64, teste'
        })).rejects.toThrow()
    })

    it('should not be able send feedback with a invalid screenshot', async()=>{
        expect(submitFeedBack.create({
            type:'BUG',
            comment:'bug ein',
            screenshot: 'teste.jpg'
        })).rejects.toThrow()
    })
})