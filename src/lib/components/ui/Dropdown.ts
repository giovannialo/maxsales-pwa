export type Placement =
	| 'top'
	| 'top-left'
	| 'top-right'
	| 'bottom'
	| 'bottom-left'
	| 'bottom-right'
	| 'left'
	| 'right'
	| 'center';

export type DropdownContext = {
	isOpen: boolean;
	toggle: () => void;
	placement: Placement;
};

export function getPlacementClasses(placement: Placement): string {
	switch (placement) {
		case 'top':
			return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
		case 'top-left':
			return 'bottom-full left-0 mb-2';
		case 'top-right':
			return 'bottom-full right-0 mb-2';
		case 'bottom':
			return 'top-full left-1/2 -translate-x-1/2 mt-2';
		case 'bottom-left':
			return 'top-full left-0 mt-2';
		case 'bottom-right':
			return 'top-full right-0 mt-2';
		case 'left':
			return 'right-full top-1/2 -translate-y-1/2 mr-2';
		case 'right':
			return 'left-full top-1/2 -translate-y-1/2 ml-2';
		case 'center':
		default:
			return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
	}
}
