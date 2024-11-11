"use client"

import Linha from "@/components/linha/linha";
import Modal from "@/components/modal/modal";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { v4 } from 'uuid'
import { auth, googleProvider, db } from '../firebase'
import { signInWithPopup } from 'firebase/auth';
import { collection, addDoc, getDocs, setDoc, getDoc, doc } from "firebase/firestore"; 
// import "firebase/firestore";


const listaM:any = [
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
  const [ filtro, setFiltro ] = useState(listaM)
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ docId, setDocId ] = useState<string>()
  // const [ filtroP, setFiltroP ] = useState(listaM)

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

  const filtroF = (e:any)=>{
    let LISTA = e
    let l = LISTA.sort((a:any, b:any) => b.prioridade.id - a.prioridade.id);
    setFiltro([...l])
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

  // const filtroConcluidas = ()=>{

  // }

  // const filtroPrioridade = (event?:any)=>{
  //   let valor = event ? event.target.value : 'todas'
  //   let listaT = filtro

  //   if (valor === 'todas') {
  //     setFiltroP([...listaT])
  //   } else {
  //     let filtrado = listaT.filter((e:any) => e.prioridade.valor === valor);
  //     setFiltroP([...filtrado])
  //   }
  // }

  // useEffect(()=>{
  //   console.log(filtro);
  //   filtroPrioridade()
  // }, [filtro])

  useEffect(()=>{
    setPrioridade('')
    setTarefa('')
    console.log(lista);
    
    // filtroF()
    filtroF(lista)

  }, [lista])


  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      setLoading(false);
    } catch (error) {
      console.error("Erro ao autenticar com o Google: ", error);
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  const criaDocumento = async() => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        usuario: user.name,
        email: user.email,
        tarefas: filtro
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const getBanco = async()=>{
    const docRef = doc(db, 'users', ' tSytY9KgLhezyrnbuJpL');
    const docSnap = await getDoc(docRef);
  

    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => {
    //   console.log('do banco',doc.data());
    //   setDocId(doc.id)
    // });
  }

  const handleDocumento = ()=>{

  }

  useEffect(()=>{
    auth.onAuthStateChanged((val)=>{
      if (!val) {
        handleGoogleLogin();
      }
    })

    getBanco()
  }, [])


  useEffect(()=>{
    console.log(docId);
  }, [docId])
  return (
    <div className={styles.home}>
      <div className={styles.containerTitulo}>
        <h1>Painel de Tarefas</h1>
        <button onClick={handleLogout}>deslogar</button>
        <button onClick={criaDocumento}>enviar pro banco</button>

      </div>

      <div className={styles.containerTarefas}>
        <div className={styles.adicionar} >
          {/* <div className={styles.filtros}>
            <div className={styles.filtoConcluido}>
              <label htmlFor="">Status</label>

              <select onChange={filtroConcluidas}>
                <option value="todas">Todas</option>
                <option value="concluidas">Conluidas</option>
                <option value="naoConcluidas">Não Concluidas</option>
              </select>
            </div>

            <div className={styles.filtoPrioridade}>
              <label htmlFor="">Prioridade</label>

              <select onChange={filtroPrioridade}>
                <option value="todas">Todas</option>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
                </select>
                </div>
                </div> */}

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
              filtro && lista.length >= 0 ? 
              filtro.map((e:any, i:number)=>{
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
