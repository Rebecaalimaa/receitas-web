import './App.css'
import {useState, useEffect} from 'react'
import  axios from 'axios'


function App() {

  const url = './receitas.json'
  const [receitas, setReceitas] = useState([])


  function obterDados() {
    axios.get(url).then((response) => {
      setReceitas(response.data.receitas)
    })
  }
  
  useEffect(() => {
    obterDados()
  }, [])
  

  return(
    <>
    <header>
      <h1>Livro de Receitas</h1>
    </header>
    <main>
      {receitas.map((receita: any, index) => (
        <div key={index} className="card">
          <h2>{receita.titulo}</h2>
          <img src={receita.imagem} alt={receita.titulo} />
          <h3>Ingredientes:</h3>
          <ul>
            {receita.ingredientes.map((ingrediente: string, idx: number) => (
              <li key={idx}>{ingrediente}</li>
            ))}
       </ul>
          <h3>Modo de Preparo:</h3>
          <p>{receita.modoPreparo}</p>
        </div>
      ))}
    </main>
    <footer>
      <h2>By Rebecaalimaa</h2>
    </footer>
    </>
  )
}

export default App