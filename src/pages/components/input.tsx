export default function Input({name, placeholder, method="text", value, onChange}: {name: string, placeholder: string, method?: string, value?: any, onChange: React.ChangeEventHandler<HTMLInputElement> | undefined}) {
  return (
    <div className="flex gap-2 p-2 w-full">
      <label className="flex">{name}</label>
      <input placeholder={placeholder} className="grow outline-none w-full bg-transparent" type={method} value={value} onChange={onChange} />
    </div>
  )
}
