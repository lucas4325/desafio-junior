"use client"
import { useState } from 'react'
import styles from '@/components/linha.module.css'


// interface ILinha {
// 	titulo: string,
// 	descricao: string,
// 	prioridade: string,
// }

const Linha = ()=> {
	const [inputs, setInputs] = useState()
	const [prioridade, setPrioridade] = useState('')

	const inputsChange = (e:any)=>{
		
	}

  const handleChange = (event:any) => {
    setPrioridade(event.target.value);
  };
	

	return(
		<div className={styles.linha}>
			<input placeholder='Digite o titulo' className={styles.linhaInputs} type="text" onChange={inputsChange} name='titulo' />
			<input placeholder='Digite a descrição' className={styles.linhaInputs}  type="text" onChange={inputsChange} name='descricao' />

			<select className={styles.linhaInputs} value={prioridade} onChange={handleChange}>
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
        <option value="urgente">Urgente</option>
      </select>
			<div></div>
			<input className={styles.checkbox} type="checkbox" name="concluido" id="" />
		</div>
	)
}

export default Linha