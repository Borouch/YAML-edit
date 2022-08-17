This Obsidian plugin exposes API for working with YAML frontmatter

To receive yaml edit api you need to provide either file or path

```typescript
	getYamlEditApi (file: TFile | string): Promise<IYamlEditApi | null> 
``` 

YamlEditApi has these methods:

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

### Support
If you find this plugin useful consider supporting me in the following way:

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/Borouch)