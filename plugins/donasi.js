let fetch = require('node-fetch')
let handler = async (m, { conn }) => conn.send2ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), `
*Allo mypren bantu donasi yuk supaya bot aktif selaluπ*
ββββββββββββββββββββ
β _*DONASI UNTUK*_  ZxyuuBotz
β βββββββββββββββββββ
ββ­βββ γ *ππ’π‘ππ¦π* γ βββββββ
βββΈ *DANA* : -
βββΈ *PULSA*: 0811224804625
βββΈ *GOPAY*: -
ββ°ββββββββββββββββββ
β°βββββββββββββββββββ

`.trim(), footer, 'Owner', '.owner', 'Menu', '.menu')
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
