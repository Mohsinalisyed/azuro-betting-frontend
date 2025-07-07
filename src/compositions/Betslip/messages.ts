import { BetslipDisableReason } from '@azuro-org/sdk'


export default {
  empty: {
    title: {
      en: 'Betslip is empty',
      fr: 'Le coupon est vide',
    },
    text: {
      en: 'To add a bet to your betslip, choose a market and make your selection',
      fr: 'Pour ajouter un pari à votre coupon, choisissez un marché et faites votre sélection',
    },
  },
  settings: {
    en: 'Settings',
    fr: 'Paramètres',
  },
  single: {
    en: 'Single bet',
    fr: 'Pari simple',
  },
  batch: {
    en: 'Single bets ({count})',
    fr: 'Paris simples ({count})',
  },
  combo: {
    en: 'Combo ({count})',
    fr: 'Combiné ({count})',
  },
  betAmount: {
    en: 'Bet amount',
    fr: 'Montant du pari',
  },
  totalBet: {
    en: 'Total bet',
    fr: 'Pari total',
  },
  warnings: {
    [BetslipDisableReason.ComboWithForbiddenItem]: {
      en: 'One or more conditions can\'t be used in combo',
      fr: 'Une ou plusieurs conditions ne peuvent pas être utilisées dans un combiné',
    },
    [BetslipDisableReason.BetAmountGreaterThanMaxBet]: {
      en: 'The maximum allowable bet amount is capped at {maxBet} {symbol}.',
      fr: 'Le montant maximal autorisé pour le pari est limité à {maxBet} {symbol}.',
    },
    [BetslipDisableReason.BetAmountLowerThanMinBet]: {
      en: 'The minimum allowable bet amount is capped at {minBet} {symbol}.',
      fr: 'Le montant minimal autorisé pour le pari est limité à {minBet} {symbol}.',
    },
    // [BetslipDisableReason.ComboWithLive]: {
    //   en: 'Live outcome can\'t be used in combo',
    // },
    [BetslipDisableReason.ConditionState]: {
      en: 'One or more outcomes have been removed or suspended. Review your betslip and remove them.',
      fr: 'Un ou plusieurs résultats ont été supprimés ou suspendus. Vérifiez votre coupon et retirez-les.',
    },
    [BetslipDisableReason.PrematchConditionInStartedGame]: {
      en: 'Game has started',
      fr: 'Le match a commencé',
    },
    [BetslipDisableReason.ComboWithSameGame]: {
      en: 'Combo with outcomes from same game prohibited, please use Batch bet',
      fr: 'Combiné avec des résultats du même match interdit, veuillez utiliser le pari groupé',
    },
    // [BetslipDisableReason.BatchWithLive]: {
    //   en: 'Live outcome can\'t be used in batch',
    // },
    [BetslipDisableReason.FreeBetWithLive]: {
      en: 'FreeBet can\'t be used for live',
      fr: 'Le pari gratuit ne peut pas être utilisé en direct',
    },
    [BetslipDisableReason.FreeBetWithCombo]: {
      en: 'FreeBet can\'t be used for combo',
      fr: 'Le pari gratuit ne peut pas être utilisé dans un combiné',
    },
    // [BetslipDisableReason.FreeBetWithBatch]: {
    //   en: 'FreeBet can\'t be used for batch',
    // },
    [BetslipDisableReason.FreeBetExpired]: {
      en: 'FreeBet is expired',
      fr: 'Le pari gratuit a expiré',
    },
    [BetslipDisableReason.FreeBetMinOdds]: {
      en: 'Odds\'s too low for FreeBet',
      fr: 'Les cotes sont trop basses pour le pari gratuit',
    },
  },
}
