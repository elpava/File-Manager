import CreateDirectory from './create-directory'
import PasteItem from './paste-item'
import Sort from './sort'

export default function Toolbar() {
  return (
    <div className="flex gap-2 p-2">
      <CreateDirectory />
      <PasteItem />
      <Sort />
    </div>
  )
}
