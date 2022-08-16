import {Plugin } from 'obsidian';
import IYamlEditApi from './IYamlEditApi';
import YamlEditApiExpose from './YamlEditApiExpose';

export default class YamlEditPlugin extends Plugin {
	public api: IYamlEditApi | null
	async onload(): Promise<void> {
		this.api = new YamlEditApiExpose(this).expose()
	}

	onunload() {

	}



}
