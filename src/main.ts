import { Dictionary } from './Dictionary'

const countries = await Dictionary.countryList()
const currencies = await Dictionary.currencyList()
console.log('countries Dictionary', countries)
console.log('currencies Dictionary', currencies)
