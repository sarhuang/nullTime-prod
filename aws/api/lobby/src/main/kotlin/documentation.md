##### endpointCreate
- Creates a lobby in the database
- Type: POST
- Return: 6 digit code for lobby

##### endpointDelete
- Deletes a lobby in the database
- Type: DELETE
- Return: whether lobby was successfully deleted

##### endpointFinish
- Ends a given game instance in the database and moves cards to be stored for later if the user would like to reuse them
- Type: GET
- Return: whether lobby was successfully ended

##### endpointCardSubmit
- Adds card to given game
- Type: POST
- Return: whether card was successfully added, if not, why

##### endpointCardDelete
- Removes card from given game
- Type: DELETE
- Return: whether card was successfully deleted, if not, why

##### endpointCardModify
- Modifies card data in given game
- Type: PUT
- Return: whether card was successfully modified, if not, why