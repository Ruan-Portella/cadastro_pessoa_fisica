import ValidateEmail from "./validateEmail";
import ValidateName from "./validateName";
import ValidatePassword from "./validatePassword";
import ValidateTelephone from "./validateTelephone";
import ValidateProfileImage from "./validateProfileImage";

const validateEmail = new ValidateEmail().validate;
const validateName = new ValidateName().validate;
const validatePassword = new ValidatePassword().validate;
const validateTelephone = new ValidateTelephone().validate;
const validateProfileImage = new ValidateProfileImage().validate;


export default {
    validateEmail,
    validateName,
    validatePassword,
    validateTelephone,
    validateProfileImage,
}