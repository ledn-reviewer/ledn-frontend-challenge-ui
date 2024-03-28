import { usePlanetDetail, usePlanetList } from './data/queries';

const DataExample = () => {
  const { data: list } = usePlanetList();
  const { data: detail } = usePlanetDetail('1');

  console.log('list', list);
  console.log('detail', detail);
  return null;
};

export default DataExample;
