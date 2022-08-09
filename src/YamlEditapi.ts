import { TFile } from "obsidian";
import YAMLEdit from "./main";
import { Frontmatter } from './Frontmatter';
import IYamlEditApi from './IYamlEditApi';
export default class YamlEditapi {
	constructor(private plugin: YAMLEdit) {}

	public expose=():IYamlEditApi=> {
		return {getFrontmatter: this.getFrontmatter};
	}

	private getFrontmatter = async(file: TFile | string): Promise<Frontmatter|null> => {
        const targetFile = this.getFileFromTFileOrPath(file)
        if(targetFile instanceof TFile){
            const fileContents = (await this.plugin.app.vault.read(targetFile)) || ''
            const lines = fileContents.split('\n')
            return new Frontmatter(lines)
        }
        return null
    };

	private getFileFromTFileOrPath = (file: TFile | string) => {
		let targetFile: TFile;

		if (file instanceof TFile) targetFile = file;

		if (typeof file === "string") {
			const abstractFile =
				this.plugin.app.vault.getAbstractFileByPath(file);
			if (abstractFile instanceof TFile) {
				targetFile = abstractFile;
			}
		}

		return targetFile;
	};
}
