declare module "*/package.json" {
  interface PackageJson {
    version: string;
    dependencies: { [key: string]: string };
    devDependencies: { [key: string]: string };
    [key: string]: any;
  }
  const value: PackageJson;
  export = value;
} 