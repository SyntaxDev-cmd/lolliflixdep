// ============================================================
//  DoraPlay - Configuracao principal
//  App de stream focado em Doramas, Novelas e Novelas Turcas
//  (mas com todo o catalogo liberado). Metodo de conexao: Xtream Codes.
//  >>> Para trocar de painel / fazer outro app, edite configEndpoint <<<
// ============================================================
window.APP_CONFIG = {
  brand: 'LOLLIFLIX PRO',
  defaultTheme: 'red',      // 'red' (LOLLIFLIX) ou 'dora' (Doramas rosa/roxo)
  defaultLayout: 'rails',   // 'rails' (streaming/doramas) ou 'tiles' (ladrilhos)

  // Painel de conexao (mesmo metodo Xtream do app LOLLIFLIX)
  configEndpoint: 'https://lolliflixsmarts.dexdown.shop/api2.php?cliente=admin',

  requestTimeoutMs: 20000,
  maxProfiles: 5,

  // TMDB - usado para organizar (capas, sinopses, backdrops, notas)
  tmdb: {
    apiKey: 'e07c33cf263be9cdd38872ebc7389ffc',
    language: 'pt-BR',
    base: 'https://api.themoviedb.org/3',
    img: 'https://image.tmdb.org/t/p/'
  },

  // Palavras-chave para destacar as secoes
  keywords: {
    turca:  ['turc', 'turq', 'otoman', 'turkish', 'turquia'],
    dorama: ['dorama', 'k-drama', 'kdrama', 'coreano', 'coreana', 'asiatic', 'oriental', 'chines', 'japon', 'tailand'],
    novela: ['novela', 'telenovela']
  },

  // conteudo adulto (bloqueio opcional por PIN)
  adultKeywords: ['adult', 'adulto', 'xxx', 'porn', '+18', '18+', 'erotic', 'sexy', 'sex', 'porno']
};
