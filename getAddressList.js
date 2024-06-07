import address from './address.json';

const getAddressList = (pid) => {
  if (pid === "gangaotai") {
    return address.province.relations["gangaotai"].map((id) => address.city.list[id]);
  }
  const current = Object.assign({}, address.city.list[pid]);
  if (address.province.relations.municipality.indexOf(pid) > -1) {
    return [current];
  }

  return (address.city.relations[pid] || [])?.map((id) => address.city.list[id]);
}

export default getAddressList;
