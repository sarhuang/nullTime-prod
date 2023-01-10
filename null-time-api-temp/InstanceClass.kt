import java.time.LocalDateTime

/* Card class, these are the cards that exist in every game
 * each card contains an id unique to it, when it was made
 * who made it, and what is on the card
 */

class Card constructor (word: String, who: String) {
  val word: String = word
  val who: String = who

  //record date and generate id
  val date = LocalDateTime.now()
  val id = kotlin.random.Random.nextLong(1, Long.MAX_VALUE)
}

/* Instance class, responsible for a game instance
 * contains all the cards present in a game and the
 * game code
 */
class Instance {

  val cards : MutableList<Card>
  val code: String

  constructor(code: String) {
    this.code = code
    this.cards = mutableListOf()
  }

  //add card to cards, returns if successful
  fun addCard(card: Card) : Boolean {
    return cards.add(card)
  }

  //remove card from cards, returns if successful
  fun removeCard(card: Card) : Boolean {
    return cards.remove(card)
  }

  //update card from cards, returns if successful
  fun updateCard(card: Card) : Boolean {

    //replace card with new one
    if (cards.remove(cards.find{it.id == card.id})) {
      cards.add(card)
      return true
    }
    return false
  }
}