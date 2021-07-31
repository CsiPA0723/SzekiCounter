export default function buildUpdateSetsFrom<T>(data: T): string[] {
  const columns: string[] = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key]) columns.push(`${key} = :${key}`);
    }
  }
  return columns;
}
