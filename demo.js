const { StudioMonitor } = require('.');

var monitor = new StudioMonitor('127.0.0.1', 81, ready);

function ready() {
	var sources = monitor.getSources();

	console.log('Sources:', sources);

	if (sources.length > 0) monitor.setSource(sources[i]);
}
