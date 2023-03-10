# useStore as a store

You can try a live demo [here](https://).

```bash
npm install @nateghi/use-state # or yarn add @nateghi/use-state
```

## First create a store

```jsx
import { create } from '@nateghi/use-state'

const useState = create({
  count: 0,
  todos: [],
  theme: 'dark'
})
```

## Then bind your components, and that's it!

```jsx
function App() {
  const [theme] = useState('theme')
  return <h1>Theme: {theme}</h1>
}

function ThemeController() {
  const [theme, setTheme] = useState('theme')
  return <button onClick={() => setTheme('light')}>{theme}</button>
}
```