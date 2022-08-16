This Obsidian plugin exposes API for working with YAML frontmatter

By accessing api object you will receive a function:

```typescript
	getYamlEdit (file: TFile | string): IYamlEdit | null 

``` 

YamlEdit object has these methods:

```typescript
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
```