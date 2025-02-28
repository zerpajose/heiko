import { createClient } from '@urql/svelte';
import { cacheExchange, fetchExchange } from '@urql/core';

export const client = createClient({
    url: 'https://api.alcambio.app/graphql',
    exchanges: [cacheExchange, fetchExchange],
});

export const RATES_QUERY = `
  query getCountryConversions($countryCode: String!) {
  getCountryConversions(payload: {countryCode: $countryCode}) {
    _id
    baseCurrency {
      code
      decimalDigits
      name
      rounding
      symbol
      symbolNative
      __typename
    }
    country {
      code
      dial_code
      flag
      name
      __typename
    }
    conversionRates {
      baseValue
      official
      principal
      usesRateValue
      rateCurrency {
        code
        decimalDigits
        name
        rounding
        symbol
        symbolNative
        __typename
      }
      rateValue
      type
      __typename
    }
    dateBcvFees
    dateParalelo
    dateBcv
    createdAt
    __typename
  }
}
`;
