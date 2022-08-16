import { Frontmatter } from "./Frontmatter";
import YAMLEditPlugin from "./main";
import { TFile } from "obsidian";
import { getFileFromTFileOrPath } from "./Helpers";
import IYamlEditApi from './IYamlEditApi';

export default class YamlEditApi implements IYamlEditApi{
	private frontmatter: Frontmatter;
	constructor(private plugin: YAMLEditPlugin, private file: TFile) {

	}

	public get = (key: string): any => {
		return this.frontmatter.get(key);
	};

	public set = (key: string, value: any): void => {
		this.frontmatter.set(key, value);
	};

	public contains = (key: string): boolean => {
		return this.frontmatter.contains(key);
	};

	/**
	 * Updates file frontmatter
	 * @param replacer callback function (key, value) called recursively on each key/value in source object
	 */
	public update = async (
		replacer?: (k: string, v: any) => any
	): Promise<boolean> => {
		this.frontmatter.overwrite(replacer);

		const lines = this.frontmatter.lines;
		this.plugin.app.vault.modify(this.file, lines.join("\n"));
		return true;
	};

	public initFrontmatter = async (): Promise<void> => {
		const fileContents =
			(await this.plugin.app.vault.read(this.file)) || "";
		const lines = fileContents.split("\n");
		this.frontmatter = new Frontmatter(lines);

	};
}
