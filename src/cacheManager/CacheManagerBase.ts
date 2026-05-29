import { LocalStorageManager } from './LocalStorageManager'

type CacheItem<T> = {
  value: T
  expiredTime: number
}

export class CacheManagerBase {
  private manager = LocalStorageManager
  private DEFAULT_TTL = 3000

  protected config = {
    country: {
      key: 'country'
    },
    currency: {
      key: 'currency',
      ttl: 3000
    }
  }

  protected set<T>(key: string, data: T, ttl = this.DEFAULT_TTL) {
    const item: CacheItem<T> = {
      value: data,
      expiredTime: new Date().getTime() + ttl
    }

    this.manager.set(key, item)
  }

  protected get<T = unknown>(key: string): T | null {
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

  protected delete(key: string) {
    return this.manager.delete(key)
  }
}
