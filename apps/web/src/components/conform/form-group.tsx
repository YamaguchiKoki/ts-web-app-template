import type { ReactNode } from "react";

type Props = {
	items: ReactNode[];
	className?: string;
};

export function FormGroup({ items, className = "" }: Props) {
	return (
		<div className={`${className} max-w-full`}>
			<div className="divide-y divide-gray-200">
				{items.map((input, index) => (
					<div className="p-4" key={`input-${index + 1}`}>
						<div className="w-full md:w-2/5">{input}</div>
					</div>
				))}
			</div>
		</div>
	);
}
