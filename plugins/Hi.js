let fetch = require('node-fetch')
let handler = async (m, { conn }) => conn.send2ButtonLoc(m.chat, await (await fetch(fla + 'ZXYUU BOTZ')).buffer(), `
๐ฎ ๐๐๐๐ ๐๐๐ ๐๐ ๐๐๐๐๐๐ ๐๐ ๐ ๐๐ ๐๐๐๐
โตอกอโช ๐ถ๐ธ๐๐ท๐๐ฑ :-
โตอกอโช ๐๐พ๐ ๐๐๐ฑ๐ด :-
โตอกอโช ๐น๐๐๐๐๐ ๐๐๐๐ ๐๐๐๐๐๐ :-
`.trim(), ' ๐๐ฐ๐ฏ๐ต ๐ง๐ฐ๐ณ๐จ๐ฆ๐ต ๐ต๐ฐ ๐ง๐ฐ๐ญ๐ญ๐ฐ๐ธ ๐ฎ๐บ ๐ข๐ค๐ค๐ฐ๐ถ๐ฏ๐ต', 'Thanks', '.tqto', 'Menu','.menu')
handler.help = ['sourcecode']
-
`.trim(), 'ยฉ ZxyuuBotz', 'Thanks', '.tqto', 'Back','.menu')
handler.help = ['sourcecode']
handler.tags = ['info']
handler.command = /^(sourcecode|sc|scbot|script|github)$/i

module.exports = handler
