# StudioMonitor-API
This is simple API you can use to control a NDI Tools Studio Monitor. Studio Monitor is a free multi NDI Player that's includes in [NDI Tools](https://ndi.tv/tools/).

## Usage
1. Install the package using `npm install studiomonitor-api`
2. Import the module into your file with `const { StudioMonitor } = require("studiomonitor-api");`
3. Create a new instance of the StudioMonitor API with `var monitor = new StudioMonitor("127.0.0.1", 81)`

## Example
````
const { StudioMonitor } = require("studiomonitor-api");

var monitor = new StudioMonitor("127.0.0.1", 81, ready)

function ready(){
    var sources = monitor.getSources();

    console.log("Sources:", sources)

    if (sources.length > 0) monitor.setSource(sources[i])
}
````

## Documentation
### new StudioMonitor( [ipAddress] , [port] , [readyCallback] ) 
Create a new instance of the StudioMonitor API
|Argument|Description
|-|-|
|ipAddress|The IP address of the StudioMonitor|
|port|The port of the StudioMonitor.|
|readyCallback|Function that will be called when the API is ready.|

### StudioMonitor.getSources() -> string[]
Get a list of all available NDI sourxces.

### StudioMonitor.setSource([sourceName])
Set the current NDI source.
|Argument|Description
|-|-|
|sourceName|The name of the NDI Source|
