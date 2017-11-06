//const 常量
const colorMap = {
	"Black" : "\x1b[30m",
	"Red" : "\x1b[31m",
	"Green" : "\x1b[32m",
	"Yellow" : "\x1b[33m",
	"Blue" : "\x1b[34m",
	"Magenta" : "\x1b[35m",
	"Gyan" : "\x1b[36m",
	"White" : "\x1b[37m",
}
//for-in会遍历原型上的属性
let colors = (function(){
	let result = []
	Object.keys(colorMap).forEach((key) => {
		result.push(colorMap[key])
	})
	return result
})()

function pickRandomColor(){
	//[0,1)
	let index = parseInt(Math.random() * colors.length)+1
	return colors[index]
}

//common.js规范
module.exports = {
	//es6语法
	colorLog: function(...args){
		let color = pickRandomColor()
		console.log(color, ...args)
	}
}