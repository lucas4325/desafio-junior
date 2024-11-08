"use client"

import Linha from "@/components/linha/linha";
import Modal from "@/components/modal/modal";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { v4 } from 'uuid'


const listaM = [
  {
    tarefa: 'teste', 
    prioridade: {
      id: 2,
      valor: 'media'
    }, 
    concluida: true, 
    id: '82219ec1-f1b4-4c48-9d46-0c040c979a80'
  }
]


export default function Home() {
  const [ lista, setLista ] = useState(listaM)
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ tarefa, setTarefa ] = useState('')
  const [ prioridade, setPrioridade ] = useState({})

  const addTarefa = (c = false)=>{
    setLista((values: any) =>{
      return [
        ...values,
        {
          tarefa: tarefa,
          prioridade: prioridade === '' || prioridade === undefined ? {id: 1 , valor :'baixa'} : prioridade ,
          concluida: c,
          id: v4()
        }
      ]
    })
  }

  const removeTarefa = (id:string)=>{
    let copiaLista = lista
    
    copiaLista.map((e:any, i:number)=>{
      if(e.id === id && !e.concluida) {
        copiaLista.splice(i, 1)
      }
    })

    setLista([...copiaLista])
  }

  const handleConcluido = (m:any)=>{
    let copiaLista = lista

    copiaLista.map((e:any, i:number)=>{
      if(e.id === m.id) {
        copiaLista[i].concluida = m.marcado
      }
    })
    
    setLista([...copiaLista])
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filtro = ()=>{
    let l = lista.sort((a:any, b:any) => b.prioridade.id - a.prioridade.id);
  }

  const setaPrioridade = (e:any) => {
    let E = e.target.value
    let p = E == 'baixa' ? 1 : E == 'media' ? 2 : E == 'alta' ? 3 : 4
    setPrioridade({id: p, valor: E})
  }

  const editarTarefa = (v:any)=>{
    let copiaLista = lista

    copiaLista.map((e:any, i:number)=>{
      if(e.id === v.id) {
        copiaLista[i].tarefa = v.input
      }
    })
    
    setLista([...copiaLista])
  }

  useEffect(()=>{
    setPrioridade('')
    setTarefa('')
    
    filtro()
  }, [lista])
  return (
    <div className={styles.home}>
      <div className={styles.containerTitulo}>
        <h1>Painel de Tarefas</h1>
      </div>

      <div className={styles.containerTarefas}>
        <div className={styles.adicionar} >
          <button onClick={openModal}>Adiciona Tarefa</button>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <input placeholder='Escreva a Tarefa' className={styles.linhaInputs} type="text" onChange={(e)=>{setTarefa(e.target.value)}} name='titulo' />
            <select className={styles.linhaInputs} name="prioridade" onChange={setaPrioridade}>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
              <option value="urgente">Urgente</option>
            </select>
            
            <button onClick={()=>{closeModal();addTarefa()}}>Adicionar tarefa</button>
          </Modal>
        </div>

        <div className={styles.tarefas}>
          <div className={styles.headerTabela}>
            <span>Tarefa</span>
            <span>Prioridade</span>
            <span>Concluido</span>
            <span>Excluir</span>
          </div>

          <div className={styles.conteudoTabela} >
            {
              lista && lista.length >= 0 ? 
              lista.map((e:any, i:number)=>{
                return(
                  <Linha key={i} editarTarefa={editarTarefa} remover={(id:string)=>{removeTarefa(id)}} concluido={handleConcluido} concluida={e.concluida} tarefa={e.tarefa} prioridade={e.prioridade.valor} ID={e.id} />
                )
              }) : <></>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
