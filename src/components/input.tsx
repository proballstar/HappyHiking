/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export default function Input({name, placeholder, method="text", value, onChange}: {name: string, placeholder: string, method?: string, value?: any, onChange: React.ChangeEventHandler<HTMLInputElement> | undefined}) {
  return (
    <div className="flex flex-col gap-2 p-2 w-full min-w-[14rem]">
      <label className="flex">{name}</label>
      <input placeholder={placeholder} className="grow outline-none w-full bg-transparent" type={method} value={value} onChange={onChange} />
    </div>
  )
}
