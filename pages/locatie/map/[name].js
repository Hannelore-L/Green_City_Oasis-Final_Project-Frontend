import { useRouter } from 'next/router';

export default function LocationMap() {
	const router = useRouter();
	const { mapUrl } = router.query;

	return <div>{mapUrl}</div>;
}
