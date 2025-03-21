declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"coming-soon--projects.md": {
	id: "coming-soon--projects.md";
  slug: "coming-soon--projects";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"creativity-series.md": {
	id: "creativity-series.md";
  slug: "creativity-series";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"creativity/01-three-part-framework.md": {
	id: "creativity/01-three-part-framework.md";
  slug: "creativity/01-three-part-framework";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"creativity/notes.md": {
	id: "creativity/notes.md";
  slug: "creativity/notes";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"design-semver.md": {
	id: "design-semver.md";
  slug: "design-semver";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"gamify-neovim.md": {
	id: "gamify-neovim.md";
  slug: "gamify-neovim";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"garden-tree-choice.md": {
	id: "garden-tree-choice.md";
  slug: "garden-tree-choice";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"generative-ai-correctness.md": {
	id: "generative-ai-correctness.md";
  slug: "generative-ai-correctness";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"learning-theory-response.md": {
	id: "learning-theory-response.md";
  slug: "learning-theory-response";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"msw-lessons.md": {
	id: "msw-lessons.md";
  slug: "msw-lessons";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"msw-reminder.md": {
	id: "msw-reminder.md";
  slug: "msw-reminder";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"sense/senseation-meditations.md": {
	id: "sense/senseation-meditations.md";
  slug: "sense/senseation-meditations";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"vue-slots-di.md": {
	id: "vue-slots-di.md";
  slug: "vue-slots-di";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
};
"home": {
"about.md": {
	id: "about.md";
  slug: "about";
  body: string;
  collection: "home";
  data: any
} & { render(): Render[".md"] };
"welcome.md": {
	id: "welcome.md";
  slug: "welcome";
  body: string;
  collection: "home";
  data: any
} & { render(): Render[".md"] };
};
"work": {
"green-eggs-ham-js.md": {
	id: "green-eggs-ham-js.md";
  slug: "green-eggs-ham-js";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"iti-graviti.md": {
	id: "iti-graviti.md";
  slug: "iti-graviti";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"iti-projects.md": {
	id: "iti-projects.md";
  slug: "iti-projects";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"kona-erp.md": {
	id: "kona-erp.md";
  slug: "kona-erp";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"my-work.md": {
	id: "my-work.md";
  slug: "my-work";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"style-targeting.md": {
	id: "style-targeting.md";
  slug: "style-targeting";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"victory-tracekr.md": {
	id: "victory-tracekr.md";
  slug: "victory-tracekr";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
