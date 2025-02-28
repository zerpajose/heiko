<script>
  import { client, RATES_QUERY } from './lib/graphql';
  import { queryStore } from '@urql/svelte';

  const rates = queryStore({
    client: client,
    query: RATES_QUERY,
    variables: {
      countryCode: "VE"
    }
  });

  $: {
    if ($rates.error) {
      console.error('GraphQL Error:', $rates.error);
    }
    console.log('Query State:', {
      fetching: $rates.fetching,
      data: $rates.data,
      error: $rates.error
    });
  }

  $: averageRate = $rates.data ? (() => {
    const primary = $rates.data.getCountryConversions.conversionRates.find(rate => rate.type === 'PRIMARY')?.baseValue;
    const secondary = $rates.data.getCountryConversions.conversionRates.find(rate => rate.type === 'SECONDARY')?.baseValue;
    if (primary && secondary) {
      return ((parseFloat(primary) + parseFloat(secondary)) / 2).toFixed(2);
    }
    return 'N/A';
  })() : 'N/A';
</script>

<main>
  <h1>Tasas de cambio en Venezuela 🇻🇪</h1>

  {#if $rates.fetching}
    <div class="loading">Cargando tasas...</div>
  {:else if $rates.error}
    <div class="error">Error: {$rates.error.message}</div>
  {:else}
    <div class="rates-container">
      <div class="rate-card">
        <h2>Dólar Paralelo</h2>
        <p class="rate">{$rates.data.getCountryConversions.conversionRates.find(rate => rate.type === 'PRIMARY')?.baseValue || 'N/A'}</p>
      </div>
      
      <div class="rate-card">
        <h2>Dólar BCV</h2>
        <p class="rate">{$rates.data.getCountryConversions.conversionRates.find(rate => rate.type === 'SECONDARY')?.baseValue || 'N/A'}</p>
      </div>
      
      <div class="rate-card">
        <h2>Dolar Promedio</h2>
        <p class="rate">{averageRate}</p>
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
  }

  .rates-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .rate-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
  }

  .rate-card:hover {
    transform: translateY(-5px);
  }

  h2 {
    color: #2c3e50;
    margin: 0 0 1rem 0;
  }

  .rate {
    font-size: 2rem;
    font-weight: bold;
    color: #42b883;
    margin: 0;
  }

  .loading {
    color: #666;
    font-size: 1.2rem;
  }

  .error {
    color: #e74c3c;
    padding: 1rem;
    border-radius: 4px;
    background: #fde2e2;
  }
</style>
