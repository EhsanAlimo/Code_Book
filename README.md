# Code Book

is a web application to satisfy my own needs to save some of the codes I want to use later and having a quick access to them.

## Usage

It is pretty simple web application which allows you to create, show, delete and update you codes in the code store. firstly you need to login and have fill out the form which contains Title, Description and Code inputs. all the created codes will go to you code store and you can have a access to them by clicking code store icon on the Navbar. [CodeBook](https://code-book.vercel.app/)

## CodeBox

In this project I have used Next.js, JavaScript, Tailwind CSS, Material UI, Firebase and some web-packages such as prism.

```javascript
import { useContext, createContext, useReducer } from "react";

export const StateProviderContext = createContext("");

export const StateProvider = ({ initialState, reducer, children }) => (
  <StateProviderContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateProviderContext.Provider>
);

export const useContextProvider = () => useContext(StateProviderContext);
```

## Future improvements

- Having a search functionality.
- More login providers such as github and twitter.
- Better responsive design.
