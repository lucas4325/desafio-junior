"use client"

import Linha from "@/components/linha";
import styles from "./page.module.css";
import { useEffect, useState } from "react";


const listaM:any = [

]

export default function Home() {
  const [ lista, setLista ] = useState(listaM)

  const addTarefa = ()=>{
    setLista((values:any) =>{
      return([
        ...values,
        {
          titulo:'',
          descricao: '',
          prioridade: '',
          concluida: false,
        }
      ])
    })
  }
  
  useEffect(()=>{
    console.log(lista);
  }, [lista])
  return (
    <div className={styles.home}>
      <div className={styles.containerTitulo}>
        <h1>Painel de Tarefas</h1>
      </div>

      <div className={styles.containerTarefas}>
        <div className={styles.tarefas}>
          <button onClick={addTarefa} className={styles.adicionar} > Adicionar</button>

          <div className={styles.headerTabela}>
            <span>Titulo</span>
            <span>Descrição</span>
            <span>Prioridade</span>
            <span>Concluido</span>
          </div>

          <div className={styles.conteudoTabela} >
            {
              lista.map((e:any, i:number)=>{
                return(
                  <Linha key={i} />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
