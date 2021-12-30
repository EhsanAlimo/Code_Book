# Code Book

is a web application to satisfy my own needs to save some of the codes I want to use later and having a quick access to them.

## Usage

It is pretty simple web application which allows you to create, show, delete and update your codes in the code store. firstly you need to login and fill out the form which contains Title, Description and Code inputs. After submition, the user can have access to all stored codes wich displayed by syntax highlighter on seperated boxes. Prism has been used for synatx highlighing to make better user experience in my web application. please click [CodeBook](https://code-book.vercel.app/) to see the web application.

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
