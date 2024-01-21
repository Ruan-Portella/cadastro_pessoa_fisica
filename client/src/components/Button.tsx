import { MouseEvent } from "react"

type ButtonProps = {
    onClick?: (event?: MouseEvent<HTMLElement>) => void
    className?: string
    title: string
    type?: "submit" | "reset" | "button"
    disabled?: boolean
}

export default function Button({ onClick, className, title, type, disabled }: ButtonProps) {
  return (
    <button disabled={disabled} type={type} className={`w-1/2 py-[6px] mt-3 rounded-[10px] hover:bg-slate-30 text-black font-nunito not-italic font-extrabold leading-8 ${className}`} onClick={onClick}>
      {title}
    </button>
  )
}
