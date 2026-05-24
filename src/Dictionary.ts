import { CacheManager } from './cacheManager'
import { HTTPClient } from './httpClient/HTTPClient'
import type { Country, Currency } from './types'

export class Dictionary {
  static async countryList(): Promise<Country[]> {
    const cacheManager = new CacheManager()
    const country = cacheManager.getCountry()

    if (country !== null) {
      return country
    }

    const result = await HTTPClient.get<Country[]>('/countries')

    if (result.data !== null) {
      cacheManager.setCountry(result.data)
      return result.data
    }

    return []
  }

  static async currencyList(): Promise<Currency[]> {
    const cacheManager = new CacheManager()
    const currency = cacheManager.getCurrency()

    if (currency !== null) {
      return currency
    }

    const result = await HTTPClient.get<Currency[]>('/currencies')

    if (result.data !== null) {
      cacheManager.setCurrency(result.data)
      return result.data
    }

    return []
  }
}
