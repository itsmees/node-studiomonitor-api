# StudioMonitor-API
This is simple API you can use to control a NDI Tools Studio Monitor. Studio Monitor is a free multi NDI Player that's includes in [NDI Tools](https://ndi.tv/tools/).

## Usage
1. Install the package using `npm install studiomonitor-api`
2. Import the module into your file with `const { StudioMonitor } = require("studiomonitor-api");`
3. Create a new instance of the StudioMonitor API with `var monitor = new StudioMonitor("127.0.0.1", 81)`

## Example
````javascript
const { StudioMonitor } = require('studiomonitor-api');

var monitor = new StudioMonitor('127.0.0.1', 81, ready);

function ready() {
	monitor
		.getSources()
		.then((sources) => {
			console.log('Sources:', sources);

			if (sources.length > 0) {
				monitor.setSource(sources[i]).then(() => console.log('Set source')).catch(console.error);
			}
		})
		.catch(console.error);
}

````

## Documentation
### new StudioMonitor( [ipAddress] , [port] , [readyCallback] ) 
Create a new instance of the StudioMonitor API
|Argument|Type|Description
|-|-|-|
|ipAddress|String|The IP address of the StudioMonitor|
|port|Number|The port of the StudioMonitor.|
|readyCallback|Function|Function that will be called when the API is ready.|

### StudioMonitor.getSources() -> Promise<string[]>
Get a list of all available NDI sources.

### StudioMonitor.setSource( [sourceName] ) -> Promise<void>
Set the current NDI source.
|Argument|Type|Description
|-|-|-|
|sourceName|String|The name of the NDI Source|

### StudioMonitor.setRecording( [state] ) -> Promise<void>
Set the recording state of the StudioMonitor.
|Argument|Type|Description
|-|-|-|
|state|Boolean|Start/stop recording |


### StudioMonitor.isRecording( [state] ) -> Promise<boolean>
Get the recording state of the StudioMonitor.


## Todo
* Add more missing functions