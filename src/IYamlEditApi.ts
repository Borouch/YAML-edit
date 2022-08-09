import { Frontmatter } from './Frontmatter';
import { TFile } from 'obsidian';
export default interface IYamlEditApi{
    getFrontmatter: (file: TFile | string)=>Promise<Frontmatter|null>
}