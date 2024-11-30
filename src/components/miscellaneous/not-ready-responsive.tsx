function NotReadyResponsive() {
	return (
		<div className='flex h-screen flex-col place-content-center items-center justify-center p-5 text-justify xl:hidden'>
			<div>[WARN]</div>
			<div>Please use desktop device instead of using smartphone, tablet or small desktop for best user experience purpose only !</div>
		</div>
	);
}

export { NotReadyResponsive };
