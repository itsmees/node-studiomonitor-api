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
        this.getConfigData()
            .then(function (config) {
            _this_1.config = config;
            _this_1.updateSourcesData()
                .then(function () { return ready(); })["catch"](function (error) { return ready(new Error('Unable to find StudioMonitor at ${this.ip}:${this.port}')); });
        })["catch"](function (error) { return ready(new Error('Unable to find StudioMonitor at ${this.ip}:${this.port}')); });
    }
    StudioMonitor.prototype.updateSourcesData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1["default"]
                .get("http://" + _this.ip + ":" + _this.port + _this.version + "/sources")
                .then(function (response) {
                _this.sources = response.data;
                resolve();
            })["catch"](reject);
        });
    };
    StudioMonitor.prototype.getConfigData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1["default"]
                .get("http://" + _this.ip + ":" + _this.port + _this.version + "/configuration")
                .then(function (response) {
                resolve(response.data);
            })["catch"](reject);
        });
    };
    StudioMonitor.prototype.setConfigData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1["default"]
                .post("http://" + _this.ip + ":" + _this.port + _this.version + "/configuration", JSON.stringify(_this.config))
                .then(function (response) {
                resolve(response.data);
            })["catch"](reject);
        });
    };
    StudioMonitor.prototype.getSources = function (sourceType) {
        var _this_1 = this;
        if (sourceType === void 0) { sourceType = 'ndi_sources'; }
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this_1.updateSourcesData()
                .then(function () {
                if (sourceType != undefined)
                    if (_this.sources[sourceType] != undefined)
                        resolve(_this.sources[sourceType]);
                    else
                        reject(new Error('Source type does not exist'));
                else
                    return _this.sources;
            })["catch"](function () {
                reject(new Error('Unable to update sources'));
            });
        });
    };
    StudioMonitor.prototype.setSource = function (sourceName) {
        var _this_1 = this;
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this_1.updateSourcesData()
                .then(function () {
                var setConfig = {
                    version: 1
                };
                var sourceType = 'NDI_source';
                setConfig[sourceType] = sourceName;
                _this.config[sourceType] = sourceName;
                if (sourceName === 'None') {
                    setConfig[sourceType] = '';
                    _this.config[sourceType] = 'None';
                }
                axios_1["default"]
                    .post("http://" + _this.ip + ":" + _this.port + _this.version + "/configuration", JSON.stringify(setConfig))
                    .then(function (response) {
                    resolve();
                })["catch"](function (error) {
                    reject(new Error("Unable to reach StudioMonitor at " + _this.ip + ":" + _this.port));
                });
            })["catch"](function () {
                reject(new Error('Unable to update sources'));
            });
        });
    };
    StudioMonitor.prototype.setRecording = function (state) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1["default"]
                .post("http://" + _this.ip + ":" + _this.port + _this.version + "/recording", JSON.stringify({
                recording: state
            }))
                .then(function (response) {
                resolve();
            })["catch"](function (error) {
                reject(new Error("Unable to reach StudioMonitor at " + _this.ip + ":" + _this.port));
            });
        });
    };
    StudioMonitor.prototype.isRecording = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios_1["default"]
                .get("http://" + _this.ip + ":" + _this.port + _this.version + "/recording")
                .then(function (response) {
                resolve(response.data.recording);
            })["catch"](function (error) {
                reject(new Error("Unable to reach StudioMonitor at " + _this.ip + ":" + _this.port));
            });
        });
    };
    StudioMonitor.prototype.setLowLatency = function (state) {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            if (_this_1.config != undefined && _this_1.config.decorations != undefined) {
                _this_1.config.decorations.lowest_latency = state;
                _this_1.setConfigData().then(resolve)["catch"](reject);
            }
            else
                reject(new Error('Unable to set low latency state of StudioMonitor'));
        });
    };
    StudioMonitor.prototype.isLowLatency = function () {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            if (_this_1.config != undefined && _this_1.config.decorations != undefined)
                resolve(_this_1.config.decorations.lowest_latency);
            else
                reject(new Error('Unable to get low latency state of StudioMonitor'));
        });
    };
    StudioMonitor.prototype.setLowBandwidth = function (state) {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            if (_this_1.config != undefined && _this_1.config.decorations != undefined) {
                _this_1.config.decorations.low_bandwidth = state;
                _this_1.setConfigData().then(resolve)["catch"](reject);
            }
            else
                reject(new Error('Unable to set low bandwidth state of StudioMonitor'));
        });
    };
    StudioMonitor.prototype.isLowBandwidth = function () {
        var _this_1 = this;
        return new Promise(function (resolve, reject) {
            if (_this_1.config != undefined && _this_1.config.decorations != undefined)
                resolve(_this_1.config.decorations.low_bandwidth);
            else
                reject(new Error('Unable to get low bandwidth state of StudioMonitor'));
        });
    };
    return StudioMonitor;
}());
exports.StudioMonitor = StudioMonitor;
//# sourceMappingURL=StudioMonitor.js.map