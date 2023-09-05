import { findValue } from '@/helpers';
import { useSheet } from '@/hooks/use-sheet';

export type HelmetProps = {
  id?: string;
};

export function Helmet({ id }: HelmetProps) {
  const config = useSheet(id, '_config').data as [];
  return <title>{findValue(config, 'title') || 'O_o'}</title>;
}
