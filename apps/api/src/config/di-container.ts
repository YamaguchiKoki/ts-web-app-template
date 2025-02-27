export type DependencyFactory<T, Dependencies> = (
	container: DIContainer<Dependencies>,
) => T;

export class DIContainer<DependencyTypes> {
	private registry = new Map<
		keyof DependencyTypes,
		DependencyTypes[keyof DependencyTypes]
	>();

	register<Key extends keyof DependencyTypes>(
		key: Key,
		value: DependencyTypes[Key],
	): void {
		this.registry.set(key, value);
	}

	get<K extends keyof DependencyTypes>(key: K): DependencyTypes[K] {
		const instance = this.registry.get(key);
		if (!instance) {
			throw new Error(`No instance found for key: ${String(key)}`);
		}
		return instance as DependencyTypes[K];
	}

	// 遅延評価が必要になった場合使用する
	registerFactory<Key extends keyof DependencyTypes>(
		key: Key,
		factory: DependencyFactory<DependencyTypes[Key], DependencyTypes>,
	): void {
		const instance = factory(this);
		this.registry.set(key, instance);
	}
}
