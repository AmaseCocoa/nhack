import {
  Breadcrumbs as MantineBreadcrumbs,
  Anchor,
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
  const i = items.map((item, index) => {
    const idx = index === 0 ? 1 : index++;
    return <Anchor href={item.href} key={idx}>{item.title.toLowerCase()}</Anchor>;
  });
  return (
    <>
      <Title order={1}>{detail.title}</Title>
      <MantineBreadcrumbs separator="/" separatorMargin="md" mt="xs">
        <Anchor key={0}>{detail.title.toLowerCase()}</Anchor>
        {i}
      </MantineBreadcrumbs>
    </>
  );
};
