'use client'
interface TitleProps{
  title:string
}
const Title:React.FC<TitleProps> = ({title}) => {
  return (
    <h1 className='font-sofia flex text-[#333] leading-[1.16]  font-semibold  justify-center'
      >
        {title}
      </h1>
  )
}
export default Title