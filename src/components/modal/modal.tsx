// "use client"

import styles from '@/components/modal/modal.module.css'
// import { useState } from 'react'


// const Modal = () => {
//   const [ openModal, setOpenModal ] = useState(false)
// 	const [prioridade, setPrioridade] = useState('')

// 	const inputsChange = (e:any)=>{
		
// 	}

//   const handleChange = (event:any) => {
//     setPrioridade(event.target.value);
//   };


//   return (
//     <div className={styles.modal} >
//       <input placeholder='Escreva a Tarefa' className={styles.input} type="text" onChange={inputsChange} name='titulo' />
      
//       <select className={styles.prioridade} value={prioridade} onChange={handleChange}>
//         <option value="baixa">Baixa</option>
//         <option value="media">Média</option>
//         <option value="alta">Alta</option>
//         <option value="urgente">Urgente</option>
//       </select>
//     </div>
//   )
// }

// export default Modal


import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }:any) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;