import 'antd/dist/reset.css'

import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client'
import { GET_PERSONS } from './queries'

import './App.css'
import Title from './components/layout/Title'
import AddContact from './components/forms/AddContact'
import Contacts from './components/lists/Contacts'
import { useState } from 'react'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
})
const App = () => {
    const [persons, setPersons] = useState([]);

    return (
        <ApolloProvider client={client}>
            <div className='App'>
                <Title />
                <AddContact persons={persons} setPersons={setPersons}/>
                <Contacts persons={persons} setPersons={setPersons} />
            </div>
        </ApolloProvider>
    )
}

export default App
