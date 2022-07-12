import { default as axios } from 'axios';

export class StudioMonitor {
	private version: string;

	private ip: string;
	private port: number;
	private sources: Sources;
	private config: Config;

	constructor(ipAddress: string, port: number = 81, ready: (err?: Error) => void) {
		this.version = '/v1';

		this.ip = ipAddress;
		this.port = port;

		this.getConfigData()
			.then((config: Config) => {
				this.config = config;

				this.updateSourcesData()
					.then(() => ready())
					.catch((error) => ready(new Error('Unable to find StudioMonitor at ${this.ip}:${this.port}')));
			})
			.catch((error) => ready(new Error('Unable to find StudioMonitor at ${this.ip}:${this.port}')));
	}

	updateSourcesData(): Promise<void> {
		var _this = this;
		return new Promise(function(resolve, reject) {
			axios
				.get(`http://${_this.ip}:${_this.port}${_this.version}/sources`)
				.then((response) => {
					_this.sources = response.data;
					resolve();
				})
				.catch(reject);
		});
	}

	private getConfigData() {
		var _this = this;
		return new Promise(function(resolve, reject) {
			axios
				.get(`http://${_this.ip}:${_this.port}${_this.version}/configuration`)
				.then((response) => {
					resolve(response.data);
				})
				.catch(reject);
		});
	}

	getSources(sourceType: string = 'ndi_sources'): Promise<string[]> {
		var _this = this;
		return new Promise((resolve, reject) => {
			this.updateSourcesData()
				.then(() => {
					if (sourceType != undefined)
						if (_this.sources[sourceType] != undefined) resolve(_this.sources[sourceType]);
						else reject(new Error('Source type does not exist'));
					else return _this.sources;
				})
				.catch(() => {
					reject(new Error('Unable to update sources'));
				});
		});
	}

	setSource(sourceName): Promise<void> {
		var _this = this;
		return new Promise((resolve, reject) => {
			this.updateSourcesData()
				.then(() => {
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

					axios
						.post(
							`http://${_this.ip}:${_this.port}${_this.version}/configuration`,
							JSON.stringify(setConfig)
						)
						.then((response) => {
							resolve();
						})
						.catch((error) => {
							reject(new Error(`Unable to reach StudioMonitor at ${_this.ip}:${_this.port}`));
						});
				})
				.catch(() => {
					reject(new Error('Unable to update sources'));
				});
		});
	}

	setRecording(state: boolean): Promise<void> {
		var _this = this;
		return new Promise((resolve, reject) => {
			axios
				.post(
					`http://${_this.ip}:${_this.port}${_this.version}/recording`,
					JSON.stringify({
						recording: state
					})
				)
				.then((response) => {
					resolve();
				})
				.catch((error) => {
					reject(new Error(`Unable to reach StudioMonitor at ${_this.ip}:${_this.port}`));
				});
		});
	}

	isRecording(): Promise<boolean> {
		var _this = this;
		return new Promise(function(resolve, reject) {
			axios
				.get(`http://${_this.ip}:${_this.port}${_this.version}/recording`)
				.then((response) => {
					resolve(response.data.recording);
				})
				.catch((error) => {
					reject(new Error(`Unable to reach StudioMonitor at ${_this.ip}:${_this.port}`));
				});
		});
	}
}

type MainData = {
	selectedIP?: string;
	sources?: Sources;
	config?: Config;
};

type Sources = {
	audio_devices: string[];
	controllers: any[];
	display_devices: string[];
	ndi_sources: string[];
	studio_monitors: { [name: string]: string };
};

type Config = {
	audio_output: string;
	decorations: { [key: string]: boolean };
	NDI_overlay: string;
	NDI_source: string;
	PTZ_controller: string;
	record_path: string;
	version: number;
	window: { [key: string]: boolean };
};
