import { CacheManagerBase } from './CacheManagerBase'
import type { Country, Currency } from '../types'

export class CacheManager extends CacheManagerBase {
  getCountry(): Country[] | null {
    return this.get<Country[]>(this.config.country.key)
  }

  setCountry(data: Country[]) {
    this.set(this.config.country.key, data)
  }

  getCurrency(): Currency[] | null {
    return this.get<Currency[]>(this.config.currency.key)
  }

  setCurrency(data: Currency[]) {
    this.set(
      this.config.currency.key,
      data,
      this.config.currency.ttl
    )
  }
}
