const Alerta = ({alerta}) => {
    return (
      <div className={`${alerta.error ? 'bg-red-500 ' : 'from-blue-500 to-blue-600'}
      bg-gradient-to-br text-center p-1 rounded-xl  text-white font-bold text-sm my-2`}>
          {alerta.msg}
      </div>
    )
  }
  
  export default Alerta