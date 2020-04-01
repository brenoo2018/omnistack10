import React, { useState, useEffect } from 'react'
import api from './services/api.js'

import './Global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

// Componente: um bloco isolado de html, css, js o qual não interfere no restante do app

//Propriedade: informações que um componente PAI passa o componente FILHO

//Estado: informações mantidas pelo componente (IMUTABILIDADE)


import DevForm from './components/DevForm/index.js'
import DevItem from './components/DevItem/index.js'

function App() {
    const [devs, setDevs] = useState([])

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs')

            setDevs(response.data)
        }

        loadDevs()
    }, [])

    async function handleAddDev(data) {
        const response = await api.post('/devs', data)

        setDevs([...devs, response.data])
    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev}/>
                    ))}

                </ul>
            </main>
        </div>
    )
}

export default App