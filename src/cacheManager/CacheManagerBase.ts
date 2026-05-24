import { LocalStorageManager } from './LocalStorageManager'

type CacheItem<T> = {
  value: T
  expiredTime: number
}

export class CacheManagerBase {
  manager = LocalStorageManager
  DEFAULT_TTL = 3000

  config = {
    country: {
      key: 'country'
    },
    currency: {
      key: 'currency',
      ttl: 3000
    }
  }

  set<T>(key: string, data: T, ttl = this.DEFAULT_TTL) {
    const item: CacheItem<T> = {
      value: data,
      expiredTime: new Date().getTime() + ttl
    }

    this.manager.set(key, item)
  }

  get<T = unknown>(key: string): T | null {
    const item = this.manager.get<CacheItem<T>>(key)
    const currentDateTimestamp = new Date().getTime()

    if (item === null) {
      return null
    }

    if (currentDateTimestamp > item.expiredTime) {
      this.delete(key)
      return null
    }

    return item.value
  }

  delete(key: string) {
    return this.manager.delete(key)
  }
}
