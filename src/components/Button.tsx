import './Button.css'

export default function Button({ id, textContent, onClick }: { id: string; textContent: string; onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <>
      <button id={id} className='button' onClick={onClick}>
        <span className='button_lg'>
          <span className='button_sl'></span>
          <span className='button_text'>{textContent}</span>
        </span>
      </button>
    </>
  )
}