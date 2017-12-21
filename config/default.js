module.exports = {
  port: 3001,
  session: {
    secret: 'sixthrhapsody', //session签名
    key: 'sixthrhapsody', //返回客户端的key的名称，默认为connect.sid,也可以自己设置
    maxAge: 1200000 //session过期时间(单位:ms)
  },
  mysql: {
    database: 'bh_amsdb',
    username: 'sixthrhapsody',
    password: '123456',
    host: '127.0.0.1',
    port: 3306
  },
  aes: {
    algorithm: 'aes-256-cbc', //加密规则
    key: `)O[NB]6,YF}+efcaj{+oESb9d8>Z'e9M`, //加密密钥
    iv: 'L+\\~f4,Ir)b$=pkf', //加密向量
    clearEncoding: 'utf8', //加密格式
    cipherEncoding: 'binary',
    declearEncoding: 'utf8',
    decipherEncoding: 'base64'
  },
  defaultConf: {
    addRoleId:2,
    lastEmail:'@xxx.com'
  }
}