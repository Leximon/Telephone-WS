export function outsideClick(node: HTMLElement, callback: (event: MouseEvent) => void) {
	const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
		if (!node.contains(target) && !hasParentalClass(target, "ignore-outside-click"))
			callback(e);
	};

	document.addEventListener("mousedown", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("mousedown", handleClick, true);
		}
	};
}

function hasParentalClass(node: HTMLElement, className: string): boolean {
    if(node.classList.contains(className))
        return true;
    if(node.parentElement)
        return hasParentalClass(node.parentElement, className);
    return false;
}

