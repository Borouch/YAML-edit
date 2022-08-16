import { TFile, TAbstractFile } from "obsidian";
import YAMLEditPlugin from "./main";
import { Frontmatter } from "./Frontmatter";
import IYamlEdit from "./IYamlEditApi";
import { getFileFromTFileOrPath } from "./Helpers";
import YamlEditApi from "./YamlEditApi";
export default class YamlEditApiExpose {
	constructor(private plugin: YAMLEditPlugin) {}

	public expose = () => {
		return { getYamlEditApi: this.getYamlEditApi };
	};

	private getYamlEditApi = async (file: TFile | string): Promise<IYamlEdit | null> => {
		const targetFIle = getFileFromTFileOrPath(file, this.plugin);
		if (file instanceof TAbstractFile) {
			const api = new YamlEditApi(this.plugin, targetFIle!);
			await api.initFrontmatter()
			return {
				get: api.get,
				set: api.set,
				contains: api.contains,
				update: api.update,
			};
		} else return null;
	};
}
