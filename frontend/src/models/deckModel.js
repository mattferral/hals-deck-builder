const deckModel = {
  id: undefined,
  name: '',
  format: 'standard',
  colors: [],
  minCount: 60,
  cardCount: 0,
  duplicateLimit: 4,
  backgroundImg: undefined,
  deckList: {
    commander: [],
    artifact: [],
    creature: [],
    enchantment: [],
    instant: [],
    land: [],
    planeswalker: [],
    sorcery: [],
  },
  sideboard: [

  ],
  basicLands: {
    plains: 0,
    forest: 0,
    mountain: 0,
    swamp: 0,
    island: 0,
    colorless: 0,
  }
};

export default deckModel;