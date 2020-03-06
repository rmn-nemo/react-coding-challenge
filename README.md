In the project directory, you can run:

### `npm start`

Features:
- Priority switching is availablle by drag-and-drop tasks in column.
- A syncronization algorythm is implemented in order to support proper ordering 
as well as ordering when new tasks added or existing tasks deleted.

Q: Describe how you would implement persisting the custom order of issues:
A: I would implement the same logic as in the coding challenge task, taking into account server side technologies.
Shifting and switching operations could be database queries implemented in raw or by using ORM.

Points to improve:
- error handling
- logout
- responsive designt
- could be done more clean with redux useSelector and useDispatch

Some issues experiencing on macOS:
- in order to run `npm test` you should have `watchman` installed as a system dependency: `brew install watchman`
