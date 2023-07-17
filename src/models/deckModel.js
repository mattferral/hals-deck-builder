const deckModel = {
  id: undefined,
  name: '',
  format: 'standard',
  colors: '',
  commander: undefined,
  maxCount: 60,
  cardCount: 0,
  duplicateLimit: 4,
  backgroundImg: undefined,
  decklist: {
    creature: [],
    sorcery: [],
    instant: [],
    artifact: [],
    enchantment: [],
    land: []
  },
  sideboard: [

  ],
  basicLands: {
    plains: 0,
    forest: 0,
    mountain: 0,
    swamp: 0,
    island: 0
  }
};

export default deckModel;