import { environment } from "src/environments/environment"

export const getNewLobbyCode = async (): Promise<string> => {
  const url = environment.apiURL + "lobby/create"

  return fetch(url, { method: "POST" })
    .then(res => res.json())
    .then(data => data.lobbyKey)
    .catch(e => console.log(url + " error"))
}

export const submitCards = async (lobbyKey: string, cards: string[]): Promise<String> => {
  const url = environment.apiURL + "lobby/card/submit"

  return fetch(url, { method: "POST", body: JSON.stringify({ lobbyKey, cards }) })
    .then(res => res.json())
    .then(data => data.id || "error")
}

export const closeLobby = async (lobbyKey: string): Promise<string[]> => {
  const url = environment.apiURL + "lobby/close"

  return fetch(url, { method: "POST", body: JSON.stringify({ lobbyKey })})
    .then(res => res.json())
    .then(data => data.cards)
}

export const pingLobby = async (lobbyKey: string): Promise<boolean> => {
  const url = environment.apiURL + "lobby/ping"

  return fetch(url, { method: "POST", body: JSON.stringify({ lobbyKey }) })
    .then(res => res.json())
    .then(data => data.status)
}