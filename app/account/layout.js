import SideNavigation from '@/app/_components/SideNavigation'

const layout = ({ children }) => {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation></SideNavigation>
      <div className="py-1">{children}</div>
    </div>
  )
}

export default layout
