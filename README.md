
## React Hooks

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


React Hooks: useCallback, useMemo, useReducer,useState and useEffect
A new feature of React 16.8.0 that let you use class features in functional components. With Hooks, you can now create states and use lifecycles methods. ‘useState’ allows you to create states for your variables like this:

const [value, setValue] = useState(defaultValue)

`useEffect` allows you to create side eff
        useEffect(() => {
        , [dependency]
        });
The array given in parameters lets you fire the side effect only when the value in the array is changed. This way, you can easily create lifecycle methods.


useCallback and useMemo of them take a function and an array of dependencies as parameters like ‘useEffect’. The function’s return value will only be changed if one of the dependencies value changes — otherwise a cached value will be returned.

useCallback(
  doSomething()
}, [dependencies])

useMemo(() => {
  doSomething()
}, [dependencies])

useEffect(() => {
  doSomething()
}, [dependencies])

An alternative to useState. Accepts a reducer of type (state, action) => newState, and returns the current state paired with a dispatch method given in useTweetsReducer file. 