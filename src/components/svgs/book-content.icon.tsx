interface BookContentIconProps {
	className?: string; // Optional className prop for styling
}

const BookContentIcon: React.FC<BookContentIconProps> = ({ className }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' style={{ msFilter: '' }} className={className}>
			<path d='M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h7v14H4zm9 0V5h7l.001 14H13z'></path>
			<path d='M15 7h3v2h-3zm0 4h3v2h-3z'></path>
		</svg>
	);
};

export { BookContentIcon };
