const Alerta = ({alerta}) => {
    return (
      <div className={`${alerta.error ? 'bg-red-500 text-red-500' : 'from-blue-400 to-blue-600'}
      bg-gradient-to-br text-center p-2 rounded-xl  text-white font-bold text-sm my-5`}>
          {alerta.msg}
      </div>
    )
  }
  
  export default Alerta