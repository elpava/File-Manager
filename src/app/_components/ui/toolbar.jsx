import CreateDirectory from './create-directory'
import PasteItem from './paste-item'
import Sort from './sort'
import IconWrapper from './icon-wrapper'
import { LayoutList } from 'lucide-react'

export default function Toolbar() {
  return (
    <div className="flex gap-2 p-2">
      <CreateDirectory />
      <PasteItem />
      <Sort />

      <IconWrapper>
        <LayoutList />
      </IconWrapper>
    </div>
  )
}
