let fetch = require('node-fetch')
let handler = async (m, { conn }) => conn.send2ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), `
*Allo mypren bantu donasi yuk supaya bot aktif selalu👋*
╔═══════════════════
║ _*DONASI UNTUK*_  ZxyuuBotz
╠═══════════════════
║╭──❉ 〔 *𝗗𝗢𝗡𝗔𝗦𝗜* 〕 ❉──────
║│➸ *DANA* : -
║│➸ *PULSA*: 0811224804625
║│➸ *GOPAY*: -
║╰──────────────────
╰═══════════════════

`.trim(), footer, 'Owner', '.owner', 'Menu', '.menu')
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
