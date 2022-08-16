import { TFile } from 'obsidian';
import YAMLEditPlugin from "./main";
export 	const getFileFromTFileOrPath = (file: TFile | string, plugin: YAMLEditPlugin):TFile|null => {
    let targetFile: TFile|null = null;

    if (file instanceof TFile) targetFile = file;

    if (typeof file === "string") {
        const abstractFile =
            plugin.app.vault.getAbstractFileByPath(file);
        if (abstractFile instanceof TFile) {
            targetFile = abstractFile;
        }
    }

    return targetFile;
};