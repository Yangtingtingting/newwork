// 手机号校验
export function phone_reg(phone) {
    return /^1[3456789]\d{9}$/.test(phone)
}
// 8到16位数字与密码组合的密码
export function password_reg(password) {
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(password)
}