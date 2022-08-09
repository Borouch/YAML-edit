This Obsidian plugin exposes API for working with YAML frontmatter

API schema:

```typescript
	getFrontmatter: (file: TFile | string): Promise<Frontmatter | null>;

  /**
	 * Updates file frontmatter
	 * @param replacer callback function (key, value) called recursively on each key/value in source object
	 */
	update: (
		file: TFile | string,
		replacer?: (k: string, v: any) => any
	): Promise<void>;

``` 

Frontmatter containts the following public methods:

```typescript

  contains: (key: string): boolean
  get: (key: string): any 
  set: (key: string, value: any): void
  /**
   * Generally there is no need to call this manually, used in @method update()
	 */
  overwrite: (): void
```