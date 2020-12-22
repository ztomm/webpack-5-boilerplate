module.exports = class Utils {

	constructor(){
		this.count = 0;
	}

	getHello() {
		return `hello (${++this.count})`;
	}

	// more utils
	// ...

}
