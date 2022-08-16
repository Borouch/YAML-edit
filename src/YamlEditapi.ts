import { TFile, TAbstractFile } from "obsidian";
import YAMLEditPlugin from "./main";
import { Frontmatter } from "./Frontmatter";
import IYamlEdit from "./IYamlEdit";
import { getFileFromTFileOrPath } from "./Helpers";
import YamlEdit from "./YamlEdit";
export default class YamlEditapi {
	constructor(private plugin: YAMLEditPlugin) {}

	public expose = () => {
		return { getYamlEdit: this.getYamlEdit };
	};

	private getYamlEdit = (file: TFile | string): IYamlEdit | null => {
		const targetFIle = getFileFromTFileOrPath(file, this.plugin);
		if (file instanceof TAbstractFile) {
			return new YamlEdit(this.plugin, targetFIle!);
		} else return null;
	};
}
