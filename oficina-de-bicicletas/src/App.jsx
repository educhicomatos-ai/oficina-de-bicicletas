// import { useState } from 'react'
import { useState } from 'react'
import './App.css'
// import Ordem from './components/Ordem'

function App() {


  const ordem = [
    {
    idOrdem: crypto.randomUUID(),
    dsCliente: "Marina Alves",
    dsServico: "Troca de pastilhas de freio",
    nuValor: 85,
    fgConcluida: false
    },

    {
    idOrdem: crypto.randomUUID(),
    dsCliente: "João Gomes",
    dsServico: "Calibrar os pneus",
    nuValor: 45,
    fgConcluida: false
    },

    {
    idOrdem: crypto.randomUUID(),
    dsCliente: "Eduardo Matos",
    dsServico: "Montar o guidão",
    nuValor: 55,
    fgConcluida: true
    }
  
  ]
  
  const [clientList, setClientList] = useState(ordem)

  const [client, setClient] = useState("")
  const [service, setService] = useState("")
  const [value, setValue] = useState(0)
  const [error, setError] = useState("")

  const addService = (e) => {
    e.preventDefault()

    if(client !== "" || service !== "") 
      { 
      
        if (value == isNaN || value >= 1) {
        const newUser = { idOrdem: crypto.randomUUID(), dsCliente: client  || "Novo usuário", fgConcluida: false, dsServico: service ||"indefinido", nuValor: value || "sem preço" }
        setClientList([...clientList, newUser])
        setClient("")
        setService("")
        setValue(0)
        setError("")
        } else {
          setError("Valor Inválido")
        }
    } else { 
      setError("Campos inválidos")
    }

  }

  const removeClient = (id) => {

    if(!confirm("Tem certeza que deseja remover este cliente?")) return;

    const newList = clientList.filter((user) => user.idOrdem !== id)
    setClientList(newList)

  }

  const alternar = (id) => {
    setClientList(clientList.map((user) => user.idOrdem === id ? { ...user, fgConcluida: !user.fgConcluida } : user))

  }



  return (
    <>

      {/* <Ordem /> */}

      <form>
            cliente <input value={client} onChange={(e) => setClient(e.target.value)} />
            serviço <input value={service} onChange={(e) => setService(e.target.value)} />
            valor <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />

            <button onClick={addService}> ADD </button> 
      </form>

      <p>{error}</p>

      <ul>
          <p>Total de ordens: {clientList.length}</p>
          

      </ul>

      <ul>
          {clientList.map((user) => (
            
            <li key={user.idOrdem}>
              <h3>{user.dsCliente}</h3>
              <h2>{user.dsServico}</h2>
              <p>{user.nuValor} R$</p>
              <span id='Card'>{user.fgConcluida === true ? "Concluido" : "Pendente"}</span>
              <button onClick={() => alternar(user.idOrdem)}>Status Tarefa</button>
              <button onClick={() => removeClient(user.idOrdem)}>Remover</button>
            </li>
          ))}

          <p>{clientList.length === 0 && "Sem ordens."}</p> 
        </ul>
    </>
  )
}

export default App
