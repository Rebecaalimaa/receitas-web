import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const url = 'https://receitasapi-b-2025.vercel.app/receitas'
  const [receitas, setReceitas] = useState<any[]>([])

  const [novoNome, setNovoNome] = useState("")
  const [novoTipo, setNovoTipo] = useState("")
  const [novoIngredientes, setNovoIngredientes] = useState("")
  const [novoModoFazer, setNovoModoFazer] = useState("")
  const [novaImg, setNovaImg] = useState("")
  const [novoCusto, setNovoCusto] = useState("")

  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [textoEdicao, setTextoEdicao] = useState<any>({})

  function obterDados() {
    axios.get(url).then((response) => {
      console.log("API retornou:", response.data)
      setReceitas(response.data)
    })
  }

  useEffect(() => {
    obterDados()
  }, [])

  async function adicionarReceita() {
    if (!novoNome || !novoTipo) return;

    const novaReceita = {
      nome: novoNome,
      tipo: novoTipo,
      ingredientes: novoIngredientes,
      modoFazer: novoModoFazer,
      img: novaImg,
      custoAproximado: parseFloat(novoCusto)
    };

    try {
      const response = await axios.post(url, novaReceita);
      setReceitas([...receitas, response.data]);
      setNovoNome(""); setNovoTipo(""); setNovoIngredientes("");
      setNovoModoFazer(""); setNovaImg(""); setNovoCusto("");
    } catch (error) {
      console.error("Erro ao adicionar receita:", error);
    }
  }

  async function atualizarReceita(id: number) {
    try {
      const response = await axios.put(`${url}/${id}`, textoEdicao);
      setReceitas(receitas.map(r => r.id === id ? response.data : r));
      setEditandoId(null);
      setTextoEdicao({});
    } catch (error) {
      console.error("Erro ao atualizar receita:", error);
    }
  }

  async function removerReceita(id: number) {
    try {
      await axios.delete(`${url}/${id}`);
      setReceitas(receitas.filter(r => r.id !== id));
    } catch (error) {
      console.error("Erro ao remover receita:", error);
    }
  }

  return (
    <>
      <header>
        <h1>Livro de Receitas</h1>
      </header>


      <div className="form-adicionar">
        <h3>Adicionar Receita</h3>
        <input placeholder="Nome" value={novoNome} onChange={e => setNovoNome(e.target.value)} />
        <input placeholder="Tipo" value={novoTipo} onChange={e => setNovoTipo(e.target.value)} />
        <input placeholder="Ingredientes" value={novoIngredientes} onChange={e => setNovoIngredientes(e.target.value)} />
        <input placeholder="Modo de Fazer" value={novoModoFazer} onChange={e => setNovoModoFazer(e.target.value)} />
        <input placeholder="URL da Imagem" value={novaImg} onChange={e => setNovaImg(e.target.value)} />
        <input placeholder="Custo Aproximado" value={novoCusto} onChange={e => setNovoCusto(e.target.value)} />
        <button onClick={adicionarReceita}>Adicionar</button>
      </div>

      <main>
        {receitas.map(receita => (
          <div key={receita.id} className="card">
            {editandoId === receita.id ? (
              <>
                <input value={textoEdicao.nome} onChange={e => setTextoEdicao({...textoEdicao, nome: e.target.value})} />
                <input value={textoEdicao.tipo} onChange={e => setTextoEdicao({...textoEdicao, tipo: e.target.value})} />
                <input value={textoEdicao.ingredientes} onChange={e => setTextoEdicao({...textoEdicao, ingredientes: e.target.value})} />
                <input value={textoEdicao.modoFazer} onChange={e => setTextoEdicao({...textoEdicao, modoFazer: e.target.value})} />
                <input value={textoEdicao.img} onChange={e => setTextoEdicao({...textoEdicao, img: e.target.value})} />
                <input value={textoEdicao.custoAproximado} onChange={e => setTextoEdicao({...textoEdicao, custoAproximado: e.target.value})} />
                <button onClick={() => atualizarReceita(receita.id)}>Salvar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <h2>{receita.nome}</h2>
                <img src={receita.img} alt={receita.nome} />
                <p>Tipo: {receita.tipo}</p>
                <p>Ingredientes: {receita.ingredientes}</p>
                <p>Modo de Fazer: {receita.modoFazer}</p>
                <p>Custo: R$ {receita.custoAproximado}</p>
                <button onClick={() => { setEditandoId(receita.id); setTextoEdicao(receita) }}>Editar</button>
                <button onClick={() => removerReceita(receita.id)}>Excluir</button>
              </>
            )}
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
