import { default as axios } from 'axios';
import { read } from 'fs';

export class StudioMonitor {
	private version: string;

	private ip: string;
	private port: number;
	private sources: Sources;
	private config: Config;

	constructor(ipAddress: string, port: number = 81, ready: () => void) {
		this.version = '/v1';

		this.ip = ipAddress;
		this.port = port;

		this.getConfigData().then((config: Config) => {
			this.config = config;

			this.getSourcesData()
				.then((sources: Sources) => {
					this.sources = sources;

					ready();
				})
				.catch(console.log);
		});
	}

	private getSourcesData() {
		var _this = this;
		var promise = new Promise(function(resolve, reject) {
			axios
				.get(`http://${_this.ip}:${_this.port}${_this.version}/sources`)
				.then((response) => {
					resolve(response.data);
				})
				.catch(reject);
		});
		return promise;
	}

	private getConfigData() {
		var _this = this;
		var promise = new Promise(function(resolve, reject) {
			axios
				.get(`http://${_this.ip}:${_this.port}${_this.version}/configuration`)
				.then((response) => {
					resolve(response.data);
				})
				.catch(reject);
		});
		return promise;
	}

	getSources(sourceType: string = 'ndi_sources') {
		if (sourceType != undefined)
			if (this.sources[sourceType] != undefined) return this.sources[sourceType];
			else return null;
		else return this.sources;
	}

	setSource(sourceName) {
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

		axios
			.post(`http://${this.ip}:${this.port}${this.version}/configuration`, JSON.stringify(setConfig))
			.then((response) => {
				console.log(response.data);
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
