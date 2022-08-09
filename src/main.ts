import {Plugin } from 'obsidian';
import IYamlEditApi from './IYamlEditApi';
import YamlEditapi from './YamlEditapi';



export default class YAMLEdit extends Plugin {
	public api: IYamlEditApi
	async onload(): Promise<void> {
		this.api = new YamlEditapi(this).expose()
	}

	onunload() {

	}



}
