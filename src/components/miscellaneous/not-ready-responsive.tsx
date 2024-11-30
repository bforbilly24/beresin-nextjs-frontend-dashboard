import { CircleAlert } from "lucide-react";

function NotReadyResponsive() {
	return (
		<div className='flex h-screen flex-col place-content-center items-center justify-center p-5 text-justify xl:hidden'>
			<div className='flex flex-row gap-x-2 items-center justify-center'>
                <CircleAlert className="fill-yellow-500 dark:fill-yellow-400" />
                <p className='font-semibold text-yellow-500 dark:text-yellow-400'>
                [WARNING]
                </p>
                </div>
			<div>Please use desktop device instead of using smartphone, tablet or small desktop for best user experience purpose only !</div>
		</div>
	);
}

export { NotReadyResponsive };
