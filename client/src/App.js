import 'antd/dist/reset.css'

import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import People from './components/pages/People'

import './App.css'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
})
const App = () => {

    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home  />} />
                    <Route path="/people/:id" element={<People  />} />
                </Routes>
            </Router>
        </ApolloProvider>
    )
}

export default App
