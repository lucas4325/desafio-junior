"use client"
import { useEffect, useState } from 'react'
import styles from '@/components/linha/linha.module.css'


interface ILinha {
	tarefa: string,
	prioridade: 'baixa' | 'media' | 'alta' | 'urgente',
	concluida: boolean,
	ID: string,
	concluido: any,
	remover: any,
	editarTarefa: any,
}

const Linha = ({tarefa, concluido, prioridade, concluida, ID, remover, editarTarefa }:ILinha)=> {
	const [ c, setC ] = useState(concluida)
	const [ editar, setEditar ] = useState<boolean>(true)
	const [ input, setInput ] = useState(tarefa)


	const marcado = (event:any)=>{
		setC(event.target.checked)
		concluido({id: ID, marcado: event.target.checked})
	}

	const remove = ()=>{
		remover(ID)
	} 

	const editarOpen = ()=>{
		setEditar(false)
	}

	const desabilitarEdicao = ()=>{
		setEditar(true)
	}

	const enter = (e:any) =>{
		if (e.key === 'Enter') {
			desabilitarEdicao()
		}
	}

	const editaInput = (e:any) => {
		setInput(e.target.value)
	}

	useEffect(()=>{
		setC(concluida)
	}, [concluida])

	useEffect(()=>{
		editarTarefa({id: ID, input: input})
	}, [input])

	useEffect(()=>{
		setInput(tarefa)
	}, [tarefa])
	return(
		<div className={styles.linha} >
			<input onBlur={desabilitarEdicao} onKeyDown={enter} onChange={editaInput} placeholder='Escreva a Tarefa' disabled={editar} value={input} className={styles.linhaInputs} type="text" name='titulo' />
			
			<select className={styles.linhaSelect} disabled={true} value={prioridade} name="prioridade" >
				<option value="baixa">Baixa</option>
				<option value="media">Média</option>
				<option value="alta">Alta</option>
				<option value="urgente">Urgente</option>
			</select>

			<input className={styles.checkbox} type="checkbox" checked={c} name="concluido" onChange={marcado} />

			<button className={styles.excluir} onClick={remove}>X</button>

			<button className={styles.editar} onClick={editarOpen}><img src="editar.png" alt="" /></button>
		</div>
	)
}

export default Linha