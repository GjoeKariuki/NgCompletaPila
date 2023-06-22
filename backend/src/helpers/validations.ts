
import Joi, {ref} from 'joi'


export const signupSchema = Joi.object(
    {
        uname: Joi.string().required().min(4),
        uemail: Joi.string().required().email().min(10).messages(
            {
                'string.empty':'please add an email',
                'string.email': 'this is not a valid email'   
            }
        ),
        upassword: Joi.string().required().pattern((new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))),
        confirmpassword: Joi.equal(ref('upassword'))
    }
)


export const  loginSchema = Joi.object({
    uemail: Joi.string().required().email().messages({
        'string.empty': "please add an email",
        'string.email': "this is not a valid email"
    }),
    upassword: Joi.string().required()
})