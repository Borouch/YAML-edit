import { dump, load } from 'js-yaml'


export class Frontmatter {

  /**
   * File lines
   */
  public lines: string[]

  /**
   * Index of the first YAML content line
   */
  private start: number

  /**
   * Index of the last YAML content line
   */
  private end: number

  /**
   * YAML as key value pairs
   */
  private contents: { [k: string]: any }

  constructor(lines: string[]) {
    this.lines = lines
    this.initBoundaries()
    this.parse()
  }

  public readonly contains = (key: string): boolean => key in this.contents
  public readonly get = (key: string): any => this.contents[key]
  public readonly set = (key: string, value: any): void =>
    (this.contents[key] = value)

  public readonly overwrite = (replacer?: (k: string, v: any)): void => {

    const fmLines = dump(this.contents, { replacer }).trim()

    if (this.start === -1 || this.end === -1) {
      // If there was no frontmatter, add it now
      this.lines.unshift('')
      this.lines.unshift('---')
      this.lines.unshift(fmLines)
      this.lines.unshift('---')
    } else {
      this.lines.splice(this.start, this.end - this.start + 1, fmLines)
    }
  }

  private readonly initBoundaries = (): void => {
    this.start = this.lines.findIndex(line => line === '---') + 1
    if (this.start === 0) {
      console.debug('YAML-edit: No frontmatter found for note')
      this.start = -1
      this.end = -1
      return
    }

    this.end =
      this.lines.slice(this.start).findIndex(line => line === '---') +
      this.start -
      1
  }

  /**
   * Serializes YAML string
   */
  private readonly parse = (): void => {
    if (this.start < 0 || this.end < this.start) {
      this.contents = {}
      return
    }
    const fmLines = this.lines.slice(this.start, this.end + 1).join('\n')
    const fm = load(fmLines)
    if (typeof fm === 'string' || typeof fm === 'number') {
      throw new Error('YAML-edit: Unexpected type of frontmatter')
    }

    this.contents = fm as { [k: string]: any }
  }
}


