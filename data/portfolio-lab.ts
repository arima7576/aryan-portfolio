export type DataFreshness = 'live' | 'stale' | 'unavailable';

export type PortfolioHolding = {
  id: string; symbol: string; name: string; assetClass: string; sector: string;
  quantity: number; averageCost: number; marketPrice: number; marketValue: number;
  weight: number; totalReturn: number; dayReturn: number; currency: string;
};

export type PortfolioTransaction = {
  id: string; date: string; type: 'Buy' | 'Sell' | 'Dividend' | 'Deposit' | 'Fee';
  symbol?: string; description: string; quantity?: number; price?: number; amount: number; status: 'Settled' | 'Pending';
};

export type PortfolioSnapshot = {
  portfolio: { id: string; name: string; owner: string; baseCurrency: string; benchmark: string; inceptionDate: string; riskProfile: string };
  summary: { totalValue: number; cashBalance: number; investedValue: number; dailyReturn: number; weeklyReturn: number; monthlyReturn: number; totalReturn: number; realizedPnL: number; unrealizedPnL: number };
  performance: { date: string; portfolioValue: number; benchmarkValue: number }[];
  holdings: PortfolioHolding[];
  transactions: PortfolioTransaction[];
  risk: { riskScore: number; volatility: number; beta: number; sharpeRatio: number; maxDrawdown: number; valueAtRisk: number; concentrationRisk: string; factors: { label: string; value: number; assessment: string }[] };
  allocation: { assetClasses: { label: string; value: number; colour: string }[]; sectors: { label: string; value: number; colour: string }[]; regions: { label: string; value: number; colour: string }[] };
  cashFlow: { date: string; type: 'Deposit' | 'Dividend' | 'Withdrawal' | 'Fee'; amount: number; note: string }[];
  aiAnalysis: { generatedAt: string; marketView: string; portfolioView: string; actions: { title: string; detail: string; priority: 'Monitor' | 'Review' | 'Opportunity' }[]; confidence: number };
  reports: { id: string; name: string; period: string; generatedAt: string; status: 'Ready' | 'Preparing' | 'Unavailable' }[];
  account: { advisor: string; reportingFrequency: string; valuationDate: string; dataStatus: DataFreshness; updatedAt: string };
};

