import { Frontmatter } from "./Frontmatter";
import YAMLEditPlugin from "./main";
import { TFile } from "obsidian";
import { getFileFromTFileOrPath } from "./Helpers";
import IYamlEdit from './IYamlEdit';

export default class YamlEdit implements IYamlEdit{
	private frontmatter: Frontmatter;

	constructor(private plugin: YAMLEditPlugin, private file: TFile) {
		this.getFrontmatter().then(
			(frontmatter) => (this.frontmatter = frontmatter)
		);
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

	private getFrontmatter = async (): Promise<Frontmatter> => {
		const fileContents =
			(await this.plugin.app.vault.read(this.file)) || "";
		const lines = fileContents.split("\n");
		this.frontmatter = new Frontmatter(lines);
		return this.frontmatter;
	};
}
