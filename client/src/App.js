import { useState } from 'react'
import 'antd/dist/reset.css'

import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'

import './App.css'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
})
const App = () => {
    const [persons, setPersons] = useState([]);

    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home  />} />
                </Routes>
            </Router>
        </ApolloProvider>
    )
}

export default App
