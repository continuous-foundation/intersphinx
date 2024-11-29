# intersphinx

[![intersphinx on npm](https://img.shields.io/npm/v/intersphinx.svg)](https://www.npmjs.com/package/intersphinx)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/continuous-foundation/intersphinx/blob/main/LICENSE)
[![CI](https://github.com/continuous-foundation/intersphinx/workflows/CI/badge.svg)](https://github.com/continuous-foundation/intersphinx/actions)

Read and write intersphinx `objects.inv` from node or the command line.

To use from the command line, use the `-g` to create a global install.

```
npm install -g intersphinx
```

## From the command line

Commands available:

`parse`: download or unpack a local file into a json or yaml file.

```bash
intersphinx parse https://docs.python.org/3.7 output.yml
```

`list`: list the contents of an objects.inv

```bash
intersphinx list https://docs.python.org/3.7 --summary
intersphinx list https://docs.python.org/3.7 --domain std
intersphinx list https://docs.python.org/3.7 --domain std:doc --includes abc
intersphinx list https://docs.python.org/3.7 --domain std:doc --includes abc --limit 5
```

## Reading an invintory in Node

```typescript
import { Inventory } from 'intersphinx';

const inv = new Inventory({ id: 'python', path: 'https://docs.python.org/3.7' });
await inv.load();

const entry = inv.getEntry({ name: 'zipapp-specifying-the-interpreter' });
// {
//   location: https://docs.python.org/3.7/library/zipapp.html#specifying-the-interpreter,
//   display: 'Specifying the Interpreter'
// }
```

## Write an invintory

```typescript
import { Inventory, Domains } from 'intersphinx';

const inv = new Inventory({ project: 'Python', version: '3.7' });
inv.setEntry({
  type: Domains.stdLabel,
  name: 'zipapp-specifying-the-interpreter',
  location: 'library/zipapp.html#specifying-the-interpreter',
  display: 'Specifying the Interpreter',
});

inv.write('objects.inv');
```

---

As of v1.0.0 this package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

---

<p style="text-align: center; color: #aaa; padding-top: 50px">
  Made with love by
  <a href="https://continuous.foundation" target="_blank" style="color: #aaa">
    Continuous Science Foundation <img src="https://continuous.foundation/images/logo-small.svg" style="height: 1em" />
  </a>
</p>
