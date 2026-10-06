import {
	Anchor,
	Breadcrumbs as MantineBreadcrumbs,
	Title,
} from "@mantine/core";

type PageItem = {
	title: string;
	href: string;
};

type BreadcrumbsProps = {
	detail: PageItem;
	items: PageItem[];
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
	detail,
	items = [],
}) => {
	return (
		<>
			<Title order={1}>{detail.title}</Title>
			<MantineBreadcrumbs separator="/" separatorMargin="md" mt="xs">
				{items.map((item) => (
					<Anchor href={item.href} key={item.href + item.title}>
						{item.title.toLowerCase()}
					</Anchor>
				))}
				<Anchor key={detail.href}>{detail.title.toLowerCase()}</Anchor>
			</MantineBreadcrumbs>
		</>
	);
};
