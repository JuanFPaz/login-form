type propsInput = {
    textContent:string,
    id:string,
    className:string,
    type:string,
    cut?:string
    required:boolean
}

export default function Input({textContent,id,className,type,cut,required=false}:propsInput) {
  return (
    <div className='input-container ic'>
      <input id={id} name={id} className={className} type={type} placeholder=' ' required={required} />
      <div className={cut ? `cut ${cut}` : 'cut'}></div>
      <label htmlFor={id} className='placeholder'>
        {textContent}
      </label>
    </div>
  )
}
