let colors = require('./color'),
		readline = require('readline'),
		http = require('http');


const API_KEY = 'c2475b613eb54c3396464a93f1023e9a';

const RESPONSE_TYPE = {
	TEXT : 100000,
	LINK : 200000,
	NEWS : 302000,
	COOK : 308000,
}

function initChat(){
	let welcomeMsg = '请开始你的表演';
	Array.prototype.forEach.call(welcomeMsg,(item) => {
		colors.colorLog('----------', item, '----------');
	})


//用 node api readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let name = ''

rl.question('> 请问你叫什么名字: ', (answer) => {
  name = answer
  colors.colorLog('你好,很开心认识你')
  chat()
});

function chat(){
	rl.question("> 我要说: ", (query) => {
		if (!query) {
			colors.colorLog('下次再见')
			//退出进程
			process.exit(0)
		}
		//调用图灵机器人api  使用node  http.request()
		let req = http.request({
			hostname: 'www.tuling123.com',
		  path: '/openapi/api',
		  method: 'POST',
		  headers: {
			  'Content-Type': 'application/json',
			}
		},(res) => {
			let data = ''
			res.on('data',(chunk) => {
				data += chunk
			})

			res.on('end',() => {
				colors.colorLog(handleResponse(data))
				chat()
			})
		})

		req.write(JSON.stringify({
			key: API_KEY,
			info: query,
			userid: name,
		}))

		req.end()

	});
}

function handleResponse(data){
	// console.log(data,typeof data)
	let res = JSON.parse(data)
	switch(res.code) {
		case RESPONSE_TYPE.TEXT:
			return res.text;

		case RESPONSE_TYPE.LINK:
			return `${res.text} : ${res.url}`;

		case RESPONSE_TYPE.NEWS:
			let listInfo = '';
			(res.list || []).forEach((item) => {
				listInfo += `\n文章: ${item.artical}\n来源: ${item.source}\n链接: ${item.detailurl}`
			})
			return `${res.text}\n${listInfo}`;

		// case RESPONSE_TYPE.COOK:
		// 	let list = res.list[0]
		// 	let listCook = `${list.name}`;
		// 	return `${res.text}\n${listCook}`

		default :
			return res.text
	}
}

}

module.exports = initChat