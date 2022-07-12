exports.__esModule = true;
exports.StudioMonitor = void 0;
var axios_1 = require("axios");
var StudioMonitor = /** @class */ (function () {
    function StudioMonitor(ipAddress, port, ready) {
        var _this_1 = this;
        if (port === void 0) { port = 81; }
        this.version = '/v1';
        this.ip = ipAddress;
        this.port = port;
        this.getConfigData().then(function (config) {
            _this_1.config = config;
            _this_1.getSourcesData()
                .then(function (sources) {
                _this_1.sources = sources;
                ready();
            })["catch"](console.log);
        });
    }
    StudioMonitor.prototype.getSourcesData = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            axios_1["default"]
                .get("http://" + _this.ip + ":" + _this.port + _this.version + "/sources")
                .then(function (response) {
                resolve(response.data);
            })["catch"](reject);
        });
        return promise;
    };
    StudioMonitor.prototype.getConfigData = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            axios_1["default"]
                .get("http://" + _this.ip + ":" + _this.port + _this.version + "/configuration")
                .then(function (response) {
                resolve(response.data);
            })["catch"](reject);
        });
        return promise;
    };
    StudioMonitor.prototype.getSources = function (sourceType) {
        if (sourceType === void 0) { sourceType = 'ndi_sources'; }
        if (sourceType != undefined)
            if (this.sources[sourceType] != undefined)
                return this.sources[sourceType];
            else
                return null;
        else
            return this.sources;
    };
    StudioMonitor.prototype.setSource = function (sourceName) {
        var setConfig = {
            version: 1
        };
        var sourceType = 'NDI_source';
        setConfig[sourceType] = sourceName;
        this.config[sourceType] = sourceName;
        if (sourceName === 'None') {
            setConfig[sourceType] = '';
            this.config[sourceType] = 'None';
        }
        axios_1["default"]
            .post("http://" + this.ip + ":" + this.port + this.version + "/configuration", JSON.stringify(setConfig))
            .then(function (response) {
            console.log(response.data);
        });
    };
    return StudioMonitor;
}());
exports.StudioMonitor = StudioMonitor;
//# sourceMappingURL=index.js.map