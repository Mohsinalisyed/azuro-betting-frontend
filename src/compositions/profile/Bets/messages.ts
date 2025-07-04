import { BetType } from '@azuro-org/sdk'


export default {
  single: {
    en: 'Single',
    fr: 'Simple',
  },
  combo: {
    en: 'Combo',
    fr: 'Combiné',
  },
  live: {
    en: 'LIVE BET',
    fr: 'PARI EN DIRECT',
  },
  unique: {
    en: 'Unique Events',
    fr: 'Événements uniques',
  },
  market: {
    en: 'Market',
    fr: 'Marché',
  },
  outcome: {
    en: 'Outcome',
    fr: 'Résultat',
  },
  odds: {
    en: 'Odds',
    fr: 'Cotes',
  },
  betAmount: {
    en: 'Bet amount:',
    fr: 'Montant du pari :',
  },
  possibleWin: {
    en: 'Possible win:',
    fr: 'Gain possible :',
  },
  freebet: {
    en: 'Freebet',
    fr: 'Pari gratuit',
  },
  winning: {
    en: 'Winning:',
    fr: 'Gain :',
  },
  cashedOut: {
    en: 'Cash-Out Amount:',
    fr: 'Montant du retrait :',
  },
  loss: {
    en: 'Loss:',
    fr: 'Perte :',
  },
  redeem: {
    en: 'Redeem',
    fr: 'Récupérer',
  },
  refund: {
    en: 'Refund',
    fr: 'Remboursement',
  },
  gameState: {
    stopped: {
      en: 'Stopped',
      fr: 'Arrêté',
    },
    win: {
      en: 'Won',
      fr: 'Gagné',
    },
    lose: {
      en: 'Lost',
      fr: 'Perdu',
    },
    live: {
      en: 'Live’',
      fr: 'En direct',
    },
  },
  empty: {
    title: {
      en: 'No bets to be displayed',
      fr: 'Aucun pari à afficher',
    },
    text: {
      en: 'You have not placed any bets yet. Place your first bet and it will appear here.',
      fr: 'Vous n\'avez pas encore placé de pari. Placez votre premier pari et il apparaîtra ici.',
    },
  },
  cashout: {
    en: 'cash-out ≈{amount} {symbol}',
    fr: 'retrait ≈{amount} {symbol}',
  },
  tabs: {
    all: {
      en: 'All',
      fr: 'Tous',
    },
    [BetType.Unredeemed]: {
      en: 'Unredeemed',
      fr: 'Non récupérés',
    },
    [BetType.Accepted]: {
      en: 'Accepted',
      fr: 'Acceptés',
    },
    [BetType.CashedOut]: {
      en: 'Cashed-Out',
      fr: 'Retirés',
    },
    [BetType.Settled]: {
      en: 'Settled',
      fr: 'Réglés',
    },
  },
}
