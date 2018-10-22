export function getErrorCode(code) {
  let text;
  switch (code) {
    case 10001:
      text = '服务器错误';
      break;
    case 40001:
      text = '账号或密码错误';
      break;
    case 40002:
      text = '该邮箱已被注册，请使用其他邮箱地址';
      break;
    case 40003:
      text = '密码错误';
      break;
    case 40004:
      text = '该账号已绑定微信';
      break;
    case 40005:
      text = '邮件发送超过限制，请1分钟后重试';
      break;
    case 500:
      text = '服务器错误';
      break;
    default:
      text = '服务器错误';
      break;
  }
  return text;
}
