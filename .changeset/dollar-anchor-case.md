---
'intersphinx': patch
---

Expand the `$` uri anchor shorthand with the object name verbatim (case-preserved), matching Sphinx semantics. Previously the expansion was lowercased and whitespace-replaced, which broke links to any case-distinct targets (e.g. `re.Match` vs `re.match` in the CPython inventory, and capitalized glossary terms like `#term-Match`).