export const portfolioLabMockData: PortfolioSnapshot = {
  portfolio: { id: 'portfolio_001', name: 'Arima Global Portfolio', owner: 'Demo Client', baseCurrency: 'GBP', benchmark: 'S&P 500', inceptionDate: '2026-01-01', riskProfile: 'Growth' },
  summary: { totalValue: 125000, cashBalance: 15000, investedValue: 110000, dailyReturn: 0.004, weeklyReturn: 0.012, monthlyReturn: 0.031, totalReturn: 0.25, realizedPnL: 8200, unrealizedPnL: 16800 },
  performance: [
    ['2026-01-01',100000,100000], ['2026-01-15',100860,100420], ['2026-02-01',102400,101800], ['2026-02-15',103120,102760], ['2026-03-01',101600,100700], ['2026-03-15',103540,102100], ['2026-04-01',106100,104200], ['2026-04-15',107460,105300], ['2026-05-01',110900,106600], ['2026-05-15',109820,105500], ['2026-06-01',116300,109400], ['2026-06-15',118920,110200], ['2026-07-01',121000,111700], ['2026-07-21',125000,113100],
  ].map(([date, portfolioValue, benchmarkValue]) => ({ date: String(date), portfolioValue: Number(portfolioValue), benchmarkValue: Number(benchmarkValue) })),
  holdings: [
    { id:'h_1', symbol:'MSFT', name:'Microsoft Corporation', assetClass:'Equity', sector:'Technology', quantity:55, averageCost:318, marketPrice:376, marketValue:20680, weight:.1654, totalReturn:.182, dayReturn:.006, currency:'USD' },
    { id:'h_2', symbol:'NVDA', name:'NVIDIA Corporation', assetClass:'Equity', sector:'Technology', quantity:38, averageCost:472, marketPrice:690, marketValue:20910, weight:.1673, totalReturn:.462, dayReturn:.011, currency:'USD' },
    { id:'h_3', symbol:'VWRL', name:'Vanguard FTSE All-World ETF', assetClass:'ETF', sector:'Global Equity', quantity:165, averageCost:98, marketPrice:112, marketValue:18480, weight:.1478, totalReturn:.143, dayReturn:.002, currency:'GBP' },
    { id:'h_4', symbol:'ASML', name:'ASML Holding N.V.', assetClass:'Equity', sector:'Semiconductors', quantity:24, averageCost:625, marketPrice:785, marketValue:18840, weight:.1507, totalReturn:.256, dayReturn:-.003, currency:'EUR' },
    { id:'h_5', symbol:'AGG', name:'iShares Core U.S. Aggregate Bond', assetClass:'Fixed Income', sector:'Government & Credit', quantity:146, averageCost:86, marketPrice:88, marketValue:12848, weight:.1028, totalReturn:.031, dayReturn:-.001, currency:'USD' },
    { id:'h_6', symbol:'GLD', name:'SPDR Gold Shares', assetClass:'Alternative', sector:'Real Assets', quantity:31, averageCost:165, marketPrice:189, marketValue:5852, weight:.0468, totalReturn:.145, dayReturn:.004, currency:'USD' },
    { id:'h_7', symbol:'CASH', name:'Cash Reserve', assetClass:'Cash', sector:'Liquidity', quantity:15000, averageCost:1, marketPrice:1, marketValue:15000, weight:.12, totalReturn:0, dayReturn:0, currency:'GBP' },
  ],
  transactions: [
    { id:'t_1', date:'2026-07-18', type:'Buy', symbol:'NVDA', description:'NVIDIA Corporation', quantity:8, price:689, amount:-5512, status:'Settled' },
    { id:'t_2', date:'2026-07-12', type:'Dividend', symbol:'VWRL', description:'Vanguard FTSE All-World ETF distribution', amount:126, status:'Settled' },
    { id:'t_3', date:'2026-07-03', type:'Sell', symbol:'AAPL', description:'Apple Inc.', quantity:18, price:201, amount:3618, status:'Settled' },
    { id:'t_4', date:'2026-06-28', type:'Deposit', description:'Capital contribution', amount:10000, status:'Settled' },
    { id:'t_5', date:'2026-06-25', type:'Fee', description:'Portfolio management fee', amount:-188, status:'Settled' },
    { id:'t_6', date:'2026-06-17', type:'Buy', symbol:'ASML', description:'ASML Holding N.V.', quantity:6, price:782, amount:-4692, status:'Settled' },
    { id:'t_7', date:'2026-06-10', type:'Dividend', symbol:'MSFT', description:'Microsoft Corporation distribution', amount:95, status:'Settled' },
    { id:'t_8', date:'2026-05-30', type:'Deposit', description:'Capital contribution', amount:5000, status:'Settled' },
    { id:'t_9', date:'2026-05-21', type:'Buy', symbol:'GLD', description:'SPDR Gold Shares', quantity:12, price:188, amount:-2256, status:'Settled' },
  ],
  risk: { riskScore: 68, volatility:.173, beta:1.08, sharpeRatio:1.42, maxDrawdown:-.092, valueAtRisk:3420, concentrationRisk:'Moderate', factors:[{label:'Technology concentration',value:56,assessment:'Elevated'},{label:'Equity market beta',value:68,assessment:'Aligned'},{label:'Liquidity coverage',value:86,assessment:'Strong'},{label:'Currency exposure',value:42,assessment:'Managed'}] },
  allocation: { assetClasses:[{label:'Equity',value:63.4,colour:'#8ed1ff'},{label:'ETF',value:14.8,colour:'#5d8cff'},{label:'Fixed income',value:10.3,colour:'#8ce2c2'},{label:'Cash',value:12,colour:'#f1c37a'}], sectors:[{label:'Technology',value:33.8,colour:'#8ed1ff'},{label:'Global equity',value:14.8,colour:'#6e9fff'},{label:'Semiconductors',value:15.1,colour:'#b99cff'},{label:'Government & credit',value:10.3,colour:'#8ce2c2'},{label:'Real assets',value:4.7,colour:'#f1c37a'}], regions:[{label:'North America',value:55,colour:'#8ed1ff'},{label:'Europe',value:24,colour:'#8ce2c2'},{label:'Global',value:14.8,colour:'#b99cff'},{label:'United Kingdom',value:6.2,colour:'#f1c37a'}] },
  cashFlow:[{date:'2026-07-12',type:'Dividend',amount:126,note:'VWRL distribution'},{date:'2026-06-28',type:'Deposit',amount:10000,note:'Capital contribution'},{date:'2026-06-25',type:'Fee',amount:-188,note:'Management fee'},{date:'2026-06-10',type:'Dividend',amount:95,note:'MSFT distribution'},{date:'2026-05-30',type:'Deposit',amount:5000,note:'Capital contribution'},{date:'2026-05-14',type:'Dividend',amount:54,note:'AGG distribution'},{date:'2026-04-30',type:'Withdrawal',amount:-2000,note:'Client withdrawal'}],
  aiAnalysis:{generatedAt:'2026-07-21T08:30:00Z',marketView:'Market breadth remains constructive, while technology leadership continues to support the portfolio’s primary growth allocation.',portfolioView:'The portfolio is ahead of its benchmark since inception. Technology exposure is elevated but offset by global equity, fixed income and a deliberate liquidity reserve.',actions:[{title:'Monitor technology exposure',detail:'Technology and semiconductors are above the preferred range; review after the next earnings cycle.',priority:'Monitor'},{title:'Rebalance liquidity reserve',detail:'Cash is above the tactical floor and can be retained for selective deployment.',priority:'Opportunity'},{title:'Review factor sensitivity',detail:'Re-run the growth-factor stress test if equity volatility rises.',priority:'Review'}],confidence:0.84},
  reports:[{id:'r_1',name:'Monthly Portfolio Review',period:'June 2026',generatedAt:'2026-07-01',status:'Ready'},{id:'r_2',name:'Risk & Exposure Brief',period:'Q2 2026',generatedAt:'2026-07-02',status:'Ready'},{id:'r_3',name:'Attribution & Benchmark Review',period:'2026 YTD',generatedAt:'2026-07-03',status:'Ready'},{id:'r_4',name:'Tax Activity Summary',period:'2026 YTD',generatedAt:'',status:'Preparing'},{id:'r_5',name:'Annual Suitability Review',period:'2026',generatedAt:'',status:'Unavailable'}],
  account:{advisor:'Arima Portfolio Desk',reportingFrequency:'Monthly',valuationDate:'2026-07-21',dataStatus:'stale',updatedAt:'2026-07-21T08:30:00Z'},
};

export interface PortfolioDataProvider { getSnapshot(): Promise<PortfolioSnapshot>; }
export const mockPortfolioDataProvider: PortfolioDataProvider = { async getSnapshot() { return portfolioLabMockData; } };
