#Cenit.IO to odoo addons.

This is a tool for automating the creation of odoo-integration addons based on a Cenit shared_collections.

##Instalation:

```shell
npm install -g https://github.com/yoandrypa/cenit2odoo.git
```

##Usage:

Run in console: `cenit2odoo [options]`

```
  Options:
  

    -h, --help              output usage information
    -V, --version           output the version number
    -l, --local             Specify that the source is a local path to a the json file.
    -s, --source [source]   Name of the shared collection at the Cenit-IO or local path to json file with shared collection.
    -d, --out-dir [outDir]  Output directory for the resulting addon. Default is "odoo-addons".
```
