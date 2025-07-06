/*
  storage.js
  A minimal namespaced wrapper around localStorage with JSON support and safe fallback.

  Author: [TanaMobile] - Released for personal/academic use under the TanaMobile License.
*/

const Storage = (function () {
  const prefix = 'tanamobile__';

  function safeParse(value) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  function safeStringify(value) {
    try {
      return JSON.stringify(value);
    } catch {
      return null;
    }
  }

  function key(name) {
    return prefix + name;
  }

  return {
    set(name, value) {
      const str = safeStringify(value);
      if (str !== null) {
        localStorage.setItem(key(name), str);
      }
    },

    get(name) {
      const raw = localStorage.getItem(key(name));
      return safeParse(raw);
    },

    remove(name) {
      localStorage.removeItem(key(name));
    },

    clearAll() {
      Object.keys(localStorage)
        .filter(k => k.startsWith(prefix))
        .forEach(k => localStorage.removeItem(k));
    },

    exists(name) {
      return localStorage.getItem(key(name)) !== null;
    }
  };
})();

/* Example usage:
Storage.set('user', { id: 1, name: 'Tana' });
const user = Storage.get('user');
console.log(user.name); // 'Tana'
*/

export default Storage;
