const { StudioMonitor } = require('./index');

monitor = new StudioMonitor('127.0.0.1', 81, ready);

function ready() {
	monitor
		.getSources()
		.then((sources) => {
			console.log('Sources:', sources);

			if (sources.length > 0) {
				monitor.setSource(sources[0]).then(() => console.log('Set source')).catch(console.error);
			}
		})
		.catch(console.error);
}

setInterval(() => {}, 1000);
