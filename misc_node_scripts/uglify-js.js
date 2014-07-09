var UglifyJS = require('uglify-js');
var fs = require('fs');
var arg = process.argv[2],
  cwd = process.cwd() + "/";

var result = UglifyJS.minify(cwd + arg, {
	mangle: true,
	compress: {
		sequences: true,
		dead_code: true,
		conditionals: true,
		booleans: true,
		unused: true,
		if_return: true,
		join_vars: true,
		drop_console: true
	}
});

fs.writeFileSync(cwd + arg.split(".")[0] + ".min.js", result.code);