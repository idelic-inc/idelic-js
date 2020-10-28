export function toCamelCase(underscore: string): string {
  return (
    underscore.substr(0, 1).toUpperCase() +
    underscore.substr(1).replace(/_[a-z]/g, (c) => c.substr(1).toUpperCase())
  );
}
