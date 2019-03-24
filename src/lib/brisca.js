class briscaEngine {
  static pointMapping = {
    0: 11,
    2: 10,
    7: 2,
    8: 3,
    9: 4
  };
  static determineWinner(life, cardA, cardB) {
    var winner = { card: cardA, message: `REASON_DEFEAT` };

    if (!this.determineLife(cardA, life) && this.determineLife(cardB, life)) {
      winner = { card: cardB, message: `REASON_TRUMP` };
    }

    if (this.determineSuit(cardB) === this.determineSuit(cardA)) {
      if (this.determinePointValue(cardB) > this.determinePointValue(cardA)) {
        winner = { card: cardB, message: `REASON_POINTS` };
      }

      if (this.determinePointValue(cardA) == this.determinePointValue(cardB)) {
        if (this.determineFace(cardA) > this.determineFace(cardB)) {
          winner = { card: cardA, message: `REASON_NUMBER` };
        } else {
          winner = { card: cardB, message: `REASON_NUMBER` };
        }
      }
    }

    return winner;
  }
  static determineLife(card, life) {
    return this.determineSuit(card) === this.determineSuit(life);
  }
  static determineSuit(card) {
    return Math.floor(card / 10);
  }
  static determinePointValue(card) {
    return this.pointMapping[this.determineFace(card)] || 0;
  }
  static determineFace(card) {
    return card - this.determineSuit(card) * 10;
  }
}

export default briscaEngine;
