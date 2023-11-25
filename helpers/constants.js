const NAME_REGEX = /^[a-zA-Z0-9_](?:[a-zA-Z0-9_.-]{1,18}[a-zA-Z0-9_])?$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;
const PHONE_REGEX = /^\+?\d[\d ()-]{5,14}\d$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d.,-]*$/;

module.exports = { NAME_REGEX, EMAIL_REGEX, PHONE_REGEX, PASSWORD_REGEX };
