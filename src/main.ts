import {Plugin } from 'obsidian';
import IYamlEdit from './IYamlEdit';
import YamlEditapi from './YamlEditapi';

export default class YamlEditPlugin extends Plugin {
	public api: IYamlEdit | null
	async onload(): Promise<void> {
		this.api = new YamlEditapi(this).expose()
	}

	onunload() {

	}



}
