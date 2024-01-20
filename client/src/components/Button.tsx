import { MouseEvent } from "react"

type ButtonProps = {
    onClick?: (event?: MouseEvent<HTMLElement>) => void
    className?: string
    title: string
}

export default function Button({ onClick, className, title }: ButtonProps) {
  return (
    <button className={`w-1/2 py-[6px] mt-3 rounded-[10px] hover:bg-slate-300 bg-white text-black font-nunito text-[20px] not-italic font-extrabold leading-8 ${className}`} onClick={onClick}>
      {title}
    </button>
  )
}
