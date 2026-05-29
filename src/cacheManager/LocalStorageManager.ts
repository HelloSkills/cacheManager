export class LocalStorageManager {
  static set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))

    return true
  }

  static get<T>(key: string): T | null {
    const value = localStorage.getItem(key)

    if (value === null) {
      return null
    }

    try {
      return JSON.parse(value) as T
    } catch {
      return null
    }
  }

  static delete(key: string) {
    localStorage.removeItem(key)
  }
}
