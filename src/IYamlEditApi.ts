import { Frontmatter } from "./Frontmatter";
import { TFile } from "obsidian";
export default interface IYamlEditApi {
	getFrontmatter: (file: TFile | string) => Promise<Frontmatter | null>;
    /**
	 * Updates file frontmatter
	 * @param replacer callback function (key, value) called recursively on each key/value in source object
	 */
	update: (
		file: TFile | string,
		replacer?: (k: string, v: any) => any
	) => Promise<void>;
}
