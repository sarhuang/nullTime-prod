/* GameTools class, all functions needed by the server
 * to keep track of all games and cards
 */

package null-time-api-temp

class GameTools {

  val games : MutableMap<String, Instance>

  constructor() {
    val SENTINEL = Instance("SENTINEL")
    this.games = mutableMapOf(Pair("SENTINEL", SENTINEL))
  }

  //class functions

  //generates a game instance and returns the code for that instance
  fun genInstance() : String {
    val charPool = "BCDFGHJKLMNPQRSTVWXZ"
    var randomString = ""

    //generate random strings until one is made that doesn't
    //match any current game instances
    while(games.get(randomString) != null) {

    randomString = (1..6)
    .map {kotlin.random.Random.nextInt(0, charPool.length) }
    .map(charPool::get)
    .joinToString("");
    }

    //generate instance and add it to current games active
    games.put(randomString, Instance(randomString))

    return randomString
  }

  //removes instance from all active games, returns true if successful
  fun deleteInstance(gameCode : String) : Boolean {

    if (games.remove(gameCode) == null) return false
    return true
  }

  //checks if instance exists, returns true if exists
  fun checkInstance(gameCode : String) : Boolean {
    return games.containsKey(gameCode)
  }

  //returns instance from all active instances CAN BE NULLABLE
  fun getInstance(gameCode : String) : Instance? {
    return games.get(gameCode)
  }

  //finds game from code, adds card to game, returns true if successful
  fun addCardToGame(gameCode : String, card : Card) : Boolean {

    if (games.get(gameCode) == null) return false
    return games.get(gameCode)!!.addCard(card)
  }

  //finds game from code, removes card from game, returns true if successful
  fun removeCardFromGame(gameCode : String, card : Card) : Boolean {

    if (games.get(gameCode) == null) return false
    return games.get(gameCode)!!.removeCard(card)
  }
}