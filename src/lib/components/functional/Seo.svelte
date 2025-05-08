<script lang="ts">
	import { page } from '$app/state';

	type Props = {
		title: string;
		description?: string;
		robots?: string;
		ogTitle?: string;
		ogDescription?: string;
		ogUrl?: string;
		ogImage?: string;
		ogType?: string;
		ogSiteName?: string;
		twitterCard?: string;
		twitterTitle?: string;
		twitterDescription?: string;
		twitterImage?: string;
		twitterSite?: string;
	};

	let props: Props = $props();
	let complement = 'MaxSales - Potencialize suas vendas com o MaxSales';
	let title = `${props.title} | ${complement}`;
	let defaultImage =
		page.url.toString() + (page.url.toString().endsWith('/') ? '' : '/') + 'logo.svg';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={props.description ?? complement} />
	<meta name="robots" content={props.robots ?? 'index, follow'} />
	<meta property="og:title" content={props.ogTitle ?? title} />
	<meta
		property="og:description"
		content={props.ogDescription ?? props.description ?? complement}
	/>
	<meta property="og:url" content={props.ogUrl ?? page.url.href} />
	<meta property="og:image" content={props.ogImage ?? defaultImage} />
	<meta property="og:type" content={props.ogType ?? 'website'} />
	<meta property="og:site_name" content={props.ogSiteName ?? 'MaxSales'} />
	<meta name="twitter:card" content={props.twitterCard ?? 'summary_large_image'} />
	<meta name="twitter:title" content={props.twitterTitle ?? title} />
	<meta
		name="twitter:description"
		content={props.twitterDescription ?? props.description ?? complement}
	/>
	<meta name="twitter:image" content={props.twitterImage ?? defaultImage} />
	<meta name="twitter:site" content={props.twitterSite ?? '@MaxSales'} />
	<link rel="canonical" href={props.ogUrl ?? page.url.href} />
</svelte:head>
