export const formatExpiredAt = (expiredAt: string): string => {
	let formattedExpiredAt = 'N/A';

	if (expiredAt) {
		const date = new Date(expiredAt);

		if (!isNaN(date.getTime())) {
			const now = new Date();
			const timeDifference = date.getTime() - now.getTime(); 

			const days = Math.floor(timeDifference / (1000 * 3600 * 24));
			const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
			const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
			const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

			let relativeTime = '';
			if (days > 0) relativeTime += `${days} hari `;
			if (hours > 0) relativeTime += `${hours} jam `;
			if (minutes > 0) relativeTime += `${minutes} menit `;
			if (seconds > 0) relativeTime += `${seconds} detik`;

			if (timeDifference < 0) {
				relativeTime = `Expired`;
			}

			formattedExpiredAt = relativeTime.trim();
		}
	}

	return formattedExpiredAt;
};
