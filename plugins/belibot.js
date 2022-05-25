let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
	conn.send3ButtonLoc(m.chat, await (await fetch(fla + 'sewa bot')).buffer(), `
┌─── 〔 𝗕 𝗘 𝗟 𝗜  𝗕 𝗢 𝗧 〕 ───
❍ Allomypren, Nah ini Harga beli nya👋
╔═══════════════════
║╭─❉ 「 𝗗𝗢𝗡𝗔𝗦𝗜 𝗢𝗪𝗡𝗘𝗥 」 ❉───
║│➸ *DANA* : _*CHAT OWNER*_
║│➸ *PULSA*: _*CHAT OWNER*_
║│➸ *GOPAY*: _*CHAT OWNER*_
║╰──────────────────
╠══════════════════
║╭──❉ 「 𝗟𝗜𝗦𝗧 𝗛𝗔𝗥𝗚𝗔 」 ❉─────
║│➸ 𝗧𝗔𝗡𝗬𝗔𝗞𝗔𝗡 𝗞𝗘 𝗢𝗪𝗡𝗘𝗥𝗡𝗬𝗔
║│➸ 𝙊𝙒𝙉𝙀𝙍 @${global.owner[0]} 
║╰──────────────────    
╠══════════════════
║   𝗧𝗲𝗿𝘁𝗮𝗿𝗶𝗸 𝘂𝗻𝘁𝘂𝗸 𝗯𝗲𝗹𝗶 𝗯𝗼𝘁
║   𝗞𝗲𝘁𝘂𝗸 𝘁𝗼𝗺𝗯𝗼𝗹 𝗱𝗶𝗯𝗮𝘄𝗮𝗵
╠══════════════════
║╭─────────────────
║│ ©𝟮𝟬𝟮𝟭 𝗥𝗽𝗴 𝘄𝗮𝗯𝗼𝘁-𝗮𝗾
║│ 𝗦𝗰𝗿𝗶𝗽 𝗼𝗿𝗶𝗴𝗶𝗻𝗮𝗹 𝗯𝘆 𝗡𝘂𝗿𝘂𝘁𝗼𝗺𝗼
║╰──────────────────
╰═══〘 ${namabot} 〙 ══
`.trim(), footer, 'Dana', '#viadana', 'OVO', '#viaovo', 'Pulsa', '#viapulsa', m)
}

handler.command = /^beli(bot)$/i

module.exports = handler
