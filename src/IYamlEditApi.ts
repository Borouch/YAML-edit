import { Frontmatter } from "./Frontmatter";
import { TFile } from "obsidian";
export default interface IYamlEdit {
	get: (key: string) => any;
	set: (key: string, value: any) => void;
	contains: (key: string) => boolean;

	/**
	 * Updates file frontmatter
	 * @param replacer callback function (key, value) called recursively on each key/value in source object
	 */
	update: (
		replacer?: (k: string, v: any) => any
	) => Promise<boolean>;
}
