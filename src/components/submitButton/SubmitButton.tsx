interface HandleProps {
  handle: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const SubmitButton = ({ handle }: HandleProps) => {
  return (
    <button onClick={handle} className="w-11/12 h-12 rounded-3xl bg-bgСolor text-2xl text-cyan-50 font-medium">отправить</button>
  )
}

export default SubmitButton