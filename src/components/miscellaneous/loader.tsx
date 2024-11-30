import { ReloadIcon } from '@radix-ui/react-icons';

const Loader = (): JSX.Element => {
	return (
		<div className='flex h-screen place-content-center items-center justify-center'>
			<ReloadIcon className='h-5 w-5 animate-spin' />
		</div>
	);
};

export default Loader;
