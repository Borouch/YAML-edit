import { TFile } from "obsidian";
import YAMLEdit from "./main";
import { Frontmatter } from "./Frontmatter";
import IYamlEditApi from "./IYamlEditApi";
export default class YamlEditapi {
	public frontmatter: Frontmatter;
	constructor(private plugin: YAMLEdit) {}

	public expose = (): IYamlEditApi => {
		return { getFrontmatter: this.getFrontmatter, update: this.update };
	};

	private getFrontmatter = async (
		file: TFile | string
	): Promise<Frontmatter | null> => {
		const targetFile = this.getFileFromTFileOrPath(file);
		if (targetFile instanceof TFile) {
			const fileContents =
				(await this.plugin.app.vault.read(targetFile)) || "";
			const lines = fileContents.split("\n");
			this.frontmatter = new Frontmatter(lines);
			return this.frontmatter;
		}
		return null;
	};

	/**
	 * Updates file frontmatter
	 * @param replacer callback function (key, value) called recursively on each key/value in source object
	 */

	private update = async (
		file: TFile | string,
		replacer?: (k: string, v: any) => any
	): Promise<void> => {
		this.frontmatter.overwrite(replacer);
		const targetFile = this.getFileFromTFileOrPath(file);
		if (targetFile instanceof TFile) {
			const lines = this.frontmatter.lines;
			this.plugin.app.vault.modify(targetFile, lines.join("\n"));
		}
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
