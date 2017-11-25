module.exports = {
    port: 3000,
    session: {
      secret: 'amsdb',
      key: 'amsdb',
      maxAge: 2592000000
    },
    mysql:{
      database:'bh_amsdb',
      username:'sixthrhapsody',
      password:'sixthrhapsody',
      host:'127.0.0.1',
      port:3306
    },
    aes:{
      algorithm:'aes-256-cbc',
      key:`)O[NB]6,YF}+efcaj{+oESb9d8>Z'e9M`,
      iv:'L+\\~f4,Ir)b$=pkf',
      clearEncoding:'utf8',
      cipherEncoding:'binary',
      declearEncoding:'utf8',
      decipherEncoding:'base64'
    }
  }