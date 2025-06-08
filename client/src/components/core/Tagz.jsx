import { Tag } from 'primereact/tag';

export const Tagz = ({ children, ...prop }) => {
  return <Tag {...prop}>{children}</Tag>;
};
