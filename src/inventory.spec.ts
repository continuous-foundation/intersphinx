import { describe, expect, test } from 'bun:test';
import { Inventory } from './intersphinx';

describe('Test Inventory', () => {
  test('Path manipulation - custom inv file', () => {
    const inv = new Inventory({ path: 'https://docs.python.org/3.7/something.inv' });
    expect(inv.path).toBe('https://docs.python.org/3.7');
    expect(inv.invName).toBe('something.inv');
  });
  test('Path manipulation - trailing slashes', () => {
    const inv = new Inventory({ path: 'https://docs.python.org/3.7/' });
    expect(inv.path).toBe('https://docs.python.org/3.7');
    expect(inv.invName).toBe('objects.inv');
  });
  test('Load python inventory', async () => {
    const inv = new Inventory({ path: 'https://docs.python.org/3.7' });
    await inv.load();
    expect(inv._loaded).toBe(true);
    expect(inv.numEntries).toBeGreaterThan(10000);
    const entry = inv.getEntry({ name: 'library/abc' });
    expect(entry?.display?.includes('Abstract')).toBe(true);
    expect(entry?.location?.includes('abc.html')).toBe(true);
    expect(entry?.type).toBe('std:doc');
  });
  test('`$` anchor shorthand expands to the name verbatim (Sphinx semantics)', () => {
    const inv = new Inventory({ id: 'test', path: 'https://example.org' });
    // Sphinx only writes `$` when the anchor ends with the name byte-for-byte,
    // so the expansion must preserve case exactly:
    // re.match (function) and re.Match (class) are distinct targets.
    inv.setEntry({ type: 'py:function', name: 're.match', location: 'library/re.html#$' });
    inv.setEntry({ type: 'py:class', name: 're.Match', location: 'library/re.html#$' });
    // A capitalized glossary term: Sphinx writes `Match std:term -1 index.html#term-$ -`
    // and its real HTML anchor is `id="term-Match"` — also case-preserved.
    inv.setEntry({ type: 'std:term', name: 'Match', location: 'index.html#term-$' });
    expect(inv.getEntry({ name: 're.match' })?.location).toBe(
      'https://example.org/library/re.html#re.match',
    );
    expect(inv.getEntry({ name: 're.Match' })?.location).toBe(
      'https://example.org/library/re.html#re.Match',
    );
    expect(inv.getEntry({ type: 'std:term', name: 'Match' })?.location).toBe(
      'https://example.org/index.html#term-Match',
    );
  });
  test('Python inventory - case sensitive names', async () => {
    // Python 3.11 includes both `class Match` and `def match()` as targets
    const inv = new Inventory({ path: 'https://docs.python.org/3.11' });
    await inv.load();
    expect(inv._loaded).toBe(true);
    const entryClass = inv.getEntry({ name: 're.Match' });
    expect(entryClass?.location?.endsWith('re.Match')).toBe(true);
    expect(entryClass?.type).toBe('py:class');
    const entryFunc = inv.getEntry({ name: 're.match' });
    expect(entryFunc?.location?.endsWith('re.match')).toBe(true);
    expect(entryFunc?.type).toBe('py:function');
  });
});
