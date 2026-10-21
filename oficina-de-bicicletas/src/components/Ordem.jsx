import { useState } from "react";

function Ordem() {
    const [form, setForm] = useState({ cliente: "", serviço: ""});
    const [reservas, setReservas] = useState([])

    const [userList, setUserList] = useState()

  const [name, setName] = useState("")
  const [info2, setInfo2] = useState("")

  const [idEditando, setIdEditando] = useState(undefined)

  const addUser = (e) => {
        e.preventDefault()

        if(idEditando) {
        const newList = userList.map((user) => user.id === idEditando ? { ...user, name, info2 } : user)
        setUserList(newList)
        setIdEditando(undefined)
        setName("")
        setInfo2("")
        return;
        }else {
        const newUser = { id: crypto.randomUUID(), name: name || "Novo usuário", intercambioFinalizado: false, info2: info2 || "EUA" }
        setUserList([...userList, newUser])
        setName("")
        setInfo2("")
        }
    }

    const cancelEdit = (e) => {
    e.preventDefault()
    setIdEditando(undefined)
    setName("")
    setInfo2("")
  }

    const mudar = (campo, valor) => {
        setForm({...form, [campo]: valor});
    }

    const enviar = (evento) => {
    evento.preventDefault();

    if (form.cliente === "" || form.serviço === "") {
    return;
    }

    setReservas([...reservas, form])

    }

    return(
        <>
        <form onSubmit={enviar}>
            cliente <input value={form.cliente} onChange={(e) => mudar("cliente", e.target.value)} />
            serviço <input value={form.serviço} onChange={(e) => mudar("serviço", e.target.value)} />
            <button onClick={cancelEdit}> {idEditando ? "Cancelar" : "Apagar"} </button>
            <button onClick={addUser}> {idEditando ? "Editar" : "Adicionar"} </button> 
        </form>
        </>
    )
}

export default Ordem

