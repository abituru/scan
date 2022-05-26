let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `
╭───◪ 〔 ${namabot} 〕 
⬡ ${ucapan()}
⬡ Allo mypren👋
╰────────⬣
╭───◪ 〔  𝙇 𝙄 𝙈 𝙄 𝙏  〕
┃⬡ Tersisa *%limit Limit*
┃⬡ Role *%role*
┃⬡ Level *%level (%exp / %maxexp)* 
┃⬡ [%xp4levelup]
┃⬡ %totalexp XP secara Total
╰────────⬣
╭───◪ 〔 𝙏𝙄𝙈𝙀 𝘼𝙉𝘿 𝘿𝘼𝙏𝙀 〕
┃⬡ Hari : *%week %weton* 
┃⬡ Tanggal : *%date*
┃⬡ Tanggal Islam : *%dateIslamic*
┃⬡ Waktu: *%time*
╰────────⬣
╭───◪ 〔  𝘿𝘼𝙏𝘼𝘽𝘼𝙎𝙀  〕
┃⬡ Uptime: *%uptime (%muptime)*
┃⬡ Database: %rtotalreg dari %totalreg 
╰────────⬣

────֍ 〔 𝗙𝗜𝗧𝗨𝗥 𝗕𝗢𝗧 〕 ֍────

`
.trimStart(),
  header: '╭─֍ 〔 %category 〕 ֍─',
  body: '┃⬡ %cmd %islimit %isPremium',
  footer: '╰────────֍\n',
  footerText:'ZxyuuBotz', 
  after: `${namabot}
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
	let bzz = fs.readFileSync('./vn/kri.mp3')
	let bzz2 = fs.readFileSync('./vn/itskri.mp3')
    let totaljadibot = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'edukasi', 'news', 'nsfw', 'xp', 'stiker', 'image', 'anime', 'kerangajaib', 'quotes', 'admin', 'rpg', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'vote', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': '𝙐𝙏𝘼𝙈𝘼',
    'game': '𝙂𝘼𝙈𝙀',
    'xp': '𝙀𝙓𝙋 & 𝙇𝙄𝙈𝙄𝙏',
    'nsfw': `𝙉𝙎𝙁𝙒 ${global.opts['nsfw'] ? '' : '(Dinonaktifkan)'}`,
    'sticker': '𝙎𝙏𝙄𝙆𝙀𝙍',
    'edukasi': '𝙀𝘿𝙄𝙆𝙐𝙎𝙄',
    'news': '𝙉𝙀𝙒𝙎',
    'kerang': '𝙆𝙀𝙍𝘼𝙉𝙂 𝘼𝙅𝘼𝙄𝘽',
    'quotes': '𝙌𝙐𝙊𝙏𝙀𝙎',
    'admin': `𝘼𝘿𝙈𝙄𝙉 ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'rpg': '𝙀𝙋𝙄𝘾 𝙍𝙋𝙂',
    'group': '𝙂𝙍𝙐𝘽',
    'anime': '𝘼𝙉𝙄𝙈𝙀',
    'premium': '𝙋𝙍𝙀𝙈𝙄𝙐𝙈',
    'internet': '𝙄𝙉𝙏𝙀𝙍𝙉𝙀𝙏',
    'image': '𝙍𝘼𝙉𝘿𝙊𝙈 𝙄𝙈𝘼𝙂𝙀',
    'anonymous': '𝘼𝙉𝙊𝙉𝙔𝙈𝙊𝙐𝙎 𝘾𝙃𝘼𝙏',
    'nulis': '𝙈𝘼𝙂𝙀𝙍𝙉𝙉𝙐𝙇𝙄𝙎 & 𝙇𝙊𝙂𝙊',
    'downloader': '𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍',
    'tools': '𝙏𝙊𝙊𝙇𝙎',
    'fun': '𝙁𝙐𝙉',
    'database': '𝘿𝘼𝙏𝘼𝘽𝘼𝙎𝙀',
    'vote': '𝙑𝙊𝙏𝙄𝙉𝙂',
    'absen': '𝘼𝘽𝙎𝙀𝙉',
    'quran': '𝙄𝙎𝙇𝘼𝙈',
    'audio': '𝙋𝙀𝙉𝙂𝙐𝘽𝘼𝙃 𝙎𝙐𝘼𝙍𝘼',
    'jadibot': '𝙅𝘼𝘿𝙄 𝘽𝙊𝙏',
    'info': '𝙄𝙉𝙁𝙊',
    '': '𝙏𝘼𝙉𝙋𝘼 𝙆𝘼𝙏𝙀𝙂𝙊𝙍𝙄',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'nsfw') tags = {
    'hentai': 'Hentai',
    'bokep': 'Bokep'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Epic Rpg'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'image') tags = {
    'image': 'Random Image'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
    if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'quran') tags = {
    'quran': 'Islam'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
			return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
                    "listMessage":  {
                        "title": `${ucapan()}
_*HAI NGNTD*_👋, ${name}`.trim(),
          "description": `
┏━━〔 𝙎 𝙏 𝘼 𝙏 𝙐 𝙎 〕━֍
┃⬣ Aktif selama *${uptime}*
┃⬣ Baterai *${conn.battery != undefined ? `${conn.battery.value}% ${conn.battery.live ? '🔌 pengisian' : ''}` : 'tidak diketahui'}*
┃⬣ *${Object.keys(global.db.data.users).length}* Pengguna
┃⬣ *${totaljadibot.length}* Jadibot
┃⬣ *${conn.blocklist.length}* Terblock
┃⬣ *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Chat Terbanned
┃⬣ *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Pengguna Terbanned
┗━━━━━━━━━━━━━━֍
┏━━〔 MASUK GC LAH 〕━֍
┃⬣ GC : https://chat.whatsapp.com/ItgtoArOdVD46P7S9cA179
┗━━━━━━━━━━━━━━֍`.trim(),
                        "footerText": "ZxyuuRomz/XzyuuNai",
                        "buttonText": "Klick Disini ANJG🗿",
                        "listType": "SINGLE_SELECT",
                        "sections": [
                            {
                                
                                "rows": [{
                                    "title": `[ ☇ ] Semua Perintah ZxyuuBotz`,
									"description": "✓ ZxyuuBotz",
									"rowId": ".? all"
								}, {
									"title": "[ ☇ ] Menu Islam🕋",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? quran"
								}, {
									"title": "[ ☇ ] Menu Edukasi🏫",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? edukasi"
								}, {
									"title": "[ ☇ ] Menu News",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? News"
								},  {
									"title": "[ ☇ ] Menu Game🗿",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? game"
								}, {
									"title": "[ ☇ ] Menu Rpg 🗺",
									"description": "✓ Zxyuubotz",
									"rowId": ".? rpg"
								}, {
									"title": "[ ☇ ] Menu Xp🗿",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? xp"
								},  {
									"title": "[ ☇ ] Menu Nswf🛇",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? nsfw"
								}, {
									"title": "[ ☇ ] Random Image😅",
									"description": "✓ 𝙈𝙚𝙣𝙪 𝙁𝙤𝙩𝙤 𝙍𝙖𝙣𝙙𝙤𝙢 𝘿𝙞 ZxyuuBotz",
									"rowId": ".? image"
							}, {
									"title": "[ ☇ ] Menu Sticker😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? stiker"
								}, {
									"title": "[ ☇ ] Kerang Ajaib🐚",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? kerangajaib"
								}, {
									"title": "[ ☇ ] Menu Qoutes 😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? quotes"
								}, {
									"title": "[ ☇ ] Menu Admin😅",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? admin"
								}, {
									"title": "[ ☇ ] Menu Grup🏣",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? grup"
								}, {
									"title": "[ ☇ ] Menu Khusus Preemium😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? premium"
								}, {
									"title": "[ ☇ ] Menu Internet😅",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? internet"
								}, {
									"title": "[ ☇ ] Menu Anonymous🥶👆🏻",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? anonymous"
								}, {
									"title": "[ ☇ ] Menu Nilus & Logo 😅",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? nulis"
								}, {
									"title": "[ ☇ ] Menu Download😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? downloader"
								}, {
									"title": "[ ☇ ] Menu Tools😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? tools"
								}, {
									"title": "[ ☇ ] Menu Fun 😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? fun"
								}, {
									"title": "[ ☇ ] Menu Database😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? database"
								}, {
									"title": "[ ☇ ] Menu vote & Absen😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? vote"
								}, {
									"title": "[ ☇ ] Ubah Suara Lu Banh😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? audio"
								}, {
									"title": "[ ☇ ] Menu Jadibot😠",
									"description": "✓ ZxyuuBots",
									"rowId": ".? jadibot"
								}, {
									"title": "[ ☇ ] Menu Animek Krinj😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? anime"
								}, {
									"title": "[ ☇ ] Menu Ingpo😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? info"
								}, {
									"title": "[ ☇ ]Tanpa Kategori😅👆",
									"description": "✓ ZxyuuBotz",
									"rowId": ".? tanpakategori"
								}, {
									"title": "[ ☇ ] Owner 😅👆",
									"description": "✓ 𝙈𝙚𝙣𝙪 𝙆𝙝𝙪𝙨𝙪𝙨 ZxyuuBotz",
									"rowId": ".? owner"
                                }],
                                "title": "──────────────❲  ᗩᒪᒪ ᗰEᑎᑌ  ❳──────────────"
                            }, {
								"rows": [{
                                    "title": "[ ☇ ] Status Botz😅👆",
                                    "description": "✓ ZxyuuBotz",
                                    "rowId": ".botstatus"
                                }, {
                                    "title": "[ ☇ ] Rules Banh 😅👆",
                                    "description": "✓ ZxyuuBotz",
                                    "rowId": ".rules"
                                }, {
                                    "title": "[ ☇ ] Sewa Bot Gwehj Banh😅👆",
                                    "description": "✓ ZxyuuBotz",
                                    "rowId": ".sewabot"
								}, {	
                                    "title": "[ ☇ ] Owner Bot 😅👆",
                                    "description": "✓ ZxyuuBotz",
                                    "rowId": ".owner"
                                }, {
                                    "title": "[ ☇ ] Donasi ngap 😅👆",
                                    "description": "✓ ZxyuuBotz",
                                    "rowId": ".donasi"
                                }, {
                                    "title": "PENUTUP",
                                    "description": "✓ 𝙏𝙚𝙧𝙞𝙢𝙖𝙠𝙖𝙨𝙞𝙝 𝙪𝙣𝙩𝙪𝙠 𝙪𝙨𝙚𝙧 𝙮𝙖𝙣𝙜 𝙩𝙚𝙡𝙖𝙝 𝙢𝙚𝙣𝙜𝙜𝙪𝙣𝙖𝙠𝙖𝙣 𝙗𝙤𝙩, 𝙟𝙞𝙠𝙖 𝙖𝙙𝙖 𝙠𝙚𝙨𝙖𝙡𝙖𝙝𝙖𝙣 𝙖𝙩𝙖𝙪 𝙥𝙚𝙧𝙢𝙞𝙣𝙩𝙖𝙖𝙣 𝙗𝙞𝙨𝙖 𝙘𝙝𝙖𝙩 𝙠𝙚 𝙣𝙤𝙢𝙤𝙧 𝙤𝙬𝙣𝙚𝙧",
                                    "rowId": ".owner"
                                }, {
                                    "title": "MAKASIH😅👆",
                                    "description": "✓ Romli Suhanda😅👆",
                                    "rowId": ".tqto"
                                }],
                                "title": "──────────────❲ ᑭEᑎᑌTᑌᑭ ❳──────────────"
                            }
                        ], "contextInfo": 
						{ "stanzaId": m.key.id,
                        "participant": "0@s.whatsapp.net",
                        "remoteJid": "6283136505591-1614953337@g.us",
                        "quotedMessage": m.message
						}
                    }
                 }, {}), {waitForAck: true})
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // ┌〔 DAFTAR MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} kerang
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} tanpa kategori
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send3ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), `Creator by by ᴹᴿ𝙄𝙩𝙨𝙠𝙧𝙞 ×፝֟͜×\nRuntime: ${uptime}\nHari: ${week}, ${date}\nJangan Call or Spam Bot!!! `, 'Pemilik Bot', `${_p}owner`, 'Sewa Bot', `${_p}sewabot`, 'Rules', `${_p}rules`, m)
   // await conn.send3ButtonLoc(m.chat, await (await fetch(`https://i.ibb.co/fH0hppT/mikey.jpg`)).buffer(), text.trim(), 'Recoded By Dawnfrosty', 'Pemilik Bot', '.owner', 'Donasi', '.donasi', 'Rules', '.rules', m)
    await conn.sendFile(m.chat, bzz, 'bzz.opus', null, m, true)
    await conn.sendFile(m.chat, bzz2, 'bzz2.opus', null, m, true)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['kri', 'menu', 'help']
handler.tags = ['main']
handler.command = /^(\?|menu|help)$/i

handler.register = false

module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "*Dinihari Ngab*👻"
  if (time >= 4) {
    res = "*Pagi Ngab*🌤"
  }
  if (time > 10) {
    res = "*Siang Ngab*🌞"
  }
  if (time >= 15) {
    res = "*Sore Ngab*🌝"
  }
  if (time >= 18) {
    res = "*Malam Ngab*🌚"
  }
  return res
}
