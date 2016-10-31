#Cenit IO to odoo addons.

This is a tool for automating the creation of odoo-integration addons based on a Cenit IO shared_collections.

##Instalation:

```shell
npm install -g https://github.com/cenit-io/cenit2odoo.git
```

##Usage:

Run in console: `cenit2odoo [options]`

```
  Options:
  

    -h, --help                       output usage information
    -V, --version                    output the version number
    -l, --local                      Specify that the collection is a local path to a the json file.
    -c, --collections [collections]  Names of the shared collections at the Cenit IO or local path to json file with 
                                     shared collection.
    -o, --out-dir [outDir]           Output directory for the resulting addon. Default is "odoo-addons".
    -s, --statics                    Specify that must be generated the templates static file.
    -i, --interactive                Specify that run in interactive mode.
    -a, --all                        Specify that will generate the addon for each shared collections in Cenit IO.
    -x, --exclude [exclude]          Names of shared collections to exclude. If list is empty, then the names are 
                                     taken of EXCLUDE_SHARED_COLLECTION environment variable.
    -v, --odoo-version [odooVersion] Specify odoo version (default 8.0).
```

### Examples:

- Generate addon from local json file with shared collection: 

    ```
        cenit2odoo -lc ./collections/gmail.json
    ```

- Generate addon from remote shared collections in Cenit IO: 

    ```
        cenit2odoo -c gmail
    ```

- Generate multiples addons from remote shared collections in Cenit IO: 

    ```
        cenit2odoo -c gmail,twitter
    ```

- Generate addons in a specific path: 

    ```
        cenit2odoo -sc gmail -o my-addons
    ```
    
- Generate addon with static files templates: 

    ```
        cenit2odoo -sc gmail
    ```

- Generate addons in interactive mode: 

    ```
        cenit2odoo -i
    ```

- Generate addons with static files templates in interactive mode: 

    ```
        cenit2odoo -si
    ```

- Generate all addons. 

    ```
        cenit2odoo -a
    ```

- Generate all addons except gmail and twitter. 

    ```
        cenit2odoo -ax gmail,twitter
    ```

- Generate all addons except gmail and twitter using environment. 

    ```
        export EXCLUDE_SHARED_COLLECTION="gmail,twitter"
        
        cenit2odoo -ax
    ```

- Generate addon for odoo version 9.0: 

    ```
        cenit2odoo -sc gmail -v 9.0
    ```
