import Title from "@/utils/Title"
import Link from "next/link"

const NotFound = () => {
  return (
    <div className="pt-[4.96vw]">
      <Title title="Page not found" />
      <Link href='/'>
        <button type="button" className="w-[27.2vw] sm:w-[11.37vw] h-[10.4vw] sm:h-[4.024vw] rounded-[4.26vw] sm:rounded-[2.5vw] text-[3.45vw] sm:text-[1.56vw] mt-[50vw] sm:mt-[15.204vw] hover:bg-[#333] text-[#11AAFF] hover:text-[#fff] font-sofia  mx-auto flex bg-[#fff] items-center justify-center font-semibold">Home</button>
      </Link> 
    </div>
  )
}
export default NotFound