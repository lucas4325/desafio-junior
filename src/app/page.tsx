import styles from "./page.module.css";


// const lista = [

// ]

export default function Home() {
  
  
  return (
    <div className={styles.home}>
      <div className={styles.containerTitulo}>
        <h1>Painel de Tarefas</h1>
      </div>

      <div className={styles.containerTarefas}>
        <div className={styles.tarefas}>

        </div>
      </div>
    </div>
  );
}
