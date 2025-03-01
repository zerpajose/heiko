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

  // Calculator variables
  let amount = '1';
  let selectedRate = 'PRIMARY';
  $: calculatedResult = $rates.data && amount ? (() => {
    const rateValue = selectedRate === 'AVERAGE' 
      ? averageRate 
      : $rates.data.getCountryConversions.conversionRates.find(rate => rate.type === selectedRate)?.baseValue;
    
    if (rateValue && rateValue !== 'N/A') {
      const result = parseFloat(amount) * parseFloat(rateValue);
      return result.toFixed(2);
    }
    return 'N/A';
  })() : 'N/A';

  function selectRate(rate) {
    selectedRate = rate;
  }
</script>

<main>
  <h3>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
      <defs>
      </defs>
      <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
        <path d="M 2.571 30 l 84.859 0 C 81.254 12.534 64.611 0.015 45.034 0 l -0.068 0 C 25.389 0.015 8.745 12.534 2.571 30 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,204,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 87.429 60 L 2.571 60 C 8.75 77.476 25.408 90 45 90 S 81.25 77.476 87.429 60 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(207,20,43); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 87.429 60 C 89.088 55.307 90 50.261 90 45 c 0 -5.261 -0.912 -10.307 -2.571 -15 L 2.571 30 C 0.911 34.693 0 39.739 0 45 c 0 5.261 0.912 10.308 2.571 15 L 87.429 60 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,36,125); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <text x="45" y="25" text-anchor="middle" style="font-size: 12px; font-family: Arial, sans-serif; fill: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Tu Cambio</text>
        <polygon points="50.4,36.07 50.04,33.5 48.83,35.79 46.27,35.34 48.07,37.21 46.85,39.5 49.19,38.36 50.99,40.23 50.63,37.66 52.96,36.52 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
        <polygon points="58.73,41.08 61.3,40.81 59.06,39.52 59.6,36.98 57.67,38.71 55.42,37.42 56.48,39.79 54.55,41.52 57.13,41.25 58.19,43.62 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
        <polygon points="65.16,47.07 67.68,47.7 66.01,45.71 67.39,43.51 64.98,44.48 63.31,42.5 63.49,45.09 61.09,46.06 63.61,46.69 63.79,49.27 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
        <polygon points="70.43,53.92 72.47,52.32 69.88,52.41 68.99,49.97 68.28,52.47 65.68,52.56 67.83,54.01 67.12,56.5 69.16,54.9 71.31,56.35 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
        <polygon points="41.17,35.79 39.96,33.5 39.6,36.07 37.04,36.52 39.37,37.66 39.01,40.23 40.81,38.36 43.15,39.5 41.93,37.21 43.73,35.34 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
        <polygon points="33.52,39.79 34.58,37.42 32.33,38.71 30.4,36.98 30.94,39.52 28.7,40.81 31.27,41.08 31.81,43.62 32.87,41.25 35.45,41.52 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
        <polygon points="26.5,45.09 26.69,42.5 25.02,44.48 22.61,43.51 23.99,45.71 22.32,47.7 24.84,47.07 26.21,49.27 26.39,46.69 28.91,46.06 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
        <polygon points="21.72,52.47 21.01,49.97 20.12,52.41 17.53,52.32 19.57,53.92 18.69,56.35 20.84,54.9 22.88,56.5 22.17,54.01 24.32,52.56 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
      </g>
    </svg>
  </h3>

  {#if $rates.fetching}
    <div class="loading">Cargando tasas...</div>
  {:else if $rates.error}
    <div class="error">Error: {$rates.error.message}</div>
  {:else}
    <div class="rates-container">
      <div 
        class="rate-card {selectedRate === 'PRIMARY' ? 'selected' : ''}"
        on:click={() => selectRate('PRIMARY')}
        role="button"
        tabindex="0"
        on:keypress={(e) => e.key === 'Enter' && selectRate('PRIMARY')}
      >
        <h3>
          Paralelo
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
          </svg>         
        </h3>
        <p class="rate">{$rates.data.getCountryConversions.conversionRates.find(rate => rate.type === 'PRIMARY')?.baseValue || 'N/A'}</p>
      </div>
      
      <div 
        class="rate-card {selectedRate === 'SECONDARY' ? 'selected' : ''}"
        on:click={() => selectRate('SECONDARY')}
        role="button"
        tabindex="0"
        on:keypress={(e) => e.key === 'Enter' && selectRate('SECONDARY')}
      >
        <h3>
          BCV
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
          </svg>                 
        </h3>
        <p class="rate">{$rates.data.getCountryConversions.conversionRates.find(rate => rate.type === 'SECONDARY')?.baseValue || 'N/A'}</p>
      </div>
      
      <div 
        class="rate-card {selectedRate === 'AVERAGE' ? 'selected' : ''}"
        on:click={() => selectRate('AVERAGE')}
        role="button"
        tabindex="0"
        on:keypress={(e) => e.key === 'Enter' && selectRate('AVERAGE')}
      >
        <h3>
          Promedio
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
          </svg>          
        </h3>
        <p class="rate">{averageRate}</p>
      </div>
    </div>

    <div class="calculator">
      <h3>Calcula tu cambio</h3>
      <div class="calculator-inputs">
        <div class="input-group">
          <input 
            type="number" 
            id="amount" 
            bind:value={amount} 
            placeholder="Ingrese monto en USD"
            min="0"
            step="0.01"
          >
        </div>
      </div>

      <div class="result-box">
        <h3>Resultado en Bolívares</h3>
        <p class="result">{amount ? `Bs. ${calculatedResult}` : 'Ingrese un monto en USD'}</p>
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

  h3 {
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
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .rate-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  .rate-card.selected {
    border: 2px solid #42b883;
    box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
  }

  .rate-card.selected::after {
    content: '✓';
    position: absolute;
    top: 10px;
    right: 10px;
    background: #42b883;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
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

  .calculator {
    margin-top: 3rem;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .calculator h3 {
    margin-bottom: 1.5rem;
  }

  .calculator-inputs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

   input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input:focus {
    outline: none;
    border-color: #42b883;
  }

  .result-box {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 4px;
  }

  .result-box h3 {
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }

  .result {
    font-size: 2rem;
    font-weight: bold;
    color: #42b883;
    margin: 0;
  }
</style>
