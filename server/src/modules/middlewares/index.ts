import ValidateEmail from "./validateEmail";
import ValidateName from "./validateName";
import ValidatePassword from "./validatePassword";
import ValidateTelephone from "./validateTelephone";
import ValidateProfileImage from "./validateProfileImage";
import ValidateToken from "./validateToken";
import ValidateUser from "./validateUser";

const validateEmail = new ValidateEmail().validate;
const validateName = new ValidateName().validate;
const validatePassword = new ValidatePassword().validate;
const validateTelephone = new ValidateTelephone().validate;
const validateProfileImage = new ValidateProfileImage().validate;
const validateToken = new ValidateToken().validate;
const validateUser = new ValidateUser().validate;


export default {
    validateEmail,
    validateName,
    validatePassword,
    validateTelephone,
    validateProfileImage,
    validateToken,
    validateUser
}